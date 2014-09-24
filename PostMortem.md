#Igneous Example
##Logan Knecht
---
##Overview:
This project was created in order to provide a personal code sample for Igneous Systems. 

##Requirements:
The goal is to build a single page web application that allows a user to view time series data. The user should be able to pick from a list of several available time series. The time series should represent system performance metrics such as CPU usage, disk capacity, memory usage, network traffic, etc  from an imaginary computer system. The data for these series can be generated randomly when the user views each chart but it must appear to be somewhat realistic. For example, a graph showing disk usage should probably look like a smooth line that mostly increases over time. New data can be generated each time a time series is plotted.

1. Choose one or more time series to view. 

2. View separate charts for each selected time series. If multiple time series are selected, they should appear each as separate charts on the screen versus as separate lines on one chart. If a user hasn’t selected to view a time series, a chart for that series must not
appear. 

3. Not view any series at all. 

4. Choose to view either 1 hour or 1 week of time series data for the currently displayed time series.

5. The design should be responsive and look good and be usable on phone, tablet and desktop screens. 

##Libraries Used:
Twitter Bootstrap 3.2  
http://getbootstrap.com/

Jquery-1.11.1.js  
http://jquery.com/

Flot 0.8.3  
http://www.flotcharts.org/

##Prior Experience
Prior to this, a lot of my web development for websites was based strongly on the .NET framework using ASP.Net and other libraries in order to create the sites.

I have barely used twitter bootstrap prior to this, basic experimentation with it was the only thing that I had under my belt.


JQuery I was already pretty familiar with.  

I have never used Flot before

##Post-Mortem:
Overall - this was not a particulary difficult assignment. When I started the process for this sample I noticed some specific requirements such as correct display on phones, tablets, and desktops. This seems to be a pretty reasonable request, and because of that my first thought was to use Twitter's bootstrap library. 

Following that there was also another requirement, one that wanted a display of chart data. Now, I personally haven't used any charting libraries outside of matplotlib in Python, so I did some minor research, and then chose the Flot javascript library because that's what StackOverflow is supposedly using. There wasn't a performance thought, or visual aesthetic basis for any of that. I'll discuss later how I feel like this bit me in the butt.

With the libraries selected I decided to move forward with creation of a general feel for the website. This meant creating a structure for how to display information, configuring a layout that would represent the location of the charts I would be hooking up, etc, etc. This is where bootstrap came in. With minimal effort I had configured a template of the looke and feel I was going for.

Once the basic look was accomplished I started to configure a basic chart created by Flot. This was such a pain in my butt! Flot has some reasonable documentation, but there were so many times I caught myself creating javascript objects with incorrect data that it became frustrating. I'll cover more on this later.

Once the chart was created I then started on some logic I wanted to create to configure the page on load. I decided to create a javascript prototype 'class' for the default chart settings, and then I abstracted the chart away. What this allowed me to do was custom fit each different chart to some willy nilly specifications I chose in order to emulate behaviour of the performance graphs mentioned in the requirements.

Once that was done I doubled back to make the interface look reasonable aesthetically, and moved on to the post mortem.

##Short Comings
Hoo boy, I could go on for this one, but I'll try to keep it short.

Overall the site looks reasonable, the interface is reliable, and it emulates a lot of the funtionality you would expect from the requirements. It does fall short in a couple of areas.

Starting with the side nav bar. Going into this I had already envisioned the type of interface I wanted to create. this included a side nav bar that would allow the user to toggle the different charts desired. Initially I implemented this using some radio buttons, but on swinging back to clean up the ui I went and implemented it. The problem was that it doesn't create padding on the mobile devices when the charts are being displayed. This caused it to overlap, and it's really not a good design for the user. Sure you can still see the data, but eh, it's not great. To fix this I would have likely just made it collapable with an indicator to show where to click to open it again.

Next up are the charts. The charts are nice, but man if I could do it over again I'd choose Charts.js. Not even because I think I know enough about it to be confident in it, but just because it's not Flot. Flot from the beginning appeared reasonable enough, use jquery, get the object, pass some data, plot it out. The issues arose in trying to configure any of the custom settings for axis, labels, and miscellaneous features built in. The documentation is reasonable, but it isn't clear in a lot of aspects. The examples they have are reasonable, but in some instances I found myself searching for better implementations. If I could do it over again the charts would be labelled a lot better, the charts would be populated dynamically using templates from probably something like Handlebars, and it would feel a lot better as a whole.