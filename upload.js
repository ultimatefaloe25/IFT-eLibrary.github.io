let pdfList = JSON.parse(localStorage.getItem('pdfList')) || []; // Load stored PDFs from localStorage

        function openModal() {
            const modal = document.getElementById('uploadModal');
            modal.style.display = 'block';
        }

        function closeModal() {
            const modal = document.getElementById('uploadModal');
            modal.style.display = 'none';
        }

        function uploadPDF() {
            const fileInput = document.getElementById('fileInput');
            const files = fileInput.files;
            const pdfTitle = document.getElementById('pdfTitle').value;
            const publisherName = document.getElementById('publisherName').value;
            const schoolLevel = document.getElementById('schoolLevel').value;

            if (files.length === 0) {
                alert('Please select at least one file.');
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = function(e) {
                    const pdfObject = {
                        id: generateID(),
                        title: pdfTitle,
                        publisher: publisherName,
                        level: schoolLevel,
                        name: file.name,
                        data: e.target.result
                    };
                    pdfList.push(pdfObject); // Store PDF object
                    localStorage.setItem('pdfList', JSON.stringify(pdfList)); // Save PDFs to localStorage
                    displayPDFList(); // Display PDF list
                };

                reader.readAsDataURL(file);
            }

            closeModal(); // Close the modal after uploading
        }

        function displayPDFList() {
            const pdfViewer = document.getElementById('pdfViewer');
            pdfViewer.innerHTML = '';

            const table = document.createElement('table');
            table.classList.add('pdf-table');
            table.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>School Level</th>
                    <th>File Name</th>
                </tr>
            `;

            for (let i = 0; i < pdfList.length; i++) {
                const pdfItem = pdfList[i];
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${pdfItem.title}</td>
                    <td>${pdfItem.publisher}</td>
                    <td>${pdfItem.level}</td>
                    <td class="pdf-name">${pdfItem.name}</td>
                `;

                table.appendChild(row);
            }

            pdfViewer.appendChild(table);

            // Add event listener to the PDF name cells
            const pdfNameCells = document.querySelectorAll('.pdf-name');
            pdfNameCells.forEach((cell) => {
                cell.addEventListener('click', function() {
                    const fileName = cell.textContent;
                    const pdfObject = pdfList.find((item) => item.name === fileName);
                    if (pdfObject) {
                        window.open(pdfObject.data, '_blank');
                    }
                });
            });
        }

        function generateID() {
            return '_' + Math.random().toString(36).substr(2, 9);
        }

        // Display stored PDFs on page load
        window.onload = displayPDFList;