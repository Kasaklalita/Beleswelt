//=============================================================================
// VisuStella MZ - Visual Item Inventory
// VisuMZ_4_VisualItemInv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualItemInv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualItemInv = VisuMZ.VisualItemInv || {};
VisuMZ.VisualItemInv.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [VisualItemInv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Item_Inventory_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the item list displayed in-game to become more visual
 * and show bigger images, either as icons or pictures. The enlarged item,
 * weapon, and armor images will show their item quantities next to them while
 * a tooltip window appears above their selected cell to show the item's name.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Changes the item inventory windows to become more visual.
 * * Enlarged item images can be either icons or picture images.
 * * Alter how large you want the images to appear with the Plugin Parameters.
 * * Add different color backgrounds for different items.
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
 * Window Columns and Spacing
 * 
 * It should come off as no surprise that these windows will have their usual
 * column counts changed to adjust for the item images shown. The columns will
 * be based on how many of the item icons can fit inside of the window.
 *
 * ---
 * 
 * Item Quantity Positioning
 * 
 * The item quantity will now be positioned to show in the lower right of any
 * window cell with an enlarged icon. Due to this being a much smaller area
 * than what is usually provided, some plugins may have incredibly squished
 * appearances when it comes to displaying item quantity in some areas.
 * 
 * This needs to be adjusted in those plugins individually.
 * 
 * ---
 * 
 * Items and Equips Core
 * 
 * For the Equip Menu, the remove item entry has been changed to show only the
 * enlarged icon. This is to keep consistency with the rest of the plugin.
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
 * === Picture-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Item Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item's icon inside the item windows instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of this plugin, too.
 * - The size used for the image will vary based on the icon size settings.
 * 
 * ---
 * 
 * === Background Colors-Related Notetags ===
 * 
 * ---
 *
 * <Visual Item BG Color 1: x>
 * <Visual Item BG Color 2: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to text color 'x'.
 * - Replace 'x' with a number from 0 to 31 to represent a text color.
 *
 * ---
 *
 * <Visual Item BG Color 1: #rrggbb>
 * <Visual Item BG Color 2: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to a hex color.
 * - Use #rrggbb for custom colors.
 * - You can find out what hex codes belong to which color from this website:
 *   https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Visual Item Inventory Settings
 * ============================================================================
 *
 * These settings allow you to adjust how the Visual Item Inventory windows
 * appear and which ones they appear in.
 *
 * ---
 *
 * General
 * 
 *   Applied Windows:
 *   - Insert the name of their constructors here to apply them.
 *   - Only works with windows made from Window_ItemList.
 * 
 *   Icon Size:
 *   - The icon size used for the Visual Item windows.
 * 
 *   Icon Smoothing?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Item Quantity Outline
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 * 
 *   Outline Size:
 *   - How thick are the outlines for the item quantity?
 *
 * ---
 *
 * Tooltip Window
 * 
 *   Show Tooltip Window?:
 *   - Show the tooltip window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Buffer Width:
 *   - How much to buffer this window's width by?
 * 
 *   Font Size:
 *   - What should this window's font size be?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset this window's X/Y position by?
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
 * Version 1.03: August 25, 2022
 * * Feature Update!
 * ** Updated the boundaries for visual item name display positions to always
 *    fit within the verticality of the game screen. Fix made by Irina.
 * 
 * Version 1.02: July 16, 2021
 * * Bug Fixes!
 * ** Visual glitch fixed that would make item quantity not appear. Fix made
 *    by Arisu.
 * 
 * Version 1.01: February 19, 2021
 * * Feature Update!
 * ** No longer requires VisuStella MZ Items and Equips Core dependency.
 *
 * Version 1.00 Official Release Date: February 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param VisualItemInv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param General
 *
 * @param Constructors:arraystr
 * @text Applied Windows
 * @parent General
 * @type string[]
 * @desc Insert the name of their constructors here to apply them.
 * Only works with windows made from Window_ItemList.
 * @default ["Window_ItemList","Window_EquipItem","Window_ShopSell","Window_EventItem","Window_BattleItem"]
 *
 * @param IconSize:num
 * @text Icon Size
 * @parent General
 * @desc The icon size used for the Visual Item windows.
 * @default 64
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default false
 * 
 * @param Outline
 * @text Item Quantity Outline
 *
 * @param OutlineColor:num
 * @text Outline Color
 * @parent Outline
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param OutlineSize:num
 * @text Outline Size
 * @parent Outline
 * @desc How thick are the outlines for the item quantity?
 * @default 4
 * 
 * @param Tooltip
 * @text Tooltip Window
 *
 * @param ShowTooltip:eval
 * @text Show Tooltip Window?
 * @parent Tooltip
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the tooltip window?
 * @default true
 *
 * @param TooltipBgType:num
 * @text Background Type
 * @parent Tooltip
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
 * @param TooltipBufferWidth:num
 * @text Buffer Width
 * @parent Tooltip
 * @desc How much to buffer this window's width by?
 * @default 16
 *
 * @param TooltipFontSize:num
 * @text Font Size
 * @parent Tooltip
 * @desc What should this window's font size be?
 * @default 22
 *
 * @param TooltipOffsetX:num
 * @text Offset X
 * @parent Tooltip
 * @desc How much to offset this window's X position by?
 * @default 0
 *
 * @param TooltipOffsetY:num
 * @text Offset Y
 * @parent Tooltip
 * @desc How much to offset this window's Y position by?
 * @default 8
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
//=============================================================================

const _0x5a2de0=_0x3549;function _0x3549(_0x415ae2,_0x154398){const _0x3b4b4b=_0x3b4b();return _0x3549=function(_0x354993,_0x15d4e9){_0x354993=_0x354993-0x13a;let _0x5a03b3=_0x3b4b4b[_0x354993];return _0x5a03b3;},_0x3549(_0x415ae2,_0x154398);}(function(_0x54abf5,_0x46f209){const _0x467a31=_0x3549,_0x2f4d34=_0x54abf5();while(!![]){try{const _0x1356b5=-parseInt(_0x467a31(0x1dc))/0x1*(-parseInt(_0x467a31(0x207))/0x2)+-parseInt(_0x467a31(0x1f8))/0x3*(parseInt(_0x467a31(0x1d7))/0x4)+parseInt(_0x467a31(0x1e0))/0x5*(parseInt(_0x467a31(0x1f9))/0x6)+-parseInt(_0x467a31(0x17d))/0x7+-parseInt(_0x467a31(0x1d6))/0x8+parseInt(_0x467a31(0x1f6))/0x9*(parseInt(_0x467a31(0x141))/0xa)+parseInt(_0x467a31(0x1b9))/0xb;if(_0x1356b5===_0x46f209)break;else _0x2f4d34['push'](_0x2f4d34['shift']());}catch(_0x12a3b0){_0x2f4d34['push'](_0x2f4d34['shift']());}}}(_0x3b4b,0x6879f));var label=_0x5a2de0(0x175),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5a2de0(0x1e5)](function(_0x43ff30){const _0x4bf7dc=_0x5a2de0;return _0x43ff30[_0x4bf7dc(0x1ca)]&&_0x43ff30[_0x4bf7dc(0x166)]['includes']('['+label+']');})[0x0];function _0x3b4b(){const _0x445832=['itemHeight','trim','VisuMZ_1_ItemsEquipsCore','ARRAYFUNC','Settings','VISUAL_ITEM_OUTLINE_COLOR','drawItemNumber','otjGc','QtWeT','Window_ItemList_drawItemBackground','bgColorHex1','drawBigIcon','changeTextColor','_item','Window_ItemList_placeItemNewLabel','eNoLx','strokeRect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','NUM','Krpcm','EquipScene','isNewItem','toUpperCase','match','clear','format','iconWidth','VISUAL_ITEM_ICON_SMOOTHING','HpRwl','isEnabled','drawItem','New','_visualItemInventoryTooltipWindow','note','updateVisibility','length','description','getItemColor','pFhzM','ConvertHexToRgba','height','clamp','visualPicture','addChild','ConvertParams','resetTextColor','prototype','itemBackColor2','return\x200','update','drawItemNumberVisualItemInventory','VisualItemInv','ARRAYNUM','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_scene','colSpacing','Window_EquipItem_colSpacing','poALJ','refresh','3346224ZoUOaE','min','VISUAL_ITEM_ICON_SIZE','VgZKS','width','imageSmoothingEnabled','Window_Base_drawItemNumber','itemBackColor1','setBackgroundType','Window_ItemList_drawItemNumber','addLoadListener','Window_ShopSell_colSpacing','changePaintOpacity','isOpen','IconSet','_context','Window_ItemList_callUpdateHelp','iconIndex','Window_ShopSell_maxCols','ItemScene','TooltipBgType','EzzsS','max','isShowNew','FUNC','ShowTooltip','substring','maxCols','visible','item','Hhdzd','drawBackgroundRect','RegExp','IconSize','itemRect','lineHeight','bgColorNum2','OFFSET_Y','STR','create','call','drawItemBackground','opacity','floor','version','KqOAW','TooltipOffsetY','BG_TYPE','parameters','name','BUFFER_WIDTH','placeItemNewLabel','ItemQuantityFontSize','updatePosition','smSBh','contentsBack','drawItemVisualItemInventory','map','_clientArea','exit','1033923osjRSR','itemRectWithPadding','ARRAYSTRUCT','_cursorRect','0.5','padding','drawBigItemIcon','usesVisualItemInventory','bind','paintOpacity','createVisualItemInventoryTooltipWindow','FONT_SIZE','loadPicture','backOpacity','loadSystem','center','drawBigItemPicture','status','VISUAL_ITEM_OUTLINE_SIZE','bgColorHex2','contents','BREfK','ARRAYEVAL','bgColorNum1','drawItemBackgroundVisualItemInventory','itemAt','drawRemoveItem','iconHeight','outlineWidth','6228000QJKzZz','960YTzxpY','textWidth','eMgeQ','active','OFFSET_X','16854ZTftpc','TooltipBufferWidth','_parentWindow','OutlineSize','185EjTcjS','_visualItemHeight','Window_EquipItem_maxCols','Window_Selectable_itemHeight','updatePadding','filter','ItemsEquipsCore','numItems','rowSpacing','JSON','STRUCT','initialize','callUpdateHelp','includes','constructor','isDrawItemNumber','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','resetFontSettings','ceil','textColor','placeItemNewLabelVisualItemInventory','IconSmoothing','9TrjlCA','mJHil','4545pgIXgt','100764EdIfpS','drawText','setupVisualItemInvFontSettings','jQDOw','Xrbxj','OutlineColor','placeNewLabel','gradientFillRect','round','right','fontSize','outlineColor','VISUAL_ITEM_CONSTRUCTORS','innerWidth','84mLaYpK','Window_ItemList_maxCols','createContents','Constructors','Window_ItemList_colSpacing','blt','ARRAYSTR','RemoveEquipIcon','parse','6248280qviVYC'];_0x3b4b=function(){return _0x445832;};return _0x3b4b();}VisuMZ[label][_0x5a2de0(0x146)]=VisuMZ[label][_0x5a2de0(0x146)]||{},VisuMZ[_0x5a2de0(0x16e)]=function(_0x4f4682,_0x41232b){const _0x33b29f=_0x5a2de0;for(const _0x6e115b in _0x41232b){if(_0x6e115b[_0x33b29f(0x159)](/(.*):(.*)/i)){const _0x4b568b=String(RegExp['$1']),_0x1baea9=String(RegExp['$2'])[_0x33b29f(0x158)]()[_0x33b29f(0x143)]();let _0x56be9e,_0x143ce2,_0x32e006;switch(_0x1baea9){case _0x33b29f(0x154):_0x56be9e=_0x41232b[_0x6e115b]!==''?Number(_0x41232b[_0x6e115b]):0x0;break;case _0x33b29f(0x176):_0x143ce2=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):[],_0x56be9e=_0x143ce2['map'](_0x499e63=>Number(_0x499e63));break;case'EVAL':_0x56be9e=_0x41232b[_0x6e115b]!==''?eval(_0x41232b[_0x6e115b]):null;break;case _0x33b29f(0x1cf):_0x143ce2=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):[],_0x56be9e=_0x143ce2[_0x33b29f(0x1b6)](_0x119fe1=>eval(_0x119fe1));break;case _0x33b29f(0x1e9):_0x56be9e=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):'';break;case'ARRAYJSON':_0x143ce2=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):[],_0x56be9e=_0x143ce2['map'](_0x198674=>JSON[_0x33b29f(0x140)](_0x198674));break;case _0x33b29f(0x195):_0x56be9e=_0x41232b[_0x6e115b]!==''?new Function(JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b])):new Function(_0x33b29f(0x172));break;case _0x33b29f(0x145):_0x143ce2=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):[],_0x56be9e=_0x143ce2[_0x33b29f(0x1b6)](_0x220e55=>new Function(JSON['parse'](_0x220e55)));break;case _0x33b29f(0x1a3):_0x56be9e=_0x41232b[_0x6e115b]!==''?String(_0x41232b[_0x6e115b]):'';break;case _0x33b29f(0x13e):_0x143ce2=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):[],_0x56be9e=_0x143ce2[_0x33b29f(0x1b6)](_0x484866=>String(_0x484866));break;case _0x33b29f(0x1ea):_0x32e006=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):{},_0x56be9e=VisuMZ[_0x33b29f(0x16e)]({},_0x32e006);break;case _0x33b29f(0x1bb):_0x143ce2=_0x41232b[_0x6e115b]!==''?JSON[_0x33b29f(0x140)](_0x41232b[_0x6e115b]):[],_0x56be9e=_0x143ce2[_0x33b29f(0x1b6)](_0x5b1750=>VisuMZ['ConvertParams']({},JSON[_0x33b29f(0x140)](_0x5b1750)));break;default:continue;}_0x4f4682[_0x4b568b]=_0x56be9e;}}return _0x4f4682;},(_0x16227c=>{const _0x4e2970=_0x5a2de0,_0x209384=_0x16227c['name'];for(const _0x4212db of dependencies){if(!Imported[_0x4212db]){alert(_0x4e2970(0x153)[_0x4e2970(0x15b)](_0x209384,_0x4212db)),SceneManager['exit']();break;}}const _0x379a20=_0x16227c[_0x4e2970(0x166)];if(_0x379a20[_0x4e2970(0x159)](/\[Version[ ](.*?)\]/i)){const _0x2b4f80=Number(RegExp['$1']);_0x2b4f80!==VisuMZ[label][_0x4e2970(0x1a9)]&&(alert(_0x4e2970(0x1f0)[_0x4e2970(0x15b)](_0x209384,_0x2b4f80)),SceneManager[_0x4e2970(0x1b8)]());}if(_0x379a20[_0x4e2970(0x159)](/\[Tier[ ](\d+)\]/i)){const _0x3b6783=Number(RegExp['$1']);if(_0x3b6783<tier){if(_0x4e2970(0x168)===_0x4e2970(0x1ce)){const _0x26ddfd=this[_0x4e2970(0x1d2)](_0x46c35b);if(!_0x26ddfd)return;const _0xb0c86f=_0x58c42d['VisualItemInv'][_0x4e2970(0x19d)],_0x174168=_0x26ddfd['note'],_0x440229=this[_0x4e2970(0x1ba)](_0x3f8d97);if(_0x174168[_0x4e2970(0x159)](_0xb0c86f[_0x4e2970(0x16c)])||_0x174168[_0x4e2970(0x159)](_0xb0c86f['bigPicture'])){const _0x1d2819=_0x2da4d1(_0x271d6d['$1'])[_0x4e2970(0x143)](),_0x32e82b=_0x5c5c77[_0x4e2970(0x1c5)](_0x1d2819);_0x32e82b[_0x4e2970(0x187)](this['drawBigItemPicture'][_0x4e2970(0x1c1)](this,_0x26ddfd,_0x32e82b,_0x440229));}else this['changePaintOpacity'](this[_0x4e2970(0x15f)](_0x26ddfd)),this[_0x4e2970(0x1bf)](_0x26ddfd,_0x440229),this[_0x4e2970(0x148)](_0x26ddfd,_0x440229['x'],_0x440229['y']+_0x440229['height']-this[_0x4e2970(0x1a0)](),_0x440229[_0x4e2970(0x181)]),this[_0x4e2970(0x1f1)](),this[_0x4e2970(0x189)](!![]);this[_0x4e2970(0x1b0)](_0x28d9fc);}else alert(_0x4e2970(0x177)[_0x4e2970(0x15b)](_0x209384,_0x3b6783,tier)),SceneManager[_0x4e2970(0x1b8)]();}else tier=Math[_0x4e2970(0x193)](_0x3b6783,tier);}VisuMZ[_0x4e2970(0x16e)](VisuMZ[label][_0x4e2970(0x146)],_0x16227c[_0x4e2970(0x1ad)]);})(pluginData),VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x19d)]={'visualPicture':/<(?:VISUAL|VISUAL ITEM) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'bgColorNum1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ](\d+)>/i,'bgColorNum2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ](\d+)>/i,'bgColorHex1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ]#(.*)>/i,'bgColorHex2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ]#(.*)>/i},Window_ItemList[_0x5a2de0(0x17f)]=VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x146)][_0x5a2de0(0x19e)]||0x40,Window_ItemList['VISUAL_ITEM_ICON_SMOOTHING']=VisuMZ['VisualItemInv'][_0x5a2de0(0x146)][_0x5a2de0(0x1f5)]||![],Window_ItemList[_0x5a2de0(0x147)]=VisuMZ[_0x5a2de0(0x175)]['Settings'][_0x5a2de0(0x1fe)]||'rgba(0,\x200,\x200,\x201.0)',Window_ItemList[_0x5a2de0(0x1cb)]=VisuMZ['VisualItemInv'][_0x5a2de0(0x146)][_0x5a2de0(0x1df)]||0x0,Window_ItemList[_0x5a2de0(0x205)]=VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x146)][_0x5a2de0(0x13b)]||0x0,Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1c0)]=function(){const _0x2ba885=_0x5a2de0;return Window_ItemList[_0x2ba885(0x205)][_0x2ba885(0x1ed)](this[_0x2ba885(0x1ee)][_0x2ba885(0x1ae)]);},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x1e3)]=Window_Selectable['prototype'][_0x5a2de0(0x142)],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x142)]=function(){const _0x4782ed=_0x5a2de0;if(this[_0x4782ed(0x1c0)]()){if(this[_0x4782ed(0x1e1)]!==undefined)return this[_0x4782ed(0x1e1)];const _0x1b592a=Math[_0x4782ed(0x1f2)](Window_ItemList['VISUAL_ITEM_ICON_SIZE']/this['lineHeight']());return this['_visualItemHeight']=Math[_0x4782ed(0x201)](_0x1b592a*this[_0x4782ed(0x1a0)]())+0x8,this[_0x4782ed(0x1e1)];}else return VisuMZ[_0x4782ed(0x175)][_0x4782ed(0x1e3)]['call'](this);},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x208)]=Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x198)],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x198)]=function(){const _0x4ddef0=_0x5a2de0;return this[_0x4ddef0(0x1c0)]()?Math[_0x4ddef0(0x1f2)](this['innerWidth']/this['itemHeight']()):VisuMZ[_0x4ddef0(0x175)][_0x4ddef0(0x208)]['call'](this);},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x13c)]=Window_ItemList['prototype'][_0x5a2de0(0x179)],Window_ItemList['prototype']['colSpacing']=function(){const _0x19e7d3=_0x5a2de0;return this['usesVisualItemInventory']()?0x0:VisuMZ[_0x19e7d3(0x175)]['Window_ItemList_colSpacing']['call'](this);},VisuMZ[_0x5a2de0(0x175)]['Window_ItemList_rowSpacing']=Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1e8)],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1e8)]=function(){const _0x186202=_0x5a2de0;return this[_0x186202(0x1c0)]()?0x0:VisuMZ[_0x186202(0x175)]['Window_ItemList_rowSpacing']['call'](this);},VisuMZ[_0x5a2de0(0x175)]['Window_ItemList_drawItem']=Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x160)],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x160)]=function(_0x37bbe4){const _0x599576=_0x5a2de0;if(this['usesVisualItemInventory']())this[_0x599576(0x1b5)](_0x37bbe4);else{if(_0x599576(0x1d9)===_0x599576(0x17b))return _0x5a853b[_0x599576(0x170)][_0x599576(0x198)][_0x599576(0x1a5)](this);else VisuMZ[_0x599576(0x175)]['Window_ItemList_drawItem'][_0x599576(0x1a5)](this,_0x37bbe4);}},Window_ItemList['prototype']['drawItemVisualItemInventory']=function(_0x174473){const _0x2f7391=_0x5a2de0,_0x3eabb8=this['itemAt'](_0x174473);if(!_0x3eabb8)return;const _0x2cc799=VisuMZ['VisualItemInv'][_0x2f7391(0x19d)],_0x3ebdb9=_0x3eabb8[_0x2f7391(0x163)],_0x48acdb=this['itemRectWithPadding'](_0x174473);if(_0x3ebdb9[_0x2f7391(0x159)](_0x2cc799[_0x2f7391(0x16c)])||_0x3ebdb9[_0x2f7391(0x159)](_0x2cc799['bigPicture'])){if(_0x2f7391(0x1aa)===_0x2f7391(0x1aa)){const _0x578db3=String(RegExp['$1'])['trim'](),_0xdca2da=ImageManager[_0x2f7391(0x1c5)](_0x578db3);_0xdca2da[_0x2f7391(0x187)](this['drawBigItemPicture']['bind'](this,_0x3eabb8,_0xdca2da,_0x48acdb));}else return _0x1753a5[_0x2f7391(0x170)]['maxCols']['call'](this);}else this['changePaintOpacity'](this[_0x2f7391(0x15f)](_0x3eabb8)),this['drawBigItemIcon'](_0x3eabb8,_0x48acdb),this[_0x2f7391(0x148)](_0x3eabb8,_0x48acdb['x'],_0x48acdb['y']+_0x48acdb[_0x2f7391(0x16a)]-this[_0x2f7391(0x1a0)](),_0x48acdb['width']),this[_0x2f7391(0x1f1)](),this[_0x2f7391(0x189)](!![]);this['placeItemNewLabel'](_0x174473);},Window_ItemList['prototype'][_0x5a2de0(0x1c9)]=function(_0x885cae,_0x46b05e,_0x3467ac){const _0xd8081a=_0x5a2de0;this[_0xd8081a(0x189)](this[_0xd8081a(0x15f)](_0x885cae));let _0x175e15=_0x3467ac['x']+0x2,_0x1cb8bb=_0x3467ac['y']+0x2,_0x85b85e=_0x3467ac['width']-0x4,_0x1acd5f=_0x3467ac[_0xd8081a(0x16a)]-0x4,_0x73d431=Math['min'](_0x85b85e,_0x1acd5f);const _0x1b4d99=_0x73d431/_0x46b05e['width'],_0x4e7f41=_0x73d431/_0x46b05e[_0xd8081a(0x16a)],_0x3c57e0=Math[_0xd8081a(0x17e)](_0x1b4d99,_0x4e7f41,0x1);let _0x2c9c32=Math[_0xd8081a(0x201)](_0x46b05e['width']*_0x3c57e0),_0x4a9e99=Math[_0xd8081a(0x201)](_0x46b05e[_0xd8081a(0x16a)]*_0x3c57e0);_0x175e15+=Math[_0xd8081a(0x201)]((_0x85b85e-_0x2c9c32)/0x2),_0x1cb8bb+=Math[_0xd8081a(0x201)]((_0x1acd5f-_0x4a9e99)/0x2);const _0x3969df=_0x46b05e[_0xd8081a(0x181)],_0x53aca3=_0x46b05e[_0xd8081a(0x16a)],_0x11595d=this[_0xd8081a(0x1cd)][_0xd8081a(0x18c)][_0xd8081a(0x182)];this[_0xd8081a(0x1cd)][_0xd8081a(0x18c)]['imageSmoothingEnabled']=!![],this[_0xd8081a(0x1cd)][_0xd8081a(0x13d)](_0x46b05e,0x0,0x0,_0x3969df,_0x53aca3,_0x175e15,_0x1cb8bb,_0x2c9c32,_0x4a9e99),this[_0xd8081a(0x1cd)]['_context'][_0xd8081a(0x182)]=_0x11595d,this[_0xd8081a(0x148)](_0x885cae,_0x3467ac['x'],_0x3467ac['y']+_0x3467ac['height']-this[_0xd8081a(0x1a0)](),_0x3467ac[_0xd8081a(0x181)]),this[_0xd8081a(0x1f1)](),this[_0xd8081a(0x189)](!![]);},Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1bf)]=function(_0x3c1f1e,_0x4f5814){const _0x47942f=_0x5a2de0,_0x1f6b1b=_0x3c1f1e[_0x47942f(0x18e)];this[_0x47942f(0x14d)](_0x1f6b1b,_0x4f5814);},Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x14d)]=function(_0x791863,_0x415710){const _0x5ad87b=_0x5a2de0;let _0x40aa33=_0x415710['x'],_0x58c2cf=_0x415710['y'],_0xda8b42=Window_ItemList[_0x5ad87b(0x17f)];_0x40aa33+=Math['round']((_0x415710['width']-_0xda8b42)/0x2),_0x58c2cf+=Math['round']((_0x415710['height']-_0xda8b42)/0x2);const _0x376a1b=ImageManager['loadSystem'](_0x5ad87b(0x18b)),_0x4b3468=ImageManager['iconWidth'],_0x194298=ImageManager[_0x5ad87b(0x1d4)],_0x532239=_0x791863%0x10*_0x4b3468,_0x5d9758=Math[_0x5ad87b(0x1a8)](_0x791863/0x10)*_0x194298;this[_0x5ad87b(0x1cd)]['_context'][_0x5ad87b(0x182)]=Window_ItemList[_0x5ad87b(0x15d)],this[_0x5ad87b(0x1cd)][_0x5ad87b(0x13d)](_0x376a1b,_0x532239,_0x5d9758,_0x4b3468,_0x194298,_0x40aa33,_0x58c2cf,_0xda8b42,_0xda8b42),this[_0x5ad87b(0x1cd)][_0x5ad87b(0x18c)][_0x5ad87b(0x182)]=!![];},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x186)]=Window_ItemList[_0x5a2de0(0x170)]['drawItemNumber'],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x148)]=function(_0x4c5184,_0x26505e,_0x47068c,_0xd4c2c7){const _0x3a42f9=_0x5a2de0;this[_0x3a42f9(0x1c0)]()?(this[_0x3a42f9(0x1fb)](),VisuMZ[_0x3a42f9(0x175)][_0x3a42f9(0x186)][_0x3a42f9(0x1a5)](this,_0x4c5184,_0x26505e,_0x47068c,_0xd4c2c7),this[_0x3a42f9(0x1f1)]()):VisuMZ[_0x3a42f9(0x175)][_0x3a42f9(0x186)]['call'](this,_0x4c5184,_0x26505e,_0x47068c,_0xd4c2c7);},Window_Base[_0x5a2de0(0x170)][_0x5a2de0(0x1fb)]=function(){const _0xb1b1b5=_0x5a2de0;this[_0xb1b1b5(0x1f1)](),this[_0xb1b1b5(0x1cd)][_0xb1b1b5(0x204)]=Window_ItemList[_0xb1b1b5(0x147)],this[_0xb1b1b5(0x1cd)][_0xb1b1b5(0x1d5)]=Window_ItemList[_0xb1b1b5(0x1cb)];},VisuMZ[_0x5a2de0(0x175)]['Window_ItemList_initialize']=Window_ItemList['prototype'][_0x5a2de0(0x1eb)],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1eb)]=function(_0x2c860e){const _0x1509b6=_0x5a2de0;VisuMZ[_0x1509b6(0x175)]['Window_ItemList_initialize'][_0x1509b6(0x1a5)](this,_0x2c860e),this[_0x1509b6(0x1c3)]();},Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1c3)]=function(){const _0x24195e=_0x5a2de0;if(!this['usesVisualItemInventory']())return;if(!VisuMZ[_0x24195e(0x175)][_0x24195e(0x146)][_0x24195e(0x196)])return;this[_0x24195e(0x162)]=new Window_VisualItemTooltip(this),SceneManager[_0x24195e(0x178)][_0x24195e(0x16d)](this[_0x24195e(0x162)]);},VisuMZ[_0x5a2de0(0x175)]['Window_ItemList_callUpdateHelp']=Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1ec)],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1ec)]=function(){const _0x13983e=_0x5a2de0;VisuMZ['VisualItemInv'][_0x13983e(0x18d)]['call'](this);if(this['_visualItemInventoryTooltipWindow']){if(_0x13983e(0x14a)!==_0x13983e(0x151))this[_0x13983e(0x162)]['setItem'](this[_0x13983e(0x19a)]());else{this['contents'][_0x13983e(0x15a)]();if(!this[_0x13983e(0x14f)])return;this[_0x13983e(0x1f1)](),this['contents'][_0x13983e(0x203)]=_0x5e7047[_0x13983e(0x1c4)];const _0x416c19=this[_0x13983e(0x14f)]['name'],_0x4afde6=this[_0x13983e(0x1d8)](_0x416c19)+_0x1411df['BUFFER_WIDTH'];this[_0x13983e(0x181)]=_0x16155b[_0x13983e(0x1f2)](_0x4afde6),this[_0x13983e(0x13a)](),this[_0x13983e(0x1cd)]['fontSize']=_0x4ef98b[_0x13983e(0x1c4)];if(_0x48f098[_0x13983e(0x144)]){const _0x323f93=_0x6ac3b8[_0x13983e(0x167)](this[_0x13983e(0x14f)]);this['changeTextColor'](_0x323f93);}this[_0x13983e(0x1fa)](_0x416c19,0x0,0x0,this[_0x13983e(0x206)],_0x13983e(0x1c8)),this[_0x13983e(0x16f)](),this[_0x13983e(0x185)](_0x3460be[_0x13983e(0x1ac)]);}}},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x14b)]=Window_ItemList['prototype'][_0x5a2de0(0x1a6)],Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1a6)]=function(_0x26c88){const _0x5aa4b2=_0x5a2de0;if(this[_0x5aa4b2(0x1c0)]()){if('SCaPq'!==_0x5aa4b2(0x192))this[_0x5aa4b2(0x1d1)](_0x26c88);else{this[_0x5aa4b2(0x1de)]=_0xf4b083;const _0x75449=new _0x5d69ce(0x0,0x0,0x0,this[_0x5aa4b2(0x1a0)]());_0xdd0bab[_0x5aa4b2(0x170)][_0x5aa4b2(0x1eb)][_0x5aa4b2(0x1a5)](this,_0x75449),this[_0x5aa4b2(0x199)]=![],this[_0x5aa4b2(0x1c6)]=0xff,this[_0x5aa4b2(0x1a7)]=0xff,this['_item']=null;}}else VisuMZ['VisualItemInv'][_0x5aa4b2(0x14b)][_0x5aa4b2(0x1a5)](this,_0x26c88);const _0x53e137=this[_0x5aa4b2(0x19f)](_0x26c88);this[_0x5aa4b2(0x19c)](_0x53e137);},Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1d1)]=function(_0x41ec0e){const _0x582c7c=_0x5a2de0,_0x56b1f6=this[_0x582c7c(0x1d2)](_0x41ec0e);if(!_0x56b1f6){VisuMZ[_0x582c7c(0x175)][_0x582c7c(0x14b)][_0x582c7c(0x1a5)](this,_0x41ec0e);return;}const _0x5ec17e=VisuMZ['VisualItemInv'][_0x582c7c(0x19d)],_0x3edc7c=_0x56b1f6[_0x582c7c(0x163)];let _0x258939=ColorManager[_0x582c7c(0x184)](),_0x360b3e=ColorManager[_0x582c7c(0x171)]();_0x3edc7c[_0x582c7c(0x159)](_0x5ec17e[_0x582c7c(0x1d0)])&&(_0x258939=ColorManager[_0x582c7c(0x1f3)](Number(RegExp['$1'])));if(_0x3edc7c[_0x582c7c(0x159)](_0x5ec17e[_0x582c7c(0x1a1)])){if(_0x582c7c(0x15e)==='lOIoW')return _0x2c62e8['status']&&_0x5c26c2[_0x582c7c(0x166)][_0x582c7c(0x1ed)]('['+_0x5451c7+']');else _0x360b3e=ColorManager[_0x582c7c(0x1f3)](Number(RegExp['$1']));}_0x3edc7c['match'](_0x5ec17e[_0x582c7c(0x14c)])&&(_0x258939='#'+String(RegExp['$1']));_0x3edc7c[_0x582c7c(0x159)](_0x5ec17e[_0x582c7c(0x1cc)])&&(_0x582c7c(0x155)===_0x582c7c(0x1fd)?(_0x151a75(_0x582c7c(0x177)[_0x582c7c(0x15b)](_0x3e1bef,_0x414d1b,_0x871405)),_0x1bade1[_0x582c7c(0x1b8)]()):_0x360b3e='#'+String(RegExp['$1']));const _0x5edc0d=this['itemRect'](_0x41ec0e),_0x27c23e=_0x5edc0d['x'],_0x3ddb8a=_0x5edc0d['y'],_0x3d2ae6=_0x5edc0d['width'],_0x5465db=_0x5edc0d[_0x582c7c(0x16a)];this[_0x582c7c(0x1b4)][_0x582c7c(0x1c2)]=0xff,this[_0x582c7c(0x1b4)][_0x582c7c(0x200)](_0x27c23e,_0x3ddb8a,_0x3d2ae6,_0x5465db,_0x258939,_0x360b3e,!![]),this[_0x582c7c(0x1b4)][_0x582c7c(0x152)](_0x27c23e,_0x3ddb8a,_0x3d2ae6,_0x5465db,_0x258939);},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x169)]=function(_0x31da83){const _0x339c3a=_0x5a2de0;_0x31da83=_0x31da83['replace']('#','');_0x31da83[_0x339c3a(0x165)]===0x3&&(_0x31da83=_0x31da83[0x0]+_0x31da83[0x0]+_0x31da83[0x1]+_0x31da83[0x1]+_0x31da83[0x2]+_0x31da83[0x2]);var _0x2c0b4d=parseInt(_0x31da83[_0x339c3a(0x197)](0x0,0x2),0x10),_0x4d60d5=parseInt(_0x31da83[_0x339c3a(0x197)](0x2,0x4),0x10),_0xe433c1=parseInt(_0x31da83[_0x339c3a(0x197)](0x4,0x6),0x10);return'rgba('+_0x2c0b4d+','+_0x4d60d5+','+_0xe433c1+','+_0x339c3a(0x1bd)+')';},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x183)]=Window_Base['prototype'][_0x5a2de0(0x148)],Window_Base[_0x5a2de0(0x170)][_0x5a2de0(0x148)]=function(_0x52d4a3,_0xe3cc7,_0x8fdf72,_0x2cd00d){const _0x37a81e=_0x5a2de0;this['usesVisualItemInventory']&&this['usesVisualItemInventory']()?this[_0x37a81e(0x174)](_0x52d4a3,_0xe3cc7,_0x8fdf72,_0x2cd00d):VisuMZ[_0x37a81e(0x175)]['Window_Base_drawItemNumber'][_0x37a81e(0x1a5)](this,_0x52d4a3,_0xe3cc7,_0x8fdf72,_0x2cd00d);},Window_Base['prototype']['drawItemNumberVisualItemInventory']=function(_0xa2b5ee,_0x2c6974,_0x16ac74,_0x282328){const _0x49fdf3=_0x5a2de0;if(this[_0x49fdf3(0x1ef)](_0xa2b5ee)){this[_0x49fdf3(0x1fb)]();const _0x5b1aeb=VisuMZ['ItemsEquipsCore'][_0x49fdf3(0x146)][_0x49fdf3(0x190)],_0x5c1e30=_0x5b1aeb['ItemQuantityFmt'],_0x26842a=_0x5c1e30[_0x49fdf3(0x15b)]($gameParty[_0x49fdf3(0x1e7)](_0xa2b5ee));this[_0x49fdf3(0x1cd)][_0x49fdf3(0x203)]=_0x5b1aeb[_0x49fdf3(0x1b1)],this[_0x49fdf3(0x1fa)](_0x26842a,_0x2c6974,_0x16ac74,_0x282328,_0x49fdf3(0x202)),this[_0x49fdf3(0x1f1)]();}},VisuMZ[_0x5a2de0(0x175)]['Window_ItemList_placeItemNewLabel']=Window_ItemList[_0x5a2de0(0x170)][_0x5a2de0(0x1b0)],Window_ItemList['prototype'][_0x5a2de0(0x1b0)]=function(_0x5ae0ea){const _0x5f278d=_0x5a2de0;this[_0x5f278d(0x1c0)]()?this[_0x5f278d(0x1f4)](_0x5ae0ea):_0x5f278d(0x1f7)===_0x5f278d(0x1f7)?VisuMZ[_0x5f278d(0x175)][_0x5f278d(0x150)][_0x5f278d(0x1a5)](this,_0x5ae0ea):this[_0x5f278d(0x1f4)](_0x548729);},Window_ItemList['prototype'][_0x5a2de0(0x1f4)]=function(_0x3a1ec7){const _0x5a1fe2=_0x5a2de0;if(!Imported[_0x5a1fe2(0x144)])return;const _0x4b1cc2=this['itemAt'](_0x3a1ec7);if(!_0x4b1cc2||!this[_0x5a1fe2(0x194)]())return;if(!$gameParty[_0x5a1fe2(0x157)](_0x4b1cc2))return;const _0x4fecfa=this[_0x5a1fe2(0x1ba)](_0x3a1ec7),_0x27835=_0x4fecfa['x'],_0x199855=_0x4fecfa['y'],_0x1b61b=VisuMZ[_0x5a1fe2(0x1e6)][_0x5a1fe2(0x146)]['New']['OffsetX'],_0x1e2156=VisuMZ[_0x5a1fe2(0x1e6)][_0x5a1fe2(0x146)][_0x5a1fe2(0x161)]['OffsetY'];this[_0x5a1fe2(0x1ff)](_0x4b1cc2,_0x27835+_0x1b61b,_0x199855+_0x1e2156);},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x1e2)]=Window_EquipItem[_0x5a2de0(0x170)][_0x5a2de0(0x198)],Window_EquipItem[_0x5a2de0(0x170)][_0x5a2de0(0x198)]=function(){const _0x33f38c=_0x5a2de0;return this[_0x33f38c(0x1c0)]()?Window_ItemList[_0x33f38c(0x170)][_0x33f38c(0x198)][_0x33f38c(0x1a5)](this):VisuMZ['VisualItemInv']['Window_EquipItem_maxCols'][_0x33f38c(0x1a5)](this);},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x17a)]=Window_EquipItem[_0x5a2de0(0x170)]['colSpacing'],Window_EquipItem[_0x5a2de0(0x170)]['colSpacing']=function(){const _0x379b00=_0x5a2de0;if(this[_0x379b00(0x1c0)]())return Window_ItemList[_0x379b00(0x170)]['colSpacing']['call'](this);else{if(_0x379b00(0x180)==='SWPLI')this[_0x379b00(0x1f1)](),this[_0x379b00(0x1cd)][_0x379b00(0x204)]=_0xa76c86[_0x379b00(0x147)],this[_0x379b00(0x1cd)][_0x379b00(0x1d5)]=_0x1ce3af[_0x379b00(0x1cb)];else return VisuMZ[_0x379b00(0x175)][_0x379b00(0x17a)]['call'](this);}},Window_EquipItem[_0x5a2de0(0x170)][_0x5a2de0(0x1d3)]=function(_0x9e1ab1){const _0x17e3e2=_0x5a2de0,_0x33ddcd=this[_0x17e3e2(0x1ba)](_0x9e1ab1),_0x24e31c=VisuMZ[_0x17e3e2(0x1e6)]['Settings'][_0x17e3e2(0x156)],_0x47e11c=_0x24e31c[_0x17e3e2(0x13f)];this[_0x17e3e2(0x189)](![]),this[_0x17e3e2(0x14d)](_0x47e11c,_0x33ddcd),this[_0x17e3e2(0x189)](!![]);},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x18f)]=Window_ShopSell['prototype']['maxCols'],Window_ShopSell['prototype'][_0x5a2de0(0x198)]=function(){const _0x544bc2=_0x5a2de0;if(this['usesVisualItemInventory']()){if(_0x544bc2(0x149)!==_0x544bc2(0x19b))return Window_ItemList[_0x544bc2(0x170)][_0x544bc2(0x198)]['call'](this);else this[_0x544bc2(0x1fb)](),_0x592e3a['VisualItemInv'][_0x544bc2(0x186)][_0x544bc2(0x1a5)](this,_0x1055be,_0x1f137f,_0x396778,_0x538512),this['resetFontSettings']();}else{if(_0x544bc2(0x1fc)!==_0x544bc2(0x1fc)){let _0x2497d4=_0xe8d957['x'],_0x44255d=_0x66c329['y'],_0x1b62d2=_0x2b1ab5[_0x544bc2(0x17f)];_0x2497d4+=_0x17efd3[_0x544bc2(0x201)]((_0x40b344[_0x544bc2(0x181)]-_0x1b62d2)/0x2),_0x44255d+=_0x1de2b8['round']((_0x392c4b[_0x544bc2(0x16a)]-_0x1b62d2)/0x2);const _0x11c3b2=_0x3b5946[_0x544bc2(0x1c7)](_0x544bc2(0x18b)),_0x71e9c5=_0x48aeac[_0x544bc2(0x15c)],_0x475062=_0xac3988[_0x544bc2(0x1d4)],_0x2a3b04=_0x4fe7b7%0x10*_0x71e9c5,_0x286705=_0x598c56[_0x544bc2(0x1a8)](_0x4a4608/0x10)*_0x475062;this['contents'][_0x544bc2(0x18c)][_0x544bc2(0x182)]=_0x118a05[_0x544bc2(0x15d)],this[_0x544bc2(0x1cd)][_0x544bc2(0x13d)](_0x11c3b2,_0x2a3b04,_0x286705,_0x71e9c5,_0x475062,_0x2497d4,_0x44255d,_0x1b62d2,_0x1b62d2),this[_0x544bc2(0x1cd)][_0x544bc2(0x18c)][_0x544bc2(0x182)]=!![];}else return VisuMZ[_0x544bc2(0x175)][_0x544bc2(0x18f)]['call'](this);}},VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x188)]=Window_ShopSell[_0x5a2de0(0x170)][_0x5a2de0(0x179)],Window_ShopSell[_0x5a2de0(0x170)][_0x5a2de0(0x179)]=function(){const _0x484212=_0x5a2de0;if(this[_0x484212(0x1c0)]())return Window_ItemList[_0x484212(0x170)][_0x484212(0x179)][_0x484212(0x1a5)](this);else{if('ZmMmx'===_0x484212(0x1b3))_0x3a0984[_0x484212(0x170)][_0x484212(0x173)]['call'](this),this['updateVisibility'](),this[_0x484212(0x1b2)]();else return VisuMZ[_0x484212(0x175)]['Window_ShopSell_colSpacing'][_0x484212(0x1a5)](this);}};function Window_VisualItemTooltip(){const _0x2808fa=_0x5a2de0;this[_0x2808fa(0x1eb)](...arguments);}Window_VisualItemTooltip[_0x5a2de0(0x170)]=Object[_0x5a2de0(0x1a4)](Window_Base['prototype']),Window_VisualItemTooltip[_0x5a2de0(0x170)][_0x5a2de0(0x1ee)]=Window_VisualItemTooltip,Window_VisualItemTooltip[_0x5a2de0(0x1ac)]=VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x146)][_0x5a2de0(0x191)],Window_VisualItemTooltip[_0x5a2de0(0x1af)]=VisuMZ['VisualItemInv'][_0x5a2de0(0x146)][_0x5a2de0(0x1dd)],Window_VisualItemTooltip[_0x5a2de0(0x1c4)]=VisuMZ['VisualItemInv']['Settings']['TooltipFontSize'],Window_VisualItemTooltip['OFFSET_X']=VisuMZ[_0x5a2de0(0x175)][_0x5a2de0(0x146)]['TooltipOffsetX'],Window_VisualItemTooltip['OFFSET_Y']=VisuMZ[_0x5a2de0(0x175)]['Settings'][_0x5a2de0(0x1ab)],Window_VisualItemTooltip[_0x5a2de0(0x170)]['initialize']=function(_0x59ffab){const _0x149204=_0x5a2de0;this[_0x149204(0x1de)]=_0x59ffab;const _0x471443=new Rectangle(0x0,0x0,0x0,this[_0x149204(0x1a0)]());Window_Base['prototype'][_0x149204(0x1eb)][_0x149204(0x1a5)](this,_0x471443),this[_0x149204(0x199)]=![],this[_0x149204(0x1c6)]=0xff,this[_0x149204(0x1a7)]=0xff,this[_0x149204(0x14f)]=null;},Window_VisualItemTooltip['prototype'][_0x5a2de0(0x1e4)]=function(){const _0x20ff41=_0x5a2de0;this[_0x20ff41(0x1be)]=0x0;},Window_VisualItemTooltip[_0x5a2de0(0x170)]['setItem']=function(_0x328951){const _0x5590e8=_0x5a2de0;if(this[_0x5590e8(0x14f)]===_0x328951)return;this[_0x5590e8(0x14f)]=_0x328951,this[_0x5590e8(0x17c)]();},Window_VisualItemTooltip[_0x5a2de0(0x170)][_0x5a2de0(0x17c)]=function(){const _0x24e59f=_0x5a2de0;this[_0x24e59f(0x1cd)][_0x24e59f(0x15a)]();if(!this[_0x24e59f(0x14f)])return;this[_0x24e59f(0x1f1)](),this['contents'][_0x24e59f(0x203)]=Window_VisualItemTooltip['FONT_SIZE'];const _0x177c51=this[_0x24e59f(0x14f)][_0x24e59f(0x1ae)],_0x36b0ed=this[_0x24e59f(0x1d8)](_0x177c51)+Window_VisualItemTooltip[_0x24e59f(0x1af)];this[_0x24e59f(0x181)]=Math['ceil'](_0x36b0ed),this[_0x24e59f(0x13a)](),this[_0x24e59f(0x1cd)][_0x24e59f(0x203)]=Window_VisualItemTooltip[_0x24e59f(0x1c4)];if(Imported[_0x24e59f(0x144)]){const _0x14262a=ColorManager['getItemColor'](this[_0x24e59f(0x14f)]);this[_0x24e59f(0x14e)](_0x14262a);}this[_0x24e59f(0x1fa)](_0x177c51,0x0,0x0,this[_0x24e59f(0x206)],_0x24e59f(0x1c8)),this[_0x24e59f(0x16f)](),this['setBackgroundType'](Window_VisualItemTooltip['BG_TYPE']);},Window_VisualItemTooltip[_0x5a2de0(0x170)][_0x5a2de0(0x173)]=function(){const _0x402586=_0x5a2de0;Window_Base[_0x402586(0x170)][_0x402586(0x173)][_0x402586(0x1a5)](this),this['updateVisibility'](),this['updatePosition']();},Window_VisualItemTooltip[_0x5a2de0(0x170)][_0x5a2de0(0x164)]=function(){const _0xf7371=_0x5a2de0,_0x440e74=this[_0xf7371(0x199)];this[_0xf7371(0x199)]=this[_0xf7371(0x14f)]&&this['_parentWindow'][_0xf7371(0x1da)]&&this[_0xf7371(0x1de)][_0xf7371(0x18a)](),_0x440e74!==this[_0xf7371(0x199)]&&SceneManager[_0xf7371(0x178)][_0xf7371(0x16d)](this);},Window_VisualItemTooltip[_0x5a2de0(0x170)][_0x5a2de0(0x1b2)]=function(){const _0x339cac=_0x5a2de0;if(!this['visible'])return;const _0x3bb8f1=SceneManager[_0x339cac(0x178)]['_windowLayer'],_0x429e3c=this[_0x339cac(0x1de)];let _0x306ce9=_0x429e3c['x']+_0x3bb8f1['x'],_0xaca5e6=_0x429e3c['y']+_0x3bb8f1['y'];const _0x5c9878=_0x429e3c[_0x339cac(0x1bc)],_0x470e0b=_0x429e3c[_0x339cac(0x1b7)];_0x306ce9+=_0x5c9878['x']+_0x5c9878[_0x339cac(0x181)]/0x2-this[_0x339cac(0x181)]/0x2+_0x470e0b['x'],_0xaca5e6+=_0x5c9878['y']-this[_0x339cac(0x16a)]+_0x470e0b['y'];let _0x49c54c=_0x429e3c['y']+_0x3bb8f1['y']-this[_0x339cac(0x16a)]+_0x429e3c[_0x339cac(0x1be)];_0x49c54c+=Window_VisualItemTooltip[_0x339cac(0x1a2)],_0x306ce9+=Window_VisualItemTooltip[_0x339cac(0x1db)],_0xaca5e6+=Window_VisualItemTooltip['OFFSET_Y'],this['x']=Math[_0x339cac(0x201)](_0x306ce9)[_0x339cac(0x16b)](0x0,Graphics[_0x339cac(0x181)]-this['width']),this['y']=Math[_0x339cac(0x201)](_0xaca5e6)['clamp'](0x0,Graphics[_0x339cac(0x16a)]-this[_0x339cac(0x16a)]);};