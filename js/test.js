(function() {
    var gulpTest = (function() {
        function init() {
            console.log(1);
        }
        return {
            init: init
        };
    })();

    gulpTest.init();
})();
