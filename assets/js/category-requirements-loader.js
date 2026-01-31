/**
 * Category Requirements Loader
 * Dynamically loads and displays exam requirements from JSON data for homepage category cards
 */

class CategoryRequirementsLoader {
    constructor() {
        this.data = null;
        this.categoryMapping = {
            'ssc': 0,
            'upsc': 1,
            'banking': 2,
            'jee-neet': 3,
            'railway': 4,
            'up-state-exams': 5
        };
    }

    /**
     * Initialize the loader
     */
    async init() {
        try {
            await this.loadData();
            this.updateCategoryCards();
        } catch (error) {
            console.error('Failed to load category requirements:', error);
            // Fallback to static content if loading fails
        }
    }

    /**
     * Load exam requirements data from JSON file
     */
    async loadData() {
        const response = await fetch('assets/js/exam-requirements.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.data = await response.json();
    }

    /**
     * Update all category cards with dynamic requirements
     */
    updateCategoryCards() {
        if (!this.data) return;

        const categoryCards = document.querySelectorAll('.categories-grid .category-card');

        categoryCards.forEach((card, index) => {
            const examKey = this.getExamKeyByIndex(index);
            if (examKey && this.data[examKey]) {
                this.updateCardRequirements(card, this.data[examKey]);
            }
        });
    }

    /**
     * Get exam key by card index
     * @param {number} index - The index of the category card
     * @returns {string|null} - The corresponding exam key
     */
    getExamKeyByIndex(index) {
        for (const [key, value] of Object.entries(this.categoryMapping)) {
            if (value === index) {
                return key;
            }
        }
        return null;
    }

    /**
     * Update a single category card with requirements
     * @param {HTMLElement} card - The category card element
     * @param {Object} examData - The exam data object
     */
    updateCardRequirements(card, examData) {
        const pElement = card.querySelector('p');
        if (!pElement) return;

        const photoSize = examData.photo.fileSize;
        const signatureSize = examData.signature.fileSize;
        const format = examData.photo.format;

        // Update the requirements text
        pElement.innerHTML = `<strong>${examData.name}</strong><br>Photo: ${photoSize}<br>Signature: ${signatureSize}<br>${format}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loader = new CategoryRequirementsLoader();
    loader.init();
});
