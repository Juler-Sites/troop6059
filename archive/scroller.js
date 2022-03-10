/***********************************************
 * Memory Scroller script- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
 ***********************************************/
var memorywidth = "1913px" //scroller width
var memoryheight = "18px" //scroller height
var memorybgcolor = "#CC0000" //scroller background
var memorypadding = "0" //padding applied to the scroller. 0 for non.
var borderCSS = "border: 0px solid black;" //Border CSS, applied to scroller to give border.
var memoryspeed = "2" //Scroller speed (larger is faster 1-10)
var pauseit = 1 //Pause scroller onMousever (0=no. 1=yes)?
var persistlastviewedmsg = 1 //should scroller's position persist after users navigate away (1=yes, 0=no)?
var persistmsgbehavior = "onload" //set to "onload" or "onclick".
//Specify the scroller's content (don't delete <nobr> tag)
//Keep all content on ONE line, and backslash any single quotations (ie: that\'s great):
var memorycontent = '<nobr><font color="#FFFF33"><b>Welcome to my site! </b><a href="/weather/warning_display.aspx?id=7332" class="<messsage>"><font color="#FFFF33">This is a simple scroller banner using script from a site that is archived. </font></a>, <a href="/weather/warning_display.aspx?id=7341" class="messsage"><font color="#FFFF33"></font></a> X <a href="/weather/warning_display.aspx?id=7336" class="messsage"><font color="#FFFF33"> Change this to display your message </font></a> <a href="/weather/warning_display.aspx?id=7342" class="messsage"><font color="#FFFF33">.....</font></a> | <a href="/weather/warning_display.aspx?id=7337" class="messsage"><font color="#FFFF33">X </font></a> | <a href="/weather/warning_display.aspx?id=7337" class="messsage">X<font color="#FFFF33"></font></a> <a href="/weather/warning_display.aspx?id=7338" class="messsage"><font color="#FFFF33"> </font></a></font> | <a href="/weather/warning_display.aspx?id=7337" class="messsage"><font color="#FFFF33">  X  </font></a> <a href="/weather/warning_display.aspx?id=7337" class="messsage"><font color="#FFFF33">| |</font></a> X <a href="/weather/warning_display.aspx?id=7337" class="messsage"><font color="#FFFF33">|||</font></a> | <a href="/weather/warning_display.aspx?id=7337" class="messsage"><font color="#FFFF33">  </font></a>  <a href="/weather/warning_display.aspx?id=7337" class="messsage"><font color="#FFFF33">X</font></a></nobr>'
var combinedcssTable = "width:" + (parseInt(memorywidth) + 6) + "px;background-color:" + memorybgcolor + ";padding:" + memorypadding + ";" + borderCSS + ";"
var combinedcss = "width:" + memorywidth + ";height:" + memoryheight + ";"
var divonclick = (persistlastviewedmsg && persistmsgbehavior == "onclick") ? 'onClick="savelastmsg()" ' : ''
memoryspeed = (document.all) ? memoryspeed : Math.max(1, memoryspeed - 1) //slow speed down by 1 for NS
var copyspeed = memoryspeed
var pausespeed = (pauseit == 0) ? copyspeed : 0
var iedom = document.all || document.getElementById
if (iedom)
    document.write('<span id="temp" style="visibility:hidden;position:absolute;top:-10000px;left:-10000px">' + memorycontent + '</span>')
var actualwidth = ''
var memoryscroller
if (window.addEventListener)
    window.addEventListener("load", populatescroller, false)
else if (window.attachEvent)
    window.attachEvent("onload", populatescroller)
else if (document.all || document.getElementById)
    window.onload = populatescroller

function populatescroller() {
    memoryscroller = document.getElementById ? document.getElementById("memoryscroller") : document.all.memoryscroller
    memoryscroller.style.left = parseInt(memorywidth) + 28 + "px"
    if (persistlastviewedmsg && get_cookie("lastscrollerpos") != "")
        revivelastmsg()
    memoryscroller.innerHTML = memorycontent
    actualwidth = document.all ? temp.offsetWidth : document.getElementById("temp").offsetWidth
    lefttime = setInterval("scrollmarquee()", 20)
}

function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = ""
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1)
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}

function savelastmsg() {
    document.cookie = "lastscrollerpos=" + memoryscroller.style.left
}

function revivelastmsg() {
    lastscrollerpos = parseInt(get_cookie("lastscrollerpos"))
    memoryscroller.style.left = parseInt(lastscrollerpos) + "px"
}

if (persistlastviewedmsg && persistmsgbehavior == "onload")
    window.onunload = savelastmsg

function scrollmarquee() {
    if (parseInt(memoryscroller.style.left) > (actualwidth * (-1) + 8))
        memoryscroller.style.left = parseInt(memoryscroller.style.left) - copyspeed + "px"
    else
        memoryscroller.style.left = parseInt(memorywidth) + 8 + "px"
}

if (iedom) {
    with (document) {
        document.write('<table class="text_white" border="0" cellspacing="0" cellpadding="0" style="' + combinedcssTable + '"><td>')
        write('<div style="position:relative;overflow:hidden;' + combinedcss + '" onMouseover="copyspeed=pausespeed" onMouseout="copyspeed=memoryspeed">')
        write('<div id="memoryscroller" style="position:absolute;left:0px;top:0px;" ' + divonclick + '></div>')
        write('</div>')
        document.write('</td></table>')
    }
}