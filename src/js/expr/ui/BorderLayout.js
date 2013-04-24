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

using("expr.ui.Layout");

expr.ui.BorderDirection = {
    North: "North",
    South: "South",
    Center: "Center",
    East: "East",
    West: "West"
}

expr.ui.BorderLayout = function()
{
    expr.ui.Layout.call(this);
    var table = document.createElement("table");
    table.width = "100%";

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var north = document.createElement("div");
    north.id = "north";
    td.colSpan = 3;
    td.appendChild(north);
    tr.appendChild(td);
    table.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    var west = document.createElement("div");
    west.id = "west"
    td.appendChild(west);
    tr.appendChild(td);

    td = document.createElement("td");
    var center = document.createElement("div");
    center.id = "center";
    td.appendChild(center);
    tr.appendChild(td);

    td = document.createElement("td");
    var east = document.createElement("div");
    east.id = "east";
    td.appendChild(east);
    tr.appendChild(td);
    table.appendChild(tr);

    tr = document.createElement("tr");
    td = document.createElement("td");
    var south = document.createElement("div");
    south.id = "south";
    td.colSpan = 3;
    td.appendChild(south);
    tr.appendChild(td);
    table.appendChild(tr);

    this._element.appendChild(table);
}

expr.ui.BorderLayout.prototype = {
    __proto__: expr.ui.Layout.prototype,

    add: function(widget, direction) {
        direction = direction.toLowerCase();
        var container = this._element.querySelector("#" + direction);
        if (container)
            container.innerHTML = widget;
    }
}
