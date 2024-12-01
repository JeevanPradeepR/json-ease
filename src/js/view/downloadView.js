import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';

class DownloadView {
    constructor(display, input){
        this.display = display;
        this.input = input;
    }
    downloadData(data, option) {
        try {
            const parsedData = JSON.parse(data);
            if(option==='text') {
                this.downloadText(parsedData);
            } else if(option==='json') {
                this.downloadJSON(parsedData);
            } else if(option==='excel') {
                this.downloadExcel(parsedData);
            }
        } catch(e) {
           // clearElement(this.display);
            this.display.style.color = 'orange';
            this.display.innerHTML = this.handleError(e);
            console.warn(e);
        }
    }
    downloadText(data) {
        const blob = new Blob([JSON.stringify(data)], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.txt";
        link.click();
    }
    downloadJSON(data) {
        const blob = new Blob([JSON.stringify(data,null,2)], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.json";
        link.click();
    }
    downloadExcel(data) {
        let excelContent = "<table border='1'>";

        // Loop through the top-level object (grossary)
        for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];
            
            // Add a row for each property (e.g., "grossary")
            excelContent += `<tr><td colspan="2"><strong>${key}</strong></td></tr>`;
            
            // Check if the property is an object or array, then process it accordingly
            if (typeof item === "object" && !Array.isArray(item)) {
            // If it's an object (like "type")
            for (const subKey in item) {
                excelContent += `<tr><td>${subKey}</td><td>${JSON.stringify(item[subKey])}</td></tr>`;
            }
            } else if (Array.isArray(item)) {
            // If it's an array (like "offer")
            excelContent += `<tr><td>Offer</td><td>${item.join(", ")}</td></tr>`;
            } else {
            // For simple key-value pairs (like "title", "quantity")
            excelContent += `<tr><td>${key}</td><td>${item}</td></tr>`;
            }
        }
        }

        excelContent += "</table>";

        // Create a downloadable Excel file
        const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.xls";
        link.click();
      }
      
    handleError(error) {
        const errorInfo = `<p>
        Cannot download empty/ invaid json. <br><span class='key error-info'>${error.message}</span></p>`;
        return errorInfo;
    }
}
export default DownloadView;