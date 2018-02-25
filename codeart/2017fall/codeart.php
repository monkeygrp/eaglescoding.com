<!DOCTYPE html>
<!-- To do
    -add art generation videos.
    -put imagenav over the top of the images.
        -make a background bar to contain it.
        -use event handlers to make it autohide.
-->

<html lang="en-US">
<head>
    <meta charset="UTF-8" />
    <meta name="description" content="Home of Apollo coding class">
    <meta name="author" content="Matthew Stockinger" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Art - Fall 2017</title>
    <link rel="stylesheet" href="../../css/w3.css">
    <link rel="stylesheet" href="../../css/codeart.css" />
    <link href='https://fonts.googleapis.com/css?family=Biryani:800' 
        rel='stylesheet' type='text/css'>
</head>

<body>

<!-- w3-collapse = phone hamburger menu.  flexcontainer centers vertically on screen. -->
<nav id="mySideNav" class="w3-sidenav w3-collapse w3-padding flexcontainer">
    <a href="javascript:void(0)" onclick="closeMainNav()" class="w3-button w3-white w3-large w3-hide-large w3-padding">&times; Close</a>
    <div class="w3-black w3-margin">
        <a href="http://eaglescoding.com" class="w3-biryani">APOLLO CODING CLASS</a>
    </div>
    <div class="w3-black w3-margin">
        <a href="http://eaglescoding.com/makey/makey.html" class="w3-biryani" target="_blank">Makey Makey!<br><br></a>
    </div>
    <div class="w3-black w3-margin">
        <a href="http://eaglescoding.com/students/student_pages.php" class="w3-biryani">Student Web Pages<br><br></a>
    </div>
    <div class="w3-black w3-margin">
        <a href="javascript:void(0)" onclick="openCodeArtNav()" class="w3-biryani">Student Code Art<br><br></a>
    </div>
</nav>

<nav id="codeArtNav" class="w3-sidenav w3-padding flexcontainer">
    <a href="javascript:void(0)" onclick="closeCodeArtNav()" class="w3-button w3-white w3-large w3-hide-large w3-padding">&times; Close</a>
    <a href="javascript:void(0)" onclick="backToMainNav()" class="w3-button w3-white w3-large w3-padding">
        &#10094; Back
    </a>
    <?php
        $ls = scandir("../");
        foreach ($ls as $item) {
            // if it's ./ or ../ or cgi-bin, ignore it.
            if ($item === "." or $item === ".." or $item === "cgi-bin") continue;
            // if it's a named directory, create a link on the page.
            if (is_dir("../" . $item)) {
                // parse the directory name.  Format is e.g. 2017fall.  
                // Want this to become a string, "Fall 2017"
                $year = substr($item,0,4);
                $season = substr($item,4);
                // then echo div and <a> to add that item to sidenav.
                /* example: 
                <div class="codeArtNavDivs w3-margin w3-black" onclick="highlightMe(this)">
                    <a href="codeart/2017fall/codeart_2017fall.html" class="w3-biryani"><br>Fall 2017<br><br></a>
                </div> */
                $res = '<div class="codeArtNavDivs w3-margin w3-black" onclick="highlightMe(this)">';
                $res .= '<a href="../' . $item . '/codeart.php" class="w3-biryani"><br>';
                $res .= ucfirst($season) . " " . $year . '<br><br></a></div>';
                echo $res;
            }
        }
    ?>
</nav>

<!-- wrapper for page content. Helper class for hamburger menu. -->
<main class="w3-main">
    <!-- hamburger icon header bar -->
    <header class="w3-container w3-black">
        <span class="w3-opennav w3-xlarge w3-hide-large" onclick="openCodeArtNav()">&#9776;</span>
    </header>
    
    <div id="picDiv" class="w3-content">
        <!-- images here should preferably have an aspect ratio of 0.71 
        That's 317 x 446 -->
        <?php
            $ls = scandir("./");
            foreach ($ls as $item) {
                // if it's ./ or ../, ignore it.
                if ($item === "." or $item === "..") continue;
                
                // find the jpegs and generate <figure> elements.
                /* example:
                    <figure class="mySlides">
                        <img src="Hinda_Mohamed,Abdiowasoho_Mahamed.jpg">
                        <figcaption>Hinda Mohamed, Abdiowasoho Mohamed</figcaption>
                    </figure>
                */
                if (strtolower(substr($item, -3)) === "jpg" or strtolower(substr($item, -4)) === "jpeg") {
                    // create array of contributor names.
                    $res = '<figure class="mySlides">';
                    $res .= '<img src="' . $item . '">';
                    $res .= '<figcaption>';
                    /* here, parse the filename to create the caption, which is a list of student contributors
                        to the image. */
                    // remove file extension from filename string.
                    $item = str_replace(array(".jpg", ".jpeg"), "", $item);
                    // create an array of the student names and add them to $res
                    $fullNames = explode(",", $item);
                    if (count($fullNames) === 1) {
                        $res .= str_replace("_", " ", $fullNames[0]);
                    } else {
                        foreach ($fullNames as $name) {
                            $res .= str_replace("_", " ", $name) . ", ";
                        }
                        $res = substr($res, 0, -2); // remove the final ", "
                    }
                    $res .= '</figcaption></figure>';
                    echo $res;
                }
            }
        ?>
    </div>
    
    <!-- image nav created dynamically in codeArt.js -->
    <nav id="imageNav" class="w3-center w3-xxlarge w3-text-black"></nav>
</main>

<script src="../../js/codeArt.js">
</script>

</body>
</html>