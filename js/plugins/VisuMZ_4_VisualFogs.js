//=============================================================================
// VisuStella MZ - Visual Fogs
// VisuMZ_4_VisualFogs.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualFogs = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualFogs = VisuMZ.VisualFogs || {};
VisuMZ.VisualFogs.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [VisualFogs]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Fogs_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Fogs are a handy feature long removed from RPG Maker since RPG Maker XP.
 * This plugin reintroduces them back into RPG Maker MZ. Fogs function similar
 * to parallaxes, except rather than being under the tile map, fogs appear
 * above the tile map and the characters. This plugin gives you an unlimited
 * amount of fogs to apply to each map alongside many controls to make the fogs
 * appear more vivid.
 * 
 * A restricted fog area system is also added to this plugin to make fogs
 * appear only within certain regions and/or terrain tags. This way, you can
 * utilize parallaxes as masked layers for obscured sections of the map.
 * 
 * Sometimes, fogs may be too intrusive to the player's visibility. A vignette
 * feature has been added to make fogs appear only on the borders or certain
 * sides of the screen. This way, fogs can still add to the atmosphere without
 * obscuring too much of the visible screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove fogs through map notetags.
 * * Lots of customization options for each of the fogs.
 * * Limit where fogs can be displayed on the map through regions and/or
 *   terrain tags to obscure parts of the map.
 * * Use vignettes to obscure sides of the screen without affecting the center.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove fogs as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Fogs
 * 
 * Fogs are not an inherent feature for the map editor. They need to be added
 * through map notetags or Plugin Commands.
 * 
 * Each of the fogs added through this plugin's notetags and/or commands are
 * assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that fog when needed.
 * 
 * When fogs are created, they appear above the tile map and characters, but
 * below the weather. This means they are created between the two layers when
 * the map's sprites are generated.
 * 
 * Fogs will behave very similar to parallaxes in how they move about the
 * screen. This means that if a fog is set to looping, it will loop in
 * accordance to the screen's display coordinates. This is to maintain
 * consistency with how the RPG Maker MZ engine behaves.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a fog to appear for the whole entire foreground and want
 * to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * *NOTE*: This effect does not work on looping maps.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the fog. Those parts will be little squares each,
 * equal to the size of a tile. They have soft borders due to blurring options.
 * The foggy tiles will be slightly larger than normal due to spill values.
 * 
 * You may notice that some tiles don't blur well when they are towards the
 * right and bottom sides of the screen when the blur values are higher than
 * normal. This is a known issue with Pixi JS's filters and there's not much
 * the VisuStella team can do about it. Instead, what we recommend is that you
 * use a fog vignette on an upper layer to mask the bleeding issue.
 * 
 * Each fog layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Fog layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Vignettes
 * 
 * If you don't want fogs to obscure the whole screen, use a vignette to make
 * them appear only at the sides of the screen. You can use custom vignette
 * masks or rendered ones provided by this plugin.
 * 
 * If you decide to make a custom vignette mask, create them similar to regular
 * image masks. This means that white areas of the masking image will be the
 * parts of the screen where the fog appears while the black areas of the image
 * will hide the fog. You can use gradients to make the vignette mask appear
 * more smooth.
 * 
 * Vignettes cannot be used with region and terrain tags. This is because the
 * region and terrain tag tiles move alongside the screen while vignettes are
 * always locked onto the borders of the screen. However, if you wish to use
 * both, just apply two different fog layers instead.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 * battle. There's a separate plugin for that called Visual Battle Environment.
 * The reason why fogs aren't made for battle is because the way fogs are
 * handled in map vary from how they would be handled in battle. Using the
 * Visual Fogs Plugin Commands will only alter the fog appearances when the
 * player finishes battle.
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
 * ---
 * 
 * === Fog-Related Notetags ===
 * 
 * ---
 *
 * <Fog id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Fog id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular fog layer for this map by default.
 * - Replace 'id' with a number value to assign to the fog.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no fog will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a fog found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the fog.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the fog to only scroll when the map scrolls.
 * - This has the same effect as naming a fog with "!" in front of
 *   its filename.
 * - If the filename used for this fog has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the fog.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the fog.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the fog to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   fog each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the fog.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - This feature cannot be used with looping maps.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Tile Blur: x
 * 
 * - Determines how soft the borders are around the revealed fog tiles.
 * - Use larger numbers to blur them more.
 * - Use a value of zero to remove any blur.
 * 
 * ---
 * 
 * Tile Spill: x
 * 
 * - Determines how much larger to make the revealed fog tiles.
 * - Use larger numbers to spill more and make the tiles larger.
 * - Use a value of zero to not spill at all and use the exact tile sizes.
 * 
 * ---
 * 
 * Vignette: type
 * 
 * - Makes the fog appear along the edge of the screen rather than the entire
 *   visible game screen.
 * - Replace 'type' with any of the following:
 *   - Border
 *   - Horizontal
 *   - Vertical
 *   - Upper
 *   - Lower
 *   - Left
 *   - Right
 * 
 * ---
 * 
 * Custom Vignette: filename
 * 
 * - Allows you to use a custom parallax image as a vignette.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a vignette found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Custom vignettes are used as masks.
 *   - White areas on the image determine the visible parts of the fog.
 *   - Black areas on the image determine the invisible parts of the fog.
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
 * === Fog Plugin Commands ===
 * 
 * ---
 *
 * Fog: Add/Change Settings
 * - Add/Change settings for target fog.
 * - Does not alter the map editor's fog.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this fog to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the fog?
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 * 
 *       Map Lock?:
 *       - Lock the fog to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the fog horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the fog vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this fog?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the fog?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this fog's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the fog?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 * 
 *       Tile Blur:
 *       - What's the blur level you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *       Tile Spill:
 *       - What's the spill amount you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *     Vignette:
 *
 *       Type:
 *       - What vignette do you want to use for this fog?
 *       - This will override location settings.
 * 
 *       Custom:
 *       - Do you wish to use a custom vignette instead?
 *       - Automatically changes the type to "Custom".
 *
 * ---
 * 
 * Fog: Fade Opacity
 * - Fades the target fog(s) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which fog(s)?
 *   - Cannot target the map editor's fog.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Fog: Remove
 * - Removes target fog(s).
 *
 *   ID(s):
 *   - Remove which fog(s)?
 *   - Cannot remove the map editor's fog.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * The below are the default settings when it comes to creating fogs through
 * map notetags.
 *
 * ---
 *
 * Defaults
 * 
 *   Fog Opacity:
 *   - What is the default fog opacity level for map notetags?
 * 
 *   Blend Mode:
 *   - What is the default fog blend mode for map notetags?
 *     - Normal
 *     - Additive
 *     - Multiply
 *     - Screen
 * 
 *   Tile Blur:
 *   - What is the default fog tile blur intensity for map notetags?
 * 
 *   Tile Spill:
 *   - What is the default fog tile spill amount for map notetags?
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.07: August 4, 2022
 * * Compatibility Update!
 * ** Vignettes now work better with zoom.
 * 
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the fogs to behave more like they do for
 *    pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 *     battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why fogs aren't made for battle is because the
 *     way fogs are handled in map vary from how they would be handled in
 *     battle. Using the Visual Fogs Plugin Commands will only alter the fog
 *     appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.04: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Added a clause we forgot to mention that region-locked fog effects only
 *    work on maps with no looping. A note will be added to the "Regions and
 *    Terrain Tags" and notetag sections. We apologize for any inconveniences
 *    this may cause.
 * 
 * Version 1.01: May 7, 2021
 * * Bug Fixes!
 * ** Cached vignettes will no longer be cleared from memory. Fix by Irina.
 *
 * Version 1.00 Official Release Date: March 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogAddChangeSettings
 * @text Fog: Add/Change Settings
 * @desc Add/Change settings for target fog.
 * Does not alter the map editor's fog.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this fog to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the fog?
 * @default >>>ATTENTION<<<
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Fogs.
 * @default {"Scrolling":"","_fogZero:eval":"false","_fogLoopX:eval":"false","_fogSx:eval":"+0","_fogLoopY:eval":"false","_fogSy:eval":"+0","Appearance":"","opacity:eval":"200","blendMode:eval":"1","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]","maskBlur:eval":"10","maskSpill:eval":"10","Vignette":"","vignette:str":"None","vignetteFilename:str":""}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogFadeOpacity
 * @text Fog: Fade Opacity
 * @desc Fades the target fog(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which fog(s)?
 * Cannot target the map editor's fog.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogRemove
 * @text Fog: Remove
 * @desc Removes target fog(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which fog(s)?
 * Cannot remove the map editor's fog.
 * @default ["1"]
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
 * @param VisualFogs
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Defaults
 *
 * @param FogOpacity:num
 * @text Fog Opacity
 * @parent Defaults
 * @type number
 * @max 255
 * @desc What is the default fog opacity level for map notetags?
 * @default 200
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Defaults
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What is the default fog blend mode for map notetags?
 * @default 1
 *
 * @param MaskBlur:num
 * @text Tile Blur
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile blur intensity for map notetags?
 * @default 10
 *
 * @param MaskSpill:num
 * @text Tile Spill
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile spill amount for map notetags?
 * @default 10
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
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _fogZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the fog to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _fogLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSx:eval
 * @text Scroll:
 * @parent _fogLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _fogLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSy:eval
 * @text Scroll:
 * @parent _fogLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this fog?
 * You may use JavaScript code.
 * @default 200
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the fog?
 * You may use JavaScript code.
 * @default 1
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this fog's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the fog?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskBlur:eval
 * @text Tile Blur
 * @parent Location
 * @desc What's the blur level you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 *
 * @param maskSpill:eval
 * @text Tile Spill
 * @parent Location
 * @desc What's the spill amount you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 * 
 * @param Vignette
 *
 * @param vignette:str
 * @text Type
 * @parent Vignette
 * @type select
 * @option None
 * @option Border
 * @option Horizontal
 * @option Vertical
 * @option Upper
 * @option Lower
 * @option Left
 * @option Right
 * @desc What vignette do you want to use for this fog?
 * This will override location settings.
 * @default None
 *
 * @param vignetteFilename:str
 * @text Custom
 * @parent Vignette
 * @type file
 * @dir img/parallaxes/
 * @desc Do you wish to use a custom vignette instead?
 * Automatically changes the type to "Custom".
 * @default 
 *
 */
//=============================================================================

const _0x2be277=_0x4972;(function(_0x257361,_0x524862){const _0x364325=_0x4972,_0x128c54=_0x257361();while(!![]){try{const _0x431b00=-parseInt(_0x364325(0x203))/0x1*(parseInt(_0x364325(0x168))/0x2)+parseInt(_0x364325(0x16c))/0x3+parseInt(_0x364325(0x1cf))/0x4*(parseInt(_0x364325(0x106))/0x5)+-parseInt(_0x364325(0x154))/0x6+-parseInt(_0x364325(0x1c8))/0x7+parseInt(_0x364325(0x1f5))/0x8+parseInt(_0x364325(0x17f))/0x9*(parseInt(_0x364325(0x1b0))/0xa);if(_0x431b00===_0x524862)break;else _0x128c54['push'](_0x128c54['shift']());}catch(_0x1f0651){_0x128c54['push'](_0x128c54['shift']());}}}(_0x3d40,0xe007e));function _0x3d40(){const _0xa801f3=['_fogZero','setup','hue','length','split','kYSMy','gZOmV','ARRAYSTR','removeChild','FogAddChangeSettings','max','oBEvR','width','qsdxg','clamp','_fogX','PurTO','format','initialize','20030YvUaaa','custom','getFogVignette_empty','kGOxC','SCREEN','ADDITIVE','MaskTerrainTags','TemplateSettings','STR','XMjoq','ifjou','constructor','registerCommand','sort','bitmap','dZIOf','Game_Map_setDisplayPos','scrollRight','call','createWeather','exit','_fogVignettes','zoomScale','Game_Map_updateParallax','11064662bCALBG','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','RegExp','updateBlendMode','list','DEFAULT_FOG_OPACITY','OeNQH','1468728MIyngY','_baseSprite','CWEXr','getVisualFogOx','updateParallax','createMaskSprite','MULTIPLY','horizontal','FUNC','createMaskTileBitmap','_fogName','blur','_fogDataRef','TEsGw','Filename','_createColorFilter','Start','move','indexOf','ykSUg','rgba(0,\x200,\x200,\x200)','_displayX','jSpzu','KUcSB','tileWidth','border','parameters','lqkEz','scrollLeft','loadTemplateVignette','screenTileY','settings','DTzWv','createFogContainer','match','findTargetVisualFog','Game_Map_scrollRight','Spriteset_Map_createWeather','9632504HXPAYo','targetOpacity','LCsuc','Game_Map_setup','getFogVignette_horizontal','OpacityFlat','setDisplayPos','filters','addChild','End','createMaskBitmap','_colorFilter','updateOpacity','upper','9quootM','Settings','round','ScrollLock','_fogY','loadParallax','getVisualFogs','createNewFogLayer','blendMode','20HKeRDA','>>>ATTENTION<<<','getFogVignette','isLoopHorizontal','vignetteFilename','vnuhP','scrollUp','BlurFilter','ARRAYSTRUCT','_displayY','bind','_updateColorFilter','trim','HorzLoop','tileHeight','version','loadCustomVignette','_maskSprite','MaskBlur','mytyx','displayY','clone','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateMask','parse','colorTone','YQxhN','CreateLayerData','maskTerrainTags','JSSVK','height','scrollDown','maskRegions','_colorTone','description','_spriteset','maskBlur','woVuZ','Tone','drawMaskTile','screenTileX','note','opacityDuration','updateVisualFogSettings','#ffffff','_fogSx','DTxFz','sortVisualFogs','createFogLayers','addChangeVisualFog','NUM','addLoadListener','ConvertParams','setHue','isLoopVertical','_visualFogSettings','opacity','_fogContainer','left','updateHue','okJfn','vignette','MaskSpill','_id','DEFAULT_FOG_TILE_SPILL','VNSwY','getFogVignette_border','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','OpacityRate','OpgYr','DEFAULT_FOG_TILE_BLUR','NtnRk','prototype','none','lower','status','_fogLoopX','equals','3627846LAolbT','_blurFilter','tbLGC','right','origin','Game_Map_scrollLeft','iIBYi','Game_Map_scrollDown','push','UZNVk','mjTwh','_fogLoopY','getVisualFogOy','RKmdX','_hue','SpriteMaskFilter','DEFAULT_FOG_BLEND_MODE','vertical','FogFadeOpacity','updateVisualFogLayer','111762ZEAmMy','isInstanceOfSceneMap','LbPMN','empty','2084154FmRNml','filename','pMRyb','Game_Map_scrollUp','removeVisualFogLayer','updateOrigin','ezKCj','isSceneMap','setColorTone','VisualFogs','toLowerCase','ARRAYFUNC','scale','bNEWQ','getVisualFogSettings','_customModified','fillRect','maskSpill','ybqTN','1071SIRwik','includes','charAt','NORMAL','FogOpacity','ceil','_fogSy','toUpperCase','regionId','removeVisualFog','STRUCT','CaAnw','vacyw','TGPrY','Argument\x20must\x20be\x20an\x20array','loadBitmap','makeDeepCopy','updateTone','JSON','gradientFillRect','YZNAY','name','tcayt','VdThC','_maskFilter','map','hueShift','BlendMode','ARRAYNUM','_scene'];_0x3d40=function(){return _0xa801f3;};return _0x3d40();}var label=_0x2be277(0x175),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3a7365){const _0xed763=_0x2be277;return _0x3a7365[_0xed763(0x151)]&&_0x3a7365[_0xed763(0x128)][_0xed763(0x180)]('['+label+']');})[0x0];function _0x4972(_0x54c498,_0x3c01b3){const _0x3d40ed=_0x3d40();return _0x4972=function(_0x4972a5,_0x56245c){_0x4972a5=_0x4972a5-0xfe;let _0x23d711=_0x3d40ed[_0x4972a5];return _0x23d711;},_0x4972(_0x54c498,_0x3c01b3);}VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x2be277(0x13a)]=function(_0x59fb08,_0x5326bd){const _0x120bce=_0x2be277;for(const _0x2ecd59 in _0x5326bd){if('bNEWQ'!==_0x120bce(0x179))this[_0x120bce(0x162)]=_0x51f64a(_0x525e85),this['_updateColorFilter']();else{if(_0x2ecd59[_0x120bce(0x1f1)](/(.*):(.*)/i)){const _0x1ec0a8=String(RegExp['$1']),_0x183ce4=String(RegExp['$2'])[_0x120bce(0x186)]()[_0x120bce(0x112)]();let _0x932150,_0x30b07b,_0x4157bd;switch(_0x183ce4){case _0x120bce(0x138):_0x932150=_0x5326bd[_0x2ecd59]!==''?Number(_0x5326bd[_0x2ecd59]):0x0;break;case _0x120bce(0x19b):_0x30b07b=_0x5326bd[_0x2ecd59]!==''?JSON['parse'](_0x5326bd[_0x2ecd59]):[],_0x932150=_0x30b07b[_0x120bce(0x198)](_0x4ffa4c=>Number(_0x4ffa4c));break;case'EVAL':_0x932150=_0x5326bd[_0x2ecd59]!==''?eval(_0x5326bd[_0x2ecd59]):null;break;case'ARRAYEVAL':_0x30b07b=_0x5326bd[_0x2ecd59]!==''?JSON['parse'](_0x5326bd[_0x2ecd59]):[],_0x932150=_0x30b07b[_0x120bce(0x198)](_0x2e62e9=>eval(_0x2e62e9));break;case _0x120bce(0x191):_0x932150=_0x5326bd[_0x2ecd59]!==''?JSON[_0x120bce(0x11e)](_0x5326bd[_0x2ecd59]):'';break;case'ARRAYJSON':_0x30b07b=_0x5326bd[_0x2ecd59]!==''?JSON['parse'](_0x5326bd[_0x2ecd59]):[],_0x932150=_0x30b07b[_0x120bce(0x198)](_0x1304c5=>JSON[_0x120bce(0x11e)](_0x1304c5));break;case _0x120bce(0x1d7):_0x932150=_0x5326bd[_0x2ecd59]!==''?new Function(JSON['parse'](_0x5326bd[_0x2ecd59])):new Function('return\x200');break;case _0x120bce(0x177):_0x30b07b=_0x5326bd[_0x2ecd59]!==''?JSON[_0x120bce(0x11e)](_0x5326bd[_0x2ecd59]):[],_0x932150=_0x30b07b[_0x120bce(0x198)](_0x28439a=>new Function(JSON[_0x120bce(0x11e)](_0x28439a)));break;case _0x120bce(0x1b8):_0x932150=_0x5326bd[_0x2ecd59]!==''?String(_0x5326bd[_0x2ecd59]):'';break;case _0x120bce(0x1a4):_0x30b07b=_0x5326bd[_0x2ecd59]!==''?JSON[_0x120bce(0x11e)](_0x5326bd[_0x2ecd59]):[],_0x932150=_0x30b07b[_0x120bce(0x198)](_0xffc0f3=>String(_0xffc0f3));break;case _0x120bce(0x189):_0x4157bd=_0x5326bd[_0x2ecd59]!==''?JSON[_0x120bce(0x11e)](_0x5326bd[_0x2ecd59]):{},_0x932150=VisuMZ['ConvertParams']({},_0x4157bd);break;case _0x120bce(0x10e):_0x30b07b=_0x5326bd[_0x2ecd59]!==''?JSON[_0x120bce(0x11e)](_0x5326bd[_0x2ecd59]):[],_0x932150=_0x30b07b[_0x120bce(0x198)](_0x42baff=>VisuMZ[_0x120bce(0x13a)]({},JSON[_0x120bce(0x11e)](_0x42baff)));break;default:continue;}_0x59fb08[_0x1ec0a8]=_0x932150;}}}return _0x59fb08;},(_0x466d33=>{const _0x1e4704=_0x2be277,_0x27e4cb=_0x466d33[_0x1e4704(0x194)];for(const _0x1faef2 of dependencies){if(_0x1e4704(0x161)===_0x1e4704(0x161)){if(!Imported[_0x1faef2]){alert(_0x1e4704(0x1c9)['format'](_0x27e4cb,_0x1faef2)),SceneManager[_0x1e4704(0x1c4)]();break;}}else _0x14ca3e[_0x1e4704(0x101)]+=_0x413326['_fogSy']/this['tileHeight']()/0x2;}const _0x530dcb=_0x466d33[_0x1e4704(0x128)];if(_0x530dcb[_0x1e4704(0x1f1)](/\[Version[ ](.*?)\]/i)){const _0x3983c6=Number(RegExp['$1']);_0x3983c6!==VisuMZ[label][_0x1e4704(0x115)]&&(alert(_0x1e4704(0x149)['format'](_0x27e4cb,_0x3983c6)),SceneManager[_0x1e4704(0x1c4)]());}if(_0x530dcb['match'](/\[Tier[ ](\d+)\]/i)){const _0x11f54f=Number(RegExp['$1']);_0x11f54f<tier?_0x1e4704(0x1dc)===_0x1e4704(0x1a2)?_0x34c062[_0x1e4704(0x188)](_0xd5d0c1):(alert(_0x1e4704(0x11c)['format'](_0x27e4cb,_0x11f54f,tier)),SceneManager['exit']()):tier=Math[_0x1e4704(0x1a7)](_0x11f54f,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x466d33[_0x1e4704(0x1e9)]);})(pluginData),VisuMZ[_0x2be277(0x175)][_0x2be277(0x1b7)]=function(){const _0xd1d84f=_0x2be277;return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':Game_Map[_0xd1d84f(0x1cd)],'targetOpacity':Game_Map['DEFAULT_FOG_OPACITY'],'opacityDuration':0x0,'blendMode':Game_Map[_0xd1d84f(0x164)],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':Game_Map[_0xd1d84f(0x14c)],'maskSpill':Game_Map[_0xd1d84f(0x146)],'vignette':'none','vignetteFilename':''};},PluginManager[_0x2be277(0x1bc)](pluginData['name'],_0x2be277(0x1a6),_0x1932e5=>{const _0x1f79c2=_0x2be277;VisuMZ[_0x1f79c2(0x13a)](_0x1932e5,_0x1932e5);if(_0x1932e5['id']<=0x0)return;if(_0x1932e5[_0x1f79c2(0x16d)]===''||_0x1932e5[_0x1f79c2(0x16d)]===_0x1f79c2(0x107))return;let _0x565feb=JsonEx[_0x1f79c2(0x18f)](_0x1932e5['Optional']);if(!_0x565feb['hasOwnProperty'](_0x1f79c2(0x126)))_0x565feb=VisuMZ['VisualFogs'][_0x1f79c2(0x1b7)]();_0x565feb[_0x1f79c2(0x16d)]=_0x1932e5['filename'],_0x565feb['id']=_0x1932e5['id'];while(_0x565feb[_0x1f79c2(0x11f)]['length']<0x4){if(_0x1f79c2(0x195)!==_0x1f79c2(0x195)){const _0x1fda53=this[_0x1f79c2(0x1ee)]()[_0x1f79c2(0x143)];this[_0x1f79c2(0x117)]['bitmap']=_0x1dd430[_0x1f79c2(0x108)](_0x1fda53);}else _0x565feb[_0x1f79c2(0x11f)]['push'](0x0);}_0x565feb['_fogX']=0x0,_0x565feb[_0x1f79c2(0x101)]=0x0,_0x565feb[_0x1f79c2(0x1f6)]=_0x1932e5['opacity'],_0x565feb[_0x1f79c2(0x130)]=0x0,_0x565feb['vignette']=_0x565feb['vignette']||_0x1f79c2(0x14f),_0x565feb['vignette']=_0x565feb['vignette'][_0x1f79c2(0x176)]()['trim'](),_0x565feb[_0x1f79c2(0x10a)]!==''&&('tVgvG'===_0x1f79c2(0x134)?(_0x37c3e1['loadBitmap'](),_0x4ab40a&&_0x14319e[_0x1f79c2(0x1be)]['addLoadListener'](_0x39ab3f['createMaskBitmap'][_0x1f79c2(0x110)](_0x282950))):_0x565feb[_0x1f79c2(0x143)]='custom'),$gameMap[_0x1f79c2(0x137)](_0x565feb);}),PluginManager[_0x2be277(0x1bc)](pluginData[_0x2be277(0x194)],_0x2be277(0x166),_0x58a6b9=>{const _0x50900d=_0x2be277;if(!SceneManager[_0x50900d(0x169)]())return;VisuMZ[_0x50900d(0x13a)](_0x58a6b9,_0x58a6b9);const _0x1494eb=_0x58a6b9[_0x50900d(0x1cc)];for(const _0x545783 of _0x1494eb){const _0x66e6ad=$gameMap['getVisualFogSettings'](_0x545783);if(!_0x66e6ad)continue;_0x66e6ad[_0x50900d(0x1f6)]=_0x58a6b9[_0x50900d(0x1f6)]||0x0,_0x66e6ad[_0x50900d(0x130)]=_0x58a6b9['opacityDuration']||0x0,_0x66e6ad[_0x50900d(0x130)]<=0x0&&(_0x50900d(0x1b9)!=='XMjoq'?(this[_0x50900d(0x158)]['x']=_0x2415b5['getVisualFogOx'](this[_0x50900d(0x145)]),this[_0x50900d(0x158)]['y']=_0x406002[_0x50900d(0x160)](this[_0x50900d(0x145)])):_0x66e6ad['opacity']=_0x66e6ad['targetOpacity']);}}),PluginManager[_0x2be277(0x1bc)](pluginData[_0x2be277(0x194)],'FogRemove',_0x4da2c3=>{const _0x361123=_0x2be277;if(!SceneManager[_0x361123(0x169)]())return;VisuMZ[_0x361123(0x13a)](_0x4da2c3,_0x4da2c3);const _0x2ab86d=_0x4da2c3[_0x361123(0x1cc)];for(const _0xed4873 of _0x2ab86d){'ejLzg'!==_0x361123(0x1ce)?$gameMap[_0x361123(0x188)](_0xed4873):(!this[_0x361123(0x200)]&&this['_createColorFilter'](),this[_0x361123(0x200)][_0x361123(0x13b)](this[_0x361123(0x162)]),this[_0x361123(0x200)][_0x361123(0x174)](this[_0x361123(0x127)]));}}),VisuMZ[_0x2be277(0x175)][_0x2be277(0x1ca)]={'Start':/<(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'MaskBlur':/(?:TILE BLUR|BLUR):[ ](.*)/i,'MaskSpill':/(?:TILE SPILL|SPILL):[ ](.*)/i,'CustomVignette':/CUSTOM (?:VIGNETTE|OVERLAY):[ ](.*)/i,'PremadeVignette':/(?:VIGNETTE|OVERLAY):[ ](.*)/i},ImageManager['getFogVignette']=function(_0x24945f){const _0x5e025a=_0x2be277;if(!_0x24945f)return this[_0x5e025a(0x1b2)]();this[_0x5e025a(0x1c5)]=this['_fogVignettes']||{},_0x24945f=_0x24945f[_0x5e025a(0x176)]()[_0x5e025a(0x112)]();const _0x46d498='getFogVignette_%1'['format'](_0x24945f);if(this['_fogVignettes'][_0x24945f])return this[_0x5e025a(0x1c5)][_0x24945f];else{if(this[_0x46d498]){if('UnqPm'!=='tcNlP')return this[_0x46d498]();else{const _0x212ade=_0x3d8f92(_0x2fc65f['$1']);_0x212ade!==_0xc53f51[_0xde2e4c][_0x5e025a(0x115)]&&(_0x4d4e25(_0x5e025a(0x149)[_0x5e025a(0x1ae)](_0x1a95da,_0x212ade)),_0x3f44ac[_0x5e025a(0x1c4)]());}}else return this[_0x5e025a(0x1b2)]();}},ImageManager['getFogVignette_empty']=function(){const _0x52bd6b=_0x2be277;if(this[_0x52bd6b(0x1c5)][_0x52bd6b(0x16b)])return this[_0x52bd6b(0x1c5)][_0x52bd6b(0x16b)];const _0x3b6036=new Bitmap(Graphics['width'],Graphics['height']);return _0x3b6036[_0x52bd6b(0x17c)](0x0,0x0,_0x3b6036['width'],_0x3b6036[_0x52bd6b(0x124)],_0x52bd6b(0x132)),_0x3b6036[_0x52bd6b(0x17b)]=![],this[_0x52bd6b(0x1c5)]=this['_fogVignettes']||{},this[_0x52bd6b(0x1c5)][_0x52bd6b(0x16b)]=_0x3b6036,_0x3b6036;},ImageManager['getFogVignette_upper']=function(){const _0x504f54=_0x2be277,_0x5179c2=new Bitmap(Graphics[_0x504f54(0x1a9)],Graphics[_0x504f54(0x124)]),_0x10d66d='rgba(0,\x200,\x200,\x200)',_0xb5b6db=_0x504f54(0x132);return _0x5179c2[_0x504f54(0x192)](0x0,0x0,Graphics[_0x504f54(0x1a9)],Math[_0x504f54(0x184)](Graphics[_0x504f54(0x124)]/0x3),_0xb5b6db,_0x10d66d,!![]),_0x5179c2[_0x504f54(0x17b)]=![],this[_0x504f54(0x1c5)]=this[_0x504f54(0x1c5)]||{},this['_fogVignettes'][_0x504f54(0x202)]=_0x5179c2,_0x5179c2;},ImageManager['getFogVignette_lower']=function(){const _0x51a8dc=_0x2be277,_0x48d3aa=new Bitmap(Graphics[_0x51a8dc(0x1a9)],Graphics['height']),_0x85b380='rgba(0,\x200,\x200,\x200)',_0x4d4e6e=_0x51a8dc(0x132);return _0x48d3aa['gradientFillRect'](0x0,Math[_0x51a8dc(0x184)](Graphics[_0x51a8dc(0x124)]*0x2/0x3),Graphics['width'],Math['ceil'](Graphics[_0x51a8dc(0x124)]/0x3),_0x85b380,_0x4d4e6e,!![]),_0x48d3aa[_0x51a8dc(0x17b)]=![],this[_0x51a8dc(0x1c5)]=this[_0x51a8dc(0x1c5)]||{},this[_0x51a8dc(0x1c5)][_0x51a8dc(0x150)]=_0x48d3aa,_0x48d3aa;},ImageManager[_0x2be277(0x1f9)]=function(){const _0x15bdf2=_0x2be277,_0x35bddc=new Bitmap(Graphics['width'],Graphics[_0x15bdf2(0x124)]),_0x2f43f5=_0x15bdf2(0x1e3),_0x3c7e8b=_0x15bdf2(0x132);return _0x35bddc[_0x15bdf2(0x192)](0x0,0x0,Graphics[_0x15bdf2(0x1a9)],Math[_0x15bdf2(0x184)](Graphics[_0x15bdf2(0x124)]/0x3),_0x3c7e8b,_0x2f43f5,!![]),_0x35bddc['gradientFillRect'](0x0,Math['ceil'](Graphics[_0x15bdf2(0x124)]*0x2/0x3),Graphics[_0x15bdf2(0x1a9)],Math[_0x15bdf2(0x184)](Graphics[_0x15bdf2(0x124)]/0x3),_0x2f43f5,_0x3c7e8b,!![]),_0x35bddc['_customModified']=![],this[_0x15bdf2(0x1c5)]=this[_0x15bdf2(0x1c5)]||{},this[_0x15bdf2(0x1c5)][_0x15bdf2(0x1d6)]=_0x35bddc,_0x35bddc;},ImageManager['getFogVignette_left']=function(){const _0x44a2ce=_0x2be277,_0x45f2d9=new Bitmap(Graphics[_0x44a2ce(0x1a9)],Graphics[_0x44a2ce(0x124)]),_0x424e67=_0x44a2ce(0x1e3),_0x2ca5ff=_0x44a2ce(0x132);return _0x45f2d9[_0x44a2ce(0x192)](0x0,0x0,Math[_0x44a2ce(0x184)](Graphics[_0x44a2ce(0x1a9)]/0x3),Graphics[_0x44a2ce(0x124)],_0x2ca5ff,_0x424e67,![]),_0x45f2d9['_customModified']=![],this[_0x44a2ce(0x1c5)]=this[_0x44a2ce(0x1c5)]||{},this[_0x44a2ce(0x1c5)][_0x44a2ce(0x140)]=_0x45f2d9,_0x45f2d9;},ImageManager['getFogVignette_right']=function(){const _0x2cce2e=_0x2be277,_0x23830a=new Bitmap(Graphics[_0x2cce2e(0x1a9)],Graphics[_0x2cce2e(0x124)]),_0x1056ad=_0x2cce2e(0x1e3),_0x36be23='#ffffff';return _0x23830a['gradientFillRect'](Math[_0x2cce2e(0x184)](Graphics[_0x2cce2e(0x1a9)]*0x2/0x3),0x0,Math[_0x2cce2e(0x184)](Graphics['width']/0x3),Graphics[_0x2cce2e(0x124)],_0x1056ad,_0x36be23,![]),_0x23830a[_0x2cce2e(0x17b)]=![],this[_0x2cce2e(0x1c5)]=this[_0x2cce2e(0x1c5)]||{},this['_fogVignettes'][_0x2cce2e(0x157)]=_0x23830a,_0x23830a;},ImageManager['getFogVignette_vertical']=function(){const _0x5639a8=_0x2be277,_0x25764f=new Bitmap(Graphics[_0x5639a8(0x1a9)],Graphics[_0x5639a8(0x124)]),_0x2949cd='rgba(0,\x200,\x200,\x200)',_0x4bc851=_0x5639a8(0x132);return _0x25764f[_0x5639a8(0x192)](0x0,0x0,Math[_0x5639a8(0x184)](Graphics[_0x5639a8(0x1a9)]/0x3),Graphics[_0x5639a8(0x124)],_0x4bc851,_0x2949cd,![]),_0x25764f[_0x5639a8(0x192)](Math[_0x5639a8(0x184)](Graphics[_0x5639a8(0x1a9)]*0x2/0x3),0x0,Math[_0x5639a8(0x184)](Graphics[_0x5639a8(0x1a9)]/0x3),Graphics[_0x5639a8(0x124)],_0x2949cd,_0x4bc851,![]),_0x25764f[_0x5639a8(0x17b)]=![],this[_0x5639a8(0x1c5)]=this[_0x5639a8(0x1c5)]||{},this[_0x5639a8(0x1c5)][_0x5639a8(0x165)]=_0x25764f,_0x25764f;},ImageManager[_0x2be277(0x148)]=function(){const _0xb52c8f=_0x2be277,_0xc1914a=new Bitmap(Graphics[_0xb52c8f(0x1a9)],Graphics[_0xb52c8f(0x124)]),_0x53fe6b=_0xb52c8f(0x1e3),_0x20b49b=_0xb52c8f(0x132);return _0xc1914a['gradientFillRect'](0x0,0x0,Graphics[_0xb52c8f(0x1a9)],Math[_0xb52c8f(0x184)](Graphics['height']/0x3),_0x20b49b,_0x53fe6b,!![]),_0xc1914a[_0xb52c8f(0x192)](0x0,Math[_0xb52c8f(0x184)](Graphics[_0xb52c8f(0x124)]*0x2/0x3),Graphics[_0xb52c8f(0x1a9)],Math[_0xb52c8f(0x184)](Graphics['height']/0x3),_0x53fe6b,_0x20b49b,!![]),_0xc1914a[_0xb52c8f(0x192)](0x0,0x0,Math['ceil'](Graphics['width']/0x3),Graphics['height'],_0x20b49b,_0x53fe6b,![]),_0xc1914a[_0xb52c8f(0x192)](Math[_0xb52c8f(0x184)](Graphics[_0xb52c8f(0x1a9)]*0x2/0x3),0x0,Math[_0xb52c8f(0x184)](Graphics[_0xb52c8f(0x1a9)]/0x3),Graphics[_0xb52c8f(0x124)],_0x53fe6b,_0x20b49b,![]),_0xc1914a[_0xb52c8f(0x17b)]=![],this['_fogVignettes']=this[_0xb52c8f(0x1c5)]||{},this[_0xb52c8f(0x1c5)][_0xb52c8f(0x1e8)]=_0xc1914a,_0xc1914a;},SceneManager[_0x2be277(0x173)]=function(){const _0x4c401e=_0x2be277;return this['_scene']&&this[_0x4c401e(0x19c)][_0x4c401e(0x1bb)]===Scene_Map;},SceneManager[_0x2be277(0x169)]=function(){const _0x3a7978=_0x2be277;return this[_0x3a7978(0x19c)]&&this['_scene']instanceof Scene_Map;},VisuMZ['VisualFogs']['Game_Map_setup']=Game_Map[_0x2be277(0x14e)][_0x2be277(0x19e)],Game_Map[_0x2be277(0x14e)][_0x2be277(0x19e)]=function(_0x4ec619){const _0x4ca822=_0x2be277;VisuMZ[_0x4ca822(0x175)][_0x4ca822(0x1f8)][_0x4ca822(0x1c2)](this,_0x4ec619),this['setupVisualFogs']();},Game_Map[_0x2be277(0x1cd)]=VisuMZ[_0x2be277(0x175)][_0x2be277(0xfe)][_0x2be277(0x183)],Game_Map[_0x2be277(0x164)]=VisuMZ[_0x2be277(0x175)][_0x2be277(0xfe)][_0x2be277(0x19a)],Game_Map[_0x2be277(0x14c)]=VisuMZ[_0x2be277(0x175)]['Settings'][_0x2be277(0x118)],Game_Map[_0x2be277(0x146)]=VisuMZ[_0x2be277(0x175)][_0x2be277(0xfe)][_0x2be277(0x144)],Game_Map[_0x2be277(0x14e)]['setupVisualFogs']=function(){const _0x49b947=_0x2be277;this[_0x49b947(0x13d)]=[null];if(!$dataMap)return;const _0x2d64d0=VisuMZ[_0x49b947(0x175)][_0x49b947(0x121)]();for(const _0x2b361c of _0x2d64d0){if(_0x49b947(0x1bf)!==_0x49b947(0x18b)){if(!_0x2b361c)continue;this[_0x49b947(0x13d)][_0x2b361c['id']]=_0x2b361c;}else _0x259fe5=!![];}},VisuMZ[_0x2be277(0x175)]['CreateLayerData']=function(){const _0x526ecf=_0x2be277;if(!$dataMap)return[];const _0x4c2778=[],_0x4b0a9c=VisuMZ[_0x526ecf(0x175)][_0x526ecf(0x1b7)]();if(!$dataMap[_0x526ecf(0x12f)])return[];const _0x37ce2f=VisuMZ[_0x526ecf(0x175)][_0x526ecf(0x1ca)],_0x31da04=$dataMap[_0x526ecf(0x12f)]['split'](/[\r\n]+/);let _0x4905c7=JsonEx[_0x526ecf(0x18f)](_0x4b0a9c);for(const _0x11c2f4 of _0x31da04){if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x1df)]))_0x526ecf(0x12b)===_0x526ecf(0x156)?this[_0x526ecf(0x162)]!==_0x1b71c7(_0x30b74b)&&(this['_hue']=_0x1b66ff(_0x13af8b),this['_updateColorFilter']()):_0x4905c7['id']=Number(RegExp['$1']);else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x1fe)])){const _0x36b5cc=Number(RegExp['$1']);if(_0x36b5cc>0x0&&_0x36b5cc===_0x4905c7['id']&&_0x4905c7['filename']!=='')_0x4c2778[_0x526ecf(0x15c)](_0x4905c7);_0x4905c7=JsonEx['makeDeepCopy'](_0x4b0a9c);}else{if(_0x4905c7['id']<=0x0)continue;}}if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x1dd)]))_0x4905c7[_0x526ecf(0x16d)]=String(RegExp['$1'])[_0x526ecf(0x112)](),_0x4905c7[_0x526ecf(0x16d)][_0x526ecf(0x181)](0x0)==='!'&&(_0x526ecf(0x142)===_0x526ecf(0x142)?_0x4905c7['_fogZero']=!![]:_0x1b26fc[_0x526ecf(0x101)]=this[_0x526ecf(0x10f)]);else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x113)])){if('fIKdW'!==_0x526ecf(0x10b))_0x4905c7[_0x526ecf(0x152)]=!![],_0x4905c7['_fogSx']=Number(RegExp['$1'])||0x0;else return this[_0x50ee5a]();}else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f['VertLoop']))_0x526ecf(0x172)===_0x526ecf(0x172)?(_0x4905c7[_0x526ecf(0x15f)]=!![],_0x4905c7['_fogSy']=Number(RegExp['$1'])||0x0):(this[_0x526ecf(0x104)](_0x400bd7['getVisualFogSettings'](_0x48ef6e)),this[_0x526ecf(0x135)]());else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x100)]))_0x4905c7[_0x526ecf(0x19d)]=!![];else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x14a)])){const _0x265753=Number(RegExp['$1'])*0.01;_0x4905c7['opacity']=Math[_0x526ecf(0xff)](_0x265753*0xff)[_0x526ecf(0x1ab)](0x0,0xff);}else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x1fa)]))_0x4905c7['opacity']=Number(RegExp['$1'])[_0x526ecf(0x1ab)](0x0,0xff);else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x19a)])){const _0x2fddad=String(RegExp['$1'])[_0x526ecf(0x186)]()['trim'](),_0x2d9bd1=[_0x526ecf(0x182),'ADDITIVE',_0x526ecf(0x1d5),_0x526ecf(0x1b4)];_0x4905c7[_0x526ecf(0x105)]=_0x2d9bd1['indexOf'](_0x2fddad)[_0x526ecf(0x1ab)](0x0,0x3);}else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f['Hue']))_0x4905c7[_0x526ecf(0x19f)]=Number(RegExp['$1'])[_0x526ecf(0x1ab)](0x0,0x168);else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f['HueShift']))_0x4905c7[_0x526ecf(0x199)]=Number(RegExp['$1'])||0x0;else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x12c)])){if(_0x526ecf(0x193)===_0x526ecf(0x193)){const _0x468ff8=String(RegExp['$1'])[_0x526ecf(0x1a1)](',')[_0x526ecf(0x198)](_0x2f7ea2=>Number(_0x2f7ea2)||0x0);while(_0x468ff8[_0x526ecf(0x1a0)]<0x4)_0x468ff8[_0x526ecf(0x15c)](0x0);_0x4905c7[_0x526ecf(0x11f)]=_0x468ff8;}else _0x2b7b8c[_0x526ecf(0x1ac)]=_0x282a5f;}else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f['MaskRegions'])){if('ntpmc'!==_0x526ecf(0x1d1)){const _0x116c4a=String(RegExp['$1'])[_0x526ecf(0x1a1)](',')[_0x526ecf(0x198)](_0x1d8114=>Number(_0x1d8114)||0x1);_0x4905c7[_0x526ecf(0x126)]=_0x116c4a;}else _0x5a55ec[_0x526ecf(0x170)](_0x416d55);}else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x1b6)])){const _0xc58068=String(RegExp['$1'])[_0x526ecf(0x1a1)](',')[_0x526ecf(0x198)](_0x3f435a=>Number(_0x3f435a)||0x1);_0x4905c7[_0x526ecf(0x122)]=_0xc58068;}else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x118)]))_0x4905c7[_0x526ecf(0x12a)]=Math[_0x526ecf(0x1a7)](Number(RegExp['$1'])||0x0,0x0);else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f[_0x526ecf(0x144)])){if(_0x526ecf(0x196)===_0x526ecf(0x196))_0x4905c7[_0x526ecf(0x17d)]=Math[_0x526ecf(0x1a7)](Number(RegExp['$1'])||0x0,0x0);else{const _0x45c8a9=_0x487a87[_0x526ecf(0x130)];_0x35d6c8[_0x526ecf(0x13e)]=(_0x32c3ad[_0x526ecf(0x13e)]*(_0x45c8a9-0x1)+_0x334ac2['targetOpacity'])/_0x45c8a9,_0x5005ac['opacityDuration']--;}}else{if(_0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f['CustomVignette']))'ybqTN'===_0x526ecf(0x17e)?(_0x4905c7[_0x526ecf(0x10a)]=(String(RegExp['$1'])||'')[_0x526ecf(0x112)](),_0x4905c7['vignette']='custom'):_0x62c276[_0x526ecf(0x101)]+=_0x5840ab;else _0x11c2f4[_0x526ecf(0x1f1)](_0x37ce2f['PremadeVignette'])&&(_0x526ecf(0x1aa)===_0x526ecf(0x1aa)?_0x4905c7['vignette']=(String(RegExp['$1'])||'')[_0x526ecf(0x176)]():(this[_0x526ecf(0x117)]['x']=0x0,this[_0x526ecf(0x117)]['y']=0x0,this[_0x526ecf(0x117)][_0x526ecf(0x178)]['x']=0x1,this[_0x526ecf(0x117)][_0x526ecf(0x178)]['y']=0x1));}}}}}}}}}}}}}}}return _0x4c2778;},Game_Map[_0x2be277(0x14e)]['getVisualFogs']=function(){const _0x5922af=_0x2be277;return this[_0x5922af(0x13d)]['filter'](_0x349b35=>!!_0x349b35);},Game_Map[_0x2be277(0x14e)][_0x2be277(0x17a)]=function(_0x4f90c3){const _0x43c2fe=_0x2be277;return this[_0x43c2fe(0x13d)]=this[_0x43c2fe(0x13d)]||[],this['_visualFogSettings'][_0x4f90c3]||null;},Game_Map[_0x2be277(0x14e)][_0x2be277(0x1d2)]=function(_0x34b0a6){const _0x53c619=_0x2be277,_0x187e20=this['getVisualFogSettings'](_0x34b0a6);if(_0x187e20[_0x53c619(0x19d)])return _0x187e20[_0x53c619(0x1ac)]*this['tileWidth']();else return _0x187e20['_fogLoopX']?_0x187e20[_0x53c619(0x1ac)]*this[_0x53c619(0x1e7)]()/0x2:0x0;},Game_Map[_0x2be277(0x14e)][_0x2be277(0x160)]=function(_0xa55678){const _0x262225=_0x2be277,_0x4fb7e5=this[_0x262225(0x17a)](_0xa55678);if(_0x4fb7e5[_0x262225(0x19d)])return _0x4fb7e5[_0x262225(0x101)]*this[_0x262225(0x114)]();else{if(_0x4fb7e5[_0x262225(0x15f)])return _0x4fb7e5['_fogY']*this[_0x262225(0x114)]()/0x2;else{if('iIBYi'===_0x262225(0x15a))return 0x0;else _0xf7548f[_0x262225(0x1ac)]-=_0xcb0d52;}}},Game_Map[_0x2be277(0x14e)]['removeVisualFog']=function(_0x31e074){const _0x179607=_0x2be277;this[_0x179607(0x13d)]=this[_0x179607(0x13d)]||[];if(!this[_0x179607(0x13d)][_0x31e074])return;this[_0x179607(0x13d)][_0x31e074]=null;const _0x396766=SceneManager[_0x179607(0x19c)][_0x179607(0x129)];_0x396766&&_0x396766[_0x179607(0x170)](_0x31e074);},Game_Map['prototype']['addChangeVisualFog']=function(_0x3591c2){const _0x14e3bd=_0x2be277,_0x4e59b6=_0x3591c2['id'];let _0x4c8a33=![];this[_0x14e3bd(0x13d)]=this[_0x14e3bd(0x13d)]||[];if(this['_visualFogSettings'][_0x4e59b6]){const _0x3e4a2e=this[_0x14e3bd(0x13d)][_0x4e59b6];if(!_0x3e4a2e[_0x14e3bd(0x126)]['equals'](_0x3591c2[_0x14e3bd(0x126)])){if(_0x14e3bd(0x1e6)==='GFcwA'){const _0xfaf7ca=_0x39f2fc(_0x278de1['$1'])[_0x14e3bd(0x186)]()[_0x14e3bd(0x112)](),_0x1ddc56=[_0x14e3bd(0x182),_0x14e3bd(0x1b5),_0x14e3bd(0x1d5),_0x14e3bd(0x1b4)];_0x13a2b1[_0x14e3bd(0x105)]=_0x1ddc56[_0x14e3bd(0x1e1)](_0xfaf7ca)[_0x14e3bd(0x1ab)](0x0,0x3);}else _0x4c8a33=!![];}else{if(!_0x3e4a2e['maskTerrainTags'][_0x14e3bd(0x153)](_0x3591c2['maskTerrainTags']))_0x4c8a33=!![];else _0x3e4a2e[_0x14e3bd(0x143)]!==_0x14e3bd(0x14f)&&(_0x4c8a33=!![]);}}this[_0x14e3bd(0x13d)][_0x4e59b6]=_0x3591c2;if(!SceneManager[_0x14e3bd(0x173)]())return;const _0x227af9=SceneManager[_0x14e3bd(0x19c)][_0x14e3bd(0x129)];_0x227af9&&_0x227af9[_0x14e3bd(0x167)](_0x4e59b6,_0x4c8a33);},VisuMZ[_0x2be277(0x175)][_0x2be277(0x1c0)]=Game_Map[_0x2be277(0x14e)]['setDisplayPos'],Game_Map[_0x2be277(0x14e)][_0x2be277(0x1fb)]=function(_0xd87b54,_0x62b7b1){const _0x38df88=_0x2be277;VisuMZ[_0x38df88(0x175)][_0x38df88(0x1c0)][_0x38df88(0x1c2)](this,_0xd87b54,_0x62b7b1);for(const _0x195b70 of this[_0x38df88(0x103)]()){if(!_0x195b70)continue;this[_0x38df88(0x109)]()?_0x195b70[_0x38df88(0x1ac)]=_0xd87b54:_0x38df88(0x16e)!==_0x38df88(0x1ef)?_0x195b70['_fogX']=this[_0x38df88(0x1e4)]:(_0x54ecee['filename']=_0x33e676(_0x5f00f2['$1'])[_0x38df88(0x112)](),_0x326a54[_0x38df88(0x16d)]['charAt'](0x0)==='!'&&(_0x3b7ba6[_0x38df88(0x19d)]=!![]));if(this[_0x38df88(0x13c)]()){if(_0x38df88(0x15d)!=='xuIKn')_0x195b70[_0x38df88(0x101)]=_0x62b7b1;else{if(this[_0x38df88(0x1c5)][_0x38df88(0x16b)])return this[_0x38df88(0x1c5)][_0x38df88(0x16b)];const _0x31ee3e=new _0x65772c(_0x450433['width'],_0x174cc0[_0x38df88(0x124)]);return _0x31ee3e[_0x38df88(0x17c)](0x0,0x0,_0x31ee3e['width'],_0x31ee3e['height'],_0x38df88(0x132)),_0x31ee3e[_0x38df88(0x17b)]=![],this[_0x38df88(0x1c5)]=this['_fogVignettes']||{},this['_fogVignettes']['empty']=_0x31ee3e,_0x31ee3e;}}else _0x195b70[_0x38df88(0x101)]=this[_0x38df88(0x10f)];}},VisuMZ[_0x2be277(0x175)][_0x2be277(0x159)]=Game_Map[_0x2be277(0x14e)][_0x2be277(0x1eb)],Game_Map[_0x2be277(0x14e)]['scrollLeft']=function(_0x34533b){const _0x8fc33c=_0x2be277,_0x6ea98b=this[_0x8fc33c(0x1e4)];VisuMZ['VisualFogs'][_0x8fc33c(0x159)][_0x8fc33c(0x1c2)](this,_0x34533b);for(const _0x29d00f of this[_0x8fc33c(0x103)]()){if(_0x8fc33c(0x16a)===_0x8fc33c(0x16a)){if(!_0x29d00f)continue;if(this[_0x8fc33c(0x109)]())_0x29d00f[_0x8fc33c(0x152)]&&(_0x29d00f['_fogX']-=_0x34533b);else{if(this[_0x8fc33c(0x1a9)]()>=this[_0x8fc33c(0x12e)]()){if(_0x8fc33c(0x14b)!==_0x8fc33c(0x14b))for(let _0x13d601=0x0;_0x13d601<_0x2d3c4c;_0x13d601++){(_0x1d1634[_0x8fc33c(0x180)](_0x464683['regionId'](_0x5c4d23,_0x13d601))||_0x4c932f['includes'](_0x547e69['terrainTag'](_0x10f8a6,_0x13d601)))&&this[_0x8fc33c(0x117)][_0x8fc33c(0x1be)][_0x8fc33c(0x17c)](_0x4ea09e*_0x16279c-_0x5997bd,_0x13d601*_0x3e3ef5-_0x4cefa9,_0x4b3689,_0xd10580,_0x8fc33c(0x132));}else _0x29d00f[_0x8fc33c(0x1ac)]+=this[_0x8fc33c(0x1e4)]-_0x6ea98b;}}}else this['initialize'](...arguments);}},VisuMZ[_0x2be277(0x175)][_0x2be277(0x1f3)]=Game_Map[_0x2be277(0x14e)][_0x2be277(0x1c1)],Game_Map[_0x2be277(0x14e)][_0x2be277(0x1c1)]=function(_0xc62b24){const _0x25c867=_0x2be277,_0x1dea66=this[_0x25c867(0x1e4)];VisuMZ[_0x25c867(0x175)][_0x25c867(0x1f3)][_0x25c867(0x1c2)](this,_0xc62b24);for(const _0x2c3ba8 of this['getVisualFogs']()){if(_0x25c867(0x18c)===_0x25c867(0x18c)){if(!_0x2c3ba8)continue;if(this[_0x25c867(0x109)]())'pJkeT'==='pJkeT'?_0x2c3ba8[_0x25c867(0x152)]&&(_0x2c3ba8[_0x25c867(0x1ac)]+=_0xc62b24):this[_0x25c867(0x197)]&&(this[_0x25c867(0x197)][_0x25c867(0x105)]=this[_0x25c867(0x1ee)]()[_0x25c867(0x105)]);else this[_0x25c867(0x1a9)]()>=this[_0x25c867(0x12e)]()&&(_0x25c867(0x14d)===_0x25c867(0x14d)?_0x2c3ba8[_0x25c867(0x1ac)]+=this['_displayX']-_0x1dea66:this[_0x25c867(0x13f)]['removeChild'](_0x2cc82f));}else return this[_0x25c867(0x1c5)][_0x43f74b];}},VisuMZ['VisualFogs'][_0x2be277(0x15b)]=Game_Map[_0x2be277(0x14e)]['scrollDown'],Game_Map['prototype'][_0x2be277(0x125)]=function(_0x145935){const _0x3083d4=_0x2be277,_0xa55fa4=this[_0x3083d4(0x10f)];VisuMZ['VisualFogs'][_0x3083d4(0x15b)][_0x3083d4(0x1c2)](this,_0x145935);for(const _0x222553 of this[_0x3083d4(0x103)]()){if(!_0x222553)continue;if(this[_0x3083d4(0x13c)]())_0x222553['_fogLoopY']&&(_0x3083d4(0x119)!==_0x3083d4(0x1ba)?_0x222553[_0x3083d4(0x101)]+=_0x145935:(this[_0x3083d4(0x1d9)]=this[_0x3083d4(0x1ee)]()[_0x3083d4(0x16d)],this['bitmap']=_0x25c73d[_0x3083d4(0x102)](this[_0x3083d4(0x1d9)])));else this[_0x3083d4(0x124)]()>=this['screenTileY']()&&(_0x222553[_0x3083d4(0x101)]+=this[_0x3083d4(0x10f)]-_0xa55fa4);}},VisuMZ[_0x2be277(0x175)][_0x2be277(0x16f)]=Game_Map['prototype'][_0x2be277(0x10c)],Game_Map[_0x2be277(0x14e)][_0x2be277(0x10c)]=function(_0x29a446){const _0x579be2=_0x2be277,_0x968ae8=this['_displayY'];VisuMZ[_0x579be2(0x175)][_0x579be2(0x16f)]['call'](this,_0x29a446);for(const _0x9c6859 of this['getVisualFogs']()){if(!_0x9c6859)continue;if(this[_0x579be2(0x13c)]())_0x9c6859['_fogLoopY']&&(_0x9c6859[_0x579be2(0x101)]-=_0x29a446);else this[_0x579be2(0x124)]()>=this[_0x579be2(0x1ed)]()&&(_0x9c6859[_0x579be2(0x101)]+=this[_0x579be2(0x10f)]-_0x968ae8);}},VisuMZ[_0x2be277(0x175)][_0x2be277(0x1c7)]=Game_Map['prototype'][_0x2be277(0x1d3)],Game_Map[_0x2be277(0x14e)][_0x2be277(0x1d3)]=function(){const _0x38648e=_0x2be277;VisuMZ[_0x38648e(0x175)]['Game_Map_updateParallax'][_0x38648e(0x1c2)](this);for(const _0x3a760a of this[_0x38648e(0x103)]()){if(!_0x3a760a)continue;this[_0x38648e(0x131)](_0x3a760a);}},Game_Map['prototype'][_0x2be277(0x131)]=function(_0x493034){const _0x52130d=_0x2be277;if(_0x493034[_0x52130d(0x152)]){if(_0x52130d(0x120)==='YQxhN')_0x493034[_0x52130d(0x1ac)]+=_0x493034[_0x52130d(0x133)]/this[_0x52130d(0x1e7)]()/0x2;else return _0x5bab99[_0x52130d(0x151)]&&_0x23d07b[_0x52130d(0x128)][_0x52130d(0x180)]('['+_0x4f1dd0+']');}_0x493034['_fogLoopY']&&(_0x52130d(0x1e5)!==_0x52130d(0x15e)?_0x493034['_fogY']+=_0x493034[_0x52130d(0x185)]/this[_0x52130d(0x114)]()/0x2:_0xb67642['_fogX']+=_0x3dc980);_0x493034[_0x52130d(0x19f)]+=_0x493034['hueShift'];if(_0x493034[_0x52130d(0x130)]>0x0){const _0x5ea8f2=_0x493034['opacityDuration'];_0x493034[_0x52130d(0x13e)]=(_0x493034[_0x52130d(0x13e)]*(_0x5ea8f2-0x1)+_0x493034[_0x52130d(0x1f6)])/_0x5ea8f2,_0x493034['opacityDuration']--;}};function Sprite_VisualFog(){const _0x167b7d=_0x2be277;this[_0x167b7d(0x1af)](...arguments);}Sprite_VisualFog['prototype']=Object['create'](TilingSprite['prototype']),Sprite_VisualFog['prototype'][_0x2be277(0x1bb)]=Sprite_VisualFog,Sprite_VisualFog['prototype'][_0x2be277(0x1af)]=function(_0x314a95){const _0x5421fb=_0x2be277;this['_id']=_0x314a95,TilingSprite['prototype'][_0x5421fb(0x1af)][_0x5421fb(0x1c2)](this),this[_0x5421fb(0x1de)](),this[_0x5421fb(0x18e)](),this['bitmap']['addLoadListener'](this['createMaskSprite'][_0x5421fb(0x110)](this));},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x1ee)]=function(){const _0xe39dbf=_0x2be277;return $gameMap[_0xe39dbf(0x17a)](this[_0xe39dbf(0x145)]);},Sprite_VisualFog['prototype']['_createColorFilter']=function(){const _0x454070=_0x2be277;this[_0x454070(0x162)]=0x0,this[_0x454070(0x127)]=[0x0,0x0,0x0,0x0],this['_colorFilter']=new ColorFilter(),!this[_0x454070(0x1fc)]&&(_0x454070(0x1a3)==='gZOmV'?this['filters']=[]:this[_0x454070(0x197)][_0x454070(0x105)]=this[_0x454070(0x1ee)]()['blendMode']),this['filters'][_0x454070(0x15c)](this[_0x454070(0x200)]);},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x111)]=function(){const _0x5ade63=_0x2be277;if(!this[_0x5ade63(0x200)]){if(_0x5ade63(0x1a8)!==_0x5ade63(0x1a8))return this[_0x5ade63(0x13d)]=this['_visualFogSettings']||[],this[_0x5ade63(0x13d)][_0x3bddd5]||null;else this[_0x5ade63(0x1de)]();}this[_0x5ade63(0x200)][_0x5ade63(0x13b)](this[_0x5ade63(0x162)]),this[_0x5ade63(0x200)][_0x5ade63(0x174)](this['_colorTone']);},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x18e)]=function(){const _0x201ba6=_0x2be277;this[_0x201ba6(0x1d9)]=this[_0x201ba6(0x1ee)]()[_0x201ba6(0x16d)],this[_0x201ba6(0x1be)]=ImageManager['loadParallax'](this['_fogName']);},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x1d4)]=function(){const _0x131f3a=_0x2be277;this[_0x131f3a(0x117)]=new Sprite(),this[_0x131f3a(0x1ff)]();},Sprite_VisualFog['prototype'][_0x2be277(0x1ff)]=function(){const _0x55dd54=_0x2be277;this[_0x55dd54(0x117)][_0x55dd54(0x1be)]&&this[_0x55dd54(0x1a5)](this[_0x55dd54(0x117)]);const _0x2ccafb=this[_0x55dd54(0x1ee)]()[_0x55dd54(0x126)],_0x2cb9c8=this['settings']()[_0x55dd54(0x122)];if(this[_0x55dd54(0x1ee)]()[_0x55dd54(0x143)]===_0x55dd54(0x1b1))_0x55dd54(0x1f7)!=='LCsuc'?_0x1df170['_fogX']+=this[_0x55dd54(0x1e4)]-_0x56fc6a:this[_0x55dd54(0x116)]();else{if(this[_0x55dd54(0x1ee)]()[_0x55dd54(0x143)]!==_0x55dd54(0x14f))this['loadTemplateVignette']();else{if(_0x2ccafb['length']>0x0||_0x2cb9c8[_0x55dd54(0x1a0)]>0x0)'HfAYp'==='gmGbu'?_0x11ed69=!![]:this[_0x55dd54(0x1d8)]();else this[_0x55dd54(0x1ee)]()['vignette']===_0x55dd54(0x14f)&&(_0x55dd54(0x1ad)===_0x55dd54(0x123)?(this['_colorTone']=_0x2aaffd['clone'](),this[_0x55dd54(0x111)]()):this[_0x55dd54(0x1ec)]());}}this[_0x55dd54(0x1fd)](this['_maskSprite']),this[_0x55dd54(0x197)]=new PIXI[(_0x55dd54(0x163))](this['_maskSprite']),this[_0x55dd54(0x1fc)]['push'](this[_0x55dd54(0x197)]);if(this[_0x55dd54(0x155)])this['filters'][_0x55dd54(0x15c)](this['_blurFilter']);},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x116)]=function(){const _0x2ec8c6=_0x2be277,_0x2d0b6e=this[_0x2ec8c6(0x1ee)]()[_0x2ec8c6(0x10a)];this[_0x2ec8c6(0x117)][_0x2ec8c6(0x1be)]=ImageManager['loadParallax'](_0x2d0b6e),this[_0x2ec8c6(0x117)]['bitmap'][_0x2ec8c6(0x17b)]=![];},Sprite_VisualFog['prototype'][_0x2be277(0x1ec)]=function(){const _0x3a4b5a=_0x2be277,_0x551040=this['settings']()['vignette'];this[_0x3a4b5a(0x117)][_0x3a4b5a(0x1be)]=ImageManager['getFogVignette'](_0x551040);},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x1d8)]=function(){const _0x437d5e=_0x2be277,_0x5281c8=this['settings']()[_0x437d5e(0x126)],_0x20477b=this[_0x437d5e(0x1ee)]()['maskTerrainTags'];if(_0x5281c8[_0x437d5e(0x1a0)]<=0x0&&_0x20477b[_0x437d5e(0x1a0)]<=0x0)return;if($gameMap[_0x437d5e(0x109)]()||$gameMap[_0x437d5e(0x13c)]())return;const _0xad10b7=$gameMap[_0x437d5e(0x1a9)](),_0x108add=$gameMap[_0x437d5e(0x124)](),_0xde9b1b=$gameMap[_0x437d5e(0x1e7)](),_0x1deb93=$gameMap['tileHeight'](),_0x107463=this[_0x437d5e(0x1ee)]()[_0x437d5e(0x17d)],_0x495755=_0xde9b1b+_0x107463*0x2,_0x5e5a25=_0x1deb93+_0x107463*0x2;this[_0x437d5e(0x117)][_0x437d5e(0x1be)]=new Bitmap(_0xad10b7*_0xde9b1b,_0x108add*_0x1deb93);for(let _0x4d71bf=0x0;_0x4d71bf<_0xad10b7;_0x4d71bf++){for(let _0x4dfbbf=0x0;_0x4dfbbf<_0x108add;_0x4dfbbf++){(_0x5281c8['includes']($gameMap[_0x437d5e(0x187)](_0x4d71bf,_0x4dfbbf))||_0x20477b[_0x437d5e(0x180)]($gameMap['terrainTag'](_0x4d71bf,_0x4dfbbf)))&&this['_maskSprite'][_0x437d5e(0x1be)]['fillRect'](_0x4d71bf*_0xde9b1b-_0x107463,_0x4dfbbf*_0x1deb93-_0x107463,_0x495755,_0x5e5a25,_0x437d5e(0x132));}}this['filters']=[];!!PIXI[_0x437d5e(0x1fc)][_0x437d5e(0x10d)]&&!this['_blurFilter']&&(this[_0x437d5e(0x155)]=new PIXI[(_0x437d5e(0x1fc))][(_0x437d5e(0x10d))](clamp=!![]));if(this[_0x437d5e(0x155)]){if(_0x437d5e(0x18a)!==_0x437d5e(0x1ea)){const _0x4f8d3e=this['settings']()[_0x437d5e(0x12a)];this[_0x437d5e(0x155)][_0x437d5e(0x1da)]=_0x4f8d3e||0.01;}else return _0x3c0f9c[_0x437d5e(0x101)]*this[_0x437d5e(0x114)]();}},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x12d)]=function(_0x53f59a,_0x26db1d){},Sprite_VisualFog[_0x2be277(0x14e)]['update']=function(){const _0x509a70=_0x2be277;TilingSprite[_0x509a70(0x14e)]['update']['call'](this);if(!this[_0x509a70(0x1be)])return;if(!this[_0x509a70(0x1ee)]())return;this[_0x509a70(0x201)](),this[_0x509a70(0x171)](),this[_0x509a70(0x1cb)](),this['updateHue'](),this[_0x509a70(0x190)](),this[_0x509a70(0x11d)]();},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x201)]=function(){const _0x3e57d8=_0x2be277;this[_0x3e57d8(0x13e)]=this[_0x3e57d8(0x1ee)]()['opacity'];},Sprite_VisualFog['prototype']['updateOrigin']=function(){const _0x4961fa=_0x2be277;this[_0x4961fa(0x158)]['x']=$gameMap[_0x4961fa(0x1d2)](this[_0x4961fa(0x145)]),this[_0x4961fa(0x158)]['y']=$gameMap[_0x4961fa(0x160)](this['_id']);},Sprite_VisualFog[_0x2be277(0x14e)]['updateBlendMode']=function(){const _0x315aae=_0x2be277;this[_0x315aae(0x197)]&&(this[_0x315aae(0x197)][_0x315aae(0x105)]=this['settings']()[_0x315aae(0x105)]);},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x141)]=function(){const _0x3ce255=_0x2be277;this['setHue'](this[_0x3ce255(0x1ee)]()[_0x3ce255(0x19f)]);},Sprite_VisualFog[_0x2be277(0x14e)]['setHue']=function(_0x4cedb1){const _0x3acbcb=_0x2be277;this['_hue']!==Number(_0x4cedb1)&&(this[_0x3acbcb(0x162)]=Number(_0x4cedb1),this[_0x3acbcb(0x111)]());},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x190)]=function(){const _0x40652c=_0x2be277;this['setColorTone'](this[_0x40652c(0x1ee)]()[_0x40652c(0x11f)]);},Sprite_VisualFog[_0x2be277(0x14e)][_0x2be277(0x174)]=function(_0x64438d){const _0x16f9a9=_0x2be277;if(!(_0x64438d instanceof Array))throw new Error(_0x16f9a9(0x18d));!this[_0x16f9a9(0x127)]['equals'](_0x64438d)&&(this[_0x16f9a9(0x127)]=_0x64438d[_0x16f9a9(0x11b)](),this[_0x16f9a9(0x111)]());},Sprite_VisualFog[_0x2be277(0x14e)]['updateMask']=function(){const _0x46eb8f=_0x2be277;if(!this[_0x46eb8f(0x117)])return;const _0x34b312=this[_0x46eb8f(0x1ee)]()[_0x46eb8f(0x126)],_0x35033c=this[_0x46eb8f(0x1ee)]()[_0x46eb8f(0x122)];if(this[_0x46eb8f(0x1ee)]()[_0x46eb8f(0x143)]!=='none')this[_0x46eb8f(0x117)]['x']=0x0,this[_0x46eb8f(0x117)]['y']=0x0,this[_0x46eb8f(0x117)][_0x46eb8f(0x178)]['x']=0x1/$gameScreen[_0x46eb8f(0x1c6)](),this[_0x46eb8f(0x117)]['scale']['y']=0x1/$gameScreen['zoomScale']();else{if(_0x34b312[_0x46eb8f(0x1a0)]>0x0||_0x35033c['length']>0x0)this['_maskSprite']['x']=Math['floor'](-$gameMap['displayX']()*$gameMap[_0x46eb8f(0x1e7)]()),this[_0x46eb8f(0x117)]['y']=Math['floor'](-$gameMap[_0x46eb8f(0x11a)]()*$gameMap['tileHeight']()),this[_0x46eb8f(0x117)][_0x46eb8f(0x178)]['x']=0x1,this['_maskSprite']['scale']['y']=0x1;else this[_0x46eb8f(0x1ee)]()[_0x46eb8f(0x143)]===_0x46eb8f(0x14f)&&(_0x46eb8f(0x1b3)!=='XyZCf'?(this[_0x46eb8f(0x117)]['x']=0x0,this[_0x46eb8f(0x117)]['y']=0x0,this[_0x46eb8f(0x117)][_0x46eb8f(0x178)]['x']=0x1,this[_0x46eb8f(0x117)]['scale']['y']=0x1):this['loadCustomVignette']());}},VisuMZ[_0x2be277(0x175)][_0x2be277(0x1f4)]=Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x1c3)],Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x1c3)]=function(){const _0x38255e=_0x2be277;this['createFogContainer'](),this['createFogLayers'](),this[_0x38255e(0x135)](),VisuMZ[_0x38255e(0x175)][_0x38255e(0x1f4)]['call'](this);},Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x1f0)]=function(){const _0x272f24=_0x2be277;this[_0x272f24(0x13f)]=new Sprite(),this[_0x272f24(0x1d0)][_0x272f24(0x1fd)](this['_fogContainer']),this[_0x272f24(0x1db)]=[null];},Spriteset_Map['prototype'][_0x2be277(0x136)]=function(){const _0x42f082=_0x2be277,_0x465137=$gameMap[_0x42f082(0x103)]();for(const _0x5dfd0e of _0x465137){if(_0x42f082(0x1e2)===_0x42f082(0x1e2)){if(!_0x5dfd0e)continue;this['createNewFogLayer'](_0x5dfd0e);}else this[_0x42f082(0x117)]['x']=0x0,this[_0x42f082(0x117)]['y']=0x0,this[_0x42f082(0x117)][_0x42f082(0x178)]['x']=0x1/_0x427ea2[_0x42f082(0x1c6)](),this[_0x42f082(0x117)][_0x42f082(0x178)]['y']=0x1/_0x344482[_0x42f082(0x1c6)]();}},Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x104)]=function(_0x2fb348){const _0x283de6=_0x2be277;if(!_0x2fb348)return;const _0x8df61f=new Sprite_VisualFog(_0x2fb348['id']);_0x8df61f[_0x283de6(0x1e0)](0x0,0x0,Graphics[_0x283de6(0x1a9)],Graphics[_0x283de6(0x124)]),this['_fogContainer']['addChild'](_0x8df61f);},Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x135)]=function(){const _0x3f0309=_0x2be277;this[_0x3f0309(0x13f)]['children'][_0x3f0309(0x1bd)]((_0x418597,_0x18cfa7)=>_0x418597[_0x3f0309(0x145)]-_0x18cfa7[_0x3f0309(0x145)]);},Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x1f2)]=function(_0x427d88){const _0x4d484e=_0x2be277;return this[_0x4d484e(0x13f)]['children']['find'](_0x3c3362=>_0x3c3362[_0x4d484e(0x145)]===_0x427d88);},Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x170)]=function(_0x59cb04){const _0x539f25=_0x2be277,_0x5d701c=this['findTargetVisualFog'](_0x59cb04);_0x5d701c&&this['_fogContainer'][_0x539f25(0x1a5)](_0x5d701c);},Spriteset_Map[_0x2be277(0x14e)][_0x2be277(0x167)]=function(_0x4b4b5e,_0x453ed){const _0xc74c7f=_0x2be277,_0x5a7a7a=this['findTargetVisualFog'](_0x4b4b5e);if(!_0x5a7a7a)this['createNewFogLayer']($gameMap[_0xc74c7f(0x17a)](_0x4b4b5e)),this[_0xc74c7f(0x135)]();else{if(_0xc74c7f(0x147)!=='VNSwY'){const _0x28e7dc=_0x1effdf(_0x424a8b['$1'])[_0xc74c7f(0x1a1)](',')['map'](_0x221dd5=>_0x1a63ca(_0x221dd5)||0x0);while(_0x28e7dc[_0xc74c7f(0x1a0)]<0x4)_0x28e7dc[_0xc74c7f(0x15c)](0x0);_0x55a2bb['colorTone']=_0x28e7dc;}else _0x5a7a7a[_0xc74c7f(0x18e)](),_0x453ed&&_0x5a7a7a['bitmap'][_0xc74c7f(0x139)](_0x5a7a7a[_0xc74c7f(0x1ff)]['bind'](_0x5a7a7a));}};