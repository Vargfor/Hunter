'use strict';

	let selectedLoadout = { weapons: [], tools: [], consumables: [] };

	function selectLoadout(type) {
		selectedLoadout.weapons = [];
		switch(type) {
			case 'bigSmall':
				selectedLoadout.weapons.push(randomItem(bigWeapons));
				selectedLoadout.weapons.push(randomItem(smallWeapons));
				break;
			case 'twoMedium':
				selectedLoadout.weapons.push(randomItem(mediumWeapons));
				selectedLoadout.weapons.push(randomItem(mediumWeapons));
				break;
			case 'bigMedium':
				selectedLoadout.weapons.push(randomItem(bigWeapons));
				selectedLoadout.weapons.push(randomItem(mediumWeapons));
				break;
		}
		renderLoadout();
	}

	function randomItem(array) {
		return array[Math.floor(Math.random() * array.length)][0];
	}

	function renderLoadout() {
		const loadoutDiv = document.getElementById('loadout');
		loadoutDiv.innerHTML = '';
		selectedLoadout.weapons.forEach(weapon => {
			const slot = document.createElement('div');
			slot.className = 'slot';
			slot.innerText = weapon;  // Full item name
			loadoutDiv.appendChild(slot);
		});

		renderTools();
		renderConsumables();
	}

	function renderTools() {
		const toolsDiv = document.getElementById('tools');
		toolsDiv.innerHTML = '';

		// Default tools: medkit, choke, melee
		selectedLoadout.tools = [randomItem(meleeWeapons), 'Medkit', 'Choke'];

		let count = parseInt(document.getElementById('toolsCount').value);

		for (let i = 0; i < count; i++) {
			selectedLoadout.tools.push(randomItem(tools));
		}

		selectedLoadout.tools.forEach(tool => {
			const slot = document.createElement('div');
			slot.className = 'slot';
			slot.innerText = tool;  // Full item name
			toolsDiv.appendChild(slot);
		});
	}

	function renderConsumables() {
		const consumablesDiv = document.getElementById('consumables');
		consumablesDiv.innerHTML = '';

		let count = parseInt(document.getElementById('consumableCount').value);
		selectedLoadout.consumables = [];

		for (let i = 0; i < count; i++) {
			selectedLoadout.consumables.push(randomItem(consumables));
		}

		selectedLoadout.consumables.forEach(consumable => {
			const slot = document.createElement('div');
			slot.className = 'slot';
			slot.innerText = consumable;  // Full item name
			consumablesDiv.appendChild(slot);
		});
	}

	function updateConsumables() {
		renderConsumables();
	}

	function updateTools() {
		renderTools();
	}

	function changeValue(id, offset, min, max) {
		const inputField = document.getElementById(id);
		const currentValue = parseInt(inputField.value, 10);
		const newValue = currentValue + offset;

		if (newValue >= min && newValue <= max) {
			inputField.value = newValue;
			if (id === 'toolsCount') {
				updateTools();
			} else if (id === 'consumableCount') {
				updateConsumables();
			}
		}
	}

	function increaseValue() {
		changeValue('toolsCount', 1, 0, 1);
	}

	function decreaseValue() {
		changeValue('toolsCount', -1, 0, 1);
	}

	function changeConsumableValue(offset) {
		changeValue('consumableCount', offset, 0, 4);
	}

	let supportContent = false;
	function showSupport() {
		const contentDiv = document.getElementsByClassName('support')[0];

		if (supportContent) {
			return;
		};

		const p1 = document.createElement('p');
		p1.textContent = 'If you wish to support this project:';

		const link1 = document.createElement('a');
		link1.href = 'https://buymeacoffee.com/vargfor';
		link1.target = '_blank';
		link1.textContent = 'Buy me a coffee :)';

		const p2 = document.createElement('p');
		p2.textContent = 'Want to suggest changes or features?';

		const link2 = document.createElement('a');
		link2.href = 'https://www.reddit.com/user/Proxima-noodle/';
		link2.target = '_blank';
		link2.textContent = 'Reddit ^^';

		contentDiv.appendChild(p1);
		contentDiv.appendChild(link1);
		contentDiv.appendChild(p2);
		contentDiv.appendChild(link2);

		// Make the div visible
		contentDiv.style.display = 'flex';

		supportContent = true;
	}
