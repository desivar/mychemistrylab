document.addEventListener('DOMContentLoaded', () => {
    // Sound effects
    const sounds = {
        pour: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-pouring-water-on-the-ground-2216.mp3'),
        reaction: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-science-fiction-alarm-901.mp3'),
        fizz: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bubbles-in-water-1173.mp3'),
        success: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'),
        error: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3')
    };

    // Sound control
    const soundControl = document.getElementById('soundControl');
    let soundEnabled = true;

    soundControl.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundControl.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    });

    // Helper function to play sound safely
    function playSound(sound) {
        if (soundEnabled && sound) {
            try {
                sound.currentTime = 0;
                sound.volume = 0.5;
                sound.play().catch(e => console.log('Sound play failed:', e));
            } catch (e) {
                console.log('Sound error:', e);
            }
        }
    }

    // Set initial volume for all sounds
    Object.values(sounds).forEach(sound => {
        sound.volume = 0.5;
    });

    // Create bubbles for decoration
    const bubblesContainer = document.getElementById('bubbles');
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.width = (5 + Math.random() * 15) + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = (5 + Math.random() * 10) + 's';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        bubblesContainer.appendChild(bubble);
    }

    // Element references
    const element1Select = document.getElementById('element1');
    const quantity1Input = document.getElementById('quantity1');
    const element2Select = document.getElementById('element2');
    const quantity2Input = document.getElementById('quantity2');
    const element3Select = document.getElementById('element3');
    const quantity3Input = document.getElementById('quantity3');
    const mixButton = document.getElementById('mixButton');

    // Beaker references
    const reactantBeaker1 = document.getElementById('reactant-beaker-1');
    const reactantContent1 = document.getElementById('reactant-content-1');
    const reactantLabel1 = document.getElementById('reactant-label-1');
    const reactantBeaker2 = document.getElementById('reactant-beaker-2');
    const reactantContent2 = document.getElementById('reactant-content-2');
    const reactantLabel2 = document.getElementById('reactant-label-2');
    const reactantBeaker3 = document.getElementById('reactant-beaker-3');
    const reactantContent3 = document.getElementById('reactant-content-3');
    const reactantLabel3 = document.getElementById('reactant-label-3');
    const reactionFlask = document.getElementById('reaction-flask');
    const reactionContent = document.getElementById('reaction-content');
    const productBeaker = document.getElementById('product-beaker');
    const productContent = document.getElementById('product-content');
    const productLabel = document.getElementById('product-label');
    const resultDiv = document.getElementById('result');
    const reactionDiagramDiv = document.getElementById('reactionDiagram');
    const productImageDiv = document.getElementById('product-image');

    // Element colors and icons mapping
    const elementProperties = {
        'H': { color: '#a6d8ff', icon: '⛢', name: 'Hydrogen' },
        'O': { color: '#ffb3ba', icon: '⚷', name: 'Oxygen' },
        'C': { color: '#d8d8d8', icon: '⚫', name: 'Carbon' },
        'Na': { color: '#fff2a8', icon: '♁', name: 'Sodium' },
        'Cl': { color: '#c1f0c1', icon: '⚳', name: 'Chlorine' },
        'N': { color: '#b3c6ff', icon: '⚶', name: 'Nitrogen' }
    };

    // Product properties with correct sound assignments
    const productProperties = {
        'water': {
            color: '#88d8ff',
            icon: '💧',
            name: 'Water (H₂O)',
            sound: 'reaction'
        },
        'salt': {
            color: '#f0f0f0',
            icon: '🧂',
            name: 'Salt (NaCl)',
            sound: 'success'
        },
        'carbon-dioxide': {
            color: '#e0e0e0',
            icon: '☁️',
            name: 'Carbon Dioxide (CO₂)',
            sound: 'fizz'
        },
        'ammonia': {
            color: '#b3e0ff',
            icon: '🧴',
            name: 'Ammonia (NH₃)',
            sound: 'reaction'
        },
        'methane': {
            color: '#c2f0c2',
            icon: '🔥',
            name: 'Methane (CH₄)',
            sound: 'fizz'
        },
        'vinegar': {
            color: '#f5f5f5',
            icon: '🍶',
            name: 'Vinegar (CH₃COOH)',
            sound: 'reaction'
        },
        'baking-soda': {
            color: '#fff8e6',
            icon: '🧂',
            name: 'Baking Soda (NaHCO₃)',
            sound: 'success'
        },
        'ethanol': {
            color: '#e6f7ff',
            icon: '🍷',
            name: 'Ethanol (C₂H₅OH)',
            sound: 'reaction'
        }
    };

    // Update beaker content based on selected element
    function updateBeakerContent(contentElement, labelElement, element, quantity) {
        if (element && quantity > 0) {
            const elemProps = elementProperties[element];
            if (elemProps) {
                contentElement.style.backgroundColor = elemProps.color;
                labelElement.textContent = `${elemProps.icon} ${elemProps.name} (${quantity})`;
                contentElement.style.height = `${Math.min(90, 20 + quantity * 10)}%`;
            }
        } else {
            contentElement.style.backgroundColor = 'transparent';
            labelElement.textContent = '';
            contentElement.style.height = '0%';
        }
    }

    // Initialize beakers
    updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, parseInt(quantity1Input.value) || 0);
    updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, parseInt(quantity2Input.value) || 0);
    updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, parseInt(quantity3Input.value) || 0);

    // Event listeners for element changes
    element1Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, parseInt(quantity1Input.value) || 0);
    });

    quantity1Input.addEventListener('input', () => {
        updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, parseInt(quantity1Input.value) || 0);
    });

    element2Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, parseInt(quantity2Input.value) || 0);
    });

    quantity2Input.addEventListener('input', () => {
        updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, parseInt(quantity2Input.value) || 0);
    });

    element3Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, parseInt(quantity3Input.value) || 0);
    });

    quantity3Input.addEventListener('input', () => {
        updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, parseInt(quantity3Input.value) || 0);
    });

    // Mix button click handler
    mixButton.addEventListener('click', () => {
        const element1 = element1Select.value;
        const quantity1 = parseInt(quantity1Input.value) || 0;
        const element2 = element2Select.value;
        const quantity2 = parseInt(quantity2Input.value) || 0;
        const element3 = element3Select.value;
        const quantity3 = parseInt(quantity3Input.value) || 0;

        // Reset previous results
        resetReaction();

        // Check if we have at least some elements to mix
        const hasElements = (element1 && quantity1 > 0) || (element2 && quantity2 > 0) || (element3 && quantity3 > 0);
        
        if (!hasElements) {
            showError("Please select at least one element with a quantity greater than 0.");
            return;
        }

        // Determine the reaction
        const reaction = determineReaction(element1, quantity1, element2, quantity2, element3, quantity3);

        if (reaction) {
            animateReaction(reaction);
        } else {
            showError("No valid reaction for the selected elements and quantities.");
        }
    });

    // Reset reaction display
    function resetReaction() {
        resultDiv.textContent = '';
        resultDiv.style.color = '';
        reactionDiagramDiv.textContent = '';
        productImageDiv.innerHTML = '';
        productContent.className = 'content';
        productContent.style.backgroundColor = 'transparent';
        productContent.style.height = '0%';
        productLabel.textContent = '';
        reactionContent.style.backgroundColor = 'transparent';
        reactionContent.classList.remove('animate-swirl', 'animate-fizz');
        productContent.classList.remove('animate-appear', 'animate-fizz');
    }

    // Determine the chemical reaction based on inputs
    function determineReaction(e1, q1, e2, q2, e3, q3) {
        const elements = [];
        if (e1 && q1 > 0) elements.push({ symbol: e1, quantity: q1 });
        if (e2 && q2 > 0) elements.push({ symbol: e2, quantity: q2 });
        if (e3 && q3 > 0) elements.push({ symbol: e3, quantity: q3 });

        // Sort elements for consistent comparison
        const sortedElements = [...elements].sort((a, b) => a.symbol.localeCompare(b.symbol));

        // Helper to find an element by symbol
        const findElement = (symbol) => sortedElements.find(elem => elem.symbol === symbol);

        // Two-element reactions
        if (sortedElements.length === 2) {
            const elemH = findElement('H');
            const elemO = findElement('O');
            const elemC = findElement('C');
            const elemNa = findElement('Na');
            const elemCl = findElement('Cl');
            const elemN = findElement('N');

            // Water: 2H + O → H₂O
            if (elemH && elemO && elemH.quantity >= 2 && elemO.quantity >= 1) {
                return {
                    type: 'water',
                    equation: '2H + O → H₂O',
                    reactants: sortedElements,
                    product: {
                        type: 'water',
                        quantity: Math.min(Math.floor(elemH.quantity / 2), elemO.quantity)
                    }
                };
            }
            // Salt: Na + Cl → NaCl
            else if (elemNa && elemCl && elemNa.quantity >= 1 && elemCl.quantity >= 1) {
                return {
                    type: 'salt',
                    equation: 'Na + Cl → NaCl',
                    reactants: sortedElements,
                    product: {
                        type: 'salt',
                        quantity: Math.min(elemNa.quantity, elemCl.quantity)
                    }
                };
            }
            // Carbon Dioxide: C + 2O → CO₂
            else if (elemC && elemO && elemC.quantity >= 1 && elemO.quantity >= 2) {
                return {
                    type: 'carbon-dioxide',
                    equation: 'C + 2O → CO₂',
                    reactants: sortedElements,
                    product: {
                        type: 'carbon-dioxide',
                        quantity: Math.min(elemC.quantity, Math.floor(elemO.quantity / 2))
                    }
                };
            }
            // Ammonia: N + 3H → NH₃
            else if (elemN && elemH && elemN.quantity >= 1 && elemH.quantity >= 3) {
                return {
                    type: 'ammonia',
                    equation: 'N + 3H → NH₃',
                    reactants: sortedElements,
                    product: {
                        type: 'ammonia',
                        quantity: Math.min(elemN.quantity, Math.floor(elemH.quantity / 3))
                    }
                };
            }
            // Methane: C + 4H → CH₄
            else if (elemC && elemH && elemC.quantity >= 1 && elemH.quantity >= 4) {
                return {
                    type: 'methane',
                    equation: 'C + 4H → CH₄',
                    reactants: sortedElements,
                    product: {
                        type: 'methane',
                        quantity: Math.min(elemC.quantity, Math.floor(elemH.quantity / 4))
                    }
                };
            }
        }
        // Three-element reactions
        else if (sortedElements.length === 3) {
            const elemC = findElement('C');
            const elemH = findElement('H');
            const elemO = findElement('O');
            const elemNa = findElement('Na');

            // Vinegar: 2C + 4H + 2O → CH₃COOH
            if (elemC && elemH && elemO && elemC.quantity >= 2 && elemH.quantity >= 4 && elemO.quantity >= 2) {
                return {
                    type: 'vinegar',
                    equation: '2C + 4H + 2O → CH₃COOH',
                    reactants: sortedElements,
                    product: {
                        type: 'vinegar',
                        quantity: Math.min(Math.floor(elemC.quantity / 2), Math.floor(elemH.quantity / 4), Math.floor(elemO.quantity / 2))
                    }
                };
            }
            // Baking Soda: Na + H + C + 3O → NaHCO₃
            else if (elemNa && elemH && elemC && elemO && elemNa.quantity >= 1 && elemH.quantity >= 1 && elemC.quantity >= 1 && elemO.quantity >= 3) {
                return {
                    type: 'baking-soda',
                    equation: 'Na + H + C + 3O → NaHCO₃',
                    reactants: sortedElements,
                    product: {
                        type: 'baking-soda',
                        quantity: Math.min(elemNa.quantity, elemH.quantity, elemC.quantity, Math.floor(elemO.quantity / 3))
                    }
                };
            }
            // Ethanol: 2C + 6H + O → C₂H₅OH
            else if (elemC && elemH && elemO && elemC.quantity >= 2 && elemH.quantity >= 6 && elemO.quantity >= 1) {
                return {
                    type: 'ethanol',
                    equation: '2C + 6H + O → C₂H₅OH',
                    reactants: sortedElements,
                    product: {
                        type: 'ethanol',
                        quantity: Math.min(Math.floor(elemC.quantity / 2), Math.floor(elemH.quantity / 6), elemO.quantity)
                    }
                };
            }
        }

        return null;
    }

    // Animate the chemical reaction
    function animateReaction(reaction) {
        // Reset any previous animations
        resetReaction();

        // Get active reactant beakers
        const activeReactants = [
            { beaker: reactantBeaker1, content: reactantContent1, element: element1Select.value, quantity: parseInt(quantity1Input.value) || 0 },
            { beaker: reactantBeaker2, content: reactantContent2, element: element2Select.value, quantity: parseInt(quantity2Input.value) || 0 },
            { beaker: reactantBeaker3, content: reactantContent3, element: element3Select.value, quantity: parseInt(quantity3Input.value) || 0 }
        ].filter(item => item.element && item.quantity > 0);

        // Play pour sound
        playSound(sounds.pour);

        // Animate pouring from each reactant beaker to reaction flask
        activeReactants.forEach((reactant, index) => {
            setTimeout(() => {
                // Animate the pouring motion
                reactant.beaker.classList.add('animate-pour');

                // Transfer color to reaction flask
                const elemProps = elementProperties[reactant.element];
                if (elemProps) {
                    reactionContent.style.backgroundColor = elemProps.color;
                }

                // Reduce the reactant content
                const currentHeight = parseInt(reactant.content.style.height || '0');
                reactant.content.style.height = `${Math.max(0, currentHeight - 30)}%`;

            }, index * 500);
        });

        // After pouring, show the reaction
        setTimeout(() => {
            // Clear the pour animation
            activeReactants.forEach(reactant => {
                reactant.beaker.classList.remove('animate-pour');
            });

            // Play reaction sound specific to the product
            const productSoundName = productProperties[reaction.type]?.sound;
            const productSound = sounds[productSoundName];
            playSound(productSound);

            // Show reaction in the flask
            reactionContent.classList.add('animate-swirl');
            reactionContent.style.backgroundColor = productProperties[reaction.type].color;

            // Display reaction info
            resultDiv.textContent = `Created: ${productProperties[reaction.type].name}`;
            resultDiv.style.color = '#4CAF50'; // Green color for success
            reactionDiagramDiv.textContent = reaction.equation;
            productImageDiv.innerHTML = `<div style="font-size: 3rem;">${productProperties[reaction.type].icon}</div>`;

            // After reaction completes, show product
            setTimeout(() => {
                reactionContent.classList.remove('animate-swirl');
                reactionContent.style.backgroundColor = 'transparent';

                // Show product in product beaker
                productContent.classList.add(reaction.type, 'animate-appear');
                productContent.style.backgroundColor = productProperties[reaction.type].color;
                productContent.style.height = `${Math.min(90, 20 + reaction.product.quantity * 10)}%`;
                productLabel.textContent = productProperties[reaction.type].name.split(' ')[0];

                // Special animation for fizzing products
                if (reaction.type === 'carbon-dioxide' || reaction.type === 'methane') {
                    productContent.classList.add('animate-fizz');
                    setTimeout(() => {
                        productContent.classList.remove('animate-fizz');
                    }, 1000);
                }

            }, 2000);

        }, activeReactants.length * 500 + 500);
    }

    // Show error message
    function showError(message) {
        resultDiv.textContent = message;
        resultDiv.style.color = '#f44336'; // Red color for errors

        // Play error sound
        playSound(sounds.error);

        // Shake the beakers to indicate error
        [reactantBeaker1, reactantBeaker2, reactantBeaker3, reactionFlask, productBeaker].forEach(beaker => {
            if (beaker) {
                beaker.style.animation = 'shake 0.5s';
            }
        });

        setTimeout(() => {
            [reactantBeaker1, reactantBeaker2, reactantBeaker3, reactionFlask, productBeaker].forEach(beaker => {
                if (beaker) {
                    beaker.style.animation = '';
                }
            });
        }, 500);
    }

    // Add shake animation for errors
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
   