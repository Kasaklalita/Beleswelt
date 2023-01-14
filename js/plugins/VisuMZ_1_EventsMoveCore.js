//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.30;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.30] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x317e8f=_0x3459;(function(_0x4e0910,_0x5667d0){const _0xd9e416=_0x3459,_0xcb10d7=_0x4e0910();while(!![]){try{const _0x274450=-parseInt(_0xd9e416(0x3ca))/0x1+parseInt(_0xd9e416(0x38b))/0x2*(parseInt(_0xd9e416(0x368))/0x3)+-parseInt(_0xd9e416(0x54a))/0x4*(-parseInt(_0xd9e416(0x404))/0x5)+-parseInt(_0xd9e416(0x63d))/0x6+-parseInt(_0xd9e416(0x3a8))/0x7*(parseInt(_0xd9e416(0x622))/0x8)+parseInt(_0xd9e416(0x61b))/0x9+parseInt(_0xd9e416(0x4bb))/0xa;if(_0x274450===_0x5667d0)break;else _0xcb10d7['push'](_0xcb10d7['shift']());}catch(_0x307be8){_0xcb10d7['push'](_0xcb10d7['shift']());}}}(_0x562e,0xdcad5));var label=_0x317e8f(0x5ac),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x317e8f(0x365)](function(_0x58aeb0){const _0x413990=_0x317e8f;return _0x58aeb0['status']&&_0x58aeb0[_0x413990(0x57e)][_0x413990(0x4fa)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x317e8f(0x2c7)]||{},VisuMZ['ConvertParams']=function(_0x26a7c4,_0x207f98){const _0x3dee66=_0x317e8f;for(const _0x3b5978 in _0x207f98){if(_0x3b5978[_0x3dee66(0x5bf)](/(.*):(.*)/i)){if('ofmzV'!==_0x3dee66(0x2bd)){if(_0x36c2b5[this[_0x3dee66(0x5ee)]])this['_waitMode']='',this[_0x3dee66(0x602)]();else return!![];}else{const _0x2e3e23=String(RegExp['$1']),_0x54fa4b=String(RegExp['$2'])[_0x3dee66(0x639)]()[_0x3dee66(0x2bc)]();let _0x47d66,_0x17785b,_0x152cb2;switch(_0x54fa4b){case _0x3dee66(0x242):_0x47d66=_0x207f98[_0x3b5978]!==''?Number(_0x207f98[_0x3b5978]):0x0;break;case _0x3dee66(0x433):_0x17785b=_0x207f98[_0x3b5978]!==''?JSON[_0x3dee66(0x63b)](_0x207f98[_0x3b5978]):[],_0x47d66=_0x17785b[_0x3dee66(0x215)](_0xcc3f2b=>Number(_0xcc3f2b));break;case _0x3dee66(0x4b9):_0x47d66=_0x207f98[_0x3b5978]!==''?eval(_0x207f98[_0x3b5978]):null;break;case _0x3dee66(0x467):_0x17785b=_0x207f98[_0x3b5978]!==''?JSON[_0x3dee66(0x63b)](_0x207f98[_0x3b5978]):[],_0x47d66=_0x17785b[_0x3dee66(0x215)](_0xb10965=>eval(_0xb10965));break;case _0x3dee66(0x485):_0x47d66=_0x207f98[_0x3b5978]!==''?JSON['parse'](_0x207f98[_0x3b5978]):'';break;case _0x3dee66(0x641):_0x17785b=_0x207f98[_0x3b5978]!==''?JSON[_0x3dee66(0x63b)](_0x207f98[_0x3b5978]):[],_0x47d66=_0x17785b[_0x3dee66(0x215)](_0x2216e9=>JSON[_0x3dee66(0x63b)](_0x2216e9));break;case _0x3dee66(0x37c):_0x47d66=_0x207f98[_0x3b5978]!==''?new Function(JSON['parse'](_0x207f98[_0x3b5978])):new Function(_0x3dee66(0x321));break;case _0x3dee66(0x5c6):_0x17785b=_0x207f98[_0x3b5978]!==''?JSON[_0x3dee66(0x63b)](_0x207f98[_0x3b5978]):[],_0x47d66=_0x17785b[_0x3dee66(0x215)](_0x1211bd=>new Function(JSON['parse'](_0x1211bd)));break;case _0x3dee66(0x46a):_0x47d66=_0x207f98[_0x3b5978]!==''?String(_0x207f98[_0x3b5978]):'';break;case _0x3dee66(0x356):_0x17785b=_0x207f98[_0x3b5978]!==''?JSON[_0x3dee66(0x63b)](_0x207f98[_0x3b5978]):[],_0x47d66=_0x17785b[_0x3dee66(0x215)](_0x23f264=>String(_0x23f264));break;case _0x3dee66(0x579):_0x152cb2=_0x207f98[_0x3b5978]!==''?JSON[_0x3dee66(0x63b)](_0x207f98[_0x3b5978]):{},_0x26a7c4[_0x2e3e23]={},VisuMZ[_0x3dee66(0x57a)](_0x26a7c4[_0x2e3e23],_0x152cb2);continue;case'ARRAYSTRUCT':_0x17785b=_0x207f98[_0x3b5978]!==''?JSON['parse'](_0x207f98[_0x3b5978]):[],_0x47d66=_0x17785b[_0x3dee66(0x215)](_0x42b1cc=>VisuMZ[_0x3dee66(0x57a)]({},JSON[_0x3dee66(0x63b)](_0x42b1cc)));break;default:continue;}_0x26a7c4[_0x2e3e23]=_0x47d66;}}}return _0x26a7c4;},(_0x752de2=>{const _0x458c80=_0x317e8f,_0x251233=_0x752de2[_0x458c80(0x621)];for(const _0x51de26 of dependencies){if(_0x458c80(0x319)===_0x458c80(0x235)){_0x19e2fd[_0x458c80(0x604)]===_0x226a29&&_0x54589c[_0x458c80(0x5ac)][_0x458c80(0x5b6)][_0x458c80(0x465)](_0x491d4f);if(_0x1cea7c[_0x458c80(0x604)][_0x458c80(0x504)]>0x0)return _0x575bcd[_0x458c80(0x5ac)][_0x458c80(0x5b6)][_0x458c80(0x22b)](_0x5d69b6['CPC'],0x0);return!![];}else{if(!Imported[_0x51de26]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x458c80(0x49f)](_0x251233,_0x51de26)),SceneManager[_0x458c80(0x19c)]();break;}}}const _0x25721d=_0x752de2[_0x458c80(0x57e)];if(_0x25721d[_0x458c80(0x5bf)](/\[Version[ ](.*?)\]/i)){if(_0x458c80(0x521)==='IsvlP')for(let _0x1469d3=-this[_0x458c80(0x61c)]['up'];_0x1469d3<=this[_0x458c80(0x61c)][_0x458c80(0x584)];_0x1469d3++){if(!_0x182fe2[_0x458c80(0x32c)]['canPass']['call'](this,_0x59603c+_0x45a51f,_0x4a4c5c+_0x1469d3,_0x29d7e5))return![];}else{const _0x24e7f4=Number(RegExp['$1']);_0x24e7f4!==VisuMZ[label][_0x458c80(0x24d)]&&(alert(_0x458c80(0x3c6)[_0x458c80(0x49f)](_0x251233,_0x24e7f4)),SceneManager[_0x458c80(0x19c)]());}}if(_0x25721d[_0x458c80(0x5bf)](/\[Tier[ ](\d+)\]/i)){const _0xed2dee=Number(RegExp['$1']);if(_0xed2dee<tier){if('SbHbx'!=='SbHbx'){if(this['isSpriteVS8dir']()){const _0x4bd3d2=['',_0x458c80(0x54f),_0x458c80(0x280),_0x458c80(0x3a4),'HEART',_0x458c80(0x360),_0x458c80(0x625),'COBWEB','SILENCE','LIGHT\x20BULB',_0x458c80(0x3f2),'','','','',''][_0x262c3c];this[_0x458c80(0x222)](_0x4bd3d2,_0x3452a7);}}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x458c80(0x49f)](_0x251233,_0xed2dee,tier)),SceneManager['exit']();}else tier=Math[_0x458c80(0x219)](_0xed2dee,tier);}VisuMZ[_0x458c80(0x57a)](VisuMZ[label][_0x458c80(0x2c7)],_0x752de2[_0x458c80(0x2c2)]);})(pluginData),VisuMZ['OperateValues']=function(_0x41e8a,_0x4650f0,_0x27544c){switch(_0x27544c){case'=':return _0x4650f0;break;case'+':return _0x41e8a+_0x4650f0;break;case'-':return _0x41e8a-_0x4650f0;break;case'*':return _0x41e8a*_0x4650f0;break;case'/':return _0x41e8a/_0x4650f0;break;case'%':return _0x41e8a%_0x4650f0;break;}return _0x41e8a;},PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x2b5),_0x595bd1=>{const _0x26d077=_0x317e8f;VisuMZ[_0x26d077(0x57a)](_0x595bd1,_0x595bd1);switch(_0x595bd1[_0x26d077(0x5e0)]){case _0x26d077(0x4c7):$gameSystem[_0x26d077(0x209)](!![]);break;case'Stop':$gameSystem[_0x26d077(0x209)](![]);break;case _0x26d077(0x22d):$gameSystem['setAllowEventAutoMovement'](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x590),_0x414553=>{const _0x45d24f=_0x317e8f;VisuMZ[_0x45d24f(0x57a)](_0x414553,_0x414553);const _0x29615f=$gameTemp[_0x45d24f(0x5c0)](),_0x414470={'mapId':_0x414553['MapId'],'eventId':_0x414553[_0x45d24f(0x558)]||_0x29615f[_0x45d24f(0x23b)](),'pageId':_0x414553['PageId']};if(_0x414470['mapId']<=0x0)_0x414470[_0x45d24f(0x4f2)]=$gameMap?$gameMap[_0x45d24f(0x4f2)]():0x1;$gameTemp['getLastPluginCommandInterpreter']()[_0x45d24f(0x439)](_0x414470);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x19b),_0x53c20d=>{const _0x4fd9b6=_0x317e8f;VisuMZ['ConvertParams'](_0x53c20d,_0x53c20d);switch(_0x53c20d[_0x4fd9b6(0x5e0)]){case _0x4fd9b6(0x611):$gameSystem[_0x4fd9b6(0x1e8)](!![]);break;case _0x4fd9b6(0x33b):$gameSystem[_0x4fd9b6(0x1e8)](![]);break;case _0x4fd9b6(0x22d):$gameSystem[_0x4fd9b6(0x1e8)](!$gameSystem[_0x4fd9b6(0x578)]());break;}}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],'EventIconChange',_0x3d919c=>{const _0x4726e6=_0x317e8f;VisuMZ[_0x4726e6(0x57a)](_0x3d919c,_0x3d919c);const _0x576afb=$gameTemp['getLastPluginCommandInterpreter']();_0x3d919c[_0x4726e6(0x1b0)]=_0x3d919c[_0x4726e6(0x1b0)]||$gameMap['mapId'](),$gameSystem[_0x4726e6(0x405)](_0x3d919c[_0x4726e6(0x1b0)],_0x3d919c['EventId']||_0x576afb[_0x4726e6(0x23b)](),_0x3d919c[_0x4726e6(0x1f6)],_0x3d919c[_0x4726e6(0x573)],_0x3d919c[_0x4726e6(0x32a)],_0x3d919c['IconBlendMode']);}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],'EventIconDelete',_0x3e8f2c=>{const _0x687a6b=_0x317e8f;VisuMZ[_0x687a6b(0x57a)](_0x3e8f2c,_0x3e8f2c);const _0x2bb081=$gameTemp[_0x687a6b(0x5c0)]();_0x3e8f2c['MapId']=_0x3e8f2c[_0x687a6b(0x1b0)]||$gameMap['mapId'](),$gameSystem[_0x687a6b(0x3f4)](_0x3e8f2c[_0x687a6b(0x1b0)],_0x3e8f2c['EventId']||_0x2bb081[_0x687a6b(0x23b)]());}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x306),_0x2a887f=>{const _0x5079cb=_0x317e8f;if($gameMap){if(_0x5079cb(0x3a6)!==_0x5079cb(0x3a6))this['startMapCommonEventOnTouch']();else for(const _0x109569 of $gameMap['events']()){_0x109569[_0x5079cb(0x4dd)]();}}}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],_0x317e8f(0x560),_0x308bba=>{const _0x14e790=_0x317e8f;VisuMZ[_0x14e790(0x57a)](_0x308bba,_0x308bba);switch(_0x308bba['Visibility']){case _0x14e790(0x1c7):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x14e790(0x35a):$gameSystem[_0x14e790(0x55d)](![]);break;case _0x14e790(0x22d):$gameSystem[_0x14e790(0x55d)](!$gameSystem[_0x14e790(0x48b)]());break;}}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x642),_0x48a4a9=>{const _0x3c601f=_0x317e8f;VisuMZ[_0x3c601f(0x57a)](_0x48a4a9,_0x48a4a9);const _0x16fa8f=$gameTemp[_0x3c601f(0x5c0)]();if(!$gameMap)return;const _0x23ccbe=$gameMap[_0x3c601f(0x450)](_0x48a4a9[_0x3c601f(0x558)]||_0x16fa8f['eventId']());if(_0x23ccbe)_0x23ccbe[_0x3c601f(0x5a2)]();}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],_0x317e8f(0x237),_0x9e7466=>{const _0x540b61=_0x317e8f;VisuMZ[_0x540b61(0x57a)](_0x9e7466,_0x9e7466);const _0x3670cf=$gameTemp[_0x540b61(0x5c0)](),_0x16cf72=_0x9e7466[_0x540b61(0x1b0)]||$gameMap[_0x540b61(0x4f2)](),_0x1f0ad9=_0x9e7466['EventId']||_0x3670cf[_0x540b61(0x23b)](),_0x8da9c1=_0x9e7466[_0x540b61(0x4a2)]||0x0,_0xc990ab=_0x9e7466['PosY']||0x0,_0x19afe7=_0x9e7466[_0x540b61(0x5cb)]||0x2,_0x16a037=((_0x9e7466[_0x540b61(0x62e)]||0x1)-0x1)[_0x540b61(0x2e7)](0x0,0x13),_0x13e5ba=_0x9e7466[_0x540b61(0x267)]||0x0;$gameSystem[_0x540b61(0x3a0)](_0x16cf72,_0x1f0ad9,_0x8da9c1,_0xc990ab,_0x19afe7,_0x16a037,_0x13e5ba);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x1ab),_0x27618d=>{const _0x5cb2ae=_0x317e8f;VisuMZ[_0x5cb2ae(0x57a)](_0x27618d,_0x27618d);const _0x2fb8c7=$gameTemp[_0x5cb2ae(0x5c0)](),_0x3139ea=_0x27618d[_0x5cb2ae(0x1b0)]||$gameMap[_0x5cb2ae(0x4f2)](),_0x5c6dba=_0x27618d[_0x5cb2ae(0x558)]||_0x2fb8c7[_0x5cb2ae(0x23b)]();$gameSystem[_0x5cb2ae(0x5ec)](_0x3139ea,_0x5c6dba);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x22f),_0x42449a=>{const _0x26b122=_0x317e8f;VisuMZ[_0x26b122(0x57a)](_0x42449a,_0x42449a);const _0x3f4ca9=_0x42449a[_0x26b122(0x490)];$gameTimer['setCommonEvent'](_0x3f4ca9);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x2b8),_0xedcbc1=>{const _0x22dc92=_0x317e8f;$gameTimer[_0x22dc92(0x3ec)](0x0);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x55b),_0x2b943b=>{const _0x1791de=_0x317e8f;if(!$gameTimer[_0x1791de(0x2fc)]())return;VisuMZ['ConvertParams'](_0x2b943b,_0x2b943b);let _0xe60e9d=0x0;_0xe60e9d+=_0x2b943b[_0x1791de(0x207)],_0xe60e9d+=_0x2b943b['Seconds']*0x3c,_0xe60e9d+=_0x2b943b[_0x1791de(0x390)]*0x3c*0x3c,_0xe60e9d+=_0x2b943b[_0x1791de(0x2e0)]*0x3c*0x3c*0x3c,$gameTimer[_0x1791de(0x39d)](_0xe60e9d);}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],_0x317e8f(0x407),_0x1b2ea2=>{const _0x2063c8=_0x317e8f;if(!$gameTimer[_0x2063c8(0x2fc)]())return;VisuMZ[_0x2063c8(0x57a)](_0x1b2ea2,_0x1b2ea2);let _0xdb3922=0x0;_0xdb3922+=_0x1b2ea2[_0x2063c8(0x207)],_0xdb3922+=_0x1b2ea2[_0x2063c8(0x4b7)]*0x3c,_0xdb3922+=_0x1b2ea2[_0x2063c8(0x390)]*0x3c*0x3c,_0xdb3922+=_0x1b2ea2[_0x2063c8(0x2e0)]*0x3c*0x3c*0x3c,$gameTimer[_0x2063c8(0x1f5)](_0xdb3922);}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],'EventTimerPause',_0x1df544=>{const _0x4e8964=_0x317e8f;if(!$gameTimer['isWorking']())return;$gameTimer[_0x4e8964(0x459)]();}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],_0x317e8f(0x527),_0x2f0f01=>{if(!$gameTimer['isWorking']())return;$gameTimer['resume']();}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x5f2),_0x5b0099=>{const _0x2015c3=_0x317e8f;VisuMZ[_0x2015c3(0x57a)](_0x5b0099,_0x5b0099);const _0x314b18=_0x5b0099['Speed']||0x0;$gameTimer[_0x2015c3(0x545)](_0x314b18);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x435),_0x354025=>{const _0x1a2a70=_0x317e8f;VisuMZ['ConvertParams'](_0x354025,_0x354025);const _0x23a33d=!_0x354025[_0x1a2a70(0x52c)];$gameSystem[_0x1a2a70(0x4c4)](_0x23a33d);}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],'FollowerSetTargetChase',_0x2589b8=>{const _0x22f39c=_0x317e8f;VisuMZ[_0x22f39c(0x57a)](_0x2589b8,_0x2589b8);const _0x296d54=(_0x2589b8[_0x22f39c(0x3ea)]||0x0)-0x1,_0x244710=!_0x2589b8[_0x22f39c(0x52c)],_0xbc8667=$gamePlayer['followers']()[_0x22f39c(0x283)](_0x296d54);if(_0xbc8667)_0xbc8667[_0x22f39c(0x31c)](_0x244710);}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],_0x317e8f(0x620),_0x5caa2f=>{const _0x545317=_0x317e8f;VisuMZ[_0x545317(0x57a)](_0x5caa2f,_0x5caa2f);const _0x51e4b5=_0x5caa2f[_0x545317(0x3ea)];$gameSystem[_0x545317(0x3c1)](_0x51e4b5);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],'FollowerReset',_0x21908a=>{const _0x4de20d=_0x317e8f;VisuMZ['ConvertParams'](_0x21908a,_0x21908a),$gameSystem[_0x4de20d(0x3c1)](0x0),$gameSystem[_0x4de20d(0x4c4)](![]);for(const _0xcdf7e7 of $gamePlayer[_0x4de20d(0x285)]()[_0x4de20d(0x1ad)]){if(_0xcdf7e7)_0xcdf7e7[_0x4de20d(0x31c)](![]);}}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],_0x317e8f(0x3c8),_0x5ddfff=>{const _0x351389=_0x317e8f;VisuMZ[_0x351389(0x57a)](_0x5ddfff,_0x5ddfff);const _0x24ac6c=$gameTemp[_0x351389(0x5c0)]();_0x5ddfff[_0x351389(0x1b0)]=_0x5ddfff[_0x351389(0x1b0)]||$gameMap[_0x351389(0x4f2)]();const _0x21f7c2=[_0x5ddfff['MapId'],_0x5ddfff['EventId']||_0x24ac6c['eventId'](),_0x5ddfff[_0x351389(0x530)]],_0x739ae9=_0x5ddfff[_0x351389(0x3df)],_0xa73873=$gameSelfSwitches['value'](_0x21f7c2)||![];$gameSwitches[_0x351389(0x51e)](_0x739ae9,_0xa73873);}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],'SwitchGetSelfSwitchID',_0x416346=>{const _0x2a26f4=_0x317e8f;VisuMZ[_0x2a26f4(0x57a)](_0x416346,_0x416346);const _0x49584c=$gameTemp[_0x2a26f4(0x5c0)]();_0x416346['MapId']=_0x416346[_0x2a26f4(0x1b0)]||$gameMap['mapId']();const _0x386412=[_0x416346['MapId'],_0x416346[_0x2a26f4(0x558)]||_0x49584c[_0x2a26f4(0x23b)](),_0x2a26f4(0x408)[_0x2a26f4(0x49f)](_0x416346['SwitchId'])],_0x1c774e=_0x416346[_0x2a26f4(0x3df)],_0x4d6829=$gameSelfSwitches['value'](_0x386412)||![];$gameSwitches[_0x2a26f4(0x51e)](_0x1c774e,_0x4d6829);}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],_0x317e8f(0x1f7),_0x329da7=>{const _0x3d1846=_0x317e8f;VisuMZ[_0x3d1846(0x57a)](_0x329da7,_0x329da7);const _0x296e3a=$gameTemp['getLastPluginCommandInterpreter']();_0x329da7['MapId']=_0x329da7[_0x3d1846(0x1b0)]||$gameMap['mapId']();const _0x2d12ea=[_0x329da7[_0x3d1846(0x1b0)],_0x329da7[_0x3d1846(0x558)]||_0x296e3a[_0x3d1846(0x23b)](),'Self\x20Variable\x20%1'[_0x3d1846(0x49f)](_0x329da7[_0x3d1846(0x3e0)])],_0x4ee6f3=_0x329da7[_0x3d1846(0x5fd)],_0x16cf9b=$gameSelfSwitches[_0x3d1846(0x4d0)](_0x2d12ea)||![];$gameVariables[_0x3d1846(0x51e)](_0x4ee6f3,_0x16cf9b);}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],_0x317e8f(0x254),_0x389968=>{const _0x23866f=_0x317e8f;VisuMZ[_0x23866f(0x57a)](_0x389968,_0x389968);if(!$gameMap)return;const _0x50d1e3=$gameTemp[_0x23866f(0x5c0)](),_0x52f1ff=_0x389968[_0x23866f(0x201)];_0x389968[_0x23866f(0x55f)]=_0x389968[_0x23866f(0x55f)]||$gameMap[_0x23866f(0x4f2)](),_0x389968[_0x23866f(0x34f)]=_0x389968[_0x23866f(0x34f)]||$gameMap[_0x23866f(0x4f2)](),_0x389968[_0x23866f(0x3c5)]=_0x389968[_0x23866f(0x3c5)]['toUpperCase']()[_0x23866f(0x2bc)]();if(!_0x52f1ff&&_0x389968[_0x23866f(0x55f)]!==$gameMap[_0x23866f(0x4f2)]())return;if($gameMap[_0x23866f(0x4f2)]()===_0x389968[_0x23866f(0x55f)]){const _0x4cd488=$gameMap[_0x23866f(0x450)](_0x389968[_0x23866f(0x38c)]||_0x50d1e3[_0x23866f(0x23b)]());if(!_0x4cd488)return;_0x389968['TemplateName']!==_0x23866f(0x4a3)?_0x4cd488[_0x23866f(0x5c9)](_0x389968[_0x23866f(0x3c5)]):_0x23866f(0x236)===_0x23866f(0x281)?this['setWaitMode'](_0x23866f(0x590)):_0x4cd488[_0x23866f(0x273)](_0x389968['Step2MapId'],_0x389968[_0x23866f(0x372)]||_0x50d1e3[_0x23866f(0x23b)]());}_0x52f1ff&&$gameSystem[_0x23866f(0x2eb)](_0x389968[_0x23866f(0x55f)],_0x389968['Step1EventId'],_0x389968[_0x23866f(0x3c5)],_0x389968['Step2MapId'],_0x389968[_0x23866f(0x372)]);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],'MorphEventRemove',_0x3dd53b=>{const _0x55d606=_0x317e8f;VisuMZ[_0x55d606(0x57a)](_0x3dd53b,_0x3dd53b);if(!$gameMap)return;const _0x28d2ef=$gameTemp[_0x55d606(0x5c0)]();_0x3dd53b['MapId']=_0x3dd53b[_0x55d606(0x1b0)]||$gameMap['mapId']();if($gameMap['mapId']()===_0x3dd53b[_0x55d606(0x1b0)]){const _0x527cf6=$gameMap[_0x55d606(0x450)](_0x3dd53b['EventId']||_0x28d2ef[_0x55d606(0x23b)]());_0x527cf6[_0x55d606(0x626)]();}_0x3dd53b['RemovePreserve']&&$gameSystem[_0x55d606(0x1d7)](_0x3dd53b[_0x55d606(0x1b0)],_0x3dd53b[_0x55d606(0x558)]||_0x28d2ef[_0x55d606(0x23b)]());}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x600),_0x355636=>{const _0x41180c=_0x317e8f;VisuMZ[_0x41180c(0x57a)](_0x355636,_0x355636),$gameSystem[_0x41180c(0x5cd)](!_0x355636[_0x41180c(0x611)]);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x28b),_0x17e361=>{const _0x24dc51=_0x317e8f;VisuMZ['ConvertParams'](_0x17e361,_0x17e361),$gameSystem[_0x24dc51(0x1fc)](_0x17e361['Setting']);}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],'PlayerIconChange',_0x3246f5=>{const _0x427f7f=_0x317e8f;VisuMZ[_0x427f7f(0x57a)](_0x3246f5,_0x3246f5),$gameSystem[_0x427f7f(0x5bb)]($gamePlayer,_0x3246f5[_0x427f7f(0x1f6)],_0x3246f5[_0x427f7f(0x573)],_0x3246f5['IconBufferY'],_0x3246f5[_0x427f7f(0x229)]);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x566),_0x4c9784=>{const _0x42de8d=_0x317e8f;VisuMZ[_0x42de8d(0x57a)](_0x4c9784,_0x4c9784),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],'SelfSwitchABCD',_0x43cf46=>{const _0x47fdd2=_0x317e8f;VisuMZ[_0x47fdd2(0x57a)](_0x43cf46,_0x43cf46);const _0x3d611e=$gameTemp['getLastPluginCommandInterpreter']();_0x43cf46['MapId']=_0x43cf46[_0x47fdd2(0x1b0)]||$gameMap[_0x47fdd2(0x4f2)]();const _0x55d41e=[_0x43cf46[_0x47fdd2(0x1b0)],_0x43cf46['EventId']||_0x3d611e[_0x47fdd2(0x23b)](),_0x43cf46[_0x47fdd2(0x530)]];switch(_0x43cf46[_0x47fdd2(0x5e0)]){case'ON':$gameSelfSwitches[_0x47fdd2(0x51e)](_0x55d41e,!![]);break;case _0x47fdd2(0x63e):$gameSelfSwitches[_0x47fdd2(0x51e)](_0x55d41e,![]);break;case'Toggle':$gameSelfSwitches[_0x47fdd2(0x51e)](_0x55d41e,!$gameSelfSwitches[_0x47fdd2(0x4d0)](_0x55d41e));break;}}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x2a2),_0xdb620d=>{const _0x3f5ee8=_0x317e8f;VisuMZ['ConvertParams'](_0xdb620d,_0xdb620d);const _0xfdb096=$gameTemp[_0x3f5ee8(0x5c0)]();_0xdb620d[_0x3f5ee8(0x1b0)]=_0xdb620d[_0x3f5ee8(0x1b0)]||$gameMap[_0x3f5ee8(0x4f2)]();const _0x17f137=[_0xdb620d['MapId'],_0xdb620d[_0x3f5ee8(0x558)]||_0xfdb096[_0x3f5ee8(0x23b)](),_0x3f5ee8(0x408)[_0x3f5ee8(0x49f)](_0xdb620d[_0x3f5ee8(0x275)])];switch(_0xdb620d[_0x3f5ee8(0x5e0)]){case'ON':$gameSelfSwitches['setValue'](_0x17f137,!![]);break;case'OFF':$gameSelfSwitches['setValue'](_0x17f137,![]);break;case _0x3f5ee8(0x22d):$gameSelfSwitches['setValue'](_0x17f137,!$gameSelfSwitches[_0x3f5ee8(0x4d0)](_0x17f137));break;}}),PluginManager['registerCommand'](pluginData['name'],_0x317e8f(0x292),_0x384ca1=>{const _0x4badbc=_0x317e8f;VisuMZ[_0x4badbc(0x57a)](_0x384ca1,_0x384ca1);const _0x342d11=$gameTemp[_0x4badbc(0x5c0)]();_0x384ca1['MapId']=_0x384ca1[_0x4badbc(0x1b0)]||$gameMap[_0x4badbc(0x4f2)]();const _0x30e332=[_0x384ca1[_0x4badbc(0x1b0)],_0x384ca1[_0x4badbc(0x558)]||_0x342d11[_0x4badbc(0x23b)](),_0x4badbc(0x440)['format'](_0x384ca1[_0x4badbc(0x3e0)])],_0x4ca631=VisuMZ[_0x4badbc(0x49d)]($gameSelfSwitches[_0x4badbc(0x4d0)](_0x30e332),_0x384ca1[_0x4badbc(0x5e0)],_0x384ca1[_0x4badbc(0x640)]);$gameSelfSwitches[_0x4badbc(0x51e)](_0x30e332,_0x4ca631);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x5c3),_0x47ebd1=>{const _0x2ff70e=_0x317e8f;VisuMZ[_0x2ff70e(0x57a)](_0x47ebd1,_0x47ebd1);const _0x17dcb9=$gameTemp[_0x2ff70e(0x5c0)](),_0x2083ed={'template':_0x47ebd1[_0x2ff70e(0x3c5)],'mapId':_0x47ebd1['MapId']||$gameMap['mapId'](),'eventId':_0x47ebd1['EventId']||_0x17dcb9[_0x2ff70e(0x23b)](),'x':_0x47ebd1[_0x2ff70e(0x4a2)],'y':_0x47ebd1['PosY'],'spawnPreserved':_0x47ebd1[_0x2ff70e(0x213)],'spawnEventId':$gameMap[_0x2ff70e(0x4e9)][_0x2ff70e(0x504)]+0x3e8},_0x3f85fe=_0x47ebd1['SuccessSwitchId']||0x0;if(!VisuMZ[_0x2ff70e(0x190)][_0x2083ed[_0x2ff70e(0x4f2)]]&&_0x2083ed[_0x2ff70e(0x4f2)]!==$gameMap[_0x2ff70e(0x4f2)]()){if(_0x2ff70e(0x643)==='eeiZI'){let _0xf2a3ff='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x2ff70e(0x49f)](_0x2083ed[_0x2ff70e(0x4f2)]);_0xf2a3ff+=_0x2ff70e(0x1a2),_0xf2a3ff+=_0x2ff70e(0x526),_0xf2a3ff+=_0x2ff70e(0x3ae),_0xf2a3ff+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x2ff70e(0x49f)](_0x2083ed[_0x2ff70e(0x4f2)]),alert(_0xf2a3ff);return;}else return _0x3ddc0a>0x0?0x2:0x8;}const _0x4d85c6=$gameMap['prepareSpawnedEventAtXY'](_0x2083ed,_0x47ebd1[_0x2ff70e(0x2b0)],_0x47ebd1['Passability']);_0x3f85fe&&$gameSwitches['setValue'](_0x3f85fe,!!_0x4d85c6);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],_0x317e8f(0x2bb),_0x78247e=>{const _0x37fbbe=_0x317e8f;VisuMZ[_0x37fbbe(0x57a)](_0x78247e,_0x78247e);const _0x59d438=$gameTemp['getLastPluginCommandInterpreter'](),_0x3a5116={'template':_0x78247e[_0x37fbbe(0x3c5)],'mapId':_0x78247e[_0x37fbbe(0x1b0)]||$gameMap[_0x37fbbe(0x4f2)](),'eventId':_0x78247e['EventId']||_0x59d438[_0x37fbbe(0x23b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x78247e[_0x37fbbe(0x213)],'spawnEventId':$gameMap[_0x37fbbe(0x4e9)]['length']+0x3e8},_0x54f2cb=_0x78247e[_0x37fbbe(0x4e4)]||0x0;if(!VisuMZ[_0x37fbbe(0x190)][_0x3a5116[_0x37fbbe(0x4f2)]]&&_0x3a5116[_0x37fbbe(0x4f2)]!==$gameMap['mapId']()){let _0x2c646c=_0x37fbbe(0x33e)['format'](_0x3a5116['mapId']);_0x2c646c+=_0x37fbbe(0x1a2),_0x2c646c+=_0x37fbbe(0x526),_0x2c646c+=_0x37fbbe(0x3ae),_0x2c646c+=_0x37fbbe(0x252)[_0x37fbbe(0x49f)](_0x3a5116[_0x37fbbe(0x4f2)]),alert(_0x2c646c);return;}const _0x41deaa=$gameMap[_0x37fbbe(0x57f)](_0x3a5116,_0x78247e[_0x37fbbe(0x5fe)],_0x78247e[_0x37fbbe(0x2b0)],_0x78247e[_0x37fbbe(0x4c6)]);_0x54f2cb&&$gameSwitches[_0x37fbbe(0x51e)](_0x54f2cb,!!_0x41deaa);}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],_0x317e8f(0x438),_0x61c0fd=>{const _0x4b939e=_0x317e8f;VisuMZ[_0x4b939e(0x57a)](_0x61c0fd,_0x61c0fd);const _0x4c5282=$gameTemp[_0x4b939e(0x5c0)](),_0x28e656={'template':_0x61c0fd[_0x4b939e(0x3c5)],'mapId':_0x61c0fd[_0x4b939e(0x1b0)]||$gameMap[_0x4b939e(0x4f2)](),'eventId':_0x61c0fd[_0x4b939e(0x558)]||_0x4c5282[_0x4b939e(0x23b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x61c0fd[_0x4b939e(0x213)],'spawnEventId':$gameMap[_0x4b939e(0x4e9)]['length']+0x3e8},_0x1be3fd=_0x61c0fd[_0x4b939e(0x4e4)]||0x0;if(!VisuMZ[_0x4b939e(0x190)][_0x28e656[_0x4b939e(0x4f2)]]&&_0x28e656['mapId']!==$gameMap[_0x4b939e(0x4f2)]()){let _0x159105=_0x4b939e(0x33e)[_0x4b939e(0x49f)](_0x28e656[_0x4b939e(0x4f2)]);_0x159105+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x159105+=_0x4b939e(0x526),_0x159105+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x159105+=_0x4b939e(0x252)[_0x4b939e(0x49f)](_0x28e656[_0x4b939e(0x4f2)]),alert(_0x159105);return;}const _0x372c35=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x28e656,_0x61c0fd[_0x4b939e(0x593)],_0x61c0fd[_0x4b939e(0x2b0)],_0x61c0fd[_0x4b939e(0x4c6)]);if(_0x1be3fd){if(_0x4b939e(0x225)!==_0x4b939e(0x225)){if(this[_0x4b939e(0x424)]===_0x43275b)this[_0x4b939e(0x502)]();const _0x41ecb8=_0x167952===_0x5a062c?_0x4b939e(0x22a):_0x4b939e(0x4a1)[_0x4b939e(0x49f)](_0x15ea59[_0x4b939e(0x382)],_0x42e2ed[_0x4b939e(0x3d9)]);this[_0x4b939e(0x424)][_0x41ecb8]={'iconIndex':_0x448eba,'bufferX':_0x4f16cf,'bufferY':_0x1b6244,'blendMode':_0x2e292b};}else $gameSwitches[_0x4b939e(0x51e)](_0x1be3fd,!!_0x372c35);}}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],'SpawnEventDespawnEventID',_0x4b2907=>{const _0x50994a=_0x317e8f;VisuMZ['ConvertParams'](_0x4b2907,_0x4b2907);const _0x3b4173=$gameTemp[_0x50994a(0x5c0)]();$gameMap[_0x50994a(0x391)](_0x4b2907[_0x50994a(0x544)]||_0x3b4173['eventId']());}),PluginManager['registerCommand'](pluginData[_0x317e8f(0x621)],'SpawnEventDespawnAtXY',_0x417341=>{const _0x321eb0=_0x317e8f;VisuMZ['ConvertParams'](_0x417341,_0x417341);const _0xfd02c=_0x417341[_0x321eb0(0x4a2)],_0x488f96=_0x417341[_0x321eb0(0x1b3)];$gameMap['despawnAtXY'](_0xfd02c,_0x488f96);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],'SpawnEventDespawnRegions',_0x34518a=>{const _0x36a19d=_0x317e8f;VisuMZ[_0x36a19d(0x57a)](_0x34518a,_0x34518a),$gameMap[_0x36a19d(0x4f6)](_0x34518a[_0x36a19d(0x5fe)]);}),PluginManager[_0x317e8f(0x29d)](pluginData['name'],'SpawnEventDespawnTerrainTags',_0xa64b46=>{const _0x17d2b6=_0x317e8f;VisuMZ[_0x17d2b6(0x57a)](_0xa64b46,_0xa64b46),$gameMap[_0x17d2b6(0x609)](_0xa64b46['TerrainTags']);}),PluginManager[_0x317e8f(0x29d)](pluginData[_0x317e8f(0x621)],'SpawnEventDespawnEverything',_0x144252=>{const _0x45ea2b=_0x317e8f;VisuMZ[_0x45ea2b(0x57a)](_0x144252,_0x144252),$gameMap['despawnEverything']();}),VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5c2)]=Scene_Boot[_0x317e8f(0x32c)][_0x317e8f(0x241)],Scene_Boot[_0x317e8f(0x32c)]['onDatabaseLoaded']=function(){const _0x72371d=_0x317e8f;VisuMZ[_0x72371d(0x5ac)][_0x72371d(0x5c2)][_0x72371d(0x317)](this),this[_0x72371d(0x4cd)](),this[_0x72371d(0x3ba)]();if(VisuMZ[_0x72371d(0x5ac)]['CustomPageConditions'])VisuMZ[_0x72371d(0x5ac)]['CustomPageConditions'][_0x72371d(0x636)]();},VisuMZ[_0x317e8f(0x190)]=[],VisuMZ[_0x317e8f(0x367)]={},Scene_Boot[_0x317e8f(0x32c)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0xb9cb2c=_0x317e8f;if(DataManager[_0xb9cb2c(0x61e)]()||DataManager[_0xb9cb2c(0x41f)]())return;const _0x3fae9a=VisuMZ[_0xb9cb2c(0x5ac)][_0xb9cb2c(0x2c7)][_0xb9cb2c(0x205)],_0x200242=_0x3fae9a[_0xb9cb2c(0x351)][_0xb9cb2c(0x5b5)](0x0);for(const _0x1c3944 of _0x3fae9a[_0xb9cb2c(0x4e3)]){if('fKabS'===_0xb9cb2c(0x318)){_0x1c3944[_0xb9cb2c(0x623)]=_0x1c3944[_0xb9cb2c(0x623)]['toUpperCase']()['trim'](),VisuMZ['EventTemplates'][_0x1c3944['Name']]=_0x1c3944;if(!_0x200242['includes'](_0x1c3944['MapID']))_0x200242['push'](_0x1c3944[_0xb9cb2c(0x3b9)]);}else _0x4d3702['EventsMoveCore'][_0xb9cb2c(0x58c)][_0xb9cb2c(0x317)](this),this[_0xb9cb2c(0x5dc)]();}for(const _0x25cb6b of _0x200242){if(VisuMZ[_0xb9cb2c(0x190)][_0x25cb6b])continue;const _0x52d23a=_0xb9cb2c(0x299)[_0xb9cb2c(0x49f)](_0x25cb6b[_0xb9cb2c(0x5e2)](0x3)),_0x5459b6=_0xb9cb2c(0x258)[_0xb9cb2c(0x49f)](_0x25cb6b);DataManager[_0xb9cb2c(0x1cf)](_0x5459b6,_0x52d23a),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0xb9cb2c(0x510)](this,_0x25cb6b,_0x5459b6),0x64);}},Scene_Boot[_0x317e8f(0x32c)][_0x317e8f(0x386)]=function(_0x130764,_0x38ab62){const _0x1a3607=_0x317e8f;window[_0x38ab62]?(VisuMZ['PreloadedMaps'][_0x130764]=window[_0x38ab62],window[_0x38ab62]=undefined):setTimeout(this[_0x1a3607(0x386)][_0x1a3607(0x510)](this,_0x130764,_0x38ab62),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x317e8f(0x2f2)]=[],VisuMZ['MapSwitches']=[],VisuMZ['AdvancedVariables']=[],VisuMZ[_0x317e8f(0x4af)]=[],VisuMZ['MapVariables']=[],Scene_Boot[_0x317e8f(0x32c)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x43ba02=_0x317e8f;for(let _0x33dbb7=0x1;_0x33dbb7<$dataSystem[_0x43ba02(0x51a)][_0x43ba02(0x504)];_0x33dbb7++){if($dataSystem[_0x43ba02(0x51a)][_0x33dbb7][_0x43ba02(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x43ba02(0x354)][_0x43ba02(0x556)](_0x33dbb7);if($dataSystem[_0x43ba02(0x51a)][_0x33dbb7][_0x43ba02(0x5bf)](/<SELF>/i))VisuMZ[_0x43ba02(0x2f2)][_0x43ba02(0x556)](_0x33dbb7);if($dataSystem[_0x43ba02(0x51a)][_0x33dbb7][_0x43ba02(0x5bf)](/<MAP>/i))VisuMZ[_0x43ba02(0x338)]['push'](_0x33dbb7);}for(let _0x4ef01f=0x1;_0x4ef01f<$dataSystem[_0x43ba02(0x375)]['length'];_0x4ef01f++){if($dataSystem[_0x43ba02(0x375)][_0x4ef01f][_0x43ba02(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x43ba02(0x32e)][_0x43ba02(0x556)](_0x4ef01f);if($dataSystem[_0x43ba02(0x375)][_0x4ef01f][_0x43ba02(0x5bf)](/<SELF>/i))VisuMZ[_0x43ba02(0x4af)][_0x43ba02(0x556)](_0x4ef01f);if($dataSystem[_0x43ba02(0x375)][_0x4ef01f][_0x43ba02(0x5bf)](/<MAP>/i))VisuMZ[_0x43ba02(0x559)][_0x43ba02(0x556)](_0x4ef01f);}},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5b6)]={},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5b6)][_0x317e8f(0x636)]=function(){this['_interpreter']=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5b6)][_0x317e8f(0x28c)]=function(){const _0x5d96b1=_0x317e8f;this['_commonEvents']=[];for(const _0x420d0e of $dataCommonEvents){if(!_0x420d0e)continue;VisuMZ['EventsMoveCore'][_0x5d96b1(0x5b6)][_0x5d96b1(0x465)](_0x420d0e);if(_0x420d0e[_0x5d96b1(0x604)][_0x5d96b1(0x504)]>0x0)this[_0x5d96b1(0x2d5)][_0x5d96b1(0x556)](_0x420d0e['id']);}},VisuMZ[_0x317e8f(0x5ac)]['CustomPageConditions'][_0x317e8f(0x22b)]=function(_0x5239d7,_0x962507){const _0x5ed6a9=_0x317e8f;return this[_0x5ed6a9(0x5d0)][_0x5ed6a9(0x5fa)](_0x5239d7,_0x962507),this[_0x5ed6a9(0x5d0)][_0x5ed6a9(0x4d2)](),this['_interpreter'][_0x5ed6a9(0x331)];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5b6)][_0x317e8f(0x465)]=function(_0x449fc9){const _0x5bf5dd=_0x317e8f;let _0x214652=![];_0x449fc9[_0x5bf5dd(0x604)]=[];for(const _0x75b40f of _0x449fc9[_0x5bf5dd(0x429)]){if([0x6c,0x198][_0x5bf5dd(0x4fa)](_0x75b40f['code'])){const _0x35a849=_0x75b40f[_0x5bf5dd(0x2c2)][0x0];if(_0x35a849['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x5bf5dd(0x5f3)!==_0x5bf5dd(0x5f3)?_0x38dc27[_0x5bf5dd(0x5ac)][_0x5bf5dd(0x2f7)]['call'](this,_0x5f22eb):_0x214652=!![];else _0x35a849[_0x5bf5dd(0x5bf)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x214652=![]);}_0x214652&&_0x449fc9['CPC'][_0x5bf5dd(0x556)](_0x75b40f);}},getSelfSwitchValue=function(_0x3c9727,_0x551cdd,_0x144b2e){const _0x3971ea=_0x317e8f;let _0x32a306=[_0x3c9727,_0x551cdd,_0x3971ea(0x408)[_0x3971ea(0x49f)](_0x144b2e)];if(typeof _0x144b2e===_0x3971ea(0x2fa)){if(_0x3971ea(0x39c)!=='AbRXs'){if(!_0x4fe560['_scene'])return;if(!_0x375cb2['_scene'][_0x3971ea(0x51f)])return;const _0x44ae1b=_0x292c80[_0x3971ea(0x1e4)][_0x3971ea(0x51f)][_0x3971ea(0x326)](this[_0x3971ea(0x3e8)]);if(!_0x44ae1b)return;this['x']=_0x3487b9['round'](this['_event'][_0x3971ea(0x379)]()-_0x3e2da2[_0x3971ea(0x534)](this[_0x3971ea(0x5c1)]*this[_0x3971ea(0x5d9)]['x']/0x2)),this['x']+=this['_event'][_0x3971ea(0x303)][_0x3971ea(0x202)],this['y']=this[_0x3971ea(0x3e8)]['screenY']()-_0x44ae1b['height'],this['y']+=_0x263e44[_0x3971ea(0x33d)](_0x5abe17['windowPadding']()*0.5),this['y']-=_0x1f4c9e[_0x3971ea(0x33d)](this[_0x3971ea(0x4ba)]*this[_0x3971ea(0x5d9)]['y']),this['y']+=this[_0x3971ea(0x3e8)][_0x3971ea(0x303)]['offsetY'],this[_0x3971ea(0x401)]=this['_event']['_erased'],this[_0x3971ea(0x5ea)]=this['_event']['screenX'](),this['_eventScreenY']=this[_0x3971ea(0x3e8)][_0x3971ea(0x568)](),this[_0x3971ea(0x428)]=this[_0x3971ea(0x3e8)][_0x3971ea(0x303)][_0x3971ea(0x202)],this[_0x3971ea(0x60c)]=this[_0x3971ea(0x3e8)][_0x3971ea(0x303)][_0x3971ea(0x396)],this[_0x3971ea(0x5c7)]=this[_0x3971ea(0x3e8)]['_pageIndex'],this['_eventErased']&&(this[_0x3971ea(0x63f)]=0x0);}else _0x32a306=[_0x3c9727,_0x551cdd,_0x144b2e[_0x3971ea(0x639)]()[_0x3971ea(0x2bc)]()];}return $gameSelfSwitches['value'](_0x32a306);},getMapSwitchValue=function(_0x519be0,_0x3e8bb7){const _0x4a4040=_0x317e8f;let _0x50b17e=[0x0,0x0,_0x4a4040(0x5ae)[_0x4a4040(0x49f)](_0x519be0,_0x3e8bb7)];return $gameSelfSwitches['value'](_0x50b17e);},getMapVariableValue=function(_0x1005e3,_0x76421e){const _0x12b08e=_0x317e8f;let _0x16b98e=[0x0,0x0,_0x12b08e(0x1d3)[_0x12b08e(0x49f)](_0x1005e3,_0x76421e)];return $gameSelfSwitches[_0x12b08e(0x4d0)](_0x16b98e);},getSelfVariableValue=function(_0x2c15be,_0x437b4a,_0x1623cc){const _0xddd232=_0x317e8f,_0x43839b=[_0x2c15be,_0x437b4a,_0xddd232(0x440)[_0xddd232(0x49f)](_0x1623cc)];return $gameSelfSwitches[_0xddd232(0x4d0)](_0x43839b);},setSelfSwitchValue=function(_0x1ac943,_0x4b00d7,_0x1bfcb1,_0x33e299){const _0x3f20f4=_0x317e8f;let _0x5a4d86=[_0x1ac943,_0x4b00d7,'Self\x20Switch\x20%1'[_0x3f20f4(0x49f)](_0x1bfcb1)];typeof _0x1bfcb1===_0x3f20f4(0x2fa)&&(_0x5a4d86=[_0x1ac943,_0x4b00d7,_0x1bfcb1[_0x3f20f4(0x639)]()['trim']()]),$gameSelfSwitches[_0x3f20f4(0x51e)](_0x5a4d86,_0x33e299);},setSelfVariableValue=function(_0x419e5a,_0x53c763,_0x14ff02,_0x5c85f8){const _0x43064a=_0x317e8f,_0x5ebdd0=[_0x419e5a,_0x53c763,_0x43064a(0x440)[_0x43064a(0x49f)](_0x14ff02)];$gameSelfSwitches['setValue'](_0x5ebdd0,_0x5c85f8);},setMapSwitchValue=function(_0x38ef57,_0x247f3d,_0x2d2f73){const _0x20f121=_0x317e8f;let _0x28e25c=[0x0,0x0,_0x20f121(0x5ae)['format'](_0x38ef57,_0x247f3d)];$gameSelfSwitches[_0x20f121(0x51e)](_0x28e25c,_0x2d2f73);},setMapVariableValue=function(_0x1613a3,_0x48e9bc,_0xbdc175){const _0xf7797=_0x317e8f;let _0x5ece3e=[0x0,0x0,_0xf7797(0x1d3)[_0xf7797(0x49f)](_0x1613a3,_0x48e9bc)];$gameSelfSwitches['setValue'](_0x5ece3e,_0xbdc175);},DataManager[_0x317e8f(0x5b4)]=function(_0x3cae6e){const _0x32c291=_0x317e8f;if(SceneManager[_0x32c291(0x1e4)][_0x32c291(0x312)]===Scene_Debug)return![];return VisuMZ[_0x32c291(0x354)][_0x32c291(0x4fa)](_0x3cae6e);},DataManager['isAdvancedVariable']=function(_0x39842a){const _0x54e546=_0x317e8f;if(SceneManager[_0x54e546(0x1e4)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x54e546(0x32e)][_0x54e546(0x4fa)](_0x39842a);},DataManager[_0x317e8f(0x39b)]=function(_0x10ca16){const _0x1a3560=_0x317e8f;if(SceneManager[_0x1a3560(0x1e4)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x1a3560(0x2f2)][_0x1a3560(0x4fa)](_0x10ca16);},DataManager[_0x317e8f(0x2ea)]=function(_0x24e7f2){const _0xb91448=_0x317e8f;if(SceneManager['_scene'][_0xb91448(0x312)]===Scene_Debug)return![];return VisuMZ[_0xb91448(0x4af)][_0xb91448(0x4fa)](_0x24e7f2);},DataManager[_0x317e8f(0x3d6)]=function(_0x527631){const _0xe0cb3f=_0x317e8f;if(BattleManager[_0xe0cb3f(0x61e)]())return![];return VisuMZ['MapSwitches'][_0xe0cb3f(0x4fa)](_0x527631);},DataManager[_0x317e8f(0x533)]=function(_0x291d28){const _0x205642=_0x317e8f;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x205642(0x559)]['includes'](_0x291d28);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x2aa)]=Game_Temp[_0x317e8f(0x32c)][_0x317e8f(0x62c)],Game_Temp['prototype'][_0x317e8f(0x62c)]=function(_0x45107d,_0x538a32){const _0x122c71=_0x317e8f;if(this['isEventClickTriggered'](_0x45107d,_0x538a32))return;VisuMZ[_0x122c71(0x5ac)][_0x122c71(0x2aa)][_0x122c71(0x317)](this,_0x45107d,_0x538a32);},Game_Temp[_0x317e8f(0x32c)][_0x317e8f(0x329)]=function(_0x4643dc,_0x3ace2e){const _0x386d91=_0x317e8f,_0x4186db=$gameMap[_0x386d91(0x1ee)](_0x4643dc,_0x3ace2e);for(const _0x593cfd of _0x4186db){if(_0x593cfd&&_0x593cfd[_0x386d91(0x1c5)]())return _0x593cfd['onClickTrigger'](),!![];}return![];},Game_Temp[_0x317e8f(0x32c)][_0x317e8f(0x597)]=function(_0x6770a1){const _0x13cab7=_0x317e8f;this[_0x13cab7(0x426)]=_0x6770a1;},Game_Temp['prototype'][_0x317e8f(0x5c0)]=function(){const _0x3ba7a5=_0x317e8f;return this[_0x3ba7a5(0x426)];},Game_Temp[_0x317e8f(0x32c)][_0x317e8f(0x264)]=function(_0x48376c){this['_selfTarget']=_0x48376c;},Game_Temp[_0x317e8f(0x32c)][_0x317e8f(0x2cd)]=function(){const _0x20ad61=_0x317e8f;this[_0x20ad61(0x234)]=undefined;},Game_Temp[_0x317e8f(0x32c)][_0x317e8f(0x206)]=function(){const _0x5badd9=_0x317e8f;return this[_0x5badd9(0x234)];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x3de)]=Game_System[_0x317e8f(0x32c)][_0x317e8f(0x636)],Game_System[_0x317e8f(0x32c)][_0x317e8f(0x636)]=function(){const _0x5b09da=_0x317e8f;VisuMZ[_0x5b09da(0x5ac)][_0x5b09da(0x3de)][_0x5b09da(0x317)](this),this[_0x5b09da(0x502)](),this[_0x5b09da(0x1bf)]();},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x502)]=function(){const _0xbfae46=_0x317e8f;this[_0xbfae46(0x21c)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0xbfae46(0x364)]=[],this['_PreservedEventMorphData']={},this[_0xbfae46(0x455)]={},this[_0xbfae46(0x2fe)]=![],this[_0xbfae46(0x383)]=_0xbfae46(0x33a);},Game_System[_0x317e8f(0x32c)]['isDashingEnabled']=function(){const _0x581120=_0x317e8f;if(this[_0x581120(0x21c)]===undefined)this[_0x581120(0x502)]();if(this[_0x581120(0x21c)][_0x581120(0x1fa)]===undefined)this[_0x581120(0x502)]();return this[_0x581120(0x21c)][_0x581120(0x1fa)];},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x1e8)]=function(_0x188bf2){const _0x170fec=_0x317e8f;if(this[_0x170fec(0x21c)]===undefined)this[_0x170fec(0x502)]();if(this[_0x170fec(0x21c)]['DashingEnable']===undefined)this['initEventsMoveCore']();this[_0x170fec(0x21c)][_0x170fec(0x1fa)]=_0x188bf2;},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x1a8)]=function(){const _0x2d972b=_0x317e8f;if(this[_0x2d972b(0x21c)]===undefined)this[_0x2d972b(0x502)]();if(this[_0x2d972b(0x21c)][_0x2d972b(0x5f1)]===undefined)this[_0x2d972b(0x502)]();return this['_EventsMoveCoreSettings'][_0x2d972b(0x5f1)];},Game_System[_0x317e8f(0x32c)]['setAllowEventAutoMovement']=function(_0xaf7309){const _0x117b2a=_0x317e8f;if(this[_0x117b2a(0x21c)]===undefined)this[_0x117b2a(0x502)]();if(this[_0x117b2a(0x21c)][_0x117b2a(0x5f1)]===undefined)this[_0x117b2a(0x502)]();this[_0x117b2a(0x21c)][_0x117b2a(0x5f1)]=_0xaf7309;},Game_System[_0x317e8f(0x32c)]['eventLabelsVisible']=function(){const _0x31956b=_0x317e8f;if(this[_0x31956b(0x21c)]===undefined)this[_0x31956b(0x502)]();if(this['_EventsMoveCoreSettings'][_0x31956b(0x5a8)]===undefined)this[_0x31956b(0x502)]();return this[_0x31956b(0x21c)][_0x31956b(0x5a8)];},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x55d)]=function(_0x4c8279){const _0x1ffe5b=_0x317e8f;if(this[_0x1ffe5b(0x21c)]===undefined)this[_0x1ffe5b(0x502)]();if(this[_0x1ffe5b(0x21c)][_0x1ffe5b(0x5a8)]===undefined)this[_0x1ffe5b(0x502)]();this[_0x1ffe5b(0x21c)][_0x1ffe5b(0x5a8)]=_0x4c8279;},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x1cc)]=function(){const _0x5c162b=_0x317e8f;return this['_DisablePlayerControl']===undefined&&(this[_0x5c162b(0x2fe)]=![]),this[_0x5c162b(0x2fe)];},Game_System[_0x317e8f(0x32c)]['setPlayerControlDisable']=function(_0x5ccdb1){this['_DisablePlayerControl']=_0x5ccdb1;},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x2d4)]=function(){const _0x4e01fc=_0x317e8f;return this[_0x4e01fc(0x383)];},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x1fc)]=function(_0x251f14){const _0x14705f=_0x317e8f;this[_0x14705f(0x383)]=String(_0x251f14)[_0x14705f(0x4ac)]()[_0x14705f(0x2bc)]();},Game_System['prototype'][_0x317e8f(0x525)]=function(_0x1cf569){const _0xb91dbc=_0x317e8f;if(this[_0xb91dbc(0x424)]===undefined)this[_0xb91dbc(0x502)]();if(!_0x1cf569)return null;if(_0x1cf569===$gamePlayer)return this['_EventIcons']['Player'];else{if(_0xb91dbc(0x1db)!==_0xb91dbc(0x5be)){const _0x302a81=VisuMZ['EventsMoveCore'][_0xb91dbc(0x2c7)],_0x13b5a4='Map%1-Event%2'[_0xb91dbc(0x49f)](_0x1cf569[_0xb91dbc(0x382)],_0x1cf569[_0xb91dbc(0x3d9)]);return this['_EventIcons'][_0x13b5a4]=this[_0xb91dbc(0x424)][_0x13b5a4]||{'iconIndex':0x0,'bufferX':_0x302a81['Icon'][_0xb91dbc(0x532)],'bufferY':_0x302a81[_0xb91dbc(0x42d)][_0xb91dbc(0x55e)],'blendMode':_0x302a81['Icon'][_0xb91dbc(0x4d8)]},this['_EventIcons'][_0x13b5a4];}else _0x428c0c=_0x41432a[_0xb91dbc(0x3b6)](_0x4d44fa),_0x3169f4[_0xb91dbc(0x5ac)][_0xb91dbc(0x2ad)][_0xb91dbc(0x317)](this,_0x9a3d72);}},Game_System[_0x317e8f(0x32c)]['setEventIconData']=function(_0x3f1728,_0x168db7,_0x10e7d2,_0x148eb2,_0x2c0d81){const _0x4e6119=_0x317e8f;if(this[_0x4e6119(0x424)]===undefined)this[_0x4e6119(0x502)]();const _0x1f5431=_0x3f1728===$gamePlayer?_0x4e6119(0x22a):_0x4e6119(0x4a1)[_0x4e6119(0x49f)](_0x3f1728[_0x4e6119(0x382)],_0x3f1728[_0x4e6119(0x3d9)]);this[_0x4e6119(0x424)][_0x1f5431]={'iconIndex':_0x168db7,'bufferX':_0x10e7d2,'bufferY':_0x148eb2,'blendMode':_0x2c0d81};},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x405)]=function(_0x24f8b6,_0xf2c124,_0xabcd56,_0x1a6a74,_0x36724b,_0xd2b6a7){const _0x2e456f=_0x317e8f;if(this[_0x2e456f(0x424)]===undefined)this[_0x2e456f(0x502)]();const _0x21bfb9='Map%1-Event%2'[_0x2e456f(0x49f)](_0x24f8b6,_0xf2c124);this['_EventIcons'][_0x21bfb9]={'iconIndex':_0xabcd56,'bufferX':_0x1a6a74,'bufferY':_0x36724b,'blendMode':_0xd2b6a7};},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x4df)]=function(_0x5532cb){const _0x4e4620=_0x317e8f;if(this[_0x4e4620(0x424)]===undefined)this['initEventsMoveCore']();if(!_0x5532cb)return null;if(_0x5532cb===$gamePlayer){if(_0x4e4620(0x5b1)==='jXQYY')delete this[_0x4e4620(0x424)]['Player'];else{const _0x25fb08=_0x25362e[_0x4e4620(0x2bf)](this[_0x4e4620(0x231)]());this[_0x4e4620(0x4de)](_0x25fb08[_0x4e4620(0x2d9)]());}}else{if(_0x4e4620(0x54b)===_0x4e4620(0x54b))this[_0x4e4620(0x3f4)](_0x5532cb['_mapId'],_0x5532cb[_0x4e4620(0x3d9)]);else return _0x5d1386>0x0?0x4:0x6;}},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x3f4)]=function(_0x46439d,_0x5983a0){const _0xe33751=_0x317e8f;if(this[_0xe33751(0x424)]===undefined)this['initEventsMoveCore']();const _0x33de9d=_0xe33751(0x4a1)[_0xe33751(0x49f)](_0x46439d,_0x5983a0);delete this['_EventIcons'][_0x33de9d];},Game_System['prototype'][_0x317e8f(0x1bd)]=function(_0x30f794){const _0x2759c7=_0x317e8f;if(this[_0x2759c7(0x455)]===undefined)this[_0x2759c7(0x502)]();if(!_0x30f794)return null;const _0x449c7d='Map%1-Event%2'[_0x2759c7(0x49f)](_0x30f794[_0x2759c7(0x382)],_0x30f794[_0x2759c7(0x3d9)]);return this[_0x2759c7(0x455)][_0x449c7d];},Game_System['prototype']['saveEventLocation']=function(_0x496cc3){const _0x25f18e=_0x317e8f;if(this[_0x25f18e(0x455)]===undefined)this[_0x25f18e(0x502)]();if(!_0x496cc3)return;const _0x40041a=_0x25f18e(0x4a1)[_0x25f18e(0x49f)](_0x496cc3[_0x25f18e(0x382)],_0x496cc3[_0x25f18e(0x3d9)]);this[_0x25f18e(0x455)][_0x40041a]={'direction':_0x496cc3[_0x25f18e(0x212)](),'x':Math[_0x25f18e(0x33d)](_0x496cc3['x']),'y':Math[_0x25f18e(0x33d)](_0x496cc3['y']),'pageIndex':_0x496cc3[_0x25f18e(0x18b)],'moveRouteIndex':_0x496cc3[_0x25f18e(0x270)]};},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x539)]=function(_0x4a6e40){const _0x4eefbd=_0x317e8f;if(this[_0x4eefbd(0x455)]===undefined)this[_0x4eefbd(0x502)]();if(!_0x4a6e40)return;this['deleteSavedEventLocationKey'](_0x4a6e40[_0x4eefbd(0x382)],_0x4a6e40['_eventId']);},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x5ec)]=function(_0x2c1ce4,_0x51fc68){const _0x5208be=_0x317e8f;if(this[_0x5208be(0x455)]===undefined)this[_0x5208be(0x502)]();const _0xa0cc43=_0x5208be(0x4a1)[_0x5208be(0x49f)](_0x2c1ce4,_0x51fc68);delete this[_0x5208be(0x455)][_0xa0cc43];},Game_System['prototype'][_0x317e8f(0x3a0)]=function(_0x1602da,_0x41c2e9,_0x5c6c8e,_0x1970ba,_0x3d1845,_0x2c6f87,_0x1efdd1){const _0x59809d=_0x317e8f;if(this[_0x59809d(0x455)]===undefined)this[_0x59809d(0x502)]();const _0x29ec0d=_0x59809d(0x4a1)[_0x59809d(0x49f)](_0x1602da,_0x41c2e9);this[_0x59809d(0x455)][_0x29ec0d]={'direction':_0x3d1845,'x':Math[_0x59809d(0x33d)](_0x5c6c8e),'y':Math[_0x59809d(0x33d)](_0x1970ba),'pageIndex':_0x2c6f87,'moveRouteIndex':_0x1efdd1};},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x5ef)]=function(_0x50c784){const _0x5c5a40=_0x317e8f;if(this[_0x5c5a40(0x37e)]===undefined)this[_0x5c5a40(0x502)]();if(!_0x50c784)return;const _0x467314=_0x5c5a40(0x4a1)['format'](_0x50c784[_0x5c5a40(0x382)],_0x50c784[_0x5c5a40(0x3d9)]);return this['_PreservedEventMorphData'][_0x467314];},Game_System[_0x317e8f(0x32c)]['savePreservedMorphEventDataKey']=function(_0x41d1ee,_0x1d9f09,_0x57eaf1,_0x4e2606,_0x486832){const _0x4d7cc8=_0x317e8f;if(this[_0x4d7cc8(0x37e)]===undefined)this[_0x4d7cc8(0x502)]();const _0x567b1b=_0x4d7cc8(0x4a1)[_0x4d7cc8(0x49f)](_0x41d1ee,_0x1d9f09);this[_0x4d7cc8(0x37e)][_0x567b1b]={'template':_0x57eaf1,'mapId':_0x4e2606,'eventId':_0x486832};},Game_System[_0x317e8f(0x32c)]['deletePreservedMorphEventDataKey']=function(_0x326781,_0x5fd0ec){const _0x5cfe60=_0x317e8f;if(this[_0x5cfe60(0x37e)]===undefined)this[_0x5cfe60(0x502)]();const _0x3326e6='Map%1-Event%2'[_0x5cfe60(0x49f)](_0x326781,_0x5fd0ec);delete this[_0x5cfe60(0x37e)][_0x3326e6];},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x2a5)]=function(_0x5253ab){const _0x2471f8=_0x317e8f;if(this['_MapSpawnedEventData']===undefined)this[_0x2471f8(0x502)]();return this[_0x2471f8(0x364)][_0x5253ab]=this[_0x2471f8(0x364)][_0x5253ab]||[],this[_0x2471f8(0x364)][_0x5253ab];},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x301)]=function(_0x329b06){const _0x29fb3c=_0x317e8f,_0x258af4=this[_0x29fb3c(0x2a5)](_0x329b06);for(const _0x4c3fa9 of _0x258af4){if('cROBg'==='TpJdt')this[_0x29fb3c(0x1bb)](),_0x44c487[_0x29fb3c(0x5ac)][_0x29fb3c(0x431)][_0x29fb3c(0x317)](this,_0x4aed34);else{if(!_0x4c3fa9)continue;if(_0x4c3fa9['_spawnPreserved'])continue;const _0x474fac=_0x258af4['indexOf'](_0x4c3fa9);_0x258af4[_0x474fac]=null;}}},Game_System[_0x317e8f(0x32c)]['initFollowerController']=function(){const _0x508782=_0x317e8f;this[_0x508782(0x606)]=0x0,this['_followerChaseOff']=![];},Game_System['prototype'][_0x317e8f(0x56a)]=function(){const _0x6e960e=_0x317e8f;if(this['_followerControlID']===undefined)this[_0x6e960e(0x1bf)]();return this[_0x6e960e(0x606)];},Game_System['prototype'][_0x317e8f(0x3c1)]=function(_0x42193d){const _0x16f5a5=_0x317e8f;if(this['_followerControlID']===undefined)this[_0x16f5a5(0x1bf)]();this[_0x16f5a5(0x606)]=_0x42193d;;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x436)]=Game_Interpreter[_0x317e8f(0x32c)]['character'],Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x535)]=function(_0x157a70){const _0x3f5290=_0x317e8f;if(!$gameParty[_0x3f5290(0x50a)]()&&_0x157a70<0x0){if('Jvlxp'===_0x3f5290(0x21f)){if(this[_0x3f5290(0x424)]===_0x4b2e67)this['initEventsMoveCore']();const _0x6218e5=_0x3f5290(0x4a1)[_0x3f5290(0x49f)](_0x468440,_0x162ba9);delete this[_0x3f5290(0x424)][_0x6218e5];}else{let _0x24d804=$gameSystem['getControlledFollowerID']();if(_0x24d804>0x0){if(_0x3f5290(0x373)==='JPQyi')return $gamePlayer[_0x3f5290(0x285)]()['follower'](_0x24d804-0x1);else{_0x3fa27a[_0x3f5290(0x51a)][_0x3b3942][_0x3f5290(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x13a1b1='return\x20%1'[_0x3f5290(0x49f)](_0x3e6487(_0x3a08c8['$1']));_0x5093ab['advancedFunc'][_0x4167db]=new _0x2859a9(_0x3f5290(0x2ce),_0x13a1b1);}}}}return VisuMZ[_0x3f5290(0x5ac)][_0x3f5290(0x436)][_0x3f5290(0x317)](this,_0x157a70);},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x555)]=function(){const _0x2c420c=_0x317e8f;if(this['_followerChaseOff']===undefined)this[_0x2c420c(0x1bf)]();return this['_followerChaseOff'];},Game_System[_0x317e8f(0x32c)][_0x317e8f(0x4c4)]=function(_0xc18f49){const _0x2ffde2=_0x317e8f;if(this[_0x2ffde2(0x2a0)]===undefined)this[_0x2ffde2(0x1bf)]();this['_followerChaseOff']=_0xc18f49;;},VisuMZ[_0x317e8f(0x5ac)]['Game_Timer_initialize']=Game_Timer[_0x317e8f(0x32c)][_0x317e8f(0x636)],Game_Timer[_0x317e8f(0x32c)][_0x317e8f(0x636)]=function(){const _0x1399e1=_0x317e8f;VisuMZ['EventsMoveCore']['Game_Timer_initialize'][_0x1399e1(0x317)](this),this['initEventsMoveCore']();},Game_Timer[_0x317e8f(0x32c)]['initEventsMoveCore']=function(){const _0x5136a5=_0x317e8f;this[_0x5136a5(0x35c)]=![],this[_0x5136a5(0x413)]=-0x1,this[_0x5136a5(0x5a7)]=0x0;},Game_Timer[_0x317e8f(0x32c)]['update']=function(_0x29d5b9){const _0x3e8e56=_0x317e8f;if(!_0x29d5b9)return;if(!this[_0x3e8e56(0x20f)])return;if(this[_0x3e8e56(0x35c)])return;if(this['_frames']<=0x0)return;if(this[_0x3e8e56(0x413)]===undefined)this['initEventsMoveCore']();this[_0x3e8e56(0x2f0)]+=this[_0x3e8e56(0x413)],this[_0x3e8e56(0x2f0)]<=0x0&&this['onExpire']();},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x45b)]=Game_Timer[_0x317e8f(0x32c)][_0x317e8f(0x3a5)],Game_Timer[_0x317e8f(0x32c)]['start']=function(_0xccc8ae){const _0x19db7d=_0x317e8f;VisuMZ[_0x19db7d(0x5ac)]['Game_Timer_start'][_0x19db7d(0x317)](this,_0xccc8ae);if(this[_0x19db7d(0x35c)]===undefined)this[_0x19db7d(0x502)]();this[_0x19db7d(0x35c)]=![];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x2ef)]=Game_Timer[_0x317e8f(0x32c)][_0x317e8f(0x30d)],Game_Timer[_0x317e8f(0x32c)]['stop']=function(){const _0x21bf24=_0x317e8f;VisuMZ[_0x21bf24(0x5ac)]['Game_Timer_stop'][_0x21bf24(0x317)](this);if(this['_paused']===undefined)this[_0x21bf24(0x502)]();this['_paused']=![];},Game_Timer[_0x317e8f(0x32c)][_0x317e8f(0x459)]=function(){const _0x1eafea=_0x317e8f;if(this[_0x1eafea(0x2f0)]<=0x0)return;this['_paused']=!![],this[_0x1eafea(0x20f)]=!![];},Game_Timer[_0x317e8f(0x32c)]['resume']=function(){const _0x24251f=_0x317e8f;if(this[_0x24251f(0x2f0)]<=0x0)return;this[_0x24251f(0x35c)]=![],this[_0x24251f(0x20f)]=!![];},Game_Timer[_0x317e8f(0x32c)][_0x317e8f(0x39d)]=function(_0x29929c){const _0x158b6f=_0x317e8f;this[_0x158b6f(0x2f0)]=this[_0x158b6f(0x2f0)]||0x0,this['_frames']+=_0x29929c,this['_working']=!![],this[_0x158b6f(0x2f0)]=Math[_0x158b6f(0x219)](0x1,this[_0x158b6f(0x2f0)]);},Game_Timer[_0x317e8f(0x32c)]['setFrames']=function(_0x55aa51){const _0x1844f3=_0x317e8f;this['_frames']=this[_0x1844f3(0x2f0)]||0x0,this['_frames']=_0x55aa51,this[_0x1844f3(0x20f)]=!![],this[_0x1844f3(0x2f0)]=Math[_0x1844f3(0x219)](0x1,this[_0x1844f3(0x2f0)]);},Game_Timer['prototype'][_0x317e8f(0x545)]=function(_0x11092a){const _0x491ed6=_0x317e8f;this[_0x491ed6(0x413)]=_0x11092a,this['_working']=!![],_0x11092a>0x0&&(_0x491ed6(0x36e)===_0x491ed6(0x36e)?this[_0x491ed6(0x2f0)]=Math[_0x491ed6(0x219)](this[_0x491ed6(0x2f0)],0x1):this[_0x491ed6(0x305)](_0x412c4f));},Game_Timer['prototype'][_0x317e8f(0x3ec)]=function(_0x49b576){const _0x4970f6=_0x317e8f;if(this[_0x4970f6(0x5a7)]===undefined)this['initEventsMoveCore']();this['_expireCommonEvent']=_0x49b576;},VisuMZ[_0x317e8f(0x5ac)]['Game_Timer_onExpire']=Game_Timer[_0x317e8f(0x32c)]['onExpire'],Game_Timer[_0x317e8f(0x32c)][_0x317e8f(0x2e9)]=function(){const _0xb76a35=_0x317e8f;if(this['_expireCommonEvent']===undefined)this[_0xb76a35(0x502)]();this['_expireCommonEvent']?_0xb76a35(0x645)===_0xb76a35(0x645)?$gameTemp[_0xb76a35(0x214)](this['_expireCommonEvent']):(_0x5c0c87['x']=0x0,_0x39b52b['y']=-this[_0xb76a35(0x4ba)]+this[_0xb76a35(0x4ba)]*0x2/0x5,this[_0xb76a35(0x5d3)]['pattern']()!==0x1&&(_0x2c306f['y']+=0x1)):VisuMZ[_0xb76a35(0x5ac)][_0xb76a35(0x25f)][_0xb76a35(0x317)](this);},VisuMZ['EventsMoveCore'][_0x317e8f(0x1ce)]=Game_Message[_0x317e8f(0x32c)][_0x317e8f(0x649)],Game_Message[_0x317e8f(0x32c)][_0x317e8f(0x649)]=function(_0x1dc74c){const _0x96a2a4=_0x317e8f;VisuMZ[_0x96a2a4(0x5ac)]['Game_Message_add']['call'](this,_0x1dc74c),this[_0x96a2a4(0x313)]=$gameTemp[_0x96a2a4(0x206)]();},Game_Message[_0x317e8f(0x32c)][_0x317e8f(0x210)]=function(){const _0x49bc6d=_0x317e8f;$gameTemp[_0x49bc6d(0x264)](this['_selfEvent']);},VisuMZ['EventsMoveCore']['Game_Switches_value']=Game_Switches['prototype'][_0x317e8f(0x4d0)],Game_Switches[_0x317e8f(0x32c)][_0x317e8f(0x4d0)]=function(_0x33e0dd){const _0x19bfaf=_0x317e8f;if(DataManager[_0x19bfaf(0x5b4)](_0x33e0dd))return!!this['advancedValue'](_0x33e0dd);else{if(DataManager[_0x19bfaf(0x39b)](_0x33e0dd)){if(_0x19bfaf(0x51d)!=='dliuf'){const _0x2b13d6=this[_0x19bfaf(0x43f)][_0x19bfaf(0x4f2)],_0x546012=this['_eventSpawnData'][_0x19bfaf(0x23b)];return _0x191e9f[_0x19bfaf(0x540)](_0x2b13d6,_0x546012);}else return!!this[_0x19bfaf(0x337)](_0x33e0dd);}else return DataManager[_0x19bfaf(0x3d6)](_0x33e0dd)?!!this[_0x19bfaf(0x199)](_0x33e0dd):VisuMZ[_0x19bfaf(0x5ac)]['Game_Switches_value'][_0x19bfaf(0x317)](this,_0x33e0dd);}},Game_Switches[_0x317e8f(0x52f)]={},Game_Switches[_0x317e8f(0x32c)][_0x317e8f(0x25a)]=function(_0x1652bd){const _0x8937b=_0x317e8f;if(!Game_Switches['advancedFunc'][_0x1652bd]){if(_0x8937b(0x28d)===_0x8937b(0x189)){const _0x6df4cb=_0x5abe40[_0x8937b(0x5ac)][_0x8937b(0x2c7)][_0x8937b(0x50c)],_0x1bd508=this['_character'][_0x8937b(0x212)]();let _0x2b5fb3=0x0;if([0x1,0x4,0x7][_0x8937b(0x4fa)](_0x1bd508))_0x2b5fb3=_0x6df4cb['TiltLeft'];if([0x3,0x6,0x9][_0x8937b(0x4fa)](_0x1bd508))_0x2b5fb3=_0x6df4cb['TiltRight'];[0x2,0x8]['includes'](_0x1bd508)&&(_0x2b5fb3=[-_0x6df4cb['TiltVert'],0x0,_0x6df4cb[_0x8937b(0x583)]][this[_0x8937b(0x5d3)][_0x8937b(0x3e7)]()]);if(this['_reflection'])_0x2b5fb3*=-0x1;this[_0x8937b(0x232)]=_0x2b5fb3;}else{$dataSystem[_0x8937b(0x51a)][_0x1652bd][_0x8937b(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4e6ddf=_0x8937b(0x49a)['format'](String(RegExp['$1']));Game_Switches[_0x8937b(0x52f)][_0x1652bd]=new Function('switchId',_0x4e6ddf);}}const _0x448b2b=$gameTemp[_0x8937b(0x206)]()||this;return Game_Switches['advancedFunc'][_0x1652bd][_0x8937b(0x317)](_0x448b2b,_0x1652bd);},Game_Switches[_0x317e8f(0x32c)][_0x317e8f(0x337)]=function(_0x84e66){const _0x2edf42=_0x317e8f,_0x5d2d0c=$gameTemp[_0x2edf42(0x206)]()||this;if(_0x5d2d0c['constructor']!==Game_Event)return VisuMZ[_0x2edf42(0x5ac)][_0x2edf42(0x5ce)][_0x2edf42(0x317)](this,_0x84e66);else{const _0x4f71aa=[_0x5d2d0c['_mapId'],_0x5d2d0c['_eventId'],_0x2edf42(0x408)[_0x2edf42(0x49f)](_0x84e66)];return $gameSelfSwitches['value'](_0x4f71aa);}},Game_Switches[_0x317e8f(0x32c)][_0x317e8f(0x199)]=function(_0x47f78d){const _0xf232e0=_0x317e8f,_0x334bfb=$gameMap?$gameMap[_0xf232e0(0x4f2)]():0x0,_0x123b87=[0x0,0x0,_0xf232e0(0x5ae)['format'](_0x334bfb,_0x47f78d)];return $gameSelfSwitches[_0xf232e0(0x4d0)](_0x123b87);},VisuMZ['EventsMoveCore'][_0x317e8f(0x4ae)]=Game_Switches[_0x317e8f(0x32c)][_0x317e8f(0x51e)],Game_Switches[_0x317e8f(0x32c)]['setValue']=function(_0x5cc46e,_0x6eb385){const _0x583ab1=_0x317e8f;if(DataManager['isSelfSwitch'](_0x5cc46e))this[_0x583ab1(0x25e)](_0x5cc46e,_0x6eb385);else{if(DataManager[_0x583ab1(0x3d6)](_0x5cc46e)){if('ecMId'===_0x583ab1(0x1c6))this[_0x583ab1(0x21d)](_0x5cc46e,_0x6eb385);else return _0x6f2bd[_0x583ab1(0x5ac)][_0x583ab1(0x2c7)][_0x583ab1(0x50c)][_0x583ab1(0x323)];}else VisuMZ[_0x583ab1(0x5ac)][_0x583ab1(0x4ae)]['call'](this,_0x5cc46e,_0x6eb385);}},Game_Switches[_0x317e8f(0x32c)]['setSelfValue']=function(_0x190874,_0x5ee539){const _0x1ec240=_0x317e8f,_0x3b6aaa=$gameTemp['getSelfTarget']()||this;if(_0x3b6aaa[_0x1ec240(0x312)]!==Game_Event)VisuMZ[_0x1ec240(0x5ac)][_0x1ec240(0x4ae)][_0x1ec240(0x317)](this,_0x190874,_0x5ee539);else{if('jzRFX'!==_0x1ec240(0x638)){const _0x404fbd=[_0x3b6aaa[_0x1ec240(0x382)],_0x3b6aaa[_0x1ec240(0x3d9)],_0x1ec240(0x408)['format'](_0x190874)];$gameSelfSwitches[_0x1ec240(0x51e)](_0x404fbd,_0x5ee539);}else{if(!_0x25c40b[_0x1ec240(0x50a)]()&&_0x19df70<0x0){let _0x11c08d=_0x16c5b1[_0x1ec240(0x56a)]();if(_0x11c08d>0x0)return _0x57e103[_0x1ec240(0x285)]()['follower'](_0x11c08d-0x1);}return _0x278768[_0x1ec240(0x5ac)][_0x1ec240(0x436)][_0x1ec240(0x317)](this,_0x4d7cb2);}}},Game_Switches[_0x317e8f(0x32c)][_0x317e8f(0x21d)]=function(_0x58fcda,_0x1e0ec2){const _0x1b9071=_0x317e8f,_0x958fc4=$gameMap?$gameMap[_0x1b9071(0x4f2)]():0x0,_0x2bf75f=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x1b9071(0x49f)](_0x958fc4,_0x58fcda)];return $gameSelfSwitches[_0x1b9071(0x51e)](_0x2bf75f,_0x1e0ec2);},VisuMZ['EventsMoveCore'][_0x317e8f(0x24a)]=Game_Variables[_0x317e8f(0x32c)][_0x317e8f(0x4d0)],Game_Variables[_0x317e8f(0x32c)]['value']=function(_0x40663d){const _0x4bdcd9=_0x317e8f;if(DataManager[_0x4bdcd9(0x3d7)](_0x40663d)){if(_0x4bdcd9(0x27b)!==_0x4bdcd9(0x374))return this[_0x4bdcd9(0x25a)](_0x40663d);else{const _0x27af50=this['textSizeEx'](this[_0x4bdcd9(0x1df)]);this[_0x4bdcd9(0x5c1)]=_0x27af50['width']+(_0x20b0f3[_0x4bdcd9(0x350)]()+this['itemPadding']())*0x2,this[_0x4bdcd9(0x4ba)]=_0x32e085['max'](this[_0x4bdcd9(0x523)](),_0x27af50[_0x4bdcd9(0x4ba)])+_0x54c5ab[_0x4bdcd9(0x350)]()*0x2,this[_0x4bdcd9(0x4bd)]();}}else{if(DataManager[_0x4bdcd9(0x2ea)](_0x40663d))return this[_0x4bdcd9(0x337)](_0x40663d);else{if(DataManager[_0x4bdcd9(0x533)](_0x40663d)){if(_0x4bdcd9(0x601)!==_0x4bdcd9(0x4f3))return this[_0x4bdcd9(0x199)](_0x40663d);else{const _0x4eda60=this['lastSpawnedEvent']();return _0x4eda60?_0x4eda60['_eventId']:0x0;}}else return VisuMZ['EventsMoveCore'][_0x4bdcd9(0x24a)]['call'](this,_0x40663d);}}},Game_Variables[_0x317e8f(0x52f)]={},Game_Variables['prototype'][_0x317e8f(0x25a)]=function(_0x2bbd52){const _0x116900=_0x317e8f;if(!Game_Variables['advancedFunc'][_0x2bbd52]){if('UyZzw'!=='UyZzw'){if(_0x1a5cee[_0x116900(0x243)])this[_0x116900(0x4b8)](_0x5bbf59[_0x116900(0x243)]);}else{$dataSystem[_0x116900(0x375)][_0x2bbd52][_0x116900(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x91e76a='return\x20%1'[_0x116900(0x49f)](String(RegExp['$1']));Game_Variables[_0x116900(0x52f)][_0x2bbd52]=new Function(_0x116900(0x248),_0x91e76a);}}const _0x5676d7=$gameTemp[_0x116900(0x206)]()||this;return Game_Variables[_0x116900(0x52f)][_0x2bbd52][_0x116900(0x317)](_0x5676d7,_0x2bbd52);},Game_Variables[_0x317e8f(0x32c)][_0x317e8f(0x337)]=function(_0x248dd4){const _0x217afa=_0x317e8f,_0x303ef1=$gameTemp['getSelfTarget']()||this;if(_0x303ef1[_0x217afa(0x312)]!==Game_Event){if(_0x217afa(0x2ae)!==_0x217afa(0x2ae)){let _0x542520=_0x217afa(0x33e)['format'](_0x44cc2a[_0x217afa(0x4f2)]);_0x542520+=_0x217afa(0x1a2),_0x542520+=_0x217afa(0x526),_0x542520+=_0x217afa(0x3ae),_0x542520+=_0x217afa(0x252)[_0x217afa(0x49f)](_0x367528[_0x217afa(0x4f2)]),_0x57abaa(_0x542520);return;}else return VisuMZ['EventsMoveCore'][_0x217afa(0x24a)][_0x217afa(0x317)](this,_0x248dd4);}else{const _0x257ea0=[_0x303ef1[_0x217afa(0x382)],_0x303ef1['_eventId'],_0x217afa(0x440)[_0x217afa(0x49f)](_0x248dd4)];return $gameSelfSwitches['value'](_0x257ea0);}},Game_Variables['prototype'][_0x317e8f(0x199)]=function(_0x187a7b){const _0x202ece=_0x317e8f,_0x24a8a9=$gameMap?$gameMap[_0x202ece(0x4f2)]():0x0,_0x1d5e3e=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x24a8a9,_0x187a7b)];return $gameSelfSwitches[_0x202ece(0x4d0)](_0x1d5e3e)||0x0;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5cc)]=Game_Variables[_0x317e8f(0x32c)][_0x317e8f(0x51e)],Game_Variables[_0x317e8f(0x32c)][_0x317e8f(0x51e)]=function(_0x5340d5,_0x3df4cf){const _0x40daeb=_0x317e8f;if(DataManager[_0x40daeb(0x2ea)](_0x5340d5)){if(_0x40daeb(0x2a7)===_0x40daeb(0x2a7))this[_0x40daeb(0x25e)](_0x5340d5,_0x3df4cf);else return _0x2a1945[_0x40daeb(0x525)](this);}else{if(DataManager[_0x40daeb(0x533)](_0x5340d5))this[_0x40daeb(0x21d)](_0x5340d5,_0x3df4cf);else{if('PNqdx'===_0x40daeb(0x332))return this[_0x40daeb(0x568)]()+this[_0x40daeb(0x49b)]()+this[_0x40daeb(0x48c)]();else VisuMZ['EventsMoveCore'][_0x40daeb(0x5cc)][_0x40daeb(0x317)](this,_0x5340d5,_0x3df4cf);}}},Game_Variables[_0x317e8f(0x32c)][_0x317e8f(0x25e)]=function(_0x4424bf,_0x514dac){const _0x38f2d9=_0x317e8f,_0xcd64e7=$gameTemp['getSelfTarget']()||this;if(_0xcd64e7[_0x38f2d9(0x312)]!==Game_Event)VisuMZ[_0x38f2d9(0x5ac)][_0x38f2d9(0x5cc)][_0x38f2d9(0x317)](this,_0x4424bf,_0x514dac);else{const _0x43b5d7=[_0xcd64e7['_mapId'],_0xcd64e7[_0x38f2d9(0x3d9)],_0x38f2d9(0x440)[_0x38f2d9(0x49f)](_0x4424bf)];$gameSelfSwitches['setValue'](_0x43b5d7,_0x514dac);}},Game_Variables[_0x317e8f(0x32c)][_0x317e8f(0x21d)]=function(_0x28eff5,_0x58463f){const _0x81d785=_0x317e8f,_0x212cf5=$gameMap?$gameMap['mapId']():0x0,_0x25074e=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x81d785(0x49f)](_0x212cf5,_0x28eff5)];$gameSelfSwitches[_0x81d785(0x51e)](_0x25074e,_0x58463f);},VisuMZ[_0x317e8f(0x5ac)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x317e8f(0x32c)][_0x317e8f(0x4d0)],Game_SelfSwitches['prototype'][_0x317e8f(0x4d0)]=function(_0x5be492){const _0x307188=_0x317e8f;if(_0x5be492[0x2][_0x307188(0x5bf)](/(?:SELF|MAP)/i))return this['selfValue'](_0x5be492);else{if(_0x307188(0x5b0)!==_0x307188(0x5b0)){if(this[_0x307188(0x278)]())return![];if(this[_0x307188(0x341)])return![];if(this[_0x307188(0x416)])return![];if(this[_0x307188(0x44c)]==='')return![];if(this[_0x307188(0x312)]===_0x7f5b6e)return![];return!![];}else{return VisuMZ[_0x307188(0x5ac)][_0x307188(0x60e)][_0x307188(0x317)](this,_0x5be492);;}}},Game_SelfSwitches[_0x317e8f(0x32c)][_0x317e8f(0x337)]=function(_0x4b82b2){const _0x533466=_0x317e8f;return _0x4b82b2[0x2][_0x533466(0x5bf)](/VAR/i)?this[_0x533466(0x1ad)][_0x4b82b2]||0x0:!!this['_data'][_0x4b82b2];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x648)]=Game_SelfSwitches[_0x317e8f(0x32c)][_0x317e8f(0x51e)],Game_SelfSwitches['prototype'][_0x317e8f(0x51e)]=function(_0x1b2ddc,_0xdafbe3){const _0x4993a0=_0x317e8f;_0x1b2ddc[0x2]['match'](/(?:SELF|MAP)/i)?this['setSelfValue'](_0x1b2ddc,_0xdafbe3):VisuMZ[_0x4993a0(0x5ac)][_0x4993a0(0x648)][_0x4993a0(0x317)](this,_0x1b2ddc,_0xdafbe3);},Game_SelfSwitches[_0x317e8f(0x32c)][_0x317e8f(0x25e)]=function(_0x11f1dc,_0x59770d){const _0x29a4e8=_0x317e8f;this[_0x29a4e8(0x1ad)][_0x11f1dc]=_0x11f1dc[0x2]['match'](/VAR/i)?_0x59770d:!!_0x59770d,this[_0x29a4e8(0x469)]();},VisuMZ['EventsMoveCore'][_0x317e8f(0x4a4)]=Game_Enemy[_0x317e8f(0x32c)][_0x317e8f(0x5af)],Game_Enemy[_0x317e8f(0x32c)][_0x317e8f(0x5af)]=function(_0x4d4f8b){const _0x4b039f=_0x317e8f;$gameTemp[_0x4b039f(0x264)](this);const _0x21d923=VisuMZ[_0x4b039f(0x5ac)]['Game_Enemy_meetsSwitchCondition'][_0x4b039f(0x317)](this,_0x4d4f8b);return $gameTemp['clearSelfTarget'](),_0x21d923;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x591)]=Game_Troop[_0x317e8f(0x32c)][_0x317e8f(0x5f4)],Game_Troop['prototype']['meetsConditions']=function(_0x505f03){const _0x204d1a=_0x317e8f;$gameTemp['registerSelfTarget'](this);const _0x3189d2=VisuMZ['EventsMoveCore'][_0x204d1a(0x591)][_0x204d1a(0x317)](this,_0x505f03);return $gameTemp[_0x204d1a(0x2cd)](),_0x3189d2;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x4bc)]=Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x5fa)],Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x5fa)]=function(_0x4d84aa){const _0xb468=_0x317e8f;this['removeTemporaryMapSpawnedEvents'](_0x4d84aa),this[_0xb468(0x60b)](),VisuMZ[_0xb468(0x5ac)][_0xb468(0x4bc)][_0xb468(0x317)](this,_0x4d84aa),this['clearEventCache'](),this[_0xb468(0x30a)](),this[_0xb468(0x56e)](),this[_0xb468(0x647)](),this[_0xb468(0x488)](),this[_0xb468(0x60b)]();},VisuMZ['EventsMoveCore'][_0x317e8f(0x524)]=Game_Map['prototype']['setupEvents'],Game_Map['prototype'][_0x317e8f(0x19a)]=function(){const _0x49ec7b=_0x317e8f;VisuMZ['EventsMoveCore'][_0x49ec7b(0x524)]['call'](this),this[_0x49ec7b(0x507)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x441)]=function(){const _0x306fa6=_0x317e8f,_0x309263=Game_Map[_0x306fa6(0x26c)];this[_0x306fa6(0x2f6)]=this[_0x306fa6(0x45d)]()[_0x306fa6(0x504)]>_0x309263;if(this['_eventOverload']&&$gameTemp[_0x306fa6(0x45e)]()){}},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x5df)]=function(){const _0x58b6ee=_0x317e8f;return this[_0x58b6ee(0x2f6)];},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x60b)]=function(){this['_eventCache']=undefined;},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x30a)]=function(){const _0x58f697=_0x317e8f;this['_diagonalSupport']=VisuMZ['EventsMoveCore'][_0x58f697(0x2c7)][_0x58f697(0x50c)][_0x58f697(0x1dc)];const _0x564279=$dataMap[_0x58f697(0x4b5)]||'';if(_0x564279[_0x58f697(0x5bf)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x58f697(0x344)]=!![];else _0x564279[_0x58f697(0x5bf)](/<DIAGONAL MOVEMENT: OFF>/i)&&(_0x58f697(0x272)!==_0x58f697(0x627)?this[_0x58f697(0x344)]=![]:(_0x46a6ce[_0x58f697(0x4f2)]=_0x4d1b7c[_0x58f697(0x3b9)],_0xbf9740[_0x58f697(0x23b)]=_0x3d2b0f[_0x58f697(0x544)]));},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x334)]=function(){const _0x2c0f1b=_0x317e8f,_0x1a50bc=$gameSystem[_0x2c0f1b(0x2d4)]();if(_0x1a50bc==='enable')return!![];if(_0x1a50bc===_0x2c0f1b(0x3c7))return![];if(this['_diagonalSupport']===undefined)this['setupDiagonalSupport']();return this[_0x2c0f1b(0x344)];},Game_Map['prototype'][_0x317e8f(0x3c3)]=function(_0x59427b,_0x592a2f){const _0x1a818d=_0x317e8f;if([0x1,0x4,0x7][_0x1a818d(0x4fa)](_0x592a2f))_0x59427b-=0x1;if([0x3,0x6,0x9][_0x1a818d(0x4fa)](_0x592a2f))_0x59427b+=0x1;return this[_0x1a818d(0x5b2)](_0x59427b);},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x629)]=function(_0x114f8c,_0x2690eb){const _0x17f0d3=_0x317e8f;if([0x1,0x2,0x3][_0x17f0d3(0x4fa)](_0x2690eb))_0x114f8c+=0x1;if([0x7,0x8,0x9][_0x17f0d3(0x4fa)](_0x2690eb))_0x114f8c-=0x1;return this[_0x17f0d3(0x32b)](_0x114f8c);},Game_Map['prototype']['absDistance']=function(_0x12cf5a,_0x376047,_0x475540,_0x310cf5){const _0xfe1f2d=_0x317e8f;return Math[_0xfe1f2d(0x219)](Math[_0xfe1f2d(0x35d)](this[_0xfe1f2d(0x56c)](_0x12cf5a,_0x475540)),Math['abs'](this[_0xfe1f2d(0x59a)](_0x376047,_0x310cf5)));},Game_Map['prototype'][_0x317e8f(0x56e)]=function(){const _0x370c22=_0x317e8f,_0x51ae29=VisuMZ[_0x370c22(0x5ac)]['Settings'][_0x370c22(0x5fe)],_0x2320b6={},_0x1557bd=[_0x370c22(0x4c7),_0x370c22(0x35f),_0x370c22(0x614)],_0x55bdd3=['All','Walk','Player',_0x370c22(0x19e),_0x370c22(0x2b6),_0x370c22(0x38a),_0x370c22(0x481),'Airship'];for(const _0x121b9d of _0x1557bd){if(_0x370c22(0x5a4)!==_0x370c22(0x5a4)){if(_0x4718c9)this[_0x370c22(0x204)](_0xee6aea['x'],_0xefe05a['y']);}else for(const _0x14203e of _0x55bdd3){const _0x469fdc=_0x370c22(0x497)['format'](_0x14203e,_0x121b9d);_0x51ae29[_0x469fdc]&&(_0x2320b6[_0x469fdc]=_0x51ae29[_0x469fdc]['slice'](0x0));}}const _0x3d07dc=$dataMap['note']||'',_0xa38645=_0x3d07dc['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0xa38645)for(const _0x2b4c63 of _0xa38645){if('OLyLB'===_0x370c22(0x289)){_0x26fd92[_0x370c22(0x5ac)][_0x370c22(0x451)][_0x370c22(0x317)](this,_0x4810d2);if(this[_0x370c22(0x203)]()&&_0xe31a99['includes'](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x370c22(0x5b7)){const _0x427f14=this[_0x370c22(0x212)](),_0x24de48=_0x12d1d6[_0x370c22(0x3c3)](this['x'],_0x427f14),_0x259431=_0x48f917[_0x370c22(0x629)](this['y'],_0x427f14);this['startMapCommonEventOnOK'](_0x24de48,_0x259431);}}else{_0x2b4c63[_0x370c22(0x5bf)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x21b946=String(RegExp['$1'])[_0x370c22(0x4ac)]()[_0x370c22(0x2bc)](),_0xba59ca=String(RegExp['$2'])['toLowerCase']()[_0x370c22(0x2bc)]();const _0x36574d=JSON[_0x370c22(0x63b)]('['+RegExp['$3'][_0x370c22(0x5bf)](/\d+/g)+']');_0x21b946=_0x21b946[_0x370c22(0x39a)](0x0)['toUpperCase']()+_0x21b946[_0x370c22(0x5b5)](0x1),_0xba59ca=_0xba59ca[_0x370c22(0x39a)](0x0)['toUpperCase']()+_0xba59ca['slice'](0x1);const _0x484ea7=_0x370c22(0x497)[_0x370c22(0x49f)](_0x21b946,_0xba59ca);if(_0x2320b6[_0x484ea7])_0x2320b6[_0x484ea7]=_0x2320b6[_0x484ea7][_0x370c22(0x445)](_0x36574d);}}this[_0x370c22(0x1de)]=_0x2320b6;},Game_Map['prototype'][_0x317e8f(0x1b2)]=function(_0x2f7725,_0x1ee25b,_0x5ceced,_0x254c35){const _0x496c1f=_0x317e8f,_0xb696ef=this['roundXWithDirection'](_0x2f7725,_0x5ceced),_0xbcfe75=this['roundYWithDirection'](_0x1ee25b,_0x5ceced),_0x21644b=this['regionId'](_0xb696ef,_0xbcfe75),_0x5a4a09=this[_0x496c1f(0x1de)];if(_0x5a4a09[_0x496c1f(0x475)][_0x496c1f(0x4fa)](_0x21644b))return!![];else{if(_0x254c35===_0x496c1f(0x34e))return _0x5a4a09[_0x496c1f(0x1a0)][_0x496c1f(0x4fa)](_0x21644b)||_0x5a4a09[_0x496c1f(0x316)]['includes'](_0x21644b);else{if(_0x254c35===_0x496c1f(0x450))return _0x5a4a09[_0x496c1f(0x635)][_0x496c1f(0x4fa)](_0x21644b)||_0x5a4a09[_0x496c1f(0x316)]['includes'](_0x21644b);else{if(_0x5a4a09[_0x496c1f(0x551)][_0x496c1f(0x4fa)](_0x21644b))return!![];else{const _0x509a93=_0x496c1f(0x569)[_0x496c1f(0x49f)](_0x254c35[_0x496c1f(0x39a)](0x0)[_0x496c1f(0x639)]()+_0x254c35[_0x496c1f(0x5b5)](0x1));if(_0x5a4a09[_0x509a93])return _0x5a4a09[_0x509a93][_0x496c1f(0x4fa)](_0x21644b);}}}}return![];},Game_Map['prototype']['isRegionForbidPass']=function(_0x45d6dd,_0x259af3,_0x2f0278,_0x4bbab8){const _0x2c249d=_0x317e8f,_0x2327a5=this[_0x2c249d(0x3c3)](_0x45d6dd,_0x2f0278),_0x122aeb=this[_0x2c249d(0x629)](_0x259af3,_0x2f0278),_0x3324aa=this[_0x2c249d(0x30c)](_0x2327a5,_0x122aeb),_0x1679a0=this[_0x2c249d(0x1de)];if(_0x1679a0['AllForbid'][_0x2c249d(0x4fa)](_0x3324aa))return!![];else{if(_0x4bbab8===_0x2c249d(0x34e))return _0x1679a0[_0x2c249d(0x3f8)][_0x2c249d(0x4fa)](_0x3324aa)||_0x1679a0[_0x2c249d(0x40d)][_0x2c249d(0x4fa)](_0x3324aa);else{if(_0x4bbab8==='event')return _0x1679a0[_0x2c249d(0x5a6)]['includes'](_0x3324aa)||_0x1679a0[_0x2c249d(0x40d)][_0x2c249d(0x4fa)](_0x3324aa);else{if(_0x1679a0['VehicleForbid'][_0x2c249d(0x4fa)](_0x3324aa)){if('JXltu'===_0x2c249d(0x616))return!![];else{_0xb18b24['ConvertParams'](_0x151a2c,_0x5786f6);const _0xe7404a=_0x1aaa16[_0x2c249d(0x5c0)](),_0x5257c0={'template':_0x42764b['TemplateName'],'mapId':_0x8026de[_0x2c249d(0x1b0)]||_0x24507f['mapId'](),'eventId':_0x1799ff[_0x2c249d(0x558)]||_0xe7404a[_0x2c249d(0x23b)](),'x':_0x1479a8['PosX'],'y':_0x5610ba[_0x2c249d(0x1b3)],'spawnPreserved':_0x48ec0c[_0x2c249d(0x213)],'spawnEventId':_0x498038[_0x2c249d(0x4e9)][_0x2c249d(0x504)]+0x3e8},_0x4c6071=_0x2733a1[_0x2c249d(0x4e4)]||0x0;if(!_0x267e92[_0x2c249d(0x190)][_0x5257c0[_0x2c249d(0x4f2)]]&&_0x5257c0[_0x2c249d(0x4f2)]!==_0xf00524['mapId']()){let _0x3bb204=_0x2c249d(0x33e)['format'](_0x5257c0[_0x2c249d(0x4f2)]);_0x3bb204+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x3bb204+=_0x2c249d(0x526),_0x3bb204+=_0x2c249d(0x3ae),_0x3bb204+=_0x2c249d(0x252)[_0x2c249d(0x49f)](_0x5257c0[_0x2c249d(0x4f2)]),_0x48251b(_0x3bb204);return;}const _0x23a828=_0x50f346[_0x2c249d(0x2af)](_0x5257c0,_0x480bd0['Collision'],_0x90530f['Passability']);_0x4c6071&&_0x2a0b67[_0x2c249d(0x51e)](_0x4c6071,!!_0x23a828);}}else{const _0x271c3b=_0x2c249d(0x1e0)[_0x2c249d(0x49f)](_0x4bbab8[_0x2c249d(0x39a)](0x0)['toUpperCase']()+_0x4bbab8['slice'](0x1));if(_0x1679a0[_0x271c3b])return _0x1679a0[_0x271c3b]['includes'](_0x3324aa);}}}}return![];},Game_Map['prototype'][_0x317e8f(0x25d)]=function(_0x24ff38,_0x1ba30d,_0x2d1972,_0x17ddda){const _0x2e2b52=_0x317e8f;_0x2d1972=_0x17ddda===_0x2e2b52(0x24e)?0x5:_0x2d1972;const _0x43f0f5=this[_0x2e2b52(0x3c3)](_0x24ff38,_0x2d1972),_0x2f8b69=this[_0x2e2b52(0x629)](_0x1ba30d,_0x2d1972),_0x362d11=this[_0x2e2b52(0x30c)](_0x43f0f5,_0x2f8b69),_0x237548=this[_0x2e2b52(0x1de)];if(_0x237548[_0x2e2b52(0x2dd)][_0x2e2b52(0x4fa)](_0x362d11))return!![];else{const _0x5137a5=_0x2e2b52(0x293)[_0x2e2b52(0x49f)](_0x17ddda[_0x2e2b52(0x39a)](0x0)[_0x2e2b52(0x639)]()+_0x17ddda[_0x2e2b52(0x5b5)](0x1));if(_0x237548[_0x5137a5])return _0x237548[_0x5137a5][_0x2e2b52(0x4fa)](_0x362d11);}return![];},VisuMZ[_0x317e8f(0x5ac)]['Game_Map_refresh']=Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x4dd)],Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x4dd)]=function(){const _0x1677d7=_0x317e8f;VisuMZ[_0x1677d7(0x5ac)][_0x1677d7(0x42c)][_0x1677d7(0x317)](this),this[_0x1677d7(0x1ec)]();},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x1ec)]=function(){const _0x184581=_0x317e8f;this['_needsPeriodicRefresh']=![];if(this['events']()[_0x184581(0x387)](_0x4a8253=>_0x4a8253[_0x184581(0x41e)]())){this[_0x184581(0x63a)]=!![];return;}if(this[_0x184581(0x45d)]()[_0x184581(0x387)](_0x3f0025=>_0x3f0025['hasCPCs']())){this[_0x184581(0x63a)]=!![];return;}if(this[_0x184581(0x2d5)][_0x184581(0x387)](_0x2dc125=>_0x2dc125[_0x184581(0x41e)]())){if(_0x184581(0x550)!=='cJEkl'){this['_needsPeriodicRefresh']=!![];return;}else{if(_0x29feb2['isEventRunning']())return![];if(_0x2d43a4[_0x184581(0x28e)]())return![];return _0x3e716b[_0x184581(0x1d8)]()[_0x184581(0x4fa)](this[_0x184581(0x30c)]());}}if(this[_0x184581(0x2d5)][_0x184581(0x387)](_0x502362=>_0x502362['hasCPCs']())){if(_0x184581(0x18e)!==_0x184581(0x18e))_0x3bf3ec=_0x3dcc7b[_0x184581(0x3b6)](_0x493b51),_0x383033['EventsMoveCore'][_0x184581(0x52d)][_0x184581(0x317)](this,_0x55d97d);else{this[_0x184581(0x63a)]=!![];return;}}},VisuMZ['EventsMoveCore'][_0x317e8f(0x431)]=Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x358)],Game_Map[_0x317e8f(0x32c)]['update']=function(_0x549ee7){const _0x7e1790=_0x317e8f;this[_0x7e1790(0x1bb)](),VisuMZ[_0x7e1790(0x5ac)]['Game_Map_update'][_0x7e1790(0x317)](this,_0x549ee7);},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x1bb)]=function(){const _0x4e117f=_0x317e8f;if(!this[_0x4e117f(0x63a)])return;this[_0x4e117f(0x5c8)]=this[_0x4e117f(0x5c8)]||0x3c,this['_periodicRefreshTimer']--;if(this[_0x4e117f(0x5c8)]<=0x0){if(_0x4e117f(0x23a)===_0x4e117f(0x59c)){if(this[_0x4e117f(0x18c)](this['x'],this['y'],_0x5a61b0))_0x272996['push'](_0x363770);}else this[_0x4e117f(0x3c4)](),this[_0x4e117f(0x5c8)]=0x3c;}},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x192)]=Game_Map[_0x317e8f(0x32c)]['isDashDisabled'],Game_Map[_0x317e8f(0x32c)]['isDashDisabled']=function(){const _0x10f1ca=_0x317e8f;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0x10f1ca(0x5ac)][_0x10f1ca(0x192)][_0x10f1ca(0x317)](this);},Game_Map[_0x317e8f(0x32c)]['setupSaveEventLocations']=function(){const _0x4f0d37=_0x317e8f;this[_0x4f0d37(0x268)]=![];const _0x142da5=$dataMap[_0x4f0d37(0x4b5)]||'';_0x142da5['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x4f0d37(0x268)]=!![]);},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x3d8)]=function(){const _0x23df70=_0x317e8f;if(this[_0x23df70(0x268)]===undefined)this[_0x23df70(0x647)]();return this[_0x23df70(0x268)];},Game_Map[_0x317e8f(0x32c)]['removeTemporaryMapSpawnedEvents']=function(_0x409733){const _0x58db8d=_0x317e8f;_0x409733!==this[_0x58db8d(0x4f2)]()&&$gamePlayer&&$gameSystem['removeTemporaryMapSpawnedEvents'](this['mapId']());},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x488)]=function(){const _0x51aa1f=_0x317e8f;this[_0x51aa1f(0x4e9)]=$gameSystem[_0x51aa1f(0x2a5)](this[_0x51aa1f(0x4f2)]()),this[_0x51aa1f(0x3b2)]=!![];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x515)]=Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x45d)],Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x45d)]=function(){const _0x1bf632=_0x317e8f;if(this[_0x1bf632(0x2a6)])return this[_0x1bf632(0x2a6)];const _0x3cf433=VisuMZ[_0x1bf632(0x5ac)][_0x1bf632(0x515)]['call'](this),_0x46d04d=_0x3cf433[_0x1bf632(0x445)](this[_0x1bf632(0x4e9)]||[]);return this[_0x1bf632(0x2a6)]=_0x46d04d[_0x1bf632(0x365)](_0x3b53cd=>!!_0x3b53cd),this['_eventCache'];},VisuMZ['EventsMoveCore'][_0x317e8f(0x247)]=Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x450)],Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x450)]=function(_0x27dcfe){const _0x8ff537=_0x317e8f;return _0x27dcfe>=0x3e8?_0x8ff537(0x54e)!==_0x8ff537(0x410)?(_0x27dcfe-=0x3e8,this[_0x8ff537(0x4e9)][_0x27dcfe]):_0x2a9b1f['EventsMoveCore'][_0x8ff537(0x5ce)][_0x8ff537(0x317)](this,_0x47f453):VisuMZ['EventsMoveCore'][_0x8ff537(0x247)]['call'](this,_0x27dcfe);},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x265)]=function(_0x4f8c0b){const _0x4e4b94=_0x317e8f,_0x434176=this[_0x4e4b94(0x450)](_0x4f8c0b);if(_0x434176)_0x434176['erase']();},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x1a7)]=function(){const _0x1bc1c7=_0x317e8f,_0xd4258d={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x1bc1c7(0x4e9)][_0x1bc1c7(0x504)]+0x3e8};this[_0x1bc1c7(0x473)](_0xd4258d);},Game_Map[_0x317e8f(0x32c)]['checkExistingEntitiesAt']=function(_0x381358,_0xb21a89){const _0xc990b7=_0x317e8f;if(this['eventsXy'](_0x381358,_0xb21a89)[_0xc990b7(0x504)]>0x0)return!![];if($gamePlayer['x']===_0x381358&&$gamePlayer['y']===_0xb21a89)return!![];if(this['boat']()['posNt'](_0x381358,_0xb21a89))return!![];if(this['ship']()[_0xc990b7(0x520)](_0x381358,_0xb21a89))return!![];return![];},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x41d)]=function(_0x1f654a,_0x1888fb,_0x1405f6){const _0x50a009=_0x317e8f;$gameTemp[_0x50a009(0x58e)]=_0x1f654a;const _0x4bf525=new Game_Event(_0x1f654a[_0x50a009(0x4f2)],_0x1f654a[_0x50a009(0x23b)]);$gameTemp[_0x50a009(0x58e)]=undefined,_0x4bf525['refresh']();let _0x1b7969=_0x1888fb-_0x4bf525[_0x50a009(0x61c)][_0x50a009(0x53a)],_0x34848c=_0x1888fb+_0x4bf525[_0x50a009(0x61c)][_0x50a009(0x53a)],_0x147673=_0x1405f6-_0x4bf525[_0x50a009(0x61c)]['up'],_0x293c5f=_0x1405f6+_0x4bf525['_addedHitbox'][_0x50a009(0x584)];for(let _0x58823a=_0x1b7969;_0x58823a<=_0x34848c;_0x58823a++){if(_0x50a009(0x586)!==_0x50a009(0x3ed))for(let _0x14000b=_0x147673;_0x14000b<=_0x293c5f;_0x14000b++){if(_0x50a009(0x4f8)!==_0x50a009(0x4f8))this['setSelfValue'](_0x270416,_0x134680);else{if(this[_0x50a009(0x33c)](_0x58823a,_0x14000b))return![];}}else return this[_0x50a009(0x25a)](_0x45f186);}return!![];},Game_Map['prototype'][_0x317e8f(0x473)]=function(_0x435c93){const _0xdf435c=_0x317e8f;$gameTemp[_0xdf435c(0x58e)]=_0x435c93;const _0x43479e=new Game_Event(_0x435c93[_0xdf435c(0x4f2)],_0x435c93[_0xdf435c(0x23b)]);$gameTemp[_0xdf435c(0x58e)]=undefined,this[_0xdf435c(0x4e9)][_0xdf435c(0x556)](_0x43479e),_0x43479e[_0xdf435c(0x4e6)](_0x435c93),this[_0xdf435c(0x60b)]();},Game_Map['prototype'][_0x317e8f(0x2af)]=function(_0x11f63f,_0x485e5c,_0x59fee6){const _0x3f2033=_0x317e8f,_0x518b23=_0x11f63f['template'][_0x3f2033(0x639)]()['trim']();if(_0x518b23!==_0x3f2033(0x4a3)){if('OMHOv'!==_0x3f2033(0x4b1)){const _0xdf604d=this[_0x3f2033(0x18b)];_0x4b4322[_0x3f2033(0x5ac)][_0x3f2033(0x5d2)]['call'](this),_0xdf604d!==this['_pageIndex']&&this[_0x3f2033(0x5a9)]();}else{const _0x2336a4=VisuMZ[_0x3f2033(0x367)][_0x518b23];_0x2336a4&&('svbzS'===_0x3f2033(0x5ad)?(_0x11f63f[_0x3f2033(0x4f2)]=_0x2336a4[_0x3f2033(0x3b9)],_0x11f63f[_0x3f2033(0x23b)]=_0x2336a4[_0x3f2033(0x544)]):(_0x24bf90['clearDestination'](),this['start']()));}}const _0x48a473=_0x11f63f['x'],_0x49edc7=_0x11f63f['y'];if(!this['isValid'](_0x48a473,_0x49edc7))return![];if(_0x485e5c){if(this[_0x3f2033(0x33c)](_0x48a473,_0x49edc7))return![];if(!this[_0x3f2033(0x41d)](_0x11f63f,_0x48a473,_0x49edc7))return![];}if(_0x59fee6){if('ocOvw'===_0x3f2033(0x238)){if([0x2,0x4,0x6,0x8]['includes'](_0x35660f))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x30091b))return 0x5;}else{if(!this[_0x3f2033(0x1be)](_0x48a473,_0x49edc7))return![];}}return this[_0x3f2033(0x473)](_0x11f63f),!![];},Game_Map[_0x317e8f(0x32c)]['prepareSpawnedEventAtRegion']=function(_0x995adb,_0x20caf9,_0x23d0a6,_0x3a1b89){const _0x5a5af6=_0x317e8f,_0x118b48=[],_0x4539b2=this[_0x5a5af6(0x5c1)](),_0xc81e83=this[_0x5a5af6(0x4ba)]();for(let _0x5a1ab3=0x0;_0x5a1ab3<_0x4539b2;_0x5a1ab3++){for(let _0x27c609=0x0;_0x27c609<_0xc81e83;_0x27c609++){if(!_0x20caf9[_0x5a5af6(0x4fa)](this['regionId'](_0x5a1ab3,_0x27c609)))continue;if(!this[_0x5a5af6(0x2d0)](_0x5a1ab3,_0x27c609))continue;if(_0x23d0a6){if(this[_0x5a5af6(0x33c)](_0x5a1ab3,_0x27c609))continue;if(!this[_0x5a5af6(0x41d)](_0x995adb,_0x5a1ab3,_0x27c609))continue;}if(_0x3a1b89){if(!this['isPassableByAnyDirection'](_0x5a1ab3,_0x27c609))continue;}_0x118b48[_0x5a5af6(0x556)]([_0x5a1ab3,_0x27c609]);}}if(_0x118b48['length']>0x0){const _0x5a1d08=_0x118b48[Math[_0x5a5af6(0x2c6)](_0x118b48['length'])];return _0x995adb['x']=_0x5a1d08[0x0],_0x995adb['y']=_0x5a1d08[0x1],this['createSpawnedEventWithData'](_0x995adb),!![];}return![];},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x44e)]=function(_0x57921d,_0x4b1dba,_0x28f55b,_0x3b1f3a){const _0x10dc0f=_0x317e8f,_0x928cac=[],_0x3a0609=this[_0x10dc0f(0x5c1)](),_0x19f39f=this['height']();for(let _0x2bf13f=0x0;_0x2bf13f<_0x3a0609;_0x2bf13f++){for(let _0x58ae50=0x0;_0x58ae50<_0x19f39f;_0x58ae50++){if(!_0x4b1dba[_0x10dc0f(0x4fa)](this['terrainTag'](_0x2bf13f,_0x58ae50)))continue;if(!this['isValid'](_0x2bf13f,_0x58ae50))continue;if(_0x28f55b){if(this['checkExistingEntitiesAt'](_0x2bf13f,_0x58ae50))continue;if(!this['isSpawnHitboxCollisionOk'](_0x57921d,_0x2bf13f,_0x58ae50))continue;}if(_0x3b1f3a){if(!this[_0x10dc0f(0x1be)](_0x2bf13f,_0x58ae50))continue;}_0x928cac[_0x10dc0f(0x556)]([_0x2bf13f,_0x58ae50]);}}if(_0x928cac['length']>0x0){const _0x2b3019=_0x928cac[Math['randomInt'](_0x928cac['length'])];return _0x57921d['x']=_0x2b3019[0x0],_0x57921d['y']=_0x2b3019[0x1],this[_0x10dc0f(0x473)](_0x57921d),!![];}return![];},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x1be)]=function(_0x4c54e0,_0x556b49){const _0x43b2ac=_0x317e8f;if(this['isPassable'](_0x4c54e0,_0x556b49,0x2))return!![];if(this['isPassable'](_0x4c54e0,_0x556b49,0x4))return!![];if(this[_0x43b2ac(0x500)](_0x4c54e0,_0x556b49,0x6))return!![];if(this[_0x43b2ac(0x500)](_0x4c54e0,_0x556b49,0x8))return!![];return![];},Game_Map['prototype']['despawnEventId']=function(_0x5766bb){const _0x5cb1b5=_0x317e8f;if(_0x5766bb<0x3e8)return;if(!this[_0x5cb1b5(0x4e9)])return;const _0x235842=this[_0x5cb1b5(0x450)](_0x5766bb);_0x235842[_0x5cb1b5(0x355)](-0x1,-0x1),_0x235842[_0x5cb1b5(0x3f0)](),this[_0x5cb1b5(0x4e9)][_0x5766bb-0x3e8]=null,this[_0x5cb1b5(0x60b)]();},Game_Map['prototype'][_0x317e8f(0x3cf)]=function(){const _0x2aaf92=_0x317e8f;for(const _0x404f8e of this[_0x2aaf92(0x4e9)]){if(_0x2aaf92(0x221)==='SCavz'){if(_0x404f8e)return _0x404f8e;}else{const _0x5c0978=_0x790964(_0x2f9197['$1'])[_0x2aaf92(0x639)]()[_0x2aaf92(0x2bc)]();return this[_0x2aaf92(0x222)](_0x5c0978);}}return null;},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x2d3)]=function(){const _0xa1da17=this['firstSpawnedEvent']();return _0xa1da17?_0xa1da17['_eventId']:0x0;},Game_Map['prototype'][_0x317e8f(0x2fd)]=function(){const _0x4f9822=_0x317e8f,_0x47ade1=this[_0x4f9822(0x4e9)][_0x4f9822(0x5b5)](0x0)['reverse']();for(const _0x4fdfed of _0x47ade1){if(_0x4fdfed)return _0x4fdfed;}return null;},Game_Map[_0x317e8f(0x32c)]['lastSpawnedEventID']=function(){const _0x6b8de7=_0x317e8f,_0x539251=this[_0x6b8de7(0x2fd)]();return _0x539251?_0x539251[_0x6b8de7(0x3d9)]:0x0;},Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x3b7)]=function(_0x3730ee,_0x326906){const _0x4df438=_0x317e8f,_0x4920cc=this[_0x4df438(0x1ee)](_0x3730ee,_0x326906);for(const _0x289660 of _0x4920cc){if(!_0x289660)continue;if(_0x289660['isSpawnedEvent']())this[_0x4df438(0x391)](_0x289660[_0x4df438(0x3d9)]);}},Game_Map['prototype'][_0x317e8f(0x4f6)]=function(_0x1bc614){const _0x4a6c0d=_0x317e8f;for(const _0x2b129b of this[_0x4a6c0d(0x4e9)]){if(!_0x2b129b)continue;_0x1bc614[_0x4a6c0d(0x4fa)](_0x2b129b['regionId']())&&this[_0x4a6c0d(0x391)](_0x2b129b['_eventId']);}},Game_Map['prototype'][_0x317e8f(0x609)]=function(_0x4f0899){const _0x208776=_0x317e8f;for(const _0x215c32 of this['_spawnedEvents']){if('CLjOl'!=='PZezj'){if(!_0x215c32)continue;_0x4f0899[_0x208776(0x4fa)](_0x215c32[_0x208776(0x3bd)]())&&this[_0x208776(0x391)](_0x215c32['_eventId']);}else this[_0x208776(0x3ee)]=!![],_0x4788d9['EventsMoveCore']['Game_Event_setupPageSettings'][_0x208776(0x317)](this),this[_0x208776(0x5a9)](),this['_activationProximityAutoTriggerBypass']=![];}},Game_Map['prototype'][_0x317e8f(0x1cb)]=function(){const _0xb55a6f=_0x317e8f;for(const _0x522f51 of this[_0xb55a6f(0x4e9)]){if('QELPz'===_0xb55a6f(0x53d)){const _0x17d0f7=_0x3507de[_0xb55a6f(0x2bf)](this[_0xb55a6f(0x231)]());this[_0xb55a6f(0x38f)](_0x17d0f7);}else{if(!_0x522f51)continue;this[_0xb55a6f(0x391)](_0x522f51[_0xb55a6f(0x3d9)]);}}},VisuMZ['EventsMoveCore'][_0x317e8f(0x32d)]=Game_Map[_0x317e8f(0x32c)]['unlockEvent'],Game_Map['prototype'][_0x317e8f(0x291)]=function(_0x4523d5){const _0x14d214=_0x317e8f;VisuMZ[_0x14d214(0x5ac)][_0x14d214(0x32d)][_0x14d214(0x317)](this,_0x4523d5);if(_0x4523d5>=0x3e8){if(_0x14d214(0x2ba)!==_0x14d214(0x4ef)){const _0x1dc4d1=this[_0x14d214(0x450)](_0x4523d5);if(_0x1dc4d1)_0x1dc4d1[_0x14d214(0x47e)]();}else{const _0x52a6c4=this['_randomHomeX'],_0x347381=this[_0x14d214(0x537)];return this[_0x14d214(0x223)](_0x52a6c4,_0x347381);}}},Game_CommonEvent['prototype'][_0x317e8f(0x41e)]=function(){const _0x4deda4=_0x317e8f,_0x2a189c=this['event']();return this[_0x4deda4(0x49c)]()&&_0x2a189c[_0x4deda4(0x5a1)]>=0x1&&DataManager[_0x4deda4(0x5b4)](_0x2a189c[_0x4deda4(0x2ce)]);},Game_CommonEvent[_0x317e8f(0x32c)][_0x317e8f(0x4ff)]=function(){const _0x1899a1=_0x317e8f;return VisuMZ[_0x1899a1(0x5ac)][_0x1899a1(0x5b6)][_0x1899a1(0x2d5)][_0x1899a1(0x4fa)](this['_commonEventId']);},VisuMZ[_0x317e8f(0x5ac)]['Game_CommonEvent_isActive']=Game_CommonEvent[_0x317e8f(0x32c)][_0x317e8f(0x49c)],Game_CommonEvent['prototype'][_0x317e8f(0x49c)]=function(){const _0xa347eb=_0x317e8f;return VisuMZ[_0xa347eb(0x5ac)][_0xa347eb(0x2c4)][_0xa347eb(0x317)](this)?!![]:VisuMZ['EventsMoveCore'][_0xa347eb(0x5b6)]['metCPC'](this[_0xa347eb(0x450)]()[_0xa347eb(0x604)],this['_commonEventId']);},VisuMZ['EventsMoveCore'][_0x317e8f(0x519)]=Game_Map[_0x317e8f(0x32c)][_0x317e8f(0x335)],Game_Map[_0x317e8f(0x32c)]['parallelCommonEvents']=function(){const _0x13c280=_0x317e8f,_0x83b9bf=VisuMZ[_0x13c280(0x5ac)]['Game_Map_parallelCommonEvents']['call'](this),_0x3dd806=VisuMZ[_0x13c280(0x5ac)][_0x13c280(0x5b6)][_0x13c280(0x2d5)][_0x13c280(0x215)](_0x5cd41a=>$dataCommonEvents[_0x5cd41a]);return _0x83b9bf[_0x13c280(0x445)](_0x3dd806)[_0x13c280(0x365)]((_0x5deb2f,_0x298a26,_0x705421)=>_0x705421[_0x13c280(0x25b)](_0x5deb2f)===_0x298a26);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x43a)]=Game_CharacterBase[_0x317e8f(0x32c)]['initMembers'],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x271)]=function(){const _0x2d1787=_0x317e8f;VisuMZ['EventsMoveCore']['Game_CharacterBase_initMembers']['call'](this),this[_0x2d1787(0x20c)]();},Game_CharacterBase[_0x317e8f(0x32c)]['initEventsMoveCoreSettings']=function(){const _0x424886=_0x317e8f;this[_0x424886(0x418)]=![],this['clearPose'](),this[_0x424886(0x2b9)](),this[_0x424886(0x34b)](),this[_0x424886(0x327)]();},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x50b)]=function(){const _0x36d106=_0x317e8f;if(this[_0x36d106(0x312)]===Game_Player&&this[_0x36d106(0x5d7)]())return this[_0x36d106(0x2de)]()['characterName']()[_0x36d106(0x5bf)](/\[VS8\]/i);else{if(Imported[_0x36d106(0x542)]&&this[_0x36d106(0x644)]()){if('UjTtt'===_0x36d106(0x1d4))return!![];else _0xe0b89e[_0x36d106(0x1b8)]['_filename']=this['shadowFilename'](),_0x54ab03[_0x36d106(0x1b8)]['bitmap']=_0x2d53f3[_0x36d106(0x380)](_0x544968['_shadowSprite']['_filename']);}else return'QEqOu'!==_0x36d106(0x5d4)?this[_0x36d106(0x333)]()[_0x36d106(0x5bf)](/\[VS8\]/i):_0x17c6bf['PlayerForbid'][_0x36d106(0x4fa)](_0x44a866)||_0x779706[_0x36d106(0x40d)]['includes'](_0x560bd3);}},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5db)]=Game_CharacterBase['prototype'][_0x317e8f(0x212)],Game_CharacterBase[_0x317e8f(0x32c)]['direction']=function(){const _0x35f64b=_0x317e8f;if(this[_0x35f64b(0x2df)]()&&!this['isJumping']()&&this['isSpriteVS8dir']()){if(_0x35f64b(0x193)!==_0x35f64b(0x193))this[_0x35f64b(0x52b)](_0x4a0c4b>0x0?0x4:0x6),!this[_0x35f64b(0x357)]()&&_0x34738c!==0x0&&this[_0x35f64b(0x52b)](_0x51fc32>0x0?0x8:0x2);else return this[_0x35f64b(0x3ce)]();}else{if(this['isOnLadder']()&&!this[_0x35f64b(0x2a4)]())return 0x8;else{if(this[_0x35f64b(0x522)]()&&this[_0x35f64b(0x50b)]()){if(_0x35f64b(0x1ef)===_0x35f64b(0x1ef))return this[_0x35f64b(0x5d1)]();else{if(this[_0x35f64b(0x2df)]())return!![];if(this[_0x35f64b(0x312)]===_0x3afb83&&this['isInVehicle']())return!![];return![];}}else{if(_0x35f64b(0x4dc)===_0x35f64b(0x4dc))return VisuMZ[_0x35f64b(0x5ac)][_0x35f64b(0x5db)][_0x35f64b(0x317)](this);else this[_0x35f64b(0x25e)](_0x4c442f,_0x5d3517);}}}},VisuMZ['EventsMoveCore'][_0x317e8f(0x53b)]=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x40e)],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x40e)]=function(_0x218e4c){const _0x5b943a=_0x317e8f;if(!this[_0x5b943a(0x50b)]())_0x218e4c=this[_0x5b943a(0x3bc)](_0x218e4c);VisuMZ[_0x5b943a(0x5ac)][_0x5b943a(0x53b)]['call'](this,_0x218e4c);},Game_CharacterBase[_0x317e8f(0x32c)]['correctFacingDirection']=function(_0x4cffd6){const _0x409864=_0x317e8f;if(_0x4cffd6===0x1)return this[_0x409864(0x18c)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x4cffd6===0x3)return this[_0x409864(0x18c)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x4cffd6===0x7)return this[_0x409864(0x18c)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x4cffd6===0x9)return this[_0x409864(0x18c)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x4cffd6;},Game_CharacterBase[_0x317e8f(0x32c)]['isDiagonalDirection']=function(_0x2046e3){const _0x27aec2=_0x317e8f;return[0x1,0x3,0x5,0x7,0x9][_0x27aec2(0x4fa)](_0x2046e3);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x2d9)]=function(){const _0x1c8f52=_0x317e8f;return this[_0x1c8f52(0x5e7)]||0x0;},VisuMZ[_0x317e8f(0x5ac)]['Game_CharacterBase_moveStraight']=Game_CharacterBase['prototype'][_0x317e8f(0x52b)],Game_CharacterBase[_0x317e8f(0x32c)]['moveStraight']=function(_0x2951b3){const _0x364016=_0x317e8f;this[_0x364016(0x5e7)]=_0x2951b3,VisuMZ['EventsMoveCore'][_0x364016(0x3d3)][_0x364016(0x317)](this,_0x2951b3);},Game_CharacterBase[_0x317e8f(0x32c)]['executeMoveDir8']=function(_0x35461b){const _0x35ba9f=_0x317e8f;if(!this[_0x35ba9f(0x1d2)](_0x35461b))return this['moveStraight'](_0x35461b);let _0x3d78dc=0x0,_0x2d3da6=0x0;switch(_0x35461b){case 0x1:_0x3d78dc=0x4,_0x2d3da6=0x2;break;case 0x3:_0x3d78dc=0x6,_0x2d3da6=0x2;break;case 0x7:_0x3d78dc=0x4,_0x2d3da6=0x8;break;case 0x9:_0x3d78dc=0x6,_0x2d3da6=0x8;break;}if(VisuMZ[_0x35ba9f(0x5ac)]['Settings'][_0x35ba9f(0x50c)][_0x35ba9f(0x4e8)]){if(!this[_0x35ba9f(0x18c)](this['_x'],this['_y'],_0x3d78dc))return this['moveStraight'](_0x2d3da6);if(!this[_0x35ba9f(0x18c)](this['_x'],this['_y'],_0x2d3da6))return this[_0x35ba9f(0x52b)](_0x3d78dc);if(!this[_0x35ba9f(0x3d5)](this['_x'],this['_y'],_0x3d78dc,_0x2d3da6)){let _0xb3fccb=VisuMZ[_0x35ba9f(0x5ac)][_0x35ba9f(0x2c7)][_0x35ba9f(0x50c)][_0x35ba9f(0x18f)]?_0x3d78dc:_0x2d3da6;return this['moveStraight'](_0xb3fccb);}}this[_0x35ba9f(0x5e7)]=_0x35461b,this[_0x35ba9f(0x2cf)](_0x3d78dc,_0x2d3da6);},VisuMZ[_0x317e8f(0x5ac)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x461)],Game_CharacterBase[_0x317e8f(0x32c)]['realMoveSpeed']=function(){const _0x2f36ec=_0x317e8f;let _0x2fb1be=this[_0x2f36ec(0x1c1)];if(this[_0x2f36ec(0x4c0)]()){if(_0x2f36ec(0x46c)!=='vAanb')_0x2fb1be+=this[_0x2f36ec(0x4a9)]();else return this[_0x2f36ec(0x549)](_0x22d49f(_0x1e0a95['$1']));}return this[_0x2f36ec(0x224)](_0x2fb1be);},Game_CharacterBase['prototype']['dashSpeedModifier']=function(){const _0x14d728=_0x317e8f,_0x14db84=VisuMZ[_0x14d728(0x5ac)][_0x14d728(0x2c7)][_0x14d728(0x50c)];return _0x14db84[_0x14d728(0x5eb)]!==undefined?_0x14db84[_0x14d728(0x5eb)]:_0x14d728(0x1d6)!==_0x14d728(0x514)?VisuMZ[_0x14d728(0x5ac)][_0x14d728(0x196)][_0x14d728(0x317)](this)-this[_0x14d728(0x1c1)]:this[_0x14d728(0x522)]()?this[_0x14d728(0x345)]():_0x8ec204[_0x14d728(0x5ac)][_0x14d728(0x5f7)][_0x14d728(0x317)](this);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x224)]=function(_0x19d354){const _0x702bee=_0x317e8f,_0x1dbeee=VisuMZ[_0x702bee(0x5ac)][_0x702bee(0x2c7)][_0x702bee(0x50c)];if(!_0x1dbeee[_0x702bee(0x4f1)])return _0x19d354;return[0x1,0x3,0x7,0x9][_0x702bee(0x4fa)](this['_lastMovedDirection'])&&(_0x19d354*=_0x1dbeee[_0x702bee(0x4d3)]||0.01),_0x19d354;},VisuMZ['EventsMoveCore'][_0x317e8f(0x4d7)]=Game_CharacterBase[_0x317e8f(0x32c)]['isDashing'],Game_CharacterBase[_0x317e8f(0x32c)]['isDashing']=function(){const _0x3386f5=_0x317e8f;if(this[_0x3386f5(0x55a)])return!![];return VisuMZ['EventsMoveCore'][_0x3386f5(0x4d7)][_0x3386f5(0x317)](this);},Game_CharacterBase['prototype']['isDashingAndMoving']=function(){const _0x3b458f=_0x317e8f;return this[_0x3b458f(0x4c0)]();},VisuMZ['EventsMoveCore'][_0x317e8f(0x5f7)]=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x3e7)],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x3e7)]=function(){const _0x463a1d=_0x317e8f;if(this[_0x463a1d(0x522)]()){if(_0x463a1d(0x195)===_0x463a1d(0x191)){let _0x13f972=this[_0x463a1d(0x1c1)];return this[_0x463a1d(0x4c0)]()&&(_0x13f972+=this['dashSpeedModifier']()),this[_0x463a1d(0x224)](_0x13f972);}else return this['getPosingCharacterPattern']();}else{if(_0x463a1d(0x59b)!==_0x463a1d(0x59b)){this[_0x463a1d(0x63a)]=!![];return;}else return VisuMZ[_0x463a1d(0x5ac)][_0x463a1d(0x5f7)][_0x463a1d(0x317)](this);}},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x4ca)]=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x253)],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x253)]=function(){const _0x425fcd=_0x317e8f;VisuMZ[_0x425fcd(0x5ac)][_0x425fcd(0x4ca)][_0x425fcd(0x317)](this),this[_0x425fcd(0x2c1)]();},VisuMZ[_0x317e8f(0x5ac)]['Game_CharacterBase_characterIndex']=Game_CharacterBase['prototype'][_0x317e8f(0x595)],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x595)]=function(){const _0x1ab342=_0x317e8f;if(this[_0x1ab342(0x50b)]())return this[_0x1ab342(0x554)]();return VisuMZ[_0x1ab342(0x5ac)][_0x1ab342(0x5fc)][_0x1ab342(0x317)](this);},Game_CharacterBase['prototype'][_0x317e8f(0x554)]=function(){const _0x2dfa56=_0x317e8f,_0xe07558=this[_0x2dfa56(0x212)]();if(this[_0x2dfa56(0x2a4)]()){if([0x2,0x4,0x6,0x8][_0x2dfa56(0x4fa)](_0xe07558))return 0x4;if([0x1,0x3,0x7,0x9][_0x2dfa56(0x4fa)](_0xe07558))return 0x5;}else{if(this[_0x2dfa56(0x2df)]())return 0x6;else{if(this[_0x2dfa56(0x522)]()){if(_0x2dfa56(0x2da)===_0x2dfa56(0x2f8)){if(!_0x26a9d4['eventLabelsVisible']())return![];if(this[_0x2dfa56(0x3e8)]?.['_erased'])return![];if(_0x2a4910[_0x2dfa56(0x1e4)][_0x2dfa56(0x2c9)]>0x0)return![];const _0x2386ef=_0xa78e9b['x'],_0x43ac55=_0x46e20e['y'],_0x6efe7d=this[_0x2dfa56(0x3e8)]['x'],_0x3f3bc2=this[_0x2dfa56(0x3e8)]['y'];if(this['_visiblePlayerX']===_0x2386ef&&this[_0x2dfa56(0x197)]===_0x43ac55&&this[_0x2dfa56(0x49e)]===_0x6efe7d&&this[_0x2dfa56(0x557)]===_0x3f3bc2)return this[_0x2dfa56(0x3a3)];this[_0x2dfa56(0x1ed)]=_0x208c72['x'],this[_0x2dfa56(0x197)]=_0x267b87['y'],this[_0x2dfa56(0x49e)]=this[_0x2dfa56(0x3e8)]['x'],this[_0x2dfa56(0x557)]=this['_event']['y'];if(_0x511492[_0x2dfa56(0x42a)](_0x2386ef,_0x43ac55,_0x6efe7d,_0x3f3bc2)>this[_0x2dfa56(0x3e8)][_0x2dfa56(0x58f)]())return this[_0x2dfa56(0x3a3)]=![],![];return this[_0x2dfa56(0x3a3)]=!![],!![];}else return this[_0x2dfa56(0x381)]();}else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x2dfa56(0x4fa)](_0xe07558))return 0x4;if([0x1,0x3,0x7,0x9][_0x2dfa56(0x4fa)](_0xe07558))return 0x5;}else{if(this[_0x2dfa56(0x563)]()&&this[_0x2dfa56(0x5b9)]()){if(_0x2dfa56(0x29b)!=='VEdit'){if([0x2,0x4,0x6,0x8][_0x2dfa56(0x4fa)](_0xe07558))return 0x4;if([0x1,0x3,0x7,0x9][_0x2dfa56(0x4fa)](_0xe07558))return 0x5;}else return _0xde0daf[_0x2dfa56(0x525)](this)?_0x34bc9e[_0x2dfa56(0x32c)]['getEventIconData']['call'](this):{'iconIndex':0x0,'bufferX':_0xf8afe7[_0x2dfa56(0x42d)][_0x2dfa56(0x532)],'bufferY':_0x9a9458['Icon'][_0x2dfa56(0x55e)],'blendMode':_0x59ed83['Icon']['BlendMode']};}else{if(this['isDashingAndMoving']()){if(_0x2dfa56(0x3f6)===_0x2dfa56(0x3f6)){if([0x2,0x4,0x6,0x8][_0x2dfa56(0x4fa)](_0xe07558))return 0x2;if([0x1,0x3,0x7,0x9][_0x2dfa56(0x4fa)](_0xe07558))return 0x3;}else{const _0x579738=this[_0x2dfa56(0x4ea)],_0x64ee6c=this[_0x2dfa56(0x537)];return this[_0x2dfa56(0x1e7)](_0x579738,_0x64ee6c);}}else{if([0x2,0x4,0x6,0x8][_0x2dfa56(0x4fa)](_0xe07558))return 0x0;if([0x1,0x3,0x7,0x9][_0x2dfa56(0x4fa)](_0xe07558))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0x317e8f(0x5b9)]=function(){const _0x440b87=_0x317e8f;return VisuMZ[_0x440b87(0x5ac)][_0x440b87(0x2c7)]['VS8'][_0x440b87(0x4c8)];},Game_CharacterBase['prototype'][_0x317e8f(0x2e2)]=function(){const _0x1e513d=_0x317e8f;return this['isOnLadder']()&&this[_0x1e513d(0x3bd)]()===VisuMZ[_0x1e513d(0x5ac)][_0x1e513d(0x2c7)][_0x1e513d(0x3f5)][_0x1e513d(0x385)];},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x3ce)]=function(){const _0x24b8f2=_0x317e8f;if(this[_0x24b8f2(0x2e2)]())return _0x24b8f2(0x3fb)!==_0x24b8f2(0x637)?0x4:this['_selfTarget'];else{if('RlduT'==='RlduT')return 0x2;else this[_0x24b8f2(0x1b8)][_0x24b8f2(0x5d9)]['x']=_0x5719e2[_0x24b8f2(0x219)](0x0,this['_shadowSprite'][_0x24b8f2(0x5d9)]['x']-0.1),this['_shadowSprite'][_0x24b8f2(0x5d9)]['y']=_0x3a3e28[_0x24b8f2(0x219)](0x0,this[_0x24b8f2(0x1b8)]['scale']['y']-0.1);}},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x55c)]=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x358)],Game_CharacterBase[_0x317e8f(0x32c)]['update']=function(){const _0x3a2686=_0x317e8f;VisuMZ['EventsMoveCore'][_0x3a2686(0x55c)][_0x3a2686(0x317)](this),this[_0x3a2686(0x2a8)]();},Game_CharacterBase[_0x317e8f(0x32c)]['updatePose']=function(){const _0x1b3090=_0x317e8f;this[_0x1b3090(0x580)]=this['_poseDuration']||0x0;if(this[_0x1b3090(0x580)]>0x0){this['_poseDuration']--;if(this[_0x1b3090(0x580)]<=0x0&&this[_0x1b3090(0x4b4)]!==_0x1b3090(0x3f2))this['clearPose']();}},VisuMZ['EventsMoveCore']['Game_CharacterBase_moveDiagonally']=Game_CharacterBase[_0x317e8f(0x32c)]['moveDiagonally'],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x2cf)]=function(_0x274260,_0x2ce561){const _0x3ccac5=_0x317e8f;VisuMZ[_0x3ccac5(0x5ac)][_0x3ccac5(0x27f)][_0x3ccac5(0x317)](this,_0x274260,_0x2ce561);if(this[_0x3ccac5(0x50b)]())this[_0x3ccac5(0x581)](_0x274260,_0x2ce561);},Game_CharacterBase[_0x317e8f(0x32c)]['setDiagonalDirection']=function(_0x334fa2,_0x1e161f){const _0x1ca45a=_0x317e8f;if(_0x334fa2===0x4&&_0x1e161f===0x2)this[_0x1ca45a(0x40e)](0x1);if(_0x334fa2===0x6&&_0x1e161f===0x2)this[_0x1ca45a(0x40e)](0x3);if(_0x334fa2===0x4&&_0x1e161f===0x8)this[_0x1ca45a(0x40e)](0x7);if(_0x334fa2===0x6&&_0x1e161f===0x8)this[_0x1ca45a(0x40e)](0x9);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x1f0)]=Game_CharacterBase['prototype']['hasStepAnime'],Game_CharacterBase[_0x317e8f(0x32c)]['hasStepAnime']=function(){const _0xf28ed7=_0x317e8f;if(this[_0xf28ed7(0x522)]()&&this['getPose']()===_0xf28ed7(0x3f2))return!![];return VisuMZ[_0xf28ed7(0x5ac)][_0xf28ed7(0x1f0)][_0xf28ed7(0x317)](this);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x222)]=function(_0x7c7e6b,_0x54d7be){const _0x5a860e=_0x317e8f;if(_0x7c7e6b[_0x5a860e(0x5bf)](/Z/i))_0x7c7e6b=_0x5a860e(0x3f2);if(_0x7c7e6b['match'](/SLEEP/i))_0x7c7e6b=_0x5a860e(0x3f2);this[_0x5a860e(0x50b)]()&&(this[_0x5a860e(0x4b4)]=_0x7c7e6b['toUpperCase']()['trim'](),this['_poseDuration']=_0x54d7be||Infinity);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x598)]=function(){const _0x4a97d4=_0x317e8f;if(this['isSpriteVS8dir']())return(this[_0x4a97d4(0x4b4)]||'')[_0x4a97d4(0x639)]()['trim']();else{if(_0x4a97d4(0x246)!==_0x4a97d4(0x246)){if(_0x2abc90[_0x4a97d4(0x1b2)](_0x5e1a7c,_0x2389d7,_0x107d54,_0x4a97d4(0x34e)))return this[_0x4a97d4(0x5d7)]()&&this[_0x4a97d4(0x2de)]()?this[_0x4a97d4(0x2de)]()['isMapPassable'](_0x1b6b2f,_0x29143f,_0x5323fb):!![];if(_0x4382af['isRegionForbidPass'](_0x25d814,_0x22edae,_0x1d24c4,_0x4a97d4(0x34e)))return![];return _0x3cf4e9['EventsMoveCore']['Game_Player_isMapPassable'][_0x4a97d4(0x317)](this,_0x32fdfa,_0x1aaca9,_0x246e18);}else return''[_0x4a97d4(0x639)]()[_0x4a97d4(0x2bc)]();}},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x286)]=function(_0x57b514,_0x102d5c){const _0x4d8659=_0x317e8f;if(this[_0x4d8659(0x50b)]()){const _0x21772e=['',_0x4d8659(0x54f),_0x4d8659(0x280),_0x4d8659(0x3a4),_0x4d8659(0x2c8),_0x4d8659(0x360),_0x4d8659(0x625),'COBWEB',_0x4d8659(0x3fa),_0x4d8659(0x5ca),_0x4d8659(0x3f2),'','','','',''][_0x57b514];this['setPose'](_0x21772e,_0x102d5c);}},Game_CharacterBase[_0x317e8f(0x32c)]['clearPose']=function(){const _0x4b8cbf=_0x317e8f;this[_0x4b8cbf(0x4b4)]='',this[_0x4b8cbf(0x580)]=0x0;},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x522)]=function(){const _0x700053=_0x317e8f;return this[_0x700053(0x50b)]()&&!!this['_pose'];},Game_CharacterBase['prototype'][_0x317e8f(0x381)]=function(){const _0x2be6fc=_0x317e8f,_0x50b893=this[_0x2be6fc(0x4b4)][_0x2be6fc(0x639)]();switch(this[_0x2be6fc(0x4b4)][_0x2be6fc(0x639)]()[_0x2be6fc(0x2bc)]()){case _0x2be6fc(0x1da):case _0x2be6fc(0x336):case _0x2be6fc(0x561):case _0x2be6fc(0x457):case _0x2be6fc(0x3fe):case _0x2be6fc(0x430):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x5d1)]=function(){const _0x4800d0=_0x317e8f;switch(this[_0x4800d0(0x4b4)][_0x4800d0(0x639)]()){case _0x4800d0(0x54f):case _0x4800d0(0x280):case _0x4800d0(0x3a4):case'!':case'?':return 0x2;break;case _0x4800d0(0x2c8):case _0x4800d0(0x360):case _0x4800d0(0x625):return 0x4;break;case _0x4800d0(0x1da):case'HMPH':case'VICTORY':case _0x4800d0(0x3ab):case _0x4800d0(0x3fa):case _0x4800d0(0x5ca):return 0x6;break;case _0x4800d0(0x457):case _0x4800d0(0x3fe):case _0x4800d0(0x430):case _0x4800d0(0x3f2):case _0x4800d0(0x5bc):return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0x4800d0(0x53b)][_0x4800d0(0x317)](this);break;}},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x345)]=function(){const _0x3ec937=_0x317e8f;switch(this[_0x3ec937(0x4b4)][_0x3ec937(0x639)]()){case _0x3ec937(0x1da):case _0x3ec937(0x457):case _0x3ec937(0x54f):case'!':case _0x3ec937(0x2c8):case'COBWEB':return 0x0;break;case _0x3ec937(0x336):case'KNEEL':case _0x3ec937(0x280):case'?':case _0x3ec937(0x360):case _0x3ec937(0x3fa):return 0x1;break;case _0x3ec937(0x561):case'COLLAPSE':case _0x3ec937(0x3a4):case'SWEAT':case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x3ec937(0x5ac)][_0x3ec937(0x5f7)][_0x3ec937(0x317)](this);break;}},Game_CharacterBase['prototype'][_0x317e8f(0x20b)]=function(){const _0x204421=_0x317e8f;this[_0x204421(0x487)]=!![];},Game_CharacterBase['prototype'][_0x317e8f(0x1dd)]=function(){const _0x20914f=_0x317e8f;this[_0x20914f(0x487)]=![];},Game_CharacterBase[_0x317e8f(0x32c)]['forceDashing']=function(){const _0xe90150=_0x317e8f;this[_0xe90150(0x55a)]=!![];},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x2b9)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x317e8f(0x32c)]['isShadowVisible']=function(){const _0x212c12=_0x317e8f;if(this[_0x212c12(0x278)]())return![];if(this[_0x212c12(0x341)])return![];if(this['_transparent'])return![];if(this[_0x212c12(0x44c)]==='')return![];if(this['constructor']===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x444)]=function(){const _0x35f746=_0x317e8f;if(this[_0x35f746(0x2df)]())return!![];if(this[_0x35f746(0x312)]===Game_Player&&this[_0x35f746(0x5d7)]())return!![];return![];},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x353)]=function(){const _0x489df1=_0x317e8f;return VisuMZ['EventsMoveCore'][_0x489df1(0x2c7)]['Movement'][_0x489df1(0x323)];},Game_CharacterBase['prototype'][_0x317e8f(0x575)]=function(){const _0x2679bc=_0x317e8f;return this[_0x2679bc(0x379)]();},Game_CharacterBase['prototype'][_0x317e8f(0x529)]=function(){return this['screenY']()+this['shiftY']()+this['jumpHeight']();},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x4cb)]=function(_0x368860,_0x5923e7){const _0x1d1015=_0x317e8f,_0x2d1aaf=this[_0x1d1015(0x1f4)](),_0x377536=$gameMap['width'](),_0x20eea1=[],_0x5a8584=[],_0x40a0c0=[],_0x170eb5={};let _0x4e0d5f=_0x170eb5;if(this['x']===_0x368860&&this['y']===_0x5923e7){if('GQekI'!==_0x1d1015(0x552)){if(this['_EventsMoveCoreSettings']===_0x1eab2a)this[_0x1d1015(0x502)]();if(this[_0x1d1015(0x21c)][_0x1d1015(0x5a8)]===_0x5b21de)this[_0x1d1015(0x502)]();return this[_0x1d1015(0x21c)][_0x1d1015(0x5a8)];}else return 0x0;}_0x170eb5[_0x1d1015(0x46f)]=null,_0x170eb5['x']=this['x'],_0x170eb5['y']=this['y'],_0x170eb5['g']=0x0,_0x170eb5['f']=$gameMap[_0x1d1015(0x262)](_0x170eb5['x'],_0x170eb5['y'],_0x368860,_0x5923e7),_0x20eea1[_0x1d1015(0x556)](_0x170eb5),_0x5a8584[_0x1d1015(0x556)](_0x170eb5['y']*_0x377536+_0x170eb5['x']);while(_0x20eea1['length']>0x0){let _0x474a89=0x0;for(let _0x3be84b=0x0;_0x3be84b<_0x20eea1['length'];_0x3be84b++){if(_0x1d1015(0x543)==='gbXpW'){if(_0x20eea1[_0x3be84b]['f']<_0x20eea1[_0x474a89]['f']){if(_0x1d1015(0x279)===_0x1d1015(0x397))return _0x2c0ec8['EventAllow'][_0x1d1015(0x4fa)](_0x3542b4)||_0x4d364a['WalkAllow'][_0x1d1015(0x4fa)](_0x35d546);else _0x474a89=_0x3be84b;}}else return _0x189053['EventsMoveCore'][_0x1d1015(0x5ce)][_0x1d1015(0x317)](this,_0x3148ad);}const _0x3b11f3=_0x20eea1[_0x474a89],_0x2b9e74=_0x3b11f3['x'],_0x5684e9=_0x3b11f3['y'],_0x173ecf=_0x5684e9*_0x377536+_0x2b9e74,_0x1a518b=_0x3b11f3['g'];_0x20eea1[_0x1d1015(0x2ac)](_0x474a89,0x1),_0x5a8584['splice'](_0x5a8584['indexOf'](_0x173ecf),0x1),_0x40a0c0['push'](_0x173ecf);if(_0x3b11f3['x']===_0x368860&&_0x3b11f3['y']===_0x5923e7){_0x4e0d5f=_0x3b11f3;break;}if(_0x1a518b>=_0x2d1aaf)continue;const _0x16586a=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x55a67c=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x273136=0x1;_0x273136<0xa;_0x273136++){if(_0x1d1015(0x3be)===_0x1d1015(0x5b8))return![];else{if(_0x273136===0x5)continue;const _0x303d64=_0x273136,_0x209292=_0x16586a[_0x273136],_0x199d79=_0x55a67c[_0x273136],_0xb64f26=$gameMap[_0x1d1015(0x3c3)](_0x2b9e74,_0x303d64),_0x481b24=$gameMap[_0x1d1015(0x629)](_0x5684e9,_0x303d64),_0x3e55a0=_0x481b24*_0x377536+_0xb64f26;if(_0x40a0c0[_0x1d1015(0x4fa)](_0x3e55a0)){if(_0x1d1015(0x4f4)===_0x1d1015(0x3a1))return this[_0x1d1015(0x5d5)](0x9,_0x3aa6c0(_0x89d92b['$1']));else continue;}if(this['constructor']===Game_Player&&VisuMZ[_0x1d1015(0x5ac)][_0x1d1015(0x2c7)][_0x1d1015(0x50c)]['StrictCollision']){if(!this[_0x1d1015(0x18c)](_0x2b9e74,_0x5684e9,_0x209292))continue;if(!this[_0x1d1015(0x18c)](_0x2b9e74,_0x5684e9,_0x199d79))continue;}if(!this['canPassDiagonally'](_0x2b9e74,_0x5684e9,_0x209292,_0x199d79))continue;const _0x5d903c=_0x1a518b+0x1,_0x4fee1c=_0x5a8584[_0x1d1015(0x25b)](_0x3e55a0);if(_0x4fee1c<0x0||_0x5d903c<_0x20eea1[_0x4fee1c]['g']){let _0x569c93={};_0x4fee1c>=0x0?_0x1d1015(0x471)===_0x1d1015(0x471)?_0x569c93=_0x20eea1[_0x4fee1c]:(this[_0x1d1015(0x52b)](_0x3ed9d0>0x0?0x8:0x2),!this[_0x1d1015(0x357)]()&&_0x191476!==0x0&&this[_0x1d1015(0x52b)](_0x19661e>0x0?0x4:0x6)):_0x1d1015(0x2a3)===_0x1d1015(0x389)?(this[_0x1d1015(0x413)]=_0x468419,this[_0x1d1015(0x20f)]=!![],_0xb60dfc>0x0&&(this[_0x1d1015(0x2f0)]=_0x59d23d[_0x1d1015(0x219)](this[_0x1d1015(0x2f0)],0x1))):(_0x20eea1['push'](_0x569c93),_0x5a8584[_0x1d1015(0x556)](_0x3e55a0));_0x569c93[_0x1d1015(0x46f)]=_0x3b11f3,_0x569c93['x']=_0xb64f26,_0x569c93['y']=_0x481b24,_0x569c93['g']=_0x5d903c,_0x569c93['f']=_0x5d903c+$gameMap[_0x1d1015(0x262)](_0xb64f26,_0x481b24,_0x368860,_0x5923e7);if(!_0x4e0d5f||_0x569c93['f']-_0x569c93['g']<_0x4e0d5f['f']-_0x4e0d5f['g']){if(_0x1d1015(0x18d)!==_0x1d1015(0x18d)){if(_0x546f49[_0x1d1015(0x39b)](_0x59dcb0))this[_0x1d1015(0x25e)](_0x5394aa,_0x397b6a);else _0x4e9d0e[_0x1d1015(0x3d6)](_0x38fbb8)?this[_0x1d1015(0x21d)](_0x138b98,_0xb3ac27):_0xaf31ea[_0x1d1015(0x5ac)][_0x1d1015(0x4ae)][_0x1d1015(0x317)](this,_0x47f5a9,_0x48635a);}else _0x4e0d5f=_0x569c93;}}}}}let _0x46a96a=_0x4e0d5f;while(_0x46a96a[_0x1d1015(0x46f)]&&_0x46a96a[_0x1d1015(0x46f)]!==_0x170eb5){_0x46a96a=_0x46a96a[_0x1d1015(0x46f)];}const _0x276679=$gameMap[_0x1d1015(0x56c)](_0x46a96a['x'],_0x170eb5['x']),_0x401e1c=$gameMap[_0x1d1015(0x59a)](_0x46a96a['y'],_0x170eb5['y']);if(_0x276679<0x0&&_0x401e1c>0x0)return 0x1;if(_0x276679>0x0&&_0x401e1c>0x0)return 0x3;if(_0x276679<0x0&&_0x401e1c<0x0)return 0x7;if(_0x276679>0x0&&_0x401e1c<0x0)return 0x9;if(_0x401e1c>0x0)return 0x2;if(_0x276679<0x0)return 0x4;if(_0x276679>0x0)return 0x6;if(_0x401e1c<0x0)return 0x8;const _0x502921=this[_0x1d1015(0x2f9)](_0x368860),_0x5e7c56=this[_0x1d1015(0x5d8)](_0x5923e7);if(Math['abs'](_0x502921)>Math[_0x1d1015(0x35d)](_0x5e7c56))return _0x502921>0x0?0x4:0x6;else{if(_0x5e7c56!==0x0){if(_0x1d1015(0x1c2)===_0x1d1015(0x1c2))return _0x5e7c56>0x0?0x8:0x2;else{_0x3f5f9f[_0x1d1015(0x57a)](_0x5268c2,_0x3087e6);const _0xf56347=_0x31b8d2[_0x1d1015(0x5c0)]();if(!_0x121387)return;const _0x17b91e=_0x78da05[_0x1d1015(0x450)](_0x5c12d5[_0x1d1015(0x558)]||_0xf56347[_0x1d1015(0x23b)]());if(_0x17b91e)_0x17b91e[_0x1d1015(0x5a2)]();}}}return 0x0;},VisuMZ[_0x317e8f(0x5ac)]['Game_CharacterBase_canPass']=Game_CharacterBase['prototype'][_0x317e8f(0x18c)],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x18c)]=function(_0xa0b2d9,_0x5154a0,_0x1fa2d8){const _0x257aeb=_0x317e8f;return this[_0x257aeb(0x589)]===_0x257aeb(0x24e)?this[_0x257aeb(0x2de)]()['isAirshipPassable'](_0xa0b2d9,_0x5154a0,_0x1fa2d8):VisuMZ[_0x257aeb(0x5ac)][_0x257aeb(0x37d)][_0x257aeb(0x317)](this,_0xa0b2d9,_0x5154a0,_0x1fa2d8);},Game_CharacterBase['prototype']['clearSpriteOffsets']=function(){const _0x56fe07=_0x317e8f;this[_0x56fe07(0x5e6)]=0x0,this[_0x56fe07(0x43e)]=0x0;},VisuMZ['EventsMoveCore'][_0x317e8f(0x19f)]=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x379)],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x379)]=function(){const _0x1296ec=_0x317e8f;return VisuMZ[_0x1296ec(0x5ac)][_0x1296ec(0x19f)][_0x1296ec(0x317)](this)+(this[_0x1296ec(0x5e6)]||0x0);},VisuMZ[_0x317e8f(0x5ac)]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x568)],Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x568)]=function(){const _0x4351b0=_0x317e8f;return VisuMZ[_0x4351b0(0x5ac)][_0x4351b0(0x482)][_0x4351b0(0x317)](this)+(this[_0x4351b0(0x43e)]||0x0);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x327)]=function(){const _0x551dfb=_0x317e8f;this[_0x551dfb(0x30b)]='';},VisuMZ['EventsMoveCore'][_0x317e8f(0x294)]=Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x596)],Game_CharacterBase[_0x317e8f(0x32c)]['updatePattern']=function(){const _0x4ee2f8=_0x317e8f;if(this[_0x4ee2f8(0x418)])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x4ee2f8(0x5ac)]['Game_CharacterBase_updatePattern']['call'](this);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x2ee)]=function(){const _0x434bdf=_0x317e8f;if(!this[_0x434bdf(0x5f0)]()&&this[_0x434bdf(0x3dc)]>0x0)return![];switch(String(this[_0x434bdf(0x30b)])[_0x434bdf(0x639)]()[_0x434bdf(0x2bc)]()){case _0x434bdf(0x454):this[_0x434bdf(0x58b)]+=0x1;if(this[_0x434bdf(0x58b)]>0x2)this['setPattern'](0x0);break;case'RIGHT\x20TO\x20LEFT':this['_pattern']-=0x1;if(this[_0x434bdf(0x58b)]<0x0)this[_0x434bdf(0x37b)](0x2);break;case _0x434bdf(0x489):case'SPIN\x20CW':this[_0x434bdf(0x20a)]();break;case _0x434bdf(0x5a0):case _0x434bdf(0x2d2):case _0x434bdf(0x2b1):case'SPIN\x20ACW':this[_0x434bdf(0x43b)]();break;default:return![];}return!![];},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x525)]=function(){const _0x24018d=_0x317e8f;return $gameSystem[_0x24018d(0x525)](this);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x563)]=function(){const _0x242646=_0x317e8f,_0x5f04bd=this[_0x242646(0x525)]();if(!_0x5f04bd)return![];return _0x5f04bd[_0x242646(0x322)]>0x0;},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x284)]=function(){const _0x5cfa65=this['direction']();return $gameMap['roundXWithDirection'](this['x'],_0x5cfa65);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x59d)]=function(){const _0x2a740b=_0x317e8f,_0x9ef687=this[_0x2a740b(0x212)]();return $gameMap['roundYWithDirection'](this['y'],_0x9ef687);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x61f)]=function(){const _0x5ecf53=_0x317e8f,_0x124095=this[_0x5ecf53(0x478)](this['direction']());return $gameMap[_0x5ecf53(0x3c3)](this['x'],_0x124095);},Game_CharacterBase[_0x317e8f(0x32c)][_0x317e8f(0x1b4)]=function(){const _0x2eab2c=_0x317e8f,_0x2b0204=this[_0x2eab2c(0x478)](this[_0x2eab2c(0x212)]());return $gameMap[_0x2eab2c(0x629)](this['y'],_0x2b0204);},VisuMZ['EventsMoveCore'][_0x317e8f(0x52d)]=Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x486)],Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x486)]=function(_0x386a60){const _0x40bd4d=_0x317e8f;route=JsonEx[_0x40bd4d(0x3b6)](_0x386a60),VisuMZ[_0x40bd4d(0x5ac)]['Game_Character_setMoveRoute'][_0x40bd4d(0x317)](this,route);},VisuMZ['EventsMoveCore'][_0x317e8f(0x2ad)]=Game_Character[_0x317e8f(0x32c)]['forceMoveRoute'],Game_Character[_0x317e8f(0x32c)]['forceMoveRoute']=function(_0x55c653){const _0x25d15=_0x317e8f;route=JsonEx[_0x25d15(0x3b6)](_0x55c653),VisuMZ[_0x25d15(0x5ac)][_0x25d15(0x2ad)][_0x25d15(0x317)](this,route);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x2c5)]=Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x3b5)],Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x3b5)]=function(_0x33b040){const _0x52f841=_0x317e8f,_0x4f5db1=Game_Character,_0x22a897=_0x33b040[_0x52f841(0x2c2)];if(_0x33b040[_0x52f841(0x628)]===_0x4f5db1['ROUTE_SCRIPT']){let _0x341930=_0x33b040[_0x52f841(0x2c2)][0x0];_0x341930=this['convertVariableValuesInScriptCall'](_0x341930),_0x341930=this[_0x52f841(0x31f)](_0x341930),this['processMoveCommandEventsMoveCore'](_0x33b040,_0x341930);}else VisuMZ['EventsMoveCore']['Game_Character_processMoveCommand']['call'](this,_0x33b040);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x479)]=function(_0x41e765){const _0x14aae3=_0x317e8f,_0x305750=/\$gameVariables\.value\((\d+)\)/gi,_0x4bae4c=/\\V\[(\d+)\]/gi;while(_0x41e765[_0x14aae3(0x5bf)](_0x305750)){_0x14aae3(0x5e5)===_0x14aae3(0x449)?(_0x59162a[_0x14aae3(0x5ac)][_0x14aae3(0x605)]['call'](this),this[_0x14aae3(0x51f)]['hideShadows']()):_0x41e765=_0x41e765[_0x14aae3(0x30f)](_0x305750,(_0x1c76e3,_0x21a178)=>$gameVariables[_0x14aae3(0x4d0)](parseInt(_0x21a178)));}while(_0x41e765['match'](_0x4bae4c)){_0x41e765=_0x41e765[_0x14aae3(0x30f)](_0x4bae4c,(_0x5666e8,_0x439990)=>$gameVariables[_0x14aae3(0x4d0)](parseInt(_0x439990)));}return _0x41e765;},Game_Character[_0x317e8f(0x32c)]['convertSelfVariableValuesInScriptCall']=function(_0x18517a){const _0x21fcfb=_0x317e8f,_0x5538e4=/\\SELFVAR\[(\d+)\]/gi;while(_0x18517a[_0x21fcfb(0x5bf)](_0x5538e4)){_0x18517a=_0x18517a[_0x21fcfb(0x30f)](_0x5538e4,(_0x1d8853,_0x39490f)=>getSelfVariableValue(this[_0x21fcfb(0x382)],this[_0x21fcfb(0x3d9)],parseInt(_0x39490f)));}return _0x18517a;},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x1e2)]=function(_0x52bbe4,_0x1286a5){const _0x1ff823=_0x317e8f;if(_0x1286a5[_0x1ff823(0x5bf)](/ANIMATION:[ ](\d+)/i))return this[_0x1ff823(0x549)](Number(RegExp['$1']));if(_0x1286a5['match'](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/FADE IN:[ ](\d+)/i))return this['processMoveRouteFadeIn'](Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/FADE OUT:[ ](\d+)/i))return this[_0x1ff823(0x362)](Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this['forceCarrying']();if(_0x1286a5[_0x1ff823(0x5bf)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x1ff823(0x1dd)]();if(_0x1286a5[_0x1ff823(0x5bf)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if('DWeOk'==='WxdaD')this[_0x1ff823(0x55a)]=![];else return this['forceDashing']();}if(_0x1286a5[_0x1ff823(0x5bf)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this['clearDashing']();if(_0x1286a5[_0x1ff823(0x5bf)](/HUG:[ ]LEFT/i))return this[_0x1ff823(0x632)]('left');if(_0x1286a5[_0x1ff823(0x5bf)](/HUG:[ ]RIGHT/i))return _0x1ff823(0x2d1)===_0x1ff823(0x2d1)?this['processMoveRouteHugWall'](_0x1ff823(0x4d1)):_0x3b3224['EventsMoveCore'][_0x1ff823(0x2c7)]['VS8'][_0x1ff823(0x4c8)];if(_0x1286a5[_0x1ff823(0x5bf)](/INDEX:[ ](\d+)/i)){if('lxCzV'===_0x1ff823(0x4fd))return this[_0x1ff823(0x307)](Number(RegExp['$1']));else _0x3612d1[_0x1ff823(0x556)](0x1,0x3,0x7,0x9);}if(_0x1286a5[_0x1ff823(0x5bf)](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x1ff823(0x4cf)!==_0x1ff823(0x62b)){const _0x162d12=this['_characterIndex']+Number(RegExp['$1']);return this[_0x1ff823(0x307)](_0x162d12);}else{const _0x322819=[_0x486b66[_0x1ff823(0x382)],_0x380314[_0x1ff823(0x3d9)],_0x1ff823(0x440)[_0x1ff823(0x49f)](_0x3f39f6)];return _0x44b597[_0x1ff823(0x4d0)](_0x322819);}}if(_0x1286a5[_0x1ff823(0x5bf)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x1ff823(0x282)](Number(RegExp['$1']));if(_0x1286a5['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x1ff823(0x1e7)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1286a5[_0x1ff823(0x5bf)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x5a7cf0=$gameMap['event'](Number(RegExp['$1']));return this[_0x1ff823(0x618)](_0x5a7cf0);}if(_0x1286a5['match'](/JUMP TO PLAYER/i))return this[_0x1ff823(0x618)]($gamePlayer);if(_0x1286a5[_0x1ff823(0x5bf)](/JUMP TO HOME/i)&&this[_0x1ff823(0x23b)]){if(_0x1ff823(0x3f7)!==_0x1ff823(0x3f7))return this[_0x1ff823(0x50b)]()?this['characterPatternYVS8']():_0x43bfc9[_0x1ff823(0x5ac)][_0x1ff823(0x60d)][_0x1ff823(0x317)](this);else{const _0x4b8c21=this[_0x1ff823(0x4ea)],_0x42b1dd=this[_0x1ff823(0x537)];return this[_0x1ff823(0x1e7)](_0x4b8c21,_0x42b1dd);}}if(_0x1286a5['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if(_0x1ff823(0x54c)!==_0x1ff823(0x54c))_0x310293(_0x1ff823(0x587)[_0x1ff823(0x49f)](_0x49a0f2,_0x56fadb,_0x83f89f)),_0x3b217f['exit']();else{const _0x233375=String(RegExp['$1']),_0x37f089=this[_0x1ff823(0x1fd)](_0x1286a5);return this[_0x1ff823(0x41c)](_0x233375,_0x37f089);}}if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x40a126=Number(RegExp['$1']),_0x2cb16a=Number(RegExp['$2']),_0x3fa5d3=this[_0x1ff823(0x1fd)](_0x1286a5);return this[_0x1ff823(0x460)](_0x40a126,_0x2cb16a,_0x3fa5d3);}if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x1ff823(0x494)!==_0x1ff823(0x37a)){const _0xb95eff=$gameMap[_0x1ff823(0x450)](Number(RegExp['$1'])),_0x2ed024=this['checkCollisionKeywords'](_0x1286a5);return this[_0x1ff823(0x3b0)](_0xb95eff,_0x2ed024);}else this[_0x1ff823(0x331)]=!![];}if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE TO PLAYER/i)){if(_0x1ff823(0x5f9)===_0x1ff823(0x5f9)){const _0x434e5e=this[_0x1ff823(0x1fd)](_0x1286a5);return this[_0x1ff823(0x3b0)]($gamePlayer,_0x434e5e);}else{const _0xa24ab8=_0x5e3229['GetMoveSynchTarget'](this[_0x1ff823(0x231)]()),_0x5102b0=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0xa24ab8[_0x1ff823(0x2d9)]()];this[_0x1ff823(0x4de)](_0x5102b0);}}if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE TO HOME/i)&&this[_0x1ff823(0x23b)]){const _0x48cad1=this[_0x1ff823(0x4ea)],_0x454f57=this[_0x1ff823(0x537)],_0x4d4327=this['checkCollisionKeywords'](_0x1286a5);return this['processMoveRouteMoveTo'](_0x48cad1,_0x454f57,_0x4d4327);}if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x1ff823(0x5d5)](0x1,Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE DOWN:[ ](\d+)/i))return this[_0x1ff823(0x5d5)](0x2,Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x1ff823(0x5d5)](0x3,Number(RegExp['$1']));if(_0x1286a5['match'](/MOVE LEFT:[ ](\d+)/i)){if('DQxdM'===_0x1ff823(0x608))return this[_0x1ff823(0x5d5)](0x4,Number(RegExp['$1']));else{var _0x319c37=this['x']-this[_0x1ff823(0x61c)]['left'],_0x2e04bd=this['x']+this[_0x1ff823(0x61c)]['right'],_0x40ade4=this['y']-this[_0x1ff823(0x61c)]['up'],_0x11cbb9=this['y']+this[_0x1ff823(0x61c)][_0x1ff823(0x584)];return _0x319c37<=_0x310171&&_0x4ed22e<=_0x2e04bd&&_0x40ade4<=_0x57aab9&&_0x515553<=_0x11cbb9;}}if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE RIGHT:[ ](\d+)/i)){if(_0x1ff823(0x2e8)===_0x1ff823(0x44d)){if(!this['isTargetEventValidForLabelWindow'](_0x3cdadc))return;const _0x3dd548=new _0x247932(_0x22aa5e);_0x3dd548['z']=0x8,_0x3dd548[_0x1ff823(0x398)]=_0x472a91[_0x1ff823(0x56b)]++,this[_0x1ff823(0x3e4)][_0x1ff823(0x1ca)](_0x3dd548),this[_0x1ff823(0x276)][_0x1ff823(0x556)](_0x3dd548);}else return this[_0x1ff823(0x5d5)](0x6,Number(RegExp['$1']));}if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x1ff823(0x5d5)](0x7,Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE UP:[ ](\d+)/i))return this[_0x1ff823(0x5d5)](0x8,Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/MOVE UPPER RIGHT:[ ](\d+)/i))return _0x1ff823(0x4ee)===_0x1ff823(0x466)?this[_0x1ff823(0x40e)](0x1):this[_0x1ff823(0x5d5)](0x9,Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/OPACITY:[ ](\d+)([%％])/i)){const _0x3d4d49=Math[_0x1ff823(0x33d)](Number(RegExp['$1'])/0x64*0xff);return this[_0x1ff823(0x57c)](_0x3d4d49['clamp'](0x0,0xff));}if(_0x1286a5[_0x1ff823(0x5bf)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x1559ec=this[_0x1ff823(0x21b)]+Math[_0x1ff823(0x33d)](Number(RegExp['$1'])/0x64*0xff);return this[_0x1ff823(0x57c)](_0x1559ec[_0x1ff823(0x2e7)](0x0,0xff));}if(_0x1286a5[_0x1ff823(0x5bf)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x281cb5=this[_0x1ff823(0x21b)]+Number(RegExp['$1']);return this[_0x1ff823(0x57c)](_0x281cb5[_0x1ff823(0x2e7)](0x0,0xff));}if(_0x1286a5[_0x1ff823(0x5bf)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x1ff823(0x406)](Number(RegExp['$1']));if(_0x1286a5[_0x1ff823(0x5bf)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x1286a5[_0x1ff823(0x5bf)](/POSE:[ ](.*)/i)){const _0x42c158=String(RegExp['$1'])['toUpperCase']()['trim']();return this[_0x1ff823(0x222)](_0x42c158);}if(_0x1286a5[_0x1ff823(0x5bf)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x36cff8=Number(RegExp['$1']),_0x3c57cc=Number(RegExp['$2']);return this[_0x1ff823(0x204)](_0x36cff8,_0x3c57cc);}if(_0x1286a5[_0x1ff823(0x5bf)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x41247c=$gameMap[_0x1ff823(0x450)](Number(RegExp['$1']));return this[_0x1ff823(0x2a1)](_0x41247c);}if(_0x1286a5['match'](/STEP TOWARD PLAYER/i)){if('eRtsy'===_0x1ff823(0x528))return this[_0x1ff823(0x2a1)]($gamePlayer);else{_0x283e72[_0x1ff823(0x57a)](_0x52fc3f,_0x4d6394);const _0x43e70a=_0xa58752['getLastPluginCommandInterpreter']();_0x2dbda7[_0x1ff823(0x1b0)]=_0x23608b['MapId']||_0x1d2459[_0x1ff823(0x4f2)](),_0x41165a[_0x1ff823(0x405)](_0x6cb9d9['MapId'],_0x3964de[_0x1ff823(0x558)]||_0x43e70a['eventId'](),_0x5d3271['IconIndex'],_0x5f3569[_0x1ff823(0x573)],_0x4e26f4[_0x1ff823(0x32a)],_0x318a66[_0x1ff823(0x229)]);}}if(_0x1286a5[_0x1ff823(0x5bf)](/STEP TOWARD HOME/i)&&this[_0x1ff823(0x23b)]){if(_0x1ff823(0x3cc)===_0x1ff823(0x25c)){const _0x331428=this[_0x1ff823(0x422)](_0xfce463),_0xb18d49=_0x1419b2[_0x1ff823(0x534)]((this[_0x1ff823(0x56d)]-_0x331428[_0x1ff823(0x5c1)])/0x2);this[_0x1ff823(0x4c1)](_0xf1ef0b,_0xb18d49,_0x42f392),_0x34f097+=_0x331428[_0x1ff823(0x4ba)];}else{const _0xdc8ed3=this[_0x1ff823(0x4ea)],_0xefd882=this[_0x1ff823(0x537)];return this[_0x1ff823(0x204)](_0xdc8ed3,_0xefd882);}}if(_0x1286a5[_0x1ff823(0x5bf)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x1ff823(0x230)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1286a5[_0x1ff823(0x5bf)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x165c7d=$gameMap['event'](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x165c7d);}if(_0x1286a5['match'](/STEP AWAY FROM PLAYER/i))return this[_0x1ff823(0x38f)]($gamePlayer);if(_0x1286a5[_0x1ff823(0x5bf)](/STEP AWAY FROM HOME/i)&&this[_0x1ff823(0x23b)]){if(_0x1ff823(0x26e)!==_0x1ff823(0x26e))return!![];else{const _0x3788cf=this['_randomHomeX'],_0x22d3ef=this['_randomHomeY'];return this['moveAwayFromPoint'](_0x3788cf,_0x22d3ef);}}if(_0x1286a5['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1286a5[_0x1ff823(0x5bf)](/TURN TO EVENT:[ ](\d+)/i)){if(_0x1ff823(0x39f)!==_0x1ff823(0x277)){const _0x41c861=$gameMap[_0x1ff823(0x450)](Number(RegExp['$1']));return this[_0x1ff823(0x24f)](_0x41c861);}else{_0x224c85[_0x1ff823(0x5ac)]['Game_Timer_start'][_0x1ff823(0x317)](this,_0x946ead);if(this[_0x1ff823(0x35c)]===_0x4676c1)this['initEventsMoveCore']();this[_0x1ff823(0x35c)]=![];}}if(_0x1286a5[_0x1ff823(0x5bf)](/TURN TO PLAYER/i)){if(_0x1ff823(0x23e)===_0x1ff823(0x23e))return this['turnTowardCharacter']($gamePlayer);else{const _0x55c57c=_0x32e0ca[_0x1ff823(0x1ee)](_0x7f098e,_0x21db08);for(const _0xcc6c5c of _0x55c57c){if(_0xcc6c5c&&_0xcc6c5c[_0x1ff823(0x1c5)]())return _0xcc6c5c['onClickTrigger'](),!![];}return![];}}if(_0x1286a5[_0x1ff823(0x5bf)](/TURN TO HOME/i)&&this[_0x1ff823(0x23b)]){const _0x1931d1=this[_0x1ff823(0x4ea)],_0x1cb32a=this[_0x1ff823(0x537)];return this['moveTowardPoint'](_0x1931d1,_0x1cb32a);}if(_0x1286a5[_0x1ff823(0x5bf)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x1ff823(0x505)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1286a5[_0x1ff823(0x5bf)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0xd5cd6a=$gameMap[_0x1ff823(0x450)](Number(RegExp['$1']));return this[_0x1ff823(0x3db)](_0xd5cd6a);}if(_0x1286a5[_0x1ff823(0x5bf)](/TURN AWAY FROM PLAYER/i)){if(_0x1ff823(0x432)===_0x1ff823(0x432))return this[_0x1ff823(0x3db)]($gamePlayer);else _0x51d017[_0x1ff823(0x5ac)][_0x1ff823(0x4ad)][_0x1ff823(0x317)](this,_0x1057ae,_0x1a4123),this['setupCopyEvent'](),this[_0x1ff823(0x503)](),this[_0x1ff823(0x30e)]();}if(_0x1286a5['match'](/TURN AWAY FROM HOME/i)&&this[_0x1ff823(0x23b)]){if('IDVgH'!==_0x1ff823(0x4d9)){const _0x3c15d2=this['_randomHomeX'],_0x275768=this[_0x1ff823(0x537)];return this[_0x1ff823(0x505)](_0x3c15d2,_0x275768);}else return this[_0x1ff823(0x239)](_0x181904['$1'],_0x5d030f['$2']);}if(_0x1286a5[_0x1ff823(0x5bf)](/TURN LOWER LEFT/i))return this[_0x1ff823(0x40e)](0x1);if(_0x1286a5[_0x1ff823(0x5bf)](/TURN LOWER RIGHT/i))return this['setDirection'](0x3);if(_0x1286a5['match'](/TURN UPPER LEFT/i))return this[_0x1ff823(0x40e)](0x7);if(_0x1286a5[_0x1ff823(0x5bf)](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x1286a5[_0x1ff823(0x5bf)](/Self Switch[ ](.*):[ ](.*)/i)){if(_0x1ff823(0x2ff)===_0x1ff823(0x2ff))return this[_0x1ff823(0x300)](RegExp['$1'],RegExp['$2']);else{if(this['_EventsMoveCoreSettings']===_0x7c96ee)this[_0x1ff823(0x502)]();if(this[_0x1ff823(0x21c)][_0x1ff823(0x5a8)]===_0xff1721)this[_0x1ff823(0x502)]();this[_0x1ff823(0x21c)]['VisibleEventLabels']=_0x26a848;}}if(_0x1286a5['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x1ff823(0x239)](RegExp['$1'],RegExp['$2']);if(_0x1286a5[_0x1ff823(0x5bf)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1286a5[_0x1ff823(0x5bf)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x1ff823(0x501)===_0x1ff823(0x501)){const _0x30470d=$gameMap['event'](Number(RegExp['$1']));return this[_0x1ff823(0x493)](_0x30470d);}else return this[_0x1ff823(0x337)](_0x578fb4);}if(_0x1286a5[_0x1ff823(0x5bf)](/TELEPORT TO PLAYER/i))return this['processMoveRouteTeleportToCharacter']($gamePlayer);if(_0x1286a5[_0x1ff823(0x5bf)](/TELEPORT TO HOME/i)&&this[_0x1ff823(0x23b)]){if(_0x1ff823(0x1a4)===_0x1ff823(0x1a4)){const _0x54568f=this[_0x1ff823(0x4ea)],_0x5278e6=this['_randomHomeY'];return this[_0x1ff823(0x223)](_0x54568f,_0x5278e6);}else return _0x37c7cc[_0x1ff823(0x5ac)]['Game_Map_event']['call'](this,_0x38f281);}try{VisuMZ[_0x1ff823(0x5ac)][_0x1ff823(0x2c5)][_0x1ff823(0x317)](this,_0x52bbe4);}catch(_0x5734a4){if($gameTemp[_0x1ff823(0x45e)]())console[_0x1ff823(0x4e1)](_0x5734a4);}},Game_Character[_0x317e8f(0x32c)]['processMoveRouteAnimation']=function(_0x43b7d2){const _0x1c2e9c=_0x317e8f;$gameTemp[_0x1c2e9c(0x4cc)]([this],_0x43b7d2);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x64a)]=function(_0x2351c0){const _0x17b8c2=_0x317e8f;let _0x12926d=0x0;switch(_0x2351c0[_0x17b8c2(0x639)]()[_0x17b8c2(0x2bc)]()){case'!':case _0x17b8c2(0x54f):_0x12926d=0x1;break;case'?':case _0x17b8c2(0x280):_0x12926d=0x2;break;case'MUSIC':case'NOTE':case'MUSIC\x20NOTE':case'MUSIC-NOTE':case _0x17b8c2(0x26b):_0x12926d=0x3;break;case _0x17b8c2(0x2c8):case'LOVE':_0x12926d=0x4;break;case'ANGER':_0x12926d=0x5;break;case _0x17b8c2(0x625):_0x12926d=0x6;break;case'COBWEB':case'ANNOYED':case _0x17b8c2(0x4fc):_0x12926d=0x7;break;case _0x17b8c2(0x3fa):case _0x17b8c2(0x2cc):_0x12926d=0x8;break;case'LIGHT':case _0x17b8c2(0x484):case _0x17b8c2(0x5ca):case _0x17b8c2(0x63c):case _0x17b8c2(0x59f):_0x12926d=0x9;break;case'Z':case'ZZ':case _0x17b8c2(0x3f2):case _0x17b8c2(0x5bc):_0x12926d=0xa;break;case _0x17b8c2(0x35b):_0x12926d=0xb;break;case'USER-DEFINED\x202':_0x12926d=0xc;break;case'USER-DEFINED\x203':_0x12926d=0xd;break;case _0x17b8c2(0x513):_0x12926d=0xe;break;case _0x17b8c2(0x5aa):_0x12926d=0xf;break;}$gameTemp[_0x17b8c2(0x588)](this,_0x12926d);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x37f)]=function(_0x93b9c4){const _0x3c24fa=_0x317e8f;_0x93b9c4+=this[_0x3c24fa(0x21b)],this[_0x3c24fa(0x57c)](_0x93b9c4[_0x3c24fa(0x2e7)](0x0,0xff));if(this[_0x3c24fa(0x21b)]<0xff)this['_moveRouteIndex']--;},Game_Character['prototype'][_0x317e8f(0x362)]=function(_0x3cf7f8){const _0x126e22=_0x317e8f;_0x3cf7f8=this[_0x126e22(0x21b)]-_0x3cf7f8,this[_0x126e22(0x57c)](_0x3cf7f8['clamp'](0x0,0xff));if(this[_0x126e22(0x21b)]>0x0)this['_moveRouteIndex']--;},Game_Character['prototype'][_0x317e8f(0x632)]=function(_0x4b795c){const _0x853e6f=_0x317e8f,_0x2462ed=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x8f8880=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0xe26b72=this[_0x853e6f(0x212)](),_0x131a8d=(_0x4b795c===_0x853e6f(0x53a)?_0x2462ed:_0x8f8880)[_0xe26b72],_0xd37670=(_0x4b795c===_0x853e6f(0x53a)?_0x8f8880:_0x2462ed)[_0xe26b72];if(this[_0x853e6f(0x18c)](this['x'],this['y'],_0x131a8d)){if(_0x853e6f(0x4b2)===_0x853e6f(0x3ad)){const _0x94f52c=_0x46a526[_0x853e6f(0x58e)][_0x853e6f(0x4f2)],_0x4107b3=_0x3824f7['_spawnData'][_0x853e6f(0x23b)];return _0x23eff6[_0x853e6f(0x540)](_0x94f52c,_0x4107b3);}else _0x4b795c==='left'?_0x853e6f(0x56f)!==_0x853e6f(0x27a)?this[_0x853e6f(0x43b)]():this[_0x853e6f(0x234)]=_0x12d3de:'dtfML'===_0x853e6f(0x509)?(_0xed9824[_0x853e6f(0x556)](_0x3c7c12),_0x337b50[_0x853e6f(0x556)](_0x17742e)):this[_0x853e6f(0x20a)]();}else{if(!this['canPass'](this['x'],this['y'],this[_0x853e6f(0x212)]())){if(_0x853e6f(0x3b3)===_0x853e6f(0x483))this[_0x853e6f(0x3e4)][_0x853e6f(0x36d)](_0x5781a9[_0x853e6f(0x1b8)]);else{if(this[_0x853e6f(0x18c)](this['x'],this['y'],_0xd37670)){if(_0x4b795c===_0x853e6f(0x53a)){if(_0x853e6f(0x2fb)===_0x853e6f(0x2fb))this['turnRight90']();else{if(!_0x25c918['isWorking']())return;_0x13fbff[_0x853e6f(0x459)]();}}else this[_0x853e6f(0x43b)]();}else'HSIpx'!==_0x853e6f(0x4be)?this[_0x853e6f(0x261)]():(_0x3da2cf[_0x853e6f(0x57a)](_0x578395,_0xcda0b),_0x108e26[_0x853e6f(0x1fc)](_0x4f10d7[_0x853e6f(0x384)]));}}}this[_0x853e6f(0x18c)](this['x'],this['y'],this['direction']())&&this[_0x853e6f(0x40b)]();},Game_Character['prototype'][_0x317e8f(0x307)]=function(_0x19ce11){const _0x74a0fe=_0x317e8f;if(ImageManager['isBigCharacter'](this[_0x74a0fe(0x44c)]))return;_0x19ce11=_0x19ce11['clamp'](0x0,0x7),this[_0x74a0fe(0x1cd)](this['_characterName'],_0x19ce11);},Game_Character['prototype'][_0x317e8f(0x282)]=function(_0xc95dd5){const _0x470e0c=_0x317e8f;switch(this[_0x470e0c(0x212)]()){case 0x1:this[_0x470e0c(0x4f9)](-_0xc95dd5,_0xc95dd5);break;case 0x2:this[_0x470e0c(0x4f9)](0x0,_0xc95dd5);break;case 0x3:this[_0x470e0c(0x4f9)](_0xc95dd5,_0xc95dd5);break;case 0x4:this['jump'](-_0xc95dd5,0x0);break;case 0x6:this[_0x470e0c(0x4f9)](_0xc95dd5,0x0);break;case 0x7:this[_0x470e0c(0x4f9)](-_0xc95dd5,-_0xc95dd5);break;case 0x8:this[_0x470e0c(0x4f9)](0x0,-_0xc95dd5);break;case 0x9:this[_0x470e0c(0x4f9)](_0xc95dd5,-_0xc95dd5);break;}},Game_Character['prototype']['processMoveRouteJumpTo']=function(_0xd4d20d,_0x13d715){const _0x5dcd34=_0x317e8f,_0x56b789=Math[_0x5dcd34(0x33d)](_0xd4d20d-this['x']),_0x1bd598=Math[_0x5dcd34(0x33d)](_0x13d715-this['y']);this['jump'](_0x56b789,_0x1bd598);},Game_Character['prototype'][_0x317e8f(0x618)]=function(_0x271779){const _0xd5faf2=_0x317e8f;if(_0x271779)this[_0xd5faf2(0x1e7)](_0x271779['x'],_0x271779['y']);},Game_Character[_0x317e8f(0x32c)]['processMoveRouteStepTo']=function(_0x4ea6cc,_0x203146,_0x1a8d11){const _0x5e6d86=_0x317e8f;let _0x2b2307=0x0;if(_0x1a8d11)$gameTemp[_0x5e6d86(0x23d)]=!![];if($gameMap[_0x5e6d86(0x334)]())_0x2b2307=this[_0x5e6d86(0x4cb)](_0x4ea6cc,_0x203146);else{if(_0x5e6d86(0x311)!==_0x5e6d86(0x3bb))_0x2b2307=this[_0x5e6d86(0x536)](_0x4ea6cc,_0x203146);else return!!this[_0x5e6d86(0x337)](_0x101470);}if(_0x1a8d11)$gameTemp[_0x5e6d86(0x23d)]=![];this[_0x5e6d86(0x4de)](_0x2b2307),this[_0x5e6d86(0x1b5)](!![]);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x2a1)]=function(_0x10e4b3){const _0xbe86c5=_0x317e8f;if(_0x10e4b3)this[_0xbe86c5(0x204)](_0x10e4b3['x'],_0x10e4b3['y']);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x62d)]=function(_0x588c4b,_0x448d93){const _0x17e2e1=_0x317e8f,_0x55186a=this[_0x17e2e1(0x2f9)](_0x588c4b),_0x3f9844=this[_0x17e2e1(0x5d8)](_0x448d93);},Game_Character[_0x317e8f(0x32c)]['checkCollisionKeywords']=function(_0x13bdb4){const _0x52404f=_0x317e8f;if(_0x13bdb4[_0x52404f(0x5bf)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x13bdb4[_0x52404f(0x5bf)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x446)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5c4)],Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5c4)]=function(_0x4d0c32,_0x27014d){const _0xe6b465=_0x317e8f;if($gameTemp[_0xe6b465(0x23d)])return![];return VisuMZ[_0xe6b465(0x5ac)][_0xe6b465(0x446)][_0xe6b465(0x317)](this,_0x4d0c32,_0x27014d);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x41c)]=function(_0x349caa,_0x422152){const _0x20b985=_0x317e8f,_0x35f14c=['',_0x20b985(0x1ba),_0x20b985(0x3fc),_0x20b985(0x288),_0x20b985(0x3e1),'',_0x20b985(0x630),_0x20b985(0x3f9),'UP',_0x20b985(0x216)],_0x10f6f1=_0x35f14c[_0x20b985(0x25b)](_0x349caa['toUpperCase']()[_0x20b985(0x2bc)]());if(_0x10f6f1<=0x0)return;if(_0x422152)$gameTemp[_0x20b985(0x23d)]=!![];if(this['canPass'](this['x'],this['y'],_0x10f6f1)){if(_0x20b985(0x31d)===_0x20b985(0x2b4))return this[_0x20b985(0x223)](_0x39b6d6(_0x33372f['$1']),_0x3b606e(_0x42ba66['$2']));else{if(_0x422152)$gameTemp[_0x20b985(0x23d)]=![];this[_0x20b985(0x4de)](_0x10f6f1),this[_0x20b985(0x270)]-=0x1;}}if(_0x422152)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x317e8f(0x32c)]['processMoveRouteMoveTo']=function(_0x5b3e3c,_0x4b6ebb,_0x47de8a){const _0x42d848=_0x317e8f;this[_0x42d848(0x204)](_0x5b3e3c,_0x4b6ebb,_0x47de8a);if(this['x']!==_0x5b3e3c||this['y']!==_0x4b6ebb)this['_moveRouteIndex']--;},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x3b0)]=function(_0x529ae9,_0x4e5776){const _0x600502=_0x317e8f;if(_0x529ae9)this[_0x600502(0x460)](_0x529ae9['x'],_0x529ae9['y'],_0x4e5776);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x5d5)]=function(_0x4c7778,_0x5ce5ab){const _0x5dcb22=_0x317e8f;_0x5ce5ab=_0x5ce5ab||0x0;const _0x12b69e={'code':0x1,'indent':null,'parameters':[]};_0x12b69e[_0x5dcb22(0x628)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x4c7778],this[_0x5dcb22(0x1c8)][_0x5dcb22(0x429)][this[_0x5dcb22(0x270)]][_0x5dcb22(0x2c2)][0x0]='';while(_0x5ce5ab--){if(_0x5dcb22(0x448)===_0x5dcb22(0x40a))return this[_0x5dcb22(0x228)](_0x35189e,_0x544957);else this['_moveRoute'][_0x5dcb22(0x429)]['splice'](this[_0x5dcb22(0x270)]+0x1,0x0,_0x12b69e);}},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x406)]=function(_0xec8646){const _0x2e1315=_0x317e8f;this[_0x2e1315(0x418)]=!![],this[_0x2e1315(0x37b)](_0xec8646);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x300)]=function(_0x353a4d,_0x4338c5){const _0x86aebe=_0x317e8f;if(this===$gamePlayer)return;const _0x1dc477=[this[_0x86aebe(0x382)],this[_0x86aebe(0x3d9)],'A'];_0x353a4d['match'](/\b[ABCD]\b/i)?_0x86aebe(0x492)!==_0x86aebe(0x347)?_0x1dc477[0x2]=String(_0x353a4d)['charAt'](0x0)['toUpperCase']()['trim']():_0x481b02[_0x86aebe(0x214)](_0x462332[_0x14c374]):_0x1dc477[0x2]=_0x86aebe(0x408)['format'](_0x353a4d);switch(_0x4338c5[_0x86aebe(0x639)]()[_0x86aebe(0x2bc)]()){case'ON':case _0x86aebe(0x298):$gameSelfSwitches[_0x86aebe(0x51e)](_0x1dc477,!![]);break;case _0x86aebe(0x63e):case _0x86aebe(0x613):$gameSelfSwitches[_0x86aebe(0x51e)](_0x1dc477,![]);break;case _0x86aebe(0x22d):$gameSelfSwitches[_0x86aebe(0x51e)](_0x1dc477,!$gameSelfSwitches['value'](_0x1dc477));break;}},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x239)]=function(_0x2ba3e2,_0x4fab60){const _0x79554e=_0x317e8f;if(this===$gamePlayer)return;const _0x404267=[this[_0x79554e(0x382)],this[_0x79554e(0x3d9)],_0x79554e(0x440)[_0x79554e(0x49f)](switchId)];$gameSelfSwitches[_0x79554e(0x51e)](_0x404267,Number(_0x4fab60));},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x223)]=function(_0xb3742b,_0xf90e75){const _0x58a665=_0x317e8f;this[_0x58a665(0x355)](_0xb3742b,_0xf90e75);},Game_Character[_0x317e8f(0x32c)]['processMoveRouteTeleportToCharacter']=function(_0x381f21){const _0x116bc4=_0x317e8f;if(_0x381f21)this[_0x116bc4(0x223)](_0x381f21['x'],_0x381f21['y']);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x20a)]=function(){const _0x4de152=_0x317e8f;switch(this[_0x4de152(0x212)]()){case 0x1:this['setDirection'](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this['setDirection'](0x1);break;case 0x4:this[_0x4de152(0x40e)](0x8);break;case 0x6:this[_0x4de152(0x40e)](0x2);break;case 0x7:this[_0x4de152(0x40e)](0x9);break;case 0x8:this[_0x4de152(0x40e)](0x6);break;case 0x9:this[_0x4de152(0x40e)](0x3);break;}},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x43b)]=function(){const _0x223487=_0x317e8f;switch(this['direction']()){case 0x1:this[_0x223487(0x40e)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x223487(0x40e)](0x9);break;case 0x4:this[_0x223487(0x40e)](0x2);break;case 0x6:this[_0x223487(0x40e)](0x8);break;case 0x7:this[_0x223487(0x40e)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x223487(0x40e)](0x7);break;}},Game_Character['prototype'][_0x317e8f(0x26d)]=function(_0x214bdf,_0x4d2223,_0x5bbebf){const _0xa3dfc=_0x317e8f,_0x417f89=this[_0xa3dfc(0x2f9)](_0x214bdf),_0x21e1f9=this['deltaYFrom'](_0x4d2223);if($gameMap[_0xa3dfc(0x334)]()){if(_0xa3dfc(0x297)!==_0xa3dfc(0x297)){const _0xb1b73d=this[_0xa3dfc(0x26d)](_0x1d8ff0,_0x1f36d9,![]);if(_0xb1b73d)this[_0xa3dfc(0x40e)](_0xb1b73d);}else{if(_0x5bbebf||this['isSpriteVS8dir']()){if(_0x417f89>0x0&&_0x21e1f9<0x0)return 0x1;if(_0x417f89<0x0&&_0x21e1f9<0x0)return 0x3;if(_0x417f89>0x0&&_0x21e1f9>0x0)return 0x7;if(_0x417f89<0x0&&_0x21e1f9>0x0)return 0x9;}}}if(Math[_0xa3dfc(0x35d)](_0x417f89)>Math[_0xa3dfc(0x35d)](_0x21e1f9)){if('ioNfA'==='ioNfA')return _0x417f89>0x0?0x4:0x6;else _0x1348b7[_0xa3dfc(0x57a)](_0x5d6443,_0x194508),_0x535e14[_0xa3dfc(0x5cd)](!_0x57747c[_0xa3dfc(0x611)]);}else{if(_0x21e1f9!==0x0)return _0x21e1f9>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x572)]=function(_0x21146c,_0x10619b,_0x59fdae){const _0x390818=_0x317e8f,_0x2e0eda=this['deltaXFrom'](_0x21146c),_0x48a716=this[_0x390818(0x5d8)](_0x10619b);if($gameMap[_0x390818(0x334)]()){if('RZpCU'===_0x390818(0x1af)){if(_0x59fdae||this[_0x390818(0x50b)]()){if(_0x390818(0x1c9)!==_0x390818(0x4e0)){if(_0x2e0eda>0x0&&_0x48a716<0x0)return 0x9;if(_0x2e0eda<0x0&&_0x48a716<0x0)return 0x7;if(_0x2e0eda>0x0&&_0x48a716>0x0)return 0x3;if(_0x2e0eda<0x0&&_0x48a716>0x0)return 0x1;}else{this['checkAdvancedSwitchVariablePresent'](_0x796e),_0x535ca['registerSelfTarget'](this);const _0x4eed92=_0x2d4b81['EventsMoveCore']['Game_Event_meetsConditions'][_0x390818(0x317)](this,_0x515e9d);return _0x49b637[_0x390818(0x2cd)](),_0x4eed92;}}}else this[_0x390818(0x303)][_0x390818(0x44b)]=this['_labelWindow'][_0x390818(0x44b)][_0x390818(0x30f)](/\\V\[(\d+)\]/gi,(_0x41da6d,_0x1e02da)=>_0x571cce[_0x390818(0x4d0)](_0x35f3be(_0x1e02da)));}if(Math[_0x390818(0x35d)](_0x2e0eda)>Math[_0x390818(0x35d)](_0x48a716)){if('MdsSN'===_0x390818(0x328))return _0x2e0eda>0x0?0x6:0x4;else{const _0x170f56=_0x390818(0x1e0)[_0x390818(0x49f)](_0x2187af[_0x390818(0x39a)](0x0)['toUpperCase']()+_0x53348e[_0x390818(0x5b5)](0x1));if(_0x393c50[_0x170f56])return _0x16688f[_0x170f56][_0x390818(0x4fa)](_0x27f49b);}}else{if(_0x48a716!==0x0)return _0x48a716>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x28a)]=function(_0x3063ff,_0x4f4e66){const _0x391a42=_0x317e8f,_0x38f97e=this[_0x391a42(0x26d)](_0x3063ff,_0x4f4e66,!![]);if(_0x38f97e)this[_0x391a42(0x4de)](_0x38f97e);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x230)]=function(_0x2b8375,_0x54b596){const _0xa4cad6=_0x317e8f,_0x259a47=this['getDirectionFromPoint'](_0x2b8375,_0x54b596,!![]);if(_0x259a47)this[_0xa4cad6(0x4de)](_0x259a47);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x314)]=function(_0x358082,_0x56cba5){const _0x1b32d3=_0x317e8f,_0x282186=this[_0x1b32d3(0x26d)](_0x358082,_0x56cba5,![]);if(_0x282186)this[_0x1b32d3(0x40e)](_0x282186);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x505)]=function(_0x3e756c,_0x11bcf0){const _0x3e899d=_0x317e8f,_0x270788=this['getDirectionFromPoint'](_0x3e756c,_0x11bcf0,![]);if(_0x270788)this[_0x3e899d(0x40e)](_0x270788);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x34c)]=function(_0x293e70){const _0xc16a8b=_0x317e8f;if(_0x293e70)this[_0xc16a8b(0x28a)](_0x293e70['x'],_0x293e70['y']);},Game_Character['prototype']['moveAwayFromCharacter']=function(_0x1c076d){const _0x4d31fa=_0x317e8f;if(_0x1c076d)this[_0x4d31fa(0x230)](_0x1c076d['x'],_0x1c076d['y']);},Game_Character[_0x317e8f(0x32c)][_0x317e8f(0x24f)]=function(_0x4c2d5a){const _0x4cbeaf=_0x317e8f;if(_0x4c2d5a)this[_0x4cbeaf(0x314)](_0x4c2d5a['x'],_0x4c2d5a['y']);},Game_Character[_0x317e8f(0x32c)]['turnAwayFromCharacter']=function(_0x6c262b){if(_0x6c262b)this['turnAwayFromPoint'](_0x6c262b['x'],_0x6c262b['y']);},VisuMZ[_0x317e8f(0x5ac)]['Game_Player_isDashing']=Game_Player['prototype'][_0x317e8f(0x4c0)],Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x4c0)]=function(){const _0x100dff=_0x317e8f;if(this[_0x100dff(0x55a)])return!![];return VisuMZ[_0x100dff(0x5ac)][_0x100dff(0x646)][_0x100dff(0x317)](this);},Game_Player[_0x317e8f(0x32c)]['isDashingAndMoving']=function(){const _0x533a71=_0x317e8f;return this[_0x533a71(0x4c0)]()&&(this['isMoving']()||this[_0x533a71(0x36b)]()!==0x0&&this['canPass'](this['_x'],this['_y'],this[_0x533a71(0x36b)]())||$gameTemp[_0x533a71(0x453)]());},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x1fb)]=Game_Player['prototype'][_0x317e8f(0x36b)],Game_Player['prototype']['getInputDirection']=function(){const _0x685b59=_0x317e8f;return $gameMap[_0x685b59(0x334)]()?this[_0x685b59(0x2e6)]():VisuMZ['EventsMoveCore']['Game_Player_getInputDirection']['call'](this);},Game_Player['prototype'][_0x317e8f(0x2e6)]=function(){const _0x389d4b=_0x317e8f;return Input[_0x389d4b(0x577)];},Game_Player[_0x317e8f(0x32c)]['moveByInput']=function(){const _0x1addc3=_0x317e8f;if($gameSystem['isPlayerControlDisabled']())return 0x0;if(!this[_0x1addc3(0x3a2)]()&&this[_0x1addc3(0x340)]()){let _0x28e5cb=this['getInputDirection']();if(_0x28e5cb>0x0)$gameTemp[_0x1addc3(0x2c3)]();else{if($gameTemp[_0x1addc3(0x453)]()){if(_0x1addc3(0x499)===_0x1addc3(0x499)){const _0x1f7b7b=$gameTemp[_0x1addc3(0x512)](),_0x20f766=$gameTemp[_0x1addc3(0x5ed)](),_0x5e8a90=$gameMap['isSupportDiagonalMovement'](),_0x1e2761=$gameMap[_0x1addc3(0x1be)](_0x1f7b7b,_0x20f766),_0x3725db=$gameMap['eventsXyNt'](_0x1f7b7b,_0x20f766)[_0x1addc3(0x504)]<=0x0;_0x5e8a90&&_0x1e2761&&_0x3725db?_0x28e5cb=this[_0x1addc3(0x4cb)](_0x1f7b7b,_0x20f766):_0x1addc3(0x437)===_0x1addc3(0x437)?_0x28e5cb=this[_0x1addc3(0x536)](_0x1f7b7b,_0x20f766):_0x6a6b6b[_0x1addc3(0x51e)](_0x348e38,!!_0x47f6e9);}else this['_chaseOff']=_0x5a33d5;}}if(_0x28e5cb>0x0){this[_0x1addc3(0x3b8)]=this[_0x1addc3(0x3b8)]||0x0;if(this['isTurnInPlace']())this[_0x1addc3(0x40e)](_0x28e5cb);else{if(_0x1addc3(0x339)===_0x1addc3(0x339))this['executeMove'](_0x28e5cb);else{if(_0x4c5bd6===0x0||_0xcf1cfc===0x0)return![];if(!_0x4435c3['PreloadedMaps'][_0x50a6d8]&&_0x41ab24!==_0x53e5dd['mapId']())return _0x172f42[_0x1addc3(0x45e)]()&&_0x1dfe8c['log'](_0x1addc3(0x1ea)[_0x1addc3(0x49f)](_0x147f72)),![];return!![];}}this[_0x1addc3(0x3b8)]++;}else this[_0x1addc3(0x3b8)]=0x0;}},Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x5e4)]=function(){const _0x2a2923=_0x317e8f,_0x280da2=VisuMZ[_0x2a2923(0x5ac)][_0x2a2923(0x2c7)][_0x2a2923(0x50c)];if(!_0x280da2[_0x2a2923(0x474)])return![];if($gameTemp[_0x2a2923(0x453)]())return![];if(this[_0x2a2923(0x4c0)]()||this[_0x2a2923(0x3a2)]()||this[_0x2a2923(0x2df)]())return![];return this['_inputTime']<_0x280da2['TurnInPlaceDelay'];},VisuMZ[_0x317e8f(0x5ac)]['Game_Player_executeMove']=Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x305)],Game_Player['prototype'][_0x317e8f(0x305)]=function(_0x22eb3a){const _0x201aa5=_0x317e8f;if($gameMap[_0x201aa5(0x334)]()){if('bBYoi'!==_0x201aa5(0x564)){const _0x593e30=this[_0x201aa5(0x3cf)]();return _0x593e30?_0x593e30['_eventId']:0x0;}else this['executeMoveDir8'](_0x22eb3a);}else VisuMZ['EventsMoveCore'][_0x201aa5(0x2f7)][_0x201aa5(0x317)](this,_0x22eb3a);},VisuMZ['EventsMoveCore'][_0x317e8f(0x46d)]=Game_Player['prototype'][_0x317e8f(0x1e3)],Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x1e3)]=function(_0x3776fa,_0x4129c8,_0x15545a){const _0x1ce638=_0x317e8f;if($gameMap[_0x1ce638(0x1b2)](_0x3776fa,_0x4129c8,_0x15545a,'player'))return this[_0x1ce638(0x5d7)]()&&this[_0x1ce638(0x2de)]()?this['vehicle']()[_0x1ce638(0x1e3)](_0x3776fa,_0x4129c8,_0x15545a):!![];if($gameMap[_0x1ce638(0x4fb)](_0x3776fa,_0x4129c8,_0x15545a,_0x1ce638(0x34e)))return![];return VisuMZ[_0x1ce638(0x5ac)][_0x1ce638(0x46d)][_0x1ce638(0x317)](this,_0x3776fa,_0x4129c8,_0x15545a);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x1e5)]=Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x1b9)],Game_Player[_0x317e8f(0x32c)]['checkEventTriggerHere']=function(_0x597d09){const _0x4be46d=_0x317e8f;VisuMZ[_0x4be46d(0x5ac)][_0x4be46d(0x1e5)][_0x4be46d(0x317)](this,_0x597d09);if(this[_0x4be46d(0x203)]()){if(_0x4be46d(0x308)===_0x4be46d(0x308)){this[_0x4be46d(0x2e5)](_0x597d09);if(_0x597d09[_0x4be46d(0x4fa)](0x0)&&this[_0x4be46d(0x58d)]()===_0x4be46d(0x3ff))this[_0x4be46d(0x425)](this['x'],this['y']);else(_0x597d09[_0x4be46d(0x4fa)](0x1)||_0x597d09[_0x4be46d(0x4fa)](0x2))&&this[_0x4be46d(0x3eb)]();}else this[_0x4be46d(0x5e6)]=_0x4861cb(_0x842726['$1']),this['_spriteOffsetY']=_0x1a9734(_0x1eb31f['$2']);}},VisuMZ['EventsMoveCore'][_0x317e8f(0x451)]=Game_Player['prototype']['checkEventTriggerThere'],Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x1a1)]=function(_0x5bb4a0){const _0x48d581=_0x317e8f;VisuMZ['EventsMoveCore'][_0x48d581(0x451)][_0x48d581(0x317)](this,_0x5bb4a0);if(this[_0x48d581(0x203)]()&&_0x5bb4a0[_0x48d581(0x4fa)](0x0)&&this[_0x48d581(0x58d)]()===_0x48d581(0x5b7)){if('EDpGv'===_0x48d581(0x3cb))this['updateTilt']();else{const _0x43c78d=this[_0x48d581(0x212)](),_0x1c5a7c=$gameMap[_0x48d581(0x3c3)](this['x'],_0x43c78d),_0x3ceb4f=$gameMap[_0x48d581(0x629)](this['y'],_0x43c78d);this['startMapCommonEventOnOK'](_0x1c5a7c,_0x3ceb4f);}}},Game_Player[_0x317e8f(0x32c)]['checkEventTriggerEventsMoveCore']=function(_0x2a428d){const _0x4fde68=_0x317e8f;if($gameMap['isEventRunning']())return;if($gameMap[_0x4fde68(0x28e)]())return;const _0x44b02e=$gameMap['events']();for(const _0x387b6a of _0x44b02e){if(!_0x387b6a)continue;if(!_0x387b6a[_0x4fde68(0x1a5)](_0x2a428d))continue;if(this[_0x4fde68(0x57b)](_0x387b6a))return _0x387b6a['start']();if(this[_0x4fde68(0x4c5)](_0x387b6a))return _0x387b6a['start']();}},Game_Player['prototype'][_0x317e8f(0x57b)]=function(_0x1fa886){const _0x14ffbb=_0x317e8f;if($gameMap[_0x14ffbb(0x320)]())return![];if($gameMap['isAnyEventStarting']())return![];return _0x1fa886[_0x14ffbb(0x1d8)]()[_0x14ffbb(0x4fa)](this[_0x14ffbb(0x30c)]());},Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x4c5)]=function(_0x1e16b3){const _0x3758e1=_0x317e8f;if($gameMap[_0x3758e1(0x320)]())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x3758e1(0x2cb),_0x3758e1(0x421)][_0x3758e1(0x4fa)](_0x1e16b3[_0x3758e1(0x423)]()))return![];const _0x406333=_0x1e16b3[_0x3758e1(0x423)](),_0x23bc9c=_0x1e16b3[_0x3758e1(0x47c)]();switch(_0x406333){case _0x3758e1(0x349):const _0x9056ac=$gameMap[_0x3758e1(0x262)](this['x'],this['y'],_0x1e16b3['x'],_0x1e16b3['y']);return _0x1e16b3['activationProximityDistance']()>=_0x9056ac;break;case'square':return _0x23bc9c>=Math[_0x3758e1(0x35d)](_0x1e16b3[_0x3758e1(0x2f9)](this['x']))&&_0x23bc9c>=Math[_0x3758e1(0x35d)](_0x1e16b3[_0x3758e1(0x5d8)](this['y']));break;case _0x3758e1(0x48f):return _0x23bc9c>=Math[_0x3758e1(0x35d)](_0x1e16b3[_0x3758e1(0x5d8)](this['y']));break;case _0x3758e1(0x19d):return _0x23bc9c>=Math['abs'](_0x1e16b3['deltaXFrom'](this['x']));break;case _0x3758e1(0x33a):return![];break;}},Game_Player[_0x317e8f(0x32c)]['startMapCommonEventOnOK']=function(_0x16fa77,_0x3726b7){const _0x23d06f=_0x317e8f;if($gameMap[_0x23d06f(0x320)]())return;if($gameMap['isAnyEventStarting']())return;let _0x60396=VisuMZ[_0x23d06f(0x5ac)][_0x23d06f(0x2c7)][_0x23d06f(0x53f)],_0x46b669=$gameMap['regionId'](_0x16fa77,_0x3726b7);const _0x24c06a=_0x23d06f(0x34d)['format'](_0x46b669);_0x60396[_0x24c06a]&&$gameTemp[_0x23d06f(0x214)](_0x60396[_0x24c06a]);},Game_Player[_0x317e8f(0x32c)][_0x317e8f(0x58d)]=function(){const _0x433424=_0x317e8f;return VisuMZ[_0x433424(0x5ac)]['Settings']['RegionOkTarget'];},Game_Player['prototype']['startMapCommonEventOnTouch']=function(){const _0x2d11c9=_0x317e8f;if($gameMap[_0x2d11c9(0x320)]())return;if($gameMap[_0x2d11c9(0x28e)]())return;let _0x155753=VisuMZ['EventsMoveCore'][_0x2d11c9(0x2c7)][_0x2d11c9(0x309)];const _0x2a54bd=_0x2d11c9(0x34d)[_0x2d11c9(0x49f)](this['regionId']());if(_0x155753[_0x2a54bd]){if(_0x2d11c9(0x2f5)===_0x2d11c9(0x612)){let _0x189d2e=_0x36a964[_0x2d11c9(0x56a)]();if(_0x189d2e>0x0)return _0x48063d[_0x2d11c9(0x285)]()[_0x2d11c9(0x283)](_0x189d2e-0x1);}else $gameTemp['reserveCommonEvent'](_0x155753[_0x2a54bd]);}},VisuMZ['EventsMoveCore'][_0x317e8f(0x20e)]=Game_Player['prototype'][_0x317e8f(0x253)],Game_Player['prototype'][_0x317e8f(0x253)]=function(){const _0x550a50=_0x317e8f;VisuMZ[_0x550a50(0x5ac)][_0x550a50(0x20e)]['call'](this),VisuMZ[_0x550a50(0x27d)](0x0);},VisuMZ[_0x317e8f(0x5ac)]['Game_Follower_initialize']=Game_Follower[_0x317e8f(0x32c)][_0x317e8f(0x636)],Game_Follower[_0x317e8f(0x32c)]['initialize']=function(_0x2c20d6){const _0x4a029a=_0x317e8f;VisuMZ[_0x4a029a(0x5ac)]['Game_Follower_initialize'][_0x4a029a(0x317)](this,_0x2c20d6),this[_0x4a029a(0x54d)]=![];},Game_Follower[_0x317e8f(0x32c)][_0x317e8f(0x4c0)]=function(){return $gamePlayer['isDashing']();},Game_Follower[_0x317e8f(0x32c)]['isDashingAndMoving']=function(){const _0x7090b6=_0x317e8f;return $gamePlayer[_0x7090b6(0x352)]();},Game_Follower[_0x317e8f(0x32c)]['realMoveSpeed']=function(){const _0x5abc70=_0x317e8f;return $gamePlayer[_0x5abc70(0x461)]();},Game_Follower[_0x317e8f(0x32c)]['setChaseOff']=function(_0x52ac5a){this['_chaseOff']=_0x52ac5a;},VisuMZ['EventsMoveCore'][_0x317e8f(0x5da)]=Game_Follower[_0x317e8f(0x32c)][_0x317e8f(0x44a)],Game_Follower[_0x317e8f(0x32c)]['chaseCharacter']=function(_0x341c3e){const _0x485772=_0x317e8f;if(this['_chaseOff'])return;if($gameSystem[_0x485772(0x555)]())return;VisuMZ[_0x485772(0x5ac)][_0x485772(0x5da)][_0x485772(0x317)](this,_0x341c3e);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x2b3)]=Game_Vehicle[_0x317e8f(0x32c)][_0x317e8f(0x1e3)],Game_Vehicle[_0x317e8f(0x32c)][_0x317e8f(0x1e3)]=function(_0x4ebe49,_0x51eccc,_0x48a38c){const _0x4fd83a=_0x317e8f;if($gameMap[_0x4fd83a(0x1b2)](_0x4ebe49,_0x51eccc,_0x48a38c,this[_0x4fd83a(0x34a)]))return!![];if($gameMap['isRegionForbidPass'](_0x4ebe49,_0x51eccc,_0x48a38c,this[_0x4fd83a(0x34a)]))return![];return VisuMZ[_0x4fd83a(0x5ac)][_0x4fd83a(0x2b3)][_0x4fd83a(0x317)](this,_0x4ebe49,_0x51eccc,_0x48a38c);},Game_Vehicle['prototype']['isAirshipPassable']=function(_0x23d82f,_0x4e1688,_0x3d93c3){const _0x147d2a=_0x317e8f;if($gameMap[_0x147d2a(0x1b2)](_0x23d82f,_0x4e1688,_0x3d93c3,this[_0x147d2a(0x34a)]))return!![];if($gameMap['isRegionForbidPass'](_0x23d82f,_0x4e1688,_0x3d93c3,this[_0x147d2a(0x34a)]))return![];return VisuMZ[_0x147d2a(0x5ac)][_0x147d2a(0x37d)]['call']($gamePlayer,_0x23d82f,_0x4e1688,_0x3d93c3);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x47d)]=Game_Vehicle[_0x317e8f(0x32c)][_0x317e8f(0x366)],Game_Vehicle[_0x317e8f(0x32c)]['isLandOk']=function(_0x586a1f,_0x5bf2c9,_0x563977){const _0x36f027=_0x317e8f;if($gameMap[_0x36f027(0x25d)](_0x586a1f,_0x5bf2c9,_0x563977,this[_0x36f027(0x34a)]))return!![];const _0xb207d0=this[_0x36f027(0x34a)]['charAt'](0x0)[_0x36f027(0x639)]()+this['_type'][_0x36f027(0x5b5)](0x1),_0x6f067a='%1DockRegionOnly'['format'](_0xb207d0);return VisuMZ['EventsMoveCore']['Settings'][_0x36f027(0x5fe)][_0x6f067a]?![]:VisuMZ[_0x36f027(0x5ac)][_0x36f027(0x47d)][_0x36f027(0x317)](this,_0x586a1f,_0x5bf2c9,_0x563977);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x599)]=Game_Vehicle['prototype'][_0x317e8f(0x211)],Game_Vehicle[_0x317e8f(0x32c)][_0x317e8f(0x211)]=function(){const _0xe90c26=_0x317e8f;VisuMZ['EventsMoveCore']['Game_Vehicle_initMoveSpeed']['call'](this);const _0xc36e55=VisuMZ[_0xe90c26(0x5ac)][_0xe90c26(0x2c7)]['Movement'];if(this[_0xe90c26(0x4c3)]()){if(_0xc36e55[_0xe90c26(0x243)])this['setMoveSpeed'](_0xc36e55['BoatSpeed']);}else{if(this[_0xe90c26(0x48a)]()){if('myQwD'!==_0xe90c26(0x419)){if(_0xc36e55[_0xe90c26(0x480)])this['setMoveSpeed'](_0xc36e55[_0xe90c26(0x480)]);}else{const _0x413e55=_0x106e41['GetMoveSynchTarget'](this['moveSynchTarget']());if(_0x413e55)return _0x413e55[_0xe90c26(0x461)]();}}else{if(this[_0xe90c26(0x233)]()){if('bfYLw'==='GFyoF')this['_labelWindow'][_0xe90c26(0x1b7)]=_0x2bae13(_0x11c1b9['$1']);else{if(_0xc36e55['AirshipSpeed'])this[_0xe90c26(0x4b8)](_0xc36e55[_0xe90c26(0x50d)]);}}}}},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x4ad)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x636)],Game_Event[_0x317e8f(0x32c)]['initialize']=function(_0x29212d,_0x57e74d){const _0x48644c=_0x317e8f;VisuMZ['EventsMoveCore'][_0x48644c(0x4ad)]['call'](this,_0x29212d,_0x57e74d),this['setupCopyEvent'](),this[_0x48644c(0x503)](),this[_0x48644c(0x30e)]();},Game_Map['prototype'][_0x317e8f(0x540)]=function(_0x269b24,_0xe95432){const _0x5ebf4c=_0x317e8f;return _0x269b24===$gameMap['mapId']()?$dataMap['events'][_0xe95432]:VisuMZ['PreloadedMaps'][_0x269b24][_0x5ebf4c(0x45d)][_0xe95432];},VisuMZ['EventsMoveCore'][_0x317e8f(0x43d)]=Game_Event['prototype'][_0x317e8f(0x450)],Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x450)]=function(){const _0x3a26af=_0x317e8f;if(this[_0x3a26af(0x3cd)]!==undefined){const _0xe5fe5f=this[_0x3a26af(0x3cd)][_0x3a26af(0x4f2)],_0x1ddbb6=this['_eventMorphData'][_0x3a26af(0x23b)];return $gameMap[_0x3a26af(0x540)](_0xe5fe5f,_0x1ddbb6);}if(this[_0x3a26af(0x603)]!==undefined){const _0x3cc2ae=this[_0x3a26af(0x603)][_0x3a26af(0x4f2)],_0x451986=this[_0x3a26af(0x603)][_0x3a26af(0x23b)];return $gameMap[_0x3a26af(0x540)](_0x3cc2ae,_0x451986);}if(this[_0x3a26af(0x43f)]!==undefined){const _0x6b7bae=this['_eventSpawnData'][_0x3a26af(0x4f2)],_0x253f7f=this['_eventSpawnData'][_0x3a26af(0x23b)];return $gameMap[_0x3a26af(0x540)](_0x6b7bae,_0x253f7f);}if($gameTemp[_0x3a26af(0x58e)]!==undefined){if(_0x3a26af(0x414)!==_0x3a26af(0x1c0)){const _0x2848dd=$gameTemp['_spawnData']['mapId'],_0x4ceeb7=$gameTemp['_spawnData']['eventId'];return $gameMap[_0x3a26af(0x540)](_0x2848dd,_0x4ceeb7);}else{this[_0x3a26af(0x63a)]=!![];return;}}return VisuMZ[_0x3a26af(0x5ac)][_0x3a26af(0x43d)][_0x3a26af(0x317)](this);},Game_Event[_0x317e8f(0x32c)]['checkValidEventerMap']=function(_0x5c5b08,_0x381038){const _0x7462e4=_0x317e8f;if(_0x5c5b08===0x0||_0x381038===0x0)return![];if(!VisuMZ[_0x7462e4(0x190)][_0x5c5b08]&&_0x5c5b08!==$gameMap['mapId']())return $gameTemp[_0x7462e4(0x45e)]()&&console[_0x7462e4(0x4e1)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'['format'](_0x5c5b08)),![];return!![];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x518)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x3a5)],Game_Event['prototype'][_0x317e8f(0x3a5)]=function(){const _0x32faa1=_0x317e8f;VisuMZ[_0x32faa1(0x5ac)][_0x32faa1(0x518)][_0x32faa1(0x317)](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x32faa1(0x4b0)](VisuMZ[_0x32faa1(0x3e6)]['Settings'][_0x32faa1(0x4b3)][_0x32faa1(0x546)])&&Input[_0x32faa1(0x46e)]();},Game_Event[_0x317e8f(0x32c)]['setupCopyEvent']=function(){const _0x131629=_0x317e8f,_0x593cb5=this[_0x131629(0x450)]()[_0x131629(0x4b5)];if(_0x593cb5==='')return;if(DataManager['isBattleTest']()||DataManager['isEventTest']())return;const _0x34f63a=VisuMZ['EventsMoveCore'][_0x131629(0x2c7)]['Template'];let _0x215992=null,_0x3a5efe=0x0,_0x540f52=0x0;if(_0x593cb5[_0x131629(0x5bf)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x131629(0x40f)==='AqVaj'?(_0x3a5efe=Number(RegExp['$1']),_0x540f52=Number(RegExp['$2'])):this[_0x131629(0x43e)]=_0x4c9bf4(_0x581718['$1']);else{if(_0x593cb5[_0x131629(0x5bf)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x3a5efe=Number(RegExp['$1']),_0x540f52=Number(RegExp['$2']);else{if(_0x593cb5[_0x131629(0x5bf)](/<COPY EVENT:[ ](.*?)>/i)){const _0x3e9f4b=String(RegExp['$1'])['toUpperCase']()[_0x131629(0x2bc)]();_0x215992=VisuMZ[_0x131629(0x367)][_0x3e9f4b];if(!_0x215992)return;_0x3a5efe=_0x215992[_0x131629(0x3b9)],_0x540f52=_0x215992[_0x131629(0x544)];}}}if(!this['checkValidEventerMap'](_0x3a5efe,_0x540f52))return;_0x34f63a[_0x131629(0x442)]['call'](this,_0x3a5efe,_0x540f52,this);if(_0x215992)_0x215992[_0x131629(0x442)][_0x131629(0x317)](this,_0x3a5efe,_0x540f52,this);this[_0x131629(0x603)]={'mapId':_0x3a5efe,'eventId':_0x540f52},this[_0x131629(0x18b)]=-0x2,this[_0x131629(0x4dd)](),_0x34f63a[_0x131629(0x393)]['call'](this,_0x3a5efe,_0x540f52,this);if(_0x215992)_0x215992[_0x131629(0x393)]['call'](this,_0x3a5efe,_0x540f52,this);$gameMap['clearEventCache']();},Game_Event['prototype'][_0x317e8f(0x503)]=function(){const _0x300e58=_0x317e8f,_0x5af4ff=$gameSystem[_0x300e58(0x5ef)](this);if(!_0x5af4ff)return;const _0x195fb3=_0x5af4ff['template']['toUpperCase']()['trim']();if(_0x195fb3!==_0x300e58(0x4a3))this[_0x300e58(0x5c9)](_0x195fb3,!![]);else{if(_0x300e58(0x22e)!=='bgyVh'){this[_0x300e58(0x259)](),this[_0x300e58(0x470)][_0x300e58(0x46e)]();const _0x1ae4a2=this['_text']['split'](/[\r\n]+/);let _0x291853=0x0;for(const _0x2c8517 of _0x1ae4a2){const _0x310b80=this[_0x300e58(0x422)](_0x2c8517),_0x15d79c=_0x3a5aef[_0x300e58(0x534)]((this[_0x300e58(0x56d)]-_0x310b80[_0x300e58(0x5c1)])/0x2);this[_0x300e58(0x4c1)](_0x2c8517,_0x15d79c,_0x291853),_0x291853+=_0x310b80[_0x300e58(0x4ba)];}}else this['morphInto'](_0x5af4ff['mapId'],_0x5af4ff[_0x300e58(0x23b)],!![]);}},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x273)]=function(_0x30881f,_0x35f2f0,_0x403fd5){const _0xf2b2af=_0x317e8f;if(!this[_0xf2b2af(0x304)](_0x30881f,_0x35f2f0))return;const _0x4fc69c=VisuMZ['EventsMoveCore'][_0xf2b2af(0x2c7)][_0xf2b2af(0x205)];if(!_0x403fd5)_0x4fc69c[_0xf2b2af(0x4a7)][_0xf2b2af(0x317)](this,_0x30881f,_0x35f2f0,this);this[_0xf2b2af(0x3cd)]={'mapId':_0x30881f,'eventId':_0x35f2f0},this['_pageIndex']=-0x2,this[_0xf2b2af(0x4dd)]();if(!_0x403fd5)_0x4fc69c[_0xf2b2af(0x4aa)]['call'](this,_0x30881f,_0x35f2f0,this);$gameMap['clearEventCache']();},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5c9)]=function(_0x1b616f,_0x330d47){const _0x9d338d=_0x317e8f;_0x1b616f=_0x1b616f[_0x9d338d(0x639)]()['trim']();const _0x35d332=VisuMZ[_0x9d338d(0x367)][_0x1b616f];if(!_0x35d332)return;const _0x3f6baf=_0x35d332[_0x9d338d(0x3b9)],_0x5583c5=_0x35d332[_0x9d338d(0x544)];if(!this[_0x9d338d(0x304)](_0x3f6baf,_0x5583c5))return;if(!_0x330d47)_0x35d332[_0x9d338d(0x4a7)][_0x9d338d(0x317)](this,_0x3f6baf,_0x5583c5,this);this[_0x9d338d(0x273)](_0x3f6baf,_0x5583c5,_0x330d47);if(!_0x330d47)_0x35d332[_0x9d338d(0x4aa)][_0x9d338d(0x317)](this,_0x3f6baf,_0x5583c5,this);if($gameMap)$gameMap[_0x9d338d(0x60b)]();},Game_Event[_0x317e8f(0x32c)]['removeMorph']=function(){const _0x2ad79c=_0x317e8f;this[_0x2ad79c(0x3cd)]=undefined,this[_0x2ad79c(0x18b)]=-0x2,this[_0x2ad79c(0x4dd)]();},Game_Event[_0x317e8f(0x32c)]['setupSpawn']=function(_0x559b06){const _0x3ee4ea=_0x317e8f,_0x1e9cd3=VisuMZ[_0x3ee4ea(0x5ac)]['Settings']['Template'],_0x2a84f6=_0x559b06[_0x3ee4ea(0x220)][_0x3ee4ea(0x639)]()[_0x3ee4ea(0x2bc)](),_0x1bcc3e=!['',_0x3ee4ea(0x4a3)][_0x3ee4ea(0x4fa)](_0x2a84f6);let _0x16784f=0x0,_0x25d3dc=0x0;if(_0x1bcc3e){if('CyGir'!==_0x3ee4ea(0x315))_0x445264[_0x3ee4ea(0x5ac)][_0x3ee4ea(0x4c2)]['call'](this,_0xc58fe1,_0x3b737f),this[_0x3ee4ea(0x4ea)]=_0x178e8a,this[_0x3ee4ea(0x537)]=_0x230c12;else{const _0x2a501d=VisuMZ[_0x3ee4ea(0x367)][_0x2a84f6];if(!_0x2a501d)return;_0x16784f=_0x2a501d[_0x3ee4ea(0x3b9)],_0x25d3dc=_0x2a501d['EventID'];}}else _0x16784f=_0x559b06[_0x3ee4ea(0x4f2)],_0x25d3dc=_0x559b06['eventId'];if(!this['checkValidEventerMap'](_0x16784f,_0x25d3dc))return;if(_0x1bcc3e){const _0x2e1238=VisuMZ['EventTemplates'][_0x2a84f6];_0x2e1238[_0x3ee4ea(0x447)]['call'](this,_0x16784f,_0x25d3dc,this);}_0x1e9cd3['PreSpawnJS'][_0x3ee4ea(0x317)](this,_0x16784f,_0x25d3dc,this),this[_0x3ee4ea(0x43f)]=_0x559b06,this[_0x3ee4ea(0x18b)]=-0x2,this[_0x3ee4ea(0x382)]=$gameMap[_0x3ee4ea(0x4f2)](),this[_0x3ee4ea(0x3d9)]=_0x559b06['spawnEventId'],this[_0x3ee4ea(0x1ae)]=_0x559b06[_0x3ee4ea(0x3b1)],this[_0x3ee4ea(0x355)](_0x559b06['x'],_0x559b06['y']),this[_0x3ee4ea(0x40e)](_0x559b06[_0x3ee4ea(0x212)]),this['refresh']();if(_0x1bcc3e){const _0x37e6e7=VisuMZ['EventTemplates'][_0x2a84f6];if(!_0x37e6e7)return;_0x37e6e7[_0x3ee4ea(0x496)][_0x3ee4ea(0x317)](this,_0x16784f,_0x25d3dc,this);}_0x1e9cd3['PostSpawnJS']['call'](this,_0x16784f,_0x25d3dc,this);const _0x11982c=SceneManager['_scene'];if(_0x11982c&&_0x11982c[_0x3ee4ea(0x51f)])_0x11982c[_0x3ee4ea(0x51f)][_0x3ee4ea(0x36f)](this);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5cf)]=function(){const _0x19bed8=_0x317e8f;return!!this[_0x19bed8(0x43f)];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5d2)]=Game_Event[_0x317e8f(0x32c)]['refresh'],Game_Event[_0x317e8f(0x32c)]['refresh']=function(){const _0x293135=_0x317e8f,_0x54edb8=this[_0x293135(0x18b)];VisuMZ['EventsMoveCore']['Game_Event_refresh'][_0x293135(0x317)](this),_0x54edb8!==this[_0x293135(0x18b)]&&this[_0x293135(0x5a9)]();},VisuMZ['EventsMoveCore'][_0x317e8f(0x395)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5bd)],Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5bd)]=function(){const _0x26fb79=_0x317e8f;VisuMZ[_0x26fb79(0x5ac)][_0x26fb79(0x395)][_0x26fb79(0x317)](this),this[_0x26fb79(0x226)]();},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x3da)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x47a)],Game_Event['prototype'][_0x317e8f(0x47a)]=function(){const _0x61a694=_0x317e8f;this[_0x61a694(0x3ee)]=!![],VisuMZ[_0x61a694(0x5ac)]['Game_Event_setupPageSettings']['call'](this),this[_0x61a694(0x5a9)](),this[_0x61a694(0x3ee)]=![];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5a9)]=function(){const _0x30e42c=_0x317e8f;if(!this['event']())return;this[_0x30e42c(0x226)](),this[_0x30e42c(0x27c)](),this[_0x30e42c(0x245)](),this[_0x30e42c(0x43c)]();},Game_Event['prototype'][_0x317e8f(0x27c)]=function(){const _0x48e7e9=_0x317e8f,_0x45bc9d=this[_0x48e7e9(0x450)]()[_0x48e7e9(0x4b5)];if(_0x45bc9d==='')return;this[_0x48e7e9(0x29a)](_0x45bc9d);},Game_Event[_0x317e8f(0x32c)]['setupEventsMoveCoreCommentTags']=function(){const _0x52df03=_0x317e8f;if(!this['page']())return;const _0x9eb3bc=this['list']();let _0x2c82b7='';for(const _0x148883 of _0x9eb3bc){if([0x6c,0x198][_0x52df03(0x4fa)](_0x148883[_0x52df03(0x628)])){if(_0x2c82b7!=='')_0x2c82b7+='\x0a';_0x2c82b7+=_0x148883[_0x52df03(0x2c2)][0x0];}}this[_0x52df03(0x29a)](_0x2c82b7);},Game_Event[_0x317e8f(0x32c)]['initEventsMoveCoreEffects']=function(){const _0x22dd39=_0x317e8f,_0x548f1e=VisuMZ[_0x22dd39(0x5ac)]['Settings'];this['_activationProximity']={'type':'none','distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x22dd39(0x4f5)]=![],this[_0x22dd39(0x61c)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x22dd39(0x477)]=$gameSystem[_0x22dd39(0x525)](this),this[_0x22dd39(0x303)]={'text':'','visibleRange':_0x548f1e[_0x22dd39(0x371)][_0x22dd39(0x53e)],'offsetX':_0x548f1e[_0x22dd39(0x371)][_0x22dd39(0x582)],'offsetY':_0x548f1e[_0x22dd39(0x371)][_0x22dd39(0x411)]},this['_moveOnlyRegions']=[],this[_0x22dd39(0x619)]={'target':-0x1,'type':_0x22dd39(0x570),'delay':0x1},this[_0x22dd39(0x290)]=_0x548f1e[_0x22dd39(0x50c)][_0x22dd39(0x452)]??0x0,this['_saveEventLocation']=![],this['_shadowGraphic']={'visible':!![],'filename':_0x548f1e[_0x22dd39(0x50c)][_0x22dd39(0x323)]},this[_0x22dd39(0x34b)](),this['clearStepPattern']();},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x29a)]=function(_0x22496c){const _0x1ebd57=_0x317e8f;if(_0x22496c['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))'gsmsx'!==_0x1ebd57(0x495)?(_0x41d7bc=_0x236af8[_0x1ebd57(0x4f2)],_0x2801e6=_0xa9b1bc[_0x1ebd57(0x23b)]):(this['_activationProximity'][_0x1ebd57(0x35e)]=JSON[_0x1ebd57(0x63b)]('['+RegExp['$1'][_0x1ebd57(0x5bf)](/\d+/g)+']'),this['_activationProximity'][_0x1ebd57(0x64b)]=_0x1ebd57(0x421));else _0x22496c[_0x1ebd57(0x5bf)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x1ebd57(0x4ac)]()['trim'](),this[_0x1ebd57(0x266)][_0x1ebd57(0x64b)]=type,this[_0x1ebd57(0x266)][_0x1ebd57(0x262)]=Number(RegExp['$2']));_0x22496c['match'](/<ALWAYS UPDATE MOVEMENT>/i)&&(this['_alwaysUpdateMove']=!![]);_0x22496c[_0x1ebd57(0x5bf)](/<CLICK TRIGGER>/i)&&(this[_0x1ebd57(0x4f5)]=!![]);const _0x1f16bd=_0x22496c[_0x1ebd57(0x5bf)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x1f16bd)for(const _0x5b122e of _0x1f16bd){if(_0x1ebd57(0x1ac)==='narHg'){if(_0x5b122e[_0x1ebd57(0x5bf)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x36500a=String(RegExp['$1'])[_0x1ebd57(0x4ac)]()[_0x1ebd57(0x2bc)](),_0x52fb8b=Number(RegExp['$2']);this[_0x1ebd57(0x61c)][_0x36500a]=_0x52fb8b;}}else{_0xd1a7a0['EventsMoveCore'][_0x1ebd57(0x27f)]['call'](this,_0x4470d0,_0x3c49c0);if(this['isSpriteVS8dir']())this[_0x1ebd57(0x581)](_0x140290,_0x53dbc4);}}if(_0x22496c[_0x1ebd57(0x5bf)](/<ICON:[ ](\d+)>/i)){if('TyOan'!==_0x1ebd57(0x1c3))return this[_0x1ebd57(0x38f)](_0x51e661);else this[_0x1ebd57(0x477)][_0x1ebd57(0x322)]=Number(RegExp['$1']);}_0x22496c['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x1ebd57(0x44f)]=Number(RegExp['$1']));_0x22496c['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferY']=Number(RegExp['$1']));_0x22496c[_0x1ebd57(0x5bf)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1ebd57(0x477)]['bufferX']=Number(RegExp['$1']),this[_0x1ebd57(0x477)][_0x1ebd57(0x4ed)]=Number(RegExp['$2']));if(_0x22496c['match'](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x1b0c27=String(RegExp['$1'])[_0x1ebd57(0x639)]()['trim'](),_0x5e4ce3=[_0x1ebd57(0x415),_0x1ebd57(0x394),_0x1ebd57(0x3ef),'SCREEN'];this[_0x1ebd57(0x477)][_0x1ebd57(0x274)]=_0x5e4ce3[_0x1ebd57(0x25b)](_0x1b0c27)[_0x1ebd57(0x2e7)](0x0,0x3);}_0x22496c['match'](/<LABEL:[ ](.*?)>/i)&&(this[_0x1ebd57(0x303)][_0x1ebd57(0x44b)]=String(RegExp['$1'])[_0x1ebd57(0x2bc)]());_0x22496c[_0x1ebd57(0x5bf)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x1ebd57(0x303)][_0x1ebd57(0x44b)]=String(RegExp['$1'])[_0x1ebd57(0x2bc)]());_0x22496c[_0x1ebd57(0x5bf)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x1ebd57(0x303)]['offsetX']=Number(RegExp['$1']));if(_0x22496c[_0x1ebd57(0x5bf)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x1ebd57(0x1d9)==='oSMTG')this['_labelWindow'][_0x1ebd57(0x396)]=Number(RegExp['$1']);else return{'iconIndex':0x0,'bufferX':_0x4976d7[_0x1ebd57(0x42d)][_0x1ebd57(0x532)],'bufferY':_0x560340['Icon'][_0x1ebd57(0x55e)],'blendMode':_0x3c956a[_0x1ebd57(0x42d)][_0x1ebd57(0x4d8)]};}if(_0x22496c[_0x1ebd57(0x5bf)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x1ebd57(0x302)!==_0x1ebd57(0x302))return![];else this[_0x1ebd57(0x303)][_0x1ebd57(0x202)]=Number(RegExp['$1']),this[_0x1ebd57(0x303)][_0x1ebd57(0x396)]=Number(RegExp['$2']);}$gameTemp[_0x1ebd57(0x264)](this);for(;;){if(_0x1ebd57(0x200)==='hUpNZ')this[_0x1ebd57(0x2fe)]=_0xe9dae1;else{if(this[_0x1ebd57(0x303)][_0x1ebd57(0x44b)][_0x1ebd57(0x5bf)](/\\V\[(\d+)\]/gi))this[_0x1ebd57(0x303)][_0x1ebd57(0x44b)]=this[_0x1ebd57(0x303)][_0x1ebd57(0x44b)][_0x1ebd57(0x30f)](/\\V\[(\d+)\]/gi,(_0x171730,_0x4b32ba)=>$gameVariables['value'](parseInt(_0x4b32ba)));else{if(_0x1ebd57(0x61d)===_0x1ebd57(0x61d))break;else{_0x184d91[_0x1ebd57(0x57a)](_0xa96401,_0x5445ee);const _0x4bb752=_0x50d7eb[_0x1ebd57(0x5c0)](),_0x57c53e=_0x44d951[_0x1ebd57(0x1b0)]||_0x5aa23e[_0x1ebd57(0x4f2)](),_0x1c8607=_0x29b2eb['EventId']||_0x4bb752[_0x1ebd57(0x23b)](),_0x122f57=_0x48e0fc[_0x1ebd57(0x4a2)]||0x0,_0x19c44d=_0x3aaaa9[_0x1ebd57(0x1b3)]||0x0,_0x49b3c0=_0x13baf3[_0x1ebd57(0x5cb)]||0x2,_0x5b9081=((_0x42faf4[_0x1ebd57(0x62e)]||0x1)-0x1)['clamp'](0x0,0x13),_0x18add5=_0x44d3ac[_0x1ebd57(0x267)]||0x0;_0x4511e1[_0x1ebd57(0x3a0)](_0x57c53e,_0x1c8607,_0x122f57,_0x19c44d,_0x49b3c0,_0x5b9081,_0x18add5);}}}}$gameTemp[_0x1ebd57(0x2cd)]();_0x22496c['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x1ebd57(0x303)]['visibleRange']=Number(RegExp['$1']));if(_0x22496c[_0x1ebd57(0x5bf)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1ebd57(0x21e)==='teWHY'){const _0x513516=JSON[_0x1ebd57(0x63b)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x1ebd57(0x5ba)]=this['_moveOnlyRegions']['concat'](_0x513516),this[_0x1ebd57(0x5ba)][_0x1ebd57(0x2d8)](0x0);}else return this[_0x1ebd57(0x37f)](_0x55bd8a(_0x3945af['$1']));}if(_0x22496c['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x4db300=String(RegExp['$1']);if(_0x4db300[_0x1ebd57(0x5bf)](/PLAYER/i)){if(_0x1ebd57(0x26f)!=='aIbYl')this[_0x1ebd57(0x619)][_0x1ebd57(0x240)]=0x0;else return this[_0x1ebd57(0x345)]();}else _0x4db300['match'](/EVENT[ ](\d+)/i)&&(this[_0x1ebd57(0x619)]['target']=Number(RegExp['$1']));}_0x22496c[_0x1ebd57(0x5bf)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x1ebd57(0x619)][_0x1ebd57(0x64b)]=String(RegExp['$1'])[_0x1ebd57(0x4ac)]()[_0x1ebd57(0x2bc)]());_0x22496c[_0x1ebd57(0x5bf)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(_0x1ebd57(0x2d7)!==_0x1ebd57(0x2d7)?_0x1a6f16[_0x1ebd57(0x5ac)][_0x1ebd57(0x25f)][_0x1ebd57(0x317)](this):this['_moveSynch'][_0x1ebd57(0x3f3)]=Number(RegExp['$1']));if(_0x22496c['match'](/<TRUE RANDOM MOVE>/i))_0x1ebd57(0x42e)!==_0x1ebd57(0x5d6)?this['_randomMoveWeight']=0x0:this[_0x1ebd57(0x5e6)]=_0x2f5924(_0x2e65b8['$1']);else _0x22496c['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(_0x1ebd57(0x2b7)==='LPBZv'?this[_0x1ebd57(0x290)]=Number(RegExp['$1'])||0x0:(_0x322ff6['x']=_0x2f5038?_0x1b45e4[_0x1ebd57(0x44f)]:0x0,_0x3ec28e['y']=_0x131fe4?-this[_0x1ebd57(0x4ba)]+_0x1fb828[_0x1ebd57(0x4ed)]:0x0));_0x22496c['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(_0x1ebd57(0x4a8)===_0x1ebd57(0x4a8)?this[_0x1ebd57(0x1a3)]=!![]:this[_0x1ebd57(0x303)][_0x1ebd57(0x396)]=_0x547184(_0x1180b5['$1']));_0x22496c['match'](/<HIDE SHADOW>/i)&&(this[_0x1ebd57(0x420)]['visible']=![]);if(_0x22496c[_0x1ebd57(0x5bf)](/<SHADOW FILENAME:[ ](.*?)>/i)){if('AZTMK'!=='XcWKo')this['_shadowGraphic'][_0x1ebd57(0x2db)]=String(RegExp['$1']);else return this[_0x1ebd57(0x379)]();}_0x22496c[_0x1ebd57(0x5bf)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x1ebd57(0x5e6)]=Number(RegExp['$1']));_0x22496c[_0x1ebd57(0x5bf)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1ebd57(0x43e)]=Number(RegExp['$1']));if(_0x22496c[_0x1ebd57(0x5bf)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('opBfI'==='ITGyE'){const _0x172b85=_0x48589a['getSelfTarget']()||this;if(_0x172b85['constructor']!==_0x52c256)return _0x1510b2[_0x1ebd57(0x5ac)]['Game_Variables_value']['call'](this,_0x45a287);else{const _0x34c03a=[_0x172b85[_0x1ebd57(0x382)],_0x172b85[_0x1ebd57(0x3d9)],'Self\x20Variable\x20%1'['format'](_0x4bc978)];return _0x18cbc7[_0x1ebd57(0x4d0)](_0x34c03a);}}else this[_0x1ebd57(0x5e6)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2']);}if(_0x22496c[_0x1ebd57(0x5bf)](/<STEP PATTERN:[ ](.*)>/i)){if(_0x1ebd57(0x376)!==_0x1ebd57(0x376))return!!this['mapValue'](_0x9d7f41);else this['_stepPattern']=String(RegExp['$1'])[_0x1ebd57(0x639)]()[_0x1ebd57(0x2bc)]();}},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x43c)]=function(){const _0x52af16=_0x317e8f;this[_0x52af16(0x208)]();},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x45f)]=function(){const _0x16880d=_0x317e8f;if(this[_0x16880d(0x3b4)])return!![];return Game_Character[_0x16880d(0x32c)][_0x16880d(0x45f)]['call'](this);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x585)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x3e2)],Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x3e2)]=function(){const _0x85ce9a=_0x317e8f;if(this['isPreventSelfMovement']())return;VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement'][_0x85ce9a(0x317)](this),this['isMoving']()&&VisuMZ[_0x85ce9a(0x27d)](this[_0x85ce9a(0x3d9)]);},Game_Event[_0x317e8f(0x32c)]['isPreventSelfMovement']=function(){const _0x30e4ca=_0x317e8f,_0x342030=VisuMZ['EventsMoveCore'][_0x30e4ca(0x2c7)][_0x30e4ca(0x50c)];if($gameMap[_0x30e4ca(0x320)]()&&_0x342030[_0x30e4ca(0x5f8)])return!![];if($gameMessage[_0x30e4ca(0x2ca)]()&&_0x342030[_0x30e4ca(0x3a7)])return!![];if(!$gameSystem[_0x30e4ca(0x1a8)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x208)]=function(){const _0x599bd3=_0x317e8f,_0x10dfb1=SceneManager['_scene'][_0x599bd3(0x51f)];if(_0x10dfb1){const _0x2e681c=_0x10dfb1['findTargetSprite'](this);_0x2e681c&&_0x2e681c[_0x599bd3(0x1b8)]&&_0x2e681c[_0x599bd3(0x1b8)]['_filename']!==this[_0x599bd3(0x353)]()&&('CmYnF'==='ulakx'?(_0x56f439['EventsMoveCore'][_0x599bd3(0x567)][_0x599bd3(0x317)](this),this[_0x599bd3(0x531)]()):(_0x2e681c[_0x599bd3(0x1b8)][_0x599bd3(0x3e5)]=this[_0x599bd3(0x353)](),_0x2e681c[_0x599bd3(0x1b8)][_0x599bd3(0x1fe)]=ImageManager['loadSystem'](_0x2e681c['_shadowSprite'][_0x599bd3(0x3e5)])));}},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x353)]=function(){const _0x5420dc=_0x317e8f;return this[_0x5420dc(0x420)][_0x5420dc(0x2db)];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x31a)]=function(){const _0x1f05ea=_0x317e8f;if(!this[_0x1f05ea(0x420)][_0x1f05ea(0x47f)])return![];return Game_CharacterBase['prototype'][_0x1f05ea(0x31a)][_0x1f05ea(0x317)](this);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x256)]=function(){return this['_labelWindow']['text'];},Game_Event[_0x317e8f(0x32c)]['labelWindowRange']=function(){const _0x4c0717=_0x317e8f;return this[_0x4c0717(0x303)]['visibleRange'];},Game_Event['prototype']['isMapPassable']=function(_0x4256fb,_0x3cabfc,_0x5a501e){const _0x1bd9c6=_0x317e8f;if(this[_0x1bd9c6(0x517)]())return this[_0x1bd9c6(0x1f8)](_0x4256fb,_0x3cabfc,_0x5a501e);if($gameMap[_0x1bd9c6(0x1b2)](_0x4256fb,_0x3cabfc,_0x5a501e,_0x1bd9c6(0x450)))return!![];if($gameMap[_0x1bd9c6(0x4fb)](_0x4256fb,_0x3cabfc,_0x5a501e,_0x1bd9c6(0x450)))return![];return Game_Character[_0x1bd9c6(0x32c)]['isMapPassable'][_0x1bd9c6(0x317)](this,_0x4256fb,_0x3cabfc,_0x5a501e);},Game_Event['prototype'][_0x317e8f(0x517)]=function(){const _0x2b976e=_0x317e8f;if(this[_0x2b976e(0x5ba)]===undefined)this[_0x2b976e(0x226)]();return this[_0x2b976e(0x5ba)]['length']>0x0;},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x1f8)]=function(_0x2c170a,_0x44f41f,_0x4b8460){const _0x2cfb9c=_0x317e8f,_0x4c8428=$gameMap[_0x2cfb9c(0x3c3)](_0x2c170a,_0x4b8460),_0x5e3422=$gameMap[_0x2cfb9c(0x629)](_0x44f41f,_0x4b8460),_0x35b824=$gameMap[_0x2cfb9c(0x30c)](_0x4c8428,_0x5e3422);return this[_0x2cfb9c(0x5ba)][_0x2cfb9c(0x4fa)](_0x35b824);},VisuMZ['EventsMoveCore'][_0x317e8f(0x4a5)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x47b)],Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x47b)]=function(){const _0x1369cf=_0x317e8f;return this[_0x1369cf(0x3bf)]=![],this[_0x1369cf(0x508)]=![],this[_0x1369cf(0x450)]()?VisuMZ[_0x1369cf(0x5ac)]['Game_Event_findProperPageIndex'][_0x1369cf(0x317)](this):-0x1;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x28f)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5f4)],Game_Event['prototype'][_0x317e8f(0x5f4)]=function(_0x1479b5){const _0x3c3627=_0x317e8f;this[_0x3c3627(0x5a3)](_0x1479b5),$gameTemp[_0x3c3627(0x264)](this);const _0x408334=VisuMZ[_0x3c3627(0x5ac)][_0x3c3627(0x28f)][_0x3c3627(0x317)](this,_0x1479b5);return $gameTemp[_0x3c3627(0x2cd)](),_0x408334;},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x41e)]=function(){const _0x593b51=_0x317e8f;return this[_0x593b51(0x3bf)];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5a3)]=function(_0xf252e2){const _0x53fb40=_0x317e8f,_0xd6ce05=_0xf252e2[_0x53fb40(0x2e3)];if(_0xd6ce05[_0x53fb40(0x3e9)]&&DataManager[_0x53fb40(0x5b4)](_0xd6ce05['switch1Id']))_0x53fb40(0x1b6)!==_0x53fb40(0x1b6)?this[_0x53fb40(0x290)]=0x0:this[_0x53fb40(0x3bf)]=!![];else{if(_0xd6ce05[_0x53fb40(0x4da)]&&DataManager['isAdvancedSwitch'](_0xd6ce05[_0x53fb40(0x4bf)]))this[_0x53fb40(0x3bf)]=!![];else _0xd6ce05[_0x53fb40(0x2dc)]&&DataManager[_0x53fb40(0x3d7)](_0xd6ce05['variableId'])&&(this[_0x53fb40(0x3bf)]=!![]);}},Game_Event[_0x317e8f(0x32c)]['hasClickTrigger']=function(){const _0x50d386=_0x317e8f;if(this[_0x50d386(0x269)])return![];return this[_0x50d386(0x4f5)];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x3d2)]=function(){const _0x331a6b=_0x317e8f;$gameTemp['clearDestination'](),this[_0x331a6b(0x3a5)]();},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x48d)]=function(_0x5dcea,_0x4d5ff3){const _0x3ac37b=_0x317e8f;if(this[_0x3ac37b(0x61c)])return this[_0x3ac37b(0x228)](_0x5dcea,_0x4d5ff3);else{if(_0x3ac37b(0x3a9)!==_0x3ac37b(0x574))return Game_Character[_0x3ac37b(0x32c)][_0x3ac37b(0x48d)][_0x3ac37b(0x317)](this,_0x5dcea,_0x4d5ff3);else this[_0x3ac37b(0x4b4)]='',this[_0x3ac37b(0x580)]=0x0;}},Game_Event['prototype'][_0x317e8f(0x228)]=function(_0x7f517f,_0x18fe76){const _0x5885b2=_0x317e8f;var _0x567bff=this['x']-this[_0x5885b2(0x61c)][_0x5885b2(0x53a)],_0x5caa85=this['x']+this['_addedHitbox'][_0x5885b2(0x4d1)],_0x5f5507=this['y']-this['_addedHitbox']['up'],_0x507493=this['y']+this[_0x5885b2(0x61c)][_0x5885b2(0x584)];return _0x567bff<=_0x7f517f&&_0x7f517f<=_0x5caa85&&_0x5f5507<=_0x18fe76&&_0x18fe76<=_0x507493;},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x18c)]=function(_0x1c4acd,_0x1a5c53,_0x2325df){const _0x58629e=_0x317e8f;for(let _0x2551ad=-this[_0x58629e(0x61c)][_0x58629e(0x53a)];_0x2551ad<=this['_addedHitbox'][_0x58629e(0x4d1)];_0x2551ad++){if(_0x58629e(0x4d4)!==_0x58629e(0x348))for(let _0x122fba=-this['_addedHitbox']['up'];_0x122fba<=this[_0x58629e(0x61c)][_0x58629e(0x584)];_0x122fba++){if(!Game_Character[_0x58629e(0x32c)][_0x58629e(0x18c)][_0x58629e(0x317)](this,_0x1c4acd+_0x2551ad,_0x1a5c53+_0x122fba,_0x2325df))return![];}else{if(_0x36985c['isBigCharacter'](this[_0x58629e(0x44c)]))return;_0x3ccf17=_0x487e3f[_0x58629e(0x2e7)](0x0,0x7),this[_0x58629e(0x1cd)](this[_0x58629e(0x44c)],_0x5622b1);}}return!![];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5dd)]=function(_0x224c94,_0x2e3eb2){const _0x2b7611=_0x317e8f;if(Imported[_0x2b7611(0x4e5)]&&this[_0x2b7611(0x21a)]()){if(_0x2b7611(0x57d)!=='iHlIj')return this[_0x2b7611(0x1ff)](_0x224c94,_0x2e3eb2);else _0x36f5c0[_0x2b7611(0x57a)](_0x5aefa6,_0x2ba937),_0x121430[_0x2b7611(0x5bb)](_0x20b375,_0xe6dec7[_0x2b7611(0x1f6)],_0x537b2c['IconBufferX'],_0xad4c9d[_0x2b7611(0x32a)],_0x4b8af7[_0x2b7611(0x229)]);}else{if(_0x2b7611(0x31e)===_0x2b7611(0x634)){_0x5d02ef[_0x2b7611(0x57a)](_0x13f0c9,_0x5a86cf);const _0x1a2aa5=_0x130ee[_0x2b7611(0x5c0)]();_0x220460['MapId']=_0x389ba2['MapId']||_0x120fc9['mapId']();const _0x287d8e=[_0x40aabc[_0x2b7611(0x1b0)],_0x612ab7[_0x2b7611(0x558)]||_0x1a2aa5[_0x2b7611(0x23b)](),_0x2b7611(0x440)[_0x2b7611(0x49f)](_0x46e0b6[_0x2b7611(0x3e0)])],_0x4fc8a6=_0x5bbf08[_0x2b7611(0x49d)](_0xeaefeb[_0x2b7611(0x4d0)](_0x287d8e),_0x192d62[_0x2b7611(0x5e0)],_0x57954d[_0x2b7611(0x640)]);_0x4b8246[_0x2b7611(0x51e)](_0x287d8e,_0x4fc8a6);}else{const _0x3d42eb=$gameMap[_0x2b7611(0x5e3)](_0x224c94,_0x2e3eb2)['filter'](_0x363898=>_0x363898!==this);return _0x3d42eb[_0x2b7611(0x504)]>0x0;}}},Game_Event[_0x317e8f(0x32c)]['checkSmartEventCollision']=function(_0x2d0862,_0x5613f){const _0x1a4ce6=_0x317e8f;if(!this[_0x1a4ce6(0x29c)]()){if('csFRz'!=='Caxao')return![];else{if(_0x469795[_0x1a4ce6(0x45e)]())_0x36cf60['log'](_0x159bba);}}else{if(_0x1a4ce6(0x541)==='OkbEr'){const _0x8cfac7=$gameMap[_0x1a4ce6(0x5e3)](_0x2d0862,_0x5613f)[_0x1a4ce6(0x365)](_0x1fc8e8=>_0x1fc8e8!==this&&_0x1fc8e8[_0x1a4ce6(0x29c)]());return _0x8cfac7[_0x1a4ce6(0x504)]>0x0;}else _0x53e0a6[_0x1a4ce6(0x5a2)](this);}},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x423)]=function(){const _0x149627=_0x317e8f;return this[_0x149627(0x266)][_0x149627(0x64b)]||_0x149627(0x2cb);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x47c)]=function(){const _0xaeb55f=_0x317e8f;return this[_0xaeb55f(0x266)]['distance']||0x0;},Game_Event[_0x317e8f(0x32c)]['activationRegionList']=function(){const _0x3d946f=_0x317e8f;return this[_0x3d946f(0x266)][_0x3d946f(0x35e)]||[];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x253)]=function(){const _0x5d56eb=_0x317e8f;Game_Character['prototype']['increaseSteps'][_0x5d56eb(0x317)](this);if([_0x5d56eb(0x2cb),'region'][_0x5d56eb(0x4fa)](this[_0x5d56eb(0x423)]()))return;$gamePlayer[_0x5d56eb(0x2e5)]([0x2]);},VisuMZ[_0x317e8f(0x5ac)]['Game_Event_checkEventTriggerAuto']=Game_Event['prototype'][_0x317e8f(0x538)],Game_Event['prototype'][_0x317e8f(0x538)]=function(){const _0x4b98db=_0x317e8f;if(this[_0x4b98db(0x3c0)]!==0x3)return;if(this[_0x4b98db(0x3ee)])return;if(!this[_0x4b98db(0x491)](![]))return;if(!this[_0x4b98db(0x29e)](![]))return;VisuMZ[_0x4b98db(0x5ac)][_0x4b98db(0x3d4)][_0x4b98db(0x317)](this);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x4c9)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x1e1)],Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x1e1)]=function(){const _0x53682f=_0x317e8f;if(!this['_interpreter'])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x53682f(0x29e)](!![]))return;VisuMZ[_0x53682f(0x5ac)]['Game_Event_updateParallel'][_0x53682f(0x317)](this);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x491)]=function(_0x5d5478){const _0x36e0a4=_0x317e8f;if(!_0x5d5478&&$gameMap[_0x36e0a4(0x320)]())return![];if(!_0x5d5478&&$gameMap[_0x36e0a4(0x28e)]())return![];if(this[_0x36e0a4(0x1d8)]()<=0x0)return!![];return $gamePlayer[_0x36e0a4(0x57b)](this);},Game_Event[_0x317e8f(0x32c)]['checkActivationProximity']=function(_0x43a1d6){const _0x11a26a=_0x317e8f;if(!_0x43a1d6&&$gameMap[_0x11a26a(0x320)]())return![];if(!_0x43a1d6&&$gameMap[_0x11a26a(0x28e)]())return![];if(['none',_0x11a26a(0x421)][_0x11a26a(0x4fa)](this[_0x11a26a(0x423)]()))return!![];return $gamePlayer[_0x11a26a(0x4c5)](this);},VisuMZ[_0x317e8f(0x27d)]=function(_0x2a5a92){const _0x5cd054=_0x317e8f;for(const _0x4a97df of $gameMap[_0x5cd054(0x45d)]()){if(!_0x4a97df)continue;if(_0x4a97df[_0x5cd054(0x231)]()===_0x2a5a92){if(_0x5cd054(0x5ff)!==_0x5cd054(0x5ff)){if(this[_0x5cd054(0x455)]===_0x5a413e)this['initEventsMoveCore']();if(!_0x595810)return;const _0x4f7964=_0x5cd054(0x4a1)[_0x5cd054(0x49f)](_0x1e9def[_0x5cd054(0x382)],_0x112cff[_0x5cd054(0x3d9)]);this[_0x5cd054(0x455)][_0x4f7964]={'direction':_0x3e7492[_0x5cd054(0x212)](),'x':_0x597601[_0x5cd054(0x33d)](_0x415d88['x']),'y':_0x250b81[_0x5cd054(0x33d)](_0x1d2d2e['y']),'pageIndex':_0x435005['_pageIndex'],'moveRouteIndex':_0x4859f2[_0x5cd054(0x270)]};}else _0x4a97df[_0x5cd054(0x392)]();}}},VisuMZ['GetMoveSynchTarget']=function(_0x83a2f5){const _0x2fcbdd=_0x317e8f;if(_0x83a2f5===0x0)return $gamePlayer;return $gameMap[_0x2fcbdd(0x450)](_0x83a2f5);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x231)]=function(){const _0x5b7229=_0x317e8f;return this[_0x5b7229(0x619)]['target'];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x607)]=function(){const _0xc025b6=_0x317e8f;return this[_0xc025b6(0x619)]['type'];},Game_Event['prototype'][_0x317e8f(0x461)]=function(){const _0xe6afeb=_0x317e8f;if(this[_0xe6afeb(0x231)]()>=0x0){const _0x7c02a3=VisuMZ[_0xe6afeb(0x2bf)](this[_0xe6afeb(0x231)]());if(_0x7c02a3)return _0x7c02a3[_0xe6afeb(0x461)]();}return Game_Character[_0xe6afeb(0x32c)][_0xe6afeb(0x461)]['call'](this);},Game_Event['prototype'][_0x317e8f(0x392)]=function(){const _0x356875=_0x317e8f;this['_moveSynch'][_0x356875(0x1bc)]=this['_moveSynch']['timer']||0x0,this[_0x356875(0x619)]['timer']--;if(this[_0x356875(0x619)][_0x356875(0x1bc)]>0x0)return;this[_0x356875(0x619)][_0x356875(0x1bc)]=this[_0x356875(0x619)]['delay'],this[_0x356875(0x330)]();},Game_Event['prototype']['processMoveSynch']=function(){const _0x114d05=_0x317e8f;switch(this[_0x114d05(0x607)]()){case _0x114d05(0x570):this['processMoveSynchRandom']();break;case'approach':this[_0x114d05(0x250)]();break;case _0x114d05(0x42b):this[_0x114d05(0x5fb)]();break;case _0x114d05(0x1f9):this[_0x114d05(0x417)]();break;case'mimic':case _0x114d05(0x617):this[_0x114d05(0x4f0)]();break;case'reverse\x20mimic':case _0x114d05(0x3c9):this[_0x114d05(0x60a)]();break;case _0x114d05(0x23f):case _0x114d05(0x2f1):case'mirror\x20horz':case _0x114d05(0x1d1):this[_0x114d05(0x255)]();break;case _0x114d05(0x39e):case _0x114d05(0x33f):case'mirror\x20vert':case _0x114d05(0x3f1):this[_0x114d05(0x5c5)]();break;default:this[_0x114d05(0x2b2)]();break;}this[_0x114d05(0x358)]();},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x2b2)]=function(){const _0x543c7b=_0x317e8f,_0x3b587f=[0x2,0x4,0x6,0x8];$gameMap[_0x543c7b(0x334)]()&&_0x3b587f[_0x543c7b(0x556)](0x1,0x3,0x7,0x9);const _0x58c13f=[];for(const _0x15b03a of _0x3b587f){if(this[_0x543c7b(0x18c)](this['x'],this['y'],_0x15b03a))_0x58c13f[_0x543c7b(0x556)](_0x15b03a);}if(_0x58c13f[_0x543c7b(0x504)]>0x0){const _0x492b30=_0x58c13f[Math[_0x543c7b(0x2c6)](_0x58c13f[_0x543c7b(0x504)])];this[_0x543c7b(0x4de)](_0x492b30);}},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x250)]=function(){const _0x36e477=_0x317e8f,_0x30ee56=VisuMZ[_0x36e477(0x2bf)](this['moveSynchTarget']());this[_0x36e477(0x34c)](_0x30ee56);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5fb)]=function(){const _0xb63bc0=_0x317e8f,_0x143d3f=VisuMZ[_0xb63bc0(0x2bf)](this[_0xb63bc0(0x231)]());this[_0xb63bc0(0x38f)](_0x143d3f);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x417)]=function(){const _0x3e95f9=_0x317e8f;this[_0x3e95f9(0x324)]();},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x4f0)]=function(){const _0x4a1c69=_0x317e8f,_0x5107dd=VisuMZ[_0x4a1c69(0x2bf)](this[_0x4a1c69(0x231)]());this[_0x4a1c69(0x4de)](_0x5107dd[_0x4a1c69(0x2d9)]());},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x60a)]=function(){const _0xe1354=_0x317e8f,_0x3cc744=VisuMZ[_0xe1354(0x2bf)](this[_0xe1354(0x231)]()),_0x4ac20b=this['reverseDir'](_0x3cc744['lastMovedDirection']());this[_0xe1354(0x4de)](this[_0xe1354(0x478)](_0x3cc744[_0xe1354(0x212)]()));},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x255)]=function(){const _0x1aab21=_0x317e8f,_0x502b50=VisuMZ[_0x1aab21(0x2bf)](this[_0x1aab21(0x231)]()),_0x3b7f1d=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x502b50[_0x1aab21(0x2d9)]()];this['executeMoveDir8'](_0x3b7f1d);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5c5)]=function(){const _0x3779b4=_0x317e8f,_0x415ba8=VisuMZ[_0x3779b4(0x2bf)](this['moveSynchTarget']()),_0x4c5b81=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x415ba8[_0x3779b4(0x2d9)]()];this[_0x3779b4(0x4de)](_0x4c5b81);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x30e)]=function(){const _0x3ba951=_0x317e8f,_0x10eb14=$gameSystem['getSavedEventLocation'](this);if(!_0x10eb14)return;this[_0x3ba951(0x355)](_0x10eb14['x'],_0x10eb14['y']),this[_0x3ba951(0x40e)](_0x10eb14[_0x3ba951(0x212)]),this[_0x3ba951(0x18b)]===_0x10eb14[_0x3ba951(0x3e3)]&&(this[_0x3ba951(0x270)]=_0x10eb14['moveRouteIndex']);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x463)]=function(){const _0x576008=_0x317e8f;Game_Character['prototype'][_0x576008(0x463)]['call'](this),this[_0x576008(0x547)]();},Game_Event['prototype'][_0x317e8f(0x249)]=function(){const _0x209916=_0x317e8f;if($gameMap['isSaveEventLocations']())return!![];return this[_0x209916(0x1a3)];},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x547)]=function(){const _0x16fcfc=_0x317e8f;if(!this[_0x16fcfc(0x249)]())return;this['saveEventLocation']();},Game_Event[_0x317e8f(0x32c)]['saveEventLocation']=function(){$gameSystem['saveEventLocation'](this);},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x412)]=function(){const _0x393e45=_0x317e8f;$gameSystem[_0x393e45(0x539)](this);},Game_Event[_0x317e8f(0x32c)]['getEventIconData']=function(){const _0x5d69b3=_0x317e8f;return $gameSystem[_0x5d69b3(0x525)](this)?Game_Character[_0x5d69b3(0x32c)][_0x5d69b3(0x525)][_0x5d69b3(0x317)](this):{'iconIndex':0x0,'bufferX':settings['Icon'][_0x5d69b3(0x532)],'bufferY':settings[_0x5d69b3(0x42d)][_0x5d69b3(0x55e)],'blendMode':settings[_0x5d69b3(0x42d)]['BlendMode']};},Game_Event['prototype'][_0x317e8f(0x4ff)]=function(){const _0x97aae3=_0x317e8f;return this[_0x97aae3(0x508)];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x51b)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x5f4)],Game_Event[_0x317e8f(0x32c)]['meetsConditions']=function(_0x1128d5){const _0x3157fb=_0x317e8f,_0xa17365=VisuMZ[_0x3157fb(0x5ac)]['Game_Event_meetsConditionsCPC'][_0x3157fb(0x317)](this,_0x1128d5);if(!_0xa17365)return![];return this['meetsCPC'](_0x1128d5);},Game_Event[_0x317e8f(0x32c)]['meetsCPC']=function(_0x2cdeea){const _0x532a31=_0x317e8f;VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x532a31(0x465)](_0x2cdeea),this['_CPCs']=_0x2cdeea['CPC']['length']>0x0;if(_0x2cdeea[_0x532a31(0x604)]===undefined){if('itNXr'===_0x532a31(0x51c))VisuMZ[_0x532a31(0x5ac)]['CustomPageConditions'][_0x532a31(0x465)](_0x2cdeea);else return _0x3864db[_0x532a31(0x4b6)]&&_0x1c9b69[_0x532a31(0x57e)][_0x532a31(0x4fa)]('['+_0x428e6a+']');}if(_0x2cdeea[_0x532a31(0x604)][_0x532a31(0x504)]>0x0)return $gameMap['event'](this[_0x532a31(0x3d9)])&&VisuMZ[_0x532a31(0x5ac)][_0x532a31(0x5b6)][_0x532a31(0x22b)](_0x2cdeea[_0x532a31(0x604)],this['_eventId']);return!![];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x1f3)]=Game_Troop[_0x317e8f(0x32c)]['meetsConditions'],Game_Troop[_0x317e8f(0x32c)][_0x317e8f(0x5f4)]=function(_0x2cb990){const _0x3f2f8e=_0x317e8f;var _0x163e9c=VisuMZ[_0x3f2f8e(0x5ac)][_0x3f2f8e(0x1f3)][_0x3f2f8e(0x317)](this,_0x2cb990);return _0x163e9c&&this['CPCsMet'](_0x2cb990);},Game_Troop[_0x317e8f(0x32c)][_0x317e8f(0x399)]=function(_0x3e6d75){const _0x17b9f3=_0x317e8f;_0x3e6d75[_0x17b9f3(0x604)]===undefined&&(_0x17b9f3(0x443)!==_0x17b9f3(0x443)?this[_0x17b9f3(0x344)]=!![]:VisuMZ[_0x17b9f3(0x5ac)][_0x17b9f3(0x5b6)][_0x17b9f3(0x465)](_0x3e6d75));if(_0x3e6d75[_0x17b9f3(0x604)]['length']>0x0)return VisuMZ[_0x17b9f3(0x5ac)][_0x17b9f3(0x5b6)]['metCPC'](_0x3e6d75[_0x17b9f3(0x604)],0x0);return!![];},VisuMZ['EventsMoveCore']['Game_Event_locate']=Game_Event[_0x317e8f(0x32c)]['locate'],Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x355)]=function(_0x21b34a,_0x196771){const _0x63d647=_0x317e8f;VisuMZ['EventsMoveCore'][_0x63d647(0x4c2)][_0x63d647(0x317)](this,_0x21b34a,_0x196771),this[_0x63d647(0x4ea)]=_0x21b34a,this[_0x63d647(0x537)]=_0x196771;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x52e)]=Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x511)],Game_Event['prototype'][_0x317e8f(0x511)]=function(){const _0x5ea39c=_0x317e8f,_0x10ce11=$gameMap['distance'](this['x'],this['y'],this[_0x5ea39c(0x4ea)],this[_0x5ea39c(0x537)]),_0x3d5c9e=_0x10ce11*(this[_0x5ea39c(0x290)]||0x0);if(Math[_0x5ea39c(0x570)]()>=_0x3d5c9e){if(_0x5ea39c(0x3c2)==='IWIju'){const _0x5b2bb=_0x67a3e5[_0x5ea39c(0x5ac)][_0x5ea39c(0x519)][_0x5ea39c(0x317)](this),_0x11a000=_0x37c3b0[_0x5ea39c(0x5ac)][_0x5ea39c(0x5b6)]['_commonEvents'][_0x5ea39c(0x215)](_0xc63a6=>_0x51c6ab[_0xc63a6]);return _0x5b2bb[_0x5ea39c(0x445)](_0x11a000)[_0x5ea39c(0x365)]((_0xc8559d,_0x5ce385,_0x50c883)=>_0x50c883[_0x5ea39c(0x25b)](_0xc8559d)===_0x5ce385);}else VisuMZ[_0x5ea39c(0x5ac)][_0x5ea39c(0x52e)][_0x5ea39c(0x317)](this);}else this[_0x5ea39c(0x2c0)]();},Game_Event[_0x317e8f(0x32c)][_0x317e8f(0x2c0)]=function(){const _0x31e8b5=_0x317e8f,_0x1c0828=this[_0x31e8b5(0x2f9)](this[_0x31e8b5(0x4ea)]),_0x4ed41c=this[_0x31e8b5(0x5d8)](this[_0x31e8b5(0x537)]);if(Math[_0x31e8b5(0x35d)](_0x1c0828)>Math['abs'](_0x4ed41c))this['moveStraight'](_0x1c0828>0x0?0x4:0x6),!this[_0x31e8b5(0x357)]()&&_0x4ed41c!==0x0&&this[_0x31e8b5(0x52b)](_0x4ed41c>0x0?0x8:0x2);else{if(_0x4ed41c!==0x0){if('uDlIX'!==_0x31e8b5(0x20d))this['moveStraight'](_0x4ed41c>0x0?0x8:0x2),!this['isMovementSucceeded']()&&_0x1c0828!==0x0&&this[_0x31e8b5(0x52b)](_0x1c0828>0x0?0x4:0x6);else{if(_0x576e8a[_0x31e8b5(0x320)]())return;if(_0x9a34b7[_0x31e8b5(0x28e)]())return;let _0x3b625e=_0x1d21fd[_0x31e8b5(0x5ac)][_0x31e8b5(0x2c7)]['RegionTouch'];const _0x38437b='Region%1'['format'](this['regionId']());_0x3b625e[_0x38437b]&&_0x8181f9[_0x31e8b5(0x214)](_0x3b625e[_0x38437b]);}}}},VisuMZ['EventsMoveCore'][_0x317e8f(0x624)]=Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x1a6)],Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x1a6)]=function(){const _0x3a6623=_0x317e8f;if(this[_0x3a6623(0x1e6)]===_0x3a6623(0x590)){if(window[this[_0x3a6623(0x5ee)]]){if('JDhrY'!==_0x3a6623(0x409))return _0x1725ac[_0x3a6623(0x450)](this[_0x3a6623(0x3d9)])&&_0xa7e912[_0x3a6623(0x5ac)][_0x3a6623(0x5b6)][_0x3a6623(0x22b)](_0x44ef2e[_0x3a6623(0x604)],this[_0x3a6623(0x3d9)]);else this[_0x3a6623(0x1e6)]='',this['startCallEvent']();}else{if(_0x3a6623(0x516)===_0x3a6623(0x4fe)){_0x592254[_0x3a6623(0x5ac)][_0x3a6623(0x5b6)][_0x3a6623(0x465)](_0xd2adc0),this['_CPCs']=_0x2a40c8[_0x3a6623(0x604)][_0x3a6623(0x504)]>0x0;_0x2240b2[_0x3a6623(0x604)]===_0x32d79c&&_0xbe22ad[_0x3a6623(0x5ac)][_0x3a6623(0x5b6)][_0x3a6623(0x465)](_0x576d77);if(_0x42bbd6[_0x3a6623(0x604)]['length']>0x0)return _0xc8fd3c[_0x3a6623(0x450)](this['_eventId'])&&_0x211b89[_0x3a6623(0x5ac)][_0x3a6623(0x5b6)][_0x3a6623(0x22b)](_0x20fb50['CPC'],this[_0x3a6623(0x3d9)]);return!![];}else return!![];}}else return VisuMZ[_0x3a6623(0x5ac)]['Game_Interpreter_updateWaitMode'][_0x3a6623(0x317)](this);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x476)]=Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x29f)],Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x29f)]=function(){const _0x4726d9=_0x317e8f,_0x4c4df1=$gameMap&&this[_0x4726d9(0x3d9)]?$gameMap[_0x4726d9(0x450)](this[_0x4726d9(0x3d9)]):null;$gameTemp[_0x4726d9(0x264)](_0x4c4df1);const _0x3008d0=VisuMZ[_0x4726d9(0x5ac)]['Game_Interpreter_executeCommand'][_0x4726d9(0x317)](this);return $gameTemp[_0x4726d9(0x2cd)](),_0x3008d0;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x562)]=Game_Interpreter[_0x317e8f(0x32c)]['command357'],Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x59e)]=function(_0x406518){const _0x266c20=_0x317e8f;return $gameTemp[_0x266c20(0x597)](this),VisuMZ[_0x266c20(0x5ac)][_0x266c20(0x562)][_0x266c20(0x317)](this,_0x406518);},Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x439)]=function(_0x490e4b){const _0x5ec774=_0x317e8f;this[_0x5ec774(0x1b1)]=_0x490e4b;const _0x49ff26=_0x5ec774(0x299)[_0x5ec774(0x49f)](_0x490e4b[_0x5ec774(0x4f2)][_0x5ec774(0x5e2)](0x3));this[_0x5ec774(0x5ee)]=_0x5ec774(0x472)+Graphics[_0x5ec774(0x553)]+'_'+this['eventId'](),DataManager[_0x5ec774(0x1cf)](this[_0x5ec774(0x5ee)],_0x49ff26),window[this[_0x5ec774(0x5ee)]]?this[_0x5ec774(0x602)]():this['setWaitMode'](_0x5ec774(0x590));},Game_Interpreter[_0x317e8f(0x32c)][_0x317e8f(0x602)]=function(){const _0x2b9a4d=_0x317e8f,_0x559993=this['_callEventData'],_0x2dce97=window[this[_0x2b9a4d(0x5ee)]],_0x343cc5=_0x2dce97[_0x2b9a4d(0x45d)][_0x559993[_0x2b9a4d(0x23b)]];if(_0x343cc5&&_0x343cc5['pages'][_0x559993[_0x2b9a4d(0x1eb)]-0x1]){const _0x7cab75=_0x343cc5[_0x2b9a4d(0x456)][_0x559993['pageId']-0x1][_0x2b9a4d(0x429)];this[_0x2b9a4d(0x244)](_0x7cab75,this[_0x2b9a4d(0x23b)]());}window[this[_0x2b9a4d(0x5ee)]]=undefined,this[_0x2b9a4d(0x5ee)]=undefined,this[_0x2b9a4d(0x1b1)]=undefined;};function _0x3459(_0x29bf3a,_0x2de70c){const _0x562ed5=_0x562e();return _0x3459=function(_0x345940,_0x45a853){_0x345940=_0x345940-0x189;let _0x383127=_0x562ed5[_0x345940];return _0x383127;},_0x3459(_0x29bf3a,_0x2de70c);}function Game_CPCInterpreter(){const _0x39bfda=_0x317e8f;this[_0x39bfda(0x636)][_0x39bfda(0x434)](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x317e8f(0x3fd)](Game_Interpreter[_0x317e8f(0x32c)]),Game_CPCInterpreter['prototype'][_0x317e8f(0x312)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x317e8f(0x32c)]['clear']=function(){const _0x91af64=_0x317e8f;Game_Interpreter[_0x91af64(0x32c)]['clear'][_0x91af64(0x317)](this),this[_0x91af64(0x331)]=![];},Game_CPCInterpreter[_0x317e8f(0x32c)][_0x317e8f(0x4d2)]=function(){const _0x5549c0=_0x317e8f;while(this[_0x5549c0(0x24b)]()){if(_0x5549c0(0x287)!=='myVCZ'){let _0x393cac=[0x0,0x0,_0x5549c0(0x1d3)['format'](_0xb33c9,_0x137bad)];return _0x5d84e4['value'](_0x393cac);}else this[_0x5549c0(0x29f)]();}},Game_CPCInterpreter['prototype'][_0x317e8f(0x631)]=function(_0x2bbcda){const _0x48717d=_0x317e8f;return Game_Interpreter[_0x48717d(0x32c)]['command108'][_0x48717d(0x317)](this,_0x2bbcda),this['_comments']['some'](_0x4f01a3=>_0x4f01a3[_0x48717d(0x5bf)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];},VisuMZ['EventsMoveCore'][_0x317e8f(0x605)]=Scene_Map[_0x317e8f(0x32c)][_0x317e8f(0x2d6)],Scene_Map[_0x317e8f(0x32c)][_0x317e8f(0x2d6)]=function(){const _0x321b32=_0x317e8f;VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect'][_0x321b32(0x317)](this),this[_0x321b32(0x51f)][_0x321b32(0x260)]();},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x363)]=Scene_Load[_0x317e8f(0x32c)][_0x317e8f(0x26a)],Scene_Load['prototype'][_0x317e8f(0x26a)]=function(){const _0x4634dd=_0x317e8f;if($gameMap)$gameMap[_0x4634dd(0x60b)]();VisuMZ[_0x4634dd(0x5ac)][_0x4634dd(0x363)]['call'](this);},VisuMZ['EventsMoveCore'][_0x317e8f(0x32f)]=Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x271)],Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x271)]=function(){const _0x4700f1=_0x317e8f;VisuMZ[_0x4700f1(0x5ac)][_0x4700f1(0x32f)][_0x4700f1(0x317)](this),this[_0x4700f1(0x4e2)](),this[_0x4700f1(0x4d5)]();},Sprite_Character[_0x317e8f(0x32c)]['initMembersEventsMoveCore']=function(){const _0x5acf4e=_0x317e8f;this[_0x5acf4e(0x1f2)]=0xff;},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x4d5)]=function(){const _0x4f6430=_0x317e8f;this[_0x4f6430(0x4d6)]=new Sprite(),this[_0x4f6430(0x4d6)][_0x4f6430(0x1fe)]=ImageManager['loadSystem'](_0x4f6430(0x361)),this[_0x4f6430(0x4d6)][_0x4f6430(0x1fe)][_0x4f6430(0x251)]=![],this['_eventIconSprite'][_0x4f6430(0x369)](0x0,0x0,0x0,0x0),this[_0x4f6430(0x4d6)][_0x4f6430(0x506)]['x']=0.5,this[_0x4f6430(0x4d6)][_0x4f6430(0x506)]['y']=0x1,this[_0x4f6430(0x1ca)](this[_0x4f6430(0x4d6)]);},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x50b)]=function(){const _0x5eb3c0=_0x317e8f;return this['_characterName']&&this[_0x5eb3c0(0x44c)][_0x5eb3c0(0x5bf)](/\[VS8\]/i);},Sprite_Character[_0x317e8f(0x32c)]['isAutoBufferIcon']=function(){const _0x42c6a3=_0x317e8f;return this[_0x42c6a3(0x50b)]()&&VisuMZ[_0x42c6a3(0x5ac)]['Settings'][_0x42c6a3(0x36c)][_0x42c6a3(0x38d)];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5f6)]=Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x358)],Sprite_Character[_0x317e8f(0x32c)]['update']=function(){const _0x44e816=_0x317e8f;VisuMZ['EventsMoveCore'][_0x44e816(0x5f6)][_0x44e816(0x317)](this);VisuMZ[_0x44e816(0x5ac)]['Settings'][_0x44e816(0x50c)]['EnableDashTilt']&&this['updateTilt']();if(this['_shadowSprite']){if(_0x44e816(0x359)===_0x44e816(0x346)){if(this[_0x44e816(0x37e)]===_0xacd63d)this[_0x44e816(0x502)]();const _0x3c838d=_0x44e816(0x4a1)[_0x44e816(0x49f)](_0x36544d,_0x29186a);delete this[_0x44e816(0x37e)][_0x3c838d];}else this[_0x44e816(0x2e4)]();}this[_0x44e816(0x4d6)]&&this[_0x44e816(0x18a)]();},VisuMZ['EventsMoveCore'][_0x317e8f(0x42f)]=Sprite_Character['prototype'][_0x317e8f(0x458)],Sprite_Character['prototype'][_0x317e8f(0x458)]=function(){const _0x235025=_0x317e8f;VisuMZ[_0x235025(0x5ac)]['Sprite_Character_setTileBitmap'][_0x235025(0x317)](this),this[_0x235025(0x1fe)][_0x235025(0x462)](this['updateBitmapSmoothing'][_0x235025(0x510)](this));},VisuMZ[_0x317e8f(0x5ac)]['Sprite_Character_setCharacterBitmap']=Sprite_Character['prototype'][_0x317e8f(0x377)],Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x377)]=function(){const _0x4b1985=_0x317e8f;VisuMZ[_0x4b1985(0x5ac)]['Sprite_Character_setCharacterBitmap'][_0x4b1985(0x317)](this),this['bitmap'][_0x4b1985(0x462)](this[_0x4b1985(0x565)][_0x4b1985(0x510)](this));},Sprite_Character['prototype']['updateBitmapSmoothing']=function(){const _0x12e960=_0x317e8f;if(!this['bitmap'])return;this[_0x12e960(0x1fe)]['smooth']=!!VisuMZ['EventsMoveCore']['Settings'][_0x12e960(0x50c)][_0x12e960(0x2a9)];},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x60d)]=Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x263)],Sprite_Character[_0x317e8f(0x32c)]['characterPatternY']=function(){const _0x4a6105=_0x317e8f;return this['isSpriteVS8dir']()?this[_0x4a6105(0x227)]():VisuMZ[_0x4a6105(0x5ac)][_0x4a6105(0x60d)][_0x4a6105(0x317)](this);},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x227)]=function(){const _0x442528=_0x317e8f,_0x48df70=this[_0x442528(0x5d3)][_0x442528(0x212)](),_0x12e955=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x12e955[_0x48df70]-0x2)/0x2;},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x610)]=function(){const _0x52a8c7=_0x317e8f;this[_0x52a8c7(0x232)]=0x0;if(this[_0x52a8c7(0x548)]()){const _0x3417ea=VisuMZ[_0x52a8c7(0x5ac)][_0x52a8c7(0x2c7)][_0x52a8c7(0x50c)],_0x248a3d=this[_0x52a8c7(0x5d3)][_0x52a8c7(0x212)]();let _0x30b44b=0x0;if([0x1,0x4,0x7][_0x52a8c7(0x4fa)](_0x248a3d))_0x30b44b=_0x3417ea[_0x52a8c7(0x58a)];if([0x3,0x6,0x9][_0x52a8c7(0x4fa)](_0x248a3d))_0x30b44b=_0x3417ea[_0x52a8c7(0x5e1)];[0x2,0x8][_0x52a8c7(0x4fa)](_0x248a3d)&&(_0x30b44b=[-_0x3417ea[_0x52a8c7(0x583)],0x0,_0x3417ea['TiltVert']][this['_character'][_0x52a8c7(0x3e7)]()]);if(this['_reflection'])_0x30b44b*=-0x1;this[_0x52a8c7(0x232)]=_0x30b44b;}},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x548)]=function(){const _0x2e3857=_0x317e8f;if(this[_0x2e3857(0x5de)])return![];return this[_0x2e3857(0x5d3)][_0x2e3857(0x352)]()&&!this[_0x2e3857(0x5d3)][_0x2e3857(0x2df)]()&&!this['_character'][_0x2e3857(0x522)]()&&this[_0x2e3857(0x3aa)]()===0x0;},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x2e4)]=function(){const _0x143c44=_0x317e8f;this['_shadowSprite']['x']=this[_0x143c44(0x5d3)][_0x143c44(0x575)](),this['_shadowSprite']['y']=this['_character'][_0x143c44(0x529)](),this[_0x143c44(0x1b8)][_0x143c44(0x594)]=this[_0x143c44(0x594)],this['_shadowSprite'][_0x143c44(0x47f)]=this['_character'][_0x143c44(0x31a)](),this['_shadowSprite'][_0x143c44(0x61a)]=this[_0x143c44(0x61a)];if(!this[_0x143c44(0x5d3)]['isShadowShrink']()){if(_0x143c44(0x2e1)!=='yYzgC'){_0x328f93[_0x143c44(0x264)](this);const _0xb76e0f=_0x15918d[_0x143c44(0x5ac)][_0x143c44(0x591)][_0x143c44(0x317)](this,_0xa877c5);return _0x5de637[_0x143c44(0x2cd)](),_0xb76e0f;}else this[_0x143c44(0x1b8)][_0x143c44(0x5d9)]['x']=Math['min'](0x1,this[_0x143c44(0x1b8)]['scale']['x']+0.1),this[_0x143c44(0x1b8)]['scale']['y']=Math[_0x143c44(0x403)](0x1,this[_0x143c44(0x1b8)][_0x143c44(0x5d9)]['y']+0.1);}else _0x143c44(0x342)!==_0x143c44(0x3dd)?(this[_0x143c44(0x1b8)][_0x143c44(0x5d9)]['x']=Math[_0x143c44(0x219)](0x0,this['_shadowSprite'][_0x143c44(0x5d9)]['x']-0.1),this[_0x143c44(0x1b8)][_0x143c44(0x5d9)]['y']=Math['max'](0x0,this[_0x143c44(0x1b8)][_0x143c44(0x5d9)]['y']-0.1)):(_0x567abe[_0x143c44(0x57a)](_0x140805,_0x5420a9),_0x47ef85['despawnTerrainTags'](_0x24f9c6[_0x143c44(0x593)]));},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x18a)]=function(){const _0x3c0a7d=_0x317e8f,_0x27301a=this[_0x3c0a7d(0x4d6)],_0x45685f=this[_0x3c0a7d(0x3aa)]();if(_0x45685f<=0x0)return _0x27301a[_0x3c0a7d(0x369)](0x0,0x0,0x0,0x0);else{const _0x45117f=ImageManager[_0x3c0a7d(0x370)],_0x42b5dc=ImageManager[_0x3c0a7d(0x1aa)],_0x2aa916=_0x45685f%0x10*_0x45117f,_0x258108=Math[_0x3c0a7d(0x534)](_0x45685f/0x10)*_0x42b5dc;_0x27301a[_0x3c0a7d(0x369)](_0x2aa916,_0x258108,_0x45117f,_0x42b5dc),this[_0x3c0a7d(0x47f)]=!![];}const _0x4b5105=this[_0x3c0a7d(0x5d3)][_0x3c0a7d(0x525)]();if(this[_0x3c0a7d(0x1e9)]()){if(_0x3c0a7d(0x1c4)!==_0x3c0a7d(0x1c4)){if([0x2,0x4,0x6,0x8][_0x3c0a7d(0x4fa)](_0x384a43))return 0x0;if([0x1,0x3,0x7,0x9][_0x3c0a7d(0x4fa)](_0x2e0c0a))return 0x1;}else this['autoEventIconBuffer'](_0x27301a);}else{if('PfQPu'===_0x3c0a7d(0x2f3)){const _0x13601c=_0x261f34[_0x3c0a7d(0x206)]()||this;if(_0x13601c[_0x3c0a7d(0x312)]!==_0x1306e1)_0x5ab026[_0x3c0a7d(0x5ac)][_0x3c0a7d(0x4ae)][_0x3c0a7d(0x317)](this,_0x5034d6,_0x4d3650);else{const _0x48289c=[_0x13601c[_0x3c0a7d(0x382)],_0x13601c['_eventId'],_0x3c0a7d(0x408)[_0x3c0a7d(0x49f)](_0x4b74fd)];_0x1ffd0a[_0x3c0a7d(0x51e)](_0x48289c,_0x263bc5);}}else _0x27301a['x']=_0x4b5105?_0x4b5105[_0x3c0a7d(0x44f)]:0x0,_0x27301a['y']=_0x4b5105?-this[_0x3c0a7d(0x4ba)]+_0x4b5105[_0x3c0a7d(0x4ed)]:0x0;}_0x27301a[_0x3c0a7d(0x274)]=_0x4b5105?_0x4b5105[_0x3c0a7d(0x274)]:0x0,this[_0x3c0a7d(0x36d)](_0x27301a),this[_0x3c0a7d(0x1ca)](_0x27301a),_0x27301a[_0x3c0a7d(0x232)]=-this[_0x3c0a7d(0x232)];},Sprite_Character[_0x317e8f(0x32c)][_0x317e8f(0x633)]=function(_0x58164f){const _0x6bf2a5=_0x317e8f;_0x58164f['x']=0x0,_0x58164f['y']=-this[_0x6bf2a5(0x4ba)]+this[_0x6bf2a5(0x4ba)]*0x2/0x5;if(this[_0x6bf2a5(0x5d3)][_0x6bf2a5(0x3e7)]()!==0x1){if('xCnap'===_0x6bf2a5(0x4f7))_0x58164f['y']+=0x1;else return this['processMoveRouteTeleportToCharacter'](_0x98d737);}},Sprite_Character[_0x317e8f(0x32c)]['getEventIconIndex']=function(){const _0x5889b8=_0x317e8f;if(!this[_0x5889b8(0x5d3)])return 0x0;if(this[_0x5889b8(0x5d3)][_0x5889b8(0x269)])return 0x0;const _0x32c7bb=this[_0x5889b8(0x5d3)]['getEventIconData']();return _0x32c7bb?_0x32c7bb['iconIndex']||0x0:0x0;},VisuMZ['EventsMoveCore'][_0x317e8f(0x2be)]=Sprite_Balloon[_0x317e8f(0x32c)]['setup'],Sprite_Balloon[_0x317e8f(0x32c)][_0x317e8f(0x5fa)]=function(_0x49fe34,_0x39f329){const _0x38864e=_0x317e8f;VisuMZ[_0x38864e(0x5ac)]['Sprite_Balloon_setup'][_0x38864e(0x317)](this,_0x49fe34,_0x39f329),VisuMZ['EventsMoveCore']['Settings']['VS8'][_0x38864e(0x45c)]&&this['_target']['_character'][_0x38864e(0x286)](_0x39f329,this[_0x38864e(0x22c)]);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x58c)]=Sprite_Balloon[_0x317e8f(0x32c)][_0x317e8f(0x24c)],Sprite_Balloon[_0x317e8f(0x32c)][_0x317e8f(0x24c)]=function(){const _0x294901=_0x317e8f;VisuMZ['EventsMoveCore'][_0x294901(0x58c)][_0x294901(0x317)](this),this[_0x294901(0x5dc)]();},Sprite_Balloon[_0x317e8f(0x32c)][_0x317e8f(0x5dc)]=function(){const _0x41edef=_0x317e8f;this[_0x41edef(0x5ab)][_0x41edef(0x5d3)][_0x41edef(0x50b)]()&&(this['x']+=VisuMZ['EventsMoveCore'][_0x41edef(0x2c7)][_0x41edef(0x36c)]['BalloonOffsetX'],this['y']+=VisuMZ['EventsMoveCore']['Settings'][_0x41edef(0x36c)][_0x41edef(0x4ec)]);},Sprite_Timer[_0x317e8f(0x32c)][_0x317e8f(0x50e)]=function(){const _0x309a3d=_0x317e8f;this[_0x309a3d(0x1fe)]=new Bitmap(Math[_0x309a3d(0x33d)](Graphics[_0x309a3d(0x5b3)]/0x2),0x30),this[_0x309a3d(0x1fe)][_0x309a3d(0x36a)]=this[_0x309a3d(0x36a)](),this['bitmap']['fontSize']=this[_0x309a3d(0x50f)](),this[_0x309a3d(0x1fe)][_0x309a3d(0x218)]=ColorManager[_0x309a3d(0x218)]();},Sprite_Timer[_0x317e8f(0x32c)][_0x317e8f(0x62a)]=function(){const _0x4bd476=_0x317e8f,_0x27c59a=Math[_0x4bd476(0x534)](this[_0x4bd476(0x400)]/0x3c/0x3c),_0x2439c3=Math[_0x4bd476(0x534)](this[_0x4bd476(0x400)]/0x3c)%0x3c,_0x102e99=this[_0x4bd476(0x400)]%0x3c;let _0x367f2b=_0x2439c3['padZero'](0x2)+':'+_0x102e99[_0x4bd476(0x5e2)](0x2);if(_0x27c59a>0x0)_0x367f2b='%1:%2'[_0x4bd476(0x49f)](_0x27c59a,_0x367f2b);return _0x367f2b;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x325)]=Spriteset_Map[_0x317e8f(0x32c)][_0x317e8f(0x464)],Spriteset_Map[_0x317e8f(0x32c)][_0x317e8f(0x464)]=function(){const _0x4b6e17=_0x317e8f;VisuMZ['EventsMoveCore'][_0x4b6e17(0x325)][_0x4b6e17(0x317)](this),this[_0x4b6e17(0x1d5)]();},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x567)]=Spriteset_Map[_0x317e8f(0x32c)][_0x317e8f(0x60f)],Spriteset_Map['prototype'][_0x317e8f(0x60f)]=function(){const _0x5d859c=_0x317e8f;VisuMZ['EventsMoveCore'][_0x5d859c(0x567)][_0x5d859c(0x317)](this),this[_0x5d859c(0x531)]();},Spriteset_Map[_0x317e8f(0x32c)]['createShadows']=function(){const _0x24034=_0x317e8f;if(!VisuMZ['EventsMoveCore'][_0x24034(0x2c7)][_0x24034(0x50c)][_0x24034(0x41b)])return;for(const _0x82121b of this['_characterSprites']){if(_0x24034(0x4a6)!==_0x24034(0x198))this[_0x24034(0x53c)](_0x82121b);else{if(_0x14def7[_0x24034(0x320)]())return;if(_0x59c90f['isAnyEventStarting']())return;let _0x3b7ba8=_0x559084[_0x24034(0x5ac)][_0x24034(0x2c7)][_0x24034(0x53f)],_0xae933c=_0x4ffc65[_0x24034(0x30c)](_0x3025b1,_0x30b1c3);const _0x486f39='Region%1'['format'](_0xae933c);_0x3b7ba8[_0x486f39]&&_0x5d1d32[_0x24034(0x214)](_0x3b7ba8[_0x486f39]);}}},Spriteset_Map['prototype'][_0x317e8f(0x53c)]=function(_0x83cb3a){const _0x32cc7d=_0x317e8f;_0x83cb3a[_0x32cc7d(0x1b8)]=new Sprite(),_0x83cb3a['_shadowSprite'][_0x32cc7d(0x3e5)]=_0x83cb3a[_0x32cc7d(0x5d3)][_0x32cc7d(0x353)](),_0x83cb3a[_0x32cc7d(0x1b8)][_0x32cc7d(0x1fe)]=ImageManager['loadSystem'](_0x83cb3a['_shadowSprite']['_filename']),_0x83cb3a[_0x32cc7d(0x1b8)][_0x32cc7d(0x506)]['x']=0.5,_0x83cb3a[_0x32cc7d(0x1b8)]['anchor']['y']=0x1,_0x83cb3a[_0x32cc7d(0x1b8)]['z']=0x0,this['_tilemap'][_0x32cc7d(0x1ca)](_0x83cb3a[_0x32cc7d(0x1b8)]);},Spriteset_Map[_0x317e8f(0x32c)][_0x317e8f(0x260)]=function(){const _0x430f0f=_0x317e8f;if(!VisuMZ[_0x430f0f(0x5ac)][_0x430f0f(0x2c7)][_0x430f0f(0x50c)][_0x430f0f(0x41b)])return;for(const _0x512c89 of this[_0x430f0f(0x48e)]){if(_0x430f0f(0x4a0)==='AdHxf'){_0x1389b2[_0x430f0f(0x5ac)][_0x430f0f(0x1e5)][_0x430f0f(0x317)](this,_0x1ec407);if(this[_0x430f0f(0x203)]()){this[_0x430f0f(0x2e5)](_0x361d45);if(_0x4bdd53[_0x430f0f(0x4fa)](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x430f0f(0x3ff))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x51dc8e['includes'](0x1)||_0x1f76a9[_0x430f0f(0x4fa)](0x2))&&this[_0x430f0f(0x3eb)]();}}else this['_tilemap']['removeChild'](_0x512c89[_0x430f0f(0x1b8)]);}},Spriteset_Map['prototype'][_0x317e8f(0x1d5)]=function(){const _0x23e6e6=_0x317e8f;this[_0x23e6e6(0x276)]=[];for(const _0x285bbb of $gameMap[_0x23e6e6(0x45d)]()){if(_0x23e6e6(0x3ac)===_0x23e6e6(0x3ac))this['createLabelWindowForTarget'](_0x285bbb);else{const _0x4863a4=_0x16ba60(_0x2195f2['$1'])[_0x23e6e6(0x639)]()[_0x23e6e6(0x2bc)]();_0x9b2af7=_0x24f52e[_0x23e6e6(0x367)][_0x4863a4];if(!_0x2bd24c)return;_0xd28ca7=_0x82bead[_0x23e6e6(0x3b9)],_0x28e315=_0x4586b3[_0x23e6e6(0x544)];}}},Spriteset_Map['prototype'][_0x317e8f(0x3d1)]=function(_0x29731e){const _0x5c1f91=_0x317e8f;if(!this[_0x5c1f91(0x62f)](_0x29731e))return;const _0x5e50d3=new Window_EventLabel(_0x29731e);_0x5e50d3['z']=0x8,_0x5e50d3[_0x5c1f91(0x398)]=Sprite[_0x5c1f91(0x56b)]++,this[_0x5c1f91(0x3e4)]['addChild'](_0x5e50d3),this['_labelWindows'][_0x5c1f91(0x556)](_0x5e50d3);},Spriteset_Map['prototype'][_0x317e8f(0x62f)]=function(_0x4b0a98){const _0x3f0b8d=_0x317e8f,_0x146085=_0x4b0a98[_0x3f0b8d(0x450)]();if(_0x146085[_0x3f0b8d(0x4b5)][_0x3f0b8d(0x5bf)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x146085[_0x3f0b8d(0x4b5)][_0x3f0b8d(0x5bf)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x387974 of _0x146085[_0x3f0b8d(0x456)]){let _0x14dfc0='';for(const _0x54418d of _0x387974[_0x3f0b8d(0x429)]){if([0x6c,0x198][_0x3f0b8d(0x4fa)](_0x54418d['code'])){if(_0x3f0b8d(0x194)===_0x3f0b8d(0x194))_0x14dfc0+=_0x54418d[_0x3f0b8d(0x2c2)][0x0];else return this[_0x3f0b8d(0x632)](_0x3f0b8d(0x53a));}}if(_0x14dfc0[_0x3f0b8d(0x5bf)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x14dfc0['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x317e8f(0x32c)][_0x317e8f(0x36f)]=function(_0x2cde33){const _0x4872ce=_0x317e8f;this['_characterSprites']=this[_0x4872ce(0x48e)]||[];const _0x59ba88=new Sprite_Character(_0x2cde33);this[_0x4872ce(0x48e)][_0x4872ce(0x556)](_0x59ba88),this['_tilemap'][_0x4872ce(0x1ca)](_0x59ba88),this[_0x4872ce(0x53c)](_0x59ba88),this[_0x4872ce(0x3d1)](_0x2cde33),_0x59ba88[_0x4872ce(0x358)]();},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x5e8)]=Game_Message[_0x317e8f(0x32c)]['setNumberInput'],Game_Message[_0x317e8f(0x32c)][_0x317e8f(0x2f4)]=function(_0x4ae20b,_0x419b46){const _0x51ab7b=_0x317e8f;this['_selfTargetNumberInput']=$gameTemp[_0x51ab7b(0x206)](),VisuMZ[_0x51ab7b(0x5ac)][_0x51ab7b(0x5e8)][_0x51ab7b(0x317)](this,_0x4ae20b,_0x419b46);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x468)]=Window_NumberInput[_0x317e8f(0x32c)][_0x317e8f(0x3a5)],Window_NumberInput[_0x317e8f(0x32c)]['start']=function(){const _0x35df47=_0x317e8f;$gameTemp[_0x35df47(0x264)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x35df47(0x5ac)]['Window_NumberInput_start']['call'](this),$gameTemp[_0x35df47(0x2cd)]();},VisuMZ['EventsMoveCore']['Window_NumberInput_processOk']=Window_NumberInput[_0x317e8f(0x32c)][_0x317e8f(0x615)],Window_NumberInput[_0x317e8f(0x32c)][_0x317e8f(0x615)]=function(){const _0x48d51b=_0x317e8f;$gameTemp[_0x48d51b(0x264)]($gameMessage[_0x48d51b(0x52a)]),VisuMZ[_0x48d51b(0x5ac)][_0x48d51b(0x27e)][_0x48d51b(0x317)](this),$gameTemp[_0x48d51b(0x2cd)](),$gameMessage[_0x48d51b(0x52a)]=undefined;},VisuMZ[_0x317e8f(0x5ac)]['Game_Message_setItemChoice']=Game_Message[_0x317e8f(0x32c)]['setItemChoice'],Game_Message['prototype']['setItemChoice']=function(_0x3a3ff3,_0x57475f){const _0x288265=_0x317e8f;this[_0x288265(0x46b)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x288265(0x5ac)][_0x288265(0x4ab)]['call'](this,_0x3a3ff3,_0x57475f);},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x257)]=Window_EventItem[_0x317e8f(0x32c)][_0x317e8f(0x498)],Window_EventItem['prototype'][_0x317e8f(0x498)]=function(){const _0x3ebd25=_0x317e8f;$gameTemp['registerSelfTarget']($gameMessage[_0x3ebd25(0x46b)]),VisuMZ['EventsMoveCore'][_0x3ebd25(0x257)][_0x3ebd25(0x317)](this),$gameTemp[_0x3ebd25(0x2cd)](),$gameMessage[_0x3ebd25(0x46b)]=undefined;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x296)]=Window_EventItem[_0x317e8f(0x32c)][_0x317e8f(0x23c)],Window_EventItem[_0x317e8f(0x32c)][_0x317e8f(0x23c)]=function(){const _0x1a43f4=_0x317e8f;$gameTemp['registerSelfTarget']($gameMessage[_0x1a43f4(0x46b)]),VisuMZ['EventsMoveCore'][_0x1a43f4(0x296)][_0x1a43f4(0x317)](this),$gameTemp[_0x1a43f4(0x2cd)](),$gameMessage[_0x1a43f4(0x46b)]=undefined;},VisuMZ[_0x317e8f(0x5ac)][_0x317e8f(0x427)]=Window_Message[_0x317e8f(0x32c)]['startMessage'],Window_Message[_0x317e8f(0x32c)][_0x317e8f(0x4e7)]=function(){const _0x1d0e05=_0x317e8f;$gameMessage[_0x1d0e05(0x210)](),VisuMZ[_0x1d0e05(0x5ac)][_0x1d0e05(0x427)][_0x1d0e05(0x317)](this),$gameTemp[_0x1d0e05(0x2cd)]();},VisuMZ['EventsMoveCore'][_0x317e8f(0x2ab)]=Window_ScrollText[_0x317e8f(0x32c)][_0x317e8f(0x4e7)],Window_ScrollText[_0x317e8f(0x32c)]['startMessage']=function(){const _0x22307c=_0x317e8f;$gameMessage[_0x22307c(0x210)](),VisuMZ[_0x22307c(0x5ac)][_0x22307c(0x2ab)][_0x22307c(0x317)](this),$gameTemp['clearSelfTarget']();};function _0x562e(){const _0x34b319=['boxWidth','isAdvancedSwitch','slice','CustomPageConditions','front','kGanW','useCarryPoseForIcons','_moveOnlyRegions','setEventIconData','SLEEP','clearPageSettings','TqNro','match','getLastPluginCommandInterpreter','width','Scene_Boot_onDatabaseLoaded','SpawnEventAtXY','isCollidedWithPlayerCharacters','processMoveSynchMirrorVert','ARRAYFUNC','_eventPageIndex','_periodicRefreshTimer','morphIntoTemplate','LIGHT\x20BULB','Direction','Game_Variables_setValue','setPlayerControlDisable','Game_Switches_value','isSpawnedEvent','_interpreter','getPosingCharacterDirection','Game_Event_refresh','_character','UpgnQ','processMoveRouteMoveRepeat','iXdgS','isInVehicle','deltaYFrom','scale','Game_Follower_chaseCharacter','Game_CharacterBase_direction','updateVS8BalloonOffsets','isCollidedWithEvents','_dragonbones','isEventOverloaded','Value','TiltRight','padZero','eventsXyNt','isTurnInPlace','amBVo','_spriteOffsetX','_lastMovedDirection','Game_Message_setNumberInput','juRYP','_eventScreenX','DashModifier','deleteSavedEventLocationKey','destinationY','_callEventMap','getPreservedMorphEventData','hasStepAnime','EventAutoMovement','EventTimerSpeed','kHAbi','meetsConditions','mtmao','Sprite_Character_update','Game_CharacterBase_pattern','StopAutoMoveEvents','kJpGs','setup','processMoveSynchAway','Game_CharacterBase_characterIndex','TargetVariableId','Region','fGoTX','PlayerMovementChange','TTsiG','startCallEvent','_eventCopyData','CPC','Scene_Map_startEncounterEffect','_followerControlID','moveSynchType','DQxdM','despawnTerrainTags','processMoveSynchReverseMimic','clearEventCache','_eventLabelOffsetY','Sprite_Character_characterPatternY','Game_SelfSwitches_value','createShadow','updateTilt','Enable','Izfxb','FALSE','Dock','processOk','JXltu','copy','processMoveRouteJumpToCharacter','_moveSynch','_hidden','8680527oLZOsc','_addedHitbox','hojOA','isBattleTest','backX','FollowerSetControl','name','11008SAeuOn','Name','Game_Interpreter_updateWaitMode','SWEAT','removeMorph','hyStH','code','roundYWithDirection','timerText','kTwQq','setDestination','processMoveRouteStepFrom','PageId','isTargetEventValidForLabelWindow','RIGHT','command108','processMoveRouteHugWall','autoEventIconBuffer','zsSQR','EventAllow','initialize','eDJbF','olbIU','toUpperCase','_needsPeriodicRefresh','parse','LIGHT-BULB','10724058qjusbF','OFF','contentsOpacity','Operation','ARRAYJSON','EventLocationSave','eeiZI','hasDragonbones','bRgLS','Game_Player_isDashing','setupSaveEventLocations','Game_SelfSwitches_setValue','add','processMoveRouteBalloon','type','MgjJc','updateEventIconSprite','_pageIndex','canPass','pVHRv','Ahzrc','FavorHorz','PreloadedMaps','BlJOv','Game_Map_isDashDisabled','uEvsD','XPqGo','rXKVb','Game_CharacterBase_realMoveSpeed','_visiblePlayerY','aaWLO','mapValue','setupEvents','DashEnableToggle','exit','column','Event','Game_CharacterBase_screenX','PlayerAllow','checkEventTriggerThere','of\x20Preloaded\x20Maps.\x0a\x0a','_saveEventLocation','dxWgT','isTriggerIn','updateWaitMode','setupSpawnTest','isAllowEventAutoMovement','resetFontSettings','iconHeight','EventLocationDelete','narHg','_data','_spawnPreserved','RZpCU','MapId','_callEventData','isRegionAllowPass','PosY','backY','setMovementSuccess','jnyAC','visibleRange','_shadowSprite','checkEventTriggerHere','LOWER\x20LEFT','updatePeriodicRefresh','timer','getSavedEventLocation','isPassableByAnyDirection','initFollowerController','XKHUy','_moveSpeed','zOiUG','TyOan','iCmcS','hasClickTrigger','ecMId','Visible','_moveRoute','uvfpm','addChild','despawnEverything','isPlayerControlDisabled','setImage','Game_Message_add','loadDataFile','ZEPlZ','horz\x20mirror','isDiagonalDirection','Map\x20%1\x20Variable\x20%2','UjTtt','createLabelWindows','YlsMB','deletePreservedMorphEventDataKey','activationRegionList','oSMTG','ITEM','WLIuY','EnableDir8','clearCarrying','_regionRules','_text','%1Forbid','updateParallel','processMoveCommandEventsMoveCore','isMapPassable','_scene','Game_Player_checkEventTriggerHere','_waitMode','processMoveRouteJumpTo','setDashingEnabled','isAutoBufferIcon','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','pageId','checkNeedForPeriodicRefresh','_visiblePlayerX','eventsXy','hqjkP','Game_CharacterBase_hasStepAnime','smPkv','_shadowOpacity','Game_Troop_meetsConditionsCPC','searchLimit','setFrames','IconIndex','VariableGetSelfVariableID','isMoveOnlyRegionPassable','custom','DashingEnable','Game_Player_getInputDirection','setPlayerDiagonalSetting','checkCollisionKeywords','bitmap','checkSmartEventCollision','kvEEf','Step2Preserve','offsetX','canStartLocalEvents','processMoveRouteStepTo','Template','getSelfTarget','Frames','updateShadowChanges','setAllowEventAutoMovement','turnRight90','forceCarrying','initEventsMoveCoreSettings','PpOSM','Game_Player_increaseSteps','_working','registerSelfEvent','initMoveSpeed','direction','Preserve','reserveCommonEvent','map','UPPER\x20RIGHT','isLabelVisible','outlineColor','max','isSmartEventCollisionOn','_opacity','_EventsMoveCoreSettings','setMapValue','teWHY','ACmXw','template','SCavz','setPose','processMoveRouteTeleportTo','adjustDir8MovementSpeed','zyRxm','initEventsMoveCoreEffects','characterPatternYVS8','posEventsMoveCore','IconBlendMode','Player','metCPC','_duration','Toggle','bgyVh','EventTimerExpireEvent','moveAwayFromPoint','moveSynchTarget','rotation','isAirship','_selfTarget','fEuGq','bOmDx','EventLocationCreate','WstrF','processMoveRouteSelfVariable','GgStc','eventId','onCancel','_moveAllowPlayerCollision','xbjSY','mirror\x20horizontal','target','onDatabaseLoaded','NUM','BoatSpeed','setupChild','setupEventsMoveCoreCommentTags','AmdcS','Game_Map_event','variableId','isSaveEventLocation','Game_Variables_value','isRunning','updatePosition','version','airship','turnTowardCharacter','processMoveSynchApproach','smooth','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','increaseSteps','MorphEventTo','processMoveSynchMirrorHorz','labelWindowText','Window_EventItem_onOk','$preloadedMap_%1','resizeWindow','advancedValue','indexOf','QBFRc','isRegionDockable','setSelfValue','Game_Timer_onExpire','hideShadows','turn180','distance','characterPatternY','registerSelfTarget','eraseEvent','_activationProximity','MoveRouteIndex','_saveEventLocations','_erased','onLoadSuccess','MUSICNOTE','_eventOverloadThreshold','getDirectionToPoint','dSlgY','GhLot','_moveRouteIndex','initMembers','dsJLY','morphInto','blendMode','SwitchId','_labelWindows','bYGrm','isTile','aLnod','wtYDB','WigAc','setupEventsMoveCoreNotetags','MoveAllSynchTargets','Window_NumberInput_processOk','Game_CharacterBase_moveDiagonally','QUESTION','MfMPy','processMoveRouteJumpForward','follower','frontX','followers','setBalloonPose','myVCZ','LOWER\x20RIGHT','GUBHY','moveTowardPoint','PlayerMovementDiagonal','determineCommonEventsWithCPC','ycdMQ','isAnyEventStarting','Game_Event_meetsConditions','_randomMoveWeight','unlockEvent','SelfVariableID','%1Dock','Game_CharacterBase_updatePattern','blt','Window_EventItem_onCancel','HtOxK','TRUE','Map%1.json','checkEventsMoveCoreStringTags','GjCYd','isNormalPriority','registerCommand','checkActivationProximity','executeCommand','_followerChaseOff','processMoveRouteStepToCharacter','SelfSwitchID','fjevk','isJumping','getMapSpawnedEventData','_eventCache','lEkeG','updatePose','BitmapSmoothing','Game_Temp_setDestination','Window_ScrollText_startMessage','splice','Game_Character_forceMoveRoute','fKpFY','prepareSpawnedEventAtXY','Collision','SPIN\x20ANTICLOCKWISE','processMoveSynchRandom','Game_Vehicle_isMapPassable','AIWvH','AutoMoveEvents','Vehicle','LPBZv','EventTimerExpireClear','clearDashing','fKzow','SpawnEventAtRegion','trim','ofmzV','Sprite_Balloon_setup','GetMoveSynchTarget','moveBackToRandomHome','clearPose','parameters','clearDestination','Game_CommonEvent_isActive','Game_Character_processMoveCommand','randomInt','Settings','HEART','_encounterEffectDuration','isBusy','none','...','clearSelfTarget','switchId','moveDiagonally','isValid','gNgFS','SPIN\x20CCW','firstSpawnedEventID','getPlayerDiagonalSetting','_commonEvents','startEncounterEffect','tlOBF','remove','lastMovedDirection','nnfyD','filename','variableValid','VehicleDock','vehicle','isOnLadder','Hours','yYzgC','isOnRope','conditions','updateShadow','checkEventTriggerEventsMoveCore','getInputDir8','clamp','GmGji','onExpire','isSelfVariable','savePreservedMorphEventDataKey','split','iQgwW','updatePatternEventsMoveCore','Game_Timer_stop','_frames','horizontal\x20mirror','SelfSwitches','hDZjg','setNumberInput','GbgJf','_eventOverload','Game_Player_executeMove','DYrQk','deltaXFrom','string','YBzVx','isWorking','lastSpawnedEvent','_DisablePlayerControl','oJCBH','processMoveRouteSelfSwitch','removeTemporaryMapSpawnedEvents','eYPtr','_labelWindow','checkValidEventerMap','executeMove','EventLabelRefresh','processMoveRouteSetIndex','QIbwm','RegionTouch','setupDiagonalSupport','_stepPattern','regionId','stop','restoreSavedEventPosition','replace','TukNS','gPanG','constructor','_selfEvent','turnTowardPoint','CyGir','WalkAllow','call','fKabS','sToaU','isShadowVisible','zoomScale','setChaseOff','CFZHW','zfBcW','convertSelfVariableValuesInScriptCall','isEventRunning','return\x200','iconIndex','DefaultShadow','updateRoutineMove','Spriteset_Map_createLowerLayer','findTargetSprite','clearStepPattern','MdsSN','isEventClickTriggered','IconBufferY','roundY','prototype','Game_Map_unlockEvent','AdvancedVariables','Sprite_Character_initMembers','processMoveSynch','_cpc','bmxSn','characterName','isSupportDiagonalMovement','parallelCommonEvents','HMPH','selfValue','MapSwitches','OuUkN','default','Disable','checkExistingEntitiesAt','round','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','vertical\x20mirror','canMove','_isObjectCharacter','wcPDj','updateText','_diagonalSupport','getPosingCharacterPattern','PVVmf','wxQel','xZtaa','radius','_type','clearSpriteOffsets','moveTowardCharacter','Region%1','player','Step2MapId','windowPadding','PreloadMaps','isDashingAndMoving','shadowFilename','AdvancedSwitches','locate','ARRAYSTR','isMovementSucceeded','update','vnBAr','Hidden','USER-DEFINED\x201','_paused','abs','regionList','Forbid','ANGER','IconSet','processMoveRouteFadeOut','Scene_Load_onLoadSuccess','_MapSpawnedEventData','filter','isLandOk','EventTemplates','1964559sLeCJl','setFrame','fontFace','getInputDirection','VS8','removeChild','tABXw','createSpawnedEvent','iconWidth','Label','Step2EventId','JPQyi','KrpmT','variables','KSMrg','setCharacterBitmap','iconSize','screenX','ZHURo','setPattern','FUNC','Game_CharacterBase_canPass','_PreservedEventMorphData','processMoveRouteFadeIn','loadSystem','getPosingCharacterIndex','_mapId','_PlayerDiagonalSetting','Setting','Rope','VisuMZ_Setup_Preload_Map','some','GULAD','EDLzG','Boat','4casxHt','Step1EventId','AutoBuffer','FontSize','moveAwayFromCharacter','Minutes','despawnEventId','updateMoveSynch','PostCopyJS','ADDITIVE','Game_Event_clearPageSettings','offsetY','lPyBo','spriteId','CPCsMet','charAt','isSelfSwitch','AbRXs','gainFrames','mirror\x20vertical','DzTwb','createSaveEventLocationData','SCLUe','isMoving','_cacheVisibility','MUSIC\x20NOTE','start','GLqJE','StopAutoMoveMessages','6202ViabVB','rHWOo','getEventIconIndex','COBWEB','cMFXW','aOVxj','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','_cacheSystemVisible','processMoveRouteMoveToCharacter','spawnPreserved','_needsRefresh','nPipD','_alwaysUpdateMove','processMoveCommand','makeDeepCopy','despawnAtXY','_inputTime','MapID','process_VisuMZ_EventsMoveCore_Switches_Variables','kLVUX','correctFacingDirection','terrainTag','aslST','_advancedSwitchVariable','_trigger','setControlledFollowerID','kNlTV','roundXWithDirection','requestRefresh','TemplateName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','disable','SwitchGetSelfSwitchABCD','reverse\x20copy','1451085PjEfEF','qIcqO','LLrcv','_eventMorphData','directionOnLadderSpriteVS8dir','firstSpawnedEvent','_eventScreenY','createLabelWindowForTarget','onClickTrigger','Game_CharacterBase_moveStraight','Game_Event_checkEventTriggerAuto','canPassDiagonally','isMapSwitch','isAdvancedVariable','isSaveEventLocations','_eventId','Game_Event_setupPageSettings','turnAwayFromCharacter','_stopCount','KlUaq','Game_System_initialize','TargetSwitchId','VariableId','LEFT','updateSelfMovement','pageIndex','_tilemap','_filename','MessageCore','pattern','_event','switch1Valid','FollowerID','startMapCommonEventOnTouch','setCommonEvent','AScQg','_activationProximityAutoTriggerBypass','MULTIPLY','erase','vert\x20mirror','ZZZ','delay','deleteIconsOnEventsDataKey','TerrainTag','ffEdW','KEPYk','PlayerForbid','UPPER\x20LEFT','SILENCE','Lztsw','DOWN','create','KNEEL','standing','_seconds','_eventErased','opacitySpeed','min','21530EYnHlg','setEventIconDataKey','processMoveRoutePatternLock','EventTimerFramesSet','Self\x20Switch\x20%1','JDhrY','pTBgo','moveForward','updateOpacity','WalkForbid','setDirection','AqVaj','WxcMv','OffsetY','deleteEventLocation','_speed','gShfo','NORMAL','_transparent','processMoveSynchCustom','_patternLocked','fFsou','processDrawIcon','ShowShadows','processMoveRouteMoveUntilStop','isSpawnHitboxCollisionOk','hasAdvancedSwitchVariable','isEventTest','_shadowGraphic','region','textSizeEx','activationProximityType','_EventIcons','startMapCommonEventOnOK','_lastPluginCommandInterpreter','Window_Message_startMessage','_eventLabelOffsetX','list','absDistance','away','Game_Map_refresh','Icon','Ohqbt','Sprite_Character_setTileBitmap','COLLAPSE','Game_Map_update','nGliP','ARRAYNUM','apply','FollowerSetGlobalChase','Game_Interpreter_character','qNjJs','SpawnEventAtTerrainTag','pluginCommandCallEvent','Game_CharacterBase_initMembers','turnLeft90','updateEventsMoveCoreTagChanges','Game_Event_event','_spriteOffsetY','_eventSpawnData','Self\x20Variable\x20%1','determineEventOverload','PreCopyJS','dQDtX','isShadowShrink','concat','Game_Event_isCollidedWithPlayerCharacters','PreSpawnJS','SFYOT','AJYXV','chaseCharacter','text','_characterName','ZFYtp','prepareSpawnedEventAtTerrainTag','bufferX','event','Game_Player_checkEventTriggerThere','RandomMoveWeight','isDestinationValid','LEFT\x20TO\x20RIGHT','_SavedEventLocations','pages','HURT','setTileBitmap','pause','WmzOs','Game_Timer_start','AutoBalloon','events','isPlaytest','isNearTheScreen','processMoveRouteMoveTo','realMoveSpeed','addLoadListener','updateMove','createLowerLayer','loadCPC','lmTbE','ARRAYEVAL','Window_NumberInput_start','onChange','STR','_selfTargetItemChoice','mLuLm','Game_Player_isMapPassable','clear','parent','contents','fUfOC','$callEventMap','createSpawnedEventWithData','EnableTurnInPlace','AllAllow','Game_Interpreter_executeCommand','_eventIcon','reverseDir','convertVariableValuesInScriptCall','setupPageSettings','findProperPageIndex','activationProximityDistance','Game_Vehicle_isLandOk','unlock','visible','ShipSpeed','Ship','Game_CharacterBase_screenY','qNrmE','BULB','JSON','setMoveRoute','_forceCarrying','setupSpawnedEvents','SPIN\x20CLOCKWISE','isShip','eventLabelsVisible','jumpHeight','pos','_characterSprites','row','CommonEventID','checkRegionEventTrigger','bOUXa','processMoveRouteTeleportToCharacter','aLkvX','gsmsx','PostSpawnJS','%1%2','onOk','ydHcv','return\x20%1','shiftY','isActive','OperateValues','_visibleEventX','format','UnzeB','Map%1-Event%2','PosX','UNTITLED','Game_Enemy_meetsSwitchCondition','Game_Event_findProperPageIndex','CQEvy','PreMorphJS','IqgQF','dashSpeedModifier','PostMorphJS','Game_Message_setItemChoice','toLowerCase','Game_Event_initialize','Game_Switches_setValue','SelfVariables','isPressed','OMHOv','MUIjU','General','_pose','note','status','Seconds','setMoveSpeed','EVAL','height','17093280AYvRhm','Game_Map_setup','createContents','nDnxP','switch2Id','isDashing','drawTextEx','Game_Event_locate','isBoat','setStopFollowerChasing','meetActivationProximityConditions','Passability','Allow','CarryPose','Game_Event_updateParallel','Game_CharacterBase_increaseSteps','findDiagonalDirectionTo','requestAnimation','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','needsUpdate','FNlEv','value','right','execute','DiagonalSpeedMultiplier','tmMsT','createIconSprite','_eventIconSprite','Game_CharacterBase_isDashing','BlendMode','pkwMp','switch2Valid','fittingHeight','eUCKK','refresh','executeMoveDir8','deleteIconsOnEventsData','fwTWU','log','initMembersEventsMoveCore','List','SuccessSwitchId','VisuMZ_0_CoreEngine','setupSpawn','startMessage','StrictCollision','_spawnedEvents','_randomHomeX','_screenZoomScale','BalloonOffsetY','bufferY','ZisBC','BGFPX','processMoveSynchMimic','SlowerSpeed','mapId','sVKMb','ITvWc','_clickTrigger','despawnRegions','xCnap','ebkhN','jump','includes','isRegionForbidPass','FRUSTRATION','lxCzV','UZQRQ','hasCPCs','isPassable','dlWsJ','initEventsMoveCore','setupMorphEvent','length','turnAwayFromPoint','anchor','refreshIfNeeded','_CPCs','OAgYb','inBattle','isSpriteVS8dir','Movement','AirshipSpeed','createBitmap','fontSize','bind','moveTypeRandom','destinationX','USER-DEFINED\x204','qRPzu','Game_Map_events','ckvzP','hasMoveOnlyRegions','Game_Event_start','Game_Map_parallelCommonEvents','switches','Game_Event_meetsConditionsCPC','itNXr','dliuf','setValue','_spriteset','posNt','XqzTn','isPosing','lineHeight','Game_Map_setupEvents','getEventIconData','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','EventTimerResume','eRtsy','shadowY','_selfTargetNumberInput','moveStraight','Chase','Game_Character_setMoveRoute','Game_Event_moveTypeRandom','advancedFunc','Letter','createShadows','BufferX','isMapVariable','floor','character','findDirectionTo','_randomHomeY','checkEventTriggerAuto','deleteSavedEventLocation','left','Game_CharacterBase_setDirection','createCharacterShadow','QjgYz','VisibleRange','RegionOk','referEvent','OkbEr','VisuMZ_2_DragonbonesUnion','gbXpW','EventID','changeSpeed','FastForwardKey','autosaveEventLocation','isAllowCharacterTilt','processMoveRouteAnimation','1280quhXvX','TKNbd','TCkUa','_chaseOff','jVJhr','EXCLAMATION','aZplC','VehicleAllow','GQekI','frameCount','characterIndexVS8','isStopFollowerChasing','push','_visibleEventY','EventId','MapVariables','_forceDashing','EventTimerFramesGain','Game_CharacterBase_update','setEventLabelsVisible','BufferY','Step1MapId','EventLabelVisible','VICTORY','Game_Interpreter_PluginCommand','hasEventIcon','bBYoi','updateBitmapSmoothing','PlayerIconDelete','Spriteset_Map_createShadow','screenY','%1Allow','getControlledFollowerID','_counter','deltaX','innerWidth','setupRegionRestrictions','RSYNU','random','defaultFontSize','getDirectionFromPoint','IconBufferX','DNENx','shadowX','updateScale','dir8','isDashingEnabled','STRUCT','ConvertParams','meetActivationRegionConditions','setOpacity','Jjxai','description','prepareSpawnedEventAtRegion','_poseDuration','setDiagonalDirection','OffsetX','TiltVert','down','Game_Event_updateSelfMovement','PxDWJ','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','requestBalloon','_vehicleType','TiltLeft','_pattern','Sprite_Balloon_updatePosition','startMapCommonEventOnOKTarget','_spawnData','labelWindowRange','CallEvent','Game_Troop_meetsConditions','LineHeight','TerrainTags','opacity','characterIndex','updatePattern','setLastPluginCommandInterpreter','getPose','Game_Vehicle_initMoveSpeed','deltaY','HPJLQ','EVcAr','frontY','command357','LIGHTBULB','SPIN\x20COUNTERCLOCKWISE','trigger','saveEventLocation','checkAdvancedSwitchVariablePresent','tQXyH','setBackgroundType','EventForbid','_expireCommonEvent','VisibleEventLabels','setupEventsMoveCoreEffects','USER-DEFINED\x205','_target','EventsMoveCore','svbzS','Map\x20%1\x20Switch\x20%2','meetsSwitchCondition','DzyRI','jXQYY','roundX'];_0x562e=function(){return _0x34b319;};return _0x562e();}function Window_EventLabel(){const _0x4da110=_0x317e8f;this[_0x4da110(0x636)](...arguments);}Window_EventLabel[_0x317e8f(0x32c)]=Object['create'](Window_Base[_0x317e8f(0x32c)]),Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x312)]=Window_EventLabel,Window_EventLabel['prototype'][_0x317e8f(0x636)]=function(_0x4aff5c){const _0x1f6dd1=_0x317e8f;this[_0x1f6dd1(0x3e8)]=_0x4aff5c;const _0x375d26=new Rectangle(0x0,0x0,Graphics[_0x1f6dd1(0x5b3)]/0x4,this[_0x1f6dd1(0x4db)](0x1));this[_0x1f6dd1(0x271)](),Window_Base[_0x1f6dd1(0x32c)]['initialize'][_0x1f6dd1(0x317)](this,_0x375d26),this[_0x1f6dd1(0x63f)]=0x0,this[_0x1f6dd1(0x5a5)](0x2),this[_0x1f6dd1(0x1df)]='';},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x271)]=function(){const _0x3020aa=_0x317e8f;this['_eventErased']=![],this[_0x3020aa(0x4eb)]=$gameScreen[_0x3020aa(0x31b)](),this[_0x3020aa(0x5ea)]=this['_event'][_0x3020aa(0x379)](),this[_0x3020aa(0x3d0)]=this['_event'][_0x3020aa(0x568)](),this[_0x3020aa(0x428)]=this[_0x3020aa(0x3e8)][_0x3020aa(0x303)][_0x3020aa(0x202)],this[_0x3020aa(0x60c)]=this[_0x3020aa(0x3e8)][_0x3020aa(0x303)][_0x3020aa(0x396)],this[_0x3020aa(0x5c7)]=this[_0x3020aa(0x3e8)]['_pageIndex'],this['_cacheVisibility']=this[_0x3020aa(0x217)](),this['_cacheSystemVisible']=$gameSystem[_0x3020aa(0x48b)](),this[_0x3020aa(0x1ed)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x3020aa(0x49e)]=this['_event']['x'],this['_visibleEventY']=this[_0x3020aa(0x3e8)]['y'];},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x358)]=function(){const _0x31cc56=_0x317e8f;Window_Base[_0x31cc56(0x32c)][_0x31cc56(0x358)]['call'](this);if(!this[_0x31cc56(0x4ce)]())return;this[_0x31cc56(0x343)](),this[_0x31cc56(0x576)](),this[_0x31cc56(0x24c)](),this[_0x31cc56(0x40c)]();},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x4ce)]=function(){const _0x580a90=_0x317e8f;if(!this[_0x580a90(0x3e8)])return![];if(!this[_0x580a90(0x3e8)][_0x580a90(0x303)])return![];if(this[_0x580a90(0x5c7)]!==this['_event']['_pageIndex'])return!![];if(this[_0x580a90(0x3e8)][_0x580a90(0x269)]&&!this[_0x580a90(0x401)])return!![];if(this[_0x580a90(0x3e8)]['_labelWindow'][_0x580a90(0x44b)]==='')return![];if(this[_0x580a90(0x4eb)]!==$gameScreen['zoomScale']())return!![];if(this['_eventScreenX']!==this[_0x580a90(0x3e8)]['screenX']())return!![];if(this[_0x580a90(0x3d0)]!==this[_0x580a90(0x3e8)]['screenY']())return!![];if(this[_0x580a90(0x428)]!==this[_0x580a90(0x3e8)]['_labelWindow'][_0x580a90(0x202)])return!![];if(this['_eventLabelOffsetY']!==this[_0x580a90(0x3e8)][_0x580a90(0x303)][_0x580a90(0x396)])return!![];if(this[_0x580a90(0x1ed)]!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x580a90(0x49e)]!==this[_0x580a90(0x3e8)]['x'])return!![];if(this['_visibleEventY']!==this[_0x580a90(0x3e8)]['y'])return!![];if(this[_0x580a90(0x3af)]!==$gameSystem['eventLabelsVisible']())return!![];if(this[_0x580a90(0x3a3)]&&this[_0x580a90(0x63f)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x580a90(0x63f)]>0x0)return!![];if(SceneManager[_0x580a90(0x1e4)]['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x343)]=function(){const _0x2f9e8f=_0x317e8f;if(this['_event'][_0x2f9e8f(0x256)]()!==this[_0x2f9e8f(0x1df)]){if(_0x2f9e8f(0x310)===_0x2f9e8f(0x310))this[_0x2f9e8f(0x1df)]=this['_event'][_0x2f9e8f(0x256)](),this[_0x2f9e8f(0x4dd)]();else return this[_0x2f9e8f(0x5e7)]||0x0;}},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x576)]=function(){const _0x5dc325=_0x317e8f;this['scale']['x']=0x1/$gameScreen[_0x5dc325(0x31b)](),this[_0x5dc325(0x5d9)]['y']=0x1/$gameScreen[_0x5dc325(0x31b)](),this['_screenZoomScale']=$gameScreen[_0x5dc325(0x31b)]();},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x24c)]=function(){const _0x1394ea=_0x317e8f;if(!SceneManager['_scene'])return;if(!SceneManager[_0x1394ea(0x1e4)]['_spriteset'])return;const _0x3bdc17=SceneManager[_0x1394ea(0x1e4)]['_spriteset'][_0x1394ea(0x326)](this['_event']);if(!_0x3bdc17)return;this['x']=Math[_0x1394ea(0x33d)](this[_0x1394ea(0x3e8)][_0x1394ea(0x379)]()-Math[_0x1394ea(0x534)](this[_0x1394ea(0x5c1)]*this[_0x1394ea(0x5d9)]['x']/0x2)),this['x']+=this[_0x1394ea(0x3e8)][_0x1394ea(0x303)]['offsetX'],this['y']=this[_0x1394ea(0x3e8)][_0x1394ea(0x568)]()-_0x3bdc17[_0x1394ea(0x4ba)],this['y']+=Math[_0x1394ea(0x33d)]($gameSystem[_0x1394ea(0x350)]()*0.5),this['y']-=Math[_0x1394ea(0x33d)](this[_0x1394ea(0x4ba)]*this[_0x1394ea(0x5d9)]['y']),this['y']+=this[_0x1394ea(0x3e8)][_0x1394ea(0x303)][_0x1394ea(0x396)],this[_0x1394ea(0x401)]=this['_event']['_erased'],this[_0x1394ea(0x5ea)]=this[_0x1394ea(0x3e8)]['screenX'](),this[_0x1394ea(0x3d0)]=this[_0x1394ea(0x3e8)][_0x1394ea(0x568)](),this['_eventLabelOffsetX']=this[_0x1394ea(0x3e8)][_0x1394ea(0x303)]['offsetX'],this[_0x1394ea(0x60c)]=this[_0x1394ea(0x3e8)][_0x1394ea(0x303)][_0x1394ea(0x396)],this['_eventPageIndex']=this['_event'][_0x1394ea(0x18b)];if(this[_0x1394ea(0x401)]){if(_0x1394ea(0x1d0)===_0x1394ea(0x1d0))this[_0x1394ea(0x63f)]=0x0;else{const _0xe1cb0f=this['_randomHomeX'],_0x39dd26=this[_0x1394ea(0x537)];return this[_0x1394ea(0x28a)](_0xe1cb0f,_0x39dd26);}}},Window_EventLabel[_0x317e8f(0x32c)]['updateOpacity']=function(){const _0x49f6ef=_0x317e8f;if(this['isLabelVisible']()){if(_0x49f6ef(0x5f5)!==_0x49f6ef(0x5f5)){_0x36c999['registerSelfTarget'](this);const _0x31aac8=_0x47a9fe[_0x49f6ef(0x5ac)][_0x49f6ef(0x4a4)][_0x49f6ef(0x317)](this,_0x207a6);return _0x5d7a71[_0x49f6ef(0x2cd)](),_0x31aac8;}else this[_0x49f6ef(0x63f)]+=this[_0x49f6ef(0x402)]();}else SceneManager[_0x49f6ef(0x1e4)][_0x49f6ef(0x2c9)]>0x0?_0x49f6ef(0x388)===_0x49f6ef(0x2ed)?this[_0x49f6ef(0x303)][_0x49f6ef(0x202)]=_0x5d770f(_0x318f96['$1']):this['contentsOpacity']=0x0:_0x49f6ef(0x5e9)!==_0x49f6ef(0x45a)?this['contentsOpacity']-=this[_0x49f6ef(0x402)]():(this['_frames']=this[_0x49f6ef(0x2f0)]||0x0,this[_0x49f6ef(0x2f0)]=_0x361880,this['_working']=!![],this[_0x49f6ef(0x2f0)]=_0x2d1810[_0x49f6ef(0x219)](0x1,this[_0x49f6ef(0x2f0)]));},Window_EventLabel['prototype']['isLabelVisible']=function(){const _0x21899d=_0x317e8f;if(!$gameSystem[_0x21899d(0x48b)]())return![];if(this['_event']?.[_0x21899d(0x269)])return![];if(SceneManager['_scene'][_0x21899d(0x2c9)]>0x0)return![];const _0x292f29=$gamePlayer['x'],_0x4dbfcd=$gamePlayer['y'],_0x5611e1=this['_event']['x'],_0x1a362e=this['_event']['y'];if(this[_0x21899d(0x1ed)]===_0x292f29&&this[_0x21899d(0x197)]===_0x4dbfcd&&this[_0x21899d(0x49e)]===_0x5611e1&&this['_visibleEventY']===_0x1a362e)return this[_0x21899d(0x3a3)];this[_0x21899d(0x1ed)]=$gamePlayer['x'],this[_0x21899d(0x197)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x21899d(0x3e8)]['x'],this[_0x21899d(0x557)]=this['_event']['y'];if($gameMap['absDistance'](_0x292f29,_0x4dbfcd,_0x5611e1,_0x1a362e)>this['_event']['labelWindowRange']())return _0x21899d(0x1f1)!=='jLKqB'?(this[_0x21899d(0x3a3)]=![],![]):!![];return this[_0x21899d(0x3a3)]=!![],!![];},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x402)]=function(){const _0x4001bc=_0x317e8f;return VisuMZ[_0x4001bc(0x5ac)][_0x4001bc(0x2c7)][_0x4001bc(0x371)]['OpacitySpeed'];},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x259)]=function(){const _0x58e2d4=_0x317e8f,_0x5bab13=this[_0x58e2d4(0x422)](this[_0x58e2d4(0x1df)]);this['width']=_0x5bab13[_0x58e2d4(0x5c1)]+($gameSystem['windowPadding']()+this['itemPadding']())*0x2,this[_0x58e2d4(0x4ba)]=Math['max'](this[_0x58e2d4(0x523)](),_0x5bab13['height'])+$gameSystem['windowPadding']()*0x2,this[_0x58e2d4(0x4bd)]();},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x523)]=function(){const _0x9c4571=_0x317e8f;return VisuMZ['EventsMoveCore'][_0x9c4571(0x2c7)][_0x9c4571(0x371)][_0x9c4571(0x592)];},Window_EventLabel[_0x317e8f(0x32c)]['resetFontSettings']=function(){const _0x1013a1=_0x317e8f;Window_Base[_0x1013a1(0x32c)][_0x1013a1(0x1a9)][_0x1013a1(0x317)](this),this[_0x1013a1(0x470)]['fontSize']=this['defaultFontSize']();},Window_EventLabel['prototype'][_0x317e8f(0x571)]=function(){const _0x44695b=_0x317e8f;return VisuMZ[_0x44695b(0x5ac)]['Settings'][_0x44695b(0x371)][_0x44695b(0x38e)];},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x4dd)]=function(){const _0x3e9c13=_0x317e8f;this[_0x3e9c13(0x259)](),this[_0x3e9c13(0x470)]['clear']();const _0xd282dc=this['_text'][_0x3e9c13(0x2ec)](/[\r\n]+/);let _0x3c12d6=0x0;for(const _0x54fa82 of _0xd282dc){const _0x2cb668=this[_0x3e9c13(0x422)](_0x54fa82),_0x38fa54=Math['floor']((this[_0x3e9c13(0x56d)]-_0x2cb668['width'])/0x2);this[_0x3e9c13(0x4c1)](_0x54fa82,_0x38fa54,_0x3c12d6),_0x3c12d6+=_0x2cb668[_0x3e9c13(0x4ba)];}},Window_EventLabel['prototype'][_0x317e8f(0x41a)]=function(_0x1dd469,_0x37e3f0){const _0x2e1f43=_0x317e8f;_0x37e3f0['drawing']&&this['drawIcon'](_0x1dd469,_0x37e3f0['x']+0x2,_0x37e3f0['y']),_0x37e3f0['x']+=Math[_0x2e1f43(0x403)](this[_0x2e1f43(0x378)](),ImageManager[_0x2e1f43(0x370)])+0x4;},Window_EventLabel['prototype']['drawIcon']=function(_0x36ea17,_0x2f97e2,_0x49e35e){const _0x26417e=_0x317e8f,_0x363c08=ImageManager[_0x26417e(0x380)](_0x26417e(0x361)),_0x352025=ImageManager[_0x26417e(0x370)],_0x3bb995=ImageManager[_0x26417e(0x1aa)],_0x41abe6=_0x36ea17%0x10*_0x352025,_0x293b96=Math[_0x26417e(0x534)](_0x36ea17/0x10)*_0x3bb995,_0x3cd5db=Math[_0x26417e(0x403)](this[_0x26417e(0x378)]()),_0x4b9820=Math[_0x26417e(0x403)](this[_0x26417e(0x378)]());this[_0x26417e(0x470)][_0x26417e(0x295)](_0x363c08,_0x41abe6,_0x293b96,_0x352025,_0x3bb995,_0x2f97e2,_0x49e35e,_0x3cd5db,_0x4b9820);},Window_EventLabel[_0x317e8f(0x32c)][_0x317e8f(0x378)]=function(){const _0x22f9e9=_0x317e8f;return VisuMZ[_0x22f9e9(0x5ac)][_0x22f9e9(0x2c7)]['Label']['IconSize'];};