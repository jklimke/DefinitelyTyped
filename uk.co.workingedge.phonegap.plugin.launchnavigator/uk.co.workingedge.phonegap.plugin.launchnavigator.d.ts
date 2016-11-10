// Type definitions for uk.co.workingedge.phonegap.plugin.launchnavigator v3.2.1
// Project: https://github.com/dpa99c/phonegap-launch-navigator
// Definitions by: Dave Alden <https://github.com/dpa99c>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


interface Window {
    /**
     * Indicates whether the current device is a tablet or a phone.
     * @return {boolean} true if the device is a tablet; false if the device is a phone.
     */
    LaunchNavigator(): LaunchNavigator;
}

interface LaunchNavigatorOptions {

    /**
     * A callback to invoke when the navigation app is successfully launched.
     */
    successCallback?: Function;

    /**
     * A callback to invoke if an error is encountered while launching the app.
     * A single string argument containing the error message will be passed in.
     */
    errorCallback?: (error: string) => void;

    /**
     * name of the navigation app to use for directions.
     * Specify using launchnavigator.APP constants.
     * e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * If not specified, defaults to User Selection.
     */
    app?: string;

    /**
     * nickname to display in app for destination. e.g. "Bob's House".
     */
    destinationName?: string;

    /**
     * Start point of the navigation.
     * If not specified, the current device location will be used.
     * Either:
     *  - a {string} containing the address. e.g. "Buckingham Palace, London"
     *  - a {string} containing a latitude/longitude coordinate. e.g. "50.1. -4.0"
     *  - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
     */
    start?: string | number[];

    /**
     * nickname to display in app for start . e.g. "My House".
     */
    startName?: string;

    /**
     * Transportation mode for navigation: "driving", "walking" or "transit". Defaults to "driving" if not specified.
     */
    transportMode?: string;

    /**
     * If true, debug log output will be generated by the plugin. Defaults to false.
     */
    enableDebug?: boolean;

    /**
     * a key/value map of extra app-specific parameters. For example, to tell Google Maps on Android to display Satellite view in "maps" launch mode: `{"t": "k"}`
     */
    extras?: any;

    /**
     * (Android only) mode in which to open Google Maps app: "maps" or "turn-by-turn". Defaults to "maps" if not specified. Specify using launchnavigator.LAUNCH_MODE constants.
     */
    launchMode?: string;

    /**
     * text to display in the native picker which enables user to select which navigation app to launch. Defaults to "Select app for navigation" if not specified.
     */
    appSelectionDialogHeader?: string;

    /**
     * text to display for the cancel button in the native picker which enables user to select which navigation app to launch. Defaults to "Cancel" if not specified.
     */
    appSelectionCancelButton?: string;

    /**
     * List of apps, defined as `launchnavigator.APP` constants, which should be displayed in the picker if the app is available.
     * This can be used to restrict which apps are displayed, even if they are installed.
     * By default, all available apps will be displayed.
     */
    appSelectionList?: string[];

    /**
     * Callback to invoke when the user selects an app in the native picker.
     * A single string argument is passed which is the app what was selected defined as a `launchnavigator.APP` constant.
     */
    appSelectionCallback?: (app: string) => void;
}


interface LaunchNavigator {

    /**
     * Supported platforms
     */
    PLATFORM: any;

    /**
     * string constants, used to identify apps in native code
     */
    APP: any;

    /**
     * All possible transport modes
     */
    TRANSPORT_MODE: any;

    /**
     * Launch modes supported by Google Maps on Android
     */
    LAUNCH_MODE: any;


    /**
     * Launches navigator app
     * @param destination {string|number[]} Location name or coordinates (as string or array)
     * Either:
     * - a {string} containing the address. e.g. "Buckingham Palace, London"
     * - a {string} containing a latitude/longitude coordinate. e.g. "50.1. -4.0"
     * - an {array}, where the first element is the latitude and the second element is a longitude, as decimal numbers. e.g. [50.1, -4.0]
     * @param options {LaunchNavigatorOptions}
     * @returns {Promise<any>}
     */
    navigate: (
        destination: string | number[], 
        options?: LaunchNavigatorOptions
    ) => void;
    
    logEvent: (name: string, params?: any, valueToSum?: number) => void;

    

    /**
     * Determines if the given app is installed and available on the current device.
     * @param app {string}
     */
    isAppAvailable: (
        app: string,
        successCallback: (isAvailable: boolean) => void,
        errorCallback?: (error: string) => void
    ) => void;

    /**
     * Returns a list indicating which apps are installed and available on the current device.
     * @return string[]
     */
    availableApps: (
        successCallback: (apps: any ) => void,
        errorCallback?: (error: string) => void
    ) => void;

    /**
     * Returns the display name of the specified app.
     * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * @return {string} - app display name. e.g. "Google Maps".
     */
    getAppDisplayName: (app: string) => string;

    /**
     * Returns list of supported apps on a given platform.
     * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
     * @return {array} - apps supported on specified platform as a list of `launchnavigator.APP` constants.
     */
    getAppsForPlatform: (platform: string) => string[];

    /**
     * Indicates if an app on a given platform supports specification of transport mode.
     * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
     * @return {boolean} - true if app/platform combination supports specification of transport mode.
     */
    supportsTransportMode: (
        app: string,
        platform: string
    ) => boolean;

    /**
     * Returns the list of transport modes supported by an app on a given platform.
     * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
     * @return {array} - list of transports modes as constants in `launchnavigator.TRANSPORT_MODE`.
     * If app/platform combination doesn't support specification of transport mode, the list will be empty;
     */
    getTransportModes: (
        app: string,
        platform: string
    ) => string[];

    /**
     * Indicates if an app on a given platform supports specification of launch mode.
     * Note that currently only Google Maps on Android does.
     * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.ANDROID`.
     * @return {boolean} - true if app/platform combination supports specification of transport mode.
     */
    supportsLaunchMode: (
        app: string,
        platform: string
    ) => boolean;

    /**
     * Indicates if an app on a given platform supports specification of start location.
     * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
     * @return {boolean} - true if app/platform combination supports specification of start location.
     */
    supportsStart: (
        app: string,
        platform: string
    ) => boolean;

    /**
     * Indicates if an app on a given platform supports specification of a custom nickname for start location.
     * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
     * @return {boolean} - true if app/platform combination supports specification of start location.
     */
    supportsStartName: (
        app: string,
        platform: string
    ) => boolean;

    /**
     * Indicates if an app on a given platform supports specification of a custom nickname for destination location.
     * @param {string} app - specified as a constant in `launchnavigator.APP`. e.g. `launchnavigator.APP.GOOGLE_MAPS`.
     * @param {string} platform - specified as a constant in `launchnavigator.PLATFORM`. e.g. `launchnavigator.PLATFORM.IOS`.
     * @return {boolean} - true if app/platform combination supports specification of destination location.
     */
    supportsDestName: (
        app: string,
        platform: string
    ) => boolean;


    /**
     * Triggers the native dialog picker for user to choose wich app to use.
     * @param {mixed} destination (required) - destination location to use for navigation - see launchnavigator.navigate()
     * @param {object} options (optional) - optional parameters - see launchnavigator.navigate()
     * @param {Function} successCallback (optional) - optional callback to be invoked on success
     * @param {Function} errorCallback (optional) - optional callback to be invoked on error
     */
    userSelect: (
        destination: string | number[],
        options: LaunchNavigatorOptions
    ) => void;
}

declare var launchnavigator: LaunchNavigator;