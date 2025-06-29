// This file contains the analytics widget component for the digital marketing campaign application.

class AnalyticsWidget {
    constructor(container) {
        this.container = container;
        this.data = [];
    }

    fetchData() {
        // Simulate fetching data from an API
        this.data = [
            { label: 'Campaign A', value: 120 },
            { label: 'Campaign B', value: 90 },
            { label: 'Campaign C', value: 150 },
        ];
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="analytics-widget">
                <h2>Analytics Overview</h2>
                <ul>
                    ${this.data.map(item => `
                        <li>
                            <span>${item.label}: </span>
                            <strong>${item.value}</strong>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

// Export the AnalyticsWidget class
export default AnalyticsWidget;