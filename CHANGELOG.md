CHANGELOG
=========

v0.10.1
* Add support for Node 0.12
* Add support for IO.js
* Add support for css selectors for getElement/getElements/hasElement as fall-back

v0.10.0 - 02/24/15
* Add getElements method to base page-object
* Add devicePixelRatio support for retina displays
* Fixes for Chrome bugs:
  * Calculate devicePixelRatio whenever possible.
  * Scroll-offset is subtracted from element-offset for view-port screenshots
  * Scroll to top of element when taking screenshot for view-port screenshots

v0.9.5 - 11/19/14
* Bugfix to check the url first before determining the root-element

v0.9.4 - 11/13/14
* Bugfix in request, making sure that the returned value is always a parsed object

v0.9.3 - 11/06/14
* Use a different sleep function; should fail less often
* Remove support for node 0.11 for now

v0.9.2 - 11/05/14
* Add message to waitUntil
* Delete storage objects in reverse

v0.9.1 - Initial release 11/04/14
