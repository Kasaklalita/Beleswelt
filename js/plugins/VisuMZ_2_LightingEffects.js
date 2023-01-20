//=============================================================================
// VisuStella MZ - Lighting Effects
// VisuMZ_2_LightingEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_LightingEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LightingEffects = VisuMZ.LightingEffects || {};
VisuMZ.LightingEffects.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.03] [LightingEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Lighting_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ lacks the ability to provide lighting by default. During scenes
 * where it is night, the usage of tones is not adequate either since there is
 * no way to illuminate the darkness. This plugin remedies that problem by
 * providing lighting effects that pierce the darkness. From radial lights to
 * conical lights and applying various lighting behaviors, this plugin covers
 * the general lighting needs that RPG Maker MZ does not.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto-Tints allow for maps to automatically load up a specific screen tint
 *   upon player entry. Screen tints can be custom or based off presets.
 * * Apply darkness overlays to maps using custom colors or presets. Change
 *   them midway through the game using Plugin Commands.
 * * Radial lights can be added to pierce the darkness overlays. They will
 *   light up nearby surroundings in a circular area.
 * * Conical lights can be used to portray light in a cone-like direction and
 *   simulate the light coming from flashlights.
 * * Adjust the offset settings for conical lights, such at the source of the
 *   light will come from an actor or event's hand positions rather than their
 *   chest or face.
 * * Adjusted conical light offsets can vary for different actors and/or events
 *   in case they have different body structures. Change these settings through
 *   notetags, Plugin Commands, or Plugin Parameters.
 * * Apply radial and conical lights to vehicles. They can have different
 *   settings applied when they're inactive or being driven. These settings can
 *   be adjusted separately via Plugin Parameters or Plugin Commands!
 * * Assign lights via a variety of ways such as easy to use notetags, page-
 *   specific comment tags, and Plugin Commands!
 * * Use either images or have the plugin generate them ingame using various
 *   notetags, Plugin Parameters, or Plugin Commands!
 * * Apply optional light behaviors to lights such as blinking, flickering,
 *   flashing, flares, and more!
 * * Use patterns for light fluctuation behaviors instead of randoms.
 * * Spawn lights unattached to the player character, followers, or events.
 *   These spawned lights can have unique trajectories akin to what would be
 *   seen at a light show.
 * * The darkness overlay also appears in battle. Actors and enemies will have
 *   their own individual radial light settings that they can use specifically
 *   for the battle-scene only. There will be no conical lights for battle.
 * * Options added in the Options menu to allow players to turn on/off any
 *   unwanted light behaviors that may bother them. Examples include blinking
 *   lights, flickering lights, flashing, flares, etc.
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
 * * VisuMZ_1_EventsMoveCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions - Quick Start
 * ============================================================================
 * 
 * Here are some instructions to get yourself started quickly on using the
 * Lighting Effects plugin.
 * 
 * ---
 * 
 * Step 1: Create a map with a darkness overlay.
 * 
 * 1. Create a new map (or use an old one if you know what you're doing).
 * 2. Right click the map's name in the editor and go to the Map's Properties.
 * 3. Add the <Overlay: Night> notetag into the map's notebox.
 * 4. For more information on the types of settings you can pick, look in the
 *    help file.
 * 
 * *NOTE* Keep in mind that whenever you enter this map, the darkness overlay
 * will shift to "Night". If you don't want this to happen and want to shift it
 * dynamically, use the Plugin Command "OVERLAY: Change to Preset Color" or
 * "OVERLAY: Change to Custom Color" to change them instead.
 * 
 * ---
 * 
 * Step 2: Create an event with a radial light.
 * 
 * 1. Create a new event on the map.
 * 2. Add a "Comment" event to the event (you can use the notebox, too, but
 *    it's tiny, and the comment box is more visible).
 * 3. Inside the comment (or notebox), add in the following tags:
 * 
 *    <Radial Light Color: Light Yellow>
 *    <Radial Light Radius: 100>
 *    <Radial Light Intensity: 25%>
 *    <Radial Light Opacity: 50%>
 * 
 * 4. You can leave any of them out, but these four are selected as the main
 *    notetags to use to adjust how radial lights behave.
 * 5. For more information on the types of settings you can apply to radial
 *    lights, look in the help file.
 * 6. Let's see how this looks in-game!
 * 7. Save the game project.
 * 8. Let's test it out!
 * 
 * ---
 * 
 * Step 3: Play Test! Checking out the Radial Light!
 * 
 * 1. You should notice that the screen is darker than normal with the "Night"
 *    color as the darkness overlay.
 * 2. Find the event you've made. It should be emitting a light.
 * 3. The player, by default, assuming that no other Plugin Parameters have
 *    been changed, should also be emitting a faint light and has a conical
 *    light on, too.
 * 4. Everything working? Awesome, let's create an event with a conical light
 *    this time.
 * 
 * ---
 * 
 * Step 4: Create an event with a conical light.
 * 
 * 1. Create another new event on the map.
 * 2. Add a "Comment" event to the event (once again, you can use the notebox,
 *    too if you want but we prefer the larger comment box).
 * 3. Inside the comment (or notebox), add in the following tags:
 * 
 *    <Conical Light Color: Light Yellow>
 *    <Conical Light Radius: 300>
 *    <Conical Light Source Radius: 40>
 *    <Conical Light Intensity: 25%>
 *    <Conical Light Opacity: 80%>
 * 
 * 4. You can leave any of the above out, but these are the usual suspects when
 *    applying a conical light to an event.
 * 5. The "Source Radius" notetag refers to the light source point from which
 *    the conical light extends out of.
 * 6. For more information on the types of settings you can apply to radial
 *    lights, look in the help file.
 * 7. Let's see how this looks in-game!
 * 8. Save the game project.
 * 9. Let's test it out!
 * 
 * ---
 * 
 * Step 5: Play Test! Checking out the Conical Light!
 * 
 * 1. Look for the new event you've made. It should be holding a conical light,
 *    similar to your player.
 * 2. Conical lights will face whatever direction its user is facing.
 * 3. By default, the source point should be coming from the user's hand.
 * 4. This can be changed via notetags, Plugin Parameters, or Plugin Commands.
 * 5. Look in the help file for more information.
 * 6. The lights look kinda boring the way they are though. Let's give them
 *    some typical light behaviors.
 * 
 * ---
 * 
 * Step 6: Applying Behaviors
 * 
 * 1. Open your first event with the radial light and add these tags:
 * 
 *    <Radial Light Blink Rate: 3%>
 *    <Radial Light Pulse Rate: 20%>
 * 
 * 2. This will cause the radial light tied to this event to change slightly
 *    while waiting. This imitates how certain light bulbs work although there
 *    are other patterns you can use.
 * 3. Look in the help file for more behavior notetags you can use.
 * 4. Let's modify the conical light event and add these tags:
 * 
 *    <Conical Light Flicker Rate: 2%>
 *    <Conical Light Glow Rate: 10%>
 * 
 * 5. This will cause the conical light tied to this event to also change ever
 *    so slightly while waiting. Like with the other, this also imitates how
 *    flash bulbs work although there are other pattners you can use.
 * 6. Check the help file out for more behavior types to use with these lights.
 * 7. Let's see how this looks in-game!
 * 8. Save the game project.
 * 9. Let's test it out!
 * 
 * ---
 * 
 * Step 7: Play Test! Checking out Light Behaviors!
 * 
 * 1. Find the two events you've altered.
 * 2. You'll notice that the lights don't stay static the way they are. One
 *    will pulse back and forth while the other will have its opacity oscillate
 *    down and back up.
 * 3. Lighting behaviors make the atmosphere less boring even if nothing is
 *    happening on screen.
 * 4. These behaviors extend to blinking, flickering, flashing, flares, glows,
 *    pulses, and even custom patterns.
 * 5. For more information, check out the help file.
 * 
 * ---
 * 
 * And with that, you should have a better grasp on a few of the things the
 * Lighting Effects plugin is capable of.
 * 
 * ---
 *
 * ============================================================================
 * Keeping FPS Stable
 * ============================================================================
 * 
 * As this is a plugin that adds special effects to your game, you do have to
 * be mindful about how you use the various Lighting Effects features or else
 * your game will face FPS drops.
 *
 * ---
 * 
 * Here are a few things to keep in mind:
 * 
 * 1. Lighting Effects work best on small to medium sized maps. Anything below
 *    72x72 tiles in size is ideal. This also puts less stress on RPG Maker MZ
 *    even if you aren't using Lighting Effects for that map as there are less
 *    tiles to process in regards to the tilemap shader.
 * 
 * 2. Don't go overboard with Lighting Effect events. The more events there are
 *    for lighting effects, the more the player's GPU will act up. Keep the
 *    event count low and there will be less FPS drops. Anything below 80
 *    events is ideal. However, performances may vary on different computers.
 *    This is also a good practice to keep in mind for maps that aren't using
 *    Lighting Effects either.
 * 
 * 3. Keep spawned lights to a minimum. Generally speaking, anything under 128
 *    spawned lights on a map at a time is a good metric to keep in mind.
 *    However, performances may vary on different computers.
 * 
 * ---
 * 
 * We are NOT responsible for irresponsible usage of this plugin that pushes
 * graphical processing to their absolute limitations.
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
 * Without the VisuStella MZ Battle Core installed in the same project, there
 * will be no darkness overlay in battle and as such, no lighting effects. The
 * Battle Core provides the needed architecture for lighting effects to go
 * through properly.
 * 
 * ---
 * 
 * VisuMZ_2_WeatherEffects
 * 
 * Weather patterns placed on the lower layer will be affected by the darkness
 * overlay that the VisuStella MZ Lighting Effects plugin utilizes. This means
 * that even the supposively "brighter" weather patterns will be dimmed out
 * (such as the Flame Wall or Aurora to name a few). To deal with this, use the
 * Lighting Effects plugin's "Auto-Light Regions" and mark the parallax visible
 * tiles with those said regions.
 * 
 * Weather patterns placed on the upper layer will not be affected by the
 * darkness overlay in order to allow the weather have better contrast in
 * addition to following RPG Maker MZ's decision to not have weather affected
 * by tints either. If you want to tint the upper layer weather, you can add
 * the tint manually through the weather pattern's custom Image Settings and
 * apply a hue.
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
 * === Auto-Tint-Related Notetags ===
 * 
 * ---
 *
 * <Auto-Tint: Normal>
 * <Auto-Tint: Dark>
 * <Auto-Tint: Sepia>
 * <Auto-Tint: Sunset>
 * <Auto-Tint: Night>
 *
 * - Used for: Map Notetags
 * - Automatically tints the screen upon map entry with a preset tone.
 * - Screen tint preset values are based on RPG Maker MZ's default presets.
 * - Keep in minds that lights do not pierce through tones.
 *
 * ---
 *
 * <Auto-Tint: r, g, b, k>
 *
 * - Used for: Map Notetags
 * - Automatically tints the screen upon map entry with a custom tone.
 * - Replace 'r' with a number representing the red tone value (-255 to 255).
 * - Replace 'g' with a number representing the green tone value (-255 to 255).
 * - Replace 'b' with a number representing the blue tone value (-255 to 255).
 * - Replace 'g' with a number representing the grey tone value (0 to 255).
 * - Values that exceed -255 or 255 will be automatically timmed down.
 * - Grey values that are negative will have their absolute value taken of.
 * - Keep in minds that lights do not pierce through tones.
 *
 * ---
 * 
 * === Darkness Overlay-Related Notetags ===
 * 
 * ---
 * 
 * <Overlay: name>
 * 
 * - Used for: Map Notetags
 * - Applies a darkness overlay to the map that lights can penetrate through.
 * - Replace 'name' with any of the following preset names:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Some of the above presets automatically adjust opacity levels to certain
 *   values. Otherwise, they will be at 255.
 * 
 * ---
 * 
 * <Overlay Color: #rrggbb>
 * 
 * - Used for: Map Notetags
 * - Applies a darkness overlay using a custom color.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - These settings do not adjust opacity levels.
 * 
 * ---
 * 
 * <Overlay Opacity: x>
 * 
 * - Used for: Map Notetags
 * - Adjusts the darkness overlay's opacity level.
 * - Replace 'x' with a number value from 0 to 255, where 0 is transparent
 *   and 255 is opaque.
 * 
 * ---
 * 
 * <Overlay Opacity: x%>
 * 
 * - Used for: Map Notetags
 * - Adjusts the darkness overlay's opacity level by rate.
 * - Replace 'x' with a number value from 0 to 100, where 0% is transparent
 *   and 100% is opaque.
 * 
 * ---
 * 
 * <No Overlay>
 * 
 * - Used for: Map Notetags
 * - For the maps where you don't want there to be any overlay, but you don't
 *   want this to affect the other maps using them.
 * 
 * ---
 * 
 * === Anti-Light-Related Notetags ===
 * 
 * ---
 * 
 * <Hard Anti-Light Region: x>
 * <Hard Anti-Light Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these regions won't have any light shown on them.
 *   - This will use hard edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the region marked tiles.
 * - Replace 'x' with a number representing the region ID to function as an
 *   anti-light tile marker.
 *   - You cannot use region 0. Use a number from 1 to 255 instead.
 * 
 * ---
 * 
 * <Hard Anti-Light Terrain Tag: x>
 * <Hard Anti-Light Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these terrain tags won't have any light shown on them.
 *   - This will use hard edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the terrain tag marked tiles.
 * - Replace 'x' with a number representing the terrain tag to function as an
 *   anti-light tile marker.
 *   - You cannot use terrain tag 0. Use a number from 1 to 7 instead.
 * 
 * ---
 * 
 * <Soft Anti-Light Region: x>
 * <Soft Anti-Light Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these regions won't have any light shown on them.
 *   - This will use soft edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the region marked tiles.
 * - Replace 'x' with a number representing the region ID to function as an
 *   anti-light tile marker.
 *   - You cannot use region 0. Use a number from 1 to 255 instead.
 * 
 * ---
 * 
 * <Soft Anti-Light Terrain Tag: x>
 * <Soft Anti-Light Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these terrain tags won't have any light shown on them.
 *   - This will use soft edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the terrain tag marked tiles.
 * - Replace 'x' with a number representing the terrain tag to function as an
 *   anti-light tile marker.
 *   - You cannot use terrain tag 0. Use a number from 1 to 7 instead.
 * 
 * ---
 * 
 * === Radial Light General-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Radial Light>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Quick and simple setup to add radial lights to this event.
 * - Using this notetag will enable radial lights for this event.
 * - This will use the default settings found in the Plugin Parameters for
 *   Event Radial Lights.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <No Radial Light>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Disables radial lights for this event.
 * - Primarily used if the default settings for Event Radial Lights would have
 *   the radial light enabled.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Filename: filename>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses an image instead of generated radial lights.
 *   - Using this notetag will lock out the usage of generated radial light
 *     notetags found below.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Image will be centered on the target where the center of the image is the
 *   anchor point and will be rotated.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Color: name>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Creates a generated radial light using a preset color.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'name' with any of the following:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Color: #rrggbb>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Creates a generated radial light using a custom color.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Radius: r>
 * <Radial Light Diameter: d>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the radius/diameter of the generated radial light.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   radial light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   radial light.
 * - Use one or the other.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 *   - If this notetag is used, this will disable the "Auto-Calc Radius" Plugin
 *     Parameter for this specific actor/enemy.
 * 
 * ---
 * 
 * <Radial Light Intensity: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the light intensity of the generated radial light.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 *   - Intensity determines how much of the light's luminosity extends outwards
 *     at full strength between fading away.
 * - Replace 'x' with a number between 0 and 100 representing the intensity
 *   percentage for the generated radial light.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Angle: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the initial angle of the generated radial light.
 *   - Can be used with both image and generated radial lights.
 *   - Best used with the <Radial Light Filename: filename> notetag in order to
 *     see any changes.
 * - Replace 'x' with a number between 0 and 360 representing the angle.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Rotate Speed: +x>
 * <Radial Light Rotate Speed: -x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the speed at which the radial light rotates.
 *   - Can be used with both image and generated radial lights.
 *   - Best used with the <Radial Light Filename: filename> notetag in order to
 *     see any changes.
 * - Replace 'x' with a number representing how slow (smaller numbers) or fast
 *   (larger numbers) the light rotates.
 *   - Use negative numbers for a reverser rotation going counter-clockwise.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Blend Mode: Normal>
 * <Radial Light Blend Mode: Additive>
 * <Radial Light Blend Mode: Multiply>
 * <Radial Light Blend Mode: Screen>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Changes the blend mode of the radial light.
 *   - Can be used with both image and generated radial lights.
 *   - We recommend that you use 'screen'.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Opacity: x>
 * <Radial Light Opacity: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Changes the opacity level of the radial light.
 *   - Can be used with both image and generated radial lights.
 *   - The opacity of a light determines how bright (larger numbers) or dim
 *     (smaller numbers) it is.
 * - Replace 'x' with a number between 0 and 255 to determine how dim (smaller
 *   numbers) or bright (larger numbers) the light is.
 * - Replace 'x%' with a percentage between 0% and 100% to determine how
 *   dim (smaller numbers) or bright (larger numbers) the light is.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Offset: +x, +y>
 * <Radial Light Offset: -x, -y>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Offsets the position of the radial light, which is normally centered on
 *   the sprite it is coming from.
 *   - Can be used with both image and generated radial lights.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the radial light's x and y coordinates by.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * === Radial Light Behavior-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Radial Light Blink Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will blink.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Blink Modifier: +x%>
 * <Radial Light Blink Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a static multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static multiplier increase.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flicker Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flicker.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flicker Modifier: +x%>
 * <Radial Light Flicker Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a randomized multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flash Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flash.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flash Modifier: +x%>
 * <Radial Light Flash Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a static additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static additional change.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flare Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flare.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flare Modifier: +x%>
 * <Radial Light Flare Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a randomized additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flaring up.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts how much the radial light will oscillate its brightness back and
 *   forth in a glow-like fashion.
 * - Replace 'x' with a percentage representing the change in brightness.
 *   - Lower numbers mean less fluctuation.
 *   - Higher numbers mean more fluctuation.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Speed: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the speed at which the glow oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Random>
 * <Radial Light Glow No Random>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adds a random seed (or not) to the glow oscillation. This can be used to
 *   put multiple lights glowing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts how much the radial light will oscillate its radius back and
 *   forth in a pulse-like fashion.
 * - Replace 'x' with a percentage representing the change in size.
 *   - Lower numbers mean less shrinking.
 *   - Higher numbers mean more shrinking.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Speed: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the speed at which the pulse oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Random>
 * <Radial Light Pulse No Random>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adds a random seed (or not) to the pulse oscillation. This can be used to
 *   put multiple lights pulsing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pattern Type: name>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses a premade pattern by this plugin. The pattern will change the
 *   brightness of the light in a sequenced pattern.
 * - Replace 'name' with any of the following text:
 *   - none, normal
 *   - fluorescent, halogen, incandescent
 *   - candle, torch, campfire
 *   - fast strobe, slow strobe
 *   - strong pulse, medium pulse, slow pulse
 *   - underwater
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Custom Pattern: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses a custom pattern determined by you, the game dev, on how the light's
 *   brightness will change over time.
 * - Replace 'x' with letters of the alphabet from 'a' to 'z'.
 *   - 'a' is completely transparent.
 *   - 'm' is midway in brightness.
 *   - 'z' is the brightest the light can be.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * - Examples:
 *   - <Radial Light Custom Pattern: mmmmmaaaaammmmmaaaaaabcdefgabcdefg>
 *   - <Radial Light Custom Pattern: nmonqnmomnmomomno>
 *   - <Radial Light Custom Pattern: abcdefghijklmnopqrrqponmlkjihgfedcba>
 * 
 * ---
 * 
 * <Radial Light Pattern Delay: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines how many frames to wait before going to the next part of the
 *   preset pattern and/or custom pattern.
 * - Replace 'x' with a number representing the frames the radial light needs
 *   to wait before moving forward in the pattern.
 *   - Lower numbers mean faster (minimum: 1).
 *   - Higher numbers mean slower.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * === Conical Light General-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Conical Light>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Quick and simple setup to add conical lights to this event.
 * - Using this notetag will enable conical lights for this event.
 * - This will use the default settings found in the Plugin Parameters for
 *   Event Conical Lights.
 * 
 * ---
 * 
 * <No Conical Light>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Disables conical lights for this event.
 * - Primarily used if the default settings for Event Conical Lights would have
 *   the conical light enabled.
 * 
 * ---
 * 
 * <Conical Light Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses an image instead of generated conical lights.
 *   - Using this notetag will lock out the usage of generated conical light
 *     notetags found below.
 *   - By default, you should have your conical light image face the right at
 *     "0 degrees".
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light File Angle Offset: +x>
 * <Conical Light File Angle Offset: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how much to offset the angle of the conical light image by.
 * - Replace 'x' with a number from 0 to 360 representing the angle offset.
 *   - Negatives are allowed in order to quickly go the other way.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light File Anchor: x, y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determine the anchor points for the conical light image.
 * - Replace 'x' and 'y' with numbers between 0 and 1.
 *   - For x: 0.0 is left-aligned, 0.5 is center-aligned, 1.0 is right-aligned.
 *   - For y: 0.0 is top-aligned, 0.5 is middle-aligned, 1.0 is bottom-aligned.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Color: name>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Creates a generated conical light using a preset color.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'name' with any of the following:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Color: #rrggbb>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Creates a generated conical light using a custom color.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Radius: r>
 * <Conical Light Diameter: d>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the radius/diameter of the generated conical light.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   conical light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   conical light.
 * - Use one or the other.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Source Radius: r>
 * <Conical Light Source Diameter: d>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the radius/diameter of the generated conical light's light
 *   source, creating a little circle from where the cone starts.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   conical light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   conical light.
 * - Use one or the other.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Intensity: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the light intensity of the generated conical light.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 *   - Intensity determines how much of the light's luminosity extends outwards
 *     at full strength between fading away.
 * - Replace 'x' with a number between 0 and 100 representing the intensity
 *   percentage for the generated conical light.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Blend Mode: Normal>
 * <Conical Light Blend Mode: Additive>
 * <Conical Light Blend Mode: Multiply>
 * <Conical Light Blend Mode: Screen>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the blend mode of the conical light.
 *   - Can be used with both image and generated conical lights.
 *   - We recommend that you use 'screen'.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Opacity: x>
 * <Conical Light Opacity: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity level of the conical light.
 *   - Can be used with both image and generated conical lights.
 *   - The opacity of a light determines how bright (larger numbers) or dim
 *     (smaller numbers) it is.
 * - Replace 'x' with a number between 0 and 255 to determine how dim (smaller
 *   numbers) or bright (larger numbers) the light is.
 * - Replace 'x%' with a percentage between 0% and 100% to determine how
 *   dim (smaller numbers) or bright (larger numbers) the light is.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Angle: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the arc angle of the generated conical light.
 *   - The larger the angle, the wider the arc.
 * - Replace 'x' with a number between 0 and 360 representing the angle.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Angle Sway: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how many degrees the light will sway back and forth.
 *   - The larger the angle, the wider the sway.
 * - Replace 'x' with a number between 0 and 360 representing the degrees the
 *   light will sway.
 *   - Use 0 for no sway.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Sway Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how fast the light will sway back and forth.
 * - Replace 'x' with a percentage from 1% to 100%.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Sway Random>
 * <Conical Light Sway No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the sway oscillation. This can be used to
 *   put multiple lights swaying at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Force Direction: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Forces the conical light to face a certain direction.
 *   - This is primarily used for tile events or direction fixed events that
 *     would otherwise lock a conical light to face a certain direction.
 * - Replace 'x' with any of the following:
 *   - none
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Use 'none' to remove any forced directions.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Follow Cursor>
 * <Conical Light Not Follow Cursor>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Causes the conical light to face towards the direction of the mouse
 *   cursor if it's within the game client window.
 * - This is used to offset the default settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Hand Offset>
 * <Conical Light Center Offset>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Causes the conical light to follow either the hand-focused offsets or
 *   base the offset at the center of the character.
 * - This is used to offset the default settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Offset: +x, +y>
 * <Conical Light Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Offsets the position of the conical light, which is normally centered on
 *   the sprite it is coming from.
 *   - Can be used with both image and generated conical lights.
 *   - This is NOT used with the <Conical Light Hand Offset> notetag.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the conical light's x and y coordinates by.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light d Pattern p: +x, +y>
 * <Conical Light d Pattern p: -x, -y>
 * <Conical Light d Pattern p: +x, -y>
 * <Conical Light d Pattern p: -x, +y>
 * 
 * - Used for: Actor Notetags, Event Notetags, and Event Page Comment Tags
 * - When using hand-based offsets for the conical light, this will cause the
 *   light source to come from the target's hand instead of their chest/face.
 * - For actors, the light source origin will vary depending on who is in the
 *   lead, in case certain actors may be left or right handed, or if happen to
 *   be a robot that has the light shining from their eyes.
 * - Replace 'd' with text representing the direction the offset is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the conical light's x and y coordinates by.
 * - Examples:
 *   - <Conical Light Down Pattern 0: +12, +14>
 *   - <Conical Light Left Pattern 1: +4, +16>
 *   - <Conical Light Right Pattern 2: -6, +16>
 * 
 * ---
 * 
 * === Conical Light Behavior-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Conical Light Blink Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will blink.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Blink Modifier: +x%>
 * <Conical Light Blink Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a static multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static multiplier increase.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flicker Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flicker.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Flicker Modifier: +x%>
 * <Conical Light Flicker Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a randomized multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flash Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flash.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Flash Modifier: +x%>
 * <Conical Light Flash Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a static additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static additional change.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flare Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flare.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Flare Modifier: +x%>
 * <Conical Light Flare Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a randomized additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flaring up.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Glow Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts how much the conical light will oscillate its brightness back and
 *   forth in a glow-like fashion.
 * - Replace 'x' with a percentage representing the change in brightness.
 *   - Lower numbers mean less fluctuation.
 *   - Higher numbers mean more fluctuation.
 * 
 * ---
 * 
 * <Conical Light Glow Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the speed at which the glow oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * 
 * ---
 * 
 * <Conical Light Glow Random>
 * <Conical Light Glow No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the glow oscillation. This can be used to
 *   put multiple lights glowing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <Conical Light Pulse Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts how much the conical light will oscillate its radius back and
 *   forth in a pulse-like fashion.
 * - Replace 'x' with a percentage representing the change in size.
 *   - Lower numbers mean less shrinking.
 *   - Higher numbers mean more shrinking.
 * 
 * ---
 * 
 * <Conical Light Pulse Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the speed at which the pulse oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * 
 * ---
 * 
 * <Conical Light Pulse Random>
 * <Conical Light Pulse No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the pulse oscillation. This can be used to
 *   put multiple lights pulsing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <Conical Light Pattern Type: name>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses a premade pattern by this plugin. The pattern will change the
 *   brightness of the light in a sequenced pattern.
 * - Replace 'name' with any of the following text:
 *   - none, normal
 *   - fluorescent, halogen, incandescent
 *   - candle, torch, campfire
 *   - fast strobe, slow strobe
 *   - strong pulse, medium pulse, slow pulse
 *   - underwater
 * 
 * ---
 * 
 * <Conical Light Custom Pattern: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses a custom pattern determined by you, the game dev, on how the light's
 *   brightness will change over time.
 * - Replace 'x' with letters of the alphabet from 'a' to 'z'.
 *   - 'a' is completely transparent.
 *   - 'm' is midway in brightness.
 *   - 'z' is the brightest the light can be.
 * - Examples:
 *   - <Conical Light Custom Pattern: mmmmmaaaaammmmmaaaaaabcdefgabcdefg>
 *   - <Conical Light Custom Pattern: nmonqnmomnmomomno>
 *   - <Conical Light Custom Pattern: abcdefghijklmnopqrrqponmlkjihgfedcba>
 * 
 * ---
 * 
 * <Conical Light Pattern Delay: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how many frames to wait before going to the next part of the
 *   preset pattern and/or custom pattern.
 * - Replace 'x' with a number representing the frames the conical light needs
 *   to wait before moving forward in the pattern.
 *   - Lower numbers mean faster (minimum: 1).
 *   - Higher numbers mean slower.
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
 * === Overlay Plugin Commands ===
 * 
 * ---
 * 
 * OVERLAY: Change to Preset Color
 * - Change current darkness overlay to a preset color and opacity level.
 * 
 *   Color: 
 *   - Pick a preset color.
 *   - This will also come with predetermined opacity values.
 * 
 *   Duration:
 *   - What is the duration of the color change?
 * 
 * ---
 * 
 * OVERLAY: Change to Custom Color
 * - Change current darkness overlay to a custom color.
 * 
 *   Color:
 *   - Custom color.
 *   - This uses #rrggbb format.
 *   - Check your color here: https://htmlcolorcodes.com/
 * 
 *   Opacity:
 *   - Opacity level of the color.
 *   - Value between 0-255.
 *   - Transparent: 0. Opaque: 255.
 * 
 *   Duration:
 *   - What is the duration of the color change?
 * 
 * ---
 * 
 * === Battle Light Plugin Commands ===
 * 
 * ---
 * 
 * BATTLE LIGHT: Change Actor(s) Settings
 * - Change the battle-radial light settings for target(s).
 * 
 *   Actor ID(s):
 *   - Target actor(s) you want to change light settings for.
 *   - You may use JavaScript code.
 * 
 *   Settings:
 *   - Change the radial light settings for the target(s).
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 * 
 *   Auto-Calc Radius:
 *   - Automatically calculates the radius size based on sprite's width/height.
 * 
 * ---
 * 
 * BATTLE LIGHT: Change Enemy(s) Settings
 * - Change the battle-radial light settings for target(s).
 * 
 *   Enemy Index(es):
 *   - Select enemy troop index(es) to change light settings for.
 *   - You may use JavaScript code.
 * 
 *   Settings:
 *   - Change the radial light settings for the target(s).
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 * 
 *   Auto-Calc Radius:
 *   - Automatically calculates the radius size based on sprite's width/height.
 * 
 * ---
 * 
 * === Radial Light Plugin Commands ===
 * 
 * ---
 *
 * RADIAL LIGHT: Change Player Settings
 * - Change the radial light settings for the player.
 *
 *   Settings:
 *   - Change the radial light settings for the player.
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Follower Settings
 * - Change the radial light settings for followers.
 *
 *   Settings:
 *   - Change the radial light settings for all followers.
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Event(s) Settings
 * - Change the radial light settings for target event(s).
 *
 *   Event ID(s):
 *   - Target event(s) to have their light settings changed.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 *
 *   Settings:
 *   - Change the radial light settings for target event(s).
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Boat Settings
 * - Change the radial light settings for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 *
 * RADIAL LIGHT: Change Ship Settings
 * - Change the radial light settings for the ship vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 *
 * RADIAL LIGHT: Change Airship Settings
 * - Change the radial light settings for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 * 
 * === Conical Light Plugin Commands ===
 * 
 * ---
 *
 * CONICAL LIGHT: Change Player Settings
 * - Change the conical light settings for the player.
 *
 *   Settings:
 *   - Change the conical light settings for the player.
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Follower Settings
 * - Change the conical light settings for followers.
 *
 *   Settings:
 *   - Change the conical light settings for all followers.
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Event(s) Settings
 * - Change the conical light settings for target event(s).
 *
 *   Event ID(s):
 *   - Target event(s) to have their light settings changed.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 *
 *   Settings:
 *   - Change the conical light settings for target event(s).
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Boat Settings
 * - Change the conical light settings for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 *
 * ---
 *
 * CONICAL LIGHT: Change Ship Settings
 * - Change the conical light settings for the ship vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 *
 * ---
 *
 * CONICAL LIGHT: Change Airship Settings
 * - Change the conical light settings for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 * 
 * === Conical Offset Plugin Commands ===
 * 
 * ---
 * 
 * CONICAL OFFSET: Change Actor(s) Settings
 * - Change the conical light hand offset for target actor(s).
 * 
 *   Actor ID(s):
 *   - Target actor(s) you want to change offset settings for.
 *   - You may use JavaScript code.
 * 
 *   Enable:
 *   - Change the offset settings for the target(s).
 * 
 *   Hand Position Offsets:
 *   - Change target(s)'s offsets used for hand positions.
 * 
 *   VS8 Dash Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while dashing.
 * 
 *   VS8 Jump Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while jumping.
 * 
 * ---
 * 
 * CONICAL OFFSET: Change Event(s) Settings
 * - Change the conical light hand offset for target event(s).
 * 
 *   Event ID(s):
 *   - Target event(s) you want to change offset settings for.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 * 
 *   Enable:
 *   - Change the offset settings for the target(s).
 * 
 *   Hand Position Offsets:
 *   - Change target(s)'s offsets used for hand positions.
 * 
 *   VS8 Dash Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while dashing.
 * 
 *   VS8 Jump Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while jumping.
 * 
 * ---
 *
 * CONICAL LIGHT: Change Ship Settings
 * - Change the conical light hand offset for the Ship vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 *
 * CONICAL LIGHT: Change Airship Settings
 * - Change the conical light hand offset for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 *
 * CONICAL LIGHT: Change Boat Settings
 * - Change the conical light hand offset for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 * 
 * === Spawn Light Plugin Commands ===
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) at Map X/Y
 * - Map only!
 * - Create new light spawn(s) locked to the map.
 * - Use tile coordinates for X and Y.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Coordinates X/Y:
 * 
 *     Origin X:
 *     Origin Y:
 *     - What is the origin X/Y position?
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) at Screen X/Y
 * - Map only!
 * - Create new light spawn(s) locked to the screen.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Coordinates X/Y:
 * 
 *     Origin X:
 *     Origin Y:
 *     - What is the origin X/Y position?
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Player
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Follower
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Target:
 * 
 *     Follower Index:
 *     - Which follower index should the light(s) follow?
 *     - Index starts at 0.
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Event
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Target:
 * 
 *     Event ID:
 *     - Which map event should the light(s) follow?
 *     - Use 0 for "this event".
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * === Light-Related Sub Settings ===
 * 
 * ---
 * 
 * Radial Light Settings
 * 
 *   General:
 * 
 *     Enabled?:
 *     - Is this radial light enabled?
 * 
 *   Properties:
 * 
 *     Filename:
 *     - Filename used for the light effect image.
 *     - If used, ignore Color, Radius, and Intensity.
 *     - Image will be centered on the target where the center of the image is
 *       the anchor point and will be rotated.
 * 
 *     Color:
 *     - Color of the radial light in #rrggbb format.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the radius of this radial light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Intensity:
 *     - Radial light intensity. Use value between 0 & 1.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Optional:
 * 
 *     Angle:
 *     - What is the angle of this radial light?
 *     - Only noticeable with using images.
 * 
 *       Rotate Speed:
 *       - The rotation speed of this light?
 *       - Lower: slower. Higher: faster. Negative: reverse.
 * 
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the radial light?
 * 
 *     Opacity:
 *     - What is the opacity (0 to 255)?
 *     - Lower: dimmer. Higher: Brighter.
 * 
 *   Offsets:
 * 
 *     Offset X:
 *     - Offset the X position of this light.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - Offset the Y position of this light.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Conical Light Settings
 * 
 *   General:
 *   
 *     Enabled?:
 *     - Is this conical light enabled?
 * 
 *   Properties:
 * 
 *     Filename:
 *     - Filename used for the light effect image.
 *     - If used, ignore Radius, Color, and Intensity.
 * 
 *       Angle Offset:
 *       - Offset the image angle by this many degrees.
 *       - Only applies to images.
 * 
 *       File Anchor X:
 *       File Anchor Y:
 *       - Anchor X/Y used for images.
 *       - For X - Left: 0.0; Center: 0.5; Right: 1.0
 *       - For Y - Top: 0.0; Middle: 0.5; Bottom: 1.0
 * 
 *     Color:
 *     - What is the radius of this conical light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the radius of this conical light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *       Source Radius:
 *       - What is the radius of this light source?
 *       - For generated lights only.
 *       - Ignore if using image.
 * 
 *     Intensity:
 *     - Conical light intensity. Use value between 0 & 1.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Optional:
 * 
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the conical light?
 * 
 *     Opacity:
 *     - What is the opacity (0 to 255)?
 *     - Lower: dimmer. Higher: Brighter.
 * 
 *   Angle:
 * 
 *     Arc Angle:
 *     - What is the angle of this conical light's arc?
 * 
 *     Angle Sway:
 *     - How many degrees should this light sway?
 *     - Use 0 for no sway.
 * 
 *     Sway Speed:
 *     - How fast should this light sway?
 *     - Lower: Slower; Higher: Faster
 * 
 *     Randomize Sway?:
 *     - Change the sway to offset at different starting points?
 * 
 *   Direction:
 * 
 *     Forced Direction?:
 *     - Force the conical light to face a certain direction?
 * 
 *     Follow Cursor?
 *     - Follow the mouse cursor?
 * 
 *   Offsets:
 * 
 *     Use Hand Offset?:
 *     - Put the light source on the target's "hand" position?
 *     - Disables the two settings below if on.
 * 
 *     Offset X (Non-Hand):
 *     - Offset the X position of this light.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y (Non-Hand):
 *     - Offset the Y position of this light.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Behavior
 * 
 *   Blink:
 * 
 *     Blink Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Blink Modifier:
 *     - Static multiplicative opacity modifier. Before additive.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flicker:
 * 
 *     Flicker Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flicker Modifier:
 *     - Random multiplicative opacity modifier. Before additive.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flash:
 * 
 *     Flash Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flash Modifier:
 *     - Static additive opacity modifier. Before multiplicative.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flare:
 * 
 *     Flare Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flare Modifier:
 *     - Random additive opacity modifier. Before multiplicative.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Glow:
 * 
 *     Glow Rate:
 *     - What is the glow change for this light?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Glow Speed:
 *     - What is the speed at which glow oscillates at?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Randomize Glow?:
 *     - Offset the glow to oscillate at different starting points?
 * 
 *   Pulse:
 * 
 *     Pulse Rate:
 *     - What is the pulse change for this light?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Pulse Speed:
 *     - What is the speed at which pulse oscillates at?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Randomize Pulse?:
 *     - Offset the pulse to oscillate at different starting points?
 * 
 *   Pattern:
 * 
 *     Pattern Name:
 *     - Select the pattern name for this light.
 *     - Ignore if using any Custom Pattern.
 * 
 *     Custom Pattern:
 *     - Create a custom pattern with letters from a to z.
 *     - Where 'a' is transparent and 'z' is opaque.
 * 
 *     Frame Delay:
 *     - What is the frame delay between pattern updates?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Lighting Settings
 * ============================================================================
 *
 * Lighting settings for the map scene. These settings allow you to adjust the
 * default settings used for the majority of lighting types and behaviors
 * across the player character, followers, events, and the various vehicles.
 *
 * ---
 *
 * General
 * 
 *   Enable For Map?:
 *   - Enable Lighting Effects for map?
 * 
 *   Shake Buffer:
 *   - Screen shakes reveal more of the screen than normal.
 *   - How many pixels of buffer should you provide?
 *
 * ---
 *
 * Player Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Follower Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Event Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Vehicles
 * 
 *   Boat:
 *   Ship:
 *   Airship:
 * 
 *     Boarded:
 * 
 *       Radial Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *       Conical Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *         "Hand" Offsets:
 *         - Default offsets used for the "hand" positions of this vehicle.
 * 
 *     Unboarded:
 * 
 *       Radial Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *       Conical Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *         "Hand" Offsets:
 *         - Default offsets used for the "hand" positions of this vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Hand Position, VS8 Dash, VS8 Jump Offsets
 * ============================================================================
 *
 * Default offsets used for hand positions. These are for conical lights and
 * help determine where the light source should come from to avoid making the
 * conical light look weird by having lights come from the user's face or chest
 * as seen with other lighting plugins.
 * 
 * There are also separate settings for those using VS8 sprites for dashing and
 * jumping positions. Be sure to adjust them accordingly.
 *
 * ---
 *
 * Standard Directions
 * 
 *   Down:
 *   Up:
 *   Left:
 *   Right:
 *   - Offsets to determine conical light source position when facing
 *     this direction.
 * 
 * ---
 * 
 * Diagonal Directions
 * 
 *   Lower Left:
 *   Lower Right:
 *   Upper Left:
 *   Upper Right:
 *   - Offsets to determine conical light source position when facing
 *     this direction.
 *
 * ---
 *
 * Pattern Offsets:
 * 
 *   Pattern 0-10:
 * 
 *     Offset X:
 *     - What is the offset X for this pattern?
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - What is the offset Y for this pattern?
 *     - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Anti-Light Settings
 * ============================================================================
 *
 * Anti-Light regions and terrain tags can be used to mark certain tiles from
 * being affected by light at all. These tiles can be used as ceiling tiles or
 * areas outside of the map boundaries where light doesn't normally reach.
 * 
 * Keep in mind that this does NOT block light from passing through it. If a
 * light source is big enough to engulf the tiles past the anti-light marked
 * tiles, those tiles will still be lit up by any light sources. Therefore, you
 * need to mark those tiles on the map to be anti-light as well in addition to
 * planning out your maps for potential light piercing through the tiles.
 * 
 * There are two kinds of anti-light types. Hard edges and soft edges. Hard
 * Edges are extremely rough and box like. Soft Edges will smooth out towards
 * regularly lit tiles.
 *
 * ---
 *
 * Hard Edges
 * 
 *   Regions:
 *   - Which regions by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 255.
 * 
 *   Terrain Tags:
 *   - Which terrain tags by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 7.
 *
 * ---
 *
 * Soft Edges
 * 
 *   Regions:
 *   - Which regions by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 255.
 * 
 *   Terrain Tags:
 *   - Which terrain tags by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 7.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Lighting Settings
 * ============================================================================
 *
 * Lighting settings for the battle scene. The VisuStella MZ Battle Core is
 * required in order for lighting effects to work in-battle.
 *
 * ---
 *
 * General
 * 
 *   Enable For Battle?:
 *   - Enable Lighting Effects for battles?
 *   - Requires VisuStella MZ Battle Core!
 * 
 * ---
 * 
 * Actor Defaults
 * 
 *   Battle Light:
 *   - Default battle-radial light settings for actors.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for actor radial lights?
 * 
 *     Auto-Calc Radius:
 *     - Automatically calculates the radius size based on sprite's
 *       width/height.
 *     - Ignore if use <Radial Light Radius: x>.
 *
 * ---
 * 
 * Enemy Defaults
 * 
 *   Battle Light:
 *   - Default battle-radial light settings for enemies.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for enemy radial lights?
 * 
 *     Auto-Calc Radius:
 *     - Automatically calculates the radius size based on sprite's
 *       width/height.
 *     - Ignore if use <Radial Light Radius: x>.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Light Regions Settings
 * ============================================================================
 *
 * Tiles marked with these regions will automatically have white light spawned
 * on top of them. However, depending on the group the region belongs to, the
 * light spawned will have varying degrees of opacity. This means some places
 * can be less lit while others can be darker.
 * 
 * This can be used to light up certain parts of the map automatically while
 * requiring others to be lit with standard lighting.
 * 
 * This is also helpful for those who wish to keep their parallax fully lit
 * (since it will be affected by the darkness overlay) without having to put in
 * a lot of light sources.
 *
 * ---
 *
 * Auto-Light Regions
 * 
 *   Opacity - 100%:
 *   to
 *   Opacity - 5%:
 *   - Mark the regions with this opacity level.
 *   - Light color will be white. Use Region ID's (1 to 255).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Preset Color Settings
 * ============================================================================
 *
 * If you happen to not like the preset colors used by this plugin, you can
 * redefine them using different hexidecimal values for you own touch. If you
 * are unsure of what the hexidecimal values are, please use an online site
 * like: https://htmlcolorcodes.com/
 *
 * ---
 *
 * Daytime Colors
 * Greyscale Colors
 * Red Colors
 * Orange Colors
 * Yellow Colors
 * Green Colors
 * Cyan Colors
 * Blue Colors
 * Purple Colors
 * Magenta Colors
 * Pink Colors
 * Brown Colors
 * Misc Colors
 * 
 *   Preset Color Name:
 *   - Preset's hex color in #rrggbb format.
 *   - Check your color here: https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * Lighting settings for the options scene. These are for the players who
 * aren't fond of blinking or oscillating lights in case they bother them.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *   - Ignore if using the VisuStella MZ Options Core.
 * 
 * ---
 * 
 * Blinking Lights
 * 
 *   Add Option?:
 *   - Add the 'Blinking Lights' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 * 
 * Pulsing Lights
 * 
 *   Add Option?:
 *   - Add the 'Pulsing Lights' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Radial Light Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary properties of radial lights for the specific
 * user type.
 *
 * --- 
 * 
 * General:
 * 
 *   Enabled?:
 *   - Is this radial light enabled?
 * 
 * ---
 * 
 * Properties:
 * 
 *   Filename:
 *   - Filename used for the light effect image.
 *   - If used, ignore Color, Radius, and Intensity.
 *   - Image will be centered on the target where the center of the image is
 *     the anchor point and will be rotated.
 * 
 *   Color:
 *   - Color of the radial light in #rrggbb format.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the radius of this radial light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Intensity:
 *   - Radial light intensity. Use value between 0 & 1.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Optional:
 * 
 *   Angle:
 *   - What is the angle of this radial light?
 *   - Only noticeable with using images.
 * 
 *     Rotate Speed:
 *     - The rotation speed of this light?
 *     - Lower: slower. Higher: faster. Negative: reverse.
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the radial light?
 * 
 *   Opacity:
 *   - What is the opacity (0 to 255)?
 *   - Lower: dimmer. Higher: Brighter.
 * 
 * ---
 * 
 * Offsets:
 * 
 *   Offset X:
 *   - Offset the X position of this light.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Y position of this light.
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conical Light Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary properties of conical lights for the specific
 * user type.
 *
 * --- 
 * 
 * General:
 * 
 *   Enabled?:
 *   - Is this conical light enabled?
 * 
 * ---
 * 
 * Properties:
 * 
 *   Filename:
 *   - Filename used for the light effect image.
 *   - If used, ignore Radius, Color, and Intensity.
 * 
 *     Angle Offset:
 *     - Offset the image angle by this many degrees.
 *     - Only applies to images.
 * 
 *     File Anchor X:
 *     File Anchor Y:
 *     - Anchor X/Y used for images.
 *     - For X - Left: 0.0; Center: 0.5; Right: 1.0
 *     - For Y - Top: 0.0; Middle: 0.5; Bottom: 1.0
 * 
 *   Color:
 *   - What is the radius of this conical light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the radius of this conical light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *     Source Radius:
 *     - What is the radius of this light source?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Intensity:
 *   - Conical light intensity. Use value between 0 & 1.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Optional:
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the radial light?
 * 
 *   Opacity:
 *   - What is the opacity (0 to 255)?
 *   - Lower: dimmer. Higher: Brighter.
 * 
 * ---
 * 
 * Angle:
 * 
 *   Arc Angle:
 *   - What is the angle of this conical light's arc?
 * 
 *   Angle Sway:
 *   - How many degrees should this light sway?
 *   - Use 0 for no sway.
 * 
 *   Sway Speed:
 *   - How fast should this light sway?
 *   - Lower: Slower; Higher: Faster
 * 
 *   Randomize Sway?:
 *   - Change the sway to offset at different starting points?
 * 
 * ---
 * 
 * Direction:
 * 
 *   Forced Direction?:
 *   - Force the conical light to face a certain direction?
 * 
 *   Follow Cursor?
 *   - Follow the mouse cursor?
 * 
 * ---
 * 
 * Offsets:
 * 
 *   Offset X:
 *   - Offset the X position of this light.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Y position of this light.
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Light Behavior Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary patterns of how lights behave for the specific
 * user type.
 *
 * --- 
 * 
 * Blink:
 * 
 *   Blink Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Blink Modifier:
 *   - Static multiplicative opacity modifier. Before additive.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flicker:
 * 
 *   Flicker Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flicker Modifier:
 *   - Random multiplicative opacity modifier. Before additive.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flash:
 * 
 *   Flash Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flash Modifier:
 *   - Static additive opacity modifier. Before multiplicative.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flare:
 * 
 *   Flare Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flare Modifier:
 *   - Random additive opacity modifier. Before multiplicative.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Glow:
 * 
 *   Glow Rate:
 *   - What is the glow change for this light?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Glow Speed:
 *   - What is the speed at which glow oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Randomize Glow?:
 *   - Offset the glow to oscillate at different starting points?
 * 
 * ---
 * 
 * Pulse:
 * 
 *   Pulse Rate:
 *   - What is the pulse change for this light?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Pulse Speed:
 *   - What is the speed at which pulse oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Randomize Pulse?:
 *   - Offset the pulse to oscillate at different starting points?
 * 
 * ---
 * 
 * Pattern:
 * 
 *   Pattern Name:
 *   - Select the pattern name for this light.
 *   - Ignore if using any Custom Pattern.
 * 
 *   Custom Pattern:
 *   - Create a custom pattern with letters from a to z.
 *   - Where 'a' is transparent and 'z' is opaque.
 * 
 *   Frame Delay:
 *   - What is the frame delay between pattern updates?
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: May 5, 2022
 * * Bug Fixes!
 * ** Vehicles no longer auto put out light in the upper left corner of the map
 *    when they have no graphic. Fix made by Irina.
 * 
 * Version 1.02: March 31, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Hard Anti-Light Regions: x, x, x>
 * *** <Hard Anti-Light Terrain Tags: x, x, x>
 * *** <Soft Anti-Light Regions: x, x, x>
 * *** <Soft Anti-Light Terrain Tags: x, x, x>
 * **** Tiles marked by these regions/terrain tags won't have any light shown
 *      on them.
 * **** This does NOT block light from going to the other side. If the light
 *      radius is large enough, it will pierce through to the other side. It
 *      just won't be visible on the region marked tiles.
 * ** New Plugin Parameters added by Irina:
 * *** Anti-Light Settings
 * **** Anti-Light regions and terrain tags can be used to mark certain tiles
 *      from being affected by light at all. These tiles can be used as ceiling
 *      tiles or areas outside of the map boundaries where light doesn't
 *      normally reach.
 * **** Keep in mind that this does NOT block light from passing through it. If
 *      a light source is big enough to engulf the tiles past the anti-light
 *      marked tiles, those tiles will still be lit up by any light sources.
 *      Therefore, you need to mark those tiles on the map to be anti-light as
 *      well in addition to planning out your maps for potential light piercing
 *      through the tiles.
 * **** There are two kinds of anti-light types. Hard edges and soft edges.
 *      Hard Edges are extremely rough and box like. Soft Edges will smooth out
 *      towards regularly lit tiles.
 * 
 * Version 1.01: March 24, 2022
 * * Bug Fixes!
 * ** Updated battle radial light positions for games where the UI resolution
 *    is not the same as the Screen resolution. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update
 * ** Changed the position of "Use Hand Offset?" in the Plugin Parameters for
 *    more clarity in regards to Conical Lights.
 * ** Added "(Non-Hand)" to the respective Offset X and Offset Y plugin
 *    parameter names for those who missed the description of the previous
 *    Plugin Parameter.
 * * New Features!
 * ** New Plugin Parameters added by Irina.
 * *** Plugin Parameters > Preset Colors Settings
 * **** You can now define what hex codes are used for each preset color.
 * 
 * Version 1.00 Official Release Date: April 8, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Overlay
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Overlay
 * @text Category - Overlay
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OverlayChangeToPreset
 * @text OVERLAY: Change to Preset Color
 * @desc Change current darkness overlay to a preset color and opacity level.
 *
 * @arg Color:str
 * @text Color
 * @type select
 * @option Normal
 * @option -
 * @option Dawn
 * @option Day
 * @option Dusk
 * @option Night
 * @option -
 * @option White
 * @option Light Grey
 * @option Grey
 * @option Dark Grey
 * @option Black
 * @option -
 * @option Light Red
 * @option Red
 * @option Dark Red
 * @option -
 * @option Light Orange
 * @option Orange
 * @option Dark Orange
 * @option -
 * @option Light Yellow
 * @option Yellow
 * @option Dark Yellow
 * @option -
 * @option Light Green
 * @option Green
 * @option Dark Green
 * @option -
 * @option Light Cyan
 * @option Cyan
 * @option Dark Cyan
 * @option -
 * @option Light Blue
 * @option Blue
 * @option Dark Blue
 * @option -
 * @option Light Purple
 * @option Purple
 * @option Dark Purple
 * @option -
 * @option Light Magenta
 * @option Magenta
 * @option Dark Magenta
 * @option -
 * @option Light Pink
 * @option Pink
 * @option Dark Pink
 * @option -
 * @option Light Brown
 * @option Brown
 * @option Dark Brown
 * @option -
 * @desc Pick a preset color. This will also come with predetermined opacity values.
 * @default Night
 *
 * @arg Duration:num
 * @text Duration
 * @desc What is the duration of the color change?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OverlayChangeToCustomColor
 * @text OVERLAY: Change to Custom Color
 * @desc Change current darkness overlay to a custom color.
 *
 * @arg Color:str
 * @text Color
 * @desc Custom color. This uses #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @arg Opacity:num
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity level of the color. Value between 0-255.
 * Transparent: 0. Opaque: 255.
 * @default 255
 *
 * @arg Duration:num
 * @text Duration
 * @desc What is the duration of the color change?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_BattleLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_BattleLight
 * @text Category - Battle Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleLightChangeActorSettings
 * @text BATTLE LIGHT: Change Actor(s) Settings
 * @desc Change the battle-radial light settings for target(s).
 * 
 * @arg ActorID:arrayeval
 * @text Actor ID(s)
 * @type actor[]
 * @desc Target actor(s) you want to change light settings for.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the target(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg AutoRadius:eval
 * @text Auto-Calc Radius
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleLightChangeEnemySettings
 * @text BATTLE LIGHT: Change Enemy(s) Settings
 * @desc Change the battle-radial light settings for target(s).
 *
 * @arg EnemyIndex:arrayeval
 * @text Enemy Index(es)
 * @type string[]
 * @desc Select enemy troop index(es) to change light settings for.
 * You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the target(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg AutoRadius:eval
 * @text Auto-Calc Radius
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_RadialLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_RadialLight
 * @text Category - Radial Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangePlayerSettings
 * @text RADIAL LIGHT: Change Player Settings
 * @desc Change the radial light settings for the player.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeFollowerSettings
 * @text RADIAL LIGHT: Change Follower Settings
 * @desc Change the radial light settings for followers.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for all followers.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeEventSettings
 * @text RADIAL LIGHT: Change Event(s) Settings
 * @desc Change the radial light settings for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) to have their light settings changed.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for target event(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"72","color:str":"#ffffff","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeBoatSettings
 * @text RADIAL LIGHT: Change Boat Settings
 * @desc Change the radial light settings for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"240","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * @parent Boat
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeShipSettings
 * @text RADIAL LIGHT: Change Ship Settings
 * @desc Change the radial light settings for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"300","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"160","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeAirshipSettings
 * @text RADIAL LIGHT: Change Airship Settings
 * @desc Change the radial light settings for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"360","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"192","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ConicalLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_ConicalLight
 * @text Category - Conical Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangePlayerSettings
 * @text CONICAL LIGHT: Change Player Settings
 * @desc Change the conical light settings for the player.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"true","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeFollowerSettings
 * @text CONICAL LIGHT: Change Follower Settings
 * @desc Change the conical light settings for followers.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for all followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeEventSettings
 * @text CONICAL LIGHT: Change Event(s) Settings
 * @desc Change the conical light settings for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) to have their light settings changed.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for target event(s).
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeBoatSettings
 * @text CONICAL LIGHT: Change Boat Settings
 * @desc Change the conical light settings for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeShipSettings
 * @text CONICAL LIGHT: Change Ship Settings
 * @desc Change the conical light settings for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeAirshipSettings
 * @text CONICAL LIGHT: Change Airship Settings
 * @desc Change the conical light settings for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ConicalOffset
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_ConicalOffset
 * @text Category - Conical Offset
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeActor
 * @text CONICAL OFFSET: Change Actor(s) Settings
 * @desc Change the conical light hand offset for target actor(s).
 * 
 * @arg ActorID:arrayeval
 * @text Actor ID(s)
 * @type actor[]
 * @desc Target actor(s) you want to change offset settings for.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Change the offset settings for the target(s).
 * @default true
 * 
 * @arg HandOffset:struct
 * @text Hand Position Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeEvent
 * @text CONICAL OFFSET: Change Event(s) Settings
 * @desc Change the conical light hand offset for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) you want to change offset settings for.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Change the offset settings for the target(s).
 * @default true
 * 
 * @arg HandOffset:struct
 * @text Hand Position Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeBoat
 * @text CONICAL OFFSET: Change Boat Settings
 * @desc Change the conical light hand offset for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeShip
 * @text CONICAL OFFSET: Change Ship Settings
 * @desc Change the conical light hand offset for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeAirship
 * @text CONICAL OFFSET: Change Airship Settings
 * @desc Change the conical light hand offset for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_LightSpawns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_LightSpawns
 * @text Category - Spawn Light(s)
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewMapLockedLight
 * @text SPAWN LIGHT: Create Light(s) at Map X/Y
 * @desc Map only! Create new light spawn(s) locked to the map.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Coordinates
 * @text Coordinates X/Y
 *
 * @arg CoordinatesX:eval
 * @text Origin X
 * @parent Coordinates
 * @desc What is the origin X position?
 * You may use JavaScript code.
 * @default $gamePlayer.x
 *
 * @arg CoordinatesY:eval
 * @text Origin Y
 * @parent Coordinates
 * @desc What is the origin Y position?
 * You may use JavaScript code.
 * @default $gamePlayer.y
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewScreenLockedLight
 * @text SPAWN LIGHT: Create Light(s) at Screen X/Y
 * @desc Map only! Create new light spawn(s) locked to the screen.
 * The light spawn(s) is unaffected by map scrolling.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Coordinates
 * @text Coordinates X/Y
 *
 * @arg CoordinatesX:eval
 * @text Origin X
 * @parent Coordinates
 * @desc What is the origin X position?
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg CoordinatesY:eval
 * @text Origin Y
 * @parent Coordinates
 * @desc What is the origin Y position?
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewPlayerLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Player
 * @desc Map only! Create new light spawn(s) following the player.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewFollowerLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Follower
 * @desc Map only! Create new light spawn(s) following a follower.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Target
 * @text Target
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @parent Target
 * @desc Which follower index should the light(s) follow?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewEventLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Event
 * @desc Map only! Create new light spawn(s) following an event.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Target
 * @text Target
 *
 * @arg EventID:eval
 * @text Event ID
 * @parent Target
 * @desc Which map event should the light(s) follow?
 * Use 0 for "this event". You may use JavaScript code.
 * @default 0
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnExpireSpawnedLights
 * @text SPAWN LIGHT: Expire All Spawned Light(s)
 * @desc Map only! Expires all spawned lights.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param LightingEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map:struct
 * @text Map Lighting Settings
 * @type struct<Map>
 * @desc Lighting settings for the map scene.
 * @default {"General":"","Enable:eval":"true","ShakeBuffer:num":"80","PlayerDefaults":"","PlayerRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"216\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","PlayerRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","PlayerConical:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.1\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","PlayerConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","FollowerDefaults":"","FollowerRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"216\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","FollowerRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","FollowerConical:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"followMouse:eval\":\"false\",\"useHandOffset:eval\":\"true\",\"forceDirection:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","FollowerConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EventDefaults":"","EventRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"72\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EventRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EventConical:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"followMouse:eval\":\"false\",\"useHandOffset:eval\":\"true\",\"forceDirection:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EventConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","Vehicles":"","Boat":"","BoatBoarded":"","BoatBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","BoatUnboarded":"","BoatUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","Ship":"","ShipBoarded":"","ShipBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"300\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"160\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"480\",\"miniRadius:num\":\"16\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"75\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-24\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-23\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-24\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","ShipUnboarded":"","ShipUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"480\",\"miniRadius:num\":\"16\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"75\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-24\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-23\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-24\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","Airship":"","AirshipBoarded":"","AirshipBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"192\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"600\",\"miniRadius:num\":\"32\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"90\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","AirshipUnboarded":"","AirshipUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"600\",\"miniRadius:num\":\"32\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"90\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}"}
 * 
 * @param HandOffset:struct
 * @text Hand Position Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param Battle:struct
 * @text Battle Lighting Settings
 * @type struct<Battle>
 * @desc Lighting settings for the battle scene.
 * Requires VisuMZ_1_BattleCore!
 * @default {"General":"","Enable:eval":"true","ActorDefaults":"","ActorRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"64\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ActorRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ActorAutoRadius:eval":"true","EnemyDefaults":"","EnemyRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"64\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EnemyRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EnemyAutoRadius:eval":"true"}
 *
 * @param AntiLight:struct
 * @text Anti-Light Settings
 * @type struct<AntiLight>
 * @desc Settings to determine default anti-light tile markers.
 * @default {"Hard":"","HardRegions:arraynum":"[]","HardTerrainTags:arraynum":"[]","Soft":"","SoftRegions:arraynum":"[]","SoftTerrainTags:arraynum":"[]"}
 *
 * @param AutoLight:struct
 * @text Auto-Light Regions
 * @type struct<AutoLight>
 * @desc Light up specific parts of the map with regions.
 * @default {"opacity100:arraynum":"[]","opacity95:arraynum":"[]","opacity90:arraynum":"[]","opacity85:arraynum":"[]","opacity80:arraynum":"[]","opacity75:arraynum":"[]","opacity70:arraynum":"[]","opacity65:arraynum":"[]","opacity60:arraynum":"[]","opacity55:arraynum":"[]","opacity50:arraynum":"[]","opacity45:arraynum":"[]","opacity40:arraynum":"[]","opacity35:arraynum":"[]","opacity30:arraynum":"[]","opacity25:arraynum":"[]","opacity20:arraynum":"[]","opacity15:arraynum":"[]","opacity10:arraynum":"[]","opacity5:arraynum":"[]"}
 *
 * @param PresetColors:struct
 * @text Preset Colors Settings
 * @type struct<PresetColors>
 * @desc Preset Color settings for this plugin.
 * @default {"Daytime":"","dawn:str":"#5674b9","day:str":"#ffffff","dusk:str":"#f7941d","night:str":"#2e3192","Greyscale":"","white:str":"#ffffff","light grey:str":"#aaaaaa","grey:str":"#888888","dark grey:str":"#444444","black:str":"#000000","Reds":"","light red:str":"#f69679","red:str":"#ff0000","dark red:str":"#790000","Oranges":"","light orange:str":"#fdc689","orange:str":"#f7941d","dark orange:str":"#7d4900","Yellows":"","light yellow:str":"#fff799","yellow:str":"#ffff00","dark yellow:str":"#827b00","Greens":"","light green:str":"#a3d39c","green:str":"#00ff00","dark green:str":"#005e20","Cyans":"","light cyan:str":"#7accc8","cyan:str":"#00ffff","dark cyan:str":"#005952","Blues":"","light blue:str":"#ace4fa","blue:str":"#0000ff","dark blue:str":"#003663","Purples":"","light purple:str":"#a186be","purple:str":"#92278f","dark purple:str":"#32004b","Magentas":"","light magenta:str":"#bd8cbf","magenta:str":"#ff00ff","dark magenta:str":"#7b0046","Pinks":"","light pink:str":"#f49ac1","pink:str":"#f06eaa","dark pink:str":"#9e0039","Browns":"","light brown:str":"#c69c6d","brown:str":"#8c6239","dark brown:str":"#603913","Misc":"","normal:str":"#ffffff","none:str":"#ffffff","dark:str":"#000000","null:str":"#000000"}
 *
 * @param Options:struct
 * @text Options Menu Settings
 * @type struct<Options>
 * @desc Lighting settings for the options scene.
 * @default {"Options":"","AdjustRect:eval":"true","BlinkingLights":"","AddBlinkingLights:eval":"true","BlinkingLightsName:str":"Blinking Lights","PulsingLights":"","AddPulsingLights:eval":"true","PulsingLightsName:str":"Pulsing Lights"}
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
 * Map Lighting Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Map:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable For Map?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Lighting Effects for map?
 * @default true
 *
 * @param ShakeBuffer:num
 * @text Shake Buffer
 * @parent General
 * @type number
 * @desc Screen shakes reveal more of the screen than normal.
 * How many pixels of buffer should you provide?
 * @default 80
 *
 * @param PlayerDefaults
 * @text Player Defaults
 * 
 * @param PlayerRadial:struct
 * @text Radial Light
 * @parent PlayerDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param PlayerRadialBehavior:struct
 * @text Default Behavior
 * @parent PlayerRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for the player radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param PlayerConical:struct
 * @text Conical Light
 * @parent PlayerDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"true","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param PlayerConicalBehavior:struct
 * @text Default Behavior
 * @parent PlayerConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for the player conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param FollowerDefaults
 * @text Follower Defaults
 * 
 * @param FollowerRadial:struct
 * @text Radial Light
 * @parent FollowerDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param FollowerRadialBehavior:struct
 * @text Default Behavior
 * @parent FollowerRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for follower radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param FollowerConical:struct
 * @text Conical Light
 * @parent FollowerDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param FollowerConicalBehavior:struct
 * @text Default Behavior
 * @parent FollowerConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for follower conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param EventDefaults
 * @text Event Defaults
 * 
 * @param EventRadial:struct
 * @text Radial Light
 * @parent EventDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for events.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","radius:num":"72","color:str":"#ffffff","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EventRadialBehavior:struct
 * @text Default Behavior
 * @parent EventRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for event radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param EventConical:struct
 * @text Conical Light
 * @parent EventDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for events.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EventConicalBehavior:struct
 * @text Default Behavior
 * @parent EventConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for event conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param Vehicles
 * 
 * @param Boat
 * @parent Vehicles
 *
 * @param BoatBoarded
 * @text Boarded
 * @parent Boat
 * 
 * @param BoatBoardedRadialSettings:struct
 * @text Radial Light
 * @parent BoatBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"240","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent BoatBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatBoardedConicalSettings:struct
 * @text Conical Light
 * @parent BoatBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent BoatBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent BoatBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param BoatUnboarded
 * @text Unboarded
 * @parent Boat
 * 
 * @param BoatUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent BoatUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent BoatUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent BoatUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent BoatUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent BoatUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param Ship
 * @parent Vehicles
 *
 * @param ShipBoarded
 * @text Boarded
 * @parent Ship
 * 
 * @param ShipBoardedRadialSettings:struct
 * @text Radial Light
 * @parent ShipBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"300","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"160","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent ShipBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipBoardedConicalSettings:struct
 * @text Conical Light
 * @parent ShipBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent ShipBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent ShipBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param ShipUnboarded
 * @text Unboarded
 * @parent Ship
 * 
 * @param ShipUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent ShipUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent ShipUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent ShipUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent ShipUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent ShipUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param Airship
 * @parent Vehicles
 *
 * @param AirshipBoarded
 * @text Boarded
 * @parent Airship
 * 
 * @param AirshipBoardedRadialSettings:struct
 * @text Radial Light
 * @parent AirshipBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"360","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"192","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent AirshipBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipBoardedConicalSettings:struct
 * @text Conical Light
 * @parent AirshipBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent AirshipBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent AirshipBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param AirshipUnboarded
 * @text Unboarded
 * @parent Airship
 * 
 * @param AirshipUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent AirshipUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent AirshipUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent AirshipUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent AirshipUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent AirshipUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Lighting Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battle:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable For Battle?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Lighting Effects for battles?
 * Requires VisuMZ_1_BattleCore!
 * @default true
 * 
 * @param ActorDefaults
 * @text Actor Defaults
 * 
 * @param ActorRadial:struct
 * @text Battle Light
 * @parent ActorDefaults
 * @type struct<Radial>
 * @desc Default battle-radial light settings for actors.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ActorRadialBehavior:struct
 * @text Default Behavior
 * @parent ActorRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for actor radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param ActorAutoRadius:eval
 * @text Auto-Calc Radius
 * @parent ActorRadial:struct
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height. Ignore if use <Radial Light Radius: x>.
 * @default true
 * 
 * @param EnemyDefaults
 * @text Enemy Defaults
 * 
 * @param EnemyRadial:struct
 * @text Battle Light
 * @parent EnemyDefaults
 * @type struct<Radial>
 * @desc Default battle-radial light settings for enemies.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EnemyRadialBehavior:struct
 * @text Default Behavior
 * @parent EnemyRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for enemy radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param EnemyAutoRadius:eval
 * @text Auto-Calc Radius
 * @parent EnemyRadial:struct
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height. Ignore if use <Radial Light Radius: x>.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Anti-Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AntiLight:
 *
 * @param Hard
 * @text Hard Edges
 *
 * @param HardRegions:arraynum
 * @text Regions
 * @parent Hard
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 255.
 * @default []
 *
 * @param HardTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Hard
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 7.
 * @default []
 *
 * @param Soft
 * @text Soft Edges
 *
 * @param SoftRegions:arraynum
 * @text Regions
 * @parent Soft
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 255.
 * @default []
 *
 * @param SoftTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Soft
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 7.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Auto-Light Regions Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoLight:
 *
 * @param opacity100:arraynum
 * @text Opacity - 100%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity95:arraynum
 * @text Opacity - 95%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity90:arraynum
 * @text Opacity - 90%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity85:arraynum
 * @text Opacity - 85%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity80:arraynum
 * @text Opacity - 80%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity75:arraynum
 * @text Opacity - 75%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity70:arraynum
 * @text Opacity - 70%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity65:arraynum
 * @text Opacity - 65%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity60:arraynum
 * @text Opacity - 60%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity55:arraynum
 * @text Opacity - 55%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity50:arraynum
 * @text Opacity - 50%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity45:arraynum
 * @text Opacity - 45%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity40:arraynum
 * @text Opacity - 40%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity35:arraynum
 * @text Opacity - 35%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity30:arraynum
 * @text Opacity - 30%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity25:arraynum
 * @text Opacity - 25%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity20:arraynum
 * @text Opacity - 20%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity15:arraynum
 * @text Opacity - 15%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity10:arraynum
 * @text Opacity - 10%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity5:arraynum
 * @text Opacity - 5%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Preset Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PresetColors:
 *
 * @param Daytime
 * @text Daytime Colors
 *
 * @param dawn:str
 * @text Dawn
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #5674b9
 *
 * @param day:str
 * @text Day
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param dusk:str
 * @text Dusk
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f7941d
 *
 * @param night:str
 * @text Night
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #2e3192
 *
 * @param Greyscale
 * @text Greyscale Colors
 *
 * @param white:str
 * @text White
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param light grey:str
 * @text Light Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #aaaaaa
 *
 * @param grey:str
 * @text Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #888888
 *
 * @param dark grey:str
 * @text Dark Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #444444
 *
 * @param black:str
 * @text Black
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @param Reds
 * @text Red Colors
 *
 * @param light red:str
 * @text Light Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f69679
 *
 * @param red:str
 * @text Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ff0000
 *
 * @param dark red:str
 * @text Dark Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #790000
 *
 * @param Oranges
 * @text Orange Colors
 *
 * @param light orange:str
 * @text Light Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #fdc689
 *
 * @param orange:str
 * @text Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f7941d
 *
 * @param dark orange:str
 * @text Dark Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7d4900
 *
 * @param Yellows
 * @text Yellow Colors
 *
 * @param light yellow:str
 * @text Light Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #fff799
 *
 * @param yellow:str
 * @text Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffff00
 *
 * @param dark yellow:str
 * @text Dark Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #827b00
 *
 * @param Greens
 * @text Green Colors
 *
 * @param light green:str
 * @text Light Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #a3d39c
 *
 * @param green:str
 * @text Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #00ff00
 *
 * @param dark green:str
 * @text Dark Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #005e20
 *
 * @param Cyans
 * @text Cyan Colors
 *
 * @param light cyan:str
 * @text Light Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7accc8
 *
 * @param cyan:str
 * @text Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #00ffff
 *
 * @param dark cyan:str
 * @text Dark Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #005952
 *
 * @param Blues
 * @text Blue Colors
 *
 * @param light blue:str
 * @text Light Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ace4fa
 *
 * @param blue:str
 * @text Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #0000ff
 *
 * @param dark blue:str
 * @text Dark Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #003663
 *
 * @param Purples
 * @text Purple Colors
 *
 * @param light purple:str
 * @text Light Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #a186be
 *
 * @param purple:str
 * @text Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #92278f
 *
 * @param dark purple:str
 * @text Dark Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #32004b
 *
 * @param Magentas
 * @text Magenta Colors
 *
 * @param light magenta:str
 * @text Light Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #bd8cbf
 *
 * @param magenta:str
 * @text Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ff00ff
 *
 * @param dark magenta:str
 * @text Dark Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7b0046
 *
 * @param Pinks
 * @text Pink Colors
 *
 * @param light pink:str
 * @text Light Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f49ac1
 *
 * @param pink:str
 * @text Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f06eaa
 *
 * @param dark pink:str
 * @text Dark Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #9e0039
 *
 * @param Browns
 * @text Brown Colors
 *
 * @param light brown:str
 * @text Light Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #c69c6d
 *
 * @param brown:str
 * @text Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #8c6239
 *
 * @param dark brown:str
 * @text Dark Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #603913
 *
 * @param Misc
 * @text Misc Colors
 *
 * @param normal:str
 * @text Normal
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param none:str
 * @text None
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param dark:str
 * @text Dark
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @param null:str
 * @text Null
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param BlinkingLights
 * @text Blinking Lights
 *
 * @param AddBlinkingLights:eval
 * @text Add Option?
 * @parent BlinkingLights
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Blinking Lights' option to the Options menu?
 * @default true
 *
 * @param BlinkingLightsName:str
 * @text Option Name
 * @parent BlinkingLights
 * @desc Command name of the option.
 * @default Blinking Lights
 *
 * @param PulsingLights
 * @text Pulsing Lights
 *
 * @param AddPulsingLights:eval
 * @text Add Option?
 * @parent PulsingLights
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Pulsing Lights' option to the Options menu?
 * @default true
 *
 * @param PulsingLightsName:str
 * @text Option Name
 * @parent PulsingLights
 * @desc Command name of the option.
 * @default Pulsing Lights
 *
 */
/* ----------------------------------------------------------------------------
 * Radial Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Radial:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Is this radial light enabled?
 * @default true
 *
 * @param Properties
 *
 * @param filename:str
 * @text Filename
 * @parent Properties
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for the light effect image.
 * If used, ignore Color, Radius, and Intensity.
 * @default 
 *
 * @param color:str
 * @text Color
 * @parent Properties
 * @desc Color of the radial light in #rrggbb format.
 * For generated lights only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Properties
 * @type number
 * @min 1
 * @desc What is the radius of this radial light?
 * For generated lights only. Ignore if using image.
 * @default 72
 *
 * @param intensity:num
 * @text Intensity
 * @parent Properties
 * @desc Radial light intensity. Use value between 0 & 1.
 * For generated lights only. Ignore if using image.
 * @default 0.50
 *
 * @param Optional
 * 
 * @param angle:num
 * @text Angle
 * @parent Optional
 * @type number
 * @min 0
 * @max 360
 * @desc What is the angle of this radial light?
 * Only noticeable with using images.
 * @default 0
 * 
 * @param rotateSpeed:num
 * @text Rotate Speed
 * @parent angle:num
 * @type number
 * @desc The rotation speed of this light?
 * Lower: slower. Higher: faster. Negative: reverse.
 * @default +0
 *
 * @param blendMode:num
 * @text Blend Mode
 * @parent Optional
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the radial light?
 * @default 3
 *
 * @param opacity:num
 * @text Opacity
 * @parent Optional
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity (0 to 255)?
 * Lower: dimmer. Higher: Brighter.
 * @default 255
 *
 * @param Offsets
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offsets
 * @desc Offset the X position of this light.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offsets
 * @desc Offset the Y position of this light.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Conical Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conical:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Is this conical light enabled?
 * @default true
 *
 * @param Properties
 *
 * @param filename:str
 * @text Filename
 * @parent Properties
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for the light effect image.
 * If used, ignore Color, Radius, and Intensity.
 * @default 
 * 
 * @param fileAngleOffset:num
 * @text Angle Offset
 * @parent filename:str
 * @type number
 * @min 0
 * @max 360
 * @desc Offset the image angle by this many degrees.
 * Only applies to images.
 * @default 0
 *
 * @param fileAnchorX:num
 * @text File Anchor X
 * @parent filename:str
 * @desc Anchor X used for images.
 * Left: 0.0; Center: 0.5; Right: 1.0
 * @default 0.5
 *
 * @param fileAnchorY:num
 * @text File Anchor Y
 * @parent filename:str
 * @desc Anchor Y used for images.
 * Top: 0.0; Middle: 0.5; Bottom: 1.0
 * @default 0.5
 *
 * @param color:str
 * @text Color
 * @parent Properties
 * @desc Color of the conical light in #rrggbb format.
 * For generated lights only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Properties
 * @type number
 * @min 1
 * @desc What is the radius of this conical light?
 * For generated lights only. Ignore if using image.
 * @default 240
 *
 * @param miniRadius:num
 * @text Source Radius
 * @parent radius:num
 * @type number
 * @min 1
 * @desc What is the radius of this light source?
 * For generated lights only. Ignore if using image.
 * @default 8
 *
 * @param intensity:num
 * @text Intensity
 * @parent Properties
 * @desc Conical light intensity. Use value between 0 & 1.
 * For generated lights only. Ignore if using image.
 * @default 0.25
 *
 * @param Optional
 *
 * @param blendMode:num
 * @text Blend Mode
 * @parent Optional
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the conical light?
 * @default 3
 *
 * @param opacity:num
 * @text Opacity
 * @parent Optional
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity (0 to 255)?
 * Lower: dimmer. Higher: Brighter.
 * @default 255
 *
 * @param AngleSettings
 * @text Angle
 * 
 * @param angle:num
 * @text Arc Angle
 * @parent AngleSettings
 * @type number
 * @min 0
 * @max 360
 * @desc What is the angle of this conical light's arc?
 * @default 60
 * 
 * @param angleSway:num
 * @text Angle Sway
 * @parent AngleSettings
 * @type number
 * @desc How many degrees should this light sway?
 * Use 0 for no sway.
 * @default 6
 * 
 * @param swaySpeed:num
 * @text Sway Speed
 * @parent AngleSettings
 * @type number
 * @desc How fast should this light sway?
 * Lower: Slower; Higher: Faster
 * @default 0.1
 *
 * @param swayRng:eval
 * @text Randomize Sway?
 * @parent AngleSettings
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Change the sway to offset at different starting points?
 * @default true
 *
 * @param Direction
 *
 * @param forceDirection:num
 * @text Forced Direction?
 * @parent Direction
 * @type select
 * @option none
 * @value 0
 * @option lower left
 * @value 1
 * @option down
 * @value 2
 * @option lower right
 * @value 3
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option upper left
 * @value 7
 * @option up
 * @value 8
 * @option upper right
 * @value 9
 * @desc Force the conical light to face a certain direction?
 * @default 0
 *
 * @param followMouse:eval
 * @text Follow Cursor?
 * @parent Direction
 * @type boolean
 * @on Follow Mouse
 * @off Don't Follow
 * @desc Follow the mouse cursor?
 * @default false
 *
 * @param Offsets
 *
 * @param useHandOffset:eval
 * @text Use Hand Offset?
 * @parent Offsets
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Put the light source on the target's "hand" position? Disables the two settings below if on.
 * @default true
 *
 * @param offsetX:num
 * @text Offset X (Non-Hand)
 * @parent Offsets
 * @desc Offset the X position of this light.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y (Non-Hand)
 * @parent Offsets
 * @desc Offset the Y position of this light.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Light Behavior Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Behavior:
 *
 * @param Blink
 *
 * @param blinkRate:num
 * @text Blink Rate
 * @parent Blink
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param blinkModifier:num
 * @text Blink Modifier
 * @parent Blink
 * @desc Static multiplicative opacity modifier. Before additive.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default -0.50
 *
 * @param Flicker
 *
 * @param flickerRate:num
 * @text Flicker Rate
 * @parent Flicker
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flickerModifier:num
 * @text Flicker Modifier
 * @parent Flicker
 * @desc Random multiplicative opacity modifier. Before additive.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default -0.50
 *
 * @param Flash
 *
 * @param flashRate:num
 * @text Flash Rate
 * @parent Flash
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flashModifier:num
 * @text Flash Modifier
 * @parent Flash
 * @desc Static additive opacity modifier. Before multiplicative.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default +0.50
 *
 * @param Flare
 *
 * @param flareRate:num
 * @text Flare Rate
 * @parent Flare
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flareModifier:num
 * @text Flare Modifier
 * @parent Flare
 * @desc Random additive opacity modifier. Before multiplicative.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default +0.50
 * 
 * @param Glow
 *
 * @param glowRate:num
 * @text Glow Rate
 * @parent Glow
 * @desc What is the glow change for this light?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param glowSpeed:num
 * @text Glow Speed
 * @parent Glow
 * @desc What is the speed at which glow oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0.10
 *
 * @param glowRng:eval
 * @text Randomize Glow?
 * @parent Glow
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Offset the glow to oscillate at different starting points?
 * @default true
 * 
 * @param Pulse
 *
 * @param pulseRate:num
 * @text Pulse Rate
 * @parent Pulse
 * @desc What is the pulse change for this light?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param pulseSpeed:num
 * @text Pulse Speed
 * @parent Pulse
 * @desc What is the speed at which pulse oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0.10
 *
 * @param pulseRng:eval
 * @text Randomize Pulse?
 * @parent Pulse
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Offset the pulse to oscillate at different starting points?
 * @default true
 * 
 * @param Pattern
 *
 * @param patternName:str
 * @text Pattern Name
 * @parent Pattern
 * @type select
 * @option none
 * @option normal
 * @option fluorescent
 * @option halogen
 * @option incandescent
 * @option candle
 * @option torch
 * @option campfire
 * @option fast strobe
 * @option slow strobe
 * @option strong pulse
 * @option medium pulse
 * @option slow pulse
 * @option underwater
 * @desc Select the pattern name for this light.
 * Ignore if using any Custom Pattern.
 * @default none
 *
 * @param pattern:str
 * @text Custom Pattern
 * @parent Pattern
 * @desc Create a custom pattern with letters from a to z.
 * Where 'a' is transparent and 'z' is opaque.
 * @default 
 *
 * @param patternDelay:num
 * @text Frame Delay
 * @parent Pattern
 * @type number
 * @min 1
 * @desc What is the frame delay between pattern updates?
 * @default 6
 *
 */
/* ----------------------------------------------------------------------------
 * Hand Offsets Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HandOffset:
 * 
 * @param StandardDirections
 * @text Standard Directions
 * 
 * @param dir2:struct
 * @text Down
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"-12","pattern0Y:num":"+14","Pattern1":"","pattern1X:num":"-12","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"-12","pattern2Y:num":"+18","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir4:struct
 * @text Left
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+2","pattern0Y:num":"+16","Pattern1":"","pattern1X:num":"+4","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"+6","pattern2Y:num":"+16","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir6:struct
 * @text Right
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"-2","pattern0Y:num":"+16","Pattern1":"","pattern1X:num":"-4","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"-6","pattern2Y:num":"+16","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir8:struct
 * @text Up
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+12","pattern0Y:num":"-18","Pattern1":"","pattern1X:num":"+12","pattern1Y:num":"-16","Pattern2":"","pattern2X:num":"+12","pattern2Y:num":"-14","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param DiagonalDirections
 * @text Diagonal Directions
 * 
 * @param dir1:struct
 * @text Lower Left
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir3:struct
 * @text Lower Right
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir7:struct
 * @text Upper Left
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir9:struct
 * @text Upper Right
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 *
 */
/* ----------------------------------------------------------------------------
 * Pattern Offsets Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PatternOffset:
 *
 * @param Pattern0
 * @text Pattern 0
 *
 * @param pattern0X:num
 * @text Offset X
 * @parent Pattern0
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern0Y:num
 * @text Offset Y
 * @parent Pattern0
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern1
 * @text Pattern 1
 *
 * @param pattern1X:num
 * @text Offset X
 * @parent Pattern1
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern1Y:num
 * @text Offset Y
 * @parent Pattern1
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern2
 * @text Pattern 2
 *
 * @param pattern2X:num
 * @text Offset X
 * @parent Pattern2
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern2Y:num
 * @text Offset Y
 * @parent Pattern2
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern3
 * @text Pattern 3
 * @default (Unused by Default)
 *
 * @param pattern3X:num
 * @text Offset X
 * @parent Pattern3
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern3Y:num
 * @text Offset Y
 * @parent Pattern3
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern4
 * @text Pattern 4
 * @default (Unused by Default)
 *
 * @param pattern4X:num
 * @text Offset X
 * @parent Pattern4
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern4Y:num
 * @text Offset Y
 * @parent Pattern4
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern5
 * @text Pattern 5
 * @default (Unused by Default)
 *
 * @param pattern5X:num
 * @text Offset X
 * @parent Pattern5
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern5Y:num
 * @text Offset Y
 * @parent Pattern5
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern6
 * @text Pattern 6
 * @default (Unused by Default)
 *
 * @param pattern6X:num
 * @text Offset X
 * @parent Pattern6
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern6Y:num
 * @text Offset Y
 * @parent Pattern6
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern7
 * @text Pattern 7
 * @default (Unused by Default)
 *
 * @param pattern7X:num
 * @text Offset X
 * @parent Pattern7
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern7Y:num
 * @text Offset Y
 * @parent Pattern7
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern8
 * @text Pattern 8
 * @default (Unused by Default)
 *
 * @param pattern8X:num
 * @text Offset X
 * @parent Pattern8
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern8Y:num
 * @text Offset Y
 * @parent Pattern8
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern9
 * @text Pattern 9
 * @default (Unused by Default)
 *
 * @param pattern9X:num
 * @text Offset X
 * @parent Pattern9
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern9Y:num
 * @text Offset Y
 * @parent Pattern9
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern10
 * @text Pattern 10
 * @default (Unused by Default)
 *
 * @param pattern10X:num
 * @text Offset X
 * @parent Pattern10
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern10Y:num
 * @text Offset Y
 * @parent Pattern10
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
//=============================================================================

const _0x5c2f6e=_0x4751;(function(_0x31a0a4,_0x51e9bc){const _0x1d2538=_0x4751,_0x21a04c=_0x31a0a4();while(!![]){try{const _0x7890b=parseInt(_0x1d2538(0x277))/0x1*(-parseInt(_0x1d2538(0x2cc))/0x2)+-parseInt(_0x1d2538(0x3f8))/0x3*(-parseInt(_0x1d2538(0x364))/0x4)+-parseInt(_0x1d2538(0x246))/0x5*(parseInt(_0x1d2538(0x326))/0x6)+parseInt(_0x1d2538(0x208))/0x7+parseInt(_0x1d2538(0x345))/0x8*(-parseInt(_0x1d2538(0x3c1))/0x9)+-parseInt(_0x1d2538(0x311))/0xa*(-parseInt(_0x1d2538(0x2ea))/0xb)+-parseInt(_0x1d2538(0x1fb))/0xc*(-parseInt(_0x1d2538(0x3b7))/0xd);if(_0x7890b===_0x51e9bc)break;else _0x21a04c['push'](_0x21a04c['shift']());}catch(_0x49b369){_0x21a04c['push'](_0x21a04c['shift']());}}}(_0x4c33,0xc3147));var label=_0x5c2f6e(0x3d4),tier=tier||0x0,dependencies=[_0x5c2f6e(0x2a6),_0x5c2f6e(0x367)],pluginData=$plugins['filter'](function(_0x4765ae){const _0x631432=_0x5c2f6e;return _0x4765ae[_0x631432(0x202)]&&_0x4765ae[_0x631432(0x41e)][_0x631432(0x29f)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5c2f6e(0x1da)]||{},VisuMZ[_0x5c2f6e(0x422)]=function(_0x48bcf0,_0x1d4383){const _0x239567=_0x5c2f6e;for(const _0xb9246a in _0x1d4383){if(_0x239567(0x1f7)!==_0x239567(0x1e6)){if(_0xb9246a[_0x239567(0x20d)](/(.*):(.*)/i)){if('MXpzQ'==='eYdbZ')this[_0x239567(0x26b)]()[_0x239567(0x43c)]=_0x2aef6e(_0x12c0f3['$1'])*0.01;else{const _0x11bbe1=String(RegExp['$1']),_0x25f8e9=String(RegExp['$2'])[_0x239567(0x189)]()[_0x239567(0x157)]();let _0x302506,_0x4fd7a5,_0x304619;switch(_0x25f8e9){case'NUM':_0x302506=_0x1d4383[_0xb9246a]!==''?Number(_0x1d4383[_0xb9246a]):0x0;break;case _0x239567(0x22e):_0x4fd7a5=_0x1d4383[_0xb9246a]!==''?JSON['parse'](_0x1d4383[_0xb9246a]):[],_0x302506=_0x4fd7a5[_0x239567(0x1b7)](_0x55c796=>Number(_0x55c796));break;case _0x239567(0x322):_0x302506=_0x1d4383[_0xb9246a]!==''?eval(_0x1d4383[_0xb9246a]):null;break;case _0x239567(0x297):_0x4fd7a5=_0x1d4383[_0xb9246a]!==''?JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a]):[],_0x302506=_0x4fd7a5[_0x239567(0x1b7)](_0x3fd9ad=>eval(_0x3fd9ad));break;case _0x239567(0x176):_0x302506=_0x1d4383[_0xb9246a]!==''?JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a]):'';break;case'ARRAYJSON':_0x4fd7a5=_0x1d4383[_0xb9246a]!==''?JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a]):[],_0x302506=_0x4fd7a5[_0x239567(0x1b7)](_0x226025=>JSON[_0x239567(0x1c3)](_0x226025));break;case _0x239567(0x1dc):_0x302506=_0x1d4383[_0xb9246a]!==''?new Function(JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a])):new Function(_0x239567(0x127));break;case _0x239567(0x1fa):_0x4fd7a5=_0x1d4383[_0xb9246a]!==''?JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a]):[],_0x302506=_0x4fd7a5['map'](_0x247721=>new Function(JSON[_0x239567(0x1c3)](_0x247721)));break;case _0x239567(0x2f3):_0x302506=_0x1d4383[_0xb9246a]!==''?String(_0x1d4383[_0xb9246a]):'';break;case _0x239567(0x31c):_0x4fd7a5=_0x1d4383[_0xb9246a]!==''?JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a]):[],_0x302506=_0x4fd7a5[_0x239567(0x1b7)](_0x402437=>String(_0x402437));break;case'STRUCT':_0x304619=_0x1d4383[_0xb9246a]!==''?JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a]):{},_0x302506=VisuMZ[_0x239567(0x422)]({},_0x304619);break;case'ARRAYSTRUCT':_0x4fd7a5=_0x1d4383[_0xb9246a]!==''?JSON[_0x239567(0x1c3)](_0x1d4383[_0xb9246a]):[],_0x302506=_0x4fd7a5[_0x239567(0x1b7)](_0x205b54=>VisuMZ['ConvertParams']({},JSON[_0x239567(0x1c3)](_0x205b54)));break;default:continue;}_0x48bcf0[_0x11bbe1]=_0x302506;}}}else{if(this[_0x239567(0x138)]===_0x164a4f)this['setupLightingEffectsNotetags']();return this[_0x239567(0x138)]?.[_0x239567(0x1b6)]??[];}}return _0x48bcf0;},(_0x5ca5d1=>{const _0x537355=_0x5c2f6e,_0x1aaa32=_0x5ca5d1[_0x537355(0x161)];for(const _0xa038d9 of dependencies){if(!Imported[_0xa038d9]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x537355(0x3ec)](_0x1aaa32,_0xa038d9)),SceneManager[_0x537355(0x310)]();break;}}const _0x3fb04a=_0x5ca5d1[_0x537355(0x41e)];if(_0x3fb04a[_0x537355(0x20d)](/\[Version[ ](.*?)\]/i)){const _0x3b6e3c=Number(RegExp['$1']);_0x3b6e3c!==VisuMZ[label]['version']&&(alert(_0x537355(0x196)['format'](_0x1aaa32,_0x3b6e3c)),SceneManager[_0x537355(0x310)]());}if(_0x3fb04a[_0x537355(0x20d)](/\[Tier[ ](\d+)\]/i)){if(_0x537355(0x248)==='qRbvE'){const _0x934be7=Number(RegExp['$1']);_0x934be7<tier?(alert(_0x537355(0x185)[_0x537355(0x3ec)](_0x1aaa32,_0x934be7,tier)),SceneManager[_0x537355(0x310)]()):tier=Math['max'](_0x934be7,tier);}else this[_0x537355(0x352)]()[_0x537355(0x3a9)]=_0x939dde[_0x537355(0x433)](_0x49eb2e['$1']);}VisuMZ[_0x537355(0x422)](VisuMZ[label]['Settings'],_0x5ca5d1[_0x537355(0x1a6)]);})(pluginData),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],'OverlayChangeToCustomColor',_0x397a25=>{const _0x78dc4f=_0x5c2f6e;VisuMZ[_0x78dc4f(0x422)](_0x397a25,_0x397a25);const _0x2858ab=_0x397a25[_0x78dc4f(0x355)],_0x3bfe14=_0x397a25[_0x78dc4f(0x2df)],_0x3a7e98=_0x397a25[_0x78dc4f(0x313)];$gameScreen[_0x78dc4f(0x411)](_0x2858ab,_0x3a7e98),$gameScreen[_0x78dc4f(0x3b4)](_0x3bfe14,_0x3a7e98);}),PluginManager['registerCommand'](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x2da),_0x53a0d3=>{const _0x2ae1d5=_0x5c2f6e;VisuMZ[_0x2ae1d5(0x422)](_0x53a0d3,_0x53a0d3);const _0xe9a938=_0x53a0d3['Color'],_0x5a288b=_0x53a0d3['Duration'];$gameScreen[_0x2ae1d5(0x21c)](_0xe9a938,_0x5a288b);}),PluginManager['registerCommand'](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x3ea),_0x5ac69e=>{const _0x3cde55=_0x5c2f6e;VisuMZ[_0x3cde55(0x422)](_0x5ac69e,_0x5ac69e);const _0x50eacf=_0x5ac69e['ActorID'],_0x2542d7=_0x5ac69e['Settings'],_0x1dd6be=_0x5ac69e['Behavior'],_0x3b4fa0=_0x5ac69e[_0x3cde55(0x1ff)];for(const _0x178b39 of _0x50eacf){const _0x59dac0=$gameActors[_0x3cde55(0x160)](_0x178b39);if(!_0x59dac0)continue;_0x59dac0[_0x3cde55(0x3f3)](_0x2542d7),_0x59dac0[_0x3cde55(0x299)](_0x1dd6be),_0x59dac0[_0x3cde55(0x2a0)]()[_0x3cde55(0x233)]=_0x3b4fa0;}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],_0x5c2f6e(0x289),_0x4d3f2f=>{const _0x5770ac=_0x5c2f6e;VisuMZ[_0x5770ac(0x422)](_0x4d3f2f,_0x4d3f2f);const _0x5f0393=_0x4d3f2f['EnemyIndex'],_0x39a394=_0x4d3f2f[_0x5770ac(0x1da)],_0x47c67f=_0x4d3f2f[_0x5770ac(0x366)],_0x42dae2=_0x4d3f2f[_0x5770ac(0x1ff)];for(const _0x48a527 of _0x5f0393){const _0xfa0a4e=$gameTroop[_0x5770ac(0x3eb)]()[_0x48a527];if(!_0xfa0a4e)continue;_0xfa0a4e['setRadialLightSettings'](_0x39a394),_0xfa0a4e[_0x5770ac(0x299)](_0x47c67f),_0xfa0a4e[_0x5770ac(0x2a0)]()['autoRadius']=_0x42dae2;}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],'RadialLightChangePlayerSettings',_0x58170d=>{const _0x1b2808=_0x5c2f6e;VisuMZ[_0x1b2808(0x422)](_0x58170d,_0x58170d);const _0x2bdddb=_0x58170d['Settings'],_0x3670c3=_0x58170d[_0x1b2808(0x366)];$gamePlayer[_0x1b2808(0x3f3)](_0x2bdddb),$gamePlayer[_0x1b2808(0x299)](_0x3670c3);}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x1af),_0xc37da8=>{const _0x191826=_0x5c2f6e;VisuMZ['ConvertParams'](_0xc37da8,_0xc37da8);const _0x5ab943=_0xc37da8['Settings'],_0x5cdd23=_0xc37da8[_0x191826(0x366)];$gamePlayer['setFollowerRadialLightSettings'](_0x5ab943),$gamePlayer[_0x191826(0x227)](_0x5cdd23);}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x18a),_0x4523b8=>{const _0x48eb69=_0x5c2f6e;VisuMZ[_0x48eb69(0x422)](_0x4523b8,_0x4523b8);const _0x132d9e=_0x4523b8[_0x48eb69(0x385)],_0x4db821=_0x4523b8[_0x48eb69(0x1da)],_0x1b3038=_0x4523b8[_0x48eb69(0x366)],_0x2b4fca=$gameTemp[_0x48eb69(0x118)]();for(let _0x1efa09 of _0x132d9e){if('KPUjE'==='KPUjE'){if(_0x1efa09===0x0)_0x1efa09=_0x2b4fca[_0x48eb69(0x129)]();const _0x21ef33=$gameMap[_0x48eb69(0x452)](_0x1efa09);_0x21ef33&&(_0x21ef33[_0x48eb69(0x3f3)](_0x4db821),_0x21ef33['setRadialLightBehavior'](_0x1b3038));}else{const _0x7b0ec9=_0x13aa15[_0x48eb69(0x238)][_0x48eb69(0x25c)];_0x7b0ec9&&_0x7b0ec9[_0x48eb69(0x254)](this[_0x48eb69(0x16f)],this[_0x48eb69(0x195)],![]);}}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x3f6),_0x311ba0=>{const _0x265e45=_0x5c2f6e;VisuMZ['ConvertParams'](_0x311ba0,_0x311ba0);const _0x2fba08=$gameMap[_0x265e45(0x2c1)](),_0x412664=_0x311ba0[_0x265e45(0x41b)],_0x284e63=_0x311ba0['BoardedBehavior'],_0x13f8cb=_0x311ba0[_0x265e45(0x3e4)],_0x1e7f84=_0x311ba0[_0x265e45(0x1ca)];if(_0x2fba08){const _0x143c9f=!![];_0x2fba08[_0x265e45(0x31b)](_0x412664,!![],_0x143c9f,![]),_0x2fba08[_0x265e45(0x31b)](_0x284e63,!![],_0x143c9f,!![]),_0x2fba08['setVehicleLightingData'](_0x13f8cb,![],_0x143c9f,![]),_0x2fba08[_0x265e45(0x31b)](_0x1e7f84,![],_0x143c9f,!![]);}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],_0x5c2f6e(0x375),_0x441c0e=>{const _0x56bc57=_0x5c2f6e;VisuMZ[_0x56bc57(0x422)](_0x441c0e,_0x441c0e);const _0x4388c5=$gameMap[_0x56bc57(0x365)](),_0x30d41e=_0x441c0e[_0x56bc57(0x41b)],_0x4a4fae=_0x441c0e[_0x56bc57(0x2f0)],_0x4fb558=_0x441c0e[_0x56bc57(0x3e4)],_0xf1d1f1=_0x441c0e[_0x56bc57(0x1ca)];if(_0x4388c5){const _0x5586af=!![];_0x4388c5[_0x56bc57(0x31b)](_0x30d41e,!![],_0x5586af,![]),_0x4388c5[_0x56bc57(0x31b)](_0x4a4fae,!![],_0x5586af,!![]),_0x4388c5[_0x56bc57(0x31b)](_0x4fb558,![],_0x5586af,![]),_0x4388c5['setVehicleLightingData'](_0xf1d1f1,![],_0x5586af,!![]);}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],'RadialLightChangeAirshipSettings',_0x267082=>{const _0x22a63f=_0x5c2f6e;VisuMZ['ConvertParams'](_0x267082,_0x267082);const _0x2813ea=$gameMap['airship'](),_0x4cbcf8=_0x267082[_0x22a63f(0x41b)],_0x4b4633=_0x267082[_0x22a63f(0x2f0)],_0x1bb569=_0x267082[_0x22a63f(0x3e4)],_0x3984f0=_0x267082[_0x22a63f(0x1ca)];if(_0x2813ea){const _0x1d0370=!![];_0x2813ea[_0x22a63f(0x31b)](_0x4cbcf8,!![],_0x1d0370,![]),_0x2813ea[_0x22a63f(0x31b)](_0x4b4633,!![],_0x1d0370,!![]),_0x2813ea['setVehicleLightingData'](_0x1bb569,![],_0x1d0370,![]),_0x2813ea[_0x22a63f(0x31b)](_0x3984f0,![],_0x1d0370,!![]);}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],_0x5c2f6e(0x2ec),_0x4d235d=>{const _0x27012b=_0x5c2f6e;VisuMZ[_0x27012b(0x422)](_0x4d235d,_0x4d235d);const _0x5c665b=_0x4d235d[_0x27012b(0x1da)],_0x379396=_0x4d235d[_0x27012b(0x366)];$gamePlayer['setConicalLightSettings'](_0x5c665b),$gamePlayer[_0x27012b(0x1f9)](_0x379396);}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],_0x5c2f6e(0x1dd),_0x1d3a03=>{const _0x10a783=_0x5c2f6e;VisuMZ[_0x10a783(0x422)](_0x1d3a03,_0x1d3a03);const _0x264b8d=_0x1d3a03[_0x10a783(0x1da)],_0x4fcdb5=_0x1d3a03[_0x10a783(0x366)];$gamePlayer[_0x10a783(0x126)](_0x264b8d),$gamePlayer[_0x10a783(0x29d)](_0x4fcdb5);}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x3b3),_0x42c142=>{const _0x5f3f70=_0x5c2f6e;VisuMZ[_0x5f3f70(0x422)](_0x42c142,_0x42c142);const _0xbb1ee0=_0x42c142[_0x5f3f70(0x385)],_0x530791=_0x42c142[_0x5f3f70(0x1da)],_0x568ac8=_0x42c142[_0x5f3f70(0x366)],_0x2c8662=$gameTemp[_0x5f3f70(0x118)]();for(let _0x6322ed of _0xbb1ee0){if(_0x6322ed===0x0)_0x6322ed=_0x2c8662['eventId']();const _0x4d5579=$gameMap['event'](_0x6322ed);_0x4d5579&&(_0x4d5579[_0x5f3f70(0x27f)](_0x530791),_0x4d5579[_0x5f3f70(0x1f9)](_0x568ac8));}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],'ConicalLightChangeBoatSettings',_0x3be7e5=>{const _0x1cd419=_0x5c2f6e;VisuMZ[_0x1cd419(0x422)](_0x3be7e5,_0x3be7e5);const _0x2c87cc=$gameMap['boat'](),_0x373371=_0x3be7e5[_0x1cd419(0x41b)],_0x2093c5=_0x3be7e5[_0x1cd419(0x2f0)],_0x140f28=_0x3be7e5[_0x1cd419(0x3e4)],_0x153b9e=_0x3be7e5['UnboardedBehavior'];if(_0x2c87cc){if(_0x1cd419(0x1ec)===_0x1cd419(0x1ec)){const _0x1c6666=![];_0x2c87cc[_0x1cd419(0x31b)](_0x373371,!![],_0x1c6666,![]),_0x2c87cc[_0x1cd419(0x31b)](_0x2093c5,!![],_0x1c6666,!![]),_0x2c87cc[_0x1cd419(0x31b)](_0x140f28,![],_0x1c6666,![]),_0x2c87cc[_0x1cd419(0x31b)](_0x153b9e,![],_0x1c6666,!![]);}else{const _0x5bf516=_0x433abf(_0x41e48e['$1']);_0x5bf516!==_0x313bbd[_0x1880f3][_0x1cd419(0x223)]&&(_0x76d195(_0x1cd419(0x196)[_0x1cd419(0x3ec)](_0x2e1e99,_0x5bf516)),_0x3fece7[_0x1cd419(0x310)]());}}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x1f5),_0x22da35=>{const _0x4663bf=_0x5c2f6e;VisuMZ[_0x4663bf(0x422)](_0x22da35,_0x22da35);const _0x592600=$gameMap['ship'](),_0x36d629=_0x22da35[_0x4663bf(0x41b)],_0x2dfede=_0x22da35[_0x4663bf(0x2f0)],_0xe069e9=_0x22da35[_0x4663bf(0x3e4)],_0x2bd253=_0x22da35['UnboardedBehavior'];if(_0x592600){if(_0x4663bf(0x168)==='OoATS')this[_0x4663bf(0x374)]();else{const _0x1fc252=![];_0x592600[_0x4663bf(0x31b)](_0x36d629,!![],_0x1fc252,![]),_0x592600[_0x4663bf(0x31b)](_0x2dfede,!![],_0x1fc252,!![]),_0x592600['setVehicleLightingData'](_0xe069e9,![],_0x1fc252,![]),_0x592600['setVehicleLightingData'](_0x2bd253,![],_0x1fc252,!![]);}}}),PluginManager['registerCommand'](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x285),_0xebb12a=>{const _0x5d0d48=_0x5c2f6e;VisuMZ[_0x5d0d48(0x422)](_0xebb12a,_0xebb12a);const _0x383c3d=$gameMap[_0x5d0d48(0x439)](),_0x32f772=_0xebb12a['BoardedSettings'],_0xb6bafc=_0xebb12a[_0x5d0d48(0x2f0)],_0x14a846=_0xebb12a[_0x5d0d48(0x3e4)],_0x4049d1=_0xebb12a[_0x5d0d48(0x1ca)];if(_0x383c3d){const _0x38e9fd=![];_0x383c3d[_0x5d0d48(0x31b)](_0x32f772,!![],_0x38e9fd,![]),_0x383c3d[_0x5d0d48(0x31b)](_0xb6bafc,!![],_0x38e9fd,!![]),_0x383c3d[_0x5d0d48(0x31b)](_0x14a846,![],_0x38e9fd,![]),_0x383c3d['setVehicleLightingData'](_0x4049d1,![],_0x38e9fd,!![]);}}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],'ConicalOffsetChangeActor',_0x2f9a49=>{const _0x2089b0=_0x5c2f6e;VisuMZ[_0x2089b0(0x422)](_0x2f9a49,_0x2f9a49);const _0x325589=_0x2f9a49[_0x2089b0(0x376)],_0x186d61=_0x2f9a49[_0x2089b0(0x312)],_0x1e8bbe=_0x2f9a49[_0x2089b0(0x3ae)],_0x4815b7=_0x2f9a49[_0x2089b0(0x40b)],_0x96320b=_0x2f9a49[_0x2089b0(0x135)];for(const _0x25c14b of _0x325589){const _0x418371=$gameActors[_0x2089b0(0x160)](_0x25c14b);if(!_0x418371)continue;_0x418371[_0x2089b0(0x3de)](_0x1e8bbe),_0x418371[_0x2089b0(0x2f9)](_0x4815b7),_0x418371[_0x2089b0(0x174)](_0x96320b),_0x418371===$gameParty[_0x2089b0(0x2d9)]()?$gamePlayer[_0x2089b0(0x352)]()[_0x2089b0(0x1d6)]=_0x186d61:$gamePlayer['getFollowerConicalLightSettings']()[_0x2089b0(0x1d6)]=_0x186d61;}}),PluginManager['registerCommand'](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x1eb),_0x215039=>{const _0x45c661=_0x5c2f6e;VisuMZ['ConvertParams'](_0x215039,_0x215039);const _0x29eb30=_0x215039[_0x45c661(0x385)],_0x24823c=_0x215039['Enable'],_0x4dfe29=_0x215039[_0x45c661(0x3ae)],_0x38a2cf=_0x215039['VsDashOffset'],_0x456e7c=_0x215039[_0x45c661(0x135)],_0x5192d9=$gameTemp['getLastPluginCommandInterpreter']();for(let _0x1b4ec7 of _0x29eb30){if('ofjCF'==='ofjCF'){if(_0x1b4ec7===0x0)_0x1b4ec7=_0x5192d9[_0x45c661(0x129)]();const _0x4b5695=$gameMap[_0x45c661(0x452)](_0x1b4ec7);_0x4b5695&&(_0x4b5695['setConicalLightWalkOffsets'](_0x4dfe29),_0x4b5695['setConicalLightDashOffsets'](_0x38a2cf),_0x4b5695[_0x45c661(0x174)](_0x456e7c),_0x4b5695[_0x45c661(0x352)]()[_0x45c661(0x1d6)]=_0x24823c);}else this['conicalLightBehavior']()['flickerRate']=_0x477caf(_0x5122af['$1'])*0.01;}}),PluginManager['registerCommand'](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x148),_0x40ae72=>{const _0x8a5d6=_0x5c2f6e;VisuMZ[_0x8a5d6(0x422)](_0x40ae72,_0x40ae72);const _0x132102=$gameMap[_0x8a5d6(0x2c1)](),_0x35c3bf=_0x40ae72['BoardedOffset'],_0x5f0e41=_0x40ae72['UnboardedOffset'];_0x132102&&(_0x8a5d6(0x453)!==_0x8a5d6(0x35a)?(_0x132102[_0x8a5d6(0x403)](_0x35c3bf,!![]),_0x132102[_0x8a5d6(0x403)](_0x5f0e41,![])):this[_0x8a5d6(0x352)]()[_0x8a5d6(0x1d6)]=![]);}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],_0x5c2f6e(0x359),_0xbd261f=>{const _0x59f83b=_0x5c2f6e;VisuMZ[_0x59f83b(0x422)](_0xbd261f,_0xbd261f);const _0x7a6a61=$gameMap[_0x59f83b(0x365)](),_0x38e5db=_0xbd261f[_0x59f83b(0x2f2)],_0x39295d=_0xbd261f[_0x59f83b(0x36c)];_0x7a6a61&&(_0x59f83b(0x3fc)==='lPATz'?(_0x7a6a61[_0x59f83b(0x403)](_0x38e5db,!![]),_0x7a6a61[_0x59f83b(0x403)](_0x39295d,![])):this[_0x59f83b(0x273)](...arguments));}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],'ConicalOffsetChangeAirship',_0x4f7751=>{const _0x5d3123=_0x5c2f6e;VisuMZ[_0x5d3123(0x422)](_0x4f7751,_0x4f7751);const _0xc8d6b3=$gameMap[_0x5d3123(0x439)](),_0x24d00d=_0x4f7751[_0x5d3123(0x2f2)],_0x1c6844=_0x4f7751[_0x5d3123(0x36c)];_0xc8d6b3&&(_0xc8d6b3['setVehicleLightingConicalOffset'](_0x24d00d,!![]),_0xc8d6b3['setVehicleLightingConicalOffset'](_0x1c6844,![]));}),VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x40c)]=function(_0x4ff6d7,_0x4c0605){const _0x47586e=_0x5c2f6e;VisuMZ['ConvertParams'](_0x4ff6d7,_0x4ff6d7);const _0x340ebd=_0x4ff6d7[_0x47586e(0x1da)],_0x1b4a30=_0x4ff6d7[_0x47586e(0x366)],_0x43a834=_0x4ff6d7['UpdateFunc'],_0x4b0509=_0x4ff6d7[_0x47586e(0x427)]||0x0,_0x3f89c9=_0x4ff6d7[_0x47586e(0x19f)],_0x364f11=_0x4ff6d7['TimeIncrement'],_0x1c7f4c=_0x4ff6d7[_0x47586e(0x266)]||0x0,_0x49eb49={'active':!![],'settings':JsonEx[_0x47586e(0x360)](_0x340ebd),'behavior':JsonEx[_0x47586e(0x360)](_0x1b4a30),'type':_0x4c0605,'originX':_0x4ff6d7[_0x47586e(0x28f)]||0x0,'originY':_0x4ff6d7[_0x47586e(0x425)]||0x0,'update':_0x43a834,'initialTime':_0x4b0509,'time':_0x4b0509,'expire':_0x1c7f4c===0x0?Number[_0x47586e(0x143)]:_0x1c7f4c,'x':0x0,'y':0x0};if(_0x4c0605===_0x47586e(0x3c2)){if('BWcCO'==='Fenms'){if(this['_lightSpawns']===_0x493334)this[_0x47586e(0x43d)]();return this[_0x47586e(0x301)];}else _0x49eb49[_0x47586e(0x1d7)]=_0x4ff6d7['FollowerIndex']||0x0;}if(_0x4c0605==='event'){_0x49eb49['eventId']=_0x4ff6d7[_0x47586e(0x385)]||0x0;if(_0x49eb49[_0x47586e(0x129)]===0x0){if('OtLga'===_0x47586e(0x371)){const _0x2d50c6=$gameTemp[_0x47586e(0x118)]();_0x49eb49[_0x47586e(0x129)]=_0x2d50c6['eventId']();}else{if(!this[_0x47586e(0x2f5)]())return;this[_0x47586e(0x40e)](),this['createBitmap']();}}}for(let _0x326f3a=0x0;_0x326f3a<_0x3f89c9;_0x326f3a++){if('ZKvtx'==='mWaJO'){if(this[_0x47586e(0x412)]===_0x3dda05)this['initLightingEffects']();return this[_0x47586e(0x412)];}else{const _0x23e2dd=JsonEx[_0x47586e(0x360)](_0x49eb49),_0x16548f=_0x4b0509+_0x326f3a*_0x364f11;_0x23e2dd[_0x47586e(0x3e3)]=_0x16548f,$gameMap[_0x47586e(0x17d)](_0x23e2dd);}}},PluginManager['registerCommand'](pluginData[_0x5c2f6e(0x161)],'LightSpawnNewMapLockedLight',_0x1acac5=>{const _0x4b4160=_0x5c2f6e;if(SceneManager[_0x4b4160(0x455)]())return;VisuMZ[_0x4b4160(0x3d4)]['SpawnLights'](_0x1acac5,'map');}),PluginManager['registerCommand'](pluginData[_0x5c2f6e(0x161)],'LightSpawnNewScreenLockedLight',_0x7549ac=>{const _0x3586b5=_0x5c2f6e;if(SceneManager[_0x3586b5(0x455)]())return;VisuMZ[_0x3586b5(0x3d4)][_0x3586b5(0x40c)](_0x7549ac,'screen');}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x249),_0x1090c3=>{const _0x94ad1a=_0x5c2f6e;if(SceneManager[_0x94ad1a(0x455)]())return;VisuMZ[_0x94ad1a(0x3d4)][_0x94ad1a(0x40c)](_0x1090c3,'player');}),PluginManager['registerCommand'](pluginData['name'],_0x5c2f6e(0x2ac),_0x14e8bb=>{const _0x26137=_0x5c2f6e;if(SceneManager[_0x26137(0x455)]())return;VisuMZ['LightingEffects'][_0x26137(0x40c)](_0x14e8bb,_0x26137(0x3c2));}),PluginManager[_0x5c2f6e(0x1aa)](pluginData[_0x5c2f6e(0x161)],_0x5c2f6e(0x222),_0x4bc85d=>{const _0x220aa0=_0x5c2f6e;if(SceneManager[_0x220aa0(0x455)]())return;VisuMZ[_0x220aa0(0x3d4)][_0x220aa0(0x40c)](_0x4bc85d,_0x220aa0(0x452));}),PluginManager[_0x5c2f6e(0x1aa)](pluginData['name'],_0x5c2f6e(0x154),_0xf450be=>{const _0x28218d=_0x5c2f6e;if(SceneManager[_0x28218d(0x455)]())return;for(const _0x9e779a of $gameMap[_0x28218d(0x219)]()){if(!_0x9e779a)continue;if(!_0x9e779a[_0x28218d(0x115)])continue;if(_0x9e779a[_0x28218d(0x415)]<0xa)continue;_0x9e779a[_0x28218d(0x415)]=0xa;}}),VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x1d9)]={'AutoTint':/<(?:AUTOTINT|AUTO-TINT|AUTOTONE|AUTO-TONE):[ ](.*)>/i,'lightingOverlayColor':/<(?:OVERLAY|OVERLAY COLOR):[ ](.*)>/i,'lightingOverlayOpacityValue':/<(?:OVERLAY) OPACITY:[ ](\d+)>/i,'lightingOverlayOpacityRate':/<(?:OVERLAY) OPACITY:[ ](\d+)([%％])>/i,'noLightingOverlay':/<NO (?:OVERLAY|DARKNESS OVERLAY)>/i,'antiLightMaskHardRegions':/<HARD (?:ANTILIGHT|ANTI-LIGHT) (?:REGION|REGIONS):[ ](.*)>/i,'antiLightMaskHardTerrainTags':/<HARD (?:ANTILIGHT|ANTI-LIGHT) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'antiLightMaskSoftRegions':/<SOFT (?:ANTILIGHT|ANTI-LIGHT) (?:REGION|REGIONS):[ ](.*)>/i,'antiLightMaskSoftTerrainTags':/<SOFT (?:ANTILIGHT|ANTI-LIGHT) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'RadialLightGeneric':/<(?:LIGHT|RADIAL LIGHT)>/i,'RadialLightCatchAll':/<(?:LIGHT|RADIAL LIGHT)[ ](.*?)>/i,'RadialLightTurnOff':/<NO (?:LIGHT|RADIAL LIGHT)>/i,'RadialLightFilename':/<(?:LIGHT|RADIAL LIGHT) FILENAME:[ ](.*?)>/i,'RadialLightColor':/<(?:LIGHT|RADIAL LIGHT) COLOR:[ ](.*?)>/i,'RadialLightRadius':/<(?:LIGHT|RADIAL LIGHT) RADIUS:[ ](\d+)>/i,'RadialLightDiameter':/<(?:LIGHT|RADIAL LIGHT) DIAMETER:[ ](\d+)>/i,'RadialLightIntensity':/<(?:LIGHT|RADIAL LIGHT) INTENSITY:[ ](\d+)([%％])>/i,'RadialLightAngle':/<(?:LIGHT|RADIAL LIGHT) ANGLE:[ ](\d+)>/i,'RadialLightRotateSpeed':/<(?:LIGHT|RADIAL LIGHT) ROTATE SPEED:[ ]([\+\-]\d+)>/i,'RadialLightBlendMode':/<(?:LIGHT|RADIAL LIGHT) BLEND MODE:[ ](.*?)>/i,'RadialLightOpacityFlat':/<(?:LIGHT|RADIAL LIGHT) OPACITY:[ ](\d+)>/i,'RadialLightOpacityRate':/<(?:LIGHT|RADIAL LIGHT) OPACITY:[ ](\d+)([%％])>/i,'RadialLightOffset':/<(?:LIGHT|RADIAL LIGHT) OFFSET:[ ](.*?)>/i,'RadialBehaviorBlinkRate':/<(?:LIGHT|RADIAL LIGHT) BLINK RATE:[ ](\d+)([%％])>/i,'RadialBehaviorBlinkMod':/<(?:LIGHT|RADIAL LIGHT) BLINK MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlickerRate':/<(?:LIGHT|RADIAL LIGHT) FLICKER RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlickerMod':/<(?:LIGHT|RADIAL LIGHT) FLICKER MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlashRate':/<(?:LIGHT|RADIAL LIGHT) FLASH RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlashMod':/<(?:LIGHT|RADIAL LIGHT) FLASH MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlareRate':/<(?:LIGHT|RADIAL LIGHT) FLARE RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlareMod':/<(?:LIGHT|RADIAL LIGHT) FLARE MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorGlowRate':/<(?:LIGHT|RADIAL LIGHT) GLOW RATE:[ ](\d+)([%％])>/i,'RadialBehaviorGlowSpeed':/<(?:LIGHT|RADIAL LIGHT) GLOW SPEED:[ ](\d+)([%％])>/i,'RadialBehaviorGlowRng':/<(?:LIGHT|RADIAL LIGHT) GLOW RANDOM>/i,'RadialBehaviorGlowNoRng':/<(?:LIGHT|RADIAL LIGHT) GLOW NO RANDOM>/i,'RadialBehaviorPulseRate':/<(?:LIGHT|RADIAL LIGHT) PULSE RATE:[ ](\d+)([%％])>/i,'RadialBehaviorPulseSpeed':/<(?:LIGHT|RADIAL LIGHT) PULSE SPEED:[ ](\d+)([%％])>/i,'RadialBehaviorPulseRng':/<(?:LIGHT|RADIAL LIGHT) PULSE RANDOM>/i,'RadialBehaviorPulseNoRng':/<(?:LIGHT|RADIAL LIGHT) PULSE NO RANDOM>/i,'RadialBehaviorPatternPreset':/<(?:LIGHT|RADIAL LIGHT) PATTERN TYPE:[ ](.*?)>/i,'RadialBehaviorPatternSequence':/<(?:LIGHT|RADIAL LIGHT) (?:PATTERN|PATTERN TABLE|CUSTOM PATTERN):[ ](.*?)>/i,'RadialBehaviorPatternUpdateDelay':/<(?:LIGHT|RADIAL LIGHT) PATTERN (?:DELAY|UPDATE DELAY):[ ](\d+)>/i,'ConicalLightGeneric':/<(?:CONICAL LIGHT|TORCH)>/i,'ConicalLightCatchAll':/<(?:CONICAL LIGHT|TORCH)[ ](.*?)>/i,'ConicalLightTurnOff':/<NO (?:CONICAL LIGHT|TORCH)>/i,'ConicalLightFilename':/<(?:CONICAL LIGHT|TORCH) FILENAME:[ ](.*?)>/i,'ConicalLightFileAngleOffset':/<(?:CONICAL LIGHT|TORCH) FILE ANGLE OFFSET:[ ]([\+\-]\d+)>/i,'ConicalLightFileAnchor':/<(?:CONICAL LIGHT|TORCH) FILE ANCHOR:[ ](.*?)>/i,'ConicalLightColor':/<(?:CONICAL LIGHT|TORCH) COLOR:[ ](.*?)>/i,'ConicalLightRadius':/<(?:CONICAL LIGHT|TORCH) RADIUS:[ ](\d+)>/i,'ConicalLightDiameter':/<(?:CONICAL LIGHT|TORCH) DIAMETER:[ ](\d+)>/i,'ConicalLightSrcRadius':/<(?:CONICAL LIGHT|TORCH) (?:SOURCE|MINI) RADIUS:[ ](\d+)>/i,'ConicalLightSrcDiameter':/<(?:CONICAL LIGHT|TORCH) (?:SOURCE|MINI) DIAMETER:[ ](\d+)>/i,'ConicalLightIntensity':/<(?:CONICAL LIGHT|TORCH) INTENSITY:[ ](\d+)([%％])>/i,'ConicalLightBlendMode':/<(?:CONICAL LIGHT|TORCH) BLEND MODE:[ ](.*?)>/i,'ConicalLightOpacityFlat':/<(?:CONICAL LIGHT|TORCH) OPACITY:[ ](\d+)>/i,'ConicalLightOpacityRate':/<(?:CONICAL LIGHT|TORCH) OPACITY:[ ](\d+)([%％])>/i,'ConicalLightAngle':/<(?:CONICAL LIGHT|TORCH) ANGLE:[ ](\d+)>/i,'ConicalLightAngleSway':/<(?:CONICAL LIGHT|TORCH) ANGLE SWAY:[ ](\d+)>/i,'ConicalLightSwaySpeed':/<(?:CONICAL LIGHT|TORCH) SWAY SPEED:[ ](\d+)([%％])>/i,'ConicalLightSwayRng':/<(?:CONICAL LIGHT|TORCH) SWAY RANDOM>/i,'ConicalLightSwayNoRng':/<(?:CONICAL LIGHT|TORCH) SWAY NO RANDOM>/i,'ConicalLightForceDir':/<(?:CONICAL LIGHT|TORCH) FORCE DIRECTION:[ ](.*?)>/i,'ConicalLightFollowMouse':/<(?:CONICAL LIGHT|TORCH) FOLLOW (?:CURSOR|MOUSE)>/i,'ConicalLightNoFollowMouse':/<(?:CONICAL LIGHT|TORCH) (?:NO|NOT) FOLLOW (?:CURSOR|MOUSE)>/i,'ConicalLightUseHandOffset':/<(?:CONICAL LIGHT|TORCH) HAND OFFSET>/i,'ConicalLightCentralOffset':/<(?:CONICAL LIGHT|TORCH) (?:CENTER|CENTRAL) OFFSET>/i,'ConicalLightOffset':/<(?:CONICAL LIGHT|TORCH) OFFSET:[ ](.*?)>/i,'ConicalBehaviorBlinkRate':/<(?:CONICAL LIGHT|TORCH) BLINK RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorBlinkMod':/<(?:CONICAL LIGHT|TORCH) BLINK MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlickerRate':/<(?:CONICAL LIGHT|TORCH) FLICKER RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlickerMod':/<(?:CONICAL LIGHT|TORCH) FLICKER MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlashRate':/<(?:CONICAL LIGHT|TORCH) FLASH RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlashMod':/<(?:CONICAL LIGHT|TORCH) FLASH MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlareRate':/<(?:CONICAL LIGHT|TORCH) FLARE RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlareMod':/<(?:CONICAL LIGHT|TORCH) FLARE MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorGlowRate':/<(?:CONICAL LIGHT|TORCH) GLOW RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorGlowSpeed':/<(?:CONICAL LIGHT|TORCH) GLOW SPEED:[ ](\d+)([%％])>/i,'ConicalBehaviorGlowRng':/<(?:CONICAL LIGHT|TORCH) GLOW RANDOM>/i,'ConicalBehaviorGlowNoRng':/<(?:CONICAL LIGHT|TORCH) GLOW NO RANDOM>/i,'ConicalBehaviorPulseRate':/<(?:CONICAL LIGHT|TORCH) PULSE RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorPulseSpeed':/<(?:CONICAL LIGHT|TORCH) PULSE SPEED:[ ](\d+)([%％])>/i,'ConicalBehaviorPulseRng':/<(?:CONICAL LIGHT|TORCH) PULSE RANDOM>/i,'ConicalBehaviorPulseNoRng':/<(?:CONICAL LIGHT|TORCH) PULSE NO RANDOM>/i,'ConicalBehaviorPatternPreset':/<(?:CONICAL LIGHT|TORCH) PATTERN TYPE:[ ](.*?)>/i,'ConicalBehaviorPatternSequence':/<(?:CONICAL LIGHT|TORCH) (?:PATTERN|PATTERN TABLE):[ ](.*?)>/i,'ConicalBehaviorPatternUpdateDelay':/<(?:CONICAL LIGHT|TORCH) PATTERN (?:DELAY|UPDATE DELAY):[ ](\d+)>/i,'ConicalLightHandOffset':/<(?:CONICAL LIGHT|TORCH) (.*?) PATTERN (\d+) OFFSET:[ ](.*?)>/gi},Bitmap[_0x5c2f6e(0x368)]['drawTestDummy']=function(_0x5ae733,_0x1152fb){const _0x55422c=_0x5c2f6e;this[_0x55422c(0x2b9)](_0x5ae733,_0x1152fb,0.5);},Bitmap[_0x5c2f6e(0x368)][_0x5c2f6e(0x2b9)]=function(_0x5e8aec,_0x105d6d,_0xa69edd){const _0xaf0df9=_0x5c2f6e,_0x1c6345=0x168,_0x586277=0x1,_0x2f4030=0x0;this[_0xaf0df9(0x3fa)](_0x5e8aec,_0x1c6345,_0x105d6d,_0xa69edd,_0x586277,_0x2f4030);},Bitmap[_0x5c2f6e(0x368)]['drawConicalLight']=function(_0x5148e0,_0x2684f3,_0x4c078d,_0x30e8fa,_0x417963,_0x381f11){const _0x36aa66=_0x5c2f6e;_0x30e8fa=_0x30e8fa[_0x36aa66(0x27b)](0.000001,0.999999);const _0x1b7e57=this['context'],_0xab083d=_0x2684f3*(Math['PI']/0xb4),_0x261285=_0x5148e0*0x2,_0x13bb7a=_0x1b7e57[_0x36aa66(0x3cb)](_0x5148e0,_0x5148e0,_0x381f11,_0x5148e0,_0x5148e0,_0x5148e0),_0x258781=ColorManager[_0x36aa66(0x39e)](_0x4c078d,_0x417963),_0x42b2a2=ColorManager[_0x36aa66(0x39e)](_0x4c078d,0x1),_0x12c850=ColorManager['hexToRgba'](_0x4c078d,0x0);_0x13bb7a[_0x36aa66(0x16b)](0x0,_0x258781),_0x13bb7a[_0x36aa66(0x16b)](_0x30e8fa/0x2,_0x42b2a2),_0x13bb7a[_0x36aa66(0x16b)](_0x30e8fa,_0x42b2a2),_0x13bb7a['addColorStop'](0x1,_0x12c850),_0x1b7e57[_0x36aa66(0x14c)](),_0x1b7e57[_0x36aa66(0x265)]=_0x13bb7a,_0x1b7e57[_0x36aa66(0x18f)](),_0x1b7e57['moveTo'](_0x5148e0,_0x5148e0),_0x1b7e57[_0x36aa66(0x2c4)](_0x261285,_0x5148e0),_0x1b7e57[_0x36aa66(0x418)](_0x5148e0,_0x5148e0,_0x5148e0,0x0,_0xab083d),_0x1b7e57[_0x36aa66(0x2c4)](_0x5148e0,_0x5148e0),_0x1b7e57[_0x36aa66(0x306)](),_0x1b7e57['restore'](),this[_0x36aa66(0x2a5)]['update']();},ConfigManager['blinkingLights']=!![],ConfigManager[_0x5c2f6e(0x3c3)]=!![],VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x17b)]=ConfigManager[_0x5c2f6e(0x37d)],ConfigManager['makeData']=function(){const _0x1aea3f=_0x5c2f6e,_0x5ab801=VisuMZ[_0x1aea3f(0x3d4)]['ConfigManager_makeData'][_0x1aea3f(0x25f)](this);return _0x5ab801['blinkingLights']=this[_0x1aea3f(0x15c)],_0x5ab801['pulsingLights']=this[_0x1aea3f(0x3c3)],_0x5ab801;},VisuMZ[_0x5c2f6e(0x3d4)]['ConfigManager_applyData']=ConfigManager[_0x5c2f6e(0x3b6)],ConfigManager['applyData']=function(_0x5a5b7b){const _0x289e5f=_0x5c2f6e;VisuMZ[_0x289e5f(0x3d4)]['ConfigManager_applyData'][_0x289e5f(0x25f)](this,_0x5a5b7b),this['readFlag'](_0x5a5b7b,_0x289e5f(0x15c),!![]),this[_0x289e5f(0x3b2)](_0x5a5b7b,_0x289e5f(0x3c3),!![]);},TextManager['LightingEffectsOptions']={'BlinkingLights':VisuMZ[_0x5c2f6e(0x3d4)]['Settings'][_0x5c2f6e(0x213)][_0x5c2f6e(0x169)],'PulsingLights':VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x1da)]['Options']['PulsingLightsName']},TextManager[_0x5c2f6e(0x433)]=function(_0x461a99){const _0x11cd94=_0x5c2f6e;_0x461a99=_0x461a99['toLowerCase']()[_0x11cd94(0x157)]();switch(_0x461a99){case'down':return 0x2;case _0x11cd94(0x26e):return 0x4;case'right':return 0x6;case'up':return 0x8;case'lower\x20left':return 0x1;case _0x11cd94(0x2b1):return 0x3;case'upper\x20left':return 0x7;case _0x11cd94(0x21b):return 0x9;}return Number(_0x461a99)||0x0;},ColorManager[_0x5c2f6e(0x398)]=function(_0x3218aa){const _0x1d1648=_0x5c2f6e;if(_0x3218aa[_0x1d1648(0x20d)](/\#(.*)/i)){if(_0x1d1648(0x3bb)===_0x1d1648(0x3bb))return _0x1d1648(0x3df)[_0x1d1648(0x3ec)](String(RegExp['$1']));else _0x5f0694('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1d1648(0x3ec)](_0x30f826,_0x224abe)),_0x288008[_0x1d1648(0x310)]();}else{_0x3218aa=_0x3218aa[_0x1d1648(0x2d4)]()[_0x1d1648(0x157)]();const _0x49be1=VisuMZ[_0x1d1648(0x3d4)][_0x1d1648(0x1da)]['PresetColors'];if(_0x49be1&&_0x49be1[_0x3218aa])return _0x49be1[_0x3218aa];switch(_0x3218aa){case'-':case _0x1d1648(0x117):case _0x1d1648(0x296):case _0x1d1648(0x2aa):case _0x1d1648(0x1ed):return _0x1d1648(0x218);case'black':case _0x1d1648(0x16e):return _0x1d1648(0x1a3);case _0x1d1648(0x13b):return'#ff0000';case _0x1d1648(0x1c2):return _0x1d1648(0x1ae);case'blue':return _0x1d1648(0x221);case _0x1d1648(0x269):return _0x1d1648(0x240);case _0x1d1648(0x206):return _0x1d1648(0x414);case'cyan':return _0x1d1648(0x3ce);case'orange':return _0x1d1648(0x3db);case _0x1d1648(0x3d5):return _0x1d1648(0x38b);case _0x1d1648(0x42a):return _0x1d1648(0x324);case _0x1d1648(0x214):return _0x1d1648(0x372);case _0x1d1648(0x3c7):case'gray':return _0x1d1648(0x151);case'light\x20red':return _0x1d1648(0x22c);case _0x1d1648(0x2ad):return _0x1d1648(0x241);case _0x1d1648(0x190):return _0x1d1648(0x3d3);case _0x1d1648(0x40a):return'#a3d39c';case'light\x20cyan':return _0x1d1648(0x260);case _0x1d1648(0x1f3):return _0x1d1648(0x33b);case _0x1d1648(0x2a9):return _0x1d1648(0x3a3);case _0x1d1648(0x270):return _0x1d1648(0x2c9);case _0x1d1648(0x232):return _0x1d1648(0x3d1);case _0x1d1648(0x3e1):return _0x1d1648(0x244);case _0x1d1648(0x315):case _0x1d1648(0x3ca):return'#aaaaaa';case _0x1d1648(0x205):return _0x1d1648(0x287);case'dark\x20orange':return _0x1d1648(0x35f);case'dark\x20yellow':return _0x1d1648(0x401);case'dark\x20green':return _0x1d1648(0x11a);case _0x1d1648(0x1bb):return'#005952';case'dark\x20blue':return _0x1d1648(0x343);case'dark\x20purple':return _0x1d1648(0x19b);case _0x1d1648(0x191):return _0x1d1648(0x43b);case _0x1d1648(0x201):return _0x1d1648(0x2dd);case _0x1d1648(0x1fc):return _0x1d1648(0x145);case'dark\x20grey':case _0x1d1648(0x38d):return _0x1d1648(0x3ab);case _0x1d1648(0x2fd):return _0x1d1648(0x1c4);case _0x1d1648(0x173):return _0x1d1648(0x3db);case _0x1d1648(0x280):return _0x1d1648(0x27a);}}},ColorManager[_0x5c2f6e(0x1a9)]=function(_0xd5ecd2){const _0xbc7f6c=_0x5c2f6e;_0xd5ecd2=_0xd5ecd2[_0xbc7f6c(0x2d4)]();switch(_0xd5ecd2){case _0xbc7f6c(0x296):return PIXI[_0xbc7f6c(0x2f6)]['NORMAL'];case _0xbc7f6c(0x34c):case _0xbc7f6c(0x1f6):return PIXI[_0xbc7f6c(0x2f6)]['ADD'];case _0xbc7f6c(0x20e):return PIXI[_0xbc7f6c(0x2f6)]['MULTIPLY'];case _0xbc7f6c(0x30d):return PIXI[_0xbc7f6c(0x2f6)][_0xbc7f6c(0x2d1)];}},ColorManager[_0x5c2f6e(0x39e)]=function(_0x32b6be,_0x26a64d){const _0x35b2b0=_0x5c2f6e;let _0x28e325='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x35b2b0(0x235)](_0x32b6be)){if(_0x35b2b0(0x424)===_0x35b2b0(0x1fd)){const _0x494c32=new _0x47751e();_0x494c32[_0x35b2b0(0x27c)]=new _0x28a5bc(0x1f4,0x1f4),_0x494c32[_0x35b2b0(0x27c)][_0x35b2b0(0x309)](0xfa,_0x35b2b0(0x1ae)),this[_0x35b2b0(0x24f)]()[_0x35b2b0(0x307)](_0x494c32),_0x494c32[_0x35b2b0(0x1cb)]['x']=_0x494c32[_0x35b2b0(0x1cb)]['y']=0.5,_0x494c32['x']=_0x4bee11[_0x35b2b0(0x2af)]*0x2/0x5,_0x494c32['y']=_0x10d08a[_0x35b2b0(0x158)]*0x2/0x3,_0x494c32[_0x35b2b0(0x199)]=_0x3597ea['BLEND_MODES']['ADD'],this[_0x35b2b0(0x325)]=_0x494c32;}else{_0x28e325=_0x32b6be['substring'](0x1)[_0x35b2b0(0x34b)]('');_0x28e325[_0x35b2b0(0x308)]===0x3&&(_0x35b2b0(0x258)!==_0x35b2b0(0x258)?(_0x2c732f['setVehicleLightingConicalOffset'](_0x2670ff,!![]),_0x404c0c[_0x35b2b0(0x403)](_0x3f81b8,![])):_0x28e325=[_0x28e325[0x0],_0x28e325[0x0],_0x28e325[0x1],_0x28e325[0x1],_0x28e325[0x2],_0x28e325[0x2]]);while(_0x28e325[_0x35b2b0(0x308)]>0x6)_0x28e325[_0x35b2b0(0x3d0)]();return _0x28e325='0x'+_0x28e325[_0x35b2b0(0x225)](''),_0x35b2b0(0x141)+[(_0x28e325>>0x10&0xff)[_0x35b2b0(0x27b)](0x0,0xff),(_0x28e325>>0x8&0xff)['clamp'](0x0,0xff),(_0x28e325&0xff)[_0x35b2b0(0x27b)](0x0,0xff)]['join'](',')+','+_0x26a64d[_0x35b2b0(0x27b)](0x0,0x1)+')';}}else return'rgba(0,0,0,0)';},ColorManager['hexToArray']=function(_0x33e132){const _0x3b8b8c=_0x5c2f6e;let _0x3532f5='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x3b8b8c(0x235)](_0x33e132)){_0x3532f5=_0x33e132[_0x3b8b8c(0x420)](0x1)['split']('');if(_0x3532f5[_0x3b8b8c(0x308)]===0x3){if(_0x3b8b8c(0x3dd)===_0x3b8b8c(0x3dd))_0x3532f5=[_0x3532f5[0x0],_0x3532f5[0x0],_0x3532f5[0x1],_0x3532f5[0x1],_0x3532f5[0x2],_0x3532f5[0x2]];else{_0xefcb02=_0x22c1ec[_0x3b8b8c(0x2d4)]()[_0x3b8b8c(0x157)]();switch(_0x467dae){case'normal':this['startTint']([0x0,0x0,0x0,0x0],0x0);return!![];case _0x3b8b8c(0x16e):this[_0x3b8b8c(0x2bb)]([-0x44,-0x44,-0x44,0x0],0x0);return!![];case _0x3b8b8c(0x2c2):this[_0x3b8b8c(0x2bb)]([0x22,-0x22,-0x44,0xaa],0x0);return!![];case _0x3b8b8c(0x295):this[_0x3b8b8c(0x2bb)]([0x44,-0x22,-0x22,0x0],0x0);return!![];case _0x3b8b8c(0x280):this[_0x3b8b8c(0x2bb)]([-0x44,-0x44,0x0,0x44],0x0);return!![];default:return![];}}}while(_0x3532f5[_0x3b8b8c(0x308)]>0x6)_0x3532f5['pop']();return _0x3532f5='0x'+_0x3532f5[_0x3b8b8c(0x225)](''),[(_0x3532f5>>0x10&0xff)[_0x3b8b8c(0x27b)](0x0,0xff),(_0x3532f5>>0x8&0xff)['clamp'](0x0,0xff),(_0x3532f5&0xff)[_0x3b8b8c(0x27b)](0x0,0xff)];}else return[0x0,0x0,0x0];},ColorManager[_0x5c2f6e(0x327)]=function(_0x357505){const _0x3f88d5=_0x5c2f6e;while(_0x357505['length']<0x3)_0x357505[_0x3f88d5(0x122)](0x0);while(_0x357505[_0x3f88d5(0x308)]>0x3)_0x357505['pop']();return'#'+_0x357505[_0x3f88d5(0x1b7)](_0x327d27=>_0x327d27[_0x3f88d5(0x27b)](0x0,0xff)[_0x3f88d5(0x416)](0x10)[_0x3f88d5(0x21e)](0x2))[_0x3f88d5(0x225)]('');},ColorManager[_0x5c2f6e(0x2a2)]=function(_0x3c210e){const _0x20963a=_0x5c2f6e;_0x3c210e['pattern']===''&&(_0x3c210e['pattern']=ColorManager['opacityPatternParser'](_0x3c210e[_0x20963a(0x34a)]));},ColorManager[_0x5c2f6e(0x2cd)]=function(_0x339cbe){const _0x5da838=_0x5c2f6e;_0x339cbe=_0x339cbe['toLowerCase']()[_0x5da838(0x157)]();switch(_0x339cbe){case _0x5da838(0x296):case'-':return'z';case'flicker':case _0x5da838(0x443):case _0x5da838(0x3cc):return _0x5da838(0x319);case _0x5da838(0x26a):case _0x5da838(0x436):case'strong\x20pulse':return _0x5da838(0x20c);case _0x5da838(0x3a4):case _0x5da838(0x373):return _0x5da838(0x38c);case _0x5da838(0x388):case _0x5da838(0x1ba):case'strobe1':return'mamamamamama';case'pulse2':case'medium\x20pulse':return _0x5da838(0x271);case'flicker2':case _0x5da838(0x397):return _0x5da838(0x39f);case'candle2':case _0x5da838(0x1f4):return _0x5da838(0x450);case _0x5da838(0x209):case _0x5da838(0x3e2):return _0x5da838(0x3f2);case _0x5da838(0x1ee):case _0x5da838(0x224):return _0x5da838(0x44c);case _0x5da838(0x3f0):case _0x5da838(0x2d2):return _0x5da838(0x27e);case'pulse2':case _0x5da838(0x378):return _0x5da838(0x40f);case'underwater':return'mmnnmmnnnmmnn';}return'';},SceneManager[_0x5c2f6e(0x455)]=function(){const _0x289a46=_0x5c2f6e;return this[_0x289a46(0x396)]&&this[_0x289a46(0x396)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x20d026=_0x5c2f6e;return this[_0x20d026(0x396)]&&this[_0x20d026(0x396)][_0x20d026(0x35e)]===Scene_Map;},SceneManager[_0x5c2f6e(0x2e2)]=function(_0x7b242e){const _0x3e491e=_0x5c2f6e;if(this[_0x3e491e(0x396)]&&this[_0x3e491e(0x396)][_0x3e491e(0x437)]){if(_0x3e491e(0x337)!=='awhIq')this['_scene'][_0x3e491e(0x437)][_0x3e491e(0x307)](_0x7b242e);else{this[_0x3e491e(0x2a8)]===_0x1647ed&&this['initVehicleLightingEffectsSettings']();const _0x171e60=_0x43a11a?_0x3e491e(0x17f):_0x3e491e(0x33d),_0x3c61d5=_0x3e491e(0x16c),_0x36b116=_0x3e491e(0x1d0);this['_vehicleLightingSettings'][_0x171e60][_0x3c61d5][_0x36b116]=_0x60c5ec[_0x3e491e(0x360)](_0x32ed5f);}}},SceneManager[_0x5c2f6e(0x239)]=function(_0x37a3d2){const _0x59c39a=_0x5c2f6e;this['_scene']&&this[_0x59c39a(0x396)][_0x59c39a(0x437)]&&this['_scene'][_0x59c39a(0x437)]['removeChild'](_0x37a3d2);},Game_Temp[_0x5c2f6e(0x368)][_0x5c2f6e(0x2db)]=function(_0x427e1f){const _0x4d4b85=_0x5c2f6e,_0x215981=_0x427e1f['update'];this[_0x4d4b85(0x3fe)]=this[_0x4d4b85(0x3fe)]||[];const _0x17421f=this[_0x4d4b85(0x3fe)][_0x4d4b85(0x308)];this[_0x4d4b85(0x3fe)][_0x17421f]=new Function(_0x215981),this[_0x4d4b85(0x2f7)](_0x17421f,_0x427e1f);},Game_Temp['prototype']['updateLightSpawn']=function(_0x451044,_0x1cbd00){const _0x40011c=_0x5c2f6e;if(!_0x1cbd00)return;this[_0x40011c(0x3fe)]=this[_0x40011c(0x3fe)]||[];const _0x1906a8=this[_0x40011c(0x3fe)][_0x451044];if(!_0x1906a8)return;const _0x45b6cd=_0x1906a8[_0x40011c(0x25f)](_0x1cbd00,_0x1cbd00,_0x1cbd00['time']);if(!_0x45b6cd)return;_0x1cbd00['x']=Math[_0x40011c(0x155)](_0x45b6cd['x']||0x0),_0x1cbd00['y']=Math[_0x40011c(0x155)](_0x45b6cd['y']||0x0),_0x1cbd00[_0x40011c(0x390)][_0x40011c(0x166)]=_0x45b6cd[_0x40011c(0x166)]??_0x1cbd00['settings'][_0x40011c(0x166)],_0x1cbd00[_0x40011c(0x390)][_0x40011c(0x2b6)]=_0x45b6cd[_0x40011c(0x2b6)]??_0x1cbd00[_0x40011c(0x390)][_0x40011c(0x2b6)],_0x1cbd00[_0x40011c(0x390)][_0x40011c(0x2ef)]=_0x45b6cd['intensity']??_0x1cbd00[_0x40011c(0x390)]['intensity'],_0x1cbd00[_0x40011c(0x390)][_0x40011c(0x1d5)]=_0x45b6cd[_0x40011c(0x1d5)]??_0x1cbd00[_0x40011c(0x390)][_0x40011c(0x1d5)],_0x1cbd00[_0x40011c(0x390)][_0x40011c(0x3bc)]=_0x45b6cd['opacity']??_0x1cbd00['settings'][_0x40011c(0x3bc)];if(_0x1cbd00[_0x40011c(0x415)]<0xa){if(_0x40011c(0x35b)===_0x40011c(0x35b)){const _0x1b3a03=_0x1cbd00[_0x40011c(0x415)]*0.1;_0x1cbd00['settings']['opacity']=Math[_0x40011c(0x155)](_0x1cbd00[_0x40011c(0x390)]['opacity']*_0x1b3a03)['clamp'](0x0,0xff);}else this[_0x40011c(0x28a)]={'color':_0x40011c(0x218),'targetColor':_0x40011c(0x218),'colorDuration':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'cacheOpacity':_0x4e79d9};}},VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x183)]=Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x273)],Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x273)]=function(){const _0x586e36=_0x5c2f6e;VisuMZ['LightingEffects'][_0x586e36(0x183)]['call'](this),this[_0x586e36(0x3a0)]();},VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x159)]=Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b2)],Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b2)]=function(){const _0x4caafb=_0x5c2f6e;VisuMZ[_0x4caafb(0x3d4)][_0x4caafb(0x159)][_0x4caafb(0x25f)](this),this[_0x4caafb(0x428)](),this[_0x4caafb(0x342)]();},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x421)]=function(_0x229081){const _0x2fa2ab=_0x5c2f6e;_0x229081=_0x229081[_0x2fa2ab(0x2d4)]()[_0x2fa2ab(0x157)]();if(this[_0x2fa2ab(0x318)](_0x229081)){if(_0x2fa2ab(0x30c)===_0x2fa2ab(0x30c))return;else{_0x5b273e[_0x2fa2ab(0x422)](_0x2d4c52,_0x2ad4b5);const _0x57f71b=_0x1d5747['Settings'],_0x2cab27=_0x3a5aaf[_0x2fa2ab(0x366)];_0x3a18b9[_0x2fa2ab(0x3f3)](_0x57f71b),_0x1cc085[_0x2fa2ab(0x299)](_0x2cab27);}}else{const _0xc0dff5=_0x229081['split'](',')['map'](_0x876f4b=>(Number(_0x876f4b)||0x0)['clamp'](-0xff,0xff));while(_0xc0dff5[_0x2fa2ab(0x308)]<0x3)_0xc0dff5[_0x2fa2ab(0x122)](0x0);_0xc0dff5[0x3]=Math['abs'](_0xc0dff5[0x3]),this[_0x2fa2ab(0x2bb)](_0xc0dff5,0x0);}},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x318)]=function(_0x179896){const _0xb6e6c6=_0x5c2f6e;_0x179896=_0x179896[_0xb6e6c6(0x2d4)]()[_0xb6e6c6(0x157)]();switch(_0x179896){case'normal':this[_0xb6e6c6(0x2bb)]([0x0,0x0,0x0,0x0],0x0);return!![];case _0xb6e6c6(0x16e):this[_0xb6e6c6(0x2bb)]([-0x44,-0x44,-0x44,0x0],0x0);return!![];case _0xb6e6c6(0x2c2):this[_0xb6e6c6(0x2bb)]([0x22,-0x22,-0x44,0xaa],0x0);return!![];case'sunset':this[_0xb6e6c6(0x2bb)]([0x44,-0x22,-0x22,0x0],0x0);return!![];case _0xb6e6c6(0x280):this[_0xb6e6c6(0x2bb)]([-0x44,-0x44,0x0,0x44],0x0);return!![];default:return![];}},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x3a0)]=function(){const _0x592964=_0x5c2f6e;this[_0x592964(0x28a)]={'color':_0x592964(0x218),'targetColor':_0x592964(0x218),'colorDuration':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'cacheOpacity':undefined};},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x167)]=function(){const _0x4ba8fc=_0x5c2f6e;if(this['_lightingEffects']===undefined)this[_0x4ba8fc(0x3a0)]();return this[_0x4ba8fc(0x28a)];},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x405)]=function(){const _0x5319e9=_0x5c2f6e;return this[_0x5319e9(0x167)]()[_0x5319e9(0x166)]??_0x5319e9(0x218);},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x21c)]=function(_0x49f55f,_0x4d2ba3){const _0x21ee8a=_0x5c2f6e;let _0x53fc1e=_0x21ee8a(0x218),_0x367e6a=0xff;_0x4d2ba3=_0x4d2ba3||0x0;if(_0x49f55f[_0x21ee8a(0x20d)](/\#(.*)/i))_0x53fc1e=_0x21ee8a(0x3df)[_0x21ee8a(0x3ec)](String(RegExp['$1']));else{_0x49f55f=_0x49f55f[_0x21ee8a(0x2d4)](),_0x53fc1e=ColorManager[_0x21ee8a(0x398)](_0x49f55f);switch(_0x49f55f){case _0x21ee8a(0x296):case'white':case _0x21ee8a(0x2aa):_0x367e6a=0x0;break;case _0x21ee8a(0x261):case'dark':case _0x21ee8a(0x280):_0x367e6a=0xf0;break;case _0x21ee8a(0x2fd):case'dusk':_0x367e6a=0x80;break;default:if(_0x49f55f[_0x21ee8a(0x20d)](/light/i)){if(_0x21ee8a(0x430)!==_0x21ee8a(0x430)){const _0xb06261=_0x4d1764[_0x21ee8a(0x36f)]*0x2,_0x4452ad=_0xea4dfc[_0x21ee8a(0x2af)]+_0xb06261,_0x168f03=_0x334216[_0x21ee8a(0x158)]+_0xb06261;this['texture']=_0x4fa9f6[_0x21ee8a(0x193)][_0x21ee8a(0x3cd)](_0x4452ad,_0x168f03);}else _0x367e6a=0xc0;}else _0x49f55f[_0x21ee8a(0x20d)](/dark/i)?_0x21ee8a(0x386)===_0x21ee8a(0x386)?_0x367e6a=0xff:this[_0x21ee8a(0x42f)]=_0x19b854[_0x21ee8a(0x360)](_0x484316):_0x367e6a=0xf0;break;}}this[_0x21ee8a(0x411)](_0x53fc1e,_0x4d2ba3),this['shiftLightingOverlayOpacity'](_0x367e6a,_0x4d2ba3);},Game_Screen[_0x5c2f6e(0x368)]['setLightingOverlayColor']=function(_0x430d6b){const _0x371180=_0x5c2f6e;this[_0x371180(0x167)]()[_0x371180(0x166)]=_0x430d6b,this[_0x371180(0x167)]()[_0x371180(0x2ee)]=undefined;},Game_Screen['LIGHTING_EFFECTS_SMART_AUTO_OPACITY']=![],Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x1ad)]=function(){const _0xd276e8=_0x5c2f6e;if($gameMap&&$gameMap[_0xd276e8(0x14b)]())return 0x0;if(Game_Screen[_0xd276e8(0x2f4)]&&Sprite_LightingEffects[_0xd276e8(0x43a)])return this['lightingEffects']()['cacheOpacity']===undefined&&('zZMUp'!==_0xd276e8(0x316)?this['lightingEffects']()[_0xd276e8(0x2ee)]=VisuMZ['LightingEffects'][_0xd276e8(0x37f)]():this[_0xd276e8(0x2a0)]()['color']=_0x2e791a[_0xd276e8(0x398)](_0x235ff2['$1'])),this[_0xd276e8(0x167)]()['cacheOpacity'];return this[_0xd276e8(0x167)]()['opacity']??0xff;},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x2de)]=function(_0x3d0c4f){const _0x371220=_0x5c2f6e;return this[_0x371220(0x167)]()[_0x371220(0x2ee)]=undefined,this[_0x371220(0x167)]()[_0x371220(0x3bc)]=Math[_0x371220(0x155)](_0x3d0c4f)[_0x371220(0x27b)](0x0,0xff);},VisuMZ['LightingEffects'][_0x5c2f6e(0x37f)]=function(){const _0x522eaf=_0x5c2f6e,_0x21c49e=$gameScreen[_0x522eaf(0x167)]()[_0x522eaf(0x3bc)],_0x264b16=$gameScreen[_0x522eaf(0x405)](),_0x5577bb=ColorManager[_0x522eaf(0x300)](_0x264b16),_0x4a3f3d=Math['round'](_0x5577bb['reduce']((_0x2a45cd,_0x5d101d)=>_0x2a45cd+_0x5d101d,0x0)/_0x5577bb[_0x522eaf(0x308)]),_0x416bd5=0xc0;if(_0x4a3f3d<_0x416bd5)return _0x21c49e;const _0x2e84f6=(0xff-_0x4a3f3d)/(0xff-_0x416bd5);return Math[_0x522eaf(0x28e)](_0x2e84f6*_0x21c49e)[_0x522eaf(0x27b)](0x0,0xff);},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x411)]=function(_0x48b905,_0x213979){const _0x3a0fa6=_0x5c2f6e;this[_0x3a0fa6(0x167)]()['targetColor']=_0x48b905,this[_0x3a0fa6(0x167)]()['colorDuration']=_0x213979,_0x213979<=0x0&&(this['lightingEffects']()[_0x3a0fa6(0x166)]=_0x48b905,this[_0x3a0fa6(0x167)]()['cacheOpacity']=undefined);},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x428)]=function(){const _0x1d74f2=_0x5c2f6e;if(this['lightingEffects']()[_0x1d74f2(0x2c5)]<=0x0)return;const _0x3dafe3=this[_0x1d74f2(0x167)]()['colorDuration'],_0x1376ac=ColorManager[_0x1d74f2(0x300)](this['lightingEffects']()[_0x1d74f2(0x166)]),_0x257ea2=ColorManager[_0x1d74f2(0x300)](this[_0x1d74f2(0x167)]()[_0x1d74f2(0x3f9)]);for(let _0x5edcdf=0x0;_0x5edcdf<0x3;_0x5edcdf++){'WceBA'!==_0x1d74f2(0x3a1)?_0x1aae79=_0xbc4f75[_0x1d74f2(0x328)](_0xba90e,_0x5a9b84):_0x1376ac[_0x5edcdf]=Math['round']((_0x1376ac[_0x5edcdf]*(_0x3dafe3-0x1)+_0x257ea2[_0x5edcdf])/_0x3dafe3);}this['lightingEffects']()[_0x1d74f2(0x166)]=ColorManager[_0x1d74f2(0x327)](_0x1376ac),this['lightingEffects']()['cacheOpacity']=undefined,this['lightingEffects']()[_0x1d74f2(0x2c5)]--,this[_0x1d74f2(0x167)]()[_0x1d74f2(0x2c5)]<=0x0&&(this[_0x1d74f2(0x167)]()[_0x1d74f2(0x166)]=this['lightingEffects']()['targetColor']);},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x3b4)]=function(_0x421882,_0x2efb99){const _0x11e1d0=_0x5c2f6e;this[_0x11e1d0(0x167)]()[_0x11e1d0(0x381)]=_0x421882,this['lightingEffects']()[_0x11e1d0(0x1d4)]=_0x2efb99,_0x2efb99<=0x0&&(this[_0x11e1d0(0x167)]()[_0x11e1d0(0x3bc)]=_0x421882,this[_0x11e1d0(0x167)]()[_0x11e1d0(0x2ee)]=undefined);},Game_Screen[_0x5c2f6e(0x368)][_0x5c2f6e(0x342)]=function(){const _0x2fdc01=_0x5c2f6e;if(this[_0x2fdc01(0x167)]()['opacityDuration']<=0x0)return;const _0x12d1b8=this[_0x2fdc01(0x167)]()[_0x2fdc01(0x1d4)],_0x30add9=this[_0x2fdc01(0x167)]()[_0x2fdc01(0x3bc)],_0x4b142c=this[_0x2fdc01(0x167)]()[_0x2fdc01(0x381)];this[_0x2fdc01(0x167)]()['opacity']=(_0x30add9*(_0x12d1b8-0x1)+_0x4b142c)/_0x12d1b8,this['lightingEffects']()[_0x2fdc01(0x2ee)]=undefined,this[_0x2fdc01(0x167)]()[_0x2fdc01(0x1d4)]--,this[_0x2fdc01(0x167)]()['opacityDuration']<=0x0&&(this['lightingEffects']()[_0x2fdc01(0x3bc)]=_0x4b142c);},VisuMZ['LightingEffects'][_0x5c2f6e(0x1a4)]=Game_BattlerBase[_0x5c2f6e(0x368)]['initMembers'],Game_BattlerBase['prototype'][_0x5c2f6e(0x13f)]=function(){VisuMZ['LightingEffects']['Game_BattlerBase_initMembers']['call'](this),this['initLightingEffectsSettings']();},Game_BattlerBase['prototype']['initLightingEffectsSettings']=function(){const _0x52c4d5=_0x5c2f6e;this['_radialLight']={},this[_0x52c4d5(0x31d)]={};},Game_BattlerBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x2a0)]=function(){const _0x15c342=_0x5c2f6e;if(this[_0x15c342(0x441)]===undefined)this[_0x15c342(0x15f)]();return this[_0x15c342(0x441)];},Game_BattlerBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x3f3)]=function(_0x3b4937){const _0x5819d5=_0x5c2f6e;if(this[_0x5819d5(0x441)]===undefined)this[_0x5819d5(0x15f)]();this['_radialLight']=JsonEx[_0x5819d5(0x360)](_0x3b4937);},Game_BattlerBase['prototype'][_0x5c2f6e(0x26b)]=function(){const _0x7ffdd7=_0x5c2f6e;if(this[_0x7ffdd7(0x31d)]===undefined)this['initLightingEffectsSettings']();return this[_0x7ffdd7(0x31d)];},Game_BattlerBase['prototype'][_0x5c2f6e(0x299)]=function(_0x173f41){const _0x57d6fa=_0x5c2f6e;if(this[_0x57d6fa(0x31d)]===undefined)this[_0x57d6fa(0x15f)]();this[_0x57d6fa(0x31d)]=JsonEx[_0x57d6fa(0x360)](_0x173f41),ColorManager[_0x57d6fa(0x2a2)](this[_0x57d6fa(0x31d)]);},Game_Battler['prototype'][_0x5c2f6e(0x43f)]=function(_0x46c41e){const _0x52f0b0=_0x5c2f6e;_0x46c41e=_0x46c41e||'',Game_Event[_0x52f0b0(0x368)][_0x52f0b0(0x41d)][_0x52f0b0(0x25f)](this,_0x46c41e),Game_Event[_0x52f0b0(0x368)][_0x52f0b0(0x2bc)][_0x52f0b0(0x25f)](this,_0x46c41e);},VisuMZ[_0x5c2f6e(0x3d4)]['Game_Actor_setup']=Game_Actor[_0x5c2f6e(0x368)][_0x5c2f6e(0x3bf)],Game_Actor[_0x5c2f6e(0x368)]['setup']=function(_0x50d537){const _0x2df0f6=_0x5c2f6e;VisuMZ[_0x2df0f6(0x3d4)][_0x2df0f6(0x288)][_0x2df0f6(0x25f)](this,_0x50d537),this[_0x2df0f6(0x3a0)](),this[_0x2df0f6(0x43f)]();},Game_Actor[_0x5c2f6e(0x368)][_0x5c2f6e(0x3a0)]=function(){const _0x1508cf=_0x5c2f6e,_0x9077c9=VisuMZ[_0x1508cf(0x3d4)]['Settings'];this[_0x1508cf(0x412)]=JsonEx[_0x1508cf(0x360)](_0x9077c9['HandOffset']),this[_0x1508cf(0x1db)]=JsonEx['makeDeepCopy'](_0x9077c9[_0x1508cf(0x40b)]),this[_0x1508cf(0x1e3)]=JsonEx[_0x1508cf(0x360)](_0x9077c9['VsJumpOffset']);const _0xa877aa=this['actor']()['note']||'';Game_Event[_0x1508cf(0x368)][_0x1508cf(0x3ba)][_0x1508cf(0x25f)](this,_0xa877aa);},Game_Actor['prototype'][_0x5c2f6e(0x1b8)]=function(){const _0x467dcc=_0x5c2f6e;if(this[_0x467dcc(0x412)]===undefined)this[_0x467dcc(0x3a0)]();return this['_conicalLightWalkOffsets'];},Game_Actor[_0x5c2f6e(0x368)]['setConicalLightWalkOffsets']=function(_0x181f8e){const _0x60569a=_0x5c2f6e;if(this['_conicalLightWalkOffsets']===undefined)this[_0x60569a(0x3a0)]();this['_conicalLightWalkOffsets']=JsonEx[_0x60569a(0x360)](_0x181f8e);},Game_Actor['prototype'][_0x5c2f6e(0x1b5)]=function(){const _0x273d29=_0x5c2f6e;if(this[_0x273d29(0x1db)]===undefined)this[_0x273d29(0x3a0)]();return this['_conicalLightDashOffsets'];},Game_Actor[_0x5c2f6e(0x368)]['setConicalLightDashOffsets']=function(_0x1c44c6){const _0x2671c8=_0x5c2f6e;if(this[_0x2671c8(0x1db)]===undefined)this['initLightingEffects']();this[_0x2671c8(0x1db)]=JsonEx[_0x2671c8(0x360)](_0x1c44c6);},Game_Actor[_0x5c2f6e(0x368)]['conicalLightJumpOffsets']=function(){const _0x3deb69=_0x5c2f6e;if(this[_0x3deb69(0x1e3)]===undefined)this[_0x3deb69(0x3a0)]();return this[_0x3deb69(0x1e3)];},Game_Actor[_0x5c2f6e(0x368)]['setConicalLightJumpOffsets']=function(_0x2a714a){const _0x4619f8=_0x5c2f6e;if(this[_0x4619f8(0x1e3)]===undefined)this[_0x4619f8(0x3a0)]();this[_0x4619f8(0x1e3)]=JsonEx[_0x4619f8(0x360)](_0x2a714a);},Game_Actor['prototype'][_0x5c2f6e(0x15f)]=function(){const _0x39234e=_0x5c2f6e;Game_Battler[_0x39234e(0x368)][_0x39234e(0x15f)][_0x39234e(0x25f)](this);const _0x7124cb=VisuMZ[_0x39234e(0x3d4)]['Settings'][_0x39234e(0x2ba)];this[_0x39234e(0x3f3)](_0x7124cb['ActorRadial']),this[_0x39234e(0x299)](_0x7124cb[_0x39234e(0x406)]),this[_0x39234e(0x2a0)]()[_0x39234e(0x233)]=_0x7124cb[_0x39234e(0x1a8)];},Game_Actor[_0x5c2f6e(0x368)][_0x5c2f6e(0x43f)]=function(){const _0x29c7a0=_0x5c2f6e,_0x5be930=this[_0x29c7a0(0x160)]()['note'];Game_Battler[_0x29c7a0(0x368)][_0x29c7a0(0x43f)][_0x29c7a0(0x25f)](this,_0x5be930);},Game_Enemy[_0x5c2f6e(0x368)]['initLightingEffectsSettings']=function(){const _0x9e05be=_0x5c2f6e;Game_Battler[_0x9e05be(0x368)]['initLightingEffectsSettings'][_0x9e05be(0x25f)](this);const _0x35953c=VisuMZ[_0x9e05be(0x3d4)]['Settings'][_0x9e05be(0x2ba)];this[_0x9e05be(0x3f3)](_0x35953c[_0x9e05be(0x1e7)]),this[_0x9e05be(0x299)](_0x35953c[_0x9e05be(0x32e)]),this['radialLight']()[_0x9e05be(0x233)]=_0x35953c[_0x9e05be(0x2a3)];},Game_Enemy[_0x5c2f6e(0x368)][_0x5c2f6e(0x43f)]=function(){const _0x3b181a=_0x5c2f6e,_0x42b358=this[_0x3b181a(0x3e6)]()[_0x3b181a(0x39b)];Game_Battler[_0x3b181a(0x368)]['setupBattleLightingEffectsSettings'][_0x3b181a(0x25f)](this,_0x42b358);},VisuMZ[_0x5c2f6e(0x3d4)]['Game_Map_setup']=Game_Map[_0x5c2f6e(0x368)]['setup'],Game_Map['prototype'][_0x5c2f6e(0x3bf)]=function(_0x256ca7){const _0x36422f=_0x5c2f6e;VisuMZ[_0x36422f(0x3d4)][_0x36422f(0x19d)][_0x36422f(0x25f)](this,_0x256ca7),this[_0x36422f(0x363)](),this['setupLightingEffectsSpawns']();},Game_Map['prototype'][_0x5c2f6e(0x363)]=function(){const _0x14ae78=_0x5c2f6e;if(!$dataMap)return;const _0x24e781=VisuMZ[_0x14ae78(0x3d4)]['RegExp'],_0xd5002a=$dataMap[_0x14ae78(0x39b)]||'',_0x2254d4=(this[_0x14ae78(0x1df)]()?this[_0x14ae78(0x1df)]()[_0x14ae78(0x39b)]:'')||'',_0x3a01c3=VisuMZ['LightingEffects'][_0x14ae78(0x1da)][_0x14ae78(0x2fe)];this['_antiLightMasks']={'hardRegionIDs':_0x3a01c3[_0x14ae78(0x11d)][_0x14ae78(0x19c)](),'hardTerrainTagIDs':_0x3a01c3['HardTerrainTags']['clone'](),'softRegionIDs':_0x3a01c3[_0x14ae78(0x1c0)][_0x14ae78(0x19c)](),'softTerrainTagIDs':_0x3a01c3[_0x14ae78(0x180)][_0x14ae78(0x19c)]()};_0xd5002a[_0x14ae78(0x20d)](_0x24e781[_0x14ae78(0x24e)])&&$gameScreen['processLightingEffectsAutoTint'](RegExp['$1']);this['_noDarknessOverlay']=![];_0xd5002a[_0x14ae78(0x20d)](_0x24e781[_0x14ae78(0x405)])&&$gameScreen['processLightingOverlayColor'](RegExp['$1']);if(_0xd5002a[_0x14ae78(0x20d)](_0x24e781['lightingOverlayOpacityValue']))_0x14ae78(0x3da)!=='SaPez'?$gameScreen['setLightingOverlayOpacity'](Number(RegExp['$1'])):this[_0x14ae78(0x2a0)]()[_0x14ae78(0x39c)]=!![];else{if(_0xd5002a[_0x14ae78(0x20d)](_0x24e781['lightingOverlayOpacityRate'])){const _0x1baaf5=Number(RegExp['$1'])*0.01,_0x296ab7=Math['round'](_0x1baaf5*0xff);$gameScreen['setLightingOverlayOpacity'](_0x296ab7);}}_0xd5002a[_0x14ae78(0x20d)](_0x24e781[_0x14ae78(0x1a2)])&&(this[_0x14ae78(0x26c)]=!![]);_0xd5002a['match'](_0x24e781[_0x14ae78(0x228)])&&(this['_antiLightMasks'][_0x14ae78(0x26f)]=String(RegExp['$1'])[_0x14ae78(0x34b)](',')[_0x14ae78(0x1b7)](_0x59dcd9=>(Number(_0x59dcd9)||0x1)[_0x14ae78(0x27b)](0x1,0xff)));_0x2254d4[_0x14ae78(0x20d)](_0x24e781['antiLightMaskHardTerrainTags'])&&(this[_0x14ae78(0x138)]['hardTerrainTagIDs']=String(RegExp['$1'])['split'](',')[_0x14ae78(0x1b7)](_0x2fae4a=>(Number(_0x2fae4a)||0x1)[_0x14ae78(0x27b)](0x1,0x7)));_0xd5002a['match'](_0x24e781[_0x14ae78(0x42d)])&&(this[_0x14ae78(0x138)][_0x14ae78(0x347)]=String(RegExp['$1'])[_0x14ae78(0x34b)](',')[_0x14ae78(0x1b7)](_0x371939=>(Number(_0x371939)||0x1)['clamp'](0x1,0xff)));if(_0x2254d4[_0x14ae78(0x20d)](_0x24e781[_0x14ae78(0x3e7)])){if('qKpTw'!==_0x14ae78(0x131))this[_0x14ae78(0x138)]['softTerrainTagIDs']=String(RegExp['$1'])['split'](',')[_0x14ae78(0x1b7)](_0x43aade=>(Number(_0x43aade)||0x1)[_0x14ae78(0x27b)](0x1,0x7));else{if(_0x11a152['match'](/\#(.*)/i))return _0x14ae78(0x3df)[_0x14ae78(0x3ec)](_0x47e06d(_0x555fd4['$1']));else{_0x4e1acc=_0x2448ef['toLowerCase']()[_0x14ae78(0x157)]();const _0x3d4971=_0x2f14ed[_0x14ae78(0x3d4)][_0x14ae78(0x1da)]['PresetColors'];if(_0x3d4971&&_0x3d4971[_0x4a8ec8])return _0x3d4971[_0x99bb90];switch(_0x251794){case'-':case'white':case _0x14ae78(0x296):case _0x14ae78(0x2aa):case _0x14ae78(0x1ed):return _0x14ae78(0x218);case _0x14ae78(0x261):case _0x14ae78(0x16e):return'#000000';case _0x14ae78(0x13b):return _0x14ae78(0x387);case'green':return'#00ff00';case'blue':return _0x14ae78(0x221);case'yellow':return _0x14ae78(0x240);case'magenta':return'#ff00ff';case _0x14ae78(0x26d):return _0x14ae78(0x3ce);case _0x14ae78(0x2d7):return _0x14ae78(0x3db);case'purple':return'#92278f';case _0x14ae78(0x42a):return'#f06eaa';case _0x14ae78(0x214):return _0x14ae78(0x372);case _0x14ae78(0x3c7):case'gray':return'#888888';case'light\x20red':return'#f69679';case _0x14ae78(0x2ad):return _0x14ae78(0x241);case _0x14ae78(0x190):return'#fff799';case _0x14ae78(0x40a):return _0x14ae78(0x305);case _0x14ae78(0x353):return _0x14ae78(0x260);case'light\x20blue':return _0x14ae78(0x33b);case'light\x20purple':return'#a186be';case _0x14ae78(0x270):return'#bd8cbf';case'light\x20pink':return _0x14ae78(0x3d1);case _0x14ae78(0x3e1):return _0x14ae78(0x244);case _0x14ae78(0x315):case'light\x20gray':return _0x14ae78(0x321);case _0x14ae78(0x205):return _0x14ae78(0x287);case _0x14ae78(0x17a):return _0x14ae78(0x35f);case _0x14ae78(0x30a):return'#827b00';case _0x14ae78(0x362):return'#005e20';case _0x14ae78(0x1bb):return _0x14ae78(0x2e8);case _0x14ae78(0x215):return _0x14ae78(0x343);case'dark\x20purple':return _0x14ae78(0x19b);case _0x14ae78(0x191):return _0x14ae78(0x43b);case _0x14ae78(0x201):return'#9e0039';case _0x14ae78(0x1fc):return'#603913';case _0x14ae78(0x407):case _0x14ae78(0x38d):return _0x14ae78(0x3ab);case'dawn':return'#5674b9';case _0x14ae78(0x173):return _0x14ae78(0x3db);case'night':return'#2e3192';}}}}},Game_Map[_0x5c2f6e(0x368)]['hasAntiLightTiles']=function(){const _0x1c50c8=_0x5c2f6e;if(this[_0x1c50c8(0x32d)]()['length']>0x0)return!![];if(this[_0x1c50c8(0x31e)]()['length']>0x0)return!![];return![];},Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x32d)]=function(){const _0x3f3931=_0x5c2f6e;if(this[_0x3f3931(0x138)]===undefined)this['setupLightingEffectsNotetags']();return this[_0x3f3931(0x138)]?.[_0x3f3931(0x26f)]??[];},Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x31e)]=function(){const _0x19c4a1=_0x5c2f6e;if(this[_0x19c4a1(0x138)]===undefined)this['setupLightingEffectsNotetags']();return this['_antiLightMasks']?.['hardTerrainTagIDs']??[];},Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x3c0)]=function(){const _0x246035=_0x5c2f6e;if(this[_0x246035(0x138)]===undefined)this[_0x246035(0x363)]();return this[_0x246035(0x138)]?.[_0x246035(0x347)]??[];},Game_Map['prototype'][_0x5c2f6e(0x1a0)]=function(){const _0x28a0c6=_0x5c2f6e;if(this[_0x28a0c6(0x138)]===undefined)this[_0x28a0c6(0x363)]();return this[_0x28a0c6(0x138)]?.[_0x28a0c6(0x2c6)]??[];},Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x43d)]=function(){const _0x57805f=_0x5c2f6e;this[_0x57805f(0x301)]=[],$gameTemp[_0x57805f(0x3fe)]=[];},Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x219)]=function(){const _0xf74433=_0x5c2f6e;if(this[_0xf74433(0x301)]===undefined)this['setupLightingEffectsSpawns']();return this[_0xf74433(0x301)];},VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x35d)]=Game_Map['prototype'][_0x5c2f6e(0x1b2)],Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b2)]=function(_0x5c4a42){const _0x5b3be9=_0x5c2f6e;VisuMZ[_0x5b3be9(0x3d4)][_0x5b3be9(0x35d)][_0x5b3be9(0x25f)](this,_0x5c4a42),this[_0x5b3be9(0x24c)]();},Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x24c)]=function(){const _0x31ece1=_0x5c2f6e,_0x4e68e7=this[_0x31ece1(0x219)]()[_0x31ece1(0x308)];for(let _0x4b8ad4=0x0;_0x4b8ad4<_0x4e68e7;_0x4b8ad4++){const _0xe37761=this[_0x31ece1(0x219)]()[_0x4b8ad4];if(!_0xe37761)continue;if(!_0xe37761[_0x31ece1(0x115)])continue;$gameTemp[_0x31ece1(0x2f7)](_0x4b8ad4,_0xe37761),_0xe37761[_0x31ece1(0x3e3)]++;if(_0xe37761[_0x31ece1(0x415)]<Number['MAX_SAFE_INTEGER'])_0xe37761[_0x31ece1(0x415)]--;if(_0xe37761[_0x31ece1(0x415)]<=0x0)_0xe37761[_0x31ece1(0x115)]=![];}},Game_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x17d)]=function(_0x1fcb12){const _0x4bcf81=_0x5c2f6e;$gameTemp['createLightSpawnFunction'](_0x1fcb12),this[_0x4bcf81(0x219)]()['push'](_0x1fcb12);const _0x9607f2=new Sprite_LightSpawn(_0x1fcb12);SceneManager['addChildToLightContainer'](_0x9607f2);},Game_Map[_0x5c2f6e(0x368)]['isAntiLightingOverlay']=function(){return this['_noDarknessOverlay'];},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x15f)]=function(){const _0x1caa82=_0x5c2f6e;this['_radialLight']={},this[_0x1caa82(0x31d)]={},this[_0x1caa82(0x1f2)]={},this['_conicalLightBehavior']={};const _0x5c50cc=VisuMZ['LightingEffects'][_0x1caa82(0x1da)];this[_0x1caa82(0x412)]=JsonEx[_0x1caa82(0x360)](_0x5c50cc[_0x1caa82(0x3ae)]),this['_conicalLightDashOffsets']=JsonEx['makeDeepCopy'](_0x5c50cc[_0x1caa82(0x40b)]),this[_0x1caa82(0x1e3)]=JsonEx[_0x1caa82(0x360)](_0x5c50cc['VsJumpOffset']);},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x2a0)]=function(){const _0x4ff0b1=_0x5c2f6e;if(this['_radialLight']===undefined)this[_0x4ff0b1(0x15f)]();return this[_0x4ff0b1(0x441)];},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x3f3)]=function(_0x554bd4){const _0x4ac960=_0x5c2f6e;if(this[_0x4ac960(0x441)]===undefined)this['initLightingEffectsSettings']();this[_0x4ac960(0x441)]=JsonEx[_0x4ac960(0x360)](_0x554bd4);},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x26b)]=function(){const _0x57a7cf=_0x5c2f6e;if(this['_radialLightBehavior']===undefined)this[_0x57a7cf(0x15f)]();return this[_0x57a7cf(0x31d)];},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x299)]=function(_0x5a92c3){const _0x5a1150=_0x5c2f6e;if(this['_radialLightBehavior']===undefined)this[_0x5a1150(0x15f)]();this['_radialLightBehavior']=JsonEx[_0x5a1150(0x360)](_0x5a92c3),ColorManager['RetrieveOpacityPattern'](this[_0x5a1150(0x31d)]);},Game_CharacterBase[_0x5c2f6e(0x368)]['conicalLight']=function(){const _0xee0a75=_0x5c2f6e;if(this[_0xee0a75(0x1f2)]===undefined)this[_0xee0a75(0x15f)]();return this[_0xee0a75(0x1f2)];},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x27f)]=function(_0x2ca4a4){const _0x1bbbc5=_0x5c2f6e;if(this[_0x1bbbc5(0x1f2)]===undefined)this[_0x1bbbc5(0x15f)]();this[_0x1bbbc5(0x1f2)]=JsonEx[_0x1bbbc5(0x360)](_0x2ca4a4);},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x13e)]=function(){const _0x1ef5ac=_0x5c2f6e;if(this[_0x1ef5ac(0x14e)]===undefined)this['initLightingEffectsSettings']();return this[_0x1ef5ac(0x14e)];},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x1f9)]=function(_0x139263){const _0x227282=_0x5c2f6e;if(this['_conicalLightBehavior']===undefined)this['initLightingEffectsSettings']();this['_conicalLightBehavior']=JsonEx[_0x227282(0x360)](_0x139263),ColorManager[_0x227282(0x2a2)](this[_0x227282(0x14e)]);},Game_CharacterBase[_0x5c2f6e(0x368)]['conicalLightOffsets']=function(){const _0x1d681d=_0x5c2f6e;if(this['isSpriteVS8dir']()){if(this['isDashingAndMoving']())return this[_0x1d681d(0x1b5)]();else{if(this[_0x1d681d(0x429)]())return this[_0x1d681d(0x350)]();}}return this[_0x1d681d(0x1b8)]();},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b8)]=function(){const _0x4714da=_0x5c2f6e;if(this[_0x4714da(0x412)]===undefined)this[_0x4714da(0x3a0)]();return this[_0x4714da(0x412)];},Game_CharacterBase[_0x5c2f6e(0x368)]['setConicalLightWalkOffsets']=function(_0x5d84a4){const _0x3b426d=_0x5c2f6e;if(this['_conicalLightWalkOffsets']===undefined)this[_0x3b426d(0x3a0)]();this[_0x3b426d(0x412)]=JsonEx[_0x3b426d(0x360)](_0x5d84a4);},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b5)]=function(){const _0x573fc1=_0x5c2f6e;if(this[_0x573fc1(0x1db)]===undefined)this[_0x573fc1(0x3a0)]();return this[_0x573fc1(0x1db)];},Game_CharacterBase[_0x5c2f6e(0x368)]['setConicalLightDashOffsets']=function(_0x2786b4){const _0x359736=_0x5c2f6e;if(this[_0x359736(0x1db)]===undefined)this[_0x359736(0x3a0)]();this[_0x359736(0x1db)]=JsonEx['makeDeepCopy'](_0x2786b4);},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x350)]=function(){const _0x27308b=_0x5c2f6e;if(this[_0x27308b(0x412)]===undefined)this['initLightingEffects']();return this[_0x27308b(0x412)];},Game_CharacterBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x174)]=function(_0x13654d){const _0x542cbb=_0x5c2f6e;if(this[_0x542cbb(0x1e3)]===undefined)this[_0x542cbb(0x3a0)]();this[_0x542cbb(0x1e3)]=JsonEx[_0x542cbb(0x360)](_0x13654d);},VisuMZ['LightingEffects'][_0x5c2f6e(0x250)]=Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x13f)],Game_Player['prototype'][_0x5c2f6e(0x13f)]=function(){const _0x46bc43=_0x5c2f6e;VisuMZ[_0x46bc43(0x3d4)][_0x46bc43(0x250)]['call'](this),this['initLightingEffects']();},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x3a0)]=function(){const _0x25a90e=_0x5c2f6e,_0x3a08c6=VisuMZ['LightingEffects']['Settings'][_0x25a90e(0x263)];this['setFollowerRadialLightSettings'](_0x3a08c6[_0x25a90e(0x28c)]),this['setFollowerRadialLightBehavior'](_0x3a08c6[_0x25a90e(0x2ab)]),this[_0x25a90e(0x126)](_0x3a08c6[_0x25a90e(0x1c7)]),this[_0x25a90e(0x29d)](_0x3a08c6[_0x25a90e(0x3d2)]);},Game_Player['prototype']['initLightingEffectsSettings']=function(){const _0x4f86cc=_0x5c2f6e;Game_Character[_0x4f86cc(0x368)][_0x4f86cc(0x15f)][_0x4f86cc(0x25f)](this);const _0x2831a2=VisuMZ[_0x4f86cc(0x3d4)]['Settings'][_0x4f86cc(0x263)];this[_0x4f86cc(0x3f3)](_0x2831a2[_0x4f86cc(0x3f4)]),this[_0x4f86cc(0x299)](_0x2831a2[_0x4f86cc(0x253)]),this['setConicalLightSettings'](_0x2831a2['PlayerConical']),this[_0x4f86cc(0x1f9)](_0x2831a2[_0x4f86cc(0x2b8)]);},Game_Player['prototype'][_0x5c2f6e(0x217)]=function(){const _0x18f4bd=_0x5c2f6e;if(this[_0x18f4bd(0x42f)]===undefined)this[_0x18f4bd(0x3a0)]();return this[_0x18f4bd(0x42f)];},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x33e)]=function(_0xf22099){const _0x619bf9=_0x5c2f6e;this[_0x619bf9(0x42f)]=JsonEx['makeDeepCopy'](_0xf22099);},Game_Player['prototype'][_0x5c2f6e(0x33c)]=function(){const _0x584a51=_0x5c2f6e;if(this['_followerRadialLightBehavior']===undefined)this[_0x584a51(0x15f)]();return this['_followerRadialLightBehavior'];},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x227)]=function(_0x291d5c){const _0x42022a=_0x5c2f6e;if(this[_0x42022a(0x25e)]===undefined)this[_0x42022a(0x15f)]();this[_0x42022a(0x25e)]=JsonEx[_0x42022a(0x360)](_0x291d5c),ColorManager[_0x42022a(0x2a2)](this['_followerRadialLightBehavior']);},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x276)]=function(){const _0x2fbdcf=_0x5c2f6e;if(this[_0x2fbdcf(0x20f)]===undefined)this[_0x2fbdcf(0x3a0)]();return this['_followerConicalLight'];},Game_Player[_0x5c2f6e(0x368)]['setFollowerConicalLightSettings']=function(_0x11e9f8){const _0x3ba728=_0x5c2f6e;this[_0x3ba728(0x20f)]=JsonEx['makeDeepCopy'](_0x11e9f8);},Game_Player[_0x5c2f6e(0x368)]['getFollowerConicalLightBehavior']=function(){const _0x56af5f=_0x5c2f6e;if(this[_0x56af5f(0x1ef)]===undefined)this['initLightingEffectsSettings']();return this[_0x56af5f(0x1ef)];},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x29d)]=function(_0x3c3f76){const _0x25de02=_0x5c2f6e;if(this['_followerConicalLightBehavior']===undefined)this[_0x25de02(0x15f)]();this[_0x25de02(0x1ef)]=JsonEx[_0x25de02(0x360)](_0x3c3f76),ColorManager[_0x25de02(0x2a2)](this[_0x25de02(0x1ef)]);},Game_Player[_0x5c2f6e(0x368)]['conicalLightWalkOffsets']=function(){const _0x107f6e=_0x5c2f6e;if($gameParty[_0x107f6e(0x2d9)]())return $gameParty[_0x107f6e(0x2d9)]()[_0x107f6e(0x1b8)]();else{if(_0x107f6e(0x18b)!==_0x107f6e(0x12b))return Game_Character['prototype'][_0x107f6e(0x1b8)][_0x107f6e(0x25f)](this);else this[_0x107f6e(0x444)]();}},Game_Player['prototype'][_0x5c2f6e(0x3de)]=function(_0x71d6ef){const _0x3883e7=_0x5c2f6e;$gameParty['leader']()?$gameParty[_0x3883e7(0x2d9)]()['setConicalLightWalkOffsets'](_0x71d6ef):Game_Character[_0x3883e7(0x368)][_0x3883e7(0x3de)][_0x3883e7(0x25f)](this,_0x71d6ef);},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b5)]=function(){const _0x41274c=_0x5c2f6e;if($gameParty[_0x41274c(0x2d9)]()){if(_0x41274c(0x1ac)===_0x41274c(0x1ac))return $gameParty[_0x41274c(0x2d9)]()[_0x41274c(0x1b5)]();else{_0x10e06e[_0x41274c(0x422)](_0x4df302,_0x23926d);const _0xa90dc2=_0x40a44d[_0x41274c(0x2c1)](),_0x52be26=_0x442f0d[_0x41274c(0x41b)],_0x2a407e=_0x54e4cd[_0x41274c(0x2f0)],_0x6f3cbf=_0x1ea986['UnboardedSettings'],_0x345c3c=_0x417b6e[_0x41274c(0x1ca)];if(_0xa90dc2){const _0x182394=![];_0xa90dc2[_0x41274c(0x31b)](_0x52be26,!![],_0x182394,![]),_0xa90dc2[_0x41274c(0x31b)](_0x2a407e,!![],_0x182394,!![]),_0xa90dc2[_0x41274c(0x31b)](_0x6f3cbf,![],_0x182394,![]),_0xa90dc2[_0x41274c(0x31b)](_0x345c3c,![],_0x182394,!![]);}}}else return Game_Character['prototype'][_0x41274c(0x1b5)][_0x41274c(0x25f)](this);},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x2f9)]=function(_0x4f9941){const _0x4624a3=_0x5c2f6e;if($gameParty[_0x4624a3(0x2d9)]())$gameParty[_0x4624a3(0x2d9)]()['setConicalLightDashOffsets'](_0x4f9941);else{if(_0x4624a3(0x341)===_0x4624a3(0x3a5)){if(!this[_0x4624a3(0x37b)]())return;const _0x4e13bc=this[_0x4624a3(0x23a)]();let _0x521bf2='';for(const _0x5044fb of _0x4e13bc){if([0x6c,0x198][_0x4624a3(0x29f)](_0x5044fb['code'])){if(_0x521bf2!=='')_0x521bf2+='\x0a';_0x521bf2+=_0x5044fb[_0x4624a3(0x1a6)][0x0];}}this[_0x4624a3(0x242)](_0x521bf2);}else Game_Character['prototype'][_0x4624a3(0x2f9)]['call'](this,_0x4f9941);}},Game_Player['prototype'][_0x5c2f6e(0x350)]=function(){const _0x47cbf9=_0x5c2f6e;if($gameParty[_0x47cbf9(0x2d9)]()){if(_0x47cbf9(0x1f1)!==_0x47cbf9(0x1f1)){const _0x5a8fde=!![];_0x1554a9['setVehicleLightingData'](_0x2db222,!![],_0x5a8fde,![]),_0x212f0a[_0x47cbf9(0x31b)](_0x265b25,!![],_0x5a8fde,!![]),_0xe76999[_0x47cbf9(0x31b)](_0x3bbcb3,![],_0x5a8fde,![]),_0x17ba90[_0x47cbf9(0x31b)](_0x2a7164,![],_0x5a8fde,!![]);}else return $gameParty[_0x47cbf9(0x2d9)]()['conicalLightJumpOffsets']();}else return Game_Character[_0x47cbf9(0x368)][_0x47cbf9(0x350)]['call'](this);},Game_Player[_0x5c2f6e(0x368)][_0x5c2f6e(0x174)]=function(_0x4ea5c2){const _0x454041=_0x5c2f6e;if($gameParty[_0x454041(0x2d9)]())$gameParty['leader']()['setConicalLightJumpOffsets'](_0x4ea5c2);else{if(_0x454041(0x2d3)==='IIcRc'){const _0x5683d6=_0x287288['opacity%1'[_0x454041(0x3ec)](_0x58e1a6)]||[];if(_0x5683d6[_0x454041(0x29f)](_0x508283))return _0x568803;_0x1be899-=0x5;}else Game_Character[_0x454041(0x368)]['setConicalLightJumpOffsets'][_0x454041(0x25f)](this,_0x4ea5c2);}},Game_Follower['prototype']['radialLight']=function(){const _0x19d491=_0x5c2f6e;return $gamePlayer[_0x19d491(0x217)]();},Game_Follower[_0x5c2f6e(0x368)][_0x5c2f6e(0x26b)]=function(){const _0x1da871=_0x5c2f6e;return $gamePlayer[_0x1da871(0x33c)]();},Game_Follower[_0x5c2f6e(0x368)][_0x5c2f6e(0x352)]=function(){const _0xbf6600=_0x5c2f6e;return $gamePlayer[_0xbf6600(0x276)]();},Game_Follower[_0x5c2f6e(0x368)][_0x5c2f6e(0x13e)]=function(){return $gamePlayer['getFollowerConicalLightBehavior']();},Game_Follower[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b8)]=function(){const _0x2ac739=_0x5c2f6e;return this['actor']()?this[_0x2ac739(0x160)]()['conicalLightWalkOffsets']():Game_Character[_0x2ac739(0x368)]['conicalLightWalkOffsets'][_0x2ac739(0x25f)](this);},Game_Follower[_0x5c2f6e(0x368)][_0x5c2f6e(0x3de)]=function(_0x46aa77){const _0x3ad83c=_0x5c2f6e;this[_0x3ad83c(0x160)]()?this[_0x3ad83c(0x160)]()['setConicalLightWalkOffsets'](_0x46aa77):Game_Character[_0x3ad83c(0x368)][_0x3ad83c(0x3de)][_0x3ad83c(0x25f)](this,_0x46aa77);},Game_Follower[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b5)]=function(){const _0x3daa21=_0x5c2f6e;if(this[_0x3daa21(0x160)]())return this[_0x3daa21(0x160)]()['conicalLightDashOffsets']();else{if(_0x3daa21(0x1c6)!==_0x3daa21(0x382))return Game_Character['prototype'][_0x3daa21(0x1b5)][_0x3daa21(0x25f)](this);else this[_0x3daa21(0x1cb)]['x']=0.5,this[_0x3daa21(0x1cb)]['y']=0.5,this[_0x3daa21(0x1cf)]['x']=0x1,this[_0x3daa21(0x1cf)]['y']=0x1,this['_glowRng']=_0x35716['randomInt'](0xf4240),this[_0x3daa21(0x389)]=_0x50c774['randomInt'](0xf4240),this[_0x3daa21(0x243)]=0x0;}},Game_Follower[_0x5c2f6e(0x368)][_0x5c2f6e(0x2f9)]=function(_0x30b9da){const _0x1cb422=_0x5c2f6e;this[_0x1cb422(0x160)]()?this[_0x1cb422(0x160)]()[_0x1cb422(0x2f9)](_0x30b9da):Game_Character[_0x1cb422(0x368)][_0x1cb422(0x2f9)][_0x1cb422(0x25f)](this,_0x30b9da);},Game_Follower[_0x5c2f6e(0x368)]['conicalLightJumpOffsets']=function(){const _0x450308=_0x5c2f6e;return this[_0x450308(0x160)]()?this[_0x450308(0x160)]()['conicalLightJumpOffsets']():Game_Character[_0x450308(0x368)][_0x450308(0x350)][_0x450308(0x25f)](this);},Game_Follower['prototype'][_0x5c2f6e(0x174)]=function(_0x1dd281){const _0x434379=_0x5c2f6e;this[_0x434379(0x160)]()?_0x434379(0x2b2)==='eioEg'?this[_0x434379(0x160)]()[_0x434379(0x174)](_0x1dd281):_0x3dfe55[_0x434379(0x352)]()[_0x434379(0x1d6)]=_0x32c823:Game_Character[_0x434379(0x368)]['setConicalLightJumpOffsets'][_0x434379(0x25f)](this,_0x1dd281);},Game_Vehicle['prototype']['initLightingEffectsSettings']=function(){const _0x2bb7a8=_0x5c2f6e;Game_Character[_0x2bb7a8(0x368)][_0x2bb7a8(0x15f)][_0x2bb7a8(0x25f)](this),this[_0x2bb7a8(0x444)]();},Game_Vehicle['prototype'][_0x5c2f6e(0x444)]=function(){const _0x36509c=_0x5c2f6e;let _0x1f4ed6=this[_0x36509c(0x231)]();_0x1f4ed6=this[_0x36509c(0x1be)](_0x1f4ed6),this['_vehicleLightingSettings']=_0x1f4ed6;},Game_Vehicle[_0x5c2f6e(0x368)][_0x5c2f6e(0x231)]=function(){return{'Boarded':{'Radial':{'Settings':{},'Behavior':{}},'Conical':{'Settings':{},'Behavior':{},'Offset':{}}},'Unboarded':{'Radial':{'Settings':{},'Behavior':{}},'Conical':{'Settings':{},'Behavior':{},'Offset':{}}}};},Game_Vehicle['prototype'][_0x5c2f6e(0x1be)]=function(_0x54c172){const _0x403f06=_0x5c2f6e,_0x4ee418=VisuMZ['LightingEffects'][_0x403f06(0x1da)][_0x403f06(0x263)];let _0x4e0f7d='';if(this[_0x403f06(0x247)]())_0x4e0f7d=_0x403f06(0x303);if(this[_0x403f06(0x400)]())_0x4e0f7d=_0x403f06(0x20a);if(this[_0x403f06(0x42c)]())_0x4e0f7d=_0x403f06(0x152);const _0x1343a5=['Boarded','Unboarded'],_0x464776=[_0x403f06(0x2bf),'Conical'],_0x30fe30=[_0x403f06(0x1da),_0x403f06(0x366),_0x403f06(0x1d0)];for(let _0x460b4c=0x0;_0x460b4c<_0x1343a5[_0x403f06(0x308)];_0x460b4c++){if('LecnF'!==_0x403f06(0x1fe)){let _0x51835b=_0x1343a5[_0x460b4c];for(let _0x252e73=0x0;_0x252e73<_0x464776[_0x403f06(0x308)];_0x252e73++){let _0x163e10=_0x464776[_0x252e73];for(let _0x22119b=0x0;_0x22119b<_0x30fe30[_0x403f06(0x308)];_0x22119b++){let _0x1f1aa0=_0x30fe30[_0x22119b];const _0x12c21c=_0x403f06(0x1cc)[_0x403f06(0x3ec)](_0x4e0f7d,_0x51835b,_0x163e10,_0x1f1aa0);_0x4ee418[_0x12c21c]&&(_0x54c172[_0x51835b][_0x163e10][_0x1f1aa0]=JsonEx[_0x403f06(0x360)](_0x4ee418[_0x12c21c]));}}}else this['conicalLight']()[_0x403f06(0x2ef)]=(_0x28c220(_0x4f3016['$1'])*0.01)['clamp'](0x0,0x1);}return _0x54c172;},Game_Vehicle[_0x5c2f6e(0x368)][_0x5c2f6e(0x2ca)]=function(_0x4e827b,_0x1a2abc,_0x3788c2){const _0x5d33d4=_0x5c2f6e;this[_0x5d33d4(0x2a8)]===undefined&&this[_0x5d33d4(0x444)]();const _0x59f640=_0x4e827b?_0x5d33d4(0x17f):_0x5d33d4(0x33d),_0x3018e1=_0x1a2abc?_0x5d33d4(0x2bf):_0x5d33d4(0x16c),_0xb9a7ee=_0x3788c2?_0x5d33d4(0x366):_0x5d33d4(0x1da);return this[_0x5d33d4(0x2a8)][_0x59f640][_0x3018e1][_0xb9a7ee];},Game_Vehicle[_0x5c2f6e(0x368)][_0x5c2f6e(0x31b)]=function(_0x2daa18,_0x223342,_0x72eb04,_0x12c07d){const _0x8557d0=_0x5c2f6e;this['_vehicleLightingSettings']===undefined&&(_0x8557d0(0x24d)!==_0x8557d0(0x24d)?this['radialLightBehavior']()['flareRate']=_0x3f180f(_0x557e98['$1'])*0.01:this[_0x8557d0(0x444)]());const _0x4b3765=_0x223342?_0x8557d0(0x17f):'Unboarded',_0x39d63e=_0x72eb04?_0x8557d0(0x2bf):_0x8557d0(0x16c),_0x51d4df=_0x12c07d?_0x8557d0(0x366):_0x8557d0(0x1da);this[_0x8557d0(0x2a8)][_0x4b3765][_0x39d63e][_0x51d4df]=JsonEx['makeDeepCopy'](_0x2daa18);},Game_Vehicle['prototype'][_0x5c2f6e(0x403)]=function(_0x3011e4,_0x3d5613){const _0x589502=_0x5c2f6e;this[_0x589502(0x2a8)]===undefined&&this['initVehicleLightingEffectsSettings']();const _0x1a2e11=_0x3d5613?_0x589502(0x17f):_0x589502(0x33d),_0x37bf74=_0x589502(0x16c),_0x16be76=_0x589502(0x1d0);this[_0x589502(0x2a8)][_0x1a2e11][_0x37bf74][_0x16be76]=JsonEx[_0x589502(0x360)](_0x3011e4);},Game_Vehicle[_0x5c2f6e(0x368)][_0x5c2f6e(0x2a0)]=function(){const _0x504bc9=_0x5c2f6e;return this[_0x504bc9(0x2ca)](this[_0x504bc9(0x399)],!![],![]);},Game_Vehicle[_0x5c2f6e(0x368)][_0x5c2f6e(0x26b)]=function(){const _0x15d926=_0x5c2f6e;return this[_0x15d926(0x2ca)](this[_0x15d926(0x399)],!![],!![]);},Game_Vehicle[_0x5c2f6e(0x368)][_0x5c2f6e(0x352)]=function(){const _0x5e201f=_0x5c2f6e,_0x1f757d=this['_driving']?_0x5e201f(0x17f):_0x5e201f(0x33d),_0x4004d6=![]?_0x5e201f(0x2bf):_0x5e201f(0x16c),_0x685dc5=![]?_0x5e201f(0x366):'Settings';return this['getVehicleLightingData'](this[_0x5e201f(0x399)],![],![]);},Game_Vehicle['prototype'][_0x5c2f6e(0x13e)]=function(){const _0x385af1=_0x5c2f6e;return this[_0x385af1(0x2ca)](this['_driving'],![],!![]);},Game_Vehicle[_0x5c2f6e(0x368)][_0x5c2f6e(0x146)]=function(){const _0x3c6ed0=_0x5c2f6e;if(this[_0x3c6ed0(0x2a8)]===undefined){if(_0x3c6ed0(0x39a)!=='YMTpQ'){if(this[_0x3c6ed0(0x441)]===_0x5dda77)this[_0x3c6ed0(0x15f)]();return this[_0x3c6ed0(0x441)];}else this['initVehicleLightingEffectsSettings']();}if(this[_0x3c6ed0(0x399)]){if(_0x3c6ed0(0x33a)===_0x3c6ed0(0x33a))return this[_0x3c6ed0(0x2a8)]['Boarded'][_0x3c6ed0(0x16c)][_0x3c6ed0(0x1d0)];else this[_0x3c6ed0(0x352)]()[_0x3c6ed0(0x3bc)]=_0x355d0f(_0xd96473['$1'])[_0x3c6ed0(0x27b)](0x0,0xff);}else return this[_0x3c6ed0(0x2a8)][_0x3c6ed0(0x33d)][_0x3c6ed0(0x16c)][_0x3c6ed0(0x1d0)];},VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x3be)]=Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x1f8)],Game_Event['prototype']['clearPageSettings']=function(){const _0x50f4f1=_0x5c2f6e;VisuMZ[_0x50f4f1(0x3d4)][_0x50f4f1(0x3be)][_0x50f4f1(0x25f)](this),this[_0x50f4f1(0x15f)]();},VisuMZ['LightingEffects'][_0x5c2f6e(0x38a)]=Game_Event[_0x5c2f6e(0x368)]['setupPageSettings'],Game_Event['prototype'][_0x5c2f6e(0x11f)]=function(){const _0x4e5d95=_0x5c2f6e;VisuMZ[_0x4e5d95(0x3d4)][_0x4e5d95(0x38a)][_0x4e5d95(0x25f)](this),this[_0x4e5d95(0x282)]();},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x282)]=function(){const _0x153500=_0x5c2f6e;if(!this[_0x153500(0x452)]())return;this[_0x153500(0x15f)](),this[_0x153500(0x363)](),this[_0x153500(0x36b)]();},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x363)]=function(){const _0x48f381=_0x5c2f6e,_0x3f8c39=this[_0x48f381(0x452)]()[_0x48f381(0x39b)];if(_0x3f8c39==='')return;this['checkLightingEffectsStringTags'](_0x3f8c39);},Game_Event[_0x5c2f6e(0x368)]['setupLightingEffectsCommentTags']=function(){const _0x3b06ed=_0x5c2f6e;if(!this[_0x3b06ed(0x37b)]())return;const _0x24e334=this['list']();let _0x384e1c='';for(const _0x417f2a of _0x24e334){if([0x6c,0x198][_0x3b06ed(0x29f)](_0x417f2a[_0x3b06ed(0x39d)])){if(_0x3b06ed(0x2f8)==='QXwHh'){if(_0x384e1c!=='')_0x384e1c+='\x0a';_0x384e1c+=_0x417f2a[_0x3b06ed(0x1a6)][0x0];}else _0x50f5eb[_0x3b06ed(0x3d4)]['Game_Actor_setup'][_0x3b06ed(0x25f)](this,_0xdcddd2),this[_0x3b06ed(0x3a0)](),this['setupBattleLightingEffectsSettings']();}}this['checkLightingEffectsStringTags'](_0x384e1c);},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x15f)]=function(){const _0x1932f6=_0x5c2f6e;Game_Character[_0x1932f6(0x368)]['initLightingEffectsSettings'][_0x1932f6(0x25f)](this);const _0x13d03f=VisuMZ['LightingEffects'][_0x1932f6(0x1da)][_0x1932f6(0x263)];this[_0x1932f6(0x3f3)](_0x13d03f['EventRadial']),this[_0x1932f6(0x299)](_0x13d03f['EventRadialBehavior']),this[_0x1932f6(0x27f)](_0x13d03f[_0x1932f6(0x1b9)]),this[_0x1932f6(0x1f9)](_0x13d03f[_0x1932f6(0x3e9)]);},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x242)]=function(_0x3ab3be){const _0x3024ac=_0x5c2f6e;this['checkRadialLightBasicStringTags'](_0x3ab3be),this[_0x3024ac(0x2bc)](_0x3ab3be),this[_0x3024ac(0x262)](_0x3ab3be),this['checkConicalLightBehaviorStringTags'](_0x3ab3be),this[_0x3024ac(0x3ba)](_0x3ab3be);},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x41d)]=function(_0x19ecb6){const _0x12d9cb=_0x5c2f6e,_0xbac471=VisuMZ[_0x12d9cb(0x3d4)][_0x12d9cb(0x1d9)];if(_0x19ecb6['match'](_0xbac471['RadialLightGeneric']))this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x39c)]=!![];else{if(_0x19ecb6[_0x12d9cb(0x20d)](_0xbac471[_0x12d9cb(0x2b0)]))this['radialLight']()[_0x12d9cb(0x39c)]=!![];else _0x19ecb6['match'](_0xbac471[_0x12d9cb(0x408)])&&(this['radialLight']()[_0x12d9cb(0x39c)]=![]);}_0x19ecb6['match'](_0xbac471[_0x12d9cb(0x21f)])&&(_0x12d9cb(0x42b)===_0x12d9cb(0x394)?_0x284692[_0x12d9cb(0x2d9)]()?_0x1d5284['leader']()[_0x12d9cb(0x3de)](_0x2ef0e1):_0x6dd9cd[_0x12d9cb(0x368)][_0x12d9cb(0x3de)]['call'](this,_0x4c7d3b):this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x1e4)]=String(RegExp['$1'])[_0x12d9cb(0x157)]());_0x19ecb6[_0x12d9cb(0x20d)](_0xbac471[_0x12d9cb(0x156)])&&(_0x12d9cb(0x348)!=='ZEHvL'?(_0x307c2c['LightingEffects'][_0x12d9cb(0x1a4)][_0x12d9cb(0x25f)](this),this['initLightingEffectsSettings']()):this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x166)]=ColorManager[_0x12d9cb(0x398)](RegExp['$1']));if(_0x19ecb6[_0x12d9cb(0x20d)](_0xbac471['RadialLightRadius']))this['radialLight']()[_0x12d9cb(0x2b6)]=Number(RegExp['$1']),this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x233)]=![];else _0x19ecb6[_0x12d9cb(0x20d)](_0xbac471[_0x12d9cb(0x3ef)])&&(this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x2b6)]=Math[_0x12d9cb(0x155)](Number(RegExp['$1'])/0x2),this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x233)]=![]);_0x19ecb6[_0x12d9cb(0x20d)](_0xbac471['RadialLightIntensity'])&&(this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x2ef)]=(Number(RegExp['$1'])*0.01)[_0x12d9cb(0x27b)](0x0,0x1));_0x19ecb6[_0x12d9cb(0x20d)](_0xbac471['RadialLightBlendMode'])&&(this['radialLight']()[_0x12d9cb(0x199)]=ColorManager[_0x12d9cb(0x1a9)](RegExp['$1']));if(_0x19ecb6['match'](_0xbac471[_0x12d9cb(0x14a)]))_0x12d9cb(0x392)===_0x12d9cb(0x392)?this['radialLight']()[_0x12d9cb(0x3bc)]=Number(RegExp['$1'])[_0x12d9cb(0x27b)](0x0,0xff):(_0x18b8b5[_0x12d9cb(0x403)](_0x4f6f1c,!![]),_0x89407e[_0x12d9cb(0x403)](_0x2a7cfb,![]));else{if(_0x19ecb6['match'](_0xbac471[_0x12d9cb(0x22b)])){const _0x2fd08f=Number(RegExp['$1'])*0.01;this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x3bc)]=Math['round'](_0x2fd08f*0xff)[_0x12d9cb(0x27b)](0x0,0xff);}}if(_0x19ecb6['match'](_0xbac471[_0x12d9cb(0x23c)])){if(_0x12d9cb(0x186)===_0x12d9cb(0x175)){const _0x435b14=this[_0x12d9cb(0x438)](_0x2cc114),_0x49cc33=_0x24a510['presetColorParser'](_0x13ad58[_0x12d9cb(0x166)]),_0x24aea7=_0x5bf770[_0x12d9cb(0x2ef)],_0x5070d9=_0x587e15[_0x12d9cb(0x419)](_0x435b14)*0x2,_0x3fa1f7=new _0x331ce9(_0x5070d9,_0x5070d9);return _0x3fa1f7[_0x12d9cb(0x2b9)](_0x435b14,_0x49cc33,_0x24aea7),_0x3fa1f7;}else this[_0x12d9cb(0x2a0)]()['angle']=Number(RegExp['$1'])[_0x12d9cb(0x27b)](0x0,0x168);}_0x19ecb6[_0x12d9cb(0x20d)](_0xbac471['RadialLightRotateSpeed'])&&(_0x12d9cb(0x2e0)!==_0x12d9cb(0x171)?this['radialLight']()[_0x12d9cb(0x370)]=Number(RegExp['$1']):this[_0x12d9cb(0x273)](...arguments));if(_0x19ecb6[_0x12d9cb(0x20d)](_0xbac471[_0x12d9cb(0x32f)])){const _0x89bcb8=String(RegExp['$1'])[_0x12d9cb(0x34b)](',')[_0x12d9cb(0x1b7)](_0x99308d=>Number(_0x99308d)||0x0);this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x37a)]=_0x89bcb8[0x0]||0x0,this[_0x12d9cb(0x2a0)]()[_0x12d9cb(0x279)]=_0x89bcb8[0x1]||0x0;}},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x2bc)]=function(_0x5452b1){const _0x31c3db=_0x5c2f6e,_0xdf6688=VisuMZ[_0x31c3db(0x3d4)][_0x31c3db(0x1d9)];_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x1b4)])&&(this[_0x31c3db(0x26b)]()[_0x31c3db(0x2d8)]=Number(RegExp['$1'])*0.01);_0x5452b1['match'](_0xdf6688[_0x31c3db(0x124)])&&(this['radialLightBehavior']()[_0x31c3db(0x192)]=Number(RegExp['$1'])*0.01);_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x317)])&&(this[_0x31c3db(0x26b)]()[_0x31c3db(0x30e)]=Number(RegExp['$1'])*0.01);_0x5452b1[_0x31c3db(0x20d)](_0xdf6688['RadialBehaviorFlickerMod'])&&(this[_0x31c3db(0x26b)]()[_0x31c3db(0x43c)]=Number(RegExp['$1'])*0.01);_0x5452b1['match'](_0xdf6688[_0x31c3db(0x3c4)])&&(_0x31c3db(0x298)===_0x31c3db(0x34f)?this[_0x31c3db(0x437)][_0x31c3db(0x1b2)]():this[_0x31c3db(0x26b)]()[_0x31c3db(0x3c6)]=Number(RegExp['$1'])*0.01);_0x5452b1['match'](_0xdf6688[_0x31c3db(0x150)])&&('ONojz'===_0x31c3db(0x153)?this[_0x31c3db(0x26b)]()[_0x31c3db(0x2e3)]=Number(RegExp['$1'])*0.01:(this['lightingEffects']()[_0x31c3db(0x3f9)]=_0x1b0e2b,this[_0x31c3db(0x167)]()['colorDuration']=_0x171e4c,_0x4495fb<=0x0&&(this[_0x31c3db(0x167)]()[_0x31c3db(0x166)]=_0x4c571c,this['lightingEffects']()[_0x31c3db(0x2ee)]=_0x5a8e61)));_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x255)])&&(this['radialLightBehavior']()[_0x31c3db(0x1cd)]=Number(RegExp['$1'])*0.01);_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x12a)])&&(this[_0x31c3db(0x26b)]()['flareModifier']=Number(RegExp['$1'])*0.01);_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x226)])&&(this['radialLightBehavior']()[_0x31c3db(0x1bd)]=Number(RegExp['$1'])*0.01);_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x43e)])&&(_0x31c3db(0x449)===_0x31c3db(0x449)?this[_0x31c3db(0x26b)]()[_0x31c3db(0x344)]=Number(RegExp['$1'])*0.01:_0x12c620-=_0x58ff32[_0x31c3db(0x1d5)]/0x2);if(_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x278)]))this[_0x31c3db(0x26b)]()['glowRng']=!![];else _0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x2b4)])&&(this[_0x31c3db(0x26b)]()[_0x31c3db(0x187)]=![]);_0x5452b1['match'](_0xdf6688[_0x31c3db(0x2d5)])&&(this[_0x31c3db(0x26b)]()['pulseRate']=Number(RegExp['$1'])*0.01);_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x3cf)])&&(this[_0x31c3db(0x26b)]()[_0x31c3db(0x268)]=Number(RegExp['$1'])*0.01);if(_0x5452b1[_0x31c3db(0x20d)](_0xdf6688['RadialBehaviorPulseRng']))this[_0x31c3db(0x26b)]()[_0x31c3db(0x23e)]=!![];else _0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x3af)])&&(this[_0x31c3db(0x26b)]()['pulseRng']=![]);if(_0x5452b1[_0x31c3db(0x20d)](_0xdf6688['RadialBehaviorPatternPreset']))'VqXph'!==_0x31c3db(0x32c)?(this['_spriteset']=_0x1ea714,_0x2d5317[_0x31c3db(0x368)][_0x31c3db(0x273)][_0x31c3db(0x25f)](this),this[_0x31c3db(0x199)]=_0x20f497['BLEND_MODES'][_0x31c3db(0x3f5)],this['x']=_0x312eec[_0x31c3db(0x155)](_0x3595df['width']/0x2),this['y']=_0x279db5['round'](_0x37860a[_0x31c3db(0x158)]/0x2),this[_0x31c3db(0x1cb)]['x']=this[_0x31c3db(0x1cb)]['y']=0.5,this['createOverlayTexture'](),this['createProxySprite'](),this[_0x31c3db(0x3ad)](),this[_0x31c3db(0x1d3)](),this[_0x31c3db(0x259)](),this['createAutoLightRegions'](),![]&&this[_0x31c3db(0x29b)]()):this['radialLightBehavior']()[_0x31c3db(0x1c9)]=ColorManager[_0x31c3db(0x2cd)](RegExp['$1']);else _0x5452b1[_0x31c3db(0x20d)](_0xdf6688['RadialBehaviorPatternSequence'])&&(this['radialLightBehavior']()[_0x31c3db(0x1c9)]=String(RegExp['$1'])[_0x31c3db(0x2d4)]()[_0x31c3db(0x157)]());_0x5452b1[_0x31c3db(0x20d)](_0xdf6688[_0x31c3db(0x42e)])&&(this[_0x31c3db(0x26b)]()[_0x31c3db(0x163)]=Number(RegExp['$1'])||0x1);},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x262)]=function(_0x36c200){const _0x37d2b4=_0x5c2f6e,_0x10c9e1=VisuMZ[_0x37d2b4(0x3d4)][_0x37d2b4(0x1d9)];if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x2cf)]))this[_0x37d2b4(0x352)]()[_0x37d2b4(0x39c)]=!![];else{if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x182)]))this[_0x37d2b4(0x352)]()['enabled']=!![];else{if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x11e)])){if(_0x37d2b4(0x283)!==_0x37d2b4(0x13a))this[_0x37d2b4(0x352)]()[_0x37d2b4(0x39c)]=![];else{if(this[_0x37d2b4(0x1db)]===_0x5407f2)this[_0x37d2b4(0x3a0)]();return this['_conicalLightDashOffsets'];}}}}if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x133)])){if(_0x37d2b4(0x44b)===_0x37d2b4(0x44b))this['conicalLight']()['filename']=String(RegExp['$1'])[_0x37d2b4(0x157)]();else return _0x51b0e4[_0x37d2b4(0x368)][_0x37d2b4(0x1b8)][_0x37d2b4(0x25f)](this);}_0x36c200['match'](_0x10c9e1[_0x37d2b4(0x3e5)])&&(this[_0x37d2b4(0x352)]()['fileAngleOffset']=Number(RegExp['$1'])[_0x37d2b4(0x27b)](0x0,0x168));if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1['ConicalLightFileAnchor'])){if(_0x37d2b4(0x149)!==_0x37d2b4(0x2e6)){const _0x26f7ee=String(RegExp['$1'])[_0x37d2b4(0x34b)](',')[_0x37d2b4(0x1b7)](_0x5cc791=>Number(_0x5cc791)||0x0);this['conicalLight']()[_0x37d2b4(0x334)]=_0x26f7ee[0x0],this['conicalLight']()[_0x37d2b4(0x3ee)]=_0x26f7ee[0x1];}else{_0x13293e[_0x37d2b4(0x368)][_0x37d2b4(0x15f)][_0x37d2b4(0x25f)](this);const _0xd413ec=_0x3e6171[_0x37d2b4(0x3d4)][_0x37d2b4(0x1da)]['Map'];this[_0x37d2b4(0x3f3)](_0xd413ec[_0x37d2b4(0x3f4)]),this[_0x37d2b4(0x299)](_0xd413ec[_0x37d2b4(0x253)]),this[_0x37d2b4(0x27f)](_0xd413ec[_0x37d2b4(0x234)]),this[_0x37d2b4(0x1f9)](_0xd413ec['PlayerConicalBehavior']);}}_0x36c200['match'](_0x10c9e1[_0x37d2b4(0x2d6)])&&(this['conicalLight']()[_0x37d2b4(0x166)]=ColorManager[_0x37d2b4(0x398)](RegExp['$1']));if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x302)]))this[_0x37d2b4(0x352)]()['radius']=Number(RegExp['$1']);else _0x36c200[_0x37d2b4(0x20d)](_0x10c9e1['ConicalLightDiameter'])&&(this['conicalLight']()[_0x37d2b4(0x2b6)]=Math[_0x37d2b4(0x155)](Number(RegExp['$1'])/0x2));if(_0x36c200['match'](_0x10c9e1[_0x37d2b4(0x314)]))this[_0x37d2b4(0x352)]()['miniRadius']=Number(RegExp['$1']);else _0x36c200['match'](_0x10c9e1[_0x37d2b4(0x164)])&&(this[_0x37d2b4(0x352)]()[_0x37d2b4(0x275)]=Math[_0x37d2b4(0x155)](Number(RegExp['$1'])/0x2));_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1['ConicalLightIntensity'])&&(this[_0x37d2b4(0x352)]()[_0x37d2b4(0x2ef)]=(Number(RegExp['$1'])*0.01)[_0x37d2b4(0x27b)](0x0,0x1));_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x2b3)])&&(this['conicalLight']()['blendMode']=ColorManager['blendModeParser'](RegExp['$1']));if(_0x36c200['match'](_0x10c9e1[_0x37d2b4(0x1e9)]))_0x37d2b4(0x331)===_0x37d2b4(0x36a)?this[_0x37d2b4(0x160)]()?this[_0x37d2b4(0x160)]()['setConicalLightWalkOffsets'](_0x28c8b8):_0x5811c4[_0x37d2b4(0x368)][_0x37d2b4(0x3de)][_0x37d2b4(0x25f)](this,_0x12ade1):this['conicalLight']()[_0x37d2b4(0x3bc)]=Number(RegExp['$1'])[_0x37d2b4(0x27b)](0x0,0xff);else{if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x357)])){if(_0x37d2b4(0x142)!==_0x37d2b4(0x142))this[_0x37d2b4(0x2a0)]()[_0x37d2b4(0x2ef)]=(_0x1053ef(_0x2f1e36['$1'])*0.01)[_0x37d2b4(0x27b)](0x0,0x1);else{const _0x6b3351=Number(RegExp['$1'])*0.01;this[_0x37d2b4(0x352)]()['opacity']=Math[_0x37d2b4(0x155)](_0x6b3351*0xff)[_0x37d2b4(0x27b)](0x0,0xff);}}}if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x18d)])){if(_0x37d2b4(0x383)===_0x37d2b4(0x383))this[_0x37d2b4(0x352)]()[_0x37d2b4(0x1d5)]=Number(RegExp['$1'])['clamp'](0x0,0x168);else{const _0x4c2345=_0x413f9c[_0x37d2b4(0x452)](_0x40446c[_0x37d2b4(0x129)]);this[_0x37d2b4(0x204)](_0x4c2345);}}_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x147)])&&(_0x37d2b4(0x165)!==_0x37d2b4(0x1bc)?this[_0x37d2b4(0x352)]()[_0x37d2b4(0x3d6)]=Number(RegExp['$1'])[_0x37d2b4(0x27b)](0x0,0x168):_0x1755d1['prototype'][_0x37d2b4(0x174)][_0x37d2b4(0x25f)](this,_0x57e8dc));if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x354)])){if(_0x37d2b4(0x36d)!==_0x37d2b4(0x36d))return _0x581c42['prototype'][_0x37d2b4(0x350)][_0x37d2b4(0x25f)](this);else this[_0x37d2b4(0x352)]()[_0x37d2b4(0x34e)]=Number(RegExp['$1'])*0.01;}if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x216)]))this[_0x37d2b4(0x352)]()[_0x37d2b4(0x3ed)]=!![];else{if(_0x36c200['match'](_0x10c9e1[_0x37d2b4(0x212)])){if(_0x37d2b4(0x210)===_0x37d2b4(0x210))this[_0x37d2b4(0x352)]()[_0x37d2b4(0x3ed)]=![];else{_0x4109ed[_0x37d2b4(0x422)](_0x2e09ed,_0x1bc07f);const _0x3d0699=_0x5ad216['Settings'],_0x282c93=_0x18bcf5[_0x37d2b4(0x366)];_0x596ff6[_0x37d2b4(0x126)](_0x3d0699),_0x72af8a['setFollowerConicalLightBehavior'](_0x282c93);}}}if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x229)])){if(_0x37d2b4(0x3d7)!==_0x37d2b4(0x3d7)){_0x160458[_0x37d2b4(0x422)](_0x19011f,_0x40a9d7);const _0x431b76=_0x468cb4[_0x37d2b4(0x385)],_0x9d8928=_0x3c8dd0['Enable'],_0x3fa4cf=_0x3d0097[_0x37d2b4(0x3ae)],_0x95f6fe=_0x234e43[_0x37d2b4(0x40b)],_0x1d4da3=_0x7836ae[_0x37d2b4(0x135)],_0x2f9c7e=_0x29e662[_0x37d2b4(0x118)]();for(let _0x3a34aa of _0x431b76){if(_0x3a34aa===0x0)_0x3a34aa=_0x2f9c7e[_0x37d2b4(0x129)]();const _0x41ec25=_0x43a3c3[_0x37d2b4(0x452)](_0x3a34aa);_0x41ec25&&(_0x41ec25[_0x37d2b4(0x3de)](_0x3fa4cf),_0x41ec25[_0x37d2b4(0x2f9)](_0x95f6fe),_0x41ec25[_0x37d2b4(0x174)](_0x1d4da3),_0x41ec25['conicalLight']()[_0x37d2b4(0x1d6)]=_0x9d8928);}}else this['conicalLight']()[_0x37d2b4(0x3a9)]=TextManager[_0x37d2b4(0x433)](RegExp['$1']);}if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1['ConicalLightFollowMouse']))this[_0x37d2b4(0x352)]()[_0x37d2b4(0x3a6)]=!![];else _0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x3c8)])&&(this[_0x37d2b4(0x352)]()[_0x37d2b4(0x3a6)]=![]);if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x40d)]))this['conicalLight']()[_0x37d2b4(0x1d6)]=!![];else{if(_0x36c200['match'](_0x10c9e1[_0x37d2b4(0x11c)])){if('FOIWg'!=='KHoeH')this[_0x37d2b4(0x352)]()[_0x37d2b4(0x1d6)]=![];else{_0x26dcb9[_0x37d2b4(0x422)](_0x365021,_0x5d52ac);const _0x442878=_0x54dc7e['ship'](),_0x321369=_0x482b76['BoardedSettings'],_0x5c2086=_0x143e78[_0x37d2b4(0x2f0)],_0x1bbe94=_0xef51ee[_0x37d2b4(0x3e4)],_0x103103=_0x42dc63[_0x37d2b4(0x1ca)];if(_0x442878){const _0x4dfec8=!![];_0x442878['setVehicleLightingData'](_0x321369,!![],_0x4dfec8,![]),_0x442878[_0x37d2b4(0x31b)](_0x5c2086,!![],_0x4dfec8,!![]),_0x442878[_0x37d2b4(0x31b)](_0x1bbe94,![],_0x4dfec8,![]),_0x442878['setVehicleLightingData'](_0x103103,![],_0x4dfec8,!![]);}}}}if(_0x36c200[_0x37d2b4(0x20d)](_0x10c9e1[_0x37d2b4(0x44a)])){if(_0x37d2b4(0x15b)===_0x37d2b4(0x15b)){const _0x3e7bc3=String(RegExp['$1'])[_0x37d2b4(0x34b)](',')['map'](_0x37d736=>Number(_0x37d736)||0x0);this[_0x37d2b4(0x352)]()[_0x37d2b4(0x37a)]=_0x3e7bc3[0x0]||0x0,this[_0x37d2b4(0x352)]()[_0x37d2b4(0x279)]=_0x3e7bc3[0x1]||0x0;}else this[_0x37d2b4(0x352)]()[_0x37d2b4(0x3d6)]=_0x393d80(_0x2fc25a['$1'])[_0x37d2b4(0x27b)](0x0,0x168);}},Game_Event[_0x5c2f6e(0x368)][_0x5c2f6e(0x24a)]=function(_0x2f57e5){const _0x36f7a7=_0x5c2f6e,_0x39901f=VisuMZ[_0x36f7a7(0x3d4)][_0x36f7a7(0x1d9)];_0x2f57e5['match'](_0x39901f[_0x36f7a7(0x1d2)])&&(_0x36f7a7(0x2ae)!==_0x36f7a7(0x2ae)?this[_0x36f7a7(0x26b)]()[_0x36f7a7(0x30e)]=_0xc0a484(_0x2a70c9['$1'])*0.01:this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x2d8)]=Number(RegExp['$1'])*0.01);if(_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x16d)])){if('hkawQ'===_0x36f7a7(0x391))this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x192)]=Number(RegExp['$1'])*0.01;else{if(_0x4e9b73[_0x36f7a7(0x405)]()===_0x36f7a7(0x218))return![];if(_0xf810a8[_0x36f7a7(0x1ad)]()<=0x0)return![];return this['_source']===_0x16b6fd||this[_0x36f7a7(0x1d8)]===_0x14f599[_0x36f7a7(0x432)]();}}if(_0x2f57e5['match'](_0x39901f['ConicalBehaviorFlickerRate'])){if(_0x36f7a7(0x13c)!==_0x36f7a7(0x207))this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x30e)]=Number(RegExp['$1'])*0.01;else{_0x3ee07e['ConvertParams'](_0x1df3c3,_0x1c2841);const _0x3f6e97=_0x2389ba[_0x36f7a7(0x355)],_0x239696=_0x1efbb3[_0x36f7a7(0x2df)],_0x3ae80f=_0x3be78d[_0x36f7a7(0x313)];_0x38b5d1[_0x36f7a7(0x411)](_0x3f6e97,_0x3ae80f),_0x1fcaa3[_0x36f7a7(0x3b4)](_0x239696,_0x3ae80f);}}if(_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x200)])){if(_0x36f7a7(0x12d)!=='xCwfM'){if(this[_0x36f7a7(0x167)]()['opacityDuration']<=0x0)return;const _0x5cdbb8=this[_0x36f7a7(0x167)]()[_0x36f7a7(0x1d4)],_0x1f1add=this[_0x36f7a7(0x167)]()[_0x36f7a7(0x3bc)],_0x66db5c=this['lightingEffects']()['targetOpacity'];this[_0x36f7a7(0x167)]()[_0x36f7a7(0x3bc)]=(_0x1f1add*(_0x5cdbb8-0x1)+_0x66db5c)/_0x5cdbb8,this[_0x36f7a7(0x167)]()[_0x36f7a7(0x2ee)]=_0x228e00,this[_0x36f7a7(0x167)]()['opacityDuration']--,this[_0x36f7a7(0x167)]()[_0x36f7a7(0x1d4)]<=0x0&&(this[_0x36f7a7(0x167)]()['opacity']=_0x66db5c);}else this['conicalLightBehavior']()[_0x36f7a7(0x43c)]=Number(RegExp['$1'])*0.01;}if(_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f['ConicalBehaviorFlashRate'])){if('pfvmT'!==_0x36f7a7(0x413))this['conicalLightBehavior']()[_0x36f7a7(0x3c6)]=Number(RegExp['$1'])*0.01;else{if(!_0x4da9e9['ALLOW_ANTI_LIGHT_MASK'])return;if(_0x40f0c2[_0x36f7a7(0x455)]())return;if(_0x2359f9[_0x36f7a7(0x257)]()||_0x2ba1b3['isLoopVertical']())return;if(!_0xe0efd2[_0x36f7a7(0x15d)]())return;{const _0xa8c7bb=new _0x37ab14();_0xa8c7bb[_0x36f7a7(0x27c)]=this[_0x36f7a7(0x281)](![],_0x50fc20[_0x36f7a7(0x32d)](),_0x2c9f3f[_0x36f7a7(0x31e)]()),_0xa8c7bb['scale']['x']=_0x477ca5[_0x36f7a7(0x410)](),_0xa8c7bb[_0x36f7a7(0x1cf)]['y']=_0x31ca21['tileHeight'](),this[_0x36f7a7(0x28d)]=_0xa8c7bb,this[_0x36f7a7(0x437)]['addChild'](this['_hardAntiLightMask']),this['_hardAlphaMask']=new _0x481410[(_0x36f7a7(0x29c))](this['_hardAntiLightMask']),this[_0x36f7a7(0x256)][_0x36f7a7(0x199)]=_0x3594af['BLEND_MODES'][_0x36f7a7(0x293)];}{const _0x4f5a56=new _0x3b2eae();_0x4f5a56[_0x36f7a7(0x27c)]=this[_0x36f7a7(0x281)](!![],_0x3f213a['softAntiLightRegionIDs'](),_0x46a09f[_0x36f7a7(0x1a0)]()),_0x4f5a56['scale']['x']=_0xc970a2[_0x36f7a7(0x410)](),_0x4f5a56['scale']['y']=_0x389e14[_0x36f7a7(0x23f)](),this[_0x36f7a7(0x15e)]=_0x4f5a56,this[_0x36f7a7(0x437)]['addChild'](this[_0x36f7a7(0x15e)]),this[_0x36f7a7(0x1ab)]=new _0x437b25['SpriteMaskFilter'](this[_0x36f7a7(0x15e)]),this['_softAlphaMask'][_0x36f7a7(0x199)]=_0x56dafb[_0x36f7a7(0x2f6)]['ADD'];}this[_0x36f7a7(0x437)][_0x36f7a7(0x3c9)]=this[_0x36f7a7(0x437)][_0x36f7a7(0x3c9)]||[],this[_0x36f7a7(0x437)][_0x36f7a7(0x3c9)][_0x36f7a7(0x122)](this[_0x36f7a7(0x256)]),this['_lightContainer'][_0x36f7a7(0x3c9)]['push'](this[_0x36f7a7(0x1ab)]);}}_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x435)])&&(this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x2e3)]=Number(RegExp['$1'])*0.01);_0x2f57e5['match'](_0x39901f[_0x36f7a7(0x23b)])&&(this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x1cd)]=Number(RegExp['$1'])*0.01);_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x286)])&&(this[_0x36f7a7(0x13e)]()['flareModifier']=Number(RegExp['$1'])*0.01);_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x1e5)])&&(_0x36f7a7(0x2ff)!==_0x36f7a7(0x139)?this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x1bd)]=Number(RegExp['$1'])*0.01:_0x1c4d98[_0x36f7a7(0x368)]['setConicalLightWalkOffsets'][_0x36f7a7(0x25f)](this,_0x3c8478));_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x177)])&&(this[_0x36f7a7(0x13e)]()['glowSpeed']=Number(RegExp['$1'])*0.01);if(_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x330)]))this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x187)]=!![];else _0x2f57e5[_0x36f7a7(0x20d)](_0x39901f['ConicalBehaviorGlowNoRng'])&&(this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x187)]=![]);_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x22f)])&&(this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x16a)]=Number(RegExp['$1'])*0.01);_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f['ConicalBehaviorPulseSpeed'])&&(this['conicalLightBehavior']()[_0x36f7a7(0x268)]=Number(RegExp['$1'])*0.01);if(_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x454)]))this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x23e)]=!![];else _0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x12e)])&&(_0x36f7a7(0x1ea)===_0x36f7a7(0x1ea)?this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x23e)]=![]:this['conicalLightBehavior']()[_0x36f7a7(0x268)]=_0x48ee68(_0x944cf9['$1'])*0.01);if(_0x2f57e5['match'](_0x39901f[_0x36f7a7(0x1e8)]))_0x36f7a7(0x178)!==_0x36f7a7(0x178)?(_0x161fea[_0x36f7a7(0x368)][_0x36f7a7(0x292)][_0x36f7a7(0x25f)](this),this[_0x36f7a7(0x32b)]()):this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x1c9)]=ColorManager[_0x36f7a7(0x2cd)](RegExp['$1']);else _0x2f57e5[_0x36f7a7(0x20d)](_0x39901f['ConicalBehaviorPatternSequence'])&&(_0x36f7a7(0x44e)!==_0x36f7a7(0x44e)?this['radialLightBehavior']()['glowRng']=!![]:this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x1c9)]=String(RegExp['$1'])['toLowerCase']()[_0x36f7a7(0x157)]());_0x2f57e5[_0x36f7a7(0x20d)](_0x39901f[_0x36f7a7(0x28b)])&&(this[_0x36f7a7(0x13e)]()[_0x36f7a7(0x163)]=Number(RegExp['$1'])||0x1);},Game_Event[_0x5c2f6e(0x368)]['checkConicalLightHandOffsetStringTags']=function(_0x3d8892){const _0x1cc798=_0x5c2f6e,_0x10626e=VisuMZ['LightingEffects']['RegExp'],_0x351d17=_0x3d8892['match'](_0x10626e['ConicalLightHandOffset']);if(_0x351d17)for(const _0x95cd9a of _0x351d17){_0x95cd9a[_0x1cc798(0x20d)](_0x10626e[_0x1cc798(0x1e1)]);const _0x5436c1=TextManager[_0x1cc798(0x433)](RegExp['$1']);if([0x0,0x5][_0x1cc798(0x29f)](_0x5436c1))continue;const _0x3723ad=Number(RegExp['$2'])||0x0,_0x172d50=String(RegExp['$3'])[_0x1cc798(0x34b)](',')[_0x1cc798(0x1b7)](_0x19e6cc=>Number(_0x19e6cc)||0x0),_0x23cf46=Number(_0x172d50[0x0])||0x0,_0x5202cd=Number(_0x172d50[0x1])||0x0,_0xd66939=_0x1cc798(0x2b5)[_0x1cc798(0x3ec)](_0x5436c1),_0x2c6625='pattern%1X'[_0x1cc798(0x3ec)](_0x3723ad),_0x548dfb='pattern%1Y'[_0x1cc798(0x3ec)](_0x3723ad);this['conicalLightOffsets']()[_0xd66939][_0x2c6625]=_0x23cf46,this['conicalLightOffsets']()[_0xd66939][_0x548dfb]=_0x5202cd;}},VisuMZ[_0x5c2f6e(0x3d4)]['Scene_Options_maxCommands']=Scene_Options[_0x5c2f6e(0x368)][_0x5c2f6e(0x417)],Scene_Options['prototype'][_0x5c2f6e(0x417)]=function(){const _0x3a1582=_0x5c2f6e;let _0x5e8e0c=VisuMZ[_0x3a1582(0x3d4)][_0x3a1582(0x361)][_0x3a1582(0x25f)](this);const _0xee7b73=VisuMZ[_0x3a1582(0x3d4)][_0x3a1582(0x1da)]['Options'];if(_0xee7b73['AdjustRect']&&_0xee7b73[_0x3a1582(0x320)])_0x5e8e0c++;if(_0xee7b73[_0x3a1582(0x25a)]&&_0xee7b73[_0x3a1582(0x30b)])_0x5e8e0c++;return _0x5e8e0c;},VisuMZ[_0x5c2f6e(0x3d4)]['Sprite_Character_initialize']=Sprite_Character[_0x5c2f6e(0x368)][_0x5c2f6e(0x273)],Sprite_Character[_0x5c2f6e(0x368)]['initialize']=function(_0x2ee5c3){const _0x52dea5=_0x5c2f6e;VisuMZ[_0x52dea5(0x3d4)]['Sprite_Character_initialize'][_0x52dea5(0x25f)](this,_0x2ee5c3),this[_0x52dea5(0x3b9)](_0x2ee5c3),this[_0x52dea5(0x29a)](_0x2ee5c3);},Sprite_Character[_0x5c2f6e(0x368)][_0x5c2f6e(0x3b9)]=function(_0x333be0){const _0x2b0407=_0x5c2f6e;if(this['constructor']!==Sprite_Character)return;this[_0x2b0407(0x441)]=new Sprite_RadialLight(_0x333be0,this),SceneManager[_0x2b0407(0x2e2)](this[_0x2b0407(0x441)]);},Sprite_Character[_0x5c2f6e(0x368)][_0x5c2f6e(0x29a)]=function(_0x592fec){const _0x2ccc93=_0x5c2f6e;if(this[_0x2ccc93(0x35e)]!==Sprite_Character)return;this[_0x2ccc93(0x1f2)]=new Sprite_ConicalLight(_0x592fec,this),SceneManager[_0x2ccc93(0x2e2)](this[_0x2ccc93(0x1f2)]);},VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x332)]=Sprite_Battler[_0x5c2f6e(0x368)][_0x5c2f6e(0x34d)],Sprite_Battler[_0x5c2f6e(0x368)][_0x5c2f6e(0x34d)]=function(_0x23772b){const _0x1cc0bf=_0x5c2f6e;VisuMZ[_0x1cc0bf(0x3d4)][_0x1cc0bf(0x332)]['call'](this,_0x23772b),this[_0x1cc0bf(0x3b9)](_0x23772b);},Sprite_Battler[_0x5c2f6e(0x368)][_0x5c2f6e(0x3b9)]=function(_0x2d3505){const _0x2f9fd4=_0x5c2f6e;if(this[_0x2f9fd4(0x441)]){if(_0x2f9fd4(0x25d)!==_0x2f9fd4(0x27d)){this['_radialLight'][_0x2f9fd4(0x446)](_0x2d3505);return;}else{if(this[_0x2f9fd4(0x1d8)]&&this[_0x2f9fd4(0x1d8)]['constructor']===_0x93abc){if(this[_0x2f9fd4(0x1d8)][_0x2f9fd4(0x384)]()==='')return![];}return this[_0x2f9fd4(0x423)]()[_0x2f9fd4(0x39c)];}}if(this['constructor'][_0x2f9fd4(0x161)]===_0x2f9fd4(0x2e1))return;this[_0x2f9fd4(0x441)]=new Sprite_RadialLight(_0x2d3505,this),SceneManager['addChildToLightContainer'](this[_0x2f9fd4(0x441)]);};function Sprite_LightingEffects(){const _0x50f41b=_0x5c2f6e;this[_0x50f41b(0x273)](...arguments);}Sprite_LightingEffects[_0x5c2f6e(0x368)]=Object[_0x5c2f6e(0x3cd)](Sprite[_0x5c2f6e(0x368)]),Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x35e)]=Sprite_LightingEffects,Sprite_LightingEffects[_0x5c2f6e(0x36f)]=VisuMZ[_0x5c2f6e(0x3d4)]['Settings']['Map'][_0x5c2f6e(0x2eb)],Sprite_LightingEffects[_0x5c2f6e(0x368)]['initialize']=function(_0x5a899f){const _0x29fd85=_0x5c2f6e;this[_0x29fd85(0x2bd)]=_0x5a899f,Sprite[_0x29fd85(0x368)]['initialize'][_0x29fd85(0x25f)](this),this['blendMode']=PIXI['BLEND_MODES'][_0x29fd85(0x3f5)],this['x']=Math[_0x29fd85(0x155)](Graphics[_0x29fd85(0x2af)]/0x2),this['y']=Math[_0x29fd85(0x155)](Graphics[_0x29fd85(0x158)]/0x2),this[_0x29fd85(0x1cb)]['x']=this['anchor']['y']=0.5,this[_0x29fd85(0x41c)](),this[_0x29fd85(0x170)](),this[_0x29fd85(0x3ad)](),this[_0x29fd85(0x1d3)](),this[_0x29fd85(0x259)](),this[_0x29fd85(0x2dc)]();if(![]){if(_0x29fd85(0x442)!=='hTvFs'){const _0x1ab439=this[_0x29fd85(0x423)]();this[_0x29fd85(0x1cf)]['x']=0x1,this['scale']['y']=0x1,this[_0x29fd85(0x2a4)]=_0x2db156[_0x29fd85(0x323)](0xf4240),this['_pulseRng']=_0x3bcdce[_0x29fd85(0x323)](0xf4240),this[_0x29fd85(0x243)]=0x0;if(_0x1ab439[_0x29fd85(0x1e4)]!=='')this[_0x29fd85(0x27c)]=_0x4e6040['loadPicture'](_0x1ab439[_0x29fd85(0x1e4)]);else this[_0x29fd85(0x3b8)]()?this[_0x29fd85(0x27c)]=this[_0x29fd85(0x120)](_0x1ab439):this[_0x29fd85(0x27c)]=new _0x1addc3(0x1,0x1);}else this[_0x29fd85(0x29b)]();}},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x292)]=function(){const _0x390145=_0x5c2f6e;Sprite[_0x390145(0x368)][_0x390145(0x292)][_0x390145(0x25f)](this),this['destroyLightContainer']();},Sprite_LightingEffects['prototype']['destroyLightContainer']=function(){const _0x5d4326=_0x5c2f6e;this[_0x5d4326(0x28d)]&&this[_0x5d4326(0x28d)][_0x5d4326(0x292)]();this[_0x5d4326(0x15e)]&&this[_0x5d4326(0x15e)][_0x5d4326(0x292)]();if(this['_lightContainer']){if(_0x5d4326(0x267)!==_0x5d4326(0x3a8))this['_lightContainer']['destroy']();else return this[_0x5d4326(0x1d8)]?this[_0x5d4326(0x1d8)][_0x5d4326(0x116)]==='player':![];}},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x41c)]=function(){const _0x335cec=_0x5c2f6e,_0x58618c=Sprite_LightingEffects[_0x335cec(0x36f)]*0x2,_0xd9ee2d=Graphics['width']+_0x58618c,_0x1d516c=Graphics[_0x335cec(0x158)]+_0x58618c;this[_0x335cec(0x195)]=PIXI[_0x335cec(0x193)][_0x335cec(0x3cd)](_0xd9ee2d,_0x1d516c);},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x170)]=function(){this['_proxySprite']=new Sprite();},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x3ad)]=function(){const _0x5597bc=_0x5c2f6e;this[_0x5597bc(0x3f7)]=new Sprite(),this[_0x5597bc(0x3f7)][_0x5597bc(0x27c)]=new Bitmap(0x1,0x1),this[_0x5597bc(0x16f)]['addChild'](this[_0x5597bc(0x3f7)]);const _0x5c7f98=Sprite_LightingEffects[_0x5597bc(0x36f)]*0x2;this[_0x5597bc(0x3f7)][_0x5597bc(0x1cf)]['x']=Graphics[_0x5597bc(0x2af)]+_0x5c7f98,this[_0x5597bc(0x3f7)]['scale']['y']=Graphics['height']+_0x5c7f98,this[_0x5597bc(0x251)]();},Sprite_LightingEffects['prototype'][_0x5c2f6e(0x1d3)]=function(){const _0x36fa08=_0x5c2f6e;this[_0x36fa08(0x437)]=new Sprite(),this[_0x36fa08(0x16f)][_0x36fa08(0x307)](this[_0x36fa08(0x437)]);const _0x207892=Sprite_LightingEffects[_0x36fa08(0x36f)];this[_0x36fa08(0x437)]['x']=_0x207892,this[_0x36fa08(0x437)]['y']=_0x207892;},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x24f)]=function(){const _0x1f5850=_0x5c2f6e;if(this[_0x1f5850(0x437)]===undefined)this[_0x1f5850(0x1d3)]();return this[_0x1f5850(0x437)];},Sprite_LightingEffects[_0x5c2f6e(0x43a)]=!![],Sprite_LightingEffects[_0x5c2f6e(0x290)]=![],Sprite_LightingEffects['prototype'][_0x5c2f6e(0x259)]=function(){const _0x2e378e=_0x5c2f6e;if(!Sprite_LightingEffects[_0x2e378e(0x43a)])return;if(SceneManager[_0x2e378e(0x455)]())return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x2e378e(0x1a5)]())return;if(!$gameMap[_0x2e378e(0x15d)]())return;{if(_0x2e378e(0x1a1)!=='PXidK')this[_0x2e378e(0x160)]()[_0x2e378e(0x2f9)](_0x26959c);else{const _0x512c62=new Sprite();_0x512c62[_0x2e378e(0x27c)]=this['createAntiLightMaskBitmap'](![],$gameMap[_0x2e378e(0x32d)](),$gameMap[_0x2e378e(0x31e)]()),_0x512c62[_0x2e378e(0x1cf)]['x']=$gameMap[_0x2e378e(0x410)](),_0x512c62['scale']['y']=$gameMap[_0x2e378e(0x23f)](),this[_0x2e378e(0x28d)]=_0x512c62,this[_0x2e378e(0x437)][_0x2e378e(0x307)](this[_0x2e378e(0x28d)]),this[_0x2e378e(0x256)]=new PIXI[(_0x2e378e(0x29c))](this[_0x2e378e(0x28d)]),this[_0x2e378e(0x256)]['blendMode']=PIXI[_0x2e378e(0x2f6)][_0x2e378e(0x293)];}}{const _0x4901c8=new Sprite();_0x4901c8['bitmap']=this[_0x2e378e(0x281)](!![],$gameMap['softAntiLightRegionIDs'](),$gameMap[_0x2e378e(0x1a0)]()),_0x4901c8[_0x2e378e(0x1cf)]['x']=$gameMap[_0x2e378e(0x410)](),_0x4901c8['scale']['y']=$gameMap[_0x2e378e(0x23f)](),this[_0x2e378e(0x15e)]=_0x4901c8,this[_0x2e378e(0x437)][_0x2e378e(0x307)](this['_softAntiLightMask']),this['_softAlphaMask']=new PIXI[(_0x2e378e(0x29c))](this[_0x2e378e(0x15e)]),this[_0x2e378e(0x1ab)][_0x2e378e(0x199)]=PIXI[_0x2e378e(0x2f6)][_0x2e378e(0x293)];}this['_lightContainer'][_0x2e378e(0x3c9)]=this['_lightContainer']['filters']||[],this[_0x2e378e(0x437)][_0x2e378e(0x3c9)]['push'](this[_0x2e378e(0x256)]),this[_0x2e378e(0x437)][_0x2e378e(0x3c9)][_0x2e378e(0x122)](this[_0x2e378e(0x1ab)]);},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x281)]=function(_0x4c0465,_0x3568e2,_0x383e63){const _0x454ec1=_0x5c2f6e,_0x32dc64=$gameMap[_0x454ec1(0x2af)](),_0x5d3890=$gameMap[_0x454ec1(0x158)](),_0x3504f9=new Bitmap(_0x32dc64,_0x5d3890);_0x3504f9[_0x454ec1(0x32a)]=_0x4c0465;for(let _0x2242b5=0x0;_0x2242b5<_0x32dc64;_0x2242b5++){if(_0x454ec1(0x12c)===_0x454ec1(0x144))return _0x9a3c43['getFollowerConicalLightSettings']();else for(let _0x15408d=0x0;_0x15408d<_0x5d3890;_0x15408d++){const _0xd6fc94=$gameMap[_0x454ec1(0x29e)](_0x2242b5,_0x15408d);if(_0x3568e2[_0x454ec1(0x29f)](_0xd6fc94)){if(_0x454ec1(0x1de)===_0x454ec1(0x1de))continue;else this[_0x454ec1(0x160)]()?this['actor']()[_0x454ec1(0x174)](_0x3762f3):_0x386e01[_0x454ec1(0x368)][_0x454ec1(0x174)]['call'](this,_0x28ab72);}const _0x98e324=$gameMap[_0x454ec1(0x121)](_0x2242b5,_0x15408d);if(_0x383e63['includes'](_0x98e324))continue;_0x3504f9[_0x454ec1(0x2e4)](_0x2242b5,_0x15408d,0x1,0x1,_0x454ec1(0x218));}}return _0x3504f9;},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x2dc)]=function(){const _0x29301b=_0x5c2f6e;if(!$gameMap)return;if(!$dataMap)return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x29301b(0x1a5)]())return;if(!this[_0x29301b(0x437)])return;if(SceneManager['isSceneBattle']())return;const _0x1aee58=new Sprite();_0x1aee58[_0x29301b(0x27c)]=this[_0x29301b(0x3dc)](),_0x1aee58[_0x29301b(0x1cf)]['x']=$gameMap['tileWidth'](),_0x1aee58[_0x29301b(0x1cf)]['y']=$gameMap['tileHeight'](),this[_0x29301b(0x188)]=_0x1aee58,this['_autoLightSprite'][_0x29301b(0x199)]=PIXI['BLEND_MODES'][_0x29301b(0x2d1)],this[_0x29301b(0x24f)]()[_0x29301b(0x307)](_0x1aee58);},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x3dc)]=function(){const _0x43cf48=_0x5c2f6e,_0x3953ed=$gameMap[_0x43cf48(0x2af)](),_0x4605aa=$gameMap['height'](),_0x2600b1=new Bitmap(_0x3953ed,_0x4605aa);_0x2600b1[_0x43cf48(0x32a)]=!![];for(let _0x524a2f=0x0;_0x524a2f<_0x3953ed;_0x524a2f++){for(let _0x31ef30=0x0;_0x31ef30<_0x4605aa;_0x31ef30++){const _0x512e19=$gameMap[_0x43cf48(0x29e)](_0x524a2f,_0x31ef30),_0x1407c6=this[_0x43cf48(0x3b0)](_0x512e19);if(_0x1407c6>0x0){if(_0x43cf48(0x1b0)!==_0x43cf48(0x1b0)){let _0x2218a2=_0x225f88[_0x43cf48(0x3d4)]['Scene_Options_maxCommands']['call'](this);const _0x2a903b=_0x4961f3[_0x43cf48(0x3d4)]['Settings'][_0x43cf48(0x213)];if(_0x2a903b[_0x43cf48(0x25a)]&&_0x2a903b['AddBlinkingLights'])_0x2218a2++;if(_0x2a903b[_0x43cf48(0x25a)]&&_0x2a903b[_0x43cf48(0x30b)])_0x2218a2++;return _0x2218a2;}else{const _0x4a3bfe=Math[_0x43cf48(0x419)](0xff*_0x1407c6/0x64);let _0x235eb1=ColorManager[_0x43cf48(0x327)]([_0x4a3bfe,_0x4a3bfe,_0x4a3bfe]);_0x2600b1['fillRect'](_0x524a2f,_0x31ef30,0x1,0x1,_0x235eb1);}}}}return _0x2600b1;},Sprite_LightingEffects['prototype'][_0x5c2f6e(0x3b0)]=function(_0x15d57b){const _0x4557fc=_0x5c2f6e,_0x26799f=VisuMZ['LightingEffects'][_0x4557fc(0x1da)]['AutoLight'];let _0x30019e=0x64;while(_0x30019e>0x0){const _0x130b35=_0x26799f['opacity%1'['format'](_0x30019e)]||[];if(_0x130b35[_0x4557fc(0x29f)](_0x15d57b))return _0x30019e;_0x30019e-=0x5;}return 0x0;},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x29b)]=function(){const _0x21e5a1=_0x5c2f6e;{const _0x5029f6=new Sprite();_0x5029f6[_0x21e5a1(0x27c)]=new Bitmap(0x1f4,0x1f4),_0x5029f6[_0x21e5a1(0x27c)]['drawTestDummy'](0xfa,'#ff0000'),this[_0x21e5a1(0x24f)]()[_0x21e5a1(0x307)](_0x5029f6),_0x5029f6['anchor']['x']=_0x5029f6[_0x21e5a1(0x1cb)]['y']=0.5,_0x5029f6['x']=Graphics[_0x21e5a1(0x2af)]*0x1/0x2,_0x5029f6['y']=Graphics['height']*0x1/0x3,_0x5029f6[_0x21e5a1(0x199)]=PIXI[_0x21e5a1(0x2f6)][_0x21e5a1(0x293)],this[_0x21e5a1(0x38e)]=_0x5029f6;}{const _0x4c5579=new Sprite();_0x4c5579[_0x21e5a1(0x27c)]=new Bitmap(0x1f4,0x1f4),_0x4c5579[_0x21e5a1(0x27c)][_0x21e5a1(0x309)](0xfa,'#00ff00'),this[_0x21e5a1(0x24f)]()[_0x21e5a1(0x307)](_0x4c5579),_0x4c5579['anchor']['x']=_0x4c5579[_0x21e5a1(0x1cb)]['y']=0.5,_0x4c5579['x']=Graphics[_0x21e5a1(0x2af)]*0x2/0x5,_0x4c5579['y']=Graphics[_0x21e5a1(0x158)]*0x2/0x3,_0x4c5579[_0x21e5a1(0x199)]=PIXI[_0x21e5a1(0x2f6)][_0x21e5a1(0x293)],this[_0x21e5a1(0x325)]=_0x4c5579;}{const _0xa3c2f1=new Sprite();_0xa3c2f1[_0x21e5a1(0x27c)]=new Bitmap(0x1f4,0x1f4),_0xa3c2f1[_0x21e5a1(0x27c)][_0x21e5a1(0x309)](0xfa,_0x21e5a1(0x221)),this[_0x21e5a1(0x24f)]()[_0x21e5a1(0x307)](_0xa3c2f1),_0xa3c2f1[_0x21e5a1(0x1cb)]['x']=_0xa3c2f1[_0x21e5a1(0x1cb)]['y']=0.5,_0xa3c2f1['x']=Graphics[_0x21e5a1(0x2af)]*0x3/0x5,_0xa3c2f1['y']=Graphics[_0x21e5a1(0x158)]*0x2/0x3,_0xa3c2f1['blendMode']=PIXI[_0x21e5a1(0x2f6)][_0x21e5a1(0x293)],this[_0x21e5a1(0x395)]=_0xa3c2f1;}this['_testDummies']=!![];},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b2)]=function(){const _0xc2a47c=_0x5c2f6e;Sprite['prototype'][_0xc2a47c(0x1b2)]['call'](this),this['updateOpacity']();this[_0xc2a47c(0x437)]&&this[_0xc2a47c(0x437)][_0xc2a47c(0x1b2)]();this[_0xc2a47c(0x1f0)]();this[_0xc2a47c(0x188)]&&this['updateAutoLightAreas']();this[_0xc2a47c(0x448)]&&this[_0xc2a47c(0x137)]();if(this[_0xc2a47c(0x16f)]){if(_0xc2a47c(0x198)==='mBxFc'){if(this[_0xc2a47c(0x441)]===_0x3193b4)this[_0xc2a47c(0x15f)]();return this[_0xc2a47c(0x441)];}else this[_0xc2a47c(0x251)](),this['updateOverlayRender']();}},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x3ac)]=function(){const _0x64c27f=_0x5c2f6e;this[_0x64c27f(0x3bc)]=$gameScreen[_0x64c27f(0x1ad)]();},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x1f0)]=function(){const _0x58d892=_0x5c2f6e;if(this['_hardAntiLightMask']){const _0x55471a=this['_hardAntiLightMask'];_0x55471a['x']=Math[_0x58d892(0x28e)](-$gameMap['displayX']()*$gameMap[_0x58d892(0x410)]()),_0x55471a['y']=Math['floor'](-$gameMap['displayY']()*$gameMap[_0x58d892(0x23f)]());}if(this[_0x58d892(0x15e)]){const _0x2bfcd7=this[_0x58d892(0x15e)];_0x2bfcd7['x']=Math['floor'](-$gameMap[_0x58d892(0x1c1)]()*$gameMap[_0x58d892(0x410)]()),_0x2bfcd7['y']=Math['floor'](-$gameMap[_0x58d892(0x393)]()*$gameMap[_0x58d892(0x23f)]());}},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x2e5)]=function(){const _0x40ffbb=_0x5c2f6e;this[_0x40ffbb(0x188)]['x']=Math[_0x40ffbb(0x28e)](-$gameMap[_0x40ffbb(0x1c1)]()*$gameMap[_0x40ffbb(0x410)]()),this[_0x40ffbb(0x188)]['y']=Math['floor'](-$gameMap['displayY']()*$gameMap[_0x40ffbb(0x23f)]());},Sprite_LightingEffects[_0x5c2f6e(0x368)][_0x5c2f6e(0x137)]=function(){const _0x39c200=_0x5c2f6e;this['_testDummyR']['scale']['x']=this[_0x39c200(0x38e)][_0x39c200(0x1cf)]['y']=0.9+Math[_0x39c200(0x21a)](Graphics['frameCount']*0.11)*0.1,this['_testDummyG'][_0x39c200(0x1cf)]['x']=this[_0x39c200(0x325)][_0x39c200(0x1cf)]['y']=0.9+Math[_0x39c200(0x21a)](Graphics[_0x39c200(0x203)]*0.12)*0.1,this[_0x39c200(0x395)][_0x39c200(0x1cf)]['x']=this['_testDummyB'][_0x39c200(0x1cf)]['y']=0.9+Math[_0x39c200(0x21a)](Graphics['frameCount']*0.13)*0.1;},Sprite_LightingEffects['prototype'][_0x5c2f6e(0x251)]=function(){const _0x14e17e=_0x5c2f6e;if(this['_overlayColor']===$gameScreen[_0x14e17e(0x405)]())return;this['_overlayColor']=$gameScreen[_0x14e17e(0x405)]();const _0x349ecb=this['_colorSprite']['bitmap'];_0x349ecb['fillRect'](0x0,0x0,0x1,0x1,this[_0x14e17e(0x136)]);},Sprite_LightingEffects['prototype'][_0x5c2f6e(0x272)]=function(){const _0x128358=_0x5c2f6e,_0x78d83f=Graphics[_0x128358(0x238)][_0x128358(0x25c)];if(_0x78d83f){if('kvfgo'!==_0x128358(0x14d)){if(!this[_0x128358(0x452)]())return;this['initLightingEffectsSettings'](),this[_0x128358(0x363)](),this[_0x128358(0x36b)]();}else _0x78d83f[_0x128358(0x254)](this['_proxySprite'],this['texture'],![]);}};function Sprite_LightBase(){const _0x525a2e=_0x5c2f6e;this[_0x525a2e(0x273)](...arguments);}Sprite_LightBase[_0x5c2f6e(0x368)]=Object[_0x5c2f6e(0x3cd)](Sprite[_0x5c2f6e(0x368)]),Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x35e)]=Sprite_LightBase,Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x273)]=function(_0x61ea8a,_0x28fe4c){const _0x3e1531=_0x5c2f6e;this['_source']=_0x61ea8a,this[_0x3e1531(0x33f)]=_0x28fe4c,Sprite[_0x3e1531(0x368)][_0x3e1531(0x273)][_0x3e1531(0x25f)](this),this['initMembers']();},Sprite_LightBase[_0x5c2f6e(0x368)]['initMembers']=function(){const _0x52a61d=_0x5c2f6e;this[_0x52a61d(0x1cb)]['x']=0.5,this[_0x52a61d(0x1cb)]['y']=0.5,this[_0x52a61d(0x1cf)]['x']=0x1,this[_0x52a61d(0x1cf)]['y']=0x1,this['_glowRng']=Math[_0x52a61d(0x323)](0xf4240),this[_0x52a61d(0x389)]=Math[_0x52a61d(0x323)](0xf4240),this[_0x52a61d(0x243)]=0x0;},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x446)]=function(_0x107981){const _0x20593d=_0x5c2f6e;if(this[_0x20593d(0x1d8)]===_0x107981)return;this[_0x20593d(0x1d8)]=_0x107981,this[_0x20593d(0x1b2)]();},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x423)]=function(){const _0x388045=_0x5c2f6e;return this['_source']?this[_0x388045(0x1d8)][_0x388045(0x2a0)]():{};},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x14f)]=function(){const _0x378776=_0x5c2f6e;return this[_0x378776(0x1d8)]?this[_0x378776(0x1d8)][_0x378776(0x26b)]():{};},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x3b8)]=function(){const _0x4d029d=_0x5c2f6e;if(this['_source']&&this['_source'][_0x4d029d(0x35e)]===Game_Vehicle){if(this[_0x4d029d(0x1d8)][_0x4d029d(0x384)]()==='')return![];}return this[_0x4d029d(0x423)]()[_0x4d029d(0x39c)];},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x1b2)]=function(){const _0x3dcf35=_0x5c2f6e;Sprite[_0x3dcf35(0x368)]['update'][_0x3dcf35(0x25f)](this),this[_0x3dcf35(0x431)]();if(this[_0x3dcf35(0x3b8)]()&&this[_0x3dcf35(0x1d8)]){if(_0x3dcf35(0x3a7)===_0x3dcf35(0x3a7))this['updateMain'](),this['updateBehavior']();else return this[_0x3dcf35(0x160)]()?this[_0x3dcf35(0x160)]()[_0x3dcf35(0x350)]():_0x4c5d19[_0x3dcf35(0x368)][_0x3dcf35(0x350)][_0x3dcf35(0x25f)](this);}this[_0x3dcf35(0x3f1)]();},Sprite_LightBase[_0x5c2f6e(0x368)]['updateMain']=function(){const _0x3ac6e8=_0x5c2f6e;this[_0x3ac6e8(0x445)](),this[_0x3ac6e8(0x1a7)](),this[_0x3ac6e8(0x3ac)](),this[_0x3ac6e8(0x2be)]();},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x431)]=function(){const _0x12637b=_0x5c2f6e;if(!this['needsRecreation']())return;this[_0x12637b(0x40e)](),this['createBitmap']();},Sprite_LightBase[_0x5c2f6e(0x368)]['needsRecreation']=function(){return![];},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x40e)]=function(){},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x24b)]=function(){const _0x2339db=_0x5c2f6e,_0x4d8746=this[_0x2339db(0x423)]();this[_0x2339db(0x1cf)]['x']=0x1,this[_0x2339db(0x1cf)]['y']=0x1,this[_0x2339db(0x2a4)]=Math[_0x2339db(0x323)](0xf4240),this['_pulseRng']=Math[_0x2339db(0x323)](0xf4240),this[_0x2339db(0x243)]=0x0;if(_0x4d8746[_0x2339db(0x1e4)]!=='')_0x2339db(0x3fd)!==_0x2339db(0x3bd)?this[_0x2339db(0x27c)]=ImageManager['loadPicture'](_0x4d8746['filename']):this[_0x2339db(0x2a0)]()[_0x2339db(0x1e4)]=_0x5ce922(_0x40ff62['$1'])[_0x2339db(0x157)]();else this[_0x2339db(0x3b8)]()?this[_0x2339db(0x27c)]=this[_0x2339db(0x120)](_0x4d8746):this['bitmap']=new Bitmap(0x1,0x1);},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x120)]=function(_0x251a7a){return new Bitmap(0x1,0x1);},Sprite_LightBase['prototype'][_0x5c2f6e(0x445)]=function(){const _0x320d3f=_0x5c2f6e;this[_0x320d3f(0x1d5)]=0x0;},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x1a7)]=function(){const _0xd36e12=_0x5c2f6e;this[_0xd36e12(0x199)]=this[_0xd36e12(0x423)]()[_0xd36e12(0x199)]||0x0;},Sprite_LightBase['prototype']['updateOpacity']=function(){const _0x4564ab=_0x5c2f6e;this['opacity']=this[_0x4564ab(0x423)]()[_0x4564ab(0x3bc)]||0x0;},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x2be)]=function(){const _0x1dd234=_0x5c2f6e,_0x280be3=this['_originSprite'],_0x60af72=this['lightData']();this['x']=_0x280be3['x'],this['x']+=_0x60af72['offsetX'],this['y']=_0x280be3['y']-Math[_0x1dd234(0x155)](_0x280be3[_0x1dd234(0x158)]/0x2),this['y']+=_0x60af72[_0x1dd234(0x279)],SceneManager[_0x1dd234(0x455)]()&&(this['x']+=(Graphics[_0x1dd234(0x2af)]-Graphics[_0x1dd234(0x3aa)])/0x2,this['y']+=(Graphics[_0x1dd234(0x158)]-Graphics[_0x1dd234(0x2c0)])/0x2);},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x2c7)]=function(){const _0x2d2053=_0x5c2f6e;this[_0x2d2053(0x220)](),this[_0x2d2053(0x369)](),this[_0x2d2053(0x20b)](),this['updateFlare'](),this[_0x2d2053(0x349)](),this[_0x2d2053(0x123)](),this[_0x2d2053(0x3e8)]();},Sprite_LightBase['prototype'][_0x5c2f6e(0x220)]=function(){const _0x5ce1f8=_0x5c2f6e;if(!ConfigManager[_0x5ce1f8(0x15c)])return;const _0x3b4f6f=this[_0x5ce1f8(0x14f)]();if(Math['random']()<(_0x3b4f6f[_0x5ce1f8(0x2d8)]||0x0)){if(_0x5ce1f8(0x333)!==_0x5ce1f8(0x333))return this['conicalLightDashOffsets']();else{const _0x4f7c41=this[_0x5ce1f8(0x3bc)]*(_0x3b4f6f[_0x5ce1f8(0x192)]||0x0);this['opacity']=Math['round'](this['opacity']+_0x4f7c41)['clamp'](0x0,0xff);}}},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x369)]=function(){const _0x5a5ab9=_0x5c2f6e;if(!ConfigManager[_0x5a5ab9(0x15c)])return;const _0x29c18f=this['behaviorData']();if(Math[_0x5a5ab9(0x1c8)]()<(_0x29c18f[_0x5a5ab9(0x30e)]||0x0)){if(_0x5a5ab9(0x3e0)!=='BHQOn'){const _0x27f26c=this[_0x5a5ab9(0x3bc)]*(Math['random']()*(_0x29c18f['flickerModifier']||0x0));this[_0x5a5ab9(0x3bc)]=Math[_0x5a5ab9(0x155)](this['opacity']+_0x27f26c)[_0x5a5ab9(0x27b)](0x0,0xff);}else{_0x1b4620[_0x5a5ab9(0x422)](_0x3ed050,_0x18a3a4);const _0x552c27=_0x36e2fe[_0x5a5ab9(0x385)],_0x289bcc=_0x4d7876[_0x5a5ab9(0x1da)],_0x480e5f=_0x267be1[_0x5a5ab9(0x366)],_0x3c7a2c=_0x6d7fb[_0x5a5ab9(0x118)]();for(let _0x5c19bf of _0x552c27){if(_0x5c19bf===0x0)_0x5c19bf=_0x3c7a2c[_0x5a5ab9(0x129)]();const _0x98f91b=_0x50fc44[_0x5a5ab9(0x452)](_0x5c19bf);_0x98f91b&&(_0x98f91b[_0x5a5ab9(0x3f3)](_0x289bcc),_0x98f91b[_0x5a5ab9(0x299)](_0x480e5f));}}}},Sprite_LightBase[_0x5c2f6e(0x368)]['updateFlash']=function(){const _0x52b7d3=_0x5c2f6e;if(!ConfigManager[_0x52b7d3(0x15c)])return;const _0x3a3c9a=this['behaviorData']();if(Math[_0x52b7d3(0x1c8)]()<(_0x3a3c9a[_0x52b7d3(0x3c6)]||0x0)){if(_0x52b7d3(0x245)==='YGRlH'){const _0x49ff69=0xff*(_0x3a3c9a['flashModifier']||0x0);this[_0x52b7d3(0x3bc)]=Math[_0x52b7d3(0x155)](this[_0x52b7d3(0x3bc)]+_0x49ff69)[_0x52b7d3(0x27b)](0x0,0xff);}else{const _0x5b173d=![];_0x26b332[_0x52b7d3(0x31b)](_0x3ac4b8,!![],_0x5b173d,![]),_0x36fd7f['setVehicleLightingData'](_0x5c6086,!![],_0x5b173d,!![]),_0x5dc81d[_0x52b7d3(0x31b)](_0x3c9c7e,![],_0x5b173d,![]),_0x4a03bf['setVehicleLightingData'](_0x82a524,![],_0x5b173d,!![]);}}},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x3a2)]=function(){const _0x12fc5a=_0x5c2f6e;if(!ConfigManager['blinkingLights'])return;const _0x178a79=this[_0x12fc5a(0x14f)]();if(Math[_0x12fc5a(0x1c8)]()<(_0x178a79[_0x12fc5a(0x1cd)]||0x0)){const _0xd30143=0xff*(Math['random']()*(_0x178a79['flareModifier']||0x0));this[_0x12fc5a(0x3bc)]=Math['round'](this[_0x12fc5a(0x3bc)]+_0xd30143)[_0x12fc5a(0x27b)](0x0,0xff);}},Sprite_LightBase['prototype'][_0x5c2f6e(0x349)]=function(){const _0xe9e4df=_0x5c2f6e;if(!ConfigManager['pulsingLights'])return;const _0x2b6071=this[_0xe9e4df(0x14f)]();if(_0x2b6071[_0xe9e4df(0x1bd)]>0x0){const _0x377b04=_0x2b6071[_0xe9e4df(0x1bd)]/0x2,_0x3f0c6c=0x1-_0x377b04,_0x5121a8=_0x2b6071['glowSpeed'],_0x426043=_0x2b6071['glowRng']?this[_0xe9e4df(0x2a4)]:0x0,_0x7ede1b=Graphics[_0xe9e4df(0x203)]+_0x426043;this[_0xe9e4df(0x3bc)]*=_0x3f0c6c+Math['cos'](_0x7ede1b*_0x5121a8)*_0x377b04;}},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x123)]=function(){const _0x19c599=_0x5c2f6e;if(!ConfigManager[_0x19c599(0x15c)])return;const _0x4f02fb=this[_0x19c599(0x14f)]();if(_0x4f02fb[_0x19c599(0x1c9)]==='')return;if(_0x4f02fb[_0x19c599(0x1c9)]===undefined)return;const _0x24baf5=(_0x4f02fb[_0x19c599(0x1c9)][_0x19c599(0x44d)](this[_0x19c599(0x243)])-0x61)[_0x19c599(0x27b)](0x0,0x19),_0x5ee682=_0x24baf5/0x19;this[_0x19c599(0x3bc)]=Math[_0x19c599(0x155)](0xff*_0x5ee682)['clamp'](0x0,0xff);if(Graphics[_0x19c599(0x203)]%(_0x4f02fb[_0x19c599(0x163)]||0x1)===0x0){if(_0x19c599(0x2c3)!==_0x19c599(0x2c3)){if(!_0x21f10b)return;if(!_0x4f3936)return;if(_0x55983c[_0x19c599(0x257)]()||_0x478981[_0x19c599(0x1a5)]())return;if(!this[_0x19c599(0x437)])return;if(_0x3550f1['isSceneBattle']())return;const _0x54b886=new _0x40c220();_0x54b886['bitmap']=this[_0x19c599(0x3dc)](),_0x54b886[_0x19c599(0x1cf)]['x']=_0x255687[_0x19c599(0x410)](),_0x54b886[_0x19c599(0x1cf)]['y']=_0x40b566['tileHeight'](),this['_autoLightSprite']=_0x54b886,this['_autoLightSprite']['blendMode']=_0x5bb7ca[_0x19c599(0x2f6)]['SCREEN'],this[_0x19c599(0x24f)]()[_0x19c599(0x307)](_0x54b886);}else{this[_0x19c599(0x243)]++;if(this[_0x19c599(0x243)]>=_0x4f02fb[_0x19c599(0x1c9)][_0x19c599(0x308)])this['_patternIndex']=0x0;}}},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x3e8)]=function(){const _0x4c0313=_0x5c2f6e;if(!ConfigManager[_0x4c0313(0x3c3)])return;const _0x32c42c=this[_0x4c0313(0x14f)]();if(_0x32c42c[_0x4c0313(0x16a)]>0x0){if('vhVZF'!==_0x4c0313(0x340)){const _0x98952b=_0x32c42c[_0x4c0313(0x16a)]/0x2,_0x3856d1=0x1-_0x98952b,_0x15eeb8=_0x32c42c[_0x4c0313(0x268)],_0x5c9ecf=_0x32c42c['pulseRng']?this['_pulseRng']:0x0,_0x1974ab=Graphics[_0x4c0313(0x203)]+_0x5c9ecf,_0x537fab=_0x3856d1+Math[_0x4c0313(0x21a)](_0x1974ab*_0x15eeb8)*_0x98952b;this[_0x4c0313(0x1cf)]['x']=this['scale']['y']=_0x537fab;}else return this[_0x4c0313(0x2ca)](this[_0x4c0313(0x399)],!![],!![]);}else _0x4c0313(0x2a1)==='XsGNW'?(_0xa11568['LightingEffects'][_0x4c0313(0x183)][_0x4c0313(0x25f)](this),this['initLightingEffects']()):this[_0x4c0313(0x1cf)]['x']=this[_0x4c0313(0x1cf)]['y']=0x1;},Sprite_LightBase[_0x5c2f6e(0x368)]['updateVisibility']=function(){const _0x23c0a1=_0x5c2f6e;this['visible']=this[_0x23c0a1(0x426)]();},Sprite_LightBase[_0x5c2f6e(0x368)][_0x5c2f6e(0x426)]=function(){const _0x2fbd69=_0x5c2f6e;if(!this['_source'])return![];if(this[_0x2fbd69(0x1d8)]['characterName']&&this['_source'][_0x2fbd69(0x384)]()!==''){if(this['_originSprite']&&!this[_0x2fbd69(0x33f)][_0x2fbd69(0x19a)])return![];}if(this['_source'][_0x2fbd69(0x35e)]===Game_Follower){if(_0x2fbd69(0x11b)!=='zpjyB'){if(!this[_0x2fbd69(0x1d8)][_0x2fbd69(0x160)]())return![];if(!this[_0x2fbd69(0x1d8)][_0x2fbd69(0x3b5)]())return![];}else this['conicalLight']()[_0x2fbd69(0x3ed)]=!![];}if(this[_0x2fbd69(0x1d8)]['_erased'])return![];if(this[_0x2fbd69(0x1d8)]===$gamePlayer){if('MXIah'===_0x2fbd69(0x379)){if($gamePlayer[_0x2fbd69(0x197)]())return![];}else{if(this[_0x2fbd69(0x33f)]&&!this[_0x2fbd69(0x33f)]['visible'])return![];}}if(this[_0x2fbd69(0x1d8)]['isHidden']){if(this[_0x2fbd69(0x1d8)][_0x2fbd69(0x194)]())return![];if(this[_0x2fbd69(0x1d8)][_0x2fbd69(0x335)]())return![];}if(!this[_0x2fbd69(0x423)]())return![];return this[_0x2fbd69(0x3b8)]();};function _0x4c33(){const _0x552de7=['MXIah','offsetX','page','createLowerLayer','makeData','isPosing','CalcSmartOpacity','applyInverse','targetOpacity','boofZ','okcRa','characterName','EventID','MxVmt','#ff0000','fast\x20strobe','_pulseRng','Game_Event_setupPageSettings','#92278f','mmmmmaaaaammmmmaaaaaabcdefgabcdefg','dark\x20gray','_testDummyR','_lastColor','settings','hkawQ','IAaMo','displayY','tIlfN','_testDummyB','_scene','incandescent','presetColorParser','_driving','YMTpQ','note','enabled','code','hexToRgba','nmonqnmomnmomomno','initLightingEffects','WceBA','updateFlare','#a186be','candle','jMwve','followMouse','BiuvD','DjRzR','forceDirection','boxWidth','#444444','updateOpacity','createColorSprite','HandOffset','RadialBehaviorPulseNoRng','regionAutoLightOpacity','_lastFilename','readFlag','ConicalLightChangeEventSettings','shiftLightingOverlayOpacity','isVisible','applyData','1318330SKXQup','isEnabled','setupRadialLight','checkConicalLightHandOffsetStringTags','CdQZc','opacity','EtQpn','Game_Event_clearPageSettings','setup','softAntiLightRegionIDs','9QlHCkj','follower','pulsingLights','RadialBehaviorFlashRate','getSourceDirection','flashRate','grey','ConicalLightNoFollowMouse','filters','light\x20gray','createRadialGradient','halogen','create','#00ffff','RadialBehaviorPulseSpeed','pop','#f49ac1','FollowerConicalBehavior','#fff799','LightingEffects','purple','angleSway','FwNNs','Spriteset_Map_createDestination','_realX','wlkYw','#f7941d','createAutoLightBitmap','UCEKk','setConicalLightWalkOffsets','#%1','sMKBO','light\x20brown','campfire','time','UnboardedSettings','ConicalLightFileAngleOffset','enemy','antiLightMaskSoftTerrainTags','updatePulse','EventConicalBehavior','BattleLightChangeActorSettings','members','format','swayRng','fileAnchorY','RadialLightDiameter','fluorescent','updateVisibility','mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa','setRadialLightSettings','PlayerRadial','MULTIPLY','RadialLightChangeBoatSettings','_colorSprite','6wqqCCJ','targetColor','drawConicalLight','adjustPosition','lPATz','aPoCx','_lightSpawnsFunc','isFollowingFollower','isShip','#827b00','updateCursorAngle','setVehicleLightingConicalOffset','_lastIntensity','lightingOverlayColor','ActorRadialBehavior','dark\x20grey','RadialLightTurnOff','addCommand','light\x20green','VsDashOffset','SpawnLights','ConicalLightUseHandOffset','cacheNewData','abcdefghijklmnopqrrqponmlkjihgfedcba','tileWidth','shiftLightingOverlayColor','_conicalLightWalkOffsets','GzcZL','#ff00ff','expire','toString','maxCommands','arc','ceil','player','BoardedSettings','createOverlayTexture','checkRadialLightBasicStringTags','description','_lastAngle','substring','processLightingEffectsAutoTint','ConvertParams','lightData','riaDM','CoordinatesY','isLightVisible','InitialTime','updateLightingEffectsColor','isJumping','pink','AFykp','isAirship','antiLightMaskSoftRegions','RadialBehaviorPatternUpdateDelay','_followerRadialLight','FEQUj','checkProperties','vehicle','parseDirectionText','createDestination','ConicalBehaviorFlashMod','pulse1','_lightContainer','getRadius','airship','ALLOW_ANTI_LIGHT_MASK','#7b0046','flickerModifier','setupLightingEffectsSpawns','RadialBehaviorGlowSpeed','setupBattleLightingEffectsSettings','Spriteset_Battle_createBattleField','_radialLight','hTvFs','flicker1','initVehicleLightingEffectsSettings','updateAngle','setSource','canvasToMapY','_testDummies','RlzDh','ConicalLightOffset','ynKUt','aaaaaaaazzzzzzzz','charCodeAt','IJHAp','_lastInputTimer','mmmaaaabcdefgmmmmaaaammmaamm','blt','event','sBTbM','ConicalBehaviorPulseRng','isSceneBattle','active','type','white','getLastPluginCommandInterpreter','right','#005e20','AUEyk','ConicalLightCentralOffset','HardRegions','ConicalLightTurnOff','setupPageSettings','generateLight','terrainTag','push','updatePattern','RadialBehaviorBlinkMod','updateLensFlareSprite','setFollowerConicalLightSettings','return\x200','addLightingEffectsPulsingLightsCommand','eventId','RadialBehaviorFlareMod','zXTci','BXVQB','xCwfM','ConicalBehaviorPulseNoRng','_lastRadius','Spriteset_Base_createUpperLayer','mZxqR','atan2','ConicalLightFilename','wVNxf','VsJumpOffset','_overlayColor','updateTestDummies','_antiLightMasks','Yunmu','QtaEN','red','kLuOi','weatherEffectsLensFlare','conicalLightBehavior','initMembers','pattern%1Y','rgba(','Lwlcp','MAX_SAFE_INTEGER','WrWbI','#603913','conicalLightOffsets','ConicalLightAngleSway','ConicalOffsetChangeBoat','YNicz','RadialLightOpacityFlat','isAntiLightingOverlay','save','kvfgo','_conicalLightBehavior','behaviorData','RadialBehaviorFlashMod','#888888','Airship','ONojz','LightSpawnExpireSpawnedLights','round','RadialLightColor','trim','height','Game_Screen_update','_baseSprite','imnpL','blinkingLights','hasAntiLightTiles','_softAntiLightMask','initLightingEffectsSettings','actor','name','_lastMiniRadius','patternDelay','ConicalLightSrcDiameter','uiOOu','color','lightingEffects','Ftucn','BlinkingLightsName','pulseRate','addColorStop','Conical','ConicalBehaviorBlinkMod','dark','_proxySprite','createProxySprite','XImVO','EZlWL','dusk','setConicalLightJumpOffsets','Dglhr','JSON','ConicalBehaviorGlowSpeed','yPDSS','VisuMZ_1_BattleCore','dark\x20orange','ConfigManager_makeData','fileAngleOffset','createNewLightSpawn','addLightingEffectsOptionCommands','Boarded','SoftTerrainTags','turnTowardPoint','ConicalLightCatchAll','Game_Screen_initialize','originY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','iUFyb','glowRng','_autoLightSprite','toUpperCase','RadialLightChangeEventSettings','SfaGw','ijbif','ConicalLightAngle','createBattleField','beginPath','light\x20yellow','dark\x20magenta','blinkModifier','RenderTexture','isHidden','texture','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','isInVehicle','ZXXTr','blendMode','visible','#32004b','clone','Game_Map_setup','createLightingEffectsLightSpawns','TotalSpawns','softAntiLightTerrainTags','PXidK','noLightingOverlay','#000000','Game_BattlerBase_initMembers','isLoopVertical','parameters','updateBlendMode','ActorAutoRadius','blendModeParser','registerCommand','_softAlphaMask','FiKaO','lightingOverlayOpacity','#00ff00','RadialLightChangeFollowerSettings','hekAR','BlinkingLights','update','TPUPl','RadialBehaviorBlinkRate','conicalLightDashOffsets','hardTerrainTagIDs','map','conicalLightWalkOffsets','EventConical','strobe','dark\x20cyan','UtGDw','glowRate','applyDefaultLightingEffectsVehicleData','behavior','SoftRegions','displayX','green','parse','#5674b9','addGeneralOptions','ZUUWt','FollowerConical','random','pattern','UnboardedBehavior','anchor','%1%2%3%4','flareRate','originX','scale','Offset','some','ConicalBehaviorBlinkRate','createLightContainer','opacityDuration','angle','useHandOffset','followerIndex','_source','RegExp','Settings','_conicalLightDashOffsets','FUNC','ConicalLightChangeFollowerSettings','yuhtl','tileset','_lastTouchInputX','ConicalLightHandOffset','_mainSprite','_conicalLightJumpOffsets','filename','ConicalBehaviorGlowRate','VKqRC','EnemyRadial','ConicalBehaviorPatternPreset','ConicalLightOpacityFlat','BOeCB','ConicalOffsetChangeEvent','pJVqr','none','slow\x20strobe','_followerConicalLightBehavior','updateAntiLightMask','wwmJG','_conicalLight','light\x20blue','torch','ConicalLightChangeShipSettings','additive','exSVK','clearPageSettings','setConicalLightBehavior','ARRAYFUNC','24MxXHLX','dark\x20brown','GTmgt','lWueW','AutoRadius','ConicalBehaviorFlickerMod','dark\x20pink','status','frameCount','adjustPositionByTarget','dark\x20red','magenta','LLRBD','1643138OxRKXM','candle3','Ship','updateFlash','abcdefghijklmnopqrstuvwxyzyxwvutsrqponmlkjihgfedcba','match','multiply','_followerConicalLight','AwYGi','PulsingLights','ConicalLightSwayNoRng','Options','brown','dark\x20blue','ConicalLightSwayRng','getFollowerRadialLightSettings','#ffffff','lightSpawns','cos','upper\x20right','processLightingOverlayColor','updateHandPosition','padZero','RadialLightFilename','updateBlink','#0000ff','LightSpawnNewEventLockedLight','version','strobe2','join','RadialBehaviorGlowRate','setFollowerRadialLightBehavior','antiLightMaskHardRegions','ConicalLightForceDir','Spriteset_Map_hideCharacters','RadialLightOpacityRate','#f69679','Sprite_Character_initialize','ARRAYNUM','ConicalBehaviorPulseRate','JniIY','createDefaultLightingEffectsVehicleData','light\x20pink','autoRadius','PlayerConical','test','_lastInputDir','iZXeg','_app','removeChildFromLightContainer','list','ConicalBehaviorFlareRate','RadialLightAngle','isFollowingEvent','pulseRng','tileHeight','#ffff00','#fdc689','checkLightingEffectsStringTags','_patternIndex','#c69c6d','YGRlH','14255KFhRRh','isBoat','qRbvE','LightSpawnNewPlayerLockedLight','checkConicalLightBehaviorStringTags','createBitmap','updateLightingEffectsLightSpawns','LyZaW','AutoTint','lightContainer','Game_Player_initMembers','updateOverlayColor','hideCharacters','PlayerRadialBehavior','render','RadialBehaviorFlareRate','_hardAlphaMask','isLoopHorizontal','uKKfs','createAntiLightMask','AdjustRect','isFollowingPlayer','renderer','zxUXY','_followerRadialLightBehavior','call','#7accc8','black','checkConicalLightBasicStringTags','Map','pattern%1X','fillStyle','ExpirationTimer','AseFQ','pulseSpeed','yellow','pulse','radialLightBehavior','_noDarknessOverlay','cyan','left','hardRegionIDs','light\x20magenta','jklmnopqrstuvwxyzyxwvutsrqponmlkj','updateOverlayRender','initialize','followers','miniRadius','getFollowerConicalLightSettings','227kHjNhq','RadialBehaviorGlowRng','offsetY','#2e3192','clamp','bitmap','fTVFG','mmamammmmammamamaaamammma','setConicalLightSettings','night','createAntiLightMaskBitmap','setupLightingEffectsSettings','VFuKh','_lastEnabled','ConicalLightChangeAirshipSettings','ConicalBehaviorFlareMod','#790000','Game_Actor_setup','BattleLightChangeEnemySettings','_lightingEffects','ConicalBehaviorPatternUpdateDelay','FollowerRadial','_hardAntiLightMask','floor','CoordinatesX','SMOOTH_MASKING','Spriteset_Base_createLowerLayer','destroy','ADD','_realY','sunset','normal','ARRAYEVAL','UGYWj','setRadialLightBehavior','setupConicalLight','createTestDummies','SpriteMaskFilter','setFollowerConicalLightBehavior','regionId','includes','radialLight','wvmOH','RetrieveOpacityPattern','EnemyAutoRadius','_glowRng','_baseTexture','VisuMZ_0_CoreEngine','canvasToMapX','_vehicleLightingSettings','light\x20purple','day','FollowerRadialBehavior','LightSpawnNewFollowerLockedLight','light\x20orange','HlgwY','width','RadialLightCatchAll','lower\x20right','eioEg','ConicalLightBlendMode','RadialBehaviorGlowNoRng','dir%1','radius','isUsingMapCoordinates','PlayerConicalBehavior','drawRadialLight','Battle','startTint','checkRadialLightBehaviorStringTags','_spriteset','updatePosition','Radial','boxHeight','boat','sepia','okArJ','lineTo','colorDuration','softTerrainTagIDs','updateBehavior','AlRVi','#bd8cbf','getVehicleLightingData','_lensFlareSprite','13578ZOPrkk','opacityPatternParser','ZRpbN','ConicalLightGeneric','findTargetSprite','SCREEN','flicker3','qxLbH','toLowerCase','RadialBehaviorPulseRate','ConicalLightColor','orange','blinkRate','leader','OverlayChangeToPreset','createLightSpawnFunction','createAutoLightRegions','#9e0039','setLightingOverlayOpacity','Opacity','Dwjmx','Sprite_SvEnemy','addChildToLightContainer','flashModifier','fillRect','updateAutoLightAreas','cIJDu','createLensFlareSprite','#005952','isPressed','11NWXLks','ShakeBuffer','ConicalLightChangePlayerSettings','down','cacheOpacity','intensity','BoardedBehavior','Window_Options_addGeneralOptions','BoardedOffset','STR','LIGHTING_EFFECTS_SMART_AUTO_OPACITY','needsRecreation','BLEND_MODES','updateLightSpawn','QXwHh','setConicalLightDashOffsets','addLightingEffects','updateLastInputType','addLightingEffectsBlinkingLightsCommand','dawn','AntiLight','iDslA','hexToArray','_lightSpawns','ConicalLightRadius','Boat','_swayRng','#a3d39c','fill','addChild','length','drawTestDummy','dark\x20yellow','AddPulsingLights','gWPPP','screen','flickerRate','pow','exit','14696580LXuRFZ','Enable','Duration','ConicalLightSrcRadius','light\x20grey','jUKsy','RadialBehaviorFlickerRate','checkLightingEffectsAutoTintPresets','mmnmmommommnonmmonqnmmo','isLightingEnabled','setVehicleLightingData','ARRAYSTR','_radialLightBehavior','hardAntiLightTerrainTags','LightingEffectsOptions','AddBlinkingLights','#aaaaaa','EVAL','randomInt','#f06eaa','_testDummyG','636mwOLqe','arrayToHex','max','isUsingScreenCoordinates','smooth','destroyLightContainer','VqXph','hardAntiLightRegionIDs','EnemyRadialBehavior','RadialLightOffset','ConicalBehaviorGlowRng','yjmKe','Sprite_Battler_setBattler','LPYYB','fileAnchorX','isDead','_lastInputTouch','brDxS','UWEva','_battleField','DXtIm','#ace4fa','getFollowerRadialLightBehavior','Unboarded','setFollowerRadialLightSettings','_originSprite','fKqzo','ROImu','updateLightingEffectsOpacity','#003663','glowSpeed','450480BhMCtO','adjustPositionByMap','softRegionIDs','ZEHvL','updateGlow','patternName','split','add','setBattler','swaySpeed','FQrff','conicalLightJumpOffsets','ExIdO','conicalLight','light\x20cyan','ConicalLightSwaySpeed','Color','handOffsetData','ConicalLightOpacityRate','JtPnp','ConicalOffsetChangeShip','SxkXP','mElZc','_lastTouchInputY','Game_Map_update','constructor','#7d4900','makeDeepCopy','Scene_Options_maxCommands','dark\x20green','setupLightingEffectsNotetags','1582908sYghVH','ship','Behavior','VisuMZ_1_EventsMoveCore','prototype','updateFlicker','PJOna','setupLightingEffectsCommentTags','UnboardedOffset','mmPvi','isDirectionFixed','SHAKE_BUFFER','rotateSpeed','OtLga','#8c6239','candle1','updateCharacterAngle','RadialLightChangeShipSettings','ActorID','JWFJy','slow\x20pulse'];_0x4c33=function(){return _0x552de7;};return _0x4c33();}function Sprite_RadialLight(){const _0x5bc4b2=_0x5c2f6e;this[_0x5bc4b2(0x273)](...arguments);}Sprite_RadialLight[_0x5c2f6e(0x368)]=Object[_0x5c2f6e(0x3cd)](Sprite_LightBase[_0x5c2f6e(0x368)]),Sprite_RadialLight[_0x5c2f6e(0x368)]['constructor']=Sprite_RadialLight,Sprite_RadialLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x273)]=function(_0x56ecd6,_0x1f3334){const _0x96e7e=_0x5c2f6e;Sprite_LightBase[_0x96e7e(0x368)]['initialize'][_0x96e7e(0x25f)](this,_0x56ecd6,_0x1f3334);},Sprite_RadialLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x423)]=function(){const _0x11081c=_0x5c2f6e;return this[_0x11081c(0x1d8)]?this[_0x11081c(0x1d8)][_0x11081c(0x2a0)]():{};},Sprite_RadialLight['prototype'][_0x5c2f6e(0x14f)]=function(){const _0x296247=_0x5c2f6e;return this[_0x296247(0x1d8)]?this['_source'][_0x296247(0x26b)]():{};},Sprite_RadialLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x438)]=function(_0x7f7e9f){const _0x195a33=_0x5c2f6e;let _0x3b3f8c=_0x7f7e9f[_0x195a33(0x2b6)];if(_0x7f7e9f['autoRadius']){if(_0x195a33(0x1b3)===_0x195a33(0x1b3)){let _0x5b34c0=this['_originSprite'];if(this['_originSprite'][_0x195a33(0x1e2)])_0x5b34c0=_0x5b34c0;let _0x564507=Math[_0x195a33(0x30f)](_0x5b34c0[_0x195a33(0x2af)],0x2)+Math[_0x195a33(0x30f)](_0x5b34c0[_0x195a33(0x158)],0x2);_0x564507=Math[_0x195a33(0x30f)](_0x564507,0.5),_0x564507/=0x2,_0x3b3f8c=Math[_0x195a33(0x328)](_0x564507,_0x3b3f8c);}else _0x2e4790['LightingEffects'][_0x195a33(0x22d)]['call'](this,_0x54a76b),this[_0x195a33(0x3b9)](_0x343907),this['setupConicalLight'](_0x1a6a35);}return _0x3b3f8c;},Sprite_RadialLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x2f5)]=function(){const _0x23c074=_0x5c2f6e,_0x5be406=this[_0x23c074(0x423)]();if(this[_0x23c074(0x284)]!==_0x5be406[_0x23c074(0x39c)])return!![];if(this[_0x23c074(0x3b1)]!==_0x5be406[_0x23c074(0x1e4)])return!![];if(this[_0x23c074(0x12f)]!==this['getRadius'](_0x5be406))return!![];if(this[_0x23c074(0x38f)]!==_0x5be406[_0x23c074(0x166)])return!![];if(this['_lastIntensity']!==_0x5be406[_0x23c074(0x2ef)])return!![];return Sprite_LightBase['prototype']['needsRecreation'][_0x23c074(0x25f)](this);},Sprite_RadialLight['prototype']['cacheNewData']=function(){const _0x239130=_0x5c2f6e,_0xb2dbe0=this[_0x239130(0x423)]();this[_0x239130(0x284)]=_0xb2dbe0[_0x239130(0x39c)],this['_lastFilename']=_0xb2dbe0[_0x239130(0x1e4)],this[_0x239130(0x12f)]=this[_0x239130(0x438)](_0xb2dbe0),this[_0x239130(0x38f)]=_0xb2dbe0[_0x239130(0x166)],this[_0x239130(0x404)]=_0xb2dbe0[_0x239130(0x2ef)];},Sprite_RadialLight['prototype'][_0x5c2f6e(0x120)]=function(_0x4ea35b){const _0xd9ef37=_0x5c2f6e,_0x361197=this[_0xd9ef37(0x438)](_0x4ea35b),_0x1392b3=ColorManager[_0xd9ef37(0x398)](_0x4ea35b[_0xd9ef37(0x166)]),_0x21f216=_0x4ea35b[_0xd9ef37(0x2ef)],_0x4e47e4=Math[_0xd9ef37(0x419)](_0x361197)*0x2,_0x383462=new Bitmap(_0x4e47e4,_0x4e47e4);return _0x383462[_0xd9ef37(0x2b9)](_0x361197,_0x1392b3,_0x21f216),_0x383462;},Sprite_RadialLight['prototype'][_0x5c2f6e(0x445)]=function(){const _0x160efa=_0x5c2f6e;this[_0x160efa(0x1d5)]=-this['lightData']()['angle']||0x0,this['lightData']()[_0x160efa(0x1d5)]-=this[_0x160efa(0x423)]()[_0x160efa(0x370)]||0x0;};function Sprite_ConicalLight(){this['initialize'](...arguments);}Sprite_ConicalLight[_0x5c2f6e(0x368)]=Object[_0x5c2f6e(0x3cd)](Sprite_LightBase['prototype']),Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x35e)]=Sprite_ConicalLight,Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x273)]=function(_0x515f10,_0x300c9c){const _0x452648=_0x5c2f6e;Sprite_LightBase['prototype'][_0x452648(0x273)][_0x452648(0x25f)](this,_0x515f10,_0x300c9c),this['createLensFlareSprite'](),this[_0x452648(0x44f)]=0x4;},Sprite_ConicalLight['prototype'][_0x5c2f6e(0x2e7)]=function(){const _0xe20f9=_0x5c2f6e;if(!Imported['VisuMZ_2_WeatherEffects'])return;return;this[_0xe20f9(0x2cb)]=new Sprite(),this[_0xe20f9(0x2cb)][_0xe20f9(0x27c)]=ImageManager[_0xe20f9(0x13d)](),this[_0xe20f9(0x2cb)][_0xe20f9(0x199)]=0x1,this[_0xe20f9(0x2cb)][_0xe20f9(0x1cf)]['x']=0.6,this[_0xe20f9(0x2cb)]['scale']['y']=0.6,this[_0xe20f9(0x2cb)][_0xe20f9(0x1cb)]['x']=0.5,this[_0xe20f9(0x2cb)]['anchor']['y']=0.5,this['_lensFlareSprite'][_0xe20f9(0x19a)]=![],this[_0xe20f9(0x307)](this[_0xe20f9(0x2cb)]);},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x423)]=function(){const _0x20a7ef=_0x5c2f6e;return this[_0x20a7ef(0x1d8)]?this['_source'][_0x20a7ef(0x352)]():{};},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x14f)]=function(){const _0x1a48cf=_0x5c2f6e;return this['_source']?this[_0x1a48cf(0x1d8)][_0x1a48cf(0x13e)]():{};},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x356)]=function(){const _0x3fd248=_0x5c2f6e;return this[_0x3fd248(0x1d8)]?this[_0x3fd248(0x1d8)][_0x3fd248(0x146)]():{};},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x2f5)]=function(){const _0x22fd49=_0x5c2f6e,_0x5cacdf=this['lightData']();if(this[_0x22fd49(0x284)]!==_0x5cacdf[_0x22fd49(0x39c)])return!![];if(this['_lastFilename']!==_0x5cacdf[_0x22fd49(0x1e4)])return!![];if(this[_0x22fd49(0x12f)]!==_0x5cacdf['radius'])return!![];if(this[_0x22fd49(0x38f)]!==_0x5cacdf[_0x22fd49(0x166)])return!![];if(this[_0x22fd49(0x404)]!==_0x5cacdf[_0x22fd49(0x2ef)])return!![];if(this['_lastAngle']!==_0x5cacdf[_0x22fd49(0x1d5)])return!![];if(this[_0x22fd49(0x162)]!==_0x5cacdf['miniRadius'])return!![];return Sprite_LightBase[_0x22fd49(0x368)][_0x22fd49(0x2f5)]['call'](this);},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x40e)]=function(){const _0x18636a=_0x5c2f6e,_0xa1ae72=this['lightData']();this[_0x18636a(0x284)]=_0xa1ae72[_0x18636a(0x39c)],this[_0x18636a(0x3b1)]=_0xa1ae72['filename'],this[_0x18636a(0x12f)]=_0xa1ae72[_0x18636a(0x2b6)],this[_0x18636a(0x38f)]=_0xa1ae72['color'],this[_0x18636a(0x404)]=_0xa1ae72['intensity'],this[_0x18636a(0x41f)]=_0xa1ae72[_0x18636a(0x1d5)],this[_0x18636a(0x162)]=_0xa1ae72[_0x18636a(0x275)];},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x24b)]=function(){const _0x19466b=_0x5c2f6e;Sprite_LightBase[_0x19466b(0x368)][_0x19466b(0x24b)][_0x19466b(0x25f)](this),this[_0x19466b(0x1e0)]=TouchInput['x'],this[_0x19466b(0x35c)]=TouchInput['y'],this['_lastInputTouch']=![],this[_0x19466b(0x236)]=!![],this[_0x19466b(0x44f)]=0x4,this['_swayRng']=Math[_0x19466b(0x323)](0xf4240);const _0x18dd62=this[_0x19466b(0x423)]();_0x18dd62[_0x19466b(0x1e4)]!==''?(this[_0x19466b(0x1cb)]['x']=_0x18dd62[_0x19466b(0x334)],this[_0x19466b(0x1cb)]['y']=_0x18dd62['fileAnchorY']):(this[_0x19466b(0x1cb)]['x']=0.5,this['anchor']['y']=0.5);},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x120)]=function(_0x26805f){const _0x392393=_0x5c2f6e,_0x15fab4=_0x26805f[_0x392393(0x2b6)],_0x4c075e=ColorManager[_0x392393(0x398)](_0x26805f[_0x392393(0x166)]),_0x2518bb=_0x26805f[_0x392393(0x2ef)],_0xbef293=_0x26805f[_0x392393(0x1d5)],_0x58bdf0=_0x15fab4*0x2,_0x4be184=0x1,_0x42e890=0x0,_0x4bccd3=new Bitmap(_0x58bdf0,_0x58bdf0);_0x4bccd3[_0x392393(0x3fa)](_0x15fab4,_0xbef293,_0x4c075e,_0x2518bb,_0x4be184,_0x42e890);const _0x407c94=_0x26805f['miniRadius'],_0x4cbcb8=_0x407c94*0x2,_0x3de4cc=new Bitmap(_0x4cbcb8,_0x4cbcb8);_0x3de4cc[_0x392393(0x2b9)](_0x407c94,_0x4c075e,_0x2518bb);const _0x5006b2=Math[_0x392393(0x28e)](_0x58bdf0/0x2)-_0x407c94;return _0x4bccd3[_0x392393(0x451)](_0x3de4cc,0x0,0x0,_0x4cbcb8,_0x4cbcb8,_0x5006b2,_0x5006b2,_0x4cbcb8,_0x4cbcb8),_0x4bccd3;},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x3c5)]=function(){const _0x19c2fe=_0x5c2f6e;if(this['_source'][_0x19c2fe(0x37e)]&&this[_0x19c2fe(0x1d8)][_0x19c2fe(0x37e)]())return 0x2;const _0x1d2d14=this[_0x19c2fe(0x423)]();return _0x1d2d14['forceDirection']?_0x1d2d14[_0x19c2fe(0x3a9)]:this[_0x19c2fe(0x1d8)]['_direction'];},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x445)]=function(){const _0x20b1cf=_0x5c2f6e;this['updateLastInputType']();if(this[_0x20b1cf(0x236)])this[_0x20b1cf(0x374)]();else this[_0x20b1cf(0x336)]?this[_0x20b1cf(0x402)]():_0x20b1cf(0x172)!=='Wllyr'?this[_0x20b1cf(0x1d5)]=0x0:this[_0x20b1cf(0x13e)]()[_0x20b1cf(0x163)]=_0x21b1eb(_0x4fb0e6['$1'])||0x1;this[_0x20b1cf(0x125)]();},Sprite_ConicalLight['prototype'][_0x5c2f6e(0x2fb)]=function(){const _0x2b790a=_0x5c2f6e;if(this['allowCharacterAngleUpdate']()){if($gameTemp['isDestinationValid']()||['up',_0x2b790a(0x2ed),_0x2b790a(0x26e),_0x2b790a(0x119)][_0x2b790a(0x1d1)](_0x2251a7=>Input[_0x2b790a(0x2e9)](_0x2251a7)))this[_0x2b790a(0x336)]=![],this['_lastInputDir']=!![],this['_lastInputTimer']=0x4;else{if(this[_0x2b790a(0x423)]()[_0x2b790a(0x3a6)]&&(this['_lastTouchInputX']!==TouchInput['x']||this[_0x2b790a(0x35c)]!==TouchInput['y'])){if(this[_0x2b790a(0x44f)]--)return;this[_0x2b790a(0x336)]=!![],this[_0x2b790a(0x236)]=![];}}}else this[_0x2b790a(0x1d8)]!==$gamePlayer&&this['_source']!==$gamePlayer[_0x2b790a(0x432)]()&&(_0x2b790a(0x377)!==_0x2b790a(0x351)?(this[_0x2b790a(0x336)]=this[_0x2b790a(0x423)]()['followMouse'],this[_0x2b790a(0x236)]=!this[_0x2b790a(0x423)]()[_0x2b790a(0x3a6)]):(_0x416f69['LightingEffects'][_0x2b790a(0x440)][_0x2b790a(0x25f)](this),this[_0x2b790a(0x2fa)]()));},Sprite_ConicalLight['prototype']['allowCharacterAngleUpdate']=function(){const _0xd1eb84=_0x5c2f6e;if($gameScreen[_0xd1eb84(0x405)]()===_0xd1eb84(0x218))return![];if($gameScreen[_0xd1eb84(0x1ad)]()<=0x0)return![];return this[_0xd1eb84(0x1d8)]===$gamePlayer||this[_0xd1eb84(0x1d8)]===$gamePlayer[_0xd1eb84(0x432)]();},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x402)]=function(){const _0x379b4c=_0x5c2f6e;this[_0x379b4c(0x1e0)]=TouchInput['x'],this[_0x379b4c(0x35c)]=TouchInput['y'];const _0x40f872=new Point(TouchInput['x'],TouchInput['y']),_0x2bfd9f=this[_0x379b4c(0x33f)]['worldTransform'][_0x379b4c(0x380)](_0x40f872),_0x3c24dd=this[_0x379b4c(0x423)]();let _0x42f8ec=Math[_0x379b4c(0x132)](_0x2bfd9f['y'],_0x2bfd9f['x'])*0xb4/Math['PI'];_0x3c24dd[_0x379b4c(0x1e4)]===''?_0x42f8ec-=_0x3c24dd[_0x379b4c(0x1d5)]/0x2:_0x379b4c(0x338)===_0x379b4c(0x338)?_0x42f8ec-=_0x3c24dd[_0x379b4c(0x17c)]:(this[_0x379b4c(0x24f)]()&&this[_0x379b4c(0x19e)](),_0x594323[_0x379b4c(0x3d4)]['Spriteset_Base_createUpperLayer']['call'](this));this[_0x379b4c(0x1d5)]=_0x42f8ec;if(!this['_source'][_0x379b4c(0x36e)]()){if(this[_0x379b4c(0x1d8)]===$gamePlayer&&$gamePlayer['isInVehicle']())return;if($gameScreen[_0x379b4c(0x405)]()===_0x379b4c(0x218))return;if($gameScreen['lightingOverlayOpacity']()<=0x0)return;let _0x1604d7=this[_0x379b4c(0x1d8)];if(this[_0x379b4c(0x1d8)]===$gamePlayer['vehicle']())_0x1604d7=$gamePlayer;const _0x1fa1eb=$gameMap[_0x379b4c(0x2a7)](TouchInput['x']),_0x3ab6ee=$gameMap[_0x379b4c(0x447)](TouchInput['y']);_0x1604d7[_0x379b4c(0x181)](_0x1fa1eb,_0x3ab6ee);}},Sprite_ConicalLight[_0x5c2f6e(0x368)][_0x5c2f6e(0x374)]=function(){const _0x598c30=_0x5c2f6e,_0x38a189=this[_0x598c30(0x423)]();let _0x54b4da=0x0;if(_0x38a189[_0x598c30(0x1e4)]===''){if('ZRpbN'!==_0x598c30(0x2ce)){if(this['_source']['characterName']()==='')return![];}else _0x54b4da-=_0x38a189[_0x598c30(0x1d5)]/0x2;}else _0x54b4da-=_0x38a189[_0x598c30(0x17c)]||0x0;const _0x20996f=this['getSourceDirection']();_0x54b4da+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][_0x20996f];if(_0x38a189[_0x598c30(0x3d6)]){const _0x5de42a=_0x38a189[_0x598c30(0x3ed)]?this[_0x598c30(0x304)]:0x0,_0x3b7ea1=Graphics[_0x598c30(0x203)]+_0x5de42a,_0x305b34=_0x38a189[_0x598c30(0x34e)];_0x54b4da+=Math[_0x598c30(0x21a)](_0x3b7ea1*_0x305b34)*_0x38a189[_0x598c30(0x3d6)];}this[_0x598c30(0x1d5)]=_0x54b4da;},Sprite_ConicalLight[_0x5c2f6e(0x368)]['updateLensFlareSprite']=function(){const _0x25e580=_0x5c2f6e;if(!this[_0x25e580(0x2cb)])return;const _0xafb944=this['getSourceDirection']();this[_0x25e580(0x2cb)][_0x25e580(0x19a)]=_0xafb944===0x2,this[_0x25e580(0x2cb)][_0x25e580(0x1d5)]=this[_0x25e580(0x1d5)]/0x2;},Sprite_ConicalLight['prototype'][_0x5c2f6e(0x2be)]=function(){const _0x58397f=_0x5c2f6e,_0x2c652b=this[_0x58397f(0x423)]();_0x2c652b[_0x58397f(0x1d6)]?this[_0x58397f(0x21d)]():Sprite_LightBase[_0x58397f(0x368)][_0x58397f(0x2be)][_0x58397f(0x25f)](this);},Sprite_ConicalLight['prototype']['updateHandPosition']=function(){const _0x5923f2=_0x5c2f6e,_0x44013b=this[_0x5923f2(0x356)](),_0x2e43ef=this[_0x5923f2(0x33f)];let _0x31d7d5=(Number(this['getSourceDirection']())||0x2)[_0x5923f2(0x27b)](0x0,0x9);if(_0x31d7d5===0x0||_0x31d7d5===0x5)_0x31d7d5=0x2;const _0x1d7840=_0x5923f2(0x2b5)[_0x5923f2(0x3ec)](_0x31d7d5),_0x1f2dcd=_0x5923f2(0x264)[_0x5923f2(0x3ec)](this[_0x5923f2(0x1d8)][_0x5923f2(0x1c9)]()||0x0),_0x2d71cc=_0x5923f2(0x140)[_0x5923f2(0x3ec)](this['_source'][_0x5923f2(0x1c9)]()||0x0),_0x213182=(_0x44013b[_0x1d7840]||{})[_0x1f2dcd]||0x0,_0xea5f0f=(_0x44013b[_0x1d7840]||{})[_0x2d71cc]||0x0;this['x']=_0x2e43ef['x'],this['x']+=_0x213182,this['y']=_0x2e43ef['y']-Math[_0x5923f2(0x155)](_0x2e43ef[_0x5923f2(0x158)]/0x2),this['y']+=_0xea5f0f;},Sprite_ConicalLight[_0x5c2f6e(0x368)]['isLightVisible']=function(){const _0x174ebf=_0x5c2f6e;if(!Sprite_LightBase['prototype'][_0x174ebf(0x426)][_0x174ebf(0x25f)](this))return![];if(!this['lightData']())return![];return this['isEnabled']();};function Sprite_LightSpawn(){const _0x71bbe6=_0x5c2f6e;this[_0x71bbe6(0x273)](...arguments);}function _0x4751(_0x15ba87,_0xc709b6){const _0x4c3326=_0x4c33();return _0x4751=function(_0x4751c2,_0x55a2a2){_0x4751c2=_0x4751c2-0x115;let _0x3af8d8=_0x4c3326[_0x4751c2];return _0x3af8d8;},_0x4751(_0x15ba87,_0xc709b6);}Sprite_LightSpawn['prototype']=Object[_0x5c2f6e(0x3cd)](Sprite_RadialLight[_0x5c2f6e(0x368)]),Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x35e)]=Sprite_LightSpawn,Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x273)]=function(_0x1ce360){const _0x22b531=_0x5c2f6e;Sprite_RadialLight[_0x22b531(0x368)][_0x22b531(0x273)][_0x22b531(0x25f)](this,_0x1ce360,null);},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x423)]=function(){const _0x302a84=_0x5c2f6e;return this['_source']?this[_0x302a84(0x1d8)][_0x302a84(0x390)]:{};},Sprite_LightSpawn[_0x5c2f6e(0x368)]['behaviorData']=function(){const _0x1c8946=_0x5c2f6e;return this[_0x1c8946(0x1d8)]?this[_0x1c8946(0x1d8)][_0x1c8946(0x1bf)]:{};},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x426)]=function(){const _0x40f401=_0x5c2f6e;if(this['_source']&&!this['_source']['active'])return![];return Sprite_LightBase[_0x40f401(0x368)][_0x40f401(0x426)][_0x40f401(0x25f)](this);},Sprite_LightSpawn[_0x5c2f6e(0x368)]['isUsingScreenCoordinates']=function(){const _0x549b80=_0x5c2f6e;return this[_0x549b80(0x1d8)]?this[_0x549b80(0x1d8)][_0x549b80(0x116)]===_0x549b80(0x30d):![];},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x2b7)]=function(){const _0x2bf816=_0x5c2f6e;return this[_0x2bf816(0x1d8)]?this['_source']['type']==='map':![];},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x25b)]=function(){const _0x21e1e1=_0x5c2f6e;return this[_0x21e1e1(0x1d8)]?this[_0x21e1e1(0x1d8)][_0x21e1e1(0x116)]===_0x21e1e1(0x41a):![];},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x3ff)]=function(){const _0x24d8d9=_0x5c2f6e;return this[_0x24d8d9(0x1d8)]?this['_source'][_0x24d8d9(0x116)]==='follower':![];},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x23d)]=function(){const _0x41cadd=_0x5c2f6e;return this[_0x41cadd(0x1d8)]?this[_0x41cadd(0x1d8)][_0x41cadd(0x116)]===_0x41cadd(0x452):![];},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x2be)]=function(){const _0x33b706=_0x5c2f6e,_0xa46d34=this[_0x33b706(0x1d8)],_0x16fbbb=this[_0x33b706(0x423)]();this['x']=_0xa46d34['x'],this['x']+=_0x16fbbb[_0x33b706(0x37a)],this['y']=_0xa46d34['y'],this['y']+=_0x16fbbb['offsetY'],this[_0x33b706(0x3fb)](),this['x']=Math[_0x33b706(0x155)](this['x']),this['y']=Math[_0x33b706(0x155)](this['y']);},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x3fb)]=function(){const _0x26ca7a=_0x5c2f6e,_0x3e2815=this[_0x26ca7a(0x1d8)];if(this[_0x26ca7a(0x329)]())this['x']+=_0x3e2815[_0x26ca7a(0x1ce)],this['y']+=_0x3e2815['originY'];else{if(this[_0x26ca7a(0x2b7)]()){if(_0x26ca7a(0x358)!==_0x26ca7a(0x358))_0x401f8d[_0x26ca7a(0x3f3)](_0x507bd3),_0x28e85a['setRadialLightBehavior'](_0x3c6e52);else{let _0x406859=_0x3e2815[_0x26ca7a(0x1ce)]+0.5,_0x2ce981=_0x3e2815[_0x26ca7a(0x184)]+0.5;this[_0x26ca7a(0x346)](_0x406859,_0x2ce981);}}else{if(this[_0x26ca7a(0x25b)]()){const _0x19663b=$gamePlayer;this[_0x26ca7a(0x204)](_0x19663b);}else{if(this[_0x26ca7a(0x3ff)]()){if(_0x26ca7a(0x134)!==_0x26ca7a(0x134))_0x50776b[_0x26ca7a(0x3d4)]['Spriteset_Map_hideCharacters']['call'](this),this['_lightingEffects']&&this[_0x26ca7a(0x28a)]['update']();else{const _0x5c2f50=$gamePlayer[_0x26ca7a(0x274)]()[_0x26ca7a(0x3c2)](_0x3e2815[_0x26ca7a(0x1d7)]||0x0);this['adjustPositionByTarget'](_0x5c2f50);}}else{if(this[_0x26ca7a(0x23d)]()){if(_0x26ca7a(0x18c)!=='DhagS'){const _0x407117=$gameMap[_0x26ca7a(0x452)](_0x3e2815[_0x26ca7a(0x129)]);this[_0x26ca7a(0x204)](_0x407117);}else _0x3c198e-=_0x5a623b['fileAngleOffset'];}}}}}},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x346)]=function(_0x48bc5f,_0x47509d,_0x238ac7,_0x2112a5){const _0x20787c=_0x5c2f6e;this['x']+=Math[_0x20787c(0x28e)](-$gameMap[_0x20787c(0x1c1)]()*$gameMap[_0x20787c(0x410)]()),this['y']+=Math[_0x20787c(0x28e)](-$gameMap[_0x20787c(0x393)]()*$gameMap[_0x20787c(0x23f)]()),this['x']+=Math[_0x20787c(0x28e)](_0x48bc5f*$gameMap['tileWidth']()),this['y']+=Math[_0x20787c(0x28e)](_0x47509d*$gameMap[_0x20787c(0x23f)]()),this['x']+=_0x238ac7||0x0,this['y']+=_0x2112a5||0x0;},Sprite_LightSpawn[_0x5c2f6e(0x368)][_0x5c2f6e(0x204)]=function(_0xeb72b1){const _0x5e5be4=_0x5c2f6e;if(!_0xeb72b1)return;let _0x2bf07b=_0xeb72b1[_0x5e5be4(0x3d9)]+0.5,_0x191a16=_0xeb72b1[_0x5e5be4(0x294)]+0x1,_0x150411=0x0,_0x30ed71=0x0;const _0x549c42=SceneManager['_scene']['_spriteset'];if(_0x549c42){if('AlRVi'!==_0x5e5be4(0x2c8))_0x2b3dc0=-(_0x80db86['height']/0x2);else{const _0x214147=_0x549c42[_0x5e5be4(0x2d0)](_0xeb72b1);_0x214147&&(_0x30ed71=-(_0x214147[_0x5e5be4(0x158)]/0x2));}}this['adjustPositionByMap'](_0x2bf07b,_0x191a16,_0x150411,_0x30ed71);},VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x291)]=Spriteset_Base[_0x5c2f6e(0x368)][_0x5c2f6e(0x37c)],Spriteset_Base[_0x5c2f6e(0x368)][_0x5c2f6e(0x37c)]=function(){const _0x1e37a4=_0x5c2f6e;this['createLightingEffects'](),VisuMZ[_0x1e37a4(0x3d4)]['Spriteset_Base_createLowerLayer'][_0x1e37a4(0x25f)](this);},VisuMZ['LightingEffects'][_0x5c2f6e(0x130)]=Spriteset_Base[_0x5c2f6e(0x368)]['createUpperLayer'],Spriteset_Base['prototype']['createUpperLayer']=function(){const _0xe5bffb=_0x5c2f6e;this['lightContainer']()&&this['createLightingEffectsLightSpawns'](),VisuMZ['LightingEffects'][_0xe5bffb(0x130)][_0xe5bffb(0x25f)](this);},Spriteset_Base[_0x5c2f6e(0x368)][_0x5c2f6e(0x2fa)]=function(){const _0x3db312=_0x5c2f6e;if(!this[_0x3db312(0x31a)]())return;this['_lightingEffects']&&this[_0x3db312(0x15a)][_0x3db312(0x307)](this['_lightingEffects']);},Spriteset_Base[_0x5c2f6e(0x368)]['createLightingEffects']=function(){const _0x355b41=_0x5c2f6e;if(!this[_0x355b41(0x31a)]())return;this[_0x355b41(0x28a)]=new Sprite_LightingEffects(this),this[_0x355b41(0x437)]=this['_lightingEffects'][_0x355b41(0x24f)](),SceneManager[_0x355b41(0x396)]['_lightContainer']=this[_0x355b41(0x28a)]['lightContainer']();},Spriteset_Base['prototype'][_0x5c2f6e(0x24f)]=function(){return this['_lightContainer'];},Spriteset_Base[_0x5c2f6e(0x368)]['isLightingEnabled']=function(){return![];},Spriteset_Base['prototype'][_0x5c2f6e(0x19e)]=function(){},Spriteset_Map['prototype']['isLightingEnabled']=function(){const _0x287959=_0x5c2f6e;return VisuMZ[_0x287959(0x3d4)][_0x287959(0x1da)][_0x287959(0x263)][_0x287959(0x312)];},VisuMZ['LightingEffects'][_0x5c2f6e(0x3d8)]=Spriteset_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x434)],Spriteset_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x434)]=function(){const _0x1dc379=_0x5c2f6e;VisuMZ[_0x1dc379(0x3d4)]['Spriteset_Map_createDestination']['call'](this),this['addLightingEffects']();},VisuMZ[_0x5c2f6e(0x3d4)]['Spriteset_Map_hideCharacters']=Spriteset_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x252)],Spriteset_Map['prototype']['hideCharacters']=function(){const _0x1576b1=_0x5c2f6e;VisuMZ[_0x1576b1(0x3d4)][_0x1576b1(0x22a)][_0x1576b1(0x25f)](this);if(this[_0x1576b1(0x28a)]){if('LDGeq'!==_0x1576b1(0x237))this[_0x1576b1(0x28a)][_0x1576b1(0x1b2)]();else return this[_0x1576b1(0x2ca)](this[_0x1576b1(0x399)],![],!![]);}},Spriteset_Map[_0x5c2f6e(0x368)][_0x5c2f6e(0x19e)]=function(){const _0x535117=_0x5c2f6e,_0x26f82d=$gameMap[_0x535117(0x219)]();for(const _0x44fb60 of _0x26f82d){const _0x296e96=new Sprite_LightSpawn(_0x44fb60);SceneManager[_0x535117(0x2e2)](_0x296e96);}},Spriteset_Battle['prototype'][_0x5c2f6e(0x31a)]=function(){const _0x9a5bbd=_0x5c2f6e;if(!Imported[_0x9a5bbd(0x179)])return![];return VisuMZ[_0x9a5bbd(0x3d4)][_0x9a5bbd(0x1da)][_0x9a5bbd(0x2ba)]['Enable'];},VisuMZ[_0x5c2f6e(0x3d4)]['Spriteset_Battle_createBattleField']=Spriteset_Battle['prototype']['createBattleField'],Spriteset_Battle[_0x5c2f6e(0x368)][_0x5c2f6e(0x18e)]=function(){const _0x473906=_0x5c2f6e;VisuMZ[_0x473906(0x3d4)][_0x473906(0x440)][_0x473906(0x25f)](this),this[_0x473906(0x2fa)]();},Spriteset_Battle[_0x5c2f6e(0x368)][_0x5c2f6e(0x2fa)]=function(){const _0x4f805f=_0x5c2f6e;if(!this[_0x4f805f(0x31a)]())return;if(this['_lightingEffects']){if(_0x4f805f(0x230)==='JniIY')this[_0x4f805f(0x339)][_0x4f805f(0x307)](this[_0x4f805f(0x28a)]),this[_0x4f805f(0x28a)]['x']=this[_0x4f805f(0x339)]['width']/0x2,this[_0x4f805f(0x28a)]['y']=this[_0x4f805f(0x339)][_0x4f805f(0x158)]/0x2;else return _0xdd18f7[_0x4f805f(0x33c)]();}},VisuMZ[_0x5c2f6e(0x3d4)][_0x5c2f6e(0x2f1)]=Window_Options[_0x5c2f6e(0x368)]['addGeneralOptions'],Window_Options[_0x5c2f6e(0x368)][_0x5c2f6e(0x1c5)]=function(){const _0x55768a=_0x5c2f6e;VisuMZ[_0x55768a(0x3d4)]['Window_Options_addGeneralOptions'][_0x55768a(0x25f)](this),this[_0x55768a(0x17e)]();},Window_Options['prototype'][_0x5c2f6e(0x17e)]=function(){const _0x2775c1=_0x5c2f6e;VisuMZ[_0x2775c1(0x3d4)][_0x2775c1(0x1da)][_0x2775c1(0x213)][_0x2775c1(0x320)]&&this['addLightingEffectsBlinkingLightsCommand'](),VisuMZ[_0x2775c1(0x3d4)]['Settings']['Options'][_0x2775c1(0x30b)]&&this['addLightingEffectsPulsingLightsCommand']();},Window_Options[_0x5c2f6e(0x368)][_0x5c2f6e(0x2fc)]=function(){const _0x424b72=_0x5c2f6e,_0x1293ce=TextManager[_0x424b72(0x31f)][_0x424b72(0x1b1)],_0x34ca21=_0x424b72(0x15c);this['addCommand'](_0x1293ce,_0x34ca21);},Window_Options['prototype'][_0x5c2f6e(0x128)]=function(){const _0x1011e9=_0x5c2f6e,_0x6b650b=TextManager['LightingEffectsOptions'][_0x1011e9(0x211)],_0x58d807='pulsingLights';this[_0x1011e9(0x409)](_0x6b650b,_0x58d807);};