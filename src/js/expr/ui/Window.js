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

namespace("expr.ui");

using("expr.base.Object");
using("expr.ui.LayoutManager");

expr.ui.Window = function(title, layoutType)
{
    this._element = document.createElement("div");
    this._element.addStyleClass("window");
    this._resourceRequest("text/css", "expr/ui/Window.css");

    if (!layoutType)
        layoutType = expr.ui.LayoutType.Border;

    this._layoutManager = new expr.ui.LayoutManager(this, layoutType);

    if (title) {
        this.title = title;
        var titleElement = document.createElement("div");
        titleElement.addStyleClass("title");
        titleElement.textContent = title;
        this._element.appendChild(titleElement);
    }
}

expr.ui.Window.prototype = {
    __proto__: expr.base.Object.prototype,

    show: function()
    {
        this._loadResources();
        document.body.appendChild(this._element);
    },

    hide: function()
    {
        document.body.removeChild(this._element);
    },

    setLayout: function(layout)
    {
        this._layoutManager.setLayout(layout);
    },

    _resourceRequest: function(mimeType, resource)
    {
        if (!this._resources)
            this._resources = {};

        this._resources[resource] = { type: mimeType, url: resource, loaded: false };
    },

    _loadResources: function()
    {
        for (var resourceKey in this._resources) {
            var resource = this._resources[resourceKey];
            if (resource.loaded)
                continue;

            switch(resource.type) {
            case "text/css":
                styleElement = document.createElement("style");
                styleElement.type = "text/css";
                styleElement.textContent = requestResourceSync(resource.type, resource.url);
                document.head.insertBefore(styleElement, document.head.firstChild);
                resource.loaded = true;
                break;
            }
        }
    }
}
