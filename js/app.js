// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js',
    paths: {
        object: 'app/objects',
        game: 'app/games'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/poker']);

window.debug = true;

window.pokerLog = function(message){
	if (window.debug) {
		console.log(message);
	}
};