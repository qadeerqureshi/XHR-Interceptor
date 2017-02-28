exports.Interceptor=function() {
    (function () {
        xhook.after(function (request, response) {

            var url = request.url;

            function XHRObjectCreator() {

                var XHRInterceptObj = {};
                XHRInterceptObj.request = request;
                XHRInterceptObj.response = response.data;
                XHRInterceptObj.status = response.status;
                XHRInterceptObj.url = url;
                XHRInterceptObj = JSON.stringify(XHRInterceptObj);
                return XHRInterceptObj;
            }

            var a_hashmap = window._config;
            for (var i = 0, keys = Object.keys(a_hashmap), ii = keys.length; i < ii; i++) {
                if (url.indexOf(a_hashmap[keys[i]]) > -1) {
                    if (keys[i].indexOf('_profilePic') > -1) {
                        if(request.url.indexOf('profile')>-1)

                        if (JSON.parse(request.body).method == 'updateUserProfileImageIfUploaded' && JSON.parse(response.data).data.user_profile_image_type == '1') {
                                eval(keys[i] + "=XHRObjectCreator();");
                        }
                    }
                    else {
                        console.log("Key "+keys[i]);
                        eval(keys[i] + "=XHRObjectCreator();");
                    }
                }
            }

        });
    })();
}
