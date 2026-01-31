/**
 * Exam Requirements Loader
 * Dynamically loads and displays exam requirements from JSON data
 */

class ExamRequirementsLoader {
    constructor() {
        this.data = null;
        this.currentExam = null;
    }

    /**
     * Initialize the loader for a specific exam
     * @param {string} examKey - The key for the exam (e.g., 'ssc', 'banking')
     */
    async init(examKey) {
        try {
            await this.loadData();
            this.currentExam = examKey;
            this.renderRequirements();
        } catch (error) {
            console.error('Failed to load exam requirements:', error);
            this.showError('Failed to load exam requirements. Please refresh the page.');
        }
    }

    /**
     * Load exam requirements data from JSON file
     */
    async loadData() {
        const response = await fetch('../assets/js/exam-requirements.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.data = await response.json();
    }

    /**
     * Render the requirements for the current exam
     */
    renderRequirements() {
        if (!this.data || !this.currentExam || !this.data[this.currentExam]) {
            this.showError('Exam data not found.');
            return;
        }

        const examData = this.data[this.currentExam];

        // Update page title and header
        this.updatePageTitle(examData);

        // Update official link
        this.updateOfficialLink(examData);

        // Update photo requirements
        this.updatePhotoRequirements(examData.photo);

        // Update signature requirements
        this.updateSignatureRequirements(examData.signature);

        // Update exam list
        this.updateExamList(examData.exams);
    }

    /**
     * Update the page title and header
     * @param {Object} examData - The exam data object
     */
    updatePageTitle(examData) {
        // Update document title
        document.title = `${examData.name} Photo & Signature Requirements - ExamFormTools`;

        // Update header
        const header = document.querySelector('.exam-header h1');
        if (header) {
            header.textContent = `${examData.name} Photo & Signature Requirements`;
        }

        const intro = document.querySelector('.exam-intro');
        if (intro) {
            intro.textContent = `Complete specifications for ${examData.name.toLowerCase()} including ${examData.exams.map(e => e.name).slice(0, 3).join(', ')}, and other ${examData.name.toLowerCase().split(' ')[0]} examinations.`;
        }
    }

    /**
     * Update the official link section
     * @param {Object} examData - The exam data object
     */
    updateOfficialLink(examData) {
        const linkElement = document.querySelector('.official-link-section a');
        if (linkElement) {
            linkElement.href = examData.officialLink;
            linkElement.textContent = `Official ${examData.name.split(' ')[0]} Website`;
        }
    }

    /**
     * Update photo requirements section
     * @param {Object} photoData - The photo requirements data
     */
    updatePhotoRequirements(photoData) {
        const photoSection = document.querySelector('.requirements-section:nth-of-type(1)');
        if (!photoSection) return;

        const cards = photoSection.querySelectorAll('.requirement-card');

        // Update file size
        const fileSizeCard = cards[0];
        if (fileSizeCard) {
            const strong = fileSizeCard.querySelector('strong');
            const p = fileSizeCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = photoData.fileSize;
            if (p) p.textContent = `Minimum ${photoData.fileSize.split('-')[0]}, Maximum ${photoData.fileSize.split('-')[1]}`;
        }

        // Update dimensions
        const dimensionsCard = cards[1];
        if (dimensionsCard) {
            const strong = dimensionsCard.querySelector('strong');
            const p = dimensionsCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = photoData.dimensions;
            if (p) {
                const dims = photoData.dimensions.split(' x ');
                p.textContent = `Width: ${dims[0]}, Height: ${dims[1]}`;
            }
        }

        // Update format
        const formatCard = cards[2];
        if (formatCard) {
            const strong = formatCard.querySelector('strong');
            const p = formatCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = photoData.format;
            if (p) p.textContent = photoData.format === 'JPG/JPEG only' ? 'No other formats accepted' : photoData.format;
        }

        // Update resolution
        const resolutionCard = cards[3];
        if (resolutionCard) {
            const strong = resolutionCard.querySelector('strong');
            const p = resolutionCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = photoData.resolution;
            if (p) p.textContent = photoData.resolution === '100-200 DPI' ? 'Recommended: 150 DPI' : photoData.resolution;
        }
    }

    /**
     * Update signature requirements section
     * @param {Object} signatureData - The signature requirements data
     */
    updateSignatureRequirements(signatureData) {
        const signatureSection = document.querySelector('.requirements-section:nth-of-type(2)');
        if (!signatureSection) return;

        const cards = signatureSection.querySelectorAll('.requirement-card');

        // Update file size
        const fileSizeCard = cards[0];
        if (fileSizeCard) {
            const strong = fileSizeCard.querySelector('strong');
            const p = fileSizeCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = signatureData.fileSize;
            if (p) p.textContent = `Minimum ${signatureData.fileSize.split('-')[0]}, Maximum ${signatureData.fileSize.split('-')[1]}`;
        }

        // Update dimensions
        const dimensionsCard = cards[1];
        if (dimensionsCard) {
            const strong = dimensionsCard.querySelector('strong');
            const p = dimensionsCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = signatureData.dimensions;
            if (p) {
                const dims = signatureData.dimensions.split(' x ');
                p.textContent = `Width: ${dims[0]}, Height: ${dims[1]}`;
            }
        }

        // Update format
        const formatCard = cards[2];
        if (formatCard) {
            const strong = formatCard.querySelector('strong');
            const p = formatCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = signatureData.format;
            if (p) p.textContent = signatureData.format === 'JPG/JPEG only' ? 'Black ink on white background' : signatureData.format;
        }

        // Update resolution
        const resolutionCard = cards[3];
        if (resolutionCard) {
            const strong = resolutionCard.querySelector('strong');
            const p = resolutionCard.querySelectorAll('p')[1];
            if (strong) strong.textContent = signatureData.resolution;
            if (p) p.textContent = signatureData.resolution === '100-200 DPI' ? 'Clear and legible signature' : signatureData.resolution;
        }
    }

    /**
     * Update the exam list section
     * @param {Array} exams - Array of exam objects
     */
    updateExamList(exams) {
        const examListSection = document.querySelector('.exam-list');
        if (!examListSection) return;

        examListSection.innerHTML = '';

        exams.forEach(exam => {
            const examItem = document.createElement('div');
            examItem.className = 'exam-item';
            examItem.innerHTML = `
                <h3>${exam.name}</h3>
                <p>${exam.description}</p>
            `;
            examListSection.appendChild(examItem);
        });
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        console.error(message);
        // You could implement a more user-friendly error display here
        alert(message);
    }
}

// Auto-initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    let examKey = null;

    if (path.includes('ssc.html')) {
        examKey = 'ssc';
    } else if (path.includes('upsc.html')) {
        examKey = 'upsc';
    } else if (path.includes('banking.html')) {
        examKey = 'banking';
    } else if (path.includes('jee-neet.html')) {
        examKey = 'jee-neet';
    } else if (path.includes('railway.html')) {
        examKey = 'railway';
    } else if (path.includes('up-state-exams.html')) {
        examKey = 'up-state-exams';
    }

    if (examKey) {
        const loader = new ExamRequirementsLoader();
        loader.init(examKey);
    }
});
