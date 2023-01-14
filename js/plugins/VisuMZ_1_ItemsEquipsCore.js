//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.35] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x18a61c=_0x4d2c;function _0x4d2c(_0x386bb2,_0x56b9de){const _0x3d0bcb=_0x3d0b();return _0x4d2c=function(_0x4d2cb6,_0x1eb649){_0x4d2cb6=_0x4d2cb6-0x185;let _0xc31886=_0x3d0bcb[_0x4d2cb6];return _0xc31886;},_0x4d2c(_0x386bb2,_0x56b9de);}(function(_0x5009f2,_0x18c31b){const _0x5f4da8=_0x4d2c,_0x2de5fb=_0x5009f2();while(!![]){try{const _0x56b0ac=-parseInt(_0x5f4da8(0x4d5))/0x1*(-parseInt(_0x5f4da8(0x204))/0x2)+-parseInt(_0x5f4da8(0x263))/0x3+-parseInt(_0x5f4da8(0x5b2))/0x4+-parseInt(_0x5f4da8(0x402))/0x5+-parseInt(_0x5f4da8(0x5b7))/0x6+-parseInt(_0x5f4da8(0x409))/0x7+parseInt(_0x5f4da8(0x432))/0x8*(parseInt(_0x5f4da8(0x2e2))/0x9);if(_0x56b0ac===_0x18c31b)break;else _0x2de5fb['push'](_0x2de5fb['shift']());}catch(_0x230c76){_0x2de5fb['push'](_0x2de5fb['shift']());}}}(_0x3d0b,0x52edc));function _0x3d0b(){const _0x162065=['actor','deactivate','param','versionId','value2','oYmwB','commandNameWindowDrawBackground','onMenuImageLoad','getItemOccasionText','zAHme','getColor','top','drawItemEffectsAddedStatesBuffs','onSellOkItemsEquipsCore','xcizf','KmepP','Scope%1','Window_ShopBuy_refresh','format','ParseWeaponNotetags','log','oLLgO','MDF','getInputMultiButtonStrings','drawParamText','_shopStatusMenuMode','getItemEffectsAddedStatesBuffsText','onTouchSelectModernControls','TextAlign','rkpvk','PsCtq','PNrWe','clamp','zCxBS','Scene_Item_helpWindowRect','goldWindowRect','UwTnT','_categoryNameWindow','activate','addEquipCommand','prepareItemCustomData','Scene_Shop_create','isDualWield','commandBuyItemsEquipsCore','Window_EquipItem_isEnabled','sellWindowRect','Window_Selectable_setHelpWindowItem','Game_Actor_forceChangeEquip','DrawItemData','yDDLJ','drawItemDamageAmount','Scene_Equip_commandEquip','PncZs','Speed0','LabelRecoverTP','createCommandNameWindow','setTempActor','ODmgG','fill','LWQqg','Window_ShopCommand_initialize','ItemMenuStatusBgType','LayoutStyle','_statusWindow','isHovered','egAKe','IconSet','Scene_Equip_create','buttonAssistSlotWindowShift','atk','yprJY','wrefW','1847288oKlorg','maxVisibleItems','PAAzj','MKAFD','itemEnableJS','1140360mrQWHp','_data','Speed2000','bIIrW','iykaW','jBObu','_tempActorA','wffKM','KwGJq','QsVOF','isEquipCommandAdded','tradeItemWithParty','SellPriceJS','rDDtq','njrgy','MP\x20DAMAGE','addLoadListener','hide','cursorRight','createCategoryNameWindow','drawItemEffectsHpDamage','cursorPageup','_goodsCount','BgfTn','dCimG','onSlotOkAutoSelect','RyzBc','Scene_Equip_statusWindowRect','Scene_Shop_onSellCancel','REPEAT','isShiftShortcutKeyForRemove','nwvER','Scene_Boot_onDatabaseLoaded','JohKG','SyVNj','actorParams','atypeId','ldlyy','MrAHm','QoL','activateItemWindow','STRUCT','occasion','_buyWindow','getItemEffectsHpRecoveryText','buttonAssistRemove','itemPadding','down','categories','allowShiftScrolling','setHandler','drawItemDarkRect','getItemEffectsTpRecoveryLabel','push','nNNuS','VisuMZ_1_BattleCore','Scene_Shop_buyWindowRect','QRroQ','knnwI','values','FoIoX','xfBzk','yjfZV','description','getItemConsumableLabel','xUWXu','commandEquip','Categories','Game_BattlerBase_param','isPlaytest','USFbI','MAT','Scene_Item_createCategoryWindow','drawItemActorMenuImage','battleMembers','contentsBack','prepareNewEquipSlotsOnLoad','addChild','ZESbp','hYwPP','jevWQ','right','buyWindowRect','VisuMZ_1_MainMenuCore','DrawPortraitJS','getItemEffectsSelfTpGainLabel','optimize','YOZoo','etypeId','GHyDO','(%1)','isSellCommandEnabled','pop','ItemQuantityFontSize','Parse_Notetags_EquipSlots','Translucent','mainCommandWidth','isRepeated','rateMP','isArmor','Scene_Shop_onBuyCancel','Parse_Notetags_Batch','SjuyE','sAsoE','HOyyH','createSlotWindow','xogwN','possession','AHUmk','Window_EquipItem_includes','flatHP','cursorPagedown','Damage\x20Formula\x20Error\x20for\x20%1','getItemEffectsTpRecoveryText','adjustItemWidthByStatus','AllItems','Scene_Shop_createCategoryWindow','statusWindowRect','xeRGT','DScIj','calcWindowHeight','sUFJj','NIvUr','hideAdditionalSprites','changeBuff','_commandWindow','drawItemDamageElement','create','getItemEffectsHpDamageLabel','fontSizeRatio','SwitchBuy','HP\x20RECOVERY','ScUxJ','Game_Party_initialize','LYuGp','MultiplierStandard','select','fMkQT','onSellOk','%1-%2','createNewLabelSprite','wJUkj','AZwfU','canShiftRemoveEquipment','mvPYm','cursorUp','CmdStyle','OWLoL','gaugeLineHeight','OnAww','Step1Start','addClearCommand','categoryNameWindowDrawText','buttonAssistSmallIncrement','setShopStatusWindowMode','onTouchOk','updateHelp','EquipScene','_resetFontColor','elements','GJeMU','pszXj','QIaxW','nqpUB','iconHeight','LabelRepeats','getItemEffectsAddedStatesBuffsLabel','height','USER\x20TP\x20GAIN','nonRemovableEtypes','bxajW','tinLY','tiImT','addSellCommand','Window_ItemList_maxCols','Scene_Shop_sellingPrice','colSpacing','postCreateCategoryWindowItemsEquipsCore','helpAreaHeight','updatedLayoutStyle','width','KGSNm','SISGO','NUM','getItemSuccessRateText','removeBuff','drawItemEffectsSelfTpGain','doRux','isUseModernControls','LjBjA','getItemHitTypeText','isDrawItemNumber','SMfSn','isBuyCommandEnabled','prototype','drawItemStyleIconText','canEquip','lexrk','floor','BvnyS','mainAreaHeight','drawNewLabelIcon','flatMP','ParseArmorNotetags','getItemEffectsTpDamageLabel','mJRch','drawActorParamDifference','active','uAkjP','drawEquipData','HiddenItemB','134sXVVWO','ErieV','isUseItemsEquipsCoreUpdatedLayout','numberWindowRect','boxWidth','Scene_Item_createItemWindow','makeDeepCopy','fbzgI','Window_Selectable_initialize','isCommandEnabled','onSlotOk','ceil','auto','updateCategoryNameWindow','UbfSE','Scene_ItemBase_activateItemWindow','type','SpeedNeg2000','isEquipItem','ZHBRB','indexOf','CoreEngine','wnMDn','fillRect','processShiftRemoveShortcut','kUlRx','drawTextEx','CusPW','_newLabelSprites','_newLabelOpacity','Window_ShopBuy_price','drawNewLabelText','statusWindowRectItemsEquipsCore','formula','jWgeQ','KdoMQ','clearNewItem','sellingPrice','vamnd','gIJdw','process_VisuMZ_ItemsEquipsCore_Notetags','isEquipped','drawItemEffectsHpRecovery','processHandling','RuuOf','_itemWindow','setupItemDamageTempActors','HIT\x20TYPE','exit','_commandNameWindow','Window_EquipCommand_initialize','equipSlots','refreshCursor','ParseAllNotetags','drawPossession','drawItemSuccessRate','match','_bypassReleaseUnequippableItemsItemsEquipsCore','determineBaseSellingPrice','split','UcwOl','smoothScrollTo','elementId','Param','sellPriceRate','setBackgroundType','isCancelled','_buttonAssistWindow','drawItem','drawCustomShopGraphicLoad','Window_ItemList_drawItem','LgKxU','CmdIconEquip','drawItemCustomEntries','YYKuQ','isNewItem','baseSellingPrice','getItemEffectsRemovedStatesBuffsLabel','drawUpdatedParamValueDiff','wtypeId','ItemsEquipsCore','process_VisuMZ_ItemsEquipsCore_EquipSlots','tpGain','isSoleWeaponType','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','_calculatingJSParameters','MP\x20RECOVERY','isBottomHelpMode','onActorChange','DrawFaceJS','gVfHL','hAWzg','jAvgh','FontColor','cJMcM','1128540cGMkdC','zafNn','bind','Actors','setItemWindow','textSizeEx','smoothSelect','OMyYV','maxCols','Scene_Item_create','CmdIconCancel','UeyOj','cjixp','buttonAssistText1','drawRemoveItem','cursorLeft','gnlVw','addBuyCommand','ARRAYSTR','NoChangeMarker','discardEquip','ItemMenuStatusRect','drawItemOccasion','ElementWeapon','round','addState','processDrawIcon','Scene_Shop_commandSell','addStateBuffChanges','getDamageStyle','icon','AMOCS','addOptimizeCommand','FieldUsable','Scene_Shop_commandBuy','armor-%1','fontFace','WiBVc','clearEquipments','SpeedNeg1999','shift','processCursorHomeEndTrigger','drawItemCost','mXXyL','clear','isItem','_category','getItemColor','getItemEffectsMpRecoveryText','keyItem','ZrGTi','TNSJP','splice','RwiYr','canUse','enMJQ','ZiBfo','LabelSuccessRate','equipTypes','changeTextColor','NuKhD','Scene_Shop_activateSellWindow','LabelRemove','releaseUnequippableItems','EFFECT_REMOVE_STATE','drawText','commandBuy','getTextColor','MaxMP','ElementNone','BVdTC','numItems','resetFontSettings','nonOptimizeEtypes','_list','FontSize','Game_Actor_discardEquip','ConvertNumberToString','aKwMH','MwOpu','meetsItemConditionsNotetags','_newLabelOpacityUpperLimit','ParamValueFontSize','getItemEffectsMpDamageLabel','Enable','MaxArmors','DrawIcons','Window_ItemList_updateHelp','categoryNameWindowDrawBackground','buttonAssistKey2','uiMenuStyle','setValue','VisuMZ_0_CoreEngine','commandNameWindowCenter','_tempActor','isCursorMovable','commandStyle','_actor','checkShiftRemoveShortcut','createItemWindow','textColor','BSsIi','iconText','Scene_Shop_helpWindowRect','TP\x20RECOVERY','windowPadding','EquipAdjustHpMp','onTouchSelect','JxbFl','Scene_Equip_commandWindowRect','_sellWindow','currentClass','ARRAYFUNC','onSlotCancel','allowCreateStatusWindow','EnableLayout','parse','_tempActorB','isOpenAndActive','isOptimizeCommandAdded','middle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_slotId','IncludeShopItem','convertInitEquipsToItems','ItemSceneAdjustItemList','MJDQR','149688YNEQzW','HP\x20DAMAGE','updateNewLabelOpacity','woqFq','Style','helpAreaTop','TfvCG','xAeGI','Window_ItemCategory_initialize','CONSUMABLE','DrawBackRect','toLowerCase','qawnx','UFMWs','0000','YwzKe','UWIIZ','kVJuL','return\x200','paramValueByName','LabelSelfGainTP','itemWindowRectItemsEquipsCore','placeNewLabel','Window_EquipStatus_refresh','kKdso','meetsItemConditions','klPMJ','CommandAddClear','?????','bDWbp','LrmCs','canConsumeItem','getItemScopeText','makeItemData','TP\x20DAMAGE','FontFace','EDaWT','DrawParamJS','MIbsl','weapon','getItemRepeatsLabel','processCursorSpecialCheckModernControls','drawItemEquipType','Luzbi','yerxp','Parse_Notetags_ParamJS','RegularItems','innerHeight','filter','drawParamName','updateCommandNameWindow','remove','paramchangeTextColor','dRVPK','ItemQuantityFmt','Fovcu','nextActor','Drevm','lJwaK','Scene_Equip_onSlotCancel','NonRemoveETypes','ShiftShortcutKey','setHelpWindowItem','addItemCategory','(+%1)','OCCASION','background','isClicked','resetShopSwitches','drawItemEffectsTpRecovery','_itemData','isHandled','bitmap','Scene_Shop_goldWindowRect','center','buttonAssistKey3','ARRAYNUM','hitType','loadFaceImages','ShopScene','powerDownColor','HitType%1','defaultItemMax','IBbLT','equip','NkWbh','getItemSpeedLabel','Text','+%1%','Scene_Equip_onActorChange','MANUAL','drawItemSpeed','pagedown','MaxHP','allowCommandWindowCursorUp','CvsLI','drawItemRepeats','forceChangeEquip','getInputButtonString','makeCommandList','addCommand','KMQly','replace','getItemsEquipsCoreBackColor2','dataId','ZILJf','maxItemAmount','removeDebuff','Scene_Shop_doSell','isPressed','weaponTypes','DEF','Speed1','AbEAn','Scene_Equip_onSlotOk','vuTQj','Occasion%1','drawItemNumber','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','contents','_item','uiHelpPosition','getItemDamageElementLabel','AAYzb','drawItemName','drawCurrencyValue','_slotWindow','iconWidth','New','_equips','createSellWindow','addCancelCommand','includes','_resetFontSize','commandWindowRectItemsEquipsCore','PQNQN','numberWindowRectItemsEquipsCore','qqtvT','price','ConvertParams','callUpdateHelp','kHeSL','scope','hideDisabledCommands','Icon','uAKYp','buttonAssistCategory','modifiedBuyPriceItemsEquipsCore','weapon-%1','GZszU','buy','JXhrb','rtNAH','getItemSuccessRateLabel','vMGDN','Game_Party_gainItem','isBattleTest','Jqogh','meetsItemConditionsJS','setObject','AllWeapons','sell','dCJff','Window_Selectable_refresh','HHKNf','TsDfY','ImzbT','qGDjv','isHoverEnabled','LabelRecoverMP','SUCCESS\x20RATE','_handlers','rateHP','limitedPageUpDownSceneCheck','equipSlotIndex','equips','LabelSpeed','Wgtjp','itemHasEquipLimit','NeverUsable','processTouchModernControls','playOkSound','100%','SwitchSell','ljzHx','HiddenItemA','FYyai','mhp','MaxItems','nJQzF','Window_ItemCategory_setItemWindow','prepare','params','AGI','commandWindowRect','drawActorCharacter','addWindow','×%1','itemDataFontSize','trim','zGFEQ','updateChangedSlots','_bypassNewLabel','toUpperCase','ofGZP','QEAWF','hitIndex','Scene_Shop_statusWindowRect','ARRAYEVAL','LabelDamageTP','ejnSe','paramValueFontSize','CommandAddOptimize','isWeapon','postCreateSlotWindowItemsEquipsCore','playCursorSound','textWidth','Consumable','EquipParams','text','BTXdI','LkLnm','helpWindowRectItemsEquipsCore','Step2End','damageColor','wuxbx','categoryStyle','version','left','Step1End','commandSell','opacity','BxFlZ','_buyWindowLastIndex','categoryNameWindowCenter','BZDZO','Scene_Shop_prepare','GjwQd','gaugeBackColor','\x5cb%1\x5cb','cVPyb','pSeyn','getItemEffectsMpDamageText','_newLabelOpacityChange','uoFFS','Parse_Notetags_ParamValues','postCreateItemsEquipsCore','_money','zRWkq','KeyItemProtect','rykFq','Scene_Load_reloadMapIfUpdated','_purchaseOnly','iconIndex','zIWQq','bSupB','activateSellWindow','buttonAssistKey1','drawItemConsumable','CmdIconBuy','XWghs','getItemEffectsHpDamageText','rXypw','onCategoryOk','vpQVY','cursorDown','hpcJc','categoryList','drawItemDamage','Type','blt','clearNewLabelFromItem','Parse_Notetags_Prices','onCategoryCancelItemsEquipsCore','successRate','commandSellItemsEquipsCore','goldWindowRectItemsEquipsCore','EFFECT_RECOVER_MP','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','length','PurchaseOnly','updateMoneyAmount','adjustHiddenShownGoods','sSrIX','normalColor','yenOs','NfaJJ','Step3Start','2601220qrkjtU','isTriggered','map','wcAgt','suGRd','Scene_Shop_sellWindowRect','setMp','1123360pUbioa','gyQWc','removeStateBuffChanges','isEnabled','xOkoZ','selfTP','placeItemNewLabel','+%1','KhHLX','buttonAssistOffset3','_shopStatusMenuAlly','isOpen','mainAreaTop','qkjtq','buyWindowRectItemsEquipsCore','kxNUV','\x5cI[%1]','xFOlL','Game_Actor_tradeItemWithParty','GRbwn','slotWindowRect','setTopRow','Game_BattlerBase_meetsItemConditions','drawItemData','JQthr','WFkHY','item','_scene','ZyScH','cancel','reloadMapIfUpdated','systemColor','tSigP','commandName','Window_Selectable_update','isMainMenuCoreMenuImageOptionAvailable','getItemEffectsSelfTpGainText','equip2','wBGaz','buttonAssistText2','categoryWindowRect','672gRFOMZ','previousActor','buttonAssistText3','itemLineRect','LUK','onBuyCancelItemsEquipsCore','VDJwl','drawIcon','etKeD','nIfFL','sellWindowRectItemsEquipsCore','isUseParamNamesWithIcons','Gkcvq','OLPjl','paramJS','MaxWeapons','geUpdatedLayoutStatusWidth','addInnerChild','visible','getItemSpeedText','optKeyItemsNumber','note','getMatchingInitEquip','getItemEffectsTpDamageText','loadCharacter','vJHwn','getItemQuantityText','CmdIconClear','oyZGi','FBqEM','rwMcq','ATK','isSoleArmorType','FadeSpeed','ShPZQ','getItemRepeatsText','initNewLabelSprites','money','NonOptimizeETypes','StatusWindowWidth','pLpax','hEpHt','checkItemConditionsSwitchNotetags','REMOVED\x20EFFECTS','show','BorderRegExp','onBuyCancel','_doubleTouch','powerUpColor','_customItemInfo','gainItem','getItemDamageAmountText','hpRate','getItemEffects','Game_Actor_changeEquip','Window_ItemList_colSpacing','doSell','ParseClassNotetags','ExtDisplayedParams','ADDED\x20EFFECTS','buffIconIndex','deselect','value','move','DrawEquipData','FFpyJ','CmdTextAlign','Scene_Shop_onSellOk','Window_ShopSell_isEnabled','SNNnJ','categoryWindowRectItemsEquipsCore','postCreateItemWindowModernControls','_categoryWindow','QVCBy','currentExt','drawItemStyleIcon','NtXPK','max','sDOpE','forceResetEquipSlots','drawItemQuantity','ItemScene','TJwiw','SwitchID','MenuPortraits','itypeId','currencyUnit','StatusWindow','Width','isShiftRemoveShortcutEnabled','bzMol','foreground','EXGLi','ldTAc','isGoodShown','getMenuImage','getItemConsumableText','newLabelEnabled','isClearEquipOk','statusWidth','SpeedNeg999','_numberWindow','pkZxT','refresh','object','ShopMenuStatusStandard','oGzmB','drawItemCustomEntryLine','GJqkU','WBsJe','shouldCommandWindowExist','ocnpR','drawItemEffectsMpDamage','buttonAssistItemListRequirement','YXVWT','helpWindowRect','OExfG','onTouchCancel','BVHMz','LabelDamageHP','processCursorMove','ParseItemNotetags','drawUpdatedParamName','drawItemEffectsTpDamage','drawItemKeyData','KxQkM','armorTypes','EFFECT_REMOVE_BUFF','DjOHg','FTtMn','initNewItemsList','vhALA','drawParamsItemsEquipsCore','ScopeRandomEnemies','onCategoryCancel','_dummyWindow','BatchShop','members','nOLNy','loadSystem','getItemEffectsHpRecoveryLabel','getItemDamageAmountTextBattleCore','ScopeRandomAllies','getItemsEquipsCoreBackColor1','onSellCancel','iLxdu','ICEae','ESEoK','item-%1','isClearCommandEnabled','qlxYQ','drawItemEffectsMpRecovery','bBvEt','zERIC','refreshActorEquipSlotsIfUpdated','EFFECT_REMOVE_DEBUFF','lineHeight','AMnVc','playEquip','equipAdjustHpMp','isShowNew','RdUTY','innerWidth','9722xzZdye','\x5cI[%1]%2','lptpT','Scene_Item_itemWindowRect','consumable','cazuz','TwWwj','pageup','CFArY','NotConsumable','Step3End','IhFGO','ELEMENT','registerCommand','isOptimizeCommandEnabled','AlwaysUsable','slotWindowRectItemsEquipsCore','isOptimizeEquipOk','postCreateSellWindowItemsEquipsCore','categoryStyleCheck','BackRectColor','EFFECT_ADD_BUFF','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','commandStyleCheck','mainFontSize','value1','HhsDN','commandNameWindowDrawText','index','NZynp','call','createCategoryWindow','getItemDamageAmountTextOriginal','popScene','mZyrn','isSceneShop','Scene_Shop_categoryWindowRect','setNewItem','Scene_Shop_numberWindowRect','maxItems','name','LabelConsume','itemAt','dcmvT','PqeRo','A%1','getItemDamageAmountLabel','CmdIconSell','rnUAX','createStatusWindow','onTouchSelectModern','LlpRc','lBJPS','Scene_Shop_createSellWindow','code','oFJDh','getItemDamageAmountLabelBattleCore','loadPicture','pfBJs','Parse_Notetags_EnableJS','UrlDX','refreshItemsEquipsCoreNoMenuImage','resetTextColor','xCFdO','drawItemHitType','ListWindowCols','initialize','HVPla','Blacklist','getItemEffectsRemovedStatesBuffsText','onDatabaseLoaded','translucentOpacity','HDzmt','Scene_Equip_itemWindowRect','process_VisuMZ_ItemsEquipsCore_RegExp','Parse_Notetags_Category','getItemDamageAmountLabelOriginal','DcwdO','wtYKR','_newItemsList','setCategory','hpbEZ','MnFoP','gainTP','setHp','changeEquip','W%1','itemTextAlign','Scene_Item_categoryWindowRect','Settings','Scene_Shop_doBuy','changePaintOpacity','Step2Start','Whitelist','AllArmors','getItemEffectsMpRecoveryLabel','%1%','KCErX','VhQbw','smallParamFontSize','createBitmap','drawItemScope','processCursorMoveModernControls','LabelHitType','SPEED','nHgme','paramPlus','prepareRefreshItemsEquipsCoreLayout','wPimm','fontSize','isRightInputMode','drawCustomShopGraphic','mpRate','YiuvG','Scene_Equip_helpWindowRect','zuRiR','getItemDamageElementText','RybiB','Scene_Equip_createSlotWindow','uiInputPosition','Nonconsumable','paramId','characterName','Scene_Shop_commandWindowRect','hideNewLabelSprites','RegExp','paintOpacity','#%1','itemWindowRect','damage','drawUpdatedAfterParamValue','drawItemEffectsRemovedStatesBuffs','jWowE','qkxHD','removeState','revertGlobalNamespaceVariables','pjIvS','isEquipCommandEnabled','CDuLZ','update','categoryItemTypes','isGOi','isEquipChangeOk','setStatusWindow','getNextAvailableEtypeId','constructor','currentSymbol','isKeyItem','isClearCommandAdded'];_0x3d0b=function(){return _0x162065;};return _0x3d0b();}var label=_0x18a61c(0x254),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x18a61c(0x312)](function(_0x338b59){const _0x5da1a9=_0x18a61c;return _0x338b59['status']&&_0x338b59[_0x5da1a9(0x5f6)][_0x5da1a9(0x366)]('['+label+']');})[0x0];VisuMZ[label][_0x18a61c(0x52e)]=VisuMZ[label][_0x18a61c(0x52e)]||{},VisuMZ['ConvertParams']=function(_0x2222ee,_0x1a0045){const _0x25e81b=_0x18a61c;for(const _0x59ccfb in _0x1a0045){if(_0x59ccfb[_0x25e81b(0x23c)](/(.*):(.*)/i)){if(_0x25e81b(0x518)==='HVPla'){const _0x5638cb=String(RegExp['$1']),_0x328ea2=String(RegExp['$2'])['toUpperCase']()[_0x25e81b(0x3a9)]();let _0x1115c7,_0x6533c4,_0x136fbb;switch(_0x328ea2){case _0x25e81b(0x1e8):_0x1115c7=_0x1a0045[_0x59ccfb]!==''?Number(_0x1a0045[_0x59ccfb]):0x0;break;case _0x25e81b(0x32e):_0x6533c4=_0x1a0045[_0x59ccfb]!==''?JSON[_0x25e81b(0x2d7)](_0x1a0045[_0x59ccfb]):[],_0x1115c7=_0x6533c4[_0x25e81b(0x404)](_0x224f55=>Number(_0x224f55));break;case'EVAL':_0x1115c7=_0x1a0045[_0x59ccfb]!==''?eval(_0x1a0045[_0x59ccfb]):null;break;case _0x25e81b(0x3b2):_0x6533c4=_0x1a0045[_0x59ccfb]!==''?JSON[_0x25e81b(0x2d7)](_0x1a0045[_0x59ccfb]):[],_0x1115c7=_0x6533c4[_0x25e81b(0x404)](_0x357da0=>eval(_0x357da0));break;case'JSON':_0x1115c7=_0x1a0045[_0x59ccfb]!==''?JSON[_0x25e81b(0x2d7)](_0x1a0045[_0x59ccfb]):'';break;case'ARRAYJSON':_0x6533c4=_0x1a0045[_0x59ccfb]!==''?JSON['parse'](_0x1a0045[_0x59ccfb]):[],_0x1115c7=_0x6533c4[_0x25e81b(0x404)](_0x3485bc=>JSON['parse'](_0x3485bc));break;case'FUNC':_0x1115c7=_0x1a0045[_0x59ccfb]!==''?new Function(JSON['parse'](_0x1a0045[_0x59ccfb])):new Function(_0x25e81b(0x2f4));break;case _0x25e81b(0x2d3):_0x6533c4=_0x1a0045[_0x59ccfb]!==''?JSON[_0x25e81b(0x2d7)](_0x1a0045[_0x59ccfb]):[],_0x1115c7=_0x6533c4[_0x25e81b(0x404)](_0x567891=>new Function(JSON[_0x25e81b(0x2d7)](_0x567891)));break;case'STR':_0x1115c7=_0x1a0045[_0x59ccfb]!==''?String(_0x1a0045[_0x59ccfb]):'';break;case _0x25e81b(0x275):_0x6533c4=_0x1a0045[_0x59ccfb]!==''?JSON[_0x25e81b(0x2d7)](_0x1a0045[_0x59ccfb]):[],_0x1115c7=_0x6533c4[_0x25e81b(0x404)](_0x3f453e=>String(_0x3f453e));break;case _0x25e81b(0x5e0):_0x136fbb=_0x1a0045[_0x59ccfb]!==''?JSON[_0x25e81b(0x2d7)](_0x1a0045[_0x59ccfb]):{},_0x2222ee[_0x5638cb]={},VisuMZ[_0x25e81b(0x36d)](_0x2222ee[_0x5638cb],_0x136fbb);continue;case'ARRAYSTRUCT':_0x6533c4=_0x1a0045[_0x59ccfb]!==''?JSON['parse'](_0x1a0045[_0x59ccfb]):[],_0x1115c7=_0x6533c4[_0x25e81b(0x404)](_0x31725d=>VisuMZ['ConvertParams']({},JSON[_0x25e81b(0x2d7)](_0x31725d)));break;default:continue;}_0x2222ee[_0x5638cb]=_0x1115c7;}else{const _0xbed311=_0x1bc69f(_0xf39269['$1'])['split'](/[\r\n]+/);for(const _0x482483 of _0xbed311){if(_0x482483[_0x25e81b(0x23c)](/(.*):[ ](.*)/i)){const _0xba4fed=_0x4f6a7a(_0x56f766['$1'])[_0x25e81b(0x3a9)](),_0x13faad=_0x6cfe61(_0x523272['$2'])[_0x25e81b(0x3a9)]();this['drawItemCustomEntryLine'](_0xba4fed,_0x13faad,_0xf880a1,_0xbb8eca,_0x5c1385),_0x2d0093+=this['lineHeight']();}}}}}return _0x2222ee;},(_0x429ff9=>{const _0x48ceca=_0x18a61c,_0x59a68a=_0x429ff9[_0x48ceca(0x4fd)];for(const _0x4425d9 of dependencies){if(_0x48ceca(0x5ce)!==_0x48ceca(0x5ce))return!![];else{if(!Imported[_0x4425d9]){if(_0x48ceca(0x59b)!=='ybFlg'){alert(_0x48ceca(0x4eb)[_0x48ceca(0x57c)](_0x59a68a,_0x4425d9)),SceneManager['exit']();break;}else return this['index']();}}}const _0x473761=_0x429ff9[_0x48ceca(0x5f6)];if(_0x473761['match'](/\[Version[ ](.*?)\]/i)){if('dTyzf'==='PyZSF')this[_0x48ceca(0x582)](_0x1b4713,_0xc8a602,_0x4e1dc3,_0x149bb6,!![]),_0x47c4a4['CoreEngine'][_0x48ceca(0x52e)]['Param'][_0x48ceca(0x2b9)]&&(_0xbe497e+=_0x1bf7f5[_0x48ceca(0x361)]+0x4);else{const _0x3eb952=Number(RegExp['$1']);_0x3eb952!==VisuMZ[label][_0x48ceca(0x3c5)]&&('fMkQT'!==_0x48ceca(0x1ba)?(this[_0x48ceca(0x4ae)](_0x48f343,_0x296538,_0x2d06a4,_0x327d28,!![]),this[_0x48ceca(0x4ae)](_0x506996,_0x29f6cc,_0x44de5d,_0xf42cca,![],'right'),this['drawItemDarkRect'](_0x1506ac,_0x6ec3a9,_0x5c9040),this[_0x48ceca(0x2ab)]()):(alert(_0x48ceca(0x2dc)[_0x48ceca(0x57c)](_0x59a68a,_0x3eb952)),SceneManager[_0x48ceca(0x234)]()));}}if(_0x473761[_0x48ceca(0x23c)](/\[Tier[ ](\d+)\]/i)){if(_0x48ceca(0x319)!==_0x48ceca(0x319)){if(!this[_0x48ceca(0x1ed)]())_0x5f4db1[_0x48ceca(0x1f3)][_0x48ceca(0x397)]['call'](this);}else{const _0x681176=Number(RegExp['$1']);_0x681176<tier?(alert(_0x48ceca(0x358)[_0x48ceca(0x57c)](_0x59a68a,_0x681176,tier)),SceneManager[_0x48ceca(0x234)]()):tier=Math[_0x48ceca(0x47f)](_0x681176,tier);}}VisuMZ[_0x48ceca(0x36d)](VisuMZ[label][_0x48ceca(0x52e)],_0x429ff9['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x18a61c(0x4fd)],'ActorChangeEquipSlots',_0x579c0e=>{const _0x42d790=_0x18a61c;VisuMZ[_0x42d790(0x36d)](_0x579c0e,_0x579c0e);const _0x373d37=_0x579c0e[_0x42d790(0x266)][_0x42d790(0x404)](_0x593a42=>$gameActors[_0x42d790(0x56a)](_0x593a42)),_0x35fc9a=_0x579c0e['Slots'][_0x42d790(0x404)](_0x30b5b0=>$dataSystem['equipTypes']['indexOf'](_0x30b5b0[_0x42d790(0x3a9)]()));for(const _0x2b29b9 of _0x373d37){if('cIpsP'==='MtAgG')_0x20bd80=_0x42d790(0x4d6)[_0x42d790(0x57c)](_0x5c1a0c,_0x3d4a10);else{if(!_0x2b29b9)continue;_0x2b29b9['forceChangeEquipSlots'](_0x35fc9a);}}}),PluginManager['registerCommand'](pluginData[_0x18a61c(0x4fd)],'ActorResetEquipSlots',_0x448f5b=>{const _0x9d791d=_0x18a61c;VisuMZ[_0x9d791d(0x36d)](_0x448f5b,_0x448f5b);const _0x14967d=_0x448f5b[_0x9d791d(0x266)][_0x9d791d(0x404)](_0x403a0f=>$gameActors[_0x9d791d(0x56a)](_0x403a0f));for(const _0x240a2c of _0x14967d){if(!_0x240a2c)continue;_0x240a2c[_0x9d791d(0x481)]();}}),PluginManager[_0x18a61c(0x4e2)](pluginData[_0x18a61c(0x4fd)],_0x18a61c(0x4ba),_0x1f4c2b=>{const _0x2f7177=_0x18a61c;VisuMZ[_0x2f7177(0x36d)](_0x1f4c2b,_0x1f4c2b);const _0x249bba=[],_0x510b4e=_0x1f4c2b[_0x2f7177(0x519)][_0x2f7177(0x404)](_0x1a0c67=>_0x1a0c67[_0x2f7177(0x3ad)]()[_0x2f7177(0x3a9)]()),_0x3a7a16=_0x1f4c2b[_0x2f7177(0x532)]['map'](_0x5d7659=>_0x5d7659[_0x2f7177(0x3ad)]()[_0x2f7177(0x3a9)]()),_0x26d295=_0x1f4c2b[_0x2f7177(0x3c7)]>=_0x1f4c2b[_0x2f7177(0x1c7)]?_0x1f4c2b[_0x2f7177(0x1c7)]:_0x1f4c2b[_0x2f7177(0x3c7)],_0x4f9f9=_0x1f4c2b[_0x2f7177(0x3c7)]>=_0x1f4c2b[_0x2f7177(0x1c7)]?_0x1f4c2b['Step1End']:_0x1f4c2b[_0x2f7177(0x1c7)],_0x437c2b=Array(_0x4f9f9-_0x26d295+0x1)[_0x2f7177(0x5a4)]()[_0x2f7177(0x404)]((_0x17d1cf,_0x18b1c8)=>_0x26d295+_0x18b1c8);for(const _0x5c9982 of _0x437c2b){if(_0x2f7177(0x1b7)===_0x2f7177(0x1b7)){const _0x3b5c8f=$dataItems[_0x5c9982];if(!_0x3b5c8f)continue;if(!VisuMZ['ItemsEquipsCore'][_0x2f7177(0x2de)](_0x3b5c8f,_0x510b4e,_0x3a7a16))continue;_0x249bba['push']([0x0,_0x5c9982,0x0,_0x3b5c8f['price']]);}else return _0x3da96d[_0x2f7177(0x194)](_0x3772d5)&&_0x2f3b97[_0x2f7177(0x5db)]===_0x5bf1d1(_0x4dc6b4['$1']);}const _0x2e32d2=_0x1f4c2b[_0x2f7177(0x3c1)]>=_0x1f4c2b[_0x2f7177(0x531)]?_0x1f4c2b[_0x2f7177(0x531)]:_0x1f4c2b[_0x2f7177(0x3c1)],_0x2f66b8=_0x1f4c2b[_0x2f7177(0x3c1)]>=_0x1f4c2b['Step2Start']?_0x1f4c2b[_0x2f7177(0x3c1)]:_0x1f4c2b[_0x2f7177(0x531)],_0x3854d4=Array(_0x2f66b8-_0x2e32d2+0x1)[_0x2f7177(0x5a4)]()[_0x2f7177(0x404)]((_0x259bcb,_0x1566e1)=>_0x2e32d2+_0x1566e1);for(const _0x5d6a7c of _0x3854d4){const _0x3dcd1b=$dataWeapons[_0x5d6a7c];if(!_0x3dcd1b)continue;if(!VisuMZ[_0x2f7177(0x254)][_0x2f7177(0x2de)](_0x3dcd1b,_0x510b4e,_0x3a7a16))continue;_0x249bba[_0x2f7177(0x5ec)]([0x1,_0x5d6a7c,0x0,_0x3dcd1b[_0x2f7177(0x36c)]]);}const _0x34fd4d=_0x1f4c2b[_0x2f7177(0x4df)]>=_0x1f4c2b[_0x2f7177(0x401)]?_0x1f4c2b[_0x2f7177(0x401)]:_0x1f4c2b['Step3End'],_0x45958d=_0x1f4c2b[_0x2f7177(0x4df)]>=_0x1f4c2b[_0x2f7177(0x401)]?_0x1f4c2b[_0x2f7177(0x4df)]:_0x1f4c2b[_0x2f7177(0x401)],_0x183c2c=Array(_0x45958d-_0x34fd4d+0x1)['fill']()[_0x2f7177(0x404)]((_0x1d2d95,_0x33903f)=>_0x34fd4d+_0x33903f);for(const _0x4a5ea8 of _0x183c2c){const _0x2d1c63=$dataArmors[_0x4a5ea8];if(!_0x2d1c63)continue;if(!VisuMZ['ItemsEquipsCore'][_0x2f7177(0x2de)](_0x2d1c63,_0x510b4e,_0x3a7a16))continue;_0x249bba[_0x2f7177(0x5ec)]([0x2,_0x4a5ea8,0x0,_0x2d1c63['price']]);}SceneManager['push'](Scene_Shop),SceneManager['prepareNextScene'](_0x249bba,_0x1f4c2b[_0x2f7177(0x3fa)]);}),VisuMZ['ItemsEquipsCore'][_0x18a61c(0x2de)]=function(_0xec523a,_0x3183c0,_0x5b09be){const _0x417bf4=_0x18a61c;if(_0xec523a[_0x417bf4(0x4fd)][_0x417bf4(0x3a9)]()==='')return![];if(_0xec523a[_0x417bf4(0x4fd)][_0x417bf4(0x23c)](/-----/i))return![];const _0x5f1a5a=_0xec523a[_0x417bf4(0x5e7)];if(_0x3183c0['length']>0x0)for(const _0x1c8872 of _0x3183c0){if(_0x417bf4(0x3ec)!==_0x417bf4(0x3ec))_0x4a7816[_0x417bf4(0x5e7)][_0x417bf4(0x5ec)](_0x92ebe9[_0x417bf4(0x3a9)]());else{if(!_0x1c8872)continue;if(_0x5f1a5a[_0x417bf4(0x366)](_0x1c8872))return![];}}if(_0x5b09be[_0x417bf4(0x3f9)]>0x0){for(const _0x5ec39a of _0x5b09be){if(_0x417bf4(0x388)==='ImzbT'){if(!_0x5ec39a)continue;if(_0x5f1a5a['includes'](_0x5ec39a))return!![];}else _0x5dc28a[_0x417bf4(0x1e5)]-=this[_0x417bf4(0x495)]();}return![];}return!![];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x5d7)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x18a61c(0x1f3)][_0x18a61c(0x51b)]=function(){const _0x11d247=_0x18a61c;this[_0x11d247(0x51f)](),VisuMZ[_0x11d247(0x254)][_0x11d247(0x5d7)]['call'](this),this[_0x11d247(0x22c)]();},Scene_Boot[_0x18a61c(0x1f3)][_0x18a61c(0x51f)]=function(){const _0x114889=_0x18a61c;VisuMZ[_0x114889(0x254)]['RegExp']={},VisuMZ[_0x114889(0x254)]['RegExp'][_0x114889(0x3bc)]=[],VisuMZ[_0x114889(0x254)]['RegExp']['BorderRegExp']=[];const _0x194d98=[_0x114889(0x33f),'MaxMP',_0x114889(0x451),'DEF',_0x114889(0x5fe),'MDF',_0x114889(0x3a3),_0x114889(0x436)];for(const _0x1c7e97 of _0x194d98){if(_0x114889(0x480)!=='wAFcT'){const _0x53e05e=_0x114889(0x3f8)[_0x114889(0x57c)](_0x1c7e97);VisuMZ[_0x114889(0x254)][_0x114889(0x552)]['EquipParams']['push'](new RegExp(_0x53e05e,'i'));const _0x511bab=_0x114889(0x3d1)[_0x114889(0x57c)](_0x1c7e97);VisuMZ[_0x114889(0x254)][_0x114889(0x552)]['BorderRegExp']['push'](new RegExp(_0x511bab,'g'));}else this[_0x114889(0x328)][_0x114889(0x40e)]=this[_0x114889(0x35a)][_0x114889(0x256)],_0xf09774=!![];}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_Notetags']=function(){const _0x234d62=_0x18a61c;if(VisuMZ[_0x234d62(0x239)])return;this[_0x234d62(0x255)]();const _0x2f4065=[$dataItems,$dataWeapons,$dataArmors];for(const _0x435970 of _0x2f4065){if(_0x234d62(0x606)!==_0x234d62(0x45a))for(const _0x13c4ac of _0x435970){if(_0x234d62(0x4a8)!==_0x234d62(0x511)){if(!_0x13c4ac)continue;VisuMZ[_0x234d62(0x254)][_0x234d62(0x520)](_0x13c4ac,_0x435970),VisuMZ[_0x234d62(0x254)][_0x234d62(0x3f2)](_0x13c4ac,_0x435970),VisuMZ[_0x234d62(0x254)][_0x234d62(0x3d7)](_0x13c4ac,_0x435970),VisuMZ[_0x234d62(0x254)]['Parse_Notetags_ParamJS'](_0x13c4ac,_0x435970),VisuMZ['ItemsEquipsCore'][_0x234d62(0x510)](_0x13c4ac,_0x435970);}else{if(_0x4ba0fa[_0x234d62(0x23c)](/(.*):[ ](.*)/i)){const _0x12c640=_0x399199(_0x212231['$1'])[_0x234d62(0x3ad)]()[_0x234d62(0x3a9)](),_0x2ea61b=_0x304f4a(_0x3b8d25['$2'])[_0x234d62(0x3a9)]();this[_0x234d62(0x463)][_0x12c640]=_0x2ea61b;}}}else{const _0x4bf82b=_0x38ac35[_0x234d62(0x254)][_0x234d62(0x52e)][_0x234d62(0x362)]['Icon'];if(_0x4bf82b<=0x0)return;const _0x25a38b=_0x4f8936[_0x234d62(0x4bd)](_0x234d62(0x5ac)),_0xe23d75=_0xc292f6[_0x234d62(0x361)],_0x18c7e1=_0x30d152[_0x234d62(0x1d5)],_0x1d5722=_0x4bf82b%0x10*_0xe23d75,_0x45f0b4=_0x53a3b1['floor'](_0x4bf82b/0x10)*_0x18c7e1;this[_0x234d62(0x32a)][_0x234d62(0x3f0)](_0x25a38b,_0x1d5722,_0x45f0b4,_0xe23d75,_0x18c7e1,0x0,0x0);}}},Scene_Boot[_0x18a61c(0x1f3)]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x345eab=_0x18a61c;for(const _0x3fa1cf of $dataClasses){if('BhFIK'!==_0x345eab(0x3dc)){if(!_0x3fa1cf)continue;VisuMZ[_0x345eab(0x254)]['Parse_Notetags_EquipSlots'](_0x3fa1cf);}else{if(_0x3b8577['id']===_0x26cdbb['id'])_0x44203f+=0x1;}}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x46b)]=VisuMZ[_0x18a61c(0x46b)],VisuMZ[_0x18a61c(0x46b)]=function(_0x887cb3){const _0x5a2022=_0x18a61c;VisuMZ[_0x5a2022(0x254)]['ParseClassNotetags'][_0x5a2022(0x4f3)](this,_0x887cb3),VisuMZ[_0x5a2022(0x254)][_0x5a2022(0x18f)](_0x887cb3);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x4ab)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x18a61c(0x4ab)]=function(_0x427efd){const _0x10dd9c=_0x18a61c;VisuMZ['ItemsEquipsCore']['ParseItemNotetags'][_0x10dd9c(0x4f3)](this,_0x427efd),VisuMZ[_0x10dd9c(0x254)][_0x10dd9c(0x196)](_0x427efd,$dataItems);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x57d)]=VisuMZ[_0x18a61c(0x57d)],VisuMZ[_0x18a61c(0x57d)]=function(_0x1e0b8a){const _0x18296a=_0x18a61c;VisuMZ[_0x18296a(0x254)][_0x18296a(0x57d)]['call'](this,_0x1e0b8a),VisuMZ[_0x18296a(0x254)]['Parse_Notetags_Batch'](_0x1e0b8a,$dataWeapons);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x1fc)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x18a61c(0x1fc)]=function(_0x523ae1){const _0x250c8b=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x250c8b(0x1fc)]['call'](this,_0x523ae1),VisuMZ[_0x250c8b(0x254)]['Parse_Notetags_Batch'](_0x523ae1,$dataArmors);},VisuMZ[_0x18a61c(0x254)]['Parse_Notetags_EquipSlots']=function(_0x1f9a5d){const _0x77413=_0x18a61c;_0x1f9a5d[_0x77413(0x237)]=[];if(!BattleManager[_0x77413(0x37e)]()&&_0x1f9a5d[_0x77413(0x447)][_0x77413(0x23c)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if(_0x77413(0x37a)==='rtNAH'){const _0x4487c5=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x3e547d of _0x4487c5){if(_0x77413(0x43e)!==_0x77413(0x43e))return _0x48a40b[_0x77413(0x254)]['Settings'][_0x77413(0x489)][_0x77413(0x28a)];else{const _0x53caba=$dataSystem[_0x77413(0x29d)][_0x77413(0x218)](_0x3e547d['trim']());if(_0x53caba>0x0)_0x1f9a5d[_0x77413(0x237)][_0x77413(0x5ec)](_0x53caba);}}}else return _0x527845[_0x77413(0x254)][_0x77413(0x52e)]['StatusWindow'][_0x77413(0x53c)];}else for(const _0x1f8551 of $dataSystem[_0x77413(0x29d)]){if(_0x77413(0x5dc)!==_0x77413(0x605)){const _0x573cae=$dataSystem[_0x77413(0x29d)][_0x77413(0x218)](_0x1f8551[_0x77413(0x3a9)]());if(_0x573cae>0x0)_0x1f9a5d[_0x77413(0x237)][_0x77413(0x5ec)](_0x573cae);}else{if(!_0x1f8ff1[_0x77413(0x470)](_0x338b51))return![];}}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x196)]=function(_0x233086,_0x1335e1){const _0x523a67=_0x18a61c;VisuMZ[_0x523a67(0x254)]['Parse_Notetags_Category'](_0x233086,_0x1335e1),VisuMZ[_0x523a67(0x254)][_0x523a67(0x3f2)](_0x233086,_0x1335e1),VisuMZ[_0x523a67(0x254)][_0x523a67(0x3d7)](_0x233086,_0x1335e1),VisuMZ[_0x523a67(0x254)]['Parse_Notetags_ParamJS'](_0x233086,_0x1335e1),VisuMZ[_0x523a67(0x254)][_0x523a67(0x510)](_0x233086,_0x1335e1);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x520)]=function(_0x1869ff,_0x199157){const _0x5bcc89=_0x18a61c;_0x1869ff[_0x5bcc89(0x5e7)]=[];const _0xbb2925=_0x1869ff[_0x5bcc89(0x447)],_0x5e1ed5=_0xbb2925[_0x5bcc89(0x23c)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x5e1ed5)for(const _0x9c0f29 of _0x5e1ed5){if(_0x5bcc89(0x4dd)!=='cIGIa'){_0x9c0f29[_0x5bcc89(0x23c)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2e396d=String(RegExp['$1'])[_0x5bcc89(0x3ad)]()[_0x5bcc89(0x3a9)]()['split'](',');for(const _0x59d200 of _0x2e396d){_0x5bcc89(0x1c1)==='nsGLU'?(this['_commandWindow'][_0x5bcc89(0x56b)](),this['_commandWindow'][_0x5bcc89(0x46f)](),this[_0x5bcc89(0x360)]['smoothSelect'](0x0),this['_slotWindow'][_0x5bcc89(0x590)]()):_0x1869ff[_0x5bcc89(0x5e7)][_0x5bcc89(0x5ec)](_0x59d200[_0x5bcc89(0x3a9)]());}}else _0x226af6(_0x3f5a05);}if(_0xbb2925[_0x5bcc89(0x23c)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x5bcc89(0x416)==='jddHA')_0x19d5d0[_0x5bcc89(0x254)][_0x5bcc89(0x27e)][_0x5bcc89(0x4f3)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5bcc89(0x3f5)](),this[_0x5bcc89(0x1ed)]()&&(this[_0x5bcc89(0x47a)]['smoothSelect'](0x0),this[_0x5bcc89(0x3e9)]());else{const _0x40a22e=RegExp['$1'][_0x5bcc89(0x23f)](/[\r\n]+/);for(const _0x1351cf of _0x40a22e){_0x1869ff['categories'][_0x5bcc89(0x5ec)](_0x1351cf[_0x5bcc89(0x3ad)]()[_0x5bcc89(0x3a9)]());}}}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x3f2)]=function(_0x25ef37,_0x26049c){const _0x24c77f=_0x18a61c;_0x25ef37[_0x24c77f(0x447)][_0x24c77f(0x23c)](/<PRICE:[ ](\d+)>/i)&&(_0x25ef37['price']=Number(RegExp['$1']));},VisuMZ[_0x18a61c(0x254)]['Parse_Notetags_ParamValues']=function(_0x2c3b97,_0x5e4cf7){const _0x26b9c3=_0x18a61c;if(_0x5e4cf7===$dataItems)return;for(let _0x162f9c=0x0;_0x162f9c<0x8;_0x162f9c++){const _0x33fefc=VisuMZ[_0x26b9c3(0x254)][_0x26b9c3(0x552)][_0x26b9c3(0x3bc)][_0x162f9c];if(_0x2c3b97[_0x26b9c3(0x447)]['match'](_0x33fefc)){if(_0x26b9c3(0x5f3)==='FoIoX')_0x2c3b97[_0x26b9c3(0x3a2)][_0x162f9c]=parseInt(RegExp['$1']);else return![];}}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x440)]={},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x30f)]=function(_0x3b45b3,_0x36f8cd){const _0xbb3e78=_0x18a61c;if(_0x36f8cd===$dataItems)return;if(_0x3b45b3['note'][_0xbb3e78(0x23c)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0xbb3e78(0x559)!==_0xbb3e78(0x559))return this[_0xbb3e78(0x224)]();else{const _0x29f644=String(RegExp['$1']),_0x2b84e5=(_0x36f8cd===$dataWeapons?_0xbb3e78(0x52b):_0xbb3e78(0x502))[_0xbb3e78(0x57c)](_0x3b45b3['id']),_0x19b97e=_0xbb3e78(0x258)[_0xbb3e78(0x57c)](_0x29f644);for(let _0x4f8f59=0x0;_0x4f8f59<0x8;_0x4f8f59++){if(_0x29f644[_0xbb3e78(0x23c)](VisuMZ[_0xbb3e78(0x254)][_0xbb3e78(0x552)]['BorderRegExp'][_0x4f8f59])){if(_0xbb3e78(0x537)!==_0xbb3e78(0x562)){const _0x3dcdb4=_0xbb3e78(0x1bc)[_0xbb3e78(0x57c)](_0x2b84e5,_0x4f8f59);VisuMZ[_0xbb3e78(0x254)]['paramJS'][_0x3dcdb4]=new Function('item',_0xbb3e78(0x54e),_0x19b97e);}else{if(this['buttonAssistItemListRequirement']())return _0x3b5ca2[_0xbb3e78(0x254)]['Settings']['ItemScene'][_0xbb3e78(0x374)];return _0x596f9c[_0xbb3e78(0x1f3)][_0xbb3e78(0x270)][_0xbb3e78(0x4f3)](this);}}}}}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x5b6)]={},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x510)]=function(_0x48dd89,_0x596b16){const _0x2525dc=_0x18a61c;if(_0x596b16!==$dataItems)return;if(_0x48dd89[_0x2525dc(0x447)][_0x2525dc(0x23c)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x2525dc(0x3ea)===_0x2525dc(0x3af))return _0x2551c4[_0x2525dc(0x5fc)]()&&(_0x13abf4[_0x2525dc(0x57e)](_0x2525dc(0x1a1)[_0x2525dc(0x57c)](this[_0x2525dc(0x35a)]['name'])),_0x484f5c[_0x2525dc(0x57e)](_0xb93f07)),this[_0x2525dc(0x55c)](),_0x2525dc(0x2fe);else{const _0x35416b=String(RegExp['$1']),_0x14bb82='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2525dc(0x57c)](_0x35416b);VisuMZ['ItemsEquipsCore']['itemEnableJS'][_0x48dd89['id']]=new Function(_0x2525dc(0x423),_0x14bb82);}}},DataManager[_0x18a61c(0x568)]=function(_0x1676a9){const _0x5b76c6=_0x18a61c;return this[_0x5b76c6(0x290)](_0x1676a9)&&_0x1676a9[_0x5b76c6(0x487)]===0x2;},DataManager['maxItemAmount']=function(_0x1ed232){const _0x5af43b=_0x18a61c;if(!_0x1ed232)return 0x63;else{if(_0x1ed232[_0x5af43b(0x447)][_0x5af43b(0x23c)](/<MAX:[ ](\d+)>/i)){if('CpUaK'===_0x5af43b(0x1ec)){if(!_0x1aee57[_0x5af43b(0x470)](_0x3f683f))return![];}else return parseInt(RegExp['$1']);}else return this[_0x5af43b(0x334)](_0x1ed232);}},DataManager['defaultItemMax']=function(_0x23779a){const _0x5362ee=_0x18a61c;if(this['isItem'](_0x23779a))return VisuMZ[_0x5362ee(0x254)][_0x5362ee(0x52e)][_0x5362ee(0x483)][_0x5362ee(0x39e)];else{if(this[_0x5362ee(0x3b7)](_0x23779a)){if('zQSaG'==='zQSaG')return VisuMZ[_0x5362ee(0x254)][_0x5362ee(0x52e)][_0x5362ee(0x483)][_0x5362ee(0x441)];else this[_0x5362ee(0x540)]();}else{if(this['isArmor'](_0x23779a)){if(_0x5362ee(0x5c5)===_0x5362ee(0x5c5))return VisuMZ['ItemsEquipsCore']['Settings'][_0x5362ee(0x483)][_0x5362ee(0x2b8)];else{this[_0x5362ee(0x2ab)]();const _0x432556=this[_0x5362ee(0x4ff)](_0x256be8),_0x3e0277=this['itemLineRect'](_0xc9825a),_0x2e6adb=_0x3e0277['width'];this['changePaintOpacity'](this[_0x5362ee(0x40c)](_0x432556)),this[_0x5362ee(0x35e)](_0x432556,_0x3e0277['x'],_0x3e0277['y'],_0x2e6adb),this[_0x5362ee(0x28d)](_0x432556,_0x3e0277),this[_0x5362ee(0x530)](!![]);}}}}},ColorManager[_0x18a61c(0x292)]=function(_0x43532c){const _0x174bd2=_0x18a61c;if(!_0x43532c)return _0x174bd2(0x347)!==_0x174bd2(0x5fd)?this['normalColor']():_0x1e2449[_0x174bd2(0x1f3)][_0x174bd2(0x1e1)][_0x174bd2(0x4f3)](this);else{if(_0x43532c['note'][_0x174bd2(0x23c)](/<COLOR:[ ](\d+)>/i))return this[_0x174bd2(0x2c7)](Number(RegExp['$1'])['clamp'](0x0,0x1f));else return _0x43532c[_0x174bd2(0x447)][_0x174bd2(0x23c)](/<COLOR:[ ]#(.*)>/i)?_0x174bd2(0x29b)===_0x174bd2(0x29b)?'#'+String(RegExp['$1']):_0x32a91e[_0x174bd2(0x254)][_0x174bd2(0x2d0)][_0x174bd2(0x4f3)](this):this[_0x174bd2(0x3fe)]();}},ColorManager[_0x18a61c(0x574)]=function(_0x48727){const _0x46825a=_0x18a61c;return _0x48727=String(_0x48727),_0x48727[_0x46825a(0x23c)](/#(.*)/i)?'fSlbn'==='SrFsI'?!![]:_0x46825a(0x554)[_0x46825a(0x57c)](String(RegExp['$1'])):this['textColor'](Number(_0x48727));},SceneManager[_0x18a61c(0x4f8)]=function(){const _0x3dae6f=_0x18a61c;return this['_scene']&&this[_0x3dae6f(0x424)][_0x3dae6f(0x566)]===Scene_Shop;},Game_Temp['prototype'][_0x18a61c(0x493)]=function(){const _0x30f2bc=_0x18a61c;if(this['_bypassNewLabel'])return![];return VisuMZ[_0x30f2bc(0x254)][_0x30f2bc(0x52e)][_0x30f2bc(0x362)][_0x30f2bc(0x2b7)];},VisuMZ[_0x18a61c(0x49b)]=VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x52e)][_0x18a61c(0x489)][_0x18a61c(0x1b8)],VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x5fb)]=Game_BattlerBase['prototype']['param'],Game_BattlerBase['prototype'][_0x18a61c(0x56c)]=function(_0x30cc0b){const _0x334129=_0x18a61c;return this['_shopStatusMenuMode']?this[_0x334129(0x413)]?VisuMZ[_0x334129(0x49b)]:0x1:_0x334129(0x2b1)!==_0x334129(0x50c)?VisuMZ['ItemsEquipsCore']['Game_BattlerBase_param'][_0x334129(0x4f3)](this,_0x30cc0b):_0x1aa699[_0x334129(0x254)][_0x334129(0x52e)][_0x334129(0x483)][_0x334129(0x278)]['call'](this);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x41f)]=Game_BattlerBase[_0x18a61c(0x1f3)][_0x18a61c(0x2fb)],Game_BattlerBase[_0x18a61c(0x1f3)]['meetsItemConditions']=function(_0xa26bc){const _0x301c6b=_0x18a61c;if(!_0xa26bc)return![];if(!VisuMZ[_0x301c6b(0x254)][_0x301c6b(0x41f)][_0x301c6b(0x4f3)](this,_0xa26bc))return![];if(!this[_0x301c6b(0x2b3)](_0xa26bc))return![];if(!this[_0x301c6b(0x380)](_0xa26bc))return![];return!![];},Game_BattlerBase['prototype'][_0x18a61c(0x2b3)]=function(_0x5d55ab){const _0x35f12c=_0x18a61c;if(!this[_0x35f12c(0x45c)](_0x5d55ab))return![];return!![];},Game_BattlerBase['prototype']['checkItemConditionsSwitchNotetags']=function(_0x1cf009){const _0x570172=_0x18a61c,_0x4fd8d5=_0x1cf009[_0x570172(0x447)];if(_0x4fd8d5[_0x570172(0x23c)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19ae0f=JSON[_0x570172(0x2d7)]('['+RegExp['$1'][_0x570172(0x23c)](/\d+/g)+']');for(const _0x2206b9 of _0x19ae0f){if(!$gameSwitches[_0x570172(0x470)](_0x2206b9))return![];}return!![];}if(_0x4fd8d5['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x570172(0x5b4)!==_0x570172(0x589)){const _0x5051fc=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2e9375 of _0x5051fc){if(!$gameSwitches[_0x570172(0x470)](_0x2e9375))return![];}return!![];}else return _0x2a5077[_0x570172(0x254)][_0x570172(0x52e)][_0x570172(0x483)][_0x570172(0x2e0)];}if(_0x4fd8d5[_0x570172(0x23c)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x55bff7=JSON[_0x570172(0x2d7)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x56cbec of _0x55bff7){if($gameSwitches[_0x570172(0x470)](_0x56cbec))return!![];}return![];}if(_0x4fd8d5[_0x570172(0x23c)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e6116=JSON['parse']('['+RegExp['$1'][_0x570172(0x23c)](/\d+/g)+']');for(const _0x43bbd2 of _0x4e6116){if(!$gameSwitches[_0x570172(0x470)](_0x43bbd2))return!![];}return![];}if(_0x4fd8d5['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('YXVWT'===_0x570172(0x4a4)){const _0x12c4c9=JSON[_0x570172(0x2d7)]('['+RegExp['$1'][_0x570172(0x23c)](/\d+/g)+']');for(const _0x40621d of _0x12c4c9){if(_0x570172(0x40a)!==_0x570172(0x40a))this[_0x570172(0x585)](![]);else{if(!$gameSwitches[_0x570172(0x470)](_0x40621d))return!![];}}return![];}else _0x55e2c1=_0x1cd1ae['round']((this[_0x570172(0x4d4)]-_0x416b62)/0x2);}if(_0x4fd8d5[_0x570172(0x23c)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30c44a=JSON['parse']('['+RegExp['$1'][_0x570172(0x23c)](/\d+/g)+']');for(const _0xf4cd4c of _0x30c44a){if($gameSwitches[_0x570172(0x470)](_0xf4cd4c))return![];}return!![];}return!![];},Game_BattlerBase[_0x18a61c(0x1f3)][_0x18a61c(0x380)]=function(_0x46b636){const _0xa1e491=_0x18a61c,_0x274af7=_0x46b636[_0xa1e491(0x447)],_0x53b388=VisuMZ['ItemsEquipsCore']['itemEnableJS'];if(_0x53b388[_0x46b636['id']]){if(_0xa1e491(0x29a)===_0xa1e491(0x2f1))_0x467c29['prototype']['activate']['call'](this),this[_0xa1e491(0x36e)]();else return _0x53b388[_0x46b636['id']][_0xa1e491(0x4f3)](this,_0x46b636);}else return!![];},Game_Actor[_0x18a61c(0x1f3)]['initEquips']=function(_0x4574f9){const _0x194a6b=_0x18a61c;_0x4574f9=this[_0x194a6b(0x2df)](_0x4574f9);const _0x4d8d95=this['equipSlots']();this[_0x194a6b(0x363)]=[];for(let _0x1b32b7=0x0;_0x1b32b7<_0x4d8d95[_0x194a6b(0x3f9)];_0x1b32b7++){this[_0x194a6b(0x363)][_0x1b32b7]=new Game_Item();}for(let _0x26b3f3=0x0;_0x26b3f3<_0x4d8d95[_0x194a6b(0x3f9)];_0x26b3f3++){if(_0x194a6b(0x44e)!==_0x194a6b(0x411)){const _0x367c53=_0x4d8d95[_0x26b3f3],_0x3569d9=this['getMatchingInitEquip'](_0x4574f9,_0x367c53);if(this[_0x194a6b(0x1f5)](_0x3569d9))this[_0x194a6b(0x363)][_0x26b3f3][_0x194a6b(0x381)](_0x3569d9);}else{const _0x39f00b=this[_0x194a6b(0x435)](this['index']());let _0x319b2b=this[_0x194a6b(0x42a)](this['index']());_0x319b2b=_0x319b2b['replace'](/\\I\[(\d+)\]/gi,''),_0x5eff2c[_0x194a6b(0x2ab)](),this[_0x194a6b(0x570)](_0x319b2b,_0x39f00b),this[_0x194a6b(0x4f0)](_0x319b2b,_0x39f00b),this['commandNameWindowCenter'](_0x319b2b,_0x39f00b);}}this[_0x194a6b(0x2a2)](!![]),this[_0x194a6b(0x499)]();},Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x2df)]=function(_0x59f404){const _0x2e7c6d=_0x18a61c,_0x495b92=[];for(let _0x312472=0x0;_0x312472<_0x59f404[_0x2e7c6d(0x3f9)];_0x312472++){const _0x2e9568=_0x59f404[_0x312472];if(_0x2e9568<=0x0)continue;const _0x3bed39=$dataSystem['equipTypes'][_0x312472+0x1];if(_0x3bed39===$dataSystem[_0x2e7c6d(0x29d)][0x1]||_0x312472===0x1&&this[_0x2e7c6d(0x594)]())_0x495b92[_0x2e7c6d(0x5ec)]($dataWeapons[_0x2e9568]);else{if(BattleManager[_0x2e7c6d(0x37e)]()){const _0x877e5d=$dataArmors[_0x2e9568];if(_0x877e5d&&_0x877e5d[_0x2e7c6d(0x189)]===_0x312472+0x1){if(_0x2e7c6d(0x353)===_0x2e7c6d(0x262)){const _0x25e96b='DAMAGE\x20MULTIPLIER';if(this['_customItemInfo'][_0x25e96b])return this[_0x2e7c6d(0x463)][_0x25e96b];return _0x5797a0[_0x2e7c6d(0x5ee)]&&_0x103e0c['getDamageStyle'](this[_0x2e7c6d(0x35a)])!=='MANUAL'?this[_0x2e7c6d(0x4bf)]():this['getItemDamageAmountTextOriginal']();}else _0x495b92[_0x2e7c6d(0x5ec)](_0x877e5d);}}else{if(_0x2e7c6d(0x4c3)===_0x2e7c6d(0x4c3)){const _0x5595de=$dataArmors[_0x2e9568];_0x5595de&&_0x5595de['etypeId']===_0x312472+0x1&&(_0x2e7c6d(0x1d3)===_0x2e7c6d(0x1bf)?this['playCursorSound']():_0x495b92[_0x2e7c6d(0x5ec)](_0x5595de));}else{const _0x5bb086=_0x2e7c6d(0x304);if(this[_0x2e7c6d(0x463)][_0x5bb086])return this[_0x2e7c6d(0x463)][_0x5bb086];let _0x2640f3='';return _0x2640f3+='%1'[_0x2e7c6d(0x57c)](this[_0x2e7c6d(0x328)][_0x2e7c6d(0x528)]),_0x2640f3;}}}}return _0x495b92;},Game_Actor['prototype'][_0x18a61c(0x448)]=function(_0x369a7b,_0x4feb5a){const _0x369b7e=_0x18a61c;for(const _0x3a8e09 of _0x369a7b){if(!_0x3a8e09)continue;if(_0x3a8e09[_0x369b7e(0x189)]===_0x4feb5a)return _0x369a7b[_0x369b7e(0x297)](_0x369a7b[_0x369b7e(0x218)](_0x3a8e09),0x1),_0x3a8e09;}return null;},Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x237)]=function(){const _0x320429=_0x18a61c,_0x26ec0d=JsonEx['makeDeepCopy'](this['_forcedSlots']||this[_0x320429(0x2d2)]()[_0x320429(0x237)]);if(_0x26ec0d[_0x320429(0x3f9)]>=0x2&&this['isDualWield']())_0x26ec0d[0x1]=0x1;return _0x26ec0d;},Game_Actor[_0x18a61c(0x1f3)]['forceChangeEquipSlots']=function(_0x4aba35){const _0x2a3e69=_0x18a61c;_0x4aba35['remove'](0x0),_0x4aba35[_0x2a3e69(0x315)](-0x1),this['_forcedSlots']=_0x4aba35,this[_0x2a3e69(0x499)](),this[_0x2a3e69(0x3ab)]();},Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x481)]=function(){const _0x293148=_0x18a61c;this['_forcedSlots']=undefined,this[_0x293148(0x499)](),this[_0x293148(0x3ab)]();},Game_Actor[_0x18a61c(0x1f3)]['updateChangedSlots']=function(){const _0x5559a9=_0x18a61c;let _0x23718f=this[_0x5559a9(0x237)]()['length'];while(this[_0x5559a9(0x363)][_0x5559a9(0x3f9)]>_0x23718f){if(_0x5559a9(0x300)!==_0x5559a9(0x49e)){const _0x17f5b0=this[_0x5559a9(0x363)][this['_equips']['length']-0x1];_0x17f5b0&&_0x17f5b0[_0x5559a9(0x49a)]()&&$gameParty[_0x5559a9(0x464)](_0x17f5b0[_0x5559a9(0x49a)](),0x1),this[_0x5559a9(0x363)]['pop']();}else return this['isUseModernControls']()?![]:_0x5b2859[_0x5559a9(0x1f3)][_0x5559a9(0x38a)][_0x5559a9(0x4f3)](this);}while(_0x23718f>this[_0x5559a9(0x363)][_0x5559a9(0x3f9)]){if(_0x5559a9(0x4ca)!==_0x5559a9(0x3cf))this[_0x5559a9(0x363)][_0x5559a9(0x5ec)](new Game_Item());else{const _0x72b002=new _0x54bd69();return _0xd3926b[_0x290136]=_0x72b002,this[_0x5559a9(0x443)](_0x72b002),_0x72b002;}}},Game_Actor['prototype'][_0x18a61c(0x603)]=function(){const _0x1dab27=_0x18a61c,_0x5076b4=this[_0x1dab27(0x237)]();for(let _0x1b6a2f=0x0;_0x1b6a2f<_0x5076b4[_0x1dab27(0x3f9)];_0x1b6a2f++){if(!this[_0x1dab27(0x363)][_0x1b6a2f])this[_0x1dab27(0x363)][_0x1b6a2f]=new Game_Item();}this[_0x1dab27(0x2a2)](![]),this[_0x1dab27(0x499)]();},VisuMZ[_0x18a61c(0x254)]['Game_Actor_changeEquip']=Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x52a)],Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x52a)]=function(_0x590288,_0x579cf1){const _0x25ee47=_0x18a61c;if(!this[_0x25ee47(0x2c1)]){if(_0x25ee47(0x201)!==_0x25ee47(0x201))_0x362675=_0x352167[_0x25ee47(0x56c)](_0x4f3f0f),_0xb99305=_0x1cb452-_0x1ab617[_0x25ee47(0x56c)](_0x7f896b),this[_0x25ee47(0x29e)](_0xaeb1c7['paramchangeTextColor'](_0x1e89b7)),_0xa645f3=(_0x18c891>=0x0?'+':'')+_0x38d666;else{const _0x570b20=JsonEx[_0x25ee47(0x20a)](this);_0x570b20['_tempActor']=!![],VisuMZ[_0x25ee47(0x254)][_0x25ee47(0x468)][_0x25ee47(0x4f3)](this,_0x590288,_0x579cf1),this[_0x25ee47(0x4d1)](_0x570b20);}}else _0x25ee47(0x3c3)!==_0x25ee47(0x3c3)?(_0x56c4f8[_0x25ee47(0x315)](0x0),_0x360c2e[_0x25ee47(0x315)](-0x1),this['_forcedSlots']=_0x1c1fc5,this[_0x25ee47(0x499)](),this[_0x25ee47(0x3ab)]()):VisuMZ[_0x25ee47(0x254)]['Game_Actor_changeEquip'][_0x25ee47(0x4f3)](this,_0x590288,_0x579cf1);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x599)]=Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x343)],Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x343)]=function(_0x363879,_0x2b6efc){const _0x3970e4=_0x18a61c;if(!this['_tempActor']){if(_0x3970e4(0x50f)==='pfBJs'){const _0x23fb94=JsonEx[_0x3970e4(0x20a)](this);_0x23fb94[_0x3970e4(0x2c1)]=!![],VisuMZ[_0x3970e4(0x254)]['Game_Actor_forceChangeEquip'][_0x3970e4(0x4f3)](this,_0x363879,_0x2b6efc),this[_0x3970e4(0x4d1)](_0x23fb94);}else return _0x41aafd[_0x3970e4(0x254)]['Settings'][_0x3970e4(0x1ce)][_0x3970e4(0x31f)];}else _0x3970e4(0x28e)!=='mXXyL'?this['playCursorSound']():VisuMZ['ItemsEquipsCore'][_0x3970e4(0x599)][_0x3970e4(0x4f3)](this,_0x363879,_0x2b6efc);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x2af)]=Game_Actor[_0x18a61c(0x1f3)]['discardEquip'],Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x277)]=function(_0x459f28){const _0x4bbb07=_0x18a61c;if(!this[_0x4bbb07(0x2c1)]){if('UnMlC'===_0x4bbb07(0x429))_0xf4814c['prototype'][_0x4bbb07(0x4aa)][_0x4bbb07(0x4f3)](this),this[_0x4bbb07(0x2c5)]();else{const _0x5628ab=JsonEx[_0x4bbb07(0x20a)](this);_0x5628ab['_tempActor']=!![],VisuMZ[_0x4bbb07(0x254)][_0x4bbb07(0x2af)][_0x4bbb07(0x4f3)](this,_0x459f28),this[_0x4bbb07(0x4d1)](_0x5628ab);}}else VisuMZ['ItemsEquipsCore']['Game_Actor_discardEquip'][_0x4bbb07(0x4f3)](this,_0x459f28);},Game_Actor[_0x18a61c(0x1f3)]['releaseUnequippableItems']=function(_0x30bab6){const _0xca7390=_0x18a61c;if(this[_0xca7390(0x23d)])return;for(;;){if(_0xca7390(0x47b)===_0xca7390(0x47b)){const _0x46c2b6=this['equipSlots'](),_0x1476bc=this[_0xca7390(0x391)](),_0xe71168=_0x1476bc[_0xca7390(0x3f9)];let _0x2e2327=![];for(let _0x3780e3=0x0;_0x3780e3<_0xe71168;_0x3780e3++){const _0x3685a2=_0x1476bc[_0x3780e3];if(_0x3685a2&&(!this[_0xca7390(0x1f5)](_0x3685a2)||_0x3685a2['etypeId']!==_0x46c2b6[_0x3780e3])){if(_0xca7390(0x2fa)===_0xca7390(0x3e0))this[_0xca7390(0x1ae)][_0xca7390(0x46f)](),this[_0xca7390(0x1ae)][_0xca7390(0x56b)]();else{!_0x30bab6&&this['tradeItemWithParty'](null,_0x3685a2);if(!this[_0xca7390(0x2c1)]){const _0x522065=JsonEx[_0xca7390(0x20a)](this);_0x522065['_tempActor']=!![],this[_0xca7390(0x363)][_0x3780e3]['setObject'](null),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=!![],this['equipAdjustHpMp'](_0x522065),this[_0xca7390(0x23d)]=undefined;}else'pjIvS'!==_0xca7390(0x55d)?_0x193c93=_0xca7390(0x4c6)['format'](_0x34af6b['id']):this['_equips'][_0x3780e3][_0xca7390(0x381)](null);_0x2e2327=!![];}}}if(!_0x2e2327)break;}else _0x17a889['ItemsEquipsCore']['Window_EquipStatus_refresh'][_0xca7390(0x4f3)](this);}},Game_Actor[_0x18a61c(0x1f3)]['equipAdjustHpMp']=function(_0x287738){const _0x5a5cf5=_0x18a61c;if(this[_0x5a5cf5(0x2c1)])return;if(!VisuMZ[_0x5a5cf5(0x254)][_0x5a5cf5(0x52e)][_0x5a5cf5(0x1ce)][_0x5a5cf5(0x2cd)])return;const _0x36b002=Math[_0x5a5cf5(0x27b)](_0x287738[_0x5a5cf5(0x466)]()*this[_0x5a5cf5(0x39d)]),_0x42076c=Math[_0x5a5cf5(0x27b)](_0x287738[_0x5a5cf5(0x545)]()*this['mmp']);if(this['hp']>0x0)this[_0x5a5cf5(0x529)](_0x36b002);if(this['mp']>0x0)this[_0x5a5cf5(0x408)](_0x42076c);},Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x289)]=function(){const _0x623644=_0x18a61c,_0x29f1f7=this[_0x623644(0x237)]()[_0x623644(0x3f9)];for(let _0x3c902c=0x0;_0x3c902c<_0x29f1f7;_0x3c902c++){if('fIhsE'==='fIhsE'){if(this[_0x623644(0x494)](_0x3c902c))this['changeEquip'](_0x3c902c,null);}else this[_0x623644(0x437)]();}},Game_Actor['prototype']['isClearEquipOk']=function(_0x59174f){const _0x3573a4=_0x18a61c;return this[_0x3573a4(0x1da)]()['includes'](this[_0x3573a4(0x237)]()[_0x59174f])?![]:this[_0x3573a4(0x563)](_0x59174f);},Game_Actor[_0x18a61c(0x1f3)]['nonRemovableEtypes']=function(){const _0x31d395=_0x18a61c;return VisuMZ[_0x31d395(0x254)][_0x31d395(0x52e)][_0x31d395(0x1ce)][_0x31d395(0x31e)];},Game_Actor['prototype']['optimizeEquipments']=function(){const _0x1a0918=_0x18a61c,_0xd6f579=this[_0x1a0918(0x237)]()[_0x1a0918(0x3f9)];for(let _0x1b2772=0x0;_0x1b2772<_0xd6f579;_0x1b2772++){if(this[_0x1a0918(0x4e6)](_0x1b2772))this[_0x1a0918(0x52a)](_0x1b2772,null);}for(let _0x1ca0dd=0x0;_0x1ca0dd<_0xd6f579;_0x1ca0dd++){if('WFkHY'!==_0x1a0918(0x422)){if(!_0x5273aa[_0x1a0918(0x470)](_0x39f762))return!![];}else{if(this[_0x1a0918(0x4e6)](_0x1ca0dd))this[_0x1a0918(0x52a)](_0x1ca0dd,this['bestEquipItem'](_0x1ca0dd));}}},Game_Actor['prototype'][_0x18a61c(0x4e6)]=function(_0x5517d6){const _0x5b1b14=_0x18a61c;return this[_0x5b1b14(0x2ac)]()['includes'](this['equipSlots']()[_0x5517d6])?![]:this[_0x5b1b14(0x563)](_0x5517d6);},Game_Actor['prototype']['nonOptimizeEtypes']=function(){const _0x5102ab=_0x18a61c;return VisuMZ[_0x5102ab(0x254)][_0x5102ab(0x52e)][_0x5102ab(0x1ce)][_0x5102ab(0x458)];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x41b)]=Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x5c2)],Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x5c2)]=function(_0x1d3d2b,_0x41d0cd){const _0xc0c893=_0x18a61c;if(this['_tempActor'])return![];$gameTemp[_0xc0c893(0x3ac)]=!![];const _0xdad819=VisuMZ[_0xc0c893(0x254)][_0xc0c893(0x41b)]['call'](this,_0x1d3d2b,_0x41d0cd);return $gameTemp[_0xc0c893(0x3ac)]=![],_0xdad819;},Game_Actor['prototype']['changeEquipById']=function(_0x3838fb,_0x3c0e32){const _0x51ee14=_0x18a61c,_0x4d099e=this['getNextAvailableEtypeId'](_0x3838fb);if(_0x4d099e<0x0)return;const _0x43900c=_0x3838fb===0x1?$dataWeapons[_0x3c0e32]:$dataArmors[_0x3c0e32];this[_0x51ee14(0x52a)](_0x4d099e,_0x43900c);},Game_Actor[_0x18a61c(0x1f3)][_0x18a61c(0x565)]=function(_0x4a38c4){const _0x38dca5=_0x18a61c;let _0x132640=0x0;const _0x28f0d=this[_0x38dca5(0x237)](),_0x46b4ec=this['equips']();for(let _0x13d432=0x0;_0x13d432<_0x28f0d[_0x38dca5(0x3f9)];_0x13d432++){if(_0x38dca5(0x1d1)===_0x38dca5(0x37c)){if(this[_0x38dca5(0x5ae)]())return this[_0x38dca5(0x247)][_0x38dca5(0x1e5)]/0x5/-0x3;return _0x1e7bca['prototype'][_0x38dca5(0x412)][_0x38dca5(0x4f3)](this);}else{if(_0x28f0d[_0x13d432]===_0x4a38c4){_0x132640=_0x13d432;if(!_0x46b4ec[_0x13d432])return _0x132640;}}}return _0x132640;},VisuMZ[_0x18a61c(0x254)]['Game_Actor_paramPlus']=Game_Actor['prototype'][_0x18a61c(0x53f)],Game_Actor['prototype'][_0x18a61c(0x53f)]=function(_0x512d48){const _0xdaadcb=_0x18a61c;let _0x40e764=VisuMZ[_0xdaadcb(0x254)]['Game_Actor_paramPlus'][_0xdaadcb(0x4f3)](this,_0x512d48);for(const _0x3c1a6c of this['equips']()){if(_0xdaadcb(0x400)===_0xdaadcb(0x400)){if(_0x3c1a6c)_0x40e764+=this['paramPlusItemsEquipsCoreCustomJS'](_0x3c1a6c,_0x512d48);}else return _0x5cbc09['uiInputPosition'];}return _0x40e764;},Game_Actor['prototype']['paramPlusItemsEquipsCoreCustomJS']=function(_0x1b4fc4,_0x337bff){const _0x73dc26=_0x18a61c;if(this[_0x73dc26(0x259)])return 0x0;const _0x53cc85=(DataManager[_0x73dc26(0x3b7)](_0x1b4fc4)?_0x73dc26(0x52b):'A%1')[_0x73dc26(0x57c)](_0x1b4fc4['id']),_0x44b1c0='%1-%2'[_0x73dc26(0x57c)](_0x53cc85,_0x337bff);if(VisuMZ[_0x73dc26(0x254)][_0x73dc26(0x440)][_0x44b1c0]){this['_calculatingJSParameters']=!![];const _0x266f20=VisuMZ[_0x73dc26(0x254)][_0x73dc26(0x440)][_0x44b1c0]['call'](this,_0x1b4fc4,_0x337bff);return this[_0x73dc26(0x259)]=![],_0x266f20;}else return 0x0;},Game_Actor['prototype'][_0x18a61c(0x1cb)]=function(_0x4ce856){const _0x2491a4=_0x18a61c;this['_shopStatusMenuMode']=!![],this[_0x2491a4(0x413)]=_0x4ce856;},VisuMZ[_0x18a61c(0x254)]['Game_Party_initialize']=Game_Party[_0x18a61c(0x1f3)]['initialize'],Game_Party[_0x18a61c(0x1f3)][_0x18a61c(0x517)]=function(){const _0x107a1b=_0x18a61c;VisuMZ[_0x107a1b(0x254)][_0x107a1b(0x1b6)][_0x107a1b(0x4f3)](this),this['initNewItemsList']();},Game_Party[_0x18a61c(0x1f3)][_0x18a61c(0x4b4)]=function(){const _0x3eff09=_0x18a61c;this[_0x3eff09(0x524)]=[];},Game_Party[_0x18a61c(0x1f3)][_0x18a61c(0x24f)]=function(_0x442717){const _0xfb8d44=_0x18a61c;if(!$gameTemp[_0xfb8d44(0x493)]())return![];if(this[_0xfb8d44(0x524)]===undefined)this['initNewItemsList']();let _0xea8bb5='';if(DataManager[_0xfb8d44(0x290)](_0x442717)){if('jtgbt'!=='ltgWM')_0xea8bb5=_0xfb8d44(0x4c6)[_0xfb8d44(0x57c)](_0x442717['id']);else return _0x4dc00c['ItemsEquipsCore'][_0xfb8d44(0x52e)][_0xfb8d44(0x489)][_0xfb8d44(0x1d6)];}else{if(DataManager[_0xfb8d44(0x3b7)](_0x442717))_0xea8bb5=_0xfb8d44(0x376)[_0xfb8d44(0x57c)](_0x442717['id']);else{if(DataManager[_0xfb8d44(0x194)](_0x442717))_0xfb8d44(0x2ff)==='RSrhP'?this[_0xfb8d44(0x1f4)](_0x532a30):_0xea8bb5=_0xfb8d44(0x286)[_0xfb8d44(0x57c)](_0x442717['id']);else return;}}return this[_0xfb8d44(0x524)][_0xfb8d44(0x366)](_0xea8bb5);},Game_Party[_0x18a61c(0x1f3)][_0x18a61c(0x4fa)]=function(_0x2560cf){const _0x32bb73=_0x18a61c;if(!$gameTemp[_0x32bb73(0x493)]())return;if(this[_0x32bb73(0x524)]===undefined)this[_0x32bb73(0x4b4)]();let _0x2b144a='';if(DataManager[_0x32bb73(0x290)](_0x2560cf))_0x2b144a=_0x32bb73(0x4c6)[_0x32bb73(0x57c)](_0x2560cf['id']);else{if(DataManager[_0x32bb73(0x3b7)](_0x2560cf)){if('yenOs'===_0x32bb73(0x3ff))_0x2b144a=_0x32bb73(0x376)[_0x32bb73(0x57c)](_0x2560cf['id']);else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x32bb73(0x224)]():_0x12b7e1[_0x32bb73(0x254)][_0x32bb73(0x5d2)][_0x32bb73(0x4f3)](this);}else{if(DataManager[_0x32bb73(0x194)](_0x2560cf))'soRXP'!==_0x32bb73(0x36b)?_0x2b144a=_0x32bb73(0x286)['format'](_0x2560cf['id']):_0x4a028c+='%1'[_0x32bb73(0x57c)](this['_itemData']['selfTP']);else{if(_0x32bb73(0x296)!=='vFydX')return;else return _0x24c864[_0x32bb73(0x581)]('up',_0x32bb73(0x5e6));}}}if(!this[_0x32bb73(0x524)]['includes'](_0x2b144a))this[_0x32bb73(0x524)][_0x32bb73(0x5ec)](_0x2b144a);},Game_Party['prototype'][_0x18a61c(0x228)]=function(_0x403beb){const _0x5ee251=_0x18a61c;if(!$gameTemp[_0x5ee251(0x493)]())return;if(this[_0x5ee251(0x524)]===undefined)this[_0x5ee251(0x4b4)]();let _0x56fd23='';if(DataManager[_0x5ee251(0x290)](_0x403beb)){if(_0x5ee251(0x26e)===_0x5ee251(0x26e))_0x56fd23=_0x5ee251(0x4c6)[_0x5ee251(0x57c)](_0x403beb['id']);else{const _0x5dbfcc=new _0x1a5515(0x0,0x0,_0x578b58['width'],_0x2bf99e['height']);this[_0x5ee251(0x235)]=new _0x1d6f3c(_0x5dbfcc),this[_0x5ee251(0x235)]['opacity']=0x0,this['addChild'](this[_0x5ee251(0x235)]),this[_0x5ee251(0x314)]();}}else{if(DataManager[_0x5ee251(0x3b7)](_0x403beb)){if(_0x5ee251(0x39f)!==_0x5ee251(0x501))_0x56fd23='weapon-%1'[_0x5ee251(0x57c)](_0x403beb['id']);else return _0x5ee251(0x554)[_0x5ee251(0x57c)](_0x2dd863(_0x13b0b3['$1']));}else{if(DataManager[_0x5ee251(0x194)](_0x403beb))_0x56fd23=_0x5ee251(0x286)[_0x5ee251(0x57c)](_0x403beb['id']);else{if(_0x5ee251(0x2e5)===_0x5ee251(0x4af))return _0x548bdb[_0x5ee251(0x254)][_0x5ee251(0x52e)][_0x5ee251(0x1ce)][_0x5ee251(0x2d6)];else return;}}}this['_newItemsList'][_0x5ee251(0x366)](_0x56fd23)&&this[_0x5ee251(0x524)][_0x5ee251(0x297)](this['_newItemsList']['indexOf'](_0x56fd23),0x1);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x37d)]=Game_Party[_0x18a61c(0x1f3)][_0x18a61c(0x464)],Game_Party[_0x18a61c(0x1f3)][_0x18a61c(0x464)]=function(_0x5a096a,_0x1c1352,_0x5ee6de){const _0x36e1b4=_0x18a61c,_0x13f6b3=this[_0x36e1b4(0x2aa)](_0x5a096a);VisuMZ[_0x36e1b4(0x254)][_0x36e1b4(0x37d)][_0x36e1b4(0x4f3)](this,_0x5a096a,_0x1c1352,_0x5ee6de);if(this[_0x36e1b4(0x2aa)](_0x5a096a)>_0x13f6b3)this['setNewItem'](_0x5a096a);},Game_Party[_0x18a61c(0x1f3)][_0x18a61c(0x4fc)]=function(_0x2303a1){return DataManager['maxItemAmount'](_0x2303a1);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x213)]=Scene_ItemBase['prototype'][_0x18a61c(0x5df)],Scene_ItemBase['prototype'][_0x18a61c(0x5df)]=function(){const _0x21ca90=_0x18a61c;VisuMZ[_0x21ca90(0x254)]['Scene_ItemBase_activateItemWindow'][_0x21ca90(0x4f3)](this),this['_itemWindow'][_0x21ca90(0x36e)]();},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x25b)]=function(){const _0x7ac926=_0x18a61c;if(ConfigManager[_0x7ac926(0x2bd)]&&ConfigManager[_0x7ac926(0x35b)]!==undefined){if('KYNyw'!==_0x7ac926(0x44b))return ConfigManager[_0x7ac926(0x35b)];else this[_0x7ac926(0x1ae)][_0x7ac926(0x269)](0x0),this[_0x7ac926(0x360)][_0x7ac926(0x56b)]();}else{if(this[_0x7ac926(0x206)]())return this[_0x7ac926(0x1e4)]()['match'](/LOWER/i);else Scene_ItemBase[_0x7ac926(0x1f3)][_0x7ac926(0x543)][_0x7ac926(0x4f3)](this);}},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x543)]=function(){const _0x4f9396=_0x18a61c;if(ConfigManager[_0x4f9396(0x2bd)]&&ConfigManager[_0x4f9396(0x54c)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x4f9396(0x206)]())return this['updatedLayoutStyle']()[_0x4f9396(0x23c)](/RIGHT/i);else Scene_ItemBase[_0x4f9396(0x1f3)][_0x4f9396(0x543)][_0x4f9396(0x4f3)](this);}},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x1e4)]=function(){const _0x1b845c=_0x18a61c;return VisuMZ[_0x1b845c(0x254)]['Settings'][_0x1b845c(0x483)][_0x1b845c(0x5a8)];},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x1ed)]=function(){const _0x54a672=_0x18a61c;return this[_0x54a672(0x47a)]&&this[_0x54a672(0x47a)][_0x54a672(0x1ed)]();},Scene_Item[_0x18a61c(0x1f3)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x307a10=_0x18a61c;return VisuMZ['ItemsEquipsCore']['Settings'][_0x307a10(0x483)][_0x307a10(0x2d6)];},VisuMZ['ItemsEquipsCore']['Scene_Item_create']=Scene_Item['prototype']['create'],Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x1b0)]=function(){const _0xcd9a9=_0x18a61c;VisuMZ[_0xcd9a9(0x254)][_0xcd9a9(0x26c)][_0xcd9a9(0x4f3)](this),this['isUseModernControls']()&&('yprJY'===_0xcd9a9(0x5b0)?this['onCategoryOk']():(!this['isHandled'](_0xcd9a9(0x33e))&&_0x4f2f94[_0xcd9a9(0x403)]('pagedown')&&this[_0xcd9a9(0x1a0)](),!this['isHandled'](_0xcd9a9(0x4dc))&&_0x13ec81[_0xcd9a9(0x403)]('pageup')&&this[_0xcd9a9(0x5cc)]()));},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x58c)]=Scene_Item['prototype']['helpWindowRect'],Scene_Item['prototype']['helpWindowRect']=function(){const _0x260329=_0x18a61c;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x260329(0x5f1)!==_0x260329(0x5f1)){if(this[_0x260329(0x394)](_0x44904f))return![];if(this['isSoleWeaponType'](_0x3b2a5e))return![];if(this['isSoleArmorType'](_0x33e22b))return![];}else return this[_0x260329(0x3c0)]();}else return VisuMZ[_0x260329(0x254)][_0x260329(0x58c)][_0x260329(0x4f3)](this);},Scene_Item['prototype'][_0x18a61c(0x3c0)]=function(){const _0x398bd=_0x18a61c,_0x12907b=0x0,_0x110e3f=this[_0x398bd(0x2e7)](),_0x4e4104=Graphics[_0x398bd(0x208)],_0x5644c1=this[_0x398bd(0x1e3)]();return new Rectangle(_0x12907b,_0x110e3f,_0x4e4104,_0x5644c1);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x5ff)]=Scene_Item['prototype'][_0x18a61c(0x4f4)],Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x4f4)]=function(){const _0x2332aa=_0x18a61c;VisuMZ[_0x2332aa(0x254)][_0x2332aa(0x5ff)][_0x2332aa(0x4f3)](this),this[_0x2332aa(0x1ed)]()&&this[_0x2332aa(0x1e2)]();},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x1e2)]=function(){const _0xb5b436=_0x18a61c;delete this[_0xb5b436(0x47a)][_0xb5b436(0x38d)]['ok'],delete this[_0xb5b436(0x47a)][_0xb5b436(0x38d)][_0xb5b436(0x426)];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x52d)]=Scene_Item[_0x18a61c(0x1f3)]['categoryWindowRect'],Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x431)]=function(){const _0x55f982=_0x18a61c;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x55f982(0x478)]():VisuMZ['ItemsEquipsCore']['Scene_Item_categoryWindowRect']['call'](this);},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x478)]=function(){const _0x28222b=_0x18a61c,_0x40a4d1=0x0,_0x4c1e51=this[_0x28222b(0x415)](),_0x5cc21d=Graphics[_0x28222b(0x208)],_0x4fe920=this[_0x28222b(0x1a9)](0x1,!![]);return new Rectangle(_0x40a4d1,_0x4c1e51,_0x5cc21d,_0x4fe920);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x209)]=Scene_Item[_0x18a61c(0x1f3)]['createItemWindow'],Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x2c6)]=function(){const _0x5f55b0=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x5f55b0(0x209)][_0x5f55b0(0x4f3)](this);this[_0x5f55b0(0x1ed)]()&&this['postCreateItemWindowModernControls']();if(this['allowCreateStatusWindow']()){if('HDzmt'!==_0x5f55b0(0x51d)){const _0x4222ca=_0x579996[_0x5f55b0(0x2d7)]('['+_0x101514['$1'][_0x5f55b0(0x23c)](/\d+/g)+']');for(const _0x64c80f of _0x4222ca){if(!_0x1082ce[_0x5f55b0(0x470)](_0x64c80f))return![];}}else this[_0x5f55b0(0x506)]();}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x4d8)]=Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x555)],Scene_Item[_0x18a61c(0x1f3)]['itemWindowRect']=function(){const _0x571ead=_0x18a61c;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x571ead(0x2f7)]();else{if(_0x571ead(0x1f6)===_0x571ead(0x384))return _0x567e8d[_0x571ead(0x254)]['Settings']['StatusWindow']['Translucent'];else{const _0x14fcba=VisuMZ[_0x571ead(0x254)][_0x571ead(0x4d8)]['call'](this);if(this[_0x571ead(0x2d5)]()&&this[_0x571ead(0x1a3)]()){if(_0x571ead(0x5d8)===_0x571ead(0x2ef)){this[_0x571ead(0x359)]['clear']();if(!this[_0x571ead(0x2c4)])return;if(this[_0x571ead(0x42c)]()){const _0x4edce3=_0x113dad[_0x571ead(0x50e)](this[_0x571ead(0x2c4)]['getMenuImage']());_0x4edce3[_0x571ead(0x5c7)](this['onMenuImageLoad'][_0x571ead(0x265)](this));}else this['refreshItemsEquipsCoreNoMenuImage']();}else _0x14fcba['width']-=this[_0x571ead(0x495)]();}return _0x14fcba;}}},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x2f7)]=function(){const _0xe2d3bc=_0x18a61c,_0x1bc53c=this[_0xe2d3bc(0x543)]()?this[_0xe2d3bc(0x495)]():0x0,_0x412db2=this[_0xe2d3bc(0x47a)]['y']+this[_0xe2d3bc(0x47a)]['height'],_0x2fe46c=Graphics[_0xe2d3bc(0x208)]-this[_0xe2d3bc(0x495)](),_0x40bfcc=this['mainAreaBottom']()-_0x412db2;return new Rectangle(_0x1bc53c,_0x412db2,_0x2fe46c,_0x40bfcc);},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x479)]=function(){const _0x191b2d=_0x18a61c;this[_0x191b2d(0x231)][_0x191b2d(0x5e9)](_0x191b2d(0x426),this[_0x191b2d(0x4f6)][_0x191b2d(0x265)](this));},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x2d5)]=function(){const _0x282696=_0x18a61c;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ[_0x282696(0x254)]['Settings']['ItemScene']['ShowShopStatus'];},Scene_Item['prototype'][_0x18a61c(0x1a3)]=function(){const _0x420c81=_0x18a61c;return VisuMZ[_0x420c81(0x254)][_0x420c81(0x52e)][_0x420c81(0x483)][_0x420c81(0x2e0)];},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x506)]=function(){const _0x5d4ca2=_0x18a61c,_0xd38806=this[_0x5d4ca2(0x1a6)]();this[_0x5d4ca2(0x5a9)]=new Window_ShopStatus(_0xd38806),this[_0x5d4ca2(0x3a6)](this[_0x5d4ca2(0x5a9)]),this[_0x5d4ca2(0x231)][_0x5d4ca2(0x564)](this[_0x5d4ca2(0x5a9)]);const _0x540b11=VisuMZ['ItemsEquipsCore'][_0x5d4ca2(0x52e)][_0x5d4ca2(0x483)][_0x5d4ca2(0x5a7)];this['_statusWindow'][_0x5d4ca2(0x245)](_0x540b11||0x0);},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x1a6)]=function(){const _0x3cf4e2=_0x18a61c;return this[_0x3cf4e2(0x206)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x3cf4e2(0x254)]['Settings'][_0x3cf4e2(0x483)][_0x3cf4e2(0x278)][_0x3cf4e2(0x4f3)](this);},Scene_Item[_0x18a61c(0x1f3)]['statusWindowRectItemsEquipsCore']=function(){const _0x3bb798=_0x18a61c,_0x8285e1=this[_0x3bb798(0x495)](),_0x5c0bfa=this[_0x3bb798(0x231)][_0x3bb798(0x1d8)],_0x210f06=this[_0x3bb798(0x543)]()?0x0:Graphics[_0x3bb798(0x208)]-this[_0x3bb798(0x495)](),_0x891f6=this[_0x3bb798(0x231)]['y'];return new Rectangle(_0x210f06,_0x891f6,_0x8285e1,_0x5c0bfa);},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x495)]=function(){const _0x148a6e=_0x18a61c;return Scene_Shop[_0x148a6e(0x1f3)][_0x148a6e(0x495)]();},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x4a3)]=function(){const _0x332000=_0x18a61c;if(!this[_0x332000(0x1e4)]())return![];if(!this[_0x332000(0x1ed)]())return![];if(!this[_0x332000(0x231)])return![];if(!this[_0x332000(0x231)][_0x332000(0x200)])return![];return this[_0x332000(0x1e4)]()&&this[_0x332000(0x1ed)]();},Scene_Item[_0x18a61c(0x1f3)][_0x18a61c(0x3e3)]=function(){const _0x25ed89=_0x18a61c;if(this[_0x25ed89(0x4a3)]())return this[_0x25ed89(0x231)][_0x25ed89(0x26b)]()===0x1?TextManager[_0x25ed89(0x581)](_0x25ed89(0x3c6),_0x25ed89(0x608)):'klcpD'!=='klcpD'?this[_0x25ed89(0x206)]()?!![]:_0x421426['ItemsEquipsCore'][_0x25ed89(0x52e)][_0x25ed89(0x483)]['ShowShopStatus']:TextManager[_0x25ed89(0x581)](_0x25ed89(0x4dc),'pagedown');return Scene_ItemBase[_0x25ed89(0x1f3)][_0x25ed89(0x3e3)][_0x25ed89(0x4f3)](this);},Scene_Item[_0x18a61c(0x1f3)]['buttonAssistText1']=function(){const _0x56c19e=_0x18a61c;if(this[_0x56c19e(0x4a3)]())return VisuMZ[_0x56c19e(0x254)][_0x56c19e(0x52e)][_0x56c19e(0x483)]['buttonAssistCategory'];return Scene_ItemBase[_0x56c19e(0x1f3)][_0x56c19e(0x270)]['call'](this);},Scene_Equip['prototype'][_0x18a61c(0x25b)]=function(){const _0x1e2461=_0x18a61c;if(ConfigManager[_0x1e2461(0x2bd)]&&ConfigManager[_0x1e2461(0x35b)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x1e2461(0x206)]())return this[_0x1e2461(0x1e4)]()[_0x1e2461(0x23c)](/LOWER/i);else Scene_MenuBase[_0x1e2461(0x1f3)][_0x1e2461(0x543)]['call'](this);}},Scene_Equip['prototype'][_0x18a61c(0x543)]=function(){const _0x1e10a1=_0x18a61c;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x1e10a1(0x54c)]!==undefined){if('zAHme'!==_0x1e10a1(0x573)){const _0x2ec387=this['itemPadding']();let _0x9ad11b=0x0,_0x278dcd=0x0,_0x41452f='';if(this[_0x1e10a1(0x2c1)]){_0x40c610[_0x1e10a1(0x2bf)]?(_0x9ad11b=this[_0x1e10a1(0x2c4)][_0x1e10a1(0x2f5)](_0x26099a,![]),_0x278dcd=this[_0x1e10a1(0x2c1)][_0x1e10a1(0x2f5)](_0x348cb9,![]),_0x41452f=this[_0x1e10a1(0x2c1)][_0x1e10a1(0x2f5)](_0x544b2b,!![])):(_0x9ad11b=this[_0x1e10a1(0x2c4)]['param'](_0x42bead),_0x278dcd=this[_0x1e10a1(0x2c1)][_0x1e10a1(0x56c)](_0x4808fa),_0x41452f=this[_0x1e10a1(0x2c1)][_0x1e10a1(0x56c)](_0x5be67a));const _0x2e7ba2=_0x9ad11b,_0xc1dfdb=_0x278dcd;_0x4ef5d5=_0xc1dfdb-_0x2e7ba2,this[_0x1e10a1(0x29e)](_0x35f0dc[_0x1e10a1(0x316)](_0x2a92ae)),this['drawText'](_0x41452f,_0x299997,_0x308481,_0x137e5f-_0x2ec387,_0x1e10a1(0x608));}}else return ConfigManager[_0x1e10a1(0x54c)];}else{if(this[_0x1e10a1(0x206)]())return this[_0x1e10a1(0x1e4)]()['match'](/RIGHT/i);else Scene_MenuBase[_0x1e10a1(0x1f3)][_0x1e10a1(0x543)][_0x1e10a1(0x4f3)](this);}},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x1e4)]=function(){const _0x4214c2=_0x18a61c;return VisuMZ[_0x4214c2(0x254)][_0x4214c2(0x52e)][_0x4214c2(0x1ce)][_0x4214c2(0x5a8)];},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x1ed)]=function(){const _0x14bac0=_0x18a61c;return this[_0x14bac0(0x1ae)]&&this['_commandWindow'][_0x14bac0(0x1ed)]();},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x206)]=function(){const _0x5b49b8=_0x18a61c;return VisuMZ['ItemsEquipsCore'][_0x5b49b8(0x52e)][_0x5b49b8(0x1ce)][_0x5b49b8(0x2d6)];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x5ad)]=Scene_Equip[_0x18a61c(0x1f3)]['create'],Scene_Equip['prototype']['create']=function(){const _0xdb5189=_0x18a61c;VisuMZ[_0xdb5189(0x254)]['Scene_Equip_create'][_0xdb5189(0x4f3)](this),this[_0xdb5189(0x1ed)]()&&this[_0xdb5189(0x5f9)]();},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x547)]=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x4a5)],Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x4a5)]=function(){const _0xecc418=_0x18a61c;return this[_0xecc418(0x206)]()?this[_0xecc418(0x3c0)]():VisuMZ['ItemsEquipsCore']['Scene_Equip_helpWindowRect'][_0xecc418(0x4f3)](this);},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x3c0)]=function(){const _0x1ee2cf=_0x18a61c,_0x42a9f3=0x0,_0xc306e2=this['helpAreaTop'](),_0x11ad99=Graphics[_0x1ee2cf(0x208)],_0x52d20e=this[_0x1ee2cf(0x1e3)]();return new Rectangle(_0x42a9f3,_0xc306e2,_0x11ad99,_0x52d20e);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x5d2)]=Scene_Equip[_0x18a61c(0x1f3)]['statusWindowRect'],Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x1a6)]=function(){const _0x15f0f1=_0x18a61c;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x15f0f1(0x224)]():VisuMZ['ItemsEquipsCore'][_0x15f0f1(0x5d2)]['call'](this);},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x224)]=function(){const _0x403959=_0x18a61c,_0x5742ef=this[_0x403959(0x543)]()?0x0:Graphics[_0x403959(0x208)]-this['statusWidth'](),_0x31c47f=this['mainAreaTop'](),_0x734072=this[_0x403959(0x495)](),_0xc7c974=this[_0x403959(0x1f9)]();return new Rectangle(_0x5742ef,_0x31c47f,_0x734072,_0xc7c974);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x2d0)]=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x3a4)],Scene_Equip['prototype'][_0x18a61c(0x3a4)]=function(){const _0x424be2=_0x18a61c;return this[_0x424be2(0x206)]()?_0x424be2(0x295)!==_0x424be2(0x295)?_0x48cea7[_0x424be2(0x254)]['Settings'][_0x424be2(0x1ce)]['CmdStyle']:this[_0x424be2(0x368)]():_0x424be2(0x541)===_0x424be2(0x4b5)?![]:VisuMZ[_0x424be2(0x254)][_0x424be2(0x2d0)][_0x424be2(0x4f3)](this);},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x4a0)]=function(){const _0x3df4fe=_0x18a61c,_0x15825e=VisuMZ[_0x3df4fe(0x254)][_0x3df4fe(0x52e)]['EquipScene'];return _0x15825e['CommandAddOptimize']||_0x15825e[_0x3df4fe(0x2fd)];},Scene_Equip[_0x18a61c(0x1f3)]['commandWindowRectItemsEquipsCore']=function(){const _0x2f95fd=_0x18a61c,_0x385d9d=this['shouldCommandWindowExist'](),_0xb5a0e7=this['isRightInputMode']()?this['statusWidth']():0x0,_0x46a7eb=this[_0x2f95fd(0x415)](),_0x2f247b=Graphics[_0x2f95fd(0x208)]-this[_0x2f95fd(0x495)](),_0x1a388b=_0x385d9d?this[_0x2f95fd(0x1a9)](0x1,!![]):0x0;return new Rectangle(_0xb5a0e7,_0x46a7eb,_0x2f247b,_0x1a388b);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x54b)]=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x19a)],Scene_Equip['prototype'][_0x18a61c(0x19a)]=function(){const _0x1ed84e=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x1ed84e(0x54b)][_0x1ed84e(0x4f3)](this),this[_0x1ed84e(0x1ed)]()&&this[_0x1ed84e(0x3b8)]();},VisuMZ[_0x18a61c(0x254)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x41d)],Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x41d)]=function(){const _0x41a057=_0x18a61c;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x41a057(0x4e5)]():VisuMZ[_0x41a057(0x254)]['Scene_Equip_slotWindowRect'][_0x41a057(0x4f3)](this);},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x4e5)]=function(){const _0x4e9aef=_0x18a61c,_0x32080e=this[_0x4e9aef(0x3a4)](),_0x3f26fe=this[_0x4e9aef(0x543)]()?this[_0x4e9aef(0x495)]():0x0,_0x4b6643=_0x32080e['y']+_0x32080e[_0x4e9aef(0x1d8)],_0x18b96d=Graphics[_0x4e9aef(0x208)]-this[_0x4e9aef(0x495)](),_0x59b6a6=this[_0x4e9aef(0x1f9)]()-_0x32080e[_0x4e9aef(0x1d8)];return new Rectangle(_0x3f26fe,_0x4b6643,_0x18b96d,_0x59b6a6);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x51e)]=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x555)],Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x555)]=function(){const _0x8b6054=_0x18a61c;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x8b6054(0x41d)]();else{if('xydCU'!==_0x8b6054(0x522))return VisuMZ['ItemsEquipsCore'][_0x8b6054(0x51e)][_0x8b6054(0x4f3)](this);else{const _0x289531=_0x8b6054(0x3f8)[_0x8b6054(0x57c)](_0x49826d);_0x1d130e[_0x8b6054(0x254)][_0x8b6054(0x552)][_0x8b6054(0x3bc)][_0x8b6054(0x5ec)](new _0x432066(_0x289531,'i'));const _0x730158='\x5cb%1\x5cb'[_0x8b6054(0x57c)](_0x5d437e);_0x11a47d[_0x8b6054(0x254)][_0x8b6054(0x552)][_0x8b6054(0x45f)][_0x8b6054(0x5ec)](new _0x3b7b47(_0x730158,'g'));}}},Scene_Equip['prototype']['statusWidth']=function(){const _0x458e65=_0x18a61c;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x458e65(0x442)]():VisuMZ[_0x458e65(0x254)][_0x458e65(0x52e)][_0x458e65(0x1ce)][_0x458e65(0x459)];},Scene_Equip[_0x18a61c(0x1f3)]['geUpdatedLayoutStatusWidth']=function(){return Math['floor'](Graphics['boxWidth']/0x2);},Scene_Equip['prototype'][_0x18a61c(0x3b8)]=function(){const _0x45a7c1=_0x18a61c;this['_slotWindow'][_0x45a7c1(0x5e9)](_0x45a7c1(0x426),this[_0x45a7c1(0x4f6)][_0x45a7c1(0x265)](this)),this[_0x45a7c1(0x360)][_0x45a7c1(0x5e9)](_0x45a7c1(0x33e),this[_0x45a7c1(0x31a)][_0x45a7c1(0x265)](this)),this[_0x45a7c1(0x360)][_0x45a7c1(0x5e9)](_0x45a7c1(0x4dc),this[_0x45a7c1(0x433)][_0x45a7c1(0x265)](this));},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x59d)]=Scene_Equip['prototype'][_0x18a61c(0x5f9)],Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x5f9)]=function(){const _0x4b8998=_0x18a61c;if(this[_0x4b8998(0x1ed)]()){if(_0x4b8998(0x5d9)!=='SyVNj'){if(!_0x2def75[_0x4b8998(0x470)](_0x14feab))return!![];}else this[_0x4b8998(0x1ae)][_0x4b8998(0x46f)](),this[_0x4b8998(0x1ae)][_0x4b8998(0x56b)]();}VisuMZ[_0x4b8998(0x254)][_0x4b8998(0x59d)][_0x4b8998(0x4f3)](this);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x354)]=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x20e)],Scene_Equip['prototype'][_0x18a61c(0x20e)]=function(){const _0x266596=_0x18a61c;this[_0x266596(0x360)]['index']()>=0x0?(VisuMZ[_0x266596(0x254)]['Scene_Equip_onSlotOk'][_0x266596(0x4f3)](this),this[_0x266596(0x5d0)]()):(this[_0x266596(0x360)]['smoothSelect'](0x0),this['_slotWindow'][_0x266596(0x590)]());},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x5d0)]=function(){const _0x52d642=_0x18a61c;this[_0x52d642(0x231)][_0x52d642(0x499)]();const _0x306068=this[_0x52d642(0x360)]['item'](),_0x2fcb23=this[_0x52d642(0x231)][_0x52d642(0x5b8)][_0x52d642(0x218)](_0x306068),_0x490dfc=Math[_0x52d642(0x1f7)](this[_0x52d642(0x231)][_0x52d642(0x5b3)]()/0x2)-0x1;this[_0x52d642(0x231)]['smoothSelect'](_0x2fcb23>=0x0?_0x2fcb23:0x0),this[_0x52d642(0x231)][_0x52d642(0x41e)](this[_0x52d642(0x231)]['index']()-_0x490dfc);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x31d)]=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x2d4)],Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x2d4)]=function(){const _0x2ec20e=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x2ec20e(0x31d)][_0x2ec20e(0x4f3)](this),this[_0x2ec20e(0x1ed)]()&&(this[_0x2ec20e(0x1ae)][_0x2ec20e(0x269)](0x0),this['_slotWindow'][_0x2ec20e(0x56b)]());},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x33b)]=Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x25c)],Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x25c)]=function(){const _0x5bae62=_0x18a61c;VisuMZ[_0x5bae62(0x254)]['Scene_Equip_onActorChange'][_0x5bae62(0x4f3)](this);if(this[_0x5bae62(0x1ed)]()){if('bxbOh'==='bxbOh')this[_0x5bae62(0x1ae)][_0x5bae62(0x56b)](),this['_commandWindow'][_0x5bae62(0x46f)](),this[_0x5bae62(0x360)][_0x5bae62(0x269)](0x0),this[_0x5bae62(0x360)][_0x5bae62(0x590)]();else{const _0xf1a0b2=_0x1a2226[_0x5bae62(0x29d)][_0x5bae62(0x218)](_0x15b1af[_0x5bae62(0x3a9)]());if(_0xf1a0b2>0x0)_0x417448[_0x5bae62(0x237)][_0x5bae62(0x5ec)](_0xf1a0b2);}}},Scene_Equip[_0x18a61c(0x1f3)]['buttonAssistSlotWindowShift']=function(){const _0x514a29=_0x18a61c;if(!this[_0x514a29(0x360)])return![];if(!this['_slotWindow'][_0x514a29(0x200)])return![];return this[_0x514a29(0x360)][_0x514a29(0x48b)]();},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x32d)]=function(){const _0x27f2ca=_0x18a61c;if(this[_0x27f2ca(0x5ae)]()){if(_0x27f2ca(0x40d)===_0x27f2ca(0x40d))return TextManager[_0x27f2ca(0x344)](_0x27f2ca(0x28b));else{if(_0xa566d3[_0x27f2ca(0x470)](_0x4dd1f0))return!![];}}return Scene_MenuBase['prototype']['buttonAssistKey3'][_0x27f2ca(0x4f3)](this);},Scene_Equip['prototype'][_0x18a61c(0x434)]=function(){const _0x4fe353=_0x18a61c;if(this[_0x4fe353(0x5ae)]()){if(_0x4fe353(0x226)!=='APaaP')return VisuMZ[_0x4fe353(0x254)][_0x4fe353(0x52e)][_0x4fe353(0x1ce)][_0x4fe353(0x5e4)];else _0x46165c[_0x4fe353(0x5ec)](_0x3eb77b[_0x42744c]);}return Scene_MenuBase[_0x4fe353(0x1f3)][_0x4fe353(0x434)][_0x4fe353(0x4f3)](this);},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x412)]=function(){const _0x1578d9=_0x18a61c;if(this[_0x1578d9(0x5ae)]())return _0x1578d9(0x509)!==_0x1578d9(0x509)?_0x1578d9(0x535)[_0x1578d9(0x57c)](_0x4dbed4(_0x495f86['$1'])):this['_buttonAssistWindow'][_0x1578d9(0x1e5)]/0x5/-0x3;return Scene_MenuBase[_0x1578d9(0x1f3)][_0x1578d9(0x412)][_0x1578d9(0x4f3)](this);},Scene_Equip[_0x18a61c(0x1f3)][_0x18a61c(0x4f6)]=function(){const _0x57b02a=_0x18a61c;SceneManager[_0x57b02a(0x18d)]();},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x3dd)]=Scene_Load[_0x18a61c(0x1f3)][_0x18a61c(0x427)],Scene_Load['prototype'][_0x18a61c(0x427)]=function(){const _0x19b6f8=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x19b6f8(0x3dd)]['call'](this),this[_0x19b6f8(0x4cc)]();},Scene_Load[_0x18a61c(0x1f3)][_0x18a61c(0x4cc)]=function(){const _0x191eb4=_0x18a61c;if($gameSystem[_0x191eb4(0x56d)]()!==$dataSystem[_0x191eb4(0x56d)]){if(_0x191eb4(0x56f)!==_0x191eb4(0x579))for(const _0x387ebd of $gameActors['_data']){if(_0x191eb4(0x306)!==_0x191eb4(0x197)){if(_0x387ebd)_0x387ebd[_0x191eb4(0x603)]();}else{const _0x1d9791=_0x5db0c6[_0x191eb4(0x2d7)]('['+_0x4def27['$1'][_0x191eb4(0x23c)](/\d+/g)+']');for(const _0x2975ce of _0x1d9791){if(!_0x55eb12[_0x191eb4(0x470)](_0x2975ce))return![];}return!![];}}else this['deactivate'](),this[_0x191eb4(0x46f)]();}},Scene_Shop[_0x18a61c(0x1f3)]['isBottomHelpMode']=function(){const _0x5a4142=_0x18a61c;if(ConfigManager[_0x5a4142(0x2bd)]&&ConfigManager[_0x5a4142(0x35b)]!==undefined)return ConfigManager[_0x5a4142(0x35b)];else{if(this[_0x5a4142(0x206)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_MenuBase[_0x5a4142(0x1f3)][_0x5a4142(0x543)]['call'](this);}},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x543)]=function(){const _0x14dbf9=_0x18a61c;if(ConfigManager[_0x14dbf9(0x2bd)]&&ConfigManager[_0x14dbf9(0x54c)]!==undefined){if(_0x14dbf9(0x273)===_0x14dbf9(0x5d6)){if(this['isOptimizeEquipOk'](_0x6753b3))this[_0x14dbf9(0x52a)](_0x5ad35d,null);}else return ConfigManager[_0x14dbf9(0x54c)];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x14dbf9(0x1e4)]()[_0x14dbf9(0x23c)](/RIGHT/i);else Scene_MenuBase[_0x14dbf9(0x1f3)][_0x14dbf9(0x543)]['call'](this);}},Scene_Shop[_0x18a61c(0x1f3)]['updatedLayoutStyle']=function(){const _0x5449e4=_0x18a61c;return VisuMZ[_0x5449e4(0x254)][_0x5449e4(0x52e)][_0x5449e4(0x331)]['LayoutStyle'];},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x1ed)]=function(){const _0x27748c=_0x18a61c;return this['_categoryWindow']&&this[_0x27748c(0x47a)][_0x27748c(0x1ed)]();},Scene_Shop[_0x18a61c(0x1f3)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x607444=_0x18a61c;return VisuMZ['ItemsEquipsCore'][_0x607444(0x52e)][_0x607444(0x331)][_0x607444(0x2d6)];},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x3ce)]=Scene_Shop[_0x18a61c(0x1f3)]['prepare'],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3a1)]=function(_0x5e75ed,_0x20cf2b){const _0x3d28d8=_0x18a61c;_0x5e75ed=JsonEx[_0x3d28d8(0x20a)](_0x5e75ed),VisuMZ[_0x3d28d8(0x254)][_0x3d28d8(0x3ce)][_0x3d28d8(0x4f3)](this,_0x5e75ed,_0x20cf2b),this[_0x3d28d8(0x3fc)]();},Scene_Shop['prototype'][_0x18a61c(0x3fc)]=function(){const _0x957c5a=_0x18a61c;this[_0x957c5a(0x5cd)]=0x0;for(const _0x12c28e of this['_goods']){_0x957c5a(0x54a)!==_0x957c5a(0x59e)?this[_0x957c5a(0x490)](_0x12c28e)?this[_0x957c5a(0x5cd)]++:_0x12c28e[0x0]=-0x1:_0x4ebaec['setValue'](_0x4349c7[_0x957c5a(0x399)],![]);}},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x490)]=function(_0x5536){const _0x1aee50=_0x18a61c;if(_0x5536[0x0]>0x2||_0x5536[0x0]<0x0)return![];const _0x370ba0=[$dataItems,$dataWeapons,$dataArmors][_0x5536[0x0]][_0x5536[0x1]];if(!_0x370ba0)return![];const _0x450812=_0x370ba0[_0x1aee50(0x447)]||'';if(_0x450812[_0x1aee50(0x23c)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1aee50(0x418)===_0x1aee50(0x418)){const _0x106b95=JSON['parse']('['+RegExp['$1'][_0x1aee50(0x23c)](/\d+/g)+']');for(const _0x595868 of _0x106b95){if(!$gameSwitches[_0x1aee50(0x470)](_0x595868))return![];}return!![];}else{_0x3aa7b8+=_0x1aee50(0x419)['format'](_0xfa28ab[_0x1aee50(0x3df)]),_0x29c7f3++;if(_0x5e3243>=_0x12f3f3)return _0x175b86;}}if(_0x450812[_0x1aee50(0x23c)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1aee50(0x1fe)!==_0x1aee50(0x53e)){const _0xaab84b=JSON[_0x1aee50(0x2d7)]('['+RegExp['$1'][_0x1aee50(0x23c)](/\d+/g)+']');for(const _0x4897b7 of _0xaab84b){if(!$gameSwitches['value'](_0x4897b7))return![];}return!![];}else this[_0x1aee50(0x363)]['push'](new _0x481ce3());}if(_0x450812[_0x1aee50(0x23c)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a9d59=JSON[_0x1aee50(0x2d7)]('['+RegExp['$1'][_0x1aee50(0x23c)](/\d+/g)+']');for(const _0x1f8074 of _0x4a9d59){if(_0x1aee50(0x4b2)==='DjOHg'){if($gameSwitches[_0x1aee50(0x470)](_0x1f8074))return!![];}else{if(!this['isEquipItem']())return![];const _0x32c3d6=_0x4cf25c[_0x1aee50(0x29d)][this['_item'][_0x1aee50(0x189)]];return this[_0x1aee50(0x4ae)](_0x32c3d6,_0x1d2c76,_0x434daf,_0x45ec33,!![]),this[_0x1aee50(0x5ea)](_0x1225b3,_0x1227ab,_0x5e8230),this[_0x1aee50(0x2ab)](),!![];}}return![];}if(_0x450812[_0x1aee50(0x23c)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x9c1f08=JSON[_0x1aee50(0x2d7)]('['+RegExp['$1'][_0x1aee50(0x23c)](/\d+/g)+']');for(const _0x4510ab of _0x9c1f08){if(!$gameSwitches[_0x1aee50(0x470)](_0x4510ab))return!![];}return![];}if(_0x450812[_0x1aee50(0x23c)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b932a=JSON['parse']('['+RegExp['$1'][_0x1aee50(0x23c)](/\d+/g)+']');for(const _0x5b9ac0 of _0x2b932a){if(!$gameSwitches[_0x1aee50(0x470)](_0x5b9ac0))return!![];}return![];}if(_0x450812[_0x1aee50(0x23c)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x550233=JSON[_0x1aee50(0x2d7)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xe97f7d of _0x550233){if($gameSwitches[_0x1aee50(0x470)](_0xe97f7d))return![];}return!![];}return!![];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x593)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x1b0)],Scene_Shop['prototype'][_0x18a61c(0x1b0)]=function(){const _0x1258bd=_0x18a61c;VisuMZ[_0x1258bd(0x254)][_0x1258bd(0x593)]['call'](this),this[_0x1258bd(0x206)]()&&(_0x1258bd(0x49c)===_0x1258bd(0x5f5)?(this['addEquipCommand'](),this[_0x1258bd(0x283)](),this[_0x1258bd(0x1c8)]()):this['postCreateItemsEquipsCore']()),this[_0x1258bd(0x326)]();},Scene_Shop['prototype'][_0x18a61c(0x3d8)]=function(){const _0x586121=_0x18a61c;this[_0x586121(0x4b9)][_0x586121(0x5c8)](),this[_0x586121(0x5e2)]['show'](),this[_0x586121(0x5e2)][_0x586121(0x46f)](),this[_0x586121(0x5a9)][_0x586121(0x45e)]();},VisuMZ[_0x18a61c(0x254)]['Scene_Shop_helpWindowRect']=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x4a5)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x4a5)]=function(){const _0x464cd9=_0x18a61c;return this['isUseItemsEquipsCoreUpdatedLayout']()?_0x464cd9(0x2f2)==='uoLfj'?_0x1a90df[_0x464cd9(0x1f3)][_0x464cd9(0x40c)][_0x464cd9(0x4f3)](this,_0xb36718):this[_0x464cd9(0x3c0)]():_0x464cd9(0x5f8)!==_0x464cd9(0x335)?VisuMZ[_0x464cd9(0x254)]['Scene_Shop_helpWindowRect'][_0x464cd9(0x4f3)](this):!!_0x4685e8&&_0xc7f2[_0x464cd9(0x5e7)][_0x464cd9(0x366)](_0x5bac89(_0x27ece4['$1'])[_0x464cd9(0x3ad)]()['trim']());},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3c0)]=function(){const _0xa0eee6=_0x18a61c,_0x23f628=0x0,_0x2df693=this[_0xa0eee6(0x2e7)](),_0x55be50=Graphics[_0xa0eee6(0x208)],_0x475ed=this['helpAreaHeight']();return new Rectangle(_0x23f628,_0x2df693,_0x55be50,_0x475ed);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x32b)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x58d)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x58d)]=function(){const _0x1095b8=_0x18a61c;return this[_0x1095b8(0x206)]()?'BvnyS'!==_0x1095b8(0x1f8)?_0x5d36b7['ItemsEquipsCore']['Scene_Shop_commandWindowRect']['call'](this):this[_0x1095b8(0x3f6)]():VisuMZ[_0x1095b8(0x254)][_0x1095b8(0x32b)][_0x1095b8(0x4f3)](this);},Scene_Shop[_0x18a61c(0x1f3)]['goldWindowRectItemsEquipsCore']=function(){const _0x528933=_0x18a61c,_0x19bd48=this[_0x528933(0x191)](),_0x2c3109=this[_0x528933(0x1a9)](0x1,!![]),_0x598383=this[_0x528933(0x543)]()?0x0:Graphics[_0x528933(0x208)]-_0x19bd48,_0x6a8df4=this['mainAreaTop']();return new Rectangle(_0x598383,_0x6a8df4,_0x19bd48,_0x2c3109);},VisuMZ[_0x18a61c(0x254)]['Scene_Shop_commandWindowRect']=Scene_Shop['prototype'][_0x18a61c(0x3a4)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3a4)]=function(){const _0x454e93=_0x18a61c;if(this[_0x454e93(0x206)]()){if(_0x454e93(0x1a8)===_0x454e93(0x1dd))this[_0x454e93(0x21e)](_0x31e2bc,_0x5a6060['x']+_0x5eab4a[_0x454e93(0x1e5)]-_0x451dde,_0x372b6a['y'],_0x1d6879);else return this['commandWindowRectItemsEquipsCore']();}else return VisuMZ[_0x454e93(0x254)][_0x454e93(0x550)][_0x454e93(0x4f3)](this);},Scene_Shop[_0x18a61c(0x1f3)]['commandWindowRectItemsEquipsCore']=function(){const _0x32f8ae=_0x18a61c,_0x5cb362=this[_0x32f8ae(0x543)]()?this['mainCommandWidth']():0x0,_0x3262d2=this['mainAreaTop'](),_0x4a87b9=Graphics[_0x32f8ae(0x208)]-this[_0x32f8ae(0x191)](),_0x56c1bd=this[_0x32f8ae(0x1a9)](0x1,!![]);return new Rectangle(_0x5cb362,_0x3262d2,_0x4a87b9,_0x56c1bd);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x4fb)]=Scene_Shop['prototype'][_0x18a61c(0x207)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x207)]=function(){const _0x262e89=_0x18a61c;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x262e89(0x36a)]():VisuMZ[_0x262e89(0x254)][_0x262e89(0x4fb)]['call'](this);},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x36a)]=function(){const _0x341912=_0x18a61c,_0x3235dc=this['_commandWindow']['y']+this[_0x341912(0x1ae)][_0x341912(0x1d8)],_0x57ccd6=Graphics[_0x341912(0x208)]-this[_0x341912(0x495)](),_0x3673a0=this[_0x341912(0x543)]()?Graphics['boxWidth']-_0x57ccd6:0x0,_0x503314=this[_0x341912(0x1f9)]()-this[_0x341912(0x1ae)][_0x341912(0x1d8)];return new Rectangle(_0x3673a0,_0x3235dc,_0x57ccd6,_0x503314);},VisuMZ[_0x18a61c(0x254)]['Scene_Shop_statusWindowRect']=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x1a6)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x1a6)]=function(){const _0x5d5568=_0x18a61c;if(this[_0x5d5568(0x206)]())return this[_0x5d5568(0x224)]();else{if(_0x5d5568(0x1aa)===_0x5d5568(0x24e)){const _0x2a2b2c=_0x5d5568(0x4e1);if(this[_0x5d5568(0x463)][_0x2a2b2c])return this[_0x5d5568(0x463)][_0x2a2b2c];if(this['_item'][_0x5d5568(0x556)][_0x5d5568(0x242)]<=-0x1)return _0xcbd36[_0x5d5568(0x254)][_0x5d5568(0x52e)]['StatusWindow'][_0x5d5568(0x27a)];else return this[_0x5d5568(0x35a)][_0x5d5568(0x556)][_0x5d5568(0x242)]===0x0?_0x5ac66d['ItemsEquipsCore'][_0x5d5568(0x52e)]['StatusWindow'][_0x5d5568(0x2a8)]:_0x3a23f4[_0x5d5568(0x1d0)][this[_0x5d5568(0x35a)]['damage'][_0x5d5568(0x242)]];}else return VisuMZ['ItemsEquipsCore'][_0x5d5568(0x3b1)][_0x5d5568(0x4f3)](this);}},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x224)]=function(){const _0x506106=_0x18a61c,_0x54a20f=this[_0x506106(0x495)](),_0x814387=this[_0x506106(0x1f9)]()-this['_commandWindow'][_0x506106(0x1d8)],_0x39274f=this['isRightInputMode']()?0x0:Graphics[_0x506106(0x208)]-_0x54a20f,_0x2f002d=this['_commandWindow']['y']+this[_0x506106(0x1ae)]['height'];return new Rectangle(_0x39274f,_0x2f002d,_0x54a20f,_0x814387);},VisuMZ['ItemsEquipsCore']['Scene_Shop_buyWindowRect']=Scene_Shop['prototype'][_0x18a61c(0x609)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x609)]=function(){const _0x1fbc68=_0x18a61c;if(this[_0x1fbc68(0x206)]()){if('ixPrI'!=='Mfjge')return this['buyWindowRectItemsEquipsCore']();else _0x2a8531[_0x1fbc68(0x3a2)][_0x1cd2a8]=_0x2fa792(_0xb5869b['$1']);}else return VisuMZ['ItemsEquipsCore'][_0x1fbc68(0x5ef)][_0x1fbc68(0x4f3)](this);},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x417)]=function(){const _0x2c9c62=_0x18a61c,_0x3b9b2b=this[_0x2c9c62(0x1ae)]['y']+this[_0x2c9c62(0x1ae)][_0x2c9c62(0x1d8)],_0x6fe836=Graphics[_0x2c9c62(0x208)]-this[_0x2c9c62(0x495)](),_0x4a3aa7=this[_0x2c9c62(0x1f9)]()-this[_0x2c9c62(0x1ae)][_0x2c9c62(0x1d8)],_0x233811=this[_0x2c9c62(0x543)]()?Graphics[_0x2c9c62(0x208)]-_0x6fe836:0x0;return new Rectangle(_0x233811,_0x3b9b2b,_0x6fe836,_0x4a3aa7);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x1a5)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x4f4)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x4f4)]=function(){const _0x201da2=_0x18a61c;VisuMZ[_0x201da2(0x254)][_0x201da2(0x1a5)]['call'](this),this[_0x201da2(0x1ed)]()&&this[_0x201da2(0x1e2)]();},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x4f9)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x431)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x431)]=function(){const _0x29c957=_0x18a61c;return this[_0x29c957(0x206)]()?this[_0x29c957(0x478)]():_0x29c957(0x587)!==_0x29c957(0x587)?!!_0x6732d9&&_0x23fc8b[_0x29c957(0x189)]===_0x40f557(_0x43a461['$1']):VisuMZ[_0x29c957(0x254)][_0x29c957(0x4f9)]['call'](this);},Scene_Shop[_0x18a61c(0x1f3)]['categoryWindowRectItemsEquipsCore']=function(){const _0x559ab6=_0x18a61c,_0x5e511c=this['_commandWindow']['y'],_0x14bb0f=this[_0x559ab6(0x1ae)][_0x559ab6(0x1e5)],_0x1618da=this[_0x559ab6(0x1a9)](0x1,!![]),_0x1afdc1=this[_0x559ab6(0x543)]()?Graphics['boxWidth']-_0x14bb0f:0x0;return new Rectangle(_0x1afdc1,_0x5e511c,_0x14bb0f,_0x1618da);},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x1e2)]=function(){const _0x545898=_0x18a61c;delete this[_0x545898(0x47a)]['_handlers']['ok'],delete this['_categoryWindow'][_0x545898(0x38d)][_0x545898(0x426)];},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x50a)]=Scene_Shop[_0x18a61c(0x1f3)]['createSellWindow'],Scene_Shop['prototype'][_0x18a61c(0x364)]=function(){const _0x4cc9f1=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x4cc9f1(0x50a)][_0x4cc9f1(0x4f3)](this);if(this[_0x4cc9f1(0x206)]()){if(_0x4cc9f1(0x369)!==_0x4cc9f1(0x30e))this[_0x4cc9f1(0x4e7)]();else{const _0x514903=_0x4cc9f1(0x46d);if(!this[_0x4cc9f1(0x328)][_0x4cc9f1(0x27f)]&&!this['_customItemInfo'][_0x514903])return![];const _0x495ca1=this[_0x4cc9f1(0x1d7)]();this['drawItemKeyData'](_0x495ca1,_0x1e5f2f,_0x346cea,_0x176c78,!![]);const _0x4219f5=this[_0x4cc9f1(0x584)]();return this[_0x4cc9f1(0x4ae)](_0x4219f5,_0x1869ed,_0xb63c67,_0x97c1e4,![],_0x4cc9f1(0x608)),this[_0x4cc9f1(0x5ea)](_0x2f2355,_0x4aa28b,_0x26ae04),this['resetFontSettings'](),!![];}}},VisuMZ[_0x18a61c(0x254)]['Scene_Shop_sellWindowRect']=Scene_Shop['prototype'][_0x18a61c(0x597)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x597)]=function(){const _0x47d87f=_0x18a61c;if(this[_0x47d87f(0x206)]())return this['sellWindowRectItemsEquipsCore']();else{if(_0x47d87f(0x2a9)===_0x47d87f(0x2a9))return VisuMZ[_0x47d87f(0x254)][_0x47d87f(0x407)]['call'](this);else this[_0x47d87f(0x585)](!![]);}},Scene_Shop[_0x18a61c(0x1f3)]['sellWindowRectItemsEquipsCore']=function(){const _0xad57c5=_0x18a61c,_0x7f3dd1=this[_0xad57c5(0x47a)]['y']+this[_0xad57c5(0x47a)][_0xad57c5(0x1d8)],_0x11c474=Graphics['boxWidth']-this[_0xad57c5(0x495)](),_0x13e833=this[_0xad57c5(0x1f9)]()-this[_0xad57c5(0x47a)][_0xad57c5(0x1d8)],_0xdeb5b7=this[_0xad57c5(0x543)]()?Graphics[_0xad57c5(0x208)]-_0x11c474:0x0;return new Rectangle(_0xdeb5b7,_0x7f3dd1,_0x11c474,_0x13e833);},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x4e7)]=function(){const _0x12eec6=_0x18a61c;this[_0x12eec6(0x2d1)][_0x12eec6(0x564)](this[_0x12eec6(0x5a9)]);},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x495)]=function(){const _0x3c79a9=_0x18a61c;return VisuMZ['ItemsEquipsCore'][_0x3c79a9(0x52e)]['StatusWindow']['Width'];},VisuMZ[_0x18a61c(0x254)]['Scene_Shop_activateSellWindow']=Scene_Shop[_0x18a61c(0x1f3)]['activateSellWindow'],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3e2)]=function(){const _0x5caba6=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x5caba6(0x2a0)][_0x5caba6(0x4f3)](this),this[_0x5caba6(0x206)]()&&(_0x5caba6(0x5f4)!==_0x5caba6(0x25f)?this[_0x5caba6(0x5a9)][_0x5caba6(0x45e)]():(_0x190cb2+=_0x37a864(_0x4c765d['$1']),_0x3813e3+=_0x1fe7bd(_0xbc10c7['$2']))),this[_0x5caba6(0x2d1)][_0x5caba6(0x1cd)]();},VisuMZ[_0x18a61c(0x254)]['Scene_Shop_commandBuy']=Scene_Shop[_0x18a61c(0x1f3)]['commandBuy'],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x2a5)]=function(){const _0x1461bc=_0x18a61c;VisuMZ[_0x1461bc(0x254)][_0x1461bc(0x285)][_0x1461bc(0x4f3)](this),this[_0x1461bc(0x206)]()&&this[_0x1461bc(0x595)]();},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x595)]=function(){const _0x1bb699=_0x18a61c;this[_0x1bb699(0x3cb)]=this[_0x1bb699(0x3cb)]||0x0,this[_0x1bb699(0x5e2)][_0x1bb699(0x269)](this[_0x1bb699(0x3cb)]);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x27e)]=Scene_Shop['prototype'][_0x18a61c(0x3c8)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3c8)]=function(){const _0x2dfbfc=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x2dfbfc(0x27e)][_0x2dfbfc(0x4f3)](this),this[_0x2dfbfc(0x206)]()&&(_0x2dfbfc(0x2e8)!==_0x2dfbfc(0x2e8)?_0x2e2dc3=_0x2dfbfc(0x48d):this['commandSellItemsEquipsCore']()),this[_0x2dfbfc(0x1ed)]()&&(this[_0x2dfbfc(0x47a)][_0x2dfbfc(0x269)](0x0),this['onCategoryOk']());},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3f5)]=function(){const _0x13c3c8=_0x18a61c;this[_0x13c3c8(0x5e2)][_0x13c3c8(0x5c8)](),this[_0x13c3c8(0x1ae)][_0x13c3c8(0x5c8)]();},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x195)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x460)],Scene_Shop['prototype'][_0x18a61c(0x460)]=function(){const _0x27744c=_0x18a61c;VisuMZ[_0x27744c(0x254)][_0x27744c(0x195)][_0x27744c(0x4f3)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&(_0x27744c(0x21f)!=='lBoMs'?this[_0x27744c(0x437)]():(_0x1bef55[_0x27744c(0x254)]['Scene_Equip_createSlotWindow'][_0x27744c(0x4f3)](this),this[_0x27744c(0x1ed)]()&&this[_0x27744c(0x3b8)]()));},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x437)]=function(){const _0x53a715=_0x18a61c;this[_0x53a715(0x3cb)]=this[_0x53a715(0x5e2)][_0x53a715(0x4f1)](),this[_0x53a715(0x5e2)]['show'](),this[_0x53a715(0x5e2)][_0x53a715(0x46f)](),this['_buyWindow'][_0x53a715(0x241)](0x0,0x0),this[_0x53a715(0x5a9)][_0x53a715(0x45e)](),this[_0x53a715(0x4b9)][_0x53a715(0x5c8)]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_onCategoryCancel']=Scene_Shop[_0x18a61c(0x1f3)]['onCategoryCancel'],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x4b8)]=function(){const _0x23104c=_0x18a61c;VisuMZ[_0x23104c(0x254)]['Scene_Shop_onCategoryCancel'][_0x23104c(0x4f3)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x23104c(0x3f3)]();},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3f3)]=function(){const _0xdaedb2=_0x18a61c;this[_0xdaedb2(0x5e2)][_0xdaedb2(0x45e)](),this[_0xdaedb2(0x1ae)][_0xdaedb2(0x45e)]();},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x475)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x1bb)],Scene_Shop[_0x18a61c(0x1f3)]['onSellOk']=function(){const _0x5af6cf=_0x18a61c;VisuMZ[_0x5af6cf(0x254)][_0x5af6cf(0x475)]['call'](this),this[_0x5af6cf(0x206)]()&&this[_0x5af6cf(0x577)]();},Scene_Shop[_0x18a61c(0x1f3)]['onSellOkItemsEquipsCore']=function(){const _0x5b03fb=_0x18a61c;this[_0x5b03fb(0x47a)][_0x5b03fb(0x45e)]();},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x5d3)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x4c2)],Scene_Shop['prototype'][_0x18a61c(0x4c2)]=function(){const _0x200259=_0x18a61c;VisuMZ[_0x200259(0x254)][_0x200259(0x5d3)][_0x200259(0x4f3)](this);this[_0x200259(0x1ed)]()&&this[_0x200259(0x4b8)]();if(this[_0x200259(0x206)]()){if(_0x200259(0x1a7)!==_0x200259(0x1a7)){const _0x913e61=_0x200259(0x2e3);if(this[_0x200259(0x463)][_0x913e61])return this['_customItemInfo'][_0x913e61];let _0x57858e='';if(this[_0x200259(0x328)][_0x200259(0x38e)]<0x0)_0x57858e+='%1%'[_0x200259(0x57c)](_0x5a049e[_0x200259(0x1f7)](this[_0x200259(0x328)]['rateHP']*0x64));if(this[_0x200259(0x328)]['rateHP']<0x0&&this[_0x200259(0x328)]['flatHP']<0x0)_0x57858e+='\x20';if(this['_itemData']['flatHP']<0x0)_0x57858e+='%1'['format'](this[_0x200259(0x328)]['flatHP']);return _0x57858e;}else this[_0x200259(0x4b9)][_0x200259(0x5c8)]();}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x1e0)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x229)],Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x229)]=function(){const _0x58f252=_0x18a61c;let _0x56aef1=this[_0x58f252(0x23e)]();const _0x3902d0=this['_item'];return _0x56aef1=VisuMZ['ItemsEquipsCore']['Settings'][_0x58f252(0x331)][_0x58f252(0x5c3)]['call'](this,_0x3902d0,_0x56aef1),_0x56aef1;},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x23e)]=function(){const _0x4d52b3=_0x18a61c;let _0x132834=this[_0x4d52b3(0x35a)][_0x4d52b3(0x36c)];if(!this[_0x4d52b3(0x35a)])return 0x0;else{if(this[_0x4d52b3(0x35a)]['note']['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x5d2715=String(RegExp['$1']);let _0x28c6a6=this[_0x4d52b3(0x35a)],_0x54e737=_0x132834*this['sellPriceRate']();try{'UxXSj'==='DEKvt'?(_0xf9aa50['a']=_0x1d3d9e,_0x4144b4['b']=_0x4e9210):eval(_0x5d2715);}catch(_0x9d994c){if($gameTemp['isPlaytest']())console[_0x4d52b3(0x57e)](_0x9d994c);}if(isNaN(_0x54e737))_0x54e737=0x0;return Math['floor'](_0x54e737);}else return this['_item']['note'][_0x4d52b3(0x23c)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x4d52b3(0x1f7)](this[_0x4d52b3(0x250)]());}},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x250)]=function(){const _0x27d151=_0x18a61c;return this[_0x27d151(0x35a)][_0x27d151(0x36c)]*this[_0x27d151(0x244)]();},Scene_Shop['prototype']['sellPriceRate']=function(){const _0x2cdac4=_0x18a61c;return VisuMZ[_0x2cdac4(0x254)]['Settings'][_0x2cdac4(0x331)]['SellPriceRate'];},Scene_Shop['prototype'][_0x18a61c(0x4a3)]=function(){const _0x17684b=_0x18a61c;if(!this['updatedLayoutStyle']())return![];if(!this[_0x17684b(0x1ed)]())return![];if(!this[_0x17684b(0x2d1)])return![];if(!this[_0x17684b(0x2d1)][_0x17684b(0x200)])return![];return this['updatedLayoutStyle']()&&this['isUseModernControls']();},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x3e3)]=function(){const _0x391a29=_0x18a61c;if(this['buttonAssistItemListRequirement']()){if(_0x391a29(0x3cd)==='HzWUy')this[_0x391a29(0x585)](![]);else return this[_0x391a29(0x2d1)]['maxCols']()===0x1?TextManager[_0x391a29(0x581)](_0x391a29(0x3c6),'right'):TextManager[_0x391a29(0x581)](_0x391a29(0x4dc),_0x391a29(0x33e));}else{if(this[_0x391a29(0x497)]&&this[_0x391a29(0x497)][_0x391a29(0x200)]){if(_0x391a29(0x227)!==_0x391a29(0x264))return TextManager[_0x391a29(0x581)](_0x391a29(0x3c6),_0x391a29(0x608));else{const _0xa2c3da=_0xbf6241[_0x391a29(0x254)][_0x391a29(0x52e)][_0x391a29(0x1ce)];return _0xa2c3da[_0x391a29(0x3b6)]||_0xa2c3da[_0x391a29(0x2fd)];}}}return Scene_MenuBase['prototype'][_0x391a29(0x3e3)][_0x391a29(0x4f3)](this);},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x2bc)]=function(){const _0x4167ef=_0x18a61c;if(this[_0x4167ef(0x497)]&&this[_0x4167ef(0x497)][_0x4167ef(0x200)])return TextManager[_0x4167ef(0x581)]('up',_0x4167ef(0x5e6));return Scene_MenuBase[_0x4167ef(0x1f3)][_0x4167ef(0x2bc)]['call'](this);},Scene_Shop[_0x18a61c(0x1f3)]['buttonAssistText1']=function(){const _0x5d1e09=_0x18a61c;if(this[_0x5d1e09(0x4a3)]())return VisuMZ['ItemsEquipsCore']['Settings'][_0x5d1e09(0x483)][_0x5d1e09(0x374)];else{if(this[_0x5d1e09(0x497)]&&this[_0x5d1e09(0x497)]['active'])return VisuMZ[_0x5d1e09(0x254)][_0x5d1e09(0x52e)][_0x5d1e09(0x331)][_0x5d1e09(0x1ca)];}return Scene_MenuBase[_0x5d1e09(0x1f3)][_0x5d1e09(0x270)]['call'](this);},Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x430)]=function(){const _0x4646c0=_0x18a61c;if(this['_numberWindow']&&this[_0x4646c0(0x497)][_0x4646c0(0x200)])return VisuMZ[_0x4646c0(0x254)][_0x4646c0(0x52e)]['ShopScene']['buttonAssistLargeIncrement'];return Scene_MenuBase[_0x4646c0(0x1f3)][_0x4646c0(0x430)][_0x4646c0(0x4f3)](this);},Scene_Shop['prototype'][_0x18a61c(0x326)]=function(){const _0x4607bf=_0x18a61c;if(!SceneManager[_0x4607bf(0x4f8)]())return;const _0x43f625=VisuMZ[_0x4607bf(0x254)][_0x4607bf(0x52e)][_0x4607bf(0x331)];_0x43f625[_0x4607bf(0x1b3)]&&(_0x4607bf(0x217)!==_0x4607bf(0x217)?this['onTouchSelectModern'](!![]):$gameSwitches[_0x4607bf(0x2be)](_0x43f625[_0x4607bf(0x1b3)],![])),_0x43f625[_0x4607bf(0x399)]&&$gameSwitches[_0x4607bf(0x2be)](_0x43f625[_0x4607bf(0x399)],![]);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x52f)]=Scene_Shop[_0x18a61c(0x1f3)]['doBuy'],Scene_Shop['prototype']['doBuy']=function(_0x28fe29){const _0x4bf597=_0x18a61c;VisuMZ[_0x4bf597(0x254)][_0x4bf597(0x52f)][_0x4bf597(0x4f3)](this,_0x28fe29);if(_0x28fe29<=0x0)return;const _0x470835=VisuMZ[_0x4bf597(0x254)]['Settings'][_0x4bf597(0x331)];_0x470835[_0x4bf597(0x1b3)]&&$gameSwitches[_0x4bf597(0x2be)](_0x470835[_0x4bf597(0x1b3)],!![]);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x34e)]=Scene_Shop[_0x18a61c(0x1f3)][_0x18a61c(0x46a)],Scene_Shop['prototype']['doSell']=function(_0x4875eb){const _0x3cd87e=_0x18a61c;VisuMZ[_0x3cd87e(0x254)]['Scene_Shop_doSell'][_0x3cd87e(0x4f3)](this,_0x4875eb);if(_0x4875eb<=0x0)return;const _0x342ae4=VisuMZ[_0x3cd87e(0x254)][_0x3cd87e(0x52e)][_0x3cd87e(0x331)];if(_0x342ae4[_0x3cd87e(0x1b3)]){if(_0x3cd87e(0x5b1)!==_0x3cd87e(0x5b1)){_0x457bff[_0x3cd87e(0x254)]['RegExp']={},_0x4fb3c8[_0x3cd87e(0x254)][_0x3cd87e(0x552)][_0x3cd87e(0x3bc)]=[],_0x23af17['ItemsEquipsCore'][_0x3cd87e(0x552)][_0x3cd87e(0x45f)]=[];const _0x422b08=['MaxHP',_0x3cd87e(0x2a7),'ATK',_0x3cd87e(0x351),_0x3cd87e(0x5fe),_0x3cd87e(0x580),_0x3cd87e(0x3a3),'LUK'];for(const _0x5862a1 of _0x422b08){const _0x1f5226='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x3cd87e(0x57c)](_0x5862a1);_0x2dc407[_0x3cd87e(0x254)]['RegExp']['EquipParams'][_0x3cd87e(0x5ec)](new _0x482347(_0x1f5226,'i'));const _0x1e8713=_0x3cd87e(0x3d1)[_0x3cd87e(0x57c)](_0x5862a1);_0x2d7c0e[_0x3cd87e(0x254)]['RegExp'][_0x3cd87e(0x45f)]['push'](new _0x30d1a6(_0x1e8713,'g'));}}else $gameSwitches[_0x3cd87e(0x2be)](_0x342ae4[_0x3cd87e(0x399)],!![]);}};function Sprite_NewLabel(){this['initialize'](...arguments);}Sprite_NewLabel[_0x18a61c(0x1f3)]=Object['create'](Sprite[_0x18a61c(0x1f3)]),Sprite_NewLabel[_0x18a61c(0x1f3)][_0x18a61c(0x566)]=Sprite_NewLabel,Sprite_NewLabel[_0x18a61c(0x1f3)]['initialize']=function(){const _0x260463=_0x18a61c;Sprite[_0x260463(0x1f3)][_0x260463(0x517)][_0x260463(0x4f3)](this),this[_0x260463(0x539)]();},Sprite_NewLabel[_0x18a61c(0x1f3)][_0x18a61c(0x539)]=function(){const _0x3877ae=_0x18a61c,_0x37aa46=ImageManager[_0x3877ae(0x361)],_0x279928=ImageManager[_0x3877ae(0x1d5)];this[_0x3877ae(0x32a)]=new Bitmap(_0x37aa46,_0x279928),this[_0x3877ae(0x1fa)](),this[_0x3877ae(0x223)]();},Sprite_NewLabel['prototype'][_0x18a61c(0x1fa)]=function(){const _0x11b49a=_0x18a61c,_0x9313d8=VisuMZ[_0x11b49a(0x254)]['Settings']['New'][_0x11b49a(0x372)];if(_0x9313d8<=0x0)return;const _0x5a7312=ImageManager[_0x11b49a(0x4bd)](_0x11b49a(0x5ac)),_0x5211a9=ImageManager['iconWidth'],_0x5c6231=ImageManager[_0x11b49a(0x1d5)],_0x481890=_0x9313d8%0x10*_0x5211a9,_0x43712a=Math[_0x11b49a(0x1f7)](_0x9313d8/0x10)*_0x5c6231;this[_0x11b49a(0x32a)]['blt'](_0x5a7312,_0x481890,_0x43712a,_0x5211a9,_0x5c6231,0x0,0x0);},Sprite_NewLabel[_0x18a61c(0x1f3)]['drawNewLabelText']=function(){const _0x998073=_0x18a61c,_0x29fa3b=VisuMZ['ItemsEquipsCore']['Settings'][_0x998073(0x362)],_0xba80a3=_0x29fa3b[_0x998073(0x339)];if(_0xba80a3==='')return;const _0x65199a=ImageManager[_0x998073(0x361)],_0x50bc99=ImageManager[_0x998073(0x1d5)];this['bitmap'][_0x998073(0x287)]=_0x29fa3b[_0x998073(0x305)]||$gameSystem['mainFontFace'](),this[_0x998073(0x32a)][_0x998073(0x2c7)]=this[_0x998073(0x2a6)](),this[_0x998073(0x32a)]['fontSize']=_0x29fa3b[_0x998073(0x2ae)],this[_0x998073(0x32a)][_0x998073(0x2a4)](_0xba80a3,0x0,_0x50bc99/0x2,_0x65199a,_0x50bc99/0x2,_0x998073(0x32c));},Sprite_NewLabel[_0x18a61c(0x1f3)][_0x18a61c(0x2a6)]=function(){const _0x38c12e=_0x18a61c,_0x4cd553=VisuMZ['ItemsEquipsCore'][_0x38c12e(0x52e)][_0x38c12e(0x362)][_0x38c12e(0x261)];return _0x4cd553['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x38c12e(0x2c7)](_0x4cd553);},Window_Base[_0x18a61c(0x1f3)][_0x18a61c(0x35e)]=function(_0x172faa,_0x17d53c,_0x4ff37c,_0x2726d0){const _0x2c25d3=_0x18a61c;if(_0x172faa){const _0x36a5bd=_0x4ff37c+(this[_0x2c25d3(0x4ce)]()-ImageManager[_0x2c25d3(0x1d5)])/0x2,_0x4c2183=ImageManager[_0x2c25d3(0x361)]+0x4,_0x557fd5=Math[_0x2c25d3(0x47f)](0x0,_0x2726d0-_0x4c2183);this[_0x2c25d3(0x29e)](ColorManager[_0x2c25d3(0x292)](_0x172faa)),this[_0x2c25d3(0x439)](_0x172faa[_0x2c25d3(0x3df)],_0x17d53c,_0x36a5bd),this[_0x2c25d3(0x2a4)](_0x172faa[_0x2c25d3(0x4fd)],_0x17d53c+_0x4c2183,_0x4ff37c,_0x557fd5),this[_0x2c25d3(0x513)]();}},Window_Base[_0x18a61c(0x1f3)][_0x18a61c(0x357)]=function(_0x5cc897,_0x2d54b3,_0x508857,_0x1b3730){const _0x738f40=_0x18a61c;if(this[_0x738f40(0x1f0)](_0x5cc897)){if(_0x738f40(0x1f1)==='SMfSn'){this[_0x738f40(0x2ab)]();const _0x43a208=VisuMZ['ItemsEquipsCore'][_0x738f40(0x52e)][_0x738f40(0x483)],_0x3c20ea=_0x43a208[_0x738f40(0x318)],_0xa3eaa1=_0x3c20ea[_0x738f40(0x57c)]($gameParty['numItems'](_0x5cc897));this[_0x738f40(0x359)][_0x738f40(0x542)]=_0x43a208[_0x738f40(0x18e)],this[_0x738f40(0x2a4)](_0xa3eaa1,_0x2d54b3,_0x508857,_0x1b3730,_0x738f40(0x608)),this[_0x738f40(0x2ab)]();}else _0x166639[_0x738f40(0x44a)](_0x1fe0cf['characterName']());}},Window_Base[_0x18a61c(0x1f3)]['isDrawItemNumber']=function(_0x17a5c2){const _0x1133df=_0x18a61c;if(DataManager[_0x1133df(0x568)](_0x17a5c2))return $dataSystem[_0x1133df(0x446)];return!![];},Window_Base['prototype']['drawItemDarkRect']=function(_0x598795,_0x25f157,_0xac3b60,_0x27bfa0,_0x4d9c73){const _0x22dc93=_0x18a61c;_0x4d9c73=Math['max'](_0x4d9c73||0x1,0x1);while(_0x4d9c73--){if(_0x22dc93(0x49f)==='AqyBS')return _0x2467fd['ItemsEquipsCore'][_0x22dc93(0x547)]['call'](this);else{_0x27bfa0=_0x27bfa0||this['lineHeight'](),this[_0x22dc93(0x602)][_0x22dc93(0x553)]=0xa0;const _0x1607d1=ColorManager[_0x22dc93(0x3d0)]();this[_0x22dc93(0x602)]['fillRect'](_0x598795+0x1,_0x25f157+0x1,_0xac3b60-0x2,_0x27bfa0-0x2,_0x1607d1),this[_0x22dc93(0x602)]['paintOpacity']=0xff;}}},VisuMZ[_0x18a61c(0x254)]['Window_Selectable_initialize']=Window_Selectable[_0x18a61c(0x1f3)][_0x18a61c(0x517)],Window_Selectable[_0x18a61c(0x1f3)][_0x18a61c(0x517)]=function(_0x30afd3){const _0xbbb7e9=_0x18a61c;this[_0xbbb7e9(0x456)](),VisuMZ[_0xbbb7e9(0x254)][_0xbbb7e9(0x20c)][_0xbbb7e9(0x4f3)](this,_0x30afd3);},Window_Selectable['prototype'][_0x18a61c(0x456)]=function(){const _0x4a0a7c=_0x18a61c;this[_0x4a0a7c(0x220)]={},this[_0x4a0a7c(0x221)]=0xff,this[_0x4a0a7c(0x3d5)]=VisuMZ[_0x4a0a7c(0x254)]['Settings']['New'][_0x4a0a7c(0x453)],this[_0x4a0a7c(0x2b4)]=VisuMZ[_0x4a0a7c(0x254)][_0x4a0a7c(0x52e)][_0x4a0a7c(0x362)]['FadeLimit'];},Window_Selectable[_0x18a61c(0x1f3)][_0x18a61c(0x4d2)]=function(){return![];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x598)]=Window_Selectable[_0x18a61c(0x1f3)][_0x18a61c(0x320)],Window_Selectable[_0x18a61c(0x1f3)][_0x18a61c(0x320)]=function(_0x241137){const _0x5b89b4=_0x18a61c;VisuMZ[_0x5b89b4(0x254)]['Window_Selectable_setHelpWindowItem'][_0x5b89b4(0x4f3)](this,_0x241137);if(this[_0x5b89b4(0x4d2)]())this[_0x5b89b4(0x3f1)](_0x241137);},Window_Selectable[_0x18a61c(0x1f3)]['clearNewLabelFromItem']=function(_0x2da998){const _0x4ee2de=_0x18a61c;if(!_0x2da998)return;$gameParty[_0x4ee2de(0x228)](_0x2da998);let _0x1f120d='';if(DataManager['isItem'](_0x2da998))_0x1f120d=_0x4ee2de(0x4c6)[_0x4ee2de(0x57c)](_0x2da998['id']);else{if(DataManager['isWeapon'](_0x2da998))_0x4ee2de(0x48e)===_0x4ee2de(0x48e)?_0x1f120d=_0x4ee2de(0x376)[_0x4ee2de(0x57c)](_0x2da998['id']):_0x2a8bf4[_0x4ee2de(0x1f3)]['processCursorMoveModernControls']['call'](this);else{if(DataManager['isArmor'](_0x2da998)){if(_0x4ee2de(0x22b)!==_0x4ee2de(0x43b))_0x1f120d=_0x4ee2de(0x286)[_0x4ee2de(0x57c)](_0x2da998['id']);else return this[_0x4ee2de(0x583)]?this[_0x4ee2de(0x413)]?_0x39a483[_0x4ee2de(0x49b)]:0x1:_0x1943f6['ItemsEquipsCore'][_0x4ee2de(0x5fb)]['call'](this,_0x1cb9ac);}else{if(_0x4ee2de(0x308)!==_0x4ee2de(0x308)){let _0x154ba8=this[_0x4ee2de(0x23e)]();const _0x3dba95=this['_item'];return _0x154ba8=_0x142322[_0x4ee2de(0x254)][_0x4ee2de(0x52e)]['ShopScene'][_0x4ee2de(0x5c3)][_0x4ee2de(0x4f3)](this,_0x3dba95,_0x154ba8),_0x154ba8;}else return;}}}const _0x4ad9f1=this[_0x4ee2de(0x220)][_0x1f120d];if(_0x4ad9f1)_0x4ad9f1['hide']();},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x385)]=Window_Selectable[_0x18a61c(0x1f3)]['refresh'],Window_Selectable['prototype'][_0x18a61c(0x499)]=function(){const _0x2be207=_0x18a61c;this[_0x2be207(0x551)](),VisuMZ[_0x2be207(0x254)][_0x2be207(0x385)]['call'](this);},Window_Selectable[_0x18a61c(0x1f3)][_0x18a61c(0x551)]=function(){const _0x14783b=_0x18a61c;for(const _0x45cc53 of Object[_0x14783b(0x5f2)](this[_0x14783b(0x220)])){if('AMOCS'!==_0x14783b(0x282)){const _0x24110d=_0xf9c0d8[_0x14783b(0x20a)](_0x399031);_0x24110d[_0x14783b(0x2c1)]=!![];const _0x29f1d9=_0x24110d[_0x14783b(0x237)]()[_0x14783b(0x218)](this[_0x14783b(0x35a)][_0x14783b(0x189)]);if(_0x29f1d9>=0x0)_0x24110d['forceChangeEquip'](_0x29f1d9,this[_0x14783b(0x35a)]);let _0x58d2d8=0x0,_0xf48271=0x0,_0x43a167=0x0;_0x121b10['VisuMZ_0_CoreEngine']?(_0x58d2d8=_0x24110d[_0x14783b(0x2f5)](_0x2c2ea4),_0xf48271=_0x58d2d8-_0x3b0b0c[_0x14783b(0x2f5)](_0x26b187),this[_0x14783b(0x29e)](_0x162e71['paramchangeTextColor'](_0xf48271)),_0x43a167=(_0xf48271>=0x0?'+':'')+_0xbf3285[_0x14783b(0x2b0)](_0xf48271,0x0,_0x4f2b14)):(_0x58d2d8=_0x24110d['param'](_0x201fe2),_0xf48271=_0x58d2d8-_0x5b5277[_0x14783b(0x56c)](_0x5c18d8),this[_0x14783b(0x29e)](_0x3b1133[_0x14783b(0x316)](_0xf48271)),_0x43a167=(_0xf48271>=0x0?'+':'')+_0xf48271);if(_0x43a167==='+0')_0x43a167=_0x3ba3fc[_0x14783b(0x276)];this[_0x14783b(0x2a4)](_0x43a167,_0xaaa86e,_0x4cf3ea,_0x5a72ae,_0x14783b(0x32c));}else _0x45cc53[_0x14783b(0x5c8)]();}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x42b)]=Window_Selectable[_0x18a61c(0x1f3)]['update'],Window_Selectable[_0x18a61c(0x1f3)][_0x18a61c(0x560)]=function(){const _0x2e2636=_0x18a61c;this[_0x2e2636(0x2e4)](),VisuMZ[_0x2e2636(0x254)][_0x2e2636(0x42b)][_0x2e2636(0x4f3)](this);},Window_Selectable['prototype'][_0x18a61c(0x2e4)]=function(){const _0x5b96b3=_0x18a61c;if(!this[_0x5b96b3(0x4d2)]())return;const _0x37ea38=this['_newLabelOpacityUpperLimit'];this[_0x5b96b3(0x221)]+=this[_0x5b96b3(0x3d5)];(this[_0x5b96b3(0x221)]>=_0x37ea38||this[_0x5b96b3(0x221)]<=0x0)&&(this[_0x5b96b3(0x3d5)]*=-0x1);this['_newLabelOpacity']=this['_newLabelOpacity'][_0x5b96b3(0x58a)](0x0,_0x37ea38);for(const _0x220e5c of Object['values'](this[_0x5b96b3(0x220)])){_0x5b96b3(0x5cf)!=='dCimG'?this[_0x5b96b3(0x321)](_0x315282):_0x220e5c['opacity']=this[_0x5b96b3(0x221)];}},Window_Selectable['prototype'][_0x18a61c(0x1bd)]=function(_0x44bfbf){const _0x403e67=_0x18a61c,_0x483caf=this['_newLabelSprites'];if(_0x483caf[_0x44bfbf])return _0x483caf[_0x44bfbf];else{const _0x1fe628=new Sprite_NewLabel();return _0x483caf[_0x44bfbf]=_0x1fe628,this[_0x403e67(0x443)](_0x1fe628),_0x1fe628;}},Window_Selectable['prototype'][_0x18a61c(0x2f8)]=function(_0x5e0241,_0x15d0dc,_0x57cb57){const _0x403ade=_0x18a61c;let _0x283370='';if(DataManager[_0x403ade(0x290)](_0x5e0241))_0x283370=_0x403ade(0x4c6)[_0x403ade(0x57c)](_0x5e0241['id']);else{if(DataManager[_0x403ade(0x3b7)](_0x5e0241))_0x283370=_0x403ade(0x376)['format'](_0x5e0241['id']);else{if(DataManager['isArmor'](_0x5e0241))_0x283370=_0x403ade(0x286)[_0x403ade(0x57c)](_0x5e0241['id']);else return;}}const _0x10a307=this['createNewLabelSprite'](_0x283370);_0x10a307[_0x403ade(0x471)](_0x15d0dc,_0x57cb57),_0x10a307[_0x403ade(0x45e)](),_0x10a307[_0x403ade(0x3c9)]=this[_0x403ade(0x221)];},Window_ItemCategory[_0x18a61c(0x3ed)]=VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x52e)][_0x18a61c(0x5fa)]['List'],Window_ItemCategory[_0x18a61c(0x561)]=[_0x18a61c(0x39b),'HiddenItemB',_0x18a61c(0x54d),_0x18a61c(0x3bb),'AlwaysUsable','BattleUsable',_0x18a61c(0x284),_0x18a61c(0x395)],VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x2ea)]=Window_ItemCategory[_0x18a61c(0x1f3)]['initialize'],Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x517)]=function(_0x218cab){const _0x3d5213=_0x18a61c;VisuMZ[_0x3d5213(0x254)]['Window_ItemCategory_initialize'][_0x3d5213(0x4f3)](this,_0x218cab),this[_0x3d5213(0x5ca)](_0x218cab);},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x5ca)]=function(_0x35e025){const _0xe91344=_0x18a61c,_0x2ea88a=new Rectangle(0x0,0x0,_0x35e025[_0xe91344(0x1e5)],_0x35e025[_0xe91344(0x1d8)]);this[_0xe91344(0x58f)]=new Window_Base(_0x2ea88a),this[_0xe91344(0x58f)]['opacity']=0x0,this[_0xe91344(0x604)](this[_0xe91344(0x58f)]),this[_0xe91344(0x211)]();},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x1ed)]=function(){const _0x24746f=_0x18a61c;return Imported[_0x24746f(0x2bf)]&&Window_HorzCommand[_0x24746f(0x1f3)][_0x24746f(0x1ed)][_0x24746f(0x4f3)](this);},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x28c)]=function(){},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x397)]=function(){const _0x2ae9aa=_0x18a61c;if(!this[_0x2ae9aa(0x1ed)]())Window_HorzCommand['prototype'][_0x2ae9aa(0x397)][_0x2ae9aa(0x4f3)](this);},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x26b)]=function(){const _0x41482f=_0x18a61c;return this['_list']?this[_0x41482f(0x4fc)]():0x4;},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x560)]=function(){const _0x527eb7=_0x18a61c;Window_HorzCommand['prototype'][_0x527eb7(0x560)][_0x527eb7(0x4f3)](this),this[_0x527eb7(0x231)]&&this[_0x527eb7(0x231)][_0x527eb7(0x525)](this[_0x527eb7(0x47c)]());},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x53b)]=function(){const _0x2c5145=_0x18a61c;if(this['isCursorMovable']()){const _0x530348=this[_0x2c5145(0x4f1)]();if(this[_0x2c5145(0x231)]&&this[_0x2c5145(0x231)][_0x2c5145(0x26b)]()<=0x1){if(Input[_0x2c5145(0x192)](_0x2c5145(0x608))){if('QwpoT'===_0x2c5145(0x55f)){const _0x3974a2=this['_commandNameWindow'];_0x3974a2[_0x2c5145(0x2a4)](_0xc82410,0x0,_0x560f86['y'],_0x3974a2['innerWidth'],'center');}else this[_0x2c5145(0x5c9)](Input[_0x2c5145(0x403)](_0x2c5145(0x608)));}Input[_0x2c5145(0x192)](_0x2c5145(0x3c6))&&this['cursorLeft'](Input[_0x2c5145(0x403)](_0x2c5145(0x3c6)));}else{if(this[_0x2c5145(0x231)]&&this['_itemWindow'][_0x2c5145(0x26b)]()>0x1){if('TsDfY'===_0x2c5145(0x387)){if(Input[_0x2c5145(0x192)](_0x2c5145(0x33e))&&!Input['isPressed']('shift')){if('wcAgt'===_0x2c5145(0x405))this[_0x2c5145(0x5c9)](Input[_0x2c5145(0x403)](_0x2c5145(0x33e)));else{let _0x528903=this[_0x2c5145(0x237)]()[_0x2c5145(0x3f9)];while(this[_0x2c5145(0x363)][_0x2c5145(0x3f9)]>_0x528903){const _0x5bee49=this[_0x2c5145(0x363)][this[_0x2c5145(0x363)][_0x2c5145(0x3f9)]-0x1];_0x5bee49&&_0x5bee49['object']()&&_0x24c683[_0x2c5145(0x464)](_0x5bee49[_0x2c5145(0x49a)](),0x1),this[_0x2c5145(0x363)][_0x2c5145(0x18d)]();}while(_0x528903>this[_0x2c5145(0x363)]['length']){this[_0x2c5145(0x363)][_0x2c5145(0x5ec)](new _0x5a404e());}}}Input[_0x2c5145(0x192)](_0x2c5145(0x4dc))&&!Input['isPressed']('shift')&&('ciWDX'===_0x2c5145(0x3ca)?this['postCreateSlotWindowItemsEquipsCore']():this[_0x2c5145(0x272)](Input[_0x2c5145(0x403)](_0x2c5145(0x4dc))));}else{const _0x4fe9a8=_0x96e3e4(_0x13ff1e['$1'])||0x1;if(_0x3fbe56>=_0x4fe9a8)return!![];}}}if(this['index']()!==_0x530348){if('dOtYD'===_0x2c5145(0x2fc))return![];else this[_0x2c5145(0x3b9)]();}}},Window_ItemCategory['prototype'][_0x18a61c(0x22f)]=function(){const _0x5b3d3d=_0x18a61c;if(this[_0x5b3d3d(0x1ed)]())return;Window_HorzCommand[_0x5b3d3d(0x1f3)][_0x5b3d3d(0x22f)]['call'](this);},Window_ItemCategory['prototype']['isHoverEnabled']=function(){const _0x4bee37=_0x18a61c;return this[_0x4bee37(0x1ed)]()?![]:Window_HorzCommand[_0x4bee37(0x1f3)][_0x4bee37(0x38a)][_0x4bee37(0x4f3)](this);},Window_ItemCategory[_0x18a61c(0x1f3)]['processTouchModernControls']=function(){const _0x160132=_0x18a61c;if(this[_0x160132(0x2d9)]()){if(_0x160132(0x4a1)===_0x160132(0x4a6)){const _0x355d76=this['commandStyle'](),_0x4b7904=_0x5be104[_0x160132(0x254)][_0x160132(0x52e)][_0x160132(0x331)][_0x160132(0x26d)],_0x3b6458=_0x3a425d[_0x160132(0x254)][_0x160132(0x52e)]['ShopScene']['CmdCancelRename'],_0x58c9b1=_0x355d76===_0x160132(0x3bd)?_0x3b6458:_0x160132(0x4d6)[_0x160132(0x57c)](_0x4b7904,_0x3b6458);this[_0x160132(0x346)](_0x58c9b1,'cancel');}else{TouchInput[_0x160132(0x403)]()&&(_0x160132(0x1dc)==='KiJOk'?(_0x5f2f00[_0x160132(0x254)][_0x160132(0x57d)][_0x160132(0x4f3)](this,_0x3d49d7),_0x291e40[_0x160132(0x254)][_0x160132(0x196)](_0x3b2791,_0x243dae)):this[_0x160132(0x2ce)](!![]));if(TouchInput[_0x160132(0x325)]())this[_0x160132(0x1cc)]();else TouchInput[_0x160132(0x246)]()&&('KlZQN'!==_0x160132(0x47e)?this[_0x160132(0x4a7)]():this[_0x160132(0x272)](_0x30817f['isTriggered']('left')));}}},Window_ItemCategory['prototype'][_0x18a61c(0x2ce)]=function(_0x2b4d49){const _0x22d077=_0x18a61c;if(this['isUseModernControls']())'MdKoB'===_0x22d077(0x43a)?_0x2cd590=0x0:this[_0x22d077(0x507)](!![]);else{if(_0x22d077(0x3aa)!==_0x22d077(0x406))Window_HorzCommand[_0x22d077(0x1f3)][_0x22d077(0x2ce)][_0x22d077(0x4f3)](this,_0x2b4d49);else{if(!this[_0x22d077(0x303)]())return _0x41e060;if(this[_0x22d077(0x22e)](_0x5f2097,_0x55bf84,_0x19029a))_0x1fb7d5+=this[_0x22d077(0x4ce)]();if(this[_0x22d077(0x4c9)](_0x37cac2,_0x59a629,_0x4e47fc))_0x2f2f55+=this['lineHeight']();if(this[_0x22d077(0x327)](_0x3ad0bb,_0x56f924,_0x4a238e))_0x41f7f5+=this[_0x22d077(0x4ce)]();if(this[_0x22d077(0x5cb)](_0x279f44,_0x4874d3,_0x293336))_0x2ed365+=this[_0x22d077(0x4ce)]();if(this['drawItemEffectsMpDamage'](_0x26a6aa,_0x2479cc,_0x4a0cc4))_0x2eb5b5+=this[_0x22d077(0x4ce)]();if(this[_0x22d077(0x4ad)](_0x3eee36,_0x5f30ce,_0x2fab55))_0xbaceef+=this[_0x22d077(0x4ce)]();if(this[_0x22d077(0x1eb)](_0x1bcfcd,_0x8f1e56,_0x37725b))_0x504625+=this['lineHeight']();if(this['drawItemEffectsAddedStatesBuffs'](_0x3c940c,_0x5130a8,_0x5d8c2d))_0xdfa7ef+=this[_0x22d077(0x4ce)]();if(this[_0x22d077(0x558)](_0x127812,_0x2e5121,_0x133684))_0x18b320+=this[_0x22d077(0x4ce)]();return this['resetFontSettings'](),_0x183742;}}},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x507)]=function(_0x5f26ea){const _0xc76cd1=_0x18a61c;this['_doubleTouch']=![];if(this['isCursorMovable']()){const _0x1e371b=this[_0xc76cd1(0x4f1)](),_0x505725=this[_0xc76cd1(0x3b0)]();_0x505725>=0x0&&_0x505725!==this['index']()&&this[_0xc76cd1(0x1b9)](_0x505725),_0x5f26ea&&this['index']()!==_0x1e371b&&this['playCursorSound']();}},Window_ItemCategory['prototype'][_0x18a61c(0x345)]=function(){const _0x152b45=_0x18a61c;for(const _0x197076 of Window_ItemCategory[_0x152b45(0x3ed)]){this[_0x152b45(0x321)](_0x197076);}this[_0x152b45(0x1b9)](this['index']());},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x321)]=function(_0x41d192){const _0x41298f=_0x18a61c,_0x785f7b=_0x41d192[_0x41298f(0x3ef)],_0x2573ee=_0x41d192[_0x41298f(0x372)],_0x5e6765=_0x41d192[_0x41298f(0x485)]||0x0;if(_0x5e6765>0x0&&!$gameSwitches[_0x41298f(0x470)](_0x5e6765))return;let _0x4de034='',_0x511ff5='category',_0x491016=_0x785f7b;if(_0x785f7b[_0x41298f(0x23c)](/Category:(.*)/i))'ScUxJ'===_0x41298f(0x1b5)?_0x4de034=String(RegExp['$1'])[_0x41298f(0x3a9)]():this[_0x41298f(0x490)](_0x1a2370)?this['_goodsCount']++:_0x71a763[0x0]=-0x1;else{if(Window_ItemCategory[_0x41298f(0x561)][_0x41298f(0x366)](_0x785f7b))_0x4de034=VisuMZ[_0x41298f(0x254)][_0x41298f(0x52e)][_0x41298f(0x5fa)][_0x785f7b];else{if([_0x41298f(0x1a4),_0x41298f(0x310)][_0x41298f(0x366)](_0x785f7b)){if(_0x41298f(0x1e6)!==_0x41298f(0x1ab))_0x4de034=TextManager[_0x41298f(0x423)];else return!![];}else{if(_0x785f7b==='KeyItems')_0x4de034=TextManager[_0x41298f(0x294)];else{if(_0x785f7b===_0x41298f(0x382))_0x4de034=TextManager[_0x41298f(0x309)];else{if(_0x785f7b===_0x41298f(0x533))_0x4de034=TextManager['armor'];else{if(_0x785f7b[_0x41298f(0x23c)](/WTYPE:(\d+)/i))_0x4de034=$dataSystem[_0x41298f(0x350)][Number(RegExp['$1'])]||'';else{if(_0x785f7b[_0x41298f(0x23c)](/ATYPE:(\d+)/i))_0x4de034=$dataSystem[_0x41298f(0x4b0)][Number(RegExp['$1'])]||'';else _0x785f7b[_0x41298f(0x23c)](/ETYPE:(\d+)/i)&&(_0x4de034=$dataSystem[_0x41298f(0x29d)][Number(RegExp['$1'])]||'');}}}}}}}_0x2573ee>0x0&&this[_0x41298f(0x3c4)]()!==_0x41298f(0x3bd)&&(_0x4de034=_0x41298f(0x4d6)['format'](_0x2573ee,_0x4de034)),this[_0x41298f(0x346)](_0x4de034,_0x511ff5,!![],_0x491016);},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x52c)]=function(){const _0x394bd0=_0x18a61c;return VisuMZ[_0x394bd0(0x254)]['Settings'][_0x394bd0(0x5fa)][_0x394bd0(0x586)];},Window_ItemCategory[_0x18a61c(0x1f3)]['drawItem']=function(_0x3f45c7){const _0x1e4b66=_0x18a61c,_0x1d9418=this[_0x1e4b66(0x4e8)](_0x3f45c7);if(_0x1d9418===_0x1e4b66(0x2c9))this['drawItemStyleIconText'](_0x3f45c7);else _0x1d9418===_0x1e4b66(0x281)?_0x1e4b66(0x48f)!==_0x1e4b66(0x48f)?this['onTouchOk']():this['drawItemStyleIcon'](_0x3f45c7):Window_HorzCommand[_0x1e4b66(0x1f3)][_0x1e4b66(0x248)]['call'](this,_0x3f45c7);},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x3c4)]=function(){const _0x5a1d6a=_0x18a61c;return VisuMZ[_0x5a1d6a(0x254)][_0x5a1d6a(0x52e)][_0x5a1d6a(0x5fa)][_0x5a1d6a(0x2e6)];},Window_ItemCategory['prototype'][_0x18a61c(0x4e8)]=function(_0x47ae9d){const _0x8349c0=_0x18a61c;if(_0x47ae9d<0x0)return _0x8349c0(0x3bd);const _0x35fd33=this['categoryStyle']();if(_0x35fd33!=='auto')return _0x35fd33;else{const _0xd6b371=this[_0x8349c0(0x42a)](_0x47ae9d);if(_0xd6b371[_0x8349c0(0x23c)](/\\I\[(\d+)\]/i)){const _0x118423=this[_0x8349c0(0x435)](_0x47ae9d),_0x204cdc=this[_0x8349c0(0x268)](_0xd6b371)[_0x8349c0(0x1e5)];return _0x204cdc<=_0x118423['width']?_0x8349c0(0x2c9):_0x8349c0(0x281);}else{if(_0x8349c0(0x2b2)!==_0x8349c0(0x2b2)){const _0x34e877=_0x2ff757[_0x8349c0(0x254)][_0x8349c0(0x52e)][_0x8349c0(0x1ce)];let _0x1135ef=_0x34e877['BackRectColor']!==_0x2fa1b9?_0x34e877[_0x8349c0(0x4e9)]:0x13;return _0x1c1597[_0x8349c0(0x574)](_0x1135ef);}else return'text';}}},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x1f4)]=function(_0x39edf7){const _0x3b65ea=_0x18a61c,_0x123182=this[_0x3b65ea(0x435)](_0x39edf7),_0x2dbe34=this[_0x3b65ea(0x42a)](_0x39edf7),_0x3b2905=this[_0x3b65ea(0x268)](_0x2dbe34)[_0x3b65ea(0x1e5)];this[_0x3b65ea(0x530)](this[_0x3b65ea(0x20d)](_0x39edf7));const _0x1e720d=this[_0x3b65ea(0x52c)]();if(_0x1e720d===_0x3b65ea(0x608))this[_0x3b65ea(0x21e)](_0x2dbe34,_0x123182['x']+_0x123182[_0x3b65ea(0x1e5)]-_0x3b2905,_0x123182['y'],_0x3b2905);else{if(_0x1e720d===_0x3b65ea(0x32c)){const _0x4222a9=_0x123182['x']+Math['floor']((_0x123182[_0x3b65ea(0x1e5)]-_0x3b2905)/0x2);this['drawTextEx'](_0x2dbe34,_0x4222a9,_0x123182['y'],_0x3b2905);}else{if(_0x3b65ea(0x4d3)!=='LEuOv')this['drawTextEx'](_0x2dbe34,_0x123182['x'],_0x123182['y'],_0x3b2905);else{if(_0x499278['ItemsEquipsCore'][_0x3b65ea(0x52e)]['EquipScene'][_0x3b65ea(0x2ec)]===![])return;_0x512160=_0x47fd23[_0x3b65ea(0x47f)](_0x2e9191||0x1,0x1);while(_0x194252--){_0x385be3=_0x52ca50||this[_0x3b65ea(0x4ce)](),this['contents'][_0x3b65ea(0x553)]=0xa0;const _0x56d293=_0x311d05[_0x3b65ea(0x349)]();this['contents'][_0x3b65ea(0x21b)](_0x57d501+0x1,_0xac62fb+0x1,_0x2de634-0x2,_0x315a95-0x2,_0x56d293),this[_0x3b65ea(0x359)][_0x3b65ea(0x553)]=0xff;}}}}},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x47d)]=function(_0x5edd5b){const _0x5550cf=_0x18a61c,_0x19317e=this[_0x5550cf(0x42a)](_0x5edd5b);if(_0x19317e[_0x5550cf(0x23c)](/\\I\[(\d+)\]/i)){if(_0x5550cf(0x1d4)!==_0x5550cf(0x1d4))this[_0x5550cf(0x3b9)]();else{const _0x12bcda=Number(RegExp['$1'])||0x0,_0x1067cc=this[_0x5550cf(0x435)](_0x5edd5b),_0x57fa28=_0x1067cc['x']+Math['floor']((_0x1067cc[_0x5550cf(0x1e5)]-ImageManager['iconWidth'])/0x2),_0x38f6f0=_0x1067cc['y']+(_0x1067cc[_0x5550cf(0x1d8)]-ImageManager[_0x5550cf(0x1d5)])/0x2;this[_0x5550cf(0x439)](_0x12bcda,_0x57fa28,_0x38f6f0);}}},VisuMZ[_0x18a61c(0x254)]['Window_ItemCategory_setItemWindow']=Window_ItemCategory[_0x18a61c(0x1f3)]['setItemWindow'],Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x267)]=function(_0x28079a){const _0x6bdd7a=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x6bdd7a(0x3a0)][_0x6bdd7a(0x4f3)](this,_0x28079a),_0x28079a[_0x6bdd7a(0x47a)]=this;},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x36e)]=function(){const _0x27f6c0=_0x18a61c;Window_HorzCommand[_0x27f6c0(0x1f3)]['callUpdateHelp'][_0x27f6c0(0x4f3)](this);if(this['_categoryNameWindow'])this[_0x27f6c0(0x211)]();},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x211)]=function(){const _0x45e3a8=_0x18a61c,_0x19ad18=this[_0x45e3a8(0x58f)];_0x19ad18[_0x45e3a8(0x359)][_0x45e3a8(0x28f)]();const _0x2a6bfd=this[_0x45e3a8(0x4e8)](this['index']());if(_0x2a6bfd==='icon'){const _0x30184e=this[_0x45e3a8(0x435)](this['index']());let _0x4a25f9=this['commandName'](this[_0x45e3a8(0x4f1)]());_0x4a25f9=_0x4a25f9[_0x45e3a8(0x348)](/\\I\[(\d+)\]/gi,''),_0x19ad18[_0x45e3a8(0x2ab)](),this[_0x45e3a8(0x2bb)](_0x4a25f9,_0x30184e),this['categoryNameWindowDrawText'](_0x4a25f9,_0x30184e),this[_0x45e3a8(0x3cc)](_0x4a25f9,_0x30184e);}},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x2bb)]=function(_0x3ab360,_0x373545){},Window_ItemCategory['prototype']['categoryNameWindowDrawText']=function(_0x4078ba,_0x7afb7e){const _0x44130f=_0x18a61c,_0x1a3295=this['_categoryNameWindow'];_0x1a3295[_0x44130f(0x2a4)](_0x4078ba,0x0,_0x7afb7e['y'],_0x1a3295[_0x44130f(0x4d4)],'center');},Window_ItemCategory[_0x18a61c(0x1f3)][_0x18a61c(0x3cc)]=function(_0xbe6b09,_0x38f52d){const _0x4e2ac6=_0x18a61c,_0x484138=this[_0x4e2ac6(0x58f)],_0x4de5a9=$gameSystem[_0x4e2ac6(0x2cc)](),_0x474ca9=_0x38f52d['x']+Math['floor'](_0x38f52d[_0x4e2ac6(0x1e5)]/0x2)+_0x4de5a9;_0x484138['x']=_0x484138[_0x4e2ac6(0x1e5)]/-0x2+_0x474ca9,_0x484138['y']=Math[_0x4e2ac6(0x1f7)](_0x38f52d[_0x4e2ac6(0x1d8)]/0x2);},Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x53b)]=function(){const _0x551f22=_0x18a61c;if(this[_0x551f22(0x2c2)]()){const _0x8d030b=this[_0x551f22(0x4f1)]();if(this[_0x551f22(0x26b)]()<=0x1)!this[_0x551f22(0x329)](_0x551f22(0x33e))&&Input[_0x551f22(0x403)]('pagedown')&&(_0x551f22(0x505)===_0x551f22(0x42f)?(_0x1a85b3[_0x551f22(0x254)][_0x551f22(0x3a0)][_0x551f22(0x4f3)](this,_0x545c23),_0x26c397[_0x551f22(0x47a)]=this):this[_0x551f22(0x1a0)]()),!this[_0x551f22(0x329)]('pageup')&&Input['isTriggered']('pageup')&&(_0x551f22(0x421)!==_0x551f22(0x421)?this['refreshItemsEquipsCoreNoMenuImage']():this[_0x551f22(0x5cc)]());else{if(this['maxCols']()>0x1){if(_0x551f22(0x4e0)==='gVfMk')_0x5833ab=_0x3e4168[_0x551f22(0x27b)](_0x4c8f6f(_0x1801f9['$1'])*0.01*0xff)[_0x551f22(0x58a)](0x0,0xff);else{Input[_0x551f22(0x192)]('right')&&(_0x551f22(0x5dd)===_0x551f22(0x4ef)?this['commandBuyItemsEquipsCore']():this[_0x551f22(0x5c9)](Input['isTriggered']('right')));Input[_0x551f22(0x192)](_0x551f22(0x3c6))&&this[_0x551f22(0x272)](Input[_0x551f22(0x403)](_0x551f22(0x3c6)));if(this[_0x551f22(0x38f)]())Input[_0x551f22(0x403)](_0x551f22(0x33e))&&Input[_0x551f22(0x34f)](_0x551f22(0x28b))&&this[_0x551f22(0x1a0)](),Input[_0x551f22(0x403)](_0x551f22(0x4dc))&&Input[_0x551f22(0x34f)]('shift')&&this[_0x551f22(0x5cc)]();else{if(_0x551f22(0x5ed)===_0x551f22(0x523)){if(!this[_0x551f22(0x363)][_0x17275a])this[_0x551f22(0x363)][_0x46b01f]=new _0x33605d();}else{Input['isTriggered'](_0x551f22(0x33e))&&(_0x551f22(0x3d2)!==_0x551f22(0x3d2)?_0x9742a3[_0x551f22(0x1f3)][_0x551f22(0x543)][_0x551f22(0x4f3)](this):this[_0x551f22(0x1a0)]());if(Input[_0x551f22(0x403)]('pageup')){if(_0x551f22(0x377)===_0x551f22(0x377))this[_0x551f22(0x5cc)]();else return _0x233db2(_0x255977['$1']);}}}}}}Input[_0x551f22(0x192)](_0x551f22(0x5e6))&&(Input[_0x551f22(0x34f)]('shift')&&this[_0x551f22(0x5e8)]()?this['cursorPagedown']():this[_0x551f22(0x3eb)](Input[_0x551f22(0x403)]('down')));if(Input[_0x551f22(0x192)]('up')){if(Input['isPressed'](_0x551f22(0x28b))&&this['allowShiftScrolling']()){if(_0x551f22(0x5a3)!==_0x551f22(0x5a3))return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x551f22(0x41d)]():_0x5b514a[_0x551f22(0x254)][_0x551f22(0x51e)][_0x551f22(0x4f3)](this);else this[_0x551f22(0x5cc)]();}else this[_0x551f22(0x1c2)](Input['isTriggered']('up'));}Imported['VisuMZ_0_CoreEngine']&&this[_0x551f22(0x28c)](),this[_0x551f22(0x4f1)]()!==_0x8d030b&&this[_0x551f22(0x3b9)]();}},Window_ItemList['prototype']['limitedPageUpDownSceneCheck']=function(){const _0x52eab9=_0x18a61c,_0x4d3b48=SceneManager[_0x52eab9(0x424)],_0x53f7d3=[Scene_Item,Scene_Shop];return _0x53f7d3['includes'](_0x4d3b48['constructor']);},Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x590)]=function(){const _0x5bbba8=_0x18a61c;Window_Selectable[_0x5bbba8(0x1f3)][_0x5bbba8(0x590)]['call'](this),this['_categoryWindow']&&this[_0x5bbba8(0x47a)][_0x5bbba8(0x1ed)]()&&(_0x5bbba8(0x2c8)!==_0x5bbba8(0x2c8)?this[_0x5bbba8(0x439)](_0x4916ad,_0x78f2df['x'],_0x35b7b9['y']+0x2):this['_categoryWindow'][_0x5bbba8(0x590)]());},Window_ItemList['prototype'][_0x18a61c(0x56b)]=function(){const _0x1ba088=_0x18a61c;Window_Selectable[_0x1ba088(0x1f3)]['deactivate'][_0x1ba088(0x4f3)](this),this[_0x1ba088(0x47a)]&&this['_categoryWindow']['isUseModernControls']()&&this[_0x1ba088(0x47a)][_0x1ba088(0x56b)]();},Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x525)]=function(_0x3ec6c8){const _0x6bd350=_0x18a61c;if(this[_0x6bd350(0x291)]!==_0x3ec6c8){if(_0x6bd350(0x473)===_0x6bd350(0x1e7)){const _0x43bbfd=this[_0x6bd350(0x35a)]['note'];if(_0x43bbfd['match'](/<ALWAYS HIT>/i))return _0x6bd350(0x398);else{if(_0x43bbfd[_0x6bd350(0x23c)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x6bd350(0x535)[_0x6bd350(0x57c)](_0x20d03b(_0x55a688['$1']));}}else{this['_category']=_0x3ec6c8,this[_0x6bd350(0x499)]();if(this['_categoryWindow']&&this['_categoryWindow'][_0x6bd350(0x1ed)]()){if('Drevm'!==_0x6bd350(0x31b)){const _0x367306=_0x8a43a7[_0x6bd350(0x20a)](this);_0x367306[_0x6bd350(0x2c1)]=!![],_0x21f0a5['ItemsEquipsCore'][_0x6bd350(0x599)][_0x6bd350(0x4f3)](this,_0x50a276,_0x3435f3),this[_0x6bd350(0x4d1)](_0x367306);}else this[_0x6bd350(0x269)](0x0);}else{if(_0x6bd350(0x35d)!=='TUZmx')this['scrollTo'](0x0,0x0);else return!![];}}}},VisuMZ[_0x18a61c(0x254)]['Window_ItemList_maxCols']=Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x26b)],Window_ItemList['prototype'][_0x18a61c(0x26b)]=function(){const _0x34e913=_0x18a61c;if(SceneManager['_scene'][_0x34e913(0x566)]===Scene_Battle){if('XtyOw'===_0x34e913(0x2f3))this[_0x34e913(0x4a7)]();else return VisuMZ[_0x34e913(0x254)][_0x34e913(0x1df)][_0x34e913(0x4f3)](this);}else return SceneManager['_scene']['constructor']===Scene_Map?VisuMZ[_0x34e913(0x254)][_0x34e913(0x1df)][_0x34e913(0x4f3)](this):VisuMZ[_0x34e913(0x254)][_0x34e913(0x52e)][_0x34e913(0x483)][_0x34e913(0x516)];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x469)]=Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x1e1)],Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x1e1)]=function(){const _0x4b1643=_0x18a61c;return this['maxCols']()<=0x1?Window_Selectable[_0x4b1643(0x1f3)]['colSpacing']['call'](this):VisuMZ[_0x4b1643(0x254)][_0x4b1643(0x469)][_0x4b1643(0x4f3)](this);},Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x366)]=function(_0x65e476){const _0xaef786=_0x18a61c;switch(this[_0xaef786(0x291)]){case _0xaef786(0x1a4):return DataManager['isItem'](_0x65e476);case _0xaef786(0x310):return DataManager[_0xaef786(0x290)](_0x65e476)&&_0x65e476[_0xaef786(0x487)]===0x1;case'KeyItems':return DataManager[_0xaef786(0x290)](_0x65e476)&&_0x65e476[_0xaef786(0x487)]===0x2;case'HiddenItemA':return DataManager[_0xaef786(0x290)](_0x65e476)&&_0x65e476[_0xaef786(0x487)]===0x3;case _0xaef786(0x203):return DataManager['isItem'](_0x65e476)&&_0x65e476['itypeId']===0x4;case _0xaef786(0x3bb):return DataManager[_0xaef786(0x290)](_0x65e476)&&_0x65e476[_0xaef786(0x4d9)];case'Nonconsumable':return DataManager[_0xaef786(0x290)](_0x65e476)&&!_0x65e476[_0xaef786(0x4d9)];case _0xaef786(0x4e4):return DataManager[_0xaef786(0x290)](_0x65e476)&&[0x0]['includes'](_0x65e476[_0xaef786(0x5e1)]);case'BattleUsable':return DataManager['isItem'](_0x65e476)&&[0x0,0x1]['includes'](_0x65e476[_0xaef786(0x5e1)]);case _0xaef786(0x284):return DataManager[_0xaef786(0x290)](_0x65e476)&&[0x0,0x2]['includes'](_0x65e476[_0xaef786(0x5e1)]);case _0xaef786(0x395):return DataManager[_0xaef786(0x290)](_0x65e476)&&[0x3]['includes'](_0x65e476[_0xaef786(0x5e1)]);case'AllWeapons':return DataManager[_0xaef786(0x3b7)](_0x65e476);case _0xaef786(0x533):return DataManager['isArmor'](_0x65e476);default:if(this['_category']['match'](/WTYPE:(\d+)/i))return DataManager[_0xaef786(0x3b7)](_0x65e476)&&_0x65e476[_0xaef786(0x253)]===Number(RegExp['$1']);else{if(this[_0xaef786(0x291)][_0xaef786(0x23c)](/WTYPE:(.*)/i)){if('nOLNy'!==_0xaef786(0x4bc)){const _0x4e1536=this['itemLineRect'](this[_0xaef786(0x4f1)]());let _0x4eb5e4=this[_0xaef786(0x42a)](this[_0xaef786(0x4f1)]());_0x4eb5e4=_0x4eb5e4[_0xaef786(0x348)](/\\I\[(\d+)\]/gi,''),_0x57a7bf[_0xaef786(0x2ab)](),this[_0xaef786(0x2bb)](_0x4eb5e4,_0x4e1536),this[_0xaef786(0x1c9)](_0x4eb5e4,_0x4e1536),this['categoryNameWindowCenter'](_0x4eb5e4,_0x4e1536);}else{const _0x16f612=$dataSystem[_0xaef786(0x350)][_0xaef786(0x218)](String(RegExp['$1'])[_0xaef786(0x3a9)]());return DataManager['isWeapon'](_0x65e476)&&_0x65e476['wtypeId']===_0x16f612;}}else{if(this[_0xaef786(0x291)]['match'](/ATYPE:(\d+)/i))return _0xaef786(0x43f)==='HRpJU'?this['commandWindowRectItemsEquipsCore']():DataManager[_0xaef786(0x194)](_0x65e476)&&_0x65e476['atypeId']===Number(RegExp['$1']);else{if(this[_0xaef786(0x291)][_0xaef786(0x23c)](/ATYPE:(.*)/i)){if(_0xaef786(0x4c8)!==_0xaef786(0x4c8))return _0xf0687d[_0xaef786(0x254)]['Settings'][_0xaef786(0x483)]['buttonAssistCategory'];else{const _0x29be0a=$dataSystem['armorTypes'][_0xaef786(0x218)](String(RegExp['$1'])[_0xaef786(0x3a9)]());return DataManager[_0xaef786(0x194)](_0x65e476)&&_0x65e476[_0xaef786(0x5db)]===_0x29be0a;}}else{if(this['_category'][_0xaef786(0x23c)](/ETYPE:(\d+)/i))return!!_0x65e476&&_0x65e476[_0xaef786(0x189)]===Number(RegExp['$1']);else{if(this[_0xaef786(0x291)][_0xaef786(0x23c)](/ETYPE:(.*)/i)){const _0x493ba0=$dataSystem['equipTypes'][_0xaef786(0x218)](String(RegExp['$1'])[_0xaef786(0x3a9)]());return DataManager['isArmor'](_0x65e476)&&_0x65e476[_0xaef786(0x189)]===_0x493ba0;}else{if(this[_0xaef786(0x291)][_0xaef786(0x23c)](/Category:(.*)/i))return!!_0x65e476&&_0x65e476[_0xaef786(0x5e7)][_0xaef786(0x366)](String(RegExp['$1'])[_0xaef786(0x3ad)]()[_0xaef786(0x3a9)]());}}}}}}}return![];},Window_ItemList[_0x18a61c(0x1f3)]['isShowNew']=function(){return!![];},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x24a)]=Window_ItemList['prototype'][_0x18a61c(0x248)],Window_ItemList['prototype'][_0x18a61c(0x248)]=function(_0x763286){const _0x479624=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x479624(0x24a)][_0x479624(0x4f3)](this,_0x763286),this[_0x479624(0x40f)](_0x763286);},Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x357)]=function(_0x50b102,_0x35370c,_0x13f538,_0x3ee378){const _0x58f8d5=_0x18a61c;Window_Selectable[_0x58f8d5(0x1f3)]['drawItemNumber'][_0x58f8d5(0x4f3)](this,_0x50b102,_0x35370c,_0x13f538,_0x3ee378);},Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x40f)]=function(_0x5a2a02){const _0xd68da1=_0x18a61c,_0x117f97=this['itemAt'](_0x5a2a02);if(!_0x117f97||!this[_0xd68da1(0x4d2)]())return;if(!$gameParty[_0xd68da1(0x24f)](_0x117f97))return;const _0x5434f1=this[_0xd68da1(0x435)](_0x5a2a02),_0x48855a=_0x5434f1['x'],_0x14de9e=_0x5434f1['y']+(this[_0xd68da1(0x4ce)]()-ImageManager[_0xd68da1(0x1d5)])/0x2,_0x219231=VisuMZ[_0xd68da1(0x254)][_0xd68da1(0x52e)]['New']['OffsetX'],_0x5818b1=VisuMZ[_0xd68da1(0x254)][_0xd68da1(0x52e)][_0xd68da1(0x362)]['OffsetY'];this[_0xd68da1(0x2f8)](_0x117f97,_0x48855a+_0x219231,_0x14de9e+_0x5818b1);},Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x564)]=function(_0x216263){const _0x19e15c=_0x18a61c;this[_0x19e15c(0x5a9)]=_0x216263,this[_0x19e15c(0x36e)]();},VisuMZ[_0x18a61c(0x254)]['Window_ItemList_updateHelp']=Window_ItemList['prototype'][_0x18a61c(0x1cd)],Window_ItemList[_0x18a61c(0x1f3)][_0x18a61c(0x1cd)]=function(){const _0x23e359=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x23e359(0x2ba)][_0x23e359(0x4f3)](this),this[_0x23e359(0x5a9)]&&this[_0x23e359(0x5a9)][_0x23e359(0x566)]===Window_ShopStatus&&this[_0x23e359(0x5a9)]['setItem'](this[_0x23e359(0x423)]());},Window_BattleItem[_0x18a61c(0x1f3)][_0x18a61c(0x40c)]=function(_0x49d1ab){const _0x55b73f=_0x18a61c;return BattleManager['actor']()?BattleManager[_0x55b73f(0x56a)]()[_0x55b73f(0x299)](_0x49d1ab):Window_ItemList[_0x55b73f(0x1f3)][_0x55b73f(0x40c)]['call'](this,_0x49d1ab);},Window_EventItem[_0x18a61c(0x1f3)][_0x18a61c(0x4d2)]=function(){return![];},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x206)]=function(){const _0x17f070=_0x18a61c;return VisuMZ[_0x17f070(0x254)][_0x17f070(0x52e)]['EquipScene'][_0x17f070(0x2d6)];},VisuMZ[_0x18a61c(0x254)]['Window_EquipStatus_refresh']=Window_EquipStatus['prototype'][_0x18a61c(0x499)],Window_EquipStatus['prototype'][_0x18a61c(0x499)]=function(){const _0x16fc58=_0x18a61c;this[_0x16fc58(0x1ac)](),this[_0x16fc58(0x2ab)]();if(this[_0x16fc58(0x2c4)])this[_0x16fc58(0x2c4)][_0x16fc58(0x499)]();this['isUseItemsEquipsCoreUpdatedLayout']()?this['prepareRefreshItemsEquipsCoreLayout']():VisuMZ[_0x16fc58(0x254)][_0x16fc58(0x2f9)][_0x16fc58(0x4f3)](this);},Window_EquipStatus[_0x18a61c(0x1f3)]['prepareRefreshItemsEquipsCoreLayout']=function(){const _0x6f8cda=_0x18a61c;this[_0x6f8cda(0x359)]['clear']();if(!this[_0x6f8cda(0x2c4)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x4b79b7=ImageManager[_0x6f8cda(0x50e)](this[_0x6f8cda(0x2c4)][_0x6f8cda(0x491)]());_0x4b79b7[_0x6f8cda(0x5c7)](this['onMenuImageLoad'][_0x6f8cda(0x265)](this));}else{if(_0x6f8cda(0x1be)===_0x6f8cda(0x39c)){_0x2b3222+=_0x6f8cda(0x419)[_0x6f8cda(0x57c)](_0x467c4d['iconIndex']),_0x5c2cb1++;if(_0x56fb07>=_0x268d16)return _0x29898c;}else this[_0x6f8cda(0x512)]();}},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x42c)]=function(){const _0x3d655f=_0x18a61c;return Imported[_0x3d655f(0x60a)]&&this['_actor']['getMenuImage']()!==''&&VisuMZ['ItemsEquipsCore'][_0x3d655f(0x52e)][_0x3d655f(0x1ce)][_0x3d655f(0x486)];},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x571)]=function(){const _0x45438a=_0x18a61c;VisuMZ[_0x45438a(0x254)][_0x45438a(0x52e)][_0x45438a(0x1ce)][_0x45438a(0x185)][_0x45438a(0x4f3)](this),this[_0x45438a(0x4b6)]();},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x512)]=function(){const _0x184be7=_0x18a61c;VisuMZ[_0x184be7(0x254)][_0x184be7(0x52e)]['EquipScene'][_0x184be7(0x25d)][_0x184be7(0x4f3)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x4b6)]=function(){const _0x135009=_0x18a61c;this[_0x135009(0x2ab)](),VisuMZ[_0x135009(0x254)]['Settings']['EquipScene'][_0x135009(0x307)][_0x135009(0x4f3)](this);},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x600)]=function(_0xc3e6b0,_0x4cdd6d,_0x881022,_0x3b3e06,_0x3647d6){const _0x32436f=_0x18a61c,_0x2472c6=ImageManager[_0x32436f(0x50e)](_0xc3e6b0[_0x32436f(0x491)]()),_0x46a3a7=this[_0x32436f(0x4d4)]-_0x2472c6[_0x32436f(0x1e5)];_0x4cdd6d+=_0x46a3a7/0x2;if(_0x46a3a7<0x0)_0x3b3e06-=_0x46a3a7;Window_StatusBase['prototype']['drawItemActorMenuImage']['call'](this,_0xc3e6b0,_0x4cdd6d,_0x881022,_0x3b3e06,_0x3647d6);},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x5da)]=function(){const _0x23bcec=_0x18a61c;if(Imported[_0x23bcec(0x2bf)]){if('LjBjA'===_0x23bcec(0x1ee))return VisuMZ[_0x23bcec(0x219)][_0x23bcec(0x52e)][_0x23bcec(0x243)][_0x23bcec(0x46c)];else this[_0x23bcec(0x5cc)]();}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x3b5)]=function(){const _0x1c0fed=_0x18a61c;return VisuMZ[_0x1c0fed(0x254)][_0x1c0fed(0x52e)][_0x1c0fed(0x1ce)][_0x1c0fed(0x2b5)];},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x43d)]=function(){const _0x1387ad=_0x18a61c;return Imported[_0x1387ad(0x2bf)]&&VisuMZ['CoreEngine'][_0x1387ad(0x52e)][_0x1387ad(0x243)][_0x1387ad(0x2b9)];},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x4ac)]=function(_0x1add94,_0x165fcd,_0x5516d0,_0x84eea7){const _0x5a395b=_0x18a61c,_0x7c7787=this[_0x5a395b(0x5e5)]();Imported['VisuMZ_0_CoreEngine']?this[_0x5a395b(0x582)](_0x165fcd+_0x7c7787,_0x5516d0,_0x84eea7,_0x1add94,![]):this['drawText'](TextManager[_0x5a395b(0x56c)](_0x1add94),_0x165fcd+_0x7c7787,_0x5516d0,_0x84eea7);},Window_EquipStatus[_0x18a61c(0x1f3)]['drawUpdatedBeforeParamValue']=function(_0x3ba74e,_0x21714,_0x38ac0b,_0x137f11){const _0x4d1805=_0x18a61c,_0x42cad0=this[_0x4d1805(0x5e5)]();let _0x73a4ed=0x0;Imported[_0x4d1805(0x2bf)]?_0x73a4ed=this[_0x4d1805(0x2c4)][_0x4d1805(0x2f5)](_0x3ba74e,!![]):_0x73a4ed=this[_0x4d1805(0x2c4)][_0x4d1805(0x56c)](_0x3ba74e);const _0x2bf0b3=_0x73a4ed;this[_0x4d1805(0x2a4)](_0x73a4ed,_0x21714,_0x38ac0b,_0x137f11-_0x42cad0,_0x4d1805(0x608));},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x557)]=function(_0x58bb9f,_0x28071b,_0x509975,_0x3b2341){const _0x5b9654=_0x18a61c,_0x1837b0=this[_0x5b9654(0x5e5)]();let _0x4f2ebe=0x0,_0x3c4610=0x0,_0x39c951='';if(this[_0x5b9654(0x2c1)]){if(_0x5b9654(0x450)===_0x5b9654(0x39a))return this[_0x5b9654(0x478)]();else{Imported[_0x5b9654(0x2bf)]?(_0x4f2ebe=this[_0x5b9654(0x2c4)][_0x5b9654(0x2f5)](_0x58bb9f,![]),_0x3c4610=this[_0x5b9654(0x2c1)][_0x5b9654(0x2f5)](_0x58bb9f,![]),_0x39c951=this[_0x5b9654(0x2c1)][_0x5b9654(0x2f5)](_0x58bb9f,!![])):(_0x4f2ebe=this['_actor'][_0x5b9654(0x56c)](_0x58bb9f),_0x3c4610=this[_0x5b9654(0x2c1)]['param'](_0x58bb9f),_0x39c951=this[_0x5b9654(0x2c1)]['param'](_0x58bb9f));const _0x4b9a01=_0x4f2ebe,_0x4afaa3=_0x3c4610;diffValue=_0x4afaa3-_0x4b9a01,this[_0x5b9654(0x29e)](ColorManager[_0x5b9654(0x316)](diffValue)),this['drawText'](_0x39c951,_0x28071b,_0x509975,_0x3b2341-_0x1837b0,_0x5b9654(0x608));}}},Window_EquipStatus[_0x18a61c(0x1f3)][_0x18a61c(0x252)]=function(_0x2fb945,_0x426462,_0x463cd4,_0xaddf88){const _0xdf0ff=_0x18a61c,_0x540f03=this['itemPadding']();let _0x2ed954=0x0,_0x1f7f36=0x0,_0x1650d7=![];if(this[_0xdf0ff(0x2c1)]){if(Imported[_0xdf0ff(0x2bf)]){if(_0xdf0ff(0x30d)!==_0xdf0ff(0x21d))_0x2ed954=this['_actor'][_0xdf0ff(0x2f5)](_0x2fb945,![]),_0x1f7f36=this[_0xdf0ff(0x2c1)][_0xdf0ff(0x2f5)](_0x2fb945,![]),_0x1650d7=String(this[_0xdf0ff(0x2c4)][_0xdf0ff(0x2f5)](_0x2fb945,!![]))[_0xdf0ff(0x23c)](/([%％])/i);else{const _0x26e0df=this['getItemDamageAmountLabel']();this['drawItemKeyData'](_0x26e0df,_0x5a7512,_0x27d5fa,_0x1676bc,!![]),this[_0xdf0ff(0x232)]();const _0x9f20a4=this[_0xdf0ff(0x465)](),_0x2b69ee=_0x3cc26d[_0xdf0ff(0x3c2)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0xdf0ff(0x35a)]['damage'][_0xdf0ff(0x214)]]);return this[_0xdf0ff(0x29e)](_0x2b69ee),this[_0xdf0ff(0x4ae)](_0x9f20a4,_0x30304e,_0x1068b0,_0x490af2,![],'right'),this[_0xdf0ff(0x5ea)](_0x4e5c7f,_0x258073,_0x5a37bc),this[_0xdf0ff(0x2ab)](),!![];}}else _0x2ed954=this['_actor'][_0xdf0ff(0x56c)](_0x2fb945),_0x1f7f36=this['_tempActor'][_0xdf0ff(0x56c)](_0x2fb945),_0x1650d7=_0x2ed954%0x1!==0x0||_0x1f7f36%0x1!==0x0;const _0x2dfe0e=_0x2ed954,_0x1d0c9b=_0x1f7f36,_0x510c3b=_0x1d0c9b-_0x2dfe0e;let _0x2aa2d4=_0x510c3b;if(_0x1650d7)_0x2aa2d4=Math[_0xdf0ff(0x27b)](_0x510c3b*0x64)+'%';_0x510c3b!==0x0&&(this[_0xdf0ff(0x29e)](ColorManager[_0xdf0ff(0x316)](_0x510c3b)),_0x2aa2d4=(_0x510c3b>0x0?_0xdf0ff(0x322):_0xdf0ff(0x18b))['format'](_0x2aa2d4),this['drawText'](_0x2aa2d4,_0x426462+_0x540f03,_0x463cd4,_0xaddf88,_0xdf0ff(0x3c6)));}},Window_EquipStatus['prototype'][_0x18a61c(0x5ea)]=function(_0x4ca77a,_0xae578d,_0x191fbb,_0x47c400,_0x2976d2){const _0x5a5d9c=_0x18a61c;if(VisuMZ[_0x5a5d9c(0x254)][_0x5a5d9c(0x52e)][_0x5a5d9c(0x1ce)][_0x5a5d9c(0x2ec)]===![])return;_0x2976d2=Math['max'](_0x2976d2||0x1,0x1);while(_0x2976d2--){if(_0x5a5d9c(0x3d6)===_0x5a5d9c(0x3d6)){_0x47c400=_0x47c400||this['lineHeight'](),this[_0x5a5d9c(0x359)]['paintOpacity']=0xa0;const _0x5cbf2c=ColorManager[_0x5a5d9c(0x349)]();this[_0x5a5d9c(0x359)][_0x5a5d9c(0x21b)](_0x4ca77a+0x1,_0xae578d+0x1,_0x191fbb-0x2,_0x47c400-0x2,_0x5cbf2c),this['contents']['paintOpacity']=0xff;}else _0x4f7acc['isTriggered']('pagedown')&&this[_0x5a5d9c(0x1a0)](),_0x1e94fe[_0x5a5d9c(0x403)](_0x5a5d9c(0x4dc))&&this[_0x5a5d9c(0x5cc)]();}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x420aa0=_0x18a61c,_0x4386f8=VisuMZ['ItemsEquipsCore'][_0x420aa0(0x52e)][_0x420aa0(0x1ce)];let _0x1a87e8=_0x4386f8[_0x420aa0(0x4e9)]!==undefined?_0x4386f8[_0x420aa0(0x4e9)]:0x13;return ColorManager[_0x420aa0(0x574)](_0x1a87e8);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x236)]=Window_EquipCommand['prototype'][_0x18a61c(0x517)],Window_EquipCommand['prototype'][_0x18a61c(0x517)]=function(_0xc7370f){const _0x37e894=_0x18a61c;VisuMZ['ItemsEquipsCore'][_0x37e894(0x236)][_0x37e894(0x4f3)](this,_0xc7370f),this[_0x37e894(0x5a1)](_0xc7370f);},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x5a1)]=function(_0x47e95d){const _0x1bc88f=_0x18a61c,_0x39ba4d=new Rectangle(0x0,0x0,_0x47e95d['width'],_0x47e95d[_0x1bc88f(0x1d8)]);this[_0x1bc88f(0x235)]=new Window_Base(_0x39ba4d),this['_commandNameWindow'][_0x1bc88f(0x3c9)]=0x0,this[_0x1bc88f(0x604)](this[_0x1bc88f(0x235)]),this[_0x1bc88f(0x314)]();},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x36e)]=function(){const _0xe193=_0x18a61c;Window_HorzCommand[_0xe193(0x1f3)][_0xe193(0x36e)][_0xe193(0x4f3)](this);if(this['_commandNameWindow'])this[_0xe193(0x314)]();},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x314)]=function(){const _0x3fca18=_0x18a61c,_0x2c9b12=this[_0x3fca18(0x235)];_0x2c9b12['contents'][_0x3fca18(0x28f)]();const _0x5e0076=this[_0x3fca18(0x4ec)](this['index']());if(_0x5e0076===_0x3fca18(0x281)){const _0x480beb=this[_0x3fca18(0x435)](this['index']());let _0x1f8b20=this[_0x3fca18(0x42a)](this['index']());_0x1f8b20=_0x1f8b20[_0x3fca18(0x348)](/\\I\[(\d+)\]/gi,''),_0x2c9b12['resetFontSettings'](),this[_0x3fca18(0x570)](_0x1f8b20,_0x480beb),this[_0x3fca18(0x4f0)](_0x1f8b20,_0x480beb),this[_0x3fca18(0x2c0)](_0x1f8b20,_0x480beb);}},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x570)]=function(_0x7f49a4,_0x52ad0f){},Window_EquipCommand['prototype'][_0x18a61c(0x4f0)]=function(_0x239203,_0x2a7968){const _0xb1dc7=_0x18a61c,_0x1a8189=this[_0xb1dc7(0x235)];_0x1a8189[_0xb1dc7(0x2a4)](_0x239203,0x0,_0x2a7968['y'],_0x1a8189['innerWidth'],_0xb1dc7(0x32c));},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x2c0)]=function(_0x5a21c6,_0x584eae){const _0x4a6909=_0x18a61c,_0x22e52d=this[_0x4a6909(0x235)],_0x4dd5b1=$gameSystem[_0x4a6909(0x2cc)](),_0x50b280=_0x584eae['x']+Math[_0x4a6909(0x1f7)](_0x584eae[_0x4a6909(0x1e5)]/0x2)+_0x4dd5b1;_0x22e52d['x']=_0x22e52d['width']/-0x2+_0x50b280,_0x22e52d['y']=Math['floor'](_0x584eae['height']/0x2);},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x1ed)]=function(){const _0x385852=_0x18a61c;return Imported[_0x385852(0x2bf)]&&Window_HorzCommand[_0x385852(0x1f3)]['isUseModernControls'][_0x385852(0x4f3)](this);},Window_EquipCommand['prototype'][_0x18a61c(0x397)]=function(){const _0x33b046=_0x18a61c;if(this[_0x33b046(0x567)]()===_0x33b046(0x336))Window_HorzCommand[_0x33b046(0x1f3)][_0x33b046(0x397)][_0x33b046(0x4f3)](this);},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x53b)]=function(){const _0xc9c7fb=_0x18a61c;!this[_0xc9c7fb(0x30b)]()&&(_0xc9c7fb(0x5bc)!==_0xc9c7fb(0x55a)?Window_HorzCommand[_0xc9c7fb(0x1f3)][_0xc9c7fb(0x53b)][_0xc9c7fb(0x4f3)](this):_0x49f0ac['prototype']['drawItem']['call'](this,_0xae592));},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x30b)]=function(){const _0x4760ad=_0x18a61c;if(!this['isCursorMovable']())return![];if(SceneManager[_0x4760ad(0x424)][_0x4760ad(0x566)]!==Scene_Equip)return![];if(Input['isTriggered']('down')){if(_0x4760ad(0x26f)===_0x4760ad(0x58b))return![];else this['playCursorSound'](),SceneManager[_0x4760ad(0x424)][_0x4760ad(0x5f9)](),SceneManager['_scene'][_0x4760ad(0x360)][_0x4760ad(0x269)](-0x1);}return![];},Window_EquipCommand[_0x18a61c(0x1f3)]['maxCols']=function(){const _0x41b2e7=_0x18a61c;return this[_0x41b2e7(0x2ad)]?this[_0x41b2e7(0x2ad)][_0x41b2e7(0x3f9)]:0x3;},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x396)]=function(){const _0xbd28ff=_0x18a61c;if(this[_0xbd28ff(0x414)]()&&this[_0xbd28ff(0x444)]&&SceneManager['_scene'][_0xbd28ff(0x566)]===Scene_Equip){if(_0xbd28ff(0x1db)!==_0xbd28ff(0x1db))return this[_0xbd28ff(0x1e4)]()['match'](/LOWER/i);else{if(this[_0xbd28ff(0x38a)]()&&TouchInput[_0xbd28ff(0x5aa)]())_0xbd28ff(0x21a)===_0xbd28ff(0x536)?_0x5982d5=_0xbd28ff(0x4c6)['format'](_0x2b8f1f['id']):this['onTouchSelectModernControls'](![]);else TouchInput['isTriggered']()&&(_0xbd28ff(0x3ae)!==_0xbd28ff(0x4da)?this['onTouchSelectModernControls'](!![]):(_0x2cf714[_0xbd28ff(0x192)](_0xbd28ff(0x608))&&this['cursorRight'](_0x11702a[_0xbd28ff(0x403)](_0xbd28ff(0x608))),_0x2cd07e[_0xbd28ff(0x192)](_0xbd28ff(0x3c6))&&this[_0xbd28ff(0x272)](_0x4da779[_0xbd28ff(0x403)](_0xbd28ff(0x3c6)))));if(TouchInput[_0xbd28ff(0x325)]()){if('mWOaZ'==='mWOaZ')this[_0xbd28ff(0x1cc)]();else{const _0x34f6e4=_0x43da1a[_0xbd28ff(0x1f3)][_0xbd28ff(0x46e)](0x1,_0x86a525);if(_0x34f6e4>0x0){_0x12bc26+='\x5cI[%1]'['format'](_0x34f6e4),_0x45d794++;if(_0x5838b7>=_0x2d9e5b)return _0x4c9bdb;}}}}}},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x585)]=function(_0x14f58d){const _0x5618f8=_0x18a61c;this[_0x5618f8(0x461)]=![];const _0x42fd09=this[_0x5618f8(0x4f1)](),_0x52170e=this['hitIndex'](),_0x4fbfc9=SceneManager[_0x5618f8(0x424)][_0x5618f8(0x360)];if(_0x4fbfc9[_0x5618f8(0x414)]()&&_0x4fbfc9[_0x5618f8(0x444)]){if(_0x52170e>=0x0){if(_0x5618f8(0x2e9)===_0x5618f8(0x425))return this[_0x5618f8(0x206)]()?this[_0x5618f8(0x224)]():_0x20df7f[_0x5618f8(0x254)]['Settings'][_0x5618f8(0x483)][_0x5618f8(0x278)]['call'](this);else{if(_0x52170e===this['index']()){if(_0x5618f8(0x607)!=='vCUVD')this['_doubleTouch']=!![];else{const _0x2c86e3=this['commandName'](_0x4a38c5);if(_0x2c86e3[_0x5618f8(0x23c)](/\\I\[(\d+)\]/i)){const _0x944fad=this['itemLineRect'](_0x1392d6),_0x14d093=this[_0x5618f8(0x268)](_0x2c86e3)[_0x5618f8(0x1e5)];return _0x14d093<=_0x944fad[_0x5618f8(0x1e5)]?'iconText':_0x5618f8(0x281);}}}this[_0x5618f8(0x590)](),this[_0x5618f8(0x1b9)](_0x52170e);}}else _0x4fbfc9[_0x5618f8(0x3b0)]()>=0x0&&(this[_0x5618f8(0x56b)](),this[_0x5618f8(0x46f)]());}_0x14f58d&&this[_0x5618f8(0x4f1)]()!==_0x42fd09&&this[_0x5618f8(0x3b9)]();},Window_EquipCommand[_0x18a61c(0x1f3)]['makeCommandList']=function(){const _0x32edcb=_0x18a61c;this[_0x32edcb(0x591)](),this[_0x32edcb(0x283)](),this[_0x32edcb(0x1c8)]();},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x499)]=function(){const _0x5a6343=_0x18a61c;Window_HorzCommand[_0x5a6343(0x1f3)][_0x5a6343(0x499)][_0x5a6343(0x4f3)](this),this[_0x5a6343(0x238)]();},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x591)]=function(){const _0x3ba580=_0x18a61c;if(!this[_0x3ba580(0x5c1)]())return;const _0x202f40=this[_0x3ba580(0x2c3)](),_0x2ebdea=VisuMZ[_0x3ba580(0x254)][_0x3ba580(0x52e)][_0x3ba580(0x1ce)][_0x3ba580(0x24c)],_0x7df593=_0x202f40==='text'?TextManager[_0x3ba580(0x42e)]:'\x5cI[%1]%2'[_0x3ba580(0x57c)](_0x2ebdea,TextManager[_0x3ba580(0x42e)]),_0x2b07a7=this[_0x3ba580(0x55e)]();this[_0x3ba580(0x346)](_0x7df593,_0x3ba580(0x336),_0x2b07a7);},Window_EquipCommand['prototype'][_0x18a61c(0x5c1)]=function(){const _0x30b8d5=_0x18a61c;return!this[_0x30b8d5(0x1ed)]();},Window_EquipCommand['prototype'][_0x18a61c(0x55e)]=function(){return!![];},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x283)]=function(){const _0x51adfb=_0x18a61c;if(!this[_0x51adfb(0x2da)]())return;const _0x3a1fc2=this[_0x51adfb(0x2c3)](),_0x6adedc=VisuMZ[_0x51adfb(0x254)][_0x51adfb(0x52e)]['EquipScene']['CmdIconOptimize'],_0x306669=_0x3a1fc2==='text'?TextManager['optimize']:'\x5cI[%1]%2'['format'](_0x6adedc,TextManager[_0x51adfb(0x187)]),_0x1f3c3d=this[_0x51adfb(0x4e3)]();this[_0x51adfb(0x346)](_0x306669,_0x51adfb(0x187),_0x1f3c3d);},Window_EquipCommand[_0x18a61c(0x1f3)]['isOptimizeCommandAdded']=function(){const _0x2302c5=_0x18a61c;return VisuMZ[_0x2302c5(0x254)]['Settings'][_0x2302c5(0x1ce)]['CommandAddOptimize'];},Window_EquipCommand[_0x18a61c(0x1f3)]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x1c8)]=function(){const _0xd753dc=_0x18a61c;if(!this[_0xd753dc(0x569)]())return;const _0x216be5=this[_0xd753dc(0x2c3)](),_0x9035f9=VisuMZ['ItemsEquipsCore'][_0xd753dc(0x52e)]['EquipScene'][_0xd753dc(0x44d)],_0x2c5c8f=_0x216be5===_0xd753dc(0x3bd)?TextManager[_0xd753dc(0x28f)]:_0xd753dc(0x4d6)['format'](_0x9035f9,TextManager['clear']),_0x4a2449=this[_0xd753dc(0x4c7)]();this[_0xd753dc(0x346)](_0x2c5c8f,_0xd753dc(0x28f),_0x4a2449);},Window_EquipCommand[_0x18a61c(0x1f3)]['isClearCommandAdded']=function(){const _0xd2a07f=_0x18a61c;return VisuMZ['ItemsEquipsCore'][_0xd2a07f(0x52e)][_0xd2a07f(0x1ce)][_0xd2a07f(0x2fd)];},Window_EquipCommand[_0x18a61c(0x1f3)]['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x52c)]=function(){const _0x5a85d7=_0x18a61c;return VisuMZ[_0x5a85d7(0x254)][_0x5a85d7(0x52e)][_0x5a85d7(0x1ce)][_0x5a85d7(0x474)];},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x248)]=function(_0x406a73){const _0x24dcb5=_0x18a61c,_0x1961d6=this['commandStyleCheck'](_0x406a73);if(_0x1961d6===_0x24dcb5(0x2c9))this[_0x24dcb5(0x1f4)](_0x406a73);else _0x1961d6===_0x24dcb5(0x281)?this[_0x24dcb5(0x47d)](_0x406a73):Window_HorzCommand[_0x24dcb5(0x1f3)][_0x24dcb5(0x248)][_0x24dcb5(0x4f3)](this,_0x406a73);},Window_EquipCommand['prototype'][_0x18a61c(0x2c3)]=function(){const _0x44277e=_0x18a61c;return VisuMZ['ItemsEquipsCore']['Settings'][_0x44277e(0x1ce)][_0x44277e(0x1c3)];},Window_EquipCommand[_0x18a61c(0x1f3)][_0x18a61c(0x4ec)]=function(_0x53a155){const _0x1064df=_0x18a61c;if(_0x53a155<0x0)return _0x1064df(0x3bd);const _0x1abe47=this[_0x1064df(0x2c3)]();if(_0x1abe47!==_0x1064df(0x210))return _0x1abe47;else{if(this['maxItems']()>0x0){const _0x432e8c=this[_0x1064df(0x42a)](_0x53a155);if(_0x432e8c['match'](/\\I\[(\d+)\]/i)){const _0x44a62c=this[_0x1064df(0x435)](_0x53a155),_0x3ce343=this['textSizeEx'](_0x432e8c)[_0x1064df(0x1e5)];if(_0x3ce343<=_0x44a62c[_0x1064df(0x1e5)])return _0x1064df(0x2c9);else{if('AKgnR'==='AKgnR')return _0x1064df(0x281);else{if(_0x111b5b[_0x1064df(0x2bd)]&&_0xaa6fb2[_0x1064df(0x35b)]!==_0x2db0e7)return _0x3bcf29[_0x1064df(0x35b)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x1064df(0x1e4)]()['match'](/LOWER/i);else _0x337c59[_0x1064df(0x1f3)][_0x1064df(0x543)][_0x1064df(0x4f3)](this);}}}}}}return'text';},Window_EquipCommand[_0x18a61c(0x1f3)]['drawItemStyleIconText']=function(_0x276f2d){const _0x2be551=_0x18a61c,_0x18bea8=this['itemLineRect'](_0x276f2d),_0xa707d1=this['commandName'](_0x276f2d),_0xc1c3e9=this[_0x2be551(0x268)](_0xa707d1)['width'];this['changePaintOpacity'](this[_0x2be551(0x20d)](_0x276f2d));const _0x25baa6=this['itemTextAlign']();if(_0x25baa6===_0x2be551(0x608)){if(_0x2be551(0x19d)!=='YFATV')this[_0x2be551(0x21e)](_0xa707d1,_0x18bea8['x']+_0x18bea8[_0x2be551(0x1e5)]-_0xc1c3e9,_0x18bea8['y'],_0xc1c3e9);else{const _0x314f97=_0x15152b['makeDeepCopy'](this);_0x314f97[_0x2be551(0x2c1)]=!![],this[_0x2be551(0x363)][_0x32e396]['setObject'](null),this[_0x2be551(0x23d)]=!![],this[_0x2be551(0x4d1)](_0x314f97),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=_0x1b3a9f;}}else{if(_0x25baa6===_0x2be551(0x32c)){if(_0x2be551(0x578)===_0x2be551(0x26a))return this[_0x2be551(0x35a)][_0x2be551(0x4d9)];else{const _0x2d7526=_0x18bea8['x']+Math[_0x2be551(0x1f7)]((_0x18bea8['width']-_0xc1c3e9)/0x2);this[_0x2be551(0x21e)](_0xa707d1,_0x2d7526,_0x18bea8['y'],_0xc1c3e9);}}else{if(_0x2be551(0x41c)!=='VeCAB')this[_0x2be551(0x21e)](_0xa707d1,_0x18bea8['x'],_0x18bea8['y'],_0xc1c3e9);else return this[_0x2be551(0x206)]()?this[_0x2be551(0x224)]():_0x6bc12d['ItemsEquipsCore'][_0x2be551(0x3b1)][_0x2be551(0x4f3)](this);}}},Window_EquipCommand['prototype']['drawItemStyleIcon']=function(_0x1ab3b1){const _0x587f39=_0x18a61c;this[_0x587f39(0x42a)](_0x1ab3b1)['match'](/\\I\[(\d+)\]/i);const _0x920196=Number(RegExp['$1'])||0x0,_0x516283=this[_0x587f39(0x435)](_0x1ab3b1),_0xdf6528=_0x516283['x']+Math[_0x587f39(0x1f7)]((_0x516283['width']-ImageManager[_0x587f39(0x361)])/0x2),_0x8c6862=_0x516283['y']+(_0x516283[_0x587f39(0x1d8)]-ImageManager['iconHeight'])/0x2;this[_0x587f39(0x439)](_0x920196,_0xdf6528,_0x8c6862);},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x1ed)]=function(){const _0x1aeb53=_0x18a61c;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x1aeb53(0x1f3)][_0x1aeb53(0x1ed)][_0x1aeb53(0x4f3)](this);},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x590)]=function(){const _0x52ad54=_0x18a61c;Window_StatusBase[_0x52ad54(0x1f3)][_0x52ad54(0x590)][_0x52ad54(0x4f3)](this),this[_0x52ad54(0x36e)]();},Window_EquipSlot[_0x18a61c(0x1f3)]['processCursorMove']=function(){const _0x3f6b38=_0x18a61c;Window_StatusBase[_0x3f6b38(0x1f3)][_0x3f6b38(0x4aa)][_0x3f6b38(0x4f3)](this),this[_0x3f6b38(0x2c5)]();},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x2c5)]=function(){const _0x52735e=_0x18a61c;if(!this[_0x52735e(0x48b)]())return;if(Input[_0x52735e(0x403)](_0x52735e(0x28b))&&this[_0x52735e(0x423)]()){if('HVXbE'!==_0x52735e(0x337)){const _0x2c9313=SceneManager[_0x52735e(0x424)][_0x52735e(0x2c4)];_0x2c9313&&(_0x52735e(0x3be)==='iUKEl'?this['commandSellItemsEquipsCore']():this[_0x52735e(0x1c0)](this[_0x52735e(0x4f1)]())?(this[_0x52735e(0x21c)](),this[_0x52735e(0x1cd)]()):this['playBuzzerSound']());}else this[_0x52735e(0x5cd)]++;}},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x1c0)]=function(_0x1d8a5e){const _0x247012=_0x18a61c,_0x13053e=SceneManager[_0x247012(0x424)][_0x247012(0x2c4)];if(!_0x13053e)return;if(!_0x13053e[_0x247012(0x563)](this[_0x247012(0x4f1)]())){if(_0x247012(0x514)!=='PYoQL')return![];else _0x2017b2['ItemsEquipsCore'][_0x247012(0x599)][_0x247012(0x4f3)](this,_0xddf40e,_0x470771);}const _0xdc4b01=_0x13053e[_0x247012(0x237)]()[this[_0x247012(0x4f1)]()];if(_0x13053e['nonRemovableEtypes']()['includes'](_0xdc4b01))return![];return!![];;},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x21c)]=function(){const _0x5eeb48=_0x18a61c;SoundManager[_0x5eeb48(0x4d0)]();const _0x3eec0b=SceneManager[_0x5eeb48(0x424)]['_actor'];_0x3eec0b[_0x5eeb48(0x52a)](this[_0x5eeb48(0x4f1)](),null),this[_0x5eeb48(0x499)](),this[_0x5eeb48(0x231)]['refresh'](),this[_0x5eeb48(0x36e)]();const _0x3701c6=SceneManager[_0x5eeb48(0x424)][_0x5eeb48(0x5a9)];if(_0x3701c6)_0x3701c6[_0x5eeb48(0x499)]();},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x48b)]=function(){const _0x408736=_0x18a61c;if(!this[_0x408736(0x200)])return![];if(!VisuMZ[_0x408736(0x254)][_0x408736(0x52e)][_0x408736(0x1ce)][_0x408736(0x31f)])return![];return!![];},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x53b)]=function(){const _0x5789e1=_0x18a61c;!this[_0x5789e1(0x30b)]()&&(_0x5789e1(0x212)!=='UbfSE'?(_0x41b80d=_0xe8b880[_0x5789e1(0x2f5)](_0x33240f),_0xa84f67=_0x56684b-_0xa08f10[_0x5789e1(0x2f5)](_0x3691b3),this['changeTextColor'](_0x56c4ad['paramchangeTextColor'](_0x331796)),_0x1fab07=(_0x12cecc>=0x0?'+':'')+_0x3e178d[_0x5789e1(0x2b0)](_0x43c002,0x0,_0x200f65)):Window_StatusBase[_0x5789e1(0x1f3)][_0x5789e1(0x53b)][_0x5789e1(0x4f3)](this));},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x30b)]=function(){const _0x532727=_0x18a61c;if(!this[_0x532727(0x2c2)]())return![];if(SceneManager[_0x532727(0x424)][_0x532727(0x566)]!==Scene_Equip)return![];if(this[_0x532727(0x340)]())return this['playCursorSound'](),Input['clear'](),SceneManager[_0x532727(0x424)][_0x532727(0x2d4)](),![];else{if(Input[_0x532727(0x192)]('down')){const _0x4b65d1=this[_0x532727(0x4f1)]();if(Input[_0x532727(0x34f)](_0x532727(0x28b))){if(_0x532727(0x3d3)===_0x532727(0x3d3))this[_0x532727(0x1a0)]();else{_0x95daf1=_0x4678e0||this[_0x532727(0x4ce)](),this[_0x532727(0x359)]['paintOpacity']=0xa0;const _0x3e397a=_0x46124b['getItemsEquipsCoreBackColor2']();this[_0x532727(0x359)][_0x532727(0x21b)](_0x48f8f5+0x1,_0x25eba6+0x1,_0x3e53e2-0x2,_0xf42ea8-0x2,_0x3e397a),this[_0x532727(0x359)]['paintOpacity']=0xff;}}else this[_0x532727(0x3eb)](Input[_0x532727(0x403)](_0x532727(0x5e6)));return this[_0x532727(0x4f1)]()!==_0x4b65d1&&this[_0x532727(0x3b9)](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input['isTriggered']('shift')){if(_0x532727(0x298)!==_0x532727(0x298)){const _0x17dbdf=this[_0x532727(0x1ae)]['y'],_0x5410d1=this[_0x532727(0x1ae)][_0x532727(0x1e5)],_0x31eb5a=this[_0x532727(0x1a9)](0x1,!![]),_0x489a1e=this[_0x532727(0x543)]()?_0xae2b0c[_0x532727(0x208)]-_0x5410d1:0x0;return new _0x30d423(_0x489a1e,_0x17dbdf,_0x5410d1,_0x31eb5a);}else return!![];}}}return![];},Window_EquipSlot[_0x18a61c(0x1f3)]['allowCommandWindowCursorUp']=function(){const _0xf2f6a9=_0x18a61c;if(this[_0xf2f6a9(0x4f1)]()!==0x0)return![];const _0x27adfd=VisuMZ[_0xf2f6a9(0x254)][_0xf2f6a9(0x52e)]['EquipScene'];if(!_0x27adfd['CommandAddOptimize']&&!_0x27adfd[_0xf2f6a9(0x2fd)])return![];return Input[_0xf2f6a9(0x403)]('up');},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x5d5)]=function(){const _0x4cd939=_0x18a61c;return VisuMZ[_0x4cd939(0x254)]['Settings'][_0x4cd939(0x1ce)]['ShiftShortcutKey'];},Window_EquipSlot['prototype'][_0x18a61c(0x396)]=function(){const _0x3f3609=_0x18a61c;if(this[_0x3f3609(0x414)]()&&this[_0x3f3609(0x444)]&&SceneManager[_0x3f3609(0x424)][_0x3f3609(0x566)]===Scene_Equip){if(this[_0x3f3609(0x38a)]()&&TouchInput['isHovered']())this[_0x3f3609(0x585)](![]);else{if(TouchInput[_0x3f3609(0x403)]()){if('GQmYo'!==_0x3f3609(0x317))this['onTouchSelectModernControls'](!![]);else return _0x4aea68[_0x3f3609(0x35b)];}}if(TouchInput[_0x3f3609(0x325)]()){if('hWBmo'===_0x3f3609(0x393)){const _0x2f55f0=this[_0x3f3609(0x2c3)](),_0x58be96=_0x1422c2[_0x3f3609(0x254)][_0x3f3609(0x52e)][_0x3f3609(0x331)][_0x3f3609(0x504)],_0x588250=_0x2f55f0===_0x3f3609(0x3bd)?_0x197a13[_0x3f3609(0x383)]:'\x5cI[%1]%2'[_0x3f3609(0x57c)](_0x58be96,_0x44984[_0x3f3609(0x383)]),_0x593fc0=this[_0x3f3609(0x18c)]();if(this['hideDisabledCommands']()&&!_0x593fc0)return;this['addCommand'](_0x588250,_0x3f3609(0x383),_0x593fc0);}else this[_0x3f3609(0x1cc)]();}else TouchInput[_0x3f3609(0x246)]()&&(_0x3f3609(0x57f)===_0x3f3609(0x57f)?this[_0x3f3609(0x4a7)]():_0x5c880d=_0x3f3609(0x286)['format'](_0x366796['id']));}},Window_EquipSlot[_0x18a61c(0x1f3)]['onTouchSelectModernControls']=function(_0xdd47c1){const _0x297855=_0x18a61c;this[_0x297855(0x461)]=![];const _0x53fd3b=this[_0x297855(0x4f1)](),_0x431234=this[_0x297855(0x3b0)](),_0x57fc26=SceneManager['_scene']['_commandWindow'];if(_0x57fc26[_0x297855(0x414)]()&&_0x57fc26[_0x297855(0x444)]){if(_0x431234>=0x0){if(_0x431234===this[_0x297855(0x4f1)]()){if(_0x297855(0x4d7)!==_0x297855(0x5a5))this['_doubleTouch']=!![];else{const _0x49f65e=_0x3171f3[_0x297855(0x1f3)][_0x297855(0x46e)](-0x1,_0x315b12);if(_0x49f65e>0x0){_0x4c1600+=_0x297855(0x419)['format'](_0x49f65e),_0x936de1++;if(_0x57c826>=_0x6e65a8)return _0x20486e;}}}this[_0x297855(0x590)](),this[_0x297855(0x1b9)](_0x431234);}else _0x57fc26[_0x297855(0x3b0)]()>=0x0&&(this[_0x297855(0x56b)](),this['deselect']());}_0xdd47c1&&this['index']()!==_0x53fd3b&&this['playCursorSound']();},Window_EquipSlot[_0x18a61c(0x1f3)][_0x18a61c(0x390)]=function(){return this['index']();},VisuMZ[_0x18a61c(0x254)]['Window_EquipItem_includes']=Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x366)],Window_EquipItem['prototype'][_0x18a61c(0x366)]=function(_0x47ff59){const _0x59d3af=_0x18a61c;if(_0x47ff59===null&&this[_0x59d3af(0x1da)]()[_0x59d3af(0x366)](this['etypeId']())){if(_0x59d3af(0x5f0)==='QRroQ')return![];else{const _0x37c750=_0x2bc578[_0x59d3af(0x254)]['Settings'][_0x59d3af(0x489)][_0x59d3af(0x38b)];return _0x37c750[_0x59d3af(0x57c)](_0x1d3d2f['mp']);}}else return VisuMZ['ItemsEquipsCore'][_0x59d3af(0x19e)]['call'](this,_0x47ff59);},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x596)]=Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x40c)],Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x40c)]=function(_0x4e918c){const _0x2d7ef2=_0x18a61c;if(_0x4e918c&&this[_0x2d7ef2(0x2c4)]){if(this[_0x2d7ef2(0x394)](_0x4e918c))return![];if(this[_0x2d7ef2(0x257)](_0x4e918c))return![];if(this[_0x2d7ef2(0x452)](_0x4e918c))return![];}if(!_0x4e918c){if(_0x2d7ef2(0x5be)===_0x2d7ef2(0x438))_0x233b87=this['_actor'][_0x2d7ef2(0x2f5)](_0x1b4740,![]),_0x6d16cc=this[_0x2d7ef2(0x2c1)][_0x2d7ef2(0x2f5)](_0xa70b96,![]),_0x37dd5b=_0x3e3002(this[_0x2d7ef2(0x2c4)][_0x2d7ef2(0x2f5)](_0x35f802,!![]))['match'](/([%％])/i);else return!this['nonRemovableEtypes']()['includes'](this['etypeId']());}return VisuMZ[_0x2d7ef2(0x254)]['Window_EquipItem_isEnabled'][_0x2d7ef2(0x4f3)](this,_0x4e918c);},Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x394)]=function(_0x314c6b){const _0x2adef0=_0x18a61c,_0x32b15b=_0x314c6b['note'];if(_0x32b15b[_0x2adef0(0x23c)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x2adef0(0x5bf)===_0x2adef0(0x5bf)){const _0x2a43a9=Number(RegExp['$1'])||0x1;let _0x13ac5b=0x0;const _0x53ef9c=this[_0x2adef0(0x2c4)]['equips'](),_0x633451=SceneManager[_0x2adef0(0x424)]['_slotWindow'][_0x2adef0(0x390)]();_0x53ef9c[_0x633451]=null;for(const _0x2ff80a of _0x53ef9c){if(!_0x2ff80a)continue;if(DataManager[_0x2adef0(0x3b7)](_0x314c6b)===DataManager[_0x2adef0(0x3b7)](_0x2ff80a)){if('LlpRc'===_0x2adef0(0x508)){if(_0x314c6b['id']===_0x2ff80a['id'])_0x13ac5b+=0x1;}else{const _0x3b6580=0x0,_0x2cde0e=this['helpAreaTop'](),_0x16cf51=_0x295ce4['boxWidth'],_0x5e7796=this[_0x2adef0(0x1e3)]();return new _0x16b280(_0x3b6580,_0x2cde0e,_0x16cf51,_0x5e7796);}}}return _0x13ac5b>=_0x2a43a9;}else{if(!_0x66a60[_0x2adef0(0x470)](_0x4b61c5))return!![];}}else return![];},Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x257)]=function(_0x58386e){const _0x458ef5=_0x18a61c;if(!DataManager[_0x458ef5(0x3b7)](_0x58386e))return![];const _0x1a4f98=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x26e990=0x0;const _0x5b172a=this[_0x458ef5(0x2c4)][_0x458ef5(0x391)](),_0x253e48=SceneManager[_0x458ef5(0x424)][_0x458ef5(0x360)][_0x458ef5(0x390)]();_0x5b172a[_0x253e48]=null;for(const _0x29290b of _0x5b172a){if(!_0x29290b)continue;if(!DataManager[_0x458ef5(0x3b7)](_0x29290b))continue;if(_0x58386e[_0x458ef5(0x253)]===_0x29290b[_0x458ef5(0x253)]){_0x26e990+=0x1;if(_0x58386e[_0x458ef5(0x447)]['match'](_0x1a4f98)){const _0x5e6488=Number(RegExp['$1'])||0x1;if(_0x26e990>=_0x5e6488)return!![];}if(_0x29290b['note'][_0x458ef5(0x23c)](_0x1a4f98)){const _0x4b928d=Number(RegExp['$1'])||0x1;if(_0x26e990>=_0x4b928d)return!![];}}}return![];},Window_EquipItem[_0x18a61c(0x1f3)]['isSoleArmorType']=function(_0x48a924){const _0xac57da=_0x18a61c;if(!DataManager[_0xac57da(0x194)](_0x48a924))return![];const _0x275ea1=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x4da438=0x0;const _0x41fc68=this[_0xac57da(0x2c4)][_0xac57da(0x391)](),_0x234577=SceneManager['_scene'][_0xac57da(0x360)]['equipSlotIndex']();_0x41fc68[_0x234577]=null;for(const _0x4275eb of _0x41fc68){if(!_0x4275eb)continue;if(!DataManager[_0xac57da(0x194)](_0x4275eb))continue;if(_0x48a924[_0xac57da(0x5db)]===_0x4275eb[_0xac57da(0x5db)]){if('ICeqr'===_0xac57da(0x58e)){const _0x13072b=_0xac57da(0x2eb);if(this['_customItemInfo'][_0x13072b])return this[_0xac57da(0x463)][_0x13072b];return this[_0xac57da(0x301)]()?_0x581d22[_0xac57da(0x254)][_0xac57da(0x52e)][_0xac57da(0x489)]['Consumable']:_0x23298d[_0xac57da(0x254)][_0xac57da(0x52e)][_0xac57da(0x489)][_0xac57da(0x4de)];}else{_0x4da438+=0x1;if(_0x48a924['note'][_0xac57da(0x23c)](_0x275ea1)){if('AcRQD'!=='XeDIO'){const _0x49279f=Number(RegExp['$1'])||0x1;if(_0x4da438>=_0x49279f)return!![];}else this[_0xac57da(0x29e)](_0xdc5f8a[_0xac57da(0x316)](_0x2bcccc)),_0x5cfe44=(_0x41ba29>0x0?'(+%1)':'(%1)')['format'](_0x26777d),this['drawText'](_0x4d7d97,_0x22335a+_0x380803,_0x338f59,_0x23375e,'left');}if(_0x4275eb[_0xac57da(0x447)][_0xac57da(0x23c)](_0x275ea1)){const _0x1ce18d=Number(RegExp['$1'])||0x1;if(_0x4da438>=_0x1ce18d)return!![];}}}}return![];},Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x1da)]=function(){const _0x2890f8=_0x18a61c;return VisuMZ['ItemsEquipsCore'][_0x2890f8(0x52e)][_0x2890f8(0x1ce)][_0x2890f8(0x31e)];},Window_EquipItem['prototype'][_0x18a61c(0x248)]=function(_0x2012db){const _0x449a47=_0x18a61c,_0x3e5982=this[_0x449a47(0x4ff)](_0x2012db);if(_0x3e5982)Window_ItemList[_0x449a47(0x1f3)][_0x449a47(0x248)][_0x449a47(0x4f3)](this,_0x2012db);else{if('JxbFl'===_0x449a47(0x2cf))this['drawRemoveItem'](_0x2012db);else{const _0x282ee1=this['_commandWindow']['y']+this[_0x449a47(0x1ae)][_0x449a47(0x1d8)],_0xf473b0=_0x1a8e98[_0x449a47(0x208)]-this[_0x449a47(0x495)](),_0x190465=this[_0x449a47(0x1f9)]()-this[_0x449a47(0x1ae)][_0x449a47(0x1d8)],_0x4aea1e=this['isRightInputMode']()?_0x4ec6e7[_0x449a47(0x208)]-_0xf473b0:0x0;return new _0x47f117(_0x4aea1e,_0x282ee1,_0xf473b0,_0x190465);}}},Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x271)]=function(_0xd78f73){const _0x1f41fc=_0x18a61c;this[_0x1f41fc(0x530)](this[_0x1f41fc(0x40c)](null));const _0x31aa70=VisuMZ[_0x1f41fc(0x254)][_0x1f41fc(0x52e)][_0x1f41fc(0x1ce)],_0x1621aa=this['itemLineRect'](_0xd78f73),_0x49d501=_0x1621aa['y']+(this[_0x1f41fc(0x4ce)]()-ImageManager[_0x1f41fc(0x1d5)])/0x2,_0x2ae3f=ImageManager[_0x1f41fc(0x361)]+0x4,_0x42ff0f=Math[_0x1f41fc(0x47f)](0x0,_0x1621aa['width']-_0x2ae3f);this[_0x1f41fc(0x513)](),this[_0x1f41fc(0x439)](_0x31aa70['RemoveEquipIcon'],_0x1621aa['x'],_0x49d501),this[_0x1f41fc(0x2a4)](_0x31aa70['RemoveEquipText'],_0x1621aa['x']+_0x2ae3f,_0x1621aa['y'],_0x42ff0f),this[_0x1f41fc(0x530)](!![]);},Window_EquipItem[_0x18a61c(0x1f3)][_0x18a61c(0x1cd)]=function(){const _0x2bf6e5=_0x18a61c;Window_ItemList[_0x2bf6e5(0x1f3)][_0x2bf6e5(0x1cd)][_0x2bf6e5(0x4f3)](this);if(this[_0x2bf6e5(0x2c4)]&&this[_0x2bf6e5(0x5a9)]&&this[_0x2bf6e5(0x2dd)]>=0x0){const _0xbe12af=JsonEx['makeDeepCopy'](this['_actor']);_0xbe12af[_0x2bf6e5(0x2c1)]=!![],_0xbe12af[_0x2bf6e5(0x343)](this['_slotId'],this[_0x2bf6e5(0x423)]()),this[_0x2bf6e5(0x5a9)][_0x2bf6e5(0x5a2)](_0xbe12af);}},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x5a6)]=Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x517)],Window_ShopCommand['prototype'][_0x18a61c(0x517)]=function(_0x1dac45){const _0x5c7c16=_0x18a61c;VisuMZ[_0x5c7c16(0x254)][_0x5c7c16(0x5a6)][_0x5c7c16(0x4f3)](this,_0x1dac45),this[_0x5c7c16(0x5a1)](_0x1dac45);},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x5a1)]=function(_0x55e231){const _0x44065b=_0x18a61c,_0x2461d5=new Rectangle(0x0,0x0,_0x55e231[_0x44065b(0x1e5)],_0x55e231[_0x44065b(0x1d8)]);this['_commandNameWindow']=new Window_Base(_0x2461d5),this[_0x44065b(0x235)][_0x44065b(0x3c9)]=0x0,this['addChild'](this[_0x44065b(0x235)]),this[_0x44065b(0x314)]();},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x36e)]=function(){const _0x3ce616=_0x18a61c;Window_HorzCommand[_0x3ce616(0x1f3)][_0x3ce616(0x36e)][_0x3ce616(0x4f3)](this);if(this[_0x3ce616(0x235)])this['updateCommandNameWindow']();},Window_ShopCommand['prototype'][_0x18a61c(0x314)]=function(){const _0x441ab3=_0x18a61c,_0x33e948=this[_0x441ab3(0x235)];_0x33e948[_0x441ab3(0x359)][_0x441ab3(0x28f)]();const _0x3ceffd=this[_0x441ab3(0x4ec)](this[_0x441ab3(0x4f1)]());if(_0x3ceffd===_0x441ab3(0x281)){if(_0x441ab3(0x4c4)!==_0x441ab3(0x288)){const _0x881951=this[_0x441ab3(0x435)](this[_0x441ab3(0x4f1)]());let _0x35e0ea=this['commandName'](this[_0x441ab3(0x4f1)]());_0x35e0ea=_0x35e0ea[_0x441ab3(0x348)](/\\I\[(\d+)\]/gi,''),_0x33e948[_0x441ab3(0x2ab)](),this[_0x441ab3(0x570)](_0x35e0ea,_0x881951),this[_0x441ab3(0x4f0)](_0x35e0ea,_0x881951),this[_0x441ab3(0x2c0)](_0x35e0ea,_0x881951);}else{const _0x118d61=this[_0x441ab3(0x58f)];_0x118d61[_0x441ab3(0x359)]['clear']();const _0x4459bf=this[_0x441ab3(0x4e8)](this[_0x441ab3(0x4f1)]());if(_0x4459bf==='icon'){const _0x7c587=this[_0x441ab3(0x435)](this[_0x441ab3(0x4f1)]());let _0x48a86f=this[_0x441ab3(0x42a)](this['index']());_0x48a86f=_0x48a86f[_0x441ab3(0x348)](/\\I\[(\d+)\]/gi,''),_0x118d61[_0x441ab3(0x2ab)](),this[_0x441ab3(0x2bb)](_0x48a86f,_0x7c587),this[_0x441ab3(0x1c9)](_0x48a86f,_0x7c587),this[_0x441ab3(0x3cc)](_0x48a86f,_0x7c587);}}}},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x570)]=function(_0xe56943,_0x27ee96){},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x4f0)]=function(_0xe60ca2,_0xa8490b){const _0x5588be=_0x18a61c,_0x2ee105=this[_0x5588be(0x235)];_0x2ee105['drawText'](_0xe60ca2,0x0,_0xa8490b['y'],_0x2ee105[_0x5588be(0x4d4)],_0x5588be(0x32c));},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x2c0)]=function(_0x2089a9,_0x3cb44f){const _0x249a9f=_0x18a61c,_0x362c98=this[_0x249a9f(0x235)],_0x48754f=$gameSystem[_0x249a9f(0x2cc)](),_0x135ad7=_0x3cb44f['x']+Math['floor'](_0x3cb44f[_0x249a9f(0x1e5)]/0x2)+_0x48754f;_0x362c98['x']=_0x362c98[_0x249a9f(0x1e5)]/-0x2+_0x135ad7,_0x362c98['y']=Math[_0x249a9f(0x1f7)](_0x3cb44f['height']/0x2);},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x26b)]=function(){const _0x14a50e=_0x18a61c;return this['_list']?this[_0x14a50e(0x2ad)][_0x14a50e(0x3f9)]:0x3;},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x371)]=function(){const _0x5c0d7b=_0x18a61c;return VisuMZ[_0x5c0d7b(0x254)][_0x5c0d7b(0x52e)]['ShopScene']['CmdHideDisabled'];},Window_ShopCommand[_0x18a61c(0x1f3)]['makeCommandList']=function(){const _0x52a7a7=_0x18a61c;this[_0x52a7a7(0x274)](),this[_0x52a7a7(0x1de)](),this[_0x52a7a7(0x365)]();},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x499)]=function(){const _0xe50995=_0x18a61c;Window_HorzCommand[_0xe50995(0x1f3)][_0xe50995(0x499)]['call'](this),this[_0xe50995(0x238)]();},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x274)]=function(){const _0x1c54d5=_0x18a61c,_0x4b4f18=this[_0x1c54d5(0x2c3)](),_0x571064=VisuMZ[_0x1c54d5(0x254)]['Settings'][_0x1c54d5(0x331)][_0x1c54d5(0x3e5)],_0x425b7b=_0x4b4f18===_0x1c54d5(0x3bd)?TextManager[_0x1c54d5(0x378)]:_0x1c54d5(0x4d6)[_0x1c54d5(0x57c)](_0x571064,TextManager[_0x1c54d5(0x378)]),_0x1f097d=this[_0x1c54d5(0x1f2)]();if(this[_0x1c54d5(0x371)]()&&!_0x1f097d)return;this[_0x1c54d5(0x346)](_0x425b7b,'buy',_0x1f097d);},Window_ShopCommand['prototype']['isBuyCommandEnabled']=function(){const _0x52a721=_0x18a61c;if(SceneManager['_scene'][_0x52a721(0x566)]===Scene_Shop){if('mgaSi'===_0x52a721(0x4c5))_0xf48a66=0x0;else return SceneManager[_0x52a721(0x424)][_0x52a721(0x5cd)]>0x0;}else return!![];},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x1de)]=function(){const _0x2a4874=_0x18a61c,_0x13423b=this[_0x2a4874(0x2c3)](),_0x4bca8c=VisuMZ['ItemsEquipsCore'][_0x2a4874(0x52e)][_0x2a4874(0x331)][_0x2a4874(0x504)],_0x2210c0=_0x13423b==='text'?TextManager[_0x2a4874(0x383)]:_0x2a4874(0x4d6)[_0x2a4874(0x57c)](_0x4bca8c,TextManager['sell']),_0x5eb9a7=this[_0x2a4874(0x18c)]();if(this[_0x2a4874(0x371)]()&&!_0x5eb9a7)return;this['addCommand'](_0x2210c0,'sell',_0x5eb9a7);},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x18c)]=function(){const _0x1329cd=_0x18a61c;return!this[_0x1329cd(0x3de)];},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x365)]=function(){const _0x266891=_0x18a61c,_0x4bd28c=this['commandStyle'](),_0x196303=VisuMZ[_0x266891(0x254)][_0x266891(0x52e)]['ShopScene']['CmdIconCancel'],_0x110590=VisuMZ['ItemsEquipsCore'][_0x266891(0x52e)][_0x266891(0x331)]['CmdCancelRename'],_0x19b5e7=_0x4bd28c===_0x266891(0x3bd)?_0x110590:_0x266891(0x4d6)[_0x266891(0x57c)](_0x196303,_0x110590);this[_0x266891(0x346)](_0x19b5e7,_0x266891(0x426));},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x52c)]=function(){const _0x29d163=_0x18a61c;return VisuMZ[_0x29d163(0x254)][_0x29d163(0x52e)][_0x29d163(0x331)][_0x29d163(0x474)];},Window_ShopCommand['prototype'][_0x18a61c(0x248)]=function(_0x2c60d5){const _0x18e862=_0x18a61c,_0x33c50e=this['commandStyleCheck'](_0x2c60d5);if(_0x33c50e===_0x18e862(0x2c9))_0x18e862(0x18a)===_0x18e862(0x498)?(_0x35ac1b===this['index']()&&(this[_0x18e862(0x461)]=!![]),this[_0x18e862(0x590)](),this[_0x18e862(0x1b9)](_0x72bd38)):this['drawItemStyleIconText'](_0x2c60d5);else _0x33c50e===_0x18e862(0x281)?this['drawItemStyleIcon'](_0x2c60d5):Window_HorzCommand[_0x18e862(0x1f3)][_0x18e862(0x248)]['call'](this,_0x2c60d5);},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x2c3)]=function(){const _0x47b78e=_0x18a61c;return VisuMZ[_0x47b78e(0x254)][_0x47b78e(0x52e)][_0x47b78e(0x331)][_0x47b78e(0x1c3)];},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x4ec)]=function(_0x42fdbb){const _0x4e2841=_0x18a61c;if(_0x42fdbb<0x0)return _0x4e2841(0x3bd);const _0x155c56=this[_0x4e2841(0x2c3)]();if(_0x155c56!=='auto'){if(_0x4e2841(0x240)===_0x4e2841(0x240))return _0x155c56;else this['cursorPagedown']();}else{if(this[_0x4e2841(0x4fc)]()>0x0){const _0x3e239a=this[_0x4e2841(0x42a)](_0x42fdbb);if(_0x3e239a[_0x4e2841(0x23c)](/\\I\[(\d+)\]/i)){if(_0x4e2841(0x44f)!=='FBqEM')return this['_list']?this[_0x4e2841(0x2ad)]['length']:0x3;else{const _0x3738f1=this[_0x4e2841(0x435)](_0x42fdbb),_0x2633ac=this[_0x4e2841(0x268)](_0x3e239a)[_0x4e2841(0x1e5)];if(_0x2633ac<=_0x3738f1['width']){if(_0x4e2841(0x500)===_0x4e2841(0x5bb)){const _0x468aad=this['_itemData']['changeBuff'][_0x37b8d4],_0x1e362a=_0x7dfc3c[_0x4e2841(0x1f3)][_0x4e2841(0x46e)](_0x468aad,_0x3b6245);if(_0x1e362a>0x0){_0x28dfb0+=_0x4e2841(0x419)[_0x4e2841(0x57c)](_0x1e362a),_0x34f282++;if(_0x411d31>=_0x387ed2)return _0x1453f8;}}else return _0x4e2841(0x2c9);}else return _0x4e2841(0x281);}}}}return _0x4e2841(0x3bd);},Window_ShopCommand[_0x18a61c(0x1f3)][_0x18a61c(0x1f4)]=function(_0x5dde5e){const _0x22ea9d=_0x18a61c,_0x4f0b39=this[_0x22ea9d(0x435)](_0x5dde5e),_0x3777e1=this[_0x22ea9d(0x42a)](_0x5dde5e),_0x1372a2=this['textSizeEx'](_0x3777e1)['width'];this[_0x22ea9d(0x530)](this[_0x22ea9d(0x20d)](_0x5dde5e));const _0x2d5165=this[_0x22ea9d(0x52c)]();if(_0x2d5165===_0x22ea9d(0x608))this[_0x22ea9d(0x21e)](_0x3777e1,_0x4f0b39['x']+_0x4f0b39['width']-_0x1372a2,_0x4f0b39['y'],_0x1372a2);else{if(_0x2d5165==='center'){if('pszXj'===_0x22ea9d(0x1d2)){const _0x166318=_0x4f0b39['x']+Math[_0x22ea9d(0x1f7)]((_0x4f0b39['width']-_0x1372a2)/0x2);this['drawTextEx'](_0x3777e1,_0x166318,_0x4f0b39['y'],_0x1372a2);}else{const _0x3c8553='HIT\x20TYPE';if(this['_customItemInfo'][_0x3c8553])return this[_0x22ea9d(0x463)][_0x3c8553];const _0x105830=_0xb1439c[_0x22ea9d(0x254)][_0x22ea9d(0x52e)]['StatusWindow'],_0x4511ec='HitType%1'[_0x22ea9d(0x57c)](this[_0x22ea9d(0x35a)][_0x22ea9d(0x32f)]);return _0x105830[_0x4511ec];}}else this[_0x22ea9d(0x21e)](_0x3777e1,_0x4f0b39['x'],_0x4f0b39['y'],_0x1372a2);}},Window_ShopCommand['prototype']['drawItemStyleIcon']=function(_0x208fda){const _0x55ebc=_0x18a61c;this[_0x55ebc(0x42a)](_0x208fda)['match'](/\\I\[(\d+)\]/i);const _0xf3650b=Number(RegExp['$1'])||0x0,_0x56ed24=this[_0x55ebc(0x435)](_0x208fda),_0x30e84c=_0x56ed24['x']+Math[_0x55ebc(0x1f7)]((_0x56ed24['width']-ImageManager[_0x55ebc(0x361)])/0x2),_0x59ced4=_0x56ed24['y']+(_0x56ed24[_0x55ebc(0x1d8)]-ImageManager[_0x55ebc(0x1d5)])/0x2;this[_0x55ebc(0x439)](_0xf3650b,_0x30e84c,_0x59ced4);},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x57b)]=Window_ShopBuy[_0x18a61c(0x1f3)][_0x18a61c(0x499)],Window_ShopBuy[_0x18a61c(0x1f3)][_0x18a61c(0x499)]=function(){const _0x427ccb=_0x18a61c;this['updateMoneyAmount'](),VisuMZ['ItemsEquipsCore'][_0x427ccb(0x57b)][_0x427ccb(0x4f3)](this);},Window_ShopBuy['prototype'][_0x18a61c(0x3fb)]=function(){const _0x771165=_0x18a61c;SceneManager[_0x771165(0x424)][_0x771165(0x566)]===Scene_Shop&&(this[_0x771165(0x3d9)]=SceneManager[_0x771165(0x424)][_0x771165(0x457)]());},VisuMZ[_0x18a61c(0x254)][_0x18a61c(0x222)]=Window_ShopBuy[_0x18a61c(0x1f3)][_0x18a61c(0x36c)],Window_ShopBuy[_0x18a61c(0x1f3)]['price']=function(_0x43bbb7){const _0x1c9fdc=_0x18a61c;if(!_0x43bbb7)return 0x0;let _0x2a6626=VisuMZ['ItemsEquipsCore'][_0x1c9fdc(0x222)][_0x1c9fdc(0x4f3)](this,_0x43bbb7);return Math[_0x1c9fdc(0x47f)](0x0,this[_0x1c9fdc(0x375)](_0x43bbb7,_0x2a6626));},Window_ShopBuy[_0x18a61c(0x1f3)][_0x18a61c(0x375)]=function(_0x3a3eff,_0x32b9fd){const _0x3c2e5f=_0x18a61c,_0x349a2e=_0x3a3eff['note'];if(_0x349a2e['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){if(_0x3c2e5f(0x45b)===_0x3c2e5f(0x5c0)){const _0x5b04ab=_0xdc9768[_0x3c2e5f(0x254)][_0x3c2e5f(0x52e)][_0x3c2e5f(0x489)][_0x3c2e5f(0x2f6)];return _0x5b04ab[_0x3c2e5f(0x57c)](_0x4bf201['tp']);}else{const _0x24357b=String(RegExp['$1']);try{eval(_0x24357b);}catch(_0x1b741c){if($gameTemp[_0x3c2e5f(0x5fc)]())console[_0x3c2e5f(0x57e)](_0x1b741c);}}}_0x32b9fd=VisuMZ[_0x3c2e5f(0x254)][_0x3c2e5f(0x52e)][_0x3c2e5f(0x331)]['BuyPriceJS'][_0x3c2e5f(0x4f3)](this,_0x3a3eff,_0x32b9fd);if(isNaN(_0x32b9fd))_0x32b9fd=0x0;return Math[_0x3c2e5f(0x1f7)](_0x32b9fd);},Window_ShopBuy[_0x18a61c(0x1f3)][_0x18a61c(0x248)]=function(_0x4b2bf0){const _0x368e76=_0x18a61c;this['resetFontSettings']();const _0x3eb566=this[_0x368e76(0x4ff)](_0x4b2bf0),_0x9dd89d=this[_0x368e76(0x435)](_0x4b2bf0),_0x1ed9da=_0x9dd89d['width'];this[_0x368e76(0x530)](this['isEnabled'](_0x3eb566)),this['drawItemName'](_0x3eb566,_0x9dd89d['x'],_0x9dd89d['y'],_0x1ed9da),this['drawItemCost'](_0x3eb566,_0x9dd89d),this[_0x368e76(0x530)](!![]);},Window_ShopBuy[_0x18a61c(0x1f3)]['drawItemCost']=function(_0x8987,_0x4fc8e0){const _0x3f39dd=_0x18a61c,_0x177d82=this['price'](_0x8987);this[_0x3f39dd(0x35f)](_0x177d82,TextManager[_0x3f39dd(0x488)],_0x4fc8e0['x'],_0x4fc8e0['y'],_0x4fc8e0['width']);},Window_ShopSell[_0x18a61c(0x1f3)][_0x18a61c(0x26b)]=function(){const _0x5eb56a=_0x18a61c;return SceneManager['_scene'][_0x5eb56a(0x206)]()?0x1:0x2;},VisuMZ['ItemsEquipsCore'][_0x18a61c(0x476)]=Window_ShopSell[_0x18a61c(0x1f3)][_0x18a61c(0x40c)],Window_ShopSell[_0x18a61c(0x1f3)][_0x18a61c(0x40c)]=function(_0x1348a0){const _0x2a4fd4=_0x18a61c;if(!_0x1348a0)return![];const _0x298764=_0x1348a0[_0x2a4fd4(0x447)];if(_0x298764[_0x2a4fd4(0x23c)](/<CANNOT SELL>/i))return![];if(_0x298764[_0x2a4fd4(0x23c)](/<CAN SELL>/i))return!![];if(_0x298764['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35c090=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xdbd8a9 of _0x35c090){if(!$gameSwitches['value'](_0xdbd8a9))return![];}}if(_0x298764[_0x2a4fd4(0x23c)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41430e=JSON[_0x2a4fd4(0x2d7)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x22383a of _0x41430e){if(!$gameSwitches[_0x2a4fd4(0x470)](_0x22383a))return![];}}if(_0x298764[_0x2a4fd4(0x23c)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2a4fd4(0x41a)===_0x2a4fd4(0x41a)){const _0x4a89c5=JSON[_0x2a4fd4(0x2d7)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x467fc6 of _0x4a89c5){if($gameSwitches['value'](_0x467fc6))return![];}}else return this['normalColor']();}return VisuMZ['ItemsEquipsCore']['Window_ShopSell_isEnabled'][_0x2a4fd4(0x4f3)](this,_0x1348a0);},Window_ShopStatus[_0x18a61c(0x1f3)]['isPageChangeRequested']=function(){return![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x330)]=function(){const _0x5549e1=_0x18a61c;Window_StatusBase[_0x5549e1(0x1f3)]['loadFaceImages'][_0x5549e1(0x4f3)](this);for(const _0x5c71fc of $gameParty[_0x5549e1(0x4bb)]()){ImageManager[_0x5549e1(0x44a)](_0x5c71fc[_0x5549e1(0x54f)]());}},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x51c)]=function(){const _0x4ca3f3=_0x18a61c;return VisuMZ[_0x4ca3f3(0x254)][_0x4ca3f3(0x52e)][_0x4ca3f3(0x489)][_0x4ca3f3(0x190)];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x499)]=function(){const _0x3c9a89=_0x18a61c;this[_0x3c9a89(0x359)][_0x3c9a89(0x28f)](),this[_0x3c9a89(0x602)][_0x3c9a89(0x28f)]();if(this[_0x3c9a89(0x35a)]){if(_0x3c9a89(0x29f)===_0x3c9a89(0x588))this['cursorPagedown']();else{this[_0x3c9a89(0x2ab)](),this[_0x3c9a89(0x530)](!![]),this[_0x3c9a89(0x592)]();if(this[_0x3c9a89(0x216)]()){if(_0x3c9a89(0x1c4)===_0x3c9a89(0x5ba))return _0x1a2ccc['ItemsEquipsCore'][_0x3c9a89(0x52e)][_0x3c9a89(0x489)][_0x3c9a89(0x48a)];else this[_0x3c9a89(0x202)]();}else this[_0x3c9a89(0x420)]();this['drawCustomShopGraphic']();}}},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x23a)]=function(_0x47ae0c,_0x18e9fe){const _0x1f8008=_0x18a61c;if(!this[_0x1f8008(0x216)]()&&!DataManager[_0x1f8008(0x290)](this['_item']))return;const _0x31b79a=this[_0x1f8008(0x4d4)]-this[_0x1f8008(0x5e5)]()-_0x47ae0c,_0x12f6d8=this[_0x1f8008(0x3ba)](_0x1f8008(0x2f0));this['changeTextColor'](ColorManager[_0x1f8008(0x428)]()),this[_0x1f8008(0x2a4)](TextManager[_0x1f8008(0x19c)],_0x47ae0c+this[_0x1f8008(0x5e5)](),_0x18e9fe,_0x31b79a-_0x12f6d8),this[_0x1f8008(0x513)](),this['drawItemNumber'](this[_0x1f8008(0x35a)],_0x47ae0c,_0x18e9fe,_0x31b79a);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x5ea)]=function(_0x4421ac,_0x30b208,_0x51fcc0,_0x5989b8,_0x41cb76){const _0x28ecab=_0x18a61c;if(VisuMZ[_0x28ecab(0x254)][_0x28ecab(0x52e)][_0x28ecab(0x489)][_0x28ecab(0x2ec)]===![])return;_0x41cb76=Math['max'](_0x41cb76||0x1,0x1);while(_0x41cb76--){if('MLkjh'===_0x28ecab(0x477))this[_0x28ecab(0x47a)][_0x28ecab(0x590)]();else{_0x5989b8=_0x5989b8||this[_0x28ecab(0x4ce)](),this[_0x28ecab(0x602)][_0x28ecab(0x553)]=0xa0;const _0x4b68b2=ColorManager[_0x28ecab(0x4c1)]();this['contentsBack'][_0x28ecab(0x21b)](_0x4421ac+0x1,_0x30b208+0x1,_0x51fcc0-0x2,_0x5989b8-0x2,_0x4b68b2),this[_0x28ecab(0x602)]['paintOpacity']=0xff;}}},ColorManager[_0x18a61c(0x4c1)]=function(){const _0x4f32a3=_0x18a61c,_0x36e9fe=VisuMZ[_0x4f32a3(0x254)][_0x4f32a3(0x52e)][_0x4f32a3(0x489)];let _0x411849=_0x36e9fe[_0x4f32a3(0x4e9)]!==undefined?_0x36e9fe[_0x4f32a3(0x4e9)]:0x13;return ColorManager[_0x4f32a3(0x574)](_0x411849);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x202)]=function(){const _0x13f716=_0x18a61c;if(VisuMZ[_0x13f716(0x254)][_0x13f716(0x52e)][_0x13f716(0x489)][_0x13f716(0x472)]){VisuMZ[_0x13f716(0x254)][_0x13f716(0x52e)][_0x13f716(0x489)][_0x13f716(0x472)][_0x13f716(0x4f3)](this);return;}const _0x1ce98b=this[_0x13f716(0x4ce)](),_0x496119=this[_0x13f716(0x1c5)]()+0x8;let _0x42975b=0x0,_0x1b3d4a=0x0,_0x9d0c61=this[_0x13f716(0x4d4)],_0x9b777e=this[_0x13f716(0x311)],_0x4698c0=Math['floor'](_0x9d0c61/0x2),_0x1ae6e2=_0x42975b+_0x9d0c61-_0x4698c0;this[_0x13f716(0x35e)](this[_0x13f716(0x35a)],_0x42975b+this['itemPadding'](),_0x1b3d4a,_0x9d0c61-this[_0x13f716(0x5e5)]()*0x2),this[_0x13f716(0x5ea)](_0x42975b,_0x1b3d4a,_0x9d0c61),_0x1b3d4a+=_0x1ce98b;if(this[_0x13f716(0x30c)](_0x42975b,_0x1b3d4a,_0x4698c0))_0x1b3d4a+=0x0;if(this[_0x13f716(0x482)](_0x1ae6e2,_0x1b3d4a,_0x4698c0))_0x1b3d4a+=_0x1ce98b;const _0x5b2e55=this['actorParams'](),_0xcb5cc=_0x1b3d4a;_0x1b3d4a=_0x9b777e-_0x5b2e55[_0x13f716(0x3f9)]*_0x496119-0x4;let _0x4f7b77=_0x42975b,_0xc03701=0x0,_0x44998b=_0x1b3d4a;for(const _0x7fa9e4 of _0x5b2e55){if('lJwaK'===_0x13f716(0x31c))_0xc03701=Math[_0x13f716(0x47f)](this['drawParamName'](_0x7fa9e4,_0x42975b+0x4,_0x1b3d4a+0x4,_0x9d0c61),_0xc03701),_0x1b3d4a+=_0x496119;else return _0x370c6b[_0x13f716(0x254)][_0x13f716(0x52e)]['StatusWindow'][_0x13f716(0x215)];}const _0x366b33=$gameParty['maxBattleMembers'](),_0x512b9e=Math['floor']((_0x9d0c61-_0xc03701)/_0x366b33);_0xc03701=_0x9d0c61-_0x512b9e*_0x366b33;for(const _0x1e225d of $gameParty[_0x13f716(0x601)]()){if(_0x13f716(0x188)===_0x13f716(0x188)){const _0x29c56d=$gameParty[_0x13f716(0x601)]()[_0x13f716(0x218)](_0x1e225d),_0x1c453f=_0x4f7b77+_0xc03701+_0x29c56d*_0x512b9e;this['changePaintOpacity'](_0x1e225d['canEquip'](this[_0x13f716(0x35a)])),this[_0x13f716(0x3a5)](_0x1e225d,_0x1c453f+_0x512b9e/0x2,_0x44998b);let _0x3d353c=_0x44998b;for(const _0x477f69 of _0x5b2e55){const _0x1cb145=_0x3d353c-(_0x1ce98b-_0x496119)/0x2;this[_0x13f716(0x1ff)](_0x1e225d,_0x477f69,_0x1c453f,_0x1cb145,_0x512b9e),_0x3d353c+=_0x496119;}}else _0x5df104[_0x13f716(0x1f3)]['update'][_0x13f716(0x4f3)](this),this['_itemWindow']&&this[_0x13f716(0x231)]['setCategory'](this[_0x13f716(0x47c)]());}this[_0x13f716(0x5ea)](_0x4f7b77,_0xcb5cc,_0xc03701,_0x44998b-_0xcb5cc);for(let _0x4e410f=0x0;_0x4e410f<_0x366b33;_0x4e410f++){if(_0x13f716(0x36f)!==_0x13f716(0x36f))for(const _0x290a12 of _0x211908[_0x13f716(0x29d)]){const _0x46c97d=_0x49bc1e[_0x13f716(0x29d)][_0x13f716(0x218)](_0x290a12[_0x13f716(0x3a9)]());if(_0x46c97d>0x0)_0x98a854[_0x13f716(0x237)]['push'](_0x46c97d);}else{const _0x3e4d69=_0x4f7b77+_0xc03701+_0x4e410f*_0x512b9e;this[_0x13f716(0x5ea)](_0x3e4d69,_0xcb5cc,_0x512b9e,_0x44998b-_0xcb5cc);}}for(const _0x16cdd6 of _0x5b2e55){if(_0x13f716(0x5c4)===_0x13f716(0x5c4)){this[_0x13f716(0x5ea)](_0x4f7b77,_0x44998b,_0xc03701,_0x496119);for(let _0x4ce49f=0x0;_0x4ce49f<_0x366b33;_0x4ce49f++){const _0x270cea=_0x4f7b77+_0xc03701+_0x4ce49f*_0x512b9e;this[_0x13f716(0x5ea)](_0x270cea,_0x44998b,_0x512b9e,_0x496119);}_0x44998b+=_0x496119;}else _0x44653f=_0x13f716(0x286)[_0x13f716(0x57c)](_0x4b5f9c['id']);}},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x30c)]=function(_0x460903,_0x3f96bb,_0x591771){const _0x2e2961=_0x18a61c;if(!this[_0x2e2961(0x216)]())return![];const _0x5c6395=$dataSystem[_0x2e2961(0x29d)][this[_0x2e2961(0x35a)]['etypeId']];return this[_0x2e2961(0x4ae)](_0x5c6395,_0x460903,_0x3f96bb,_0x591771,!![]),this['drawItemDarkRect'](_0x460903,_0x3f96bb,_0x591771),this[_0x2e2961(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x44c)]=function(){const _0x34ea6b=_0x18a61c,_0x4f087f=VisuMZ[_0x34ea6b(0x254)][_0x34ea6b(0x52e)]['ItemScene'][_0x34ea6b(0x318)];return _0x4f087f['format']($gameParty[_0x34ea6b(0x2aa)](this[_0x34ea6b(0x35a)]));},Window_ShopStatus[_0x18a61c(0x1f3)]['actorParams']=function(){const _0x4ba216=_0x18a61c;let _0x2f5706=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported['VisuMZ_0_CoreEngine']){if(_0x4ba216(0x548)!==_0x4ba216(0x379))_0x2f5706=VisuMZ[_0x4ba216(0x219)]['Settings']['Param'][_0x4ba216(0x46c)];else return _0x3e9443[_0x4ba216(0x34c)](_0x37dd97);}return _0x2f5706=_0x2f5706[_0x4ba216(0x404)](_0x5894bd=>typeof _0x5894bd==='number'?_0x5894bd:_0x5894bd[_0x4ba216(0x3ad)]()[_0x4ba216(0x3a9)]()),_0x2f5706;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x538)]=function(){const _0x859d17=_0x18a61c;return VisuMZ[_0x859d17(0x254)]['Settings'][_0x859d17(0x489)]['ParamChangeFontSize'];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x313)]=function(_0x341b28,_0x55faba,_0x127ccc,_0x517213){const _0x40c3d4=_0x18a61c;this[_0x40c3d4(0x2ab)](),this[_0x40c3d4(0x359)]['fontSize']=this['smallParamFontSize']();let _0xeeeb35=this[_0x40c3d4(0x3ba)](TextManager[_0x40c3d4(0x56c)](_0x341b28))+0x4+_0x55faba;return Imported[_0x40c3d4(0x2bf)]?(this[_0x40c3d4(0x582)](_0x55faba,_0x127ccc,_0x517213,_0x341b28,!![]),VisuMZ[_0x40c3d4(0x219)][_0x40c3d4(0x52e)][_0x40c3d4(0x243)][_0x40c3d4(0x2b9)]&&(_0xeeeb35+=ImageManager[_0x40c3d4(0x361)]+0x4)):(this[_0x40c3d4(0x29e)](ColorManager[_0x40c3d4(0x428)]()),this[_0x40c3d4(0x2a4)](TextManager[_0x40c3d4(0x56c)](_0x341b28),_0x55faba,_0x127ccc,_0x517213)),this[_0x40c3d4(0x2ab)](),_0xeeeb35;},Window_ShopStatus['prototype'][_0x18a61c(0x1ff)]=function(_0x5776b6,_0xf7c405,_0x5d111e,_0x443429,_0x54fb2a){const _0xaa4433=_0x18a61c;_0x5d111e+=this[_0xaa4433(0x5e5)](),_0x54fb2a-=this[_0xaa4433(0x5e5)]()*0x2;const _0x1aad5e=VisuMZ[_0xaa4433(0x254)][_0xaa4433(0x52e)][_0xaa4433(0x489)];this[_0xaa4433(0x359)][_0xaa4433(0x542)]=_0x1aad5e['ParamChangeFontSize'],this[_0xaa4433(0x530)](_0x5776b6[_0xaa4433(0x1f5)](this[_0xaa4433(0x35a)]));if(_0x5776b6[_0xaa4433(0x22d)](this[_0xaa4433(0x35a)])){if(_0xaa4433(0x454)===_0xaa4433(0x454)){const _0x27b7a8=_0x1aad5e['AlreadyEquipMarker'];this[_0xaa4433(0x2a4)](_0x27b7a8,_0x5d111e,_0x443429,_0x54fb2a,_0xaa4433(0x32c));}else return _0x52e6f9;}else{if(_0x5776b6[_0xaa4433(0x1f5)](this[_0xaa4433(0x35a)])){if(_0xaa4433(0x37f)===_0xaa4433(0x3bf)){const _0x231c2a=_0x244da7[_0xaa4433(0x29d)][_0xaa4433(0x218)](_0x2fde1d[_0xaa4433(0x3a9)]());if(_0x231c2a>0x0)_0x5a1a16[_0xaa4433(0x237)]['push'](_0x231c2a);}else{const _0x1c48d9=JsonEx[_0xaa4433(0x20a)](_0x5776b6);_0x1c48d9[_0xaa4433(0x2c1)]=!![];const _0x153889=_0x1c48d9[_0xaa4433(0x237)]()[_0xaa4433(0x218)](this[_0xaa4433(0x35a)]['etypeId']);if(_0x153889>=0x0)_0x1c48d9[_0xaa4433(0x343)](_0x153889,this[_0xaa4433(0x35a)]);let _0x31692a=0x0,_0x3e7746=0x0,_0x54ee5b=0x0;Imported[_0xaa4433(0x2bf)]?(_0x31692a=_0x1c48d9['paramValueByName'](_0xf7c405),_0x3e7746=_0x31692a-_0x5776b6['paramValueByName'](_0xf7c405),this[_0xaa4433(0x29e)](ColorManager['paramchangeTextColor'](_0x3e7746)),_0x54ee5b=(_0x3e7746>=0x0?'+':'')+VisuMZ[_0xaa4433(0x2b0)](_0x3e7746,0x0,_0xf7c405)):(_0x31692a=_0x1c48d9[_0xaa4433(0x56c)](_0xf7c405),_0x3e7746=_0x31692a-_0x5776b6[_0xaa4433(0x56c)](_0xf7c405),this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x3e7746)),_0x54ee5b=(_0x3e7746>=0x0?'+':'')+_0x3e7746);if(_0x54ee5b==='+0')_0x54ee5b=_0x1aad5e[_0xaa4433(0x276)];this[_0xaa4433(0x2a4)](_0x54ee5b,_0x5d111e,_0x443429,_0x54fb2a,_0xaa4433(0x32c));}}else{const _0x3f4b28=_0x1aad5e['CannotEquipMarker'];this[_0xaa4433(0x2a4)](_0x3f4b28,_0x5d111e,_0x443429,_0x54fb2a,_0xaa4433(0x32c));}}this['resetFontSettings'](),this[_0xaa4433(0x530)](!![]);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x420)]=function(){const _0x4a59a0=_0x18a61c;VisuMZ[_0x4a59a0(0x254)][_0x4a59a0(0x52e)][_0x4a59a0(0x489)][_0x4a59a0(0x59a)][_0x4a59a0(0x4f3)](this);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x592)]=function(){const _0x38dde7=_0x18a61c;this[_0x38dde7(0x463)]={};if(!this[_0x38dde7(0x35a)])return;const _0x19947b=this[_0x38dde7(0x35a)]['note'];if(_0x19947b[_0x38dde7(0x23c)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x5c5712=String(RegExp['$1'])[_0x38dde7(0x23f)](/[\r\n]+/);for(const _0x367ab0 of _0x5c5712){if(_0x367ab0[_0x38dde7(0x23c)](/(.*):[ ](.*)/i)){if('TJwiw'===_0x38dde7(0x484)){const _0xe0cf8=String(RegExp['$1'])[_0x38dde7(0x3ad)]()['trim'](),_0x480be2=String(RegExp['$2'])[_0x38dde7(0x3a9)]();this[_0x38dde7(0x463)][_0xe0cf8]=_0x480be2;}else return _0x5d274f[_0x38dde7(0x254)][_0x38dde7(0x52d)]['call'](this);}}}},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x3a8)]=function(){const _0x5dd54d=_0x18a61c;return Math[_0x5dd54d(0x47f)](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x2ab)]=function(){const _0x3b498e=_0x18a61c;Window_StatusBase[_0x3b498e(0x1f3)][_0x3b498e(0x2ab)][_0x3b498e(0x4f3)](this),this[_0x3b498e(0x359)][_0x3b498e(0x542)]=this[_0x3b498e(0x367)]||this['contents'][_0x3b498e(0x542)],this[_0x3b498e(0x359)][_0x3b498e(0x2c7)]=this[_0x3b498e(0x1cf)]||this[_0x3b498e(0x359)]['textColor'];},Window_ShopStatus['prototype'][_0x18a61c(0x1b2)]=function(){const _0x40c132=_0x18a61c;return this[_0x40c132(0x359)][_0x40c132(0x542)]/$gameSystem[_0x40c132(0x4ed)]();},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x439)]=function(_0x355afa,_0x24b4d0,_0x274a41){const _0x2ab0b2=_0x18a61c,_0x3a2835=ImageManager['loadSystem'](_0x2ab0b2(0x5ac)),_0x250fbd=ImageManager['iconWidth'],_0x1fef47=ImageManager[_0x2ab0b2(0x1d5)],_0xd672de=_0x355afa%0x10*_0x250fbd,_0x270a21=Math['floor'](_0x355afa/0x10)*_0x1fef47,_0x157424=Math['ceil'](_0x250fbd*this[_0x2ab0b2(0x1b2)]()),_0xbd2575=Math[_0x2ab0b2(0x20f)](_0x1fef47*this[_0x2ab0b2(0x1b2)]());this[_0x2ab0b2(0x359)][_0x2ab0b2(0x3f0)](_0x3a2835,_0xd672de,_0x270a21,_0x250fbd,_0x1fef47,_0x24b4d0,_0x274a41,_0x157424,_0xbd2575);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x27d)]=function(_0xc5f761,_0x31c70a){const _0x2765c9=_0x18a61c;_0x31c70a['drawing']&&this['drawIcon'](_0xc5f761,_0x31c70a['x'],_0x31c70a['y']+0x2);_0x31c70a['x']+=Math[_0x2765c9(0x20f)](ImageManager['iconWidth']*this[_0x2765c9(0x1b2)]());if(this[_0x2765c9(0x1b2)]()===0x1)_0x31c70a['x']+=0x4;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x4ae)]=function(_0x2b8ff8,_0x408878,_0x242939,_0x5c8aef,_0x15d3e3,_0x4fe458){const _0x2290a6=_0x18a61c;_0x2b8ff8=_0x2b8ff8||'',_0x4fe458=_0x4fe458||_0x2290a6(0x3c6),this[_0x2290a6(0x367)]=this[_0x2290a6(0x3a8)](),this[_0x2290a6(0x1cf)]=_0x15d3e3?ColorManager[_0x2290a6(0x428)]():this['contents'][_0x2290a6(0x2c7)],_0x408878+=this[_0x2290a6(0x5e5)](),_0x5c8aef-=this[_0x2290a6(0x5e5)]()*0x2;const _0x13864b=this[_0x2290a6(0x268)](_0x2b8ff8);if(_0x4fe458===_0x2290a6(0x32c))_0x408878=_0x408878+Math['floor']((_0x5c8aef-_0x13864b['width'])/0x2);else _0x4fe458===_0x2290a6(0x608)&&(_0x408878=_0x408878+_0x5c8aef-_0x13864b[_0x2290a6(0x1e5)]);_0x242939+=(this[_0x2290a6(0x4ce)]()-_0x13864b[_0x2290a6(0x1d8)])/0x2,this['drawTextEx'](_0x2b8ff8,_0x408878,_0x242939,_0x5c8aef),this[_0x2290a6(0x367)]=undefined,this['_resetFontColor']=undefined,this[_0x2290a6(0x2ab)]();},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x3e4)]=function(_0x393c80,_0x4c195c,_0x431545){const _0x156401=_0x18a61c;if(!DataManager[_0x156401(0x290)](this['_item']))return![];const _0xac4efd=this[_0x156401(0x5f7)]();this[_0x156401(0x4ae)](_0xac4efd,_0x393c80,_0x4c195c,_0x431545,!![]);const _0xb9c682=this[_0x156401(0x492)]();return this[_0x156401(0x4ae)](_0xb9c682,_0x393c80,_0x4c195c,_0x431545,![],_0x156401(0x608)),this['drawItemDarkRect'](_0x393c80,_0x4c195c,_0x431545),this[_0x156401(0x2ab)](),!![];},Window_ShopStatus['prototype']['getItemConsumableLabel']=function(){const _0x57a795=_0x18a61c;return VisuMZ['ItemsEquipsCore'][_0x57a795(0x52e)][_0x57a795(0x489)][_0x57a795(0x4fe)];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x492)]=function(){const _0x4cb6e4=_0x18a61c,_0x23210e=_0x4cb6e4(0x2eb);if(this[_0x4cb6e4(0x463)][_0x23210e])return this[_0x4cb6e4(0x463)][_0x23210e];return this[_0x4cb6e4(0x301)]()?_0x4cb6e4(0x2e1)!==_0x4cb6e4(0x4cf)?VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x4cb6e4(0x3bb)]:_0x4a21b8[_0x4cb6e4(0x60a)]&&this[_0x4cb6e4(0x2c4)][_0x4cb6e4(0x491)]()!==''&&_0x2ded1b['ItemsEquipsCore'][_0x4cb6e4(0x52e)]['EquipScene'][_0x4cb6e4(0x486)]:VisuMZ[_0x4cb6e4(0x254)][_0x4cb6e4(0x52e)][_0x4cb6e4(0x489)][_0x4cb6e4(0x4de)];},Window_ShopStatus['prototype']['canConsumeItem']=function(){const _0x477ae7=_0x18a61c;return VisuMZ[_0x477ae7(0x219)]&&VisuMZ[_0x477ae7(0x219)][_0x477ae7(0x52e)][_0x477ae7(0x5de)][_0x477ae7(0x3db)]&&DataManager[_0x477ae7(0x568)](this[_0x477ae7(0x35a)])?![]:this['_item']['consumable'];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x482)]=function(_0x10ca45,_0x1d14ab,_0x5d040a){const _0xa7ff4e=_0x18a61c;if(!this[_0xa7ff4e(0x216)]()&&!DataManager[_0xa7ff4e(0x290)](this[_0xa7ff4e(0x35a)]))return![];if(DataManager['isKeyItem'](this[_0xa7ff4e(0x35a)])&&!$dataSystem[_0xa7ff4e(0x446)]){const _0x5ea6ff=TextManager[_0xa7ff4e(0x294)];this[_0xa7ff4e(0x4ae)](_0x5ea6ff,_0x10ca45,_0x1d14ab,_0x5d040a,!![],_0xa7ff4e(0x32c));}else{if(_0xa7ff4e(0x3b4)!==_0xa7ff4e(0x48c)){const _0xcc2936=TextManager['possession'];this[_0xa7ff4e(0x4ae)](_0xcc2936,_0x10ca45,_0x1d14ab,_0x5d040a,!![]);const _0xf8711e=this[_0xa7ff4e(0x44c)]();this[_0xa7ff4e(0x4ae)](_0xf8711e,_0x10ca45,_0x1d14ab,_0x5d040a,![],_0xa7ff4e(0x608));}else this[_0xa7ff4e(0x5a9)][_0xa7ff4e(0x45e)]();}return this[_0xa7ff4e(0x5ea)](_0x10ca45,_0x1d14ab,_0x5d040a),this[_0xa7ff4e(0x2ab)](),!![];},Window_ShopStatus['prototype'][_0x18a61c(0x44c)]=function(){const _0x45689a=_0x18a61c,_0x191052='QUANTITY';if(this[_0x45689a(0x463)][_0x191052])return this['_customItemInfo'][_0x191052];const _0x4f529d=VisuMZ[_0x45689a(0x254)][_0x45689a(0x52e)][_0x45689a(0x483)]['ItemQuantityFmt'];return _0x4f529d[_0x45689a(0x57c)]($gameParty[_0x45689a(0x2aa)](this['_item']));},Window_ShopStatus['prototype'][_0x18a61c(0x279)]=function(_0x34eec1,_0x2cf90c,_0x4fb6e8){const _0x24a8a5=_0x18a61c,_0x19d90e=this[_0x24a8a5(0x572)]();return this[_0x24a8a5(0x4ae)](_0x19d90e,_0x34eec1,_0x2cf90c,_0x4fb6e8,![],_0x24a8a5(0x32c)),this[_0x24a8a5(0x5ea)](_0x34eec1,_0x2cf90c,_0x4fb6e8),this[_0x24a8a5(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x572)]=function(){const _0x50896c=_0x18a61c,_0x18e82d='OCCASION';if(this[_0x50896c(0x463)][_0x18e82d])return this['_customItemInfo'][_0x18e82d];const _0x322af2=VisuMZ[_0x50896c(0x254)]['Settings'][_0x50896c(0x489)],_0xffaecf=_0x50896c(0x356)[_0x50896c(0x57c)](this[_0x50896c(0x35a)][_0x50896c(0x5e1)]);return _0x322af2[_0xffaecf];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x53a)]=function(_0x456865,_0x20796c,_0x54f04d){const _0x38423f=_0x18a61c,_0x147a39=this[_0x38423f(0x302)]();return this[_0x38423f(0x4ae)](_0x147a39,_0x456865,_0x20796c,_0x54f04d,![],'center'),this[_0x38423f(0x5ea)](_0x456865,_0x20796c,_0x54f04d),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x302)]=function(){const _0x16b3ae=_0x18a61c,_0x12f341='SCOPE';if(this['_customItemInfo'][_0x12f341])return this[_0x16b3ae(0x463)][_0x12f341];const _0x78fdd3=VisuMZ[_0x16b3ae(0x254)]['Settings'][_0x16b3ae(0x489)];if(Imported['VisuMZ_1_BattleCore']){const _0x538960=this[_0x16b3ae(0x35a)][_0x16b3ae(0x447)];if(_0x538960[_0x16b3ae(0x23c)](/<TARGET:[ ](.*)>/i)){if(_0x16b3ae(0x5ab)===_0x16b3ae(0x5ab)){const _0x39bc29=String(RegExp['$1']);if(_0x39bc29[_0x16b3ae(0x23c)](/(\d+) RANDOM ANY/i)){if(_0x16b3ae(0x546)===_0x16b3ae(0x3fd)){if(this['_calculatingJSParameters'])return 0x0;const _0x991077=(_0x5ad48f[_0x16b3ae(0x3b7)](_0x8477c2)?_0x16b3ae(0x52b):_0x16b3ae(0x502))['format'](_0x377dc2['id']),_0x41dfbf=_0x16b3ae(0x1bc)[_0x16b3ae(0x57c)](_0x991077,_0x246a53);if(_0x3de6c9[_0x16b3ae(0x254)][_0x16b3ae(0x440)][_0x41dfbf]){this[_0x16b3ae(0x259)]=!![];const _0x117475=_0x4aeeb6[_0x16b3ae(0x254)][_0x16b3ae(0x440)][_0x41dfbf]['call'](this,_0x1bbfef,_0x1efbe1);return this[_0x16b3ae(0x259)]=![],_0x117475;}else return 0x0;}else return _0x78fdd3['ScopeRandomAny']['format'](Number(RegExp['$1']));}else{if(_0x39bc29[_0x16b3ae(0x23c)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x78fdd3[_0x16b3ae(0x4b7)][_0x16b3ae(0x57c)](Number(RegExp['$1']));else{if(_0x39bc29['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if(_0x16b3ae(0x19b)!==_0x16b3ae(0x19b))this[_0x16b3ae(0x5a9)]=_0x15254f,this['callUpdateHelp']();else return _0x78fdd3[_0x16b3ae(0x4c0)][_0x16b3ae(0x57c)](Number(RegExp['$1']));}else{if(_0x39bc29['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x16b3ae(0x24b)==='LgKxU')return _0x78fdd3['ScopeAlliesButUser'];else{const _0x199eeb=this[_0x16b3ae(0x5e5)]();_0x173d71[_0x16b3ae(0x2bf)]?this[_0x16b3ae(0x582)](_0x13c29a+_0x199eeb,_0x3f14bf,_0x36cb2c,_0x3fc84a,![]):this[_0x16b3ae(0x2a4)](_0x8e1814[_0x16b3ae(0x56c)](_0x432ccd),_0x4f9cee+_0x199eeb,_0x5ee88e,_0x31c4b1);}}}}}}else this[_0x16b3ae(0x272)](_0x44a3b1[_0x16b3ae(0x403)]('pageup'));}}const _0x3df899=_0x16b3ae(0x57a)[_0x16b3ae(0x57c)](this[_0x16b3ae(0x35a)][_0x16b3ae(0x370)]);return _0x78fdd3[_0x3df899];},Window_ShopStatus['prototype'][_0x18a61c(0x33d)]=function(_0x24f497,_0x5f1490,_0x58f6d6){const _0x4a9e4a=_0x18a61c,_0x4e7f4e=this[_0x4a9e4a(0x338)]();this['drawItemKeyData'](_0x4e7f4e,_0x24f497,_0x5f1490,_0x58f6d6,!![]);const _0x3044d4=this['getItemSpeedText']();return this[_0x4a9e4a(0x4ae)](_0x3044d4,_0x24f497,_0x5f1490,_0x58f6d6,![],_0x4a9e4a(0x608)),this['drawItemDarkRect'](_0x24f497,_0x5f1490,_0x58f6d6),this[_0x4a9e4a(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x338)]=function(){const _0x22db01=_0x18a61c;return VisuMZ[_0x22db01(0x254)][_0x22db01(0x52e)]['StatusWindow'][_0x22db01(0x392)];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x445)]=function(){const _0x165286=_0x18a61c,_0xb28d28=_0x165286(0x53d);if(this[_0x165286(0x463)][_0xb28d28])return this[_0x165286(0x463)][_0xb28d28];const _0x220393=this[_0x165286(0x35a)]['speed'];if(_0x220393>=0x7d0){if(_0x165286(0x526)!==_0x165286(0x526)){this[_0x165286(0x2ab)](),this['contents'][_0x165286(0x542)]=this['smallParamFontSize']();let _0x3908a9=this[_0x165286(0x3ba)](_0xead721['param'](_0x326f15))+0x4+_0x1cb681;return _0x40ade3[_0x165286(0x2bf)]?(this[_0x165286(0x582)](_0x2737b7,_0x533b4e,_0x202f22,_0x115c50,!![]),_0x28a96c[_0x165286(0x219)]['Settings'][_0x165286(0x243)]['DrawIcons']&&(_0x3908a9+=_0x1a1a35[_0x165286(0x361)]+0x4)):(this[_0x165286(0x29e)](_0x24670a['systemColor']()),this['drawText'](_0x588983[_0x165286(0x56c)](_0x84b661),_0xa06c37,_0x2c8424,_0x4f403f)),this[_0x165286(0x2ab)](),_0x3908a9;}else return VisuMZ[_0x165286(0x254)][_0x165286(0x52e)][_0x165286(0x489)][_0x165286(0x5b9)];}else{if(_0x220393>=0x3e8)return VisuMZ[_0x165286(0x254)][_0x165286(0x52e)][_0x165286(0x489)]['Speed1000'];else{if(_0x220393>0x0){if('vamnd'===_0x165286(0x22a))return VisuMZ[_0x165286(0x254)][_0x165286(0x52e)][_0x165286(0x489)][_0x165286(0x352)];else _0x2c408d=_0x18cea6[_0x165286(0x27b)]((this[_0x165286(0x311)]-_0x430818)/0x2);}else{if(_0x220393===0x0)return VisuMZ[_0x165286(0x254)][_0x165286(0x52e)][_0x165286(0x489)][_0x165286(0x59f)];else{if(_0x220393>-0x3e8)return VisuMZ[_0x165286(0x254)][_0x165286(0x52e)][_0x165286(0x489)][_0x165286(0x496)];else{if(_0x220393>-0x7d0)return VisuMZ['ItemsEquipsCore'][_0x165286(0x52e)]['StatusWindow'][_0x165286(0x28a)];else return _0x220393<=-0x7d0?VisuMZ[_0x165286(0x254)][_0x165286(0x52e)][_0x165286(0x489)][_0x165286(0x215)]:'?????';}}}}}},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x23b)]=function(_0x1d0267,_0x20ddfc,_0x4d538b){const _0x32945f=_0x18a61c,_0x416c63=this[_0x32945f(0x37b)]();this[_0x32945f(0x4ae)](_0x416c63,_0x1d0267,_0x20ddfc,_0x4d538b,!![]);const _0x5df2bf=this[_0x32945f(0x1e9)]();return this[_0x32945f(0x4ae)](_0x5df2bf,_0x1d0267,_0x20ddfc,_0x4d538b,![],_0x32945f(0x608)),this[_0x32945f(0x5ea)](_0x1d0267,_0x20ddfc,_0x4d538b),this[_0x32945f(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x37b)]=function(){const _0x5ca372=_0x18a61c;return VisuMZ[_0x5ca372(0x254)][_0x5ca372(0x52e)][_0x5ca372(0x489)][_0x5ca372(0x29c)];},Window_ShopStatus['prototype']['getItemSuccessRateText']=function(){const _0x146fe2=_0x18a61c,_0x5b8a10=_0x146fe2(0x38c);if(this[_0x146fe2(0x463)][_0x5b8a10])return this[_0x146fe2(0x463)][_0x5b8a10];if(Imported['VisuMZ_1_BattleCore']){const _0x45a2ff=this[_0x146fe2(0x35a)][_0x146fe2(0x447)];if(_0x45a2ff[_0x146fe2(0x23c)](/<ALWAYS HIT>/i)){if(_0x146fe2(0x3e8)===_0x146fe2(0x373))this[_0x146fe2(0x274)](),this[_0x146fe2(0x1de)](),this[_0x146fe2(0x365)]();else return _0x146fe2(0x398);}else{if(_0x45a2ff['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x146fe2(0x535)['format'](Number(RegExp['$1']));}}return'%1%'[_0x146fe2(0x57c)](this[_0x146fe2(0x35a)][_0x146fe2(0x3f4)]);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x342)]=function(_0x3591ff,_0x5c03a9,_0x5a2988){const _0x3a923f=_0x18a61c,_0x19ff87=this[_0x3a923f(0x30a)]();this[_0x3a923f(0x4ae)](_0x19ff87,_0x3591ff,_0x5c03a9,_0x5a2988,!![]);const _0x2b3d6f=this[_0x3a923f(0x455)]();return this[_0x3a923f(0x4ae)](_0x2b3d6f,_0x3591ff,_0x5c03a9,_0x5a2988,![],_0x3a923f(0x608)),this[_0x3a923f(0x5ea)](_0x3591ff,_0x5c03a9,_0x5a2988),this[_0x3a923f(0x2ab)](),!![];},Window_ShopStatus['prototype'][_0x18a61c(0x30a)]=function(){const _0x252aeb=_0x18a61c;return VisuMZ[_0x252aeb(0x254)][_0x252aeb(0x52e)][_0x252aeb(0x489)][_0x252aeb(0x1d6)];},Window_ShopStatus['prototype'][_0x18a61c(0x455)]=function(){const _0x28b220=_0x18a61c,_0x323e69=_0x28b220(0x5d4);if(this[_0x28b220(0x463)][_0x323e69])return this['_customItemInfo'][_0x323e69];const _0x48047f=_0x28b220(0x3a7);return _0x48047f[_0x28b220(0x57c)](this[_0x28b220(0x35a)]['repeats']);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x515)]=function(_0x3b21bf,_0xe82baa,_0x1ed551){const _0x33f7e9=_0x18a61c,_0x58a732=this['getItemHitTypeLabel']();this[_0x33f7e9(0x4ae)](_0x58a732,_0x3b21bf,_0xe82baa,_0x1ed551,!![]);const _0x5c3de9=this[_0x33f7e9(0x1ef)]();return this[_0x33f7e9(0x4ae)](_0x5c3de9,_0x3b21bf,_0xe82baa,_0x1ed551,![],_0x33f7e9(0x608)),this[_0x33f7e9(0x5ea)](_0x3b21bf,_0xe82baa,_0x1ed551),this[_0x33f7e9(0x2ab)](),!![];},Window_ShopStatus['prototype']['getItemHitTypeLabel']=function(){const _0x57eb2a=_0x18a61c;return VisuMZ[_0x57eb2a(0x254)][_0x57eb2a(0x52e)]['StatusWindow']['LabelHitType'];},Window_ShopStatus[_0x18a61c(0x1f3)]['getItemHitTypeText']=function(){const _0x55917b=_0x18a61c,_0x1d59c3=_0x55917b(0x233);if(this[_0x55917b(0x463)][_0x1d59c3])return this[_0x55917b(0x463)][_0x1d59c3];const _0xc985e2=VisuMZ[_0x55917b(0x254)]['Settings'][_0x55917b(0x489)],_0x394972=_0x55917b(0x333)[_0x55917b(0x57c)](this[_0x55917b(0x35a)][_0x55917b(0x32f)]);return _0xc985e2[_0x394972];},Window_ShopStatus['prototype'][_0x18a61c(0x3ee)]=function(_0x6f77ba,_0x5385ea,_0x3a9ca3){const _0x388a70=_0x18a61c;if(this[_0x388a70(0x35a)][_0x388a70(0x556)][_0x388a70(0x214)]<=0x0)return _0x5385ea;if(this[_0x388a70(0x1af)](_0x6f77ba,_0x5385ea,_0x3a9ca3))_0x5385ea+=this[_0x388a70(0x4ce)]();if(this[_0x388a70(0x59c)](_0x6f77ba,_0x5385ea,_0x3a9ca3))_0x5385ea+=this['lineHeight']();return this[_0x388a70(0x2ab)](),_0x5385ea;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x1af)]=function(_0x5af15d,_0x486cb3,_0x312d2b){const _0x414fcc=_0x18a61c,_0x34f0c8=this[_0x414fcc(0x35c)]();this[_0x414fcc(0x4ae)](_0x34f0c8,_0x5af15d,_0x486cb3,_0x312d2b,!![]);const _0x46fce2=this['getItemDamageElementText']();return this[_0x414fcc(0x4ae)](_0x46fce2,_0x5af15d,_0x486cb3,_0x312d2b,![],_0x414fcc(0x608)),this['drawItemDarkRect'](_0x5af15d,_0x486cb3,_0x312d2b),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)]['getItemDamageElementLabel']=function(){const _0x3b70e0=_0x18a61c;return VisuMZ[_0x3b70e0(0x254)][_0x3b70e0(0x52e)][_0x3b70e0(0x489)]['LabelElement'];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x549)]=function(){const _0x37bb6e=_0x18a61c,_0x1269e1=_0x37bb6e(0x4e1);if(this[_0x37bb6e(0x463)][_0x1269e1])return this[_0x37bb6e(0x463)][_0x1269e1];if(this[_0x37bb6e(0x35a)][_0x37bb6e(0x556)][_0x37bb6e(0x242)]<=-0x1){if(_0x37bb6e(0x386)!==_0x37bb6e(0x386))_0x4a4930[_0x37bb6e(0x1f3)][_0x37bb6e(0x543)]['call'](this);else return VisuMZ[_0x37bb6e(0x254)]['Settings'][_0x37bb6e(0x489)][_0x37bb6e(0x27a)];}else return this['_item'][_0x37bb6e(0x556)][_0x37bb6e(0x242)]===0x0?VisuMZ[_0x37bb6e(0x254)][_0x37bb6e(0x52e)][_0x37bb6e(0x489)][_0x37bb6e(0x2a8)]:$dataSystem[_0x37bb6e(0x1d0)][this[_0x37bb6e(0x35a)]['damage'][_0x37bb6e(0x242)]];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x59c)]=function(_0x46381c,_0x2dedf4,_0x2aafff){const _0x1497b8=_0x18a61c,_0x4ece1d=this['getItemDamageAmountLabel']();this['drawItemKeyData'](_0x4ece1d,_0x46381c,_0x2dedf4,_0x2aafff,!![]),this[_0x1497b8(0x232)]();const _0x2fa8be=this['getItemDamageAmountText'](),_0x1f2ad5=ColorManager[_0x1497b8(0x3c2)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x1497b8(0x35a)][_0x1497b8(0x556)][_0x1497b8(0x214)]]);return this['changeTextColor'](_0x1f2ad5),this['drawItemKeyData'](_0x2fa8be,_0x46381c,_0x2dedf4,_0x2aafff,![],_0x1497b8(0x608)),this[_0x1497b8(0x5ea)](_0x46381c,_0x2dedf4,_0x2aafff),this[_0x1497b8(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x503)]=function(){const _0x478215=_0x18a61c;if(Imported[_0x478215(0x5ee)]&&DataManager['getDamageStyle'](this[_0x478215(0x35a)])!=='MANUAL'){if(_0x478215(0x3e6)!=='XWghs'){const _0x2d1afb=this[_0x478215(0x543)]()?this[_0x478215(0x495)]():0x0,_0x10a3d0=this[_0x478215(0x47a)]['y']+this['_categoryWindow'][_0x478215(0x1d8)],_0x461385=_0x2577cd[_0x478215(0x208)]-this[_0x478215(0x495)](),_0x3d2004=this['mainAreaBottom']()-_0x10a3d0;return new _0x299c6d(_0x2d1afb,_0x10a3d0,_0x461385,_0x3d2004);}else return this[_0x478215(0x50d)]();}else return this['getItemDamageAmountLabelOriginal']();},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x521)]=function(){const _0x7bdb2d=_0x18a61c,_0x666789=VisuMZ[_0x7bdb2d(0x254)][_0x7bdb2d(0x52e)]['StatusWindow'],_0xd708fc='DamageType%1'[_0x7bdb2d(0x57c)](this[_0x7bdb2d(0x35a)][_0x7bdb2d(0x556)][_0x7bdb2d(0x214)]),_0x109108=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x7bdb2d(0x35a)][_0x7bdb2d(0x556)][_0x7bdb2d(0x214)]];return _0x666789[_0xd708fc][_0x7bdb2d(0x57c)](_0x109108);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x232)]=function(){const _0x4a53a9=_0x18a61c,_0x2cb151=$gameActors['actor'](0x1);this[_0x4a53a9(0x5bd)]=JsonEx[_0x4a53a9(0x20a)](_0x2cb151),this[_0x4a53a9(0x2d8)]=JsonEx[_0x4a53a9(0x20a)](_0x2cb151);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x465)]=function(){const _0x473ee9=_0x18a61c,_0x4af295='DAMAGE\x20MULTIPLIER';if(this[_0x473ee9(0x463)][_0x4af295])return this[_0x473ee9(0x463)][_0x4af295];if(Imported[_0x473ee9(0x5ee)]&&DataManager[_0x473ee9(0x280)](this[_0x473ee9(0x35a)])!==_0x473ee9(0x33c))return this[_0x473ee9(0x4bf)]();else{if(_0x473ee9(0x4cb)!=='eoymP')return this[_0x473ee9(0x4f5)]();else this['playCursorSound']();}},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x4f5)]=function(){const _0x5e8bd9=_0x18a61c;window['a']=this[_0x5e8bd9(0x5bd)],window['b']=this['_tempActorB'],this[_0x5e8bd9(0x5bd)]['setShopStatusWindowMode'](!![]),this['_tempActorB'][_0x5e8bd9(0x1cb)]([0x3,0x4][_0x5e8bd9(0x366)](this['_item'][_0x5e8bd9(0x556)][_0x5e8bd9(0x214)]));let _0x3bc16d=this[_0x5e8bd9(0x35a)][_0x5e8bd9(0x556)][_0x5e8bd9(0x225)];try{const _0x4849d4=Math['max'](eval(_0x3bc16d),0x0)/window['a'][_0x5e8bd9(0x5af)];this['revertGlobalNamespaceVariables']();if(isNaN(_0x4849d4)){if('bQwSy'===_0x5e8bd9(0x527))this['onTouchOk']();else return _0x5e8bd9(0x2fe);}else return _0x5e8bd9(0x535)['format'](Math[_0x5e8bd9(0x27b)](_0x4849d4*0x64));}catch(_0x399f37){if('VeXEx'!==_0x5e8bd9(0x4db))return $gameTemp[_0x5e8bd9(0x5fc)]()&&(_0x5e8bd9(0x341)===_0x5e8bd9(0x199)?(_0x57e3f7[_0x5e8bd9(0x254)]['Scene_Equip_onSlotOk']['call'](this),this[_0x5e8bd9(0x5d0)]()):(console['log']('Damage\x20Formula\x20Error\x20for\x20%1'[_0x5e8bd9(0x57c)](this[_0x5e8bd9(0x35a)]['name'])),console['log'](_0x399f37))),this[_0x5e8bd9(0x55c)](),_0x5e8bd9(0x2fe);else this[_0x5e8bd9(0x524)]['splice'](this[_0x5e8bd9(0x524)][_0x5e8bd9(0x218)](_0x123810),0x1);}},Window_ShopStatus['prototype'][_0x18a61c(0x55c)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x18a61c(0x1f3)]['drawItemEffects']=function(_0x56b48f,_0x4fdc21,_0x28aadc){const _0x21bb53=_0x18a61c;if(!this[_0x21bb53(0x303)]())return _0x4fdc21;if(this['drawItemEffectsHpRecovery'](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this['lineHeight']();if(this['drawItemEffectsMpRecovery'](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this[_0x21bb53(0x4ce)]();if(this[_0x21bb53(0x327)](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this['lineHeight']();if(this[_0x21bb53(0x5cb)](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this[_0x21bb53(0x4ce)]();if(this[_0x21bb53(0x4a2)](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this[_0x21bb53(0x4ce)]();if(this['drawItemEffectsTpDamage'](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this[_0x21bb53(0x4ce)]();if(this[_0x21bb53(0x1eb)](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this['lineHeight']();if(this[_0x21bb53(0x576)](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this[_0x21bb53(0x4ce)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x56b48f,_0x4fdc21,_0x28aadc))_0x4fdc21+=this['lineHeight']();return this[_0x21bb53(0x2ab)](),_0x4fdc21;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x467)]=function(){const _0x5ac1ad=_0x18a61c;return this[_0x5ac1ad(0x35a)]['effects'];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x303)]=function(){const _0x5068b1=_0x18a61c;let _0x1ef000=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x3a2684=this['getItemEffects']();for(const _0x5cae1c of _0x3a2684){switch(_0x5cae1c[_0x5068b1(0x50b)]){case Game_Action['EFFECT_RECOVER_HP']:this[_0x5068b1(0x328)]['rateHP']+=_0x5cae1c[_0x5068b1(0x4ee)],this[_0x5068b1(0x328)][_0x5068b1(0x19f)]+=_0x5cae1c[_0x5068b1(0x56e)],_0x1ef000=!![];break;case Game_Action[_0x5068b1(0x3f7)]:this[_0x5068b1(0x328)][_0x5068b1(0x193)]+=_0x5cae1c[_0x5068b1(0x4ee)],this[_0x5068b1(0x328)][_0x5068b1(0x1fb)]+=_0x5cae1c[_0x5068b1(0x56e)],_0x1ef000=!![];break;case Game_Action['EFFECT_GAIN_TP']:this[_0x5068b1(0x328)]['gainTP']+=_0x5cae1c[_0x5068b1(0x4ee)],_0x1ef000=!![];break;case Game_Action['EFFECT_ADD_STATE']:this[_0x5068b1(0x328)][_0x5068b1(0x27c)][_0x5068b1(0x5ec)](_0x5cae1c[_0x5068b1(0x34a)]),_0x1ef000=!![];break;case Game_Action[_0x5068b1(0x2a3)]:this['_itemData'][_0x5068b1(0x55b)][_0x5068b1(0x5ec)](_0x5cae1c[_0x5068b1(0x34a)]),this[_0x5068b1(0x328)][_0x5068b1(0x40b)]=!![],_0x1ef000=!![];break;case Game_Action[_0x5068b1(0x4ea)]:this[_0x5068b1(0x328)][_0x5068b1(0x1ad)][_0x5cae1c[_0x5068b1(0x34a)]]+=0x1,_0x1ef000=!![];break;case Game_Action['EFFECT_ADD_DEBUFF']:this[_0x5068b1(0x328)][_0x5068b1(0x1ad)][_0x5cae1c[_0x5068b1(0x34a)]]-=0x1,_0x1ef000=!![];break;case Game_Action[_0x5068b1(0x4b1)]:this['_itemData'][_0x5068b1(0x1ea)]['push'](_0x5cae1c[_0x5068b1(0x34a)]),this['_itemData']['removeStateBuffChanges']=!![],_0x1ef000=!![];break;case Game_Action[_0x5068b1(0x4cd)]:this['_itemData'][_0x5068b1(0x34d)]['push'](_0x5cae1c[_0x5068b1(0x34a)]),this['_itemData'][_0x5068b1(0x40b)]=!![],_0x1ef000=!![];break;}}if(this[_0x5068b1(0x328)][_0x5068b1(0x27c)][_0x5068b1(0x3f9)]>0x0)this['_itemData'][_0x5068b1(0x27f)]=!![];for(let _0x53bd84=0x0;_0x53bd84<this[_0x5068b1(0x328)][_0x5068b1(0x1ad)]['length'];_0x53bd84++){if(this['_itemData']['changeBuff'][_0x53bd84]!==0x0)this['_itemData'][_0x5068b1(0x27f)]=!![];}this[_0x5068b1(0x35a)][_0x5068b1(0x256)]!==0x0&&(this[_0x5068b1(0x328)][_0x5068b1(0x40e)]=this[_0x5068b1(0x35a)][_0x5068b1(0x256)],_0x1ef000=!![]);const _0x2bc64f=[_0x5068b1(0x1b4),'MP\x20RECOVERY','TP\x20RECOVERY',_0x5068b1(0x2e3),_0x5068b1(0x5c6),_0x5068b1(0x304),'USER\x20TP\x20GAIN',_0x5068b1(0x46d),_0x5068b1(0x45d)];for(const _0x35e5e7 of _0x2bc64f){if(this[_0x5068b1(0x463)][_0x35e5e7]){if(_0x5068b1(0x198)==='sAsoE'){_0x1ef000=!![];break;}else{const _0x49a202=_0x11ead8[_0x5068b1(0x601)]()['indexOf'](_0x5411ed),_0x2677c6=_0x51d838+_0x8c3c08+_0x49a202*_0x153ddf;this[_0x5068b1(0x530)](_0x57eb2d[_0x5068b1(0x1f5)](this['_item'])),this[_0x5068b1(0x3a5)](_0x15616c,_0x2677c6+_0x3a63ca/0x2,_0x360915);let _0x41a45b=_0x54bc33;for(const _0x42c759 of _0x4b9c0c){const _0x261d6d=_0x41a45b-(_0x244abb-_0x33b543)/0x2;this[_0x5068b1(0x1ff)](_0x3beee9,_0x42c759,_0x2677c6,_0x261d6d,_0x1382b7),_0x41a45b+=_0x365ab2;}}}}return _0x1ef000;},Window_ShopStatus[_0x18a61c(0x1f3)]['drawItemEffectsHpRecovery']=function(_0x5c91d5,_0xa053ae,_0x30767c){const _0x5bb0c6=_0x18a61c,_0x5d471e=_0x5bb0c6(0x1b4);if(this[_0x5bb0c6(0x328)][_0x5bb0c6(0x38e)]<=0x0&&this['_itemData'][_0x5bb0c6(0x19f)]<=0x0&&!this[_0x5bb0c6(0x463)][_0x5d471e])return![];const _0x40b179=this[_0x5bb0c6(0x4be)]();this[_0x5bb0c6(0x4ae)](_0x40b179,_0x5c91d5,_0xa053ae,_0x30767c,!![]);const _0xb94bec=this[_0x5bb0c6(0x5e3)]();return this[_0x5bb0c6(0x29e)](ColorManager['damageColor'](0x1)),this['drawItemKeyData'](_0xb94bec,_0x5c91d5,_0xa053ae,_0x30767c,![],_0x5bb0c6(0x608)),this['drawItemDarkRect'](_0x5c91d5,_0xa053ae,_0x30767c),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x18a61c(0x4be)]=function(){const _0x532150=_0x18a61c,_0x112156=VisuMZ[_0x532150(0x254)][_0x532150(0x52e)][_0x532150(0x489)]['LabelRecoverHP'];return _0x112156[_0x532150(0x57c)](TextManager['hp']);},Window_ShopStatus[_0x18a61c(0x1f3)]['getItemEffectsHpRecoveryText']=function(){const _0x2409d7=_0x18a61c,_0x1c635e='HP\x20RECOVERY';if(this[_0x2409d7(0x463)][_0x1c635e])return this[_0x2409d7(0x463)][_0x1c635e];let _0x500e31='';if(this[_0x2409d7(0x328)][_0x2409d7(0x38e)]>0x0)_0x500e31+=_0x2409d7(0x33a)[_0x2409d7(0x57c)](Math['floor'](this[_0x2409d7(0x328)][_0x2409d7(0x38e)]*0x64));if(this[_0x2409d7(0x328)]['rateHP']>0x0&&this[_0x2409d7(0x328)]['flatHP']>0x0)_0x500e31+='\x20';if(this[_0x2409d7(0x328)][_0x2409d7(0x19f)]>0x0)_0x500e31+=_0x2409d7(0x410)[_0x2409d7(0x57c)](this['_itemData'][_0x2409d7(0x19f)]);return _0x500e31;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x4c9)]=function(_0x35d76c,_0x3db0c4,_0x69331c){const _0x2fd1cf=_0x18a61c,_0x4e9f02='MP\x20RECOVERY';if(this[_0x2fd1cf(0x328)]['rateMP']<=0x0&&this[_0x2fd1cf(0x328)][_0x2fd1cf(0x1fb)]<=0x0&&!this[_0x2fd1cf(0x463)][_0x4e9f02])return![];const _0x593fab=this[_0x2fd1cf(0x534)]();this[_0x2fd1cf(0x4ae)](_0x593fab,_0x35d76c,_0x3db0c4,_0x69331c,!![]);const _0x226340=this[_0x2fd1cf(0x293)]();return this[_0x2fd1cf(0x29e)](ColorManager[_0x2fd1cf(0x3c2)](0x3)),this[_0x2fd1cf(0x4ae)](_0x226340,_0x35d76c,_0x3db0c4,_0x69331c,![],_0x2fd1cf(0x608)),this['drawItemDarkRect'](_0x35d76c,_0x3db0c4,_0x69331c),this[_0x2fd1cf(0x2ab)](),!![];},Window_ShopStatus['prototype'][_0x18a61c(0x534)]=function(){const _0x24e476=_0x18a61c,_0x5e1110=VisuMZ[_0x24e476(0x254)][_0x24e476(0x52e)][_0x24e476(0x489)][_0x24e476(0x38b)];return _0x5e1110['format'](TextManager['mp']);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x293)]=function(){const _0x1bb87e=_0x18a61c,_0x5967d7=_0x1bb87e(0x25a);if(this[_0x1bb87e(0x463)][_0x5967d7])return this[_0x1bb87e(0x463)][_0x5967d7];let _0x56bd3a='';if(this[_0x1bb87e(0x328)][_0x1bb87e(0x193)]>0x0)_0x56bd3a+=_0x1bb87e(0x33a)['format'](Math[_0x1bb87e(0x1f7)](this[_0x1bb87e(0x328)]['rateMP']*0x64));if(this[_0x1bb87e(0x328)][_0x1bb87e(0x193)]>0x0&&this[_0x1bb87e(0x328)]['flatMP']>0x0)_0x56bd3a+='\x20';if(this['_itemData'][_0x1bb87e(0x1fb)]>0x0)_0x56bd3a+='+%1'['format'](this[_0x1bb87e(0x328)]['flatMP']);return _0x56bd3a;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x327)]=function(_0x1d9d4f,_0x2ede8a,_0x1077fd){const _0x1f652d=_0x18a61c,_0x1087ab=_0x1f652d(0x2cb);if(this[_0x1f652d(0x328)][_0x1f652d(0x528)]<=0x0&&!this[_0x1f652d(0x463)][_0x1087ab])return![];const _0x5c28ee=this[_0x1f652d(0x5eb)]();this[_0x1f652d(0x4ae)](_0x5c28ee,_0x1d9d4f,_0x2ede8a,_0x1077fd,!![]);const _0x4c7329=this[_0x1f652d(0x1a2)]();return this[_0x1f652d(0x29e)](ColorManager[_0x1f652d(0x462)]()),this[_0x1f652d(0x4ae)](_0x4c7329,_0x1d9d4f,_0x2ede8a,_0x1077fd,![],_0x1f652d(0x608)),this[_0x1f652d(0x5ea)](_0x1d9d4f,_0x2ede8a,_0x1077fd),this[_0x1f652d(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x5eb)]=function(){const _0x501ae6=_0x18a61c,_0x3705b5=VisuMZ['ItemsEquipsCore'][_0x501ae6(0x52e)]['StatusWindow'][_0x501ae6(0x5a0)];return _0x3705b5['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x18a61c(0x1a2)]=function(){const _0x3b0c33=_0x18a61c,_0x6b01d0=_0x3b0c33(0x2cb);if(this['_customItemInfo'][_0x6b01d0])return this[_0x3b0c33(0x463)][_0x6b01d0];let _0x3ed150='';return _0x3ed150+=_0x3b0c33(0x410)[_0x3b0c33(0x57c)](this['_itemData'][_0x3b0c33(0x528)]),_0x3ed150;},Window_ShopStatus[_0x18a61c(0x1f3)]['drawItemEffectsSelfTpGain']=function(_0xb93eac,_0x4d501a,_0x25f88b){const _0x5a1256=_0x18a61c,_0x4b5506=_0x5a1256(0x1d9);if(this['_itemData']['selfTP']===0x0&&!this['_customItemInfo'][_0x4b5506])return![];const _0x1a6436=this[_0x5a1256(0x186)]();this[_0x5a1256(0x4ae)](_0x1a6436,_0xb93eac,_0x4d501a,_0x25f88b,!![]);const _0x1e6b11=this['getItemEffectsSelfTpGainText']();return this[_0x5a1256(0x328)][_0x5a1256(0x40e)]>0x0?_0x5a1256(0x260)==='jAvgh'?this[_0x5a1256(0x29e)](ColorManager[_0x5a1256(0x462)]()):_0x1f829c[0x0]=-0x1:this[_0x5a1256(0x29e)](ColorManager[_0x5a1256(0x332)]()),this[_0x5a1256(0x4ae)](_0x1e6b11,_0xb93eac,_0x4d501a,_0x25f88b,![],_0x5a1256(0x608)),this[_0x5a1256(0x5ea)](_0xb93eac,_0x4d501a,_0x25f88b),this[_0x5a1256(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x186)]=function(){const _0x2000d6=_0x18a61c,_0x5e6743=VisuMZ[_0x2000d6(0x254)][_0x2000d6(0x52e)][_0x2000d6(0x489)][_0x2000d6(0x2f6)];return _0x5e6743[_0x2000d6(0x57c)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x18a61c(0x42d)]=function(){const _0x23cc2f=_0x18a61c,_0x320a30='USER\x20TP\x20GAIN';if(this[_0x23cc2f(0x463)][_0x320a30])return this['_customItemInfo'][_0x320a30];let _0x96b4eb='';if(this[_0x23cc2f(0x328)][_0x23cc2f(0x40e)]>0x0){if(_0x23cc2f(0x25e)!==_0x23cc2f(0x5d1))_0x96b4eb+=_0x23cc2f(0x410)[_0x23cc2f(0x57c)](this[_0x23cc2f(0x328)][_0x23cc2f(0x40e)]);else{const _0x3f0044=_0x315051['parse']('['+_0x48de3b['$1']['match'](/\d+/g)+']');for(const _0x3ff13b of _0x3f0044){if(!_0x708b03['value'](_0x3ff13b))return![];}}}else _0x96b4eb+='%1'[_0x23cc2f(0x57c)](this[_0x23cc2f(0x328)]['selfTP']);return _0x96b4eb;},Window_ShopStatus['prototype'][_0x18a61c(0x5cb)]=function(_0x140812,_0xa16f46,_0xee3b49){const _0x4f2520=_0x18a61c,_0x1ffcd3=_0x4f2520(0x2e3);if(this[_0x4f2520(0x328)][_0x4f2520(0x38e)]>=0x0&&this[_0x4f2520(0x328)]['flatHP']>=0x0&&!this[_0x4f2520(0x463)][_0x1ffcd3])return![];const _0x21af88=this[_0x4f2520(0x1b1)]();this['drawItemKeyData'](_0x21af88,_0x140812,_0xa16f46,_0xee3b49,!![]);const _0x3c4961=this[_0x4f2520(0x3e7)]();return this[_0x4f2520(0x29e)](ColorManager[_0x4f2520(0x3c2)](0x0)),this[_0x4f2520(0x4ae)](_0x3c4961,_0x140812,_0xa16f46,_0xee3b49,![],_0x4f2520(0x608)),this['drawItemDarkRect'](_0x140812,_0xa16f46,_0xee3b49),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x1b1)]=function(){const _0x5cf63e=_0x18a61c,_0x5a3eb0=VisuMZ[_0x5cf63e(0x254)][_0x5cf63e(0x52e)][_0x5cf63e(0x489)][_0x5cf63e(0x4a9)];return _0x5a3eb0[_0x5cf63e(0x57c)](TextManager['hp']);},Window_ShopStatus['prototype']['getItemEffectsHpDamageText']=function(){const _0x4cd728=_0x18a61c,_0x1e3943='HP\x20DAMAGE';if(this['_customItemInfo'][_0x1e3943])return this[_0x4cd728(0x463)][_0x1e3943];let _0xe85d9d='';if(this[_0x4cd728(0x328)]['rateHP']<0x0)_0xe85d9d+=_0x4cd728(0x535)[_0x4cd728(0x57c)](Math[_0x4cd728(0x1f7)](this[_0x4cd728(0x328)][_0x4cd728(0x38e)]*0x64));if(this[_0x4cd728(0x328)][_0x4cd728(0x38e)]<0x0&&this[_0x4cd728(0x328)][_0x4cd728(0x19f)]<0x0)_0xe85d9d+='\x20';if(this[_0x4cd728(0x328)]['flatHP']<0x0)_0xe85d9d+='%1'[_0x4cd728(0x57c)](this[_0x4cd728(0x328)]['flatHP']);return _0xe85d9d;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x4a2)]=function(_0x5be305,_0x5d23ec,_0x5cffb1){const _0x5d30c4=_0x18a61c,_0x5d8d9a=_0x5d30c4(0x5c6);if(this['_itemData'][_0x5d30c4(0x193)]>=0x0&&this[_0x5d30c4(0x328)][_0x5d30c4(0x1fb)]>=0x0&&!this[_0x5d30c4(0x463)][_0x5d8d9a])return![];const _0x43415c=this[_0x5d30c4(0x2b6)]();this['drawItemKeyData'](_0x43415c,_0x5be305,_0x5d23ec,_0x5cffb1,!![]);const _0x2b584a=this[_0x5d30c4(0x3d4)]();return this[_0x5d30c4(0x29e)](ColorManager['damageColor'](0x2)),this['drawItemKeyData'](_0x2b584a,_0x5be305,_0x5d23ec,_0x5cffb1,![],_0x5d30c4(0x608)),this[_0x5d30c4(0x5ea)](_0x5be305,_0x5d23ec,_0x5cffb1),this[_0x5d30c4(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)]['getItemEffectsMpDamageLabel']=function(){const _0xccbfbf=_0x18a61c,_0x474cf8=VisuMZ[_0xccbfbf(0x254)][_0xccbfbf(0x52e)][_0xccbfbf(0x489)]['LabelDamageMP'];return _0x474cf8[_0xccbfbf(0x57c)](TextManager['mp']);},Window_ShopStatus['prototype'][_0x18a61c(0x3d4)]=function(){const _0x5b34c1=_0x18a61c,_0x3374df=_0x5b34c1(0x5c6);if(this['_customItemInfo'][_0x3374df])return this[_0x5b34c1(0x463)][_0x3374df];let _0x4d4069='';if(this['_itemData']['rateMP']<0x0)_0x4d4069+='%1%'[_0x5b34c1(0x57c)](Math[_0x5b34c1(0x1f7)](this[_0x5b34c1(0x328)][_0x5b34c1(0x193)]*0x64));if(this[_0x5b34c1(0x328)][_0x5b34c1(0x193)]<0x0&&this[_0x5b34c1(0x328)]['flatMP']<0x0)_0x4d4069+='\x20';if(this[_0x5b34c1(0x328)]['flatMP']<0x0)_0x4d4069+='%1'[_0x5b34c1(0x57c)](this[_0x5b34c1(0x328)][_0x5b34c1(0x1fb)]);return _0x4d4069;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x4ad)]=function(_0x379292,_0x43fbaf,_0x5ce032){const _0x3705fe=_0x18a61c,_0x44fdea='TP\x20DAMAGE';if(this[_0x3705fe(0x328)][_0x3705fe(0x528)]>=0x0&&!this[_0x3705fe(0x463)][_0x44fdea])return![];const _0x36b2cd=this[_0x3705fe(0x1fd)]();this[_0x3705fe(0x4ae)](_0x36b2cd,_0x379292,_0x43fbaf,_0x5ce032,!![]);const _0x248bec=this[_0x3705fe(0x449)]();return this[_0x3705fe(0x29e)](ColorManager['powerDownColor']()),this[_0x3705fe(0x4ae)](_0x248bec,_0x379292,_0x43fbaf,_0x5ce032,![],_0x3705fe(0x608)),this[_0x3705fe(0x5ea)](_0x379292,_0x43fbaf,_0x5ce032),this[_0x3705fe(0x2ab)](),!![];},Window_ShopStatus['prototype'][_0x18a61c(0x1fd)]=function(){const _0x4acc9e=_0x18a61c,_0x2e4d42=VisuMZ['ItemsEquipsCore']['Settings'][_0x4acc9e(0x489)][_0x4acc9e(0x3b3)];return _0x2e4d42['format'](TextManager['tp']);},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x449)]=function(){const _0x1d23ef=_0x18a61c,_0x2cb097=_0x1d23ef(0x304);if(this[_0x1d23ef(0x463)][_0x2cb097])return this['_customItemInfo'][_0x2cb097];let _0xcdf38a='';return _0xcdf38a+='%1'[_0x1d23ef(0x57c)](this[_0x1d23ef(0x328)][_0x1d23ef(0x528)]),_0xcdf38a;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x576)]=function(_0x5b5299,_0x2b6594,_0x100010){const _0x4ca887=_0x18a61c,_0x571ce4=_0x4ca887(0x46d);if(!this[_0x4ca887(0x328)][_0x4ca887(0x27f)]&&!this[_0x4ca887(0x463)][_0x571ce4])return![];const _0x1b3cb7=this[_0x4ca887(0x1d7)]();this['drawItemKeyData'](_0x1b3cb7,_0x5b5299,_0x2b6594,_0x100010,!![]);const _0x266274=this[_0x4ca887(0x584)]();return this[_0x4ca887(0x4ae)](_0x266274,_0x5b5299,_0x2b6594,_0x100010,![],_0x4ca887(0x608)),this[_0x4ca887(0x5ea)](_0x5b5299,_0x2b6594,_0x100010),this[_0x4ca887(0x2ab)](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x1d7)]=function(){const _0x427019=_0x18a61c;return VisuMZ[_0x427019(0x254)]['Settings']['StatusWindow']['LabelApply'];},Window_ShopStatus['prototype'][_0x18a61c(0x584)]=function(){const _0xb43a1e=_0x18a61c,_0x2ca45c='ADDED\x20EFFECTS';if(this[_0xb43a1e(0x463)][_0x2ca45c])return this[_0xb43a1e(0x463)][_0x2ca45c];let _0xf396a='',_0x3e2038=0x0;const _0x2fc71f=0x8;for(const _0x18904a of this[_0xb43a1e(0x328)]['addState']){const _0x473b73=$dataStates[_0x18904a];if(_0x473b73&&_0x473b73['iconIndex']>0x0){_0xf396a+=_0xb43a1e(0x419)[_0xb43a1e(0x57c)](_0x473b73[_0xb43a1e(0x3df)]),_0x3e2038++;if(_0x3e2038>=_0x2fc71f)return _0xf396a;}}for(let _0x27cfeb=0x0;_0x27cfeb<this[_0xb43a1e(0x328)][_0xb43a1e(0x1ad)][_0xb43a1e(0x3f9)];_0x27cfeb++){const _0x22c4ba=this[_0xb43a1e(0x328)][_0xb43a1e(0x1ad)][_0x27cfeb],_0x9669af=Game_BattlerBase[_0xb43a1e(0x1f3)][_0xb43a1e(0x46e)](_0x22c4ba,_0x27cfeb);if(_0x9669af>0x0){if(_0xb43a1e(0x20b)!==_0xb43a1e(0x20b)){const _0x3c7429=_0xdb4f0b(_0x1e1d19['$1']);_0x3c7429<_0x158fca?(_0x5a2143('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xb43a1e(0x57c)](_0x573aab,_0x3c7429,_0x462f44)),_0x2417dd[_0xb43a1e(0x234)]()):_0x4ed47a=_0x4e6a29['max'](_0x3c7429,_0x4427bd);}else{_0xf396a+='\x5cI[%1]'[_0xb43a1e(0x57c)](_0x9669af),_0x3e2038++;if(_0x3e2038>=_0x2fc71f)return _0xf396a;}}}return _0xf396a;},Window_ShopStatus['prototype'][_0x18a61c(0x558)]=function(_0x397b5e,_0x1cbdf3,_0x46090a){const _0x554854=_0x18a61c,_0x4888ed='REMOVED\x20EFFECTS';if(!this[_0x554854(0x328)][_0x554854(0x40b)]&&!this[_0x554854(0x463)][_0x4888ed])return![];const _0x503f95=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x554854(0x4ae)](_0x503f95,_0x397b5e,_0x1cbdf3,_0x46090a,!![]);const _0x29aef4=this[_0x554854(0x51a)]();return this[_0x554854(0x4ae)](_0x29aef4,_0x397b5e,_0x1cbdf3,_0x46090a,![],_0x554854(0x608)),this[_0x554854(0x5ea)](_0x397b5e,_0x1cbdf3,_0x46090a),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x251)]=function(){const _0x49196f=_0x18a61c;return VisuMZ[_0x49196f(0x254)]['Settings']['StatusWindow'][_0x49196f(0x2a1)];},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x51a)]=function(){const _0xa67ae2=_0x18a61c,_0x7f51cd=_0xa67ae2(0x45d);if(this[_0xa67ae2(0x463)][_0x7f51cd])return this['_customItemInfo'][_0x7f51cd];let _0x5a34bd='',_0x2bfea3=0x0;const _0x4699d4=VisuMZ[_0xa67ae2(0x254)][_0xa67ae2(0x52e)][_0xa67ae2(0x489)]['MaxIcons'];for(const _0x4358bf of this[_0xa67ae2(0x328)]['removeState']){if(_0xa67ae2(0x4b3)!=='twNFg'){const _0x266c3b=$dataStates[_0x4358bf];if(_0x266c3b&&_0x266c3b['iconIndex']>0x0){if(_0xa67ae2(0x2ee)!==_0xa67ae2(0x2ee))return this[_0xa67ae2(0x1da)]()[_0xa67ae2(0x366)](this['equipSlots']()[_0x1d6542])?![]:this[_0xa67ae2(0x563)](_0x60c421);else{_0x5a34bd+='\x5cI[%1]'[_0xa67ae2(0x57c)](_0x266c3b[_0xa67ae2(0x3df)]),_0x2bfea3++;if(_0x2bfea3>=_0x4699d4)return _0x5a34bd;}}}else return this[_0xa67ae2(0x206)]()?this[_0xa67ae2(0x43c)]():_0x475e66[_0xa67ae2(0x254)][_0xa67ae2(0x407)][_0xa67ae2(0x4f3)](this);}for(let _0x59345d=0x0;_0x59345d<this[_0xa67ae2(0x328)][_0xa67ae2(0x1ea)][_0xa67ae2(0x3f9)];_0x59345d++){const _0x4e8f14=Game_BattlerBase[_0xa67ae2(0x1f3)][_0xa67ae2(0x46e)](0x1,_0x59345d);if(_0x4e8f14>0x0){_0x5a34bd+='\x5cI[%1]'[_0xa67ae2(0x57c)](_0x4e8f14),_0x2bfea3++;if(_0x2bfea3>=_0x4699d4)return _0x5a34bd;}}for(let _0x47e681=0x0;_0x47e681<this['_itemData'][_0xa67ae2(0x34d)][_0xa67ae2(0x3f9)];_0x47e681++){const _0xb3e662=Game_BattlerBase['prototype'][_0xa67ae2(0x46e)](-0x1,_0x47e681);if(_0xb3e662>0x0){_0x5a34bd+='\x5cI[%1]'['format'](_0xb3e662),_0x2bfea3++;if(_0x2bfea3>=_0x4699d4)return _0x5a34bd;}}return _0x5a34bd;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x24d)]=function(_0x4458b9,_0x44f1f6,_0x2208b0){const _0x5b219e=_0x18a61c;if(this[_0x5b219e(0x35a)][_0x5b219e(0x447)][_0x5b219e(0x23c)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0xd22ae=String(RegExp['$1'])[_0x5b219e(0x23f)](/[\r\n]+/);for(const _0x449d1d of _0xd22ae){if(_0x5b219e(0x3e1)===_0x5b219e(0x4f7)){_0x23cd66[_0x5b219e(0x1f3)][_0x5b219e(0x36e)][_0x5b219e(0x4f3)](this);if(this[_0x5b219e(0x235)])this['updateCommandNameWindow']();}else{if(_0x449d1d['match'](/(.*):[ ](.*)/i)){const _0x13ec50=String(RegExp['$1'])['trim'](),_0x4decb1=String(RegExp['$2'])['trim']();this['drawItemCustomEntryLine'](_0x13ec50,_0x4decb1,_0x4458b9,_0x44f1f6,_0x2208b0),_0x44f1f6+=this[_0x5b219e(0x4ce)]();}}}}return this[_0x5b219e(0x2ab)](),_0x44f1f6;},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x49d)]=function(_0x2f5d6b,_0x3883fe,_0x39a0ac,_0x2cb4b5,_0x1ac58e){const _0x1b4969=_0x18a61c;this['drawItemKeyData'](_0x2f5d6b,_0x39a0ac,_0x2cb4b5,_0x1ac58e,!![]),this['drawItemKeyData'](_0x3883fe,_0x39a0ac,_0x2cb4b5,_0x1ac58e,![],_0x1b4969(0x608)),this[_0x1b4969(0x5ea)](_0x39a0ac,_0x2cb4b5,_0x1ac58e),this[_0x1b4969(0x2ab)]();},Window_ShopStatus[_0x18a61c(0x1f3)][_0x18a61c(0x544)]=function(){const _0xa8df5=_0x18a61c;if(!this[_0xa8df5(0x35a)])return;const _0x5b3307=this[_0xa8df5(0x35a)][_0xa8df5(0x447)],_0x1698bb=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x356b76=_0x5b3307[_0xa8df5(0x23c)](_0x1698bb);if(_0x356b76)for(const _0x4bbac5 of _0x356b76){_0x4bbac5[_0xa8df5(0x23c)](_0x1698bb);const _0x209303=String(RegExp['$1'])['trim']()||'';if(_0x209303==='')continue;const _0x15b021=ImageManager[_0xa8df5(0x50e)](_0x209303);_0x15b021['addLoadListener'](this['drawCustomShopGraphicLoad'][_0xa8df5(0x265)](this,_0x15b021,this[_0xa8df5(0x35a)]));}},Window_ShopStatus['prototype'][_0x18a61c(0x249)]=function(_0x12f937,_0x2be41b){const _0x27d70b=_0x18a61c;if(this['_item']!==_0x2be41b)return;if(!_0x12f937)return;if(_0x12f937['width']<=0x0||_0x12f937[_0x27d70b(0x1d8)]<=0x0)return;const _0x3ad293=_0x2be41b[_0x27d70b(0x447)];let _0x3316e2=_0x27d70b(0x324);_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x3316e2=_0x27d70b(0x48d));const _0x20c132=_0x3316e2===_0x27d70b(0x324)?this[_0x27d70b(0x602)]:this[_0x27d70b(0x359)];let _0x5a96eb=this[_0x27d70b(0x4d4)],_0x3574d2=this[_0x27d70b(0x311)];_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x5a96eb=Number(RegExp['$1']));_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x3574d2=Number(RegExp['$1']));_0x3ad293['match'](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x5a96eb=Number(RegExp['$1']),_0x3574d2=Number(RegExp['$2']));const _0x315978=Math['min'](0x1,_0x5a96eb/_0x12f937[_0x27d70b(0x1e5)],_0x3574d2/_0x12f937[_0x27d70b(0x1d8)]);let _0x573b4b=0x0,_0x3df3f8=0x0,_0x3756a1=Math[_0x27d70b(0x1f7)](_0x12f937[_0x27d70b(0x1e5)]*_0x315978),_0x25abd6=Math[_0x27d70b(0x1f7)](_0x12f937[_0x27d70b(0x1d8)]*_0x315978),_0x2e36a4='center';if(_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)){if('RuuOf'!==_0x27d70b(0x230))return this['geUpdatedLayoutStatusWidth']();else _0x2e36a4=String(RegExp['$1'])[_0x27d70b(0x2ed)]()[_0x27d70b(0x3a9)]();}if(_0x2e36a4==='left')_0x573b4b=0x0;else{if(_0x2e36a4==='center'){if(_0x27d70b(0x205)!==_0x27d70b(0x4f2))_0x573b4b=Math[_0x27d70b(0x27b)]((this[_0x27d70b(0x4d4)]-_0x3756a1)/0x2);else{const _0x4b7676=this[_0x27d70b(0x35c)]();this[_0x27d70b(0x4ae)](_0x4b7676,_0x307c90,_0x120383,_0x3f653a,!![]);const _0x533299=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x533299,_0x1507f2,_0x4f960d,_0x1dc8d5,![],_0x27d70b(0x608)),this[_0x27d70b(0x5ea)](_0x2220a1,_0x4dfb84,_0x31db24),this['resetFontSettings'](),!![];}}else{if(_0x27d70b(0x34b)===_0x27d70b(0x34b))_0x573b4b=this[_0x27d70b(0x4d4)]-_0x3756a1;else return _0x1cc5a9[_0x27d70b(0x254)][_0x27d70b(0x2ca)][_0x27d70b(0x4f3)](this);}}let _0x2a5014='middle';_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x2a5014=String(RegExp['$1'])[_0x27d70b(0x2ed)]()['trim']());if(_0x2a5014===_0x27d70b(0x575)){if('vuTQj'===_0x27d70b(0x355))_0x3df3f8=0x0;else{_0x1cf575['prototype'][_0x27d70b(0x330)][_0x27d70b(0x4f3)](this);for(const _0x23d979 of _0x475fa1['members']()){_0x6b4612[_0x27d70b(0x44a)](_0x23d979['characterName']());}}}else{if(_0x2a5014===_0x27d70b(0x2db)){if(_0x27d70b(0x389)!==_0x27d70b(0x3da))_0x3df3f8=Math[_0x27d70b(0x27b)]((this[_0x27d70b(0x311)]-_0x25abd6)/0x2);else return _0x2fc1aa[_0x27d70b(0x254)]['Settings'][_0x27d70b(0x1ce)][_0x27d70b(0x5a8)];}else _0x3df3f8=this[_0x27d70b(0x311)]-_0x25abd6;}_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x573b4b+=Number(RegExp['$1']));if(_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if('jCpbY'!=='gXeBU')_0x3df3f8+=Number(RegExp['$1']);else{const _0x37d18a=_0x27d70b(0x323);if(this[_0x27d70b(0x463)][_0x37d18a])return this[_0x27d70b(0x463)][_0x37d18a];const _0x3706ba=_0x5e92e3[_0x27d70b(0x254)][_0x27d70b(0x52e)][_0x27d70b(0x489)],_0x510e2f=_0x27d70b(0x356)['format'](this['_item']['occasion']);return _0x3706ba[_0x510e2f];}}if(_0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)){if(_0x27d70b(0x1c6)!==_0x27d70b(0x5b5))_0x573b4b+=Number(RegExp['$1']),_0x3df3f8+=Number(RegExp['$2']);else return;}let _0x5955f2=0xff;if(_0x3ad293['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x5955f2=Number(RegExp['$1']);else _0x3ad293[_0x27d70b(0x23c)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x5955f2=Math['round'](Number(RegExp['$1'])*0.01*0xff)['clamp'](0x0,0xff));_0x20c132['paintOpacity']=_0x5955f2,_0x20c132[_0x27d70b(0x3f0)](_0x12f937,0x0,0x0,_0x12f937['width'],_0x12f937[_0x27d70b(0x1d8)],_0x573b4b,_0x3df3f8,_0x3756a1,_0x25abd6),_0x20c132[_0x27d70b(0x553)]=0xff;};