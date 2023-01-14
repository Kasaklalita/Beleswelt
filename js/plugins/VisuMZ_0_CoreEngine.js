//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.50;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.50] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x347547=_0x3084;(function(_0x565fa4,_0x144352){const _0x3d85f8=_0x3084,_0x232ff0=_0x565fa4();while(!![]){try{const _0x49ce44=-parseInt(_0x3d85f8(0x88e))/0x1+parseInt(_0x3d85f8(0x45b))/0x2+parseInt(_0x3d85f8(0x764))/0x3*(parseInt(_0x3d85f8(0x3e1))/0x4)+-parseInt(_0x3d85f8(0x26c))/0x5*(-parseInt(_0x3d85f8(0x606))/0x6)+-parseInt(_0x3d85f8(0x8a4))/0x7+-parseInt(_0x3d85f8(0x75a))/0x8+parseInt(_0x3d85f8(0x2af))/0x9;if(_0x49ce44===_0x144352)break;else _0x232ff0['push'](_0x232ff0['shift']());}catch(_0x1f78a){_0x232ff0['push'](_0x232ff0['shift']());}}}(_0xa960,0xe4794));var label=_0x347547(0x4c0),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x347547(0x1cb)](function(_0x35f21d){const _0x55596a=_0x347547;return _0x35f21d[_0x55596a(0xd7)]&&_0x35f21d[_0x55596a(0x2a1)][_0x55596a(0x4aa)]('['+label+']');})[0x0];function _0xa960(){const _0x442d1e=['_list','Input_onKeyDown','ushIk','5605600GatQGU','MenuBg','_pagedownButton','smallParamFontSize','HANJA','yEAVN','_backSprite','hideButtonFromView','calcEasing','Scene_Map_updateMainMultiply','33AJpMCh','LHOOQ','paramWidth','processKeyboardDigitChange','ParseEnemyNotetags','NJHdo','Color','DocumentTitleFmt','Window_Base_drawText','setCommonEvent','XParamVocab0','note','NameMenu','name','rgba(0,\x200,\x200,\x201.0)','initialBattleSystem','isItemStyle','UVIjh','VOLUME_DOWN','LHsfl','onload','abs','Input_shouldPreventDefault','down','ActorRect','<%1\x20%2:[\x20]','hpColor','INOUTEXPO','titles2','CKTvH','canUse','BxOgw','IconSParam2','ActorTPColor','_windowLayer','xparamFlat2','createWindowLayer','\x5c}❪SHIFT❫\x5c{','valueOutlineWidth','targetObjects','repositionCancelButtonSideButtonLayout','setupBattleTestItems','INELASTIC','AqShY','_inputString','Game_Actor_levelUp','lPWon','_changingClass','onKeyDown','Plus2','EnableJS','gxcQG','map','RBbYJ','createPointAnimation','iqeRK','jXKdT','PictureID','dlhNe','_stored_gaugeBackColor','GDxks','FxPWG','TprvR','titles1','MAXMP','AutoStretch','padding','paramX','fromCharCode','cursorPagedown','playOk','Gold','stencilOp','Window_Base_createTextState','drawGoldItemStyle','isNormalPriority','_targetScaleX','apUmI','_height','fillRect','doesNameContainBannedWords','helpWindowRect','maxLvGaugeColor1','NUMPAD7','_number','OutlineColor','JowuT','charCode','hide','PERIOD','Scene_Boot_startNormalGame','FFjJK','Duration','textWidth','DTB','Scene_Title_drawGameTitle','DEF','xparamRate2','OdOdN','LINEAR','vertical','IconXParam7','POFyJ','setAttack','_statusParamsWindow','statusParamsWindowRect','maxTp','_colorTone','_buyWindow','processKeyboardDelete','initCoreEasing','transform','pJhhU','_refreshArrows','SCALE_MODES','erasePicture','isInstanceOfSceneMap','Game_BattlerBase_refresh','xparamFlat1','getCoreEngineScreenShakeStyle','RegExp','paramName','BoRoE','NewGameCommonEvent','gaugeRate','sparamFlatBonus','ItemBackColor2','STB','isTpb','eAqOJ','Game_Interpreter_updateWaitMode','_actor','BjZsX','home','xparam','stypeId','CancelText','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','strokeRect','shift','data/','OkText','gPbJZ','Scene_Menu_create','showDevTools','BACK_SLASH','keypress','ExportCurTroopText','consumeItem','isSideButtonLayout','hit','VJXtX','randomInt','Sprite_Gauge_gaugeRate','getLastPluginCommandInterpreter','buttonAssistOffset5','KvpNn','ituUz','PRmQw','clearZoom','WIN_OEM_ENLW','adjustSprite','onNameOk','updatePointAnimations','Control\x20Variables\x20Script\x20Error','sv_actors','FpmXO','WIN_ICO_00','requestFauxAnimation','WIN_OEM_FJ_ROYA','ImprovedAccuracySystem','ColorCTGauge2','EXR','numActions','MIN_SAFE_INTEGER','_sellWindow','paramchangeTextColor','drawGameVersion','updateBackOpacity','loadWindowskin','daTdY','Window_Selectable_processCursorMove','GET','Window_NameInput_initialize','MINUS','pagedownShowButton','MainMenu','SParamVocab2','itypeId','mrgPC','FsQVh','initialLevel','isCollidedWithEvents','reduce','_data','hHbML','DYtbG','drawCurrentParam','_backSprite1','maxGold','ExportStrFromAllMaps','skillTypes','ItemMenu','ETB','isSpecialCode','playCancel','checkCacheKey','Bitmap_resize','JeZwn','ADD','NXFNb','drawCircle','startAutoNewGame','OUTQUAD','format','Wait','AJNKw','_stored_expGaugeColor2','WIN_OEM_FJ_TOUROKU','IFPyy','nextLevelExp','remove','IconSParam9','OS_KEY','ONE_MINUS_SRC_ALPHA','actorWindowRect','xSIOc','catchLoadError','SwitchToggleRange','QYzTC','Rate2','MultiKeyFmt','blt','INCIRC','Graphics_defaultStretchMode','originalJS','tileHeight','loadTitle1','END','levelUpRecovery','switchModes','buttonAssistText2','SELECT','Game_Action_numRepeats','itemHit','Window_StatusBase_drawActorSimpleStatus','_hovered','trim','UfhEf','_hp','Window_Base_drawCharacter','Window_Gold_refresh','_targetOffsetX','GFqhx','_scaleY','isExpGaugeDrawn','update','Scene_Battle_createSpriteset','PRESERVCONVERSION(%1)','setEasingType','_slotWindow','Game_Action_itemEva','isRepeated','DigitGroupingDamageSprites','_commandList','origin','IconParam3','ApBwt','_dummyWindow','version','itemLineRect','Page','guZlj','BTestWeapons','WBvgL','setupButtonImage','parameters','zursh','ASTERISK','outlineColorGauge','cILly','sparam','ColorPowerDown','buttonAssistSwitch','original','createPageButtons','BgFilename2','showPointAnimations','ARRAYSTR','Bitmap_fillRect','_downArrowSprite','img/%1/','eVcVL','processBack','_internalTextures','profileWindowRect','FUNC','WDyBg','1760787aCbiZd','#%1','Window_Base_drawIcon','Lzydj','_stored_powerUpColor','DummyBgType','PreserveNumbers','ExportCurMapText','XmLRT','innerWidth','mbutq','Bitmap_gradientFillRect','makeTargetSprites','drawGauge','goDdB','_effectsContainer','Yjvks','PQcsj','\x5c}❪TAB❫\x5c{','Param','playTestCtrlT','processKeyboardBackspace','11304188kBDEOO','updatePlayTestF7','parse','DataManager_setupNewGame','iNXpF','pressed','WIN_OEM_PA2','resetBattleSystem','createFauxAnimationSprite','scale','pictureButtons','Window_NameInput_cursorPagedown','%1/','ATTN','_digitGrouping','Icon','SHFoS','nImWq','1.3.0','_CoreEngineSettings','TextCodeNicknames','LevelUpFullMp','eLElf','SceneManager_isGameActive','ZhojD','TILDE','skillId','Scene_Boot_loadSystemImages','StatusEquipRect','setTargetAnchor','startMove','BvMGO','calcCoreEasing','RoWOQ','isBusy','_stored_deathColor','RepositionEnemies','_playTestFastMode','dQYfD','Bitmap_clearRect','NUMPAD1','mainFontSize','onKeyDownKeysF6F7','Window_Selectable_drawBackgroundRect','AnfEZ','_commandWindow','_drawTextOutline','top','Rate1','buttonAssistKey3','addCommand','isDying','hdIUF','OUTQUART','horzJS','〘Scrolling\x20Text〙\x0a','_pollGamepads','loadGameImagesCoreEngine','isMVAnimation','PictureEraseRange','paramMaxJS','_isWindow','_width','Scene_MenuBase_createCancelButton','coreEngineRepositionEnemies','buttonAssistKey%1','buttonAssistText%1','down2','IconSParam8','repeat','asin','Speed','sin','IconParam6','itemRect','PHA','_targetOpacity','status','VisuMZ_1_OptionsCore','PDR','ExtractStrFromTroop','LoadError','SwitchRandomizeOne','processPointAnimationRequests','StatusMenu','pQqTG','BACKSPACE','awAqL','goldWindowRect','Window_NameInput_cursorUp','height','CLEAR','windowPadding','dimColor2','startAnimation','canAttack','isWindowMaskingEnabled','GoldRect','targetEvaRate','\x20Origin:\x20%1','changeClass','DamageColor','setSideButtonLayout','fadeSpeed','processSoundTimings','updateAnchor','setBattleSystem','registerCommand','tqjwS','ButtonFadeSpeed','IconSParam5','MAX_GL_TEXTURES','inBattle','CNT','sparamRateJS','TGR','makeCommandList','eETQd','ProfileBgType','loadSystemImages','MoBcG','Game_Action_itemHit','xRNUK','_pressed','toLocaleString','initVisuMZCoreEngine','BoxMargin','FTB','windowRect','createTitleButtons','DimColor1','COLON','children','GkAnN','qdxhv','pixelated','_upArrowSprite','NUMPAD9','Type','Rate','updateMotion','OpenSpeed','printError','Spriteset_Battle_createEnemies','_playtestF7Looping','gaugeLineHeight','_statusWindow','ColorExpGauge1','ActorBgType','CustomParamType','BottomButtons','ENTER','gainGold','wCMzn','ColorTPGauge1','buttonY','LZLHD','drawText','aQldc','wAavt','NUMPAD3','get','numberWindowRect','updateMain','isItem','_stored_maxLvGaugeColor1','wgITG','isMagical','offsetX','Scene_Map_createMenuButton','Window_Base_initialize','pointX','_stored_hpGaugeColor2','IconIndex','drawAllParams','cos','battleSystem','Window_Selectable_itemRect','blockWidth','\x0a\x0a\x0a\x0a\x0a','ButtonAssist','Spriteset_Base_destroy','CGBzT','F18','INOUTELASTIC','min','windowOpacity','Game_Party_consumeItem','level','result','Window_Selectable_cursorDown','refreshDimmerBitmap','StartID','sparamRate','SParamVocab6','isUseModernControls','_duration','MEV','bitmapHeight','SParamVocab7','_shakePower','PRINTSCREEN','onerror','ExtJS','ColorTPGauge2','OZrEu','_pictureCoordinatesMode','BuyRect','BattleManager_processEscape','getCombinedScrollingText','_actorWindow','NUMPAD4','commandWindowRows','FTMRr','xScrollLinkedOffset','iTXeM','LineHeight','buttonAssistWindowButtonRect','DRyBp','_editWindow','BlendMode','Window_Selectable_processTouch','numRepeats','_stored_mpCostColor','updateFauxAnimations','clear','isPhysical','wait','LESS_THAN','gradientFillRect','LUK','clone','updateOnceParallelInterpreters','toUpperCase','BannedWords','ImgLoad','animationId','pageup','Game_Interpreter_command105','key%1','F12','backspace','addOnceParallelInterpreter','SceneManager_initialize','smoothSelect','isPlaying','Window_ShopSell_isEnabled','toLowerCase','isTouchedInsideFrame','itemHitImprovedAccuracy','areButtonsHidden','TimeProgress','_dimmerSprite','_buttonAssistWindow','boxWidth','DigitGroupingLocale','NameInputMessage','gvRvC','dashToggle','setMainFontSize','updatePositionCoreEngine','Scene_Base_terminateAnimationClearBugFix','updateDashToggle','AoPww','processCursorHomeEndTrigger','NohJz','PositionJS','exportAllTroopStrings','createSpriteset','fAfDy','outlineColor','dlqkL','catchUnknownError','Linear','catchNormalError','performEscape','PA1','sparamRate2','ParseArmorNotetags','enter','_cancelButton','EISU','Plus','SnapshotOpacity','cLZGU','ColorPowerUp','AccuracyBoost','storeMapData','processKeyboardHome','ExportStrFromAllTroops','XParamVocab9','horizontal','ItemBackColor1','makeDeepCopy','picture','needsUpdate','clearOnceParallelInterpreters','HZFqv','title','makeCoreEngineCommandList','charAt','ARRAYFUNC','textColor','_drawTextShadow','setViewportCoreEngineFix','keyRepeatWait','INOUTCIRC','kTDyb','escape','checkSmartEventCollision','Game_Picture_move','Bdayd','playBuzzer','enableDigitGroupingEx','cancelShowButton','TextJS','MuQWI','batch','YYFhk','mpGaugeColor2','%1\x0a','filter','sUbaY','targetOpacity','FeGPF','sqrt','_pauseSignSprite','RevertPreserveNumbers','GoldFontSize','isFullDocumentTitle','enemies','CrisisRate','IconSet','targetX','EditBgType','wdOPr','listWindowRect','CONTEXT_MENU','Upper\x20Left','EXECUTE','updateMainMultiply','_scaleX','IconParam4','RepositionActors','([\x5c+\x5c-]\x5cd+)([%％])>','_centerElement','Game_Picture_y','updatePositionCoreEngineShakeVert','ruHLx','titleCommandWindow','advanced','bitmapWidth','HELP','PAUSE','_pointAnimationSprites','bgmVolume','ColorTPCost','maxBattleMembers','pEfKE','drawGameSubtitle','〘Common\x20Event\x20%1:\x20%2〙\x20Start','Scene_Battle_update','TfmmT','forceOutOfPlaytest','stop','select','CIsvP','_listWindow','hJPZm','DisplayedParams','reAru','bQcQj','touchUI','Bitmap_drawTextOutline','drawTextEx','buttonAssistKey5','SkillMenu','_itemWindow','INOUTSINE','command111','gainItem','DvAOG','center','xparamPlusJS','save','paramRate','apply','applyEasing','DOWN','Game_Picture_calcEasing','changeTextColor','BottomHelp','CustomParamAbb','_categoryWindow','ConvertNumberToString','setupCoreEngine','Game_Picture_updateMove','isOpen','bdgZR','isGamepadConnected','loadMapData','paramFlatBonus','Window_NameInput_refresh','Mute','sRkqP','itemHeight','BTB','WIN_OEM_PA3','KhpiZ','filters','EnableMasking','optSideView','updateOpen','KKoOu','SoSND','CIRCUMFLEX','pictures','round','gaugeBackColor','EYOXu','TTWyB','processTouch','GroupDigits','floor','Loisu','jtuvn','TSmfV','PERCENT','olcVI','itemSuccessRate','opacity','yScrollLinkedOffset','renderNoMask','XParamVocab8','mpCostColor','keyMapper','Scene_Status_create','CommandBgType','IconXParam6','TiIEl','itemWindowRect','loadTitle2','showFauxAnimations','_stored_powerDownColor','OTB','string','call','match','ZOOM','REC','Scene_MenuBase_mainAreaTop','DkymL','ApplyEasing','createTextState','faces','KeyTAB','isArrowPressed','Game_Map_setup','iconWidth','([\x5c+\x5c-]\x5cd+)>','xparamFlatBonus','sparamRate1','CodeJS','Spriteset_Base_isAnimationPlaying','PRKZS','optionsWindowRect','learnings','levelUp','GXKXY','zncrM','EncounterRateMinimum','talgC','connected','VOLUME_MUTE','destroy','backOpacity','MRF','CustomParamNames','processFauxAnimationRequests','_bitmap','Smooth','CLOSE_BRACKET','5bVjuns','IconSParam0','cursorRight','setMoveEasingType','setupCoreEasing','_refreshBack','updatePadding','ShowItemBackground','tpColor','determineSideButtonLayoutValid','addWindow','ParseItemNotetags','isOptionValid','option','subject','buttonAssistCancel','buttonAssistText4','STR','INBACK','rArzn','enfoF','ParseStateNotetags','TranslucentOpacity','shake','_stored_tpGaugeColor1','loadPicture','_pictureCoordinatesWindow','_colorCache','_defaultStretchMode','getBattleSystem','EVA','_onceParallelInterpreters','Game_Interpreter_PluginCommand','AULkP','gGyxj','FontWidthFix','PictureEasingType','EnableNameInput','SParamVocab8','animationShouldMirror','OUTSINE','value','Window_NameInput_cursorLeft','initMembers','outlineColorDmg','innerHeight','Exported_Script_%1.txt','AntiZoomPictures','Plus1','_maxDigits','processHandling','updateMove','MCR','description','clamp','contentsOpacity','makeDocumentTitle','Title','_stored_systemColor','ypScv','jsQuickFunc','command355','MAXHP','F7key','constructor','faceWidth','TextCodeClassNames','28687383LLCXnV','move','makeActionList','createPointAnimationTargets','eqiQn','sparamPlus1','Game_Actor_paramBase','jjYii','isCancelled','BgType','RbnuY','SEMICOLON','WIN_OEM_ATTN','ggGtI','Sprite_destroy','_lastY','playEscape','WIN_ICO_HELP','wxukj','maxCols','_currentMap','AnimationMirrorOffset','TPB\x20ACTIVE','QxQhO','isKeyItem','Input_clear','_optionsWindow','isOpenAndActive','isAnimationPlaying','_isButtonHidden','contentsBack','_coreEasingType','updateClose','imageSmoothingEnabled','HASH','〘Common\x20Event\x20%1:\x20%2〙\x20End','GoldBgType','initDigitGrouping','jPwwn','addChildToBack','tileWidth','IconParam2','ColorHPGauge1','ParseTilesetNotetags','DECIMAL','Flat','setGuard','battlebacks1','ItemBgType','NoTileShadows','%1〘Choice\x20%2〙\x20%3%1','ItemStyle','onInputBannedWords','PictureFilename','Manual','EXCLAMATION','Spriteset_Base_initialize','rgba(0,\x200,\x200,\x200.7)','_screenY','_timerSprite','SwitchRandomizeRange','TPB\x20WAIT','PnONj','OUTELASTIC','SmartEventCollisionPriority','Scene_Battle_createCancelButton','ColorNormal','numberShowButton','F20','CustomParamIcons','RowSpacing','isGamepadButtonPressed','_pointAnimationQueue','Show\x20Scrolling\x20Text\x20Script\x20Error','ActorHPColor','_cache','QTklJ','xparamFlatJS','style','makeInputButtonString','bxyxO','mainAreaBottom','defaultInputMode','CRI','ARRAYSTRUCT','Bitmap_blt','QNoTk','sellWindowRect','SwitchActorText','repositionEnemiesByResolution','runCombinedScrollingTextAsCode','EZICm','paramFlat','reserveNewGameCommonEvent','animations','create','atbActive','Game_Character_processMoveCommand','retrievePointAnimation','process_VisuMZ_CoreEngine_RegExp','DimColor2','NUMPAD2','MNkVN','Symbol','NJIQU','GfToM','ListBgType','Scene_Shop_create','pGVBF','Bitmap_drawText','isActor','(\x5cd+)([%％])>','cursorLeft','Center','NUM','OUTBOUNCE','ARRAYEVAL','BTestAddedQuantity','ColorMaxLvGauge2','_movementDuration','getColor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','DefaultMode','NHsxW','createBackground','process_VisuMZ_CoreEngine_Notetags','openURL','drawActorNickname','ncSty','Game_BattlerBase_initMembers','_balloonQueue','_backgroundFilter','Game_Actor_changeClass','_backSprite2','VisuMZ_2_BattleSystemBTB','valueOutlineColor','CEV','updatePositionCoreEngineShakeRand','VbAlv','xHCHU','ActorMPColor','setupNewGame','startShake','ARRAYJSON','_mapNameWindow','FxEAm','end','_helpWindow','$dataMap','PRINT','XParamVocab7','CRSEL','_windowskin','kMXZP','ColorHPGauge2','currentClass','_screenX','traitObjects','animationBaseDelay','exp','zhQDB','OTHuZ','_fauxAnimationSprites','VisuMZ_2_BattleSystemETB','setActionState','drawActorSimpleStatus','createCommandWindow','drawBackgroundRect','JdHXc','SParamVocab9','SParamVocab3','AkEaQ','ShowButtons','setup','drawGameTitle','worldTransform','command122','buttonAssistKey2','_smooth','uYrrQ','OpenConsole','RightMenus','SParamVocab0','ListRect','<JS\x20%1\x20%2:[\x20](.*)>','Troop%1','Game_Troop_setup','alpha','aJkfC','buttonAssistText3','ExtractStrFromMap','concat','openness','Window_Base_update','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','aOsiI','ARRAYNUM','flush','ExportAllMapText','isGameActive','textHeight','alwaysDash','normal','initButtonHidden','createCustomBackgroundImages','qfBag','pages','addLoadListener','AllMaps','split','cdNQu','buttonAssistOffset1','_troopId','RLAUG','jXZqj','SEPARATOR','prototype','%1〘End\x20Choice\x20Selection〙%1','ConvertParams','_goldWindow','loadIconBitmap','waiting','rightArrowWidth','WindowLayer_render','measureTextWidth','ERxgd','isAnimationForEach','isSceneBattle','iMPVT','Opacity','ColorMaxLvGauge1','RVTae','mainAreaHeightSideButtonLayout','smooth','_setupEventHandlers','Sprite_Animation_setViewport','isMaskingEnabled','system','SUBTRACT','restore','updateOpacity','isBottomHelpMode','Untitled','_coreEasing','%1〘Choice\x20Cancel〙%1','pow','UuWDW','MDR','getPointAnimationLayer','JmIkd','lineHeight','_hideTileShadows','useFontWidthFix','OPEN_PAREN','Scene_MenuBase_helpAreaTop','IconSParam6','HelpRect','getButtonAssistLocation','getGamepads','nah','ctrlKey','Scene_Base_createWindowLayer','INQUART','createChildSprite','Bitmap_drawCircle','MenuLayout','Sprite_Gauge_currentValue','keyCode','DigitGroupingExText','XBiwT','SXdYn','render','Window_NumberInput_start','FANXF','VisuMZ_2_BattleSystemSTB','GRD','_forcedTroopView','xparamRate','reserveCommonEvent','KbMdH','targetSpritePosition','sparamFlat1','_forcedBattleSys','outbounce','setViewport','CGzDP','useDigitGrouping','setSkill','xTeNN','visible','pvjtT','initCoreEngine','PositionX','uQVdP','bgs','_profileWindow','ALT','X:\x20%1','createCancelButton','createEnemies','wioYU','DnsAK','processTimingData','Qcoqx','PIPE','DigitGroupingStandardText','9076mivaeG','systemColor','initCoreEngineScreenShake','IconXParam5','processAlwaysEscape','Sprite_Button_initialize','StatusRect','TextFmt','gold','SideButtons','isSceneMap','NQLvK','aWqyJ','setSideView','active','KeyboardInput','TkLCP','oPchK','BasicParameterFormula','Sprite_Animation_processSoundTimings','sv_enemies','ganfA','params','yqACz','measureText','Game_Action_setAttack','qPSnL','WIN_OEM_FJ_LOYA','ExportAllTroopText','Window_NameInput_cursorRight','playTestF6','integer','iSTWe','playOnceParallelInterpreter','setCoreEngineScreenShakeStyle','characters','VogIK','tpGaugeColor1','process_VisuMZ_CoreEngine_jsQuickFunctions','onButtonImageLoad','zUgzD','_offsetX','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','currentLevelExp','commandWindowRect','cursorPageup','default','uLgss','dummyWindowRect','TCR','isAlive','NThmX','clearCachedKeys','isGamepadTriggered','Scene_GameEnd_createBackground','index','subjectHitRate','hGhhL','CommandRect','aTgkW','_mainSprite','_encounterCount','Input_update','CommonEventID','_spriteset','XParameterFormula','pagedown','ceil','uvHtD','Unnamed','pCmwD','processEscape','_moveEasingType','AMPERSAND','ParseAllNotetags','cursorUp','Scene_MenuBase_createBackground','_stored_tpCostColor','pctwz','destroyCoreEngineMarkedBitmaps','xparamRate1','VisuMZ_2_BattleSystemPTB','_addShadow','_lastOrigin','number','Scene_Equip_create','_lastX','SlotBgType','_fauxAnimationQueue','itemBackColor1','_buttonType','left','buyWindowRect','evaded','XParamVocab3','translucentOpacity','WovWF','sHXVw','Window_EquipItem_isEnabled','updatePositionCoreEngineShakeOriginal','_index','start','eklWC','up2','fFCti','paramMax','processTouchModernControls','licxd','isHandled','areTileShadowsHidden','indexOf','XtysC','resetFontSettings','ShowDevTools','reservePlayTestNewGameCommonEvent','FadeSpeed','_stored_pendingColor','UNDERSCORE','AGI','AnimationPoint','BaseTexture','_movementWholeDuration','1492736cydxwV','ParamArrow','ygegk','Sprite_Picture_loadBitmap','VYIuK','_clientArea','WIN_ICO_CLEAR','CAPSLOCK','%2%1%3','removeAllFauxAnimations','initBasic','CVjzy','KEEP','Window_NameInput_processTouch','WASD','EQUALS','popScene','open','buttonAssistOk','【%1】\x0a','parseForcedGameTroopSettingsCoreEngine','BTestArmors','createFauxAnimationQueue','DIVIDE','ColorMPGauge1','getColorDataFromPluginParameters','ColorMPGauge2','xTNNI','ATK','isNextScene','TitlePicButtons','ExtDisplayedParams','EditRect','alignBottom','Origin','pfGBK','createBuffer','KiNrc','createPointAnimationSprite','isNumpadPressed','_mode','_cacheScaleX','ModernControls','OnLoadJS','KIFrU','OptionsRect','fillText','updateOrigin','lttJP','IDs','CommandWidth','RpLtS','adjustPictureAntiZoom','DefaultStyle','buttonAssistKey1','FontSize','Scene_MenuBase_createPageButtons','setupValueFont','_digitGroupingEx','KLvqy','UjrVB','HelpBgType','requestPointAnimation','altKey','_stored_mpGaugeColor1','bind','XfqCE','DwERZ','VyTpA','F13','FunctionName','loadBitmap','EfrqD','YcbLP','CANCEL','PlQnz','GoldOverlap','xYodQ','Game_Screen_initialize','includes','_anchor','cHRYM','Game_Event_isCollidedWithEvents','IconSParam7','mFnLr','paramPlus','〘Show\x20Text〙\x0a','right','removeFauxAnimation','viewport','ParamChange','colSpacing','SceneManager_onKeyDown','getLevel','Pixelated','_commonEventLayers','CLOSE_PAREN','_centerElementCoreEngine','SPACE','VSMOA','oyMEa','CoreEngine','setAnchor','IconXParam2','BlurFilter','Scene_Unlisted','return\x200','dQuee','CNayJ','buttonAssistKey4','AllTroops','updateShadow','CLOSE_CURLY_BRACKET','NUvQx','isSideView','Sprite_AnimationMV_processTimingData','BACK_QUOTE','join','F11','updatePositionCoreEngineShakeHorz','CMgWU','process_VisuMZ_CoreEngine_CustomParameters','none','targetScaleY','expRate','disable','scaleMode','width','TLNCE','_clickHandler','Chance','qxXAt','loadSystem','ltwui','SubfolderParse','encounterStepsMinimum','KeyItemProtect','isMenuButtonAssistEnabled','SLASH','INOUTBACK','TRG','length','QoL','MapOnceParallel','ColSpacing','TCFuC','Window','pJtui','gainSilentTp','ProfileRect','processDigitChange','Flat1','statusWindowRect','_targetOffsetY','StatusParamsBgType','Keyboard','text','Scene_Options_create','dLBzg','_pageupButton','drawItem','parallaxes','oLSbX','qFlAl','Game_Action_updateLastTarget','platform','clearForcedGameTroopSettingsCoreEngine','skillTypeWindowRect','itemEva','SystemSetSideView','expGaugeColor2','tab','setAction','DummyRect','Sprite_Actor_setActorHome','initMembersCoreEngine','ColorExpGauge2','process_VisuMZ_CoreEngine_Settings','currentValue','_animation','_battlerName','processKeyboardHandling','_backgroundSprite','updatePosition','NUMPAD6','moveMenuButtonSideButtonLayout','oYOZB','_lastPluginCommandInterpreter','_muteSound','nickname','processMoveCommand','textSizeEx','createButtonAssistWindow','targetPosition','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','URL','StatusEquipBgType','useDigitGroupingEx','TitleCommandList','0.00','_stored_ctGaugeColor2','actor','F22','MTxoC','tilesets','NONCONVERT','Gtmvg','refresh','fontSize','AnimationID','_inputWindow','gQvrC','OPEN_BRACKET','param','ShowJS','missed','slice','HIT','_coreEngineShakeStyle','targetContentsOpacity','terminate','drawActorExpGauge','GameEnd','_baseTexture','guardSkillId','application/json','buttonAssistWindowSideRect','LevelUpFullHp','targetBackOpacity','oTKxA','seVolume','show','HRG','updatePictureCoordinates','max','makeAutoBattleActions','GoukQ','_repositioned','INQUINT','ExtractStrFromList','INQUAD','TeSdm','XAziZ','SParamVocab5','process_VisuMZ_CoreEngine_Functions','drawRightArrow','successRate','context','xparamPlus1','setBackgroundOpacity','KdYIP','mmp','JUNJA','WIN_OEM_RESET','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','_targetAnchor','mainCommandWidth','Script\x20Call\x20Error','movePageButtonSideButtonLayout','Bitmap_strokeRect','F14','LvExpGauge','createDimmerSprite','nFUuy','_origin','setCoreEngineUpdateWindowBg','ZGdLA','createMenuButton','_mirror','paramRateJS','INOUTQUINT','zZnIT','updateData','clearRect','paramValueByName','getInputMultiButtonStrings','paramFlatJS','Max','wrbCq','INCUBIC','ZtcDi','powerUpColor','CTB','_isPlaytest','getInputButtonString','HNbmL','createPointAnimationQueue','centerSprite','dimColor1','eventsXyNt','VOLUME_UP','ParseSkillNotetags','Renderer','stencilFunc','openingSpeed','paramBase','STENCIL_TEST','jbcGk','drawActorLevel','text%1','buttonAssistOffset2','currentExp','stretch','mute','GoldIcon','updateTransform','kmvfz','MxoWT','Scene_Map_updateScene','menu','_skillTypeWindow','createJsQuickFunction','vOvtH','DATABASE','OutlineColorDmg','xFCUB','EndingID','onEscapeSuccess','setBackgroundType','Pmkzt','rdVNn','InputBgType','》Comment《\x0a%1\x0a','isPointAnimationPlaying','OutlineColorGauge','_stored_hpGaugeColor1','ONE','F24','cursorDown','inbounce','Game_Interpreter_command355','SellRect','ScreenShake','ePAez','Abbreviation','QUOTE','NBkCd','exit','markCoreEngineModified','StatusBgType','contains','Game_System_initialize','ItemRect','anchor','EXSEL','qcBAR','toString','WIN_OEM_WSCTRL','removePointAnimation','moveCancelButtonSideButtonLayout','isCursorMovable','onInputOk','child_process','Spriteset_Base_updatePosition','uQzdl','Scene_Map_initialize','setWindowPadding','kjaBw','ParseWeaponNotetags','background','_blank','removeChild','_registerKeyInput','stringKeyMap','keyboard','_pictureContainer','_targetY','PictureShowIcon','F19','CTRL','defineProperty','TextManager_param','xparamRateJS','BgFilename1','FINAL','processCursorMoveModernControls','VisuMZ_2_BattleSystemCTB','BattleSystem','damageColor','anchorCoreEasing','zmbME','command105','setMute','KyNmA','updateEffekseer','gameTitle','IconXParam9','maxLvGaugeColor2','buttonAssistText1','sparamPlus','Spriteset_Base_update','MkpqU','displayY','updateDocumentTitle','retrieveFauxAnimation','ppMlL','maxItems','OUTCUBIC','SLEEP','Window_Selectable_cursorUp','XParamVocab5','equips','_targetScaleY','Window_NumberInput_processDigitChange','DELETE','_menuButton','Input_setupEventHandlers','_createInternalTextures','_shakeDuration','IconParam0','updateKeyText','BuyBgType','MRG','terms','isAnimationOffsetXMirrored','_context','YbFox','DashToggleR','AtjZz','Window_NameInput_processHandling','isMapScrollLinked','_onKeyPress','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','maxLevel','_opening','faceHeight','KRpvY','6320310kzEsJW','Window_NameInput_cursorDown','NumberRect','IconXParam4','_hideButtons','_gamepadWait','_customModified','VaQYS','makeEncounterCount','_pictureName','mapId','drawFace','Bitmap_measureTextWidth','randomJS','code','PixelateImageRendering','drawParamText','REPLACE','Padding','setClickHandler','TRAIT_PARAM','itemPadding','Game_Picture_x','LATIN1','Game_Interpreter_command122','MHVPi','_margin','bitmap','deselect','xBorR','Scene_Name_create','responseText','menuShowButton','Settings','buttonAssistText5','ROCKE','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','moveRelativeToResolutionChange','test','SkillTypeRect','WIN_OEM_FINISH','isTriggered','Graphics_printError','wmQAG','enable','isEnemy','endAnimation','_targetX','onMoveEnd','_numberWindow','EREOF','_makeFontNameText','_closing','animationNextDelay','setFrame','TGcHu','SNGIS','item','XParamVocab1','isClosed','contents','NewGameCommonEventAll','Map%1','targetY','INEXPO','GREATER_THAN','subtitle','layoutSettings','crisisColor','Scene_Boot_onDatabaseLoaded','ExportString','MULTIPLY','ECKYc','suIGa','jtRpN','battlebacks2','CustomParam','UpdatePictureCoordinates','WIN_OEM_FJ_JISHO','CallHandlerJS','rSFUr','mainAreaTop','mpColor','JFYBT','nOqXp','IgORi','log','Ioelx','gaugeHeight','GdBkE','ParseActorNotetags','buttonAssistOffset%1','ApSIE','destroyed','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','HOME','currencyUnit','padZero','GoldMax','Key%1','setHandler','MAX_SAFE_INTEGER','IconXParam8','_stored_normalColor','aYhCK','VTBtK','sparamPlusJS','blendFunc','adjustBoxSize','ColorGaugeBack','usableSkills','setHome','_inputSpecialKeyCode','GetParamIcon','buttonAssistWindowRect','_statusEquipWindow','_cacheScaleY','setActorHome','resize','yCGqX','helpAreaHeight','BackOpacity','Input_pollGamepads','EquipMenu','BTestItems','WIN_OEM_CUSEL','onDatabaseLoaded','drawCharacter','IVhRV','snapForBackground','drawIcon','font-smooth','duration','_baseSprite','zVloQ','sparamPlus2','send','DOLLAR','DwcVL','ForceNoPlayTest','isInputting','Window_NameInput_cursorPageup','NewGameBoot','_active','mainAreaHeight','createDigits','button','F17','Flat2','zWHAh','ColorManager_loadWindowskin','KeySHIFT','ParseClassNotetags','NUM_LOCK','expGaugeColor1','playCursorSound','rSwxg','DrawItemBackgroundJS','F16','Enable','Scene_Skill_create','updateLastTarget','setValue','STRUCT','_tempActor','DvYIz','updateScene','Scene_Item_create','setColorTone','zgHDK','COMMA','FDR','setLastPluginCommandInterpreter','WIN_OEM_JUMP','PTB','evaluate','buttonAreaHeight','ePpan','ELpDo','uaTcY','SParameterFormula','drawIconBySize','_shakeSpeed','_onKeyDown','ttdWY','CKvqr','_tilemap','FontShadows','processCursorMove','SystemSetFontSize','CGMFC','isNwjs','drawNewParam','slotWindowRect','retreat','Map%1.json','requestMotion','Game_Interpreter_command111','getBackgroundOpacity','_opacity','MAT','addChild','NYyKs','_sideButtonLayout','updateWaitMode','hhwSD','eva','_stored_ctGaugeColor1','bgsVolume','ScaleY','LoadMenu','WIN_OEM_CLEAR','XParamVocab6','targetScaleX','Sprite_Picture_updateOrigin','ShopMenu','getCustomBackgroundSettings','Game_Picture_initBasic','INOUTQUART','jhIZo','attackSkillId','drawSegment','isSmartEventCollisionOn','PLUS','setActorHomeRepositioned','ButtonHeight','showPicture','FKlrX','_storedMapText','kHlQu','zesnI','playMiss','mhp','Scene_Map_createSpriteset','resetTextColor','ctrl','NUMPAD5','initialize','targets','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','XOnlb','Graphics','push','isRightInputMode','applyCoreEasing','ScaleX','_stored_crisisColor','type','cancel','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','CreateBattleSystemID','NumberBgType','zImTJ','jFobr','TextStr','backgroundBitmap','SystemSetWindowPadding','MDF','Basic','_scene','playCursor','isPressed','boxHeight','isEnabled','removeAllPointAnimations','createFauxAnimation','helpAreaTop','Subtitle','SwitchToggleOne','LEFT','INSINE','iconHeight','uiAreaHeight','onClick','PositionY','fZWgt','LVWoN','areButtonsOutsideMainUI','isPlaytest','VisuMZ_2_BattleSystemFTB','_animationQueue','_viewportSize','SideView','startNormalGame','SystemSetBattleSystem','cqJqy','pJzXT','Scene_Boot_updateDocumentTitle','Total','MODECHANGE','replace','Bitmap_initialize','Tilemap_addShadow','random','goto','xlnPZ','uiAreaWidth','updatePictureAntiZoom','_shouldPreventDefault','setEnemyAction','bgm','zodNN','xMVIB','DigitGroupingGaugeSprites','%1:\x20Exit\x20','encounterStep','FontSmoothing','command357','sNXqR','CategoryRect','makeFontBigger','SParamVocab1','Graphics_centerElement','performMiss','createTroopNote','traitsPi','catchException','createCustomParameter','ALWAYS','helpAreaTopSideButtonLayout','Mirror','Game_Picture_show','SellBgType','WIN_OEM_COPY','VQrhK','mev','ColorDeath','Sprite_Battler_startMove','ThbHY','list','mainAreaTopSideButtonLayout','IconSParam1','applyForcedGameTroopSettingsCoreEngine','meVolume','Sprite_Button_updateOpacity','ColorCTGauge1','ALTGR'];_0xa960=function(){return _0x442d1e;};return _0xa960();}VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x347547(0x389)]=function(_0x3e173d,_0x336649){const _0x13edc4=_0x347547;for(const _0x3aa9c3 in _0x336649){if(_0x3aa9c3[_0x13edc4(0x249)](/(.*):(.*)/i)){const _0x115f0e=String(RegExp['$1']),_0x4f83c0=String(RegExp['$2'])[_0x13edc4(0x173)]()[_0x13edc4(0x85b)]();let _0x442c4b,_0x32e07e,_0x2b6287;switch(_0x4f83c0){case _0x13edc4(0x321):_0x442c4b=_0x336649[_0x3aa9c3]!==''?Number(_0x336649[_0x3aa9c3]):0x0;break;case _0x13edc4(0x373):_0x32e07e=_0x336649[_0x3aa9c3]!==''?JSON[_0x13edc4(0x8a6)](_0x336649[_0x3aa9c3]):[],_0x442c4b=_0x32e07e['map'](_0x4636d6=>Number(_0x4636d6));break;case'EVAL':_0x442c4b=_0x336649[_0x3aa9c3]!==''?eval(_0x336649[_0x3aa9c3]):null;break;case _0x13edc4(0x323):_0x32e07e=_0x336649[_0x3aa9c3]!==''?JSON[_0x13edc4(0x8a6)](_0x336649[_0x3aa9c3]):[],_0x442c4b=_0x32e07e['map'](_0x11691c=>eval(_0x11691c));break;case'JSON':_0x442c4b=_0x336649[_0x3aa9c3]!==''?JSON[_0x13edc4(0x8a6)](_0x336649[_0x3aa9c3]):'';break;case _0x13edc4(0x33e):_0x32e07e=_0x336649[_0x3aa9c3]!==''?JSON['parse'](_0x336649[_0x3aa9c3]):[],_0x442c4b=_0x32e07e['map'](_0x5492d7=>JSON[_0x13edc4(0x8a6)](_0x5492d7));break;case _0x13edc4(0x88c):_0x442c4b=_0x336649[_0x3aa9c3]!==''?new Function(JSON[_0x13edc4(0x8a6)](_0x336649[_0x3aa9c3])):new Function(_0x13edc4(0x4c5));break;case _0x13edc4(0x1b7):_0x32e07e=_0x336649[_0x3aa9c3]!==''?JSON['parse'](_0x336649[_0x3aa9c3]):[],_0x442c4b=_0x32e07e[_0x13edc4(0x798)](_0x1e71b5=>new Function(JSON['parse'](_0x1e71b5)));break;case _0x13edc4(0x27d):_0x442c4b=_0x336649[_0x3aa9c3]!==''?String(_0x336649[_0x3aa9c3]):'';break;case _0x13edc4(0x884):_0x32e07e=_0x336649[_0x3aa9c3]!==''?JSON[_0x13edc4(0x8a6)](_0x336649[_0x3aa9c3]):[],_0x442c4b=_0x32e07e[_0x13edc4(0x798)](_0x524065=>String(_0x524065));break;case _0x13edc4(0x6a9):_0x2b6287=_0x336649[_0x3aa9c3]!==''?JSON['parse'](_0x336649[_0x3aa9c3]):{},_0x3e173d[_0x115f0e]={},VisuMZ[_0x13edc4(0x389)](_0x3e173d[_0x115f0e],_0x2b6287);continue;case _0x13edc4(0x303):_0x32e07e=_0x336649[_0x3aa9c3]!==''?JSON[_0x13edc4(0x8a6)](_0x336649[_0x3aa9c3]):[],_0x442c4b=_0x32e07e[_0x13edc4(0x798)](_0x5224c1=>VisuMZ['ConvertParams']({},JSON[_0x13edc4(0x8a6)](_0x5224c1)));break;default:continue;}_0x3e173d[_0x115f0e]=_0x442c4b;}}return _0x3e173d;},(_0x2f1243=>{const _0xaca1ac=_0x347547,_0x4b6729=_0x2f1243[_0xaca1ac(0x771)];for(const _0x16e96c of dependencies){if(!Imported[_0x16e96c]){if(_0xaca1ac(0x8d0)!==_0xaca1ac(0x8d0))_0x4aa2f[_0xaca1ac(0x7d7)](_0x542582);else{alert(_0xaca1ac(0x328)[_0xaca1ac(0x83a)](_0x4b6729,_0x16e96c)),SceneManager[_0xaca1ac(0x5ac)]();break;}}}const _0x4c7e91=_0x2f1243[_0xaca1ac(0x2a1)];if(_0x4c7e91['match'](/\[Version[ ](.*?)\]/i)){const _0x5babe2=Number(RegExp['$1']);_0x5babe2!==VisuMZ[label][_0xaca1ac(0x871)]&&(alert(_0xaca1ac(0x6f5)[_0xaca1ac(0x83a)](_0x4b6729,_0x5babe2)),SceneManager[_0xaca1ac(0x5ac)]());}if(_0x4c7e91['match'](/\[Tier[ ](\d+)\]/i)){if(_0xaca1ac(0x25f)!==_0xaca1ac(0x781)){const _0x179bba=Number(RegExp['$1']);if(_0x179bba<tier){if('dcDFk'==='KJMdH')return _0x16c3d1;else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xaca1ac(0x83a)](_0x4b6729,_0x179bba,tier)),SceneManager[_0xaca1ac(0x5ac)]();}else tier=Math[_0xaca1ac(0x545)](_0x179bba,tier);}else this[_0xaca1ac(0x6f3)](...arguments);}VisuMZ[_0xaca1ac(0x389)](VisuMZ[label][_0xaca1ac(0x627)],_0x2f1243[_0xaca1ac(0x878)]);})(pluginData),((()=>{const _0x51b3c1=_0x347547;if(VisuMZ[_0x51b3c1(0x4c0)][_0x51b3c1(0x627)][_0x51b3c1(0x4e9)][_0x51b3c1(0x4e1)]??!![])for(const _0x125dd8 in $plugins){const _0x17e73a=$plugins[_0x125dd8];if(_0x17e73a[_0x51b3c1(0x771)][_0x51b3c1(0x249)](/(.*)\/(.*)/i)){if(_0x51b3c1(0x476)==='cvIyl')return _0x3fa026[_0x51b3c1(0x894)](_0x29fa37,'<','>');else _0x17e73a[_0x51b3c1(0x771)]=String(RegExp['$2'][_0x51b3c1(0x85b)]());}}})()),PluginManager[_0x347547(0xf5)](pluginData['name'],_0x347547(0x458),_0x5c8ce9=>{const _0x17d1e5=_0x347547;if(!SceneManager[_0x17d1e5(0x709)])return;if(!SceneManager[_0x17d1e5(0x709)]['_spriteset'])return;VisuMZ[_0x17d1e5(0x389)](_0x5c8ce9,_0x5c8ce9);const _0x6d4f8e=Math[_0x17d1e5(0x22b)](_0x5c8ce9[_0x17d1e5(0x135)]),_0x1f4a2f=Math[_0x17d1e5(0x22b)](_0x5c8ce9['pointY']);$gameTemp['requestPointAnimation'](_0x6d4f8e,_0x1f4a2f,_0x5c8ce9[_0x17d1e5(0x52c)],_0x5c8ce9[_0x17d1e5(0x746)],_0x5c8ce9[_0x17d1e5(0x21d)]);}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x375),_0x1803a1=>{const _0x2e38bc=_0x347547;if(!$gameTemp[_0x2e38bc(0x71c)]())return;if(!Utils[_0x2e38bc(0x6c5)]())return;SceneManager[_0x2e38bc(0x709)][_0x2e38bc(0x695)]=![],VisuMZ[_0x2e38bc(0x4c0)][_0x2e38bc(0x82c)]();}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x3fd),_0x362fc8=>{const _0x5cd524=_0x347547;if(!$gameTemp[_0x5cd524(0x71c)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x5cd524(0x709)]['_active']=![],VisuMZ[_0x5cd524(0x4c0)][_0x5cd524(0x1ab)]();}),PluginManager['registerCommand'](pluginData[_0x347547(0x771)],_0x347547(0x895),_0x49139e=>{const _0x57626b=_0x347547;if(!$gameTemp[_0x57626b(0x71c)]())return;if(!Utils[_0x57626b(0x6c5)]())return;if(!$gameMap)return;if($gameMap[_0x57626b(0x610)]()<=0x0)return;VisuMZ['ConvertParams'](_0x49139e,_0x49139e);const _0x270318='Map%1'['format']($gameMap[_0x57626b(0x610)]()[_0x57626b(0x667)](0x3)),_0x413189=VisuMZ['CoreEngine'][_0x57626b(0x36d)]($gameMap[_0x57626b(0x610)]());VisuMZ[_0x57626b(0x4c0)][_0x57626b(0x64c)](_0x413189,_0x270318,!![]);}),PluginManager['registerCommand'](pluginData['name'],_0x347547(0x7f7),_0x3b5bfe=>{const _0x1a76fb=_0x347547;if(!$gameTemp[_0x1a76fb(0x71c)]())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x1a76fb(0xfa)]())return;VisuMZ[_0x1a76fb(0x389)](_0x3b5bfe,_0x3b5bfe);const _0x5e087c='Troop%1'[_0x1a76fb(0x83a)]($gameTroop[_0x1a76fb(0x383)][_0x1a76fb(0x667)](0x4)),_0x340b0f=VisuMZ[_0x1a76fb(0x4c0)][_0x1a76fb(0xda)]($gameTroop[_0x1a76fb(0x383)]);VisuMZ[_0x1a76fb(0x4c0)][_0x1a76fb(0x64c)](_0x340b0f,_0x5e087c,!![]);}),VisuMZ[_0x347547(0x4c0)][_0x347547(0x64c)]=function(_0x52ed24,_0x3fed5e,_0x551519){const _0x438b5a=_0x347547,_0x21a5bd=require('fs');let _0x515d9d=_0x438b5a(0x29a)[_0x438b5a(0x83a)](_0x3fed5e||'0');_0x21a5bd['writeFile'](_0x515d9d,_0x52ed24,_0x37722e=>{const _0x1fda87=_0x438b5a;if(_0x37722e){if(_0x1fda87(0x496)===_0x1fda87(0x496))throw err;else{const _0x26d30c=_0x1fda87(0x8c7);this['_colorCache']=this['_colorCache']||{};if(this[_0x1fda87(0x287)][_0x26d30c])return this[_0x1fda87(0x287)][_0x26d30c];const _0x46f2e5=_0x51140c[_0x1fda87(0x4c0)]['Settings']['Color'][_0x1fda87(0x74c)];return this['getColorDataFromPluginParameters'](_0x26d30c,_0x46f2e5);}}else _0x551519&&alert(_0x1fda87(0x40b)['format'](_0x515d9d));});},VisuMZ['CoreEngine'][_0x347547(0x82c)]=function(){const _0x1e4ed7=_0x347547,_0x34d500=[];for(const _0x2c2805 of $dataMapInfos){if(_0x1e4ed7(0x58d)==='hKCnW')return this[_0x1e4ed7(0x291)]()?_0x1719f5['getInputButtonString'](_0x1e4ed7(0x506)):_0x219d15[_0x1e4ed7(0x387)][_0x1e4ed7(0x491)][_0x1e4ed7(0x248)](this);else{if(!_0x2c2805)continue;_0x34d500[_0x1e4ed7(0x6f8)](_0x2c2805['id']);}}const _0xfe3752=_0x34d500['length']*0x64+Math['randomInt'](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x1e4ed7(0x83a)](_0xfe3752)),this[_0x1e4ed7(0x6ea)]=[],this[_0x1e4ed7(0x2c3)]=$dataMap;for(const _0x19a238 of _0x34d500){'ZGdLA'===_0x1e4ed7(0x565)?VisuMZ[_0x1e4ed7(0x4c0)][_0x1e4ed7(0x21a)](_0x19a238):this['removeFauxAnimation'](_0x29c850);}setTimeout(VisuMZ[_0x1e4ed7(0x4c0)]['exportAllMapStrings']['bind'](this),_0xfe3752);},VisuMZ['CoreEngine'][_0x347547(0x21a)]=function(_0x246809){const _0x2d30ab=_0x347547,_0x432041=_0x2d30ab(0x6c9)[_0x2d30ab(0x83a)](_0x246809[_0x2d30ab(0x667)](0x3)),_0x1af4fe=new XMLHttpRequest(),_0x3fd854=_0x2d30ab(0x7f0)+_0x432041;_0x1af4fe[_0x2d30ab(0x46c)](_0x2d30ab(0x81a),_0x3fd854),_0x1af4fe['overrideMimeType'](_0x2d30ab(0x53c)),_0x1af4fe[_0x2d30ab(0x778)]=()=>this[_0x2d30ab(0x1a9)](_0x1af4fe,_0x246809,_0x432041,_0x3fd854),_0x1af4fe[_0x2d30ab(0x154)]=()=>DataManager['onXhrError'](_0x2d30ab(0x343),_0x432041,_0x3fd854),_0x1af4fe[_0x2d30ab(0x68e)]();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x1a9)]=function(_0x5c04bf,_0x256989,_0x15def5,_0x36dad0){const _0x5e40fe=_0x347547;$dataMap=JSON[_0x5e40fe(0x8a6)](_0x5c04bf[_0x5e40fe(0x625)]),DataManager['onLoad']($dataMap),this[_0x5e40fe(0x6ea)][_0x256989]=VisuMZ[_0x5e40fe(0x4c0)]['ExtractStrFromMap'](_0x256989),$dataMap=this['_currentMap'];},VisuMZ[_0x347547(0x4c0)]['exportAllMapStrings']=function(){const _0x440362=_0x347547,_0x597bd3=_0x440362(0x37f);this['_storedMapText'][_0x440362(0x841)](undefined)[_0x440362(0x841)]('')['remove'](null);const _0x25dbad=this['_storedMapText'][_0x440362(0x4d0)](_0x440362(0x13d))[_0x440362(0x85b)]();VisuMZ[_0x440362(0x4c0)][_0x440362(0x64c)](_0x25dbad,_0x597bd3,!![]),SceneManager[_0x440362(0x709)][_0x440362(0x695)]=!![];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x36d)]=function(_0x3bd0ac){const _0x383b47=_0x347547;if(!$dataMap)return'';let _0x29798c='█'[_0x383b47(0xcf)](0x46)+'\x0a\x0a',_0x3f0c9d='═'[_0x383b47(0xcf)](0x46)+'\x0a\x0a',_0x3872ec='';this[_0x383b47(0x4ba)]=0x0;for(const _0x41bc1e of $dataMap['events']){if(!_0x41bc1e)continue;let _0x56ffce=_0x41bc1e['id'],_0x4d2cb5=_0x41bc1e[_0x383b47(0x771)],_0x1ba05f=_0x41bc1e[_0x383b47(0x37d)];for(const _0x330f7c of _0x1ba05f){if('qoeqm'!==_0x383b47(0x3f6)){const _0x4dbea3=_0x1ba05f[_0x383b47(0x44f)](_0x330f7c)+0x1;let _0x501276=_0x3f0c9d+_0x383b47(0x7ed),_0x293fee=VisuMZ[_0x383b47(0x4c0)][_0x383b47(0x54a)](_0x330f7c[_0x383b47(0x74f)]);if(_0x293fee['length']>0x0){if(_0x383b47(0x4ac)!==_0x383b47(0x4ac))_0x14e487&&_0x210eb0['push'](_0x502f59);else{if(_0x3872ec[_0x383b47(0x4e8)]>0x0)_0x3872ec+=_0x3f0c9d+_0x383b47(0x13d);else{if('cbMIX'===_0x383b47(0x49d))return _0x1b436e[_0x383b47(0x4c0)][_0x383b47(0x627)]['UI'][_0x383b47(0x120)];else{const _0x3e6b98=$dataMapInfos[_0x3bd0ac]['name'];_0x3872ec+=_0x29798c+_0x383b47(0x51d)[_0x383b47(0x83a)](_0x3bd0ac,_0x3e6b98||_0x383b47(0x426))+_0x29798c;}}_0x3872ec+=_0x501276[_0x383b47(0x83a)](_0x56ffce,_0x4d2cb5,_0x4dbea3,_0x293fee);}}}else return _0x5571ff[_0x383b47(0x649)]['ItemRect']['call'](this);}}if(_0x3872ec[_0x383b47(0x4e8)]>0x0){if(_0x383b47(0x734)!=='LtgSN')_0x3872ec+=_0x3f0c9d;else return _0x158a70[_0x383b47(0x4c0)][_0x383b47(0x627)][_0x383b47(0x76a)]['ItemBackColor2'];}return _0x3872ec;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x1ab)]=function(){const _0x1b8ca8=_0x347547,_0x4206c1=$dataTroops[_0x1b8ca8(0x4e8)]*0xa+Math[_0x1b8ca8(0x7fc)](0xa);alert(_0x1b8ca8(0x601)['format'](_0x4206c1));const _0x109fe1=[];for(const _0x42d06d of $dataTroops){if(!_0x42d06d)continue;const _0x543bd5=_0x42d06d['id'];_0x109fe1[_0x543bd5]=VisuMZ[_0x1b8ca8(0x4c0)]['ExtractStrFromTroop'](_0x543bd5);}setTimeout(VisuMZ[_0x1b8ca8(0x4c0)][_0x1b8ca8(0x195)][_0x1b8ca8(0x49c)](this,_0x109fe1),_0x4206c1);},VisuMZ[_0x347547(0x4c0)]['ExtractStrFromTroop']=function(_0x57afe9){const _0xfb4060=_0x347547;if(!$dataTroops[_0x57afe9])return'';let _0x1a7efa='█'[_0xfb4060(0xcf)](0x46)+'\x0a\x0a',_0x3260be='═'['repeat'](0x46)+'\x0a\x0a',_0x453282='';this['_commonEventLayers']=0x0;const _0x44bbfd=$dataTroops[_0x57afe9];let _0x1d9334=_0x44bbfd[_0xfb4060(0x37d)];for(const _0x2afb69 of _0x1d9334){const _0x36b8a0=_0x1d9334['indexOf'](_0x2afb69)+0x1;let _0x316124=_0x3260be+_0xfb4060(0x559),_0x1e5b41=VisuMZ[_0xfb4060(0x4c0)][_0xfb4060(0x54a)](_0x2afb69[_0xfb4060(0x74f)]);if(_0x1e5b41['length']>0x0){if(_0xfb4060(0x7d4)===_0xfb4060(0x48e))return 0x0;else _0x453282['length']>0x0?_0x453282+=_0x3260be+'\x0a\x0a\x0a\x0a\x0a':_0x453282+=_0x1a7efa+_0xfb4060(0x371)[_0xfb4060(0x83a)](_0x57afe9,_0x44bbfd[_0xfb4060(0x771)]||'Unnamed')+_0x1a7efa,_0x453282+=_0x316124['format'](_0x36b8a0,_0x1e5b41);}}return _0x453282[_0xfb4060(0x4e8)]>0x0&&('HNbmL'!==_0xfb4060(0x578)?_0x47445c[_0xfb4060(0x2fd)]['image-rendering']=_0xfb4060(0x111):_0x453282+=_0x3260be),_0x453282;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x195)]=function(_0x3eceeb){const _0xc38e79=_0x347547,_0x411bdc=_0xc38e79(0x4c9);_0x3eceeb[_0xc38e79(0x841)](undefined)[_0xc38e79(0x841)]('')[_0xc38e79(0x841)](null);const _0x2ec719=_0x3eceeb[_0xc38e79(0x4d0)](_0xc38e79(0x13d))['trim']();VisuMZ[_0xc38e79(0x4c0)][_0xc38e79(0x64c)](_0x2ec719,_0x411bdc,!![]),SceneManager['_scene']['_active']=!![];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x54a)]=function(_0x2bc9bf){const _0x40a637=_0x347547;let _0x5ae450='\x0a'+'─'[_0x40a637(0xcf)](0x46)+'\x0a',_0x275181='\x0a'+'┄'[_0x40a637(0xcf)](0x46)+'\x0a',_0x18fe1b='';for(const _0x6e39a2 of _0x2bc9bf){if(!_0x6e39a2)continue;if(_0x6e39a2[_0x40a637(0x614)]===0x65)_0x18fe1b+=_0x5ae450+'\x0a',_0x18fe1b+=_0x40a637(0x4b1),_0x6e39a2[_0x40a637(0x878)][0x4]!==''&&_0x6e39a2[_0x40a637(0x878)][0x4]!==undefined&&(_0x18fe1b+=_0x40a637(0x46e)['format'](_0x6e39a2[_0x40a637(0x878)][0x4]));else{if(_0x6e39a2[_0x40a637(0x614)]===0x191)_0x18fe1b+=_0x40a637(0x1ca)[_0x40a637(0x83a)](_0x6e39a2[_0x40a637(0x878)][0x0]);else{if(_0x6e39a2[_0x40a637(0x614)]===0x192){if(_0x40a637(0x317)===_0x40a637(0x317))_0x18fe1b+=_0x5ae450,_0x18fe1b+=_0x40a637(0x2e1)['format'](_0x275181,_0x6e39a2[_0x40a637(0x878)][0x0]+0x1,_0x6e39a2[_0x40a637(0x878)][0x1]);else{const _0x5a18ea=_0x205e11['eventsXyNt'](_0x1ec97f,_0x2c27a7)[_0x40a637(0x1cb)](_0x536ffa=>_0x536ffa[_0x40a637(0x7af)]());return _0x5a18ea[_0x40a637(0x4e8)]>0x0;}}else{if(_0x6e39a2[_0x40a637(0x614)]===0x193){if('jKrVN'!==_0x40a637(0x733))_0x18fe1b+=_0x5ae450,_0x18fe1b+=_0x40a637(0x3a3)[_0x40a637(0x83a)](_0x275181);else return _0x48a719['getBattleSystem']()===0x1;}else{if(_0x6e39a2[_0x40a637(0x614)]===0x194)_0x18fe1b+=_0x5ae450,_0x18fe1b+=_0x40a637(0x388)[_0x40a637(0x83a)](_0x275181);else{if(_0x6e39a2[_0x40a637(0x614)]===0x69)_0x18fe1b+=_0x5ae450+'\x0a',_0x18fe1b+='〘Scrolling\x20Text〙\x0a';else{if(_0x6e39a2[_0x40a637(0x614)]===0x6c)_0x40a637(0x450)!=='XtysC'?(_0x2ed5c7['CoreEngine'][_0x40a637(0xc9)]['call'](this),_0x20d1d8[_0x40a637(0x7f9)]()&&this['moveCancelButtonSideButtonLayout']()):(_0x18fe1b+=_0x5ae450+'\x0a',_0x18fe1b+=_0x40a637(0x59d)[_0x40a637(0x83a)](_0x6e39a2['parameters'][0x0]));else{if(_0x6e39a2[_0x40a637(0x614)]===0x198)_0x40a637(0x898)==='pHqgO'?this[_0x40a637(0x761)]():_0x18fe1b+='%1\x0a'[_0x40a637(0x83a)](_0x6e39a2[_0x40a637(0x878)][0x0]);else{if(_0x6e39a2['code']===0x75){if(_0x40a637(0x72d)===_0x40a637(0x834)){if(_0x48edc9[_0x40a637(0x249)](/backspace/i))return this[_0x40a637(0x676)]===0x8;if(_0x6d20d0[_0x40a637(0x249)](/enter/i))return this[_0x40a637(0x676)]===0xd;if(_0x271201[_0x40a637(0x249)](/escape/i))return this[_0x40a637(0x676)]===0x1b;}else{const _0x5970bf=$dataCommonEvents[_0x6e39a2[_0x40a637(0x878)][0x0]];if(_0x5970bf&&this[_0x40a637(0x4ba)]<=0xa){if('rvsLo'!==_0x40a637(0x64e)){this[_0x40a637(0x4ba)]++;let _0x48f543=VisuMZ[_0x40a637(0x4c0)][_0x40a637(0x54a)](_0x5970bf[_0x40a637(0x74f)]);if(_0x48f543[_0x40a637(0x4e8)]>0x0){if(_0x40a637(0x123)!==_0x40a637(0x1cc))_0x18fe1b+=_0x5ae450,_0x18fe1b+=_0x275181,_0x18fe1b+=_0x40a637(0x1f2)[_0x40a637(0x83a)](_0x5970bf['id'],_0x5970bf['name']),_0x18fe1b+=_0x275181,_0x18fe1b+=_0x48f543,_0x18fe1b+=_0x275181,_0x18fe1b+=_0x40a637(0x2d2)[_0x40a637(0x83a)](_0x5970bf['id'],_0x5970bf['name']),_0x18fe1b+=_0x275181;else{if(_0x556830[_0x40a637(0x76f)][_0x40a637(0x249)](/<SHOW TILE SHADOWS>/i))this[_0x40a637(0x3aa)]=![];if(_0x45c4dd['note'][_0x40a637(0x249)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}}this['_commonEventLayers']--;}else _0x138649=_0x4ffce3(_0xc38f5['$1'])*_0x39d7ca[_0x40a637(0x4da)],_0x2b5762=(0x1-_0x2a5e8c(_0x39d3ee['$2']))*-_0x1a8c8a;}}}}}}}}}}}}if(_0x18fe1b[_0x40a637(0x4e8)]>0x0){if(_0x40a637(0x7a2)===_0x40a637(0x7a2))_0x18fe1b+=_0x5ae450;else return _0x2fc106[_0x40a637(0x4c0)][_0x40a637(0x180)]['call'](this,_0x2cfd6a);}return _0x18fe1b;},PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],'OpenURL',_0x2dbaa0=>{const _0x425c4b=_0x347547;VisuMZ[_0x425c4b(0x389)](_0x2dbaa0,_0x2dbaa0);const _0x23b616=_0x2dbaa0[_0x425c4b(0x51e)];VisuMZ[_0x425c4b(0x32d)](_0x23b616);}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],'GoldChange',_0x5f13a3=>{const _0x460120=_0x347547;VisuMZ[_0x460120(0x389)](_0x5f13a3,_0x5f13a3);const _0x231361=_0x5f13a3[_0x460120(0x295)]||0x0;$gameParty[_0x460120(0x122)](_0x231361);}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x4ea),_0x1e9539=>{const _0x5a032a=_0x347547;if(!SceneManager['isSceneMap']())return;VisuMZ['ConvertParams'](_0x1e9539,_0x1e9539);const _0x81d1c4=_0x1e9539[_0x5a032a(0x420)];SceneManager[_0x5a032a(0x709)][_0x5a032a(0x402)](_0x81d1c4);}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],'PictureCoordinatesMode',_0x447bd5=>{const _0x2c079a=_0x347547;if(!$gameTemp[_0x2c079a(0x71c)]())return;if(!Utils[_0x2c079a(0x6c5)]())return;VisuMZ[_0x2c079a(0x389)](_0x447bd5,_0x447bd5);const _0x10bf0a=_0x447bd5[_0x2c079a(0x79d)]||0x1;$gameTemp[_0x2c079a(0x158)]=_0x10bf0a;}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x290),_0xce238c=>{const _0x54f62a=_0x347547;VisuMZ[_0x54f62a(0x389)](_0xce238c,_0xce238c);const _0x3b64d5=_0xce238c['pictureId']||0x1,_0x29b997=_0xce238c['easingType']||_0x54f62a(0x19b),_0x50eada=$gameScreen[_0x54f62a(0x1b0)](_0x3b64d5);_0x50eada&&_0x50eada[_0x54f62a(0x867)](_0x29b997);}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],'PictureEraseAll',_0x277a7c=>{const _0x4869a2=_0x347547;for(let _0x16ce12=0x1;_0x16ce12<=0x64;_0x16ce12++){'yqACz'===_0x4869a2(0x3f8)?$gameScreen[_0x4869a2(0x7d7)](_0x16ce12):this[_0x4869a2(0x767)]();}}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0xc5),_0x259bc6=>{const _0x277bc9=_0x347547;VisuMZ['ConvertParams'](_0x259bc6,_0x259bc6);const _0x5c64d4=Math[_0x277bc9(0x143)](_0x259bc6[_0x277bc9(0x14a)],_0x259bc6[_0x277bc9(0x597)]),_0x528f0e=Math[_0x277bc9(0x545)](_0x259bc6[_0x277bc9(0x14a)],_0x259bc6[_0x277bc9(0x597)]);for(let _0x6daa1e=_0x5c64d4;_0x6daa1e<=_0x528f0e;_0x6daa1e++){_0x277bc9(0x1ce)!==_0x277bc9(0x3db)?$gameScreen[_0x277bc9(0x7d7)](_0x6daa1e):this[_0x277bc9(0x7cb)]();}}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x5ca),_0x4869c9=>{const _0x116da5=_0x347547;VisuMZ['ConvertParams'](_0x4869c9,_0x4869c9);const _0xedf38f=Math['round'](_0x4869c9['PictureID'])[_0x116da5(0x2a2)](0x1,0x64),_0x11f407=_0x4869c9[_0x116da5(0x627)],_0x4b95e3=_0x11f407['Origin'][_0x116da5(0x2a2)](0x0,0x1),_0x453843=Math[_0x116da5(0x22b)](_0x11f407[_0x116da5(0x3d3)]||0x0),_0x28c712=Math['round'](_0x11f407[_0x116da5(0x718)]||0x0),_0x26fc7d=Math['round'](_0x11f407[_0x116da5(0x6fb)]||0x0),_0x599a2b=Math[_0x116da5(0x22b)](_0x11f407[_0x116da5(0x6d7)]||0x0),_0x3db208=Math[_0x116da5(0x22b)](_0x11f407[_0x116da5(0x394)])[_0x116da5(0x2a2)](0x0,0xff),_0xd4c1b9=_0x11f407[_0x116da5(0x166)],_0x2b0a41=_0x116da5(0x62a),_0x1d9bf1=_0x4869c9[_0x116da5(0x26a)]?'Smooth':_0x116da5(0x4b9),_0x596836=_0x2b0a41['format'](_0x4869c9[_0x116da5(0x137)],_0x1d9bf1);$gameScreen[_0x116da5(0x6e8)](_0xedf38f,_0x596836,_0x4b95e3,_0x453843,_0x28c712,_0x26fc7d,_0x599a2b,_0x3db208,_0xd4c1b9);}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x5a7),_0x23a490=>{const _0x35aee9=_0x347547;VisuMZ[_0x35aee9(0x389)](_0x23a490,_0x23a490);const _0x36a2a4=_0x23a490['Type']||_0x35aee9(0x72b),_0x24b2e3=_0x23a490['Power'][_0x35aee9(0x2a2)](0x1,0x9),_0x539c5f=_0x23a490[_0x35aee9(0xd1)][_0x35aee9(0x2a2)](0x1,0x9),_0x57099a=_0x23a490[_0x35aee9(0x7c0)]||0x1,_0x5328ae=_0x23a490[_0x35aee9(0x83b)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x36a2a4),$gameScreen[_0x35aee9(0x33d)](_0x24b2e3,_0x539c5f,_0x57099a);if(_0x5328ae){const _0xcef290=$gameTemp[_0x35aee9(0x7fe)]();if(_0xcef290)_0xcef290[_0x35aee9(0x16d)](_0x57099a);}}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x6c3),_0x486f84=>{const _0xd54ebe=_0x347547;VisuMZ[_0xd54ebe(0x389)](_0x486f84,_0x486f84);const _0xe549e=_0x486f84[_0xd54ebe(0x279)]||0x1;$gameSystem[_0xd54ebe(0x18d)](_0xe549e);}),PluginManager['registerCommand'](pluginData[_0x347547(0x771)],_0x347547(0x504),_0x2f97b1=>{const _0x1ad1c4=_0x347547;if($gameParty['inBattle']())return;VisuMZ[_0x1ad1c4(0x389)](_0x2f97b1,_0x2f97b1);const _0x1a2693=_0x2f97b1[_0x1ad1c4(0x279)];if(_0x1a2693[_0x1ad1c4(0x249)](/Front/i))'gGyhz'!=='gGyhz'?_0x96512e[_0x1ad1c4(0x4c0)][_0x1ad1c4(0x21c)][_0x1ad1c4(0x248)](this):$gameSystem[_0x1ad1c4(0x3ee)](![]);else _0x1a2693[_0x1ad1c4(0x249)](/Side/i)?'bxyxO'===_0x1ad1c4(0x2ff)?$gameSystem[_0x1ad1c4(0x3ee)](!![]):_0x2f9e18[_0x1ad1c4(0x71d)]&&(this[_0x1ad1c4(0x3c9)]=_0x1ad1c4(0x109)):$gameSystem['setSideView'](!$gameSystem['isSideView']());}),PluginManager['registerCommand'](pluginData[_0x347547(0x771)],'SystemLoadAudio',_0x135a5c=>{const _0x5721db=_0x347547;if($gameParty[_0x5721db(0xfa)]())return;VisuMZ[_0x5721db(0x389)](_0x135a5c,_0x135a5c);const _0x2ab35a=[_0x5721db(0x732),_0x5721db(0x3d5),'me','se'];for(const _0xb23d3f of _0x2ab35a){if(_0x5721db(0x1c6)!=='XIRYn'){const _0x52803=_0x135a5c[_0xb23d3f],_0x177a48=_0x5721db(0x8b0)['format'](_0xb23d3f);for(const _0x5be29c of _0x52803){AudioManager[_0x5721db(0x47f)](_0x177a48,_0x5be29c);}}else{if(_0x1039c7[_0x5721db(0x71c)]())_0x11b31a[_0x5721db(0x65c)](_0x385bf3);}}}),PluginManager['registerCommand'](pluginData[_0x347547(0x771)],'SystemLoadImages',_0x112350=>{const _0xdcb03d=_0x347547;if($gameParty['inBattle']())return;VisuMZ[_0xdcb03d(0x389)](_0x112350,_0x112350);const _0x51f666=['animations',_0xdcb03d(0x2de),'battlebacks2','characters',_0xdcb03d(0x1d4),_0xdcb03d(0x250),_0xdcb03d(0x4fc),_0xdcb03d(0x22a),_0xdcb03d(0x809),_0xdcb03d(0x3f5),_0xdcb03d(0x39c),'tilesets','titles1',_0xdcb03d(0x780)];for(const _0x5dbae5 of _0x51f666){const _0x4868e5=_0x112350[_0x5dbae5],_0x25a16c=_0xdcb03d(0x887)['format'](_0x5dbae5);for(const _0x14590b of _0x4868e5){ImageManager[_0xdcb03d(0x4a2)](_0x25a16c,_0x14590b);}}}),PluginManager[_0x347547(0xf5)](pluginData['name'],_0x347547(0xdc),_0x4fe0ec=>{const _0x48effb=_0x347547;if($gameParty['inBattle']())return;VisuMZ[_0x48effb(0x389)](_0x4fe0ec,_0x4fe0ec);const _0xa0a543=_0x4fe0ec[_0x48effb(0x48c)],_0x8f7564=(_0x4fe0ec[_0x48effb(0x4dd)]||0x0)/0x64;for(const _0x244a6f of _0xa0a543){if(_0x48effb(0x191)==='HYeEZ')_0x42336c['isPlaytest']()&&_0x38a2d3[_0x48effb(0x4c0)][_0x48effb(0x627)][_0x48effb(0x4e9)][_0x48effb(0x2ab)]&&(_0x3ba390['_playTestFastMode']=!_0x4e967a[_0x48effb(0x8c9)]);else{const _0x2048b2=Math[_0x48effb(0x72b)]()<=_0x8f7564;$gameSwitches[_0x48effb(0x6a8)](_0x244a6f,_0x2048b2);}}}),PluginManager['registerCommand'](pluginData[_0x347547(0x771)],_0x347547(0x2eb),_0x4a1eb0=>{const _0x9a7b79=_0x347547;if($gameParty['inBattle']())return;VisuMZ[_0x9a7b79(0x389)](_0x4a1eb0,_0x4a1eb0);const _0x2d5f49=Math['min'](_0x4a1eb0[_0x9a7b79(0x14a)],_0x4a1eb0[_0x9a7b79(0x597)]),_0x3d6bef=Math['max'](_0x4a1eb0[_0x9a7b79(0x14a)],_0x4a1eb0['EndingID']),_0x39c629=(_0x4a1eb0[_0x9a7b79(0x4dd)]||0x0)/0x64;for(let _0x55037d=_0x2d5f49;_0x55037d<=_0x3d6bef;_0x55037d++){const _0x4ebd83=Math[_0x9a7b79(0x72b)]()<=_0x39c629;$gameSwitches[_0x9a7b79(0x6a8)](_0x55037d,_0x4ebd83);}}),PluginManager[_0x347547(0xf5)](pluginData['name'],_0x347547(0x712),_0x4285ca=>{const _0x2ef54a=_0x347547;if($gameParty[_0x2ef54a(0xfa)]())return;VisuMZ[_0x2ef54a(0x389)](_0x4285ca,_0x4285ca);const _0x3b259e=_0x4285ca[_0x2ef54a(0x48c)];for(const _0x3aa09c of _0x3b259e){const _0x2ec6cb=$gameSwitches[_0x2ef54a(0x295)](_0x3aa09c);$gameSwitches[_0x2ef54a(0x6a8)](_0x3aa09c,!_0x2ec6cb);}}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x848),_0x48665e=>{const _0x4d25bb=_0x347547;if($gameParty['inBattle']())return;VisuMZ[_0x4d25bb(0x389)](_0x48665e,_0x48665e);const _0x49722e=Math[_0x4d25bb(0x143)](_0x48665e[_0x4d25bb(0x14a)],_0x48665e['EndingID']),_0x388879=Math[_0x4d25bb(0x545)](_0x48665e['StartID'],_0x48665e[_0x4d25bb(0x597)]);for(let _0xa5dc0=_0x49722e;_0xa5dc0<=_0x388879;_0xa5dc0++){const _0x3e90d0=$gameSwitches['value'](_0xa5dc0);$gameSwitches[_0x4d25bb(0x6a8)](_0xa5dc0,!_0x3e90d0);}}),PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x722),_0x285f44=>{const _0x268bbd=_0x347547;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x285f44,_0x285f44);const _0xf3e8dc=_0x285f44[_0x268bbd(0x279)][_0x268bbd(0x173)]()[_0x268bbd(0x85b)](),_0x2fa4f2=VisuMZ[_0x268bbd(0x4c0)][_0x268bbd(0x700)](_0xf3e8dc);$gameSystem[_0x268bbd(0xf4)](_0x2fa4f2);}),VisuMZ[_0x347547(0x4c0)][_0x347547(0x700)]=function(_0x56f7a4){const _0x1ad356=_0x347547;_0x56f7a4=_0x56f7a4||_0x1ad356(0x594),_0x56f7a4=String(_0x56f7a4)[_0x1ad356(0x173)]()[_0x1ad356(0x85b)]();switch(_0x56f7a4){case _0x1ad356(0x7c2):return 0x0;case _0x1ad356(0x2c5):if(Imported[_0x1ad356(0xd8)]){if(_0x1ad356(0x6b7)===_0x1ad356(0x3bc)){const _0x4ecb85=this[_0x1ad356(0x7a7)]()-this[_0x1ad356(0x61b)]()*0x2;this[_0x1ad356(0x616)](_0x2e2088,_0x2ebef7,_0x4ecb85,_0x11c619,![]);}else ConfigManager[_0x1ad356(0x30f)]=!![];}return 0x1;case _0x1ad356(0x2ec):Imported[_0x1ad356(0xd8)]&&(ConfigManager[_0x1ad356(0x30f)]=![]);return 0x2;case'CTB':if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x1ad356(0x575);break;case _0x1ad356(0x7e3):if(Imported[_0x1ad356(0x3c1)])return'CGBzT'===_0x1ad356(0x140)?_0x1ad356(0x7e3):_0x339fde[_0x1ad356(0x4c0)][_0x1ad356(0x627)][_0x1ad356(0x4e9)]['ImprovedAccuracySystem']?this[_0x1ad356(0x183)](_0x1939d6):_0x422ffc[_0x1ad356(0x4c0)][_0x1ad356(0x103)][_0x1ad356(0x248)](this,_0x84747f);break;case _0x1ad356(0x220):if(Imported[_0x1ad356(0x335)]){if(_0x1ad356(0x584)!==_0x1ad356(0x7e5))return'BTB';else _0x2165e9['VisuMZ_2_BattleSystemSTB']&&(this[_0x1ad356(0x3c9)]='STB');}break;case _0x1ad356(0x109):if(Imported[_0x1ad356(0x71d)])return _0x1ad356(0x109);break;case _0x1ad356(0x246):if(Imported['VisuMZ_2_BattleSystemOTB'])return'OTB';break;case _0x1ad356(0x82f):if(Imported[_0x1ad356(0x352)])return _0x1ad356(0x82f);break;case _0x1ad356(0x6b4):if(Imported['VisuMZ_2_BattleSystemPTB']){if('pPQpM'==='asHll')_0x69701c+=_0x4e6bbb,_0x4d82eb+='%1〘Choice\x20%2〙\x20%3%1'['format'](_0x1e5db5,_0x3ccc8e[_0x1ad356(0x878)][0x0]+0x1,_0x52296e[_0x1ad356(0x878)][0x1]);else return _0x1ad356(0x6b4);}break;}return $dataSystem[_0x1ad356(0x13a)];},PluginManager[_0x347547(0xf5)](pluginData[_0x347547(0x771)],_0x347547(0x706),_0x6e5aff=>{const _0x40d20a=_0x347547;VisuMZ[_0x40d20a(0x389)](_0x6e5aff,_0x6e5aff);const _0x1158cd=_0x6e5aff['option']||0x1;$gameSystem[_0x40d20a(0x5bf)](_0x1158cd);}),VisuMZ[_0x347547(0x4c0)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x347547(0x684)],Scene_Boot[_0x347547(0x387)][_0x347547(0x684)]=function(){const _0x5b5119=_0x347547;VisuMZ['CoreEngine'][_0x5b5119(0x64b)][_0x5b5119(0x248)](this),this[_0x5b5119(0x312)](),this[_0x5b5119(0x32c)](),this[_0x5b5119(0x50c)](),this[_0x5b5119(0x54f)](),this[_0x5b5119(0x4d4)](),VisuMZ[_0x5b5119(0x42b)]();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x7dc)]={},Scene_Boot[_0x347547(0x387)][_0x347547(0x312)]=function(){const _0x19dd78=_0x347547,_0x19d15d=[_0x19dd78(0x2aa),_0x19dd78(0x7a4),_0x19dd78(0x477),'DEF',_0x19dd78(0x6ce),_0x19dd78(0x707),_0x19dd78(0x457),'LUK'],_0x68a931=['HIT',_0x19dd78(0x28a),_0x19dd78(0x302),_0x19dd78(0x337),_0x19dd78(0x14f),_0x19dd78(0x266),_0x19dd78(0xfb),'HRG',_0x19dd78(0x5f7),'TRG'],_0x436efd=['TGR',_0x19dd78(0x3c2),_0x19dd78(0x24b),'PHA','MCR',_0x19dd78(0x412),'PDR',_0x19dd78(0x3a6),_0x19dd78(0x6b1),_0x19dd78(0x810)],_0x21510d=[_0x19d15d,_0x68a931,_0x436efd],_0xa4fc5d=[_0x19dd78(0x1a4),_0x19dd78(0x29c),_0x19dd78(0x795),_0x19dd78(0x570),_0x19dd78(0x115),_0x19dd78(0x8d4),_0x19dd78(0x84a),'Flat',_0x19dd78(0x4f2),_0x19dd78(0x69a)];for(const _0x96b560 of _0x21510d){let _0x3f2106='';if(_0x96b560===_0x19d15d)_0x3f2106='param';if(_0x96b560===_0x68a931)_0x3f2106='xparam';if(_0x96b560===_0x436efd)_0x3f2106=_0x19dd78(0x87d);for(const _0x448f14 of _0xa4fc5d){if(_0x19dd78(0x573)==='ZtcDi'){let _0x16bcdd='%1%2'[_0x19dd78(0x83a)](_0x3f2106,_0x448f14);VisuMZ[_0x19dd78(0x4c0)][_0x19dd78(0x7dc)][_0x16bcdd]=[],VisuMZ['CoreEngine'][_0x19dd78(0x7dc)][_0x16bcdd+'JS']=[];let _0xe8fb5f=_0x19dd78(0x77d);if([_0x19dd78(0x1a4),_0x19dd78(0x2dc)][_0x19dd78(0x4aa)](_0x448f14)){if('dLBzg'!==_0x19dd78(0x4f9)){this[_0x19dd78(0x351)][_0x19dd78(0x841)](_0x3fff14),this[_0x19dd78(0x89d)]['removeChild'](_0x3fcaed);for(const _0x455ef6 of _0x235521['targetObjects']){_0x455ef6[_0x19dd78(0x634)]&&_0x455ef6[_0x19dd78(0x634)]();}_0x5dbe4f[_0x19dd78(0x264)]();}else _0xe8fb5f+=_0x19dd78(0x255);}else{if(['Plus1','Flat1'][_0x19dd78(0x4aa)](_0x448f14))_0x19dd78(0x2bc)!==_0x19dd78(0x2bc)?_0x2336d3[_0x19dd78(0x4c0)][_0x19dd78(0x468)]['call'](this):_0xe8fb5f+=_0x19dd78(0x1e2);else{if([_0x19dd78(0x795),_0x19dd78(0x69a)][_0x19dd78(0x4aa)](_0x448f14))_0xe8fb5f+=_0x19dd78(0x6ff);else{if(_0x448f14==='Max'){if(_0x19dd78(0x427)!==_0x19dd78(0x800))_0xe8fb5f+='(\x5cd+)>';else return 0x0;}else{if(_0x448f14===_0x19dd78(0x8d4))_0xe8fb5f+=_0x19dd78(0x31e);else{if(_0x448f14===_0x19dd78(0x84a)){if(_0x19dd78(0x199)===_0x19dd78(0x199))_0xe8fb5f+='(\x5cd+\x5c.?\x5cd+)>';else{if(this[_0x19dd78(0x186)]){const _0x25bb67=this[_0x19dd78(0x186)][_0x19dd78(0x621)],_0x278f84=this['width'],_0x5ac99b=this[_0x19dd78(0xe4)],_0x19d1cf=this[_0x19dd78(0x7a6)],_0x47aacc=_0x4127c9['dimColor1'](),_0x3ba062=_0x5acbcf[_0x19dd78(0xe7)]();_0x25bb67[_0x19dd78(0x67c)](_0x278f84,_0x5ac99b),_0x25bb67[_0x19dd78(0x16f)](0x0,0x0,_0x278f84,_0x19d1cf,_0x3ba062,_0x47aacc,!![]),_0x25bb67['fillRect'](0x0,_0x19d1cf,_0x278f84,_0x5ac99b-_0x19d1cf*0x2,_0x47aacc),_0x25bb67['gradientFillRect'](0x0,_0x5ac99b-_0x19d1cf,_0x278f84,_0x19d1cf,_0x47aacc,_0x3ba062,!![]),this[_0x19dd78(0x186)][_0x19dd78(0x63c)](0x0,0x0,_0x278f84,_0x5ac99b);}}}}}}}}for(const _0x1953e3 of _0x96b560){if(_0x19dd78(0x1fa)!==_0x19dd78(0x305)){let _0x508977=_0x448f14[_0x19dd78(0x728)](/[\d+]/g,'')[_0x19dd78(0x173)]();const _0x47b4ac=_0xe8fb5f[_0x19dd78(0x83a)](_0x1953e3,_0x508977);VisuMZ[_0x19dd78(0x4c0)][_0x19dd78(0x7dc)][_0x16bcdd]['push'](new RegExp(_0x47b4ac,'i'));const _0x201d6f=_0x19dd78(0x367)[_0x19dd78(0x83a)](_0x1953e3,_0x508977);VisuMZ[_0x19dd78(0x4c0)][_0x19dd78(0x7dc)][_0x16bcdd+'JS'][_0x19dd78(0x6f8)](new RegExp(_0x201d6f,'i'));}else this[_0x19dd78(0x308)]();}}else{const _0x583c79=_0xdef06e[_0x19dd78(0x7fe)]();if(_0x583c79)_0x583c79[_0x19dd78(0x16d)](_0x459d4b);}}}},Scene_Boot['prototype'][_0x347547(0x32c)]=function(){const _0x185469=_0x347547;if(VisuMZ[_0x185469(0x42b)])return;},Scene_Boot['prototype'][_0x347547(0x50c)]=function(){const _0x32279f=_0x347547,_0x55da49=VisuMZ[_0x32279f(0x4c0)][_0x32279f(0x627)];_0x55da49['QoL'][_0x32279f(0x363)]&&VisuMZ[_0x32279f(0x452)](!![]);_0x55da49[_0x32279f(0x4e9)]['ModernControls']&&(_0x32279f(0x4e0)===_0x32279f(0x4e0)?(Input[_0x32279f(0x23d)][0x23]=_0x32279f(0x341),Input[_0x32279f(0x23d)][0x24]=_0x32279f(0x7e9)):this[_0x32279f(0x3c9)]=0x1);if(_0x55da49[_0x32279f(0x13e)]){const _0x2ab5b5=_0x55da49[_0x32279f(0x13e)];_0x2ab5b5[_0x32279f(0x69d)]=_0x2ab5b5[_0x32279f(0x69d)]||_0x32279f(0x789),_0x2ab5b5[_0x32279f(0x251)]=_0x2ab5b5[_0x32279f(0x251)]||_0x32279f(0x8a0);}_0x55da49[_0x32279f(0x3f0)][_0x32279f(0x469)]&&(Input['keyMapper'][0x57]='up',Input['keyMapper'][0x41]=_0x32279f(0x43c),Input['keyMapper'][0x53]=_0x32279f(0x77b),Input['keyMapper'][0x44]=_0x32279f(0x4b2),Input['keyMapper'][0x45]='pagedown');if(_0x55da49['KeyboardInput'][_0x32279f(0x5fc)]){if(_0x32279f(0x4af)===_0x32279f(0x32f)){if(_0x44453e['subtitle']==='')return![];if(_0x38732c[_0x32279f(0x648)]===_0x32279f(0x711))return![];if(_0x4331f7['version']==='')return![];if(_0x1f9458[_0x32279f(0x871)]==='0.00')return![];return!![];}else Input[_0x32279f(0x23d)][0x52]='dashToggle';}_0x55da49[_0x32279f(0x8a1)][_0x32279f(0x1fb)]=_0x55da49[_0x32279f(0x8a1)]['DisplayedParams'][_0x32279f(0x798)](_0xa53954=>_0xa53954[_0x32279f(0x173)]()['trim']()),_0x55da49[_0x32279f(0x8a1)][_0x32279f(0x47a)]=_0x55da49['Param']['ExtDisplayedParams']['map'](_0x5ba3dc=>_0x5ba3dc[_0x32279f(0x173)]()[_0x32279f(0x85b)]());},Scene_Boot[_0x347547(0x387)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x35db3f=_0x347547;this[_0x35db3f(0x407)]();},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x317432=_0x347547,_0x470435=VisuMZ[_0x317432(0x4c0)]['Settings'][_0x317432(0x2a8)];for(const _0x1d2e92 of _0x470435){const _0x78a02d=_0x1d2e92[_0x317432(0x4a1)][_0x317432(0x728)](/[ ]/g,''),_0x4ce056=_0x1d2e92[_0x317432(0x258)];VisuMZ[_0x317432(0x4c0)][_0x317432(0x592)](_0x78a02d,_0x4ce056);}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x592)]=function(_0x3bca65,_0x50364a){const _0x37c003=_0x347547;if(!!window[_0x3bca65]){if($gameTemp[_0x37c003(0x71c)]())console[_0x37c003(0x65c)](_0x37c003(0x664)[_0x37c003(0x83a)](_0x3bca65));}const _0x5d263b='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x37c003(0x83a)](_0x3bca65,_0x50364a);window[_0x3bca65]=new Function(_0x5d263b);},Scene_Boot[_0x347547(0x387)][_0x347547(0x4d4)]=function(){const _0x34686c=_0x347547,_0x3384e5=VisuMZ[_0x34686c(0x4c0)][_0x34686c(0x627)][_0x34686c(0x652)];if(!_0x3384e5)return;for(const _0x5903b9 of _0x3384e5){if('SNGIS'!==_0x34686c(0x63e))_0x140756=_0x89b810['round'](_0x511db8),_0x3da7d1=_0x31d950['round'](_0x1097f4),_0x176a3f[_0x34686c(0x4c0)][_0x34686c(0x859)][_0x34686c(0x248)](this,_0x4d6bae,_0x4611f6,_0x3f66cb);else{if(!_0x5903b9)continue;VisuMZ[_0x34686c(0x4c0)][_0x34686c(0x743)](_0x5903b9);}}},VisuMZ['CoreEngine'][_0x347547(0x267)]={},VisuMZ[_0x347547(0x4c0)][_0x347547(0x2f4)]={},VisuMZ[_0x347547(0x4c0)][_0x347547(0x11f)]={},VisuMZ[_0x347547(0x4c0)][_0x347547(0x212)]={},VisuMZ[_0x347547(0x4c0)][_0x347547(0x743)]=function(_0x18c55e){const _0x123c97=_0x347547,_0x1b3d81=_0x18c55e[_0x123c97(0x5a9)],_0x3ce259=_0x18c55e['ParamName'],_0x4df6b4=_0x18c55e[_0x123c97(0x8b3)],_0x22a6e5=_0x18c55e[_0x123c97(0x114)],_0x56b2ad=new Function(_0x18c55e['ValueJS']);VisuMZ[_0x123c97(0x4c0)][_0x123c97(0x267)][_0x1b3d81[_0x123c97(0x173)]()['trim']()]=_0x3ce259,VisuMZ[_0x123c97(0x4c0)][_0x123c97(0x2f4)][_0x1b3d81[_0x123c97(0x173)]()[_0x123c97(0x85b)]()]=_0x4df6b4,VisuMZ[_0x123c97(0x4c0)][_0x123c97(0x11f)][_0x1b3d81[_0x123c97(0x173)]()[_0x123c97(0x85b)]()]=_0x22a6e5,VisuMZ[_0x123c97(0x4c0)]['CustomParamAbb'][_0x1b3d81[_0x123c97(0x173)]()[_0x123c97(0x85b)]()]=_0x1b3d81,Object[_0x123c97(0x5cd)](Game_BattlerBase[_0x123c97(0x387)],_0x1b3d81,{'get'(){const _0x303b98=_0x123c97,_0x3f7550=_0x56b2ad[_0x303b98(0x248)](this);return _0x22a6e5===_0x303b98(0x400)?Math[_0x303b98(0x22b)](_0x3f7550):_0x3f7550;}});},VisuMZ[_0x347547(0x42b)]=function(){const _0x447ab3=_0x347547;for(const _0x7cf493 of $dataActors){if(_0x7cf493)VisuMZ['ParseActorNotetags'](_0x7cf493);}for(const _0x249020 of $dataClasses){if(_0x249020)VisuMZ[_0x447ab3(0x69e)](_0x249020);}for(const _0x4cc75f of $dataSkills){if(_0x4cc75f)VisuMZ[_0x447ab3(0x57e)](_0x4cc75f);}for(const _0x3221b9 of $dataItems){if(_0x3221b9)VisuMZ[_0x447ab3(0x277)](_0x3221b9);}for(const _0x19f461 of $dataWeapons){if(_0x19f461)VisuMZ[_0x447ab3(0x5c1)](_0x19f461);}for(const _0x1539ce of $dataArmors){if(_0x447ab3(0x222)===_0x447ab3(0x222)){if(_0x1539ce)VisuMZ[_0x447ab3(0x1a0)](_0x1539ce);}else return _0x495a40[_0x447ab3(0x4f6)]||_0x447ab3(0x4f6);}for(const _0x31c5c5 of $dataEnemies){if(_0x31c5c5)VisuMZ[_0x447ab3(0x768)](_0x31c5c5);}for(const _0x1ac33f of $dataStates){if('JOlSj'!=='JOlSj'){if(this['_scene'][_0x447ab3(0x2c9)])this[_0x447ab3(0x709)][_0x447ab3(0x2c9)]['refresh']();if(this[_0x447ab3(0x709)][_0x447ab3(0x1f9)])this[_0x447ab3(0x709)]['_listWindow'][_0x447ab3(0x52a)]();}else{if(_0x1ac33f)VisuMZ[_0x447ab3(0x281)](_0x1ac33f);}}for(const _0x3cda0b of $dataTilesets){if(_0x447ab3(0x526)!==_0x447ab3(0x526))_0x250014+=_0x246683[_0x447ab3(0x387)][_0x447ab3(0x3a9)]();else{if(_0x3cda0b)VisuMZ[_0x447ab3(0x2da)](_0x3cda0b);}}},VisuMZ[_0x347547(0x660)]=function(_0x4563a3){},VisuMZ['ParseClassNotetags']=function(_0x2d4433){},VisuMZ[_0x347547(0x57e)]=function(_0x5e01c6){},VisuMZ[_0x347547(0x277)]=function(_0x4cda1c){},VisuMZ[_0x347547(0x5c1)]=function(_0x14627b){},VisuMZ[_0x347547(0x1a0)]=function(_0x487a15){},VisuMZ[_0x347547(0x768)]=function(_0x4133b1){},VisuMZ['ParseStateNotetags']=function(_0x3b1343){},VisuMZ[_0x347547(0x2da)]=function(_0x384e63){},VisuMZ['CoreEngine'][_0x347547(0x660)]=VisuMZ[_0x347547(0x660)],VisuMZ['ParseActorNotetags']=function(_0x522d99){const _0x51a95b=_0x347547;VisuMZ[_0x51a95b(0x4c0)][_0x51a95b(0x660)]['call'](this,_0x522d99);const _0x1d78aa=_0x522d99[_0x51a95b(0x76f)];if(_0x1d78aa[_0x51a95b(0x249)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x51a95b(0x372)==='STVwN'){let _0x392c83=0x0,_0x24a55d=_0x130cf0[_0x51a95b(0xe4)]-this['lineHeight'](),_0xf65f51=_0x181e7d[_0x51a95b(0x4da)],_0x48440b=this['lineHeight']();return new _0x3ef502(_0x392c83,_0x24a55d,_0xf65f51,_0x48440b);}else{_0x522d99[_0x51a95b(0x602)]=Number(RegExp['$1']);if(_0x522d99[_0x51a95b(0x602)]===0x0)_0x522d99[_0x51a95b(0x602)]=Number[_0x51a95b(0x66b)];}}_0x1d78aa[_0x51a95b(0x249)](/<INITIAL LEVEL:[ ](\d+)>/i)&&('piPoP'!=='piPoP'?_0x58fe7f[_0x51a95b(0x4d9)]=_0x1df9cc[_0x51a95b(0x7d6)]['NEAREST']:_0x522d99[_0x51a95b(0x823)]=Math['min'](Number(RegExp['$1']),_0x522d99[_0x51a95b(0x602)]));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x69e)]=VisuMZ[_0x347547(0x69e)],VisuMZ[_0x347547(0x69e)]=function(_0x46e2a4){const _0x228083=_0x347547;VisuMZ[_0x228083(0x4c0)][_0x228083(0x69e)]['call'](this,_0x46e2a4);if(_0x46e2a4[_0x228083(0x25c)]){if(_0x228083(0x4c6)===_0x228083(0x4c6))for(const _0xc476d4 of _0x46e2a4[_0x228083(0x25c)]){if(_0x228083(0x874)!==_0x228083(0x874)){_0x535116[_0x228083(0x389)](_0x8f446b,_0x40a404);const _0x27790=_0x1855b9[_0x228083(0x279)]||0x1;_0x13ffe3['setMainFontSize'](_0x27790);}else _0xc476d4[_0x228083(0x76f)][_0x228083(0x249)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x228083(0x5e2)===_0x228083(0x8b5)?this[_0x228083(0x11c)][_0x228083(0x599)](_0xdf339e[_0x228083(0x649)][_0x228083(0x5ae)]):_0xc476d4[_0x228083(0x146)]=Math[_0x228083(0x545)](Number(RegExp['$1']),0x1));}else{_0xaef332['CoreEngine']['ParseEnemyNotetags']['call'](this,_0x5ba677),_0x3e6764['level']=0x1;const _0x1dbb9b=_0x1b8a5c[_0x228083(0x76f)];if(_0x1dbb9b[_0x228083(0x249)](/<LEVEL:[ ](\d+)>/i))_0x7eedd0['level']=_0x25439d(_0x3ec9e1['$1']);if(_0x1dbb9b['match'](/<MAXHP:[ ](\d+)>/i))_0x315d61[_0x228083(0x3f7)][0x0]=_0x3f3ced(_0x246f06['$1']);if(_0x1dbb9b[_0x228083(0x249)](/<MAXMP:[ ](\d+)>/i))_0x3d6aca[_0x228083(0x3f7)][0x1]=_0x2d2ef4(_0x34ecdd['$1']);if(_0x1dbb9b['match'](/<ATK:[ ](\d+)>/i))_0x53174c[_0x228083(0x3f7)][0x2]=_0x253f7f(_0x187af3['$1']);if(_0x1dbb9b[_0x228083(0x249)](/<DEF:[ ](\d+)>/i))_0x5cdd8d['params'][0x3]=_0x2a1393(_0x5d78df['$1']);if(_0x1dbb9b['match'](/<MAT:[ ](\d+)>/i))_0x487ea3['params'][0x4]=_0x43fd10(_0x27d2aa['$1']);if(_0x1dbb9b[_0x228083(0x249)](/<MDF:[ ](\d+)>/i))_0x201434[_0x228083(0x3f7)][0x5]=_0x604a83(_0x41f866['$1']);if(_0x1dbb9b['match'](/<AGI:[ ](\d+)>/i))_0x5cfd70[_0x228083(0x3f7)][0x6]=_0x5ccac7(_0x557e63['$1']);if(_0x1dbb9b[_0x228083(0x249)](/<LUK:[ ](\d+)>/i))_0x46ce1b[_0x228083(0x3f7)][0x7]=_0x30b514(_0x48c1f3['$1']);if(_0x1dbb9b['match'](/<EXP:[ ](\d+)>/i))_0x35ed71[_0x228083(0x34e)]=_0x2cf221(_0x448555['$1']);if(_0x1dbb9b['match'](/<GOLD:[ ](\d+)>/i))_0x41ec5a[_0x228083(0x3e9)]=_0x27ddc4(_0x5437aa['$1']);}}},VisuMZ['CoreEngine'][_0x347547(0x768)]=VisuMZ[_0x347547(0x768)],VisuMZ[_0x347547(0x768)]=function(_0x384cbe){const _0x213ea4=_0x347547;VisuMZ[_0x213ea4(0x4c0)][_0x213ea4(0x768)][_0x213ea4(0x248)](this,_0x384cbe),_0x384cbe[_0x213ea4(0x146)]=0x1;const _0x1b7ba4=_0x384cbe[_0x213ea4(0x76f)];if(_0x1b7ba4[_0x213ea4(0x249)](/<LEVEL:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x146)]=Number(RegExp['$1']);if(_0x1b7ba4[_0x213ea4(0x249)](/<MAXHP:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3f7)][0x0]=Number(RegExp['$1']);if(_0x1b7ba4['match'](/<MAXMP:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3f7)][0x1]=Number(RegExp['$1']);if(_0x1b7ba4[_0x213ea4(0x249)](/<ATK:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3f7)][0x2]=Number(RegExp['$1']);if(_0x1b7ba4[_0x213ea4(0x249)](/<DEF:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3f7)][0x3]=Number(RegExp['$1']);if(_0x1b7ba4[_0x213ea4(0x249)](/<MAT:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3f7)][0x4]=Number(RegExp['$1']);if(_0x1b7ba4['match'](/<MDF:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3f7)][0x5]=Number(RegExp['$1']);if(_0x1b7ba4[_0x213ea4(0x249)](/<AGI:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3f7)][0x6]=Number(RegExp['$1']);if(_0x1b7ba4['match'](/<LUK:[ ](\d+)>/i))_0x384cbe['params'][0x7]=Number(RegExp['$1']);if(_0x1b7ba4[_0x213ea4(0x249)](/<EXP:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x34e)]=Number(RegExp['$1']);if(_0x1b7ba4[_0x213ea4(0x249)](/<GOLD:[ ](\d+)>/i))_0x384cbe[_0x213ea4(0x3e9)]=Number(RegExp['$1']);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x84e)]=Graphics[_0x347547(0x288)],Graphics['_defaultStretchMode']=function(){const _0x558429=_0x347547;switch(VisuMZ['CoreEngine'][_0x558429(0x627)]['QoL'][_0x558429(0x7a5)]){case _0x558429(0x589):return!![];case _0x558429(0x379):return![];default:return VisuMZ['CoreEngine'][_0x558429(0x84e)][_0x558429(0x248)](this);}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x630)]=Graphics[_0x347547(0x118)],Graphics[_0x347547(0x118)]=function(_0x526b6a,_0x38a5aa,_0x2f3ea8=null){const _0xf66c2e=_0x347547;VisuMZ[_0xf66c2e(0x4c0)][_0xf66c2e(0x630)]['call'](this,_0x526b6a,_0x38a5aa,_0x2f3ea8),VisuMZ[_0xf66c2e(0x452)](![]);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x73e)]=Graphics['_centerElement'],Graphics[_0x347547(0x1e3)]=function(_0x2f30e8){const _0x16345a=_0x347547;VisuMZ['CoreEngine'][_0x16345a(0x73e)][_0x16345a(0x248)](this,_0x2f30e8),this['_centerElementCoreEngine'](_0x2f30e8);},Graphics[_0x347547(0x4bc)]=function(_0x4ab511){const _0x2a33cc=_0x347547;VisuMZ[_0x2a33cc(0x4c0)]['Settings'][_0x2a33cc(0x4e9)][_0x2a33cc(0x738)]&&(_0x4ab511[_0x2a33cc(0x2fd)][_0x2a33cc(0x689)]=_0x2a33cc(0x4d5));if(VisuMZ[_0x2a33cc(0x4c0)][_0x2a33cc(0x627)][_0x2a33cc(0x4e9)]['PixelateImageRendering']){if(_0x2a33cc(0x593)!=='RTVRy')_0x4ab511[_0x2a33cc(0x2fd)]['image-rendering']=_0x2a33cc(0x111);else{const _0x2f1e22=_0x1dc6f0[_0x2a33cc(0x4c0)][_0x2a33cc(0x627)][_0x2a33cc(0x13e)],_0xdd388e=_0x2f1e22['MultiKeyFmt'],_0x565aa7=this[_0x2a33cc(0x577)](_0x433146),_0x5db22d=this[_0x2a33cc(0x577)](_0x4d6c14);return _0xdd388e[_0x2a33cc(0x83a)](_0x565aa7,_0x5db22d);}}const _0x14d89f=Math[_0x2a33cc(0x545)](0x0,Math[_0x2a33cc(0x231)](_0x4ab511[_0x2a33cc(0x4da)]*this['_realScale'])),_0x3eca96=Math[_0x2a33cc(0x545)](0x0,Math[_0x2a33cc(0x231)](_0x4ab511[_0x2a33cc(0xe4)]*this['_realScale']));_0x4ab511[_0x2a33cc(0x2fd)][_0x2a33cc(0x4da)]=_0x14d89f+'px',_0x4ab511[_0x2a33cc(0x2fd)][_0x2a33cc(0xe4)]=_0x3eca96+'px';},VisuMZ[_0x347547(0x4c0)][_0x347547(0x729)]=Bitmap['prototype'][_0x347547(0x6f3)],Bitmap[_0x347547(0x387)][_0x347547(0x6f3)]=function(_0x3afda1,_0x44a665){const _0x1bc042=_0x347547;VisuMZ['CoreEngine'][_0x1bc042(0x729)]['call'](this,_0x3afda1,_0x44a665),this[_0x1bc042(0x361)]=!(VisuMZ[_0x1bc042(0x4c0)][_0x1bc042(0x627)][_0x1bc042(0x4e9)][_0x1bc042(0x615)]??!![]);},Bitmap[_0x347547(0x387)][_0x347547(0x5ad)]=function(){const _0x3aed8d=_0x347547;this[_0x3aed8d(0x60c)]=!![];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x2bd)]=Sprite['prototype'][_0x347547(0x264)],Sprite[_0x347547(0x387)][_0x347547(0x264)]=function(){const _0xba7fdc=_0x347547;VisuMZ[_0xba7fdc(0x4c0)][_0xba7fdc(0x2bd)][_0xba7fdc(0x248)](this),this[_0xba7fdc(0x430)]();},Sprite[_0x347547(0x387)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x364a21=_0x347547;if(!this['bitmap'])return;if(!this[_0x364a21(0x621)][_0x364a21(0x60c)])return;if(this[_0x364a21(0x621)]['_baseTexture']&&!this[_0x364a21(0x269)][_0x364a21(0x53a)][_0x364a21(0x663)]){if('wLRvR'===_0x364a21(0x41a))return _0x38f8fc[_0x364a21(0x4c0)][_0x364a21(0x627)]['UI']['FadeSpeed'];else this[_0x364a21(0x621)][_0x364a21(0x264)]();}},VisuMZ[_0x347547(0x4c0)]['Bitmap_resize']=Bitmap[_0x347547(0x387)][_0x347547(0x67c)],Bitmap[_0x347547(0x387)][_0x347547(0x67c)]=function(_0x945a8b,_0x2497ba){const _0x44c198=_0x347547;VisuMZ[_0x44c198(0x4c0)][_0x44c198(0x833)][_0x44c198(0x248)](this,_0x945a8b,_0x2497ba),this[_0x44c198(0x5ad)]();},VisuMZ[_0x347547(0x4c0)]['Bitmap_blt']=Bitmap[_0x347547(0x387)]['blt'],Bitmap[_0x347547(0x387)][_0x347547(0x84c)]=function(_0x51a871,_0x5abc58,_0x1a618d,_0x16f836,_0x1ff158,_0x5015a2,_0x551b4d,_0x368f80,_0x3cafe2){const _0x2dad7d=_0x347547;_0x5abc58=Math[_0x2dad7d(0x22b)](_0x5abc58),_0x1a618d=Math[_0x2dad7d(0x22b)](_0x1a618d),_0x16f836=Math[_0x2dad7d(0x22b)](_0x16f836),_0x1ff158=Math[_0x2dad7d(0x22b)](_0x1ff158),_0x5015a2=Math[_0x2dad7d(0x22b)](_0x5015a2),_0x551b4d=Math[_0x2dad7d(0x22b)](_0x551b4d),VisuMZ['CoreEngine'][_0x2dad7d(0x304)]['call'](this,_0x51a871,_0x5abc58,_0x1a618d,_0x16f836,_0x1ff158,_0x5015a2,_0x551b4d,_0x368f80,_0x3cafe2),this['markCoreEngineModified']();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x8cb)]=Bitmap[_0x347547(0x387)][_0x347547(0x56c)],Bitmap[_0x347547(0x387)][_0x347547(0x56c)]=function(_0x1f27f5,_0x1916dc,_0xe7e446,_0x3182dd){const _0x13846e=_0x347547;VisuMZ[_0x13846e(0x4c0)][_0x13846e(0x8cb)]['call'](this,_0x1f27f5,_0x1916dc,_0xe7e446,_0x3182dd),this['markCoreEngineModified']();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x885)]=Bitmap[_0x347547(0x387)][_0x347547(0x7b3)],Bitmap[_0x347547(0x387)][_0x347547(0x7b3)]=function(_0x1a920b,_0x1d3d8b,_0x4cddc4,_0x1eaafe,_0x5bb192){const _0x4b7e48=_0x347547;VisuMZ['CoreEngine'][_0x4b7e48(0x885)]['call'](this,_0x1a920b,_0x1d3d8b,_0x4cddc4,_0x1eaafe,_0x5bb192),this['markCoreEngineModified']();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x55e)]=Bitmap['prototype'][_0x347547(0x7ee)],Bitmap['prototype'][_0x347547(0x7ee)]=function(_0xd3e259,_0x2e5c5d,_0x5679b6,_0xdb95b9,_0x52ca50){const _0x3eda5c=_0x347547;VisuMZ[_0x3eda5c(0x4c0)][_0x3eda5c(0x55e)]['call'](this,_0xd3e259,_0x2e5c5d,_0x5679b6,_0xdb95b9,_0x52ca50),this[_0x3eda5c(0x5ad)]();},VisuMZ[_0x347547(0x4c0)]['Bitmap_gradientFillRect']=Bitmap['prototype'][_0x347547(0x16f)],Bitmap['prototype']['gradientFillRect']=function(_0x2fa9fe,_0x91d8f6,_0xc0125f,_0x42e297,_0x5dfe81,_0x3b370c,_0x2e538a){const _0x1a0a72=_0x347547;VisuMZ['CoreEngine'][_0x1a0a72(0x899)][_0x1a0a72(0x248)](this,_0x2fa9fe,_0x91d8f6,_0xc0125f,_0x42e297,_0x5dfe81,_0x3b370c,_0x2e538a),this[_0x1a0a72(0x5ad)]();},VisuMZ['CoreEngine'][_0x347547(0x3b7)]=Bitmap[_0x347547(0x387)][_0x347547(0x837)],Bitmap['prototype'][_0x347547(0x837)]=function(_0x381b9e,_0x2f168d,_0x5246c9,_0x57a2f4){const _0x19cdaf=_0x347547;_0x381b9e=Math[_0x19cdaf(0x22b)](_0x381b9e),_0x2f168d=Math[_0x19cdaf(0x22b)](_0x2f168d),_0x5246c9=Math[_0x19cdaf(0x22b)](_0x5246c9),VisuMZ[_0x19cdaf(0x4c0)][_0x19cdaf(0x3b7)]['call'](this,_0x381b9e,_0x2f168d,_0x5246c9,_0x57a2f4),this[_0x19cdaf(0x5ad)]();},VisuMZ[_0x347547(0x4c0)]['Bitmap_measureTextWidth']=Bitmap[_0x347547(0x387)][_0x347547(0x38f)],Bitmap[_0x347547(0x387)]['measureTextWidth']=function(_0x572348){const _0x80c6a0=_0x347547;return Math[_0x80c6a0(0x424)](VisuMZ['CoreEngine'][_0x80c6a0(0x612)][_0x80c6a0(0x248)](this,_0x572348));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x31c)]=Bitmap[_0x347547(0x387)][_0x347547(0x127)],Bitmap['prototype'][_0x347547(0x127)]=function(_0x4558e3,_0x585deb,_0x2afef8,_0x3a5a5f,_0x124bbb,_0x1037f8){const _0x42497c=_0x347547;_0x585deb=Math[_0x42497c(0x22b)](_0x585deb),_0x2afef8=Math[_0x42497c(0x22b)](_0x2afef8),_0x3a5a5f=Math[_0x42497c(0x22b)](_0x3a5a5f),_0x124bbb=Math['round'](_0x124bbb),VisuMZ['CoreEngine'][_0x42497c(0x31c)][_0x42497c(0x248)](this,_0x4558e3,_0x585deb,_0x2afef8,_0x3a5a5f,_0x124bbb,_0x1037f8),this[_0x42497c(0x5ad)]();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x1ff)]=Bitmap[_0x347547(0x387)][_0x347547(0x8d2)],Bitmap['prototype'][_0x347547(0x8d2)]=function(_0x58abba,_0x2c5868,_0xee3f6e,_0x5e922e){const _0x1f953e=_0x347547;VisuMZ['CoreEngine'][_0x1f953e(0x627)][_0x1f953e(0x4e9)][_0x1f953e(0x6c1)]?this[_0x1f953e(0x1b9)](_0x58abba,_0x2c5868,_0xee3f6e,_0x5e922e):VisuMZ[_0x1f953e(0x4c0)][_0x1f953e(0x1ff)][_0x1f953e(0x248)](this,_0x58abba,_0x2c5868,_0xee3f6e,_0x5e922e);},Bitmap['prototype'][_0x347547(0x1b9)]=function(_0x3d45b5,_0x545b29,_0xceebec,_0x52591a){const _0x545e17=_0x347547,_0x515ebc=this[_0x545e17(0x552)];_0x515ebc['fillStyle']=this['outlineColor'],_0x515ebc[_0x545e17(0x489)](_0x3d45b5,_0x545b29+0x2,_0xceebec+0x2,_0x52591a);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x2c8)]=Input['clear'],Input[_0x347547(0x16b)]=function(){const _0x41837b=_0x347547;VisuMZ[_0x41837b(0x4c0)][_0x41837b(0x2c8)][_0x41837b(0x248)](this),this[_0x41837b(0x790)]=undefined,this[_0x41837b(0x676)]=undefined,this['_gamepadWait']=Input[_0x41837b(0x1bb)];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x41f)]=Input['update'],Input['update']=function(){const _0x47585e=_0x347547;VisuMZ[_0x47585e(0x4c0)]['Input_update'][_0x47585e(0x248)](this);if(this[_0x47585e(0x60b)])this['_gamepadWait']--;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x680)]=Input['_pollGamepads'],Input[_0x347547(0x8dc)]=function(){const _0x4b1114=_0x347547;if(this[_0x4b1114(0x60b)])return;VisuMZ['CoreEngine'][_0x4b1114(0x680)][_0x4b1114(0x248)](this);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x5f1)]=Input['_setupEventHandlers'],Input[_0x347547(0x399)]=function(){const _0x22d394=_0x347547;VisuMZ[_0x22d394(0x4c0)][_0x22d394(0x5f1)][_0x22d394(0x248)](this),document['addEventListener'](_0x22d394(0x7f6),this['_onKeyPress']['bind'](this));},VisuMZ[_0x347547(0x4c0)]['Input_onKeyDown']=Input[_0x347547(0x6bd)],Input[_0x347547(0x6bd)]=function(_0x2b8555){const _0x190342=_0x347547;this[_0x190342(0x676)]=_0x2b8555['keyCode'],VisuMZ[_0x190342(0x4c0)][_0x190342(0x758)][_0x190342(0x248)](this,_0x2b8555);},Input['_onKeyPress']=function(_0x5e7bb8){const _0x4bc7e4=_0x347547;this[_0x4bc7e4(0x5c5)](_0x5e7bb8);},Input[_0x347547(0x5c5)]=function(_0x4bfdce){const _0x1addd4=_0x347547;this['_inputSpecialKeyCode']=_0x4bfdce[_0x1addd4(0x3ba)];let _0x1c5c17=String[_0x1addd4(0x7a8)](_0x4bfdce[_0x1addd4(0x7bb)]);if(this[_0x1addd4(0x790)]===undefined)this[_0x1addd4(0x790)]=_0x1c5c17;else{if(_0x1addd4(0x88d)===_0x1addd4(0x6b8))return _0x30b867['CoreEngine'][_0x1addd4(0x627)][_0x1addd4(0x3b8)][_0x1addd4(0x2a5)][_0x1addd4(0xf7)];else this[_0x1addd4(0x790)]+=_0x1c5c17;}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x77a)]=Input[_0x347547(0x730)],Input[_0x347547(0x730)]=function(_0x1cec7e){const _0x59dba3=_0x347547;if(_0x1cec7e===0x8)return![];return VisuMZ['CoreEngine'][_0x59dba3(0x77a)][_0x59dba3(0x248)](this,_0x1cec7e);},Input[_0x347547(0x830)]=function(_0x266766){const _0xbe5841=_0x347547;if(_0x266766['match'](/backspace/i))return this[_0xbe5841(0x676)]===0x8;if(_0x266766['match'](/enter/i))return this[_0xbe5841(0x676)]===0xd;if(_0x266766[_0xbe5841(0x249)](/escape/i))return this[_0xbe5841(0x676)]===0x1b;},Input[_0x347547(0x482)]=function(){const _0x3363e2=_0x347547;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x3363e2(0x676)]);},Input['isArrowPressed']=function(){const _0x46c608=_0x347547;return[0x25,0x26,0x27,0x28][_0x46c608(0x5af)](this[_0x46c608(0x676)]);},Input[_0x347547(0x219)]=function(){const _0x186938=_0x347547;if(navigator[_0x186938(0x3b1)]){const _0x58100b=navigator['getGamepads']();if(_0x58100b){if(_0x186938(0x777)!=='LHsfl')return!![];else for(const _0x2a42d3 of _0x58100b){if(_0x186938(0x7f2)==='gPbJZ'){if(_0x2a42d3&&_0x2a42d3['connected'])return!![];}else _0x5a0bce[_0x186938(0x65c)](_0x186938(0x808)),_0x272e21[_0x186938(0x65c)](_0x409476);}}}return![];},Input['isGamepadTriggered']=function(){const _0x529f77=_0x347547;if(navigator[_0x529f77(0x3b1)]){const _0x9f7af=navigator[_0x529f77(0x3b1)]();if(_0x9f7af)for(const _0x209ffc of _0x9f7af){if(_0x209ffc&&_0x209ffc[_0x529f77(0x262)]){if('yEAVN'===_0x529f77(0x75f)){if(this[_0x529f77(0x2f6)](_0x209ffc))return!![];}else this[_0x529f77(0x838)]();}}}return![];},Input['isGamepadButtonPressed']=function(_0x1e0406){const _0x5c6d7b=_0x347547,_0x3e9ecc=_0x1e0406['buttons'];for(let _0x23c3c4=0x0;_0x23c3c4<_0x3e9ecc[_0x5c6d7b(0x4e8)];_0x23c3c4++){if(_0x3e9ecc[_0x23c3c4]['pressed'])return!![];}return![];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x72a)]=Tilemap['prototype'][_0x347547(0x433)],Tilemap[_0x347547(0x387)][_0x347547(0x433)]=function(_0x50fcff,_0x10567e,_0x5bef21,_0x3db7da){const _0x3988de=_0x347547;if($gameMap&&$gameMap[_0x3988de(0x44e)]())return;VisuMZ[_0x3988de(0x4c0)][_0x3988de(0x72a)]['call'](this,_0x50fcff,_0x10567e,_0x5bef21,_0x3db7da);},Tilemap[_0x347547(0x57f)][_0x347547(0x387)][_0x347547(0x5f2)]=function(){const _0x150efd=_0x347547;this['_destroyInternalTextures']();for(let _0x1c4941=0x0;_0x1c4941<Tilemap['Layer'][_0x150efd(0xf9)];_0x1c4941++){if('luTSy'!==_0x150efd(0x8c5)){const _0x237776=new PIXI[(_0x150efd(0x459))]();_0x237776['setSize'](0x800,0x800),VisuMZ[_0x150efd(0x4c0)][_0x150efd(0x627)]['QoL'][_0x150efd(0x615)]&&(_0x237776[_0x150efd(0x4d9)]=PIXI[_0x150efd(0x7d6)]['NEAREST']),this[_0x150efd(0x88a)][_0x150efd(0x6f8)](_0x237776);}else this[_0x150efd(0x34b)]+=_0x5f1e49[_0x150efd(0x22b)]((_0x42ffba['boxWidth']-0x330)/0x2);}},WindowLayer['prototype']['isMaskingEnabled']=function(){const _0x221561=_0x347547;if(SceneManager&&SceneManager[_0x221561(0x709)]){if(_0x221561(0x703)===_0x221561(0x703))return SceneManager[_0x221561(0x709)][_0x221561(0xea)]();else{if(this['_mode']===_0x221561(0x5c7)&&!_0x5a2133['isArrowPressed']())return;if(_0x507612[_0x221561(0x482)]())return;_0x772070[_0x221561(0x4c0)][_0x221561(0x607)][_0x221561(0x248)](this,_0xe8513d),this['switchModes'](_0x221561(0x40f));}}else{if('AsAWY'===_0x221561(0x891))_0x11314d=(0x1-_0x46297c(_0x4c8173['$1']))*-_0x1d414f;else return!![];}},VisuMZ[_0x347547(0x4c0)]['WindowLayer_render']=WindowLayer[_0x347547(0x387)][_0x347547(0x3be)],WindowLayer[_0x347547(0x387)]['render']=function render(_0x4165fd){const _0x34b1ee=_0x347547;if(this[_0x34b1ee(0x39b)]())VisuMZ[_0x34b1ee(0x4c0)][_0x34b1ee(0x38e)][_0x34b1ee(0x248)](this,_0x4165fd);else{if('nRrWu'!==_0x34b1ee(0x497))this[_0x34b1ee(0x23a)](_0x4165fd);else return _0x1c3959['CoreEngine']['Settings'][_0x34b1ee(0x76a)]['ActorHPColor'][_0x34b1ee(0x248)](this,_0xe64516);}},WindowLayer[_0x347547(0x387)][_0x347547(0x23a)]=function render(_0x11463a){const _0xa745a2=_0x347547;if(!this[_0xa745a2(0x3d0)])return;const _0x594ab6=new PIXI[(_0xa745a2(0x6f7))](),_0x66112=_0x11463a['gl'],_0x323c84=this[_0xa745a2(0x10e)][_0xa745a2(0x171)]();_0x11463a['framebuffer']['forceStencil'](),_0x594ab6[_0xa745a2(0x7d3)]=this['transform'],_0x11463a[_0xa745a2(0x1c7)]['flush'](),_0x66112[_0xa745a2(0x632)](_0x66112[_0xa745a2(0x583)]);while(_0x323c84[_0xa745a2(0x4e8)]>0x0){const _0x17ee80=_0x323c84[_0xa745a2(0x7ef)]();if(_0x17ee80[_0xa745a2(0xc7)]&&_0x17ee80[_0xa745a2(0x3d0)]&&_0x17ee80[_0xa745a2(0x36f)]>0x0){if(_0xa745a2(0x1bd)===_0xa745a2(0x47e))return _0x44b3b7[_0xa745a2(0x4c0)][_0xa745a2(0x627)][_0xa745a2(0x4ed)][_0xa745a2(0x2f5)];else _0x66112[_0xa745a2(0x580)](_0x66112['EQUAL'],0x0,~0x0),_0x66112['stencilOp'](_0x66112[_0xa745a2(0x467)],_0x66112['KEEP'],_0x66112[_0xa745a2(0x467)]),_0x17ee80[_0xa745a2(0x3be)](_0x11463a),_0x11463a['batch'][_0xa745a2(0x374)](),_0x594ab6[_0xa745a2(0x16b)](),_0x66112['stencilFunc'](_0x66112[_0xa745a2(0x744)],0x1,~0x0),_0x66112[_0xa745a2(0x7ac)](_0x66112[_0xa745a2(0x617)],_0x66112[_0xa745a2(0x617)],_0x66112[_0xa745a2(0x617)]),_0x66112['blendFunc'](_0x66112['ZERO'],_0x66112[_0xa745a2(0x5a1)]),_0x594ab6['render'](_0x11463a),_0x11463a[_0xa745a2(0x1c7)][_0xa745a2(0x374)](),_0x66112[_0xa745a2(0x671)](_0x66112[_0xa745a2(0x5a1)],_0x66112[_0xa745a2(0x844)]);}}_0x66112[_0xa745a2(0x4d8)](_0x66112[_0xa745a2(0x583)]),_0x66112[_0xa745a2(0x16b)](_0x66112['STENCIL_BUFFER_BIT']),_0x66112['clearStencil'](0x0),_0x11463a[_0xa745a2(0x1c7)][_0xa745a2(0x374)]();for(const _0x438b70 of this[_0xa745a2(0x10e)]){if(_0xa745a2(0x362)===_0xa745a2(0x797)){if(!_0x511a2a[_0xa745a2(0x71c)]())return;if(!_0x3487e8[_0xa745a2(0x6c5)]())return;if(!_0xcbc884['inBattle']())return;_0x31c35a[_0xa745a2(0x389)](_0x36c3f0,_0x1e64a6);const _0x25e65b=_0xa745a2(0x368)['format'](_0x3bd832['_troopId'][_0xa745a2(0x667)](0x4)),_0x9c138d=_0x3fd8fc[_0xa745a2(0x4c0)][_0xa745a2(0xda)](_0x43424c['_troopId']);_0x37b36a[_0xa745a2(0x4c0)][_0xa745a2(0x64c)](_0x9c138d,_0x25e65b,!![]);}else!_0x438b70['_isWindow']&&_0x438b70[_0xa745a2(0x3d0)]&&_0x438b70[_0xa745a2(0x3be)](_0x11463a);}_0x11463a[_0xa745a2(0x1c7)]['flush']();},DataManager[_0x347547(0x2c7)]=function(_0x54134c){const _0x69f610=_0x347547;return this[_0x69f610(0x12e)](_0x54134c)&&_0x54134c[_0x69f610(0x820)]===0x2;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x8a7)]=DataManager[_0x347547(0x33c)],DataManager['setupNewGame']=function(){const _0x4704e9=_0x347547;VisuMZ[_0x4704e9(0x4c0)][_0x4704e9(0x8a7)][_0x4704e9(0x248)](this),this[_0x4704e9(0x453)](),this[_0x4704e9(0x30c)]();},DataManager[_0x347547(0x453)]=function(){const _0x39a005=_0x347547;if($gameTemp[_0x39a005(0x71c)]()){if(_0x39a005(0x466)!==_0x39a005(0x466)){const _0xfa9eb=this[_0x39a005(0x34a)]()[_0x39a005(0x3f7)][_0x529fcc][0x63],_0x3ec073=this[_0x39a005(0x34a)]()['params'][_0x1df010][0x62];return _0xfa9eb+(_0xfa9eb-_0x3ec073)*(this[_0x39a005(0x146)]-0x63);}else{const _0x236876=VisuMZ[_0x39a005(0x4c0)]['Settings'][_0x39a005(0x4e9)][_0x39a005(0x7df)];if(_0x236876>0x0)$gameTemp[_0x39a005(0x3c5)](_0x236876);}}},DataManager[_0x347547(0x30c)]=function(){const _0x4fb81d=_0x347547,_0x494d96=VisuMZ['CoreEngine'][_0x4fb81d(0x627)][_0x4fb81d(0x4e9)][_0x4fb81d(0x643)]||0x0;if(_0x494d96>0x0)$gameTemp[_0x4fb81d(0x3c5)](_0x494d96);},DataManager[_0x347547(0x740)]=function(_0x2a55ba){const _0x5e5618=_0x347547,_0x476e99=$dataTroops[_0x2a55ba];if(!_0x476e99)return'';let _0x1551e7='';_0x1551e7+=_0x476e99['name'];for(const _0x5a4e2b of _0x476e99[_0x5e5618(0x37d)]){if(_0x5e5618(0x74a)!==_0x5e5618(0xe1))for(const _0x32a123 of _0x5a4e2b[_0x5e5618(0x74f)]){if(_0x5e5618(0x130)!==_0x5e5618(0x63d))[0x6c,0x198][_0x5e5618(0x4aa)](_0x32a123['code'])&&('lzeiG'==='lzeiG'?(_0x1551e7+='\x0a',_0x1551e7+=_0x32a123['parameters'][0x0]):this[_0x5e5618(0x3c9)]=_0x5e5618(0x6b4));else{const _0x30610a=_0x5cd157[_0x5e5618(0x4c0)][_0x5e5618(0x627)]['Window'];if(_0x30610a['ShowItemBackground']===![])return;_0x30610a[_0x5e5618(0x6a3)]?_0x30610a[_0x5e5618(0x6a3)]['call'](this,_0x3767d9):_0x3dbeea[_0x5e5618(0x4c0)]['Window_Selectable_drawBackgroundRect'][_0x5e5618(0x248)](this,_0xa7d7a8);}}else return 0x3;}return _0x1551e7;},TextManager[_0x347547(0x5c6)]=['','','',_0x347547(0x4a5),'','',_0x347547(0x1ea),'',_0x347547(0xe0),'TAB','','',_0x347547(0xe5),_0x347547(0x121),'ENTER_SPECIAL','','SHIFT',_0x347547(0x5cc),_0x347547(0x3d7),_0x347547(0x1eb),_0x347547(0x462),'KANA',_0x347547(0x1a3),_0x347547(0x557),_0x347547(0x5d1),_0x347547(0x75e),'','ESC','CONVERT',_0x347547(0x528),'ACCEPT',_0x347547(0x727),_0x347547(0x4bd),'PGUP','PGDN',_0x347547(0x852),_0x347547(0x665),_0x347547(0x713),'UP','RIGHT',_0x347547(0x20e),_0x347547(0x856),_0x347547(0x344),_0x347547(0x1dd),_0x347547(0x153),'INSERT',_0x347547(0x5ef),'','0','1','2','3','4','5','6','7','8','9',_0x347547(0x10d),_0x347547(0x2ba),_0x347547(0x16e),_0x347547(0x46a),_0x347547(0x647),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x347547(0x843),'',_0x347547(0x1db),'',_0x347547(0x5e9),'NUMPAD0',_0x347547(0x8cc),_0x347547(0x314),_0x347547(0x12a),_0x347547(0x15d),_0x347547(0x6f2),_0x347547(0x513),_0x347547(0x7b7),'NUMPAD8',_0x347547(0x113),_0x347547(0x64d),_0x347547(0x835),_0x347547(0x386),_0x347547(0x39d),_0x347547(0x2db),_0x347547(0x472),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x347547(0x4d1),_0x347547(0x17a),_0x347547(0x4a0),_0x347547(0x55f),'F15',_0x347547(0x6a4),_0x347547(0x699),_0x347547(0x141),_0x347547(0x5cb),_0x347547(0x2f3),'F21',_0x347547(0x525),'F23',_0x347547(0x5a2),'','','','','','','','',_0x347547(0x69f),'SCROLL_LOCK',_0x347547(0x654),'WIN_OEM_FJ_MASSHOU',_0x347547(0x83e),_0x347547(0x3fc),_0x347547(0x80d),'','','','','','','','','',_0x347547(0x229),_0x347547(0x2e6),'DOUBLE_QUOTE',_0x347547(0x2d1),_0x347547(0x68f),_0x347547(0x235),_0x347547(0x42a),_0x347547(0x456),_0x347547(0x3ac),_0x347547(0x4bb),_0x347547(0x87a),_0x347547(0x6e5),_0x347547(0x3df),'HYPHEN_MINUS','OPEN_CURLY_BRACKET',_0x347547(0x4cb),_0x347547(0x8bd),'','','','',_0x347547(0x263),_0x347547(0x776),_0x347547(0x57d),'','','SEMICOLON',_0x347547(0x46a),_0x347547(0x6b0),_0x347547(0x81c),_0x347547(0x7bd),_0x347547(0x4e5),_0x347547(0x4cf),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x347547(0x52f),_0x347547(0x7f5),_0x347547(0x26b),_0x347547(0x5aa),'','META',_0x347547(0x756),'',_0x347547(0x2c0),_0x347547(0x80b),'',_0x347547(0x461),'','',_0x347547(0x558),_0x347547(0x6b3),'WIN_OEM_PA1',_0x347547(0x8aa),_0x347547(0x221),_0x347547(0x5b6),_0x347547(0x683),_0x347547(0x2bb),_0x347547(0x62e),_0x347547(0x749),'WIN_OEM_AUTO',_0x347547(0x804),'WIN_OEM_BACKTAB',_0x347547(0x8b1),_0x347547(0x346),_0x347547(0x5b3),_0x347547(0x638),'PLAY',_0x347547(0x24a),'',_0x347547(0x19e),_0x347547(0x6d9),''],TextManager['buttonAssistOk']=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x13e)][_0x347547(0x7f1)],TextManager[_0x347547(0x27b)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)]['ButtonAssist'][_0x347547(0x7ec)],TextManager[_0x347547(0x87f)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x13e)][_0x347547(0x307)],VisuMZ[_0x347547(0x4c0)][_0x347547(0x5ce)]=TextManager['param'],TextManager[_0x347547(0x530)]=function(_0x533c81){const _0x2cbc3a=_0x347547;if(typeof _0x533c81===_0x2cbc3a(0x435))return _0x2cbc3a(0xf6)!=='iMAZi'?VisuMZ[_0x2cbc3a(0x4c0)]['TextManager_param']['call'](this,_0x533c81):this[_0x2cbc3a(0x12e)](_0x3564db)&&_0xb2c1cf[_0x2cbc3a(0x820)]===0x2;else{if('iTXeM'!==_0x2cbc3a(0x161)){var _0x5a9617=_0x4802e9(_0x3d4cc0['$1'])/0x64;_0x40007f+=_0x5a9617;}else return this[_0x2cbc3a(0x7dd)](_0x533c81);}},TextManager['paramName']=function(_0x47d770){const _0x1edb2f=_0x347547;_0x47d770=String(_0x47d770||'')[_0x1edb2f(0x173)]();const _0x37d0cf=VisuMZ[_0x1edb2f(0x4c0)][_0x1edb2f(0x627)][_0x1edb2f(0x8a1)];if(_0x47d770===_0x1edb2f(0x2aa))return $dataSystem[_0x1edb2f(0x5f8)]['params'][0x0];if(_0x47d770===_0x1edb2f(0x7a4))return $dataSystem[_0x1edb2f(0x5f8)]['params'][0x1];if(_0x47d770===_0x1edb2f(0x477))return $dataSystem[_0x1edb2f(0x5f8)][_0x1edb2f(0x3f7)][0x2];if(_0x47d770===_0x1edb2f(0x7c4))return $dataSystem['terms'][_0x1edb2f(0x3f7)][0x3];if(_0x47d770===_0x1edb2f(0x6ce))return $dataSystem[_0x1edb2f(0x5f8)][_0x1edb2f(0x3f7)][0x4];if(_0x47d770==='MDF')return $dataSystem[_0x1edb2f(0x5f8)][_0x1edb2f(0x3f7)][0x5];if(_0x47d770==='AGI')return $dataSystem[_0x1edb2f(0x5f8)][_0x1edb2f(0x3f7)][0x6];if(_0x47d770===_0x1edb2f(0x170))return $dataSystem['terms']['params'][0x7];if(_0x47d770===_0x1edb2f(0x534))return _0x37d0cf[_0x1edb2f(0x76e)];if(_0x47d770===_0x1edb2f(0x28a))return _0x37d0cf[_0x1edb2f(0x640)];if(_0x47d770==='CRI')return _0x37d0cf['XParamVocab2'];if(_0x47d770===_0x1edb2f(0x337))return _0x37d0cf['XParamVocab3'];if(_0x47d770==='MEV')return _0x37d0cf['XParamVocab4'];if(_0x47d770===_0x1edb2f(0x266))return _0x37d0cf[_0x1edb2f(0x5eb)];if(_0x47d770==='CNT')return _0x37d0cf[_0x1edb2f(0x6da)];if(_0x47d770===_0x1edb2f(0x543))return _0x37d0cf[_0x1edb2f(0x345)];if(_0x47d770===_0x1edb2f(0x5f7))return _0x37d0cf[_0x1edb2f(0x23b)];if(_0x47d770===_0x1edb2f(0x4e7))return _0x37d0cf[_0x1edb2f(0x1ac)];if(_0x47d770===_0x1edb2f(0xfd))return _0x37d0cf[_0x1edb2f(0x365)];if(_0x47d770===_0x1edb2f(0x3c2))return _0x37d0cf[_0x1edb2f(0x73d)];if(_0x47d770===_0x1edb2f(0x24b))return _0x37d0cf[_0x1edb2f(0x81f)];if(_0x47d770===_0x1edb2f(0xd5))return _0x37d0cf['SParamVocab3'];if(_0x47d770==='MCR')return _0x37d0cf['SParamVocab4'];if(_0x47d770==='TCR')return _0x37d0cf[_0x1edb2f(0x54e)];if(_0x47d770===_0x1edb2f(0xd9))return _0x37d0cf[_0x1edb2f(0x14c)];if(_0x47d770==='MDR')return _0x37d0cf[_0x1edb2f(0x151)];if(_0x47d770===_0x1edb2f(0x6b1))return _0x37d0cf[_0x1edb2f(0x292)];if(_0x47d770===_0x1edb2f(0x810))return _0x37d0cf['SParamVocab9'];if(VisuMZ[_0x1edb2f(0x4c0)][_0x1edb2f(0x267)][_0x47d770])return VisuMZ[_0x1edb2f(0x4c0)]['CustomParamNames'][_0x47d770];return'';},TextManager[_0x347547(0x577)]=function(_0x8c992b){const _0x4747ac=_0x347547;if(_0x8c992b==='cancel')_0x8c992b=_0x4747ac(0x1be);let _0x44c268=[];for(let _0x382cb6 in Input[_0x4747ac(0x23d)]){if('lXROp'==='lXROp'){_0x382cb6=Number(_0x382cb6);if(_0x382cb6>=0x60&&_0x382cb6<=0x69)continue;if([0x12,0x20][_0x4747ac(0x4aa)](_0x382cb6))continue;_0x8c992b===Input['keyMapper'][_0x382cb6]&&_0x44c268[_0x4747ac(0x6f8)](_0x382cb6);}else return 0xc0;}for(let _0x58016d=0x0;_0x58016d<_0x44c268[_0x4747ac(0x4e8)];_0x58016d++){_0x44c268[_0x58016d]=TextManager[_0x4747ac(0x5c6)][_0x44c268[_0x58016d]];}return this[_0x4747ac(0x2fe)](_0x44c268);},TextManager[_0x347547(0x2fe)]=function(_0xdceb4a){const _0x8b90bb=_0x347547,_0x54ec62=VisuMZ[_0x8b90bb(0x4c0)][_0x8b90bb(0x627)]['ButtonAssist'],_0x19a065=_0x54ec62['KeyUnlisted'],_0x55d5ff=_0xdceb4a['pop'](),_0x3e92ff=_0x8b90bb(0x669)[_0x8b90bb(0x83a)](_0x55d5ff);return _0x54ec62[_0x3e92ff]?_0x54ec62[_0x3e92ff]:_0x19a065[_0x8b90bb(0x83a)](_0x55d5ff);},TextManager[_0x347547(0x56e)]=function(_0x14625e,_0x33aa75){const _0x687e52=_0x347547,_0x20bd10=VisuMZ['CoreEngine'][_0x687e52(0x627)]['ButtonAssist'],_0xa016=_0x20bd10[_0x687e52(0x84b)],_0x24cdea=this[_0x687e52(0x577)](_0x14625e),_0x3d57ea=this[_0x687e52(0x577)](_0x33aa75);return _0xa016[_0x687e52(0x83a)](_0x24cdea,_0x3d57ea);},VisuMZ[_0x347547(0x4c0)]['ColorManager_loadWindowskin']=ColorManager[_0x347547(0x817)],ColorManager['loadWindowskin']=function(){const _0x512126=_0x347547;VisuMZ[_0x512126(0x4c0)][_0x512126(0x69c)][_0x512126(0x248)](this),this[_0x512126(0x287)]=this[_0x512126(0x287)]||{};},ColorManager[_0x347547(0x474)]=function(_0x32f4f6,_0x1c18c7){const _0x101f45=_0x347547;_0x1c18c7=String(_0x1c18c7),this[_0x101f45(0x287)]=this[_0x101f45(0x287)]||{};if(_0x1c18c7[_0x101f45(0x249)](/#(.*)/i)){if(_0x101f45(0x650)===_0x101f45(0x650))this[_0x101f45(0x287)][_0x32f4f6]=_0x101f45(0x88f)['format'](String(RegExp['$1']));else return _0x1308c2[_0x101f45(0x649)][_0x101f45(0x41b)][_0x101f45(0x248)](this);}else{if(_0x101f45(0x60d)!==_0x101f45(0x60d))return _0x101f45(0x575);else this[_0x101f45(0x287)][_0x32f4f6]=this['textColor'](Number(_0x1c18c7));}return this[_0x101f45(0x287)][_0x32f4f6];},ColorManager[_0x347547(0x327)]=function(_0x4672bc){const _0x27ad61=_0x347547;_0x4672bc=String(_0x4672bc);if(_0x4672bc[_0x27ad61(0x249)](/#(.*)/i)){if(_0x27ad61(0x339)!=='Iforv')return'#%1'['format'](String(RegExp['$1']));else{if(this[_0x27ad61(0x483)]===_0x27ad61(0x5c7)&&!_0x709b65[_0x27ad61(0x252)]())return;if(_0x58612b['isNumpadPressed']())return;_0x27baa4[_0x27ad61(0x4c0)][_0x27ad61(0x296)][_0x27ad61(0x248)](this,_0x373607),this[_0x27ad61(0x854)](_0x27ad61(0x40f));}}else return this[_0x27ad61(0x1b8)](Number(_0x4672bc));},ColorManager[_0x347547(0x415)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x2cbf46=_0x347547,_0x304137=_0x2cbf46(0x66d);this[_0x2cbf46(0x287)]=this[_0x2cbf46(0x287)]||{};if(this[_0x2cbf46(0x287)][_0x304137])return this[_0x2cbf46(0x287)][_0x304137];const _0x3ce31e=VisuMZ[_0x2cbf46(0x4c0)]['Settings'][_0x2cbf46(0x76a)][_0x2cbf46(0x2f1)];return this[_0x2cbf46(0x474)](_0x304137,_0x3ce31e);},ColorManager[_0x347547(0x3e2)]=function(){const _0x3b564a=_0x347547,_0xaefd20=_0x3b564a(0x2a6);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0xaefd20])return this[_0x3b564a(0x287)][_0xaefd20];const _0x1af37f=VisuMZ[_0x3b564a(0x4c0)][_0x3b564a(0x627)][_0x3b564a(0x76a)]['ColorSystem'];return this[_0x3b564a(0x474)](_0xaefd20,_0x1af37f);},ColorManager[_0x347547(0x64a)]=function(){const _0x5718f8=_0x347547,_0x399873=_0x5718f8(0x6fc);this[_0x5718f8(0x287)]=this[_0x5718f8(0x287)]||{};if(this[_0x5718f8(0x287)][_0x399873])return this[_0x5718f8(0x287)][_0x399873];const _0x3653e7=VisuMZ[_0x5718f8(0x4c0)][_0x5718f8(0x627)][_0x5718f8(0x76a)]['ColorCrisis'];return this[_0x5718f8(0x474)](_0x399873,_0x3653e7);},ColorManager['deathColor']=function(){const _0x6669d9=_0x347547,_0x210d50=_0x6669d9(0x8c7);this[_0x6669d9(0x287)]=this['_colorCache']||{};if(this['_colorCache'][_0x210d50])return this[_0x6669d9(0x287)][_0x210d50];const _0xb0d03e=VisuMZ[_0x6669d9(0x4c0)][_0x6669d9(0x627)]['Color'][_0x6669d9(0x74c)];return this['getColorDataFromPluginParameters'](_0x210d50,_0xb0d03e);},ColorManager[_0x347547(0x22c)]=function(){const _0xb5ad7f=_0x347547,_0x3208c1='_stored_gaugeBackColor';this['_colorCache']=this['_colorCache']||{};if(this[_0xb5ad7f(0x287)][_0x3208c1])return this[_0xb5ad7f(0x287)][_0x3208c1];const _0x1ea1c5=VisuMZ['CoreEngine'][_0xb5ad7f(0x627)][_0xb5ad7f(0x76a)][_0xb5ad7f(0x673)];return this[_0xb5ad7f(0x474)](_0x3208c1,_0x1ea1c5);},ColorManager['hpGaugeColor1']=function(){const _0x4b0ba4=_0x347547,_0x261864=_0x4b0ba4(0x5a0);this[_0x4b0ba4(0x287)]=this[_0x4b0ba4(0x287)]||{};if(this['_colorCache'][_0x261864])return this[_0x4b0ba4(0x287)][_0x261864];const _0x56746b=VisuMZ['CoreEngine'][_0x4b0ba4(0x627)]['Color'][_0x4b0ba4(0x2d9)];return this[_0x4b0ba4(0x474)](_0x261864,_0x56746b);},ColorManager['hpGaugeColor2']=function(){const _0x1fb5f0=_0x347547,_0x11e3a3=_0x1fb5f0(0x136);this[_0x1fb5f0(0x287)]=this[_0x1fb5f0(0x287)]||{};if(this['_colorCache'][_0x11e3a3])return this['_colorCache'][_0x11e3a3];const _0x54dc48=VisuMZ[_0x1fb5f0(0x4c0)][_0x1fb5f0(0x627)][_0x1fb5f0(0x76a)]['ColorHPGauge2'];return this[_0x1fb5f0(0x474)](_0x11e3a3,_0x54dc48);},ColorManager['mpGaugeColor1']=function(){const _0x187dba=_0x347547,_0xad6823=_0x187dba(0x49b);this[_0x187dba(0x287)]=this[_0x187dba(0x287)]||{};if(this[_0x187dba(0x287)][_0xad6823])return this[_0x187dba(0x287)][_0xad6823];const _0x2775e0=VisuMZ[_0x187dba(0x4c0)][_0x187dba(0x627)][_0x187dba(0x76a)][_0x187dba(0x473)];return this[_0x187dba(0x474)](_0xad6823,_0x2775e0);},ColorManager[_0x347547(0x1c9)]=function(){const _0x5a0981=_0x347547,_0x13e736='_stored_mpGaugeColor2';this['_colorCache']=this[_0x5a0981(0x287)]||{};if(this['_colorCache'][_0x13e736])return this['_colorCache'][_0x13e736];const _0x471df7=VisuMZ[_0x5a0981(0x4c0)][_0x5a0981(0x627)]['Color'][_0x5a0981(0x475)];return this[_0x5a0981(0x474)](_0x13e736,_0x471df7);},ColorManager[_0x347547(0x23c)]=function(){const _0x28ab65=_0x347547,_0x3eda14=_0x28ab65(0x169);this['_colorCache']=this[_0x28ab65(0x287)]||{};if(this[_0x28ab65(0x287)][_0x3eda14])return this[_0x28ab65(0x287)][_0x3eda14];const _0x25c711=VisuMZ[_0x28ab65(0x4c0)][_0x28ab65(0x627)][_0x28ab65(0x76a)]['ColorMPCost'];return this[_0x28ab65(0x474)](_0x3eda14,_0x25c711);},ColorManager[_0x347547(0x574)]=function(){const _0x4d951a=_0x347547,_0x161336=_0x4d951a(0x892);this[_0x4d951a(0x287)]=this[_0x4d951a(0x287)]||{};if(this['_colorCache'][_0x161336])return this[_0x4d951a(0x287)][_0x161336];const _0x458cf5=VisuMZ[_0x4d951a(0x4c0)][_0x4d951a(0x627)][_0x4d951a(0x76a)][_0x4d951a(0x1a7)];return this['getColorDataFromPluginParameters'](_0x161336,_0x458cf5);},ColorManager['powerDownColor']=function(){const _0x193a44=_0x347547,_0x1e5d84=_0x193a44(0x245);this[_0x193a44(0x287)]=this[_0x193a44(0x287)]||{};if(this['_colorCache'][_0x1e5d84])return this[_0x193a44(0x287)][_0x1e5d84];const _0x1c289a=VisuMZ['CoreEngine'][_0x193a44(0x627)][_0x193a44(0x76a)][_0x193a44(0x87e)];return this['getColorDataFromPluginParameters'](_0x1e5d84,_0x1c289a);},ColorManager['ctGaugeColor1']=function(){const _0xda897b=_0x347547,_0xde53e2=_0xda897b(0x6d5);this[_0xda897b(0x287)]=this[_0xda897b(0x287)]||{};if(this[_0xda897b(0x287)][_0xde53e2])return this[_0xda897b(0x287)][_0xde53e2];const _0x5105b5=VisuMZ[_0xda897b(0x4c0)][_0xda897b(0x627)][_0xda897b(0x76a)][_0xda897b(0x755)];return this[_0xda897b(0x474)](_0xde53e2,_0x5105b5);},ColorManager['ctGaugeColor2']=function(){const _0x47b366=_0x347547,_0x40ac2b=_0x47b366(0x523);this[_0x47b366(0x287)]=this[_0x47b366(0x287)]||{};if(this[_0x47b366(0x287)][_0x40ac2b])return this['_colorCache'][_0x40ac2b];const _0xb19dd=VisuMZ['CoreEngine'][_0x47b366(0x627)][_0x47b366(0x76a)][_0x47b366(0x80f)];return this[_0x47b366(0x474)](_0x40ac2b,_0xb19dd);},ColorManager[_0x347547(0x406)]=function(){const _0x421770=_0x347547,_0x42834f=_0x421770(0x284);this['_colorCache']=this[_0x421770(0x287)]||{};if(this[_0x421770(0x287)][_0x42834f])return this['_colorCache'][_0x42834f];const _0x4092b6=VisuMZ['CoreEngine'][_0x421770(0x627)][_0x421770(0x76a)][_0x421770(0x124)];return this[_0x421770(0x474)](_0x42834f,_0x4092b6);},ColorManager['tpGaugeColor2']=function(){const _0x17edef=_0x347547,_0x2d2f27='_stored_tpGaugeColor2';this[_0x17edef(0x287)]=this[_0x17edef(0x287)]||{};if(this[_0x17edef(0x287)][_0x2d2f27])return this['_colorCache'][_0x2d2f27];const _0x4c4426=VisuMZ[_0x17edef(0x4c0)][_0x17edef(0x627)]['Color'][_0x17edef(0x156)];return this['getColorDataFromPluginParameters'](_0x2d2f27,_0x4c4426);},ColorManager['tpCostColor']=function(){const _0x5260ee=_0x347547,_0x864a4e=_0x5260ee(0x42e);this[_0x5260ee(0x287)]=this[_0x5260ee(0x287)]||{};if(this[_0x5260ee(0x287)][_0x864a4e])return this[_0x5260ee(0x287)][_0x864a4e];const _0x3d3876=VisuMZ['CoreEngine'][_0x5260ee(0x627)][_0x5260ee(0x76a)]['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x864a4e,_0x3d3876);},ColorManager['pendingColor']=function(){const _0x211eeb=_0x347547,_0x573b78=_0x211eeb(0x455);this[_0x211eeb(0x287)]=this[_0x211eeb(0x287)]||{};if(this[_0x211eeb(0x287)][_0x573b78])return this[_0x211eeb(0x287)][_0x573b78];const _0x3288d1=VisuMZ['CoreEngine'][_0x211eeb(0x627)]['Color'][_0x211eeb(0x1ee)];return this[_0x211eeb(0x474)](_0x573b78,_0x3288d1);},ColorManager[_0x347547(0x6a0)]=function(){const _0x386750=_0x347547,_0xc8aa7d='_stored_expGaugeColor1';this[_0x386750(0x287)]=this[_0x386750(0x287)]||{};if(this[_0x386750(0x287)][_0xc8aa7d])return this[_0x386750(0x287)][_0xc8aa7d];const _0x367f37=VisuMZ[_0x386750(0x4c0)][_0x386750(0x627)][_0x386750(0x76a)][_0x386750(0x11d)];return this[_0x386750(0x474)](_0xc8aa7d,_0x367f37);},ColorManager[_0x347547(0x505)]=function(){const _0x25055b=_0x347547,_0x538709=_0x25055b(0x83d);this[_0x25055b(0x287)]=this['_colorCache']||{};if(this[_0x25055b(0x287)][_0x538709])return this['_colorCache'][_0x538709];const _0x3606c0=VisuMZ[_0x25055b(0x4c0)]['Settings'][_0x25055b(0x76a)][_0x25055b(0x50b)];return this[_0x25055b(0x474)](_0x538709,_0x3606c0);},ColorManager[_0x347547(0x7b6)]=function(){const _0x12b36e=_0x347547,_0x5d60c9=_0x12b36e(0x12f);this[_0x12b36e(0x287)]=this[_0x12b36e(0x287)]||{};if(this[_0x12b36e(0x287)][_0x5d60c9])return this[_0x12b36e(0x287)][_0x5d60c9];const _0x5599f6=VisuMZ[_0x12b36e(0x4c0)][_0x12b36e(0x627)][_0x12b36e(0x76a)][_0x12b36e(0x395)];return this[_0x12b36e(0x474)](_0x5d60c9,_0x5599f6);},ColorManager['maxLvGaugeColor2']=function(){const _0x3711a1=_0x347547,_0x113b36='_stored_maxLvGaugeColor2';this[_0x3711a1(0x287)]=this['_colorCache']||{};if(this[_0x3711a1(0x287)][_0x113b36])return this[_0x3711a1(0x287)][_0x113b36];const _0x2ad7e1=VisuMZ[_0x3711a1(0x4c0)][_0x3711a1(0x627)][_0x3711a1(0x76a)][_0x3711a1(0x325)];return this[_0x3711a1(0x474)](_0x113b36,_0x2ad7e1);},ColorManager[_0x347547(0x77e)]=function(_0x32b5d9){const _0x44bb5f=_0x347547;return VisuMZ['CoreEngine'][_0x44bb5f(0x627)]['Color'][_0x44bb5f(0x2f9)][_0x44bb5f(0x248)](this,_0x32b5d9);},ColorManager[_0x347547(0x658)]=function(_0x37ecce){const _0x16ac2c=_0x347547;return VisuMZ[_0x16ac2c(0x4c0)][_0x16ac2c(0x627)][_0x16ac2c(0x76a)][_0x16ac2c(0x33b)][_0x16ac2c(0x248)](this,_0x37ecce);},ColorManager[_0x347547(0x274)]=function(_0x597bad){const _0x4ee0a7=_0x347547;return VisuMZ['CoreEngine'][_0x4ee0a7(0x627)]['Color'][_0x4ee0a7(0x785)][_0x4ee0a7(0x248)](this,_0x597bad);},ColorManager['paramchangeTextColor']=function(_0x4f6f4e){const _0x322d99=_0x347547;return VisuMZ[_0x322d99(0x4c0)]['Settings'][_0x322d99(0x76a)]['ParamChange'][_0x322d99(0x248)](this,_0x4f6f4e);},ColorManager[_0x347547(0x5d5)]=function(_0x4e48f7){const _0xefcd9f=_0x347547;return VisuMZ[_0xefcd9f(0x4c0)]['Settings']['Color'][_0xefcd9f(0xef)]['call'](this,_0x4e48f7);},ColorManager[_0x347547(0x198)]=function(){const _0xb05477=_0x347547;return VisuMZ[_0xb05477(0x4c0)][_0xb05477(0x627)]['Color'][_0xb05477(0x7b9)];},ColorManager[_0x347547(0x298)]=function(){const _0x4be3bd=_0x347547;return VisuMZ[_0x4be3bd(0x4c0)]['Settings'][_0x4be3bd(0x76a)][_0x4be3bd(0x595)]||_0x4be3bd(0x2e8);},ColorManager[_0x347547(0x87b)]=function(){const _0x5388fa=_0x347547;return VisuMZ['CoreEngine'][_0x5388fa(0x627)][_0x5388fa(0x76a)][_0x5388fa(0x59f)]||_0x5388fa(0x772);},ColorManager[_0x347547(0x57b)]=function(){const _0x30c3dc=_0x347547;return VisuMZ['CoreEngine'][_0x30c3dc(0x627)][_0x30c3dc(0x76a)][_0x30c3dc(0x10c)];},ColorManager[_0x347547(0xe7)]=function(){const _0x29c666=_0x347547;return VisuMZ['CoreEngine'][_0x29c666(0x627)][_0x29c666(0x76a)][_0x29c666(0x313)];},ColorManager[_0x347547(0x43a)]=function(){const _0x3c1ff7=_0x347547;return VisuMZ[_0x3c1ff7(0x4c0)][_0x3c1ff7(0x627)]['Color'][_0x3c1ff7(0x1ae)];},ColorManager['itemBackColor2']=function(){const _0x37a0f6=_0x347547;return VisuMZ[_0x37a0f6(0x4c0)]['Settings']['Color'][_0x37a0f6(0x7e2)];},SceneManager['_storedStack']=[],SceneManager['isSceneBattle']=function(){const _0x5c6d49=_0x347547;return this[_0x5c6d49(0x709)]&&this['_scene'][_0x5c6d49(0x2ac)]===Scene_Battle;},SceneManager[_0x347547(0x3eb)]=function(){const _0x57b3fc=_0x347547;return this['_scene']&&this['_scene'][_0x57b3fc(0x2ac)]===Scene_Map;},SceneManager[_0x347547(0x7d8)]=function(){const _0x1ad4dc=_0x347547;return this[_0x1ad4dc(0x709)]&&this[_0x1ad4dc(0x709)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x347547(0x17d)]=SceneManager[_0x347547(0x6f3)],SceneManager[_0x347547(0x6f3)]=function(){const _0x1d01f2=_0x347547;VisuMZ[_0x1d01f2(0x4c0)][_0x1d01f2(0x17d)][_0x1d01f2(0x248)](this),this[_0x1d01f2(0x107)]();},VisuMZ['CoreEngine'][_0x347547(0x4b7)]=SceneManager[_0x347547(0x794)],SceneManager[_0x347547(0x794)]=function(_0x130486){const _0x4feca3=_0x347547;if($gameTemp)this[_0x4feca3(0x8ce)](_0x130486);VisuMZ[_0x4feca3(0x4c0)]['SceneManager_onKeyDown'][_0x4feca3(0x248)](this,_0x130486);},SceneManager[_0x347547(0x8ce)]=function(_0x1d6305){const _0x2c19d9=_0x347547;if(!_0x1d6305[_0x2c19d9(0x3b3)]&&!_0x1d6305[_0x2c19d9(0x49a)]){if(_0x2c19d9(0x631)!==_0x2c19d9(0x631)){if(this[_0x2c19d9(0x8b7)]===_0x398ce3)this['initCoreEngine']();this[_0x2c19d9(0x8b7)][_0x2c19d9(0x5d4)]=this['initialBattleSystem']();}else switch(_0x1d6305['keyCode']){case 0x54:this[_0x2c19d9(0x8a2)]();break;case 0x75:this[_0x2c19d9(0x3ff)]();break;case 0x76:if(Input['isPressed'](_0x2c19d9(0x7ef))||Input['isPressed'](_0x2c19d9(0x6f1)))return;this['playTestF7']();break;}}},SceneManager[_0x347547(0x3ff)]=function(){const _0x19d919=_0x347547;if($gameTemp[_0x19d919(0x71c)]()&&VisuMZ[_0x19d919(0x4c0)][_0x19d919(0x627)][_0x19d919(0x4e9)]['F6key']){if(ConfigManager[_0x19d919(0x541)]!==0x0){if(_0x19d919(0x6bf)!==_0x19d919(0x6bf)){var _0x73f21e=_0x411fe[_0x19d919(0x4c0)][_0x19d919(0x7ad)][_0x19d919(0x248)](this,_0x11c7a6,_0x5dcfbb,_0x5085a9,_0x16a6bf);if(this[_0x19d919(0x520)]())_0x73f21e[_0x19d919(0x4f7)]=_0x12b1a1[_0x19d919(0x230)](_0x73f21e[_0x19d919(0x4f7)]);return _0x73f21e;}else ConfigManager[_0x19d919(0x1ed)]=0x0,ConfigManager[_0x19d919(0x6d6)]=0x0,ConfigManager[_0x19d919(0x753)]=0x0,ConfigManager[_0x19d919(0x541)]=0x0;}else ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x19d919(0x753)]=0x64,ConfigManager[_0x19d919(0x541)]=0x64;ConfigManager[_0x19d919(0x20a)]();if(this[_0x19d919(0x709)][_0x19d919(0x2ac)]===Scene_Options){if(this['_scene']['_optionsWindow'])this[_0x19d919(0x709)]['_optionsWindow'][_0x19d919(0x52a)]();if(this[_0x19d919(0x709)][_0x19d919(0x1f9)])this[_0x19d919(0x709)][_0x19d919(0x1f9)][_0x19d919(0x52a)]();}}},SceneManager['playTestF7']=function(){const _0x1e8657=_0x347547;if($gameTemp[_0x1e8657(0x71c)]()&&VisuMZ[_0x1e8657(0x4c0)][_0x1e8657(0x627)]['QoL'][_0x1e8657(0x2ab)]){if(_0x1e8657(0x4fe)!=='lQxSG')$gameTemp[_0x1e8657(0x8c9)]=!$gameTemp[_0x1e8657(0x8c9)];else return![];}},SceneManager['playTestCtrlT']=function(){const _0x1e6721=_0x347547;if(!$gameTemp[_0x1e6721(0x71c)]())return;if(!SceneManager[_0x1e6721(0x392)]())return;for(const _0x4fceb4 of $gameParty['members']()){if(_0x1e6721(0x89e)!==_0x1e6721(0x69b)){if(!_0x4fceb4)continue;_0x4fceb4[_0x1e6721(0x4ef)](_0x4fceb4[_0x1e6721(0x7ce)]());}else{_0x4d963e['CoreEngine'][_0x1e6721(0x627)][_0x1e6721(0x3b8)][_0x1e6721(0x2a5)][_0x1e6721(0x35d)]['call'](this);if(_0x3547b3[_0x1e6721(0x648)]!==''&&_0xc5539[_0x1e6721(0x648)]!=='Subtitle')this['drawGameSubtitle']();if(_0x37d95c[_0x1e6721(0x871)]!==''&&_0x5814b4['version']!==_0x1e6721(0x522))this['drawGameVersion']();}}},SceneManager[_0x347547(0x107)]=function(){const _0x478505=_0x347547;this['_sideButtonLayout']=![],this[_0x478505(0x60a)]=!VisuMZ[_0x478505(0x4c0)][_0x478505(0x627)]['UI'][_0x478505(0x35b)];},SceneManager[_0x347547(0xf0)]=function(_0x5c95e5){const _0x491f57=_0x347547;VisuMZ[_0x491f57(0x4c0)][_0x491f57(0x627)]['UI']['SideButtons']&&(this[_0x491f57(0x6d1)]=_0x5c95e5);},SceneManager['isSideButtonLayout']=function(){const _0x32edba=_0x347547;return this[_0x32edba(0x6d1)];},SceneManager[_0x347547(0x184)]=function(){const _0x31bf9=_0x347547;return this[_0x31bf9(0x60a)];},SceneManager[_0x347547(0x71b)]=function(){const _0x13a6bb=_0x347547;return this[_0x13a6bb(0x184)]()||this[_0x13a6bb(0x7f9)]();},VisuMZ['CoreEngine']['SceneManager_isGameActive']=SceneManager[_0x347547(0x376)],SceneManager[_0x347547(0x376)]=function(){const _0x27e608=_0x347547;return VisuMZ[_0x27e608(0x4c0)][_0x27e608(0x627)][_0x27e608(0x4e9)]['RequireFocus']?VisuMZ[_0x27e608(0x4c0)]['SceneManager_isGameActive']['call'](this):!![];},SceneManager[_0x347547(0x742)]=function(_0x4ac3bd){const _0xa23e0a=_0x347547;if(_0x4ac3bd instanceof Error)this[_0xa23e0a(0x19c)](_0x4ac3bd);else{if(_0x4ac3bd instanceof Array&&_0x4ac3bd[0x0]===_0xa23e0a(0xdb))this[_0xa23e0a(0x847)](_0x4ac3bd);else{if(_0xa23e0a(0x350)===_0xa23e0a(0x350))this[_0xa23e0a(0x19a)](_0x4ac3bd);else{if(!this['showPointAnimations']())return;_0x38601c=_0x404c12||![],_0x134134=_0x396077||![];if(_0x3570b8[_0x39f93f]){const _0x560b38={'x':_0x336365,'y':_0x37250b,'animationId':_0x55cc8a,'mirror':_0x555a60,'mute':_0x1da334};this[_0xa23e0a(0x2f7)][_0xa23e0a(0x6f8)](_0x560b38);}}}}this[_0xa23e0a(0x1f6)]();},VisuMZ[_0x347547(0x4c0)]['BattleManager_processEscape']=BattleManager[_0x347547(0x428)],BattleManager[_0x347547(0x428)]=function(){const _0x26504e=_0x347547;if(VisuMZ[_0x26504e(0x4c0)][_0x26504e(0x627)][_0x26504e(0x4e9)]['EscapeAlways']){if(_0x26504e(0x280)===_0x26504e(0x280))this[_0x26504e(0x3e5)]();else return _0x2955d7[_0x26504e(0x613)][_0x26504e(0x248)](this);}else{if(_0x26504e(0x384)!==_0x26504e(0x56a))return VisuMZ[_0x26504e(0x4c0)][_0x26504e(0x15a)][_0x26504e(0x248)](this);else{try{_0xefb25f(_0x1a5b38);}catch(_0x519e2d){_0x7179e1[_0x26504e(0x71c)]()&&(_0x483639['log'](_0x26504e(0x2f8)),_0x136c4e['log'](_0x519e2d));}return!![];}}},BattleManager['processAlwaysEscape']=function(){const _0x2d62f6=_0x347547;return $gameParty[_0x2d62f6(0x19d)](),SoundManager[_0x2d62f6(0x2bf)](),this[_0x2d62f6(0x598)](),!![];},BattleManager[_0x347547(0x7e4)]=function(){const _0x4a4b7c=_0x347547;return $gameSystem[_0x4a4b7c(0x289)]()>=0x1;},BattleManager['isActiveTpb']=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x347547(0x4c0)]['Game_Temp_initialize']=Game_Temp[_0x347547(0x387)][_0x347547(0x6f3)],Game_Temp[_0x347547(0x387)][_0x347547(0x6f3)]=function(){const _0x2cb252=_0x347547;VisuMZ[_0x2cb252(0x4c0)]['Game_Temp_initialize'][_0x2cb252(0x248)](this),this[_0x2cb252(0x1f5)](),this[_0x2cb252(0x471)](),this['createPointAnimationQueue']();},Game_Temp['prototype']['forceOutOfPlaytest']=function(){const _0x4a3a42=_0x347547;VisuMZ[_0x4a3a42(0x4c0)][_0x4a3a42(0x627)][_0x4a3a42(0x4e9)][_0x4a3a42(0x691)]&&('atDlQ'===_0x4a3a42(0x3cf)?(this[_0x4a3a42(0x483)]=this['defaultInputMode'](),_0x59fec3[_0x4a3a42(0x4c0)][_0x4a3a42(0x81b)]['call'](this,_0x1488b1),this[_0x4a3a42(0x483)]===_0x4a3a42(0x40f)?this['select'](0x0):(_0x926d64[_0x4a3a42(0x16b)](),this[_0x4a3a42(0x622)]())):this[_0x4a3a42(0x576)]=![]);},Game_Temp[_0x347547(0x387)][_0x347547(0x6b2)]=function(_0x3ae096){const _0x117b7d=_0x347547;this[_0x117b7d(0x516)]=_0x3ae096;},Game_Temp[_0x347547(0x387)][_0x347547(0x7fe)]=function(){const _0x243cec=_0x347547;return this[_0x243cec(0x516)];},Game_Temp[_0x347547(0x387)]['clearForcedGameTroopSettingsCoreEngine']=function(){this['_forcedTroopView']=undefined,this['_forcedBattleSys']=undefined;},Game_Temp['prototype'][_0x347547(0x752)]=function(_0x126415){const _0x22379e=_0x347547;$gameMap&&$dataMap&&$dataMap[_0x22379e(0x76f)]&&this[_0x22379e(0x46f)]($dataMap['note']);const _0x53b7fa=$dataTroops[_0x126415];if(_0x53b7fa){let _0x50cc78=DataManager['createTroopNote'](_0x53b7fa['id']);this[_0x22379e(0x46f)](_0x50cc78);}},Game_Temp[_0x347547(0x387)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x59f31c){const _0x5aa2c8=_0x347547;if(!_0x59f31c)return;if(_0x59f31c['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x5aa2c8(0x3c3)]='FV';else{if(_0x59f31c['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('XOnlb'===_0x5aa2c8(0x6f6)){const _0x1d0e37=String(RegExp['$1']);if(_0x1d0e37[_0x5aa2c8(0x249)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x5aa2c8(0x3c3)]='FV';else _0x1d0e37[_0x5aa2c8(0x249)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(_0x5aa2c8(0x54d)==='vmgXU'?(_0x3660c3[_0x5aa2c8(0x16b)](),this[_0x5aa2c8(0x622)]()):this['_forcedTroopView']='SV');}else return _0x2bbead[_0x5aa2c8(0x649)][_0x5aa2c8(0x3af)][_0x5aa2c8(0x248)](this);}}}if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:DTB)>/i))_0x5aa2c8(0x1fc)===_0x5aa2c8(0x4d3)?!_0x2ef042[_0x5aa2c8(0xc7)]&&_0x2a1734[_0x5aa2c8(0x3d0)]&&_0x4253b5[_0x5aa2c8(0x3be)](_0x1b2093):this['_forcedBattleSys']=0x0;else{if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x5aa2c8(0x3c9)]=0x1;else{if(_0x59f31c['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x59f31c['match'](/<(?:CTB)>/i))_0x5aa2c8(0x3c6)!=='KbMdH'?(this['scaleSprite'](_0x437a55),this[_0x5aa2c8(0x57a)](_0x2ac1dc)):Imported[_0x5aa2c8(0x5d3)]&&(this[_0x5aa2c8(0x3c9)]='CTB');else{if(_0x59f31c['match'](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(_0x5aa2c8(0x3f1)===_0x5aa2c8(0x3f1)?this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x7e3):_0x1c2ec4[_0x5aa2c8(0x4c0)][_0x5aa2c8(0x3fa)]['call'](this));else{if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:BTB)>/i)){if(Imported[_0x5aa2c8(0x335)]){if(_0x5aa2c8(0x828)!=='DYtbG'){const _0x339e61=this[_0x5aa2c8(0x897)]/0x5,_0x2f8532=_0x18760c[_0x5aa2c8(0x709)],_0x167077=_0x2f8532[_0x5aa2c8(0xcb)[_0x5aa2c8(0x83a)](_0x29c42e)](),_0x293961=_0x2f8532[_0x5aa2c8(0xcc)[_0x5aa2c8(0x83a)](_0x156484)]();this[_0x5aa2c8(0x826)][_0x5aa2c8(0x179)[_0x5aa2c8(0x83a)](_0x9e3156)]=_0x167077,this[_0x5aa2c8(0x826)]['text%1'['format'](_0x1b9eee)]=_0x293961;if(_0x167077==='')return;if(_0x293961==='')return;const _0x60e72e=_0x2f8532[_0x5aa2c8(0x661)[_0x5aa2c8(0x83a)](_0x2808ca)](),_0x10f1bc=this['itemPadding'](),_0x967cf0=_0x339e61*(_0x5eee6b-0x1)+_0x10f1bc+_0x60e72e,_0x258b4e=_0x2cb444[_0x5aa2c8(0x4c0)][_0x5aa2c8(0x627)][_0x5aa2c8(0x13e)][_0x5aa2c8(0x3e8)];this[_0x5aa2c8(0x200)](_0x258b4e[_0x5aa2c8(0x83a)](_0x167077,_0x293961),_0x967cf0,0x0,_0x339e61-_0x10f1bc*0x2);}else this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x220);}}else{if(_0x59f31c['match'](/<(?:FTB)>/i)){if(_0x5aa2c8(0x4a8)!==_0x5aa2c8(0x164)){if(Imported[_0x5aa2c8(0x71d)]){if(_0x5aa2c8(0x4a3)!==_0x5aa2c8(0x129))this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x109);else{_0x279b41=_0x3bb8d5(_0x123d71||'')['toUpperCase']();const _0x4205f1=_0x3f7c8d['CoreEngine'][_0x5aa2c8(0x627)][_0x5aa2c8(0x8a1)];if(_0x3739b2===_0x5aa2c8(0x2aa))return _0xe68202[_0x5aa2c8(0x5f8)]['params'][0x0];if(_0x3a8c45===_0x5aa2c8(0x7a4))return _0x21a33a[_0x5aa2c8(0x5f8)][_0x5aa2c8(0x3f7)][0x1];if(_0x4fcf70===_0x5aa2c8(0x477))return _0x45c46d[_0x5aa2c8(0x5f8)]['params'][0x2];if(_0x182fe0===_0x5aa2c8(0x7c4))return _0x306136['terms'][_0x5aa2c8(0x3f7)][0x3];if(_0x3d732b===_0x5aa2c8(0x6ce))return _0x510748[_0x5aa2c8(0x5f8)][_0x5aa2c8(0x3f7)][0x4];if(_0x3e68dd==='MDF')return _0x274365['terms']['params'][0x5];if(_0x5f0d03==='AGI')return _0x5ea7d7['terms'][_0x5aa2c8(0x3f7)][0x6];if(_0x4b3796===_0x5aa2c8(0x170))return _0x67ffd6[_0x5aa2c8(0x5f8)][_0x5aa2c8(0x3f7)][0x7];if(_0x560c82===_0x5aa2c8(0x534))return _0x4205f1['XParamVocab0'];if(_0x13181d===_0x5aa2c8(0x28a))return _0x4205f1[_0x5aa2c8(0x640)];if(_0x4db55d===_0x5aa2c8(0x302))return _0x4205f1['XParamVocab2'];if(_0x27b432==='CEV')return _0x4205f1[_0x5aa2c8(0x43f)];if(_0x4f4cbe==='MEV')return _0x4205f1['XParamVocab4'];if(_0x5c3b07===_0x5aa2c8(0x266))return _0x4205f1[_0x5aa2c8(0x5eb)];if(_0x4c71fe==='CNT')return _0x4205f1[_0x5aa2c8(0x6da)];if(_0x4e1a99==='HRG')return _0x4205f1[_0x5aa2c8(0x345)];if(_0x5c652d===_0x5aa2c8(0x5f7))return _0x4205f1[_0x5aa2c8(0x23b)];if(_0x19b736===_0x5aa2c8(0x4e7))return _0x4205f1[_0x5aa2c8(0x1ac)];if(_0x2fd8bd===_0x5aa2c8(0xfd))return _0x4205f1[_0x5aa2c8(0x365)];if(_0x32cbc4===_0x5aa2c8(0x3c2))return _0x4205f1['SParamVocab1'];if(_0x6cf516==='REC')return _0x4205f1[_0x5aa2c8(0x81f)];if(_0x33c8ab===_0x5aa2c8(0xd5))return _0x4205f1[_0x5aa2c8(0x359)];if(_0x3a4fc0===_0x5aa2c8(0x2a0))return _0x4205f1['SParamVocab4'];if(_0x22501f===_0x5aa2c8(0x412))return _0x4205f1[_0x5aa2c8(0x54e)];if(_0x297a5e===_0x5aa2c8(0xd9))return _0x4205f1[_0x5aa2c8(0x14c)];if(_0x4035b3===_0x5aa2c8(0x3a6))return _0x4205f1[_0x5aa2c8(0x151)];if(_0x34a271===_0x5aa2c8(0x6b1))return _0x4205f1[_0x5aa2c8(0x292)];if(_0x2dd6d1===_0x5aa2c8(0x810))return _0x4205f1[_0x5aa2c8(0x358)];if(_0x489ed0[_0x5aa2c8(0x4c0)][_0x5aa2c8(0x267)][_0x3f0e69])return _0x185deb['CoreEngine'][_0x5aa2c8(0x267)][_0x40a3c4];return'';}}}else this[_0x5aa2c8(0x464)](),this[_0x5aa2c8(0x70e)](),_0x40bcdb['CoreEngine'][_0x5aa2c8(0x13f)][_0x5aa2c8(0x248)](this,_0x17dca1);}else{if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(_0x5aa2c8(0x396)!=='RVTae'?(_0x43136c[_0x5aa2c8(0x831)](),_0x3aa371[_0x5aa2c8(0x5c4)](_0x57e1b9[_0x5aa2c8(0x286)]),_0x400778[_0x5aa2c8(0x286)]=_0x250bf1):this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x246));else{if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']='ETB');else{if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:PTB)>/i)){if('uwOhy'===_0x5aa2c8(0x3cc)){const _0x52d1d9=_0x5aa2c8(0x136);this['_colorCache']=this[_0x5aa2c8(0x287)]||{};if(this[_0x5aa2c8(0x287)][_0x52d1d9])return this[_0x5aa2c8(0x287)][_0x52d1d9];const _0x4bbd9f=_0x515786[_0x5aa2c8(0x4c0)]['Settings'][_0x5aa2c8(0x76a)][_0x5aa2c8(0x349)];return this['getColorDataFromPluginParameters'](_0x52d1d9,_0x4bbd9f);}else{if(Imported[_0x5aa2c8(0x432)]){if(_0x5aa2c8(0x2c1)===_0x5aa2c8(0x2c1))this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x6b4);else{const _0x2debbd=_0x155238[_0x5aa2c8(0x5e3)]()*_0x34bb3f['tileHeight']();return this['_y']-_0x2debbd;}}}}else{if(_0x59f31c[_0x5aa2c8(0x249)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('HKQXU'===_0x5aa2c8(0x1fd))this[_0x5aa2c8(0xca)]()&&this[_0x5aa2c8(0x308)](),_0x1b67ca[_0x5aa2c8(0x4c0)][_0x5aa2c8(0x119)]['call'](this);else{const _0x1b3a41=String(RegExp['$1']);if(_0x1b3a41[_0x5aa2c8(0x249)](/DTB/i)){if(_0x5aa2c8(0x2fb)==='Bpcmc'){const _0x4a465f=_0x5aa2c8(0x79f);this['_colorCache']=this[_0x5aa2c8(0x287)]||{};if(this[_0x5aa2c8(0x287)][_0x4a465f])return this[_0x5aa2c8(0x287)][_0x4a465f];const _0x321445=_0x39f152[_0x5aa2c8(0x4c0)][_0x5aa2c8(0x627)][_0x5aa2c8(0x76a)][_0x5aa2c8(0x673)];return this['getColorDataFromPluginParameters'](_0x4a465f,_0x321445);}else this[_0x5aa2c8(0x3c9)]=0x0;}else{if(_0x1b3a41['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x5aa2c8(0x3c9)]=0x1;else{if(_0x1b3a41[_0x5aa2c8(0x249)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x5aa2c8(0x3c9)]=0x2;else{if(_0x1b3a41[_0x5aa2c8(0x249)](/CTB/i))_0x5aa2c8(0x801)===_0x5aa2c8(0x801)?Imported[_0x5aa2c8(0x5d3)]&&(this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x575)):this['_inputWindow'][_0x5aa2c8(0x599)](_0x41885f[_0x5aa2c8(0x649)][_0x5aa2c8(0x59c)]);else{if(_0x1b3a41[_0x5aa2c8(0x249)](/STB/i))_0x5aa2c8(0x36b)!==_0x5aa2c8(0x36b)?(this[_0x5aa2c8(0x642)][_0x5aa2c8(0x52b)]=this[_0x5aa2c8(0x75d)](),this['contents'][_0x5aa2c8(0x127)](_0x2bfa50,_0x5005ed,_0x4bf4b2,_0x3c5607,this[_0x5aa2c8(0x11b)](),'left')):Imported[_0x5aa2c8(0x3c1)]&&(this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x7e3));else{if(_0x1b3a41['match'](/BTB/i)){if(_0x5aa2c8(0x381)==='cdNQu'){if(Imported[_0x5aa2c8(0x335)]){if(_0x5aa2c8(0x197)===_0x5aa2c8(0x83f))return _0x456ad2[_0x5aa2c8(0x1a5)];else this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x220);}}else return _0x4770ff[_0x5aa2c8(0x4c0)]['Settings'][_0x5aa2c8(0x13e)][_0x5aa2c8(0x6a5)];}else{if(_0x1b3a41[_0x5aa2c8(0x249)](/FTB/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x109));else{if(_0x1b3a41[_0x5aa2c8(0x249)](/OTB/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x246));else{if(_0x1b3a41[_0x5aa2c8(0x249)](/ETB/i))_0x5aa2c8(0x7ba)!==_0x5aa2c8(0x783)?Imported[_0x5aa2c8(0x352)]&&(this['_forcedBattleSys']=_0x5aa2c8(0x82f)):this[_0x5aa2c8(0x621)]['destroy']();else _0x1b3a41[_0x5aa2c8(0x249)](/PTB/i)&&(Imported[_0x5aa2c8(0x432)]&&(this[_0x5aa2c8(0x3c9)]=_0x5aa2c8(0x6b4)));}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x347547(0x387)]['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x347547(0x387)][_0x347547(0x80c)]=function(_0x4a2597,_0x1a0637,_0x29f1a8,_0x276884){const _0x11b08d=_0x347547;if(!this[_0x11b08d(0x244)]())return;_0x29f1a8=_0x29f1a8||![],_0x276884=_0x276884||![];if($dataAnimations[_0x1a0637]){const _0x4cb287={'targets':_0x4a2597,'animationId':_0x1a0637,'mirror':_0x29f1a8,'mute':_0x276884};this[_0x11b08d(0x439)][_0x11b08d(0x6f8)](_0x4cb287);for(const _0x533bfd of _0x4a2597){_0x533bfd[_0x11b08d(0xe8)]&&_0x533bfd['startAnimation']();}}},Game_Temp[_0x347547(0x387)][_0x347547(0x244)]=function(){return!![];},Game_Temp[_0x347547(0x387)]['retrieveFauxAnimation']=function(){const _0xb77516=_0x347547;return this['_fauxAnimationQueue'][_0xb77516(0x7ef)]();},Game_Temp[_0x347547(0x387)][_0x347547(0x579)]=function(){const _0x3bbc6b=_0x347547;this[_0x3bbc6b(0x2f7)]=[];},Game_Temp[_0x347547(0x387)][_0x347547(0x499)]=function(_0xf825b3,_0x521592,_0x4381a7,_0x23a456,_0x1f1081){const _0x32737e=_0x347547;if(!this[_0x32737e(0x883)]())return;_0x23a456=_0x23a456||![],_0x1f1081=_0x1f1081||![];if($dataAnimations[_0x4381a7]){if('dfZld'!=='iHWHU'){const _0x59ce23={'x':_0xf825b3,'y':_0x521592,'animationId':_0x4381a7,'mirror':_0x23a456,'mute':_0x1f1081};this[_0x32737e(0x2f7)][_0x32737e(0x6f8)](_0x59ce23);}else this[_0x32737e(0x17e)](this[_0x32737e(0x5e7)]()-0x1);}},Game_Temp[_0x347547(0x387)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x347547(0x387)][_0x347547(0x311)]=function(){const _0x384911=_0x347547;return this[_0x384911(0x2f7)]['shift']();},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System[_0x347547(0x387)][_0x347547(0x6f3)],Game_System[_0x347547(0x387)][_0x347547(0x6f3)]=function(){const _0x5b6d13=_0x347547;VisuMZ[_0x5b6d13(0x4c0)][_0x5b6d13(0x5b0)][_0x5b6d13(0x248)](this),this[_0x5b6d13(0x3d2)]();},Game_System[_0x347547(0x387)]['initCoreEngine']=function(){const _0x5a187b=_0x347547;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x5a187b(0x225)],'BattleSystem':this[_0x5a187b(0x773)](),'FontSize':$dataSystem[_0x5a187b(0x1e8)]['fontSize'],'Padding':0xc};},Game_System[_0x347547(0x387)][_0x347547(0x4cd)]=function(){const _0x1c552a=_0x347547;if($gameTemp[_0x1c552a(0x3c3)]==='SV')return _0x1c552a(0x6d0)!=='NYyKs'?(this[_0x1c552a(0x2fa)]=this['_cache']||{},this['_cache'][_0x1d8cba]!==_0x51ee3a):!![];else{if($gameTemp[_0x1c552a(0x3c3)]==='FV'){if(_0x1c552a(0x3dc)===_0x1c552a(0x3dc))return![];else _0x30894f[_0x1c552a(0x4c0)][_0x1c552a(0x8bf)][_0x1c552a(0x248)](this),this['loadGameImagesCoreEngine']();}}if(this[_0x1c552a(0x8b7)]===undefined)this[_0x1c552a(0x3d2)]();if(this[_0x1c552a(0x8b7)][_0x1c552a(0x720)]===undefined)this[_0x1c552a(0x3d2)]();return this[_0x1c552a(0x8b7)]['SideView'];},Game_System[_0x347547(0x387)][_0x347547(0x3ee)]=function(_0x10eed7){const _0x244645=_0x347547;if(this[_0x244645(0x8b7)]===undefined)this[_0x244645(0x3d2)]();if(this[_0x244645(0x8b7)][_0x244645(0x720)]===undefined)this[_0x244645(0x3d2)]();this[_0x244645(0x8b7)][_0x244645(0x720)]=_0x10eed7;},Game_System[_0x347547(0x387)][_0x347547(0x8ab)]=function(){const _0x15c326=_0x347547;if(this[_0x15c326(0x8b7)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x15c326(0x5d4)]=this[_0x15c326(0x773)]();},Game_System[_0x347547(0x387)][_0x347547(0x773)]=function(){const _0x10c743=_0x347547,_0x5957e3=(VisuMZ[_0x10c743(0x4c0)][_0x10c743(0x627)][_0x10c743(0x5d4)]||_0x10c743(0x594))[_0x10c743(0x173)]()['trim']();return VisuMZ[_0x10c743(0x4c0)][_0x10c743(0x700)](_0x5957e3);},Game_System[_0x347547(0x387)][_0x347547(0x289)]=function(){const _0xc74fcf=_0x347547;if($gameTemp[_0xc74fcf(0x3c9)]!==undefined)return $gameTemp[_0xc74fcf(0x3c9)];if(this[_0xc74fcf(0x8b7)]===undefined)this[_0xc74fcf(0x3d2)]();if(this[_0xc74fcf(0x8b7)][_0xc74fcf(0x5d4)]===undefined)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0xc74fcf(0x5d4)];},Game_System['prototype'][_0x347547(0xf4)]=function(_0x26489a){const _0x268496=_0x347547;if(this[_0x268496(0x8b7)]===undefined)this[_0x268496(0x3d2)]();if(this[_0x268496(0x8b7)][_0x268496(0x5d4)]===undefined)this[_0x268496(0x8ab)]();this['_CoreEngineSettings']['BattleSystem']=_0x26489a;},Game_System[_0x347547(0x387)][_0x347547(0x8cd)]=function(){const _0x1dd5d1=_0x347547;if(this[_0x1dd5d1(0x8b7)]===undefined)this[_0x1dd5d1(0x3d2)]();if(this[_0x1dd5d1(0x8b7)][_0x1dd5d1(0x492)]===undefined)this[_0x1dd5d1(0x3d2)]();return this[_0x1dd5d1(0x8b7)][_0x1dd5d1(0x492)];},Game_System[_0x347547(0x387)][_0x347547(0x18d)]=function(_0x52dd0d){const _0x167079=_0x347547;if(this[_0x167079(0x8b7)]===undefined)this[_0x167079(0x3d2)]();if(this[_0x167079(0x8b7)][_0x167079(0x185)]===undefined)this[_0x167079(0x3d2)]();this['_CoreEngineSettings'][_0x167079(0x492)]=_0x52dd0d;},Game_System[_0x347547(0x387)][_0x347547(0xe6)]=function(){const _0x563d05=_0x347547;if(this[_0x563d05(0x8b7)]===undefined)this[_0x563d05(0x3d2)]();if(this[_0x563d05(0x8b7)][_0x563d05(0x618)]===undefined)this[_0x563d05(0x3d2)]();return this[_0x563d05(0x8b7)][_0x563d05(0x618)];},Game_System[_0x347547(0x387)][_0x347547(0x5bf)]=function(_0xf8eaed){const _0x919f1b=_0x347547;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x919f1b(0x8b7)][_0x919f1b(0x185)]===undefined)this['initCoreEngine']();this[_0x919f1b(0x8b7)][_0x919f1b(0x618)]=_0xf8eaed;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x4a9)]=Game_Screen['prototype'][_0x347547(0x6f3)],Game_Screen['prototype']['initialize']=function(){const _0x4be992=_0x347547;VisuMZ[_0x4be992(0x4c0)][_0x4be992(0x4a9)]['call'](this),this[_0x4be992(0x3e3)]();},Game_Screen[_0x347547(0x387)]['initCoreEngineScreenShake']=function(){const _0x5180d6=_0x347547,_0x19fab5=VisuMZ[_0x5180d6(0x4c0)][_0x5180d6(0x627)][_0x5180d6(0x5a7)];this[_0x5180d6(0x535)]=_0x19fab5?.[_0x5180d6(0x490)]||_0x5180d6(0x72b);},Game_Screen[_0x347547(0x387)][_0x347547(0x7db)]=function(){const _0xa7530e=_0x347547;if(this[_0xa7530e(0x535)]===undefined)this['initCoreEngineScreenShake']();return this[_0xa7530e(0x535)];},Game_Screen[_0x347547(0x387)][_0x347547(0x403)]=function(_0x4415c3){const _0x1eb783=_0x347547;if(this['_coreEngineShakeStyle']===undefined)this[_0x1eb783(0x3e3)]();this[_0x1eb783(0x535)]=_0x4415c3[_0x1eb783(0x181)]()['trim']();},Game_Picture['prototype'][_0x347547(0x5ff)]=function(){const _0x1944be=_0x347547;if($gameParty[_0x1944be(0xfa)]())return![];return this[_0x1944be(0x771)]()&&this[_0x1944be(0x771)]()[_0x1944be(0x1b6)](0x0)==='!';},VisuMZ[_0x347547(0x4c0)][_0x347547(0x61c)]=Game_Picture[_0x347547(0x387)]['x'],Game_Picture[_0x347547(0x387)]['x']=function(){const _0x31792c=_0x347547;return this['isMapScrollLinked']()?this[_0x31792c(0x160)]():VisuMZ[_0x31792c(0x4c0)]['Game_Picture_x'][_0x31792c(0x248)](this);},Game_Picture[_0x347547(0x387)][_0x347547(0x160)]=function(){const _0xda4121=_0x347547,_0x3626a8=$gameMap['displayX']()*$gameMap[_0xda4121(0x2d7)]();return this['_x']-_0x3626a8;},VisuMZ['CoreEngine']['Game_Picture_y']=Game_Picture[_0x347547(0x387)]['y'],Game_Picture[_0x347547(0x387)]['y']=function(){const _0x498922=_0x347547;return this['isMapScrollLinked']()?this[_0x498922(0x239)]():VisuMZ[_0x498922(0x4c0)]['Game_Picture_y'][_0x498922(0x248)](this);},Game_Picture[_0x347547(0x387)][_0x347547(0x239)]=function(){const _0x56b7c7=_0x347547,_0x4540ee=$gameMap['displayY']()*$gameMap[_0x56b7c7(0x850)]();return this['_y']-_0x4540ee;},Game_Picture[_0x347547(0x387)][_0x347547(0x867)]=function(_0x5d414b){this['_coreEasingType']=_0x5d414b;},VisuMZ[_0x347547(0x4c0)]['Game_Picture_calcEasing']=Game_Picture['prototype'][_0x347547(0x762)],Game_Picture[_0x347547(0x387)]['calcEasing']=function(_0x3188f2){const _0x548edf=_0x347547;this[_0x548edf(0x2ce)]=this[_0x548edf(0x2ce)]||0x0;if([0x0,0x1,0x2,0x3][_0x548edf(0x4aa)](this['_coreEasingType'])){if(_0x548edf(0x4c7)!==_0x548edf(0x6a2))return VisuMZ[_0x548edf(0x4c0)][_0x548edf(0x20f)][_0x548edf(0x248)](this,_0x3188f2);else this[_0x548edf(0x16b)]();}else return VisuMZ['ApplyEasing'](_0x3188f2,this[_0x548edf(0x2ce)]);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x103)]=Game_Action[_0x347547(0x387)][_0x347547(0x858)],Game_Action[_0x347547(0x387)]['itemHit']=function(_0x1fadcb){const _0x2f6c20=_0x347547;if(VisuMZ[_0x2f6c20(0x4c0)][_0x2f6c20(0x627)]['QoL'][_0x2f6c20(0x80e)]){if('DuZcx'!=='FUNvs')return this[_0x2f6c20(0x183)](_0x1fadcb);else this[_0x2f6c20(0x3c9)]=0x0;}else{if('MHaHD'==='MHaHD')return VisuMZ['CoreEngine'][_0x2f6c20(0x103)][_0x2f6c20(0x248)](this,_0x1fadcb);else _0x1a5dcd['CoreEngine'][_0x2f6c20(0x310)][_0x2f6c20(0x248)](this,_0x1984d6);}},Game_Action[_0x347547(0x387)][_0x347547(0x183)]=function(_0x4eb527){const _0x116c2d=_0x347547,_0x18d651=this['itemSuccessRate'](_0x4eb527),_0x55b3b3=this[_0x116c2d(0x419)](_0x4eb527),_0x3292a7=this[_0x116c2d(0xec)](_0x4eb527);return _0x18d651*(_0x55b3b3-_0x3292a7);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x869)]=Game_Action['prototype']['itemEva'],Game_Action[_0x347547(0x387)][_0x347547(0x503)]=function(_0x493b9a){const _0x5df401=_0x347547;if(VisuMZ[_0x5df401(0x4c0)]['Settings'][_0x5df401(0x4e9)]['ImprovedAccuracySystem'])return 0x0;else{if('mCMot'===_0x5df401(0x89c))for(const _0x3d31bc of _0x304b5f[_0x5df401(0x86c)]){if(_0x3d31bc[_0x5df401(0x531)][_0x5df401(0x248)](this)){const _0x5849b0=_0x3d31bc[_0x5df401(0x316)];let _0x17c6f9=_0x3d31bc[_0x5df401(0x704)];if(['',_0x5df401(0x3a1)]['includes'](_0x17c6f9))_0x17c6f9=_0x3d31bc[_0x5df401(0x1c5)]['call'](this);const _0x47b24b=_0x3d31bc['EnableJS']['call'](this),_0x16dc75=_0x3d31bc['ExtJS'][_0x5df401(0x248)](this);this['addCommand'](_0x17c6f9,_0x5849b0,_0x47b24b,_0x16dc75),this[_0x5df401(0x66a)](_0x5849b0,_0x3d31bc['CallHandlerJS']['bind'](this,_0x16dc75));}}else return VisuMZ[_0x5df401(0x4c0)][_0x5df401(0x869)][_0x5df401(0x248)](this,_0x493b9a);}},Game_Action[_0x347547(0x387)][_0x347547(0x237)]=function(_0x2c4c9b){const _0x529be9=_0x347547;return this[_0x529be9(0x63f)]()[_0x529be9(0x551)]*0.01;},Game_Action[_0x347547(0x387)][_0x347547(0x419)]=function(_0x3abbfd){const _0x7a8d1a=_0x347547;if(VisuMZ[_0x7a8d1a(0x4c0)]['Settings'][_0x7a8d1a(0x4e9)][_0x7a8d1a(0x1a8)]&&this[_0x7a8d1a(0x12e)]())return 0x1;return this['isPhysical']()?VisuMZ['CoreEngine']['Settings'][_0x7a8d1a(0x4e9)]['AccuracyBoost']&&this[_0x7a8d1a(0x27a)]()[_0x7a8d1a(0x31d)]()?this[_0x7a8d1a(0x27a)]()['hit']+0.05:this[_0x7a8d1a(0x27a)]()[_0x7a8d1a(0x7fa)]:0x1;},Game_Action['prototype'][_0x347547(0xec)]=function(_0x40d096){const _0x2ee723=_0x347547;if(this[_0x2ee723(0x27a)]()[_0x2ee723(0x31d)]()===_0x40d096[_0x2ee723(0x31d)]())return 0x0;if(this[_0x2ee723(0x16c)]()){if(VisuMZ[_0x2ee723(0x4c0)][_0x2ee723(0x627)][_0x2ee723(0x4e9)][_0x2ee723(0x1a8)]&&_0x40d096[_0x2ee723(0x633)]()){if(_0x2ee723(0x3ec)!==_0x2ee723(0x3ec))this['_statusWindow'][_0x2ee723(0x599)](_0x320486[_0x2ee723(0x649)][_0x2ee723(0x5ae)]);else return _0x40d096[_0x2ee723(0x6d4)]-0.05;}else return'VogIK'!==_0x2ee723(0x405)?_0x1fd691[_0x2ee723(0x649)][_0x2ee723(0x608)][_0x2ee723(0x248)](this):_0x40d096[_0x2ee723(0x6d4)];}else return this[_0x2ee723(0x131)]()?_0x40d096[_0x2ee723(0x74b)]:0x0;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x4ff)]=Game_Action[_0x347547(0x387)][_0x347547(0x6a7)],Game_Action['prototype'][_0x347547(0x6a7)]=function(_0x192dd0){const _0xc36994=_0x347547;VisuMZ['CoreEngine'][_0xc36994(0x4ff)][_0xc36994(0x248)](this,_0x192dd0);if(VisuMZ[_0xc36994(0x4c0)][_0xc36994(0x627)][_0xc36994(0x4e9)][_0xc36994(0x80e)])return;const _0x4170c2=_0x192dd0[_0xc36994(0x147)]();_0x4170c2[_0xc36994(0x532)]&&(0x1-this['itemEva'](_0x192dd0)>this[_0xc36994(0x858)](_0x192dd0)&&(_0x4170c2[_0xc36994(0x532)]=![],_0x4170c2[_0xc36994(0x43e)]=!![]));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x330)]=Game_BattlerBase[_0x347547(0x387)][_0x347547(0x297)],Game_BattlerBase['prototype'][_0x347547(0x297)]=function(){const _0x23242f=_0x347547;this[_0x23242f(0x2fa)]={},VisuMZ[_0x23242f(0x4c0)][_0x23242f(0x330)][_0x23242f(0x248)](this);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x7d9)]=Game_BattlerBase[_0x347547(0x387)]['refresh'],Game_BattlerBase[_0x347547(0x387)][_0x347547(0x52a)]=function(){const _0xc9677b=_0x347547;this[_0xc9677b(0x2fa)]={},VisuMZ[_0xc9677b(0x4c0)][_0xc9677b(0x7d9)][_0xc9677b(0x248)](this);},Game_BattlerBase['prototype'][_0x347547(0x832)]=function(_0x1573ee){const _0x49ba49=_0x347547;return this[_0x49ba49(0x2fa)]=this['_cache']||{},this[_0x49ba49(0x2fa)][_0x1573ee]!==undefined;},Game_BattlerBase[_0x347547(0x387)]['paramPlus']=function(_0x58cd71){const _0x279b81=_0x347547,_0x3311ac=(_0x54bf0c,_0x1d0376)=>{const _0x53ef4f=_0x3084;if(!_0x1d0376)return _0x54bf0c;if(_0x1d0376[_0x53ef4f(0x76f)][_0x53ef4f(0x249)](VisuMZ[_0x53ef4f(0x4c0)]['RegExp'][_0x53ef4f(0x4b0)][_0x58cd71])){var _0x3e8002=Number(RegExp['$1']);_0x54bf0c+=_0x3e8002;}if(_0x1d0376['note'][_0x53ef4f(0x249)](VisuMZ[_0x53ef4f(0x4c0)]['RegExp']['paramPlusJS'][_0x58cd71])){var _0x26edec=String(RegExp['$1']);try{_0x53ef4f(0x5ab)===_0x53ef4f(0x65a)?(this[_0x53ef4f(0x332)]=new _0x269841[(_0x53ef4f(0x223))][(_0x53ef4f(0x4c3))](_0x1bd12e=!![]),this['_backgroundSprite']=new _0x4ff36a(),this[_0x53ef4f(0x511)]['bitmap']=_0x113903['backgroundBitmap'](),this[_0x53ef4f(0x511)][_0x53ef4f(0x223)]=[this[_0x53ef4f(0x332)]],this[_0x53ef4f(0x6cf)](this[_0x53ef4f(0x511)]),this[_0x53ef4f(0x554)](0xc0),this[_0x53ef4f(0x554)](this[_0x53ef4f(0x6cc)]()),this[_0x53ef4f(0x37b)]()):_0x54bf0c+=eval(_0x26edec);}catch(_0x48e916){if('gnfUl'==='vxsKx'){let _0x4457d6=_0x2fca3a[_0x53ef4f(0x545)](0x0,this[_0x53ef4f(0x418)]());const _0x12c041=this[_0x53ef4f(0x5e7)](),_0xc43c7e=this['maxCols']();if(this[_0x53ef4f(0x14d)]()&&_0x4457d6>0x0||_0x49fe52&&_0xc43c7e===0x1){_0x4457d6-=_0xc43c7e;if(_0x4457d6<=0x0)_0x4457d6=0x0;this[_0x53ef4f(0x17e)](_0x4457d6);}else!this['isUseModernControls']()&&((_0x4457d6>=_0xc43c7e||_0x314fb4&&_0xc43c7e===0x1)&&this[_0x53ef4f(0x17e)]((_0x4457d6-_0xc43c7e+_0x12c041)%_0x12c041));}else{if($gameTemp[_0x53ef4f(0x71c)]())console[_0x53ef4f(0x65c)](_0x48e916);}}}return _0x54bf0c;};return this['traitObjects']()[_0x279b81(0x825)](_0x3311ac,this['_paramPlus'][_0x58cd71]);},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x44a)]=function(_0x29ca99){const _0x13e28f=_0x347547;var _0x4c189a=_0x13e28f(0x708)+(this[_0x13e28f(0x31d)]()?'Actor':'Enemy')+'ParamMax'+_0x29ca99;if(this['checkCacheKey'](_0x4c189a))return this[_0x13e28f(0x2fa)][_0x4c189a];this[_0x13e28f(0x2fa)][_0x4c189a]=eval(VisuMZ[_0x13e28f(0x4c0)][_0x13e28f(0x627)][_0x13e28f(0x8a1)][_0x4c189a]);const _0x7ca9a6=(_0x921af6,_0x19ee9f)=>{const _0xcdfc43=_0x13e28f;if(_0xcdfc43(0x104)!==_0xcdfc43(0x104)){let _0x133fd1=_0x41076b[_0x347bbf],_0x1f609a=this['textSizeEx'](_0x133fd1)[_0xcdfc43(0x4da)],_0x31fb6a=_0x1c9e6a[_0xcdfc43(0x231)]((this['contents'][_0xcdfc43(0x4da)]-_0x1f609a)/0x2);this[_0xcdfc43(0x200)](_0x133fd1,_0x31fb6a,_0x28f197),_0x5625d8+=this['lineHeight']();}else{if(!_0x19ee9f)return _0x921af6;if(_0x19ee9f[_0xcdfc43(0x76f)][_0xcdfc43(0x249)](VisuMZ[_0xcdfc43(0x4c0)][_0xcdfc43(0x7dc)][_0xcdfc43(0x44a)][_0x29ca99])){var _0x19d1e9=Number(RegExp['$1']);if(_0x19d1e9===0x0)_0x19d1e9=Number['MAX_SAFE_INTEGER'];_0x921af6=Math[_0xcdfc43(0x545)](_0x921af6,_0x19d1e9);}if(_0x19ee9f[_0xcdfc43(0x76f)][_0xcdfc43(0x249)](VisuMZ[_0xcdfc43(0x4c0)][_0xcdfc43(0x7dc)][_0xcdfc43(0xc6)][_0x29ca99])){var _0x290351=String(RegExp['$1']);try{if(_0xcdfc43(0x87c)===_0xcdfc43(0x234)){const _0x30d66f=new _0x92c88();_0x30d66f['x']=_0x37af74['x'],_0x30d66f['y']=_0x4c053f['y'],_0x30d66f['z']=0x64;const _0x51411e=this[_0xcdfc43(0x3a7)]();return _0x51411e[_0xcdfc43(0x6cf)](_0x30d66f),[_0x30d66f];}else _0x921af6=Math[_0xcdfc43(0x545)](_0x921af6,Number(eval(_0x290351)));}catch(_0x24882a){if(_0xcdfc43(0x6e9)===_0xcdfc43(0x6e9)){if($gameTemp['isPlaytest']())console[_0xcdfc43(0x65c)](_0x24882a);}else _0x4dabf8[_0xcdfc43(0x4c0)]['Scene_Name_create'][_0xcdfc43(0x248)](this),this[_0xcdfc43(0x564)]();}}return _0x921af6;}};if(this[_0x13e28f(0x2fa)][_0x4c189a]===0x0)this['_cache'][_0x4c189a]=Number[_0x13e28f(0x66b)];return this[_0x13e28f(0x2fa)][_0x4c189a]=this[_0x13e28f(0x34c)]()[_0x13e28f(0x825)](_0x7ca9a6,this[_0x13e28f(0x2fa)][_0x4c189a]),this[_0x13e28f(0x2fa)][_0x4c189a];},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x20b)]=function(_0x3a5e57){const _0xd70bb9=_0x347547,_0xa0fe2a=this[_0xd70bb9(0x741)](Game_BattlerBase[_0xd70bb9(0x61a)],_0x3a5e57),_0x39ca00=(_0x4aacd4,_0x201cb9)=>{const _0x2cd35e=_0xd70bb9;if(!_0x201cb9)return _0x4aacd4;if(_0x201cb9[_0x2cd35e(0x76f)][_0x2cd35e(0x249)](VisuMZ[_0x2cd35e(0x4c0)]['RegExp']['paramRate1'][_0x3a5e57])){var _0x3d9399=Number(RegExp['$1'])/0x64;_0x4aacd4*=_0x3d9399;}if(_0x201cb9['note'][_0x2cd35e(0x249)](VisuMZ[_0x2cd35e(0x4c0)][_0x2cd35e(0x7dc)]['paramRate2'][_0x3a5e57])){if(_0x2cd35e(0x7c6)!==_0x2cd35e(0x8b4)){var _0x3d9399=Number(RegExp['$1']);_0x4aacd4*=_0x3d9399;}else this[_0x2cd35e(0x3a2)]={'duration':0x0,'wholeDuration':0x0,'type':_0x2cd35e(0x7c7),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x2cd35e(0x8ad)]['x'],'targetScaleY':this[_0x2cd35e(0x8ad)]['y'],'targetOpacity':this[_0x2cd35e(0x238)],'targetBackOpacity':this[_0x2cd35e(0x265)],'targetContentsOpacity':this[_0x2cd35e(0x2a3)]};}if(_0x201cb9[_0x2cd35e(0x76f)][_0x2cd35e(0x249)](VisuMZ[_0x2cd35e(0x4c0)][_0x2cd35e(0x7dc)][_0x2cd35e(0x568)][_0x3a5e57])){var _0x54d475=String(RegExp['$1']);try{_0x4aacd4*=eval(_0x54d475);}catch(_0x41b307){if('iqeRK'===_0x2cd35e(0x79b)){if($gameTemp[_0x2cd35e(0x71c)]())console[_0x2cd35e(0x65c)](_0x41b307);}else{const _0x5f3607=_0x2cd35e(0x42e);this[_0x2cd35e(0x287)]=this[_0x2cd35e(0x287)]||{};if(this[_0x2cd35e(0x287)][_0x5f3607])return this[_0x2cd35e(0x287)][_0x5f3607];const _0x4c9acc=_0x3c132d[_0x2cd35e(0x4c0)][_0x2cd35e(0x627)]['Color'][_0x2cd35e(0x1ee)];return this[_0x2cd35e(0x474)](_0x5f3607,_0x4c9acc);}}}return _0x4aacd4;};return this[_0xd70bb9(0x34c)]()[_0xd70bb9(0x825)](_0x39ca00,_0xa0fe2a);},Game_BattlerBase['prototype'][_0x347547(0x21b)]=function(_0xc5b275){const _0x35f41b=_0x347547,_0x1a4d6d=(_0x3ddebf,_0x534008)=>{const _0x4bec40=_0x3084;if(_0x4bec40(0x5a8)===_0x4bec40(0x3f2)){if(_0x39b8d0 instanceof _0x892458)this['catchNormalError'](_0x5782ea);else _0x53883c instanceof _0x173871&&_0x340dab[0x0]===_0x4bec40(0xdb)?this['catchLoadError'](_0x4574e4):this[_0x4bec40(0x19a)](_0x4e4192);this[_0x4bec40(0x1f6)]();}else{if(!_0x534008)return _0x3ddebf;if(_0x534008[_0x4bec40(0x76f)]['match'](VisuMZ[_0x4bec40(0x4c0)]['RegExp'][_0x4bec40(0x30b)][_0xc5b275])){var _0x10394e=Number(RegExp['$1']);_0x3ddebf+=_0x10394e;}if(_0x534008[_0x4bec40(0x76f)][_0x4bec40(0x249)](VisuMZ[_0x4bec40(0x4c0)]['RegExp'][_0x4bec40(0x56f)][_0xc5b275])){if(_0x4bec40(0x5d7)==='zmbME'){var _0x54ed35=String(RegExp['$1']);try{if(_0x4bec40(0x827)!==_0x4bec40(0x3bd))_0x3ddebf+=eval(_0x54ed35);else return this['refresh']();}catch(_0x1da7fb){if($gameTemp[_0x4bec40(0x71c)]())console['log'](_0x1da7fb);}}else return _0x13f750[_0x4bec40(0x649)][_0x4bec40(0x5b1)][_0x4bec40(0x248)](this);}return _0x3ddebf;}};return this[_0x35f41b(0x34c)]()[_0x35f41b(0x825)](_0x1a4d6d,0x0);},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x530)]=function(_0x26fca6){const _0x111f2f=_0x347547;let _0x5c3888=_0x111f2f(0x530)+_0x26fca6+_0x111f2f(0x726);if(this[_0x111f2f(0x832)](_0x5c3888))return this[_0x111f2f(0x2fa)][_0x5c3888];return this[_0x111f2f(0x2fa)][_0x5c3888]=Math[_0x111f2f(0x22b)](VisuMZ[_0x111f2f(0x4c0)][_0x111f2f(0x627)][_0x111f2f(0x8a1)][_0x111f2f(0x3f3)][_0x111f2f(0x248)](this,_0x26fca6)),this['_cache'][_0x5c3888];},Game_BattlerBase[_0x347547(0x387)]['xparamPlus']=function(_0x26d9fa){const _0x1d89b2=_0x347547,_0x1cb946=(_0x577d30,_0x333273)=>{const _0x12513a=_0x3084;if(!_0x333273)return _0x577d30;if(_0x333273['note'][_0x12513a(0x249)](VisuMZ[_0x12513a(0x4c0)]['RegExp'][_0x12513a(0x553)][_0x26d9fa])){var _0x23ecfb=Number(RegExp['$1'])/0x64;_0x577d30+=_0x23ecfb;}if(_0x333273[_0x12513a(0x76f)][_0x12513a(0x249)](VisuMZ[_0x12513a(0x4c0)][_0x12513a(0x7dc)]['xparamPlus2'][_0x26d9fa])){if(_0x12513a(0x7a0)!==_0x12513a(0x5da)){var _0x23ecfb=Number(RegExp['$1']);_0x577d30+=_0x23ecfb;}else{if(_0x58a135[_0x3d2cd7][_0x12513a(0x8a9)])return!![];}}if(_0x333273[_0x12513a(0x76f)][_0x12513a(0x249)](VisuMZ[_0x12513a(0x4c0)][_0x12513a(0x7dc)][_0x12513a(0x209)][_0x26d9fa])){if(_0x12513a(0x1f8)!==_0x12513a(0x1f8))this['_opening']&&(this[_0x12513a(0x36f)]+=this[_0x12513a(0x581)](),this[_0x12513a(0x217)]()&&(this['_opening']=![]));else{var _0x4092e4=String(RegExp['$1']);try{_0x577d30+=eval(_0x4092e4);}catch(_0x5760d7){if(_0x12513a(0x3c0)===_0x12513a(0x3c0)){if($gameTemp[_0x12513a(0x71c)]())console['log'](_0x5760d7);}else _0x4255ef[_0x12513a(0x4c0)]['Input_setupEventHandlers']['call'](this),_0x2c0a0c['addEventListener'](_0x12513a(0x7f6),this[_0x12513a(0x600)][_0x12513a(0x49c)](this));}}}return _0x577d30;};return this['traitObjects']()[_0x1d89b2(0x825)](_0x1cb946,0x0);},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x3c4)]=function(_0x2b1ac6){const _0x5bdccf=_0x347547,_0x8f5f5a=(_0x2dfe16,_0x141814)=>{const _0x33ce74=_0x3084;if(_0x33ce74(0x818)!==_0x33ce74(0x818))this[_0x33ce74(0x5c5)](_0x50ac2d);else{if(!_0x141814)return _0x2dfe16;if(_0x141814[_0x33ce74(0x76f)][_0x33ce74(0x249)](VisuMZ[_0x33ce74(0x4c0)][_0x33ce74(0x7dc)][_0x33ce74(0x431)][_0x2b1ac6])){if(_0x33ce74(0x5c0)!=='oXDyy'){var _0xf21bc7=Number(RegExp['$1'])/0x64;_0x2dfe16*=_0xf21bc7;}else this['catchNormalError'](_0x523ca1);}if(_0x141814[_0x33ce74(0x76f)]['match'](VisuMZ[_0x33ce74(0x4c0)][_0x33ce74(0x7dc)][_0x33ce74(0x7c5)][_0x2b1ac6])){var _0xf21bc7=Number(RegExp['$1']);_0x2dfe16*=_0xf21bc7;}if(_0x141814[_0x33ce74(0x76f)][_0x33ce74(0x249)](VisuMZ[_0x33ce74(0x4c0)][_0x33ce74(0x7dc)][_0x33ce74(0x5cf)][_0x2b1ac6])){var _0x28139c=String(RegExp['$1']);try{_0x2dfe16*=eval(_0x28139c);}catch(_0x4712c9){if($gameTemp[_0x33ce74(0x71c)]())console[_0x33ce74(0x65c)](_0x4712c9);}}return _0x2dfe16;}};return this[_0x5bdccf(0x34c)]()[_0x5bdccf(0x825)](_0x8f5f5a,0x1);},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x256)]=function(_0xe6d2c9){const _0x376af1=_0x347547,_0x37ad3d=(_0x47492e,_0x187ea9)=>{const _0xbde282=_0x3084;if(!_0x187ea9)return _0x47492e;if(_0x187ea9['note'][_0xbde282(0x249)](VisuMZ['CoreEngine']['RegExp'][_0xbde282(0x7da)][_0xe6d2c9])){var _0x1ca8f3=Number(RegExp['$1'])/0x64;_0x47492e+=_0x1ca8f3;}if(_0x187ea9[_0xbde282(0x76f)][_0xbde282(0x249)](VisuMZ[_0xbde282(0x4c0)]['RegExp'][_0xbde282(0x787)][_0xe6d2c9])){if(_0xbde282(0x25e)!==_0xbde282(0x25e))this['openness']+=this[_0xbde282(0x581)](),this[_0xbde282(0x217)]()&&(this[_0xbde282(0x603)]=![]);else{var _0x1ca8f3=Number(RegExp['$1']);_0x47492e+=_0x1ca8f3;}}if(_0x187ea9[_0xbde282(0x76f)][_0xbde282(0x249)](VisuMZ[_0xbde282(0x4c0)][_0xbde282(0x7dc)][_0xbde282(0x2fc)][_0xe6d2c9])){var _0x258eef=String(RegExp['$1']);try{_0x47492e+=eval(_0x258eef);}catch(_0x348e19){if($gameTemp[_0xbde282(0x71c)]())console[_0xbde282(0x65c)](_0x348e19);}}return _0x47492e;};return this[_0x376af1(0x34c)]()[_0x376af1(0x825)](_0x37ad3d,0x0);},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x7ea)]=function(_0x8fec8e){const _0x50c3a5=_0x347547;let _0x2c4f0a=_0x50c3a5(0x7ea)+_0x8fec8e+'Total';if(this[_0x50c3a5(0x832)](_0x2c4f0a))return this[_0x50c3a5(0x2fa)][_0x2c4f0a];return this[_0x50c3a5(0x2fa)][_0x2c4f0a]=VisuMZ[_0x50c3a5(0x4c0)][_0x50c3a5(0x627)]['Param'][_0x50c3a5(0x422)][_0x50c3a5(0x248)](this,_0x8fec8e),this[_0x50c3a5(0x2fa)][_0x2c4f0a];},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x5e0)]=function(_0x319eba){const _0x346d60=_0x347547,_0x3273fd=(_0x509c85,_0x17c4ba)=>{const _0x3e47d9=_0x3084;if(!_0x17c4ba)return _0x509c85;if(_0x17c4ba[_0x3e47d9(0x76f)][_0x3e47d9(0x249)](VisuMZ[_0x3e47d9(0x4c0)][_0x3e47d9(0x7dc)][_0x3e47d9(0x2b4)][_0x319eba])){var _0x234d29=Number(RegExp['$1'])/0x64;_0x509c85+=_0x234d29;}if(_0x17c4ba[_0x3e47d9(0x76f)][_0x3e47d9(0x249)](VisuMZ[_0x3e47d9(0x4c0)][_0x3e47d9(0x7dc)][_0x3e47d9(0x68d)][_0x319eba])){if(_0x3e47d9(0x65d)!==_0x3e47d9(0x656)){var _0x234d29=Number(RegExp['$1']);_0x509c85+=_0x234d29;}else(_0x2acccb>=_0x467d23||_0x1cadcc&&_0x580aa4===0x1)&&this[_0x3e47d9(0x17e)]((_0x481349-_0x5eb550+_0x381023)%_0x4e88ea);}if(_0x17c4ba['note'][_0x3e47d9(0x249)](VisuMZ[_0x3e47d9(0x4c0)][_0x3e47d9(0x7dc)][_0x3e47d9(0x670)][_0x319eba])){if(_0x3e47d9(0x5fb)===_0x3e47d9(0x5fb)){var _0x2ed621=String(RegExp['$1']);try{_0x509c85+=eval(_0x2ed621);}catch(_0x30d6d1){if($gameTemp[_0x3e47d9(0x71c)]())console[_0x3e47d9(0x65c)](_0x30d6d1);}}else this[_0x3e47d9(0x3c9)]=_0x3e47d9(0x220);}return _0x509c85;};return this[_0x346d60(0x34c)]()['reduce'](_0x3273fd,0x0);},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x14b)]=function(_0x5502a1){const _0xee42a8=_0x347547,_0x528e3e=(_0xe1b618,_0x5884a7)=>{const _0x1b1a3a=_0x3084;if(_0x1b1a3a(0x44c)===_0x1b1a3a(0x4bf))return _0x526890[_0x1b1a3a(0x387)]['buttonAssistKey1']['call'](this);else{if(!_0x5884a7)return _0xe1b618;if(_0x5884a7['note'][_0x1b1a3a(0x249)](VisuMZ['CoreEngine'][_0x1b1a3a(0x7dc)][_0x1b1a3a(0x257)][_0x5502a1])){if(_0x1b1a3a(0x8ba)===_0x1b1a3a(0x110))for(const _0x347c00 of _0x574435[_0x1b1a3a(0x74f)]){[0x6c,0x198]['includes'](_0x347c00[_0x1b1a3a(0x614)])&&(_0x10b47e+='\x0a',_0xc8bb27+=_0x347c00['parameters'][0x0]);}else{var _0x15d201=Number(RegExp['$1'])/0x64;_0xe1b618*=_0x15d201;}}if(_0x5884a7[_0x1b1a3a(0x76f)][_0x1b1a3a(0x249)](VisuMZ[_0x1b1a3a(0x4c0)][_0x1b1a3a(0x7dc)][_0x1b1a3a(0x19f)][_0x5502a1])){var _0x15d201=Number(RegExp['$1']);_0xe1b618*=_0x15d201;}if(_0x5884a7[_0x1b1a3a(0x76f)][_0x1b1a3a(0x249)](VisuMZ[_0x1b1a3a(0x4c0)][_0x1b1a3a(0x7dc)][_0x1b1a3a(0xfc)][_0x5502a1])){var _0x48e2a6=String(RegExp['$1']);try{_0xe1b618*=eval(_0x48e2a6);}catch(_0x13f1df){if($gameTemp[_0x1b1a3a(0x71c)]())console['log'](_0x13f1df);}}return _0xe1b618;}};return this['traitObjects']()[_0xee42a8(0x825)](_0x528e3e,0x1);},Game_BattlerBase['prototype'][_0x347547(0x7e1)]=function(_0x558de0){const _0x430b8f=_0x347547,_0x280c55=(_0x94414c,_0x142d62)=>{const _0x5a53fa=_0x3084;if('RBbYJ'!==_0x5a53fa(0x799))return _0x2c7f30?_0x417598(_0x49bfa7[_0x5a53fa(0x22b)](_0x7714aa*0x64))+'%':_0x437bbe;else{if(!_0x142d62)return _0x94414c;if(_0x142d62[_0x5a53fa(0x76f)][_0x5a53fa(0x249)](VisuMZ[_0x5a53fa(0x4c0)][_0x5a53fa(0x7dc)][_0x5a53fa(0x3c8)][_0x558de0])){var _0x5b429e=Number(RegExp['$1'])/0x64;_0x94414c+=_0x5b429e;}if(_0x142d62[_0x5a53fa(0x76f)]['match'](VisuMZ[_0x5a53fa(0x4c0)][_0x5a53fa(0x7dc)]['sparamFlat2'][_0x558de0])){var _0x5b429e=Number(RegExp['$1']);_0x94414c+=_0x5b429e;}if(_0x142d62['note'][_0x5a53fa(0x249)](VisuMZ[_0x5a53fa(0x4c0)][_0x5a53fa(0x7dc)]['sparamFlatJS'][_0x558de0])){if('OZrEu'!==_0x5a53fa(0x157)){if(this[_0x5a53fa(0x146)]>0x63)return this['paramBaseAboveLevel99'](_0x117599);return _0x3f95e4['CoreEngine']['Game_Actor_paramBase'][_0x5a53fa(0x248)](this,_0x151947);}else{var _0x34dff5=String(RegExp['$1']);try{_0x94414c+=eval(_0x34dff5);}catch(_0x3c2e58){if($gameTemp[_0x5a53fa(0x71c)]())console[_0x5a53fa(0x65c)](_0x3c2e58);}}}return _0x94414c;}};return this[_0x430b8f(0x34c)]()['reduce'](_0x280c55,0x0);},Game_BattlerBase[_0x347547(0x387)][_0x347547(0x87d)]=function(_0xa84216){const _0x3a3489=_0x347547;let _0xe149ca=_0x3a3489(0x87d)+_0xa84216+_0x3a3489(0x726);if(this[_0x3a3489(0x832)](_0xe149ca))return this[_0x3a3489(0x2fa)][_0xe149ca];return this[_0x3a3489(0x2fa)][_0xe149ca]=VisuMZ['CoreEngine'][_0x3a3489(0x627)][_0x3a3489(0x8a1)][_0x3a3489(0x6ba)]['call'](this,_0xa84216),this['_cache'][_0xe149ca];},Game_BattlerBase['prototype'][_0x347547(0x56d)]=function(_0x39f43d,_0xe5b3c){const _0x40cb97=_0x347547;if(typeof paramId===_0x40cb97(0x435))return this['param'](_0x39f43d);_0x39f43d=String(_0x39f43d||'')[_0x40cb97(0x173)]();if(_0x39f43d===_0x40cb97(0x2aa))return this[_0x40cb97(0x530)](0x0);if(_0x39f43d===_0x40cb97(0x7a4))return this[_0x40cb97(0x530)](0x1);if(_0x39f43d===_0x40cb97(0x477))return this[_0x40cb97(0x530)](0x2);if(_0x39f43d===_0x40cb97(0x7c4))return this[_0x40cb97(0x530)](0x3);if(_0x39f43d==='MAT')return this['param'](0x4);if(_0x39f43d===_0x40cb97(0x707))return this[_0x40cb97(0x530)](0x5);if(_0x39f43d===_0x40cb97(0x457))return this['param'](0x6);if(_0x39f43d==='LUK')return this[_0x40cb97(0x530)](0x7);if(_0x39f43d===_0x40cb97(0x534))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x7ea)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x39f43d===_0x40cb97(0x28a))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x7ea)](0x1)*0x64))+'%':this[_0x40cb97(0x7ea)](0x1);if(_0x39f43d==='CRI')return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x7ea)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x39f43d===_0x40cb97(0x337))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x7ea)](0x3)*0x64))+'%':this[_0x40cb97(0x7ea)](0x3);if(_0x39f43d===_0x40cb97(0x14f))return _0xe5b3c?String(Math['round'](this[_0x40cb97(0x7ea)](0x4)*0x64))+'%':this[_0x40cb97(0x7ea)](0x4);if(_0x39f43d==='MRF')return _0xe5b3c?String(Math['round'](this[_0x40cb97(0x7ea)](0x5)*0x64))+'%':this[_0x40cb97(0x7ea)](0x5);if(_0x39f43d===_0x40cb97(0xfb))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x7ea)](0x6)*0x64))+'%':this[_0x40cb97(0x7ea)](0x6);if(_0x39f43d===_0x40cb97(0x543))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x7ea)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x39f43d===_0x40cb97(0x5f7))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x7ea)](0x8)*0x64))+'%':this[_0x40cb97(0x7ea)](0x8);if(_0x39f43d===_0x40cb97(0x4e7))return _0xe5b3c?String(Math['round'](this[_0x40cb97(0x7ea)](0x9)*0x64))+'%':this[_0x40cb97(0x7ea)](0x9);if(_0x39f43d==='TGR')return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this['sparam'](0x0)*0x64))+'%':this[_0x40cb97(0x87d)](0x0);if(_0x39f43d==='GRD')return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x87d)](0x1)*0x64))+'%':this[_0x40cb97(0x87d)](0x1);if(_0x39f43d===_0x40cb97(0x24b))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x87d)](0x2)*0x64))+'%':this[_0x40cb97(0x87d)](0x2);if(_0x39f43d===_0x40cb97(0xd5))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x87d)](0x3)*0x64))+'%':this[_0x40cb97(0x87d)](0x3);if(_0x39f43d===_0x40cb97(0x2a0))return _0xe5b3c?String(Math['round'](this[_0x40cb97(0x87d)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x39f43d===_0x40cb97(0x412))return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x87d)](0x5)*0x64))+'%':this[_0x40cb97(0x87d)](0x5);if(_0x39f43d==='PDR')return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x87d)](0x6)*0x64))+'%':this[_0x40cb97(0x87d)](0x6);if(_0x39f43d==='MDR')return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x87d)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x39f43d==='FDR')return _0xe5b3c?String(Math[_0x40cb97(0x22b)](this[_0x40cb97(0x87d)](0x8)*0x64))+'%':this[_0x40cb97(0x87d)](0x8);if(_0x39f43d===_0x40cb97(0x810))return _0xe5b3c?String(Math['round'](this[_0x40cb97(0x87d)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ['CoreEngine'][_0x40cb97(0x212)][_0x39f43d]){const _0xabac45=VisuMZ['CoreEngine'][_0x40cb97(0x212)][_0x39f43d],_0x33735f=this[_0xabac45];return VisuMZ[_0x40cb97(0x4c0)][_0x40cb97(0x11f)][_0x39f43d]===_0x40cb97(0x400)?_0x33735f:_0xe5b3c?String(Math[_0x40cb97(0x22b)](_0x33735f*0x64))+'%':_0x33735f;}return'';},Game_BattlerBase['prototype'][_0x347547(0x8d7)]=function(){const _0x5b03c4=_0x347547;return this[_0x5b03c4(0x413)]()&&this[_0x5b03c4(0x85d)]<this[_0x5b03c4(0x6ee)]*VisuMZ[_0x5b03c4(0x4c0)]['Settings']['Param'][_0x5b03c4(0x1d5)];},Game_Battler[_0x347547(0x387)][_0x347547(0x73f)]=function(){const _0x272e9a=_0x347547;SoundManager[_0x272e9a(0x6ed)](),this[_0x272e9a(0x6ca)]('evade');},VisuMZ[_0x347547(0x4c0)][_0x347547(0x2b5)]=Game_Actor[_0x347547(0x387)][_0x347547(0x582)],Game_Actor[_0x347547(0x387)][_0x347547(0x582)]=function(_0x982a82){const _0x447150=_0x347547;if(this[_0x447150(0x146)]>0x63)return this['paramBaseAboveLevel99'](_0x982a82);return VisuMZ[_0x447150(0x4c0)][_0x447150(0x2b5)][_0x447150(0x248)](this,_0x982a82);},Game_Actor[_0x347547(0x387)]['paramBaseAboveLevel99']=function(_0x417559){const _0x2a9a3a=_0x347547,_0x43dee1=this[_0x2a9a3a(0x34a)]()[_0x2a9a3a(0x3f7)][_0x417559][0x63],_0x40e78f=this['currentClass']()['params'][_0x417559][0x62];return _0x43dee1+(_0x43dee1-_0x40e78f)*(this[_0x2a9a3a(0x146)]-0x63);},VisuMZ['CoreEngine'][_0x347547(0x333)]=Game_Actor['prototype']['changeClass'],Game_Actor[_0x347547(0x387)][_0x347547(0xee)]=function(_0x1d8aff,_0x4e5cd6){const _0x3b70f2=_0x347547;$gameTemp['_changingClass']=!![],VisuMZ['CoreEngine']['Game_Actor_changeClass'][_0x3b70f2(0x248)](this,_0x1d8aff,_0x4e5cd6),$gameTemp[_0x3b70f2(0x793)]=undefined;},VisuMZ[_0x347547(0x4c0)]['Game_Actor_levelUp']=Game_Actor[_0x347547(0x387)][_0x347547(0x25d)],Game_Actor[_0x347547(0x387)][_0x347547(0x25d)]=function(){const _0x201ad9=_0x347547;VisuMZ[_0x201ad9(0x4c0)][_0x201ad9(0x791)][_0x201ad9(0x248)](this);if(!$gameTemp['_changingClass'])this[_0x201ad9(0x853)]();},Game_Actor[_0x347547(0x387)][_0x347547(0x853)]=function(){const _0x142161=_0x347547;this[_0x142161(0x2fa)]={};if(VisuMZ[_0x142161(0x4c0)]['Settings'][_0x142161(0x4e9)][_0x142161(0x53e)])this['_hp']=this[_0x142161(0x6ee)];if(VisuMZ[_0x142161(0x4c0)]['Settings'][_0x142161(0x4e9)][_0x142161(0x8b9)])this['_mp']=this[_0x142161(0x556)];},Game_Actor[_0x347547(0x387)][_0x347547(0x4d7)]=function(){const _0x18b4da=_0x347547;if(this['isMaxLevel']())return 0x1;const _0x4113ea=this[_0x18b4da(0x840)]()-this[_0x18b4da(0x40c)](),_0x3cc421=this[_0x18b4da(0x588)]()-this[_0x18b4da(0x40c)]();return(_0x3cc421/_0x4113ea)[_0x18b4da(0x2a2)](0x0,0x1);},Game_Actor[_0x347547(0x387)]['traitObjects']=function(){const _0x30679b=_0x347547,_0x540932=Game_Battler['prototype'][_0x30679b(0x34c)][_0x30679b(0x248)](this);for(const _0x4da398 of this[_0x30679b(0x5ec)]()){if(_0x30679b(0x228)===_0x30679b(0x724))return _0x529f2a[_0x30679b(0x649)][_0x30679b(0x5b1)][_0x30679b(0x248)](this);else _0x4da398&&(_0x30679b(0x7fb)!==_0x30679b(0x2ed)?_0x540932['push'](_0x4da398):_0x21a44f[_0x30679b(0x30f)]=!![]);}return _0x540932[_0x30679b(0x6f8)](this[_0x30679b(0x34a)](),this[_0x30679b(0x524)]()),_0x540932;},Object[_0x347547(0x5cd)](Game_Enemy[_0x347547(0x387)],'level',{'get':function(){const _0x3b3a41=_0x347547;return this[_0x3b3a41(0x4b8)]();},'configurable':!![]}),Game_Enemy[_0x347547(0x387)][_0x347547(0x4b8)]=function(){return this['enemy']()['level'];},Game_Enemy[_0x347547(0x387)][_0x347547(0x62b)]=function(){const _0x41d238=_0x347547;if(!this[_0x41d238(0x548)]){this[_0x41d238(0x2e9)]+=Math[_0x41d238(0x22b)]((Graphics[_0x41d238(0xe4)]-0x270)/0x2),this[_0x41d238(0x2e9)]-=Math[_0x41d238(0x231)]((Graphics['height']-Graphics[_0x41d238(0x70c)])/0x2);if($gameSystem['isSideView']())this[_0x41d238(0x34b)]-=Math['floor']((Graphics[_0x41d238(0x4da)]-Graphics[_0x41d238(0x188)])/0x2);else{if(_0x41d238(0x85c)==='UfhEf')this[_0x41d238(0x34b)]+=Math[_0x41d238(0x22b)]((Graphics[_0x41d238(0x188)]-0x330)/0x2);else return _0x4fb47f[_0x41d238(0x424)](_0x5ce90c[_0x41d238(0x4c0)][_0x41d238(0x612)]['call'](this,_0x4ef57d));}}this[_0x41d238(0x548)]=!![];},Game_Party[_0x347547(0x387)][_0x347547(0x82b)]=function(){const _0x4a0d2b=_0x347547;return VisuMZ[_0x4a0d2b(0x4c0)][_0x4a0d2b(0x627)]['Gold'][_0x4a0d2b(0x668)];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x145)]=Game_Party[_0x347547(0x387)]['consumeItem'],Game_Party['prototype'][_0x347547(0x7f8)]=function(_0x530900){const _0x568d4c=_0x347547;if(VisuMZ[_0x568d4c(0x4c0)]['Settings'][_0x568d4c(0x4e9)][_0x568d4c(0x4e3)]&&DataManager[_0x568d4c(0x2c7)](_0x530900))return;VisuMZ['CoreEngine'][_0x568d4c(0x145)][_0x568d4c(0x248)](this,_0x530900);},Game_Party[_0x347547(0x387)][_0x347547(0x78d)]=function(){const _0x1310ae=_0x347547,_0x1e080b=VisuMZ[_0x1310ae(0x4c0)]['Settings'][_0x1310ae(0x4e9)],_0x210e62=_0x1e080b[_0x1310ae(0x324)]??0x63;let _0x98062c=[];(_0x1e080b[_0x1310ae(0x682)]??!![])&&(_0x1310ae(0x318)!==_0x1310ae(0x318)?this[_0x1310ae(0x1f7)](0x0):_0x98062c=_0x98062c[_0x1310ae(0x36e)]($dataItems));(_0x1e080b[_0x1310ae(0x875)]??!![])&&(_0x98062c=_0x98062c[_0x1310ae(0x36e)]($dataWeapons));(_0x1e080b[_0x1310ae(0x470)]??!![])&&(_0x98062c=_0x98062c['concat']($dataArmors));for(const _0x5635ba of _0x98062c){if(!_0x5635ba)continue;if(_0x5635ba[_0x1310ae(0x771)][_0x1310ae(0x85b)]()<=0x0)continue;if(_0x5635ba[_0x1310ae(0x771)][_0x1310ae(0x249)](/-----/i))continue;this[_0x1310ae(0x206)](_0x5635ba,_0x210e62);}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x369)]=Game_Troop[_0x347547(0x387)]['setup'],Game_Troop['prototype'][_0x347547(0x35c)]=function(_0xbe2993){const _0x235607=_0x347547;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x235607(0x752)](_0xbe2993),VisuMZ[_0x235607(0x4c0)]['Game_Troop_setup'][_0x235607(0x248)](this,_0xbe2993);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x253)]=Game_Map['prototype'][_0x347547(0x35c)],Game_Map['prototype'][_0x347547(0x35c)]=function(_0x3c0330){const _0x4a604e=_0x347547;VisuMZ['CoreEngine'][_0x4a604e(0x253)][_0x4a604e(0x248)](this,_0x3c0330),this[_0x4a604e(0x215)](_0x3c0330);},Game_Map[_0x347547(0x387)][_0x347547(0x215)]=function(){const _0x39ff1f=_0x347547;this[_0x39ff1f(0x3aa)]=VisuMZ[_0x39ff1f(0x4c0)][_0x39ff1f(0x627)][_0x39ff1f(0x4e9)][_0x39ff1f(0x2e0)]||![];if($dataMap&&$dataMap['note']){if($dataMap['note']['match'](/<SHOW TILE SHADOWS>/i))this[_0x39ff1f(0x3aa)]=![];if($dataMap[_0x39ff1f(0x76f)][_0x39ff1f(0x249)](/<HIDE TILE SHADOWS>/i))this[_0x39ff1f(0x3aa)]=!![];}},Game_Map['prototype']['areTileShadowsHidden']=function(){const _0xabaf42=_0x347547;if(this[_0xabaf42(0x3aa)]===undefined)this[_0xabaf42(0x215)]();return this[_0xabaf42(0x3aa)];},VisuMZ['CoreEngine'][_0x347547(0x310)]=Game_Character[_0x347547(0x387)][_0x347547(0x519)],Game_Character[_0x347547(0x387)][_0x347547(0x519)]=function(_0x43aeed){const _0x55ae7a=_0x347547;try{'MxoWT'===_0x55ae7a(0x58e)?VisuMZ['CoreEngine'][_0x55ae7a(0x310)][_0x55ae7a(0x248)](this,_0x43aeed):(_0x312228+=_0x5c65bf,_0x2f6723+=_0x1410a7,_0x162627+=_0x55ae7a(0x1f2)[_0x55ae7a(0x83a)](_0x4ee6f0['id'],_0x535434[_0x55ae7a(0x771)]),_0x273bf8+=_0x285361,_0x160205+=_0x1cbc3c,_0x40cff7+=_0x53b516,_0x23bbf2+=_0x55ae7a(0x2d2)[_0x55ae7a(0x83a)](_0x50ec98['id'],_0x5d8a8e[_0x55ae7a(0x771)]),_0x31bba7+=_0x15c1c9);}catch(_0x1b60d1){if($gameTemp[_0x55ae7a(0x71c)]())console[_0x55ae7a(0x65c)](_0x1b60d1);}},Game_Player['prototype'][_0x347547(0x60e)]=function(){const _0x18f2c0=_0x347547,_0x2665a3=$gameMap[_0x18f2c0(0x737)]();this[_0x18f2c0(0x41e)]=Math[_0x18f2c0(0x7fc)](_0x2665a3)+Math[_0x18f2c0(0x7fc)](_0x2665a3)+this['encounterStepsMinimum']();},Game_Player[_0x347547(0x387)][_0x347547(0x4e2)]=function(){const _0x3adae3=_0x347547;if($dataMap&&$dataMap[_0x3adae3(0x76f)]&&$dataMap[_0x3adae3(0x76f)][_0x3adae3(0x249)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if(_0x3adae3(0x32a)===_0x3adae3(0x6e1)){const _0x18c431=this[_0x3adae3(0x38d)]();this['changeTextColor'](_0x1ea6be[_0x3adae3(0x3e2)]());const _0x447bdc=_0x14f6b5['CoreEngine'][_0x3adae3(0x627)]['UI'][_0x3adae3(0x45c)];this[_0x3adae3(0x127)](_0x447bdc,_0x5af0bc,_0x199fcd,_0x18c431,'center');}else return VisuMZ[_0x3adae3(0x4c0)][_0x3adae3(0x627)][_0x3adae3(0x4e9)][_0x3adae3(0x260)];}},VisuMZ[_0x347547(0x4c0)]['Game_Event_isCollidedWithEvents']=Game_Event['prototype'][_0x347547(0x824)],Game_Event[_0x347547(0x387)]['isCollidedWithEvents']=function(_0x332541,_0x112d80){const _0x3c5f2e=_0x347547;if(this[_0x3c5f2e(0x6e4)]())return'NThmX'===_0x3c5f2e(0x414)?this[_0x3c5f2e(0x1bf)](_0x332541,_0x112d80):_0x135f2a['CoreEngine'][_0x3c5f2e(0x627)][_0x3c5f2e(0x76a)][_0x3c5f2e(0x7b9)];else{if('ocqJY'!==_0x3c5f2e(0x425))return VisuMZ[_0x3c5f2e(0x4c0)][_0x3c5f2e(0x4ad)]['call'](this,_0x332541,_0x112d80);else{let _0x2527d9=0x0;for(const _0x5a200d of _0x1ba794[_0x3c5f2e(0x4c0)][_0x3c5f2e(0x627)][_0x3c5f2e(0x8a1)]['DisplayedParams']){const _0x267d96=this[_0x3c5f2e(0x61b)](),_0x4403a8=this['paramY'](_0x2527d9);this[_0x3c5f2e(0x4fb)](_0x267d96,_0x4403a8,_0x5a200d),_0x2527d9++;}}}},Game_Event['prototype'][_0x347547(0x6e4)]=function(){const _0x19cf17=_0x347547;return VisuMZ['CoreEngine'][_0x19cf17(0x627)]['QoL'][_0x19cf17(0x2ef)];},Game_Event[_0x347547(0x387)][_0x347547(0x1bf)]=function(_0x250f73,_0x47335b){const _0x1fc6c0=_0x347547;if(!this[_0x1fc6c0(0x7af)]())return![];else{if(_0x1fc6c0(0x7a1)!==_0x1fc6c0(0x7a1))_0x49b65c+=this['_list'][_0x10f967][_0x1fc6c0(0x878)][0x0]+'\x0a',_0x4b256a++;else{const _0x486255=$gameMap[_0x1fc6c0(0x57c)](_0x250f73,_0x47335b)[_0x1fc6c0(0x1cb)](_0x255646=>_0x255646['isNormalPriority']());return _0x486255['length']>0x0;}}},VisuMZ[_0x347547(0x4c0)]['Game_Interpreter_command105']=Game_Interpreter[_0x347547(0x387)]['command105'],Game_Interpreter[_0x347547(0x387)][_0x347547(0x5d8)]=function(_0x20f6ec){const _0x2fd916=_0x347547,_0xb06a7f=this[_0x2fd916(0x15b)]();return _0xb06a7f['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x2fd916(0x309)](_0xb06a7f):VisuMZ[_0x2fd916(0x4c0)][_0x2fd916(0x178)][_0x2fd916(0x248)](this,_0x20f6ec);},Game_Interpreter[_0x347547(0x387)][_0x347547(0x15b)]=function(){const _0x1a2f52=_0x347547;let _0x34f8cb='',_0x1fea6d=this[_0x1a2f52(0x445)]+0x1;while(this['_list'][_0x1fea6d]&&this[_0x1a2f52(0x757)][_0x1fea6d][_0x1a2f52(0x614)]===0x195){_0x34f8cb+=this[_0x1a2f52(0x757)][_0x1fea6d]['parameters'][0x0]+'\x0a',_0x1fea6d++;}return _0x34f8cb;},Game_Interpreter[_0x347547(0x387)]['runCombinedScrollingTextAsCode']=function(_0x14ca13){const _0x46a455=_0x347547;try{eval(_0x14ca13);}catch(_0x46edea){_0x46a455(0x61f)!==_0x46a455(0x49e)?$gameTemp[_0x46a455(0x71c)]()&&('qcBAR'!==_0x46a455(0x5b4)?[0x6c,0x198]['includes'](_0x4dd520[_0x46a455(0x614)])&&(_0x4376aa+='\x0a',_0x1bc5a8+=_0x56c9ab[_0x46a455(0x878)][0x0]):(console[_0x46a455(0x65c)](_0x46a455(0x2f8)),console[_0x46a455(0x65c)](_0x46edea))):this[_0x46a455(0x2c9)]&&this[_0x46a455(0x2c9)][_0x46a455(0x599)](_0x401607[_0x46a455(0x649)]['OptionsBgType']);}return!![];},VisuMZ['CoreEngine'][_0x347547(0x6cb)]=Game_Interpreter[_0x347547(0x387)][_0x347547(0x205)],Game_Interpreter[_0x347547(0x387)]['command111']=function(_0x30e5d1){const _0x1d6c72=_0x347547;try{if(_0x1d6c72(0x5bd)!=='SVRQr')VisuMZ['CoreEngine'][_0x1d6c72(0x6cb)][_0x1d6c72(0x248)](this,_0x30e5d1);else{const _0x3005ca=_0x3fb412[_0x1d6c72(0x46c)](_0x2a3578,_0x1d6c72(0x5c3));}}catch(_0x2f50be){if('rdVNn'!==_0x1d6c72(0x59b))return _0x2484a7[_0x1d6c72(0x4c0)]['Settings'][_0x1d6c72(0x4e9)][_0x1d6c72(0x80e)]?0x0:_0x492939[_0x1d6c72(0x4c0)]['Game_Action_itemEva'][_0x1d6c72(0x248)](this,_0x7a472f);else $gameTemp[_0x1d6c72(0x71c)]()&&(console[_0x1d6c72(0x65c)]('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x2f50be)),this['skipBranch']();}return!![];},VisuMZ['CoreEngine'][_0x347547(0x61e)]=Game_Interpreter[_0x347547(0x387)][_0x347547(0x35f)],Game_Interpreter[_0x347547(0x387)][_0x347547(0x35f)]=function(_0x45755c){const _0x316b5f=_0x347547;try{_0x316b5f(0x836)==='NXFNb'?VisuMZ[_0x316b5f(0x4c0)][_0x316b5f(0x61e)][_0x316b5f(0x248)](this,_0x45755c):(_0xe57cd9[_0x316b5f(0x4c0)][_0x316b5f(0x6a6)][_0x316b5f(0x248)](this),this[_0x316b5f(0x564)]());}catch(_0xb65080){$gameTemp[_0x316b5f(0x71c)]()&&(_0x316b5f(0x769)!==_0x316b5f(0x769)?(this['_playtestF7Looping']=!![],this[_0x316b5f(0x864)](),_0x13ad83['updateEffekseer'](),this['_playtestF7Looping']=![]):(console['log']('Control\x20Variables\x20Script\x20Error'),console['log'](_0xb65080)));}return!![];},VisuMZ['CoreEngine'][_0x347547(0x5a5)]=Game_Interpreter[_0x347547(0x387)]['command355'],Game_Interpreter[_0x347547(0x387)][_0x347547(0x2a9)]=function(){const _0x1889e4=_0x347547;try{VisuMZ['CoreEngine'][_0x1889e4(0x5a5)][_0x1889e4(0x248)](this);}catch(_0x18c882){$gameTemp[_0x1889e4(0x71c)]()&&(console['log'](_0x1889e4(0x55c)),console[_0x1889e4(0x65c)](_0x18c882));}return!![];},VisuMZ['CoreEngine'][_0x347547(0x28c)]=Game_Interpreter['prototype'][_0x347547(0x739)],Game_Interpreter[_0x347547(0x387)][_0x347547(0x739)]=function(_0x366ddb){const _0x3cf1f4=_0x347547;return $gameTemp[_0x3cf1f4(0x6b2)](this),VisuMZ['CoreEngine'][_0x3cf1f4(0x28c)]['call'](this,_0x366ddb);},Scene_Base[_0x347547(0x387)][_0x347547(0xf1)]=function(){const _0x2b1f11=_0x347547;return VisuMZ[_0x2b1f11(0x4c0)][_0x2b1f11(0x627)]['UI'][_0x2b1f11(0x454)];},Scene_Base[_0x347547(0x387)][_0x347547(0x3a0)]=function(){const _0x1bbb8c=_0x347547;return VisuMZ[_0x1bbb8c(0x4c0)][_0x1bbb8c(0x627)]['UI'][_0x1bbb8c(0x211)];},Scene_Base['prototype']['isBottomButtonMode']=function(){const _0x3b604b=_0x347547;return VisuMZ[_0x3b604b(0x4c0)][_0x3b604b(0x627)]['UI']['BottomButtons'];},Scene_Base[_0x347547(0x387)][_0x347547(0x6f9)]=function(){const _0x58c30e=_0x347547;return VisuMZ[_0x58c30e(0x4c0)][_0x58c30e(0x627)]['UI'][_0x58c30e(0x364)];},Scene_Base[_0x347547(0x387)][_0x347547(0x55b)]=function(){const _0x100fdc=_0x347547;return VisuMZ[_0x100fdc(0x4c0)][_0x100fdc(0x627)]['UI'][_0x100fdc(0x48d)];},Scene_Base[_0x347547(0x387)][_0x347547(0x6b6)]=function(){const _0x2a30e7=_0x347547;return VisuMZ[_0x2a30e7(0x4c0)][_0x2a30e7(0x627)]['UI'][_0x2a30e7(0x6e7)];},Scene_Base[_0x347547(0x387)][_0x347547(0xea)]=function(){const _0x2ed23a=_0x347547;return VisuMZ[_0x2ed23a(0x4c0)][_0x2ed23a(0x627)]['Window'][_0x2ed23a(0x224)];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x3b4)]=Scene_Base[_0x347547(0x387)][_0x347547(0x788)],Scene_Base['prototype'][_0x347547(0x788)]=function(){const _0x16b282=_0x347547;VisuMZ[_0x16b282(0x4c0)]['Scene_Base_createWindowLayer'][_0x16b282(0x248)](this),this[_0x16b282(0x51b)](),this[_0x16b282(0x786)]['x']=Math[_0x16b282(0x22b)](this[_0x16b282(0x786)]['x']),this['_windowLayer']['y']=Math[_0x16b282(0x22b)](this['_windowLayer']['y']);},Scene_Base[_0x347547(0x387)]['createButtonAssistWindow']=function(){},Scene_Base[_0x347547(0x387)][_0x347547(0x491)]=function(){const _0x2f6e20=_0x347547;return TextManager['getInputMultiButtonStrings'](_0x2f6e20(0x177),'pagedown');},Scene_Base[_0x347547(0x387)][_0x347547(0x360)]=function(){const _0xd174d2=_0x347547;return TextManager[_0xd174d2(0x577)](_0xd174d2(0x506));},Scene_Base[_0x347547(0x387)][_0x347547(0x8d5)]=function(){const _0x44e01e=_0x347547;return TextManager[_0x44e01e(0x577)](_0x44e01e(0x7ef));},Scene_Base[_0x347547(0x387)][_0x347547(0x4c8)]=function(){const _0xbf68c6=_0x347547;return TextManager[_0xbf68c6(0x577)]('ok');},Scene_Base[_0x347547(0x387)][_0x347547(0x201)]=function(){const _0x1e4512=_0x347547;return TextManager[_0x1e4512(0x577)](_0x1e4512(0x6fe));},Scene_Base[_0x347547(0x387)][_0x347547(0x5df)]=function(){const _0xbed2cd=_0x347547;if(this[_0xbed2cd(0x4fa)]&&this[_0xbed2cd(0x4fa)][_0xbed2cd(0x3d0)]){if(_0xbed2cd(0x385)==='aQOhW')this['_cancelButton']['x']=_0x5cd178[_0xbed2cd(0x188)]+0x4;else return TextManager[_0xbed2cd(0x87f)];}else{if(_0xbed2cd(0x25a)==='PRKZS')return'';else{if(_0x41e2b7(this[_0xbed2cd(0x7b8)])[_0xbed2cd(0x4e8)]>=this[_0xbed2cd(0x29d)])return;const _0x1e15bc=_0x1d25b9(_0x23e174(this['_number'])+_0x1c603c[_0xbed2cd(0x790)]);if(_0xa909c5(_0x1e15bc))return;this['_number']=_0x1e15bc;const _0x619a5='9'[_0xbed2cd(0xcf)](this[_0xbed2cd(0x29d)]);this[_0xbed2cd(0x7b8)]=this[_0xbed2cd(0x7b8)][_0xbed2cd(0x2a2)](0x0,_0x619a5),_0x4ff7d4[_0xbed2cd(0x16b)](),this[_0xbed2cd(0x52a)](),_0x42574c[_0xbed2cd(0x70a)](),this[_0xbed2cd(0x1f7)](this['_maxDigits']-0x1);}}},Scene_Base[_0x347547(0x387)][_0x347547(0x855)]=function(){return'';},Scene_Base[_0x347547(0x387)][_0x347547(0x36c)]=function(){return'';},Scene_Base[_0x347547(0x387)][_0x347547(0x27c)]=function(){const _0x23f78e=_0x347547;return TextManager[_0x23f78e(0x46d)];},Scene_Base[_0x347547(0x387)][_0x347547(0x628)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x347547(0x387)][_0x347547(0x382)]=function(){return 0x0;},Scene_Base[_0x347547(0x387)][_0x347547(0x587)]=function(){return 0x0;},Scene_Base[_0x347547(0x387)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x347547(0x387)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x347547(0x387)][_0x347547(0x7ff)]=function(){return 0x0;},VisuMZ[_0x347547(0x4c0)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x347547(0x387)][_0x347547(0x101)],Scene_Boot[_0x347547(0x387)][_0x347547(0x101)]=function(){const _0x414ca3=_0x347547;VisuMZ[_0x414ca3(0x4c0)][_0x414ca3(0x8bf)][_0x414ca3(0x248)](this),this[_0x414ca3(0xc3)]();},Scene_Boot[_0x347547(0x387)][_0x347547(0xc3)]=function(){const _0x1f9788=_0x347547,_0x4c9a76=[_0x1f9788(0x30d),_0x1f9788(0x2de),_0x1f9788(0x651),_0x1f9788(0x404),_0x1f9788(0x1d4),_0x1f9788(0x250),'parallaxes',_0x1f9788(0x22a),_0x1f9788(0x809),_0x1f9788(0x3f5),_0x1f9788(0x39c),_0x1f9788(0x527),_0x1f9788(0x7a3),_0x1f9788(0x780)];for(const _0x458f3c of _0x4c9a76){const _0x4208dd=VisuMZ[_0x1f9788(0x4c0)][_0x1f9788(0x627)][_0x1f9788(0x175)][_0x458f3c],_0x383095=_0x1f9788(0x887)[_0x1f9788(0x83a)](_0x458f3c);for(const _0x17e266 of _0x4208dd){ImageManager[_0x1f9788(0x4a2)](_0x383095,_0x17e266);}}},VisuMZ['CoreEngine'][_0x347547(0x7be)]=Scene_Boot[_0x347547(0x387)][_0x347547(0x721)],Scene_Boot['prototype'][_0x347547(0x721)]=function(){const _0x14d488=_0x347547;if(Utils[_0x14d488(0x278)](_0x14d488(0x62c))&&VisuMZ[_0x14d488(0x4c0)][_0x14d488(0x627)][_0x14d488(0x4e9)][_0x14d488(0x694)]){if(_0x14d488(0x6af)===_0x14d488(0x6af))this[_0x14d488(0x838)]();else{if(!this[_0x14d488(0x52d)])return![];return _0x153ead[_0x14d488(0x4c0)][_0x14d488(0x627)]['KeyboardInput'][_0x14d488(0x291)];}}else VisuMZ[_0x14d488(0x4c0)][_0x14d488(0x7be)]['call'](this);},Scene_Boot[_0x347547(0x387)]['startAutoNewGame']=function(){const _0x345b8d=_0x347547;DataManager[_0x345b8d(0x33c)](),SceneManager[_0x345b8d(0x72c)](Scene_Map);},Scene_Boot[_0x347547(0x387)][_0x347547(0x672)]=function(){const _0x387080=_0x347547,_0x13b3b2=$dataSystem[_0x387080(0x1e8)][_0x387080(0x72e)],_0x1426ed=$dataSystem[_0x387080(0x1e8)][_0x387080(0x716)],_0x2efe26=VisuMZ[_0x387080(0x4c0)]['Settings']['UI']['BoxMargin'];Graphics[_0x387080(0x188)]=_0x13b3b2-_0x2efe26*0x2,Graphics['boxHeight']=_0x1426ed-_0x2efe26*0x2,this[_0x387080(0x275)]();},VisuMZ['CoreEngine'][_0x347547(0x725)]=Scene_Boot['prototype'][_0x347547(0x5e4)],Scene_Boot[_0x347547(0x387)][_0x347547(0x5e4)]=function(){const _0x5105eb=_0x347547;this['isFullDocumentTitle']()?this[_0x5105eb(0x2a4)]():VisuMZ[_0x5105eb(0x4c0)][_0x5105eb(0x725)][_0x5105eb(0x248)](this);},Scene_Boot['prototype'][_0x347547(0x1d3)]=function(){const _0xc2a775=_0x347547;if(Scene_Title[_0xc2a775(0x648)]==='')return![];if(Scene_Title[_0xc2a775(0x648)]==='Subtitle')return![];if(Scene_Title[_0xc2a775(0x871)]==='')return![];if(Scene_Title[_0xc2a775(0x871)]==='0.00')return![];return!![];},Scene_Boot[_0x347547(0x387)][_0x347547(0x2a4)]=function(){const _0x5f09f7=_0x347547,_0x41980e=$dataSystem[_0x5f09f7(0x5dc)],_0x5e8913=Scene_Title[_0x5f09f7(0x648)]||'',_0x1971e1=Scene_Title[_0x5f09f7(0x871)]||'',_0x9c210b=VisuMZ[_0x5f09f7(0x4c0)][_0x5f09f7(0x627)][_0x5f09f7(0x3b8)][_0x5f09f7(0x2a5)][_0x5f09f7(0x76b)],_0x5bdb56=_0x9c210b['format'](_0x41980e,_0x5e8913,_0x1971e1);document[_0x5f09f7(0x1b4)]=_0x5bdb56;},Scene_Boot[_0x347547(0x387)]['determineSideButtonLayoutValid']=function(){const _0x32e23a=_0x347547;if(VisuMZ[_0x32e23a(0x4c0)][_0x32e23a(0x627)]['UI'][_0x32e23a(0x3ea)]){if(_0x32e23a(0xdf)===_0x32e23a(0xdf)){const _0x240fe5=Graphics[_0x32e23a(0x4da)]-Graphics[_0x32e23a(0x188)]-VisuMZ[_0x32e23a(0x4c0)][_0x32e23a(0x627)]['UI'][_0x32e23a(0x108)]*0x2,_0x2d7d7b=Sprite_Button[_0x32e23a(0x387)]['blockWidth']['call'](this)*0x4;if(_0x240fe5>=_0x2d7d7b)SceneManager[_0x32e23a(0xf0)](!![]);}else this[_0x32e23a(0x813)][_0x32e23a(0x599)](_0x496752['layoutSettings'][_0x32e23a(0x748)]);}},Scene_Title[_0x347547(0x648)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0x2a5)][_0x347547(0x711)],Scene_Title['version']=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0x2a5)]['Version'],Scene_Title['pictureButtons']=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x479)],VisuMZ['CoreEngine'][_0x347547(0x7c3)]=Scene_Title[_0x347547(0x387)][_0x347547(0x35d)],Scene_Title[_0x347547(0x387)][_0x347547(0x35d)]=function(){const _0xc9da2=_0x347547;VisuMZ[_0xc9da2(0x4c0)][_0xc9da2(0x627)][_0xc9da2(0x3b8)][_0xc9da2(0x2a5)][_0xc9da2(0x35d)][_0xc9da2(0x248)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0xc9da2(0x648)]!==_0xc9da2(0x711))this['drawGameSubtitle']();if(Scene_Title[_0xc9da2(0x871)]!==''&&Scene_Title[_0xc9da2(0x871)]!==_0xc9da2(0x522))this[_0xc9da2(0x815)]();},Scene_Title[_0x347547(0x387)][_0x347547(0x1f1)]=function(){const _0x4ab7ba=_0x347547;VisuMZ[_0x4ab7ba(0x4c0)][_0x4ab7ba(0x627)][_0x4ab7ba(0x3b8)][_0x4ab7ba(0x2a5)][_0x4ab7ba(0x1f1)][_0x4ab7ba(0x248)](this);},Scene_Title[_0x347547(0x387)][_0x347547(0x815)]=function(){const _0x4ed94c=_0x347547;VisuMZ[_0x4ed94c(0x4c0)]['Settings'][_0x4ed94c(0x3b8)][_0x4ed94c(0x2a5)][_0x4ed94c(0x815)][_0x4ed94c(0x248)](this);},Scene_Title[_0x347547(0x387)]['createCommandWindow']=function(){const _0x56614c=_0x347547;this[_0x56614c(0x10b)]();const _0x51895f=$dataSystem[_0x56614c(0x1e7)][_0x56614c(0x5c2)],_0x39cabb=this[_0x56614c(0x40d)]();this[_0x56614c(0x8d1)]=new Window_TitleCommand(_0x39cabb),this[_0x56614c(0x8d1)]['setBackgroundType'](_0x51895f);const _0x5501ee=this['commandWindowRect']();this['_commandWindow'][_0x56614c(0x2b0)](_0x5501ee['x'],_0x5501ee['y'],_0x5501ee[_0x56614c(0x4da)],_0x5501ee[_0x56614c(0xe4)]),this[_0x56614c(0x276)](this[_0x56614c(0x8d1)]);},Scene_Title[_0x347547(0x387)][_0x347547(0x15e)]=function(){const _0x267b02=_0x347547;return this[_0x267b02(0x8d1)]?'qNjgl'==='qNjgl'?this[_0x267b02(0x8d1)]['maxItems']():[0x25,0x26,0x27,0x28]['contains'](this[_0x267b02(0x676)]):VisuMZ[_0x267b02(0x4c0)][_0x267b02(0x627)]['TitleCommandList'][_0x267b02(0x4e8)];},Scene_Title[_0x347547(0x387)][_0x347547(0x40d)]=function(){const _0x6426e2=_0x347547;return VisuMZ[_0x6426e2(0x4c0)][_0x6426e2(0x627)][_0x6426e2(0x3b8)][_0x6426e2(0x2a5)]['CommandRect'][_0x6426e2(0x248)](this);},Scene_Title[_0x347547(0x387)][_0x347547(0x10b)]=function(){const _0x51ac05=_0x347547;for(const _0x3a1926 of Scene_Title[_0x51ac05(0x8ae)]){const _0x2d10dc=new Sprite_TitlePictureButton(_0x3a1926);this[_0x51ac05(0x6cf)](_0x2d10dc);}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x5be)]=Scene_Map[_0x347547(0x387)][_0x347547(0x6f3)],Scene_Map[_0x347547(0x387)]['initialize']=function(){const _0x3808bf=_0x347547;VisuMZ[_0x3808bf(0x4c0)][_0x3808bf(0x5be)]['call'](this),$gameTemp[_0x3808bf(0x501)](),this[_0x3808bf(0x1b2)]();},VisuMZ[_0x347547(0x4c0)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x347547(0x387)][_0x347547(0x1de)],Scene_Map[_0x347547(0x387)][_0x347547(0x1de)]=function(){const _0x20b482=_0x347547;VisuMZ[_0x20b482(0x4c0)][_0x20b482(0x763)][_0x20b482(0x248)](this),$gameTemp[_0x20b482(0x8c9)]&&!$gameMessage[_0x20b482(0x8c6)]()&&(this[_0x20b482(0x12d)](),SceneManager[_0x20b482(0x5db)]());},Scene_Map[_0x347547(0x387)][_0x347547(0x537)]=function(){const _0x57ecc9=_0x347547;Scene_Message[_0x57ecc9(0x387)][_0x57ecc9(0x537)][_0x57ecc9(0x248)](this),!SceneManager['isNextScene'](Scene_Battle)&&('lLuGh'==='ZCMvn'?_0x563815['CoreEngine']['Game_Interpreter_command122']['call'](this,_0x4ac0d2):(this['_spriteset'][_0x57ecc9(0x864)](),this[_0x57ecc9(0x33f)][_0x57ecc9(0x7bc)](),this[_0x57ecc9(0x786)][_0x57ecc9(0x3d0)]=![],SceneManager['snapForBackground']())),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine']['Scene_Map_createMenuButton']=Scene_Map[_0x347547(0x387)][_0x347547(0x566)],Scene_Map['prototype'][_0x347547(0x566)]=function(){const _0x157895=_0x347547;VisuMZ[_0x157895(0x4c0)][_0x157895(0x133)][_0x157895(0x248)](this),SceneManager[_0x157895(0x7f9)]()&&(_0x157895(0x4ec)!=='TCFuC'?this[_0x157895(0x11c)][_0x157895(0x599)](_0xf1471a['layoutSettings'][_0x157895(0x5ae)]):this[_0x157895(0x514)]());},Scene_Map[_0x347547(0x387)][_0x347547(0x514)]=function(){const _0x388f32=_0x347547;this[_0x388f32(0x5f0)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x347547(0x4c0)]['Scene_Map_updateScene']=Scene_Map[_0x347547(0x387)][_0x347547(0x6ac)],Scene_Map[_0x347547(0x387)][_0x347547(0x6ac)]=function(){const _0x14c235=_0x347547;VisuMZ['CoreEngine'][_0x14c235(0x58f)][_0x14c235(0x248)](this),this[_0x14c235(0x190)](),this['updateOnceParallelInterpreters']();},Scene_Map[_0x347547(0x387)]['updateDashToggle']=function(){const _0x4cbf7a=_0x347547;Input['isTriggered'](_0x4cbf7a(0x18c))&&(ConfigManager[_0x4cbf7a(0x378)]=!ConfigManager[_0x4cbf7a(0x378)],ConfigManager[_0x4cbf7a(0x20a)]());},Scene_Map[_0x347547(0x387)]['clearOnceParallelInterpreters']=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x347547(0x387)][_0x347547(0x172)]=function(){const _0x4a6d96=_0x347547;if(!this[_0x4a6d96(0x28b)])return;for(const _0x3e753b of this[_0x4a6d96(0x28b)]){_0x3e753b&&_0x3e753b[_0x4a6d96(0x864)]();}},Scene_Map[_0x347547(0x387)][_0x347547(0x402)]=function(_0x106d88){const _0x36ce53=_0x347547,_0x3acdfa=$dataCommonEvents[_0x106d88];if(!_0x3acdfa)return;const _0x17c5ea=new Game_OnceParallelInterpreter();this[_0x36ce53(0x17c)](_0x17c5ea),_0x17c5ea[_0x36ce53(0x76d)](_0x106d88);},Scene_Map[_0x347547(0x387)][_0x347547(0x17c)]=function(_0x3cc40a){const _0x5149ec=_0x347547;this[_0x5149ec(0x28b)]=this[_0x5149ec(0x28b)]||[],this[_0x5149ec(0x28b)][_0x5149ec(0x6f8)](_0x3cc40a);},Scene_Map[_0x347547(0x387)]['removeOnceParallelInterpreter']=function(_0x5dd8e6){const _0x18331=_0x347547;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this[_0x18331(0x28b)][_0x18331(0x841)](_0x5dd8e6);};function Game_OnceParallelInterpreter(){const _0xd13fe4=_0x347547;this[_0xd13fe4(0x6f3)](...arguments);}Game_OnceParallelInterpreter[_0x347547(0x387)]=Object[_0x347547(0x30e)](Game_Interpreter[_0x347547(0x387)]),Game_OnceParallelInterpreter['prototype'][_0x347547(0x2ac)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x347547(0x387)]['setCommonEvent']=function(_0x3c7ffe){const _0x1bddcc=_0x347547,_0x3e5f42=$dataCommonEvents[_0x3c7ffe];_0x3e5f42?'pMuxK'===_0x1bddcc(0x1e6)?_0x1532e4+=_0x1bddcc(0x31e):this['setup'](_0x3e5f42['list'],0x0):this[_0x1bddcc(0x537)]();},Game_OnceParallelInterpreter[_0x347547(0x387)][_0x347547(0x537)]=function(){const _0x376c5f=_0x347547;if(!SceneManager[_0x376c5f(0x3eb)]())return;SceneManager[_0x376c5f(0x709)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x376c5f(0x387)][_0x376c5f(0x537)]['call'](this);},VisuMZ[_0x347547(0x4c0)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x347547(0x387)][_0x347547(0x710)],Scene_MenuBase[_0x347547(0x387)]['helpAreaTop']=function(){const _0x392c2f=_0x347547;let _0x2f839f=0x0;return SceneManager[_0x392c2f(0x71b)]()?_0x392c2f(0x623)===_0x392c2f(0x7bf)?(_0x1b25d1[_0x392c2f(0x4c0)][_0x392c2f(0x8a7)][_0x392c2f(0x248)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x392c2f(0x30c)]()):_0x2f839f=this[_0x392c2f(0x745)]():_0x2f839f=VisuMZ[_0x392c2f(0x4c0)][_0x392c2f(0x3ad)][_0x392c2f(0x248)](this),this[_0x392c2f(0x4e4)]()&&this[_0x392c2f(0x3b0)]()===_0x392c2f(0x8d3)&&(_0x2f839f+=Window_ButtonAssist[_0x392c2f(0x387)][_0x392c2f(0x3a9)]()),_0x2f839f;},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x745)]=function(){const _0x556479=_0x347547;return this[_0x556479(0x3a0)]()?this[_0x556479(0x300)]():0x0;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x24c)]=Scene_MenuBase['prototype'][_0x347547(0x657)],Scene_MenuBase[_0x347547(0x387)][_0x347547(0x657)]=function(){const _0x46ea3d=_0x347547;return SceneManager['areButtonsOutsideMainUI']()?this[_0x46ea3d(0x750)]():VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop'][_0x46ea3d(0x248)](this);},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x750)]=function(){const _0x549223=_0x347547;if(!this[_0x549223(0x3a0)]()){if('ndMHx'!=='AgJrc')return this['helpAreaBottom']();else _0x56dd95[_0x549223(0x4c0)][_0x549223(0x55e)][_0x549223(0x248)](this,_0x388686,_0x186502,_0x26090c,_0x55ff66,_0x398c16),this['markCoreEngineModified']();}else{if(_0x549223(0x31b)==='VctRA')this['setGuard']();else return 0x0;}},VisuMZ[_0x347547(0x4c0)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x347547(0x387)][_0x347547(0x696)],Scene_MenuBase[_0x347547(0x387)][_0x347547(0x696)]=function(){const _0x23209c=_0x347547;let _0x5a131f=0x0;SceneManager[_0x23209c(0x71b)]()?_0x5a131f=this[_0x23209c(0x397)]():_0x5a131f=VisuMZ[_0x23209c(0x4c0)]['Scene_MenuBase_mainAreaHeight'][_0x23209c(0x248)](this);if(this[_0x23209c(0x4e4)]()&&this[_0x23209c(0x3b0)]()!==_0x23209c(0x698)){if(_0x23209c(0x8a8)!==_0x23209c(0x8a8))for(const _0x42dd2c of _0x4c367d){if(_0x42dd2c&&_0x42dd2c[_0x23209c(0x262)]){if(this['isGamepadButtonPressed'](_0x42dd2c))return!![];}}else _0x5a131f-=Window_ButtonAssist[_0x23209c(0x387)]['lineHeight']();}return _0x5a131f;},Scene_MenuBase['prototype'][_0x347547(0x397)]=function(){const _0x18f6da=_0x347547;return Graphics[_0x18f6da(0x70c)]-this[_0x18f6da(0x67e)]();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x42d)]=Scene_MenuBase['prototype'][_0x347547(0x32b)],Scene_MenuBase['prototype']['createBackground']=function(){const _0x4be4aa=_0x347547;this[_0x4be4aa(0x332)]=new PIXI['filters'][(_0x4be4aa(0x4c3))](clamp=!![]),this[_0x4be4aa(0x511)]=new Sprite(),this[_0x4be4aa(0x511)][_0x4be4aa(0x621)]=SceneManager[_0x4be4aa(0x705)](),this[_0x4be4aa(0x511)]['filters']=[this['_backgroundFilter']],this[_0x4be4aa(0x6cf)](this[_0x4be4aa(0x511)]),this[_0x4be4aa(0x554)](0xc0),this[_0x4be4aa(0x554)](this['getBackgroundOpacity']()),this[_0x4be4aa(0x37b)]();},Scene_MenuBase['prototype'][_0x347547(0x6cc)]=function(){const _0x2066ed=_0x347547,_0xc60035=String(this[_0x2066ed(0x2ac)][_0x2066ed(0x771)]),_0x5745b4=this[_0x2066ed(0x6de)](_0xc60035);return _0x5745b4?_0x5745b4['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype'][_0x347547(0x37b)]=function(){const _0xc04c44=_0x347547,_0xc1923c=String(this[_0xc04c44(0x2ac)][_0xc04c44(0x771)]),_0x189e4f=this[_0xc04c44(0x6de)](_0xc1923c);_0x189e4f&&(_0x189e4f[_0xc04c44(0x5d0)]!==''||_0x189e4f[_0xc04c44(0x882)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0xc04c44(0x851)](_0x189e4f['BgFilename1'])),this['_backSprite2']=new Sprite(ImageManager[_0xc04c44(0x243)](_0x189e4f[_0xc04c44(0x882)])),this[_0xc04c44(0x6cf)](this[_0xc04c44(0x82a)]),this['addChild'](this[_0xc04c44(0x334)]),this[_0xc04c44(0x82a)][_0xc04c44(0x621)][_0xc04c44(0x37e)](this[_0xc04c44(0x805)][_0xc04c44(0x49c)](this,this[_0xc04c44(0x82a)])),this[_0xc04c44(0x334)][_0xc04c44(0x621)][_0xc04c44(0x37e)](this['adjustSprite'][_0xc04c44(0x49c)](this,this[_0xc04c44(0x334)])));},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x6de)]=function(_0x5a66c9){const _0x482791=_0x347547;return VisuMZ[_0x482791(0x4c0)]['Settings']['MenuBg'][_0x5a66c9]||VisuMZ[_0x482791(0x4c0)][_0x482791(0x627)][_0x482791(0x75b)][_0x482791(0x4c4)];},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x805)]=function(_0x49f519){const _0x3767a2=_0x347547;this['scaleSprite'](_0x49f519),this[_0x3767a2(0x57a)](_0x49f519);},VisuMZ[_0x347547(0x4c0)][_0x347547(0xc9)]=Scene_MenuBase['prototype'][_0x347547(0x3d9)],Scene_MenuBase[_0x347547(0x387)][_0x347547(0x3d9)]=function(){const _0x5c382d=_0x347547;VisuMZ[_0x5c382d(0x4c0)]['Scene_MenuBase_createCancelButton'][_0x5c382d(0x248)](this);if(SceneManager[_0x5c382d(0x7f9)]()){if(_0x5c382d(0x8bc)!==_0x5c382d(0x8bc)){const _0xc8dc24=_0x44c800[_0x5c382d(0x158)]||0x0;(_0xc8dc24<0x0||_0xc8dc24>0x64||_0x68603[_0x5c382d(0x2b7)]()||_0x1cc76c[_0x5c382d(0x62f)](_0x5c382d(0x6fe)))&&(_0x3fa10e[_0x5c382d(0x158)]=_0x403e67,_0xa33d85['clear'](),_0x3b944f['clear']());const _0x5b74a3=_0x20e529[_0x5c382d(0x1b0)](_0xc8dc24);return _0x5b74a3&&(_0x5b74a3['_x']=_0x66b103['_x'],_0x5b74a3['_y']=_0x118b80['_y']),_0x2e598b[_0x5c382d(0x4c0)][_0x5c382d(0x544)](),_0x26128d[_0x5c382d(0x158)]!==_0x569ebb;}else this[_0x5c382d(0x5b8)]();}},Scene_MenuBase['prototype']['moveCancelButtonSideButtonLayout']=function(){this['_cancelButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x493)]=Scene_MenuBase[_0x347547(0x387)][_0x347547(0x881)],Scene_MenuBase[_0x347547(0x387)]['createPageButtons']=function(){const _0x2dfe18=_0x347547;VisuMZ[_0x2dfe18(0x4c0)]['Scene_MenuBase_createPageButtons'][_0x2dfe18(0x248)](this),SceneManager[_0x2dfe18(0x7f9)]()&&this[_0x2dfe18(0x55d)]();},Scene_MenuBase['prototype'][_0x347547(0x55d)]=function(){const _0x4c5c1d=_0x347547;this['_pageupButton']['x']=-0x1*(this[_0x4c5c1d(0x4fa)]['width']+this[_0x4c5c1d(0x75c)]['width']+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x4c5c1d(0x75c)][_0x4c5c1d(0x4da)]+0x4);},Scene_MenuBase[_0x347547(0x387)]['isMenuButtonAssistEnabled']=function(){const _0x2eb6f3=_0x347547;return VisuMZ['CoreEngine'][_0x2eb6f3(0x627)]['ButtonAssist'][_0x2eb6f3(0x6a5)];},Scene_MenuBase[_0x347547(0x387)]['getButtonAssistLocation']=function(){const _0x1cd0bb=_0x347547;return SceneManager['isSideButtonLayout']()||SceneManager['areButtonsHidden']()?VisuMZ[_0x1cd0bb(0x4c0)][_0x1cd0bb(0x627)][_0x1cd0bb(0x13e)]['Location']:_0x1cd0bb(0x698);},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x51b)]=function(){const _0x284204=_0x347547;if(!this['isMenuButtonAssistEnabled']())return;const _0x50302b=this[_0x284204(0x678)]();this[_0x284204(0x187)]=new Window_ButtonAssist(_0x50302b),this['addWindow'](this['_buttonAssistWindow']);},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x678)]=function(){const _0x2f5a02=_0x347547;if(this[_0x2f5a02(0x3b0)]()===_0x2f5a02(0x698))return _0x2f5a02(0x4db)==='uQXFd'?(_0x2b5e48=_0x212205(_0x526bf3),this[_0x2f5a02(0x287)]=this[_0x2f5a02(0x287)]||{},_0x204009['match'](/#(.*)/i)?this[_0x2f5a02(0x287)][_0x5b77cd]=_0x2f5a02(0x88f)[_0x2f5a02(0x83a)](_0x400ae7(_0xe270a9['$1'])):this['_colorCache'][_0x4f2593]=this[_0x2f5a02(0x1b8)](_0x4719fa(_0x20f564)),this[_0x2f5a02(0x287)][_0x72be3d]):this[_0x2f5a02(0x163)]();else{if(_0x2f5a02(0x540)!==_0x2f5a02(0x540)){if(this[_0x2f5a02(0x483)]===_0x2f5a02(0x5c7)&&!_0x3825f2[_0x2f5a02(0x252)]())return;if(_0x2b3d34[_0x2f5a02(0x482)]())return;_0x2d652a[_0x2f5a02(0x4c0)][_0x2f5a02(0xe3)]['call'](this,_0x4d055c),this[_0x2f5a02(0x854)](_0x2f5a02(0x40f));}else return this['buttonAssistWindowSideRect']();}},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x163)]=function(){const _0x2a3432=_0x347547,_0x357898=ConfigManager[_0x2a3432(0x1fe)]?(Sprite_Button[_0x2a3432(0x387)][_0x2a3432(0x13c)]()+0x6)*0x2:0x0,_0x483294=this[_0x2a3432(0x125)](),_0x18ede1=Graphics['boxWidth']-_0x357898*0x2,_0x5783b7=this[_0x2a3432(0x6b6)]();return new Rectangle(_0x357898,_0x483294,_0x18ede1,_0x5783b7);},Scene_MenuBase[_0x347547(0x387)][_0x347547(0x53d)]=function(){const _0x5e1e4a=_0x347547,_0x1a81d0=Graphics['boxWidth'],_0x4f5650=Window_ButtonAssist[_0x5e1e4a(0x387)]['lineHeight'](),_0x1221e2=0x0;let _0x41ba76=0x0;if(this[_0x5e1e4a(0x3b0)]()===_0x5e1e4a(0x8d3)){if(_0x5e1e4a(0x35a)===_0x5e1e4a(0x35a))_0x41ba76=0x0;else{_0x4b1287['ConvertParams'](_0x33162d,_0x318100);const _0x3bf8dd=_0x24ab13[_0x5e1e4a(0x279)]||0x1;_0xa69100[_0x5e1e4a(0x5bf)](_0x3bf8dd);}}else _0x5e1e4a(0x15f)===_0x5e1e4a(0x6be)?this[_0x5e1e4a(0x2a4)]():_0x41ba76=Graphics[_0x5e1e4a(0x70c)]-_0x4f5650;return new Rectangle(_0x1221e2,_0x41ba76,_0x1a81d0,_0x4f5650);},Scene_Menu[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)]['MenuLayout'][_0x347547(0x81e)],VisuMZ[_0x347547(0x4c0)][_0x347547(0x7f3)]=Scene_Menu[_0x347547(0x387)][_0x347547(0x30e)],Scene_Menu[_0x347547(0x387)]['create']=function(){const _0x452836=_0x347547;VisuMZ[_0x452836(0x4c0)]['Scene_Menu_create']['call'](this),this[_0x452836(0x564)]();},Scene_Menu[_0x347547(0x387)]['setCoreEngineUpdateWindowBg']=function(){const _0x89a6aa=_0x347547;if(this[_0x89a6aa(0x8d1)]){if(_0x89a6aa(0x207)!==_0x89a6aa(0x207)){const _0x2b5c6f=0x90,_0x510de7=0x60,_0x29ba65=0x18;this[_0x89a6aa(0x1d0)]['bitmap']=this['_windowskin'],this['_pauseSignSprite'][_0x89a6aa(0x5b2)]['x']=0.5,this[_0x89a6aa(0x1d0)][_0x89a6aa(0x5b2)]['y']=0x1,this[_0x89a6aa(0x1d0)]['move'](_0x2986ee[_0x89a6aa(0x22b)](this['_width']/0x2),this[_0x89a6aa(0x7b2)]),this[_0x89a6aa(0x1d0)][_0x89a6aa(0x63c)](_0x2b5c6f,_0x510de7,_0x29ba65,_0x29ba65),this[_0x89a6aa(0x1d0)][_0x89a6aa(0x36a)]=0xff;}else this['_commandWindow'][_0x89a6aa(0x599)](Scene_Menu[_0x89a6aa(0x649)][_0x89a6aa(0x23f)]);}this['_goldWindow']&&this['_goldWindow'][_0x89a6aa(0x599)](Scene_Menu[_0x89a6aa(0x649)]['GoldBgType']),this['_statusWindow']&&(_0x89a6aa(0x515)!==_0x89a6aa(0x846)?this['_statusWindow'][_0x89a6aa(0x599)](Scene_Menu[_0x89a6aa(0x649)][_0x89a6aa(0x5ae)]):(_0x31d577+=_0x40d17c+'\x0a',_0x5bc275+=_0x89a6aa(0x8db)));},Scene_Menu['prototype'][_0x347547(0x40d)]=function(){const _0x9c3c9=_0x347547;return Scene_Menu[_0x9c3c9(0x649)][_0x9c3c9(0x41b)][_0x9c3c9(0x248)](this);},Scene_Menu['prototype'][_0x347547(0xe2)]=function(){const _0x35168e=_0x347547;return Scene_Menu[_0x35168e(0x649)][_0x35168e(0xeb)][_0x35168e(0x248)](this);},Scene_Menu[_0x347547(0x387)][_0x347547(0x4f3)]=function(){const _0x283af8=_0x347547;return Scene_Menu['layoutSettings'][_0x283af8(0x3e7)][_0x283af8(0x248)](this);},Scene_Item[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0x82e)],VisuMZ[_0x347547(0x4c0)][_0x347547(0x6ad)]=Scene_Item[_0x347547(0x387)][_0x347547(0x30e)],Scene_Item['prototype'][_0x347547(0x30e)]=function(){const _0x2b3262=_0x347547;VisuMZ[_0x2b3262(0x4c0)][_0x2b3262(0x6ad)][_0x2b3262(0x248)](this),this[_0x2b3262(0x564)]();},Scene_Item['prototype'][_0x347547(0x564)]=function(){const _0x10e17f=_0x347547;this['_helpWindow']&&this['_helpWindow'][_0x10e17f(0x599)](Scene_Item[_0x10e17f(0x649)]['HelpBgType']),this[_0x10e17f(0x213)]&&this[_0x10e17f(0x213)][_0x10e17f(0x599)](Scene_Item[_0x10e17f(0x649)]['CategoryBgType']),this[_0x10e17f(0x203)]&&this[_0x10e17f(0x203)][_0x10e17f(0x599)](Scene_Item[_0x10e17f(0x649)][_0x10e17f(0x2df)]),this[_0x10e17f(0x15c)]&&('zursh'!==_0x10e17f(0x879)?_0x45f4ff[_0x10e17f(0x278)](_0x10e17f(0x62c))&&_0x5e3b07[_0x10e17f(0x4c0)][_0x10e17f(0x627)]['QoL'][_0x10e17f(0x694)]?this['startAutoNewGame']():_0x223c8c[_0x10e17f(0x4c0)][_0x10e17f(0x7be)][_0x10e17f(0x248)](this):this[_0x10e17f(0x15c)][_0x10e17f(0x599)](Scene_Item[_0x10e17f(0x649)][_0x10e17f(0x11e)]));},Scene_Item[_0x347547(0x387)]['helpWindowRect']=function(){const _0x139810=_0x347547;return Scene_Item[_0x139810(0x649)][_0x139810(0x3af)]['call'](this);},Scene_Item[_0x347547(0x387)]['categoryWindowRect']=function(){const _0x240923=_0x347547;return Scene_Item[_0x240923(0x649)][_0x240923(0x73b)][_0x240923(0x248)](this);},Scene_Item[_0x347547(0x387)][_0x347547(0x242)]=function(){const _0x50a5b0=_0x347547;return Scene_Item[_0x50a5b0(0x649)]['ItemRect'][_0x50a5b0(0x248)](this);},Scene_Item[_0x347547(0x387)][_0x347547(0x845)]=function(){const _0x2139bb=_0x347547;return Scene_Item[_0x2139bb(0x649)][_0x2139bb(0x77c)][_0x2139bb(0x248)](this);},Scene_Skill['layoutSettings']=VisuMZ['CoreEngine'][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0x202)],VisuMZ[_0x347547(0x4c0)][_0x347547(0x6a6)]=Scene_Skill[_0x347547(0x387)][_0x347547(0x30e)],Scene_Skill[_0x347547(0x387)]['create']=function(){const _0x1e168c=_0x347547;VisuMZ['CoreEngine'][_0x1e168c(0x6a6)][_0x1e168c(0x248)](this),this[_0x1e168c(0x564)]();},Scene_Skill[_0x347547(0x387)][_0x347547(0x564)]=function(){const _0x10ea6a=_0x347547;if(this[_0x10ea6a(0x342)]){if('tSEda'!=='GteyA')this[_0x10ea6a(0x342)]['setBackgroundType'](Scene_Skill[_0x10ea6a(0x649)][_0x10ea6a(0x498)]);else return _0x1da57a[_0x10ea6a(0x4c0)][_0x10ea6a(0x627)]['MenuLayout'][_0x10ea6a(0x2a5)][_0x10ea6a(0x41b)][_0x10ea6a(0x248)](this);}this[_0x10ea6a(0x591)]&&this[_0x10ea6a(0x591)]['setBackgroundType'](Scene_Skill[_0x10ea6a(0x649)]['SkillTypeBgType']),this[_0x10ea6a(0x11c)]&&this[_0x10ea6a(0x11c)][_0x10ea6a(0x599)](Scene_Skill[_0x10ea6a(0x649)]['StatusBgType']),this[_0x10ea6a(0x203)]&&(_0x10ea6a(0x849)==='PmKEE'?this[_0x10ea6a(0x4dc)]():this[_0x10ea6a(0x203)][_0x10ea6a(0x599)](Scene_Skill['layoutSettings'][_0x10ea6a(0x2df)])),this[_0x10ea6a(0x15c)]&&this[_0x10ea6a(0x15c)][_0x10ea6a(0x599)](Scene_Skill['layoutSettings'][_0x10ea6a(0x11e)]);},Scene_Skill['prototype'][_0x347547(0x7b5)]=function(){const _0x181a05=_0x347547;return Scene_Skill['layoutSettings'][_0x181a05(0x3af)][_0x181a05(0x248)](this);},Scene_Skill[_0x347547(0x387)][_0x347547(0x502)]=function(){const _0x2b661d=_0x347547;return Scene_Skill[_0x2b661d(0x649)][_0x2b661d(0x62d)]['call'](this);},Scene_Skill[_0x347547(0x387)][_0x347547(0x4f3)]=function(){const _0x22089c=_0x347547;return Scene_Skill[_0x22089c(0x649)]['StatusRect'][_0x22089c(0x248)](this);},Scene_Skill[_0x347547(0x387)][_0x347547(0x242)]=function(){const _0x584927=_0x347547;return Scene_Skill[_0x584927(0x649)][_0x584927(0x5b1)][_0x584927(0x248)](this);},Scene_Skill[_0x347547(0x387)]['actorWindowRect']=function(){const _0xd7cd53=_0x347547;return Scene_Skill[_0xd7cd53(0x649)][_0xd7cd53(0x77c)][_0xd7cd53(0x248)](this);},Scene_Equip[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)]['MenuLayout'][_0x347547(0x681)],VisuMZ[_0x347547(0x4c0)][_0x347547(0x436)]=Scene_Equip[_0x347547(0x387)][_0x347547(0x30e)],Scene_Equip[_0x347547(0x387)][_0x347547(0x30e)]=function(){const _0x5abb75=_0x347547;VisuMZ['CoreEngine'][_0x5abb75(0x436)][_0x5abb75(0x248)](this),this[_0x5abb75(0x564)]();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0xba7568=_0x347547;this[_0xba7568(0x342)]&&(_0xba7568(0x719)!=='fokmi'?this[_0xba7568(0x342)][_0xba7568(0x599)](Scene_Equip[_0xba7568(0x649)]['HelpBgType']):this[_0xba7568(0x514)]()),this['_statusWindow']&&this[_0xba7568(0x11c)]['setBackgroundType'](Scene_Equip[_0xba7568(0x649)][_0xba7568(0x5ae)]),this['_commandWindow']&&this[_0xba7568(0x8d1)]['setBackgroundType'](Scene_Equip[_0xba7568(0x649)]['CommandBgType']),this[_0xba7568(0x868)]&&this[_0xba7568(0x868)][_0xba7568(0x599)](Scene_Equip[_0xba7568(0x649)][_0xba7568(0x438)]),this[_0xba7568(0x203)]&&this[_0xba7568(0x203)]['setBackgroundType'](Scene_Equip[_0xba7568(0x649)][_0xba7568(0x2df)]);},Scene_Equip[_0x347547(0x387)][_0x347547(0x7b5)]=function(){const _0x5674eb=_0x347547;return Scene_Equip['layoutSettings']['HelpRect'][_0x5674eb(0x248)](this);},Scene_Equip['prototype'][_0x347547(0x4f3)]=function(){return Scene_Equip['layoutSettings']['StatusRect']['call'](this);},Scene_Equip[_0x347547(0x387)][_0x347547(0x40d)]=function(){const _0x2109f0=_0x347547;return Scene_Equip[_0x2109f0(0x649)][_0x2109f0(0x41b)][_0x2109f0(0x248)](this);},Scene_Equip[_0x347547(0x387)][_0x347547(0x6c7)]=function(){return Scene_Equip['layoutSettings']['SlotRect']['call'](this);},Scene_Equip[_0x347547(0x387)][_0x347547(0x242)]=function(){const _0x1d636b=_0x347547;return Scene_Equip['layoutSettings'][_0x1d636b(0x5b1)][_0x1d636b(0x248)](this);},Scene_Status[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0xde)],VisuMZ[_0x347547(0x4c0)][_0x347547(0x23e)]=Scene_Status['prototype'][_0x347547(0x30e)],Scene_Status[_0x347547(0x387)][_0x347547(0x30e)]=function(){const _0x378104=_0x347547;VisuMZ[_0x378104(0x4c0)]['Scene_Status_create'][_0x378104(0x248)](this),this[_0x378104(0x564)]();},Scene_Status['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x3b68fb=_0x347547;if(this[_0x3b68fb(0x3d6)]){if(_0x3b68fb(0x79c)===_0x3b68fb(0x348))return _0x3e6b7f[_0x3b68fb(0x4c0)]['Settings']['UI']['ButtonHeight'];else this[_0x3b68fb(0x3d6)][_0x3b68fb(0x599)](Scene_Status[_0x3b68fb(0x649)][_0x3b68fb(0x100)]);}this['_statusWindow']&&this['_statusWindow'][_0x3b68fb(0x599)](Scene_Status[_0x3b68fb(0x649)][_0x3b68fb(0x5ae)]);if(this[_0x3b68fb(0x7cc)]){if(_0x3b68fb(0x4cc)==='NUvQx')this[_0x3b68fb(0x7cc)]['setBackgroundType'](Scene_Status[_0x3b68fb(0x649)][_0x3b68fb(0x4f5)]);else return _0x5d509c[_0x3b68fb(0x46d)];}if(this[_0x3b68fb(0x679)]){if(_0x3b68fb(0x390)===_0x3b68fb(0x390))this[_0x3b68fb(0x679)][_0x3b68fb(0x599)](Scene_Status[_0x3b68fb(0x649)][_0x3b68fb(0x51f)]);else{if(_0x520e96[_0x3b68fb(0x3c3)]==='SV')return!![];else{if(_0x5d89aa[_0x3b68fb(0x3c3)]==='FV')return![];}if(this[_0x3b68fb(0x8b7)]===_0x595fd0)this[_0x3b68fb(0x3d2)]();if(this['_CoreEngineSettings'][_0x3b68fb(0x720)]===_0x2edd5f)this[_0x3b68fb(0x3d2)]();return this['_CoreEngineSettings'][_0x3b68fb(0x720)];}}},Scene_Status['prototype'][_0x347547(0x88b)]=function(){const _0x1302e4=_0x347547;return Scene_Status['layoutSettings'][_0x1302e4(0x4f0)]['call'](this);},Scene_Status[_0x347547(0x387)]['statusWindowRect']=function(){const _0x5796ec=_0x347547;return Scene_Status[_0x5796ec(0x649)][_0x5796ec(0x3e7)]['call'](this);},Scene_Status[_0x347547(0x387)][_0x347547(0x7cd)]=function(){const _0x497aa1=_0x347547;return Scene_Status[_0x497aa1(0x649)]['StatusParamsRect'][_0x497aa1(0x248)](this);},Scene_Status['prototype']['statusEquipWindowRect']=function(){const _0xbaa650=_0x347547;return Scene_Status[_0xbaa650(0x649)][_0xbaa650(0x8c0)][_0xbaa650(0x248)](this);},Scene_Options[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)]['OptionsMenu'],VisuMZ[_0x347547(0x4c0)][_0x347547(0x4f8)]=Scene_Options[_0x347547(0x387)][_0x347547(0x30e)],Scene_Options[_0x347547(0x387)]['create']=function(){const _0x3f5c09=_0x347547;VisuMZ[_0x3f5c09(0x4c0)][_0x3f5c09(0x4f8)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x52450b=_0x347547;this['_optionsWindow']&&this[_0x52450b(0x2c9)][_0x52450b(0x599)](Scene_Options[_0x52450b(0x649)]['OptionsBgType']);},Scene_Options[_0x347547(0x387)][_0x347547(0x25b)]=function(){const _0x11424a=_0x347547;return Scene_Options['layoutSettings'][_0x11424a(0x488)][_0x11424a(0x248)](this);},Scene_Save[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)]['SaveMenu'],Scene_Save['prototype'][_0x347547(0x30e)]=function(){const _0x3da9ad=_0x347547;Scene_File[_0x3da9ad(0x387)][_0x3da9ad(0x30e)][_0x3da9ad(0x248)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save['prototype'][_0x347547(0x564)]=function(){const _0x5976ea=_0x347547;this[_0x5976ea(0x342)]&&this[_0x5976ea(0x342)]['setBackgroundType'](Scene_Save[_0x5976ea(0x649)][_0x5976ea(0x498)]),this[_0x5976ea(0x1f9)]&&this[_0x5976ea(0x1f9)][_0x5976ea(0x599)](Scene_Save[_0x5976ea(0x649)][_0x5976ea(0x319)]);},Scene_Save['prototype'][_0x347547(0x7b5)]=function(){const _0x3b0dd5=_0x347547;return Scene_Save[_0x3b0dd5(0x649)][_0x3b0dd5(0x3af)][_0x3b0dd5(0x248)](this);},Scene_Save[_0x347547(0x387)][_0x347547(0x1da)]=function(){const _0x20dfed=_0x347547;return Scene_Save[_0x20dfed(0x649)][_0x20dfed(0x366)]['call'](this);},Scene_Load[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)]['MenuLayout'][_0x347547(0x6d8)],Scene_Load['prototype']['create']=function(){const _0x534dbb=_0x347547;Scene_File['prototype'][_0x534dbb(0x30e)][_0x534dbb(0x248)](this),this[_0x534dbb(0x564)]();},Scene_Load['prototype'][_0x347547(0x564)]=function(){const _0x3c85ae=_0x347547;this[_0x3c85ae(0x342)]&&(_0x3c85ae(0x41c)!==_0x3c85ae(0x227)?this['_helpWindow']['setBackgroundType'](Scene_Load['layoutSettings'][_0x3c85ae(0x498)]):_0x10ba4e[_0x3c85ae(0x4c0)]['Window_Selectable_cursorDown'][_0x3c85ae(0x248)](this,_0xebbb));if(this[_0x3c85ae(0x1f9)]){if(_0x3c85ae(0x233)!==_0x3c85ae(0x401))this[_0x3c85ae(0x1f9)][_0x3c85ae(0x599)](Scene_Load[_0x3c85ae(0x649)][_0x3c85ae(0x319)]);else{if(this[_0x3c85ae(0x8b7)]===_0x5e4f67)this['initCoreEngine']();if(this[_0x3c85ae(0x8b7)][_0x3c85ae(0x5d4)]===_0x75d417)this[_0x3c85ae(0x8ab)]();this['_CoreEngineSettings'][_0x3c85ae(0x5d4)]=_0x2bd9b2;}}},Scene_Load[_0x347547(0x387)][_0x347547(0x7b5)]=function(){const _0x4951b2=_0x347547;return Scene_Load['layoutSettings'][_0x4951b2(0x3af)][_0x4951b2(0x248)](this);},Scene_Load['prototype'][_0x347547(0x1da)]=function(){const _0x25d85b=_0x347547;return Scene_Load[_0x25d85b(0x649)][_0x25d85b(0x366)][_0x25d85b(0x248)](this);},Scene_GameEnd[_0x347547(0x649)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0x539)],VisuMZ[_0x347547(0x4c0)][_0x347547(0x417)]=Scene_GameEnd['prototype'][_0x347547(0x32b)],Scene_GameEnd[_0x347547(0x387)]['createBackground']=function(){const _0x4bd912=_0x347547;Scene_MenuBase[_0x4bd912(0x387)][_0x4bd912(0x32b)]['call'](this);},Scene_GameEnd[_0x347547(0x387)][_0x347547(0x355)]=function(){const _0x24663b=_0x347547,_0x99f8d=this['commandWindowRect']();this[_0x24663b(0x8d1)]=new Window_GameEnd(_0x99f8d),this[_0x24663b(0x8d1)][_0x24663b(0x66a)](_0x24663b(0x6fe),this[_0x24663b(0x46b)][_0x24663b(0x49c)](this)),this[_0x24663b(0x276)](this[_0x24663b(0x8d1)]),this[_0x24663b(0x8d1)][_0x24663b(0x599)](Scene_GameEnd['layoutSettings'][_0x24663b(0x23f)]);},Scene_GameEnd[_0x347547(0x387)][_0x347547(0x40d)]=function(){const _0x3787e1=_0x347547;return Scene_GameEnd[_0x3787e1(0x649)][_0x3787e1(0x41b)]['call'](this);},Scene_Shop[_0x347547(0x649)]=VisuMZ['CoreEngine'][_0x347547(0x627)]['MenuLayout'][_0x347547(0x6dd)],VisuMZ['CoreEngine'][_0x347547(0x31a)]=Scene_Shop[_0x347547(0x387)]['create'],Scene_Shop[_0x347547(0x387)][_0x347547(0x30e)]=function(){const _0xcbf4dc=_0x347547;VisuMZ[_0xcbf4dc(0x4c0)][_0xcbf4dc(0x31a)][_0xcbf4dc(0x248)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x347547(0x387)][_0x347547(0x564)]=function(){const _0x22ba57=_0x347547;this[_0x22ba57(0x342)]&&(_0x22ba57(0x2b9)!=='uYObc'?this[_0x22ba57(0x342)]['setBackgroundType'](Scene_Shop[_0x22ba57(0x649)][_0x22ba57(0x498)]):this['_sideButtonLayout']=_0x57f1f7);if(this[_0x22ba57(0x38a)]){if(_0x22ba57(0x821)!==_0x22ba57(0x821)){_0x298f56['ConvertParams'](_0x501ae1,_0x332a4a);const _0x3a9808=_0x5c2b10[_0x22ba57(0x22b)](_0x2253a2[_0x22ba57(0x79d)])['clamp'](0x1,0x64),_0x231d04=_0x55c381[_0x22ba57(0x627)],_0x5b099a=_0x231d04[_0x22ba57(0x47d)][_0x22ba57(0x2a2)](0x0,0x1),_0x3e98e2=_0x272f23['round'](_0x231d04['PositionX']||0x0),_0x3bfca2=_0x334d7e['round'](_0x231d04[_0x22ba57(0x718)]||0x0),_0x3b1290=_0x451e89[_0x22ba57(0x22b)](_0x231d04[_0x22ba57(0x6fb)]||0x0),_0x6f1796=_0x2a30c4[_0x22ba57(0x22b)](_0x231d04[_0x22ba57(0x6d7)]||0x0),_0xcc0584=_0x37f67d['round'](_0x231d04['Opacity'])[_0x22ba57(0x2a2)](0x0,0xff),_0x17a12e=_0x231d04[_0x22ba57(0x166)],_0x3cfcba=_0x22ba57(0x62a),_0x5406f3=_0xe7fab8[_0x22ba57(0x26a)]?_0x22ba57(0x26a):_0x22ba57(0x4b9),_0x37ca18=_0x3cfcba[_0x22ba57(0x83a)](_0x177415[_0x22ba57(0x137)],_0x5406f3);_0x4c892a['showPicture'](_0x3a9808,_0x37ca18,_0x5b099a,_0x3e98e2,_0x3bfca2,_0x3b1290,_0x6f1796,_0xcc0584,_0x17a12e);}else this['_goldWindow']['setBackgroundType'](Scene_Shop[_0x22ba57(0x649)][_0x22ba57(0x2d3)]);}this[_0x22ba57(0x8d1)]&&this[_0x22ba57(0x8d1)][_0x22ba57(0x599)](Scene_Shop['layoutSettings'][_0x22ba57(0x23f)]);this[_0x22ba57(0x870)]&&this[_0x22ba57(0x870)][_0x22ba57(0x599)](Scene_Shop['layoutSettings'][_0x22ba57(0x893)]);if(this[_0x22ba57(0x637)]){if(_0x22ba57(0x393)===_0x22ba57(0x2d5)){const _0x521dd5=_0x4ddc7b[_0x22ba57(0x4c0)][_0x22ba57(0x212)][_0x4848f6],_0x4f7078=this[_0x521dd5];return _0x543dcc['CoreEngine'][_0x22ba57(0x11f)][_0x460883]===_0x22ba57(0x400)?_0x4f7078:_0xae5fae?_0x461a51(_0x858c7c[_0x22ba57(0x22b)](_0x4f7078*0x64))+'%':_0x4f7078;}else this[_0x22ba57(0x637)][_0x22ba57(0x599)](Scene_Shop[_0x22ba57(0x649)][_0x22ba57(0x701)]);}if(this[_0x22ba57(0x11c)]){if(_0x22ba57(0x68c)===_0x22ba57(0x68c))this[_0x22ba57(0x11c)][_0x22ba57(0x599)](Scene_Shop[_0x22ba57(0x649)][_0x22ba57(0x5ae)]);else return this['item']()?_0x5b9f88['CoreEngine'][_0x22ba57(0x857)]['call'](this):0x0;}this[_0x22ba57(0x7d0)]&&this[_0x22ba57(0x7d0)][_0x22ba57(0x599)](Scene_Shop[_0x22ba57(0x649)][_0x22ba57(0x5f6)]),this['_categoryWindow']&&this[_0x22ba57(0x213)][_0x22ba57(0x599)](Scene_Shop[_0x22ba57(0x649)]['CategoryBgType']),this[_0x22ba57(0x813)]&&this[_0x22ba57(0x813)][_0x22ba57(0x599)](Scene_Shop[_0x22ba57(0x649)][_0x22ba57(0x748)]);},Scene_Shop[_0x347547(0x387)][_0x347547(0x7b5)]=function(){const _0x31096b=_0x347547;return Scene_Shop[_0x31096b(0x649)][_0x31096b(0x3af)]['call'](this);},Scene_Shop[_0x347547(0x387)][_0x347547(0xe2)]=function(){const _0x412c70=_0x347547;return Scene_Shop[_0x412c70(0x649)][_0x412c70(0xeb)][_0x412c70(0x248)](this);},Scene_Shop['prototype'][_0x347547(0x40d)]=function(){const _0x321ec0=_0x347547;return Scene_Shop[_0x321ec0(0x649)][_0x321ec0(0x41b)]['call'](this);},Scene_Shop[_0x347547(0x387)][_0x347547(0x411)]=function(){const _0x949882=_0x347547;return Scene_Shop[_0x949882(0x649)]['DummyRect'][_0x949882(0x248)](this);},Scene_Shop[_0x347547(0x387)][_0x347547(0x12c)]=function(){const _0xdc480a=_0x347547;return Scene_Shop[_0xdc480a(0x649)][_0xdc480a(0x608)][_0xdc480a(0x248)](this);},Scene_Shop[_0x347547(0x387)][_0x347547(0x4f3)]=function(){const _0x5b7bc5=_0x347547;return Scene_Shop['layoutSettings'][_0x5b7bc5(0x3e7)][_0x5b7bc5(0x248)](this);},Scene_Shop[_0x347547(0x387)][_0x347547(0x43d)]=function(){const _0x18c9bf=_0x347547;return Scene_Shop[_0x18c9bf(0x649)][_0x18c9bf(0x159)][_0x18c9bf(0x248)](this);},Scene_Shop['prototype']['categoryWindowRect']=function(){const _0x31caba=_0x347547;return Scene_Shop[_0x31caba(0x649)][_0x31caba(0x73b)]['call'](this);},Scene_Shop[_0x347547(0x387)][_0x347547(0x306)]=function(){const _0x17fa3f=_0x347547;return Scene_Shop['layoutSettings'][_0x17fa3f(0x5a6)]['call'](this);},Scene_Name[_0x347547(0x649)]=VisuMZ['CoreEngine'][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0x770)],VisuMZ['CoreEngine'][_0x347547(0x624)]=Scene_Name['prototype']['create'],Scene_Name['prototype']['create']=function(){const _0x34019a=_0x347547;VisuMZ[_0x34019a(0x4c0)][_0x34019a(0x624)][_0x34019a(0x248)](this),this[_0x34019a(0x564)]();},Scene_Name['prototype'][_0x347547(0x564)]=function(){const _0x2f85c5=_0x347547;this[_0x2f85c5(0x165)]&&this[_0x2f85c5(0x165)][_0x2f85c5(0x599)](Scene_Name[_0x2f85c5(0x649)][_0x2f85c5(0x1d8)]),this[_0x2f85c5(0x52d)]&&(_0x2f85c5(0x89f)!==_0x2f85c5(0x89f)?_0x291476['CoreEngine'][_0x2f85c5(0x509)][_0x2f85c5(0x248)](this,_0x8fd969):this[_0x2f85c5(0x52d)]['setBackgroundType'](Scene_Name[_0x2f85c5(0x649)]['InputBgType']));},Scene_Name[_0x347547(0x387)][_0x347547(0x67e)]=function(){return 0x0;},Scene_Name['prototype']['editWindowRect']=function(){const _0x489b12=_0x347547;return Scene_Name[_0x489b12(0x649)][_0x489b12(0x47b)][_0x489b12(0x248)](this);},Scene_Name[_0x347547(0x387)]['inputWindowRect']=function(){const _0x263e23=_0x347547;return Scene_Name['layoutSettings']['InputRect'][_0x263e23(0x248)](this);},Scene_Name['prototype'][_0x347547(0x291)]=function(){const _0x1631a9=_0x347547;if(!this[_0x1631a9(0x52d)])return![];return VisuMZ[_0x1631a9(0x4c0)]['Settings'][_0x1631a9(0x3f0)][_0x1631a9(0x291)];},Scene_Name[_0x347547(0x387)]['buttonAssistKey1']=function(){const _0x1e28fa=_0x347547;if(this['EnableNameInput']()){if(_0x1e28fa(0x232)!==_0x1e28fa(0x193))return TextManager[_0x1e28fa(0x577)](_0x1e28fa(0x506));else this['movePageButtonSideButtonLayout']();}else return Scene_MenuBase[_0x1e28fa(0x387)][_0x1e28fa(0x491)][_0x1e28fa(0x248)](this);},Scene_Name[_0x347547(0x387)][_0x347547(0x5df)]=function(){const _0x391e50=_0x347547;if(this['EnableNameInput']()){if(_0x391e50(0x126)!=='zDdrE'){const _0x145679=VisuMZ[_0x391e50(0x4c0)][_0x391e50(0x627)][_0x391e50(0x3f0)];return this[_0x391e50(0x52d)]['_mode']==='keyboard'?_0x145679[_0x391e50(0x4f6)]||_0x391e50(0x4f6):_0x391e50(0x37c)!==_0x391e50(0x48b)?_0x145679['Manual']||_0x391e50(0x2e5):_0xcb444c[_0x391e50(0x4c0)][_0x391e50(0x627)][_0x391e50(0x76a)][_0x391e50(0x4b5)][_0x391e50(0x248)](this,_0x4be626);}else _0x447d94+='(\x5cd+\x5c.?\x5cd+)>';}else return Scene_MenuBase[_0x391e50(0x387)][_0x391e50(0x5df)][_0x391e50(0x248)](this);},VisuMZ['CoreEngine']['Scene_Name_onInputOk']=Scene_Name[_0x347547(0x387)][_0x347547(0x5ba)],Scene_Name['prototype'][_0x347547(0x5ba)]=function(){const _0x7e5b4a=_0x347547;this[_0x7e5b4a(0x7b4)]()?this[_0x7e5b4a(0x2e3)]():VisuMZ[_0x7e5b4a(0x4c0)]['Scene_Name_onInputOk'][_0x7e5b4a(0x248)](this);},Scene_Name[_0x347547(0x387)][_0x347547(0x7b4)]=function(){const _0x545d36=_0x347547,_0x2734ca=VisuMZ[_0x545d36(0x4c0)][_0x545d36(0x627)][_0x545d36(0x3f0)];if(!_0x2734ca)return![];const _0x2fb46e=_0x2734ca[_0x545d36(0x174)];if(!_0x2fb46e)return![];const _0x192fcf=this[_0x545d36(0x165)][_0x545d36(0x771)]()[_0x545d36(0x181)]();for(const _0x4780da of _0x2fb46e){if(_0x192fcf[_0x545d36(0x4aa)](_0x4780da['toLowerCase']()))return!![];}return![];},Scene_Name['prototype']['onInputBannedWords']=function(){const _0x503e37=_0x347547;SoundManager[_0x503e37(0x1c2)]();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x1f3)]=Scene_Battle[_0x347547(0x387)][_0x347547(0x864)],Scene_Battle[_0x347547(0x387)][_0x347547(0x864)]=function(){const _0x45ed54=_0x347547;VisuMZ[_0x45ed54(0x4c0)][_0x45ed54(0x1f3)][_0x45ed54(0x248)](this);if($gameTemp['_playTestFastMode'])this[_0x45ed54(0x8a5)]();},Scene_Battle[_0x347547(0x387)][_0x347547(0x8a5)]=function(){const _0x2b7abf=_0x347547;if(!BattleManager[_0x2b7abf(0x692)]()&&!this[_0x2b7abf(0x11a)]&&!$gameMessage['isBusy']()){if('Pmkzt'===_0x2b7abf(0x59a))this[_0x2b7abf(0x11a)]=!![],this['update'](),SceneManager[_0x2b7abf(0x5db)](),this['_playtestF7Looping']=![];else{var _0x3444e5=_0x4bc148(_0x22335a['$1']);_0x5b571c+=_0x3444e5;}}},VisuMZ['CoreEngine'][_0x347547(0x2f0)]=Scene_Battle[_0x347547(0x387)][_0x347547(0x3d9)],Scene_Battle[_0x347547(0x387)][_0x347547(0x3d9)]=function(){const _0x1d7a70=_0x347547;VisuMZ[_0x1d7a70(0x4c0)][_0x1d7a70(0x2f0)][_0x1d7a70(0x248)](this),SceneManager[_0x1d7a70(0x7f9)]()&&this[_0x1d7a70(0x78c)]();},Scene_Battle[_0x347547(0x387)]['repositionCancelButtonSideButtonLayout']=function(){const _0x214262=_0x347547;this[_0x214262(0x1a2)]['x']=Graphics['boxWidth']+0x4,this['isBottomButtonMode']()?'Vghcf'===_0x214262(0x79e)?(_0x65449[_0x214262(0x387)]['terminate'][_0x214262(0x248)](this),!_0x3ae200[_0x214262(0x478)](_0x158052)&&(this[_0x214262(0x421)][_0x214262(0x864)](),this[_0x214262(0x33f)][_0x214262(0x7bc)](),this['_windowLayer'][_0x214262(0x3d0)]=![],_0x4dd1fd[_0x214262(0x687)]()),_0xf7d8b5[_0x214262(0x803)](),this['clearOnceParallelInterpreters']()):this[_0x214262(0x1a2)]['y']=Graphics[_0x214262(0x70c)]-this['buttonAreaHeight']():_0x214262(0x896)===_0x214262(0x896)?this[_0x214262(0x1a2)]['y']=0x0:this[_0x214262(0x15c)][_0x214262(0x599)](_0x1b87b8[_0x214262(0x649)][_0x214262(0x11e)]);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x3e6)]=Sprite_Button[_0x347547(0x387)][_0x347547(0x6f3)],Sprite_Button[_0x347547(0x387)]['initialize']=function(_0x568665){const _0x4c6b33=_0x347547;VisuMZ[_0x4c6b33(0x4c0)][_0x4c6b33(0x3e6)][_0x4c6b33(0x248)](this,_0x568665),this[_0x4c6b33(0x37a)]();},Sprite_Button['prototype'][_0x347547(0x37a)]=function(){const _0xca6f56=_0x347547,_0x589df9=VisuMZ[_0xca6f56(0x4c0)][_0xca6f56(0x627)]['UI'];this[_0xca6f56(0x2cc)]=![];switch(this[_0xca6f56(0x43b)]){case _0xca6f56(0x6fe):this[_0xca6f56(0x2cc)]=!_0x589df9[_0xca6f56(0x1c4)];break;case _0xca6f56(0x177):case _0xca6f56(0x423):this[_0xca6f56(0x2cc)]=!_0x589df9[_0xca6f56(0x81d)];break;case _0xca6f56(0x77b):case'up':case _0xca6f56(0xcd):case _0xca6f56(0x448):case'ok':this[_0xca6f56(0x2cc)]=!_0x589df9[_0xca6f56(0x2f2)];break;case _0xca6f56(0x590):this['_isButtonHidden']=!_0x589df9[_0xca6f56(0x626)];break;}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x754)]=Sprite_Button[_0x347547(0x387)][_0x347547(0x39f)],Sprite_Button[_0x347547(0x387)][_0x347547(0x39f)]=function(){const _0x2d58f5=_0x347547;if(SceneManager['areButtonsHidden']()||this['_isButtonHidden']){if(_0x2d58f5(0x3d1)!==_0x2d58f5(0x888))this[_0x2d58f5(0x761)]();else return _0xd27149[_0x2d58f5(0x649)][_0x2d58f5(0x3af)][_0x2d58f5(0x248)](this);}else VisuMZ['CoreEngine']['Sprite_Button_updateOpacity'][_0x2d58f5(0x248)](this);},Sprite_Button[_0x347547(0x387)][_0x347547(0x761)]=function(){const _0x57619b=_0x347547;this[_0x57619b(0x3d0)]=![],this[_0x57619b(0x238)]=0x0,this['x']=Graphics[_0x57619b(0x4da)]*0xa,this['y']=Graphics[_0x57619b(0xe4)]*0xa;},VisuMZ['CoreEngine']['Sprite_Battler_startMove']=Sprite_Battler[_0x347547(0x387)][_0x347547(0x8c2)],Sprite_Battler[_0x347547(0x387)]['startMove']=function(_0xca755a,_0x56595b,_0x49fd09){const _0x4a6ca2=_0x347547;if(this['_targetOffsetX']!==_0xca755a||this[_0x4a6ca2(0x4f4)]!==_0x56595b){if(_0x4a6ca2(0x2b6)===_0x4a6ca2(0x2b6))this[_0x4a6ca2(0x26f)]('Linear'),this['_movementWholeDuration']=_0x49fd09;else return _0x5440aa[_0x4a6ca2(0x577)]('shift');}VisuMZ[_0x4a6ca2(0x4c0)][_0x4a6ca2(0x74d)]['call'](this,_0xca755a,_0x56595b,_0x49fd09);},Sprite_Battler[_0x347547(0x387)]['setMoveEasingType']=function(_0x4413e6){this['_moveEasingType']=_0x4413e6;},Sprite_Battler[_0x347547(0x387)][_0x347547(0x29f)]=function(){const _0x142c00=_0x347547;if(this[_0x142c00(0x326)]<=0x0)return;const _0xe67e17=this[_0x142c00(0x326)],_0x3cb2e7=this[_0x142c00(0x45a)],_0x584d41=this[_0x142c00(0x429)];this[_0x142c00(0x40a)]=this['applyEasing'](this[_0x142c00(0x40a)],this[_0x142c00(0x860)],_0xe67e17,_0x3cb2e7,_0x584d41),this['_offsetY']=this[_0x142c00(0x20d)](this['_offsetY'],this[_0x142c00(0x4f4)],_0xe67e17,_0x3cb2e7,_0x584d41),this[_0x142c00(0x326)]--;if(this[_0x142c00(0x326)]<=0x0)this[_0x142c00(0x636)]();},Sprite_Battler[_0x347547(0x387)][_0x347547(0x20d)]=function(_0x59ae2b,_0x55a233,_0x2bd858,_0x6708cf,_0x221a26){const _0x3cfa05=_0x347547,_0x23a6c6=VisuMZ[_0x3cfa05(0x24e)]((_0x6708cf-_0x2bd858)/_0x6708cf,_0x221a26||_0x3cfa05(0x19b)),_0x2ab925=VisuMZ[_0x3cfa05(0x24e)]((_0x6708cf-_0x2bd858+0x1)/_0x6708cf,_0x221a26||'Linear'),_0x4344b0=(_0x59ae2b-_0x55a233*_0x23a6c6)/(0x1-_0x23a6c6);return _0x4344b0+(_0x55a233-_0x4344b0)*_0x2ab925;},VisuMZ[_0x347547(0x4c0)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x347547(0x387)]['setActorHome'],Sprite_Actor[_0x347547(0x387)][_0x347547(0x67b)]=function(_0x256931){const _0x3a607c=_0x347547;VisuMZ[_0x3a607c(0x4c0)][_0x3a607c(0x627)]['UI'][_0x3a607c(0x1e1)]?_0x3a607c(0x22e)!==_0x3a607c(0x547)?this['setActorHomeRepositioned'](_0x256931):(this[_0x3a607c(0x186)]=new _0x4ee3d5(),this[_0x3a607c(0x186)][_0x3a607c(0x621)]=new _0x59be16(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x3a607c(0x2d6)](this[_0x3a607c(0x186)])):VisuMZ[_0x3a607c(0x4c0)][_0x3a607c(0x509)][_0x3a607c(0x248)](this,_0x256931);},Sprite_Actor[_0x347547(0x387)][_0x347547(0x6e6)]=function(_0x1cdfd7){const _0x36dbb9=_0x347547;let _0x3de6c7=Math[_0x36dbb9(0x22b)](Graphics['width']/0x2+0xc0);_0x3de6c7-=Math[_0x36dbb9(0x231)]((Graphics[_0x36dbb9(0x4da)]-Graphics['boxWidth'])/0x2),_0x3de6c7+=_0x1cdfd7*0x20;let _0x35e966=Graphics['height']-0xc8-$gameParty[_0x36dbb9(0x1ef)]()*0x30;_0x35e966-=Math['floor']((Graphics[_0x36dbb9(0xe4)]-Graphics[_0x36dbb9(0x70c)])/0x2),_0x35e966+=_0x1cdfd7*0x30,this[_0x36dbb9(0x675)](_0x3de6c7,_0x35e966);},Sprite_Actor[_0x347547(0x387)][_0x347547(0x6c8)]=function(){const _0x31d0de=_0x347547;this[_0x31d0de(0x8c2)](0x4b0,0x0,0x78);},Sprite_Animation[_0x347547(0x387)]['setMute']=function(_0x34a8a2){const _0x137b01=_0x347547;this[_0x137b01(0x517)]=_0x34a8a2;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x3f4)]=Sprite_Animation['prototype'][_0x347547(0xf2)],Sprite_Animation[_0x347547(0x387)][_0x347547(0xf2)]=function(){const _0x12fa50=_0x347547;if(this['_muteSound'])return;VisuMZ[_0x12fa50(0x4c0)][_0x12fa50(0x3f4)][_0x12fa50(0x248)](this);},VisuMZ[_0x347547(0x4c0)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x347547(0x387)][_0x347547(0x3cb)],Sprite_Animation['prototype'][_0x347547(0x3cb)]=function(_0x433db3){const _0x321840=_0x347547;this[_0x321840(0x5f9)]()?_0x321840(0x876)===_0x321840(0x24d)?(_0x35ac6a['clear'](),this['onNameOk']()):this[_0x321840(0x1ba)](_0x433db3):VisuMZ[_0x321840(0x4c0)][_0x321840(0x39a)][_0x321840(0x248)](this,_0x433db3);},Sprite_Animation[_0x347547(0x387)][_0x347547(0x5f9)]=function(){const _0x5e1ffb=_0x347547;if(!this[_0x5e1ffb(0x50e)])return![];const _0x5eb282=this[_0x5e1ffb(0x50e)][_0x5e1ffb(0x771)]||'';if(_0x5eb282[_0x5e1ffb(0x249)](/<MIRROR OFFSET X>/i))return!![];if(_0x5eb282[_0x5e1ffb(0x249)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x5e1ffb(0x4c0)][_0x5e1ffb(0x627)]['QoL'][_0x5e1ffb(0x2c4)];},Sprite_Animation['prototype']['setViewportCoreEngineFix']=function(_0x17b710){const _0x363a52=_0x347547,_0x658aa0=this[_0x363a52(0x71f)],_0x2ccf2e=this[_0x363a52(0x71f)],_0x49ab06=this[_0x363a52(0x50e)][_0x363a52(0x132)]*(this[_0x363a52(0x567)]?-0x1:0x1)-_0x658aa0/0x2,_0x401162=this[_0x363a52(0x50e)]['offsetY']-_0x2ccf2e/0x2,_0x502542=this[_0x363a52(0x51c)](_0x17b710);_0x17b710['gl'][_0x363a52(0x4b4)](_0x49ab06+_0x502542['x'],_0x401162+_0x502542['y'],_0x658aa0,_0x2ccf2e);},Sprite_Animation['prototype'][_0x347547(0x3c7)]=function(_0xa6e747){const _0x1d054b=_0x347547;if(_0xa6e747[_0x1d054b(0x41d)]){}const _0x536743=this['_animation'][_0x1d054b(0x771)];let _0x3f1d1d=_0xa6e747[_0x1d054b(0xe4)]*_0xa6e747[_0x1d054b(0x8ad)]['y'],_0x4e3f39=0x0,_0x33ea24=-_0x3f1d1d/0x2;if(_0x536743['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x33ea24=-_0x3f1d1d;if(_0x536743[_0x1d054b(0x249)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x33ea24=0x0;if(this[_0x1d054b(0x50e)][_0x1d054b(0x47c)])_0x33ea24=0x0;if(_0x536743['match'](/<(?:LEFT)>/i))_0x4e3f39=-_0xa6e747[_0x1d054b(0x4da)]/0x2;if(_0x536743[_0x1d054b(0x249)](/<(?:RIGHT)>/i))_0x4e3f39=_0xa6e747[_0x1d054b(0x4da)]/0x2;_0x536743['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x4e3f39=Number(RegExp['$1'])*_0xa6e747[_0x1d054b(0x4da)]);if(_0x536743[_0x1d054b(0x249)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x1d054b(0x702)!==_0x1d054b(0x702))return _0x49a1cd[_0x1d054b(0x649)][_0x1d054b(0x8c0)][_0x1d054b(0x248)](this);else _0x33ea24=(0x1-Number(RegExp['$1']))*-_0x3f1d1d;}_0x536743['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x4e3f39=Number(RegExp['$1'])*_0xa6e747[_0x1d054b(0x4da)],_0x33ea24=(0x1-Number(RegExp['$2']))*-_0x3f1d1d);if(_0x536743[_0x1d054b(0x249)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x4e3f39+=Number(RegExp['$1']);if(_0x536743[_0x1d054b(0x249)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x33ea24+=Number(RegExp['$1']);_0x536743[_0x1d054b(0x249)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x4e3f39+=Number(RegExp['$1']),_0x33ea24+=Number(RegExp['$2']));const _0x69b0bc=new Point(_0x4e3f39,_0x33ea24);return _0xa6e747[_0x1d054b(0x58c)](),_0xa6e747[_0x1d054b(0x35e)]['apply'](_0x69b0bc);},Sprite_AnimationMV[_0x347547(0x387)][_0x347547(0x5d9)]=function(_0x4b711d){const _0x3457a3=_0x347547;this[_0x3457a3(0x517)]=_0x4b711d;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x4ce)]=Sprite_AnimationMV['prototype']['processTimingData'],Sprite_AnimationMV['prototype'][_0x347547(0x3dd)]=function(_0x22227e){const _0x35809d=_0x347547;this['_muteSound']&&(_0x22227e=JsonEx[_0x35809d(0x1af)](_0x22227e),_0x22227e['se']&&(_0x35809d(0x447)!==_0x35809d(0x662)?_0x22227e['se']['volume']=0x0:(this[_0x35809d(0x8d1)]&&this[_0x35809d(0x8d1)]['setBackgroundType'](_0x4c3366[_0x35809d(0x649)]['CommandBgType']),this[_0x35809d(0x38a)]&&this[_0x35809d(0x38a)][_0x35809d(0x599)](_0x4214db[_0x35809d(0x649)][_0x35809d(0x2d3)]),this[_0x35809d(0x11c)]&&this[_0x35809d(0x11c)][_0x35809d(0x599)](_0x860576['layoutSettings'][_0x35809d(0x5ae)])))),VisuMZ[_0x35809d(0x4c0)][_0x35809d(0x4ce)]['call'](this,_0x22227e);},Sprite_Damage[_0x347547(0x387)][_0x347547(0x697)]=function(_0x5776ec){const _0x2231dc=_0x347547;let _0x31d85c=Math[_0x2231dc(0x779)](_0x5776ec)[_0x2231dc(0x5b5)]();if(this[_0x2231dc(0x3cd)]()){if('gDVGy'===_0x2231dc(0x73a)){var _0x4e31d4=_0x2be86d(_0x314393['$1']);_0x5e975e+=_0x4e31d4;}else _0x31d85c=VisuMZ[_0x2231dc(0x230)](_0x31d85c);}const _0x2d8d3b=this['fontSize'](),_0x3cdad9=Math[_0x2231dc(0x231)](_0x2d8d3b*0.75);for(let _0x43a549=0x0;_0x43a549<_0x31d85c[_0x2231dc(0x4e8)];_0x43a549++){if('PcbOM'!==_0x2231dc(0x596)){const _0x334021=this[_0x2231dc(0x3b6)](_0x3cdad9,_0x2d8d3b);_0x334021[_0x2231dc(0x621)][_0x2231dc(0x127)](_0x31d85c[_0x43a549],0x0,0x0,_0x3cdad9,_0x2d8d3b,_0x2231dc(0x208)),_0x334021['x']=(_0x43a549-(_0x31d85c[_0x2231dc(0x4e8)]-0x1)/0x2)*_0x3cdad9,_0x334021['dy']=-_0x43a549;}else{const _0x90d210=_0xc9726c['prototype']['traitObjects'][_0x2231dc(0x248)](this);for(const _0x3e8098 of this[_0x2231dc(0x5ec)]()){_0x3e8098&&_0x90d210['push'](_0x3e8098);}return _0x90d210[_0x2231dc(0x6f8)](this['currentClass'](),this[_0x2231dc(0x524)]()),_0x90d210;}}},Sprite_Damage['prototype'][_0x347547(0x3cd)]=function(){const _0x4fb266=_0x347547;return VisuMZ[_0x4fb266(0x4c0)][_0x4fb266(0x627)][_0x4fb266(0x4e9)][_0x4fb266(0x86b)];},Sprite_Damage['prototype']['valueOutlineColor']=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x7fd)]=Sprite_Gauge[_0x347547(0x387)][_0x347547(0x7e0)],Sprite_Gauge[_0x347547(0x387)]['gaugeRate']=function(){const _0x18a0df=_0x347547;return VisuMZ[_0x18a0df(0x4c0)][_0x18a0df(0x7fd)]['call'](this)[_0x18a0df(0x2a2)](0x0,0x1);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x3b9)]=Sprite_Gauge[_0x347547(0x387)]['currentValue'],Sprite_Gauge[_0x347547(0x387)][_0x347547(0x50d)]=function(){const _0x4ae828=_0x347547;let _0x11e981=VisuMZ['CoreEngine'][_0x4ae828(0x3b9)][_0x4ae828(0x248)](this);return _0x11e981;},Sprite_Gauge[_0x347547(0x387)]['drawValue']=function(){const _0x170dcf=_0x347547;let _0x5446cc=this[_0x170dcf(0x50d)]();this['useDigitGrouping']()&&(_0x5446cc=VisuMZ[_0x170dcf(0x230)](_0x5446cc));const _0x4e220f=this[_0x170dcf(0x1e9)]()-0x1,_0x42bf9b=this['textHeight']?this[_0x170dcf(0x377)]():this[_0x170dcf(0x150)]();this[_0x170dcf(0x494)](),this['bitmap'][_0x170dcf(0x127)](_0x5446cc,0x0,0x0,_0x4e220f,_0x42bf9b,'right');},Sprite_Gauge[_0x347547(0x387)][_0x347547(0x78a)]=function(){return 0x3;},Sprite_Gauge[_0x347547(0x387)][_0x347547(0x3cd)]=function(){const _0x84a020=_0x347547;return VisuMZ['CoreEngine'][_0x84a020(0x627)][_0x84a020(0x4e9)][_0x84a020(0x735)];},Sprite_Gauge[_0x347547(0x387)][_0x347547(0x336)]=function(){const _0x70430e=_0x347547;return ColorManager[_0x70430e(0x87b)]();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x45e)]=Sprite_Picture[_0x347547(0x387)][_0x347547(0x4a2)],Sprite_Picture[_0x347547(0x387)][_0x347547(0x4a2)]=function(){const _0xb5dfa=_0x347547;if(this[_0xb5dfa(0x60f)][_0xb5dfa(0x249)](/VisuMZ CoreEngine PictureIcon (\d+)/i))this[_0xb5dfa(0x38b)](Number(RegExp['$1']));else{if('CWMbw'!==_0xb5dfa(0x480))VisuMZ[_0xb5dfa(0x4c0)][_0xb5dfa(0x45e)][_0xb5dfa(0x248)](this);else{var _0xb3e0b2=_0x6c5872(_0x2733c6['$1']);try{_0x2ef890+=_0x3c035c(_0xb3e0b2);}catch(_0x288b4b){if(_0x4f5d01[_0xb5dfa(0x71c)]())_0x1374e9['log'](_0x288b4b);}}}},Sprite_Picture[_0x347547(0x387)]['loadIconBitmap']=function(_0x2206ab){const _0x500f7c=_0x347547,_0xd8296d=ImageManager[_0x500f7c(0x254)],_0x4a1722=ImageManager[_0x500f7c(0x715)],_0x324ace=this[_0x500f7c(0x60f)][_0x500f7c(0x249)](/SMOOTH/i);this[_0x500f7c(0x621)]=new Bitmap(_0xd8296d,_0x4a1722);const _0x34c24c=ImageManager['loadSystem'](_0x500f7c(0x1d6)),_0xe6f92f=_0x2206ab%0x10*_0xd8296d,_0x41a79c=Math[_0x500f7c(0x231)](_0x2206ab/0x10)*_0x4a1722;this[_0x500f7c(0x621)][_0x500f7c(0x398)]=_0x324ace,this[_0x500f7c(0x621)][_0x500f7c(0x84c)](_0x34c24c,_0xe6f92f,_0x41a79c,_0xd8296d,_0x4a1722,0x0,0x0,_0xd8296d,_0x4a1722);};function Sprite_TitlePictureButton(){const _0xa913a4=_0x347547;this[_0xa913a4(0x6f3)](...arguments);}Sprite_TitlePictureButton[_0x347547(0x387)]=Object[_0x347547(0x30e)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x347547(0x387)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x347547(0x387)]['initialize']=function(_0x181a1c){const _0x20e55a=_0x347547;Sprite_Clickable[_0x20e55a(0x387)][_0x20e55a(0x6f3)]['call'](this),this[_0x20e55a(0x826)]=_0x181a1c,this[_0x20e55a(0x4dc)]=null,this[_0x20e55a(0x35c)]();},Sprite_TitlePictureButton[_0x347547(0x387)][_0x347547(0x35c)]=function(){const _0x3ead64=_0x347547;this['x']=Graphics['width'],this['y']=Graphics[_0x3ead64(0xe4)],this[_0x3ead64(0x3d0)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x347547(0x387)][_0x347547(0x877)]=function(){const _0x18bfdd=_0x347547;this[_0x18bfdd(0x621)]=ImageManager[_0x18bfdd(0x285)](this[_0x18bfdd(0x826)][_0x18bfdd(0x2e4)]),this[_0x18bfdd(0x621)][_0x18bfdd(0x37e)](this[_0x18bfdd(0x408)]['bind'](this));},Sprite_TitlePictureButton[_0x347547(0x387)][_0x347547(0x408)]=function(){const _0x3f5350=_0x347547;this[_0x3f5350(0x826)][_0x3f5350(0x486)][_0x3f5350(0x248)](this),this[_0x3f5350(0x826)][_0x3f5350(0x194)][_0x3f5350(0x248)](this),this[_0x3f5350(0x619)](this[_0x3f5350(0x826)]['CallHandlerJS'][_0x3f5350(0x49c)](this));},Sprite_TitlePictureButton['prototype'][_0x347547(0x864)]=function(){const _0x3f589f=_0x347547;Sprite_Clickable[_0x3f589f(0x387)][_0x3f589f(0x864)][_0x3f589f(0x248)](this),this['updateOpacity'](),this['processTouch']();},Sprite_TitlePictureButton[_0x347547(0x387)][_0x347547(0xf1)]=function(){const _0x322914=_0x347547;return VisuMZ['CoreEngine'][_0x322914(0x627)]['MenuLayout'][_0x322914(0x2a5)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x347547(0x387)][_0x347547(0x39f)]=function(){const _0x24a6be=_0x347547;this[_0x24a6be(0x105)]||this[_0x24a6be(0x85a)]?_0x24a6be(0x487)===_0x24a6be(0x1f0)?this['drawTextEx'](_0x4a6f90[_0x24a6be(0x34a)]()[_0x24a6be(0x771)],_0x5744d4,_0x2b025e,_0x47f49f):this['opacity']=0xff:(this[_0x24a6be(0x238)]+=this[_0x24a6be(0x3d0)]?this[_0x24a6be(0xf1)]():-0x1*this[_0x24a6be(0xf1)](),this[_0x24a6be(0x238)]=Math[_0x24a6be(0x143)](0xc0,this[_0x24a6be(0x238)]));},Sprite_TitlePictureButton[_0x347547(0x387)]['setClickHandler']=function(_0x28f7ce){const _0x159fc5=_0x347547;this[_0x159fc5(0x4dc)]=_0x28f7ce;},Sprite_TitlePictureButton[_0x347547(0x387)][_0x347547(0x717)]=function(){const _0x514efe=_0x347547;this[_0x514efe(0x4dc)]&&this[_0x514efe(0x4dc)]();},VisuMZ[_0x347547(0x4c0)][_0x347547(0x2e7)]=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x347547(0x387)][_0x347547(0x6f3)]=function(){const _0x1a6d77=_0x347547;VisuMZ[_0x1a6d77(0x4c0)][_0x1a6d77(0x2e7)]['call'](this),this[_0x1a6d77(0x50a)]();},Spriteset_Base[_0x347547(0x387)][_0x347547(0x50a)]=function(){const _0x2d47bb=_0x347547;this[_0x2d47bb(0x351)]=[],this[_0x2d47bb(0x1ec)]=[],this[_0x2d47bb(0x484)]=this[_0x2d47bb(0x8ad)]['x'],this['_cacheScaleY']=this['scale']['y'];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x13f)]=Spriteset_Base[_0x347547(0x387)][_0x347547(0x264)],Spriteset_Base[_0x347547(0x387)][_0x347547(0x264)]=function(_0x251ac4){const _0x271130=_0x347547;this[_0x271130(0x464)](),this[_0x271130(0x70e)](),VisuMZ[_0x271130(0x4c0)]['Spriteset_Base_destroy'][_0x271130(0x248)](this,_0x251ac4);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x5e1)]=Spriteset_Base[_0x347547(0x387)][_0x347547(0x864)],Spriteset_Base[_0x347547(0x387)][_0x347547(0x864)]=function(){const _0x1a1a80=_0x347547;VisuMZ[_0x1a1a80(0x4c0)]['Spriteset_Base_update'][_0x1a1a80(0x248)](this),this[_0x1a1a80(0x72f)](),this['updateFauxAnimations'](),this[_0x1a1a80(0x807)]();},Spriteset_Base['prototype'][_0x347547(0x72f)]=function(){const _0x57bc2b=_0x347547;if(!VisuMZ[_0x57bc2b(0x4c0)]['Settings'][_0x57bc2b(0x4e9)][_0x57bc2b(0x29b)])return;if(this['_cacheScaleX']===this[_0x57bc2b(0x8ad)]['x']&&this[_0x57bc2b(0x67a)]===this[_0x57bc2b(0x8ad)]['y'])return;this[_0x57bc2b(0x48f)](),this['_cacheScaleX']=this['scale']['x'],this[_0x57bc2b(0x67a)]=this['scale']['y'];},Spriteset_Base['prototype'][_0x347547(0x48f)]=function(){const _0x1a2da7=_0x347547;this['scale']['x']!==0x0&&(this[_0x1a2da7(0x5c8)]['scale']['x']=0x1/this['scale']['x'],this[_0x1a2da7(0x5c8)]['x']=-(this['x']/this[_0x1a2da7(0x8ad)]['x'])),this[_0x1a2da7(0x8ad)]['y']!==0x0&&(this['_pictureContainer'][_0x1a2da7(0x8ad)]['y']=0x1/this[_0x1a2da7(0x8ad)]['y'],this[_0x1a2da7(0x5c8)]['y']=-(this['y']/this[_0x1a2da7(0x8ad)]['y']));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x5bc)]=Spriteset_Base[_0x347547(0x387)][_0x347547(0x512)],Spriteset_Base[_0x347547(0x387)][_0x347547(0x512)]=function(){const _0x4872f1=_0x347547;VisuMZ[_0x4872f1(0x4c0)]['Spriteset_Base_updatePosition']['call'](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x347547(0x387)][_0x347547(0x18e)]=function(){const _0xef1fa0=_0x347547;if(!$gameScreen)return;if($gameScreen[_0xef1fa0(0x5f3)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0xef1fa0(0x283)]());const _0x236fa6=$gameScreen[_0xef1fa0(0x7db)]();switch($gameScreen[_0xef1fa0(0x7db)]()){case _0xef1fa0(0x880):this[_0xef1fa0(0x444)]();break;case _0xef1fa0(0x1ad):this['updatePositionCoreEngineShakeHorz']();break;case _0xef1fa0(0x7c8):this[_0xef1fa0(0x1e5)]();break;default:this[_0xef1fa0(0x338)]();break;}},Spriteset_Base[_0x347547(0x387)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x13dd43=_0x347547,_0x561ecc=VisuMZ['CoreEngine'][_0x13dd43(0x627)][_0x13dd43(0x5a7)];if(_0x561ecc&&_0x561ecc[_0x13dd43(0x84f)])return _0x561ecc[_0x13dd43(0x84f)][_0x13dd43(0x248)](this);this['x']+=Math['round']($gameScreen[_0x13dd43(0x283)]());},Spriteset_Base[_0x347547(0x387)][_0x347547(0x338)]=function(){const _0x5b729e=_0x347547,_0xb3f02b=VisuMZ['CoreEngine'][_0x5b729e(0x627)]['ScreenShake'];if(_0xb3f02b&&_0xb3f02b[_0x5b729e(0x613)]){if(_0x5b729e(0x80a)!==_0x5b729e(0x80a)){if(_0x2b7a29)_0x4b14fc['ParseItemNotetags'](_0x4293d1);}else return _0xb3f02b[_0x5b729e(0x613)][_0x5b729e(0x248)](this);}const _0x1cdf82=$gameScreen['_shakePower']*0.75,_0x3baae0=$gameScreen[_0x5b729e(0x6bc)]*0.6,_0x32c5fd=$gameScreen[_0x5b729e(0x5f3)];this['x']+=Math[_0x5b729e(0x22b)](Math[_0x5b729e(0x7fc)](_0x1cdf82)-Math[_0x5b729e(0x7fc)](_0x3baae0))*(Math[_0x5b729e(0x143)](_0x32c5fd,0x1e)*0.5),this['y']+=Math['round'](Math['randomInt'](_0x1cdf82)-Math[_0x5b729e(0x7fc)](_0x3baae0))*(Math[_0x5b729e(0x143)](_0x32c5fd,0x1e)*0.5);},Spriteset_Base['prototype'][_0x347547(0x4d2)]=function(){const _0x318c0b=_0x347547,_0x272b94=VisuMZ[_0x318c0b(0x4c0)][_0x318c0b(0x627)][_0x318c0b(0x5a7)];if(_0x272b94&&_0x272b94[_0x318c0b(0x8da)]){if('aWqyJ'===_0x318c0b(0x3ed))return _0x272b94['horzJS'][_0x318c0b(0x248)](this);else this[_0x318c0b(0x238)]+=this['visible']?this[_0x318c0b(0xf1)]():-0x1*this[_0x318c0b(0xf1)](),this['opacity']=_0x5af29c[_0x318c0b(0x143)](0xc0,this['opacity']);}const _0x348c3a=$gameScreen[_0x318c0b(0x152)]*0.75,_0x54f8ac=$gameScreen[_0x318c0b(0x6bc)]*0.6,_0x53a652=$gameScreen[_0x318c0b(0x5f3)];this['x']+=Math['round'](Math['randomInt'](_0x348c3a)-Math[_0x318c0b(0x7fc)](_0x54f8ac))*(Math[_0x318c0b(0x143)](_0x53a652,0x1e)*0.5);},Spriteset_Base[_0x347547(0x387)]['updatePositionCoreEngineShakeVert']=function(){const _0x278bf7=_0x347547,_0x5bb95c=VisuMZ[_0x278bf7(0x4c0)][_0x278bf7(0x627)][_0x278bf7(0x5a7)];if(_0x5bb95c&&_0x5bb95c['vertJS']){if(_0x278bf7(0x4a4)!=='jSBrr')return _0x5bb95c['vertJS'][_0x278bf7(0x248)](this);else(_0x21343f<_0x2889f0-_0x5b4703||_0x3a5cdb&&_0x3668a9===0x1)&&this[_0x278bf7(0x17e)]((_0x291443+_0x571efc)%_0x2226e3);}const _0x151940=$gameScreen[_0x278bf7(0x152)]*0.75,_0x319e3b=$gameScreen[_0x278bf7(0x6bc)]*0.6,_0x40ffcc=$gameScreen['_shakeDuration'];this['y']+=Math[_0x278bf7(0x22b)](Math[_0x278bf7(0x7fc)](_0x151940)-Math[_0x278bf7(0x7fc)](_0x319e3b))*(Math[_0x278bf7(0x143)](_0x40ffcc,0x1e)*0.5);},Spriteset_Base[_0x347547(0x387)][_0x347547(0x16a)]=function(){const _0x47daff=_0x347547;for(const _0x1e2434 of this['_fauxAnimationSprites']){_0x47daff(0x315)===_0x47daff(0x315)?!_0x1e2434[_0x47daff(0x17f)]()&&this[_0x47daff(0x4b3)](_0x1e2434):this[_0x47daff(0x28b)]=[];}this['processFauxAnimationRequests']();},Spriteset_Base['prototype'][_0x347547(0x268)]=function(){const _0xe77f89=_0x347547;for(;;){const _0x2c6b75=$gameTemp[_0xe77f89(0x5e5)]();if(_0x2c6b75)'xHCHU'!==_0xe77f89(0x33a)?_0x2c6937['endAnimation']&&_0x1b33ba['endAnimation']():this[_0xe77f89(0x70f)](_0x2c6b75);else break;}},Spriteset_Base[_0x347547(0x387)]['createFauxAnimation']=function(_0x820e89){const _0x1ef9a5=_0x347547,_0x21cdb0=$dataAnimations[_0x820e89['animationId']],_0x360ebc=_0x820e89[_0x1ef9a5(0x6f4)],_0x165905=_0x820e89['mirror'],_0x26f005=_0x820e89[_0x1ef9a5(0x58a)];let _0x1192d4=this[_0x1ef9a5(0x34d)]();const _0x29024b=this['animationNextDelay']();if(this[_0x1ef9a5(0x391)](_0x21cdb0))for(const _0x100cc4 of _0x360ebc){if(_0x1ef9a5(0x690)===_0x1ef9a5(0x357))return this;else this[_0x1ef9a5(0x8ac)]([_0x100cc4],_0x21cdb0,_0x165905,_0x1192d4,_0x26f005),_0x1192d4+=_0x29024b;}else this[_0x1ef9a5(0x8ac)](_0x360ebc,_0x21cdb0,_0x165905,_0x1192d4,_0x26f005);},Spriteset_Base[_0x347547(0x387)][_0x347547(0x8ac)]=function(_0x3152d7,_0x20d5fd,_0x2faff7,_0x4b4289,_0x38a416){const _0x44ad4e=_0x347547,_0x4ba0e6=this['isMVAnimation'](_0x20d5fd),_0x45610d=new(_0x4ba0e6?Sprite_AnimationMV:Sprite_Animation)(),_0xc5c0ec=this[_0x44ad4e(0x89a)](_0x3152d7);this[_0x44ad4e(0x293)](_0x3152d7[0x0])&&(_0x2faff7=!_0x2faff7),_0x45610d[_0x44ad4e(0x78b)]=_0x3152d7,_0x45610d[_0x44ad4e(0x35c)](_0xc5c0ec,_0x20d5fd,_0x2faff7,_0x4b4289),_0x45610d[_0x44ad4e(0x5d9)](_0x38a416),this[_0x44ad4e(0x89d)][_0x44ad4e(0x6cf)](_0x45610d),this[_0x44ad4e(0x351)][_0x44ad4e(0x6f8)](_0x45610d);},Spriteset_Base[_0x347547(0x387)]['removeFauxAnimation']=function(_0x3c64ea){const _0xb251d7=_0x347547;this['_fauxAnimationSprites'][_0xb251d7(0x841)](_0x3c64ea),this[_0xb251d7(0x89d)][_0xb251d7(0x5c4)](_0x3c64ea);for(const _0x24f7c8 of _0x3c64ea[_0xb251d7(0x78b)]){_0x24f7c8[_0xb251d7(0x634)]&&_0x24f7c8[_0xb251d7(0x634)]();}_0x3c64ea[_0xb251d7(0x264)]();},Spriteset_Base[_0x347547(0x387)][_0x347547(0x464)]=function(){const _0x416c1a=_0x347547;for(const _0xe855a5 of this[_0x416c1a(0x351)]){if(_0x416c1a(0x83c)!==_0x416c1a(0x6eb))this[_0x416c1a(0x4b3)](_0xe855a5);else return-0.5*(_0x110411[_0x416c1a(0x1cf)](0x1-_0x5e852e*_0x5753c3)-0x1);}},Spriteset_Base[_0x347547(0x387)]['isFauxAnimationPlaying']=function(){const _0x485e40=_0x347547;return this[_0x485e40(0x351)][_0x485e40(0x4e8)]>0x0;},Spriteset_Base['prototype'][_0x347547(0x807)]=function(){const _0x3da4d2=_0x347547;for(const _0x139aeb of this[_0x3da4d2(0x1ec)]){!_0x139aeb[_0x3da4d2(0x17f)]()&&this[_0x3da4d2(0x5b7)](_0x139aeb);}this[_0x3da4d2(0xdd)]();},Spriteset_Base[_0x347547(0x387)][_0x347547(0xdd)]=function(){const _0x4bf352=_0x347547;for(;;){const _0x709c2e=$gameTemp[_0x4bf352(0x311)]();if(_0x709c2e)this[_0x4bf352(0x79a)](_0x709c2e);else{if(_0x4bf352(0x71a)==='LVWoN')break;else{this[_0x4bf352(0xf3)]();const _0x356da0=this[_0x4bf352(0x14e)];_0x4b431b[_0x4bf352(0x4c0)][_0x4bf352(0x216)][_0x4bf352(0x248)](this),_0x356da0>0x0&&this[_0x4bf352(0x14e)]<=0x0&&(this['_x']=this[_0x4bf352(0x635)],this['_y']=this[_0x4bf352(0x5c9)],this['_scaleX']=this[_0x4bf352(0x7b0)],this[_0x4bf352(0x862)]=this[_0x4bf352(0x5ed)],this[_0x4bf352(0x6cd)]=this['_targetOpacity'],this[_0x4bf352(0x4ab)]&&(this[_0x4bf352(0x4ab)]['x']=this[_0x4bf352(0x55a)]['x'],this[_0x4bf352(0x4ab)]['y']=this[_0x4bf352(0x55a)]['y']));}}}},Spriteset_Base['prototype']['createPointAnimation']=function(_0x127110){const _0x2e5c13=_0x347547,_0x3a2a14=$dataAnimations[_0x127110[_0x2e5c13(0x176)]],_0x28d107=this[_0x2e5c13(0x2b2)](_0x127110),_0x4fddff=_0x127110['mirror'],_0x7b804f=_0x127110[_0x2e5c13(0x58a)];let _0x38f74c=this[_0x2e5c13(0x34d)]();const _0xc735af=this[_0x2e5c13(0x63b)]();if(this[_0x2e5c13(0x391)](_0x3a2a14))for(const _0x3fd8e2 of _0x28d107){this[_0x2e5c13(0x481)]([_0x3fd8e2],_0x3a2a14,_0x4fddff,_0x38f74c,_0x7b804f),_0x38f74c+=_0xc735af;}else this['createPointAnimationSprite'](_0x28d107,_0x3a2a14,_0x4fddff,_0x38f74c,_0x7b804f);},Spriteset_Base[_0x347547(0x387)][_0x347547(0x2b2)]=function(_0x4abbbd){const _0x19f355=_0x347547,_0x5cf733=new Sprite_Clickable();_0x5cf733['x']=_0x4abbbd['x'],_0x5cf733['y']=_0x4abbbd['y'],_0x5cf733['z']=0x64;const _0x3854a7=this[_0x19f355(0x3a7)]();return _0x3854a7[_0x19f355(0x6cf)](_0x5cf733),[_0x5cf733];},Spriteset_Base['prototype'][_0x347547(0x3a7)]=function(){return this;},Spriteset_Map[_0x347547(0x387)][_0x347547(0x3a7)]=function(){const _0x5f4a2a=_0x347547;return this[_0x5f4a2a(0x6c0)]||this;},Spriteset_Battle[_0x347547(0x387)][_0x347547(0x3a7)]=function(){return this['_battleField']||this;},Spriteset_Base[_0x347547(0x387)][_0x347547(0x481)]=function(_0x531842,_0x45444f,_0x18bccc,_0x5bce98,_0x231e2f){const _0x394457=_0x347547,_0x1990cf=this[_0x394457(0xc4)](_0x45444f),_0x232390=new(_0x1990cf?Sprite_AnimationMV:Sprite_Animation)();_0x232390[_0x394457(0x78b)]=_0x531842,_0x232390[_0x394457(0x35c)](_0x531842,_0x45444f,_0x18bccc,_0x5bce98),_0x232390[_0x394457(0x5d9)](_0x231e2f),this['_effectsContainer']['addChild'](_0x232390),this['_pointAnimationSprites'][_0x394457(0x6f8)](_0x232390);},Spriteset_Base[_0x347547(0x387)][_0x347547(0x5b7)]=function(_0x377c0e){const _0x25741e=_0x347547;this[_0x25741e(0x1ec)]['remove'](_0x377c0e),this[_0x25741e(0x89d)]['removeChild'](_0x377c0e);for(const _0x4328db of _0x377c0e[_0x25741e(0x78b)]){if(_0x25741e(0x236)!=='olcVI')this[_0x25741e(0x621)]=_0x135848[_0x25741e(0x285)](this[_0x25741e(0x826)]['PictureFilename']),this[_0x25741e(0x621)][_0x25741e(0x37e)](this[_0x25741e(0x408)][_0x25741e(0x49c)](this));else{if(_0x4328db['endAnimation']){if(_0x25741e(0x30a)==='EZICm')_0x4328db['endAnimation']();else{if(!this[_0x25741e(0x244)]())return;_0x2e1f8b=_0x4bf2ec||![],_0x24e61d=_0x27a5f6||![];if(_0x218349[_0xbf1b40]){const _0x4cbb2a={'targets':_0x4d7ab7,'animationId':_0x474dcd,'mirror':_0x220c46,'mute':_0x2b5579};this['_fauxAnimationQueue']['push'](_0x4cbb2a);for(const _0x276fe3 of _0x382511){_0x276fe3[_0x25741e(0xe8)]&&_0x276fe3[_0x25741e(0xe8)]();}}}}const _0x42f47f=this[_0x25741e(0x3a7)]();if(_0x42f47f)_0x42f47f[_0x25741e(0x5c4)](_0x4328db);}}_0x377c0e[_0x25741e(0x264)]();},Spriteset_Base[_0x347547(0x387)]['removeAllPointAnimations']=function(){const _0x4f04bd=_0x347547;for(const _0x1a29f6 of this[_0x4f04bd(0x1ec)]){this['removePointAnimation'](_0x1a29f6);}},Spriteset_Base[_0x347547(0x387)][_0x347547(0x59e)]=function(){const _0x246114=_0x347547;return this['_pointAnimationSprites'][_0x246114(0x4e8)]>0x0;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x259)]=Spriteset_Base[_0x347547(0x387)][_0x347547(0x2cb)],Spriteset_Base[_0x347547(0x387)][_0x347547(0x2cb)]=function(){const _0x1b089c=_0x347547;return VisuMZ[_0x1b089c(0x4c0)][_0x1b089c(0x259)][_0x1b089c(0x248)](this)||this[_0x1b089c(0x59e)]();},Spriteset_Battle[_0x347547(0x387)][_0x347547(0x32b)]=function(){const _0xd4dd00=_0x347547;this['_backgroundFilter']=new PIXI[(_0xd4dd00(0x223))][(_0xd4dd00(0x4c3))](clamp=!![]),this[_0xd4dd00(0x511)]=new Sprite(),this[_0xd4dd00(0x511)][_0xd4dd00(0x621)]=SceneManager[_0xd4dd00(0x705)](),this['_backgroundSprite'][_0xd4dd00(0x223)]=[this[_0xd4dd00(0x332)]],this[_0xd4dd00(0x68b)][_0xd4dd00(0x6cf)](this[_0xd4dd00(0x511)]);},VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x347547(0x387)]['createEnemies'],Spriteset_Battle['prototype'][_0x347547(0x3da)]=function(){const _0x5ea9b3=_0x347547;this[_0x5ea9b3(0xca)]()&&this['repositionEnemiesByResolution'](),VisuMZ[_0x5ea9b3(0x4c0)][_0x5ea9b3(0x119)][_0x5ea9b3(0x248)](this);},Spriteset_Battle['prototype'][_0x347547(0xca)]=function(){const _0x35a2fd=_0x347547,_0x234828=VisuMZ[_0x35a2fd(0x4c0)][_0x35a2fd(0x627)]['ScreenResolution'];if(!_0x234828)return![];if(Utils['RPGMAKER_VERSION']>=_0x35a2fd(0x8b6)&&!_0x234828['RepositionEnemies130'])return![];return _0x234828[_0x35a2fd(0x8c8)];},Spriteset_Battle[_0x347547(0x387)][_0x347547(0x308)]=function(){const _0x4ff9ae=_0x347547;for(member of $gameTroop['members']()){member[_0x4ff9ae(0x62b)]();}},VisuMZ['CoreEngine'][_0x347547(0x134)]=Window_Base['prototype'][_0x347547(0x6f3)],Window_Base[_0x347547(0x387)][_0x347547(0x6f3)]=function(_0x2d6561){const _0xb92dc9=_0x347547;_0x2d6561['x']=Math['round'](_0x2d6561['x']),_0x2d6561['y']=Math[_0xb92dc9(0x22b)](_0x2d6561['y']),_0x2d6561[_0xb92dc9(0x4da)]=Math[_0xb92dc9(0x22b)](_0x2d6561[_0xb92dc9(0x4da)]),_0x2d6561[_0xb92dc9(0xe4)]=Math[_0xb92dc9(0x22b)](_0x2d6561[_0xb92dc9(0xe4)]),this[_0xb92dc9(0x2d4)](),VisuMZ[_0xb92dc9(0x4c0)][_0xb92dc9(0x134)][_0xb92dc9(0x248)](this,_0x2d6561),this[_0xb92dc9(0x7d2)]();},Window_Base[_0x347547(0x387)][_0x347547(0x2d4)]=function(){const _0x12b880=_0x347547;this[_0x12b880(0x8b2)]=VisuMZ[_0x12b880(0x4c0)]['Settings'][_0x12b880(0x4e9)][_0x12b880(0x3e0)],this[_0x12b880(0x495)]=VisuMZ['CoreEngine'][_0x12b880(0x627)][_0x12b880(0x4e9)][_0x12b880(0x3bb)];},Window_Base[_0x347547(0x387)][_0x347547(0x3a9)]=function(){const _0x9e3e53=_0x347547;return VisuMZ[_0x9e3e53(0x4c0)]['Settings'][_0x9e3e53(0x4ed)][_0x9e3e53(0x162)];},Window_Base['prototype'][_0x347547(0x61b)]=function(){const _0x1039ea=_0x347547;return VisuMZ[_0x1039ea(0x4c0)][_0x1039ea(0x627)]['Window']['ItemPadding'];},Window_Base[_0x347547(0x387)][_0x347547(0x816)]=function(){const _0x58b0b7=_0x347547;$gameSystem[_0x58b0b7(0x144)]?this[_0x58b0b7(0x265)]=$gameSystem[_0x58b0b7(0x144)]():this['backOpacity']=VisuMZ[_0x58b0b7(0x4c0)]['Settings'][_0x58b0b7(0x4ed)][_0x58b0b7(0x67f)];},Window_Base['prototype'][_0x347547(0x440)]=function(){const _0x184624=_0x347547;return VisuMZ['CoreEngine'][_0x184624(0x627)]['Window'][_0x184624(0x282)];},Window_Base['prototype'][_0x347547(0x581)]=function(){const _0x372955=_0x347547;return VisuMZ[_0x372955(0x4c0)][_0x372955(0x627)][_0x372955(0x4ed)][_0x372955(0x117)];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x370)]=Window_Base[_0x347547(0x387)][_0x347547(0x864)],Window_Base[_0x347547(0x387)][_0x347547(0x864)]=function(){const _0x11453d=_0x347547;VisuMZ[_0x11453d(0x4c0)][_0x11453d(0x370)]['call'](this),this['updateCoreEasing']();},Window_Base['prototype'][_0x347547(0x226)]=function(){const _0x2728af=_0x347547;if(this[_0x2728af(0x603)]){if('FuuAa'==='oZAKD'){if(_0x997e1d[_0x2728af(0x531)][_0x2728af(0x248)](this)){const _0x467196=_0x236b21[_0x2728af(0x316)];let _0x4ec6e6=_0x3480cf[_0x2728af(0x704)];if(['',_0x2728af(0x3a1)][_0x2728af(0x4aa)](_0x4ec6e6))_0x4ec6e6=_0x1b3894['TextJS'][_0x2728af(0x248)](this);const _0x50bfe4=_0x178898['EnableJS'][_0x2728af(0x248)](this),_0x17b4f1=_0x4d903a['ExtJS'][_0x2728af(0x248)](this);this[_0x2728af(0x8d6)](_0x4ec6e6,_0x467196,_0x50bfe4,_0x17b4f1),this[_0x2728af(0x66a)](_0x467196,_0xe351e3[_0x2728af(0x655)]['bind'](this,_0x17b4f1));}}else this['openness']+=this[_0x2728af(0x581)](),this['isOpen']()&&(this[_0x2728af(0x603)]=![]);}},Window_Base[_0x347547(0x387)][_0x347547(0x2cf)]=function(){const _0x576b01=_0x347547;if(this[_0x576b01(0x63a)]){if('JmIkd'!==_0x576b01(0x3a8)){var _0x2044a0=_0x40d61a(_0xb0a56f['$1']);_0x3e105e*=_0x2044a0;}else this[_0x576b01(0x36f)]-=this[_0x576b01(0x581)](),this[_0x576b01(0x641)]()&&(this[_0x576b01(0x63a)]=![]);}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x76c)]=Window_Base[_0x347547(0x387)][_0x347547(0x127)],Window_Base[_0x347547(0x387)][_0x347547(0x127)]=function(_0x1d6fb3,_0x1b1555,_0x12963e,_0x427114,_0x45ae36){const _0x155b4e=_0x347547;if(this[_0x155b4e(0x3cd)]())_0x1d6fb3=VisuMZ['GroupDigits'](_0x1d6fb3);VisuMZ[_0x155b4e(0x4c0)][_0x155b4e(0x76c)][_0x155b4e(0x248)](this,_0x1d6fb3,_0x1b1555,_0x12963e,_0x427114,_0x45ae36);},Window_Base[_0x347547(0x387)][_0x347547(0x3cd)]=function(){const _0x295663=_0x347547;return this[_0x295663(0x8b2)];},VisuMZ['CoreEngine'][_0x347547(0x7ad)]=Window_Base[_0x347547(0x387)][_0x347547(0x24f)],Window_Base[_0x347547(0x387)][_0x347547(0x24f)]=function(_0xfe6912,_0x1c0f95,_0x3056cc,_0x1ae0f7){const _0x30c33a=_0x347547;var _0x5ebfcf=VisuMZ[_0x30c33a(0x4c0)]['Window_Base_createTextState'][_0x30c33a(0x248)](this,_0xfe6912,_0x1c0f95,_0x3056cc,_0x1ae0f7);if(this[_0x30c33a(0x520)]())_0x5ebfcf[_0x30c33a(0x4f7)]=VisuMZ[_0x30c33a(0x230)](_0x5ebfcf[_0x30c33a(0x4f7)]);return _0x5ebfcf;},Window_Base[_0x347547(0x387)][_0x347547(0x520)]=function(){const _0x276cdb=_0x347547;return this[_0x276cdb(0x495)];},Window_Base[_0x347547(0x387)]['enableDigitGrouping']=function(_0x5c15d7){const _0x415f58=_0x347547;this[_0x415f58(0x8b2)]=_0x5c15d7;},Window_Base[_0x347547(0x387)][_0x347547(0x1c3)]=function(_0x36a578){const _0x1b64a6=_0x347547;this[_0x1b64a6(0x495)]=_0x36a578;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x890)]=Window_Base[_0x347547(0x387)]['drawIcon'],Window_Base[_0x347547(0x387)][_0x347547(0x688)]=function(_0x1f112d,_0x1ef0ad,_0x905879){const _0x4bea25=_0x347547;_0x1ef0ad=Math[_0x4bea25(0x22b)](_0x1ef0ad),_0x905879=Math[_0x4bea25(0x22b)](_0x905879),VisuMZ['CoreEngine'][_0x4bea25(0x890)]['call'](this,_0x1f112d,_0x1ef0ad,_0x905879);},VisuMZ[_0x347547(0x4c0)]['Window_Base_drawFace']=Window_Base[_0x347547(0x387)]['drawFace'],Window_Base['prototype'][_0x347547(0x611)]=function(_0x33f86e,_0x5c37db,_0x466cac,_0x38b118,_0x4b7447,_0x5a0cb4){const _0x5844cf=_0x347547;_0x4b7447=_0x4b7447||ImageManager[_0x5844cf(0x2ad)],_0x5a0cb4=_0x5a0cb4||ImageManager[_0x5844cf(0x604)],_0x466cac=Math['round'](_0x466cac),_0x38b118=Math[_0x5844cf(0x22b)](_0x38b118),_0x4b7447=Math[_0x5844cf(0x22b)](_0x4b7447),_0x5a0cb4=Math[_0x5844cf(0x22b)](_0x5a0cb4),VisuMZ[_0x5844cf(0x4c0)]['Window_Base_drawFace']['call'](this,_0x33f86e,_0x5c37db,_0x466cac,_0x38b118,_0x4b7447,_0x5a0cb4);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x85e)]=Window_Base[_0x347547(0x387)][_0x347547(0x685)],Window_Base[_0x347547(0x387)][_0x347547(0x685)]=function(_0x582514,_0x15aaec,_0x434d91,_0x28e862){const _0x3f2115=_0x347547;_0x434d91=Math[_0x3f2115(0x22b)](_0x434d91),_0x28e862=Math['round'](_0x28e862),VisuMZ['CoreEngine'][_0x3f2115(0x85e)][_0x3f2115(0x248)](this,_0x582514,_0x15aaec,_0x434d91,_0x28e862);},VisuMZ[_0x347547(0x4c0)]['Window_Selectable_itemRect']=Window_Selectable[_0x347547(0x387)]['itemRect'],Window_Selectable[_0x347547(0x387)][_0x347547(0xd4)]=function(_0x527322){const _0x5448f7=_0x347547;let _0x310471=VisuMZ[_0x5448f7(0x4c0)][_0x5448f7(0x13b)]['call'](this,_0x527322);return _0x310471['x']=Math['round'](_0x310471['x']),_0x310471['y']=Math[_0x5448f7(0x22b)](_0x310471['y']),_0x310471[_0x5448f7(0x4da)]=Math[_0x5448f7(0x22b)](_0x310471[_0x5448f7(0x4da)]),_0x310471[_0x5448f7(0xe4)]=Math[_0x5448f7(0x22b)](_0x310471[_0x5448f7(0xe4)]),_0x310471;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x859)]=Window_StatusBase[_0x347547(0x387)]['drawActorSimpleStatus'],Window_StatusBase['prototype'][_0x347547(0x354)]=function(_0x3b8762,_0x2dfe00,_0x5ce51d){const _0x6d5283=_0x347547;_0x2dfe00=Math[_0x6d5283(0x22b)](_0x2dfe00),_0x5ce51d=Math[_0x6d5283(0x22b)](_0x5ce51d),VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus']['call'](this,_0x3b8762,_0x2dfe00,_0x5ce51d);},Window_Base[_0x347547(0x387)][_0x347547(0x7d2)]=function(){const _0x4dba52=_0x347547;this[_0x4dba52(0x3a2)]={'duration':0x0,'wholeDuration':0x0,'type':_0x4dba52(0x7c7),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x4dba52(0x8ad)]['x'],'targetScaleY':this[_0x4dba52(0x8ad)]['y'],'targetOpacity':this[_0x4dba52(0x238)],'targetBackOpacity':this[_0x4dba52(0x265)],'targetContentsOpacity':this[_0x4dba52(0x2a3)]};},Window_Base[_0x347547(0x387)]['updateCoreEasing']=function(){const _0x1cac53=_0x347547;if(!this[_0x1cac53(0x3a2)])return;if(this[_0x1cac53(0x3a2)]['duration']<=0x0)return;this['x']=this[_0x1cac53(0x6fa)](this['x'],this[_0x1cac53(0x3a2)][_0x1cac53(0x1d7)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x1cac53(0x3a2)][_0x1cac53(0x645)]),this[_0x1cac53(0x8ad)]['x']=this[_0x1cac53(0x6fa)](this['scale']['x'],this[_0x1cac53(0x3a2)]['targetScaleX']),this['scale']['y']=this[_0x1cac53(0x6fa)](this[_0x1cac53(0x8ad)]['y'],this[_0x1cac53(0x3a2)][_0x1cac53(0x4d6)]),this[_0x1cac53(0x238)]=this[_0x1cac53(0x6fa)](this['opacity'],this['_coreEasing'][_0x1cac53(0x1cd)]),this[_0x1cac53(0x265)]=this['applyCoreEasing'](this[_0x1cac53(0x265)],this[_0x1cac53(0x3a2)]['targetBackOpacity']),this['contentsOpacity']=this[_0x1cac53(0x6fa)](this[_0x1cac53(0x2a3)],this[_0x1cac53(0x3a2)][_0x1cac53(0x536)]),this['_coreEasing'][_0x1cac53(0x68a)]--;},Window_Base['prototype'][_0x347547(0x6fa)]=function(_0x9aa137,_0x2ee82){const _0x4625b4=_0x347547;if(!this[_0x4625b4(0x3a2)])return _0x2ee82;const _0x2de999=this[_0x4625b4(0x3a2)][_0x4625b4(0x68a)],_0x4ce89b=this['_coreEasing']['wholeDuration'],_0x389d4f=this['calcCoreEasing']((_0x4ce89b-_0x2de999)/_0x4ce89b),_0x509388=this[_0x4625b4(0x8c4)]((_0x4ce89b-_0x2de999+0x1)/_0x4ce89b),_0x2613a8=(_0x9aa137-_0x2ee82*_0x389d4f)/(0x1-_0x389d4f);return _0x2613a8+(_0x2ee82-_0x2613a8)*_0x509388;},Window_Base[_0x347547(0x387)][_0x347547(0x8c4)]=function(_0x2739cf){const _0x127030=_0x347547;if(!this[_0x127030(0x3a2)])return _0x2739cf;return VisuMZ[_0x127030(0x24e)](_0x2739cf,this[_0x127030(0x3a2)][_0x127030(0x6fd)]||_0x127030(0x7c7));},Window_Base[_0x347547(0x387)][_0x347547(0x5d6)]=function(_0x399d46,_0x12c186){const _0x3433c0=_0x347547;if(!this[_0x3433c0(0x3a2)])return;this['x']=this[_0x3433c0(0x3a2)]['targetX'],this['y']=this[_0x3433c0(0x3a2)][_0x3433c0(0x645)],this[_0x3433c0(0x8ad)]['x']=this[_0x3433c0(0x3a2)][_0x3433c0(0x6db)],this[_0x3433c0(0x8ad)]['y']=this[_0x3433c0(0x3a2)][_0x3433c0(0x4d6)],this[_0x3433c0(0x238)]=this[_0x3433c0(0x3a2)][_0x3433c0(0x1cd)],this[_0x3433c0(0x265)]=this[_0x3433c0(0x3a2)][_0x3433c0(0x53f)],this['contentsOpacity']=this[_0x3433c0(0x3a2)][_0x3433c0(0x536)],this[_0x3433c0(0x270)](_0x399d46,_0x12c186,this['x'],this['y'],this[_0x3433c0(0x8ad)]['x'],this['scale']['y'],this['opacity'],this[_0x3433c0(0x265)],this[_0x3433c0(0x2a3)]);},Window_Base['prototype']['setupCoreEasing']=function(_0x377ee4,_0x5a52d6,_0x5f49cb,_0x4955d2,_0x44f309,_0xebc619,_0x2067f1,_0x150393,_0x495155){const _0x596c80=_0x347547;this[_0x596c80(0x3a2)]={'duration':_0x377ee4,'wholeDuration':_0x377ee4,'type':_0x5a52d6,'targetX':_0x5f49cb,'targetY':_0x4955d2,'targetScaleX':_0x44f309,'targetScaleY':_0xebc619,'targetOpacity':_0x2067f1,'targetBackOpacity':_0x150393,'targetContentsOpacity':_0x495155};},Window_Base[_0x347547(0x387)]['drawCurrencyValue']=function(_0x13ccc5,_0x237e2f,_0x1df79b,_0x1f5bd8,_0x232b9d){const _0x3192d4=_0x347547;this['resetFontSettings'](),this[_0x3192d4(0x642)][_0x3192d4(0x52b)]=VisuMZ[_0x3192d4(0x4c0)][_0x3192d4(0x627)][_0x3192d4(0x7ab)][_0x3192d4(0x1d2)];const _0xc0400f=VisuMZ[_0x3192d4(0x4c0)]['Settings'][_0x3192d4(0x7ab)][_0x3192d4(0x58b)];if(_0xc0400f>0x0&&_0x237e2f===TextManager[_0x3192d4(0x666)]){const _0x1c62d6=_0x1f5bd8+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x3192d4(0x688)](_0xc0400f,_0x1df79b+(_0x232b9d-ImageManager[_0x3192d4(0x254)]),_0x1c62d6),_0x232b9d-=ImageManager['iconWidth']+0x4;}else this[_0x3192d4(0x210)](ColorManager[_0x3192d4(0x3e2)]()),this['drawText'](_0x237e2f,_0x1df79b,_0x1f5bd8,_0x232b9d,_0x3192d4(0x4b2)),_0x232b9d-=this[_0x3192d4(0x7c1)](_0x237e2f)+0x6;this[_0x3192d4(0x6f0)]();const _0x32e3e1=this[_0x3192d4(0x7c1)](this[_0x3192d4(0x8b2)]?VisuMZ[_0x3192d4(0x230)](_0x13ccc5):_0x13ccc5);if(_0x32e3e1>_0x232b9d){if(_0x3192d4(0x1d9)===_0x3192d4(0x1d9))this['drawText'](VisuMZ[_0x3192d4(0x4c0)][_0x3192d4(0x627)][_0x3192d4(0x7ab)]['GoldOverlap'],_0x1df79b,_0x1f5bd8,_0x232b9d,'right');else return _0x314cc5[_0x3192d4(0x649)][_0x3192d4(0xeb)][_0x3192d4(0x248)](this);}else this[_0x3192d4(0x127)](_0x13ccc5,_0x1df79b,_0x1f5bd8,_0x232b9d,_0x3192d4(0x4b2));this[_0x3192d4(0x451)]();},Window_Base[_0x347547(0x387)][_0x347547(0x6bb)]=function(_0x687879,_0x68c137,_0x25d54c,_0x2f79d8,_0x52ddbf){const _0x3074e6=_0x347547,_0x5a18d4=ImageManager[_0x3074e6(0x4df)]('IconSet'),_0x3bdf86=ImageManager[_0x3074e6(0x254)],_0xa654c0=ImageManager[_0x3074e6(0x715)],_0x430ca0=_0x687879%0x10*_0x3bdf86,_0x4008d0=Math['floor'](_0x687879/0x10)*_0xa654c0,_0x38c0a7=_0x2f79d8,_0x468cff=_0x2f79d8;this['contents'][_0x3074e6(0x5fa)][_0x3074e6(0x2d0)]=_0x52ddbf,this[_0x3074e6(0x642)][_0x3074e6(0x84c)](_0x5a18d4,_0x430ca0,_0x4008d0,_0x3bdf86,_0xa654c0,_0x68c137,_0x25d54c,_0x38c0a7,_0x468cff),this[_0x3074e6(0x642)]['_context'][_0x3074e6(0x2d0)]=!![];},Window_Base[_0x347547(0x387)][_0x347547(0x89b)]=function(_0x5c65bb,_0x3d403c,_0x5ce998,_0xc6107f,_0x534729,_0x5ebece){const _0x3f2409=_0x347547,_0x122c40=Math[_0x3f2409(0x231)]((_0x5ce998-0x2)*_0xc6107f),_0x451012=Sprite_Gauge['prototype'][_0x3f2409(0x65e)][_0x3f2409(0x248)](this),_0x560e52=_0x3d403c+this[_0x3f2409(0x3a9)]()-_0x451012-0x2;this[_0x3f2409(0x642)][_0x3f2409(0x7b3)](_0x5c65bb,_0x560e52,_0x5ce998,_0x451012,ColorManager['gaugeBackColor']()),this[_0x3f2409(0x642)]['gradientFillRect'](_0x5c65bb+0x1,_0x560e52+0x1,_0x122c40,_0x451012-0x2,_0x534729,_0x5ebece);},Window_Selectable[_0x347547(0x387)]['cursorDown']=function(_0x4c3c2e){const _0x5d38e7=_0x347547;let _0x33fd86=this[_0x5d38e7(0x418)]();const _0x338152=this[_0x5d38e7(0x5e7)](),_0x527628=this[_0x5d38e7(0x2c2)]();if(this[_0x5d38e7(0x14d)]()&&(_0x33fd86<_0x338152||_0x4c3c2e&&_0x527628===0x1)){if('keeto'!=='HTlop'){_0x33fd86+=_0x527628;if(_0x33fd86>=_0x338152)_0x33fd86=_0x338152-0x1;this[_0x5d38e7(0x17e)](_0x33fd86);}else this[_0x5d38e7(0x6a1)]();}else!this[_0x5d38e7(0x14d)]()&&((_0x33fd86<_0x338152-_0x527628||_0x4c3c2e&&_0x527628===0x1)&&this[_0x5d38e7(0x17e)]((_0x33fd86+_0x527628)%_0x338152));},VisuMZ[_0x347547(0x4c0)]['Window_Selectable_cursorDown']=Window_Selectable[_0x347547(0x387)][_0x347547(0x5a3)],Window_Selectable[_0x347547(0x387)][_0x347547(0x5a3)]=function(_0x19362c){const _0x269d36=_0x347547;if(this[_0x269d36(0x14d)]()&&_0x19362c&&this['maxCols']()===0x1&&this[_0x269d36(0x418)]()===this[_0x269d36(0x5e7)]()-0x1){if(_0x269d36(0x241)!==_0x269d36(0x241)){const _0x5efdc6=_0x3c6ba5[_0x269d36(0x4c0)][_0x269d36(0x627)]['ScreenShake'];this[_0x269d36(0x535)]=_0x5efdc6?.['DefaultStyle']||_0x269d36(0x72b);}else this[_0x269d36(0x17e)](0x0);}else VisuMZ[_0x269d36(0x4c0)][_0x269d36(0x148)]['call'](this,_0x19362c);},Window_Selectable[_0x347547(0x387)]['cursorUp']=function(_0x39a86a){const _0x24e450=_0x347547;let _0x4f8463=Math['max'](0x0,this[_0x24e450(0x418)]());const _0x4d85cf=this[_0x24e450(0x5e7)](),_0x77ddc6=this[_0x24e450(0x2c2)]();if(this[_0x24e450(0x14d)]()&&_0x4f8463>0x0||_0x39a86a&&_0x77ddc6===0x1){_0x4f8463-=_0x77ddc6;if(_0x4f8463<=0x0)_0x4f8463=0x0;this[_0x24e450(0x17e)](_0x4f8463);}else{if(!this[_0x24e450(0x14d)]()){if(_0x24e450(0x861)!==_0x24e450(0x4ee))(_0x4f8463>=_0x77ddc6||_0x39a86a&&_0x77ddc6===0x1)&&(_0x24e450(0x65b)==='IgORi'?this[_0x24e450(0x17e)]((_0x4f8463-_0x77ddc6+_0x4d85cf)%_0x4d85cf):this[_0x24e450(0x8b2)]=_0x18407a);else{if(this[_0x24e450(0x483)]==='keyboard'){this['contents'][_0x24e450(0x16b)](),this[_0x24e450(0x2cd)][_0x24e450(0x16b)](),this[_0x24e450(0x6f0)]();let _0x5a5558=_0x3dfed9[_0x24e450(0x4c0)]['Settings'][_0x24e450(0x3f0)][_0x24e450(0x18a)][_0x24e450(0x380)]('\x0a'),_0x2da8f8=_0x5a5558[_0x24e450(0x4e8)],_0x4c5296=(this['innerHeight']-_0x2da8f8*this[_0x24e450(0x3a9)]())/0x2;for(let _0x29f102=0x0;_0x29f102<_0x2da8f8;++_0x29f102){let _0x488895=_0x5a5558[_0x29f102],_0x1d7679=this[_0x24e450(0x51a)](_0x488895)[_0x24e450(0x4da)],_0x2e8173=_0x10adb2[_0x24e450(0x231)]((this[_0x24e450(0x642)][_0x24e450(0x4da)]-_0x1d7679)/0x2);this[_0x24e450(0x200)](_0x488895,_0x2e8173,_0x4c5296),_0x4c5296+=this[_0x24e450(0x3a9)]();}}else _0x2e0a77[_0x24e450(0x4c0)]['Window_NameInput_refresh'][_0x24e450(0x248)](this);}}}},VisuMZ[_0x347547(0x4c0)]['Window_Selectable_cursorUp']=Window_Selectable[_0x347547(0x387)]['cursorUp'],Window_Selectable[_0x347547(0x387)]['cursorUp']=function(_0xaafde2){const _0x354927=_0x347547;if(this[_0x354927(0x14d)]()&&_0xaafde2&&this[_0x354927(0x2c2)]()===0x1&&this[_0x354927(0x418)]()===0x0)_0x354927(0x18b)===_0x354927(0x18b)?this[_0x354927(0x17e)](this[_0x354927(0x5e7)]()-0x1):(this[_0x354927(0x28b)]=this[_0x354927(0x28b)]||[],this['_onceParallelInterpreters'][_0x354927(0x841)](_0x3e015b));else{if(_0x354927(0x441)!==_0x354927(0x441))return _0x354927(0x88f)['format'](_0x3ef3f9(_0x1c09ef['$1']));else VisuMZ[_0x354927(0x4c0)][_0x354927(0x5ea)][_0x354927(0x248)](this,_0xaafde2);}},Window_Selectable[_0x347547(0x387)][_0x347547(0x14d)]=function(){const _0x34bf92=_0x347547;return VisuMZ[_0x34bf92(0x4c0)][_0x34bf92(0x627)][_0x34bf92(0x4e9)][_0x34bf92(0x485)];},VisuMZ['CoreEngine'][_0x347547(0x819)]=Window_Selectable['prototype'][_0x347547(0x6c2)],Window_Selectable[_0x347547(0x387)][_0x347547(0x6c2)]=function(){const _0x26778a=_0x347547;this[_0x26778a(0x14d)]()?(this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']()):_0x26778a(0x629)===_0x26778a(0x629)?VisuMZ['CoreEngine'][_0x26778a(0x819)][_0x26778a(0x248)](this):(_0x13d8bc[_0x26778a(0x23d)][0x23]=_0x26778a(0x341),_0x379c7e[_0x26778a(0x23d)][0x24]=_0x26778a(0x7e9));},Window_Selectable[_0x347547(0x387)]['allowShiftScrolling']=function(){return!![];},Window_Selectable['prototype'][_0x347547(0x5d2)]=function(){const _0x657331=_0x347547;if(this[_0x657331(0x5b9)]()){const _0x505547=this[_0x657331(0x418)]();if(Input[_0x657331(0x86a)](_0x657331(0x77b))){if('WWfYF'==='WWfYF')Input[_0x657331(0x70b)](_0x657331(0x7ef))&&this['allowShiftScrolling']()?this[_0x657331(0x7a9)]():this[_0x657331(0x5a3)](Input[_0x657331(0x62f)]('down'));else{const _0x18135e=_0x3cb1e7[_0x657331(0x8be)];if(_0x18135e===0x1&&this['subject']()['attackSkillId']()!==0x1)this[_0x657331(0x7cb)]();else _0x18135e===0x2&&this[_0x657331(0x27a)]()[_0x657331(0x53b)]()!==0x2?this['setGuard']():this[_0x657331(0x3ce)](_0x18135e);}}if(Input['isRepeated']('up')){if(Input[_0x657331(0x70b)]('shift')&&this['allowShiftScrolling']()){if(_0x657331(0x74e)===_0x657331(0x74e))this['cursorPageup']();else return 0x0;}else this[_0x657331(0x42c)](Input[_0x657331(0x62f)]('up'));}Input['isRepeated'](_0x657331(0x4b2))&&this[_0x657331(0x26e)](Input[_0x657331(0x62f)](_0x657331(0x4b2)));Input[_0x657331(0x86a)](_0x657331(0x43c))&&this[_0x657331(0x31f)](Input[_0x657331(0x62f)]('left'));!this[_0x657331(0x44d)]('pagedown')&&Input['isRepeated'](_0x657331(0x423))&&this['cursorPagedown']();if(!this[_0x657331(0x44d)](_0x657331(0x177))&&Input[_0x657331(0x86a)](_0x657331(0x177))){if(_0x657331(0x659)!==_0x657331(0x659)){_0x13fde9[_0x657331(0x4c0)][_0x657331(0x865)][_0x657331(0x248)](this);const _0x27e938=this[_0x657331(0x421)][_0x657331(0x2ea)];if(_0x27e938)this['addChild'](_0x27e938);}else this[_0x657331(0x40e)]();}this[_0x657331(0x418)]()!==_0x505547&&(_0x657331(0x759)!==_0x657331(0x6d3)?this[_0x657331(0x6a1)]():this[_0x657331(0x127)](_0x2fd12b,_0xc8ce88,_0x397146,_0x582503));}},Window_Selectable[_0x347547(0x387)][_0x347547(0x192)]=function(){const _0x504471=_0x347547;if(this['isCursorMovable']()){const _0x353e1a=this[_0x504471(0x418)]();Input[_0x504471(0x62f)](_0x504471(0x7e9))&&('wqkhB'==='wqkhB'?this[_0x504471(0x17e)](Math[_0x504471(0x143)](this['index'](),0x0)):this['drawTextEx'](_0x491393[_0x504471(0x518)](),_0x53ab63,_0x592bb7,_0x215cef));if(Input[_0x504471(0x62f)](_0x504471(0x341))){if(_0x504471(0x54c)!=='TeSdm'){var _0x3d19de=_0x2858e8(_0x32203f['$1']);_0xf30a32*=_0x3d19de;}else this[_0x504471(0x17e)](Math[_0x504471(0x545)](this[_0x504471(0x418)](),this[_0x504471(0x5e7)]()-0x1));}this[_0x504471(0x418)]()!==_0x353e1a&&this[_0x504471(0x6a1)]();}},VisuMZ['CoreEngine'][_0x347547(0x167)]=Window_Selectable[_0x347547(0x387)][_0x347547(0x22f)],Window_Selectable[_0x347547(0x387)]['processTouch']=function(){const _0x32765b=_0x347547;if(this['isUseModernControls']()){if(_0x32765b(0xff)!==_0x32765b(0x86f))this[_0x32765b(0x44b)]();else return _0x114f4a[_0x32765b(0x649)][_0x32765b(0x508)][_0x32765b(0x248)](this);}else _0x32765b(0x45f)===_0x32765b(0x42f)?_0x57131f=this[_0x32765b(0x397)]():VisuMZ[_0x32765b(0x4c0)][_0x32765b(0x167)]['call'](this);},Window_Selectable['prototype'][_0x347547(0x44b)]=function(){const _0x4cdaa2=_0x347547;VisuMZ[_0x4cdaa2(0x4c0)][_0x4cdaa2(0x167)]['call'](this);},Window_Selectable['prototype'][_0x347547(0x4b6)]=function(){const _0x309756=_0x347547;return VisuMZ['CoreEngine']['Settings'][_0x309756(0x4ed)][_0x309756(0x4eb)];},Window_Selectable[_0x347547(0x387)]['rowSpacing']=function(){const _0x374b0a=_0x347547;return VisuMZ[_0x374b0a(0x4c0)][_0x374b0a(0x627)][_0x374b0a(0x4ed)][_0x374b0a(0x2f5)];},Window_Selectable[_0x347547(0x387)][_0x347547(0x21f)]=function(){const _0x5f0063=_0x347547;return Window_Scrollable[_0x5f0063(0x387)]['itemHeight'][_0x5f0063(0x248)](this)+VisuMZ[_0x5f0063(0x4c0)]['Settings'][_0x5f0063(0x4ed)]['ItemHeight'];;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x8cf)]=Window_Selectable[_0x347547(0x387)][_0x347547(0x356)],Window_Selectable[_0x347547(0x387)][_0x347547(0x356)]=function(_0x105471){const _0xbdb32e=_0x347547,_0x1341db=VisuMZ[_0xbdb32e(0x4c0)][_0xbdb32e(0x627)][_0xbdb32e(0x4ed)];if(_0x1341db[_0xbdb32e(0x273)]===![])return;_0x1341db[_0xbdb32e(0x6a3)]?_0xbdb32e(0x218)!=='bpvxw'?_0x1341db[_0xbdb32e(0x6a3)]['call'](this,_0x105471):_0xe55f5a=_0x2d3a20[_0xbdb32e(0x4c0)]['Scene_MenuBase_mainAreaHeight'][_0xbdb32e(0x248)](this):'uaTcY'===_0xbdb32e(0x6b9)?VisuMZ[_0xbdb32e(0x4c0)]['Window_Selectable_drawBackgroundRect'][_0xbdb32e(0x248)](this,_0x105471):_0x202bd5[_0xbdb32e(0x71c)]()&&(_0x1e194a[_0xbdb32e(0x65c)](_0xbdb32e(0x808)),_0x12651c['log'](_0x2ee464));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x85f)]=Window_Gold[_0x347547(0x387)]['refresh'],Window_Gold[_0x347547(0x387)][_0x347547(0x52a)]=function(){const _0x8255cd=_0x347547;this[_0x8255cd(0x774)]()?'SJvqf'==='SJvqf'?this[_0x8255cd(0x7ae)]():this[_0x8255cd(0x342)][_0x8255cd(0x599)](_0x45ad99[_0x8255cd(0x649)][_0x8255cd(0x498)]):VisuMZ['CoreEngine']['Window_Gold_refresh'][_0x8255cd(0x248)](this);},Window_Gold[_0x347547(0x387)][_0x347547(0x774)]=function(){const _0x2af163=_0x347547;if(TextManager[_0x2af163(0x666)]!==this[_0x2af163(0x666)]())return![];return VisuMZ[_0x2af163(0x4c0)][_0x2af163(0x627)][_0x2af163(0x7ab)][_0x2af163(0x2e2)];},Window_Gold['prototype'][_0x347547(0x7ae)]=function(){const _0xd983b9=_0x347547;this[_0xd983b9(0x451)](),this[_0xd983b9(0x642)][_0xd983b9(0x16b)](),this[_0xd983b9(0x642)][_0xd983b9(0x52b)]=VisuMZ[_0xd983b9(0x4c0)]['Settings']['Gold'][_0xd983b9(0x1d2)];const _0x59b400=VisuMZ['CoreEngine']['Settings'][_0xd983b9(0x7ab)][_0xd983b9(0x58b)],_0x276076=this[_0xd983b9(0x872)](0x0);if(_0x59b400>0x0){const _0x58b9c5=_0x276076['y']+(this[_0xd983b9(0x3a9)]()-ImageManager[_0xd983b9(0x715)])/0x2;this[_0xd983b9(0x688)](_0x59b400,_0x276076['x'],_0x58b9c5);const _0x43182f=ImageManager[_0xd983b9(0x254)]+0x4;_0x276076['x']+=_0x43182f,_0x276076[_0xd983b9(0x4da)]-=_0x43182f;}this[_0xd983b9(0x210)](ColorManager[_0xd983b9(0x3e2)]()),this[_0xd983b9(0x127)](this[_0xd983b9(0x666)](),_0x276076['x'],_0x276076['y'],_0x276076['width'],_0xd983b9(0x43c));const _0x515264=this['textWidth'](this['currencyUnit']())+0x6;;_0x276076['x']+=_0x515264,_0x276076[_0xd983b9(0x4da)]-=_0x515264,this[_0xd983b9(0x6f0)]();const _0x39e9a7=this['value'](),_0x36fcc1=this[_0xd983b9(0x7c1)](this[_0xd983b9(0x8b2)]?VisuMZ[_0xd983b9(0x230)](this[_0xd983b9(0x295)]()):this[_0xd983b9(0x295)]());_0x36fcc1>_0x276076[_0xd983b9(0x4da)]?this[_0xd983b9(0x127)](VisuMZ[_0xd983b9(0x4c0)][_0xd983b9(0x627)][_0xd983b9(0x7ab)][_0xd983b9(0x4a7)],_0x276076['x'],_0x276076['y'],_0x276076[_0xd983b9(0x4da)],_0xd983b9(0x4b2)):this['drawText'](this[_0xd983b9(0x295)](),_0x276076['x'],_0x276076['y'],_0x276076[_0xd983b9(0x4da)],_0xd983b9(0x4b2)),this[_0xd983b9(0x451)]();},Window_StatusBase['prototype']['drawParamText']=function(_0x56afac,_0x3a0fc3,_0x4f95a9,_0x4340f1,_0x3456ca){const _0x1858a1=_0x347547;_0x4340f1=String(_0x4340f1||'')[_0x1858a1(0x173)]();if(VisuMZ[_0x1858a1(0x4c0)][_0x1858a1(0x627)][_0x1858a1(0x8a1)]['DrawIcons']){if(_0x1858a1(0x1c1)!==_0x1858a1(0x102)){const _0x3ce338=VisuMZ['GetParamIcon'](_0x4340f1);_0x3456ca?(this[_0x1858a1(0x6bb)](_0x3ce338,_0x56afac,_0x3a0fc3,this[_0x1858a1(0x11b)]()),_0x4f95a9-=this[_0x1858a1(0x11b)]()+0x2,_0x56afac+=this[_0x1858a1(0x11b)]()+0x2):(this[_0x1858a1(0x688)](_0x3ce338,_0x56afac+0x2,_0x3a0fc3+0x2),_0x4f95a9-=ImageManager[_0x1858a1(0x254)]+0x4,_0x56afac+=ImageManager[_0x1858a1(0x254)]+0x4);}else{var _0x23ad72=_0x1c900b(_0x12f01c['$1']);if(_0x23ad72===0x0)_0x23ad72=_0x2f4b5e['MAX_SAFE_INTEGER'];_0x3447d9=_0x33e713[_0x1858a1(0x545)](_0x59f5c7,_0x23ad72);}}const _0x1b6f33=TextManager[_0x1858a1(0x530)](_0x4340f1);this[_0x1858a1(0x451)](),this['changeTextColor'](ColorManager[_0x1858a1(0x3e2)]()),_0x3456ca?(this['contents'][_0x1858a1(0x52b)]=this[_0x1858a1(0x75d)](),this[_0x1858a1(0x642)][_0x1858a1(0x127)](_0x1b6f33,_0x56afac,_0x3a0fc3,_0x4f95a9,this[_0x1858a1(0x11b)](),'left')):_0x1858a1(0x529)!==_0x1858a1(0x529)?(this['_helpWindow']&&this[_0x1858a1(0x342)][_0x1858a1(0x599)](_0x2df67e[_0x1858a1(0x649)][_0x1858a1(0x498)]),this[_0x1858a1(0x1f9)]&&this[_0x1858a1(0x1f9)][_0x1858a1(0x599)](_0x503cbc[_0x1858a1(0x649)][_0x1858a1(0x319)])):this[_0x1858a1(0x127)](_0x1b6f33,_0x56afac,_0x3a0fc3,_0x4f95a9),this[_0x1858a1(0x451)]();},Window_StatusBase['prototype'][_0x347547(0x75d)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x347547(0x387)]['drawActorClass']=function(_0x5d174c,_0x193aa5,_0x1dbfd3,_0x1ea964){const _0x1396fe=_0x347547;_0x1ea964=_0x1ea964||0xa8,this[_0x1396fe(0x6f0)]();if(VisuMZ[_0x1396fe(0x4c0)]['Settings']['UI'][_0x1396fe(0x2ae)])this[_0x1396fe(0x200)](_0x5d174c[_0x1396fe(0x34a)]()['name'],_0x193aa5,_0x1dbfd3,_0x1ea964);else{const _0x43a2ed=_0x5d174c[_0x1396fe(0x34a)]()[_0x1396fe(0x771)][_0x1396fe(0x728)](/\\I\[(\d+)\]/gi,'');this[_0x1396fe(0x127)](_0x43a2ed,_0x193aa5,_0x1dbfd3,_0x1ea964);}},Window_StatusBase[_0x347547(0x387)][_0x347547(0x32e)]=function(_0x22f280,_0x274b34,_0x183dae,_0x23dda2){const _0xf344e6=_0x347547;_0x23dda2=_0x23dda2||0x10e,this['resetTextColor']();if(VisuMZ[_0xf344e6(0x4c0)][_0xf344e6(0x627)]['UI'][_0xf344e6(0x8b8)])this['drawTextEx'](_0x22f280[_0xf344e6(0x518)](),_0x274b34,_0x183dae,_0x23dda2);else{const _0x39758a=_0x22f280[_0xf344e6(0x518)]()[_0xf344e6(0x728)](/\\I\[(\d+)\]/gi,'');this[_0xf344e6(0x127)](_0x22f280[_0xf344e6(0x518)](),_0x274b34,_0x183dae,_0x23dda2);}},VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x347547(0x387)][_0x347547(0x585)],Window_StatusBase[_0x347547(0x387)][_0x347547(0x585)]=function(_0x4ce53d,_0x3ebdc1,_0x29a771){const _0xf501f0=_0x347547;if(this['isExpGaugeDrawn']())this[_0xf501f0(0x538)](_0x4ce53d,_0x3ebdc1,_0x29a771);VisuMZ[_0xf501f0(0x4c0)]['Window_StatusBase_drawActorLevel']['call'](this,_0x4ce53d,_0x3ebdc1,_0x29a771);},Window_StatusBase[_0x347547(0x387)][_0x347547(0x863)]=function(){const _0x482315=_0x347547;return VisuMZ[_0x482315(0x4c0)][_0x482315(0x627)]['UI'][_0x482315(0x560)];},Window_StatusBase[_0x347547(0x387)][_0x347547(0x538)]=function(_0x1118ae,_0x473d3a,_0x9ff70e){const _0x3eaef5=_0x347547;if(!_0x1118ae)return;if(!_0x1118ae[_0x3eaef5(0x31d)]())return;const _0x1a8f12=0x80,_0x141e92=_0x1118ae['expRate']();let _0x1140ee=ColorManager[_0x3eaef5(0x6a0)](),_0x35402c=ColorManager[_0x3eaef5(0x505)]();if(_0x141e92>=0x1){if(_0x3eaef5(0x8c3)===_0x3eaef5(0x8c3))_0x1140ee=ColorManager['maxLvGaugeColor1'](),_0x35402c=ColorManager[_0x3eaef5(0x5de)]();else{if(_0x1ce532)_0x31cda2['ParseTilesetNotetags'](_0x1ee744);}}this['drawGauge'](_0x473d3a,_0x9ff70e,_0x1a8f12,_0x141e92,_0x1140ee,_0x35402c);},Window_EquipStatus[_0x347547(0x387)][_0x347547(0x138)]=function(){const _0x4d8b2b=_0x347547;let _0xcd8cd7=0x0;for(const _0x99de26 of VisuMZ['CoreEngine'][_0x4d8b2b(0x627)][_0x4d8b2b(0x8a1)][_0x4d8b2b(0x1fb)]){const _0x226456=this[_0x4d8b2b(0x61b)](),_0x49eca0=this['paramY'](_0xcd8cd7);this['drawItem'](_0x226456,_0x49eca0,_0x99de26),_0xcd8cd7++;}},Window_EquipStatus[_0x347547(0x387)]['drawParamName']=function(_0xbe0c10,_0x3c2b35,_0x19dd7f){const _0x20ef4=_0x347547,_0x12d104=this[_0x20ef4(0x7a7)]()-this[_0x20ef4(0x61b)]()*0x2;this[_0x20ef4(0x616)](_0xbe0c10,_0x3c2b35,_0x12d104,_0x19dd7f,![]);},Window_EquipStatus[_0x347547(0x387)][_0x347547(0x829)]=function(_0x11d4ba,_0x227e2c,_0x27b49b){const _0x1520e8=_0x347547,_0x2ec7bb=this['paramWidth']();this[_0x1520e8(0x6f0)](),this['drawText'](this[_0x1520e8(0x7e7)][_0x1520e8(0x56d)](_0x27b49b,!![]),_0x11d4ba,_0x227e2c,_0x2ec7bb,_0x1520e8(0x4b2));},Window_EquipStatus[_0x347547(0x387)][_0x347547(0x550)]=function(_0x3f28df,_0x3ab9fe){const _0x2da6ae=_0x347547,_0xd2882=this[_0x2da6ae(0x38d)]();this[_0x2da6ae(0x210)](ColorManager[_0x2da6ae(0x3e2)]());const _0x2343b6=VisuMZ['CoreEngine']['Settings']['UI'][_0x2da6ae(0x45c)];this[_0x2da6ae(0x127)](_0x2343b6,_0x3f28df,_0x3ab9fe,_0xd2882,'center');},Window_EquipStatus[_0x347547(0x387)][_0x347547(0x6c6)]=function(_0x1f0727,_0x2ffd64,_0x2f8c0a){const _0x2ac646=_0x347547,_0x5211bb=this[_0x2ac646(0x766)](),_0x2102c4=this['_tempActor']['paramValueByName'](_0x2f8c0a),_0x4ebdbf=_0x2102c4-this[_0x2ac646(0x7e7)][_0x2ac646(0x56d)](_0x2f8c0a);this['changeTextColor'](ColorManager[_0x2ac646(0x814)](_0x4ebdbf)),this[_0x2ac646(0x127)](this[_0x2ac646(0x6aa)][_0x2ac646(0x56d)](_0x2f8c0a,!![]),_0x1f0727,_0x2ffd64,_0x5211bb,_0x2ac646(0x4b2));},VisuMZ[_0x347547(0x4c0)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x347547(0x387)][_0x347547(0x70d)],Window_EquipItem[_0x347547(0x387)][_0x347547(0x70d)]=function(_0x3f3ffe){const _0x373d2c=_0x347547;if(_0x3f3ffe&&this['_actor']){if('tddTy'!==_0x373d2c(0x66e))return this[_0x373d2c(0x7e7)]['canEquip'](_0x3f3ffe);else this['_forcedTroopView']='SV';}else{if('fnNdj'===_0x373d2c(0x723))_0xbf1844[_0x373d2c(0x4c0)][_0x373d2c(0x3bf)]['call'](this),this[_0x373d2c(0x1f7)](this[_0x373d2c(0x29d)]-0x1),_0x596a49[_0x373d2c(0x16b)]();else return VisuMZ[_0x373d2c(0x4c0)][_0x373d2c(0x443)]['call'](this,_0x3f3ffe);}},Window_StatusParams['prototype'][_0x347547(0x5e7)]=function(){const _0x10b856=_0x347547;return VisuMZ['CoreEngine']['Settings']['Param'][_0x10b856(0x1fb)][_0x10b856(0x4e8)];},Window_StatusParams[_0x347547(0x387)]['drawItem']=function(_0x1cb47f){const _0x3d6395=_0x347547,_0x1ae6f6=this[_0x3d6395(0x872)](_0x1cb47f),_0x3d7af0=VisuMZ[_0x3d6395(0x4c0)]['Settings'][_0x3d6395(0x8a1)][_0x3d6395(0x1fb)][_0x1cb47f],_0x3ad79b=TextManager[_0x3d6395(0x530)](_0x3d7af0),_0x35aacd=this[_0x3d6395(0x7e7)]['paramValueByName'](_0x3d7af0,!![]);this[_0x3d6395(0x616)](_0x1ae6f6['x'],_0x1ae6f6['y'],0xa0,_0x3d7af0,![]),this['resetTextColor'](),this['drawText'](_0x35aacd,_0x1ae6f6['x']+0xa0,_0x1ae6f6['y'],0x3c,'right');};if(VisuMZ['CoreEngine'][_0x347547(0x627)][_0x347547(0x3f0)][_0x347547(0x291)]){VisuMZ[_0x347547(0x4c0)]['Settings'][_0x347547(0x3f0)]['QwertyLayout']&&(Window_NameInput[_0x347547(0x61d)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x347547(0x873),'OK']);;VisuMZ[_0x347547(0x4c0)][_0x347547(0x81b)]=Window_NameInput['prototype'][_0x347547(0x6f3)],Window_NameInput[_0x347547(0x387)][_0x347547(0x6f3)]=function(_0x11d9f0){const _0x2b8e3a=_0x347547;this[_0x2b8e3a(0x483)]=this[_0x2b8e3a(0x301)](),VisuMZ[_0x2b8e3a(0x4c0)][_0x2b8e3a(0x81b)][_0x2b8e3a(0x248)](this,_0x11d9f0),this[_0x2b8e3a(0x483)]===_0x2b8e3a(0x40f)?this[_0x2b8e3a(0x1f7)](0x0):(Input[_0x2b8e3a(0x16b)](),this['deselect']());},Window_NameInput[_0x347547(0x387)][_0x347547(0x301)]=function(){const _0x51e460=_0x347547;if(Input[_0x51e460(0x219)]())return _0x51e460(0x40f);return VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x51e460(0x329)]||'keyboard';},VisuMZ[_0x347547(0x4c0)]['Window_NameInput_processHandling']=Window_NameInput[_0x347547(0x387)][_0x347547(0x29e)],Window_NameInput[_0x347547(0x387)][_0x347547(0x29e)]=function(){const _0x16938b=_0x347547;if(!this[_0x16938b(0x217)]())return;if(!this[_0x16938b(0x3ef)])return;if(this[_0x16938b(0x483)]===_0x16938b(0x5c7)&&Input[_0x16938b(0x416)]())_0x16938b(0x822)===_0x16938b(0x128)?this['_forcedBattleSys']=_0x16938b(0x7e3):this[_0x16938b(0x854)](_0x16938b(0x40f));else{if(Input[_0x16938b(0x830)](_0x16938b(0x17b)))_0x16938b(0x686)!==_0x16938b(0x686)?(this['_number']=_0x4ecf5c(_0x123575(this[_0x16938b(0x7b8)])['substring'](0x1)),this[_0x16938b(0x7b8)]=_0x595185[_0x16938b(0x545)](0x0,this[_0x16938b(0x7b8)]),_0x3e9e73[_0x16938b(0x16b)](),this[_0x16938b(0x52a)](),_0x5a0ac0['playCursor'](),this['select'](this['_maxDigits']-0x1)):(Input[_0x16938b(0x16b)](),this[_0x16938b(0x889)]());else{if(Input[_0x16938b(0x62f)](_0x16938b(0x506))){Input['clear']();if(this['_mode']===_0x16938b(0x5c7)){if('EzEGo'!==_0x16938b(0x67d))this[_0x16938b(0x854)](_0x16938b(0x40f));else{if(this[_0x16938b(0x3aa)]===_0x238d8f)this[_0x16938b(0x215)]();return this[_0x16938b(0x3aa)];}}else{if(_0x16938b(0x4fd)===_0x16938b(0x4fd))this[_0x16938b(0x854)](_0x16938b(0x5c7));else return _0x3fcaa2[_0x16938b(0x4c0)]['Settings']['QoL'][_0x16938b(0x735)];}}else{if(this[_0x16938b(0x483)]===_0x16938b(0x5c7)){if(_0x16938b(0x7ca)!==_0x16938b(0x7ca)){const _0x520997=this['context'];_0x520997['save'](),_0x520997['font']=this['_makeFontNameText']();const _0x3bfa92=_0x520997['measureText'](_0x1ffd50)['width'];return _0x520997[_0x16938b(0x39e)](),_0x3bfa92;}else this[_0x16938b(0x510)]();}else{if(Input['isSpecialCode']('escape')){if(_0x16938b(0x409)!==_0x16938b(0x409))return _0x47e7b7['layoutSettings'][_0x16938b(0x41b)][_0x16938b(0x248)](this);else Input['clear'](),this[_0x16938b(0x854)](_0x16938b(0x5c7));}else VisuMZ[_0x16938b(0x4c0)][_0x16938b(0x5fe)][_0x16938b(0x248)](this);}}}}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x468)]=Window_NameInput['prototype'][_0x347547(0x22f)],Window_NameInput[_0x347547(0x387)][_0x347547(0x22f)]=function(){const _0x52e901=_0x347547;if(!this[_0x52e901(0x2ca)]())return;if(this['_mode']==='keyboard'){if(TouchInput[_0x52e901(0x62f)]()&&this[_0x52e901(0x182)]())this[_0x52e901(0x854)](_0x52e901(0x40f));else TouchInput[_0x52e901(0x2b7)]()&&('FQnTj'==='XSpCx'?this[_0x52e901(0x429)]=_0x1ef31e:this[_0x52e901(0x854)](_0x52e901(0x40f)));}else VisuMZ[_0x52e901(0x4c0)][_0x52e901(0x468)][_0x52e901(0x248)](this);},Window_NameInput[_0x347547(0x387)]['processKeyboardHandling']=function(){const _0x39046c=_0x347547;if(Input[_0x39046c(0x830)](_0x39046c(0x1a1)))'cLZGU'!==_0x39046c(0x1a6)?_0x13794a['CoreEngine'][_0x39046c(0x725)][_0x39046c(0x248)](this):(Input[_0x39046c(0x16b)](),this[_0x39046c(0x806)]());else{if(Input[_0x39046c(0x790)]!==undefined){if(_0x39046c(0x6ec)!==_0x39046c(0x22d)){let _0x1adc20=Input[_0x39046c(0x790)],_0x54374f=_0x1adc20[_0x39046c(0x4e8)];for(let _0x130c1a=0x0;_0x130c1a<_0x54374f;++_0x130c1a){if('lloeh'!=='GNuGw')this[_0x39046c(0x165)]['add'](_0x1adc20[_0x130c1a])?SoundManager['playOk']():SoundManager[_0x39046c(0x1c2)]();else{if(_0x1e6013)_0x90b81e[_0x39046c(0x5c1)](_0x384508);}}Input[_0x39046c(0x16b)]();}else return _0x5a9a81[_0x39046c(0x649)][_0x39046c(0x159)][_0x39046c(0x248)](this);}}},Window_NameInput['prototype'][_0x347547(0x854)]=function(_0x3c3f4a){const _0x57dc7c=_0x347547;let _0xdac44a=this[_0x57dc7c(0x483)];this['_mode']=_0x3c3f4a;if(_0xdac44a!==this[_0x57dc7c(0x483)]){if(_0x57dc7c(0x34f)!==_0x57dc7c(0x7b1)){this[_0x57dc7c(0x52a)](),SoundManager[_0x57dc7c(0x7aa)]();if(this[_0x57dc7c(0x483)]==='default'){if(_0x57dc7c(0x10f)===_0x57dc7c(0x10f))this[_0x57dc7c(0x1f7)](0x0);else{const _0x4fe616=_0x57dc7c(0x6d5);this[_0x57dc7c(0x287)]=this[_0x57dc7c(0x287)]||{};if(this[_0x57dc7c(0x287)][_0x4fe616])return this[_0x57dc7c(0x287)][_0x4fe616];const _0x5098a0=_0x16ec3a[_0x57dc7c(0x4c0)][_0x57dc7c(0x627)][_0x57dc7c(0x76a)][_0x57dc7c(0x755)];return this[_0x57dc7c(0x474)](_0x4fe616,_0x5098a0);}}else this[_0x57dc7c(0x1f7)](-0x1);}else{const _0x3d515c=_0x57dc7c(0x12f);this[_0x57dc7c(0x287)]=this['_colorCache']||{};if(this[_0x57dc7c(0x287)][_0x3d515c])return this[_0x57dc7c(0x287)][_0x3d515c];const _0x29a8d8=_0xfd662[_0x57dc7c(0x4c0)][_0x57dc7c(0x627)][_0x57dc7c(0x76a)][_0x57dc7c(0x395)];return this[_0x57dc7c(0x474)](_0x3d515c,_0x29a8d8);}}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x607)]=Window_NameInput[_0x347547(0x387)]['cursorDown'],Window_NameInput['prototype'][_0x347547(0x5a3)]=function(_0x4297e0){const _0x55619c=_0x347547;if(this[_0x55619c(0x483)]===_0x55619c(0x5c7)&&!Input[_0x55619c(0x252)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x55619c(0x4c0)]['Window_NameInput_cursorDown'][_0x55619c(0x248)](this,_0x4297e0),this[_0x55619c(0x854)](_0x55619c(0x40f));},VisuMZ[_0x347547(0x4c0)][_0x347547(0xe3)]=Window_NameInput['prototype']['cursorUp'],Window_NameInput[_0x347547(0x387)][_0x347547(0x42c)]=function(_0x112972){const _0x4847c8=_0x347547;if(this[_0x4847c8(0x483)]===_0x4847c8(0x5c7)&&!Input[_0x4847c8(0x252)]())return;if(Input[_0x4847c8(0x482)]())return;VisuMZ[_0x4847c8(0x4c0)][_0x4847c8(0xe3)][_0x4847c8(0x248)](this,_0x112972),this[_0x4847c8(0x854)](_0x4847c8(0x40f));},VisuMZ['CoreEngine'][_0x347547(0x3fe)]=Window_NameInput['prototype'][_0x347547(0x26e)],Window_NameInput[_0x347547(0x387)][_0x347547(0x26e)]=function(_0x2161ee){const _0x624170=_0x347547;if(this['_mode']===_0x624170(0x5c7)&&!Input['isArrowPressed']())return;if(Input[_0x624170(0x482)]())return;VisuMZ[_0x624170(0x4c0)][_0x624170(0x3fe)][_0x624170(0x248)](this,_0x2161ee),this[_0x624170(0x854)](_0x624170(0x40f));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x296)]=Window_NameInput[_0x347547(0x387)][_0x347547(0x31f)],Window_NameInput[_0x347547(0x387)][_0x347547(0x31f)]=function(_0x104691){const _0x44c36e=_0x347547;if(this[_0x44c36e(0x483)]===_0x44c36e(0x5c7)&&!Input[_0x44c36e(0x252)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine']['Window_NameInput_cursorLeft']['call'](this,_0x104691),this[_0x44c36e(0x854)](_0x44c36e(0x40f));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x8af)]=Window_NameInput['prototype'][_0x347547(0x7a9)],Window_NameInput[_0x347547(0x387)][_0x347547(0x7a9)]=function(){const _0xf9c02b=_0x347547;if(this[_0xf9c02b(0x483)]===_0xf9c02b(0x5c7))return;if(Input[_0xf9c02b(0x482)]())return;VisuMZ[_0xf9c02b(0x4c0)][_0xf9c02b(0x8af)][_0xf9c02b(0x248)](this),this[_0xf9c02b(0x854)](_0xf9c02b(0x40f));},VisuMZ[_0x347547(0x4c0)][_0x347547(0x693)]=Window_NameInput[_0x347547(0x387)][_0x347547(0x40e)],Window_NameInput['prototype'][_0x347547(0x40e)]=function(){const _0x4df3d0=_0x347547;if(this['_mode']===_0x4df3d0(0x5c7))return;if(Input[_0x4df3d0(0x482)]())return;VisuMZ['CoreEngine'][_0x4df3d0(0x693)]['call'](this),this[_0x4df3d0(0x854)]('default');},VisuMZ['CoreEngine'][_0x347547(0x21c)]=Window_NameInput[_0x347547(0x387)][_0x347547(0x52a)],Window_NameInput[_0x347547(0x387)][_0x347547(0x52a)]=function(){const _0x329552=_0x347547;if(this[_0x329552(0x483)]===_0x329552(0x5c7)){this[_0x329552(0x642)][_0x329552(0x16b)](),this['contentsBack'][_0x329552(0x16b)](),this['resetTextColor']();let _0x2431f0=VisuMZ[_0x329552(0x4c0)][_0x329552(0x627)][_0x329552(0x3f0)][_0x329552(0x18a)][_0x329552(0x380)]('\x0a'),_0x1f349c=_0x2431f0['length'],_0x1e1df1=(this[_0x329552(0x299)]-_0x1f349c*this[_0x329552(0x3a9)]())/0x2;for(let _0x3312d7=0x0;_0x3312d7<_0x1f349c;++_0x3312d7){if(_0x329552(0x442)==='sHXVw'){let _0x47291b=_0x2431f0[_0x3312d7],_0xcfdb40=this[_0x329552(0x51a)](_0x47291b)[_0x329552(0x4da)],_0x1e4920=Math['floor']((this['contents'][_0x329552(0x4da)]-_0xcfdb40)/0x2);this[_0x329552(0x200)](_0x47291b,_0x1e4920,_0x1e1df1),_0x1e1df1+=this[_0x329552(0x3a9)]();}else _0x5acf99[_0x329552(0x387)][_0x329552(0x864)][_0x329552(0x248)](this),this[_0x329552(0x56b)]();}}else VisuMZ[_0x329552(0x4c0)][_0x329552(0x21c)][_0x329552(0x248)](this);};};VisuMZ[_0x347547(0x4c0)][_0x347547(0x180)]=Window_ShopSell[_0x347547(0x387)]['isEnabled'],Window_ShopSell['prototype'][_0x347547(0x70d)]=function(_0x34ecba){const _0x24256a=_0x347547;if(VisuMZ[_0x24256a(0x4c0)]['Settings']['QoL'][_0x24256a(0x4e3)]&&DataManager[_0x24256a(0x2c7)](_0x34ecba))return![];else{if('eqiQn'===_0x24256a(0x2b3))return VisuMZ[_0x24256a(0x4c0)]['Window_ShopSell_isEnabled'][_0x24256a(0x248)](this,_0x34ecba);else{const _0x416008=_0x24256a(0x245);this[_0x24256a(0x287)]=this[_0x24256a(0x287)]||{};if(this[_0x24256a(0x287)][_0x416008])return this['_colorCache'][_0x416008];const _0x3137f1=_0x1ef596['CoreEngine'][_0x24256a(0x627)][_0x24256a(0x76a)][_0x24256a(0x87e)];return this[_0x24256a(0x474)](_0x416008,_0x3137f1);}}},Window_NumberInput[_0x347547(0x387)][_0x347547(0x14d)]=function(){return![];};function _0x3084(_0x5c1289,_0x20e363){const _0xa9609b=_0xa960();return _0x3084=function(_0x308449,_0x33b670){_0x308449=_0x308449-0xc3;let _0x349a0a=_0xa9609b[_0x308449];return _0x349a0a;},_0x3084(_0x5c1289,_0x20e363);}VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)]['KeyboardInput']['EnableNumberInput']&&(VisuMZ[_0x347547(0x4c0)][_0x347547(0x3bf)]=Window_NumberInput[_0x347547(0x387)]['start'],Window_NumberInput[_0x347547(0x387)][_0x347547(0x446)]=function(){const _0x2acb67=_0x347547;VisuMZ[_0x2acb67(0x4c0)]['Window_NumberInput_start'][_0x2acb67(0x248)](this),this['select'](this[_0x2acb67(0x29d)]-0x1),Input['clear']();},VisuMZ[_0x347547(0x4c0)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x347547(0x387)][_0x347547(0x4f1)],Window_NumberInput[_0x347547(0x387)][_0x347547(0x4f1)]=function(){const _0x3876f9=_0x347547;if(!this[_0x3876f9(0x2ca)]())return;if(Input['isNumpadPressed']())_0x3876f9(0x261)!==_0x3876f9(0x4a6)?this[_0x3876f9(0x767)]():this['processKeyboardHandling']();else{if(Input[_0x3876f9(0x830)](_0x3876f9(0x17b)))this['processKeyboardBackspace']();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x3876f9(0x7d1)]();else{if(Input[_0x3876f9(0x676)]===0x24){if('NtACF'!=='NtACF')for(const _0x1433b2 of _0x23ccfa){this[_0x3876f9(0x8ac)]([_0x1433b2],_0x23a84d,_0x215357,_0x4d029a,_0x339292),_0x526c39+=_0x8fbb52;}else this[_0x3876f9(0x1aa)]();}else Input['_inputSpecialKeyCode']===0x23?this['processKeyboardEnd']():VisuMZ['CoreEngine'][_0x3876f9(0x5ee)]['call'](this);}}}},Window_NumberInput['prototype'][_0x347547(0x6c2)]=function(){const _0x29139f=_0x347547;if(!this[_0x29139f(0x5b9)]())return;if(Input[_0x29139f(0x482)]()){if(_0x29139f(0x1c8)===_0x29139f(0x28e)){const _0x5d3a37=_0x513df7[_0x1a896a[_0x29139f(0x878)][0x0]];if(_0x5d3a37&&this[_0x29139f(0x4ba)]<=0xa){this[_0x29139f(0x4ba)]++;let _0x1f31a3=_0x1c21e3[_0x29139f(0x4c0)][_0x29139f(0x54a)](_0x5d3a37[_0x29139f(0x74f)]);_0x1f31a3[_0x29139f(0x4e8)]>0x0&&(_0x436d2b+=_0x42e6db,_0x13221b+=_0x168ed4,_0xd330d0+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x29139f(0x83a)](_0x5d3a37['id'],_0x5d3a37['name']),_0x21945e+=_0x3b34f2,_0x58de88+=_0x1f31a3,_0x55fa02+=_0x51915f,_0x164c02+=_0x29139f(0x2d2)[_0x29139f(0x83a)](_0x5d3a37['id'],_0x5d3a37['name']),_0xaba454+=_0x2ba34a),this['_commonEventLayers']--;}}else this[_0x29139f(0x767)]();}else Window_Selectable[_0x29139f(0x387)][_0x29139f(0x6c2)]['call'](this);},Window_NumberInput[_0x347547(0x387)][_0x347547(0x192)]=function(){},Window_NumberInput[_0x347547(0x387)][_0x347547(0x767)]=function(){const _0x45caf7=_0x347547;if(String(this[_0x45caf7(0x7b8)])['length']>=this[_0x45caf7(0x29d)])return;const _0x40359b=Number(String(this[_0x45caf7(0x7b8)])+Input['_inputString']);if(isNaN(_0x40359b))return;this[_0x45caf7(0x7b8)]=_0x40359b;const _0x54f2ea='9'[_0x45caf7(0xcf)](this[_0x45caf7(0x29d)]);this[_0x45caf7(0x7b8)]=this[_0x45caf7(0x7b8)][_0x45caf7(0x2a2)](0x0,_0x54f2ea),Input[_0x45caf7(0x16b)](),this['refresh'](),SoundManager['playCursor'](),this[_0x45caf7(0x1f7)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x347547(0x8a3)]=function(){const _0x4cab3e=_0x347547;this[_0x4cab3e(0x7b8)]=Number(String(this[_0x4cab3e(0x7b8)])[_0x4cab3e(0x533)](0x0,-0x1)),this[_0x4cab3e(0x7b8)]=Math['max'](0x0,this[_0x4cab3e(0x7b8)]),Input['clear'](),this[_0x4cab3e(0x52a)](),SoundManager['playCursor'](),this[_0x4cab3e(0x1f7)](this[_0x4cab3e(0x29d)]-0x1);},Window_NumberInput[_0x347547(0x387)][_0x347547(0x7d1)]=function(){const _0x154164=_0x347547;this[_0x154164(0x7b8)]=Number(String(this['_number'])['substring'](0x1)),this[_0x154164(0x7b8)]=Math[_0x154164(0x545)](0x0,this['_number']),Input[_0x154164(0x16b)](),this['refresh'](),SoundManager[_0x154164(0x70a)](),this[_0x154164(0x1f7)](this[_0x154164(0x29d)]-0x1);});;Window_TitleCommand['_commandList']=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x521)],Window_TitleCommand[_0x347547(0x387)][_0x347547(0xfe)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x347547(0x387)][_0x347547(0x1b5)]=function(){const _0x1eb841=_0x347547;for(const _0x5b4917 of Window_TitleCommand[_0x1eb841(0x86c)]){if(_0x5b4917[_0x1eb841(0x531)][_0x1eb841(0x248)](this)){if('antrI'===_0x1eb841(0x5e6))this[_0x1eb841(0x3c3)]=_0x3fffc8,this[_0x1eb841(0x3c9)]=_0x52ea25;else{const _0x927ce7=_0x5b4917[_0x1eb841(0x316)];let _0x2bdf9b=_0x5b4917[_0x1eb841(0x704)];if(['',_0x1eb841(0x3a1)][_0x1eb841(0x4aa)](_0x2bdf9b))_0x2bdf9b=_0x5b4917[_0x1eb841(0x1c5)][_0x1eb841(0x248)](this);const _0x14606b=_0x5b4917[_0x1eb841(0x796)][_0x1eb841(0x248)](this),_0x137bab=_0x5b4917[_0x1eb841(0x155)]['call'](this);this['addCommand'](_0x2bdf9b,_0x927ce7,_0x14606b,_0x137bab),this[_0x1eb841(0x66a)](_0x927ce7,_0x5b4917[_0x1eb841(0x655)][_0x1eb841(0x49c)](this,_0x137bab));}}}},Window_GameEnd[_0x347547(0x86c)]=VisuMZ[_0x347547(0x4c0)][_0x347547(0x627)][_0x347547(0x3b8)][_0x347547(0x539)]['CommandList'],Window_GameEnd[_0x347547(0x387)][_0x347547(0xfe)]=function(){const _0x6d80f6=_0x347547;this[_0x6d80f6(0x1b5)]();},Window_GameEnd[_0x347547(0x387)]['makeCoreEngineCommandList']=function(){const _0x265004=_0x347547;for(const _0x313848 of Window_GameEnd[_0x265004(0x86c)]){if(_0x313848['ShowJS'][_0x265004(0x248)](this)){const _0xea67f4=_0x313848[_0x265004(0x316)];let _0x137191=_0x313848['TextStr'];if(['',_0x265004(0x3a1)][_0x265004(0x4aa)](_0x137191))_0x137191=_0x313848[_0x265004(0x1c5)][_0x265004(0x248)](this);const _0x4db36e=_0x313848[_0x265004(0x796)]['call'](this),_0x2b6207=_0x313848[_0x265004(0x155)][_0x265004(0x248)](this);this[_0x265004(0x8d6)](_0x137191,_0xea67f4,_0x4db36e,_0x2b6207),this[_0x265004(0x66a)](_0xea67f4,_0x313848[_0x265004(0x655)]['bind'](this,_0x2b6207));}}};function Window_ButtonAssist(){const _0x4dbbd2=_0x347547;this[_0x4dbbd2(0x6f3)](...arguments);}Window_ButtonAssist[_0x347547(0x387)]=Object[_0x347547(0x30e)](Window_Base[_0x347547(0x387)]),Window_ButtonAssist['prototype'][_0x347547(0x2ac)]=Window_ButtonAssist,Window_ButtonAssist[_0x347547(0x387)]['initialize']=function(_0x5744b7){const _0x297cd8=_0x347547;this[_0x297cd8(0x826)]={},Window_Base['prototype'][_0x297cd8(0x6f3)][_0x297cd8(0x248)](this,_0x5744b7),this[_0x297cd8(0x599)](VisuMZ[_0x297cd8(0x4c0)][_0x297cd8(0x627)]['ButtonAssist'][_0x297cd8(0x2b8)]||0x0),this[_0x297cd8(0x52a)]();},Window_ButtonAssist[_0x347547(0x387)][_0x347547(0x73c)]=function(){const _0x527d99=_0x347547;this['contents']['fontSize']<=0x60&&(this[_0x527d99(0x642)][_0x527d99(0x52b)]+=0x6);},Window_ButtonAssist[_0x347547(0x387)]['makeFontSmaller']=function(){const _0x4591da=_0x347547;this[_0x4591da(0x642)]['fontSize']>=0x18&&(this['contents'][_0x4591da(0x52b)]-=0x6);},Window_ButtonAssist[_0x347547(0x387)][_0x347547(0x864)]=function(){const _0x15d157=_0x347547;Window_Base['prototype'][_0x15d157(0x864)][_0x15d157(0x248)](this),this[_0x15d157(0x5f5)]();},Window_ButtonAssist[_0x347547(0x387)][_0x347547(0x272)]=function(){const _0x425d5b=_0x347547;this['padding']=SceneManager[_0x425d5b(0x709)][_0x425d5b(0x3b0)]()!==_0x425d5b(0x698)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x347547(0x5f5)]=function(){const _0x377568=_0x347547,_0x27c23a=SceneManager[_0x377568(0x709)];for(let _0x1e4eb6=0x1;_0x1e4eb6<=0x5;_0x1e4eb6++){if(this[_0x377568(0x826)]['key%1'[_0x377568(0x83a)](_0x1e4eb6)]!==_0x27c23a[_0x377568(0xcb)[_0x377568(0x83a)](_0x1e4eb6)]())return this[_0x377568(0x52a)]();if(this[_0x377568(0x826)][_0x377568(0x586)['format'](_0x1e4eb6)]!==_0x27c23a['buttonAssistText%1'[_0x377568(0x83a)](_0x1e4eb6)]())return this[_0x377568(0x52a)]();}},Window_ButtonAssist['prototype'][_0x347547(0x52a)]=function(){const _0x14b82d=_0x347547;this[_0x14b82d(0x642)][_0x14b82d(0x16b)]();for(let _0x5be442=0x1;_0x5be442<=0x5;_0x5be442++){this[_0x14b82d(0x6e3)](_0x5be442);}},Window_ButtonAssist[_0x347547(0x387)]['drawSegment']=function(_0xe3e84){const _0x2b9379=_0x347547,_0x282e90=this[_0x2b9379(0x897)]/0x5,_0x2aa340=SceneManager[_0x2b9379(0x709)],_0x4230ef=_0x2aa340[_0x2b9379(0xcb)[_0x2b9379(0x83a)](_0xe3e84)](),_0xc44fa5=_0x2aa340[_0x2b9379(0xcc)[_0x2b9379(0x83a)](_0xe3e84)]();this[_0x2b9379(0x826)][_0x2b9379(0x179)['format'](_0xe3e84)]=_0x4230ef,this[_0x2b9379(0x826)][_0x2b9379(0x586)[_0x2b9379(0x83a)](_0xe3e84)]=_0xc44fa5;if(_0x4230ef==='')return;if(_0xc44fa5==='')return;const _0x39c965=_0x2aa340['buttonAssistOffset%1'[_0x2b9379(0x83a)](_0xe3e84)](),_0x58d7b9=this['itemPadding'](),_0x33f00e=_0x282e90*(_0xe3e84-0x1)+_0x58d7b9+_0x39c965,_0x5d4f35=VisuMZ['CoreEngine']['Settings'][_0x2b9379(0x13e)][_0x2b9379(0x3e8)];this[_0x2b9379(0x200)](_0x5d4f35[_0x2b9379(0x83a)](_0x4230ef,_0xc44fa5),_0x33f00e,0x0,_0x282e90-_0x58d7b9*0x2);},VisuMZ['CoreEngine'][_0x347547(0x7e6)]=Game_Interpreter[_0x347547(0x387)][_0x347547(0x6d2)],Game_Interpreter[_0x347547(0x387)][_0x347547(0x6d2)]=function(){const _0x264f59=_0x347547;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x264f59(0x4c0)][_0x264f59(0x653)]();return VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode'][_0x264f59(0x248)](this);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x653)]=function(){const _0x22a143=_0x347547,_0x32448c=$gameTemp[_0x22a143(0x158)]||0x0;(_0x32448c<0x0||_0x32448c>0x64||TouchInput['isCancelled']()||Input[_0x22a143(0x62f)](_0x22a143(0x6fe)))&&('lPWon'===_0x22a143(0x792)?($gameTemp[_0x22a143(0x158)]=undefined,Input[_0x22a143(0x16b)](),TouchInput[_0x22a143(0x16b)]()):this[_0x22a143(0x767)]());const _0x3fd3e8=$gameScreen[_0x22a143(0x1b0)](_0x32448c);return _0x3fd3e8&&(_0x3fd3e8['_x']=TouchInput['_x'],_0x3fd3e8['_y']=TouchInput['_y']),VisuMZ[_0x22a143(0x4c0)]['updatePictureCoordinates'](),$gameTemp[_0x22a143(0x158)]!==undefined;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x544)]=function(){const _0x1ab19a=_0x347547,_0x46bea6=SceneManager['_scene'];if(!_0x46bea6)return;!_0x46bea6[_0x1ab19a(0x286)]&&(SoundManager['playLoad'](),_0x46bea6[_0x1ab19a(0x286)]=new Window_PictureCoordinates(),_0x46bea6[_0x1ab19a(0x6cf)](_0x46bea6[_0x1ab19a(0x286)]));if($gameTemp[_0x1ab19a(0x158)]===undefined){if('BiYnW'==='HZBfL')return _0x50bbb4[_0x1ab19a(0x4c0)][_0x1ab19a(0x627)][_0x1ab19a(0x4e9)]['RequireFocus']?_0x36eb1a[_0x1ab19a(0x4c0)][_0x1ab19a(0x8bb)][_0x1ab19a(0x248)](this):!![];else SoundManager['playCancel'](),_0x46bea6[_0x1ab19a(0x5c4)](_0x46bea6[_0x1ab19a(0x286)]),_0x46bea6['_pictureCoordinatesWindow']=undefined;}};function Window_PictureCoordinates(){const _0x344abf=_0x347547;this[_0x344abf(0x6f3)](...arguments);}Window_PictureCoordinates[_0x347547(0x387)]=Object[_0x347547(0x30e)](Window_Base[_0x347547(0x387)]),Window_PictureCoordinates[_0x347547(0x387)][_0x347547(0x2ac)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x347547(0x387)]['initialize']=function(){const _0x199b51=_0x347547;this[_0x199b51(0x434)]=_0x199b51(0x3b2),this[_0x199b51(0x437)]=_0x199b51(0x3b2),this[_0x199b51(0x2be)]='nah';const _0x4c5826=this[_0x199b51(0x10a)]();Window_Base['prototype'][_0x199b51(0x6f3)][_0x199b51(0x248)](this,_0x4c5826),this[_0x199b51(0x599)](0x2);},Window_PictureCoordinates['prototype']['windowRect']=function(){const _0x26e5bf=_0x347547;let _0x487f19=0x0,_0x501dce=Graphics[_0x26e5bf(0xe4)]-this[_0x26e5bf(0x3a9)](),_0x87e98a=Graphics[_0x26e5bf(0x4da)],_0x57fc63=this[_0x26e5bf(0x3a9)]();return new Rectangle(_0x487f19,_0x501dce,_0x87e98a,_0x57fc63);},Window_PictureCoordinates[_0x347547(0x387)]['updatePadding']=function(){const _0x297d12=_0x347547;this[_0x297d12(0x7a6)]=0x0;},Window_PictureCoordinates['prototype']['update']=function(){const _0x3b5ac0=_0x347547;Window_Base[_0x3b5ac0(0x387)][_0x3b5ac0(0x864)][_0x3b5ac0(0x248)](this),this[_0x3b5ac0(0x56b)]();},Window_PictureCoordinates['prototype'][_0x347547(0x56b)]=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates[_0x347547(0x387)][_0x347547(0x1b1)]=function(){const _0x351ea2=_0x347547,_0x341caf=$gameTemp[_0x351ea2(0x158)],_0x43c509=$gameScreen[_0x351ea2(0x1b0)](_0x341caf);return _0x43c509?this[_0x351ea2(0x434)]!==_0x43c509[_0x351ea2(0x563)]||this['_lastX']!==_0x43c509['_x']||this[_0x351ea2(0x2be)]!==_0x43c509['_y']:![];},Window_PictureCoordinates[_0x347547(0x387)][_0x347547(0x52a)]=function(){const _0x546768=_0x347547;this[_0x546768(0x642)][_0x546768(0x16b)]();const _0x411d43=$gameTemp[_0x546768(0x158)],_0x583b7f=$gameScreen['picture'](_0x411d43);if(!_0x583b7f)return;this[_0x546768(0x434)]=_0x583b7f[_0x546768(0x563)],this[_0x546768(0x437)]=_0x583b7f['_x'],this['_lastY']=_0x583b7f['_y'];const _0x5a60f4=ColorManager[_0x546768(0x43a)]();this[_0x546768(0x642)][_0x546768(0x7b3)](0x0,0x0,this[_0x546768(0x897)],this['innerHeight'],_0x5a60f4);const _0x3bb120=_0x546768(0xed)[_0x546768(0x83a)](_0x583b7f[_0x546768(0x563)]===0x0?_0x546768(0x1dc):_0x546768(0x320)),_0x4f4419=_0x546768(0x3d8)['format'](_0x583b7f['_x']),_0x5cf4f8='Y:\x20%1'[_0x546768(0x83a)](_0x583b7f['_y']),_0x31f7d9=_0x546768(0x736)[_0x546768(0x83a)](TextManager['getInputButtonString'](_0x546768(0x6fe)));let _0x57561b=Math[_0x546768(0x231)](this['innerWidth']/0x4);this[_0x546768(0x127)](_0x3bb120,_0x57561b*0x0,0x0,_0x57561b),this[_0x546768(0x127)](_0x4f4419,_0x57561b*0x1,0x0,_0x57561b,_0x546768(0x208)),this[_0x546768(0x127)](_0x5cf4f8,_0x57561b*0x2,0x0,_0x57561b,_0x546768(0x208));const _0x304470=this[_0x546768(0x51a)](_0x31f7d9)[_0x546768(0x4da)],_0x5f2f78=this['innerWidth']-_0x304470;this[_0x546768(0x200)](_0x31f7d9,_0x5f2f78,0x0,_0x304470);},VisuMZ[_0x347547(0x452)]=function(_0x4acbe6){const _0x232428=_0x347547;if(Utils[_0x232428(0x278)](_0x232428(0x62c))){if(_0x232428(0x7de)===_0x232428(0x7de)){var _0x3eba7a=require('nw.gui')[_0x232428(0x4ed)][_0x232428(0x12b)]();SceneManager[_0x232428(0x7f4)]();if(_0x4acbe6)setTimeout(_0x3eba7a['focus']['bind'](_0x3eba7a),0x190);}else this[_0x232428(0x38a)][_0x232428(0x599)](_0x3d56d5[_0x232428(0x649)]['GoldBgType']);}},VisuMZ['ApplyEasing']=function(_0x5172af,_0xd2eb5d){const _0x2199f1=_0x347547;_0xd2eb5d=_0xd2eb5d[_0x2199f1(0x173)]();var _0x3ce0c8=1.70158,_0x12193c=0.7;switch(_0xd2eb5d){case _0x2199f1(0x7c7):return _0x5172af;case _0x2199f1(0x714):return-0x1*Math[_0x2199f1(0x139)](_0x5172af*(Math['PI']/0x2))+0x1;case _0x2199f1(0x294):return Math['sin'](_0x5172af*(Math['PI']/0x2));case _0x2199f1(0x204):return-0.5*(Math[_0x2199f1(0x139)](Math['PI']*_0x5172af)-0x1);case _0x2199f1(0x54b):return _0x5172af*_0x5172af;case _0x2199f1(0x839):return _0x5172af*(0x2-_0x5172af);case'INOUTQUAD':return _0x5172af<0.5?0x2*_0x5172af*_0x5172af:-0x1+(0x4-0x2*_0x5172af)*_0x5172af;case _0x2199f1(0x572):return _0x5172af*_0x5172af*_0x5172af;case _0x2199f1(0x5e8):var _0x2e143a=_0x5172af-0x1;return _0x2e143a*_0x2e143a*_0x2e143a+0x1;case'INOUTCUBIC':return _0x5172af<0.5?0x4*_0x5172af*_0x5172af*_0x5172af:(_0x5172af-0x1)*(0x2*_0x5172af-0x2)*(0x2*_0x5172af-0x2)+0x1;case _0x2199f1(0x3b5):return _0x5172af*_0x5172af*_0x5172af*_0x5172af;case _0x2199f1(0x8d9):var _0x2e143a=_0x5172af-0x1;return 0x1-_0x2e143a*_0x2e143a*_0x2e143a*_0x2e143a;case _0x2199f1(0x6e0):var _0x2e143a=_0x5172af-0x1;return _0x5172af<0.5?0x8*_0x5172af*_0x5172af*_0x5172af*_0x5172af:0x1-0x8*_0x2e143a*_0x2e143a*_0x2e143a*_0x2e143a;case _0x2199f1(0x549):return _0x5172af*_0x5172af*_0x5172af*_0x5172af*_0x5172af;case'OUTQUINT':var _0x2e143a=_0x5172af-0x1;return 0x1+_0x2e143a*_0x2e143a*_0x2e143a*_0x2e143a*_0x2e143a;case _0x2199f1(0x569):var _0x2e143a=_0x5172af-0x1;return _0x5172af<0.5?0x10*_0x5172af*_0x5172af*_0x5172af*_0x5172af*_0x5172af:0x1+0x10*_0x2e143a*_0x2e143a*_0x2e143a*_0x2e143a*_0x2e143a;case _0x2199f1(0x646):if(_0x5172af===0x0)return 0x0;return Math[_0x2199f1(0x3a4)](0x2,0xa*(_0x5172af-0x1));case'OUTEXPO':if(_0x5172af===0x1){if(_0x2199f1(0x2a7)===_0x2199f1(0x64f))this[_0x2199f1(0x5b7)](_0x42f984);else return 0x1;}return-Math[_0x2199f1(0x3a4)](0x2,-0xa*_0x5172af)+0x1;case _0x2199f1(0x77f):if(_0x5172af===0x0||_0x5172af===0x1){if(_0x2199f1(0x555)!==_0x2199f1(0x555))this[_0x2199f1(0x46f)](_0x5a8bff['note']);else return _0x5172af;}var _0x2e121c=_0x5172af*0x2,_0x22318e=_0x2e121c-0x1;if(_0x2e121c<0x1)return _0x2199f1(0x49f)===_0x2199f1(0x78f)?_0x3f3a71[_0x2199f1(0x4c0)][_0x2199f1(0x627)]['Color'][_0x2199f1(0x1ae)]:0.5*Math['pow'](0x2,0xa*_0x22318e);return 0.5*(-Math['pow'](0x2,-0xa*_0x22318e)+0x2);case _0x2199f1(0x84d):var _0x2e121c=_0x5172af/0x1;return-0x1*(Math[_0x2199f1(0x1cf)](0x1-_0x2e121c*_0x5172af)-0x1);case'OUTCIRC':var _0x2e143a=_0x5172af-0x1;return Math[_0x2199f1(0x1cf)](0x1-_0x2e143a*_0x2e143a);case _0x2199f1(0x1bc):var _0x2e121c=_0x5172af*0x2,_0x22318e=_0x2e121c-0x2;if(_0x2e121c<0x1)return _0x2199f1(0x66f)!==_0x2199f1(0x66f)?_0x1df02b['CoreEngine'][_0x2199f1(0x627)]['Window'][_0x2199f1(0x224)]:-0.5*(Math[_0x2199f1(0x1cf)](0x1-_0x2e121c*_0x2e121c)-0x1);return 0.5*(Math['sqrt'](0x1-_0x22318e*_0x22318e)+0x1);case _0x2199f1(0x27e):return _0x5172af*_0x5172af*((_0x3ce0c8+0x1)*_0x5172af-_0x3ce0c8);case'OUTBACK':var _0x2e121c=_0x5172af/0x1-0x1;return _0x2e121c*_0x2e121c*((_0x3ce0c8+0x1)*_0x2e121c+_0x3ce0c8)+0x1;break;case _0x2199f1(0x4e6):var _0x2e121c=_0x5172af*0x2,_0x1b5f02=_0x2e121c-0x2,_0x596e05=_0x3ce0c8*1.525;if(_0x2e121c<0x1)return 0.5*_0x2e121c*_0x2e121c*((_0x596e05+0x1)*_0x2e121c-_0x596e05);return 0.5*(_0x1b5f02*_0x1b5f02*((_0x596e05+0x1)*_0x1b5f02+_0x596e05)+0x2);case _0x2199f1(0x78e):if(_0x5172af===0x0||_0x5172af===0x1)return _0x5172af;var _0x2e121c=_0x5172af/0x1,_0x22318e=_0x2e121c-0x1,_0x4ad758=0x1-_0x12193c,_0x596e05=_0x4ad758/(0x2*Math['PI'])*Math[_0x2199f1(0xd0)](0x1);return-(Math[_0x2199f1(0x3a4)](0x2,0xa*_0x22318e)*Math[_0x2199f1(0xd2)]((_0x22318e-_0x596e05)*(0x2*Math['PI'])/_0x4ad758));case _0x2199f1(0x2ee):var _0x4ad758=0x1-_0x12193c,_0x2e121c=_0x5172af*0x2;if(_0x5172af===0x0||_0x5172af===0x1)return _0x5172af;var _0x596e05=_0x4ad758/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x2199f1(0x3a4)](0x2,-0xa*_0x2e121c)*Math[_0x2199f1(0xd2)]((_0x2e121c-_0x596e05)*(0x2*Math['PI'])/_0x4ad758)+0x1;case _0x2199f1(0x142):var _0x4ad758=0x1-_0x12193c;if(_0x5172af===0x0||_0x5172af===0x1)return _0x5172af;var _0x2e121c=_0x5172af*0x2,_0x22318e=_0x2e121c-0x1,_0x596e05=_0x4ad758/(0x2*Math['PI'])*Math[_0x2199f1(0xd0)](0x1);if(_0x2e121c<0x1)return-0.5*(Math[_0x2199f1(0x3a4)](0x2,0xa*_0x22318e)*Math[_0x2199f1(0xd2)]((_0x22318e-_0x596e05)*(0x2*Math['PI'])/_0x4ad758));return Math[_0x2199f1(0x3a4)](0x2,-0xa*_0x22318e)*Math['sin']((_0x22318e-_0x596e05)*(0x2*Math['PI'])/_0x4ad758)*0.5+0x1;case _0x2199f1(0x322):var _0x2e121c=_0x5172af/0x1;if(_0x2e121c<0x1/2.75){if(_0x2199f1(0x8ca)===_0x2199f1(0x8ca))return 7.5625*_0x2e121c*_0x2e121c;else{const _0x523d20=this[_0x2199f1(0x766)](),_0x3b4d2b=this['_tempActor']['paramValueByName'](_0xe7c336),_0x270718=_0x3b4d2b-this[_0x2199f1(0x7e7)]['paramValueByName'](_0x6297ae);this['changeTextColor'](_0x268a00[_0x2199f1(0x814)](_0x270718)),this[_0x2199f1(0x127)](this[_0x2199f1(0x6aa)][_0x2199f1(0x56d)](_0x3eda26,!![]),_0x339ee4,_0x2ed4eb,_0x523d20,_0x2199f1(0x4b2));}}else{if(_0x2e121c<0x2/2.75){if('uQVdP'===_0x2199f1(0x3d4)){var _0x1b5f02=_0x2e121c-1.5/2.75;return 7.5625*_0x1b5f02*_0x1b5f02+0.75;}else return 7.5625*_0x281d9c*_0x36e25a;}else{if(_0x2e121c<2.5/2.75){if(_0x2199f1(0x4be)===_0x2199f1(0x562))return _0xe3286b[_0x2199f1(0x894)](_0x225bd7,'[',']');else{var _0x1b5f02=_0x2e121c-2.25/2.75;return 7.5625*_0x1b5f02*_0x1b5f02+0.9375;}}else{var _0x1b5f02=_0x2e121c-2.625/2.75;return 7.5625*_0x1b5f02*_0x1b5f02+0.984375;}}}case'INBOUNCE':var _0x120063=0x1-VisuMZ[_0x2199f1(0x24e)](0x1-_0x5172af,'outbounce');return _0x120063;case'INOUTBOUNCE':if(_0x5172af<0.5)var _0x120063=VisuMZ[_0x2199f1(0x24e)](_0x5172af*0x2,_0x2199f1(0x5a4))*0.5;else var _0x120063=VisuMZ[_0x2199f1(0x24e)](_0x5172af*0x2-0x1,_0x2199f1(0x3ca))*0.5+0.5;return _0x120063;default:return _0x5172af;}},VisuMZ[_0x347547(0x677)]=function(_0x19020a){const _0x2cca6e=_0x347547;_0x19020a=String(_0x19020a)[_0x2cca6e(0x173)]();const _0x544b8e=VisuMZ[_0x2cca6e(0x4c0)][_0x2cca6e(0x627)][_0x2cca6e(0x8a1)];if(_0x19020a===_0x2cca6e(0x2aa))return _0x544b8e[_0x2cca6e(0x5f4)];if(_0x19020a==='MAXMP')return _0x544b8e['IconParam1'];if(_0x19020a===_0x2cca6e(0x477))return _0x544b8e[_0x2cca6e(0x2d8)];if(_0x19020a===_0x2cca6e(0x7c4))return _0x544b8e[_0x2cca6e(0x86e)];if(_0x19020a===_0x2cca6e(0x6ce))return _0x544b8e[_0x2cca6e(0x1e0)];if(_0x19020a==='MDF')return _0x544b8e['IconParam5'];if(_0x19020a==='AGI')return _0x544b8e[_0x2cca6e(0xd3)];if(_0x19020a===_0x2cca6e(0x170))return _0x544b8e['IconParam7'];if(_0x19020a==='HIT')return _0x544b8e['IconXParam0'];if(_0x19020a==='EVA')return _0x544b8e['IconXParam1'];if(_0x19020a===_0x2cca6e(0x302))return _0x544b8e[_0x2cca6e(0x4c2)];if(_0x19020a==='CEV')return _0x544b8e['IconXParam3'];if(_0x19020a===_0x2cca6e(0x14f))return _0x544b8e[_0x2cca6e(0x609)];if(_0x19020a===_0x2cca6e(0x266))return _0x544b8e[_0x2cca6e(0x3e4)];if(_0x19020a===_0x2cca6e(0xfb))return _0x544b8e[_0x2cca6e(0x240)];if(_0x19020a===_0x2cca6e(0x543))return _0x544b8e[_0x2cca6e(0x7c9)];if(_0x19020a===_0x2cca6e(0x5f7))return _0x544b8e[_0x2cca6e(0x66c)];if(_0x19020a===_0x2cca6e(0x4e7))return _0x544b8e[_0x2cca6e(0x5dd)];if(_0x19020a===_0x2cca6e(0xfd))return _0x544b8e[_0x2cca6e(0x26d)];if(_0x19020a==='GRD')return _0x544b8e[_0x2cca6e(0x751)];if(_0x19020a==='REC')return _0x544b8e[_0x2cca6e(0x784)];if(_0x19020a===_0x2cca6e(0xd5))return _0x544b8e['IconSParam3'];if(_0x19020a===_0x2cca6e(0x2a0))return _0x544b8e['IconSParam4'];if(_0x19020a===_0x2cca6e(0x412))return _0x544b8e[_0x2cca6e(0xf8)];if(_0x19020a===_0x2cca6e(0xd9))return _0x544b8e[_0x2cca6e(0x3ae)];if(_0x19020a===_0x2cca6e(0x3a6))return _0x544b8e[_0x2cca6e(0x4ae)];if(_0x19020a==='FDR')return _0x544b8e[_0x2cca6e(0xce)];if(_0x19020a==='EXR')return _0x544b8e[_0x2cca6e(0x842)];if(VisuMZ[_0x2cca6e(0x4c0)]['CustomParamIcons'][_0x19020a]){if(_0x2cca6e(0x5fd)===_0x2cca6e(0x340)){if(!_0x3f55f2[_0x2cca6e(0x71c)]())return;if(!_0x2039eb[_0x2cca6e(0x6c5)]())return;if(!_0x353ccb)return;if(_0x1c3adb[_0x2cca6e(0x610)]()<=0x0)return;_0x13d2e2[_0x2cca6e(0x389)](_0x273a34,_0x2b239c);const _0x4bfb0f=_0x2cca6e(0x644)[_0x2cca6e(0x83a)](_0x3b0d2a[_0x2cca6e(0x610)]()[_0x2cca6e(0x667)](0x3)),_0xc9f859=_0x2d854d[_0x2cca6e(0x4c0)]['ExtractStrFromMap'](_0x24bf26['mapId']());_0x473665['CoreEngine'][_0x2cca6e(0x64c)](_0xc9f859,_0x4bfb0f,!![]);}else return VisuMZ[_0x2cca6e(0x4c0)][_0x2cca6e(0x2f4)][_0x19020a]||0x0;}return 0x0;},VisuMZ[_0x347547(0x214)]=function(_0x54d3a4,_0x31e1a9,_0x506a73){const _0x1753ed=_0x347547;if(_0x506a73===undefined&&_0x54d3a4%0x1===0x0)return _0x54d3a4;if(_0x506a73!==undefined&&[_0x1753ed(0x2aa),'MAXMP',_0x1753ed(0x477),'DEF','MAT','MDF','AGI',_0x1753ed(0x170)][_0x1753ed(0x4aa)](String(_0x506a73)['toUpperCase']()[_0x1753ed(0x85b)]()))return _0x54d3a4;_0x31e1a9=_0x31e1a9||0x0;if(VisuMZ[_0x1753ed(0x4c0)][_0x1753ed(0x212)][_0x506a73]){if(_0x1753ed(0x45d)!==_0x1753ed(0x27f)){if(VisuMZ[_0x1753ed(0x4c0)]['CustomParamType'][_0x506a73]==='integer'){if(_0x1753ed(0x52e)!==_0x1753ed(0x8d8))return _0x54d3a4;else this[_0x1753ed(0x3ce)](_0xd95257);}else{if(_0x1753ed(0x3a5)!==_0x1753ed(0x3a5)){var _0x55c36d=_0x554c42(_0x24217e['$1'])/0x64;_0x46dbcc*=_0x55c36d;}else return String((_0x54d3a4*0x64)['toFixed'](_0x31e1a9))+'%';}}else return this[_0x1753ed(0x6c0)]||this;}return String((_0x54d3a4*0x64)['toFixed'](_0x31e1a9))+'%';},VisuMZ[_0x347547(0x230)]=function(_0x1000e4){const _0x492df9=_0x347547;_0x1000e4=String(_0x1000e4);if(!_0x1000e4)return _0x1000e4;if(typeof _0x1000e4!==_0x492df9(0x247))return _0x1000e4;const _0x138b3e=VisuMZ[_0x492df9(0x4c0)][_0x492df9(0x627)]['QoL'][_0x492df9(0x189)]||'en-US',_0x1bf961={'maximumFractionDigits':0x6};_0x1000e4=_0x1000e4['replace'](/\[(.*?)\]/g,(_0xd0ff02,_0x2d49ea)=>{const _0x21be7d=_0x492df9;if('ySEFX'!==_0x21be7d(0x571))return VisuMZ[_0x21be7d(0x894)](_0x2d49ea,'[',']');else this[_0x21be7d(0x44b)]();}),_0x1000e4=_0x1000e4[_0x492df9(0x728)](/<(.*?)>/g,(_0x1aedf2,_0x1f9c1d)=>{return VisuMZ['PreserveNumbers'](_0x1f9c1d,'<','>');}),_0x1000e4=_0x1000e4[_0x492df9(0x728)](/\{\{(.*?)\}\}/g,(_0x2eb02a,_0x564773)=>{const _0x620bd1=_0x492df9;return VisuMZ[_0x620bd1(0x894)](_0x564773,'','');}),_0x1000e4=_0x1000e4[_0x492df9(0x728)](/(\d+\.?\d*)/g,(_0x495ec3,_0x455970)=>{const _0x1a9941=_0x492df9;if(_0x1a9941(0x65f)!==_0x1a9941(0x65f))return _0x42c4db;else{let _0x324a59=_0x455970;if(_0x324a59[0x0]==='0')return _0x324a59;if(_0x324a59[_0x324a59[_0x1a9941(0x4e8)]-0x1]==='.'){if('RUUGf'==='RUUGf')return Number(_0x324a59)[_0x1a9941(0x106)](_0x138b3e,_0x1bf961)+'.';else this[_0x1a9941(0x6bb)](_0x3c6237,_0x477c70,_0x2b6982,this['gaugeLineHeight']()),_0xbe115c-=this[_0x1a9941(0x11b)]()+0x2,_0x484f4e+=this[_0x1a9941(0x11b)]()+0x2;}else{if(_0x324a59[_0x324a59[_0x1a9941(0x4e8)]-0x1]===','){if(_0x1a9941(0x2c6)!==_0x1a9941(0x2c6))_0x3d851f['loadBitmap'](_0x4a14fb,_0x51844c);else return Number(_0x324a59)[_0x1a9941(0x106)](_0x138b3e,_0x1bf961)+',';}else return Number(_0x324a59)[_0x1a9941(0x106)](_0x138b3e,_0x1bf961);}}});let _0x5b3a46=0x3;while(_0x5b3a46--){if(_0x492df9(0x802)!=='PRmQw'){_0x2a162a[_0x492df9(0x4c0)][_0x492df9(0x41f)][_0x492df9(0x248)](this);if(this[_0x492df9(0x60b)])this[_0x492df9(0x60b)]--;}else _0x1000e4=VisuMZ['RevertPreserveNumbers'](_0x1000e4);}return _0x1000e4;},VisuMZ[_0x347547(0x894)]=function(_0x566434,_0x30206d,_0x428e44){const _0x31fff0=_0x347547;return _0x566434=_0x566434[_0x31fff0(0x728)](/(\d)/gi,(_0x239eb1,_0x2e9b9e)=>_0x31fff0(0x866)[_0x31fff0(0x83a)](Number(_0x2e9b9e))),_0x31fff0(0x463)[_0x31fff0(0x83a)](_0x566434,_0x30206d,_0x428e44);},VisuMZ[_0x347547(0x1d1)]=function(_0x24a64a){const _0x4947d2=_0x347547;return _0x24a64a=_0x24a64a[_0x4947d2(0x728)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x578620,_0x3d9dc0)=>Number(parseInt(_0x3d9dc0))),_0x24a64a;},VisuMZ[_0x347547(0x32d)]=function(_0x6c994d){const _0xd057ec=_0x347547;SoundManager[_0xd057ec(0x7aa)]();if(!Utils[_0xd057ec(0x6c5)]()){const _0x356f70=window['open'](_0x6c994d,_0xd057ec(0x5c3));}else{if('BCPil'===_0xd057ec(0x449))return this['isMapScrollLinked']()?this['yScrollLinkedOffset']():_0x58eeee['CoreEngine'][_0xd057ec(0x1e4)][_0xd057ec(0x248)](this);else{const _0x5b1182=process[_0xd057ec(0x500)]=='darwin'?_0xd057ec(0x46c):process[_0xd057ec(0x500)]=='win32'?'start':'xdg-open';require(_0xd057ec(0x5bb))['exec'](_0x5b1182+'\x20'+_0x6c994d);}}},Game_Picture[_0x347547(0x387)]['anchor']=function(){const _0x187cef=_0x347547;return this[_0x187cef(0x4ab)];},VisuMZ[_0x347547(0x4c0)][_0x347547(0x6df)]=Game_Picture[_0x347547(0x387)][_0x347547(0x465)],Game_Picture[_0x347547(0x387)][_0x347547(0x465)]=function(){const _0x271781=_0x347547;VisuMZ[_0x271781(0x4c0)][_0x271781(0x6df)]['call'](this),this[_0x271781(0x4ab)]={'x':0x0,'y':0x0},this[_0x271781(0x55a)]={'x':0x0,'y':0x0};},VisuMZ[_0x347547(0x4c0)][_0x347547(0x216)]=Game_Picture[_0x347547(0x387)][_0x347547(0x29f)],Game_Picture[_0x347547(0x387)][_0x347547(0x29f)]=function(){const _0x4b7ff4=_0x347547;this['updateAnchor']();const _0x541d00=this[_0x4b7ff4(0x14e)];VisuMZ[_0x4b7ff4(0x4c0)][_0x4b7ff4(0x216)]['call'](this);if(_0x541d00>0x0&&this[_0x4b7ff4(0x14e)]<=0x0){if('GtkTL'!==_0x4b7ff4(0x7e8))this['_x']=this['_targetX'],this['_y']=this[_0x4b7ff4(0x5c9)],this[_0x4b7ff4(0x1df)]=this[_0x4b7ff4(0x7b0)],this[_0x4b7ff4(0x862)]=this[_0x4b7ff4(0x5ed)],this[_0x4b7ff4(0x6cd)]=this[_0x4b7ff4(0xd6)],this[_0x4b7ff4(0x4ab)]&&(_0x4b7ff4(0x6ab)===_0x4b7ff4(0x6ab)?(this[_0x4b7ff4(0x4ab)]['x']=this[_0x4b7ff4(0x55a)]['x'],this['_anchor']['y']=this[_0x4b7ff4(0x55a)]['y']):this['cursorPagedown']());else return _0x2e923f[_0x4b7ff4(0x56e)](_0x4b7ff4(0x177),_0x4b7ff4(0x423));}},VisuMZ[_0x347547(0x4c0)][_0x347547(0x747)]=Game_Picture[_0x347547(0x387)][_0x347547(0x542)],Game_Picture[_0x347547(0x387)][_0x347547(0x542)]=function(_0x3854d3,_0x3b8b04,_0x3da650,_0x4ad149,_0x400d1b,_0x4b3529,_0x3b73d7,_0x26e070){const _0xca6c7b=_0x347547;VisuMZ[_0xca6c7b(0x4c0)][_0xca6c7b(0x747)][_0xca6c7b(0x248)](this,_0x3854d3,_0x3b8b04,_0x3da650,_0x4ad149,_0x400d1b,_0x4b3529,_0x3b73d7,_0x26e070),this[_0xca6c7b(0x4c1)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3b8b04]||{'x':0x0,'y':0x0});},VisuMZ[_0x347547(0x4c0)][_0x347547(0x1c0)]=Game_Picture['prototype'][_0x347547(0x2b0)],Game_Picture['prototype'][_0x347547(0x2b0)]=function(_0x561a11,_0x52cb58,_0x881bc0,_0x5ae6f0,_0x4e46ab,_0x39d98c,_0x14b94c,_0x3c75da,_0x1e0380){const _0x5efb2a=_0x347547;VisuMZ[_0x5efb2a(0x4c0)][_0x5efb2a(0x1c0)]['call'](this,_0x561a11,_0x52cb58,_0x881bc0,_0x5ae6f0,_0x4e46ab,_0x39d98c,_0x14b94c,_0x3c75da,_0x1e0380),this[_0x5efb2a(0x8c1)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x561a11]||{'x':0x0,'y':0x0});},Game_Picture[_0x347547(0x387)][_0x347547(0xf3)]=function(){const _0x108ed3=_0x347547;if(this['_duration']>0x0){if(_0x108ed3(0x775)===_0x108ed3(0x775))this[_0x108ed3(0x4ab)]['x']=this['applyEasing'](this[_0x108ed3(0x4ab)]['x'],this[_0x108ed3(0x55a)]['x']),this[_0x108ed3(0x4ab)]['y']=this['applyEasing'](this[_0x108ed3(0x4ab)]['y'],this[_0x108ed3(0x55a)]['y']);else{var _0x55dfda=_0x505d9c(_0x322526['$1']);try{_0x59cab6+=_0x498a2b(_0x55dfda);}catch(_0x307810){if(_0x3fd620[_0x108ed3(0x71c)]())_0x381db5['log'](_0x307810);}}}},Game_Picture['prototype'][_0x347547(0x4c1)]=function(_0x35de5b){const _0x804d9e=_0x347547;this[_0x804d9e(0x4ab)]=_0x35de5b,this[_0x804d9e(0x55a)]=JsonEx[_0x804d9e(0x1af)](this[_0x804d9e(0x4ab)]);},Game_Picture[_0x347547(0x387)]['setTargetAnchor']=function(_0x20c43f){this['_targetAnchor']=_0x20c43f;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x6dc)]=Sprite_Picture['prototype'][_0x347547(0x48a)],Sprite_Picture['prototype'][_0x347547(0x48a)]=function(){const _0x6e24f5=_0x347547,_0xe6409d=this[_0x6e24f5(0x1b0)]();if(!_0xe6409d['anchor']()){if(_0x6e24f5(0x28d)!==_0x6e24f5(0x28d)){if(this[_0x6e24f5(0x8b7)]===_0x4fd306)this[_0x6e24f5(0x3d2)]();if(this[_0x6e24f5(0x8b7)][_0x6e24f5(0x185)]===_0x4945be)this[_0x6e24f5(0x3d2)]();this['_CoreEngineSettings']['FontSize']=_0x5e23c2;}else VisuMZ['CoreEngine'][_0x6e24f5(0x6dc)][_0x6e24f5(0x248)](this);}else this[_0x6e24f5(0x5b2)]['x']=_0xe6409d[_0x6e24f5(0x5b2)]()['x'],this[_0x6e24f5(0x5b2)]['y']=_0xe6409d[_0x6e24f5(0x5b2)]()['y'];},Game_Action[_0x347547(0x387)][_0x347547(0x731)]=function(_0x1539fd){const _0x33fdce=_0x347547;if(_0x1539fd){if(_0x33fdce(0x410)===_0x33fdce(0x3de)){const _0x5cf160=_0x435487[_0x33fdce(0x4da)]-_0x60dd72[_0x33fdce(0x188)]-_0x3d9a87[_0x33fdce(0x4c0)]['Settings']['UI']['BoxMargin']*0x2,_0x2e3691=_0x49208e[_0x33fdce(0x387)][_0x33fdce(0x13c)][_0x33fdce(0x248)](this)*0x4;if(_0x5cf160>=_0x2e3691)_0x2424c2[_0x33fdce(0xf0)](!![]);}else{const _0x92c5f9=_0x1539fd[_0x33fdce(0x8be)];if(_0x92c5f9===0x1&&this[_0x33fdce(0x27a)]()[_0x33fdce(0x6e2)]()!==0x1)_0x33fdce(0x765)==='LHOOQ'?this[_0x33fdce(0x7cb)]():(this[_0x33fdce(0x8ad)]['x']!==0x0&&(this[_0x33fdce(0x5c8)][_0x33fdce(0x8ad)]['x']=0x1/this[_0x33fdce(0x8ad)]['x'],this[_0x33fdce(0x5c8)]['x']=-(this['x']/this[_0x33fdce(0x8ad)]['x'])),this[_0x33fdce(0x8ad)]['y']!==0x0&&(this[_0x33fdce(0x5c8)][_0x33fdce(0x8ad)]['y']=0x1/this[_0x33fdce(0x8ad)]['y'],this['_pictureContainer']['y']=-(this['y']/this['scale']['y'])));else _0x92c5f9===0x2&&this[_0x33fdce(0x27a)]()['guardSkillId']()!==0x2?_0x33fdce(0x4de)===_0x33fdce(0x1f4)?_0x1280b9=_0xafa0af(_0x5bd291['$1'])*_0x221f1a['width']:this[_0x33fdce(0x2dd)]():this[_0x33fdce(0x3ce)](_0x92c5f9);}}else'pArOz'!==_0x33fdce(0x3fb)?this[_0x33fdce(0x16b)]():_0x30c6cb=_0x548396['max'](_0xad55c7,_0xb5a09e(_0x406ab7(_0x887c07)));},Game_Actor[_0x347547(0x387)][_0x347547(0x674)]=function(){const _0xf09eb=_0x347547;return this['skills']()[_0xf09eb(0x1cb)](_0x3e18bb=>this['canUse'](_0x3e18bb)&&this[_0xf09eb(0x82d)]()[_0xf09eb(0x4aa)](_0x3e18bb[_0xf09eb(0x7eb)]));},Window_Base[_0x347547(0x387)][_0x347547(0x561)]=function(){const _0x39376b=_0x347547;this[_0x39376b(0x186)]=new Sprite(),this[_0x39376b(0x186)][_0x39376b(0x621)]=new Bitmap(0x0,0x0),this[_0x39376b(0x186)]['x']=0x0,this[_0x39376b(0x2d6)](this[_0x39376b(0x186)]);},Window_Base[_0x347547(0x387)][_0x347547(0x149)]=function(){const _0x54f1dd=_0x347547;if(this[_0x54f1dd(0x186)]){const _0x575086=this[_0x54f1dd(0x186)][_0x54f1dd(0x621)],_0x51e34d=this['width'],_0x361d2a=this[_0x54f1dd(0xe4)],_0x24af46=this['padding'],_0x54e290=ColorManager['dimColor1'](),_0x4c37ae=ColorManager['dimColor2']();_0x575086[_0x54f1dd(0x67c)](_0x51e34d,_0x361d2a),_0x575086[_0x54f1dd(0x16f)](0x0,0x0,_0x51e34d,_0x24af46,_0x4c37ae,_0x54e290,!![]),_0x575086['fillRect'](0x0,_0x24af46,_0x51e34d,_0x361d2a-_0x24af46*0x2,_0x54e290),_0x575086[_0x54f1dd(0x16f)](0x0,_0x361d2a-_0x24af46,_0x51e34d,_0x24af46,_0x54e290,_0x4c37ae,!![]),this[_0x54f1dd(0x186)][_0x54f1dd(0x63c)](0x0,0x0,_0x51e34d,_0x361d2a);}},Game_Actor[_0x347547(0x387)][_0x347547(0x546)]=function(){const _0x32391e=_0x347547;for(let _0x3d3e1d=0x0;_0x3d3e1d<this[_0x32391e(0x811)]();_0x3d3e1d++){if(_0x32391e(0x605)===_0x32391e(0x605)){const _0x4786f4=this[_0x32391e(0x2b1)]();let _0x387ca2=Number[_0x32391e(0x812)];this[_0x32391e(0x507)](_0x3d3e1d,_0x4786f4[0x0]);for(const _0x37f399 of _0x4786f4){const _0x2026ad=_0x37f399[_0x32391e(0x6b5)]();_0x2026ad>_0x387ca2&&(_0x387ca2=_0x2026ad,this[_0x32391e(0x507)](_0x3d3e1d,_0x37f399));}}else this[_0x32391e(0x38b)](_0x83eefd(_0xbb69d6['$1']));}this[_0x32391e(0x353)](_0x32391e(0x38c));},Window_BattleItem[_0x347547(0x387)][_0x347547(0x70d)]=function(_0x3fd187){const _0x328003=_0x347547;if(BattleManager[_0x328003(0x524)]()){if(_0x328003(0x21e)!==_0x328003(0x21e)){const _0x33cd19='_stored_mpGaugeColor1';this[_0x328003(0x287)]=this[_0x328003(0x287)]||{};if(this[_0x328003(0x287)][_0x33cd19])return this[_0x328003(0x287)][_0x33cd19];const _0x436bba=_0x48b61d[_0x328003(0x4c0)][_0x328003(0x627)]['Color']['ColorMPGauge1'];return this['getColorDataFromPluginParameters'](_0x33cd19,_0x436bba);}else return BattleManager[_0x328003(0x524)]()[_0x328003(0x782)](_0x3fd187);}else return Window_ItemList[_0x328003(0x387)][_0x328003(0x70d)][_0x328003(0x248)](this,_0x3fd187);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x6ef)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x347547(0x387)]['createSpriteset']=function(){const _0x14d5fa=_0x347547;VisuMZ['CoreEngine'][_0x14d5fa(0x6ef)]['call'](this);const _0x2c3af9=this[_0x14d5fa(0x421)]['_timerSprite'];if(_0x2c3af9)this[_0x14d5fa(0x6cf)](_0x2c3af9);},VisuMZ[_0x347547(0x4c0)][_0x347547(0x865)]=Scene_Battle[_0x347547(0x387)][_0x347547(0x196)],Scene_Battle[_0x347547(0x387)][_0x347547(0x196)]=function(){const _0x1b4e73=_0x347547;VisuMZ[_0x1b4e73(0x4c0)]['Scene_Battle_createSpriteset']['call'](this);const _0x32a936=this[_0x1b4e73(0x421)][_0x1b4e73(0x2ea)];if(_0x32a936)this[_0x1b4e73(0x6cf)](_0x32a936);},Sprite_Actor[_0x347547(0x387)][_0x347547(0x864)]=function(){const _0x2b176f=_0x347547;Sprite_Battler[_0x2b176f(0x387)][_0x2b176f(0x864)][_0x2b176f(0x248)](this),this[_0x2b176f(0x4ca)]();if(this[_0x2b176f(0x7e7)])this[_0x2b176f(0x116)]();else this['_battlerName']!==''&&(this[_0x2b176f(0x50f)]='');},Window[_0x347547(0x387)][_0x347547(0x7d5)]=function(){const _0x135a3f=_0x347547,_0x51813d=this[_0x135a3f(0xc8)],_0x185271=this[_0x135a3f(0x7b2)],_0xf904d3=0x18,_0x2c0c39=_0xf904d3/0x2,_0x20255c=0x60+_0xf904d3,_0x370776=0x0+_0xf904d3;this[_0x135a3f(0x886)][_0x135a3f(0x621)]=this[_0x135a3f(0x347)],this['_downArrowSprite'][_0x135a3f(0x5b2)]['x']=0.5,this[_0x135a3f(0x886)][_0x135a3f(0x5b2)]['y']=0.5,this['_downArrowSprite'][_0x135a3f(0x63c)](_0x20255c+_0x2c0c39,_0x370776+_0x2c0c39+_0xf904d3,_0xf904d3,_0x2c0c39),this['_downArrowSprite'][_0x135a3f(0x2b0)](Math['round'](_0x51813d/0x2),Math[_0x135a3f(0x22b)](_0x185271-_0x2c0c39)),this[_0x135a3f(0x112)]['bitmap']=this['_windowskin'],this[_0x135a3f(0x112)][_0x135a3f(0x5b2)]['x']=0.5,this[_0x135a3f(0x112)][_0x135a3f(0x5b2)]['y']=0.5,this[_0x135a3f(0x112)][_0x135a3f(0x63c)](_0x20255c+_0x2c0c39,_0x370776,_0xf904d3,_0x2c0c39),this[_0x135a3f(0x112)][_0x135a3f(0x2b0)](Math[_0x135a3f(0x22b)](_0x51813d/0x2),Math['round'](_0x2c0c39));},Window['prototype']['_refreshPauseSign']=function(){const _0x4b96ff=_0x347547,_0x38144d=0x90,_0x1c253a=0x60,_0x4174df=0x18;this[_0x4b96ff(0x1d0)][_0x4b96ff(0x621)]=this[_0x4b96ff(0x347)],this[_0x4b96ff(0x1d0)][_0x4b96ff(0x5b2)]['x']=0.5,this['_pauseSignSprite'][_0x4b96ff(0x5b2)]['y']=0x1,this[_0x4b96ff(0x1d0)]['move'](Math[_0x4b96ff(0x22b)](this['_width']/0x2),this[_0x4b96ff(0x7b2)]),this[_0x4b96ff(0x1d0)]['setFrame'](_0x38144d,_0x1c253a,_0x4174df,_0x4174df),this[_0x4b96ff(0x1d0)]['alpha']=0xff;},Window[_0x347547(0x387)]['_updateFilterArea']=function(){const _0x3f8f13=_0x347547,_0x454c73=this[_0x3f8f13(0x460)][_0x3f8f13(0x35e)][_0x3f8f13(0x20c)](new Point(0x0,0x0)),_0x233fed=this[_0x3f8f13(0x460)]['filterArea'];_0x233fed['x']=_0x454c73['x']+this['origin']['x'],_0x233fed['y']=_0x454c73['y']+this[_0x3f8f13(0x86d)]['y'],_0x233fed[_0x3f8f13(0x4da)]=Math[_0x3f8f13(0x424)](this[_0x3f8f13(0x897)]*this[_0x3f8f13(0x8ad)]['x']),_0x233fed['height']=Math['ceil'](this['innerHeight']*this[_0x3f8f13(0x8ad)]['y']);},Window['prototype'][_0x347547(0x271)]=function(){const _0xda75b1=_0x347547,_0x4c2257=this[_0xda75b1(0x620)],_0x497275=Math[_0xda75b1(0x545)](0x0,this['_width']-_0x4c2257*0x2),_0x365266=Math[_0xda75b1(0x545)](0x0,this[_0xda75b1(0x7b2)]-_0x4c2257*0x2),_0x2447bf=this[_0xda75b1(0x760)],_0xa906ca=_0x2447bf['children'][0x0];_0x2447bf[_0xda75b1(0x621)]=this[_0xda75b1(0x347)],_0x2447bf[_0xda75b1(0x63c)](0x0,0x0,0x60,0x60),_0x2447bf[_0xda75b1(0x2b0)](_0x4c2257,_0x4c2257),_0x2447bf[_0xda75b1(0x8ad)]['x']=_0x497275/0x60,_0x2447bf[_0xda75b1(0x8ad)]['y']=_0x365266/0x60,_0xa906ca['bitmap']=this[_0xda75b1(0x347)],_0xa906ca[_0xda75b1(0x63c)](0x0,0x60,0x60,0x60),_0xa906ca[_0xda75b1(0x2b0)](0x0,0x0,_0x497275,_0x365266),_0xa906ca[_0xda75b1(0x8ad)]['x']=0x1/_0x2447bf[_0xda75b1(0x8ad)]['x'],_0xa906ca[_0xda75b1(0x8ad)]['y']=0x1/_0x2447bf[_0xda75b1(0x8ad)]['y'],_0x2447bf[_0xda75b1(0x6ae)](this[_0xda75b1(0x7cf)]);},Game_Temp[_0x347547(0x387)]['sceneTerminationClearEffects']=function(){const _0x22c19b=_0x347547;this[_0x22c19b(0x71e)]=[],this[_0x22c19b(0x439)]=[],this[_0x22c19b(0x2f7)]=[],this[_0x22c19b(0x331)]=[];},VisuMZ['CoreEngine'][_0x347547(0x18f)]=Scene_Base[_0x347547(0x387)]['terminate'],Scene_Base[_0x347547(0x387)]['terminate']=function(){const _0x1148e0=_0x347547;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x1148e0(0x4c0)][_0x1148e0(0x18f)][_0x1148e0(0x248)](this);},Bitmap[_0x347547(0x387)]['measureTextWidthNoRounding']=function(_0x4a4e83){const _0x27bd67=_0x347547,_0x2df385=this[_0x27bd67(0x552)];_0x2df385[_0x27bd67(0x20a)](),_0x2df385['font']=this[_0x27bd67(0x639)]();const _0x1d606e=_0x2df385[_0x27bd67(0x3f9)](_0x4a4e83)[_0x27bd67(0x4da)];return _0x2df385[_0x27bd67(0x39e)](),_0x1d606e;},Window_Message[_0x347547(0x387)][_0x347547(0x7c1)]=function(_0x154bb8){const _0x588bd3=_0x347547;if(this[_0x588bd3(0x3ab)]()){if('ZbfqH'!==_0x588bd3(0x6c4))return this[_0x588bd3(0x642)]['measureTextWidthNoRounding'](_0x154bb8);else this['opacity']=0xff;}else return Window_Base[_0x588bd3(0x387)][_0x588bd3(0x7c1)][_0x588bd3(0x248)](this,_0x154bb8);},Window_Message[_0x347547(0x387)][_0x347547(0x3ab)]=function(){const _0x4eb919=_0x347547;return VisuMZ[_0x4eb919(0x4c0)][_0x4eb919(0x627)]['QoL'][_0x4eb919(0x28f)]??!![];},VisuMZ['CoreEngine']['Game_Action_numRepeats']=Game_Action[_0x347547(0x387)][_0x347547(0x168)],Game_Action[_0x347547(0x387)][_0x347547(0x168)]=function(){const _0x65911d=_0x347547;if(this[_0x65911d(0x63f)]()){if('CvOcQ'===_0x65911d(0x1b3)){if(this[_0x65911d(0x535)]===_0x356d13)this['initCoreEngineScreenShake']();this[_0x65911d(0x535)]=_0x3cdd88[_0x65911d(0x181)]()[_0x65911d(0x85b)]();}else return VisuMZ[_0x65911d(0x4c0)]['Game_Action_numRepeats'][_0x65911d(0x248)](this);}else return 0x0;},VisuMZ[_0x347547(0x4c0)][_0x347547(0x3fa)]=Game_Action[_0x347547(0x387)][_0x347547(0x7cb)],Game_Action[_0x347547(0x387)][_0x347547(0x7cb)]=function(){const _0x40bdb=_0x347547;this['subject']()&&this[_0x40bdb(0x27a)]()[_0x40bdb(0xe9)]()?VisuMZ[_0x40bdb(0x4c0)][_0x40bdb(0x3fa)][_0x40bdb(0x248)](this):this['clear']();};