<?php
declare(strict_types=1);

// Function to read CSV files and return data as associative arrays
function readCSV($filename) {
	$data = [];
	if (($handle = fopen($filename, "r")) !== FALSE) {
		while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
			$data[] = $row;
		}
		fclose($handle);
	}
	return $data;
}

// Load data from CSV files
$bigWeapons = readCSV( '../storage/lists/big_weapons.csv');
$smallWeapons = readCSV('../storage/lists/small_weapons.csv');
$mediumWeapons = readCSV('../storage/lists/medium_weapons.csv');
$tools = readCSV('../storage/lists/tools.csv');
$consumables = readCSV('../storage/lists/consumables.csv');
$meleeWeapons = readCSV('../storage/lists/melee_weapons.csv');

// Convert data to JSON format for JavaScript
$bigWeaponsJSON = json_encode($bigWeapons);
$smallWeaponsJSON = json_encode($smallWeapons);
$mediumWeaponsJSON = json_encode($mediumWeapons);
$toolsJSON = json_encode($tools);
$consumablesJSON = json_encode($consumables);
$meleeWeaponsJSON = json_encode($meleeWeapons);
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="<?=mb_internal_encoding()?>">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>Hunt Showdown Loadout Randomizer</title>
	<link rel="stylesheet" href="css/hunter.css">
	<script src="js/hunter.js"></script>
</head>
<body>
<h1>Hunt 1896 Loadout Randomizer</h1>

<div id="container" class="container">
	<div class="loadoutSelect">
		<button onclick="selectLoadout('bigSmall')">1 Big & 1 Small</button>
		<button onclick="selectLoadout('twoMedium')">2 Medium</button>
		<button onclick="selectLoadout('bigMedium')">1 Big & 1 Medium</button>
	</div>

	<div class="loadoutContainer">
		<div id="loadout" class="loadout">
			<!-- Weapon slots will be displayed here -->
		</div>

		<div id="tools" class="tools">
			<!-- Tool slots will be displayed here -->
		</div>

		<div id="consumables" class="consumables">
			<!-- Consumable slots will be displayed here -->
		</div>
	</div>

	<div class="loadoutOptions">
		<div class="consumableSelect">
			<label for="consumableCount">Select Number of Consumables (0-4):</label>
			<button onclick="changeConsumableValue(1)">^</button>
			<input type="number" id="consumableCount" min="0" max="4" value="1" readonly>
			<button onclick="changeConsumableValue(-1)">v</button>
		</div>

		<div class="toolsSelect">
			<label for="toolsCount">Select Number of Extra tools (0-1):</label>
			<button onclick="increaseValue()">^</button>
			<input type="number" id="toolsCount" min="0" max="1" value="0" readonly>
			<button onclick="decreaseValue()">v</button>
		</div>
	</div>

</div>

<div class="support">
	<button onclick="showSupport()">Support?</button>
</div>



<script>
	// Load data from PHP
	const bigWeapons = <?php echo $bigWeaponsJSON; ?>;
	const smallWeapons = <?php echo $smallWeaponsJSON; ?>;
	const mediumWeapons = <?php echo $mediumWeaponsJSON; ?>;
	const tools = <?php echo $toolsJSON; ?>;
	const consumables = <?php echo $consumablesJSON; ?>;
	const meleeWeapons = <?php echo $meleeWeaponsJSON; ?>;
</script>

</body>
</html>


<?php
return true;
