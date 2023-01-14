//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.14] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
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
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 *   - Only applies to the Command Window style: Default Vertical.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
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
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.14: October 25, 2021
 * * Bug Fixes!
 * ** Plugin Parameter settings for automatic Command Window height adjustment
 *    should now work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Added a note for the Help File: Gold Window > Thinner Gold Window
 * *** Only applies to the Command Window style: Default Vertical.
 * 
 * Version 1.13: October 21, 2021
 * * Feature Update!
 * ** Rounding update applied to picture portraits so that coordinates aren't
 *    drawn on non-whole numbers due to base images having odd values. Update
 *    made by Olivia.
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
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
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
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
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x4797a7=_0x27cd;(function(_0xce227d,_0x4359d5){const _0x5e8631=_0x27cd,_0x39652e=_0xce227d();while(!![]){try{const _0x1e5df8=-parseInt(_0x5e8631(0x10d))/0x1*(-parseInt(_0x5e8631(0xff))/0x2)+-parseInt(_0x5e8631(0x100))/0x3*(parseInt(_0x5e8631(0x191))/0x4)+-parseInt(_0x5e8631(0x13f))/0x5+-parseInt(_0x5e8631(0x254))/0x6+-parseInt(_0x5e8631(0x127))/0x7*(-parseInt(_0x5e8631(0xf1))/0x8)+-parseInt(_0x5e8631(0x173))/0x9*(parseInt(_0x5e8631(0x24c))/0xa)+-parseInt(_0x5e8631(0xfd))/0xb*(-parseInt(_0x5e8631(0x224))/0xc);if(_0x1e5df8===_0x4359d5)break;else _0x39652e['push'](_0x39652e['shift']());}catch(_0x2d7a34){_0x39652e['push'](_0x39652e['shift']());}}}(_0x36b5,0xa94eb));var label='MainMenuCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2c50e7){const _0x201bc7=_0x27cd;return _0x2c50e7[_0x201bc7(0x1a6)]&&_0x2c50e7['description'][_0x201bc7(0x24a)]('['+label+']');})[0x0];VisuMZ[label][_0x4797a7(0x145)]=VisuMZ[label][_0x4797a7(0x145)]||{},VisuMZ[_0x4797a7(0x258)]=function(_0x38d079,_0x1ef8e){const _0x1e802c=_0x4797a7;for(const _0x14bec2 in _0x1ef8e){if(_0x14bec2[_0x1e802c(0x241)](/(.*):(.*)/i)){if(_0x1e802c(0x276)!==_0x1e802c(0x26b)){const _0x1bf397=String(RegExp['$1']),_0x14300d=String(RegExp['$2'])[_0x1e802c(0x179)]()[_0x1e802c(0x1de)]();let _0x61c9f2,_0xa9aa1b,_0x13ce4c;switch(_0x14300d){case _0x1e802c(0x223):_0x61c9f2=_0x1ef8e[_0x14bec2]!==''?Number(_0x1ef8e[_0x14bec2]):0x0;break;case _0x1e802c(0x1b2):_0xa9aa1b=_0x1ef8e[_0x14bec2]!==''?JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2]):[],_0x61c9f2=_0xa9aa1b['map'](_0x273b1d=>Number(_0x273b1d));break;case'EVAL':_0x61c9f2=_0x1ef8e[_0x14bec2]!==''?eval(_0x1ef8e[_0x14bec2]):null;break;case _0x1e802c(0x105):_0xa9aa1b=_0x1ef8e[_0x14bec2]!==''?JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2]):[],_0x61c9f2=_0xa9aa1b['map'](_0x298e22=>eval(_0x298e22));break;case _0x1e802c(0x257):_0x61c9f2=_0x1ef8e[_0x14bec2]!==''?JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2]):'';break;case _0x1e802c(0x1fe):_0xa9aa1b=_0x1ef8e[_0x14bec2]!==''?JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2]):[],_0x61c9f2=_0xa9aa1b[_0x1e802c(0x1a0)](_0x417638=>JSON[_0x1e802c(0x111)](_0x417638));break;case _0x1e802c(0x270):_0x61c9f2=_0x1ef8e[_0x14bec2]!==''?new Function(JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2])):new Function(_0x1e802c(0x11b));break;case'ARRAYFUNC':_0xa9aa1b=_0x1ef8e[_0x14bec2]!==''?JSON['parse'](_0x1ef8e[_0x14bec2]):[],_0x61c9f2=_0xa9aa1b[_0x1e802c(0x1a0)](_0x2b3cec=>new Function(JSON['parse'](_0x2b3cec)));break;case _0x1e802c(0x253):_0x61c9f2=_0x1ef8e[_0x14bec2]!==''?String(_0x1ef8e[_0x14bec2]):'';break;case _0x1e802c(0x25a):_0xa9aa1b=_0x1ef8e[_0x14bec2]!==''?JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2]):[],_0x61c9f2=_0xa9aa1b[_0x1e802c(0x1a0)](_0x5c283e=>String(_0x5c283e));break;case _0x1e802c(0x12e):_0x13ce4c=_0x1ef8e[_0x14bec2]!==''?JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2]):{},_0x38d079[_0x1bf397]={},VisuMZ['ConvertParams'](_0x38d079[_0x1bf397],_0x13ce4c);continue;case'ARRAYSTRUCT':_0xa9aa1b=_0x1ef8e[_0x14bec2]!==''?JSON[_0x1e802c(0x111)](_0x1ef8e[_0x14bec2]):[],_0x61c9f2=_0xa9aa1b[_0x1e802c(0x1a0)](_0x1a47bc=>VisuMZ[_0x1e802c(0x258)]({},JSON[_0x1e802c(0x111)](_0x1a47bc)));break;default:continue;}_0x38d079[_0x1bf397]=_0x61c9f2;}else{const _0x231267=_0x1f09ca(_0x478597['$1']);_0x231267<_0x2fb7e6?(_0x19f83c(_0x1e802c(0xe2)[_0x1e802c(0x1ed)](_0x5df63d,_0x231267,_0x2312ab)),_0x34246d[_0x1e802c(0x1be)]()):_0x318b03=_0x58d197[_0x1e802c(0x112)](_0x231267,_0x41300b);}}}return _0x38d079;},(_0x30376a=>{const _0x474135=_0x4797a7,_0x4b4839=_0x30376a[_0x474135(0xe9)];for(const _0x233221 of dependencies){if(!Imported[_0x233221]){alert(_0x474135(0x172)[_0x474135(0x1ed)](_0x4b4839,_0x233221)),SceneManager[_0x474135(0x1be)]();break;}}const _0x398e77=_0x30376a[_0x474135(0x1af)];if(_0x398e77['match'](/\[Version[ ](.*?)\]/i)){if(_0x474135(0x25e)!=='fkqwn')return _0x40fe0f['MainMenuCore'][_0x474135(0x145)][_0x474135(0x219)][_0x474135(0x11a)]&&_0x35f487[_0x474135(0x273)]()['length']<=0x1;else{const _0x43dcbb=Number(RegExp['$1']);_0x43dcbb!==VisuMZ[label][_0x474135(0x164)]&&(alert(_0x474135(0x163)[_0x474135(0x1ed)](_0x4b4839,_0x43dcbb)),SceneManager[_0x474135(0x1be)]());}}if(_0x398e77[_0x474135(0x241)](/\[Tier[ ](\d+)\]/i)){if(_0x474135(0x23f)!==_0x474135(0x240)){const _0x7363ec=Number(RegExp['$1']);if(_0x7363ec<tier){if(_0x474135(0x19f)!==_0x474135(0xf7))alert(_0x474135(0xe2)[_0x474135(0x1ed)](_0x4b4839,_0x7363ec,tier)),SceneManager[_0x474135(0x1be)]();else return _0x242d6e;}else _0x474135(0x1f9)!==_0x474135(0x202)?tier=Math[_0x474135(0x112)](_0x7363ec,tier):this[_0x474135(0x150)]=new _0x337ccb(0x1,0x1);}else _0x1eb27d[_0x474135(0xef)][_0x474135(0x160)][_0x474135(0x170)](this),this['adjustStatusWindowMobile']();}VisuMZ['ConvertParams'](VisuMZ[label][_0x474135(0x145)],_0x30376a[_0x474135(0x26d)]);})(pluginData),PluginManager[_0x4797a7(0x16a)](pluginData[_0x4797a7(0xe9)],_0x4797a7(0x184),_0x185b3b=>{const _0x3c5cd2=_0x4797a7;VisuMZ['ConvertParams'](_0x185b3b,_0x185b3b);const _0x3ef217=_0x185b3b[_0x3c5cd2(0x135)],_0x3a8bd1=_0x185b3b[_0x3c5cd2(0x243)];for(let _0x276b24 of _0x3ef217){if(_0x3c5cd2(0x171)!==_0x3c5cd2(0x249)){_0x276b24=parseInt(_0x276b24)||0x0;if(_0x276b24<=0x0)continue;const _0x38a71b=$gameActors[_0x3c5cd2(0x205)](_0x276b24);if(!_0x38a71b)continue;_0x38a71b['setMenuImage'](_0x3a8bd1);}else return 0x1;}}),PluginManager[_0x4797a7(0x16a)](pluginData[_0x4797a7(0xe9)],_0x4797a7(0x239),_0x226653=>{const _0x2dde83=_0x4797a7;VisuMZ['ConvertParams'](_0x226653,_0x226653);const _0x1e96cf=_0x226653['Step1End']>=_0x226653[_0x2dde83(0x1c3)]?_0x226653['Step1Start']:_0x226653[_0x2dde83(0xf5)],_0xf94d=_0x226653[_0x2dde83(0xf5)]>=_0x226653[_0x2dde83(0x1c3)]?_0x226653['Step1End']:_0x226653[_0x2dde83(0x1c3)],_0x533d95=Array(_0xf94d-_0x1e96cf+0x1)[_0x2dde83(0x21d)]()[_0x2dde83(0x1a0)]((_0x267a6f,_0x1d5a1a)=>_0x1e96cf+_0x1d5a1a),_0x51fc60=_0x226653[_0x2dde83(0x243)];for(let _0x1c76ad of _0x533d95){_0x1c76ad=parseInt(_0x1c76ad)||0x0;if(_0x1c76ad<=0x0)continue;const _0x271d12=$gameActors[_0x2dde83(0x205)](_0x1c76ad);if(!_0x271d12)continue;_0x271d12[_0x2dde83(0x1cd)](_0x51fc60);}}),PluginManager[_0x4797a7(0x16a)](pluginData['name'],'ChangeActorMenuImageJS',_0x23e188=>{const _0x41c756=_0x4797a7;VisuMZ['ConvertParams'](_0x23e188,_0x23e188);const _0x5db752=_0x23e188['Step1'];let _0x4331ae=[];while(_0x5db752['length']>0x0){const _0x1a7cb4=_0x5db752[_0x41c756(0x204)]();Array[_0x41c756(0x1f3)](_0x1a7cb4)?_0x4331ae=_0x4331ae[_0x41c756(0x23d)](_0x1a7cb4):_0x4331ae[_0x41c756(0x195)](_0x1a7cb4);}const _0x273662=_0x23e188[_0x41c756(0x243)];for(let _0x38f1fa of _0x4331ae){_0x38f1fa=parseInt(_0x38f1fa)||0x0;if(_0x38f1fa<=0x0)continue;const _0x462ae8=$gameActors[_0x41c756(0x205)](_0x38f1fa);if(!_0x462ae8)continue;_0x462ae8[_0x41c756(0x1cd)](_0x273662);}}),VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x185)]=Game_Actor['prototype'][_0x4797a7(0x113)],Game_Actor[_0x4797a7(0x242)]['setup']=function(_0x5df24a){const _0x29edf7=_0x4797a7;VisuMZ[_0x29edf7(0xef)][_0x29edf7(0x185)][_0x29edf7(0x170)](this,_0x5df24a),this[_0x29edf7(0x10f)]();},Game_Actor[_0x4797a7(0x242)][_0x4797a7(0x10f)]=function(){const _0x3ea43=_0x4797a7;this[_0x3ea43(0x237)]='',this[_0x3ea43(0x205)]()&&this[_0x3ea43(0x205)]()['note'][_0x3ea43(0x241)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x3ea43(0x237)]=String(RegExp['$1']));},Game_Actor[_0x4797a7(0x242)][_0x4797a7(0x159)]=function(){const _0x74f269=_0x4797a7;if(this['_menuImage']===undefined)this[_0x74f269(0x10f)]();return this['_menuImage'];},Game_Actor[_0x4797a7(0x242)][_0x4797a7(0x1cd)]=function(_0x35e8d4){const _0x33d4f2=_0x4797a7;if(this[_0x33d4f2(0x237)]===undefined)this[_0x33d4f2(0x10f)]();this[_0x33d4f2(0x237)]=_0x35e8d4;},Game_Actor['prototype'][_0x4797a7(0x20f)]=function(){const _0x4231de=_0x4797a7;if(this[_0x4231de(0x205)]()[_0x4231de(0x236)][_0x4231de(0x241)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x4231de(0x205)]()[_0x4231de(0x236)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x4797a7(0x242)]['getMenuImageOffsetY']=function(){const _0x189175=_0x4797a7;if(this['actor']()[_0x189175(0x236)][_0x189175(0x241)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()[_0x189175(0x236)][_0x189175(0x241)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x189175(0x1c9)===_0x189175(0x198)){if(_0x57ff17[_0x189175(0x212)][_0x189175(0x145)][_0x189175(0xe8)]['PixelateImageRendering']){}}else return Number(RegExp['$2']);}}return 0x0;},Scene_MenuBase[_0x4797a7(0x242)][_0x4797a7(0x175)]=function(){const _0x468fb2=_0x4797a7;return VisuMZ['MainMenuCore']['Settings'][_0x468fb2(0x219)][_0x468fb2(0x264)]['includes'](this[_0x468fb2(0x1d8)][_0x468fb2(0xe9)]);},VisuMZ['MainMenuCore'][_0x4797a7(0x14e)]=Scene_MenuBase[_0x4797a7(0x242)]['createBackground'],Scene_MenuBase[_0x4797a7(0x242)]['createBackground']=function(){const _0x20d9ab=_0x4797a7;VisuMZ[_0x20d9ab(0xef)][_0x20d9ab(0x14e)][_0x20d9ab(0x170)](this),this[_0x20d9ab(0x183)]();},Scene_MenuBase[_0x4797a7(0x242)][_0x4797a7(0x183)]=function(){const _0x46f42d=_0x4797a7;this[_0x46f42d(0x161)]=new Sprite_MenuBackgroundActor(),this[_0x46f42d(0x269)](this[_0x46f42d(0x161)]);},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x22c)]=Scene_MenuBase['prototype']['updateActor'],Scene_MenuBase['prototype']['updateActor']=function(){const _0x57131b=_0x4797a7;VisuMZ[_0x57131b(0xef)][_0x57131b(0x22c)]['call'](this),this[_0x57131b(0x175)]()&&this[_0x57131b(0x161)]&&this['_actorMenuBgSprite'][_0x57131b(0x154)](this[_0x57131b(0xfe)]);},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x1ab)]=Scene_Menu['prototype']['create'],Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x230)]=function(){const _0x430f28=_0x4797a7;VisuMZ['MainMenuCore'][_0x430f28(0x1ab)][_0x430f28(0x170)](this),this[_0x430f28(0xf3)](),this[_0x430f28(0x1f4)](),this[_0x430f28(0x18a)]();},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x130)]=function(){const _0x238aab=_0x4797a7,_0x3a7b45=this[_0x238aab(0x10b)](),_0x52d540=new Window_MenuCommand(_0x3a7b45);_0x52d540[_0x238aab(0x1eb)](_0x238aab(0x1c1),this['popScene'][_0x238aab(0x267)](this)),this[_0x238aab(0x1ad)](_0x52d540),this[_0x238aab(0x1c7)]=_0x52d540;},VisuMZ[_0x4797a7(0xef)]['Scene_Menu_commandWindowRect']=Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x10b)],Scene_Menu['prototype']['commandWindowRect']=function(){const _0xe5ee79=_0x4797a7,_0xc4ae9a=this[_0xe5ee79(0x1e4)]();if(_0xc4ae9a===_0xe5ee79(0x1a7)){if(_0xe5ee79(0x201)===_0xe5ee79(0x201))return this[_0xe5ee79(0x1c6)]();else{_0xf35dd[_0xe5ee79(0xef)][_0xe5ee79(0x199)]['call'](this);if(this[_0xe5ee79(0x1e4)]()===_0xe5ee79(0x1c2))this[_0xe5ee79(0x1e5)][_0xe5ee79(0x156)]();}}else{if(_0xc4ae9a===_0xe5ee79(0x22a)){if(_0xe5ee79(0x17e)==='ZVCmQ'){const _0x52d0ab=_0x33468c['MainMenuCore'][_0xe5ee79(0x145)]['CustomCmdWin'][_0xe5ee79(0x1a4)],_0x5ee2f1=_0xa637bb[_0xe5ee79(0x1c0)],_0x262574=this[_0xe5ee79(0x12c)](0x1,!![]),_0xa460b6=0x0,_0x2e6449=this[_0xe5ee79(0x158)]()-_0x262574;return new _0x27191b(_0xa460b6,_0x2e6449,_0x5ee2f1,_0x262574);}else return this['commandWindowRectThinTopStyle']();}else{if(_0xc4ae9a==='bottom'){if('NMJPN'==='NMJPN')return this['commandWindowRectBottomStyle']();else _0x141514['loadCharacter'](_0x327610[_0xe5ee79(0x14f)]());}else{if(_0xc4ae9a==='thinBottom')return this[_0xe5ee79(0x182)]();else{if(_0xc4ae9a===_0xe5ee79(0x1c2)){if(_0xe5ee79(0x176)===_0xe5ee79(0x176))return this[_0xe5ee79(0x228)]();else{const _0x347cbd=_0x2ab0ee[_0xe5ee79(0x17c)](_0x59950d[_0xe5ee79(0x159)]());_0x347cbd[_0xe5ee79(0x1e9)](this[_0xe5ee79(0x1ba)][_0xe5ee79(0x267)](this,_0x348174,_0x5f4a4c));}}else{if(_0xe5ee79(0x197)!==_0xe5ee79(0x1b8)){const _0x339476=VisuMZ['MainMenuCore'][_0xe5ee79(0x1b4)][_0xe5ee79(0x170)](this);return this['adjustDefaultCommandWindowRect'](_0x339476),_0x339476;}else _0x1e0013[_0xe5ee79(0xef)][_0xe5ee79(0x22c)]['call'](this),this[_0xe5ee79(0x175)]()&&this[_0xe5ee79(0x161)]&&this[_0xe5ee79(0x161)]['setActor'](this['_actor']);}}}}}},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x168)]=function(_0xf530c2){const _0x5020c4=_0x4797a7;if(this[_0x5020c4(0x277)]()){if('PBrnm'===_0x5020c4(0x1b0))_0xf530c2[_0x5020c4(0x188)]-=this[_0x5020c4(0x165)]()[_0x5020c4(0x188)];else for(const _0x5c48ef of _0xce91d1[_0x5020c4(0x142)]){const _0x45c3a9=_0x5c48ef['Symbol'];if(_0x5c48ef[_0x5020c4(0x1ae)][_0x5020c4(0x170)](this)){let _0x1fd187=_0x5c48ef[_0x5020c4(0x26a)];if(['',_0x5020c4(0x1cf)][_0x5020c4(0x24a)](_0x1fd187))_0x1fd187=_0x5c48ef[_0x5020c4(0xf8)]['call'](this);const _0x12a9ae=_0x5c48ef[_0x5020c4(0x1b6)];_0x12a9ae>0x0&&this[_0x5020c4(0x271)]()!==_0x5020c4(0x15e)&&(_0x1fd187=_0x5020c4(0x244)[_0x5020c4(0x1ed)](_0x12a9ae,_0x1fd187));const _0x459c51=_0x5c48ef[_0x5020c4(0xf2)][_0x5020c4(0x170)](this),_0x5221f9=_0x5c48ef['ExtJS'][_0x5020c4(0x170)](this);this[_0x5020c4(0x12a)](_0x1fd187,_0x45c3a9,_0x459c51,_0x5221f9),this[_0x5020c4(0x1eb)](_0x45c3a9,_0x5c48ef[_0x5020c4(0x1f2)][_0x5020c4(0x267)](this,_0x5221f9));}this[_0x5020c4(0x1b7)](_0x45c3a9);}}if(this['adjustCommandHeightByVariable']()){if(_0x5020c4(0xf4)===_0x5020c4(0xf4))_0xf530c2['height']-=this[_0x5020c4(0x15d)]()[_0x5020c4(0x188)];else{const _0x15903b=_0x4b3dcd[_0x5020c4(0xef)][_0x5020c4(0x145)][_0x5020c4(0x1c5)][_0x5020c4(0x1a4)],_0x3b0e2a=_0x59424d[_0x5020c4(0x1c0)],_0xe36376=_0x432df1[_0x5020c4(0x242)][_0x5020c4(0x17a)](_0x15903b),_0x56026d=0x0,_0x152cb7=_0x1fd857[_0x5020c4(0xf9)]((_0x517252[_0x5020c4(0x1d7)]-_0xe36376)/0x2);return new _0x247c59(_0x56026d,_0x152cb7,_0x3b0e2a,_0xe36376);}}},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1c6)]=function(){const _0x172412=_0x4797a7,_0x1a9801=VisuMZ[_0x172412(0xef)][_0x172412(0x145)][_0x172412(0x1c5)][_0x172412(0x1a4)],_0x360aba=Graphics[_0x172412(0x1c0)],_0x333312=this['calcWindowHeight'](_0x1a9801,!![]),_0x7134b=0x0,_0x1dc6d4=this[_0x172412(0x23c)]();return new Rectangle(_0x7134b,_0x1dc6d4,_0x360aba,_0x333312);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x187)]=function(){const _0x4be4fd=_0x4797a7,_0x249c64=VisuMZ[_0x4be4fd(0xef)][_0x4be4fd(0x145)][_0x4be4fd(0x1c5)]['Rows'],_0x480a2f=Graphics[_0x4be4fd(0x1c0)],_0x4a3543=this['calcWindowHeight'](0x1,!![]),_0x9951b5=0x0,_0x5d8ff4=this[_0x4be4fd(0x23c)]();return new Rectangle(_0x9951b5,_0x5d8ff4,_0x480a2f,_0x4a3543);},Scene_Menu[_0x4797a7(0x242)]['commandWindowRectBottomStyle']=function(){const _0x2b521f=_0x4797a7,_0x1fd386=VisuMZ[_0x2b521f(0xef)][_0x2b521f(0x145)]['CustomCmdWin'][_0x2b521f(0x1a4)],_0x1641cb=Graphics[_0x2b521f(0x1c0)],_0x1af1a0=this['calcWindowHeight'](_0x1fd386,!![]),_0x1c7d29=0x0,_0x4c163d=this[_0x2b521f(0x158)]()-_0x1af1a0;return new Rectangle(_0x1c7d29,_0x4c163d,_0x1641cb,_0x1af1a0);},Scene_Menu[_0x4797a7(0x242)]['commandWindowRectThinBottomStyle']=function(){const _0x21314d=_0x4797a7,_0x426fc2=VisuMZ[_0x21314d(0xef)][_0x21314d(0x145)][_0x21314d(0x1c5)][_0x21314d(0x1a4)],_0xd66d09=Graphics[_0x21314d(0x1c0)],_0xeb6c12=this['calcWindowHeight'](0x1,!![]),_0x4fbb09=0x0,_0x294f49=this['mainAreaBottom']()-_0xeb6c12;return new Rectangle(_0x4fbb09,_0x294f49,_0xd66d09,_0xeb6c12);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x228)]=function(){const _0x19ee6d=_0x4797a7,_0x219b7f=VisuMZ[_0x19ee6d(0xef)]['Settings'][_0x19ee6d(0x1c5)][_0x19ee6d(0x1a4)],_0x416a30=Graphics['boxWidth'],_0x1f1458=Window_MenuCommand[_0x19ee6d(0x242)][_0x19ee6d(0x17a)](_0x219b7f),_0x46bda1=0x0,_0x1e1d35=Math['round']((Graphics[_0x19ee6d(0x1d7)]-_0x1f1458)/0x2);return new Rectangle(_0x46bda1,_0x1e1d35,_0x416a30,_0x1f1458);},Scene_Menu[_0x4797a7(0x242)]['commandWindowStyle']=function(){const _0x25f786=_0x4797a7;return VisuMZ['MainMenuCore']['Settings'][_0x25f786(0x1a3)];},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1f8)]=function(){const _0x2ecf3f=_0x4797a7;if(this[_0x2ecf3f(0x1e4)]()!=='default')return!![];return VisuMZ[_0x2ecf3f(0xef)][_0x2ecf3f(0x145)]['General'][_0x2ecf3f(0x210)];},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x15b)]=function(){const _0x781f24=_0x4797a7,_0x3364c5=this[_0x781f24(0x217)]();this[_0x781f24(0x15a)]=this['thinGoldWindow']()?new Window_ThinGold(_0x3364c5):new Window_Gold(_0x3364c5),this['addWindow'](this[_0x781f24(0x15a)]);},VisuMZ['MainMenuCore'][_0x4797a7(0x1ec)]=Scene_Menu['prototype']['goldWindowRect'],Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x217)]=function(){const _0x431ce7=_0x4797a7,_0x5191c5=this[_0x431ce7(0x1e4)]();if([_0x431ce7(0x1a7),'thinTop',_0x431ce7(0x1c2)]['includes'](_0x5191c5))return this[_0x431ce7(0x16d)]();else{if([_0x431ce7(0x134),_0x431ce7(0x1d3)][_0x431ce7(0x24a)](_0x5191c5)){if('xBNJk'!=='xBNJk'){const _0x248f5b=this[_0x431ce7(0x1e4)]();if([_0x431ce7(0x1a7),'thinTop',_0x431ce7(0x1c2)][_0x431ce7(0x24a)](_0x248f5b))return this[_0x431ce7(0x16d)]();else{if([_0x431ce7(0x134),_0x431ce7(0x1d3)][_0x431ce7(0x24a)](_0x248f5b))return this[_0x431ce7(0x1e2)]();else{const _0x33a525=_0x173b12[_0x431ce7(0xef)][_0x431ce7(0x1ec)][_0x431ce7(0x170)](this);return this[_0x431ce7(0x200)](_0x33a525),_0x33a525;}}}else return this[_0x431ce7(0x1e2)]();}else{const _0x481ab0=VisuMZ[_0x431ce7(0xef)][_0x431ce7(0x1ec)][_0x431ce7(0x170)](this);return this[_0x431ce7(0x200)](_0x481ab0),_0x481ab0;}}},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x200)]=function(_0x2f7845){const _0x54ab26=_0x4797a7;if(this['thinGoldWindow']()){if(VisuMZ[_0x54ab26(0xef)]['Settings']['General'][_0x54ab26(0x151)]){const _0x718ab7=_0x2f7845[_0x54ab26(0x188)]-this[_0x54ab26(0x12c)](0x1,![]);_0x2f7845['y']+=_0x718ab7;}VisuMZ[_0x54ab26(0xef)][_0x54ab26(0x145)][_0x54ab26(0x219)][_0x54ab26(0xed)]&&(_0x2f7845[_0x54ab26(0x188)]=this[_0x54ab26(0x12c)](0x1,![]));}},Scene_Menu[_0x4797a7(0x242)]['goldWindowRectTopStyle']=function(){const _0x421fac=_0x4797a7,_0x227f23=this[_0x421fac(0x133)](),_0x1e9e6b=this[_0x421fac(0x12c)](0x1,![]),_0x68b33a=Graphics[_0x421fac(0x1c0)]-_0x227f23,_0x53f6ff=this[_0x421fac(0x158)]()-_0x1e9e6b;return new Rectangle(_0x68b33a,_0x53f6ff,_0x227f23,_0x1e9e6b);},Scene_Menu['prototype'][_0x4797a7(0x1e2)]=function(){const _0x4be462=_0x4797a7,_0x58aa45=this['mainCommandWidth'](),_0x44180a=this[_0x4be462(0x12c)](0x1,![]),_0x1f804b=Graphics[_0x4be462(0x1c0)]-_0x58aa45,_0xf4c608=this[_0x4be462(0x23c)]();return new Rectangle(_0x1f804b,_0xf4c608,_0x58aa45,_0x44180a);},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x160)]=Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x14c)],Scene_Menu['prototype'][_0x4797a7(0x14c)]=function(){const _0x31c435=_0x4797a7;VisuMZ[_0x31c435(0xef)][_0x31c435(0x160)][_0x31c435(0x170)](this),this[_0x31c435(0xfc)]();},Scene_Menu['prototype'][_0x4797a7(0xfc)]=function(){const _0x3fcd75=_0x4797a7;this[_0x3fcd75(0x1e4)]()===_0x3fcd75(0x1c2)&&(this[_0x3fcd75(0x1e5)][_0x3fcd75(0x14b)]=0x0);},VisuMZ['MainMenuCore'][_0x4797a7(0x206)]=Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x207)],Scene_Menu['prototype'][_0x4797a7(0x207)]=function(){const _0x56142d=_0x4797a7,_0xf7d27f=this[_0x56142d(0x1e4)]();if([_0x56142d(0x1a7),_0x56142d(0x22a)][_0x56142d(0x24a)](_0xf7d27f))return this[_0x56142d(0xe4)]();else{if([_0x56142d(0x134),'thinBottom'][_0x56142d(0x24a)](_0xf7d27f)){if(_0x56142d(0x1ee)==='sbQwv')return this['statusWindowRectBottomStyle']();else{if(!this['needsDummyWindow']())return;const _0x3b134d=this[_0x56142d(0x15d)]();this[_0x56142d(0x194)]=new _0x1fea10(_0x3b134d),this['_dummyWindow'][_0x56142d(0x177)](_0x7be2f2[_0x56142d(0xef)][_0x56142d(0x145)]['Variable'][_0x56142d(0x24e)]),this[_0x56142d(0x1ad)](this[_0x56142d(0x194)]);}}else{if(_0xf7d27f===_0x56142d(0x1c2))return this['statusWindowRectMobileStyle']();else{if(_0x56142d(0x26c)!==_0x56142d(0x26c))this[_0x56142d(0x161)]=new _0xc535b6(),this['addChild'](this[_0x56142d(0x161)]);else return VisuMZ[_0x56142d(0xef)][_0x56142d(0x206)][_0x56142d(0x170)](this);}}}},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0xe4)]=function(){const _0x1403b8=_0x4797a7,_0x3c3b23=Graphics[_0x1403b8(0x1c0)],_0x3a161f=this[_0x1403b8(0xfa)]()-this[_0x1403b8(0x1c7)][_0x1403b8(0x188)]-this[_0x1403b8(0x15a)][_0x1403b8(0x188)],_0x3defd3=0x0,_0xadab89=this[_0x1403b8(0x1c7)]['y']+this['_commandWindow'][_0x1403b8(0x188)];return new Rectangle(_0x3defd3,_0xadab89,_0x3c3b23,_0x3a161f);},Scene_Menu[_0x4797a7(0x242)]['statusWindowRectBottomStyle']=function(){const _0x566a66=_0x4797a7,_0x14e003=Graphics[_0x566a66(0x1c0)],_0x162dc2=this['mainAreaHeight']()-this[_0x566a66(0x1c7)][_0x566a66(0x188)]-this['_goldWindow'][_0x566a66(0x188)],_0x5e2bcf=0x0,_0x314c3c=this['_goldWindow']['y']+this[_0x566a66(0x15a)][_0x566a66(0x188)];return new Rectangle(_0x5e2bcf,_0x314c3c,_0x14e003,_0x162dc2);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x19a)]=function(){const _0x447152=_0x4797a7,_0x12eb58=Graphics[_0x447152(0x1c0)],_0x24fa8f=this[_0x447152(0xfa)]()-this[_0x447152(0x15a)][_0x447152(0x188)],_0x329110=0x0,_0x21dc12=this[_0x447152(0x158)]()-this[_0x447152(0x15a)]['height']-_0x24fa8f;return new Rectangle(_0x329110,_0x21dc12,_0x12eb58,_0x24fa8f);},Scene_Menu['prototype'][_0x4797a7(0xf3)]=function(){const _0x5a64b5=_0x4797a7;if(!this[_0x5a64b5(0x1e3)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x5a2bec=this[_0x5a64b5(0x165)]();this[_0x5a64b5(0x189)]=new Window_Playtime(_0x5a2bec),this[_0x5a64b5(0x189)][_0x5a64b5(0x177)](VisuMZ[_0x5a64b5(0xef)][_0x5a64b5(0x145)]['Playtime'][_0x5a64b5(0x24e)]),this[_0x5a64b5(0x1ad)](this[_0x5a64b5(0x189)]);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1e3)]=function(){const _0x27e1b6=_0x4797a7;return VisuMZ['MainMenuCore'][_0x27e1b6(0x145)][_0x27e1b6(0x107)][_0x27e1b6(0x1c8)];},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x277)]=function(){const _0x5e66b2=_0x4797a7;return this[_0x5e66b2(0x1e3)]()&&(VisuMZ[_0x5e66b2(0xef)][_0x5e66b2(0x145)][_0x5e66b2(0x107)][_0x5e66b2(0x1df)]??!![]);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x165)]=function(){const _0x47056b=_0x4797a7,_0x229c4d=this[_0x47056b(0x1e4)]();if([_0x47056b(0x1a7),_0x47056b(0x22a),_0x47056b(0x1c2)]['includes'](_0x229c4d))return this['playtimeWindowRectTopStyle']();else{if([_0x47056b(0x134),'thinBottom']['includes'](_0x229c4d))return this[_0x47056b(0x126)]();else{if(_0x47056b(0x1bd)==='SUmlF')this['drawItemStyleIconText'](_0x135820);else return VisuMZ[_0x47056b(0xef)][_0x47056b(0x145)][_0x47056b(0x107)]['WindowRect']['call'](this);}}},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x233)]=function(){const _0x17a247=_0x4797a7,_0x426b76=this[_0x17a247(0x133)](),_0x4d99be=this[_0x17a247(0x12c)](0x1,![]),_0x51d64f=0x0,_0x3f0245=this['mainAreaBottom']()-_0x4d99be;return new Rectangle(_0x51d64f,_0x3f0245,_0x426b76,_0x4d99be);},Scene_Menu[_0x4797a7(0x242)]['playtimeWindowRectBottomStyle']=function(){const _0x502192=_0x4797a7,_0x4c5dd2=this[_0x502192(0x133)](),_0x19dcdb=this[_0x502192(0x12c)](0x1,![]),_0x472632=0x0,_0x376a59=this[_0x502192(0x23c)]();return new Rectangle(_0x472632,_0x376a59,_0x4c5dd2,_0x19dcdb);},Scene_Menu[_0x4797a7(0x242)]['createVariableWindow']=function(){const _0x27f7e6=_0x4797a7;if(!this[_0x27f7e6(0x24d)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x40da97=this[_0x27f7e6(0x15d)]();this[_0x27f7e6(0x19b)]=new Window_MenuVariables(_0x40da97),this[_0x27f7e6(0x19b)][_0x27f7e6(0x177)](VisuMZ[_0x27f7e6(0xef)][_0x27f7e6(0x145)]['Variable'][_0x27f7e6(0x24e)]),this['addWindow'](this[_0x27f7e6(0x19b)]);},Scene_Menu[_0x4797a7(0x242)]['canCreateVariableWindow']=function(){const _0x513739=_0x4797a7;return VisuMZ[_0x513739(0xef)][_0x513739(0x145)]['Variable']['Enable'];},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x20b)]=function(){const _0x4c7b90=_0x4797a7;return this['canCreateVariableWindow']()&&(VisuMZ[_0x4c7b90(0xef)][_0x4c7b90(0x145)][_0x4c7b90(0x248)][_0x4c7b90(0x1df)]??!![]);},Scene_Menu[_0x4797a7(0x242)]['variableWindowRect']=function(){const _0x1a02c8=_0x4797a7,_0x3e8fd8=this[_0x1a02c8(0x1e4)]();if([_0x1a02c8(0x1a7),_0x1a02c8(0x22a),_0x1a02c8(0x1c2)][_0x1a02c8(0x24a)](_0x3e8fd8))return this['variableWindowRectTopStyle']();else{if([_0x1a02c8(0x134),_0x1a02c8(0x1d3)][_0x1a02c8(0x24a)](_0x3e8fd8))return this['variableWindowRectBottomStyle']();else{if(_0x1a02c8(0x11d)!==_0x1a02c8(0x218))return VisuMZ[_0x1a02c8(0xef)][_0x1a02c8(0x145)][_0x1a02c8(0x248)][_0x1a02c8(0xea)][_0x1a02c8(0x170)](this);else this[_0x1a02c8(0x1e7)](_0x5d8a17[_0x1a02c8(0x24b)]());}}},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1fd)]=function(){const _0x3d3ef4=_0x4797a7,_0x4d60e0=Graphics['boxWidth']-this['_goldWindow'][_0x3d3ef4(0xec)]-(this[_0x3d3ef4(0x189)]?this[_0x3d3ef4(0x189)][_0x3d3ef4(0xec)]:0x0),_0xcc981a=this['calcWindowHeight'](0x1,![]),_0x16a60c=this[_0x3d3ef4(0x15a)]['x']-_0x4d60e0,_0x37e04e=this[_0x3d3ef4(0x158)]()-_0xcc981a;return new Rectangle(_0x16a60c,_0x37e04e,_0x4d60e0,_0xcc981a);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1ef)]=function(){const _0x5182f7=_0x4797a7,_0x341340=Graphics[_0x5182f7(0x1c0)]-this['_goldWindow'][_0x5182f7(0xec)]-(this[_0x5182f7(0x189)]?this[_0x5182f7(0x189)][_0x5182f7(0xec)]:0x0),_0x5277cb=this[_0x5182f7(0x12c)](0x1,![]),_0x1e9a2a=this[_0x5182f7(0x15a)]['x']-_0x341340,_0x4c207e=this[_0x5182f7(0x23c)]();return new Rectangle(_0x1e9a2a,_0x4c207e,_0x341340,_0x5277cb);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x18a)]=function(){const _0x33ccab=_0x4797a7;if(!this[_0x33ccab(0x20c)]())return;const _0x50a268=this[_0x33ccab(0x15d)]();this[_0x33ccab(0x194)]=new Window_Base(_0x50a268),this[_0x33ccab(0x194)][_0x33ccab(0x177)](VisuMZ[_0x33ccab(0xef)]['Settings'][_0x33ccab(0x248)][_0x33ccab(0x24e)]),this[_0x33ccab(0x1ad)](this[_0x33ccab(0x194)]);},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x20c)]=function(){const _0x22fd58=_0x4797a7;if([_0x22fd58(0x1d6),_0x22fd58(0x1c2)][_0x22fd58(0x24a)](this[_0x22fd58(0x1e4)]()))return![];if(this['_variableWindow'])return![];return!![];},VisuMZ['MainMenuCore']['Scene_Menu_commandPersonal']=Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x208)],Scene_Menu[_0x4797a7(0x242)]['commandPersonal']=function(){const _0x1989eb=_0x4797a7;if(this[_0x1989eb(0x20a)]()&&this['_statusWindow'])$gameParty[_0x1989eb(0x1d4)]($gameParty[_0x1989eb(0x273)]()[0x0]),this[_0x1989eb(0x10c)]();else{if(this['commandWindowStyle']()===_0x1989eb(0x1c2))this[_0x1989eb(0x1e5)][_0x1989eb(0x1e8)]();VisuMZ[_0x1989eb(0xef)][_0x1989eb(0x1a2)][_0x1989eb(0x170)](this);}},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x20a)]=function(){const _0x118fbd=_0x4797a7;return VisuMZ[_0x118fbd(0xef)][_0x118fbd(0x145)][_0x118fbd(0x219)][_0x118fbd(0x11a)]&&$gameParty[_0x118fbd(0x273)]()[_0x118fbd(0x234)]<=0x1;},Scene_Menu['prototype'][_0x4797a7(0x10c)]=function(){const _0x31ffa4=_0x4797a7,_0x2e0672=this[_0x31ffa4(0x1c7)][_0x31ffa4(0x256)](),_0x81a9c7=this['_commandWindow'][_0x31ffa4(0x1db)]();for(const _0x265a51 of Window_MenuCommand[_0x31ffa4(0x142)]){if(_0x265a51['Symbol']===_0x2e0672){if(_0x31ffa4(0x114)===_0x31ffa4(0x114)){_0x265a51[_0x31ffa4(0x19c)]['call'](this,_0x81a9c7);return;}else _0x4b7574[_0x31ffa4(0x188)]-=this[_0x31ffa4(0x165)]()[_0x31ffa4(0x188)];}}},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x24f)]=Scene_Menu[_0x4797a7(0x242)]['onPersonalCancel'],Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0xe5)]=function(){const _0x33eaf6=_0x4797a7;VisuMZ[_0x33eaf6(0xef)][_0x33eaf6(0x24f)][_0x33eaf6(0x170)](this);if(this[_0x33eaf6(0x1e4)]()===_0x33eaf6(0x1c2))this[_0x33eaf6(0x1e5)][_0x33eaf6(0x156)]();},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x18c)]=function(){const _0x3f4c8c=_0x4797a7,_0x2abc5c=parseInt(this[_0x3f4c8c(0x1c7)][_0x3f4c8c(0x1db)]());_0x2abc5c?($gameTemp[_0x3f4c8c(0x196)](_0x2abc5c),this[_0x3f4c8c(0x13d)]()):this[_0x3f4c8c(0x1c7)]['activate']();},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x1f5)]=Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1a1)],Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1a1)]=function(){const _0x1750cc=_0x4797a7;VisuMZ[_0x1750cc(0xef)][_0x1750cc(0x1f5)][_0x1750cc(0x170)](this);if(this[_0x1750cc(0x1e4)]()===_0x1750cc(0x1c2))this[_0x1750cc(0x1e5)]['open']();},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x199)]=Scene_Menu[_0x4797a7(0x242)]['onFormationCancel'],Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x1cc)]=function(){const _0xe8a2a7=_0x4797a7;VisuMZ[_0xe8a2a7(0xef)][_0xe8a2a7(0x199)][_0xe8a2a7(0x170)](this);if(this['commandWindowStyle']()==='mobile')this[_0xe8a2a7(0x1e5)][_0xe8a2a7(0x156)]();},Scene_Menu[_0x4797a7(0x242)][_0x4797a7(0x238)]=function(){const _0x4c82f8=_0x4797a7;SceneManager[_0x4c82f8(0x195)](Scene_Load);};function Sprite_MenuBackgroundActor(){const _0x2fe6eb=_0x4797a7;this[_0x2fe6eb(0x129)](...arguments);}Sprite_MenuBackgroundActor[_0x4797a7(0x242)]=Object[_0x4797a7(0x230)](Sprite[_0x4797a7(0x242)]),Sprite_MenuBackgroundActor[_0x4797a7(0x242)][_0x4797a7(0x1d8)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x4797a7(0x242)]['initialize']=function(){const _0x9df71a=_0x4797a7;this[_0x9df71a(0xfe)]=null,this[_0x9df71a(0x1a5)]=![],Sprite[_0x9df71a(0x242)]['initialize']['call'](this),this['x']=Graphics[_0x9df71a(0xec)];},Sprite_MenuBackgroundActor['prototype']['setActor']=function(_0x32270f){const _0x56b174=_0x4797a7;this['_actor']!==_0x32270f&&(_0x56b174(0x20d)===_0x56b174(0x13a)?this['drawItemStyleIcon'](_0x362c7d):(this[_0x56b174(0xfe)]=_0x32270f,this[_0x56b174(0x23a)]()));},Sprite_MenuBackgroundActor[_0x4797a7(0x242)][_0x4797a7(0x23a)]=function(){const _0x165933=_0x4797a7;this[_0x165933(0x1a5)]=![],this[_0x165933(0xfe)]?(this[_0x165933(0x150)]=ImageManager[_0x165933(0x17c)](this[_0x165933(0xfe)]['getMenuImage']()),this[_0x165933(0x150)]['addLoadListener'](this[_0x165933(0x231)][_0x165933(0x267)](this))):this[_0x165933(0x150)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor['prototype'][_0x4797a7(0x231)]=function(){const _0xe636f0=_0x4797a7;this[_0xe636f0(0x1a5)]=!![],VisuMZ[_0xe636f0(0xef)]['Settings']['General'][_0xe636f0(0x10e)][_0xe636f0(0x170)](this);},Sprite_MenuBackgroundActor[_0x4797a7(0x242)][_0x4797a7(0x19d)]=function(){const _0x1e37a3=_0x4797a7;Sprite['prototype'][_0x1e37a3(0x19d)][_0x1e37a3(0x170)](this),this['_bitmapReady']&&(_0x1e37a3(0x247)!==_0x1e37a3(0x279)?(this[_0x1e37a3(0x1f0)](),this[_0x1e37a3(0x141)](),this[_0x1e37a3(0x25d)]()):_0x2eba17[_0x1e37a3(0x195)](_0xa58268));},Sprite_MenuBackgroundActor[_0x4797a7(0x242)][_0x4797a7(0x1f0)]=function(){const _0x219858=_0x4797a7;if(this[_0x219858(0x116)]>0x0){if(_0x219858(0x110)===_0x219858(0x18d)){const _0x42b0f1=_0x75712e[_0x219858(0xe7)];if(_0x4be373[_0x219858(0x1ae)]['call'](this)){let _0x275c0f=_0x2a9a42[_0x219858(0x26a)];if(['',_0x219858(0x1cf)][_0x219858(0x24a)](_0x275c0f))_0x275c0f=_0x3396aa['TextJS'][_0x219858(0x170)](this);const _0x16d391=_0xbb3306[_0x219858(0x1b6)];_0x16d391>0x0&&this[_0x219858(0x271)]()!=='text'&&(_0x275c0f=_0x219858(0x244)['format'](_0x16d391,_0x275c0f));const _0x58a1f8=_0x264184[_0x219858(0xf2)][_0x219858(0x170)](this),_0x3280c4=_0x5c55e7[_0x219858(0x13b)][_0x219858(0x170)](this);this[_0x219858(0x12a)](_0x275c0f,_0x42b0f1,_0x58a1f8,_0x3280c4),this[_0x219858(0x1eb)](_0x42b0f1,_0x88e7bd[_0x219858(0x1f2)][_0x219858(0x267)](this,_0x3280c4));}this['addSymbolBridge'](_0x42b0f1);}else{const _0x3973ba=this[_0x219858(0x116)];this[_0x219858(0x109)]=(this[_0x219858(0x109)]*(_0x3973ba-0x1)+0xff)/_0x3973ba;}}},Sprite_MenuBackgroundActor[_0x4797a7(0x242)][_0x4797a7(0x141)]=function(){const _0x45dd05=_0x4797a7;if(this[_0x45dd05(0x116)]>0x0){const _0x35b09b=this[_0x45dd05(0x116)];this['x']=(this['x']*(_0x35b09b-0x1)+this[_0x45dd05(0x12d)])/_0x35b09b,this['y']=(this['y']*(_0x35b09b-0x1)+this[_0x45dd05(0x17b)])/_0x35b09b;}},Sprite_MenuBackgroundActor[_0x4797a7(0x242)]['updateDuration']=function(){const _0xaa6ba1=_0x4797a7;if(this[_0xaa6ba1(0x116)]>0x0)this[_0xaa6ba1(0x116)]--;},ImageManager['svActorHorzCells']=ImageManager[_0x4797a7(0x17d)]||0x9,ImageManager[_0x4797a7(0x1d5)]=ImageManager[_0x4797a7(0x1d5)]||0x6,Window_Base['prototype'][_0x4797a7(0x21b)]=function(_0x2a5a84,_0x292cc7,_0x3d1641){const _0x55aeb7=_0x4797a7,_0x109f8e=ImageManager[_0x55aeb7(0x222)](_0x2a5a84),_0xeea528=_0x109f8e[_0x55aeb7(0xec)]/ImageManager[_0x55aeb7(0x17d)],_0x5ecee4=_0x109f8e[_0x55aeb7(0x188)]/ImageManager['svActorVertCells'],_0x2e7466=0x0,_0x172ae1=0x0;this[_0x55aeb7(0x245)]['blt'](_0x109f8e,_0x2e7466,_0x172ae1,_0xeea528,_0x5ecee4,_0x292cc7-_0xeea528/0x2,_0x3d1641-_0x5ecee4);},Window_MenuCommand[_0x4797a7(0x142)]=VisuMZ['MainMenuCore'][_0x4797a7(0x145)]['CommandList'],VisuMZ[_0x4797a7(0xef)]['Window_MenuCommand_initialize']=Window_MenuCommand['prototype']['initialize'],Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x129)]=function(_0x46e8f1){const _0x1205a2=_0x4797a7;VisuMZ[_0x1205a2(0xef)][_0x1205a2(0x153)][_0x1205a2(0x170)](this,_0x46e8f1),this['createCommandNameWindow'](_0x46e8f1);},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x174)]=function(_0x3a0186){const _0x216ad0=_0x4797a7,_0x5e9acc=new Rectangle(0x0,0x0,_0x3a0186['width'],_0x3a0186['height']);this[_0x216ad0(0x120)]=new Window_Base(_0x5e9acc),this[_0x216ad0(0x120)][_0x216ad0(0x109)]=0x0,this[_0x216ad0(0x269)](this[_0x216ad0(0x120)]),this[_0x216ad0(0x1a9)]();},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x272)]=function(){const _0x3331e3=_0x4797a7;Window_HorzCommand[_0x3331e3(0x242)]['callUpdateHelp']['call'](this);if(this[_0x3331e3(0x120)])this['updateCommandNameWindow']();},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x1a9)]=function(){const _0x1ce1ce=_0x4797a7,_0x5d4d5a=this[_0x1ce1ce(0x120)];_0x5d4d5a[_0x1ce1ce(0x245)][_0x1ce1ce(0x18e)]();const _0x74fd04=this['commandStyleCheck'](this[_0x1ce1ce(0x22e)]());if(_0x74fd04===_0x1ce1ce(0x125)){const _0x9e2fbc=this[_0x1ce1ce(0x225)](this['index']());let _0x86e9ae=this[_0x1ce1ce(0x21c)](this[_0x1ce1ce(0x22e)]());_0x86e9ae=_0x86e9ae['replace'](/\\I\[(\d+)\]/gi,''),_0x5d4d5a[_0x1ce1ce(0x117)](),this[_0x1ce1ce(0x229)](_0x86e9ae,_0x9e2fbc),this['commandNameWindowDrawText'](_0x86e9ae,_0x9e2fbc),this['commandNameWindowCenter'](_0x86e9ae,_0x9e2fbc);}},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x229)]=function(_0x254a4b,_0x4db1d9){},Window_MenuCommand['prototype']['commandNameWindowDrawText']=function(_0x7fbc49,_0x1ce420){const _0xa30f21=_0x4797a7,_0x5c0f74=this[_0xa30f21(0x120)];_0x5c0f74[_0xa30f21(0x121)](_0x7fbc49,0x0,_0x1ce420['y'],_0x5c0f74[_0xa30f21(0xfb)],_0xa30f21(0x221));},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x15c)]=function(_0x51325c,_0x4f3dee){const _0x2e3a7d=_0x4797a7,_0x2cad2e=this[_0x2e3a7d(0x120)],_0x57617d=$gameSystem[_0x2e3a7d(0x278)](),_0x50a2e8=_0x4f3dee['x']+Math['floor'](_0x4f3dee[_0x2e3a7d(0xec)]/0x2)+_0x57617d;_0x2cad2e['x']=_0x2cad2e[_0x2e3a7d(0xec)]/-0x2+_0x50a2e8,_0x2cad2e['y']=Math[_0x2e3a7d(0x106)](_0x4f3dee[_0x2e3a7d(0x188)]/0x4);},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x214)]=function(){const _0x3606a0=_0x4797a7,_0x52f59f=SceneManager[_0x3606a0(0x148)][_0x3606a0(0x1e4)]();if(_0x52f59f===_0x3606a0(0x1c2)){if(_0x3606a0(0x1cb)==='xgouO'){const _0x46d157=VisuMZ['MainMenuCore'][_0x3606a0(0x145)][_0x3606a0(0x1c5)][_0x3606a0(0x193)];return this[_0x3606a0(0xf6)]()*_0x46d157+0x8;}else return _0x163528[_0x3606a0(0xef)][_0x3606a0(0x145)][_0x3606a0(0x107)][_0x3606a0(0x1c8)];}else return Window_Command[_0x3606a0(0x242)][_0x3606a0(0x214)][_0x3606a0(0x170)](this);},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x263)]=function(){const _0x4450c5=_0x4797a7;this[_0x4450c5(0x220)]();},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x220)]=function(){const _0x4d28f1=_0x4797a7;for(const _0x7861ac of Window_MenuCommand['_commandList']){if(_0x4d28f1(0x246)!==_0x4d28f1(0x178)){const _0x4811e9=_0x7861ac[_0x4d28f1(0xe7)];if(_0x7861ac[_0x4d28f1(0x1ae)][_0x4d28f1(0x170)](this)){let _0x2503b4=_0x7861ac['TextStr'];if(['',_0x4d28f1(0x1cf)][_0x4d28f1(0x24a)](_0x2503b4))_0x2503b4=_0x7861ac[_0x4d28f1(0xf8)][_0x4d28f1(0x170)](this);const _0x221b58=_0x7861ac[_0x4d28f1(0x1b6)];_0x221b58>0x0&&this[_0x4d28f1(0x271)]()!==_0x4d28f1(0x15e)&&('hxVkT'!==_0x4d28f1(0x181)?_0x2503b4='\x5cI[%1]%2'[_0x4d28f1(0x1ed)](_0x221b58,_0x2503b4):_0x10b2a5[_0x4d28f1(0xef)][_0x4d28f1(0x145)]['ListStyles'][_0x4d28f1(0x1bc)][_0x4d28f1(0x170)](this,_0x199b5d,_0x22d676));const _0x4233b9=_0x7861ac['EnableJS']['call'](this),_0x57c94f=_0x7861ac[_0x4d28f1(0x13b)][_0x4d28f1(0x170)](this);this[_0x4d28f1(0x12a)](_0x2503b4,_0x4811e9,_0x4233b9,_0x57c94f),this[_0x4d28f1(0x1eb)](_0x4811e9,_0x7861ac[_0x4d28f1(0x1f2)][_0x4d28f1(0x267)](this,_0x57c94f));}this[_0x4d28f1(0x1b7)](_0x4811e9);}else{if(_0x2c7e27[_0x4d28f1(0x213)])return _0x5595d9[_0x4d28f1(0x1d8)]===_0x277fc4;return!![];}}},Window_MenuCommand['prototype'][_0x4797a7(0x1b7)]=function(_0x123ab1){const _0x3e8ad8=_0x4797a7;switch(_0x123ab1){case _0x3e8ad8(0x1e6):this[_0x3e8ad8(0x16c)]();break;case _0x3e8ad8(0x211):this[_0x3e8ad8(0x1b9)](),this[_0x3e8ad8(0x261)]();break;case _0x3e8ad8(0x1f6):this[_0x3e8ad8(0x102)]();break;case _0x3e8ad8(0x1e0):this[_0x3e8ad8(0x14d)]();break;case _0x3e8ad8(0x259):this[_0x3e8ad8(0x1d0)]();break;}},Window_MenuCommand['prototype']['addMainCommands']=function(){},Window_MenuCommand['prototype'][_0x4797a7(0x1b9)]=function(){},Window_MenuCommand['prototype'][_0x4797a7(0x261)]=function(){},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x102)]=function(){},Window_MenuCommand[_0x4797a7(0x242)]['addSaveCommand']=function(){},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x1d0)]=function(){},Window_MenuCommand[_0x4797a7(0x242)]['maxCols']=function(){const _0x332e80=_0x4797a7,_0x31a3f7=SceneManager[_0x332e80(0x148)][_0x332e80(0x1e4)]();if([_0x332e80(0x22a),_0x332e80(0x1d3)][_0x332e80(0x24a)](_0x31a3f7))return this['_list']?this[_0x332e80(0x1f1)]():0x4;else{if(_0x31a3f7!=='default')return VisuMZ[_0x332e80(0xef)][_0x332e80(0x145)]['CustomCmdWin'][_0x332e80(0x262)];else{if(_0x332e80(0xf0)===_0x332e80(0xf0))return Window_Command['prototype'][_0x332e80(0x1e1)]['call'](this);else this['initialize'](...arguments);}}},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x180)]=function(){const _0x1cb6cd=_0x4797a7;return VisuMZ[_0x1cb6cd(0xef)][_0x1cb6cd(0x145)][_0x1cb6cd(0x1c5)][_0x1cb6cd(0x11f)];},Window_MenuCommand['prototype'][_0x4797a7(0x250)]=function(_0x51b7cc){const _0xc69e5b=_0x4797a7,_0x592650=this['commandStyleCheck'](_0x51b7cc);if(_0x592650===_0xc69e5b(0x23e)){if('cephz'!==_0xc69e5b(0x147))this[_0xc69e5b(0x1ff)](_0x51b7cc);else return _0xc69e5b(0x125);}else _0x592650===_0xc69e5b(0x125)?this['drawItemStyleIcon'](_0x51b7cc):Window_Command[_0xc69e5b(0x242)]['drawItem'][_0xc69e5b(0x170)](this,_0x51b7cc);},Window_MenuCommand['prototype'][_0x4797a7(0x271)]=function(){const _0x5ed0fb=_0x4797a7;return VisuMZ[_0x5ed0fb(0xef)][_0x5ed0fb(0x145)][_0x5ed0fb(0x1c5)][_0x5ed0fb(0x1dd)];},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x152)]=function(_0x224b7c){const _0x34c84a=_0x4797a7,_0x9d8b07=this['commandStyle']();if(_0x9d8b07!==_0x34c84a(0x1fb))return _0x9d8b07;else{if('OVtwl'===_0x34c84a(0x26f)){const _0x527afd=this[_0x34c84a(0x225)](this[_0x34c84a(0x22e)]());let _0x14144f=this[_0x34c84a(0x21c)](this[_0x34c84a(0x22e)]());_0x14144f=_0x14144f[_0x34c84a(0xe6)](/\\I\[(\d+)\]/gi,''),_0x439e53[_0x34c84a(0x117)](),this[_0x34c84a(0x229)](_0x14144f,_0x527afd),this['commandNameWindowDrawText'](_0x14144f,_0x527afd),this['commandNameWindowCenter'](_0x14144f,_0x527afd);}else{const _0x43b979=this[_0x34c84a(0x21c)](_0x224b7c);if(_0x43b979[_0x34c84a(0x241)](/\\I\[(\d+)\]/i)){const _0x22231b=this['itemLineRect'](_0x224b7c),_0x20c399=this[_0x34c84a(0x25b)](_0x43b979)[_0x34c84a(0xec)];if(_0x20c399<=_0x22231b[_0x34c84a(0xec)]){if('JavtN'===_0x34c84a(0x266)){const _0x1fa457=_0x1ec259['boxWidth']-this[_0x34c84a(0x15a)][_0x34c84a(0xec)]-(this[_0x34c84a(0x189)]?this['_playtimeWindow'][_0x34c84a(0xec)]:0x0),_0x2edc32=this[_0x34c84a(0x12c)](0x1,![]),_0x4b7445=this[_0x34c84a(0x15a)]['x']-_0x1fa457,_0x37a0f7=this[_0x34c84a(0x23c)]();return new _0x1b5818(_0x4b7445,_0x37a0f7,_0x1fa457,_0x2edc32);}else return _0x34c84a(0x23e);}else return _0x34c84a(0x125);}else return'text';}}},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x1ff)]=function(_0x34c05c){const _0x2e579d=_0x4797a7,_0x2b7007=this[_0x2e579d(0x225)](_0x34c05c),_0x1f086e=this['commandName'](_0x34c05c),_0x546378=this[_0x2e579d(0x25b)](_0x1f086e)[_0x2e579d(0xec)];this['changePaintOpacity'](this[_0x2e579d(0x216)](_0x34c05c));let _0x592c93=this['itemTextAlign']();if(_0x592c93===_0x2e579d(0x25c)){if(_0x2e579d(0x1bb)==='xtKye')this[_0x2e579d(0x16e)](_0x1f086e,_0x2b7007['x']+_0x2b7007[_0x2e579d(0xec)]-_0x546378,_0x2b7007['y'],_0x546378);else{if(this[_0x2e579d(0x1e4)]()!==_0x2e579d(0x1d6))return!![];return _0x5c64d7['MainMenuCore'][_0x2e579d(0x145)][_0x2e579d(0x219)][_0x2e579d(0x210)];}}else{if(_0x592c93==='center'){const _0x50309b=_0x2b7007['x']+Math[_0x2e579d(0x106)]((_0x2b7007[_0x2e579d(0xec)]-_0x546378)/0x2);this['drawTextEx'](_0x1f086e,_0x50309b,_0x2b7007['y'],_0x546378);}else this['drawTextEx'](_0x1f086e,_0x2b7007['x'],_0x2b7007['y'],_0x546378);}},Window_MenuCommand[_0x4797a7(0x242)][_0x4797a7(0x1a8)]=function(_0x3fbccd){const _0x18e166=_0x4797a7;this[_0x18e166(0x21c)](_0x3fbccd)[_0x18e166(0x241)](/\\I\[(\d+)\]/i);const _0x14d79e=Number(RegExp['$1']),_0x2f9c4d=this['itemLineRect'](_0x3fbccd),_0x5c42b1=_0x2f9c4d['x']+Math[_0x18e166(0x106)]((_0x2f9c4d['width']-ImageManager[_0x18e166(0x215)])/0x2),_0x5c46c9=_0x2f9c4d['y']+(_0x2f9c4d[_0x18e166(0x188)]-ImageManager[_0x18e166(0x13c)])/0x2;this[_0x18e166(0x115)](_0x14d79e,_0x5c42b1,_0x5c46c9);},VisuMZ['MainMenuCore']['Window_StatusBase_loadFaceImages']=Window_StatusBase[_0x4797a7(0x242)][_0x4797a7(0x1d9)],Window_StatusBase[_0x4797a7(0x242)][_0x4797a7(0x1d9)]=function(){const _0x5531f5=_0x4797a7;VisuMZ['MainMenuCore'][_0x5531f5(0x103)]['call'](this),this[_0x5531f5(0x166)]();},Window_StatusBase[_0x4797a7(0x242)][_0x4797a7(0x166)]=function(){const _0x4c2004=_0x4797a7;for(const _0x258c36 of $gameParty['members']()){if(_0x4c2004(0x252)!==_0x4c2004(0x1ea)){if(!_0x258c36)continue;if(_0x258c36[_0x4c2004(0x14f)]()){if(_0x4c2004(0x1d1)!==_0x4c2004(0x131))ImageManager[_0x4c2004(0x192)](_0x258c36[_0x4c2004(0x14f)]());else{const _0x3bd58d=_0x492300(this[_0x4c2004(0x1c7)][_0x4c2004(0x1db)]());_0x3bd58d?(_0x18a7a5[_0x4c2004(0x196)](_0x3bd58d),this['popScene']()):this[_0x4c2004(0x1c7)][_0x4c2004(0x1f7)]();}}_0x258c36[_0x4c2004(0x137)]()&&ImageManager[_0x4c2004(0x222)](_0x258c36[_0x4c2004(0x137)]()),_0x258c36['getMenuImage']()&&(_0x4c2004(0x13e)!==_0x4c2004(0x13e)?_0x2e73a9[_0x4c2004(0xef)][_0x4c2004(0x145)][_0x4c2004(0x138)][_0x4c2004(0x235)][_0x4c2004(0x170)](this,_0x168914,_0x4e172d):ImageManager['loadPicture'](_0x258c36[_0x4c2004(0x159)]()));}else{if(this[_0x4c2004(0x20a)]()&&this['_statusWindow'])_0x2caa9a[_0x4c2004(0x1d4)](_0x364263[_0x4c2004(0x273)]()[0x0]),this[_0x4c2004(0x10c)]();else{if(this[_0x4c2004(0x1e4)]()===_0x4c2004(0x1c2))this[_0x4c2004(0x1e5)][_0x4c2004(0x1e8)]();_0x4c462e[_0x4c2004(0xef)][_0x4c2004(0x1a2)][_0x4c2004(0x170)](this);}}}},Window_StatusBase['prototype']['graphicType']=function(){const _0x1ae4f2=_0x4797a7;return VisuMZ[_0x1ae4f2(0xef)][_0x1ae4f2(0x145)][_0x1ae4f2(0x21a)];},Window_StatusBase[_0x4797a7(0x242)][_0x4797a7(0x1b5)]=function(_0x4ae6f0,_0x469d93,_0x3d197c,_0x27e2fb,_0x3fd6c8){const _0x1fab40=_0x4797a7;_0x27e2fb=_0x27e2fb||ImageManager[_0x1fab40(0x16f)],_0x3fd6c8=_0x3fd6c8||ImageManager[_0x1fab40(0x143)];const _0x72ce95=ImageManager[_0x1fab40(0x16f)],_0x3514ae=_0x3fd6c8-0x2,_0x248120=_0x469d93+Math[_0x1fab40(0x106)]((_0x27e2fb-_0x72ce95)/0x2);this[_0x1fab40(0x1d8)]===Window_MenuStatus&&this[_0x1fab40(0x1e7)](_0x4ae6f0[_0x1fab40(0x24b)]()),this[_0x1fab40(0x149)](_0x4ae6f0,_0x248120,_0x3d197c,_0x72ce95,_0x3514ae),this[_0x1fab40(0x1e7)](!![]);},Window_StatusBase[_0x4797a7(0x242)][_0x4797a7(0x21e)]=function(_0x3abf0c,_0x104ef7,_0x5c5f63,_0x2e2c84,_0x3901ab){const _0x54ec1c=_0x4797a7;_0x2e2c84=_0x2e2c84||ImageManager[_0x54ec1c(0x16f)],_0x3901ab=_0x3901ab||ImageManager[_0x54ec1c(0x143)];const _0xea0576=_0x3abf0c['characterName'](),_0x1d0e62=_0x3abf0c['characterIndex'](),_0x479763=ImageManager['loadCharacter'](_0xea0576),_0x58fa77=ImageManager['isBigCharacter'](_0xea0576),_0x3f202c=_0x479763[_0x54ec1c(0xec)]/(_0x58fa77?0x3:0xc),_0x4be34f=_0x479763[_0x54ec1c(0x188)]/(_0x58fa77?0x4:0x8),_0x5d14e6=_0x2e2c84,_0x42f4ef=_0x3901ab-0x2,_0x31cc49=_0x104ef7+Math['floor'](_0x5d14e6/0x2),_0x51e90b=_0x5c5f63+Math[_0x54ec1c(0x146)]((_0x3901ab+_0x4be34f)/0x2);this[_0x54ec1c(0x1d8)]===Window_MenuStatus&&this[_0x54ec1c(0x1e7)](_0x3abf0c[_0x54ec1c(0x24b)]());const _0x107c5e=Math[_0x54ec1c(0x132)](_0x2e2c84,_0x3f202c),_0x42cbd6=Math[_0x54ec1c(0x132)](_0x3901ab,_0x4be34f),_0x5c07d0=Math['floor'](_0x104ef7+Math[_0x54ec1c(0x112)](_0x2e2c84-_0x3f202c,0x0)/0x2),_0x1db1b5=Math[_0x54ec1c(0x106)](_0x5c5f63+Math[_0x54ec1c(0x112)](_0x3901ab-_0x4be34f,0x0)/0x2),_0x146bd2=_0x58fa77?0x0:_0x1d0e62,_0x5d7084=(_0x146bd2%0x4*0x3+0x1)*_0x3f202c,_0x4e3be7=Math[_0x54ec1c(0x106)](_0x146bd2/0x4)*0x4*_0x4be34f;this[_0x54ec1c(0x245)][_0x54ec1c(0x275)](_0x479763,_0x5d7084,_0x4e3be7,_0x107c5e,_0x42cbd6,_0x5c07d0,_0x1db1b5),this['changePaintOpacity'](!![]);},Window_StatusBase['prototype'][_0x4797a7(0x169)]=function(_0x373375,_0x380877,_0xe7a396,_0x4845fc,_0x48e456){const _0xe89c09=_0x4797a7;_0x4845fc=_0x4845fc||ImageManager[_0xe89c09(0x16f)],_0x48e456=_0x48e456||ImageManager[_0xe89c09(0x143)];const _0x99868c=ImageManager['loadSvActor'](_0x373375[_0xe89c09(0x137)]()),_0x4772cc=_0x99868c[_0xe89c09(0xec)]/ImageManager['svActorHorzCells'],_0x58d45a=_0x99868c['height']/ImageManager[_0xe89c09(0x1d5)],_0x546e2a=_0x4845fc,_0x319ff8=_0x48e456-0x2,_0x2094a1=_0x380877+Math['floor'](_0x546e2a/0x2),_0x4e583a=_0xe7a396+Math[_0xe89c09(0x146)]((_0x48e456+_0x58d45a)/0x2);if(this[_0xe89c09(0x1d8)]===Window_MenuStatus){if(_0xe89c09(0xe3)==='IbNnn')return _0xdba8cb['prototype'][_0xe89c09(0x1e1)][_0xe89c09(0x170)](this);else this[_0xe89c09(0x1e7)](_0x373375[_0xe89c09(0x24b)]());}const _0x2151df=Math[_0xe89c09(0x132)](_0x4845fc,_0x4772cc),_0x2e796d=Math[_0xe89c09(0x132)](_0x48e456,_0x58d45a),_0x16902d=Math[_0xe89c09(0x106)](_0x380877+Math[_0xe89c09(0x112)](_0x4845fc-_0x4772cc,0x0)/0x2),_0x5f542b=Math[_0xe89c09(0x106)](_0xe7a396+Math[_0xe89c09(0x112)](_0x48e456-_0x58d45a,0x0)/0x2),_0x4a2354=0x0,_0x3cbf6a=0x0;this['contents'][_0xe89c09(0x275)](_0x99868c,_0x4a2354,_0x3cbf6a,_0x2151df,_0x2e796d,_0x16902d,_0x5f542b),this[_0xe89c09(0x1e7)](!![]);},Window_StatusBase['prototype'][_0x4797a7(0x19e)]=function(_0x29818d,_0x3e7bab,_0x306d41,_0x3ca937,_0x403e66){const _0xb9367f=_0x4797a7,_0x103cff=ImageManager[_0xb9367f(0x17c)](_0x29818d[_0xb9367f(0x159)]());_0x3ca937=(_0x3ca937||ImageManager[_0xb9367f(0x16f)])-0x2,_0x403e66=(_0x403e66||ImageManager['faceHeight'])-0x2;const _0x19a7b6=_0x103cff[_0xb9367f(0xec)],_0x3e6b82=_0x103cff[_0xb9367f(0x188)],_0x5d7e73=_0x3ca937,_0x38caea=_0x403e66-0x2,_0x38573f=_0x3e7bab+Math[_0xb9367f(0x106)](_0x5d7e73/0x2),_0x36b205=_0x306d41+Math[_0xb9367f(0x146)]((_0x403e66+_0x3e6b82)/0x2);this['constructor']===Window_MenuStatus&&this[_0xb9367f(0x1e7)](_0x29818d[_0xb9367f(0x24b)]());const _0x5b68b1=Math[_0xb9367f(0x132)](_0x3ca937,_0x19a7b6),_0x85a02e=Math['min'](_0x403e66,_0x3e6b82),_0x2b3216=_0x3e7bab+0x1,_0x1a556a=Math[_0xb9367f(0x112)](_0x306d41+0x1,_0x306d41+_0x38caea-_0x3e6b82+0x3);let _0x55a06c=Math[_0xb9367f(0xf9)]((_0x19a7b6-_0x5b68b1)/0x2),_0x50627b=Math[_0xb9367f(0xf9)]((_0x3e6b82-_0x85a02e)/0x2);_0x55a06c-=_0x29818d[_0xb9367f(0x20f)](),_0x50627b-=_0x29818d[_0xb9367f(0x128)]();if(Imported[_0xb9367f(0xeb)]){if(VisuMZ['CoreEngine'][_0xb9367f(0x145)][_0xb9367f(0xe8)][_0xb9367f(0x139)]){}}this[_0xb9367f(0x245)][_0xb9367f(0x275)](_0x103cff,_0x55a06c,_0x50627b,_0x5b68b1,_0x85a02e,_0x2b3216,_0x1a556a),this[_0xb9367f(0x1e7)](!![]);},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x18f)]=Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x251)],Window_MenuStatus[_0x4797a7(0x242)]['selectLast']=function(){const _0x55139a=_0x4797a7;VisuMZ[_0x55139a(0xef)]['Settings'][_0x55139a(0x219)][_0x55139a(0x265)]?VisuMZ[_0x55139a(0xef)][_0x55139a(0x18f)]['call'](this):this[_0x55139a(0x123)](0x0);},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0x17f)]=Window_MenuStatus[_0x4797a7(0x242)]['maxItems'],Window_MenuStatus[_0x4797a7(0x242)]['maxItems']=function(){const _0xc067b=_0x4797a7;return this[_0xc067b(0x274)]()?$gameParty['battleMembers']()[_0xc067b(0x234)]:VisuMZ[_0xc067b(0xef)][_0xc067b(0x17f)][_0xc067b(0x170)](this);},Window_MenuStatus[_0x4797a7(0x242)]['showOnlyBattleMembers']=function(){const _0x395c3c=_0x4797a7,_0x5bd909=VisuMZ[_0x395c3c(0xef)][_0x395c3c(0x145)][_0x395c3c(0x219)];if(_0x5bd909[_0x395c3c(0x122)]===undefined)_0x5bd909['ShowReserve']=!![];const _0x341b6f=SceneManager[_0x395c3c(0x148)];if(!_0x5bd909[_0x395c3c(0x122)]){if(_0x5bd909[_0x395c3c(0x213)])return _0x341b6f[_0x395c3c(0x1d8)]===Scene_Menu;return!![];}return![];},Window_MenuStatus['prototype'][_0x4797a7(0x1dc)]=function(){const _0x16b5e1=_0x4797a7,_0x4baeb0=SceneManager[_0x16b5e1(0x148)][_0x16b5e1(0x1d8)];if(_0x4baeb0===Scene_Menu){if(_0x16b5e1(0x12b)==='KlaPl')return VisuMZ[_0x16b5e1(0xef)][_0x16b5e1(0x145)]['StatusListStyle'];else _0x526140[_0x16b5e1(0xef)][_0x16b5e1(0x18f)][_0x16b5e1(0x170)](this);}else return VisuMZ[_0x16b5e1(0xef)][_0x16b5e1(0x145)][_0x16b5e1(0x104)];},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x1ca)]=function(){const _0x4ee80d=_0x4797a7,_0x641490=this[_0x4ee80d(0x1dc)]();switch(_0x641490){case _0x4ee80d(0x260):case'portrait':return 0x1;case _0x4ee80d(0x108):return 0x1;default:return $gameParty[_0x4ee80d(0x1ac)]();}},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x1e1)]=function(){const _0x484a6d=_0x4797a7,_0x3a28ee=this[_0x484a6d(0x1dc)]();switch(_0x3a28ee){case _0x484a6d(0x260):case'portrait':return $gameParty['maxBattleMembers']();default:return 0x1;}},VisuMZ[_0x4797a7(0xef)][_0x4797a7(0xee)]=Window_MenuStatus[_0x4797a7(0x242)]['itemHeight'],Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x214)]=function(){const _0x18df7a=_0x4797a7,_0x22f9d1=this[_0x18df7a(0x1dc)]();switch(_0x22f9d1){case _0x18df7a(0x260):case _0x18df7a(0x155):case _0x18df7a(0x108):return this[_0x18df7a(0x22d)];case'thin':return Window_Selectable[_0x18df7a(0x242)][_0x18df7a(0x214)]['call'](this);case'thicker':return this[_0x18df7a(0xf6)]()*0x2+0x8;default:return VisuMZ['MainMenuCore'][_0x18df7a(0xee)]['call'](this);}},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x250)]=function(_0x22cad0){const _0x618959=_0x4797a7;this[_0x618959(0x1da)](_0x22cad0),this[_0x618959(0x21f)](_0x22cad0);},VisuMZ[_0x4797a7(0xef)]['Window_MenuStatus_drawItemImage']=Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x22f)],Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x167)]=function(_0x2abe2a,_0x10f04a,_0x4d91d8,_0x28239f,_0x5f16fc){const _0x332965=_0x4797a7;switch(this['graphicType']()){case _0x332965(0x18b):break;case _0x332965(0x209):this[_0x332965(0x21e)](_0x2abe2a,_0x10f04a,_0x4d91d8+0x1,_0x28239f,_0x5f16fc-0x2);break;case _0x332965(0x268):this[_0x332965(0x169)](_0x2abe2a,_0x10f04a,_0x4d91d8+0x1,_0x28239f,_0x5f16fc-0x2);break;default:this['drawItemActorFace'](_0x2abe2a,_0x10f04a,_0x4d91d8,_0x28239f,_0x5f16fc);break;}},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x21f)]=function(_0x10f83a){const _0x3bb223=_0x4797a7;this[_0x3bb223(0x117)]();const _0x388b17=this[_0x3bb223(0x205)](_0x10f83a),_0x4b71c8=this[_0x3bb223(0x255)](_0x10f83a),_0x1c84dd=this[_0x3bb223(0x1dc)]();switch(_0x1c84dd){case _0x3bb223(0x260):this[_0x3bb223(0x15f)](_0x388b17,_0x4b71c8);break;case'portrait':this[_0x3bb223(0x162)](_0x388b17,_0x4b71c8);break;case _0x3bb223(0x108):this[_0x3bb223(0x22b)](_0x388b17,_0x4b71c8);break;case _0x3bb223(0x186):this[_0x3bb223(0x119)](_0x388b17,_0x4b71c8);break;case _0x3bb223(0x227):this[_0x3bb223(0x16b)](_0x388b17,_0x4b71c8);break;default:this[_0x3bb223(0x140)](_0x388b17,_0x4b71c8);break;}},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x15f)]=function(_0x3ca6b1,_0x5300bf){const _0x30d4b2=_0x4797a7;VisuMZ[_0x30d4b2(0xef)]['Settings'][_0x30d4b2(0x138)][_0x30d4b2(0x12f)][_0x30d4b2(0x170)](this,_0x3ca6b1,_0x5300bf);},Window_MenuStatus[_0x4797a7(0x242)]['drawItemStatusPortraitStyle']=function(_0x564fd9,_0x1579fe){const _0x35c0ba=_0x4797a7;if(_0x564fd9[_0x35c0ba(0x159)]()!==''){const _0x3b1219=ImageManager[_0x35c0ba(0x17c)](_0x564fd9[_0x35c0ba(0x159)]());_0x3b1219[_0x35c0ba(0x1e9)](this['drawItemStatusPortraitStyleOnLoad'][_0x35c0ba(0x267)](this,_0x564fd9,_0x1579fe));}else this['drawItemStatusVerticalStyle'](_0x564fd9,_0x1579fe);},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x1ba)]=function(_0x18bdef,_0x5bb92b){const _0x5d50b7=_0x4797a7;VisuMZ['MainMenuCore'][_0x5d50b7(0x145)][_0x5d50b7(0x138)][_0x5d50b7(0x235)]['call'](this,_0x18bdef,_0x5bb92b);},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x22b)]=function(_0x14a601,_0x5f30c1){const _0xb9175b=_0x4797a7,_0x2ae779=ImageManager[_0xb9175b(0x17c)](_0x14a601[_0xb9175b(0x159)]());_0x2ae779['addLoadListener'](this[_0xb9175b(0x23b)][_0xb9175b(0x267)](this,_0x14a601,_0x5f30c1));},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x23b)]=function(_0x42e7da,_0x4ba4c3){const _0x1d4178=_0x4797a7;VisuMZ[_0x1d4178(0xef)][_0x1d4178(0x145)][_0x1d4178(0x138)][_0x1d4178(0x226)][_0x1d4178(0x170)](this,_0x42e7da,_0x4ba4c3);},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x119)]=function(_0x51e060,_0xc218e7){const _0x22ef4e=_0x4797a7;VisuMZ['MainMenuCore'][_0x22ef4e(0x145)][_0x22ef4e(0x138)][_0x22ef4e(0x1bc)][_0x22ef4e(0x170)](this,_0x51e060,_0xc218e7);},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x16b)]=function(_0xc27612,_0x42d1b0){const _0x35b6fd=_0x4797a7;VisuMZ[_0x35b6fd(0xef)][_0x35b6fd(0x145)]['ListStyles'][_0x35b6fd(0x1b3)]['call'](this,_0xc27612,_0x42d1b0);},Window_MenuStatus[_0x4797a7(0x242)][_0x4797a7(0x26e)]=function(){const _0x3e8c67=_0x4797a7,_0x5c3798=this['listStyle']();if([_0x3e8c67(0x186),'thicker'][_0x3e8c67(0x24a)](_0x5c3798))return![];return Window_StatusBase[_0x3e8c67(0x242)][_0x3e8c67(0x26e)][_0x3e8c67(0x170)](this);},Window_MenuStatus[_0x4797a7(0x242)]['drawItemStatusDefaultStyle']=function(_0x2740ff,_0x3f96f0){const _0x577d0e=_0x4797a7;VisuMZ[_0x577d0e(0xef)][_0x577d0e(0x145)][_0x577d0e(0x138)][_0x577d0e(0x190)][_0x577d0e(0x170)](this,_0x2740ff,_0x3f96f0);},Window_SkillStatus[_0x4797a7(0x242)][_0x4797a7(0x149)]=function(_0x1b12b3,_0x18408d,_0x48a8ae,_0xf7b7d8,_0x376626){const _0x246b35=_0x4797a7;switch(this['graphicType']()){case'none':break;case _0x246b35(0x209):this[_0x246b35(0x21e)](_0x1b12b3,_0x18408d,_0x48a8ae,_0xf7b7d8,_0x376626);break;case _0x246b35(0x268):this['drawItemActorSvBattler'](_0x1b12b3,_0x18408d,_0x48a8ae,_0xf7b7d8,_0x376626);break;default:Window_StatusBase[_0x246b35(0x242)][_0x246b35(0x149)][_0x246b35(0x170)](this,_0x1b12b3,_0x18408d,_0x48a8ae,_0xf7b7d8,_0x376626);break;}},Window_EquipStatus[_0x4797a7(0x242)][_0x4797a7(0x149)]=function(_0x56cc3f,_0x3b5c3e,_0x2520b5,_0x1ca3e8,_0x2a2254){const _0x569b72=_0x4797a7;switch(this[_0x569b72(0x1bf)]()){case _0x569b72(0x18b):break;case'sprite':this[_0x569b72(0x21e)](_0x56cc3f,_0x3b5c3e,_0x2520b5,_0x1ca3e8,_0x2a2254);break;case'svbattler':this['drawItemActorSvBattler'](_0x56cc3f,_0x3b5c3e,_0x2520b5,_0x1ca3e8,_0x2a2254);break;default:Window_StatusBase['prototype'][_0x569b72(0x149)][_0x569b72(0x170)](this,_0x56cc3f,_0x3b5c3e,_0x2520b5,_0x1ca3e8,_0x2a2254);break;}};function Window_ThinGold(){const _0x2bb859=_0x4797a7;this[_0x2bb859(0x129)](...arguments);}Window_ThinGold[_0x4797a7(0x242)]=Object['create'](Window_Gold[_0x4797a7(0x242)]),Window_ThinGold[_0x4797a7(0x242)][_0x4797a7(0x1d8)]=Window_ThinGold,Window_ThinGold[_0x4797a7(0x242)][_0x4797a7(0x214)]=function(){const _0x4b6bd1=_0x4797a7;return this[_0x4b6bd1(0xf6)]();},Window_ThinGold[_0x4797a7(0x242)][_0x4797a7(0x101)]=function(){const _0x131b93=_0x4797a7;return Window_Selectable[_0x131b93(0x242)]['colSpacing'][_0x131b93(0x170)](this);};function Window_Playtime(){const _0x1761bc=_0x4797a7;this[_0x1761bc(0x129)](...arguments);}Window_Playtime['prototype']=Object['create'](Window_Selectable[_0x4797a7(0x242)]),Window_Playtime[_0x4797a7(0x242)][_0x4797a7(0x1d8)]=Window_Playtime,Window_Playtime['prototype']['initialize']=function(_0x1d0fe4){const _0x18e1eb=_0x4797a7;this['_playtimeText']=$gameSystem[_0x18e1eb(0x11c)](),this['_timer']=0x3c,Window_Selectable[_0x18e1eb(0x242)][_0x18e1eb(0x129)][_0x18e1eb(0x170)](this,_0x1d0fe4),this['refresh']();},Window_Playtime[_0x4797a7(0x242)][_0x4797a7(0x214)]=function(){const _0x4ca0de=_0x4797a7;return this[_0x4ca0de(0xf6)]();},Window_Playtime['prototype'][_0x4797a7(0x19d)]=function(){const _0x2ce9cb=_0x4797a7;Window_Selectable['prototype'][_0x2ce9cb(0x19d)][_0x2ce9cb(0x170)](this),this[_0x2ce9cb(0x1aa)]();},Window_Playtime[_0x4797a7(0x242)][_0x4797a7(0x1aa)]=function(){const _0x5019a9=_0x4797a7;if(this['_timer']-->0x0){if(this[_0x5019a9(0x10a)]<=0x0)this[_0x5019a9(0x1fa)]();}},Window_Playtime[_0x4797a7(0x242)][_0x4797a7(0x1fa)]=function(){const _0x28409e=_0x4797a7;this[_0x28409e(0x10a)]=0x3c;const _0x4258f4=this[_0x28409e(0x225)](0x0),_0x33497a=_0x4258f4['x'],_0x147f01=_0x4258f4['y'],_0x34529e=_0x4258f4['width'];this['contents'][_0x28409e(0x18e)](),this['drawTimeIcon'](_0x4258f4),this[_0x28409e(0x203)](_0x4258f4),this[_0x28409e(0x136)](_0x4258f4);},Window_Playtime[_0x4797a7(0x242)][_0x4797a7(0x117)]=function(){const _0x3dcbf4=_0x4797a7;Window_Selectable[_0x3dcbf4(0x242)][_0x3dcbf4(0x117)][_0x3dcbf4(0x170)](this),this[_0x3dcbf4(0x245)]['fontSize']=VisuMZ[_0x3dcbf4(0xef)][_0x3dcbf4(0x145)][_0x3dcbf4(0x107)]['FontSize'];},Window_Playtime[_0x4797a7(0x242)][_0x4797a7(0x1ce)]=function(_0x33efee){const _0x3a07d7=_0x4797a7;if(VisuMZ[_0x3a07d7(0xef)][_0x3a07d7(0x145)][_0x3a07d7(0x107)][_0x3a07d7(0x1b6)]>0x0){if(_0x3a07d7(0x1d2)!=='ZWLCI'){if(!this[_0x3a07d7(0x24d)]())return new _0x30d64f(0x0,0x0,0x0,0x0);const _0x9482b3=this[_0x3a07d7(0x15d)]();this[_0x3a07d7(0x19b)]=new _0x217d14(_0x9482b3),this['_variableWindow']['setBackgroundType'](_0x5cb3d6[_0x3a07d7(0xef)][_0x3a07d7(0x145)][_0x3a07d7(0x248)][_0x3a07d7(0x24e)]),this[_0x3a07d7(0x1ad)](this['_variableWindow']);}else{const _0x253722=VisuMZ['MainMenuCore'][_0x3a07d7(0x145)][_0x3a07d7(0x107)][_0x3a07d7(0x1b6)],_0x3b04f1=_0x33efee['y']+(this[_0x3a07d7(0xf6)]()-ImageManager['iconHeight'])/0x2;this[_0x3a07d7(0x115)](_0x253722,_0x33efee['x'],_0x3b04f1);const _0x571248=ImageManager[_0x3a07d7(0x215)]+0x4;_0x33efee['x']+=_0x571248,_0x33efee[_0x3a07d7(0xec)]-=_0x571248;}}},Window_Playtime[_0x4797a7(0x242)]['drawTimeLabel']=function(_0x1f8db4){const _0x4f7e25=_0x4797a7;this[_0x4f7e25(0x117)](),this[_0x4f7e25(0x118)](ColorManager[_0x4f7e25(0x1fc)]());const _0x1bd054=VisuMZ[_0x4f7e25(0xef)][_0x4f7e25(0x145)][_0x4f7e25(0x107)][_0x4f7e25(0x124)];this[_0x4f7e25(0x121)](_0x1bd054,_0x1f8db4['x'],_0x1f8db4['y'],_0x1f8db4[_0x4f7e25(0xec)],_0x4f7e25(0x157)),this[_0x4f7e25(0x1c4)]();},Window_Playtime['prototype'][_0x4797a7(0x136)]=function(_0x1d8b10){const _0x3d2492=_0x4797a7,_0x1bc998=$gameSystem[_0x3d2492(0x11c)]();this[_0x3d2492(0x121)](_0x1bc998,_0x1d8b10['x'],_0x1d8b10['y'],_0x1d8b10['width'],_0x3d2492(0x25c));};function _0x27cd(_0x29cae5,_0x8125d8){const _0x36b5f5=_0x36b5();return _0x27cd=function(_0x27cd75,_0x29b109){_0x27cd75=_0x27cd75-0xe1;let _0x3f46d9=_0x36b5f5[_0x27cd75];return _0x3f46d9;},_0x27cd(_0x29cae5,_0x8125d8);}function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables[_0x4797a7(0x242)]=Object[_0x4797a7(0x230)](Window_Selectable['prototype']),Window_MenuVariables[_0x4797a7(0x242)]['constructor']=Window_MenuVariables,Window_MenuVariables['prototype'][_0x4797a7(0x129)]=function(_0x223373){const _0x32e679=_0x4797a7;Window_Selectable['prototype'][_0x32e679(0x129)][_0x32e679(0x170)](this,_0x223373),this['_data']=VisuMZ[_0x32e679(0xef)][_0x32e679(0x145)]['Variable'][_0x32e679(0xe1)],this[_0x32e679(0x1fa)]();},Window_MenuVariables[_0x4797a7(0x242)]['itemHeight']=function(){const _0x126586=_0x4797a7;return this[_0x126586(0xf6)]();},Window_MenuVariables[_0x4797a7(0x242)][_0x4797a7(0x1e1)]=function(){const _0x10bf7d=_0x4797a7,_0x1b2fc8=SceneManager['_scene'][_0x10bf7d(0x1e4)]();return _0x1b2fc8===_0x10bf7d(0x1d6)?_0x10bf7d(0x1b1)===_0x10bf7d(0x1b1)?0x1:_0x10bf7d(0x15e):VisuMZ['MainMenuCore'][_0x10bf7d(0x145)][_0x10bf7d(0x248)][_0x10bf7d(0xe1)][_0x10bf7d(0x234)];},Window_MenuVariables[_0x4797a7(0x242)][_0x4797a7(0x117)]=function(){const _0x228c72=_0x4797a7;Window_Selectable[_0x228c72(0x242)][_0x228c72(0x117)][_0x228c72(0x170)](this),this['contents'][_0x228c72(0x25f)]=VisuMZ[_0x228c72(0xef)]['Settings'][_0x228c72(0x248)]['FontSize'],this[_0x228c72(0x118)](ColorManager[_0x228c72(0x1fc)]());},Window_MenuVariables['prototype'][_0x4797a7(0x1f1)]=function(){const _0x161996=_0x4797a7;return this[_0x161996(0x11e)]['length'];},Window_MenuVariables[_0x4797a7(0x242)][_0x4797a7(0x144)]=function(){const _0x5e48d5=_0x4797a7,_0x340bbb=this['topIndex']();for(let _0x159cd0=0x0;_0x159cd0<this['maxVisibleItems']();_0x159cd0++){const _0xf23316=_0x340bbb+_0x159cd0;_0xf23316<this[_0x5e48d5(0x1f1)]()&&(this[_0x5e48d5(0x20e)](_0xf23316),this[_0x5e48d5(0x250)](_0xf23316));}},Window_MenuVariables[_0x4797a7(0x242)]['drawItemBackground']=function(_0x4bdc09){},Window_MenuVariables[_0x4797a7(0x242)][_0x4797a7(0x250)]=function(_0x417cbf){const _0x4b333f=_0x4797a7,_0x59574a=this[_0x4b333f(0x11e)][_0x417cbf];if(_0x59574a<=0x0)return;if(!$dataSystem[_0x4b333f(0x14a)][_0x59574a])return;const _0x2c9356=this[_0x4b333f(0x225)](_0x417cbf);this[_0x4b333f(0x117)]();let _0x4823a1=0x0,_0x2c7267=$dataSystem[_0x4b333f(0x14a)][_0x59574a][_0x4b333f(0x1de)]();_0x2c7267[_0x4b333f(0x241)](/\\I\[(\d+)\]/i)&&(_0x4823a1=Number(RegExp['$1']),_0x2c7267=_0x2c7267['replace'](/\\I\[(\d+)\]/i,'')['trim']());if(_0x4823a1>0x0){if(_0x4b333f(0x232)===_0x4b333f(0x232)){const _0x14f10d=_0x2c9356['y']+(this[_0x4b333f(0xf6)]()-ImageManager[_0x4b333f(0x13c)])/0x2;this[_0x4b333f(0x115)](_0x4823a1,_0x2c9356['x'],_0x14f10d);const _0x131ab1=ImageManager['iconWidth']+0x4;_0x2c9356['x']+=_0x131ab1,_0x2c9356[_0x4b333f(0xec)]-=_0x131ab1;}else this[_0x4b333f(0x1e7)](_0x288d52['isBattleMember']());}this[_0x4b333f(0x121)](_0x2c7267,_0x2c9356['x'],_0x2c9356['y'],_0x2c9356[_0x4b333f(0xec)],'left'),this[_0x4b333f(0x118)](ColorManager['normalColor']()),this[_0x4b333f(0x121)]($gameVariables['value'](_0x59574a),_0x2c9356['x'],_0x2c9356['y'],_0x2c9356['width'],_0x4b333f(0x25c));};function _0x36b5(){const _0x23f9af=['drawItemStatusThickerStyle','addMainCommands','goldWindowRectTopStyle','drawTextEx','faceWidth','call','PfhPF','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','9COHjyI','createCommandNameWindow','isDisplayActorMenuBackgroundImage','bbetj','setBackgroundType','ZhIOe','toUpperCase','fittingHeight','_targetY','loadPicture','svActorHorzCells','HUVOU','Window_MenuStatus_maxItems','itemTextAlign','xkNUm','commandWindowRectThinBottomStyle','createActorMenuBackgroundImageSprite','ChangeActorMenuImageGroup','Game_Actor_setup','thin','commandWindowRectThinTopStyle','height','_playtimeWindow','createDummyWindow','none','commandCommonEvent','kTZag','clear','Window_MenuStatus_selectLast','DefaultStyle','1360tZtvtY','loadCharacter','MobileThickness','_dummyWindow','push','reserveCommonEvent','IoaAx','qvnud','Scene_Menu_onFormationCancel','statusWindowRectMobileStyle','_variableWindow','PersonalHandlerJS','update','drawItemActorMenuImage','iZAqp','map','commandFormation','Scene_Menu_commandPersonal','CommandWindowStyle','Rows','_bitmapReady','status','top','drawItemStyleIcon','updateCommandNameWindow','updateTimer','Scene_Menu_create','maxBattleMembers','addWindow','ShowJS','description','PBrnm','RNWfz','ARRAYNUM','ThickerStyle','Scene_Menu_commandWindowRect','drawItemActorFace','Icon','addSymbolBridge','wVCTR','addFormationCommand','drawItemStatusPortraitStyleOnLoad','xtKye','ThinStyle','nCCFL','exit','graphicType','boxWidth','cancel','mobile','Step1Start','resetTextColor','CustomCmdWin','commandWindowRectTopStyle','_commandWindow','Enable','aDYYz','numVisibleRows','xgouO','onFormationCancel','setMenuImage','drawTimeIcon','Untitled','addGameEndCommand','wUSDS','ZWLCI','thinBottom','setTargetActor','svActorVertCells','default','boxHeight','constructor','loadFaceImages','drawPendingItemBackground','currentExt','listStyle','Style','trim','AdjustCommandHeight','save','maxCols','goldWindowRectBottomStyle','canCreatePlaytimeWindow','commandWindowStyle','_statusWindow','item','changePaintOpacity','open','addLoadListener','cSPvW','setHandler','Scene_Menu_goldWindowRect','format','sbQwv','variableWindowRectBottomStyle','updateOpacity','maxItems','CallHandlerJS','isArray','createVariableWindow','Scene_Menu_commandFormation','options','activate','thinGoldWindow','KrVnd','refresh','auto','systemColor','variableWindowRectTopStyle','ARRAYJSON','drawItemStyleIconText','applyThinnerGoldWindowRect','ovKxR','NUPWv','drawTimeLabel','shift','actor','Scene_Menu_statusWindowRect','statusWindowRect','commandPersonal','sprite','isSoloQuickMode','adjustCommandHeightByVariable','needsDummyWindow','IfOOM','drawItemBackground','getMenuImageOffsetX','ThinGoldWindow','formation','CoreEngine','HideMainMenuOnly','itemHeight','iconWidth','isCommandEnabled','goldWindowRect','xCHHy','General','StatusGraphic','drawSvActor','commandName','fill','drawItemActorSprite','drawItemStatus','makeMainMenuCoreCommandList','center','loadSvActor','NUM','22448376dskqWI','itemLineRect','SoloStyle','thicker','commandWindowRectMobileStyle','commandNameWindowDrawBackground','thinTop','drawItemStatusSoloStyle','Scene_MenuBase_updateActor','innerHeight','index','drawItemImage','create','onBitmapLoad','jSkkv','playtimeWindowRectTopStyle','length','PortraitStyle','note','_menuImage','commandLoad','ChangeActorMenuImageRange','loadBitmap','drawItemStatusSoloStyleOnLoad','mainAreaTop','concat','iconText','lxIKc','MdvcS','match','prototype','Step2','\x5cI[%1]%2','contents','VrEEt','EBWrK','Variable','sGdxx','includes','isBattleMember','4058660ViKPtu','canCreateVariableWindow','BgType','Scene_Menu_onPersonalCancel','drawItem','selectLast','KquUm','STR','7460724hfiofR','itemRect','currentSymbol','JSON','ConvertParams','gameEnd','ARRAYSTR','textSizeEx','right','updateDuration','fkqwn','fontSize','vertical','addOriginalCommands','Cols','makeCommandList','ActorBgMenus','StatusSelectLast','Nshly','bind','svbattler','addChild','TextStr','EGgmW','iVyXg','parameters','isExpGaugeDrawn','cCiqR','FUNC','commandStyle','callUpdateHelp','members','showOnlyBattleMembers','blt','mwCwj','adjustCommandHeightByPlaytime','windowPadding','QEvjk','VarList','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','qxmfm','statusWindowRectTopStyle','onPersonalCancel','replace','Symbol','QoL','name','WindowRect','VisuMZ_0_CoreEngine','width','AutoGoldHeight','Window_MenuStatus_itemHeight','MainMenuCore','SERAK','7868776PNfByk','EnableJS','createPlaytimeWindow','GSfdI','Step1End','lineHeight','boyhF','TextJS','round','mainAreaHeight','innerWidth','adjustStatusWindowMobile','11rSryDE','_actor','1919442wMUsTv','6519OlNSVl','colSpacing','addOptionsCommand','Window_StatusBase_loadFaceImages','InnerMenuListStyle','ARRAYEVAL','floor','Playtime','solo','opacity','_timer','commandWindowRect','onPersonalOk','1hVkuAH','ActorBgMenuJS','initMenuImage','NfyMF','parse','max','setup','qShmI','drawIcon','_duration','resetFontSettings','changeTextColor','drawItemStatusThinStyle','SoloQuick','return\x200','playtimeText','GEqFu','_data','TextAlign','_commandNameWindow','drawText','ShowReserve','smoothSelect','Time','icon','playtimeWindowRectBottomStyle','7mbvFPl','getMenuImageOffsetY','initialize','addCommand','KlaPl','calcWindowHeight','_targetX','STRUCT','VerticalStyle','createCommandWindow','oVPYn','min','mainCommandWidth','bottom','Step1','drawPlaytime','battlerName','ListStyles','PixelateImageRendering','iWPhY','ExtJS','iconHeight','popScene','oqBEC','3661965IpaMHO','drawItemStatusDefaultStyle','updatePosition','_commandList','faceHeight','drawAllItems','Settings','ceil','QHWtY','_scene','drawActorFace','variables','openness','createStatusWindow','addSaveCommand','Scene_MenuBase_createBackground','characterName','bitmap','AutoGoldY','commandStyleCheck','Window_MenuCommand_initialize','setActor','portrait','close','left','mainAreaBottom','getMenuImage','_goldWindow','createGoldWindow','commandNameWindowCenter','variableWindowRect','text','drawItemStatusVerticalStyle','Scene_Menu_createStatusWindow','_actorMenuBgSprite','drawItemStatusPortraitStyle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','version','playtimeWindowRect','loadOtherActorImages','drawActorGraphic','adjustDefaultCommandWindowRect','drawItemActorSvBattler','registerCommand'];_0x36b5=function(){return _0x23f9af;};return _0x36b5();}