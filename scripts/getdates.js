// Enhanced date management system for the Virtual Chemical Lab
document.addEventListener('DOMContentLoaded', function() {
    
    // Get current date and format it properly
    function getCurrentYear() {
        return new Date().getFullYear();
    }

    function getLastModifiedDate() {
        // Try to get the actual last modified date from the document
        let lastModified = document.lastModified;
        
        // If no last modified date available, use current date
        if (!lastModified || lastModified === "") {
            lastModified = new Date().toISOString();
        }

        // Parse and format the date
        const date = new Date(lastModified);
        
        // Format options for a readable date
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };

        return date.toLocaleDateString('en-US', options);
    }

    // Update copyright year
    function updateCopyright() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = getCurrentYear();
        }
    }

    // Update last modified date
    function updateLastModified() {
        const lastModifiedElement = document.getElementById('lastModified');
        if (lastModifiedElement) {
            lastModifiedElement.textContent = getLastModifiedDate();
        }
    }

    // Add visitor counter (simulated)
    function addVisitorInfo() {
        // Get or create visitor count from localStorage
        let visitorCount = localStorage.getItem('labVisitorCount');
        if (!visitorCount) {
            visitorCount = Math.floor(Math.random() * 1000) + 100; // Start with random number
        } else {
            visitorCount = parseInt(visitorCount) + 1;
        }
        
        localStorage.setItem('labVisitorCount', visitorCount);

        // Add visitor info to footer if it doesn't exist
        const footer = document.querySelector('footer');
        if (footer && !document.getElementById('visitorInfo')) {
            const visitorInfo = document.createElement('p');
            visitorInfo.id = 'visitorInfo';
            visitorInfo.innerHTML = `
                <small style="color: #6b7280;">
                    <i class="fas fa-users"></i> Lab Sessions: ${visitorCount.toLocaleString()} | 
                    <i class="fas fa-clock"></i> Session Started: ${new Date().toLocaleTimeString()}
                </small>
            `;
            footer.appendChild(visitorInfo);
        }
    }

    // Add performance metrics
    function addPerformanceInfo() {
        // Calculate page load time
        const loadTime = performance.now();
        
        // Add performance info after a short delay
        setTimeout(() => {
            const footer = document.querySelector('footer');
            if (footer && !document.getElementById('performanceInfo')) {
                const performanceInfo = document.createElement('p');
                performanceInfo.id = 'performanceInfo';
                performanceInfo.innerHTML = `
                    <small style="color: #9ca3af;">
                        <i class="fas fa-tachometer-alt"></i> Lab Loaded in ${Math.round(loadTime)}ms | 
                        <i class="fas fa-memory"></i> Memory Usage: ${(performance.memory ? 
                            (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1) + ' MB' : 
                            'N/A')}
                    </small>
                `;
                footer.appendChild(performanceInfo);
            }
        }, 1000);
    }

    // Add lab statistics
    function addLabStats() {
        // Create a stats object to track lab usage
        const stats = {
            reactions: parseInt(localStorage.getItem('totalReactions') || '0'),
            elementsUsed: JSON.parse(localStorage.getItem('elementsUsed') || '{}'),
            favoriteReaction: localStorage.getItem('favoriteReaction') || 'None yet'
        };

        // Add stats to the page (optional display)
        const footer = document.querySelector('footer');
        if (footer && !document.getElementById('labStats')) {
            const statsInfo = document.createElement('details');
            statsInfo.id = 'labStats';
            statsInfo.style.marginTop = '15px';
            statsInfo.innerHTML = `
                <summary style="cursor: pointer; color: #4f46e5; font-weight: 600;">
                    <i class="fas fa-chart-bar"></i> Lab Statistics
                </summary>
                <div style="padding: 10px; background: rgba(79, 70, 229, 0.05); border-radius: 8px; margin-top: 10px;">
                    <p style="margin: 5px 0; color: #6b7280;">
                        <i class="fas fa-flask"></i> Total Reactions: <strong>${stats.reactions}</strong>
                    </p>
                    <p style="margin: 5px 0; color: #6b7280;">
                        <i class="fas fa-star"></i> Most Used Element: <strong>${getMostUsedElement(stats.elementsUsed)}</strong>
                    </p>
                    <p style="margin: 5px 0; color: #6b7280;">
                        <i class="fas fa-heart"></i> Favorite Reaction: <strong>${stats.favoriteReaction}</strong>
                                            </p>
                </div>
            `;
            footer.appendChild(statsInfo);
        }
    }

    // Helper function to get the most used element
    function getMostUsedElement(elementsUsed) {
        let maxCount = 0;
        let mostUsedElement = 'None';
        for (const [element, count] of Object.entries(elementsUsed)) {
            if (count > maxCount) {
                maxCount = count;
                mostUsedElement = element;
            }
        }
        return mostUsedElement;
    }

    // Initialize the lab management system
    function initLabManagement() {
        updateCopyright();
        updateLastModified();
        addVisitorInfo();
        addPerformanceInfo();
        addLabStats();
    }

    // Call the initialization function
    initLabManagement();
});
