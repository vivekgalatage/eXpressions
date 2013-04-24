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

namespace("expr.app");

using("expr.base.Object");
using("expr.config.Preferences");
using("expr.ui.Window");
using("expr.ui.BorderLayout");

expr.app.Application = function()
{

}

expr.app.Application.prototype = {
    __proto__: expr.base.Object.prototype,

    run: function()
    {
        var layout = new expr.ui.BorderLayout();
        layout.add("<h1>IRC Subject</h1>", expr.ui.BorderDirection.North);
        layout.add("<h1>Status Bar</h1>", expr.ui.BorderDirection.South);
        layout.add("<h1>Members</h1>", expr.ui.BorderDirection.East);
        layout.add("<h1>Chat Window</h1>asdfjasfadfad fa<p>asfjasldfjasfjkasldf<br>asjalsfjaklsdf<hr>", expr.ui.BorderDirection.West);

        this.mainWindow = new expr.ui.Window("eXpressions: Express the emotions!!!  ");
        this.mainWindow.setLayout(layout);
        this.mainWindow.show();
    }
}

expr.app.eXpressions = new expr.app.Application();
