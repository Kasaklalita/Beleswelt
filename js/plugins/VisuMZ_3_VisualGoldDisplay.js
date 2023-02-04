//=============================================================================
// VisuStella MZ - Visual Gold Display
// VisuMZ_3_VisualGoldDisplay.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualGoldDisplay = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualGoldDisplay = VisuMZ.VisualGoldDisplay || {};
VisuMZ.VisualGoldDisplay.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [VisualGoldDisplay]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Gold_Display_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * If you ever wanted to make it look like 1 gold is equal to 100 pieces of
 * silver, and 1 silver is equal to 100 pieces of copper, this plugin will
 * allow that to happen. Want a diamond to represent the millions, you can do
 * that. Want a gold bar to represent the thousands? This plugin changes how
 * gold is displayed in game in the majority of scenes (though not all of them
 * due to visible screen space limitations). Determine which icons appear where
 * and how they're formed.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Determine the icon for each deonomination range. These go up to billions.
 * * Determine how zeroes are padded in and/or out to make costs look more
 *   compact or full.
 * * This plugin adds text codes that allow you to quickly transform numbers
 *   into the Visual Gold Display format.
 * * Add exception rulings to how no cost items are displayed or how numbers
 *   will appear after exceeding a specific numeric range.
 * * For some windows, auto-sizing will take place to reduce the size of the
 *   text in case it would normally overflow.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Drawn Currency Unit
 * 
 * The default Window_Base drawCurrencyValue has been overwritten for this
 * function as long as the default gold current unit is being used. Any plugins
 * that make changes to how gold is displayed will be incompatible with this
 * plugin. You have been warned!
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
 * VisuMZ_2_SkillLearnSystem
 * 
 * We have opted to display gold costs for skills normally here instead of via
 * the Visual Gold Display format. This is because with the Visual Gold Display
 * format, data becomes too cluttered and hard to read.
 * 
 * ---
 * 
 * VisuMZ_3_StealItems
 * 
 * When stealing gold with both this plugin and Steal Items installed, the text
 * format used for gold will be shifted to the regular item format instead of
 * the currency format for consistency purposes.
 * 
 * ---
 * 
 * VisuMZ_3_VictoryAftermath
 * 
 * Gold acquired and shown through Victory Aftermath will be in the Visual Gold
 * Display format. This is done automatically.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Type-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect
 * --------------------   -----------------------------------------------------
 * 
 * \GoldFull[x]           Displays number 'x' in Visual Gold Display format
 *                        with padded zeroes.
 * \GoldPad[x]            Displays number 'x' in Visual Gold Display format
 *                        with padded zeroes.
 * 
 * \GoldShort[x]          Displays number 'x' in Visual Gold Display format
 *                        without padded zeroes.
 * \GoldOmit[x]           Displays number 'x' in Visual Gold Display format
 *                        without padded zeroes.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Icon Settings
 * ============================================================================
 *
 * Settings used to display the different icons at different denomination
 * digit ranges.
 *
 * ---
 *
 * Icons
 * 
 *   1,000,000,000 through 10:
 *   - What icon do you want to use for this place value?
 *   - Use 0 to bypass this digit slot.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Display Settings
 * ============================================================================
 *
 * Settings to determine how certain aspects are shown regarding the
 * Visual Gold Display.
 *
 * ---
 *
 * Text Format
 * 
 *   Whole Format:
 *   - How the entire text display looks.
 *   - %1 - All Segments; %2 - Currency Icon; %3 - Currency Name
 * 
 *   Segment Format:
 *   - How individual segments look.
 *   - %1 - Segment Value; %2 - Segment Icon
 *
 * ---
 *
 * Pad Zeroes
 * 
 *   General Windows:
 *   - Pad zeroes in general windows?
 * 
 *   Gold Window:
 *   - Pad zeroes in the Gold Window?
 *
 * ---
 *
 * Auto-Size
 * 
 *   General Windows:
 *   - Auto-size the currency value if it's too large for general windows?
 * 
 *   Gold Window:
 *   - Auto-size the currency value if it's too large for the Gold Window?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Special Cases
 * ============================================================================
 *
 * These settings determine how the currency displays in special cases.
 *
 * ---
 *
 * No Costs
 * 
 *   Enable?:
 *   - Show different text when there's 0 gold costs?
 * 
 *   Text Format:
 *   - Text format used for display gold with 0 cost.
 *   - %1 - Currency Icon; %2 - Currency Name
 *
 * ---
 *
 * Upper Limit
 * 
 *   Limit Value:
 *   - What is the upper limit before display different text?
 *   - Use 0 to disable this.
 *   - If auto-size is being used and the font size has become too small, the
 *     upper limit text will also be used.
 * 
 *   Text Format:
 *   - Text format used for display gold past upper limit.
 *   - %1 - Currency Icon; %2 - Currency Name
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
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: December 23, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.00 Official Release Date: October 6, 2021
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
 * @param VisualGoldDisplay
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Icon:struct
 * @text Icon Settings
 * @type struct<Icon>
 * @desc Settings used to display the different icons at different deonomination digit ranges.
 * @default {"Icons":"","e9:num":"312","e8:num":"0","e7:num":"0","e6:num":"300","e5:num":"0","e4:num":"0","e3:num":"313","e2:num":"0","e1:num":"0"}
 *
 * @param Display:struct
 * @text Display Settings
 * @type struct<Display>
 * @desc Settings to determine how certain aspects are shown regarding the Visual Gold Display.
 * @default {"TextFmt":"","WholeFMT:str":"%1%2\\C[16]%3","SegmentFMT:str":"%1%2","PadZero":"","PadZero_Default:eval":"false","PadZero_GoldWin:eval":"true","AutoSize":"","AutoSize_Default:eval":"false","AutoSize_GoldWin:eval":"true"}
 *
 * @param Special:struct
 * @text Special Cases
 * @type struct<Special>
 * @desc These settings determine how the currency displays in special cases.
 * @default {"NoCost":"","NoCostEnable:eval":"true","NoCostFmt:str":"-","UpperLimit":"","UpperLimitValue:num":"1000000000000","UpperLimitFmt:str":"A Lotta%1\\C[16]%2"}
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
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 * 
 * @param Icons
 *
 * @param e9:num
 * @text 1,000,000,000
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 312
 *
 * @param e8:num
 * @text 100,000,000
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 0
 *
 * @param e7:num
 * @text 10,000,000
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 0
 *
 * @param e6:num
 * @text 1,000,000
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 300
 *
 * @param e5:num
 * @text 100,000
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 0
 *
 * @param e4:num
 * @text 10,000
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 0
 *
 * @param e3:num
 * @text 1,000
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 313
 *
 * @param e2:num
 * @text 100
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 0
 *
 * @param e1:num
 * @text 10
 * @parent Icons
 * @desc What icon do you want to use for this place value?
 * Use 0 to bypass this digit slot.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Display:
 * 
 * @param TextFmt
 * @text Text Format
 *
 * @param WholeFMT:str
 * @text Whole Format
 * @parent TextFmt
 * @desc How the entire text display looks.
 * %1 - All Segments; %2 - Currency Icon; %3 - Currency Name
 * @default %1%2\C[16]%3
 *
 * @param SegmentFMT:str
 * @text Segment Format
 * @parent TextFmt
 * @desc How individual segments look.
 * %1 - Segment Value; %2 - Segment Icon
 * @default %1%2
 * 
 * @param PadZero
 * @text Pad Zeroes
 *
 * @param PadZero_Default:eval
 * @text General Windows
 * @parent PadZero
 * @type boolean
 * @on Pad Zeroes
 * @off No Padding
 * @desc Pad zeroes in general windows?
 * @default false
 *
 * @param PadZero_GoldWin:eval
 * @text Gold Window
 * @parent PadZero
 * @type boolean
 * @on Pad Zeroes
 * @off No Padding
 * @desc Pad zeroes in the Gold Window?
 * @default true
 * 
 * @param AutoSize
 * @text Auto-Size
 *
 * @param AutoSize_Default:eval
 * @text General Windows
 * @parent AutoSize
 * @type boolean
 * @on Auto-Size
 * @off Full Size
 * @desc Auto-size the currency value if it's too large
 * for general windows?
 * @default false
 *
 * @param AutoSize_GoldWin:eval
 * @text Gold Window
 * @parent AutoSize
 * @type boolean
 * @on Auto-Size
 * @off Full Size
 * @desc Auto-size the currency value if it's too large
 * for the Gold Window?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Special Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Special:
 *
 * @param NoCost
 * @text No Costs
 *
 * @param NoCostEnable:eval
 * @text Enable?
 * @parent NoCost
 * @type boolean
 * @on Enable No Cost
 * @off Normal No Cost
 * @desc Show different text when there's 0 gold costs?
 * @default true
 *
 * @param NoCostFmt:str
 * @text Text Format
 * @parent NoCost
 * @desc Text format used for display gold with 0 cost.
 * %1 - Currency Icon; %2 - Currency Name
 * @default -
 *
 * @param UpperLimit
 * @text Upper Limit
 *
 * @param UpperLimitValue:num
 * @text Limit Value
 * @parent UpperLimit
 * @type number
 * @desc What is the upper limit before display different text?
 * Use 0 to disable this.
 * @default 1000000000000
 *
 * @param UpperLimitFmt:str
 * @text Text Format
 * @parent UpperLimit
 * @desc Text format used for display gold past upper limit.
 * %1 - Currency Icon; %2 - Currency Name
 * @default A Lotta%1\C[16]%2
 *
 */
//=============================================================================

const _0x395a2a=_0x19b1;function _0x4fd0(){const _0x4715ee=['CreateVisualUpperLimitText','1125OfzEdC','KhSrP','VISUAL_GOLD_DISPLAY_ICONS','visualGoldDisplayNoCost','Display','prototype','1076570enIWmV','VISUAL_GOLD_DISPLAY_SEGMENT_FMT','EVAL','max','blt','status','VISUAL_GOLD_DISPLAY_AUTOSIZE_DEFAULT','pow','resetFontSettings','drawCurrencyValueVisualGoldDisplay','return\x200','mLsGX','map','VISUAL_GOLD_DISPLAY_NO_COST_ENABLE','padZero','StQUK','call','ARRAYNUM','CoreEngine','ARRAYJSON','14708DKmxUc','imageSmoothingEnabled','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','obtainEscapeParam','processDrawIconVisualGoldDisplay','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','version','drawTextEx','2724438VHcgPA','drawing','trim','VISUAL_GOLD_DISPLAY_UPPER_LIMIT_VALUE','loadSystem','format','11JKaPXm','162jqSBrW','VGDI','Window_Base_processEscapeCharacter','\x5cFS[%1]%2','parameters','replace','Special','NoCostFmt','RnDxJ','convertEscapeCharacters','3295638hYLXYL','VisualGoldDisplay','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawBigIconVisualGoldDisplay','mainFontSize','VISUAL_GOLD_DISPLAY_WHOLE_FMT','mBlCw','processEscapeCharacter','convertEscapeCharactersVisualGoldDisplay','200175ZAExoP','PadZero_Default','filter','VISUAL_GOLD_DISPLAY_PAD_ZERO_GOLDWIN','exit','ARRAYSTR','floor','69769wBYCUC','visualGoldDisplayAutosize','IconSet','itemLineRect','includes','AutoSize_GoldWin','visualGoldDisplayPadding','fontSize','WholeFMT','FUNC','vQqcU','\x5cVGDI[%1]','Window_Base_convertEscapeCharacters','8809rABRHh','drawCurrencyValue','CreateVisualNoCostText','yJRzS','STRUCT','ARRAYFUNC','CUzOs','toUpperCase','ConvertParams','currencyUnit','name','AutoSize_Default','iconWidth','description','ebsbP','Gold','CreateVisualGoldText','Window_Base_drawCurrencyValue','GoldIcon','LbTjI','AtJWx','JLuhg','iconHeight','\x5cC[0]\x5cFS[%1]','parse','VISUAL_GOLD_DISPLAY_AUTOSIZE_GOLDWIN','Settings','PadZero_GoldWin','Icon','VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT','360bXBDXx','ARRAYSTRUCT','showVisualGoldDisplay','SegmentFMT','e%1','VISUAL_GOLD_DISPLAY_UPPER_LIMIT_FMT','VISUAL_GOLD_DISPLAY_NO_COST_TEXT_FMT','WuPDp','contents','round','EAeCC','match','width','_context','UpperLimitValue','YQIDz','value'];_0x4fd0=function(){return _0x4715ee;};return _0x4fd0();}(function(_0x39d803,_0x53e9da){const _0x2400ef=_0x19b1,_0x1eda37=_0x39d803();while(!![]){try{const _0x2d4908=parseInt(_0x2400ef(0x1a1))/0x1*(-parseInt(_0x2400ef(0x17a))/0x2)+-parseInt(_0x2400ef(0x18d))/0x3+parseInt(_0x2400ef(0x16b))/0x4*(parseInt(_0x2400ef(0x1d1))/0x5)+parseInt(_0x2400ef(0x173))/0x6+-parseInt(_0x2400ef(0x194))/0x7*(parseInt(_0x2400ef(0x1bf))/0x8)+parseInt(_0x2400ef(0x184))/0x9+parseInt(_0x2400ef(0x157))/0xa*(parseInt(_0x2400ef(0x179))/0xb);if(_0x2d4908===_0x53e9da)break;else _0x1eda37['push'](_0x1eda37['shift']());}catch(_0x5397a6){_0x1eda37['push'](_0x1eda37['shift']());}}}(_0x4fd0,0x80884));var label=_0x395a2a(0x185),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine'],pluginData=$plugins[_0x395a2a(0x18f)](function(_0x44007f){const _0x4eaf63=_0x395a2a;return _0x44007f[_0x4eaf63(0x15c)]&&_0x44007f['description'][_0x4eaf63(0x198)]('['+label+']');})[0x0];function _0x19b1(_0x326beb,_0x153592){const _0x4fd02a=_0x4fd0();return _0x19b1=function(_0x19b1b9,_0x55f69d){_0x19b1b9=_0x19b1b9-0x156;let _0x35993f=_0x4fd02a[_0x19b1b9];return _0x35993f;},_0x19b1(_0x326beb,_0x153592);}VisuMZ[label][_0x395a2a(0x1bb)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x395a2a(0x1a9)]=function(_0x5e8e91,_0x2fd610){const _0x3ca814=_0x395a2a;for(const _0x297ef9 in _0x2fd610){if(_0x3ca814(0x1a4)!==_0x3ca814(0x1a4))return _0x658cd6['status']&&_0xfc42c2['description'][_0x3ca814(0x198)]('['+_0x3f3f46+']');else{if(_0x297ef9[_0x3ca814(0x1ca)](/(.*):(.*)/i)){const _0x240572=String(RegExp['$1']),_0x3e559d=String(RegExp['$2'])[_0x3ca814(0x1a8)]()[_0x3ca814(0x175)]();let _0x324d60,_0x1f4a09,_0x5a6786;switch(_0x3e559d){case'NUM':_0x324d60=_0x2fd610[_0x297ef9]!==''?Number(_0x2fd610[_0x297ef9]):0x0;break;case _0x3ca814(0x168):_0x1f4a09=_0x2fd610[_0x297ef9]!==''?JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9]):[],_0x324d60=_0x1f4a09[_0x3ca814(0x163)](_0x581409=>Number(_0x581409));break;case _0x3ca814(0x159):_0x324d60=_0x2fd610[_0x297ef9]!==''?eval(_0x2fd610[_0x297ef9]):null;break;case'ARRAYEVAL':_0x1f4a09=_0x2fd610[_0x297ef9]!==''?JSON['parse'](_0x2fd610[_0x297ef9]):[],_0x324d60=_0x1f4a09[_0x3ca814(0x163)](_0x1c1a50=>eval(_0x1c1a50));break;case'JSON':_0x324d60=_0x2fd610[_0x297ef9]!==''?JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9]):'';break;case _0x3ca814(0x16a):_0x1f4a09=_0x2fd610[_0x297ef9]!==''?JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9]):[],_0x324d60=_0x1f4a09[_0x3ca814(0x163)](_0x36625e=>JSON[_0x3ca814(0x1b9)](_0x36625e));break;case _0x3ca814(0x19d):_0x324d60=_0x2fd610[_0x297ef9]!==''?new Function(JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9])):new Function(_0x3ca814(0x161));break;case _0x3ca814(0x1a6):_0x1f4a09=_0x2fd610[_0x297ef9]!==''?JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9]):[],_0x324d60=_0x1f4a09[_0x3ca814(0x163)](_0xcb0fdc=>new Function(JSON[_0x3ca814(0x1b9)](_0xcb0fdc)));break;case'STR':_0x324d60=_0x2fd610[_0x297ef9]!==''?String(_0x2fd610[_0x297ef9]):'';break;case _0x3ca814(0x192):_0x1f4a09=_0x2fd610[_0x297ef9]!==''?JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9]):[],_0x324d60=_0x1f4a09[_0x3ca814(0x163)](_0xe2c5c=>String(_0xe2c5c));break;case _0x3ca814(0x1a5):_0x5a6786=_0x2fd610[_0x297ef9]!==''?JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9]):{},_0x324d60=VisuMZ[_0x3ca814(0x1a9)]({},_0x5a6786);break;case _0x3ca814(0x1c0):_0x1f4a09=_0x2fd610[_0x297ef9]!==''?JSON[_0x3ca814(0x1b9)](_0x2fd610[_0x297ef9]):[],_0x324d60=_0x1f4a09[_0x3ca814(0x163)](_0x528aab=>VisuMZ[_0x3ca814(0x1a9)]({},JSON['parse'](_0x528aab)));break;default:continue;}_0x5e8e91[_0x240572]=_0x324d60;}}}return _0x5e8e91;},(_0x15cc9c=>{const _0x73cd8f=_0x395a2a,_0x259a59=_0x15cc9c[_0x73cd8f(0x1ab)];for(const _0x5d59a2 of dependencies){if(_0x73cd8f(0x166)!==_0x73cd8f(0x166))_0xa68780(_0x73cd8f(0x16d)[_0x73cd8f(0x178)](_0x538fa2,_0x287b8c,_0xbe27ba)),_0x1627ba[_0x73cd8f(0x191)]();else{if(!Imported[_0x5d59a2]){if('AtJWx'===_0x73cd8f(0x1b5)){alert(_0x73cd8f(0x170)[_0x73cd8f(0x178)](_0x259a59,_0x5d59a2)),SceneManager[_0x73cd8f(0x191)]();break;}else return _0x3586cf['VISUAL_GOLD_DISPLAY_AUTOSIZE_GOLDWIN'];}}}const _0x14b87a=_0x15cc9c[_0x73cd8f(0x1ae)];if(_0x14b87a[_0x73cd8f(0x1ca)](/\[Version[ ](.*?)\]/i)){if('mBlCw'!==_0x73cd8f(0x18a)){if(_0x2689e2&&_0x5ec6a9)_0x249a35=_0x580464[_0x73cd8f(0x165)](_0x2828cc);_0x47366d+=_0x11d2a1;}else{const _0x1e4e4d=Number(RegExp['$1']);_0x1e4e4d!==VisuMZ[label][_0x73cd8f(0x171)]&&(alert(_0x73cd8f(0x186)[_0x73cd8f(0x178)](_0x259a59,_0x1e4e4d)),SceneManager['exit']());}}if(_0x14b87a['match'](/\[Tier[ ](\d+)\]/i)){if('NfSRh'===_0x73cd8f(0x1af)){const _0x49201e=_0x595f0b[_0x73cd8f(0x169)][_0x73cd8f(0x1bb)][_0x73cd8f(0x1b0)][_0x73cd8f(0x1b3)],_0x5f102b=_0x49201e>0x0?_0x73cd8f(0x19f)[_0x73cd8f(0x178)](_0x49201e||0x0):'',_0x15890a=_0x73cd8f(0x1b8)['format'](_0x2b288b[_0x73cd8f(0x188)]()),_0x499b0b=_0x4aae0c[_0x73cd8f(0x1c4)]+_0x15890a;return _0x499b0b[_0x73cd8f(0x178)](_0x5f102b,_0x5c0966[_0x73cd8f(0x1aa)]);}else{const _0x471512=Number(RegExp['$1']);_0x471512<tier?_0x73cd8f(0x162)!=='mLsGX'?(_0x1de96e(_0x73cd8f(0x186)['format'](_0x27daef,_0x25f593)),_0x347dc7[_0x73cd8f(0x191)]()):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x73cd8f(0x178)](_0x259a59,_0x471512,tier)),SceneManager['exit']()):tier=Math[_0x73cd8f(0x15a)](_0x471512,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x73cd8f(0x1bb)],_0x15cc9c[_0x73cd8f(0x17e)]);})(pluginData),Window_Base[_0x395a2a(0x1d3)]=VisuMZ['VisualGoldDisplay'][_0x395a2a(0x1bb)][_0x395a2a(0x1bd)],Window_Base['VISUAL_GOLD_DISPLAY_ICONS']['e0']=0x0,Window_Base[_0x395a2a(0x189)]=VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1bb)][_0x395a2a(0x1d5)][_0x395a2a(0x19c)],Window_Base[_0x395a2a(0x158)]=VisuMZ['VisualGoldDisplay'][_0x395a2a(0x1bb)][_0x395a2a(0x1d5)][_0x395a2a(0x1c2)],Window_Base[_0x395a2a(0x1be)]=VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1bb)][_0x395a2a(0x1d5)][_0x395a2a(0x18e)],Window_Base[_0x395a2a(0x190)]=VisuMZ[_0x395a2a(0x185)]['Settings'][_0x395a2a(0x1d5)][_0x395a2a(0x1bc)],Window_Base[_0x395a2a(0x15d)]=VisuMZ[_0x395a2a(0x185)]['Settings'][_0x395a2a(0x1d5)][_0x395a2a(0x1ac)],Window_Base[_0x395a2a(0x1ba)]=VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1bb)]['Display'][_0x395a2a(0x199)],Window_Base[_0x395a2a(0x164)]=VisuMZ['VisualGoldDisplay'][_0x395a2a(0x1bb)]['Special']['NoCostEnable'],Window_Base[_0x395a2a(0x1c5)]=VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1bb)][_0x395a2a(0x180)][_0x395a2a(0x181)],Window_Base['VISUAL_GOLD_DISPLAY_UPPER_LIMIT_VALUE']=VisuMZ['VisualGoldDisplay']['Settings'][_0x395a2a(0x180)][_0x395a2a(0x1cd)],Window_Base[_0x395a2a(0x1c4)]=VisuMZ['VisualGoldDisplay'][_0x395a2a(0x1bb)][_0x395a2a(0x180)]['UpperLimitFmt'],VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1b2)]=Window_Base[_0x395a2a(0x156)][_0x395a2a(0x1a2)],Window_Base['prototype']['drawCurrencyValue']=function(_0x4dbc02,_0xd4525c,_0x160dfb,_0x27904f,_0x421778){const _0x5334b0=_0x395a2a;if(_0xd4525c===TextManager[_0x5334b0(0x1aa)]&&this[_0x5334b0(0x1c1)]())_0x5334b0(0x19e)===_0x5334b0(0x182)?_0x220231=_0x51c1e8[_0x5334b0(0x185)][_0x5334b0(0x1d0)]():this['drawCurrencyValueVisualGoldDisplay'](_0x4dbc02,_0xd4525c,_0x160dfb,_0x27904f,_0x421778);else{if(_0x5334b0(0x1b6)===_0x5334b0(0x1a7))return _0x4a0b4f[_0x5334b0(0x15d)];else VisuMZ[_0x5334b0(0x185)][_0x5334b0(0x1b2)][_0x5334b0(0x167)](this,_0x4dbc02,_0xd4525c,_0x160dfb,_0x27904f,_0x421778);}},Window_Base['prototype'][_0x395a2a(0x160)]=function(_0xa3d2a6,_0x323e1c,_0x275d50,_0x171d0b,_0x5b8415){const _0x10fa06=_0x395a2a;this[_0x10fa06(0x15f)]();const _0x23cea4=this[_0x10fa06(0x19a)](),_0x139049=this['visualGoldDisplayNoCost']();let _0x5108ea=VisuMZ[_0x10fa06(0x185)][_0x10fa06(0x1b1)](_0xa3d2a6,_0x23cea4,_0x139049),_0x4be755=_0x5108ea,_0x294e5c=this['textSizeEx'](_0x5108ea)[_0x10fa06(0x1cb)];const _0x2bded4=this[_0x10fa06(0x195)]();if(_0x2bded4){let _0x9b0159=$gameSystem[_0x10fa06(0x188)]();while(_0x294e5c>_0x5b8415&&_0x9b0159-->0x0){_0x9b0159<=0x4?_0x10fa06(0x1ce)!=='BWJZn'?_0x5108ea=VisuMZ[_0x10fa06(0x185)][_0x10fa06(0x1d0)]():_0xc441e2=_0x10fa06(0x17d)['format'](_0x2aab5e,_0x12cfaa):_0x5108ea=_0x10fa06(0x17d)[_0x10fa06(0x178)](_0x9b0159,_0x4be755),_0x294e5c=this['textSizeEx'](_0x5108ea)['width'];}}const _0x53fb0c=_0x275d50;_0x275d50+=_0x5b8415-_0x294e5c,this[_0x10fa06(0x172)](_0x5108ea,Math[_0x10fa06(0x15a)](_0x53fb0c,_0x275d50),_0x171d0b,_0x5b8415);},Window_Base['prototype'][_0x395a2a(0x1c1)]=function(){return!![];},Window_Base[_0x395a2a(0x156)][_0x395a2a(0x1d4)]=function(){const _0x5040b7=_0x395a2a;return Window_Base[_0x5040b7(0x164)];},Window_Base[_0x395a2a(0x156)][_0x395a2a(0x19a)]=function(){const _0x232dab=_0x395a2a;return Window_Base[_0x232dab(0x1be)];},Window_Base['prototype']['visualGoldDisplayAutosize']=function(){return Window_Base['VISUAL_GOLD_DISPLAY_AUTOSIZE_DEFAULT'];},VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1b1)]=function(_0xb9cf6c,_0xe3a8e3,_0x16ac3f){const _0x2ac37a=_0x395a2a,_0x822391=Window_Base[_0x2ac37a(0x1d3)],_0x1bf4cf=Window_Base[_0x2ac37a(0x189)],_0xa5bf73=Window_Base['VISUAL_GOLD_DISPLAY_SEGMENT_FMT'],_0x25de23=VisuMZ[_0x2ac37a(0x169)][_0x2ac37a(0x1bb)]['Gold']['GoldIcon'],_0x19cf63=_0x25de23>0x0?'\x5cVGDI[%1]'[_0x2ac37a(0x178)](_0x25de23||0x0):'',_0xdb5faf='\x5cC[0]\x5cFS[%1]'[_0x2ac37a(0x178)]($gameSystem[_0x2ac37a(0x188)]());if(_0xb9cf6c<=0x0&&_0x16ac3f&&Window_Base[_0x2ac37a(0x164)])return VisuMZ['VisualGoldDisplay'][_0x2ac37a(0x1a3)]();const _0x46e20c=Window_Base[_0x2ac37a(0x176)];if(_0xb9cf6c>=_0x46e20c&&_0x46e20c>0x0)return VisuMZ[_0x2ac37a(0x185)][_0x2ac37a(0x1d0)]();let _0x2f986c='',_0x27d330=0x9,_0x532399=0x0,_0x36f35f=![];while(_0x27d330>=0x0){if(_0x2ac37a(0x1d2)===_0x2ac37a(0x1d2)){const _0x50ba7e=_0x822391[_0x2ac37a(0x1c3)[_0x2ac37a(0x178)](_0x27d330)];if(_0x36f35f)_0x532399++;if(_0x50ba7e>0x0){const _0x1164a9=Math[_0x2ac37a(0x15e)](0xa,_0x27d330);let _0x130e5e=Math[_0x2ac37a(0x193)](_0xb9cf6c/_0x1164a9);const _0x228e9f='\x5cVGDI[%1]'['format'](_0x50ba7e);if(_0x130e5e>0x0)_0x36f35f=!![];if(_0x130e5e>0x0||_0xe3a8e3&&_0x36f35f){if('LbTjI'!==_0x2ac37a(0x1b4))return _0x182cd0[_0x2ac37a(0x185)][_0x2ac37a(0x1a3)]();else{if(_0xe3a8e3)_0x130e5e=_0x130e5e[_0x2ac37a(0x165)](_0x532399);_0x2f986c+=_0xa5bf73[_0x2ac37a(0x178)](_0x130e5e,_0x228e9f),_0x130e5e=Number(_0x130e5e),_0x130e5e*=_0x1164a9,_0xb9cf6c-=_0x130e5e;}}_0x532399=0x0;}else{if(_0x27d330===0x0){if(_0x2ac37a(0x1c9)!=='EAeCC'){const _0x3ac8e2=_0x14c37c(_0x51e457['$1']);_0x3ac8e2<_0x1cd03d?(_0x3fe264(_0x2ac37a(0x16d)[_0x2ac37a(0x178)](_0x4bf741,_0x3ac8e2,_0x169c8c)),_0x5eda69[_0x2ac37a(0x191)]()):_0x4fdd47=_0x5ece68[_0x2ac37a(0x15a)](_0x3ac8e2,_0xa66c0a);}else{if(_0xe3a8e3&&_0x36f35f)_0xb9cf6c=_0xb9cf6c['padZero'](_0x532399);_0x2f986c+=_0xb9cf6c;}}}_0x27d330--;}else return _0x4d1232[_0x2ac37a(0x190)];}return _0x2f986c=_0x1bf4cf[_0x2ac37a(0x178)](_0x2f986c,_0x19cf63,TextManager[_0x2ac37a(0x1aa)]),_0x2f986c+=_0xdb5faf,_0x2f986c;},VisuMZ['VisualGoldDisplay'][_0x395a2a(0x1a3)]=function(){const _0x5a805d=_0x395a2a,_0x5bf082=VisuMZ['CoreEngine'][_0x5a805d(0x1bb)][_0x5a805d(0x1b0)][_0x5a805d(0x1b3)],_0x1e835e=_0x5bf082>0x0?'\x5cVGDI[%1]'[_0x5a805d(0x178)](_0x5bf082||0x0):'',_0x1aae98=_0x5a805d(0x1b8)[_0x5a805d(0x178)]($gameSystem[_0x5a805d(0x188)]()),_0x30befb=Window_Base[_0x5a805d(0x1c5)]+_0x1aae98;return _0x30befb['format'](_0x1e835e,TextManager[_0x5a805d(0x1aa)]);},VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1d0)]=function(){const _0x52f0f4=_0x395a2a,_0x4e486e=VisuMZ[_0x52f0f4(0x169)][_0x52f0f4(0x1bb)]['Gold'][_0x52f0f4(0x1b3)],_0x4ea797=_0x4e486e>0x0?_0x52f0f4(0x19f)[_0x52f0f4(0x178)](_0x4e486e||0x0):'',_0x78f935=_0x52f0f4(0x1b8)[_0x52f0f4(0x178)]($gameSystem[_0x52f0f4(0x188)]()),_0x447f55=Window_Base[_0x52f0f4(0x1c4)]+_0x78f935;return _0x447f55[_0x52f0f4(0x178)](_0x4ea797,TextManager[_0x52f0f4(0x1aa)]);},VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x17c)]=Window_Base[_0x395a2a(0x156)][_0x395a2a(0x18b)],Window_Base[_0x395a2a(0x156)][_0x395a2a(0x18b)]=function(_0x238e08,_0x29e112){const _0xfd325c=_0x395a2a;switch(_0x238e08){case _0xfd325c(0x17b):this[_0xfd325c(0x16f)](this[_0xfd325c(0x16e)](_0x29e112),_0x29e112);break;default:VisuMZ[_0xfd325c(0x185)][_0xfd325c(0x17c)][_0xfd325c(0x167)](this,_0x238e08,_0x29e112);}},Window_Base[_0x395a2a(0x156)][_0x395a2a(0x16f)]=function(_0x47f1e4,_0x316bae){const _0x5412d9=_0x395a2a,_0x3e2cf8=this[_0x5412d9(0x1c7)]['fontSize']-$gameSystem['mainFontSize'](),_0x31d792=ImageManager['iconWidth']+_0x3e2cf8;if(_0x316bae[_0x5412d9(0x174)]){if('WuPDp'===_0x5412d9(0x1c6))this[_0x5412d9(0x187)](_0x47f1e4,_0x31d792,_0x316bae['x']+0x2,_0x316bae['y']+0x2-Math[_0x5412d9(0x1c8)](_0x3e2cf8/0x2));else{const _0x206bbc=this[_0x5412d9(0x1c7)][_0x5412d9(0x19b)]-_0x35fa84['mainFontSize'](),_0x3a063f=_0x15b9ce[_0x5412d9(0x1ad)]+_0x206bbc;_0x428c9d[_0x5412d9(0x174)]&&this[_0x5412d9(0x187)](_0xdcf7c,_0x3a063f,_0x1a4b3a['x']+0x2,_0x719090['y']+0x2-_0x30f906[_0x5412d9(0x1c8)](_0x206bbc/0x2)),_0x6b1a4d['x']+=_0x3a063f+0x4;}}_0x316bae['x']+=_0x31d792+0x4;},Window_Base[_0x395a2a(0x156)][_0x395a2a(0x187)]=function(_0x1c039b,_0x2fc06f,_0x1f4cd7,_0x1c48ca){const _0x217bb7=_0x395a2a,_0x451e46=ImageManager[_0x217bb7(0x177)](_0x217bb7(0x196)),_0x1c4831=ImageManager[_0x217bb7(0x1ad)],_0x2b619c=ImageManager[_0x217bb7(0x1b7)],_0x2102cb=_0x1c039b%0x10*_0x1c4831,_0x3fce6b=Math[_0x217bb7(0x193)](_0x1c039b/0x10)*_0x2b619c,_0x5d2731=!![];this[_0x217bb7(0x1c7)][_0x217bb7(0x1cc)][_0x217bb7(0x16c)]=_0x5d2731,this['contents'][_0x217bb7(0x15b)](_0x451e46,_0x2102cb,_0x3fce6b,_0x1c4831,_0x2b619c,_0x1f4cd7,_0x1c48ca,_0x2fc06f,_0x2fc06f),this[_0x217bb7(0x1c7)][_0x217bb7(0x1cc)][_0x217bb7(0x16c)]=!![];},VisuMZ[_0x395a2a(0x185)][_0x395a2a(0x1a0)]=Window_Base[_0x395a2a(0x156)][_0x395a2a(0x183)],Window_Base[_0x395a2a(0x156)][_0x395a2a(0x183)]=function(_0x2238c7){const _0x25c9ef=_0x395a2a;return _0x2238c7=this[_0x25c9ef(0x18c)](_0x2238c7),VisuMZ[_0x25c9ef(0x185)][_0x25c9ef(0x1a0)][_0x25c9ef(0x167)](this,_0x2238c7);},Window_Base[_0x395a2a(0x156)][_0x395a2a(0x18c)]=function(_0x4b5d23){const _0x52c965=_0x395a2a;return _0x4b5d23=_0x4b5d23[_0x52c965(0x17f)](/\\GOLDFULL\[(\d+)\]/gi,(_0x3e2989,_0x26ba9e)=>VisuMZ[_0x52c965(0x185)][_0x52c965(0x1b1)](parseInt(_0x26ba9e),!![])),_0x4b5d23=_0x4b5d23['replace'](/\\GOLDPAD\[(\d+)\]/gi,(_0x38d960,_0x54db57)=>VisuMZ[_0x52c965(0x185)][_0x52c965(0x1b1)](parseInt(_0x54db57),!![])),_0x4b5d23=_0x4b5d23[_0x52c965(0x17f)](/\\GOLDSHORT\[(\d+)\]/gi,(_0x46524d,_0x9ba11e)=>VisuMZ[_0x52c965(0x185)][_0x52c965(0x1b1)](parseInt(_0x9ba11e),![])),_0x4b5d23=_0x4b5d23[_0x52c965(0x17f)](/\\GOLDOMIT\[(\d+)\]/gi,(_0xe0b70e,_0x4ab5d4)=>VisuMZ[_0x52c965(0x185)][_0x52c965(0x1b1)](parseInt(_0x4ab5d4),![])),_0x4b5d23;},Window_Gold[_0x395a2a(0x156)][_0x395a2a(0x19a)]=function(){const _0x3edf9b=_0x395a2a;return Window_Base[_0x3edf9b(0x190)];},Window_Gold[_0x395a2a(0x156)][_0x395a2a(0x195)]=function(){const _0x33de88=_0x395a2a;return Window_Base[_0x33de88(0x1ba)];},Window_Gold[_0x395a2a(0x156)]['visualGoldDisplayNoCost']=function(){return![];},Window_Gold[_0x395a2a(0x156)]['refresh']=function(){const _0x461dba=_0x395a2a,_0x1b8555=this[_0x461dba(0x197)](0x0),_0x9777ed=_0x1b8555['x'],_0x13101a=_0x1b8555['y'],_0x44c1c4=_0x1b8555[_0x461dba(0x1cb)];this[_0x461dba(0x1c7)]['clear'](),this[_0x461dba(0x1a2)](this[_0x461dba(0x1cf)](),this[_0x461dba(0x1aa)](),_0x9777ed,_0x13101a,_0x44c1c4);};