var SpikaAdapter = {

    listener : null,
    testFunction: function(car){
      console.log(car);
    },
    attach : function(options){
        console.log("ENTERED ATTACH FUNCTION");

        if(!options)
            return;
        console.log("ENTERED ATTACH FUNCTION 1");

        if(!options.attachTo)
            return;
        console.log("ENTERED ATTACH FUNCTION 2");

        if(!options.spikaURL)
            return;
        console.log("ENTERED ATTACH FUNCTION 3");

        if(!options.user)
            return;
        console.log("ENTERED ATTACH FUNCTION 4");

        if(!options.user.id)
            return;
        console.log("ENTERED ATTACH FUNCTION 5");

        if(!options.user.name)
            return;
        console.log("ENTERED ATTACH FUNCTION 6");

        if(!options.user.roomID)
            return;
        console.log("ENTERED ATTACH FUNCTION ");


        window.bootOptions = options;

        if(options.mode == 'div'){
            console.log("USING DIV");
            window.startSpikaIntoDiv();
            console.log("USING DIV");

        }else{

            console.log("USING DIV");
            // attach to dom
            var iframe = document.createElement('iframe');

            var url = options.spikaURL;

            url += "?params=" + encodeURIComponent(JSON.stringify(options));

            iframe.src = url;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = 0;

            var node = document.getElementById(options.attachTo);

            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }

            node.appendChild(iframe);

        }

        if(options.listener)
            this.listener = options.listener;

    }

}

// export to global
window.SpikaAdapter = SpikaAdapter;
