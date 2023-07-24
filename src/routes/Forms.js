import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/es5/build/pdf';
import pdfjsWorker from 'pdfjs-dist/es5/build/pdf.worker.entry';
import Cookies from 'js-cookie';

GlobalWorkerOptions.workerSrc = pdfjsWorker;


const WaitListForm = () => {
    const [formData, setFormData] = useState({
        investment_criteria: '',
        vertical_criteria: '',
        stage_focus: '',
        ticket_size: '',
        termsAccepted: false,
        pdf_content: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'multipleFlexible') {
            if (checked) {
                setFormData((prevData) => ({
                    ...prevData,
                    multipleFlexible: [...prevData.multipleFlexible, value]
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    multipleFlexible: prevData.multipleFlexible.filter((multipleFlexible) => multipleFlexible !== value)
                }));
            }
        } else if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked
            }));
        }  else {
            console.log(value)
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();


        // console.log("This is the data to be sent," + formData);

        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)  
            });
            // if (!response.ok) {
            //     throw new Error('HTTP error ' + response.status);
            // }
            // const res = await response.json();
            // console.log(res);
        } catch (error) {
            console.log(error);  
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            getDocument({data: event.target.result}).promise.then(function(pdf) {
                let pages = [];
                for (let i = 1; i <= pdf.numPages; i++) {
                    pages.push(pdf.getPage(i));
                }
                return Promise.all(pages);
            }).then(function(pages) {
                let textPromises = pages.map(page => page.getTextContent());
                return Promise.all(textPromises);
            }).then(function(textContents) {
                let allContent = textContents.map(textContent => 
                    textContent.items.map(item => item.str).join(' ')
                ).join('\n');
                setFormData((prevData) => ({
                    ...prevData,
                    pdf_content: allContent,
                }));
                console.log(allContent);
            });
        };
        reader.readAsArrayBuffer(file);
    };


    return (
        <div className="flex flex-col justify-center items-center h-screen bg-steel-blue text-center">
            <br></br>
            <div>


            <p>LET'S GET YOU STARTED!</p>
            <p>Please fill in this short questionnaire so that InvestorHelper can serve you in the best possible way.</p>
            <p>_______________________________________________________________________________</p>
            <br></br>
                <div className="bg-off-white text-charcoal-gray text-center rounded-xl p-3 ">
        <form onSubmit={handleSubmit}>
            <div>
                <p><b>What is your investment Thesis and criteria: </b></p>
                <label>
                    <textarea
                        className="bg-gold-tint rounded w-full p-2 break-words resize-y"
                        type="text"
                        name="investment_criteria"
                        value={formData.investment_criteria}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <p><b>What verticals do you invest in: </b></p>
                <label>
                    <textarea
                        className="bg-gold-tint rounded w-full p-2 break-words resize-y"
                        type="text"
                        name="vertical_criteria"
                        value={formData.vertical_criteria}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <p><b>What stage do you invest in? </b></p>
                <label>
                    <input
                        className="bg-gold-tint rounded w-full p-2 break-words resize-y"
                        type="text"
                        name="stage_focus"
                        value={formData.stage_focus}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <p><b>What's your ticket size? </b></p>
                <label>
                    <input
                        className="bg-gold-tint rounded w-full p-2 break-words resize-y"
                        type="text"
                        name="ticket_size"
                        value={formData.ticket_size}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>


            <div>
                <br></br>
                <p><b>Upload a PDF: </b></p>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                />
            </div>
            <br></br>
            <p>_______________________________________________________________________________</p>
            <div>
                <br></br>
                <p>By checking the box below your information you agree with our {' '}
                    <a
                    href="https://www.snacka.app/terms-of-use"
                >
                         Terms of Use
                </a>
                    {' '} and {' '}
                    <a
                        href="https://www.snacka.app/privacy-policy"
                    >
                        Privacy Policy                     </a>
                    .</p>
                <label>
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        required
                    />{' '}
                    I accept the terms and conditions
                </label>
            </div>
            
            <br></br>
            <div>
                <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" type="submit">Submit</button>
            </div>
        </form>

            </div>
            </div>
        </div>
    );
};

export default WaitListForm;

