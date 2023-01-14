//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.25] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x4d00(){const _0x218923=['maxCols','_stored_debuffColor','LGVCM','TPgNh','KMYWg','Settings','dpqSS','initialize','DQryo','skillVisibleJS','clearStateRetainType','updateStateTurns','isStateCategoryResisted','skillTypes','onRemoveState','_buffs','sort','gainMp','clearStateDisplay','uiMenuStyle','onExpireStateGlobalJS','sHUbf','CmdStyle','map','gPwBk','removeStatesByCategory','isStateAffected','Game_BattlerBase_initMembers','Game_BattlerBase_skillMpCost','height','testSkillStatesCoreNotetags','getStateData','skillCostSeparator','bNtwX','hYPnY','skill','sxaFv','NEqXi','fpdTb','Sprite_Gauge_setup','slipHp','commandName','toRza','Game_BattlerBase_die','ZWZlG','SkillSceneStatusBgType','statusWidth','process_VisuMZ_SkillsStatesCore_State_Notetags','MJHrm','Sprite_Gauge_initMembers','ColorNeutral','ReapplyRules','stateAddJS','isPartyAllAffectedByGroupDefeatStates','stateTurns','PassiveStates','shopStatusWindowRectSkillsStatesCore','_stateDisplay','GaugeDrawJS','match','applyItemUserEffect','XHjUy','HTYGN','convertTargetToStateOriginKey','DisplayedParams','clearStateOrigin','priority','mainAreaTop','clearStateData','debuffTurns','addWindow','_checkingPassiveStates','vsxGz','TextJS','setStateOrigin','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','zJGta','removeBuffsAuto','ismSH','LLlfx','_commandNameWindow','Scene_Boot_onDatabaseLoaded','onEraseDebuffGlobalJS','constructor','getCurrentTroopUniqueID','onRegenerateCustomStateDamageOverTime','Game_BattlerBase_decreaseBuff','onAddDebuffJS','States','drawIcon','death','isAlive','shopStatusWindowRect','%1\x20%2\x20%3','Game_Battler_addBuff','_phase','onEraseStateJS','remove','buffIconIndex','QUUUe','setBackgroundType','BattleHiddenSkillTypes','getColor','DXLbM','<actor-%1>','onExpireDebuffGlobalJS','MrzOA','stateCategoriesResisted','updateCommandNameWindow','loadBitmap','Sprite_Gauge_redraw','zhyEL','GaugeCurrentJS','buttonAssistSwitch','isBuffAffected','statesByCategory','parameters','_states','stateExpireJS','Game_BattlerBase_traitsSet','onExpireBuff','KhLmu','onExpireDebuff','checkCacheKey','isStateAddable','lineHeight','skillTpCost','decreaseBuff','commandStyle','removeStatesByCategoryAll','POSITIVE','tNDdh','XKeMq','outlineColor','Parse_Notetags_State_ApplyRemoveLeaveJS','status','onExpireBuffGlobalJS','textColor','isUseModernControls','_stored_buffColor','Window_SkillType_initialize','rcQip','contents','ARRAYEVAL','HudpW','IyUUl','debuffColor','qfXcL','PPrJk','setup','placeExactGauge','xiFdq','_passiveStateResults','currentMaxValue','ylrEk','isActor','lDauV','augoW','split','meetsSkillConditionsEnableJS','meetsSkillConditions','meetsPassiveStateConditionSwitches','actions','CkFAD','test','mTHCU','onDatabaseLoaded','CQgXh','greater','pFaHf','dLfJL','SkillSceneAdjustSkillList','ColorBuff','statusWindowRectSkillsStatesCore','increaseBuff','buff','Game_BattlerBase_eraseState','textSizeEx','CoreEngine','overwriteBuffTurns','setStateRetainType','getStateOrigin','addPassiveStatesTraitSets','includesSkillsStatesCore','stateHpSlipDamageJS','Game_Actor_forgetSkill','slipTp','fcZxm','onAddState','_colorCache','itemWindowRectSkillsStatesCore','addChild','siTNL','gainSilentTp','applyBuffTurnManipulationEffects','makeCommandList','convertPassiveStates','AnhWD','Scene_Skill_helpWindowRect','onExpireStateCustomJS','MAXMP','clearStatesWithStateRetain','ShowShopStatus','Actor','AXMnk','cgZqY','Game_Battler_addState','stateEraseJS','zNmic','weJqX','Game_Actor_skillTypes','right','Scene_Skill_createItemWindow','return\x200','add','untitled','jvImA','replace','checkShowHideNotetags','zdKZR','hTOzL','passiveStates','zXoYM','adjustItemWidthByShopStatus','allowCreateShopStatusWindow','categories','fontFace','mSynX','action','Game_BattlerBase_clearStates','autoRemovalTiming','PgTPQ','\x5cI[%1]%2','parse','prototype','ZYNFa','FUNC','applySkillsStatesCoreEffects','hasStateCategory','createShopStatusWindow','rftMq','addPassiveStatesByPluginParameters','eFQbp','tUdUp','APUcM','helpAreaTop','BattleManager_endAction','RDyEq','convertGaugeTypeSkillsStatesCore','redraw','resetStateCounts','kJJAP','passiveStateObjects','getStateRetainType','EVAL','MFNFn','windowPadding','getSkillTypes','VisuMZ_1_ElementStatusCore','Game_Action_testApply','IILkZ','WmNVU','ARRAYSTR','_stored_state-%1-color','VpMXf','Rfoqw','forgetSkill','fIQXt','statusWindowRect','rEXcd','Game_Troop_setup','resetFontSettings','_costSettings','updateTurnDisplaySprite','rgba(0,\x200,\x200,\x201)','drawActorIcons','width','Parse_Notetags_State_PassiveJS','Game_Battler_regenerateAll','STR','WJFLX','ftcNd','drawActorBuffTurns','1262944Rwrzvq','addDebuffTurns','setupSkillsStatesCore','eUxih','meetsSkillConditionsGlobalJS','getStateOriginByKey','ZXhbf','gaugeBackColor','die','addPassiveStatesFromOtherPlugins','VisuMZ_0_CoreEngine','zIjnp','drawActorIconsAllTurnCounters','_itemWindow','totalStateCategory','fontSize','zyenJ','Scene_Skill_statusWindowRect','members','_turnDisplaySprite','slipMp','_shopStatusWindow','AobvY','_battler','kCGlm','commandNameWindowDrawText','Game_BattlerBase_recoverAll','2CckAUe','rRmml','XGKxp','mainFontFace','<enemy-%1>','Window_SkillList_updateHelp','drawSkillCost','exit','lUCmC','meetsPassiveStateConditionJS','KchAi','Game_Actor_learnSkill','VisuMZ_2_ClassChangeSystem','_classIDs','_tempActor','uPdku','onAddDebuff','dAPMU','NUM','1442735FkkEhI','RLWaW','WZeLS','getClassIdWithName','PayJS','Window_StatusBase_drawActorIcons','version','syGKv','grSbE','DMyli','EQnrb','format','hasState','Game_Unit_isAllDead','gaugeLineHeight','stateData','calcWindowHeight','zxhVz','Game_Action_applyItemUserEffect','itemWindowRect','helpAreaHeight','states','log','addStateTurns','stateTpSlipDamageJS','onAddStateGlobalJS','text','makeCommandName','UhrxC','commandNameWindowCenter','isPassiveStateStackable','useDigitGrouping','onExpireState','Game_BattlerBase_skillTpCost','value','allIcons','updatedLayoutStyle','recover\x20all','onEraseDebuffJS','CBpLM','_statusWindow','setStateDisplay','Parse_Notetags_Skill_JS','Window_StatusBase_placeGauge','ParseClassIDs','Name','anchor','ZTCgZ','CctPs','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_checkingVisuMzPassiveStateObjects','tpCost','<member-%1>','onEraseDebuff','addDebuff','IPsku','call','pMbXX','647790XDrZaI','initMembers','applyDebuffTurnManipulationEffects','drawActorStateTurns','currentDisplayedValue','currentClass','itemAt','redrawSkillsStatesCore','6mPhsEF','isCommandEnabled','_checkingTraitsSetSkillsStatesCore','AfKXn','skillId','nIMdD','_stypeIDs','Costs','clearStates','qmBkE','DataOffsetY','isStateRemoved','CalcJS','sQHkb','updateHelp','tDMjG','vVvFn','cDTCr','drawText','paramBuffRate','isRightInputMode','yUTpF','Game_BattlerBase_states','getCurrentStateOriginKey','iTlhb','HXGTy','NRqgJ','Window_SkillList_setActor','aXulg','eraseBuff','Rngpu','traitObjects','indexOf','placeGauge','Sprite_Gauge_currentValue','EnableLayout','mdRlh','Game_Battler_isStateAddable','ARRAYSTRUCT','Sprite_Gauge_currentMaxValue','_currentTroopUniqueID','concat','refresh','endAction','JVpqb','toLowerCase','CPsIE','stateMaximumTurns','uiInputPosition','stateTpSlipHealJS','SpOjz','Ambac','JSON','center','isSkillTypeMatchForUse','gainHp','aliveMembers','gradientFillRect','none','Buffs','WvTjN','dkEwT','drawItemStyleIconText','checkShowHideJS','drawFullGauge','Htlac','_scene','YDsGy','buffTurns','TurnFontSize','_lastStatesActionEndFrameCount','IZNOO','stateMpSlipHealJS','eIvbS','DataFontSize','rrEJl','usableSkills','Sprite_Gauge_gaugeRate','onAddStateJS','isBuffOrDebuffAffected','aBIeC','drawParamText','Game_BattlerBase_overwriteBuffTurns','createCommandNameWindow','HiddenSkillTypes','IconStypeNorm','fOKtv','onExpireDebuffJS','Game_BattlerBase_isStateResist','iconHeight','Scene_Skill_skillTypeWindowRect','ltMGf','_stateOrigin','mpCost','note','NtXiF','20SDxEev','isSkillUsableForAutoBattle','_subject','kkrmb','isStateExpired','onAddBuff','StackBuffMax','onAddDebuffGlobalJS','applyStateCategoryRemovalEffects','skillTypeWindowRect','index','#%1','meetsPassiveStateConditions','onEraseStateCustomJS','KrPag','skills','Game_BattlerBase_increaseBuff','slice','OZOvN','onAddStateCustomJS','MultiplierJS','getStypeIdWithName','setStypeId','isBottomHelpMode','_currentActor','getStateIdWithName','nWbVn','itemLineRect','enemyId','CheckVisibleSkillNotetags','MAT','isSkillCostShown','innerHeight','Gtibj','regenerateAll','ALL','auto','fontBold','onEraseStateGlobalJS','callUpdateHelp','CBoCe','checkSkillConditionsNotetags','addBuffTurns','DdkFX','ignore','addPassiveStatesByNotetag','Window_SkillList_drawItem','changePaintOpacity','removeState','reset','3614337AORaGt','onAddBuffJS','XXghH','moqnL','eraseState','_skillTypeWindow','Dslsu','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setBuffTurns','NyphF','DataOffsetX','isDebuffAffected','enemy','hKGnQ','skillEnableJS','<troop-%1>','isLearnedSkill','actor','equips','buttonAssistText1','_stateIDs','hasSkill','CheckVisibleBattleNotetags','_stateMaxTurns','dzZBR','getCurrentStateActiveUser','setStateTurns','mainCommandWidth','round','isAllDead','vlzLn','scrollTo','stateId','changeTextColor','multiclasses','EdBBU','name','drawActorStateData','drawTextEx','drawExtendedSkillsStatesCoreStatus','skillTypeWindowRectSkillsStatesCore','iconText','meetsPassiveStateGlobalConditionJS','max','Game_BattlerBase_resetStateCounts','inBattle','success','normalColor','testApply','onExpireBuffJS','createPassiveStatesCache','zpRMj','ShowData','setItem','LUK','cnrzW','gaugeRate','isUseSkillsStatesCoreUpdatedLayout','gXHAL','Game_BattlerBase_refresh','stypeId','SECea','FPtxG','_categoryWindow','ParseStateNotetags','_tempBattler','restriction','setStateData','isBuffPrevented','makeResistedStateCategories','initMembersSkillsStatesCore','getSkillIdWithName','push','_skillIDs','76141dvgFVq','addBuff','Global','JlBmU','number','learnSkill','helpWindowRect','MaxTurns','changeOutlineColor','canClearState','addState','Game_BattlerBase_meetsSkillConditions','clear','drawItemStyleIcon','wBWQF','createTurnDisplaySprite','guvkH','getColorDataFromPluginParameters','_animationIndex','Window_SkillStatus_refresh','commandNameWindowDrawBackground','QDowF','OqSQG','frameCount','Game_BattlerBase_eraseBuff','damage','buffColor','uiHelpPosition','yQsbv','makeAdditionalSkillCostText','BpSwA','ARRAYFUNC','kCUMG','groupDefeat','LaerT','icon','Param','kSCbV','_stateRetainType','currentMaxValueSkillsStatesCore','rpRiz','isStateCategoryAffected','stateHpSlipHealJS','ParseAllNotetags','createItemWindow','ListWindowCols','DUbMy','Game_Battler_addDebuff','stateColor','TurnOffsetY','canPaySkillCost','sAenK','aNddK','FykOd','actorId','Window_SkillList_maxCols','_cache','ATK','Skills','statePassiveConditionJS','process_VisuMZ_SkillsStatesCore_Skill_Notetags','setStatusWindow','Parse_Notetags_State_SlipEffectJS','iCCsc','_result','user','_stateData','opacity','onEraseBuffGlobalJS','meetsPassiveStateConditionClasses','AGI','shift','_hidden','trim','SkillsStatesCore','iconIndex','createAllSkillCostText','traitsSet','qtvId','currentValueSkillsStatesCore','CheckIncompatibleStates','isStateResist','recoverAll','GroupDigits','drawExtendedParameter','getStateDisplay','Vdywe','MAXHP','innerWidth','process_VisuMZ_SkillsStatesCore_Notetags','732620oouFOS','VYNui','addCommand','isGroupDefeatStateAffected','commandStyleCheck','floor','updateStatesActionEnd','setPassiveStateSlipDamageJS','active','resetTextColor','kKibE','isStateRestrict','onAddStateMakeCustomSlipValues','_stateSteps','eybCS','_stypeId','mainFontSize','NEGATIVE','onAddBuffGlobalJS','xoWYm','muHsV','helpWindowRectSkillsStatesCore','tVxAk','getStateReapplyRulings','SHDsm','CGpHd','DlxqE','iconWidth','paySkillCost','itemTextAlign','isPlaytest','242286MtamXf','onExpireStateJS','pwGZA','Parse_Notetags_State_Category','updateFrame','clamp','VisuMZ_1_ItemsEquipsCore','xYdqx','LayoutStyle','shopStatusWidth','ParseSkillNotetags','makeSuccess','Parse_Notetags_Skill_Cost','Enemy','XAJty','includes','mainAreaHeight','removeStatesAuto','drawActorBuffRates','DEF','Sprite_StateIcon_loadBitmap','updateVisibility','IconStypeMagic','ShowTurns','totalStateCategoryAffected','lWGTR','recalculateSlipDamageJS','toUpperCase','boxWidth','TurnOffsetX','length','filter','onEraseBuff','_actor','ConvertParams','LzsGW','HBtFX','CmdTextAlign','setDebuffTurns','CanPayJS','currentValue','item','CheckVisibleSwitchNotetags','GaugeMaxJS','drawItem','regenerateAllSkillsStatesCore','_skills','eRPGC','skillMpCost','ceil','_stateTurns','setActor','bitmap','addPassiveStates','_buffTurns','stateMpSlipDamageJS','CKxBs','grKre','heal','ActionEndUpdate'];_0x4d00=function(){return _0x218923;};return _0x4d00();}function _0x82b5(_0x33ec70,_0x205a38){const _0x4d0007=_0x4d00();return _0x82b5=function(_0x82b52d,_0x4ce228){_0x82b52d=_0x82b52d-0x101;let _0x401c06=_0x4d0007[_0x82b52d];return _0x401c06;},_0x82b5(_0x33ec70,_0x205a38);}const _0x558d77=_0x82b5;(function(_0x571d7e,_0xd10e4f){const _0x5c1d4d=_0x82b5,_0x85831b=_0x571d7e();while(!![]){try{const _0x392e7e=parseInt(_0x5c1d4d(0x289))/0x1*(parseInt(_0x5c1d4d(0x158))/0x2)+-parseInt(_0x5c1d4d(0x302))/0x3+-parseInt(_0x5c1d4d(0x2e3))/0x4+-parseInt(_0x5c1d4d(0x1a5))/0x5+-parseInt(_0x5c1d4d(0x1ad))/0x6*(parseInt(_0x5c1d4d(0x16b))/0x7)+-parseInt(_0x5c1d4d(0x13d))/0x8+-parseInt(_0x5c1d4d(0x23f))/0x9*(-parseInt(_0x5c1d4d(0x20d))/0xa);if(_0x392e7e===_0xd10e4f)break;else _0x85831b['push'](_0x85831b['shift']());}catch(_0x3d6156){_0x85831b['push'](_0x85831b['shift']());}}}(_0x4d00,0x1dc17));var label=_0x558d77(0x2d3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x558d77(0x321)](function(_0x3bffce){const _0x1b9c58=_0x558d77;return _0x3bffce[_0x1b9c58(0x3c5)]&&_0x3bffce['description'][_0x1b9c58(0x311)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x558d77(0x343)]||{},VisuMZ['ConvertParams']=function(_0x576bbd,_0x20c8ec){const _0x3831f8=_0x558d77;for(const _0x3a27ce in _0x20c8ec){if(_0x3a27ce[_0x3831f8(0x379)](/(.*):(.*)/i)){const _0x180ca4=String(RegExp['$1']),_0x4d4000=String(RegExp['$2'])[_0x3831f8(0x31d)]()[_0x3831f8(0x2d2)]();let _0xa8aafd,_0x184dfb,_0x2eac23;switch(_0x4d4000){case _0x3831f8(0x16a):_0xa8aafd=_0x20c8ec[_0x3a27ce]!==''?Number(_0x20c8ec[_0x3a27ce]):0x0;break;case'ARRAYNUM':_0x184dfb=_0x20c8ec[_0x3a27ce]!==''?JSON['parse'](_0x20c8ec[_0x3a27ce]):[],_0xa8aafd=_0x184dfb[_0x3831f8(0x355)](_0x340b81=>Number(_0x340b81));break;case _0x3831f8(0x120):_0xa8aafd=_0x20c8ec[_0x3a27ce]!==''?eval(_0x20c8ec[_0x3a27ce]):null;break;case _0x3831f8(0x3cd):_0x184dfb=_0x20c8ec[_0x3a27ce]!==''?JSON[_0x3831f8(0x10b)](_0x20c8ec[_0x3a27ce]):[],_0xa8aafd=_0x184dfb['map'](_0x481f36=>eval(_0x481f36));break;case _0x3831f8(0x1e1):_0xa8aafd=_0x20c8ec[_0x3a27ce]!==''?JSON[_0x3831f8(0x10b)](_0x20c8ec[_0x3a27ce]):'';break;case'ARRAYJSON':_0x184dfb=_0x20c8ec[_0x3a27ce]!==''?JSON[_0x3831f8(0x10b)](_0x20c8ec[_0x3a27ce]):[],_0xa8aafd=_0x184dfb[_0x3831f8(0x355)](_0x461ae3=>JSON[_0x3831f8(0x10b)](_0x461ae3));break;case _0x3831f8(0x10e):_0xa8aafd=_0x20c8ec[_0x3a27ce]!==''?new Function(JSON[_0x3831f8(0x10b)](_0x20c8ec[_0x3a27ce])):new Function(_0x3831f8(0x413));break;case _0x3831f8(0x2a8):_0x184dfb=_0x20c8ec[_0x3a27ce]!==''?JSON['parse'](_0x20c8ec[_0x3a27ce]):[],_0xa8aafd=_0x184dfb['map'](_0x1587fd=>new Function(JSON[_0x3831f8(0x10b)](_0x1587fd)));break;case _0x3831f8(0x139):_0xa8aafd=_0x20c8ec[_0x3a27ce]!==''?String(_0x20c8ec[_0x3a27ce]):'';break;case _0x3831f8(0x128):_0x184dfb=_0x20c8ec[_0x3a27ce]!==''?JSON[_0x3831f8(0x10b)](_0x20c8ec[_0x3a27ce]):[],_0xa8aafd=_0x184dfb['map'](_0x434703=>String(_0x434703));break;case'STRUCT':_0x2eac23=_0x20c8ec[_0x3a27ce]!==''?JSON['parse'](_0x20c8ec[_0x3a27ce]):{},_0x576bbd[_0x180ca4]={},VisuMZ['ConvertParams'](_0x576bbd[_0x180ca4],_0x2eac23);continue;case _0x3831f8(0x1d3):_0x184dfb=_0x20c8ec[_0x3a27ce]!==''?JSON[_0x3831f8(0x10b)](_0x20c8ec[_0x3a27ce]):[],_0xa8aafd=_0x184dfb['map'](_0x4484fc=>VisuMZ[_0x3831f8(0x324)]({},JSON[_0x3831f8(0x10b)](_0x4484fc)));break;default:continue;}_0x576bbd[_0x180ca4]=_0xa8aafd;}}return _0x576bbd;},(_0xb6b59=>{const _0x2295b2=_0x558d77,_0x65537=_0xb6b59['name'];for(const _0xc66420 of dependencies){if(_0x2295b2(0x31b)!=='TRdrR'){if(!Imported[_0xc66420]){if(_0x2295b2(0x3c2)!==_0x2295b2(0x41c)){alert(_0x2295b2(0x246)[_0x2295b2(0x176)](_0x65537,_0xc66420)),SceneManager[_0x2295b2(0x15f)]();break;}else _0x31bb58[_0x2295b2(0x2d3)][_0x2295b2(0x17d)][_0x2295b2(0x1a3)](this,_0x500ae2),this[_0x2295b2(0x10f)](_0x255366);}}else{if(_0x3c54fe[_0x2295b2(0x18d)](_0x5b5f48))return![];}}const _0x2c6e48=_0xb6b59['description'];if(_0x2c6e48[_0x2295b2(0x379)](/\[Version[ ](.*?)\]/i)){const _0x35c4d0=Number(RegExp['$1']);_0x35c4d0!==VisuMZ[label][_0x2295b2(0x171)]&&(alert(_0x2295b2(0x19c)[_0x2295b2(0x176)](_0x65537,_0x35c4d0)),SceneManager[_0x2295b2(0x15f)]());}if(_0x2c6e48[_0x2295b2(0x379)](/\[Tier[ ](\d+)\]/i)){if(_0x2295b2(0x27d)!==_0x2295b2(0x3ce)){const _0x50e270=Number(RegExp['$1']);if(_0x50e270<tier){if('IZNOO'!==_0x2295b2(0x1f4)){const _0x17245e=_0x2295b2(0x3c9);this[_0x2295b2(0x3fb)]=this[_0x2295b2(0x3fb)]||{};if(this[_0x2295b2(0x3fb)][_0x17245e])return this[_0x2295b2(0x3fb)][_0x17245e];const _0x27a6aa=_0x3fa78b[_0x2295b2(0x2d3)][_0x2295b2(0x343)][_0x2295b2(0x1e8)][_0x2295b2(0x3ea)];return this[_0x2295b2(0x29a)](_0x17245e,_0x27a6aa);}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2295b2(0x176)](_0x65537,_0x50e270,tier)),SceneManager[_0x2295b2(0x15f)]();}else _0x2295b2(0x28c)!==_0x2295b2(0x28c)?(_0xd1e92[_0x2295b2(0x2d3)][_0x2295b2(0x36f)][_0x2295b2(0x1a3)](this),this[_0x2295b2(0x132)]=null):tier=Math[_0x2295b2(0x26a)](_0x50e270,tier);}else{_0x2190e1[_0x2295b2(0x10c)][_0x2295b2(0x113)][_0x2295b2(0x1a3)](this);const _0x1c26ef=_0x4c6ddb[_0x2295b2(0x2d3)][_0x2295b2(0x343)][_0x2295b2(0x375)][_0x2295b2(0x30f)];this[_0x2295b2(0x2c1)][_0x2295b2(0x41b)]=this[_0x2295b2(0x2c1)]['passiveStates']['concat'](_0x1c26ef);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x2295b2(0x343)],_0xb6b59[_0x2295b2(0x3b2)]);})(pluginData),VisuMZ['SkillsStatesCore'][_0x558d77(0x38f)]=Scene_Boot[_0x558d77(0x10c)][_0x558d77(0x3e4)],Scene_Boot['prototype'][_0x558d77(0x3e4)]=function(){const _0x398a4e=_0x558d77;VisuMZ[_0x398a4e(0x2d3)]['Scene_Boot_onDatabaseLoaded'][_0x398a4e(0x1a3)](this),this[_0x398a4e(0x2e2)](),VisuMZ[_0x398a4e(0x2d3)][_0x398a4e(0x2d9)]();},Scene_Boot['prototype'][_0x558d77(0x2e2)]=function(){const _0x2304f6=_0x558d77;if(VisuMZ[_0x2304f6(0x2b4)])return;this[_0x2304f6(0x2c5)](),this[_0x2304f6(0x36d)]();},Scene_Boot['prototype'][_0x558d77(0x2c5)]=function(){const _0x147d67=_0x558d77;for(const _0xf114ca of $dataSkills){if(!_0xf114ca)continue;VisuMZ[_0x147d67(0x2d3)][_0x147d67(0x30e)](_0xf114ca),VisuMZ[_0x147d67(0x2d3)][_0x147d67(0x195)](_0xf114ca);}},Scene_Boot[_0x558d77(0x10c)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x190020=_0x558d77;for(const _0x5146d6 of $dataStates){if(_0x190020(0x2b1)==='rpRiz'){if(!_0x5146d6)continue;VisuMZ[_0x190020(0x2d3)][_0x190020(0x305)](_0x5146d6),VisuMZ[_0x190020(0x2d3)][_0x190020(0x137)](_0x5146d6),VisuMZ[_0x190020(0x2d3)]['Parse_Notetags_State_SlipEffectJS'](_0x5146d6),VisuMZ[_0x190020(0x2d3)][_0x190020(0x3c4)](_0x5146d6);}else _0x203ec8[_0x190020(0x10c)][_0x190020(0x34c)][_0x190020(0x1a3)](this,_0x4e09e5),this[_0x190020(0x21a)](_0xdad7ee),this[_0x190020(0x233)](_0x222102);}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x30c)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x558d77(0x30c)]=function(_0x2e25a5){const _0x4ac09e=_0x558d77;VisuMZ[_0x4ac09e(0x2d3)][_0x4ac09e(0x30c)][_0x4ac09e(0x1a3)](this,_0x2e25a5),VisuMZ[_0x4ac09e(0x2d3)][_0x4ac09e(0x30e)](_0x2e25a5),VisuMZ[_0x4ac09e(0x2d3)]['Parse_Notetags_Skill_JS'](_0x2e25a5);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x27f)]=VisuMZ[_0x558d77(0x27f)],VisuMZ[_0x558d77(0x27f)]=function(_0x4244fc){const _0x22bf86=_0x558d77;VisuMZ[_0x22bf86(0x2d3)][_0x22bf86(0x27f)][_0x22bf86(0x1a3)](this,_0x4244fc),VisuMZ[_0x22bf86(0x2d3)]['Parse_Notetags_State_Category'](_0x4244fc),VisuMZ[_0x22bf86(0x2d3)]['Parse_Notetags_State_PassiveJS'](_0x4244fc),VisuMZ[_0x22bf86(0x2d3)][_0x22bf86(0x2c7)](_0x4244fc),VisuMZ[_0x22bf86(0x2d3)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x4244fc);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x30e)]=function(_0x594d50){const _0x23650d=_0x558d77,_0x117ea8=_0x594d50[_0x23650d(0x20b)];_0x117ea8[_0x23650d(0x379)](/<MP COST:[ ](\d+)>/i)&&(_0x23650d(0x362)!==_0x23650d(0x362)?(this['_stateOrigin']=this[_0x23650d(0x209)]||{},delete this['_stateOrigin'][_0x29cb83]):_0x594d50[_0x23650d(0x20a)]=Number(RegExp['$1'])),_0x117ea8[_0x23650d(0x379)](/<TP COST:[ ](\d+)>/i)&&(_0x594d50[_0x23650d(0x19e)]=Number(RegExp['$1']));},VisuMZ['SkillsStatesCore'][_0x558d77(0x24d)]={},VisuMZ['SkillsStatesCore']['skillVisibleJS']={},VisuMZ[_0x558d77(0x2d3)]['Parse_Notetags_Skill_JS']=function(_0x2d0f50){const _0x3b72c=_0x558d77,_0x24a12e=_0x2d0f50[_0x3b72c(0x20b)];if(_0x24a12e['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x1aa203=String(RegExp['$1']),_0x519a6e='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x1aa203);VisuMZ['SkillsStatesCore'][_0x3b72c(0x24d)][_0x2d0f50['id']]=new Function(_0x3b72c(0x361),_0x519a6e);}if(_0x24a12e['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x5ba1db=String(RegExp['$1']),_0x335fb9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x5ba1db);VisuMZ[_0x3b72c(0x2d3)][_0x3b72c(0x347)][_0x2d0f50['id']]=new Function('skill',_0x335fb9);}},VisuMZ['SkillsStatesCore'][_0x558d77(0x305)]=function(_0x17046e){const _0x543368=_0x558d77;_0x17046e[_0x543368(0x103)]=[_0x543368(0x230),'ANY'];const _0x4c7718=_0x17046e[_0x543368(0x20b)],_0x489d6c=_0x4c7718[_0x543368(0x379)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x489d6c)for(const _0x18e6af of _0x489d6c){_0x18e6af[_0x543368(0x379)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x489247=String(RegExp['$1'])['toUpperCase']()[_0x543368(0x2d2)]()[_0x543368(0x3dc)](',');for(const _0x13357e of _0x489247){if('WURnu'===_0x543368(0x227))return _0x3481b1(_0xaf70bd['$1']);else _0x17046e[_0x543368(0x103)][_0x543368(0x287)](_0x13357e[_0x543368(0x2d2)]());}}if(_0x4c7718[_0x543368(0x379)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x543368(0x2df)!=='VlIIK'){const _0x3075f1=RegExp['$1'][_0x543368(0x3dc)](/[\r\n]+/);for(const _0x4ae6db of _0x3075f1){if('NKsTq'===_0x543368(0x1e9))return _0x46b15b[_0x543368(0x2d3)][_0x543368(0x207)][_0x543368(0x1a3)](this);else _0x17046e[_0x543368(0x103)]['push'](_0x4ae6db[_0x543368(0x31d)]()['trim']());}}else{if(this[_0x543368(0x166)]||this['_tempBattler'])return;const _0x2b3375=_0xc28886['SkillsStatesCore'][_0x543368(0x372)];if(_0x2b3375[_0x466a5e])_0x2b3375[_0x4e7e5b][_0x543368(0x1a3)](this,_0x5500df);}}_0x4c7718[_0x543368(0x379)](/<POSITIVE STATE>/i)&&_0x17046e[_0x543368(0x103)]['push'](_0x543368(0x3c0)),_0x4c7718[_0x543368(0x379)](/<NEGATIVE STATE>/i)&&_0x17046e[_0x543368(0x103)][_0x543368(0x287)](_0x543368(0x2f4));},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x2c4)]={},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x137)]=function(_0x3e5d73){const _0x365460=_0x558d77,_0x330050=_0x3e5d73['note'];if(_0x330050[_0x365460(0x379)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x492a31=String(RegExp['$1']),_0x58c340='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x365460(0x176)](_0x492a31);VisuMZ[_0x365460(0x2d3)][_0x365460(0x2c4)][_0x3e5d73['id']]=new Function('state',_0x58c340);}},VisuMZ[_0x558d77(0x2d3)]['stateHpSlipDamageJS']={},VisuMZ[_0x558d77(0x2d3)]['stateHpSlipHealJS']={},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x339)]={},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x1f5)]={},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x183)]={},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x1de)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS']=function(_0x4a24dc){const _0x748b3e=_0x558d77,_0x1eebba=_0x4a24dc[_0x748b3e(0x20b)],_0x3f9378=_0x748b3e(0x389);if(_0x1eebba['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if('rgyDl'===_0x748b3e(0x1a4))this['_costSettings']=_0x56f034[0x0];else{const _0x343d1e=String(RegExp['$1']),_0x46fd73=_0x3f9378['format'](_0x343d1e,_0x748b3e(0x2a2),-0x1,_0x748b3e(0x366));VisuMZ['SkillsStatesCore'][_0x748b3e(0x3f6)][_0x4a24dc['id']]=new Function(_0x748b3e(0x25f),_0x46fd73);}}else{if(_0x1eebba[_0x748b3e(0x379)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x24d8a8=String(RegExp['$1']),_0x3f1949=_0x3f9378[_0x748b3e(0x176)](_0x24d8a8,'heal',0x1,_0x748b3e(0x366));VisuMZ['SkillsStatesCore']['stateHpSlipHealJS'][_0x4a24dc['id']]=new Function(_0x748b3e(0x25f),_0x3f1949);}}if(_0x1eebba[_0x748b3e(0x379)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x212086=String(RegExp['$1']),_0x5a1e19=_0x3f9378[_0x748b3e(0x176)](_0x212086,'damage',-0x1,_0x748b3e(0x151));VisuMZ['SkillsStatesCore'][_0x748b3e(0x339)][_0x4a24dc['id']]=new Function(_0x748b3e(0x25f),_0x5a1e19);}else{if(_0x1eebba['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x748b3e(0x14d)!=='yUqvc'){const _0x130393=String(RegExp['$1']),_0x274d62=_0x3f9378[_0x748b3e(0x176)](_0x130393,_0x748b3e(0x33c),0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0x748b3e(0x1f5)][_0x4a24dc['id']]=new Function(_0x748b3e(0x25f),_0x274d62);}else return this[_0x748b3e(0x132)][_0x748b3e(0x3ae)]['call'](this[_0x748b3e(0x154)]);}}if(_0x1eebba[_0x748b3e(0x379)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x748b3e(0x19a)===_0x748b3e(0x121))return this[_0x748b3e(0x21c)]()[_0x748b3e(0x321)](_0x5bdaae=>this[_0x748b3e(0x20e)](_0x5bdaae));else{const _0x271853=String(RegExp['$1']),_0x13d0b6=_0x3f9378[_0x748b3e(0x176)](_0x271853,'damage',-0x1,'slipTp');VisuMZ['SkillsStatesCore'][_0x748b3e(0x183)][_0x4a24dc['id']]=new Function(_0x748b3e(0x25f),_0x13d0b6);}}else{if(_0x1eebba[_0x748b3e(0x379)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x748b3e(0x1e0)===_0x748b3e(0x299)){if(!_0x13a2be)return _0x748b3e(0x2ca);if(_0xa9c2d2[_0x748b3e(0x3d9)]())return _0x748b3e(0x3a6)['format'](_0x40a6ab[_0x748b3e(0x2bf)]());else{const _0x480045=_0x748b3e(0x15c)[_0x748b3e(0x176)](_0x3f8904[_0x748b3e(0x229)]()),_0x46cef5=_0x748b3e(0x19f)[_0x748b3e(0x176)](_0x3b018b[_0x748b3e(0x217)]()),_0x23e099=_0x748b3e(0x24e)[_0x748b3e(0x176)](_0x5467a4[_0x748b3e(0x392)]());return _0x748b3e(0x39b)[_0x748b3e(0x176)](_0x480045,_0x46cef5,_0x23e099);}return'user';}else{const _0x5f0f0c=String(RegExp['$1']),_0x1b0b22=_0x3f9378[_0x748b3e(0x176)](_0x5f0f0c,_0x748b3e(0x33c),0x1,'slipTp');VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'][_0x4a24dc['id']]=new Function(_0x748b3e(0x25f),_0x1b0b22);}}}},VisuMZ['SkillsStatesCore'][_0x558d77(0x372)]={},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x40d)]={},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x3b4)]={},VisuMZ[_0x558d77(0x2d3)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x20d5fa){const _0x4ac750=_0x558d77,_0x444cf0=_0x20d5fa[_0x4ac750(0x20b)],_0x2bea4a='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x444cf0[_0x4ac750(0x379)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x47ec6b=String(RegExp['$1']),_0x3e6bf4=_0x2bea4a[_0x4ac750(0x176)](_0x47ec6b);VisuMZ[_0x4ac750(0x2d3)]['stateAddJS'][_0x20d5fa['id']]=new Function('stateId',_0x3e6bf4);}if(_0x444cf0[_0x4ac750(0x379)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0xcccd29=String(RegExp['$1']),_0x179d96=_0x2bea4a['format'](_0xcccd29);VisuMZ[_0x4ac750(0x2d3)][_0x4ac750(0x40d)][_0x20d5fa['id']]=new Function(_0x4ac750(0x25f),_0x179d96);}if(_0x444cf0[_0x4ac750(0x379)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if(_0x4ac750(0x3b7)===_0x4ac750(0x2be))return this[_0x4ac750(0x154)]&&this[_0x4ac750(0x132)]?this['currentValueSkillsStatesCore']():_0x46d330[_0x4ac750(0x2d3)][_0x4ac750(0x1cf)][_0x4ac750(0x1a3)](this);else{const _0x145a54=String(RegExp['$1']),_0x299f0e=_0x2bea4a[_0x4ac750(0x176)](_0x145a54);VisuMZ[_0x4ac750(0x2d3)]['stateExpireJS'][_0x20d5fa['id']]=new Function('stateId',_0x299f0e);}}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x2d9)]=function(){const _0xe2cebf=_0x558d77;if(!VisuMZ[_0xe2cebf(0x2d3)][_0xe2cebf(0x343)][_0xe2cebf(0x396)]['ActionEndUpdate'])return;for(const _0x329986 of $dataStates){if(!_0x329986)continue;_0x329986[_0xe2cebf(0x281)]===0x4&&_0x329986[_0xe2cebf(0x108)]===0x1&&('tdmDd'==='tdmDd'?_0x329986['autoRemovalTiming']=0x2:this[_0xe2cebf(0x23d)](_0x7447a4[_0xe2cebf(0x2d0)]()));}},DataManager['getClassIdWithName']=function(_0x4a21d2){const _0x4c437f=_0x558d77;_0x4a21d2=_0x4a21d2['toUpperCase']()[_0x4c437f(0x2d2)](),this[_0x4c437f(0x165)]=this['_classIDs']||{};if(this[_0x4c437f(0x165)][_0x4a21d2])return this['_classIDs'][_0x4a21d2];for(const _0x1a3622 of $dataClasses){if(!_0x1a3622)continue;let _0x60c5d0=_0x1a3622[_0x4c437f(0x263)];_0x60c5d0=_0x60c5d0[_0x4c437f(0x417)](/\x1I\[(\d+)\]/gi,''),_0x60c5d0=_0x60c5d0[_0x4c437f(0x417)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x60c5d0[_0x4c437f(0x31d)]()['trim']()]=_0x1a3622['id'];}return this[_0x4c437f(0x165)][_0x4a21d2]||0x0;},DataManager['getSkillTypes']=function(_0x8f7071){const _0x21e89b=_0x558d77;this[_0x21e89b(0x1b3)]=this[_0x21e89b(0x1b3)]||{};if(this[_0x21e89b(0x1b3)][_0x8f7071['id']])return this[_0x21e89b(0x1b3)][_0x8f7071['id']];this[_0x21e89b(0x1b3)][_0x8f7071['id']]=[_0x8f7071[_0x21e89b(0x27b)]];if(_0x8f7071[_0x21e89b(0x20b)][_0x21e89b(0x379)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x21e89b(0x3d1)!=='TpfGz'){const _0x59f725=JSON[_0x21e89b(0x10b)]('['+RegExp['$1'][_0x21e89b(0x379)](/\d+/g)+']');this[_0x21e89b(0x1b3)][_0x8f7071['id']]=this[_0x21e89b(0x1b3)][_0x8f7071['id']][_0x21e89b(0x1d6)](_0x59f725);}else{const _0x5608d2=_0x1b174e['parse']('['+_0x34d796['$1'][_0x21e89b(0x379)](/\d+/g)+']');for(const _0x4af0a8 of _0x5608d2){if(!_0x2d2804[_0x21e89b(0x18d)](_0x4af0a8))return![];}return!![];}}else{if(_0x8f7071[_0x21e89b(0x20b)][_0x21e89b(0x379)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x39e7ac=RegExp['$1'][_0x21e89b(0x3dc)](',');for(const _0x311c64 of _0x39e7ac){const _0x33d569=DataManager['getStypeIdWithName'](_0x311c64);if(_0x33d569)this[_0x21e89b(0x1b3)][_0x8f7071['id']][_0x21e89b(0x287)](_0x33d569);}}}return this['_stypeIDs'][_0x8f7071['id']];},DataManager[_0x558d77(0x222)]=function(_0x5315f0){const _0xb8277=_0x558d77;_0x5315f0=_0x5315f0[_0xb8277(0x31d)]()[_0xb8277(0x2d2)](),this[_0xb8277(0x1b3)]=this['_stypeIDs']||{};if(this[_0xb8277(0x1b3)][_0x5315f0])return this[_0xb8277(0x1b3)][_0x5315f0];for(let _0x2a3f48=0x1;_0x2a3f48<0x64;_0x2a3f48++){if(!$dataSystem[_0xb8277(0x34b)][_0x2a3f48])continue;let _0x2e3763=$dataSystem['skillTypes'][_0x2a3f48][_0xb8277(0x31d)]()[_0xb8277(0x2d2)]();_0x2e3763=_0x2e3763['replace'](/\x1I\[(\d+)\]/gi,''),_0x2e3763=_0x2e3763['replace'](/\\I\[(\d+)\]/gi,''),this[_0xb8277(0x1b3)][_0x2e3763]=_0x2a3f48;}return this[_0xb8277(0x1b3)][_0x5315f0]||0x0;},DataManager[_0x558d77(0x286)]=function(_0x5ed97e){const _0x31b3ad=_0x558d77;_0x5ed97e=_0x5ed97e[_0x31b3ad(0x31d)]()[_0x31b3ad(0x2d2)](),this['_skillIDs']=this[_0x31b3ad(0x288)]||{};if(this[_0x31b3ad(0x288)][_0x5ed97e])return this[_0x31b3ad(0x288)][_0x5ed97e];for(const _0x409357 of $dataSkills){if(_0x31b3ad(0x262)!==_0x31b3ad(0x40f)){if(!_0x409357)continue;this[_0x31b3ad(0x288)][_0x409357[_0x31b3ad(0x263)]['toUpperCase']()[_0x31b3ad(0x2d2)]()]=_0x409357['id'];}else{_0x2b8beb[_0x31b3ad(0x379)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x20e356=_0x46f753[_0x31b3ad(0x1cd)](_0x27cffa(_0x388905['$1'])[_0x31b3ad(0x31d)]()),_0x584a3b=_0x2a990c(_0x4618fc['$2']);_0x20e356>=0x0&&(_0x5396ce[_0x31b3ad(0x237)](_0x20e356,_0x584a3b),this['makeSuccess'](_0xdded8));}}return this[_0x31b3ad(0x288)][_0x5ed97e]||0x0;},DataManager['getStateIdWithName']=function(_0x3decb5){const _0x370cb6=_0x558d77;_0x3decb5=_0x3decb5['toUpperCase']()[_0x370cb6(0x2d2)](),this[_0x370cb6(0x253)]=this['_stateIDs']||{};if(this[_0x370cb6(0x253)][_0x3decb5])return this['_stateIDs'][_0x3decb5];for(const _0x56937e of $dataStates){if(!_0x56937e)continue;this[_0x370cb6(0x253)][_0x56937e[_0x370cb6(0x263)][_0x370cb6(0x31d)]()[_0x370cb6(0x2d2)]()]=_0x56937e['id'];}return this[_0x370cb6(0x253)][_0x3decb5]||0x0;},DataManager[_0x558d77(0x1dc)]=function(_0x5a8170){const _0x4fee07=_0x558d77;this[_0x4fee07(0x256)]=this[_0x4fee07(0x256)]||{};if(this[_0x4fee07(0x256)][_0x5a8170])return this[_0x4fee07(0x256)][_0x5a8170];if($dataStates[_0x5a8170]['note'][_0x4fee07(0x379)](/<MAX TURNS:[ ](\d+)>/i)){if(_0x4fee07(0x344)!==_0x4fee07(0x344)){if(!_0x5f4041[_0x4fee07(0x2d3)]['Settings'][_0x4fee07(0x1e8)][_0x4fee07(0x319)])return;const _0x5d740a=_0x5a65c6[_0x4fee07(0x3ed)](_0x3fea34);if(_0x5d740a===0x0)return;const _0x2514bc=_0x21ae85[_0x4fee07(0x1f1)](_0x3d7c56),_0x441956=_0x3c4dd6[_0x4fee07(0x2fe)],_0xe8bc58=_0x5d740a>0x0?_0x530d72['buffColor']():_0x502f6c[_0x4fee07(0x3d0)]();this['changeTextColor'](_0xe8bc58),this[_0x4fee07(0x291)](_0x4fee07(0x134)),this[_0x4fee07(0x3cc)]['fontBold']=!![],this[_0x4fee07(0x3cc)][_0x4fee07(0x14c)]=_0x1cab5e['SkillsStatesCore'][_0x4fee07(0x343)][_0x4fee07(0x1e8)][_0x4fee07(0x1f2)],_0x1fb74a+=_0x398c12[_0x4fee07(0x2d3)][_0x4fee07(0x343)][_0x4fee07(0x1e8)][_0x4fee07(0x31f)],_0x4825d1+=_0x4fe77e[_0x4fee07(0x2d3)][_0x4fee07(0x343)][_0x4fee07(0x1e8)]['TurnOffsetY'],this[_0x4fee07(0x1bf)](_0x2514bc,_0x511488,_0x20435c,_0x441956,'right'),this[_0x4fee07(0x3cc)][_0x4fee07(0x232)]=![],this['resetFontSettings']();}else this['_stateMaxTurns'][_0x5a8170]=Number(RegExp['$1']);}else{if(_0x4fee07(0x143)!==_0x4fee07(0x386))this['_stateMaxTurns'][_0x5a8170]=VisuMZ['SkillsStatesCore'][_0x4fee07(0x343)][_0x4fee07(0x396)][_0x4fee07(0x290)];else{const _0x1801c9=_0x549256(_0x44b0f4['$1']);if(_0x3a423b[_0x4fee07(0x2b2)](_0x1801c9))return!![];}}return this[_0x4fee07(0x256)][_0x5a8170];},ColorManager[_0x558d77(0x29a)]=function(_0x4fb7ae,_0x23c0a4){const _0x3ef1c4=_0x558d77;return _0x23c0a4=String(_0x23c0a4),this['_colorCache']=this[_0x3ef1c4(0x3fb)]||{},_0x23c0a4['match'](/#(.*)/i)?this['_colorCache'][_0x4fb7ae]=_0x3ef1c4(0x218)[_0x3ef1c4(0x176)](String(RegExp['$1'])):_0x3ef1c4(0x242)!==_0x3ef1c4(0x242)?(_0x22078b[_0x3ef1c4(0x2d3)][_0x3ef1c4(0x107)][_0x3ef1c4(0x1a3)](this),this[_0x3ef1c4(0x285)]()):this[_0x3ef1c4(0x3fb)][_0x4fb7ae]=this['textColor'](Number(_0x23c0a4)),this[_0x3ef1c4(0x3fb)][_0x4fb7ae];},ColorManager[_0x558d77(0x3a4)]=function(_0x4542c1){const _0x3cb320=_0x558d77;return _0x4542c1=String(_0x4542c1),_0x4542c1[_0x3cb320(0x379)](/#(.*)/i)?_0x3cb320(0x218)[_0x3cb320(0x176)](String(RegExp['$1'])):this['textColor'](Number(_0x4542c1));},ColorManager['stateColor']=function(_0x79253d){const _0x1cd3c8=_0x558d77;if(typeof _0x79253d==='number')_0x79253d=$dataStates[_0x79253d];const _0x3514e6=_0x1cd3c8(0x129)[_0x1cd3c8(0x176)](_0x79253d['id']);this[_0x1cd3c8(0x3fb)]=this[_0x1cd3c8(0x3fb)]||{};if(this[_0x1cd3c8(0x3fb)][_0x3514e6])return this['_colorCache'][_0x3514e6];const _0x24674e=this['retrieveStateColor'](_0x79253d);return this['getColorDataFromPluginParameters'](_0x3514e6,_0x24674e);},ColorManager['retrieveStateColor']=function(_0x5b7859){const _0x20e4d2=_0x558d77,_0x5b7271=_0x5b7859[_0x20e4d2(0x20b)];if(_0x5b7271[_0x20e4d2(0x379)](/<TURN COLOR:[ ](.*)>/i)){if('CBMDp'==='PyDit'){const _0x1e1489=this[_0x20e4d2(0x39a)]();this[_0x20e4d2(0x152)]=new _0x541754(_0x1e1489),this[_0x20e4d2(0x384)](this[_0x20e4d2(0x152)]),this['_itemWindow'][_0x20e4d2(0x2c6)](this[_0x20e4d2(0x152)]);const _0x2b5658=_0x2b82d1[_0x20e4d2(0x2d3)][_0x20e4d2(0x343)]['Skills'][_0x20e4d2(0x36b)];this['_shopStatusWindow'][_0x20e4d2(0x3a2)](_0x2b5658||0x0);}else return String(RegExp['$1']);}else{if(_0x5b7271[_0x20e4d2(0x379)](/<POSITIVE STATE>/i)){if(_0x20e4d2(0x297)===_0x20e4d2(0x20c)){const _0x124bdb=_0x510e17[_0x20e4d2(0x2d3)][_0x20e4d2(0x343)]['Buffs']['MaxTurns'];this[_0x20e4d2(0x338)][_0x191825]=_0x5d2658[_0x20e4d2(0x307)](0x0,_0x124bdb);}else return VisuMZ[_0x20e4d2(0x2d3)][_0x20e4d2(0x343)][_0x20e4d2(0x396)]['ColorPositive'];}else{if(_0x5b7271['match'](/<NEGATIVE STATE>/i)){if(_0x20e4d2(0x3fe)===_0x20e4d2(0x1c7)){if(!_0x378c6d[_0x20e4d2(0x2d3)][_0x20e4d2(0x343)][_0x20e4d2(0x396)]['ShowData'])return;const _0x4b9681=_0x2d08c7[_0x20e4d2(0x2fe)],_0x1ce66f=_0x189287[_0x20e4d2(0x206)]/0x2,_0x218022=_0x388bdb[_0x20e4d2(0x26e)]();this[_0x20e4d2(0x260)](_0x218022),this[_0x20e4d2(0x291)](_0x20e4d2(0x134)),this[_0x20e4d2(0x3cc)][_0x20e4d2(0x232)]=!![],this[_0x20e4d2(0x3cc)][_0x20e4d2(0x14c)]=_0x490b0f[_0x20e4d2(0x2d3)]['Settings'][_0x20e4d2(0x396)][_0x20e4d2(0x1f7)],_0x2aff2d+=_0x567bd7[_0x20e4d2(0x2d3)][_0x20e4d2(0x343)]['States'][_0x20e4d2(0x249)],_0x2e6408+=_0x215f2a[_0x20e4d2(0x2d3)][_0x20e4d2(0x343)]['States'][_0x20e4d2(0x1b7)];const _0x416cf5=_0x54f230(_0x5ade0d[_0x20e4d2(0x2de)](_0x2c9b26['id']));this[_0x20e4d2(0x1bf)](_0x416cf5,_0x6fe347,_0x43fba6,_0x4b9681,_0x20e4d2(0x1e2)),this[_0x20e4d2(0x3cc)][_0x20e4d2(0x232)]=![],this[_0x20e4d2(0x131)]();}else return VisuMZ[_0x20e4d2(0x2d3)][_0x20e4d2(0x343)][_0x20e4d2(0x396)]['ColorNegative'];}else return VisuMZ['SkillsStatesCore'][_0x20e4d2(0x343)][_0x20e4d2(0x396)][_0x20e4d2(0x370)];}}},ColorManager['buffColor']=function(){const _0x1cb25b=_0x558d77,_0x84e1be='_stored_buffColor';this[_0x1cb25b(0x3fb)]=this['_colorCache']||{};if(this[_0x1cb25b(0x3fb)][_0x84e1be])return this[_0x1cb25b(0x3fb)][_0x84e1be];const _0x44517f=VisuMZ[_0x1cb25b(0x2d3)]['Settings'][_0x1cb25b(0x1e8)]['ColorBuff'];return this[_0x1cb25b(0x29a)](_0x84e1be,_0x44517f);},ColorManager[_0x558d77(0x3d0)]=function(){const _0x282e8f=_0x558d77,_0x5d9e26=_0x282e8f(0x33f);this[_0x282e8f(0x3fb)]=this[_0x282e8f(0x3fb)]||{};if(this[_0x282e8f(0x3fb)][_0x5d9e26])return this['_colorCache'][_0x5d9e26];const _0x119d67=VisuMZ[_0x282e8f(0x2d3)][_0x282e8f(0x343)]['Buffs']['ColorDebuff'];return this[_0x282e8f(0x29a)](_0x5d9e26,_0x119d67);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x118)]=BattleManager['endAction'],BattleManager[_0x558d77(0x1d8)]=function(){const _0x1346a9=_0x558d77;this[_0x1346a9(0x2e9)](),VisuMZ[_0x1346a9(0x2d3)]['BattleManager_endAction'][_0x1346a9(0x1a3)](this);},BattleManager[_0x558d77(0x2e9)]=function(){const _0x11dbb0=_0x558d77,_0x487a7f=VisuMZ['SkillsStatesCore'][_0x11dbb0(0x343)][_0x11dbb0(0x396)];if(!_0x487a7f)return;if(_0x487a7f[_0x11dbb0(0x33d)]===![])return;if(!this[_0x11dbb0(0x20f)])return;this[_0x11dbb0(0x20f)]['updateStatesActionEnd']();},Game_Battler['prototype'][_0x558d77(0x2e9)]=function(){const _0x27fab=_0x558d77;if(BattleManager[_0x27fab(0x39d)]!==_0x27fab(0x106))return;if(this[_0x27fab(0x1f3)]===Graphics[_0x27fab(0x2a0)])return;this[_0x27fab(0x1f3)]=Graphics[_0x27fab(0x2a0)];for(const _0x34da5b of this[_0x27fab(0x3b3)]){const _0x221f99=$dataStates[_0x34da5b];if(!_0x221f99)continue;if(_0x221f99[_0x27fab(0x108)]!==0x1)continue;this['_stateTurns'][_0x34da5b]>0x0&&this[_0x27fab(0x334)][_0x34da5b]--;}this[_0x27fab(0x313)](0x1);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x349)]=function(){const _0x2a9dd0=_0x558d77,_0x50cef4=VisuMZ[_0x2a9dd0(0x2d3)][_0x2a9dd0(0x343)][_0x2a9dd0(0x396)];for(const _0x1e0a2d of this[_0x2a9dd0(0x3b3)]){if(_0x2a9dd0(0x353)!==_0x2a9dd0(0x353))for(const _0x1ec871 of _0x225a73){_0x1ec871[_0x2a9dd0(0x379)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x37499a=_0x2e5b8a[_0x2a9dd0(0x1cd)](_0x37561d(_0x5e9b91['$1'])[_0x2a9dd0(0x31d)]()),_0x27ed49=_0x19b443(_0x21432b['$2']);_0x37499a>=0x0&&(_0x2ef47b[_0x2a9dd0(0x247)](_0x37499a,_0x27ed49),this['makeSuccess'](_0x59c960));}else{const _0x26e83d=$dataStates[_0x1e0a2d];if(_0x50cef4&&_0x50cef4['ActionEndUpdate']!==![]){if(_0x2a9dd0(0x2c8)!==_0x2a9dd0(0x2c8)){if(_0x59593c[_0x2a9dd0(0x351)]&&_0x5581fc['uiInputPosition']!==_0x5e573d)return _0x4e83e4[_0x2a9dd0(0x1dd)];else return this[_0x2a9dd0(0x278)]()?this['updatedLayoutStyle']()[_0x2a9dd0(0x379)](/RIGHT/i):_0x576dfa[_0x2a9dd0(0x10c)][_0x2a9dd0(0x1c1)][_0x2a9dd0(0x1a3)](this);}else{if(_0x26e83d&&_0x26e83d[_0x2a9dd0(0x108)]===0x1)continue;}}this[_0x2a9dd0(0x334)][_0x1e0a2d]>0x0&&this[_0x2a9dd0(0x334)][_0x1e0a2d]--;}}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x17d)]=Game_Action[_0x558d77(0x10c)][_0x558d77(0x37a)],Game_Action[_0x558d77(0x10c)]['applyItemUserEffect']=function(_0x51af8a){const _0x4c00d7=_0x558d77;VisuMZ['SkillsStatesCore'][_0x4c00d7(0x17d)][_0x4c00d7(0x1a3)](this,_0x51af8a),this[_0x4c00d7(0x10f)](_0x51af8a);},Game_Action['prototype']['applySkillsStatesCoreEffects']=function(_0x4bc676){const _0x2a535d=_0x558d77;this[_0x2a535d(0x215)](_0x4bc676),this['applyStateTurnManipulationEffects'](_0x4bc676),this[_0x2a535d(0x400)](_0x4bc676),this[_0x2a535d(0x1a7)](_0x4bc676);},VisuMZ['SkillsStatesCore'][_0x558d77(0x125)]=Game_Action[_0x558d77(0x10c)][_0x558d77(0x26f)],Game_Action['prototype'][_0x558d77(0x26f)]=function(_0x9deb2c){const _0x509803=_0x558d77;if(this['testSkillStatesCoreNotetags'](_0x9deb2c)){if(_0x509803(0x2fc)==='kUDet'){if(!_0x2d9404[_0x509803(0x18d)](_0x55901d))return!![];}else return!![];}return VisuMZ[_0x509803(0x2d3)]['Game_Action_testApply']['call'](this,_0x9deb2c);},Game_Action[_0x558d77(0x10c)][_0x558d77(0x35c)]=function(_0x119106){const _0x1bb937=_0x558d77,_0x3ab9f5=this[_0x1bb937(0x32b)]()[_0x1bb937(0x20b)];if(_0x3ab9f5[_0x1bb937(0x379)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x1bb937(0x235)===_0x1bb937(0x235)){const _0x1ff920=String(RegExp['$1']);if(_0x119106[_0x1bb937(0x2b2)](_0x1ff920))return!![];}else{if(!_0x121f7a)return;_0x33af8a['prototype'][_0x1bb937(0x135)][_0x1bb937(0x1a3)](this,_0x364d3b,_0x379169,_0x25e79b,_0x460410);}}if(_0x3ab9f5[_0x1bb937(0x379)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x467f71=Number(RegExp['$1']);if(_0x119106[_0x1bb937(0x358)](_0x467f71))return!![];}else{if(_0x3ab9f5[_0x1bb937(0x379)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x11bb08=DataManager[_0x1bb937(0x226)](RegExp['$1']);if(_0x119106[_0x1bb937(0x358)](_0x11bb08))return!![];}}return![];},Game_Action[_0x558d77(0x10c)][_0x558d77(0x215)]=function(_0x4089d4){const _0xc196a8=_0x558d77;if(_0x4089d4[_0xc196a8(0x180)]()['length']<=0x0)return;const _0x20b3d0=this[_0xc196a8(0x32b)]()['note'];if(_0x20b3d0['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){if(_0xc196a8(0x105)===_0xc196a8(0x3a8)){const _0x3f43f8=this[_0xc196a8(0x323)]!==_0x2a16ed;_0x1ae6d9[_0xc196a8(0x2d3)][_0xc196a8(0x1c8)][_0xc196a8(0x1a3)](this,_0x210783),_0x3f43f8&&(this[_0xc196a8(0x193)]&&this[_0xc196a8(0x193)][_0xc196a8(0x391)]===_0x37424b&&this['_statusWindow'][_0xc196a8(0x274)](this[_0xc196a8(0x1ab)](0x0)));}else{const _0x30a30f=String(RegExp['$1']);_0x4089d4[_0xc196a8(0x3bf)](_0x30a30f);}}const _0x4d58a6=_0x20b3d0[_0xc196a8(0x379)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x4d58a6)for(const _0x275427 of _0x4d58a6){if('gPwBk'!==_0xc196a8(0x356)){if(!_0x413acc[_0xc196a8(0x24f)](_0x194b1f))return![];}else{_0x275427[_0xc196a8(0x379)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x278c8a=String(RegExp['$1']),_0x2ba7df=Number(RegExp['$2']);_0x4089d4[_0xc196a8(0x357)](_0x278c8a,_0x2ba7df);}}},Game_Action['prototype']['applyStateTurnManipulationEffects']=function(_0x49a2de){const _0x513f4a=_0x558d77,_0xa878f3=this[_0x513f4a(0x32b)]()[_0x513f4a(0x20b)],_0x302a52=_0xa878f3[_0x513f4a(0x379)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x302a52)for(const _0x24f3d0 of _0x302a52){if(_0x513f4a(0x3d8)!=='ylrEk'){const _0x59bac9=_0x513f4a(0x15c)['format'](_0x151c36[_0x513f4a(0x229)]()),_0x1aa1c8='<member-%1>'['format'](_0xcec4e1[_0x513f4a(0x217)]()),_0x3d97dc=_0x513f4a(0x24e)['format'](_0xcc64ec[_0x513f4a(0x392)]());return _0x513f4a(0x39b)[_0x513f4a(0x176)](_0x59bac9,_0x1aa1c8,_0x3d97dc);}else{let _0x12cce3=0x0,_0x3c84c8=0x0;if(_0x24f3d0[_0x513f4a(0x379)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x12cce3=Number(RegExp['$1']),_0x3c84c8=Number(RegExp['$2']);else _0x24f3d0[_0x513f4a(0x379)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x12cce3=DataManager[_0x513f4a(0x226)](RegExp['$1']),_0x3c84c8=Number(RegExp['$2']));_0x49a2de[_0x513f4a(0x259)](_0x12cce3,_0x3c84c8),this[_0x513f4a(0x30d)](_0x49a2de);}}const _0x417087=_0xa878f3['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x417087){if(_0x513f4a(0x29f)!==_0x513f4a(0x29f))return![];else for(const _0x46a9fd of _0x417087){let _0x5eee21=0x0,_0x17471d=0x0;if(_0x46a9fd['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5eee21=Number(RegExp['$1']),_0x17471d=Number(RegExp['$2']);else _0x46a9fd[_0x513f4a(0x379)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x5eee21=DataManager[_0x513f4a(0x226)](RegExp['$1']),_0x17471d=Number(RegExp['$2']));_0x49a2de[_0x513f4a(0x182)](_0x5eee21,_0x17471d),this[_0x513f4a(0x30d)](_0x49a2de);}}},Game_Action[_0x558d77(0x10c)]['applyBuffTurnManipulationEffects']=function(_0x30d397){const _0x272309=_0x558d77,_0x13ae49=[_0x272309(0x2e0),_0x272309(0x406),_0x272309(0x2c2),_0x272309(0x315),_0x272309(0x22b),'MDF',_0x272309(0x2cf),_0x272309(0x275)],_0x4f5d6d=this[_0x272309(0x32b)]()[_0x272309(0x20b)],_0x129244=_0x4f5d6d['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x129244){if(_0x272309(0x114)===_0x272309(0x2a5))_0xe731fd[_0x272309(0x10c)]['isRightInputMode']['call'](this);else for(const _0x313ddc of _0x129244){_0x313ddc[_0x272309(0x379)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x21c9bb=_0x13ae49[_0x272309(0x1cd)](String(RegExp['$1'])[_0x272309(0x31d)]()),_0x44f625=Number(RegExp['$2']);_0x21c9bb>=0x0&&(_0x30d397[_0x272309(0x247)](_0x21c9bb,_0x44f625),this[_0x272309(0x30d)](_0x30d397));}}const _0x459851=_0x4f5d6d['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x459851)for(const _0x2d58fa of _0x129244){if(_0x272309(0x155)!==_0x272309(0x155))_0x3b4296=_0x623ba7(_0x368a33['$1']),_0x10ec06=_0x2610c3(_0x593329['$2']);else{_0x2d58fa[_0x272309(0x379)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x4f2f8c=_0x13ae49['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x6207c6=Number(RegExp['$2']);_0x4f2f8c>=0x0&&(_0x30d397[_0x272309(0x237)](_0x4f2f8c,_0x6207c6),this[_0x272309(0x30d)](_0x30d397));}}},Game_Action[_0x558d77(0x10c)][_0x558d77(0x1a7)]=function(_0x4f7521){const _0x3e3788=_0x558d77,_0x1874aa=['MAXHP','MAXMP',_0x3e3788(0x2c2),_0x3e3788(0x315),'MAT','MDF','AGI',_0x3e3788(0x275)],_0x101f26=this['item']()[_0x3e3788(0x20b)],_0x4916b6=_0x101f26[_0x3e3788(0x379)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x4916b6){if('ZWZlG'===_0x3e3788(0x36a))for(const _0x10ae96 of _0x4916b6){if(_0x3e3788(0x1bc)!==_0x3e3788(0x276)){_0x10ae96['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x238a6d=_0x1874aa[_0x3e3788(0x1cd)](String(RegExp['$1'])[_0x3e3788(0x31d)]()),_0x36d295=Number(RegExp['$2']);_0x238a6d>=0x0&&(_0x4f7521[_0x3e3788(0x328)](_0x238a6d,_0x36d295),this[_0x3e3788(0x30d)](_0x4f7521));}else return _0x49c81f['SkillsStatesCore'][_0x3e3788(0x343)][_0x3e3788(0x2c3)][_0x3e3788(0x408)];}else return 0x0;}const _0xbfb926=_0x101f26[_0x3e3788(0x379)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xbfb926)for(const _0x3f5551 of _0x4916b6){_0x3f5551[_0x3e3788(0x379)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2a73fe=_0x1874aa[_0x3e3788(0x1cd)](String(RegExp['$1'])[_0x3e3788(0x31d)]()),_0x243ab4=Number(RegExp['$2']);_0x2a73fe>=0x0&&(_0x4f7521[_0x3e3788(0x13e)](_0x2a73fe,_0x243ab4),this[_0x3e3788(0x30d)](_0x4f7521));}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x359)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1a6)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1a6)]=function(){const _0x36ed23=_0x558d77;this[_0x36ed23(0x2c1)]={},this[_0x36ed23(0x285)](),VisuMZ[_0x36ed23(0x2d3)][_0x36ed23(0x359)][_0x36ed23(0x1a3)](this);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x285)]=function(){const _0x4086bc=_0x558d77;this[_0x4086bc(0x2af)]='',this[_0x4086bc(0x2cb)]={},this['_stateDisplay']={},this[_0x4086bc(0x209)]={};},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3b9)]=function(_0x3fbe58){const _0x1a00b9=_0x558d77;return this[_0x1a00b9(0x2c1)]=this[_0x1a00b9(0x2c1)]||{},this['_cache'][_0x3fbe58]!==undefined;},VisuMZ[_0x558d77(0x2d3)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1d7)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1d7)]=function(){const _0x145ec8=_0x558d77;this[_0x145ec8(0x2c1)]={},VisuMZ[_0x145ec8(0x2d3)][_0x145ec8(0x27a)][_0x145ec8(0x1a3)](this);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x3ee)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x243)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x243)]=function(_0x38cacc){const _0x48b458=_0x558d77;let _0x52a197=this[_0x48b458(0x358)](_0x38cacc);VisuMZ[_0x48b458(0x2d3)][_0x48b458(0x3ee)][_0x48b458(0x1a3)](this,_0x38cacc);if(_0x52a197&&!this[_0x48b458(0x358)](_0x38cacc))this[_0x48b458(0x34c)](_0x38cacc);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x34c)]=function(_0x46cc4a){const _0x574305=_0x558d77;this['clearStateData'](_0x46cc4a),this[_0x574305(0x350)](_0x46cc4a),this[_0x574305(0x37f)](_0x46cc4a);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x26b)]=Game_BattlerBase['prototype']['resetStateCounts'],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x11c)]=function(_0x438801){const _0x190948=_0x558d77,_0x38ab78=$dataStates[_0x438801],_0x1c9641=this['stateTurns'](_0x438801),_0x1b1cb1=this[_0x190948(0x2fa)](_0x38ab78)['toLowerCase']()[_0x190948(0x2d2)]();switch(_0x1b1cb1){case _0x190948(0x239):if(_0x1c9641<=0x0)VisuMZ[_0x190948(0x2d3)][_0x190948(0x26b)][_0x190948(0x1a3)](this,_0x438801);break;case _0x190948(0x23e):VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x190948(0x1a3)](this,_0x438801);break;case _0x190948(0x3e6):VisuMZ[_0x190948(0x2d3)]['Game_BattlerBase_resetStateCounts'][_0x190948(0x1a3)](this,_0x438801),this['_stateTurns'][_0x438801]=Math[_0x190948(0x26a)](this[_0x190948(0x334)][_0x438801],_0x1c9641);break;case _0x190948(0x414):VisuMZ[_0x190948(0x2d3)][_0x190948(0x26b)][_0x190948(0x1a3)](this,_0x438801),this[_0x190948(0x334)][_0x438801]+=_0x1c9641;break;default:VisuMZ['SkillsStatesCore'][_0x190948(0x26b)][_0x190948(0x1a3)](this,_0x438801);break;}},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2fa)]=function(_0x35b3a6){const _0x1543b5=_0x558d77,_0x5787dc=_0x35b3a6[_0x1543b5(0x20b)];if(_0x5787dc['match'](/<REAPPLY RULES:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1543b5(0x27c)==='SECea')return VisuMZ[_0x1543b5(0x2d3)][_0x1543b5(0x343)][_0x1543b5(0x396)][_0x1543b5(0x371)];else{for(_0x42283e of _0x1139f7[_0x1543b5(0x2d3)]['Settings'][_0x1543b5(0x1b4)]){const _0x2409a9=_0x509ddb[_0x1543b5(0x1b9)]['call'](this,_0x4198e1);if(!_0x42ba14[_0x1543b5(0x329)][_0x1543b5(0x1a3)](this,_0x2e953a,_0x2409a9))return![];}return!![];}}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x1ff)]=Game_BattlerBase['prototype']['overwriteBuffTurns'],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3f1)]=function(_0xfc06dd,_0x51b072){const _0x163374=_0x558d77,_0x12b2ab=VisuMZ[_0x163374(0x2d3)][_0x163374(0x343)]['Buffs'][_0x163374(0x371)],_0x28c48c=this[_0x163374(0x1f1)](_0xfc06dd);switch(_0x12b2ab){case _0x163374(0x239):if(_0x28c48c<=0x0)this[_0x163374(0x338)][_0xfc06dd]=_0x51b072;break;case _0x163374(0x23e):this[_0x163374(0x338)][_0xfc06dd]=_0x51b072;break;case _0x163374(0x3e6):this[_0x163374(0x338)][_0xfc06dd]=Math[_0x163374(0x26a)](_0x28c48c,_0x51b072);break;case _0x163374(0x414):this[_0x163374(0x338)][_0xfc06dd]+=_0x51b072;break;default:VisuMZ[_0x163374(0x2d3)][_0x163374(0x1ff)][_0x163374(0x1a3)](this,_0xfc06dd,_0x51b072);break;}const _0x1f3a0c=VisuMZ[_0x163374(0x2d3)]['Settings'][_0x163374(0x1e8)]['MaxTurns'];this[_0x163374(0x338)][_0xfc06dd]=this[_0x163374(0x338)][_0xfc06dd][_0x163374(0x307)](0x0,_0x1f3a0c);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2e6)]=function(){const _0x548271=_0x558d77;if(this[_0x548271(0x2c1)][_0x548271(0x2aa)]!==undefined)return this[_0x548271(0x2c1)]['groupDefeat'];this[_0x548271(0x2c1)]['groupDefeat']=![];const _0x4d0113=this[_0x548271(0x180)]();for(const _0xc760ad of _0x4d0113){if(_0x548271(0x1c5)!==_0x548271(0x1c5))this[_0x548271(0x19d)]=!![],this[_0x548271(0x2c1)]['passiveStates']=[],this[_0x548271(0x146)](),this[_0x548271(0x23a)](),this[_0x548271(0x113)](),this['_checkingVisuMzPassiveStateObjects']=_0x502001;else{if(!_0xc760ad)continue;if(_0xc760ad[_0x548271(0x20b)][_0x548271(0x379)](/<GROUP DEFEAT>/i)){if('KMYWg'===_0x548271(0x342)){this[_0x548271(0x2c1)][_0x548271(0x2aa)]=!![];break;}else{const _0x590aef=_0x50fd0c[_0x548271(0x2d3)][_0x548271(0x343)][_0x548271(0x1e8)][_0x548271(0x290)];this[_0x548271(0x338)][_0x233e15]=_0x43f98d[_0x548271(0x307)](0x0,_0x590aef);}}}}return this[_0x548271(0x2c1)][_0x548271(0x2aa)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x558d77(0x10c)]['clearStates'],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1b5)]=function(){const _0x27a1c4=_0x558d77;if(this[_0x27a1c4(0x11f)]()!==''){if(_0x27a1c4(0x1ba)===_0x27a1c4(0x1d9)){let _0x210ebb=this[_0x27a1c4(0x32a)]();return _0x171049[_0x27a1c4(0x147)]&&this[_0x27a1c4(0x18a)]()&&(_0x210ebb=_0x20b10d[_0x27a1c4(0x2dc)](_0x210ebb)),_0x210ebb;}else this[_0x27a1c4(0x407)]();}else VisuMZ[_0x27a1c4(0x2d3)][_0x27a1c4(0x107)][_0x27a1c4(0x1a3)](this),this[_0x27a1c4(0x285)]();},Game_Actor['prototype']['clearStates']=function(){const _0x389b65=_0x558d77;this[_0x389b65(0x2f0)]=this[_0x389b65(0x2f0)]||{},Game_Battler[_0x389b65(0x10c)][_0x389b65(0x1b5)]['call'](this);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x407)]=function(){const _0xc635f4=_0x558d77,_0x3ca69d=this[_0xc635f4(0x180)]();for(const _0x2ca39e of _0x3ca69d){if(_0x2ca39e&&this[_0xc635f4(0x292)](_0x2ca39e))this['eraseState'](_0x2ca39e['id']);}this[_0xc635f4(0x2c1)]={};},Game_BattlerBase['prototype'][_0x558d77(0x292)]=function(_0x58d48d){const _0x2c6431=_0x558d77,_0x1dede2=this[_0x2c6431(0x11f)]();if(_0x1dede2!==''){if(_0x2c6431(0x326)===_0x2c6431(0x326)){const _0xb9b274=_0x58d48d[_0x2c6431(0x20b)];if(_0x1dede2===_0x2c6431(0x398)&&_0xb9b274[_0x2c6431(0x379)](/<NO DEATH CLEAR>/i))return![];if(_0x1dede2===_0x2c6431(0x190)&&_0xb9b274[_0x2c6431(0x379)](/<NO RECOVER ALL CLEAR>/i))return![];}else{if(typeof _0x22271b!==_0x2c6431(0x28d))_0x174972=_0x1a333a['id'];const _0x4973f7=this[_0x2c6431(0x17a)](_0x4d143f);_0x4973f7[_0xc4ceb2]=_0x2510ef;}}return this[_0x2c6431(0x358)](_0x58d48d['id']);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x11f)]=function(){const _0x39bf12=_0x558d77;return this[_0x39bf12(0x2af)];},Game_BattlerBase['prototype'][_0x558d77(0x3f2)]=function(_0x4768ab){const _0x5a2744=_0x558d77;this[_0x5a2744(0x2af)]=_0x4768ab;},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x348)]=function(){const _0x207c7d=_0x558d77;this[_0x207c7d(0x2af)]='';},VisuMZ['SkillsStatesCore'][_0x558d77(0x369)]=Game_BattlerBase['prototype'][_0x558d77(0x145)],Game_BattlerBase['prototype']['die']=function(){const _0x4d8361=_0x558d77;this['setStateRetainType'](_0x4d8361(0x398)),VisuMZ[_0x4d8361(0x2d3)][_0x4d8361(0x369)][_0x4d8361(0x1a3)](this),this[_0x4d8361(0x348)]();},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x157)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2db)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2db)]=function(){const _0x50019a=_0x558d77;this['setStateRetainType']('recover\x20all'),VisuMZ[_0x50019a(0x2d3)][_0x50019a(0x157)]['call'](this),this[_0x50019a(0x348)]();},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2bb)]=function(_0x2654ef){const _0x5976a0=_0x558d77;for(settings of VisuMZ[_0x5976a0(0x2d3)][_0x5976a0(0x343)][_0x5976a0(0x1b4)]){if(_0x5976a0(0x3d5)===_0x5976a0(0x1a2))_0x326225[_0x5976a0(0x287)](_0x202939(_0x1a6bbe));else{const _0x143e8a=settings[_0x5976a0(0x1b9)][_0x5976a0(0x1a3)](this,_0x2654ef);if(!settings[_0x5976a0(0x329)][_0x5976a0(0x1a3)](this,_0x2654ef,_0x143e8a))return![];}}return!![];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2ff)]=function(_0x33d2fa){const _0x397bc1=_0x558d77;for(settings of VisuMZ[_0x397bc1(0x2d3)][_0x397bc1(0x343)][_0x397bc1(0x1b4)]){const _0x15bf21=settings[_0x397bc1(0x1b9)][_0x397bc1(0x1a3)](this,_0x33d2fa);settings[_0x397bc1(0x16f)][_0x397bc1(0x1a3)](this,_0x33d2fa,_0x15bf21);}},VisuMZ[_0x558d77(0x2d3)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x558d77(0x10c)]['meetsSkillConditions'],Game_BattlerBase['prototype'][_0x558d77(0x3de)]=function(_0x2c064e){const _0x5ad7d1=_0x558d77;if(!_0x2c064e)return![];if(!VisuMZ[_0x5ad7d1(0x2d3)][_0x5ad7d1(0x294)]['call'](this,_0x2c064e))return![];if(!this[_0x5ad7d1(0x236)](_0x2c064e))return![];if(!this[_0x5ad7d1(0x3dd)](_0x2c064e))return![];if(!this[_0x5ad7d1(0x141)](_0x2c064e))return![];return!![];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x236)]=function(_0x1a6e9c){if(!this['checkSkillConditionsSwitchNotetags'](_0x1a6e9c))return![];return!![];},Game_BattlerBase[_0x558d77(0x10c)]['checkSkillConditionsSwitchNotetags']=function(_0x2f93b6){const _0x33b4b4=_0x558d77,_0x903740=_0x2f93b6[_0x33b4b4(0x20b)];if(_0x903740[_0x33b4b4(0x379)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5463f6=JSON[_0x33b4b4(0x10b)]('['+RegExp['$1'][_0x33b4b4(0x379)](/\d+/g)+']');for(const _0x2dd889 of _0x5463f6){if(_0x33b4b4(0x17c)!==_0x33b4b4(0x3ad)){if(!$gameSwitches[_0x33b4b4(0x18d)](_0x2dd889))return![];}else{_0x5e7e2c[_0x33b4b4(0x2d3)]['Game_BattlerBase_increaseBuff']['call'](this,_0x5a1376);if(!this[_0x33b4b4(0x1fc)](_0x30a3c8))this[_0x33b4b4(0x1ca)](_0x244ed9);}}return!![];}if(_0x903740[_0x33b4b4(0x379)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x33b4b4(0x2f6)!==_0x33b4b4(0x2f6)){const _0x1a04ac=_0x9fb54b[_0x33b4b4(0x2d3)][_0x33b4b4(0x343)][_0x33b4b4(0x375)]['Global'];this['_cache']['passiveStates']=this[_0x33b4b4(0x2c1)][_0x33b4b4(0x41b)][_0x33b4b4(0x1d6)](_0x1a04ac);}else{const _0x3cfff2=JSON[_0x33b4b4(0x10b)]('['+RegExp['$1'][_0x33b4b4(0x379)](/\d+/g)+']');for(const _0x54cad5 of _0x3cfff2){if(_0x33b4b4(0x22e)===_0x33b4b4(0x37b))return this[_0x33b4b4(0x278)]()?this[_0x33b4b4(0x2f8)]():_0x398e7c[_0x33b4b4(0x2d3)][_0x33b4b4(0x404)][_0x33b4b4(0x1a3)](this);else{if(!$gameSwitches[_0x33b4b4(0x18d)](_0x54cad5))return![];}}return!![];}}if(_0x903740[_0x33b4b4(0x379)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x33b4b4(0x41a)!==_0x33b4b4(0x1df)){const _0x342f77=JSON['parse']('['+RegExp['$1'][_0x33b4b4(0x379)](/\d+/g)+']');for(const _0x2fc327 of _0x342f77){if($gameSwitches[_0x33b4b4(0x18d)](_0x2fc327))return!![];}return![];}else{if(_0x7b09de[_0x33b4b4(0x198)][_0x33b4b4(0x31d)]()==='MP')return _0x122574[_0x33b4b4(0x1b9)][_0x33b4b4(0x1a3)](this,_0x3b2045);}}if(_0x903740[_0x33b4b4(0x379)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28a36d=JSON[_0x33b4b4(0x10b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5c3276 of _0x28a36d){if(!$gameSwitches[_0x33b4b4(0x18d)](_0x5c3276))return!![];}return![];}if(_0x903740[_0x33b4b4(0x379)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x33b4b4(0x187)==='UhrxC'){const _0x5a598d=JSON['parse']('['+RegExp['$1'][_0x33b4b4(0x379)](/\d+/g)+']');for(const _0x3c692b of _0x5a598d){if(!$gameSwitches[_0x33b4b4(0x18d)](_0x3c692b))return!![];}return![];}else _0xfba057[_0x33b4b4(0x103)]['push'](_0x33b4b4(0x3c0));}if(_0x903740['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('AKcCH'===_0x33b4b4(0x116)){const _0x2544a0=_0x133401[_0x33b4b4(0x10b)]('['+_0x41adf7['$1']['match'](/\d+/g)+']');for(const _0x4998b9 of _0x2544a0){if(_0x3af5db['value'](_0x4998b9))return!![];}return![];}else{const _0x8dee90=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x46367d of _0x8dee90){if($gameSwitches[_0x33b4b4(0x18d)](_0x46367d))return![];}return!![];}}return!![];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3dd)]=function(_0x17a42d){const _0x1edc69=_0x558d77,_0x6f566=_0x17a42d[_0x1edc69(0x20b)],_0x433048=VisuMZ[_0x1edc69(0x2d3)]['skillEnableJS'];return _0x433048[_0x17a42d['id']]?_0x433048[_0x17a42d['id']][_0x1edc69(0x1a3)](this,_0x17a42d):!![];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x141)]=function(_0x780cee){const _0x27c049=_0x558d77;return VisuMZ['SkillsStatesCore']['Settings']['Skills']['SkillConditionJS'][_0x27c049(0x1a3)](this,_0x780cee);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x35a)]=Game_BattlerBase['prototype'][_0x558d77(0x332)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x332)]=function(_0x43e3cc){const _0x512368=_0x558d77;for(settings of VisuMZ[_0x512368(0x2d3)][_0x512368(0x343)][_0x512368(0x1b4)]){if(settings[_0x512368(0x198)][_0x512368(0x31d)]()==='MP')return settings[_0x512368(0x1b9)][_0x512368(0x1a3)](this,_0x43e3cc);}return VisuMZ[_0x512368(0x2d3)][_0x512368(0x35a)][_0x512368(0x1a3)](this,_0x43e3cc);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x18c)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3bc)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3bc)]=function(_0x14d315){const _0x3bf56e=_0x558d77;for(settings of VisuMZ[_0x3bf56e(0x2d3)]['Settings'][_0x3bf56e(0x1b4)]){if(settings[_0x3bf56e(0x198)]['toUpperCase']()==='TP')return settings[_0x3bf56e(0x1b9)][_0x3bf56e(0x1a3)](this,_0x14d315);}return VisuMZ[_0x3bf56e(0x2d3)][_0x3bf56e(0x18c)]['call'](this,_0x14d315);},Game_BattlerBase['prototype'][_0x558d77(0x177)]=function(_0x2c1f98){const _0x598086=_0x558d77;if(typeof _0x2c1f98===_0x598086(0x28d))_0x2c1f98=$dataStates[_0x2c1f98];return this[_0x598086(0x180)]()['includes'](_0x2c1f98);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x1c3)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x180)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x180)]=function(){const _0x1b5722=_0x558d77;let _0x5f31d4=VisuMZ[_0x1b5722(0x2d3)][_0x1b5722(0x1c3)][_0x1b5722(0x1a3)](this);if(this[_0x1b5722(0x385)])return _0x5f31d4;return this['_checkingPassiveStates']=!![],this['addPassiveStates'](_0x5f31d4),this['_checkingPassiveStates']=undefined,_0x5f31d4;},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x337)]=function(_0x5594ff){const _0x133417=_0x558d77,_0x2772d0=this[_0x133417(0x41b)]();for(state of _0x2772d0){if(!state)continue;if(!this[_0x133417(0x189)](state)&&_0x5594ff[_0x133417(0x311)](state))continue;_0x5594ff[_0x133417(0x287)](state);}_0x2772d0[_0x133417(0x320)]>0x0&&(_0x133417(0x38c)===_0x133417(0x38c)?_0x5594ff[_0x133417(0x34e)]((_0x194d3c,_0x47789f)=>{const _0x10fe4d=_0x133417;if('UUyxi'!=='ESLOL'){const _0x3757e9=_0x194d3c['priority'],_0xcad08a=_0x47789f[_0x10fe4d(0x380)];if(_0x3757e9!==_0xcad08a)return _0xcad08a-_0x3757e9;return _0x194d3c-_0x47789f;}else{const _0x463719=_0x54dea3(_0x1347ad['$1']);if(_0x45d798[_0x10fe4d(0x358)](_0x463719))return!![];}}):(_0x2ba3af['SkillsStatesCore'][_0x133417(0x2b8)]['call'](this,_0x334eee,_0x595f65),this[_0x133417(0x24a)](_0x3669a)&&this['onAddDebuff'](_0x36f444,_0x5e2525)));},Game_BattlerBase['prototype']['isPassiveStateStackable']=function(_0x21778e){const _0x333bee=_0x558d77;return _0x21778e[_0x333bee(0x20b)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x3b5)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2d6)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2d6)]=function(_0x20a5c0){const _0x10c0d0=_0x558d77;this[_0x10c0d0(0x1af)]=!![];let _0x1ebcc2=VisuMZ[_0x10c0d0(0x2d3)][_0x10c0d0(0x3b5)]['call'](this,_0x20a5c0);return this[_0x10c0d0(0x1af)]=undefined,_0x1ebcc2;},Game_BattlerBase[_0x558d77(0x10c)]['convertPassiveStates']=function(){const _0x5c8279=_0x558d77;let _0x2abbf1=[];this[_0x5c8279(0x3d6)]=this['_passiveStateResults']||{};for(;;){_0x2abbf1=[];let _0x534391=!![];for(const _0xe647ff of this[_0x5c8279(0x2c1)][_0x5c8279(0x41b)]){const _0x2de6a5=$dataStates[_0xe647ff];if(!_0x2de6a5)continue;let _0x30a857=this[_0x5c8279(0x219)](_0x2de6a5);if(this[_0x5c8279(0x3d6)][_0xe647ff]!==_0x30a857){if(_0x5c8279(0x33a)===_0x5c8279(0x33a))_0x534391=![],this[_0x5c8279(0x3d6)][_0xe647ff]=_0x30a857;else{if(_0x4f8147['length']>0x0)_0x9c1293+=this[_0x5c8279(0x35e)]();_0x51539f+=_0x7c474(_0x595f32['$1']);}}if(!_0x30a857)continue;_0x2abbf1[_0x5c8279(0x287)](_0x2de6a5);}if(_0x534391)break;else{if(!this['_checkingTraitsSetSkillsStatesCore'])this[_0x5c8279(0x1d7)]();this[_0x5c8279(0x271)]();}}return _0x2abbf1;},Game_BattlerBase['prototype'][_0x558d77(0x219)]=function(_0x82566b){const _0x4f458d=_0x558d77;if(!this[_0x4f458d(0x2ce)](_0x82566b))return![];if(!this[_0x4f458d(0x3df)](_0x82566b))return![];if(!this[_0x4f458d(0x161)](_0x82566b))return![];if(!this[_0x4f458d(0x269)](_0x82566b))return![];return!![];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2ce)]=function(_0x20fd27){return!![];},Game_Actor[_0x558d77(0x10c)][_0x558d77(0x2ce)]=function(_0x409963){const _0x2dead2=_0x558d77,_0x310aaa=_0x409963[_0x2dead2(0x20b)];if(_0x310aaa['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if(_0x2dead2(0x19b)!==_0x2dead2(0x19b))_0x19ce9a=_0xa1701c[_0x2dead2(0x26a)](_0x550c0e,_0x16ab32);else{const _0x2e4a06=String(RegExp['$1'])[_0x2dead2(0x3dc)](',')[_0x2dead2(0x355)](_0x4be6cd=>_0x4be6cd[_0x2dead2(0x2d2)]()),_0x55b0e2=VisuMZ[_0x2dead2(0x2d3)][_0x2dead2(0x197)](_0x2e4a06);return _0x55b0e2[_0x2dead2(0x311)](this[_0x2dead2(0x1aa)]());}}if(_0x310aaa[_0x2dead2(0x379)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x2dead2(0x140)!==_0x2dead2(0x140))return!this[_0x2dead2(0x2da)](_0xfa51d)&&!this[_0x2dead2(0x2ee)](_0x44456d)&&!this[_0x2dead2(0x2c9)][_0x2dead2(0x1b8)](_0x1cf566);else{const _0x589c30=String(RegExp['$1'])[_0x2dead2(0x3dc)](',')[_0x2dead2(0x355)](_0x558854=>_0x558854[_0x2dead2(0x2d2)]()),_0x4810ce=VisuMZ[_0x2dead2(0x2d3)]['ParseClassIDs'](_0x589c30);let _0x281abc=[this['currentClass']()];return Imported[_0x2dead2(0x164)]&&this[_0x2dead2(0x261)]&&(_0x281abc=this['multiclasses']()),_0x4810ce[_0x2dead2(0x321)](_0x58c65b=>_0x281abc[_0x2dead2(0x311)](_0x58c65b))['length']>0x0;}}return Game_BattlerBase[_0x2dead2(0x10c)][_0x2dead2(0x2ce)][_0x2dead2(0x1a3)](this,_0x409963);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x197)]=function(_0x448c65){const _0x458bd9=_0x558d77,_0x273174=[];for(let _0x56b5c1 of _0x448c65){if(_0x458bd9(0x1b0)!=='AfKXn'){const _0x1d3652=this[_0x458bd9(0x38e)],_0x12ee40=_0x39a3dd['windowPadding'](),_0x333bff=_0xdfda96['x']+_0x55df7e[_0x458bd9(0x2e8)](_0x139781[_0x458bd9(0x136)]/0x2)+_0x12ee40;_0x1d3652['x']=_0x1d3652['width']/-0x2+_0x333bff,_0x1d3652['y']=_0x157369[_0x458bd9(0x2e8)](_0x5f3faa[_0x458bd9(0x35b)]/0x2);}else{_0x56b5c1=(String(_0x56b5c1)||'')['trim']();const _0x24f83d=/^\d+$/[_0x458bd9(0x3e2)](_0x56b5c1);if(_0x24f83d)_0x273174[_0x458bd9(0x287)](Number(_0x56b5c1));else{if('CZOKW'===_0x458bd9(0x1f0)){const _0x5c756f=_0x4c015c(_0x3d1652['$1']),_0x208a38=_0x311f17[_0x458bd9(0x176)](_0x5c756f,_0x458bd9(0x2a2),-0x1,'slipTp');_0x54cbe4[_0x458bd9(0x2d3)]['stateTpSlipDamageJS'][_0x2edc6e['id']]=new _0x235beb(_0x458bd9(0x25f),_0x208a38);}else _0x273174['push'](DataManager[_0x458bd9(0x16e)](_0x56b5c1));}}}return _0x273174['map'](_0x1f2c66=>$dataClasses[Number(_0x1f2c66)])[_0x458bd9(0x39f)](null);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3df)]=function(_0x3ca611){const _0x122177=_0x558d77,_0x10dbfa=_0x3ca611['note'];if(_0x10dbfa['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e0b6a=JSON[_0x122177(0x10b)]('['+RegExp['$1'][_0x122177(0x379)](/\d+/g)+']');for(const _0x1ff1fd of _0x1e0b6a){if(!$gameSwitches[_0x122177(0x18d)](_0x1ff1fd))return![];}return!![];}if(_0x10dbfa[_0x122177(0x379)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('zENRQ'===_0x122177(0x238))_0x599355[_0x122177(0x2d3)]['Settings'][_0x122177(0x1e8)][_0x122177(0x204)][_0x122177(0x1a3)](this,_0x44a71d);else{const _0x3bb06b=JSON[_0x122177(0x10b)]('['+RegExp['$1'][_0x122177(0x379)](/\d+/g)+']');for(const _0x602928 of _0x3bb06b){if('Vngue'!==_0x122177(0x167)){if(!$gameSwitches['value'](_0x602928))return![];}else{if(_0x366c99[_0x122177(0x379)](/<member-(\d+)>/i))return _0x3550e7[_0x122177(0x14f)]()[_0x3a0ce4(_0x96f228['$1'])];}}return!![];}}if(_0x10dbfa[_0x122177(0x379)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x122177(0x3a5)!==_0x122177(0x3a5))return this[_0x122177(0x278)]()?this[_0x122177(0x3eb)]():_0x47b753[_0x122177(0x2d3)]['Scene_Skill_statusWindowRect'][_0x122177(0x1a3)](this);else{const _0x57661e=JSON['parse']('['+RegExp['$1'][_0x122177(0x379)](/\d+/g)+']');for(const _0x2b338a of _0x57661e){if(_0x122177(0x2bc)!=='LcHzk'){if($gameSwitches[_0x122177(0x18d)](_0x2b338a))return!![];}else this['getStateRetainType']()!==''?this[_0x122177(0x407)]():(_0x26a8ea['SkillsStatesCore']['Game_BattlerBase_clearStates'][_0x122177(0x1a3)](this),this[_0x122177(0x285)]());}return![];}}if(_0x10dbfa['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('kkrmb'!==_0x122177(0x210))this[_0x122177(0x3cc)][_0x122177(0x3c3)]=_0x5bf06c;else{const _0x272299=JSON[_0x122177(0x10b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xc31ad4 of _0x272299){if(_0x122177(0x1b2)!==_0x122177(0x1b2))this[_0x122177(0x1d5)]=_0xe0d208[_0x122177(0x2a0)];else{if(!$gameSwitches[_0x122177(0x18d)](_0xc31ad4))return!![];}}return![];}}if(_0x10dbfa[_0x122177(0x379)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e00b9=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4168ef of _0x3e00b9){if(!$gameSwitches[_0x122177(0x18d)](_0x4168ef))return!![];}return![];}if(_0x10dbfa[_0x122177(0x379)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x122177(0x2a9)==='KPjJc')return _0x122177(0x3a6)['format'](_0x5ee076[_0x122177(0x2bf)]());else{const _0xc0bc9c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5ffdff of _0xc0bc9c){if($gameSwitches[_0x122177(0x18d)](_0x5ffdff))return![];}return!![];}}return!![];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x161)]=function(_0x1362ce){const _0x1f636e=_0x558d77,_0x33e3bf=VisuMZ[_0x1f636e(0x2d3)][_0x1f636e(0x2c4)];if(_0x33e3bf[_0x1362ce['id']]&&!_0x33e3bf[_0x1362ce['id']][_0x1f636e(0x1a3)](this,_0x1362ce))return![];return!![];},Game_BattlerBase[_0x558d77(0x10c)]['meetsPassiveStateGlobalConditionJS']=function(_0x1b0ab0){const _0x5b6ad0=_0x558d77;return VisuMZ[_0x5b6ad0(0x2d3)][_0x5b6ad0(0x343)]['PassiveStates']['PassiveConditionJS'][_0x5b6ad0(0x1a3)](this,_0x1b0ab0);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x41b)]=function(){const _0x5cfc3c=_0x558d77;if(this['checkCacheKey'](_0x5cfc3c(0x41b)))return this[_0x5cfc3c(0x402)]();if(this[_0x5cfc3c(0x19d)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x5cfc3c(0x271)](),this[_0x5cfc3c(0x19d)]=undefined,this[_0x5cfc3c(0x402)]();},Game_BattlerBase['prototype'][_0x558d77(0x271)]=function(){const _0x14021e=_0x558d77;this[_0x14021e(0x19d)]=!![],this[_0x14021e(0x2c1)][_0x14021e(0x41b)]=[],this['addPassiveStatesFromOtherPlugins'](),this['addPassiveStatesByNotetag'](),this[_0x14021e(0x113)](),this[_0x14021e(0x19d)]=undefined;},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x146)]=function(){const _0x2f584b=_0x558d77;if(Imported[_0x2f584b(0x124)])this[_0x2f584b(0x3f4)]();},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x11e)]=function(){return[];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x23a)]=function(){const _0x3a1d23=_0x558d77,_0x431f6a=this['passiveStateObjects']();for(const _0x1cc644 of _0x431f6a){if(!_0x1cc644)continue;const _0x4c4886=_0x1cc644['note'][_0x3a1d23(0x379)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x4c4886){if('JEMGm'!==_0x3a1d23(0x15a))for(const _0xf7ecff of _0x4c4886){if(_0x3a1d23(0x10d)===_0x3a1d23(0x10d)){_0xf7ecff['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x1fd06a=RegExp['$1'];if(_0x1fd06a[_0x3a1d23(0x379)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x3a1d23(0x2fb)!=='SHDsm')return _0x37e332[_0x3a1d23(0x1ef)][_0x3a1d23(0x391)]===_0x363fb7?_0x318a25['SkillsStatesCore'][_0x3a1d23(0x2c0)]['call'](this):_0x26e8f6['SkillsStatesCore'][_0x3a1d23(0x343)]['Skills'][_0x3a1d23(0x2b6)];else{const _0x3efc7c=JSON[_0x3a1d23(0x10b)]('['+RegExp['$1'][_0x3a1d23(0x379)](/\d+/g)+']');this[_0x3a1d23(0x2c1)][_0x3a1d23(0x41b)]=this[_0x3a1d23(0x2c1)]['passiveStates'][_0x3a1d23(0x1d6)](_0x3efc7c);}}else{const _0x5ac242=_0x1fd06a[_0x3a1d23(0x3dc)](',');for(const _0x464da8 of _0x5ac242){if('ipKfn'!=='uHDlC'){const _0x24d4c6=DataManager[_0x3a1d23(0x226)](_0x464da8);if(_0x24d4c6)this[_0x3a1d23(0x2c1)][_0x3a1d23(0x41b)][_0x3a1d23(0x287)](_0x24d4c6);}else{const _0x5d1ec5=_0x6dbdda['parse']('['+_0x3556cf['$1'][_0x3a1d23(0x379)](/\d+/g)+']');for(const _0x49fc86 of _0x5d1ec5){if(_0x5980a0[_0x3a1d23(0x18d)](_0x49fc86))return!![];}return![];}}}}else{const _0x59a423=new _0x200065(0x0,0x0,_0x3d67a2['width'],_0x75061['height']);this[_0x3a1d23(0x38e)]=new _0x1083c5(_0x59a423),this[_0x3a1d23(0x38e)][_0x3a1d23(0x2cc)]=0x0,this['addChild'](this[_0x3a1d23(0x38e)]),this[_0x3a1d23(0x3aa)]();}}else return this[_0x3a1d23(0x34d)][_0x19e32f]===_0x5a88a8[_0x3a1d23(0x2d3)][_0x3a1d23(0x343)][_0x3a1d23(0x1e8)][_0x3a1d23(0x213)];}}},Game_BattlerBase[_0x558d77(0x10c)]['addPassiveStatesByPluginParameters']=function(){const _0x326bb7=_0x558d77,_0x2f91f5=VisuMZ['SkillsStatesCore']['Settings'][_0x326bb7(0x375)][_0x326bb7(0x28b)];this['_cache'][_0x326bb7(0x41b)]=this[_0x326bb7(0x2c1)][_0x326bb7(0x41b)][_0x326bb7(0x1d6)](_0x2f91f5);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x374)]=function(_0x5103ed){const _0x18ac87=_0x558d77;if(typeof _0x5103ed!==_0x18ac87(0x28d))_0x5103ed=_0x5103ed['id'];return this[_0x18ac87(0x334)][_0x5103ed]||0x0;},Game_BattlerBase[_0x558d77(0x10c)]['setStateTurns']=function(_0xe16f75,_0x214615){const _0xefc9db=_0x558d77;if(typeof _0xe16f75!=='number')_0xe16f75=_0xe16f75['id'];if(this[_0xefc9db(0x358)](_0xe16f75)){const _0x1a397f=DataManager[_0xefc9db(0x1dc)](_0xe16f75);this['_stateTurns'][_0xe16f75]=_0x214615['clamp'](0x0,_0x1a397f);if(this['_stateTurns'][_0xe16f75]<=0x0)this[_0xefc9db(0x23d)](_0xe16f75);}},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x182)]=function(_0x25d701,_0x5a6e72){const _0x3238d4=_0x558d77;if(typeof _0x25d701!==_0x3238d4(0x28d))_0x25d701=_0x25d701['id'];this[_0x3238d4(0x358)](_0x25d701)&&(_0x5a6e72+=this['stateTurns'](_0x25d701),this[_0x3238d4(0x259)](_0x25d701,_0x5a6e72));},VisuMZ['SkillsStatesCore'][_0x558d77(0x2a1)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1ca)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1ca)]=function(_0x50173a){const _0x40d3d6=_0x558d77,_0x26aaf7=this[_0x40d3d6(0x34d)][_0x50173a];VisuMZ[_0x40d3d6(0x2d3)][_0x40d3d6(0x2a1)][_0x40d3d6(0x1a3)](this,_0x50173a);if(_0x26aaf7>0x0)this[_0x40d3d6(0x322)](_0x50173a);if(_0x26aaf7<0x0)this[_0x40d3d6(0x1a0)](_0x50173a);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x21d)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3ec)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3ec)]=function(_0x1c137b){const _0x3e687a=_0x558d77;VisuMZ[_0x3e687a(0x2d3)]['Game_BattlerBase_increaseBuff']['call'](this,_0x1c137b);if(!this[_0x3e687a(0x1fc)](_0x1c137b))this[_0x3e687a(0x1ca)](_0x1c137b);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x394)]=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3bd)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3bd)]=function(_0x2f3661){const _0x30c472=_0x558d77;VisuMZ[_0x30c472(0x2d3)][_0x30c472(0x394)][_0x30c472(0x1a3)](this,_0x2f3661);if(!this[_0x30c472(0x1fc)](_0x2f3661))this[_0x30c472(0x1ca)](_0x2f3661);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x322)]=function(_0x2c7a36){},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1a0)]=function(_0x4099ec){},Game_BattlerBase[_0x558d77(0x10c)]['isMaxBuffAffected']=function(_0x50b904){const _0xe0a99b=_0x558d77;return this['_buffs'][_0x50b904]===VisuMZ[_0xe0a99b(0x2d3)][_0xe0a99b(0x343)]['Buffs'][_0xe0a99b(0x213)];},Game_BattlerBase[_0x558d77(0x10c)]['isMaxDebuffAffected']=function(_0x508563){const _0x1aee56=_0x558d77;return this['_buffs'][_0x508563]===-VisuMZ['SkillsStatesCore'][_0x1aee56(0x343)][_0x1aee56(0x1e8)]['StackDebuffMax'];},VisuMZ[_0x558d77(0x2d3)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3a0)],Game_BattlerBase['prototype']['buffIconIndex']=function(_0x280bb8,_0x4d47ba){const _0x2fb8df=_0x558d77;return _0x280bb8=_0x280bb8[_0x2fb8df(0x307)](-0x2,0x2),VisuMZ['SkillsStatesCore']['Game_BattlerBase_buffIconIndex'][_0x2fb8df(0x1a3)](this,_0x280bb8,_0x4d47ba);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1c0)]=function(_0x52320e){const _0x14bd17=_0x558d77,_0x3b0c4d=this['_buffs'][_0x52320e];return VisuMZ[_0x14bd17(0x2d3)][_0x14bd17(0x343)][_0x14bd17(0x1e8)][_0x14bd17(0x221)][_0x14bd17(0x1a3)](this,_0x52320e,_0x3b0c4d);},Game_BattlerBase['prototype']['buffTurns']=function(_0x1be8b2){const _0x58921d=_0x558d77;return this[_0x58921d(0x338)][_0x1be8b2]||0x0;},Game_BattlerBase['prototype'][_0x558d77(0x383)]=function(_0x2d64fc){return this['buffTurns'](_0x2d64fc);},Game_BattlerBase[_0x558d77(0x10c)]['setBuffTurns']=function(_0x529732,_0x167721){const _0x3faff9=_0x558d77;if(this[_0x3faff9(0x3b0)](_0x529732)){if(_0x3faff9(0x1ee)!==_0x3faff9(0x1ee))this[_0x3faff9(0x193)]['setItem'](this[_0x3faff9(0x1ab)](0x0));else{const _0x242bc9=VisuMZ[_0x3faff9(0x2d3)][_0x3faff9(0x343)][_0x3faff9(0x1e8)][_0x3faff9(0x290)];this['_buffTurns'][_0x529732]=_0x167721[_0x3faff9(0x307)](0x0,_0x242bc9);}}},Game_BattlerBase[_0x558d77(0x10c)]['addBuffTurns']=function(_0x33603b,_0x498739){const _0x5c6103=_0x558d77;this[_0x5c6103(0x3b0)](_0x33603b)&&(_0x498739+=this['buffTurns'](stateId),this['setStateTurns'](_0x33603b,_0x498739));},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x328)]=function(_0x44ea88,_0x3082bf){const _0x224a45=_0x558d77;if(this[_0x224a45(0x24a)](_0x44ea88)){const _0x27285e=VisuMZ[_0x224a45(0x2d3)][_0x224a45(0x343)][_0x224a45(0x1e8)]['MaxTurns'];this['_buffTurns'][_0x44ea88]=_0x3082bf[_0x224a45(0x307)](0x0,_0x27285e);}},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x13e)]=function(_0x29ee73,_0x429f70){const _0x3ecf8e=_0x558d77;this[_0x3ecf8e(0x24a)](_0x29ee73)&&(_0x429f70+=this[_0x3ecf8e(0x1f1)](stateId),this[_0x3ecf8e(0x259)](_0x29ee73,_0x429f70));},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x17a)]=function(_0x8f539e){const _0x24f632=_0x558d77;if(typeof _0x8f539e!=='number')_0x8f539e=_0x8f539e['id'];return this[_0x24f632(0x2cb)]=this[_0x24f632(0x2cb)]||{},this['_stateData'][_0x8f539e]=this[_0x24f632(0x2cb)][_0x8f539e]||{},this[_0x24f632(0x2cb)][_0x8f539e];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x35d)]=function(_0x1b22da,_0x45f35b){const _0x9121df=_0x558d77;if(typeof _0x1b22da!==_0x9121df(0x28d))_0x1b22da=_0x1b22da['id'];const _0x439083=this[_0x9121df(0x17a)](_0x1b22da);return _0x439083[_0x45f35b];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x282)]=function(_0x309f7f,_0x37e226,_0x54c20a){const _0x30571c=_0x558d77;if(typeof _0x309f7f!==_0x30571c(0x28d))_0x309f7f=_0x309f7f['id'];const _0x39d5ea=this[_0x30571c(0x17a)](_0x309f7f);_0x39d5ea[_0x37e226]=_0x54c20a;},Game_BattlerBase['prototype'][_0x558d77(0x382)]=function(_0x327faa){const _0x259ed3=_0x558d77;if(typeof _0x327faa!==_0x259ed3(0x28d))_0x327faa=_0x327faa['id'];this['_stateData']=this[_0x259ed3(0x2cb)]||{},this['_stateData'][_0x327faa]={};},Game_BattlerBase[_0x558d77(0x10c)]['getStateDisplay']=function(_0x1709af){const _0x4c7c58=_0x558d77;if(typeof _0x1709af!==_0x4c7c58(0x28d))_0x1709af=_0x1709af['id'];this[_0x4c7c58(0x377)]=this[_0x4c7c58(0x377)]||{};if(this[_0x4c7c58(0x377)][_0x1709af]===undefined){if(_0x4c7c58(0x2a7)!==_0x4c7c58(0x2a7)){const _0x575125=_0x162038(_0x597b88['$1'])[_0x4c7c58(0x3dc)](',')['map'](_0x1e2abf=>_0x1e2abf[_0x4c7c58(0x2d2)]()),_0x416ce6=_0x370409[_0x4c7c58(0x2d3)][_0x4c7c58(0x197)](_0x575125);return _0x416ce6[_0x4c7c58(0x311)](this[_0x4c7c58(0x1aa)]());}else this[_0x4c7c58(0x377)][_0x1709af]='';}return this['_stateDisplay'][_0x1709af];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x194)]=function(_0x26c425,_0x1d242f){const _0xee8978=_0x558d77;if(typeof _0x26c425!==_0xee8978(0x28d))_0x26c425=_0x26c425['id'];this['_stateDisplay']=this[_0xee8978(0x377)]||{},this[_0xee8978(0x377)][_0x26c425]=_0x1d242f;},Game_BattlerBase['prototype'][_0x558d77(0x350)]=function(_0x3bc52c){const _0x589e=_0x558d77;if(typeof _0x3bc52c!==_0x589e(0x28d))_0x3bc52c=_0x3bc52c['id'];this[_0x589e(0x377)]=this['_stateDisplay']||{},this[_0x589e(0x377)][_0x3bc52c]='';},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x3f3)]=function(_0x38990c){const _0x4e7c5c=_0x558d77;if(typeof _0x38990c!==_0x4e7c5c(0x28d))_0x38990c=_0x38990c['id'];this[_0x4e7c5c(0x209)]=this['_stateOrigin']||{},this[_0x4e7c5c(0x209)][_0x38990c]=this[_0x4e7c5c(0x209)][_0x38990c]||_0x4e7c5c(0x2ca);const _0x36f80d=this['_stateOrigin'][_0x38990c];return this[_0x4e7c5c(0x142)](_0x36f80d);},Game_BattlerBase[_0x558d77(0x10c)]['setStateOrigin']=function(_0x5a7d36,_0x107848){const _0x15f25d=_0x558d77;this[_0x15f25d(0x209)]=this[_0x15f25d(0x209)]||{};const _0x44a5d8=_0x107848?this[_0x15f25d(0x37d)](_0x107848):this['getCurrentStateOriginKey']();this[_0x15f25d(0x209)][_0x5a7d36]=_0x44a5d8;},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x37f)]=function(_0x3813bb){const _0x37ab0f=_0x558d77;this['_stateOrigin']=this['_stateOrigin']||{},delete this[_0x37ab0f(0x209)][_0x3813bb];},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x1c4)]=function(){const _0x31ae65=_0x558d77,_0x519080=this['getCurrentStateActiveUser']();return this[_0x31ae65(0x37d)](_0x519080);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x258)]=function(){const _0x567701=_0x558d77;if($gameParty[_0x567701(0x26c)]()){if(BattleManager[_0x567701(0x20f)]){if(_0x567701(0x1fd)===_0x567701(0x174))this[_0x567701(0x265)](_0x64532e,_0x7a47d0['x'],_0x3ace0e['y'],_0x56e30c);else return BattleManager['_subject'];}else{if(BattleManager[_0x567701(0x225)])return _0x567701(0x12f)===_0x567701(0x12f)?BattleManager[_0x567701(0x225)]:_0x13fe92[_0x567701(0x1b9)][_0x567701(0x1a3)](this,_0x282c47);}}else{if(_0x567701(0x16c)===_0x567701(0x2b7))return _0xa37092(_0x229740['$1']);else{const _0x5db592=SceneManager[_0x567701(0x1ef)];if(![Scene_Map,Scene_Item][_0x567701(0x311)](_0x5db592[_0x567701(0x391)])){if('AUoaa'!==_0x567701(0x112))return $gameParty['menuActor']();else{_0x5c9266[_0x567701(0x2d3)][_0x567701(0x29c)]['call'](this);if(this[_0x567701(0x323)])this[_0x567701(0x266)]();}}}}return this;},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x37d)]=function(_0x320de6){const _0x1f1a22=_0x558d77;if(!_0x320de6)return'user';if(_0x320de6[_0x1f1a22(0x3d9)]())return _0x1f1a22(0x340)==='LGVCM'?_0x1f1a22(0x3a6)[_0x1f1a22(0x176)](_0x320de6['actorId']()):_0x57d88d(_0x29c1e8['$1']);else{if(_0x1f1a22(0x2d7)===_0x1f1a22(0x3da))this[_0x1f1a22(0x193)]=_0x54efd3,this[_0x1f1a22(0x234)]();else{const _0x5082ae=_0x1f1a22(0x15c)[_0x1f1a22(0x176)](_0x320de6[_0x1f1a22(0x229)]()),_0x93eebf=_0x1f1a22(0x19f)['format'](_0x320de6[_0x1f1a22(0x217)]()),_0x3eb0e3='<troop-%1>'['format']($gameTroop['getCurrentTroopUniqueID']());return'%1\x20%2\x20%3'['format'](_0x5082ae,_0x93eebf,_0x3eb0e3);}}return _0x1f1a22(0x2ca);},Game_BattlerBase['prototype'][_0x558d77(0x142)]=function(_0x3d138d){const _0x56d3b9=_0x558d77;if(_0x3d138d===_0x56d3b9(0x2ca))return this;else{if(_0x3d138d[_0x56d3b9(0x379)](/<actor-(\d+)>/i)){if(_0x56d3b9(0x325)===_0x56d3b9(0x325))return $gameActors[_0x56d3b9(0x250)](Number(RegExp['$1']));else{if(!_0x133e2a[_0x56d3b9(0x18d)](_0x50e0b8))return!![];}}else{if($gameParty[_0x56d3b9(0x26c)]()&&_0x3d138d['match'](/<troop-(\d+)>/i)){const _0x18bf42=Number(RegExp['$1']);if(_0x18bf42===$gameTroop[_0x56d3b9(0x392)]()){if(_0x3d138d[_0x56d3b9(0x379)](/<member-(\d+)>/i))return $gameTroop[_0x56d3b9(0x14f)]()[Number(RegExp['$1'])];}}if(_0x3d138d[_0x56d3b9(0x379)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x40c)]=Game_Battler['prototype'][_0x558d77(0x293)],Game_Battler[_0x558d77(0x10c)][_0x558d77(0x293)]=function(_0x445216){const _0x5b7b8d=_0x558d77,_0x21f0b3=this[_0x5b7b8d(0x3ba)](_0x445216);VisuMZ[_0x5b7b8d(0x2d3)][_0x5b7b8d(0x40c)][_0x5b7b8d(0x1a3)](this,_0x445216);if(_0x21f0b3&&this['hasState']($dataStates[_0x445216])){if(_0x5b7b8d(0x172)===_0x5b7b8d(0x172)){this[_0x5b7b8d(0x3fa)](_0x445216);;}else{if(typeof _0x33bb0a===_0x5b7b8d(0x28d))_0x13d006=_0x31de41[_0x4c8951];return this[_0x5b7b8d(0x180)]()[_0x5b7b8d(0x311)](_0x5e7830);}}},VisuMZ[_0x558d77(0x2d3)]['Game_Battler_isStateAddable']=Game_Battler[_0x558d77(0x10c)][_0x558d77(0x3ba)],Game_Battler[_0x558d77(0x10c)]['isStateAddable']=function(_0x106d90){const _0x2efa23=_0x558d77,_0x1bde85=$dataStates[_0x106d90];if(_0x1bde85&&_0x1bde85[_0x2efa23(0x20b)][_0x2efa23(0x379)](/<NO DEATH CLEAR>/i))return!this[_0x2efa23(0x2da)](_0x106d90)&&!this[_0x2efa23(0x2ee)](_0x106d90)&&!this['_result']['isStateRemoved'](_0x106d90);return VisuMZ[_0x2efa23(0x2d3)][_0x2efa23(0x1d2)][_0x2efa23(0x1a3)](this,_0x106d90);},Game_Battler[_0x558d77(0x10c)]['onAddState']=function(_0x4dc41a){const _0x55905b=_0x558d77;this[_0x55905b(0x388)](_0x4dc41a),this[_0x55905b(0x2ef)](_0x4dc41a),this[_0x55905b(0x220)](_0x4dc41a),this[_0x55905b(0x184)](_0x4dc41a);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x34c)]=function(_0x124e6a){const _0x32e256=_0x558d77;Game_BattlerBase[_0x32e256(0x10c)]['onRemoveState'][_0x32e256(0x1a3)](this,_0x124e6a),this[_0x32e256(0x21a)](_0x124e6a),this[_0x32e256(0x233)](_0x124e6a);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x313)]=function(_0x1cb806){const _0xb78485=_0x558d77;for(const _0x225c5f of this[_0xb78485(0x180)]()){this[_0xb78485(0x211)](_0x225c5f['id'])&&_0x225c5f[_0xb78485(0x108)]===_0x1cb806&&(this['removeState'](_0x225c5f['id']),this[_0xb78485(0x18b)](_0x225c5f['id']),this[_0xb78485(0x352)](_0x225c5f['id']));}},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x18b)]=function(_0x1bdeab){const _0x43692b=_0x558d77;this[_0x43692b(0x405)](_0x1bdeab);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x220)]=function(_0x508bef){const _0x2b0eba=_0x558d77;if(this[_0x2b0eba(0x166)]||this[_0x2b0eba(0x280)])return;const _0x44be49=VisuMZ[_0x2b0eba(0x2d3)]['stateAddJS'];if(_0x44be49[_0x508bef])_0x44be49[_0x508bef][_0x2b0eba(0x1a3)](this,_0x508bef);},Game_Battler[_0x558d77(0x10c)]['onEraseStateCustomJS']=function(_0x1af1cc){const _0x5e3f0d=_0x558d77;if(this['_tempActor']||this[_0x5e3f0d(0x280)])return;const _0x2e4846=VisuMZ[_0x5e3f0d(0x2d3)][_0x5e3f0d(0x40d)];if(_0x2e4846[_0x1af1cc])_0x2e4846[_0x1af1cc][_0x5e3f0d(0x1a3)](this,_0x1af1cc);},Game_Battler['prototype'][_0x558d77(0x405)]=function(_0x549dbe){const _0x4f8c51=_0x558d77;if(this[_0x4f8c51(0x166)]||this[_0x4f8c51(0x280)])return;const _0x2c5501=VisuMZ[_0x4f8c51(0x2d3)]['stateExpireJS'];if(_0x2c5501[_0x549dbe])_0x2c5501[_0x549dbe][_0x4f8c51(0x1a3)](this,_0x549dbe);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x184)]=function(_0x36dee4){const _0x48e497=_0x558d77;if(this[_0x48e497(0x166)]||this[_0x48e497(0x280)])return;try{VisuMZ[_0x48e497(0x2d3)][_0x48e497(0x343)][_0x48e497(0x396)][_0x48e497(0x1fb)][_0x48e497(0x1a3)](this,_0x36dee4);}catch(_0x3a25b8){if(_0x48e497(0x3e5)===_0x48e497(0x3e5)){if($gameTemp[_0x48e497(0x301)]())console[_0x48e497(0x181)](_0x3a25b8);}else{if(!_0x547d8f[_0x48e497(0x18d)](_0x44956f))return![];}}},Game_Battler['prototype']['onEraseStateGlobalJS']=function(_0x49db19){const _0x4cffbd=_0x558d77;if(this[_0x4cffbd(0x166)]||this[_0x4cffbd(0x280)])return;try{_0x4cffbd(0x1c2)!=='yUTpF'?_0x54905d=_0x3b1b0e[_0x4cffbd(0x2dc)](_0x1b5e0a):VisuMZ[_0x4cffbd(0x2d3)]['Settings'][_0x4cffbd(0x396)]['onEraseStateJS']['call'](this,_0x49db19);}catch(_0x388ea0){if(_0x4cffbd(0x37c)==='JpRMt'){this[_0x4cffbd(0x3fa)](_0x2b8ea4);;}else{if($gameTemp['isPlaytest']())console[_0x4cffbd(0x181)](_0x388ea0);}}},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x352)]=function(_0x1b310a){const _0x203aee=_0x558d77;if(this[_0x203aee(0x166)]||this[_0x203aee(0x280)])return;try{if(_0x203aee(0x35f)==='PhzOk'){if(typeof _0x3796be!==_0x203aee(0x28d))_0x30393f=_0x5845ef['id'];return this[_0x203aee(0x334)][_0xbdf631]||0x0;}else VisuMZ['SkillsStatesCore'][_0x203aee(0x343)][_0x203aee(0x396)][_0x203aee(0x303)][_0x203aee(0x1a3)](this,_0x1b310a);}catch(_0x1cd7fd){if(_0x203aee(0x368)!=='toRza')this[_0x203aee(0x211)](_0x375d76['id'])&&_0x3b5fad[_0x203aee(0x108)]===_0x1780a8&&(this[_0x203aee(0x23d)](_0x313a86['id']),this[_0x203aee(0x18b)](_0x391b2d['id']),this[_0x203aee(0x352)](_0xd7db6a['id']));else{if($gameTemp[_0x203aee(0x301)]())console[_0x203aee(0x181)](_0x1cd7fd);}}},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x3b1)]=function(_0x4b86a5){const _0x27c543=_0x558d77;return _0x4b86a5=_0x4b86a5[_0x27c543(0x31d)]()['trim'](),this[_0x27c543(0x180)]()[_0x27c543(0x321)](_0x5dc58e=>_0x5dc58e[_0x27c543(0x103)][_0x27c543(0x311)](_0x4b86a5));},Game_Battler[_0x558d77(0x10c)]['removeStatesByCategory']=function(_0x458487,_0xa8e3d5){const _0x38c7a8=_0x558d77;_0x458487=_0x458487['toUpperCase']()[_0x38c7a8(0x2d2)](),_0xa8e3d5=_0xa8e3d5||0x0;const _0x578910=this[_0x38c7a8(0x3b1)](_0x458487),_0x426edd=[];for(const _0x1af57a of _0x578910){if(_0x38c7a8(0x279)===_0x38c7a8(0x279)){if(!_0x1af57a)continue;if(_0xa8e3d5<=0x0)return;_0x426edd['push'](_0x1af57a['id']),this['_result'][_0x38c7a8(0x26d)]=!![],_0xa8e3d5--;}else return _0x2adaac[_0x38c7a8(0x2d3)][_0x38c7a8(0x14e)][_0x38c7a8(0x1a3)](this);}while(_0x426edd[_0x38c7a8(0x320)]>0x0){this['removeState'](_0x426edd['shift']());}},Game_Battler['prototype']['removeStatesByCategoryAll']=function(_0x1b57a8){const _0x481018=_0x558d77;_0x1b57a8=_0x1b57a8['toUpperCase']()[_0x481018(0x2d2)]();const _0x2b5ea4=this[_0x481018(0x3b1)](_0x1b57a8),_0x478349=[];for(const _0x1112ac of _0x2b5ea4){if(_0x481018(0x40a)===_0x481018(0x169)){const _0xfbbf6c=_0x47d1f7[_0x481018(0x10b)]('['+_0x86c15b['$1'][_0x481018(0x379)](/\d+/g)+']');for(const _0x497c35 of _0xfbbf6c){if(_0x496730[_0x481018(0x18d)](_0x497c35))return![];}return!![];}else{if(!_0x1112ac)continue;_0x478349[_0x481018(0x287)](_0x1112ac['id']),this[_0x481018(0x2c9)][_0x481018(0x26d)]=!![];}}while(_0x478349[_0x481018(0x320)]>0x0){this[_0x481018(0x23d)](_0x478349['shift']());}},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x2b2)]=function(_0x393431){const _0x565186=_0x558d77;return this[_0x565186(0x31a)](_0x393431)>0x0;},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x110)]=function(_0x1d6b87){return this['totalStateCategory'](_0x1d6b87)>0x0;},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x31a)]=function(_0x2d001b){const _0x230820=_0x558d77,_0x4df9a8=this[_0x230820(0x3b1)](_0x2d001b)[_0x230820(0x321)](_0x183588=>this[_0x230820(0x358)](_0x183588['id']));return _0x4df9a8[_0x230820(0x320)];},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x14b)]=function(_0x3c80c9){const _0x2a8ffd=this['statesByCategory'](_0x3c80c9);return _0x2a8ffd['length'];},VisuMZ['SkillsStatesCore'][_0x558d77(0x205)]=Game_BattlerBase['prototype'][_0x558d77(0x2da)],Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x2da)]=function(_0x164182){const _0x9f9608=_0x558d77,_0x3817e7=$dataStates[_0x164182];if(_0x3817e7&&_0x3817e7[_0x9f9608(0x103)][_0x9f9608(0x320)]>0x0){if(_0x9f9608(0x38a)===_0x9f9608(0x13a))return this['skillTypeWindowRectSkillsStatesCore']();else for(const _0x4e3fb8 of _0x3817e7['categories']){if(this[_0x9f9608(0x34a)](_0x4e3fb8))return!![];}}return VisuMZ[_0x9f9608(0x2d3)]['Game_BattlerBase_isStateResist'][_0x9f9608(0x1a3)](this,_0x164182);},Game_BattlerBase[_0x558d77(0x10c)]['isStateCategoryResisted']=function(_0x12cab3){const _0x5b4423=_0x558d77;let _0x407092=_0x5b4423(0x3a9);if(this['checkCacheKey'](_0x407092))return this[_0x5b4423(0x2c1)][_0x407092][_0x5b4423(0x311)](_0x12cab3);return this[_0x5b4423(0x2c1)][_0x407092]=this[_0x5b4423(0x284)](),this[_0x5b4423(0x2c1)][_0x407092][_0x5b4423(0x311)](_0x12cab3);},Game_BattlerBase['prototype'][_0x558d77(0x284)]=function(){const _0x123abe=_0x558d77,_0x21e64b=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x5396b2=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x517a33=[];for(const _0x4fdfc3 of this[_0x123abe(0x1cc)]()){if(!_0x4fdfc3)continue;const _0x7f5c5f=_0x4fdfc3[_0x123abe(0x20b)],_0x3f7dc6=_0x7f5c5f[_0x123abe(0x379)](_0x21e64b);if(_0x3f7dc6){if('qoXlJ'==='qoXlJ')for(const _0x3f21f2 of _0x3f7dc6){if(_0x123abe(0x2e4)===_0x123abe(0x2e4)){_0x3f21f2['match'](_0x21e64b);const _0x4a1d87=String(RegExp['$1'])[_0x123abe(0x3dc)](',')['map'](_0x10513f=>String(_0x10513f)['toUpperCase']()['trim']());_0x517a33=_0x517a33[_0x123abe(0x1d6)](_0x4a1d87);}else this[_0x123abe(0x334)][_0x57e6c1]--;}else{const _0x434210=_0x335d75[_0x123abe(0x226)](_0x4fe2e7['$1']);if(_0x15e01e[_0x123abe(0x358)](_0x434210))return!![];}}if(_0x7f5c5f[_0x123abe(0x379)](_0x5396b2)){const _0x182809=String(RegExp['$1'])[_0x123abe(0x3dc)](/[\r\n]+/)[_0x123abe(0x355)](_0x4fa5d5=>String(_0x4fa5d5)['toUpperCase']()['trim']());_0x517a33=_0x517a33['concat'](_0x182809);}}return _0x517a33;},VisuMZ[_0x558d77(0x2d3)]['Game_Battler_addBuff']=Game_Battler[_0x558d77(0x10c)]['addBuff'],Game_Battler[_0x558d77(0x10c)][_0x558d77(0x28a)]=function(_0x4ae301,_0x4527fe){const _0x14e10a=_0x558d77;VisuMZ['SkillsStatesCore'][_0x14e10a(0x39c)][_0x14e10a(0x1a3)](this,_0x4ae301,_0x4527fe),this[_0x14e10a(0x3b0)](_0x4ae301)&&this[_0x14e10a(0x212)](_0x4ae301,_0x4527fe);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x283)]=function(_0x341823){},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x2b8)]=Game_Battler[_0x558d77(0x10c)]['addDebuff'],Game_Battler[_0x558d77(0x10c)][_0x558d77(0x1a1)]=function(_0x3f7050,_0x4c446d){const _0x406a71=_0x558d77;VisuMZ[_0x406a71(0x2d3)][_0x406a71(0x2b8)][_0x406a71(0x1a3)](this,_0x3f7050,_0x4c446d),this[_0x406a71(0x24a)](_0x3f7050)&&this['onAddDebuff'](_0x3f7050,_0x4c446d);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x38b)]=function(){const _0xf18dc=_0x558d77;for(let _0x4471e0=0x0;_0x4471e0<this['buffLength']();_0x4471e0++){if('NyphF'===_0xf18dc(0x248)){if(this['isBuffExpired'](_0x4471e0)){const _0x474c46=this[_0xf18dc(0x34d)][_0x4471e0];this['removeBuff'](_0x4471e0);if(_0x474c46>0x0)this[_0xf18dc(0x3b6)](_0x4471e0);if(_0x474c46<0x0)this[_0xf18dc(0x3b8)](_0x4471e0);}}else return _0x2c32fe[_0xf18dc(0x2d3)][_0xf18dc(0x343)][_0xf18dc(0x2c3)][_0xf18dc(0x30a)];}},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x212)]=function(_0xbca18f,_0x471f2d){const _0x38337d=_0x558d77;this[_0x38337d(0x2f5)](_0xbca18f,_0x471f2d);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x168)]=function(_0x5ecb1d,_0x36bb34){const _0x4727de=_0x558d77;this[_0x4727de(0x214)](_0x5ecb1d,_0x36bb34);},Game_Battler['prototype'][_0x558d77(0x322)]=function(_0x42c804){const _0x38e0f5=_0x558d77;Game_BattlerBase['prototype'][_0x38e0f5(0x322)][_0x38e0f5(0x1a3)](this,_0x42c804),this[_0x38e0f5(0x2cd)](_0x42c804);},Game_Battler[_0x558d77(0x10c)]['onEraseDebuff']=function(_0x35e548){const _0x3e11ca=_0x558d77;Game_BattlerBase['prototype']['onEraseDebuff']['call'](this,_0x35e548),this[_0x3e11ca(0x390)](_0x35e548);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x3b6)]=function(_0x476a4e){this['onExpireBuffGlobalJS'](_0x476a4e);},Game_Battler[_0x558d77(0x10c)]['onExpireDebuff']=function(_0x4cc2c9){const _0x5ca94a=_0x558d77;this[_0x5ca94a(0x3a7)](_0x4cc2c9);},Game_Battler['prototype'][_0x558d77(0x2f5)]=function(_0x10b760,_0xc24c58){const _0x4cd1dd=_0x558d77;VisuMZ[_0x4cd1dd(0x2d3)][_0x4cd1dd(0x343)][_0x4cd1dd(0x1e8)][_0x4cd1dd(0x240)][_0x4cd1dd(0x1a3)](this,_0x10b760,_0xc24c58);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x214)]=function(_0x1b1ace,_0x5a1374){const _0x2e8c1b=_0x558d77;VisuMZ[_0x2e8c1b(0x2d3)][_0x2e8c1b(0x343)][_0x2e8c1b(0x1e8)][_0x2e8c1b(0x395)][_0x2e8c1b(0x1a3)](this,_0x1b1ace,_0x5a1374);},Game_BattlerBase[_0x558d77(0x10c)]['onEraseBuffGlobalJS']=function(_0xc195b1){const _0x2b6178=_0x558d77;VisuMZ['SkillsStatesCore']['Settings']['Buffs']['onEraseBuffJS'][_0x2b6178(0x1a3)](this,_0xc195b1);},Game_BattlerBase[_0x558d77(0x10c)][_0x558d77(0x390)]=function(_0x2b1f82){const _0x3e3a7b=_0x558d77;VisuMZ[_0x3e3a7b(0x2d3)][_0x3e3a7b(0x343)]['Buffs'][_0x3e3a7b(0x191)][_0x3e3a7b(0x1a3)](this,_0x2b1f82);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x3c6)]=function(_0x4405cb){const _0x1fc63f=_0x558d77;VisuMZ['SkillsStatesCore'][_0x1fc63f(0x343)][_0x1fc63f(0x1e8)][_0x1fc63f(0x270)]['call'](this,_0x4405cb);},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x3a7)]=function(_0x440f48){const _0x430439=_0x558d77;VisuMZ[_0x430439(0x2d3)][_0x430439(0x343)][_0x430439(0x1e8)][_0x430439(0x204)][_0x430439(0x1a3)](this,_0x440f48);},Game_Battler['prototype']['onAddStateMakeCustomSlipValues']=function(_0x380be5){const _0x59f1d3=_0x558d77,_0x3f000b=VisuMZ[_0x59f1d3(0x2d3)],_0xd75111=[_0x59f1d3(0x3f6),_0x59f1d3(0x2b3),_0x59f1d3(0x339),_0x59f1d3(0x1f5),'stateTpSlipDamageJS',_0x59f1d3(0x1de)];for(const _0x1743b8 of _0xd75111){_0x3f000b[_0x1743b8][_0x380be5]&&(_0x59f1d3(0x109)===_0x59f1d3(0x16d)?this[_0x59f1d3(0x132)][_0x59f1d3(0x378)][_0x59f1d3(0x1a3)](this):_0x3f000b[_0x1743b8][_0x380be5][_0x59f1d3(0x1a3)](this,_0x380be5));}},VisuMZ[_0x558d77(0x2d3)]['Game_Battler_regenerateAll']=Game_Battler[_0x558d77(0x10c)][_0x558d77(0x22f)],Game_Battler[_0x558d77(0x10c)][_0x558d77(0x22f)]=function(){const _0x4cf29e=_0x558d77;this[_0x4cf29e(0x31c)](),VisuMZ[_0x4cf29e(0x2d3)][_0x4cf29e(0x138)][_0x4cf29e(0x1a3)](this),this[_0x4cf29e(0x2ea)](),this['regenerateAllSkillsStatesCore']();},Game_Battler['prototype']['setPassiveStateSlipDamageJS']=function(){const _0x3a1fdc=_0x558d77;for(const _0x32e9d1 of this[_0x3a1fdc(0x41b)]()){if(_0x3a1fdc(0x40b)===_0x3a1fdc(0x38d))for(const _0x6b2ecf of _0x446b1d[_0x3a1fdc(0x103)]){if(this[_0x3a1fdc(0x34a)](_0x6b2ecf))return!![];}else{if(!_0x32e9d1)continue;this[_0x3a1fdc(0x2ef)](_0x32e9d1['id']);}}},Game_Battler[_0x558d77(0x10c)][_0x558d77(0x31c)]=function(){const _0x530ea3=_0x558d77;for(const _0x26cd94 of this['states']()){if(!_0x26cd94)continue;if(_0x26cd94[_0x530ea3(0x20b)][_0x530ea3(0x379)](/<JS SLIP REFRESH>/i)){if(_0x530ea3(0x272)==='zpRMj')this[_0x530ea3(0x2ef)](_0x26cd94['id']);else{if(_0x51c28f[_0x530ea3(0x18d)](_0x152baf))return!![];}}}},Game_Battler['prototype'][_0x558d77(0x32f)]=function(){const _0x55b15e=_0x558d77;if(!this[_0x55b15e(0x399)]())return;const _0xaf5e3d=this[_0x55b15e(0x180)]();for(const _0x5662e1 of _0xaf5e3d){if(_0x55b15e(0x364)==='fpdTb'){if(!_0x5662e1)continue;this[_0x55b15e(0x393)](_0x5662e1);}else{if(!_0x2a97f3)return;_0x163e52['SkillsStatesCore']['Window_StatusBase_drawActorIcons'][_0x55b15e(0x1a3)](this,_0x282d6b,_0x4e117c,_0x560602,_0x4a16d8),this['drawActorIconsAllTurnCounters'](_0x1e1c28,_0x266c03,_0x122729,_0x36d356);}}},Game_Battler['prototype'][_0x558d77(0x393)]=function(_0x24228a){const _0x2e2b34=_0x558d77,_0x128ad9=this[_0x2e2b34(0x35d)](_0x24228a['id'],'slipHp')||0x0,_0x5b54f1=-this['maxSlipDamage'](),_0x44aa07=Math[_0x2e2b34(0x26a)](_0x128ad9,_0x5b54f1);if(_0x44aa07!==0x0)this[_0x2e2b34(0x1e4)](_0x44aa07);const _0x10b63d=this[_0x2e2b34(0x35d)](_0x24228a['id'],_0x2e2b34(0x151))||0x0;if(_0x10b63d!==0x0)this[_0x2e2b34(0x34f)](_0x10b63d);const _0x3d22e3=this['getStateData'](_0x24228a['id'],_0x2e2b34(0x3f8))||0x0;if(_0x3d22e3!==0x0)this[_0x2e2b34(0x3ff)](_0x3d22e3);},VisuMZ['SkillsStatesCore'][_0x558d77(0x410)]=Game_Actor[_0x558d77(0x10c)]['skillTypes'],Game_Actor['prototype']['skillTypes']=function(){const _0x42e5c8=_0x558d77,_0x43a706=VisuMZ[_0x42e5c8(0x2d3)]['Game_Actor_skillTypes'][_0x42e5c8(0x1a3)](this),_0xb40401=VisuMZ['SkillsStatesCore'][_0x42e5c8(0x343)][_0x42e5c8(0x2c3)];let _0x58511a=_0xb40401[_0x42e5c8(0x201)];if($gameParty['inBattle']()){if(_0x42e5c8(0x245)==='UedBr'){if(this[_0x42e5c8(0x166)]||this['_tempBattler'])return;try{_0x3ddd34['SkillsStatesCore'][_0x42e5c8(0x343)][_0x42e5c8(0x396)][_0x42e5c8(0x39e)]['call'](this,_0x52b335);}catch(_0x5623c8){if(_0x34810a[_0x42e5c8(0x301)]())_0x36a39a[_0x42e5c8(0x181)](_0x5623c8);}}else _0x58511a=_0x58511a['concat'](_0xb40401[_0x42e5c8(0x3a3)]);}return _0x43a706[_0x42e5c8(0x321)](_0x591eb5=>!_0x58511a[_0x42e5c8(0x311)](_0x591eb5));},Game_Actor[_0x558d77(0x10c)][_0x558d77(0x1f9)]=function(){const _0x20b985=_0x558d77;return this['skills']()[_0x20b985(0x321)](_0x345ed9=>this[_0x20b985(0x20e)](_0x345ed9));},Game_Actor[_0x558d77(0x10c)][_0x558d77(0x20e)]=function(_0xa681bf){const _0x134c50=_0x558d77;if(!this['canUse'](_0xa681bf))return![];if(!_0xa681bf)return![];if(!this[_0x134c50(0x1e3)](_0xa681bf))return![];if(this['isSkillHidden'](_0xa681bf))return![];return!![];},Game_Actor[_0x558d77(0x10c)][_0x558d77(0x1e3)]=function(_0x2f2b03){const _0xee0e4=_0x558d77,_0x355dc0=this[_0xee0e4(0x34b)](),_0x14cd47=DataManager[_0xee0e4(0x123)](_0x2f2b03),_0x3f4516=_0x355dc0[_0xee0e4(0x321)](_0x1e6346=>_0x14cd47[_0xee0e4(0x311)](_0x1e6346));return _0x3f4516[_0xee0e4(0x320)]>0x0;},Game_Actor[_0x558d77(0x10c)]['isSkillHidden']=function(_0x46d830){const _0x52c7f0=_0x558d77;if(!VisuMZ['SkillsStatesCore'][_0x52c7f0(0x255)](this,_0x46d830))return!![];if(!VisuMZ[_0x52c7f0(0x2d3)][_0x52c7f0(0x32c)](this,_0x46d830))return!![];if(!VisuMZ[_0x52c7f0(0x2d3)][_0x52c7f0(0x22a)](this,_0x46d830))return!![];return![];},Game_Actor[_0x558d77(0x10c)][_0x558d77(0x11e)]=function(){const _0x31ca9b=_0x558d77;let _0x5ebae7=[this['actor'](),this[_0x31ca9b(0x1aa)]()];_0x5ebae7=_0x5ebae7['concat'](this[_0x31ca9b(0x251)]()['filter'](_0x3f517f=>_0x3f517f));for(const _0x4f9a50 of this[_0x31ca9b(0x330)]){const _0x103f18=$dataSkills[_0x4f9a50];if(_0x103f18)_0x5ebae7[_0x31ca9b(0x287)](_0x103f18);}return _0x5ebae7;},Game_Actor['prototype'][_0x558d77(0x113)]=function(){const _0x5c6d6e=_0x558d77;Game_Battler[_0x5c6d6e(0x10c)][_0x5c6d6e(0x113)][_0x5c6d6e(0x1a3)](this);const _0x56a8bf=VisuMZ[_0x5c6d6e(0x2d3)]['Settings'][_0x5c6d6e(0x375)][_0x5c6d6e(0x409)];this[_0x5c6d6e(0x2c1)]['passiveStates']=this[_0x5c6d6e(0x2c1)]['passiveStates'][_0x5c6d6e(0x1d6)](_0x56a8bf);},VisuMZ[_0x558d77(0x2d3)]['Game_Actor_learnSkill']=Game_Actor[_0x558d77(0x10c)][_0x558d77(0x28e)],Game_Actor[_0x558d77(0x10c)][_0x558d77(0x28e)]=function(_0x10355d){const _0x3ae62a=_0x558d77;VisuMZ[_0x3ae62a(0x2d3)][_0x3ae62a(0x163)][_0x3ae62a(0x1a3)](this,_0x10355d),this[_0x3ae62a(0x2c1)]={};},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x3f7)]=Game_Actor['prototype'][_0x558d77(0x12c)],Game_Actor[_0x558d77(0x10c)][_0x558d77(0x12c)]=function(_0x52b1b5){const _0xfb81f4=_0x558d77;VisuMZ[_0xfb81f4(0x2d3)][_0xfb81f4(0x3f7)]['call'](this,_0x52b1b5),this[_0xfb81f4(0x2c1)]={};},Game_Enemy[_0x558d77(0x10c)][_0x558d77(0x11e)]=function(){const _0xfdab5=_0x558d77;let _0x317c12=[this['enemy']()];return _0x317c12['concat'](this[_0xfdab5(0x21c)]());},Game_Enemy['prototype'][_0x558d77(0x113)]=function(){const _0x56f467=_0x558d77;Game_Battler['prototype'][_0x56f467(0x113)][_0x56f467(0x1a3)](this);const _0x3bfab8=VisuMZ[_0x56f467(0x2d3)][_0x56f467(0x343)]['PassiveStates']['Enemy'];this['_cache'][_0x56f467(0x41b)]=this[_0x56f467(0x2c1)][_0x56f467(0x41b)][_0x56f467(0x1d6)](_0x3bfab8);},Game_Enemy[_0x558d77(0x10c)][_0x558d77(0x21c)]=function(){const _0x3ba41b=_0x558d77,_0x29b15d=[];for(const _0x286717 of this[_0x3ba41b(0x24b)]()[_0x3ba41b(0x3e0)]){if('dziic'!==_0x3ba41b(0x153)){const _0x5e5a68=$dataSkills[_0x286717[_0x3ba41b(0x1b1)]];if(_0x5e5a68&&!_0x29b15d['includes'](_0x5e5a68))_0x29b15d[_0x3ba41b(0x287)](_0x5e5a68);}else{const _0x4202a3=this[_0x3ba41b(0x32b)]()[_0x3ba41b(0x20b)];if(_0x4202a3[_0x3ba41b(0x379)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x4be030=_0x1e9bdc(_0x27312c['$1']);if(_0x5be5ec[_0x3ba41b(0x2b2)](_0x4be030))return!![];}if(_0x4202a3[_0x3ba41b(0x379)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x276164=_0x478611(_0x41d4b8['$1']);if(_0x214ef0['isStateAffected'](_0x276164))return!![];}else{if(_0x4202a3['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x4ac881=_0x4f35c8[_0x3ba41b(0x226)](_0xa165fd['$1']);if(_0xe9a591[_0x3ba41b(0x358)](_0x4ac881))return!![];}}return![];}}return _0x29b15d;},Game_Enemy['prototype']['meetsStateCondition']=function(_0x422889){const _0x3b8487=_0x558d77;return this[_0x3b8487(0x177)]($dataStates[_0x422889]);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x178)]=Game_Unit[_0x558d77(0x10c)][_0x558d77(0x25c)],Game_Unit[_0x558d77(0x10c)]['isAllDead']=function(){const _0x373256=_0x558d77;if(this[_0x373256(0x373)]())return!![];return VisuMZ[_0x373256(0x2d3)][_0x373256(0x178)][_0x373256(0x1a3)](this);},Game_Unit[_0x558d77(0x10c)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x22ac0c=_0x558d77,_0x158406=this[_0x22ac0c(0x1e5)]();for(const _0x5bb1a7 of _0x158406){if(!_0x5bb1a7[_0x22ac0c(0x2e6)]())return![];}return!![];},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x130)]=Game_Troop[_0x558d77(0x10c)][_0x558d77(0x3d3)],Game_Troop[_0x558d77(0x10c)]['setup']=function(_0x235003){const _0x3ac1d1=_0x558d77;VisuMZ[_0x3ac1d1(0x2d3)]['Game_Troop_setup']['call'](this,_0x235003),this['makeCurrentTroopUniqueID']();},Game_Troop['prototype']['makeCurrentTroopUniqueID']=function(){const _0x294554=_0x558d77;this[_0x294554(0x1d5)]=Graphics['frameCount'];},Game_Troop[_0x558d77(0x10c)][_0x558d77(0x392)]=function(){const _0x411637=_0x558d77;return this[_0x411637(0x1d5)]=this[_0x411637(0x1d5)]||Graphics[_0x411637(0x2a0)],this['_currentTroopUniqueID'];},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x224)]=function(){const _0x20789e=_0x558d77;if(ConfigManager[_0x20789e(0x351)]&&ConfigManager[_0x20789e(0x2a4)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x20789e(0x278)]()){if(_0x20789e(0x331)===_0x20789e(0x331))return this['updatedLayoutStyle']()[_0x20789e(0x379)](/LOWER/i);else _0x29e77d[_0x20789e(0x247)](_0x116f41,_0x150480),this[_0x20789e(0x30d)](_0x567e40);}else _0x20789e(0x119)==='RDyEq'?Scene_ItemBase[_0x20789e(0x10c)][_0x20789e(0x1c1)][_0x20789e(0x1a3)](this):(_0x9deb98['prototype']['onEraseBuff'][_0x20789e(0x1a3)](this,_0x3c97fa),this['onEraseBuffGlobalJS'](_0x2d445e));}},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x1c1)]=function(){const _0x16d575=_0x558d77;if(ConfigManager[_0x16d575(0x351)]&&ConfigManager[_0x16d575(0x1dd)]!==undefined)return ConfigManager[_0x16d575(0x1dd)];else return this[_0x16d575(0x278)]()?this[_0x16d575(0x18f)]()[_0x16d575(0x379)](/RIGHT/i):Scene_ItemBase[_0x16d575(0x10c)][_0x16d575(0x1c1)][_0x16d575(0x1a3)](this);},Scene_Skill['prototype']['updatedLayoutStyle']=function(){const _0x1c1d0c=_0x558d77;return VisuMZ[_0x1c1d0c(0x2d3)][_0x1c1d0c(0x343)][_0x1c1d0c(0x2c3)]['LayoutStyle'];},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x3c8)]=function(){const _0x57dee6=_0x558d77;return this[_0x57dee6(0x27e)]&&this['_categoryWindow']['isUseModernControls']();},Scene_Skill['prototype'][_0x558d77(0x278)]=function(){const _0x2a2937=_0x558d77;return VisuMZ['SkillsStatesCore'][_0x2a2937(0x343)][_0x2a2937(0x2c3)][_0x2a2937(0x1d0)];},VisuMZ[_0x558d77(0x2d3)]['Scene_Skill_helpWindowRect']=Scene_Skill['prototype'][_0x558d77(0x28f)],Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x28f)]=function(){const _0x95badd=_0x558d77;if(this[_0x95badd(0x278)]())return this['helpWindowRectSkillsStatesCore']();else{if(_0x95badd(0x1f6)==='eIvbS')return VisuMZ['SkillsStatesCore'][_0x95badd(0x404)][_0x95badd(0x1a3)](this);else{const _0x30a22a=_0x45cb0f(_0x5b526c['$1'])['split'](',')[_0x95badd(0x355)](_0x146765=>_0x146765[_0x95badd(0x2d2)]()),_0x1c684b=_0x42a6e6[_0x95badd(0x2d3)][_0x95badd(0x197)](_0x30a22a);let _0x5e11aa=[this[_0x95badd(0x1aa)]()];return _0x1a50aa[_0x95badd(0x164)]&&this[_0x95badd(0x261)]&&(_0x5e11aa=this['multiclasses']()),_0x1c684b['filter'](_0xec5e00=>_0x5e11aa['includes'](_0xec5e00))[_0x95badd(0x320)]>0x0;}}},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x2f8)]=function(){const _0x1eacb3=_0x558d77,_0x4018ad=0x0,_0x30bc44=this[_0x1eacb3(0x117)](),_0xf87061=Graphics[_0x1eacb3(0x31e)],_0x4e9d16=this[_0x1eacb3(0x17f)]();return new Rectangle(_0x4018ad,_0x30bc44,_0xf87061,_0x4e9d16);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x207)]=Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x216)],Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x216)]=function(){const _0x2ab1fd=_0x558d77;return this[_0x2ab1fd(0x278)]()?this[_0x2ab1fd(0x267)]():VisuMZ[_0x2ab1fd(0x2d3)][_0x2ab1fd(0x207)][_0x2ab1fd(0x1a3)](this);},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x267)]=function(){const _0x11bd0f=_0x558d77,_0x225b6d=this[_0x11bd0f(0x25a)](),_0x2f6716=this[_0x11bd0f(0x17b)](0x3,!![]),_0x9a45f0=this[_0x11bd0f(0x1c1)]()?Graphics[_0x11bd0f(0x31e)]-_0x225b6d:0x0,_0x47da3f=this['mainAreaTop']();return new Rectangle(_0x9a45f0,_0x47da3f,_0x225b6d,_0x2f6716);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x14e)]=Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x12e)],Scene_Skill[_0x558d77(0x10c)]['statusWindowRect']=function(){const _0x2e2ec2=_0x558d77;if(this[_0x2e2ec2(0x278)]())return this['statusWindowRectSkillsStatesCore']();else{if(_0x2e2ec2(0x304)===_0x2e2ec2(0x341))this['setStateRetainType']('recover\x20all'),_0x5408fd[_0x2e2ec2(0x2d3)][_0x2e2ec2(0x157)]['call'](this),this[_0x2e2ec2(0x348)]();else return VisuMZ[_0x2e2ec2(0x2d3)][_0x2e2ec2(0x14e)]['call'](this);}},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x3eb)]=function(){const _0x5c02c7=_0x558d77,_0x2ef28a=Graphics['boxWidth']-this[_0x5c02c7(0x25a)](),_0x491352=this[_0x5c02c7(0x244)][_0x5c02c7(0x35b)],_0x252c1c=this[_0x5c02c7(0x1c1)]()?0x0:Graphics[_0x5c02c7(0x31e)]-_0x2ef28a,_0x1c12e3=this[_0x5c02c7(0x381)]();return new Rectangle(_0x252c1c,_0x1c12e3,_0x2ef28a,_0x491352);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x412)]=Scene_Skill[_0x558d77(0x10c)]['createItemWindow'],Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x2b5)]=function(){const _0x3b49df=_0x558d77;VisuMZ[_0x3b49df(0x2d3)]['Scene_Skill_createItemWindow'][_0x3b49df(0x1a3)](this),this[_0x3b49df(0x102)]()&&this[_0x3b49df(0x111)]();},VisuMZ[_0x558d77(0x2d3)]['Scene_Skill_itemWindowRect']=Scene_Skill['prototype'][_0x558d77(0x17e)],Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x17e)]=function(){const _0x5be4d4=_0x558d77;if(this[_0x5be4d4(0x278)]()){if(_0x5be4d4(0x175)!==_0x5be4d4(0x175))this['drawTextEx'](_0x1cd854,_0x3e04c6['x']+_0x327880[_0x5be4d4(0x136)]-_0x5ed83f,_0x3927a8['y'],_0xca2716);else return this[_0x5be4d4(0x3fc)]();}else{const _0x464eb0=VisuMZ[_0x5be4d4(0x2d3)]['Scene_Skill_itemWindowRect']['call'](this);return this[_0x5be4d4(0x102)]()&&this[_0x5be4d4(0x101)]()&&(_0x464eb0[_0x5be4d4(0x136)]-=this[_0x5be4d4(0x30b)]()),_0x464eb0;}},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x3fc)]=function(){const _0x291854=_0x558d77,_0x29d7d=Graphics[_0x291854(0x31e)]-this['shopStatusWidth'](),_0x58fd46=this[_0x291854(0x312)]()-this[_0x291854(0x193)][_0x291854(0x35b)],_0x13100e=this[_0x291854(0x1c1)]()?Graphics[_0x291854(0x31e)]-_0x29d7d:0x0,_0x14d5bf=this['_statusWindow']['y']+this['_statusWindow'][_0x291854(0x35b)];return new Rectangle(_0x13100e,_0x14d5bf,_0x29d7d,_0x58fd46);},Scene_Skill['prototype'][_0x558d77(0x102)]=function(){const _0x293d0b=_0x558d77;if(!Imported[_0x293d0b(0x308)]){if('QkFUk'!=='ipBwU')return![];else{const _0x5f5110=_0x2ecfc2[_0x293d0b(0x1b9)]['call'](this,_0x30711a);_0x533608['PayJS'][_0x293d0b(0x1a3)](this,_0x2c2bbf,_0x5f5110);}}else{if(this[_0x293d0b(0x278)]()){if('KoItv'!=='KoItv')this[_0x293d0b(0x388)](_0x4b3143),this['onAddStateMakeCustomSlipValues'](_0x4b5886),this[_0x293d0b(0x220)](_0x15b738),this[_0x293d0b(0x184)](_0x7a8708);else return!![];}else return _0x293d0b(0x2bd)==='aNddK'?VisuMZ[_0x293d0b(0x2d3)][_0x293d0b(0x343)]['Skills'][_0x293d0b(0x408)]:new _0x19b237(_0x217465(_0x9f6704['$1']),-0x1f4,-0x1f4);}},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x101)]=function(){const _0x383417=_0x558d77;return VisuMZ[_0x383417(0x2d3)][_0x383417(0x343)][_0x383417(0x2c3)][_0x383417(0x3e9)];},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x111)]=function(){const _0x1f213c=_0x558d77,_0x54f14e=this[_0x1f213c(0x39a)]();this[_0x1f213c(0x152)]=new Window_ShopStatus(_0x54f14e),this[_0x1f213c(0x384)](this[_0x1f213c(0x152)]),this[_0x1f213c(0x14a)][_0x1f213c(0x2c6)](this['_shopStatusWindow']);const _0x69752f=VisuMZ['SkillsStatesCore'][_0x1f213c(0x343)]['Skills'][_0x1f213c(0x36b)];this[_0x1f213c(0x152)][_0x1f213c(0x3a2)](_0x69752f||0x0);},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x39a)]=function(){const _0x456094=_0x558d77;if(this[_0x456094(0x278)]())return this[_0x456094(0x376)]();else{if(_0x456094(0x3c1)==='LKLdr')_0x44c0cf[_0x456094(0x2d3)][_0x456094(0x3ca)]['call'](this,_0x35191b),this[_0x456094(0x200)](_0x5dcf5b);else return VisuMZ[_0x456094(0x2d3)]['Settings']['Skills']['SkillMenuStatusRect'][_0x456094(0x1a3)](this);}},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x376)]=function(){const _0x38d7d5=_0x558d77,_0x17338a=this[_0x38d7d5(0x30b)](),_0x4ecf44=this[_0x38d7d5(0x14a)][_0x38d7d5(0x35b)],_0x30a498=this[_0x38d7d5(0x1c1)]()?0x0:Graphics['boxWidth']-this[_0x38d7d5(0x30b)](),_0xd06a49=this[_0x38d7d5(0x14a)]['y'];return new Rectangle(_0x30a498,_0xd06a49,_0x17338a,_0x4ecf44);},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x30b)]=function(){const _0x3ff813=_0x558d77;if(Imported['VisuMZ_1_ItemsEquipsCore']){if(_0x3ff813(0x1be)===_0x3ff813(0x208)){const _0x57d0e4=_0x405947[_0x3ff813(0x10b)]('['+_0x516390['$1']['match'](/\d+/g)+']');for(const _0x948d93 of _0x57d0e4){if(!_0x93b289[_0x3ff813(0x254)](_0x948d93))return![];}return!![];}else return Scene_Shop[_0x3ff813(0x10c)][_0x3ff813(0x36c)]();}else return 0x0;},Scene_Skill[_0x558d77(0x10c)][_0x558d77(0x252)]=function(){const _0x3022f2=_0x558d77;if(this[_0x3022f2(0x244)]&&this['_skillTypeWindow'][_0x3022f2(0x2eb)]){if('OZOvN'!==_0x3022f2(0x21f)){if(typeof _0x4651ae!==_0x3022f2(0x28d))_0x1b0085=_0x4868eb['id'];this[_0x3022f2(0x377)]=this[_0x3022f2(0x377)]||{},this[_0x3022f2(0x377)][_0xc8ad4c]=_0x39db69;}else return TextManager[_0x3022f2(0x3af)];}else{if('brOmy'===_0x3022f2(0x33b)){const _0x908bf0=_0xf80ac3['SkillsStatesCore']['Game_Actor_skillTypes']['call'](this),_0x295da8=_0x36b108['SkillsStatesCore'][_0x3022f2(0x343)][_0x3022f2(0x2c3)];let _0x47539b=_0x295da8[_0x3022f2(0x201)];return _0x34d0ef['inBattle']()&&(_0x47539b=_0x47539b[_0x3022f2(0x1d6)](_0x295da8['BattleHiddenSkillTypes'])),_0x908bf0[_0x3022f2(0x321)](_0x52853d=>!_0x47539b[_0x3022f2(0x311)](_0x52853d));}else return'';}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x36f)]=Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x1a6)],Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x1a6)]=function(){const _0x17cfe5=_0x558d77;VisuMZ[_0x17cfe5(0x2d3)]['Sprite_Gauge_initMembers'][_0x17cfe5(0x1a3)](this),this[_0x17cfe5(0x132)]=null;},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x365)]=Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x3d3)],Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x3d3)]=function(_0x56bb2c,_0x3823b6){const _0x48eb3a=_0x558d77;this[_0x48eb3a(0x13f)](_0x56bb2c,_0x3823b6),_0x3823b6=_0x3823b6['toLowerCase'](),VisuMZ[_0x48eb3a(0x2d3)][_0x48eb3a(0x365)][_0x48eb3a(0x1a3)](this,_0x56bb2c,_0x3823b6);},Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x13f)]=function(_0x1331c5,_0x21d33b){const _0x1d7bf3=_0x558d77,_0x126349=VisuMZ[_0x1d7bf3(0x2d3)][_0x1d7bf3(0x343)][_0x1d7bf3(0x1b4)][_0x1d7bf3(0x321)](_0x4acf9f=>_0x4acf9f[_0x1d7bf3(0x198)][_0x1d7bf3(0x31d)]()===_0x21d33b[_0x1d7bf3(0x31d)]());if(_0x126349[_0x1d7bf3(0x320)]>=0x1)this['_costSettings']=_0x126349[0x0];else{if(_0x1d7bf3(0x310)===_0x1d7bf3(0x241)){if(!_0x3c3a01[_0x1d7bf3(0x308)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:_0x4e0ea1[_0x1d7bf3(0x2d3)][_0x1d7bf3(0x343)][_0x1d7bf3(0x2c3)][_0x1d7bf3(0x408)];}else this[_0x1d7bf3(0x132)]=null;}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x1cf)]=Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x32a)],Sprite_Gauge[_0x558d77(0x10c)]['currentValue']=function(){const _0x9f910e=_0x558d77;return this[_0x9f910e(0x154)]&&this[_0x9f910e(0x132)]?this[_0x9f910e(0x2d8)]():VisuMZ['SkillsStatesCore'][_0x9f910e(0x1cf)][_0x9f910e(0x1a3)](this);},Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x2d8)]=function(){const _0x327ef2=_0x558d77;return this[_0x327ef2(0x132)]['GaugeCurrentJS'][_0x327ef2(0x1a3)](this[_0x327ef2(0x154)]);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x1d4)]=Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x3d7)],Sprite_Gauge['prototype']['currentMaxValue']=function(){const _0x27d462=_0x558d77;return this[_0x27d462(0x154)]&&this[_0x27d462(0x132)]?this[_0x27d462(0x2b0)]():VisuMZ[_0x27d462(0x2d3)][_0x27d462(0x1d4)][_0x27d462(0x1a3)](this);},Sprite_Gauge[_0x558d77(0x10c)]['currentMaxValueSkillsStatesCore']=function(){const _0x404332=_0x558d77;return this[_0x404332(0x132)][_0x404332(0x32d)][_0x404332(0x1a3)](this[_0x404332(0x154)]);},VisuMZ[_0x558d77(0x2d3)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x277)],Sprite_Gauge['prototype'][_0x558d77(0x277)]=function(){const _0x371ece=_0x558d77,_0x136fd2=VisuMZ[_0x371ece(0x2d3)][_0x371ece(0x1fa)]['call'](this);return _0x136fd2[_0x371ece(0x307)](0x0,0x1);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x3ac)]=Sprite_Gauge['prototype'][_0x558d77(0x11b)],Sprite_Gauge[_0x558d77(0x10c)]['redraw']=function(){const _0xb91d0b=_0x558d77;if(this[_0xb91d0b(0x154)]&&this[_0xb91d0b(0x132)]){if('HXGTy'!==_0xb91d0b(0x1c6)){const _0x119d2e=this[_0xb91d0b(0x228)](_0x2901bf),_0x579abb=this['textSizeEx'](_0x57ab7b)[_0xb91d0b(0x136)];return _0x579abb<=_0x119d2e['width']?'iconText':'icon';}else this['bitmap'][_0xb91d0b(0x295)](),this[_0xb91d0b(0x1ac)]();}else VisuMZ[_0xb91d0b(0x2d3)]['Sprite_Gauge_redraw'][_0xb91d0b(0x1a3)](this);},Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x1a9)]=function(){const _0x365995=_0x558d77;let _0x1b756d=this['currentValue']();return Imported[_0x365995(0x147)]&&this[_0x365995(0x18a)]()&&(_0x1b756d=VisuMZ['GroupDigits'](_0x1b756d)),_0x1b756d;},Sprite_Gauge['prototype'][_0x558d77(0x1ac)]=function(){const _0x3102c3=_0x558d77;this[_0x3102c3(0x132)][_0x3102c3(0x378)][_0x3102c3(0x1a3)](this);},Sprite_Gauge[_0x558d77(0x10c)][_0x558d77(0x1ed)]=function(_0x12e451,_0x1629e6,_0xc5d8c5,_0x3d158d,_0x520287,_0x45ca05){const _0x3e1be9=_0x558d77,_0x361acd=this[_0x3e1be9(0x277)](),_0x1d74a4=Math[_0x3e1be9(0x2e8)]((_0x520287-0x2)*_0x361acd),_0x287d46=_0x45ca05-0x2,_0x515ebb=this[_0x3e1be9(0x144)]();this[_0x3e1be9(0x336)]['fillRect'](_0xc5d8c5,_0x3d158d,_0x520287,_0x45ca05,_0x515ebb),this['bitmap'][_0x3e1be9(0x1e6)](_0xc5d8c5+0x1,_0x3d158d+0x1,_0x1d74a4,_0x287d46,_0x12e451,_0x1629e6);},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x3ab)],Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x3ab)]=function(){const _0x31a35c=_0x558d77;VisuMZ[_0x31a35c(0x2d3)][_0x31a35c(0x316)]['call'](this),this[_0x31a35c(0x298)]();},Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x298)]=function(){const _0x4a124a=_0x558d77,_0x47ccd=Window_Base[_0x4a124a(0x10c)][_0x4a124a(0x3bb)]();this[_0x4a124a(0x150)]=new Sprite(),this['_turnDisplaySprite'][_0x4a124a(0x336)]=new Bitmap(ImageManager[_0x4a124a(0x2fe)],_0x47ccd),this[_0x4a124a(0x150)][_0x4a124a(0x199)]['x']=this[_0x4a124a(0x199)]['x'],this['_turnDisplaySprite'][_0x4a124a(0x199)]['y']=this[_0x4a124a(0x199)]['y'],this[_0x4a124a(0x3fd)](this[_0x4a124a(0x150)]),this[_0x4a124a(0x3cc)]=this['_turnDisplaySprite'][_0x4a124a(0x336)];},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x558d77(0x10c)]['updateFrame'],Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x306)]=function(){const _0x3e5318=_0x558d77;VisuMZ['SkillsStatesCore']['Sprite_StateIcon_updateFrame'][_0x3e5318(0x1a3)](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon['prototype'][_0x558d77(0x1bf)]=function(_0x40377a,_0x12c423,_0x5dfea3,_0x852408,_0x2d96fd){const _0x5cfb54=_0x558d77;this['contents'][_0x5cfb54(0x1bf)](_0x40377a,_0x12c423,_0x5dfea3,_0x852408,this[_0x5cfb54(0x3cc)]['height'],_0x2d96fd);},Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x133)]=function(){const _0x18da99=_0x558d77;this[_0x18da99(0x131)](),this[_0x18da99(0x3cc)][_0x18da99(0x295)]();const _0x46ce4b=this['_battler'];if(!_0x46ce4b)return;const _0x18fdb7=_0x46ce4b[_0x18da99(0x180)]()[_0x18da99(0x321)](_0xd8407f=>_0xd8407f['iconIndex']>0x0),_0x3dffda=[...Array(0x8)['keys']()][_0x18da99(0x321)](_0x3eba38=>_0x46ce4b[_0x18da99(0x3ed)](_0x3eba38)!==0x0),_0xdd49c=this[_0x18da99(0x29b)],_0x4e698d=_0x18fdb7[_0xdd49c];if(_0x4e698d)'grSbE'===_0x18da99(0x173)?(Window_Base[_0x18da99(0x10c)][_0x18da99(0x1a8)][_0x18da99(0x1a3)](this,_0x46ce4b,_0x4e698d,0x0,0x0),Window_Base['prototype'][_0x18da99(0x264)][_0x18da99(0x1a3)](this,_0x46ce4b,_0x4e698d,0x0,0x0)):this[_0x18da99(0x3fb)][_0x305fd9]='#%1'[_0x18da99(0x176)](_0x1c3fc7(_0x1c1804['$1']));else{if(_0x18da99(0x12b)===_0x18da99(0x12b)){const _0x376b9d=_0x3dffda[_0xdd49c-_0x18fdb7[_0x18da99(0x320)]];if(_0x376b9d===undefined)return;Window_Base[_0x18da99(0x10c)]['drawActorBuffTurns'][_0x18da99(0x1a3)](this,_0x46ce4b,_0x376b9d,0x0,0x0),Window_Base[_0x18da99(0x10c)][_0x18da99(0x314)][_0x18da99(0x1a3)](this,_0x46ce4b,_0x376b9d,0x0,0x0);}else{_0x483296[_0x18da99(0x379)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x389dc8=_0xc8bc5f[_0x18da99(0x1cd)](_0x16f0fc(_0x537726['$1'])[_0x18da99(0x31d)]()),_0x312515=_0x5c9b25(_0x210c0f['$2']);_0x389dc8>=0x0&&(_0x1cdfb7[_0x18da99(0x328)](_0x389dc8,_0x312515),this[_0x18da99(0x30d)](_0x478343));}}},Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x131)]=function(){const _0x41dda1=_0x558d77;this[_0x41dda1(0x3cc)][_0x41dda1(0x104)]=$gameSystem[_0x41dda1(0x15b)](),this[_0x41dda1(0x3cc)][_0x41dda1(0x14c)]=$gameSystem[_0x41dda1(0x2f3)](),this[_0x41dda1(0x2ec)]();},Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x2ec)]=function(){const _0x38bdcf=_0x558d77;this[_0x38bdcf(0x260)](ColorManager[_0x38bdcf(0x26e)]()),this['changeOutlineColor'](ColorManager[_0x38bdcf(0x3c3)]());},Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x260)]=function(_0x193fac){const _0x25a385=_0x558d77;this[_0x25a385(0x3cc)][_0x25a385(0x3c7)]=_0x193fac;},Sprite_StateIcon[_0x558d77(0x10c)][_0x558d77(0x291)]=function(_0x496f33){const _0x1ac147=_0x558d77;this['contents'][_0x1ac147(0x3c3)]=_0x496f33;},Sprite_StateIcon['prototype']['hide']=function(){const _0x56360c=_0x558d77;this[_0x56360c(0x2d1)]=!![],this[_0x56360c(0x317)]();},Window_Base['prototype'][_0x558d77(0x15e)]=function(_0x6c9683,_0x4ac074,_0x25e983,_0x417fd1,_0x540cd1){const _0x31e664=_0x558d77,_0x38c363=this['createAllSkillCostText'](_0x6c9683,_0x4ac074),_0x5b6684=this['textSizeEx'](_0x38c363,_0x25e983,_0x417fd1,_0x540cd1),_0x549604=_0x25e983+_0x540cd1-_0x5b6684['width'];this[_0x31e664(0x265)](_0x38c363,_0x549604,_0x417fd1,_0x540cd1),this[_0x31e664(0x131)]();},Window_Base[_0x558d77(0x10c)][_0x558d77(0x2d5)]=function(_0x21d0f6,_0x2b7732){const _0x3b31e2=_0x558d77;let _0x39d285='';for(settings of VisuMZ[_0x3b31e2(0x2d3)]['Settings'][_0x3b31e2(0x1b4)]){if(_0x3b31e2(0x3a1)===_0x3b31e2(0x3e8))for(const _0x53169b of _0x157c93){_0x53169b['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x3970df=_0x16bd98[_0x3b31e2(0x1cd)](_0x2df3e7(_0x16cab9['$1'])[_0x3b31e2(0x31d)]()),_0x34b51f=_0x1b25d5(_0x47f2c0['$2']);_0x3970df>=0x0&&(_0x2dd223[_0x3b31e2(0x328)](_0x3970df,_0x34b51f),this[_0x3b31e2(0x30d)](_0x1a8940));}else{if(!this[_0x3b31e2(0x22c)](_0x21d0f6,_0x2b7732,settings))continue;if(_0x39d285[_0x3b31e2(0x320)]>0x0)_0x39d285+=this[_0x3b31e2(0x35e)]();_0x39d285+=this['createSkillCostText'](_0x21d0f6,_0x2b7732,settings);}}_0x39d285=this[_0x3b31e2(0x2a6)](_0x21d0f6,_0x2b7732,_0x39d285);if(_0x2b7732[_0x3b31e2(0x20b)][_0x3b31e2(0x379)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x39d285[_0x3b31e2(0x320)]>0x0)_0x39d285+=this[_0x3b31e2(0x35e)]();_0x39d285+=String(RegExp['$1']);}return _0x39d285;},Window_Base['prototype'][_0x558d77(0x2a6)]=function(_0x1986a9,_0x54bf07,_0x36cb9d){return _0x36cb9d;},Window_Base[_0x558d77(0x10c)][_0x558d77(0x22c)]=function(_0x406bef,_0x3e1525,_0x83dd2){const _0x18dcef=_0x558d77,_0x2dc4ad=_0x83dd2['CalcJS'][_0x18dcef(0x1a3)](_0x406bef,_0x3e1525);return _0x83dd2['ShowJS'][_0x18dcef(0x1a3)](_0x406bef,_0x3e1525,_0x2dc4ad,_0x83dd2);},Window_Base[_0x558d77(0x10c)]['createSkillCostText']=function(_0x4f7e37,_0x45e029,_0x3ad12a){const _0x6cc6a2=_0x558d77,_0x24d586=_0x3ad12a[_0x6cc6a2(0x1b9)][_0x6cc6a2(0x1a3)](_0x4f7e37,_0x45e029);return _0x3ad12a[_0x6cc6a2(0x387)]['call'](_0x4f7e37,_0x45e029,_0x24d586,_0x3ad12a);},Window_Base[_0x558d77(0x10c)][_0x558d77(0x35e)]=function(){return'\x20';},Window_Base[_0x558d77(0x10c)][_0x558d77(0x135)]=function(_0x26c2f6,_0x2219ab,_0x43599e,_0x34a2c6){const _0x5f56b8=_0x558d77;if(!_0x26c2f6)return;VisuMZ[_0x5f56b8(0x2d3)][_0x5f56b8(0x170)][_0x5f56b8(0x1a3)](this,_0x26c2f6,_0x2219ab,_0x43599e,_0x34a2c6),this['drawActorIconsAllTurnCounters'](_0x26c2f6,_0x2219ab,_0x43599e,_0x34a2c6);},Window_Base[_0x558d77(0x10c)][_0x558d77(0x149)]=function(_0x2f1935,_0x1bfc54,_0x54f528,_0x455f36){const _0xf24fbb=_0x558d77;_0x455f36=_0x455f36||0x90;const _0x571e7a=ImageManager[_0xf24fbb(0x2fe)],_0x379865=_0x2f1935[_0xf24fbb(0x18e)]()[_0xf24fbb(0x21e)](0x0,Math[_0xf24fbb(0x2e8)](_0x455f36/_0x571e7a)),_0x5863b4=_0x2f1935[_0xf24fbb(0x180)]()[_0xf24fbb(0x321)](_0x5c33b8=>_0x5c33b8[_0xf24fbb(0x2d4)]>0x0),_0x1ab932=[...Array(0x8)['keys']()][_0xf24fbb(0x321)](_0x139404=>_0x2f1935[_0xf24fbb(0x3ed)](_0x139404)!==0x0),_0x4adcaa=[];let _0x140d61=_0x1bfc54;for(let _0x226bbe=0x0;_0x226bbe<_0x379865[_0xf24fbb(0x320)];_0x226bbe++){this[_0xf24fbb(0x131)]();const _0x4b1480=_0x5863b4[_0x226bbe];if(_0x4b1480)!_0x4adcaa[_0xf24fbb(0x311)](_0x4b1480)&&('ZZMqa'!==_0xf24fbb(0x346)?this['drawActorStateTurns'](_0x2f1935,_0x4b1480,_0x140d61,_0x54f528):(_0x46d66d['addBuffTurns'](_0x33c920,_0x5e8857),this[_0xf24fbb(0x30d)](_0x13fcbb))),this[_0xf24fbb(0x264)](_0x2f1935,_0x4b1480,_0x140d61,_0x54f528),_0x4adcaa[_0xf24fbb(0x287)](_0x4b1480);else{const _0x5d6079=_0x1ab932[_0x226bbe-_0x5863b4[_0xf24fbb(0x320)]];this['drawActorBuffTurns'](_0x2f1935,_0x5d6079,_0x140d61,_0x54f528),this[_0xf24fbb(0x314)](_0x2f1935,_0x5d6079,_0x140d61,_0x54f528);}_0x140d61+=_0x571e7a;}},Window_Base[_0x558d77(0x10c)][_0x558d77(0x1a8)]=function(_0x1926a7,_0x4edcfd,_0x43f923,_0x4fa51c){const _0x2fb9c7=_0x558d77;if(!VisuMZ[_0x2fb9c7(0x2d3)][_0x2fb9c7(0x343)]['States'][_0x2fb9c7(0x319)])return;if(!_0x1926a7[_0x2fb9c7(0x358)](_0x4edcfd['id']))return;if(_0x4edcfd[_0x2fb9c7(0x108)]===0x0)return;if(_0x4edcfd[_0x2fb9c7(0x20b)][_0x2fb9c7(0x379)](/<HIDE STATE TURNS>/i))return;const _0x258a1e=_0x1926a7['stateTurns'](_0x4edcfd['id']),_0x932c75=ImageManager['iconWidth'],_0x477653=ColorManager[_0x2fb9c7(0x2b9)](_0x4edcfd);this[_0x2fb9c7(0x260)](_0x477653),this[_0x2fb9c7(0x291)](_0x2fb9c7(0x134)),this[_0x2fb9c7(0x3cc)]['fontBold']=!![],this[_0x2fb9c7(0x3cc)][_0x2fb9c7(0x14c)]=VisuMZ[_0x2fb9c7(0x2d3)][_0x2fb9c7(0x343)][_0x2fb9c7(0x396)]['TurnFontSize'],_0x43f923+=VisuMZ['SkillsStatesCore'][_0x2fb9c7(0x343)]['States'][_0x2fb9c7(0x31f)],_0x4fa51c+=VisuMZ['SkillsStatesCore'][_0x2fb9c7(0x343)][_0x2fb9c7(0x396)][_0x2fb9c7(0x2ba)],this[_0x2fb9c7(0x1bf)](_0x258a1e,_0x43f923,_0x4fa51c,_0x932c75,_0x2fb9c7(0x411)),this[_0x2fb9c7(0x3cc)][_0x2fb9c7(0x232)]=![],this[_0x2fb9c7(0x131)]();},Window_Base[_0x558d77(0x10c)]['drawActorStateData']=function(_0x55b857,_0x39e8f8,_0x19664c,_0x4562dc){const _0x55fcdb=_0x558d77;if(!VisuMZ[_0x55fcdb(0x2d3)][_0x55fcdb(0x343)][_0x55fcdb(0x396)][_0x55fcdb(0x273)])return;const _0x4969d5=ImageManager[_0x55fcdb(0x2fe)],_0x413ee3=ImageManager[_0x55fcdb(0x206)]/0x2,_0x4fd9c=ColorManager['normalColor']();this[_0x55fcdb(0x260)](_0x4fd9c),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x55fcdb(0x232)]=!![],this[_0x55fcdb(0x3cc)][_0x55fcdb(0x14c)]=VisuMZ[_0x55fcdb(0x2d3)][_0x55fcdb(0x343)][_0x55fcdb(0x396)][_0x55fcdb(0x1f7)],_0x19664c+=VisuMZ[_0x55fcdb(0x2d3)][_0x55fcdb(0x343)][_0x55fcdb(0x396)][_0x55fcdb(0x249)],_0x4562dc+=VisuMZ[_0x55fcdb(0x2d3)][_0x55fcdb(0x343)][_0x55fcdb(0x396)][_0x55fcdb(0x1b7)];const _0x1bb745=String(_0x55b857['getStateDisplay'](_0x39e8f8['id']));this[_0x55fcdb(0x1bf)](_0x1bb745,_0x19664c,_0x4562dc,_0x4969d5,_0x55fcdb(0x1e2)),this['contents'][_0x55fcdb(0x232)]=![],this['resetFontSettings']();},Window_Base[_0x558d77(0x10c)][_0x558d77(0x13c)]=function(_0x591848,_0x17112d,_0x410119,_0x30876e){const _0x598beb=_0x558d77;if(!VisuMZ[_0x598beb(0x2d3)][_0x598beb(0x343)][_0x598beb(0x1e8)][_0x598beb(0x319)])return;const _0x3f4415=_0x591848[_0x598beb(0x3ed)](_0x17112d);if(_0x3f4415===0x0)return;const _0x6d2b53=_0x591848[_0x598beb(0x1f1)](_0x17112d),_0x35bdd8=ImageManager[_0x598beb(0x2fe)],_0x5ac97c=_0x3f4415>0x0?ColorManager[_0x598beb(0x2a3)]():ColorManager[_0x598beb(0x3d0)]();this[_0x598beb(0x260)](_0x5ac97c),this[_0x598beb(0x291)](_0x598beb(0x134)),this[_0x598beb(0x3cc)][_0x598beb(0x232)]=!![],this['contents'][_0x598beb(0x14c)]=VisuMZ[_0x598beb(0x2d3)][_0x598beb(0x343)][_0x598beb(0x1e8)][_0x598beb(0x1f2)],_0x410119+=VisuMZ[_0x598beb(0x2d3)][_0x598beb(0x343)]['Buffs'][_0x598beb(0x31f)],_0x30876e+=VisuMZ[_0x598beb(0x2d3)]['Settings']['Buffs'][_0x598beb(0x2ba)],this[_0x598beb(0x1bf)](_0x6d2b53,_0x410119,_0x30876e,_0x35bdd8,'right'),this[_0x598beb(0x3cc)][_0x598beb(0x232)]=![],this[_0x598beb(0x131)]();},Window_Base[_0x558d77(0x10c)][_0x558d77(0x314)]=function(_0x468309,_0x3e1ab5,_0x8141dc,_0x4ca709){const _0x1b8c2f=_0x558d77;if(!VisuMZ[_0x1b8c2f(0x2d3)]['Settings'][_0x1b8c2f(0x1e8)][_0x1b8c2f(0x273)])return;const _0x2f64f4=_0x468309[_0x1b8c2f(0x1c0)](_0x3e1ab5),_0x2b6c00=_0x468309[_0x1b8c2f(0x3ed)](_0x3e1ab5),_0x2607dc=ImageManager[_0x1b8c2f(0x2fe)],_0x565df2=ImageManager[_0x1b8c2f(0x206)]/0x2,_0x59a665=_0x2b6c00>0x0?ColorManager['buffColor']():ColorManager[_0x1b8c2f(0x3d0)]();this[_0x1b8c2f(0x260)](_0x59a665),this[_0x1b8c2f(0x291)](_0x1b8c2f(0x134)),this['contents']['fontBold']=!![],this[_0x1b8c2f(0x3cc)]['fontSize']=VisuMZ['SkillsStatesCore'][_0x1b8c2f(0x343)][_0x1b8c2f(0x1e8)][_0x1b8c2f(0x1f7)],_0x8141dc+=VisuMZ['SkillsStatesCore']['Settings'][_0x1b8c2f(0x1e8)]['DataOffsetX'],_0x4ca709+=VisuMZ[_0x1b8c2f(0x2d3)][_0x1b8c2f(0x343)][_0x1b8c2f(0x1e8)]['DataOffsetY'];const _0x5dab4c='%1%'[_0x1b8c2f(0x176)](Math[_0x1b8c2f(0x25b)](_0x2f64f4*0x64));this[_0x1b8c2f(0x1bf)](_0x5dab4c,_0x8141dc,_0x4ca709,_0x2607dc,'center'),this['contents'][_0x1b8c2f(0x232)]=![],this[_0x1b8c2f(0x131)]();},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x196)]=Window_StatusBase[_0x558d77(0x10c)]['placeGauge'],Window_StatusBase[_0x558d77(0x10c)][_0x558d77(0x1ce)]=function(_0x133a2e,_0x4b28c8,_0x1a06db,_0x6e775b){const _0x1ff1e3=_0x558d77;if(_0x133a2e[_0x1ff1e3(0x3d9)]())_0x4b28c8=this[_0x1ff1e3(0x11a)](_0x133a2e,_0x4b28c8);this[_0x1ff1e3(0x3d4)](_0x133a2e,_0x4b28c8,_0x1a06db,_0x6e775b);},Window_StatusBase[_0x558d77(0x10c)]['placeExactGauge']=function(_0x4e27cf,_0x456b77,_0x36a106,_0x549793){const _0x1a753e=_0x558d77;if([_0x1a753e(0x1e7),_0x1a753e(0x415)]['includes'](_0x456b77[_0x1a753e(0x1da)]()))return;VisuMZ[_0x1a753e(0x2d3)][_0x1a753e(0x196)][_0x1a753e(0x1a3)](this,_0x4e27cf,_0x456b77,_0x36a106,_0x549793);},Window_StatusBase[_0x558d77(0x10c)]['convertGaugeTypeSkillsStatesCore']=function(_0x54ca56,_0x46b85b){const _0x4d00fb=_0x558d77,_0x2e5aae=_0x54ca56['currentClass']()[_0x4d00fb(0x20b)];if(_0x46b85b==='hp'&&_0x2e5aae[_0x4d00fb(0x379)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x46b85b==='mp'&&_0x2e5aae[_0x4d00fb(0x379)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x4d00fb(0x24c)!==_0x4d00fb(0x24c)){if(typeof _0x412548!==_0x4d00fb(0x28d))_0x974538=_0x343b39['id'];if(this[_0x4d00fb(0x358)](_0x361916)){const _0x42afb9=_0x52e32a[_0x4d00fb(0x1dc)](_0xd78ec0);this['_stateTurns'][_0x3f188c]=_0x2c0d09[_0x4d00fb(0x307)](0x0,_0x42afb9);if(this['_stateTurns'][_0x2e0955]<=0x0)this[_0x4d00fb(0x23d)](_0x3667a0);}}else return String(RegExp['$1']);}else{if(_0x46b85b==='tp'&&_0x2e5aae[_0x4d00fb(0x379)](/<REPLACE TP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if('PPrJk'!==_0x4d00fb(0x3d2)){const _0x3a9db1=this[_0x4d00fb(0x186)](_0x1f908d);this[_0x4d00fb(0x2e5)](_0x3a9db1,_0x4d00fb(0x361),!![],_0x3ac9c0);}else return _0x46b85b;}}}},VisuMZ[_0x558d77(0x2d3)]['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x558d77(0x10c)][_0x558d77(0x135)],Window_StatusBase['prototype'][_0x558d77(0x135)]=function(_0x5eef99,_0x3ce55b,_0x264102,_0x4d5e06){const _0x5f4448=_0x558d77;if(!_0x5eef99)return;Window_Base[_0x5f4448(0x10c)][_0x5f4448(0x135)][_0x5f4448(0x1a3)](this,_0x5eef99,_0x3ce55b,_0x264102,_0x4d5e06);},VisuMZ['SkillsStatesCore'][_0x558d77(0x3ca)]=Window_SkillType['prototype'][_0x558d77(0x345)],Window_SkillType[_0x558d77(0x10c)][_0x558d77(0x345)]=function(_0x1b082f){const _0x17b247=_0x558d77;VisuMZ[_0x17b247(0x2d3)][_0x17b247(0x3ca)][_0x17b247(0x1a3)](this,_0x1b082f),this['createCommandNameWindow'](_0x1b082f);},Window_SkillType['prototype'][_0x558d77(0x200)]=function(_0x3979ab){const _0x273bec=_0x558d77,_0xba0251=new Rectangle(0x0,0x0,_0x3979ab['width'],_0x3979ab[_0x273bec(0x35b)]);this[_0x273bec(0x38e)]=new Window_Base(_0xba0251),this['_commandNameWindow']['opacity']=0x0,this[_0x273bec(0x3fd)](this['_commandNameWindow']),this[_0x273bec(0x3aa)]();},Window_SkillType['prototype']['callUpdateHelp']=function(){const _0x37d05d=_0x558d77;Window_Command[_0x37d05d(0x10c)][_0x37d05d(0x234)][_0x37d05d(0x1a3)](this);if(this[_0x37d05d(0x38e)])this[_0x37d05d(0x3aa)]();},Window_SkillType[_0x558d77(0x10c)][_0x558d77(0x3aa)]=function(){const _0x2f0e65=_0x558d77,_0x5bded9=this[_0x2f0e65(0x38e)];_0x5bded9[_0x2f0e65(0x3cc)][_0x2f0e65(0x295)]();const _0x2880fb=this[_0x2f0e65(0x2e7)](this['index']());if(_0x2880fb==='icon'&&this['maxItems']()>0x0){if(_0x2f0e65(0x162)!=='InMug'){const _0x5c63ac=this[_0x2f0e65(0x228)](this[_0x2f0e65(0x217)]());let _0x15d17f=this['commandName'](this[_0x2f0e65(0x217)]());_0x15d17f=_0x15d17f['replace'](/\\I\[(\d+)\]/gi,''),_0x5bded9['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x15d17f,_0x5c63ac),this[_0x2f0e65(0x156)](_0x15d17f,_0x5c63ac),this['commandNameWindowCenter'](_0x15d17f,_0x5c63ac);}else this[_0x2f0e65(0x382)](_0x5f1784),this[_0x2f0e65(0x350)](_0x5f77cd),this['clearStateOrigin'](_0x582c3e);}},Window_SkillType[_0x558d77(0x10c)][_0x558d77(0x29d)]=function(_0x533b3b,_0x35b334){},Window_SkillType['prototype'][_0x558d77(0x156)]=function(_0x383e75,_0x38a906){const _0x183fef=_0x558d77,_0x57684f=this[_0x183fef(0x38e)];_0x57684f['drawText'](_0x383e75,0x0,_0x38a906['y'],_0x57684f['innerWidth'],'center');},Window_SkillType['prototype'][_0x558d77(0x188)]=function(_0x2bb304,_0x4ebadb){const _0x491c7d=_0x558d77,_0x536a3f=this[_0x491c7d(0x38e)],_0x21004d=$gameSystem[_0x491c7d(0x122)](),_0x325a57=_0x4ebadb['x']+Math[_0x491c7d(0x2e8)](_0x4ebadb[_0x491c7d(0x136)]/0x2)+_0x21004d;_0x536a3f['x']=_0x536a3f[_0x491c7d(0x136)]/-0x2+_0x325a57,_0x536a3f['y']=Math[_0x491c7d(0x2e8)](_0x4ebadb[_0x491c7d(0x35b)]/0x2);},Window_SkillType[_0x558d77(0x10c)][_0x558d77(0x3c8)]=function(){const _0x10162e=_0x558d77;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x10162e(0x10c)]['isUseModernControls']['call'](this);},Window_SkillType['prototype'][_0x558d77(0x401)]=function(){const _0x2a7df3=_0x558d77;if(!this['_actor'])return;const _0x176fcc=this['_actor']['skillTypes']();for(const _0x595a5c of _0x176fcc){if('MJHrm'===_0x2a7df3(0x36e)){const _0x316871=this[_0x2a7df3(0x186)](_0x595a5c);this['addCommand'](_0x316871,_0x2a7df3(0x361),!![],_0x595a5c);}else{if(this[_0x2a7df3(0x2f2)]===_0x426aab)return;this['_stypeId']=_0x18727b,this[_0x2a7df3(0x1d7)](),this[_0x2a7df3(0x25e)](0x0,0x0),this['_statusWindow']&&this[_0x2a7df3(0x193)]['constructor']===_0x4108c5&&this[_0x2a7df3(0x193)][_0x2a7df3(0x274)](this[_0x2a7df3(0x1ab)](0x0));}}},Window_SkillType['prototype'][_0x558d77(0x186)]=function(_0x5c28e5){const _0x5ba402=_0x558d77;let _0x3b2889=$dataSystem['skillTypes'][_0x5c28e5];if(_0x3b2889['match'](/\\I\[(\d+)\]/i))return _0x3b2889;if(this[_0x5ba402(0x3be)]()===_0x5ba402(0x185))return _0x3b2889;const _0x459691=VisuMZ[_0x5ba402(0x2d3)][_0x5ba402(0x343)][_0x5ba402(0x2c3)],_0x3aeeaa=$dataSystem['magicSkills'][_0x5ba402(0x311)](_0x5c28e5),_0x27a609=_0x3aeeaa?_0x459691[_0x5ba402(0x318)]:_0x459691[_0x5ba402(0x202)];return _0x5ba402(0x10a)[_0x5ba402(0x176)](_0x27a609,_0x3b2889);},Window_SkillType[_0x558d77(0x10c)][_0x558d77(0x300)]=function(){const _0x244539=_0x558d77;return VisuMZ['SkillsStatesCore'][_0x244539(0x343)][_0x244539(0x2c3)][_0x244539(0x327)];},Window_SkillType[_0x558d77(0x10c)]['drawItem']=function(_0xd4464b){const _0x22d49f=_0x558d77,_0x3ac109=this[_0x22d49f(0x2e7)](_0xd4464b);if(_0x3ac109===_0x22d49f(0x268))this[_0x22d49f(0x1eb)](_0xd4464b);else{if(_0x3ac109===_0x22d49f(0x2ac))this[_0x22d49f(0x296)](_0xd4464b);else{if(_0x22d49f(0x309)!==_0x22d49f(0x203))Window_Command[_0x22d49f(0x10c)]['drawItem'][_0x22d49f(0x1a3)](this,_0xd4464b);else return this[_0x22d49f(0x14b)](_0x28861b)>0x0;}}},Window_SkillType[_0x558d77(0x10c)]['commandStyle']=function(){const _0x299275=_0x558d77;return VisuMZ[_0x299275(0x2d3)][_0x299275(0x343)]['Skills'][_0x299275(0x354)];},Window_SkillType[_0x558d77(0x10c)][_0x558d77(0x2e7)]=function(_0x2438d0){const _0x3e8e84=_0x558d77;if(_0x2438d0<0x0)return'text';const _0x5e4dff=this['commandStyle']();if(_0x5e4dff!==_0x3e8e84(0x231))return _0x5e4dff;else{if(this['maxItems']()>0x0){const _0x450f8e=this['commandName'](_0x2438d0);if(_0x450f8e[_0x3e8e84(0x379)](/\\I\[(\d+)\]/i)){if(_0x3e8e84(0x2f9)!==_0x3e8e84(0x115)){const _0x8273e8=this[_0x3e8e84(0x228)](_0x2438d0),_0x4d9f56=this['textSizeEx'](_0x450f8e)[_0x3e8e84(0x136)];if(_0x4d9f56<=_0x8273e8['width'])return'iconText';else{if(_0x3e8e84(0x403)!==_0x3e8e84(0x403)){const _0x2d1ef1=_0x2f4b9c[_0xde0ee4];if(_0x2d1ef1&&_0x2d1ef1[_0x3e8e84(0x103)]['length']>0x0)for(const _0x2eb8df of _0x2d1ef1['categories']){if(this[_0x3e8e84(0x34a)](_0x2eb8df))return!![];}return _0x5e3fbb[_0x3e8e84(0x2d3)][_0x3e8e84(0x205)]['call'](this,_0x5f5570);}else return _0x3e8e84(0x2ac);}}else{const _0x5b8309=_0x3d3a96[_0x3e8e84(0x1dc)](_0x3b2429);this[_0x3e8e84(0x334)][_0x948337]=_0x15a8f7[_0x3e8e84(0x307)](0x0,_0x5b8309);if(this[_0x3e8e84(0x334)][_0x5da46f]<=0x0)this[_0x3e8e84(0x23d)](_0x1dc22e);}}}}return _0x3e8e84(0x185);},Window_SkillType[_0x558d77(0x10c)]['drawItemStyleIconText']=function(_0x3af451){const _0x4f499e=_0x558d77,_0x56e29d=this[_0x4f499e(0x228)](_0x3af451),_0x36ad97=this[_0x4f499e(0x367)](_0x3af451),_0x2d286d=this[_0x4f499e(0x3ef)](_0x36ad97)[_0x4f499e(0x136)];this[_0x4f499e(0x23c)](this[_0x4f499e(0x1ae)](_0x3af451));const _0x5a4dbf=this['itemTextAlign']();if(_0x5a4dbf===_0x4f499e(0x411))this['drawTextEx'](_0x36ad97,_0x56e29d['x']+_0x56e29d[_0x4f499e(0x136)]-_0x2d286d,_0x56e29d['y'],_0x2d286d);else{if(_0x5a4dbf==='center'){const _0x121353=_0x56e29d['x']+Math[_0x4f499e(0x2e8)]((_0x56e29d[_0x4f499e(0x136)]-_0x2d286d)/0x2);this[_0x4f499e(0x265)](_0x36ad97,_0x121353,_0x56e29d['y'],_0x2d286d);}else this[_0x4f499e(0x265)](_0x36ad97,_0x56e29d['x'],_0x56e29d['y'],_0x2d286d);}},Window_SkillType['prototype'][_0x558d77(0x296)]=function(_0x1b96ad){const _0x43b66d=_0x558d77;this[_0x43b66d(0x367)](_0x1b96ad)['match'](/\\I\[(\d+)\]/i);const _0x226a85=Number(RegExp['$1'])||0x0,_0x35ea0f=this['itemLineRect'](_0x1b96ad),_0x4b7d72=_0x35ea0f['x']+Math[_0x43b66d(0x2e8)]((_0x35ea0f[_0x43b66d(0x136)]-ImageManager['iconWidth'])/0x2),_0x1f86df=_0x35ea0f['y']+(_0x35ea0f[_0x43b66d(0x35b)]-ImageManager[_0x43b66d(0x206)])/0x2;this[_0x43b66d(0x397)](_0x226a85,_0x4b7d72,_0x1f86df);},VisuMZ[_0x558d77(0x2d3)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x558d77(0x10c)][_0x558d77(0x1d7)],Window_SkillStatus['prototype']['refresh']=function(){const _0xa7e683=_0x558d77;VisuMZ['SkillsStatesCore'][_0xa7e683(0x29c)][_0xa7e683(0x1a3)](this);if(this[_0xa7e683(0x323)])this[_0xa7e683(0x266)]();},Window_SkillStatus[_0x558d77(0x10c)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x3becf6=_0x558d77;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x5d442a=this[_0x3becf6(0x179)]();let _0x21ea0b=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x28b310=this[_0x3becf6(0x2e1)]-_0x21ea0b-0x2;if(_0x28b310>=0x12c){const _0x15ddc6=VisuMZ[_0x3becf6(0x3f0)][_0x3becf6(0x343)][_0x3becf6(0x2ad)][_0x3becf6(0x37e)],_0x39fdfc=Math['floor'](_0x28b310/0x2)-0x18;let _0x28b329=_0x21ea0b,_0x268234=Math['floor']((this[_0x3becf6(0x22d)]-Math[_0x3becf6(0x333)](_0x15ddc6['length']/0x2)*_0x5d442a)/0x2),_0x4aad9f=0x0;for(const _0x4ef36e of _0x15ddc6){this['drawExtendedParameter'](_0x28b329,_0x268234,_0x39fdfc,_0x4ef36e),_0x4aad9f++,_0x4aad9f%0x2===0x0?(_0x28b329=_0x21ea0b,_0x268234+=_0x5d442a):_0x28b329+=_0x39fdfc+0x18;}}this['resetFontSettings']();},Window_SkillStatus[_0x558d77(0x10c)][_0x558d77(0x2dd)]=function(_0x5e1bbf,_0x3f82a8,_0x1602cb,_0x205b9c){const _0x12fa0b=_0x558d77,_0x23e9b0=this[_0x12fa0b(0x179)]();this[_0x12fa0b(0x131)](),this[_0x12fa0b(0x1fe)](_0x5e1bbf,_0x3f82a8,_0x1602cb,_0x205b9c,!![]),this[_0x12fa0b(0x2ec)](),this[_0x12fa0b(0x3cc)]['fontSize']-=0x8;const _0x478909=this[_0x12fa0b(0x323)]['paramValueByName'](_0x205b9c,!![]);this[_0x12fa0b(0x3cc)][_0x12fa0b(0x1bf)](_0x478909,_0x5e1bbf,_0x3f82a8,_0x1602cb,_0x23e9b0,_0x12fa0b(0x411));},VisuMZ[_0x558d77(0x2d3)]['Window_SkillList_includes']=Window_SkillList[_0x558d77(0x10c)][_0x558d77(0x311)],Window_SkillList[_0x558d77(0x10c)]['includes']=function(_0x57db1e){const _0x35c04c=_0x558d77;return this[_0x35c04c(0x3f5)](_0x57db1e);},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x2c0)]=Window_SkillList[_0x558d77(0x10c)]['maxCols'],Window_SkillList[_0x558d77(0x10c)][_0x558d77(0x33e)]=function(){const _0x431c23=_0x558d77;return SceneManager[_0x431c23(0x1ef)][_0x431c23(0x391)]===Scene_Battle?VisuMZ['SkillsStatesCore']['Window_SkillList_maxCols'][_0x431c23(0x1a3)](this):VisuMZ[_0x431c23(0x2d3)]['Settings'][_0x431c23(0x2c3)][_0x431c23(0x2b6)];},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x1c8)]=Window_SkillList['prototype'][_0x558d77(0x335)],Window_SkillList[_0x558d77(0x10c)]['setActor']=function(_0x5c68ff){const _0x2ce378=_0x558d77,_0x41e4e9=this[_0x2ce378(0x323)]!==_0x5c68ff;VisuMZ['SkillsStatesCore'][_0x2ce378(0x1c8)][_0x2ce378(0x1a3)](this,_0x5c68ff);if(_0x41e4e9){if(this[_0x2ce378(0x193)]&&this[_0x2ce378(0x193)][_0x2ce378(0x391)]===Window_ShopStatus){if(_0x2ce378(0x21b)===_0x2ce378(0x21b))this[_0x2ce378(0x193)][_0x2ce378(0x274)](this[_0x2ce378(0x1ab)](0x0));else{this['commandName'](_0x7cd976)[_0x2ce378(0x379)](/\\I\[(\d+)\]/i);const _0x30f1e4=_0x15f353(_0x202077['$1'])||0x0,_0x538ed3=this[_0x2ce378(0x228)](_0x324b8c),_0x2a35ab=_0x538ed3['x']+_0x2b4dc6[_0x2ce378(0x2e8)]((_0x538ed3[_0x2ce378(0x136)]-_0x5cd5e3['iconWidth'])/0x2),_0x9196d3=_0x538ed3['y']+(_0x538ed3[_0x2ce378(0x35b)]-_0x558d89[_0x2ce378(0x206)])/0x2;this[_0x2ce378(0x397)](_0x30f1e4,_0x2a35ab,_0x9196d3);}}}},Window_SkillList[_0x558d77(0x10c)][_0x558d77(0x223)]=function(_0x3656f4){const _0x43b91d=_0x558d77;if(this[_0x43b91d(0x2f2)]===_0x3656f4)return;this[_0x43b91d(0x2f2)]=_0x3656f4,this[_0x43b91d(0x1d7)](),this[_0x43b91d(0x25e)](0x0,0x0);if(this[_0x43b91d(0x193)]&&this['_statusWindow'][_0x43b91d(0x391)]===Window_ShopStatus){if('ergXS'==='ergXS')this[_0x43b91d(0x193)][_0x43b91d(0x274)](this[_0x43b91d(0x1ab)](0x0));else return _0x43b91d(0x2ac);}},Window_SkillList[_0x558d77(0x10c)][_0x558d77(0x3f5)]=function(_0xddaa4b){const _0x3489ab=_0x558d77;if(!_0xddaa4b)return VisuMZ[_0x3489ab(0x2d3)]['Window_SkillList_includes'][_0x3489ab(0x1a3)](this,_0xddaa4b);if(!this['checkSkillTypeMatch'](_0xddaa4b))return![];if(!this['checkShowHideNotetags'](_0xddaa4b))return![];if(!this[_0x3489ab(0x1ec)](_0xddaa4b))return![];return!![];},Window_SkillList[_0x558d77(0x10c)]['checkSkillTypeMatch']=function(_0x1296e7){const _0x37d419=_0x558d77;return DataManager[_0x37d419(0x123)](_0x1296e7)['includes'](this['_stypeId']);},Window_SkillList['prototype'][_0x558d77(0x418)]=function(_0x340013){const _0x524233=_0x558d77;if(!VisuMZ[_0x524233(0x2d3)]['CheckVisibleBattleNotetags'](this[_0x524233(0x323)],_0x340013))return![];if(!VisuMZ['SkillsStatesCore'][_0x524233(0x32c)](this['_actor'],_0x340013))return![];if(!VisuMZ[_0x524233(0x2d3)][_0x524233(0x22a)](this['_actor'],_0x340013))return![];return!![];},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x255)]=function(_0x1f712d,_0x4802ba){const _0x3c1ee9=_0x558d77,_0x24d687=_0x4802ba['note'];if(_0x24d687[_0x3c1ee9(0x379)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x3c1ee9(0x26c)]())return![];else{if(_0x24d687[_0x3c1ee9(0x379)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']())return'sFLHE'!=='XCNDN'?![]:_0x129689[_0x3c1ee9(0x308)]?_0x275222['prototype'][_0x3c1ee9(0x36c)]():0x0;else{if(_0x3c1ee9(0x1db)!==_0x3c1ee9(0x2ae))return!![];else this[_0x3c1ee9(0x2f5)](_0xb38742,_0x48560f);}}},VisuMZ[_0x558d77(0x2d3)][_0x558d77(0x32c)]=function(_0x2dea42,_0x58fa2f){const _0x97d0ce=_0x558d77,_0x597fcc=_0x58fa2f[_0x97d0ce(0x20b)];if(_0x597fcc[_0x97d0ce(0x379)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd5fa51=JSON[_0x97d0ce(0x10b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3fc3be of _0xd5fa51){if(_0x97d0ce(0x11d)==='JrTgk')return![];else{if(!$gameSwitches[_0x97d0ce(0x18d)](_0x3fc3be))return![];}}return!![];}if(_0x597fcc[_0x97d0ce(0x379)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56f497=JSON[_0x97d0ce(0x10b)]('['+RegExp['$1'][_0x97d0ce(0x379)](/\d+/g)+']');for(const _0x1ee48f of _0x56f497){if(!$gameSwitches[_0x97d0ce(0x18d)](_0x1ee48f))return![];}return!![];}if(_0x597fcc['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x97d0ce(0x127)!==_0x97d0ce(0x1cb)){const _0x2ce9a5=JSON[_0x97d0ce(0x10b)]('['+RegExp['$1'][_0x97d0ce(0x379)](/\d+/g)+']');for(const _0x12d223 of _0x2ce9a5){if($gameSwitches[_0x97d0ce(0x18d)](_0x12d223))return!![];}return![];}else _0x30eb64[_0x97d0ce(0x2d3)][_0x97d0ce(0x343)]['States'][_0x97d0ce(0x39e)][_0x97d0ce(0x1a3)](this,_0x12131f);}if(_0x597fcc['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc9be6b=JSON['parse']('['+RegExp['$1'][_0x97d0ce(0x379)](/\d+/g)+']');for(const _0x3e3481 of _0xc9be6b){if(!$gameSwitches['value'](_0x3e3481))return!![];}return![];}if(_0x597fcc[_0x97d0ce(0x379)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x97d0ce(0x3cb)===_0x97d0ce(0x13b))_0x4c3989[_0x97d0ce(0x2d3)]['Game_Actor_forgetSkill']['call'](this,_0x30a8f0),this[_0x97d0ce(0x2c1)]={};else{const _0x50da4a=JSON[_0x97d0ce(0x10b)]('['+RegExp['$1'][_0x97d0ce(0x379)](/\d+/g)+']');for(const _0x3b1856 of _0x50da4a){if(!$gameSwitches[_0x97d0ce(0x18d)](_0x3b1856))return!![];}return![];}}if(_0x597fcc['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3423ce=JSON['parse']('['+RegExp['$1'][_0x97d0ce(0x379)](/\d+/g)+']');for(const _0x3ddba3 of _0x3423ce){if($gameSwitches[_0x97d0ce(0x18d)](_0x3ddba3))return![];}return!![];}return!![];},VisuMZ['SkillsStatesCore'][_0x558d77(0x22a)]=function(_0x4e5608,_0x1d8d91){const _0x2d90a6=_0x558d77,_0x38f5c9=_0x1d8d91['note'];if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54320e=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x466379 of _0x54320e){if('UzwNQ'!=='UzwNQ'){if(_0x30a886['value'](_0x5730b3))return![];}else{if(!_0x4e5608[_0x2d90a6(0x24f)](_0x466379))return![];}}return!![];}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x2d90a6(0x1bd)!==_0x2d90a6(0x1bd))return _0x1d0e51[_0x2d90a6(0x225)];else{const _0x4dc7d1=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x56da72 of _0x4dc7d1){const _0x15965d=DataManager['getSkillIdWithName'](_0x56da72);if(!_0x15965d)continue;if(!_0x4e5608[_0x2d90a6(0x24f)](_0x15965d))return![];}return!![];}}}if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ff734=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x2fac46 of _0x4ff734){if(!_0x4e5608['isLearnedSkill'](_0x2fac46))return![];}return!![];}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x52cb02=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x48eeed of _0x52cb02){const _0xb81f87=DataManager[_0x2d90a6(0x286)](_0x48eeed);if(!_0xb81f87)continue;if(!_0x4e5608[_0x2d90a6(0x24f)](_0xb81f87))return![];}return!![];}}if(_0x38f5c9['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d90a6(0x160)!==_0x2d90a6(0x160))this[_0x2d90a6(0x334)][_0x2291c4]--;else{const _0x3d8db5=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x882ef of _0x3d8db5){if(_0x2d90a6(0x126)===_0x2d90a6(0x126)){if(_0x4e5608[_0x2d90a6(0x24f)](_0x882ef))return!![];}else this[_0x2d90a6(0x2ef)](_0x291346['id']);}return![];}}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x2d90a6(0x3e1)!==_0x2d90a6(0x192)){const _0x16b15c=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x28255d of _0x16b15c){const _0x4e4bb6=DataManager[_0x2d90a6(0x286)](_0x28255d);if(!_0x4e4bb6)continue;if(_0x4e5608[_0x2d90a6(0x24f)](_0x4e4bb6))return!![];}return![];}else{const _0x1ffd59=_0x4d15e9['note'],_0x55fafb=_0x358757[_0x2d90a6(0x2d3)][_0x2d90a6(0x24d)];return _0x55fafb[_0x352cfc['id']]?_0x55fafb[_0x47ab0f['id']][_0x2d90a6(0x1a3)](this,_0x2f57c4):!![];}}}if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x117505=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x367507 of _0x117505){if(_0x2d90a6(0x257)!=='dzZBR'){const _0x1ef21e=_0x1a46fd(_0x2b595d['$1']),_0x20d9ef=_0x2d05b2[_0x2d90a6(0x176)](_0x1ef21e,_0x2d90a6(0x33c),0x1,_0x2d90a6(0x3f8));_0x563972[_0x2d90a6(0x2d3)][_0x2d90a6(0x1de)][_0x515fd7['id']]=new _0x22fc54('stateId',_0x20d9ef);}else{if(!_0x4e5608['isLearnedSkill'](_0x367507))return!![];}}return![];}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x46facb=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x15313e of _0x46facb){if(_0x2d90a6(0x1d1)!==_0x2d90a6(0x1d1)){if(this[_0x2d90a6(0x3b9)]('passiveStates'))return this[_0x2d90a6(0x402)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x2d90a6(0x19d)]=!![],this[_0x2d90a6(0x271)](),this[_0x2d90a6(0x19d)]=_0x2a2cde,this[_0x2d90a6(0x402)]();}else{const _0x128a07=DataManager[_0x2d90a6(0x286)](_0x15313e);if(!_0x128a07)continue;if(!_0x4e5608['isLearnedSkill'](_0x128a07))return!![];}}return![];}}if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d90a6(0x1ea)!==_0x2d90a6(0x148)){const _0x2d3419=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x4905cd of _0x2d3419){if('rrEJl'!==_0x2d90a6(0x1f8))return _0x290ce5[_0x2d90a6(0x2d3)][_0x2d90a6(0x343)][_0x2d90a6(0x2c3)][_0x2d90a6(0x2b6)];else{if(!_0x4e5608[_0x2d90a6(0x24f)](_0x4905cd))return!![];}}return![];}else{if(!_0x12dad4[_0x2d90a6(0x18d)](_0x32f196))return![];}}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x57c009=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x2ab29c of _0x57c009){if('fIQXt'===_0x2d90a6(0x12d)){const _0x3f625f=DataManager[_0x2d90a6(0x286)](_0x2ab29c);if(!_0x3f625f)continue;if(!_0x4e5608['isLearnedSkill'](_0x3f625f))return!![];}else{this[_0x2d90a6(0x1b3)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x14a23d['id']])return this[_0x2d90a6(0x1b3)][_0x2d760e['id']];this[_0x2d90a6(0x1b3)][_0x4661f1['id']]=[_0x1e32c6['stypeId']];if(_0xb45488[_0x2d90a6(0x20b)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6f2afb=_0x4b578e[_0x2d90a6(0x10b)]('['+_0x214a97['$1'][_0x2d90a6(0x379)](/\d+/g)+']');this[_0x2d90a6(0x1b3)][_0x2e171e['id']]=this['_stypeIDs'][_0x4458e9['id']][_0x2d90a6(0x1d6)](_0x6f2afb);}else{if(_0x1c2d82['note'][_0x2d90a6(0x379)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2aac4c=_0x5c30ae['$1']['split'](',');for(const _0x1f0cde of _0x2aac4c){const _0x554ff6=_0x5e3e83[_0x2d90a6(0x222)](_0x1f0cde);if(_0x554ff6)this[_0x2d90a6(0x1b3)][_0x5649b6['id']][_0x2d90a6(0x287)](_0x554ff6);}}}return this[_0x2d90a6(0x1b3)][_0x110b92['id']];}}return![];}}if(_0x38f5c9['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d90a6(0x12a)!==_0x2d90a6(0x12a))_0x43c938[_0x2d90a6(0x2d3)][_0x2d90a6(0x3ac)][_0x2d90a6(0x1a3)](this);else{const _0x4db4e4=JSON['parse']('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x45cbb2 of _0x4db4e4){if(_0x4e5608[_0x2d90a6(0x24f)](_0x45cbb2))return![];}return!![];}}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x81fda=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0xf0b794 of _0x81fda){const _0x117b95=DataManager[_0x2d90a6(0x286)](_0xf0b794);if(!_0x117b95)continue;if(_0x4e5608['isLearnedSkill'](_0x117b95))return![];}return!![];}}if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e7fbe=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1e7551 of _0x1e7fbe){if(!_0x4e5608[_0x2d90a6(0x254)](_0x1e7551))return![];}return!![];}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e19df=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x5a3493 of _0x1e19df){if(_0x2d90a6(0x416)===_0x2d90a6(0x416)){const _0x3fbf59=DataManager[_0x2d90a6(0x286)](_0x5a3493);if(!_0x3fbf59)continue;if(!_0x4e5608[_0x2d90a6(0x254)](_0x3fbf59))return![];}else return _0x297920[_0x2d90a6(0x2d3)]['Window_SkillList_maxCols'][_0x2d90a6(0x1a3)](this);}return!![];}}if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d90a6(0x2f1)!=='ukfQP'){const _0x4b2563=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x59384e of _0x4b2563){if(!_0x4e5608[_0x2d90a6(0x254)](_0x59384e))return![];}return!![];}else return this['_currentTroopUniqueID']=this['_currentTroopUniqueID']||_0x29db66[_0x2d90a6(0x2a0)],this['_currentTroopUniqueID'];}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1a8df5=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x3b080f of _0x1a8df5){const _0x27b228=DataManager['getSkillIdWithName'](_0x3b080f);if(!_0x27b228)continue;if(!_0x4e5608[_0x2d90a6(0x254)](_0x27b228))return![];}return!![];}}if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d90a6(0x40e)!==_0x2d90a6(0x40e))return this[_0x2d90a6(0x177)](_0x3564b3[_0x4c119a]);else{const _0x2d9358=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x591480 of _0x2d9358){if('StJCh'!==_0x2d90a6(0x3cf)){if(_0x4e5608[_0x2d90a6(0x254)](_0x591480))return!![];}else{if(_0x4c0e57[_0x2d90a6(0x198)][_0x2d90a6(0x31d)]()==='TP')return _0x5b4a8b['CalcJS'][_0x2d90a6(0x1a3)](this,_0x2441af);}}return![];}}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x2d90a6(0x3f9)==='fcZxm'){const _0x145477=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x334808 of _0x145477){if(_0x2d90a6(0x419)!==_0x2d90a6(0x419)){const _0xeaa06e=this[_0x2d90a6(0x228)](_0x4e5cd3),_0x138ad6=this[_0x2d90a6(0x367)](_0x2f1f47),_0x2bbb49=this[_0x2d90a6(0x3ef)](_0x138ad6)[_0x2d90a6(0x136)];this[_0x2d90a6(0x23c)](this[_0x2d90a6(0x1ae)](_0x1f38e8));const _0x556fd7=this[_0x2d90a6(0x300)]();if(_0x556fd7===_0x2d90a6(0x411))this['drawTextEx'](_0x138ad6,_0xeaa06e['x']+_0xeaa06e[_0x2d90a6(0x136)]-_0x2bbb49,_0xeaa06e['y'],_0x2bbb49);else{if(_0x556fd7===_0x2d90a6(0x1e2)){const _0x4b3059=_0xeaa06e['x']+_0x48de24[_0x2d90a6(0x2e8)]((_0xeaa06e[_0x2d90a6(0x136)]-_0x2bbb49)/0x2);this[_0x2d90a6(0x265)](_0x138ad6,_0x4b3059,_0xeaa06e['y'],_0x2bbb49);}else this[_0x2d90a6(0x265)](_0x138ad6,_0xeaa06e['x'],_0xeaa06e['y'],_0x2bbb49);}}else{const _0x188ef4=DataManager[_0x2d90a6(0x286)](_0x334808);if(!_0x188ef4)continue;if(_0x4e5608[_0x2d90a6(0x254)](_0x188ef4))return!![];}}return![];}else this[_0x2d90a6(0x377)][_0x4f99e3]='';}}if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d90a6(0x1b6)===_0x2d90a6(0x360))return this[_0x2d90a6(0x1f1)](_0x7f260f);else{const _0x3fbad8=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x161e46 of _0x3fbad8){if(_0x2d90a6(0x2ed)===_0x2d90a6(0x2ed)){if(!_0x4e5608['hasSkill'](_0x161e46))return!![];}else this[_0x2d90a6(0x2c1)]={},this[_0x2d90a6(0x285)](),_0x110752[_0x2d90a6(0x2d3)][_0x2d90a6(0x359)]['call'](this);}return![];}}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1b8846=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x1def67 of _0x1b8846){const _0x44dd29=DataManager[_0x2d90a6(0x286)](_0x1def67);if(!_0x44dd29)continue;if(!_0x4e5608[_0x2d90a6(0x254)](_0x44dd29))return!![];}return![];}}if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ead10=JSON[_0x2d90a6(0x10b)]('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x5f091c of _0x1ead10){if(!_0x4e5608[_0x2d90a6(0x254)](_0x5f091c))return!![];}return![];}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x2d90a6(0x29e)!=='QDowF')this[_0x2d90a6(0x2af)]=_0x522461;else{const _0x5938d3=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x9fcf98 of _0x5938d3){if(_0x2d90a6(0x1c9)===_0x2d90a6(0x2fd)){_0x5b6853[_0x2d90a6(0x379)](_0x4559fc);const _0x2a7831=_0x1c6ec7(_0x1e92d6['$1'])[_0x2d90a6(0x3dc)](',')['map'](_0x546ac3=>_0x2bcc23(_0x546ac3)[_0x2d90a6(0x31d)]()[_0x2d90a6(0x2d2)]());_0x3a7c8c=_0x279967[_0x2d90a6(0x1d6)](_0x2a7831);}else{const _0x2b570e=DataManager[_0x2d90a6(0x286)](_0x9fcf98);if(!_0x2b570e)continue;if(!_0x4e5608[_0x2d90a6(0x254)](_0x2b570e))return!![];}}return![];}}}if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d90a6(0x3e7)===_0x2d90a6(0x3e7)){const _0x5a34eb=JSON['parse']('['+RegExp['$1'][_0x2d90a6(0x379)](/\d+/g)+']');for(const _0x2ffa26 of _0x5a34eb){if(_0x4e5608[_0x2d90a6(0x254)](_0x2ffa26))return![];}return!![];}else return![];}else{if(_0x38f5c9[_0x2d90a6(0x379)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x532eca=RegExp['$1'][_0x2d90a6(0x3dc)](',');for(const _0x582f8b of _0x532eca){if(_0x2d90a6(0x363)!==_0x2d90a6(0x3db)){const _0x44aac8=DataManager[_0x2d90a6(0x286)](_0x582f8b);if(!_0x44aac8)continue;if(_0x4e5608[_0x2d90a6(0x254)](_0x44aac8))return![];}else{const _0x11b9e2=_0x44e45c[_0x2d90a6(0x2d3)],_0x2222d2=[_0x2d90a6(0x3f6),'stateHpSlipHealJS','stateMpSlipDamageJS',_0x2d90a6(0x1f5),_0x2d90a6(0x183),_0x2d90a6(0x1de)];for(const _0x45d57b of _0x2222d2){_0x11b9e2[_0x45d57b][_0x484e55]&&_0x11b9e2[_0x45d57b][_0x4b9858]['call'](this,_0x4de07a);}}}return!![];}}return!![];},Window_SkillList['prototype'][_0x558d77(0x1ec)]=function(_0x2b8f31){const _0x376298=_0x558d77,_0x559695=_0x2b8f31[_0x376298(0x20b)],_0x1207c1=VisuMZ['SkillsStatesCore'][_0x376298(0x347)];return _0x1207c1[_0x2b8f31['id']]?_0x1207c1[_0x2b8f31['id']][_0x376298(0x1a3)](this,_0x2b8f31):!![];},VisuMZ['SkillsStatesCore']['Window_SkillList_drawItem']=Window_SkillList['prototype'][_0x558d77(0x32e)],Window_SkillList[_0x558d77(0x10c)][_0x558d77(0x32e)]=function(_0x14c44e){const _0x2b8014=_0x558d77,_0x107913=this[_0x2b8014(0x1ab)](_0x14c44e),_0x55fa94=_0x107913['name'];if(_0x107913)this['alterSkillName'](_0x107913);VisuMZ['SkillsStatesCore'][_0x2b8014(0x23b)]['call'](this,_0x14c44e);if(_0x107913)_0x107913[_0x2b8014(0x263)]=_0x55fa94;},Window_SkillList[_0x558d77(0x10c)]['alterSkillName']=function(_0x2b0dfb){const _0x3e8082=_0x558d77;if(_0x2b0dfb&&_0x2b0dfb[_0x3e8082(0x20b)]['match'](/<LIST NAME:[ ](.*)>/i)){_0x2b0dfb[_0x3e8082(0x263)]=String(RegExp['$1'])[_0x3e8082(0x2d2)]();for(;;){if(_0x3e8082(0x3e3)!==_0x3e8082(0x159)){if(_0x2b0dfb[_0x3e8082(0x263)][_0x3e8082(0x379)](/\\V\[(\d+)\]/gi))'AxlPV'!=='iVEBF'?_0x2b0dfb['name']=_0x2b0dfb[_0x3e8082(0x263)][_0x3e8082(0x417)](/\\V\[(\d+)\]/gi,(_0x1bad24,_0x3b44dd)=>$gameVariables[_0x3e8082(0x18d)](parseInt(_0x3b44dd))):this[_0x3e8082(0x154)]&&this[_0x3e8082(0x132)]?(this[_0x3e8082(0x336)][_0x3e8082(0x295)](),this[_0x3e8082(0x1ac)]()):_0x1442be[_0x3e8082(0x2d3)][_0x3e8082(0x3ac)]['call'](this);else{if(_0x3e8082(0x2f7)===_0x3e8082(0x2ab)){const _0x3fb587=this[_0x3e8082(0x2e7)](_0x45380f);if(_0x3fb587==='iconText')this[_0x3e8082(0x1eb)](_0xe01121);else _0x3fb587===_0x3e8082(0x2ac)?this['drawItemStyleIcon'](_0x48e045):_0x19c119[_0x3e8082(0x10c)]['drawItem']['call'](this,_0x3a1f3d);}else break;}}else{if(_0x5014fb[_0x3e8082(0x124)])this[_0x3e8082(0x3f4)]();}}}},Window_SkillList[_0x558d77(0x10c)]['drawSkillCost']=function(_0x49e0da,_0x355950,_0x4bfb68,_0x1191b9){const _0x438a1b=_0x558d77;Window_Base[_0x438a1b(0x10c)][_0x438a1b(0x15e)][_0x438a1b(0x1a3)](this,this[_0x438a1b(0x323)],_0x49e0da,_0x355950,_0x4bfb68,_0x1191b9);},Window_SkillList[_0x558d77(0x10c)][_0x558d77(0x2c6)]=function(_0x5e9516){const _0x421a18=_0x558d77;this[_0x421a18(0x193)]=_0x5e9516,this[_0x421a18(0x234)]();},VisuMZ[_0x558d77(0x2d3)]['Window_SkillList_updateHelp']=Window_SkillList[_0x558d77(0x10c)]['updateHelp'],Window_SkillList[_0x558d77(0x10c)][_0x558d77(0x1bb)]=function(){const _0x46b953=_0x558d77;VisuMZ[_0x46b953(0x2d3)][_0x46b953(0x15d)][_0x46b953(0x1a3)](this);if(this['_statusWindow']&&this[_0x46b953(0x193)][_0x46b953(0x391)]===Window_ShopStatus){if(_0x46b953(0x25d)==='gWutj')return!![];else this['_statusWindow'][_0x46b953(0x274)](this['item']());}};