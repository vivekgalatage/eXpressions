/*
 * Copyright (c) 2013, Vivek Galatage
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function namespace(nspace)
{
    var nspaceComponents = nspace.split(".");
    var parent = window;
    for (var i = 0; i < nspaceComponents.length; ++i) {
        if (typeof parent[nspaceComponents[i]] === "undefined") {
            parent[nspaceComponents[i]] = {};
        }
        parent = parent[nspaceComponents[i]];
    }
}

function using(nspace)
{
    var nspaceComponents = nspace.split(".");
    var parent = window;
    var found = true;
    for (var i = 0; i < nspaceComponents.length; ++i) {
        if (typeof parent[nspaceComponents[i]] === "undefined") {
            found = false;
            break;
        }
        parent = parent[nspaceComponents[i]];
    }
    if (!found) {
        var scriptPath = nspace.replace(/\./g, "/") + ".js";
        importScript(scriptPath);
    }
}

function requestResourceSync(type, url)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
}

var _importedScripts = {};

function importScript(scriptName)
{
    if (_importedScripts[scriptName])
        return;
    _importedScripts[scriptName] = true;
    window.eval(requestResourceSync("text/javascript", scriptName));
}

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
};

Element.prototype.removeStyleClass = function(className)
{
    this.classList.remove(className);
}

Element.prototype.addStyleClass = function(className)
{
    this.classList.add(className);
}
