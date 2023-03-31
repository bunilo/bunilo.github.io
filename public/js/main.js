function openContainer($selected) {

    var current = $('#'+$selected);
    var thumbnail = $('.thumb');

    var all_descriptions = $('.description');
    var all_titles = $('.thumb-title');

    var current_description = $('#'+$selected+'>.thumb-title>.description');
    var current_title = $('#'+$selected+'>.thumb-title');

    if(current.hasClass('open') === true){
        thumbnail.removeClass('open');
        thumbnail.removeClass('smoll');

        all_descriptions.addClass('d-none');
        all_titles.removeClass('twist');
    } else {
        all_descriptions.addClass('d-none');

        thumbnail.addClass('smoll');
        thumbnail.removeClass('open');
        current.removeClass('smoll');
        current.toggleClass('open');

        all_titles.removeClass('twist');
        current_description.removeClass('d-none');
        current_title.addClass('twist');
    }

}

function splitImages(file_names) {
    var threes;
    var threes2;
    var files_threes = file_names.split(",");
    const amount1 = files_threes.length/3;
    const rest1 = files_threes.length%3;
    if (rest1 !== 0) {
        if (rest1 === 1) {
            threes = files_threes.splice(0, amount1 + 1);
            threes2 = files_threes.splice(0, amount1);
        }
        else if (rest1 === 2) {
            threes = files_threes.splice(0, amount1 + 1);
            threes2 = files_threes.splice(0, amount1 + 1);
        }
    } else {
        threes = files_threes.splice(0, amount1);
        threes2 = files_threes.splice(0, amount1);
    }
    var threes3 = files_threes.splice(0, amount1);


    var fours;
    var fours2;
    var fours3;
    var files_fours = file_names.split(",");
    const amount = files_fours.length/4;
    const rest = files_fours.length%4;
    if (rest !== 0) {
        if (rest === 1) {
            fours = files_fours.splice(0, amount + 1);
            fours2 = files_fours.splice(0, amount);
            fours3 = files_fours.splice(0, amount);
        }
        else if (rest === 2) {
            fours = files_fours.splice(0, amount + 1);
            fours2 = files_fours.splice(0, amount + 1);
            fours3 = files_fours.splice(0, amount);
        }
        else if (rest === 3) {
            fours = files_fours.splice(0, amount + 1);
            fours2 = files_fours.splice(0, amount + 1);
            fours3 = files_fours.splice(0, amount + 1);
        }
    } else {
        fours = files_fours.splice(0, amount);
        fours2 = files_fours.splice(0, amount);
        fours3 = files_fours.splice(0, amount);
    }
    var fours4 = files_fours.splice(0, amount);

    if ($(window).width() < 960) {
        document.getElementById("images").innerHTML = '<div id="col1" class="col">\n' +
            '                </div>\n' +
            '                <div id="col2" class="col">\n' +
            '                </div>\n' +
            '                <div id="col3" class="col">\n' +
            '                </div>';
        for(var a = 0; a < threes.length; a++) {
            document.getElementById("col1").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + threes[a] + '" alt=""/>';
        }
        for(var b = 0; b < threes2.length; b++) {
            document.getElementById("col2").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + threes2[b] + '" alt=""/>';
        }
        for(var c = 0; c < threes3.length; c++) {
            document.getElementById("col3").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + threes3[c] + '" alt=""/>';
        }
    } else {
        document.getElementById("images").innerHTML = '<div id="col1" class="col">\n' +
            '                </div>\n' +
            '                <div id="col2" class="col">\n' +
            '                </div>\n' +
            '                <div id="col3" class="col">\n' +
            '                </div>\n' +
            '                <div id="col4" class="col">\n' +
            '                </div>';
        for(var a = 0; a < fours.length; a++) {
            document.getElementById("col1").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours[a] + '" alt=""/>';
        }
        for(var b = 0; b < fours2.length; b++) {
            document.getElementById("col2").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours2[b] + '" alt=""/>';

        }
        for(var c = 0; c < fours3.length; c++) {
            document.getElementById("col3").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours3[c] + '" alt=""/>';

        }
        for(var d = 0; d < fours4.length; d++) {
            document.getElementById("col4").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours4[d] + '" alt=""/>';

        }
    }
}

function readfile($file){
    var client = new XMLHttpRequest();
    client.open('GET', $file);
    client.onload = function() {
        var full_text = client.responseText;
        if ($file === 'public/text/abouts.txt') {
            var pro_sect = "Programming:";
            var art_sect = "Art:";
            var tra_sect = "Travel:";

            var pro_start = full_text.search(pro_sect);
            var pro_end = (full_text.search("_____") - pro_sect.length);
            full_text = full_text.replace(pro_sect, '');
            full_text = full_text.replace("_____", '');
            document.getElementById("des-prog").innerHTML = full_text.substring(pro_start, pro_end);

            var art_start = full_text.indexOf(art_sect);
            var art_end = (full_text.search("_____") - art_sect.length);
            full_text = full_text.replace(art_sect, '');
            full_text = full_text.replace("_____", '');
            document.getElementById("des-art").innerHTML = full_text.substring(art_start, art_end);

            var tra_start = full_text.indexOf(tra_sect);
            var tra_end = (full_text.search("_____") - tra_sect.length);
            full_text = full_text.replace(tra_sect, '');
            full_text = full_text.replace("_____", '');
            document.getElementById("des-ex").innerHTML = full_text.substring(tra_start, tra_end);
        }
        else if ($file === 'public/text/prog.txt'){
            const projects = [];
            var items = full_text.split("_____");
            for (var i = 0; i < items.length; i++) {
                items[i] = items[i].split(';');
                projects.push(
                    {
                        title: items[i][0].trim(),
                        img: items[i][1].trim().split(', '),
                        tags: items[i][2].trim().split(', '),
                        date: new Date(items[i][3].trim()),
                        short: items[i][4].replace(/^\s+|\s+$/g, ''),
                        text: items[i][5].replace(/^\s+|\s+$/g, '')
                    }
                );
            }
            projects.sort(function (projects, curr) {
                return new Date(curr.date) - new Date(projects.date)
            });

            if (window.location.href.indexOf("?id=") > -1) {
                id = window.location.href.substring(window.location.href.indexOf('?id=') + 4, window.location.href.length);

                document.getElementById("info").innerHTML = '<a class="link-secondary" href="/programming.html" style="margin-top: 50px; padding-left: 30px; z-index: 100;">< Back</a><small style="margin-top: -20px; padding-right: 30px" class="text-muted">Tags: ' + projects[id].tags.join(', ') + '</small>' +
                    '<p class="text-center h1">' + projects[id].title + '</p>';

                document.getElementById("projects").innerHTML = '\n' +
                    '        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">' +
                    '           <div class="carousel-indicators">\n' +
                    '               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>\n' +
                    '           </div>\n' +
                    '            <div class="carousel-inner">\n' +
                    '                <div class="carousel-item active">\n' +
                    '                    <img src="public/' + projects[id].img[0] + '" class="d-block w-100" alt="...">\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style="margin-left: 85%">\n' +
                    '                <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
                    '                <span class="visually-hidden">Previous</span>\n' +
                    '            </button>\n' +
                    '            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">\n' +
                    '                <span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
                    '                <span class="visually-hidden">Next</span>\n' +
                    '            </button>\n' +
                    '        </div>';
                for (c = 1; c < projects[id].img.length; c++) {
                    document.getElementsByClassName("carousel-indicators")[0].innerHTML += '<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="' + c + '" aria-label="Slide ' + c + '"></button>\n';
                    document.getElementsByClassName("carousel-inner")[0].innerHTML += '' +
                        '<div class="carousel-item">\n' +
                        '   <img src="public/' + projects[id].img[c] + '" class="d-block w-100" alt="...">\n' +
                        '</div>\n'
                }
                document.getElementById("projects").innerHTML += '<br/><p>' + projects[id].text + '</p>';
            }
            else {
                document.getElementById("projects").innerHTML = '<h2 class="border-bottom border-warning pt-5 pb-2 mb-0">Projects:</h2>'
                for (a = 0; a < projects.length; a++) {
                    document.getElementById("projects").innerHTML += '' +
                        '<a class="text-decoration-none" href="?id=' + a + '"> ' +
                        '<div class="text-muted pt-3" id=" ' + a + '">\n' +
                        '                    <div class="row media-body pb-3 mb-0 small lh-125 border-bottom border-gray">\n' +
                        '                        <div class="col-3">\n' +
                        '                            <img alt="thumbnail" class="rounded img-thumbnail" src="public/' + projects[a].img[0] + '"/>\n' +
                        '                        </div>\n' +
                        '                        <div class="col-9 summary">\n' +
                        '                            <p>\n' +
                        '                                <h3 class="d-block text-gray-dark">' + projects[a].title + '</h3>\n' +
                        '                                ' + projects[a].short + '\n' +
                        '                                <br/>' +
                        '                                <small class="text-muted">Tags: ' + projects[a].tags.join(', ') + '</small>' +
                        '                            </p>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div>' +
                        '</a>'
                }
            }
        }
        else if ($file === 'public/text/trav.txt') {
            const experiences = [];
            var Item = full_text.split("_____");
            for (var j = 0; j < Item.length; j++) {
                Item[j] = Item[j].split(';');
                experiences.push(
                    {
                        title: Item[j][0].trim(),
                        img: Item[j][1].trim().split(', '),
                        date: new Date(Item[j][2].trim()),
                        short: Item[j][3].replace(/^\s+|\s+$/g, ''),
                        text: Item[j][4].replace(/^\s+|\s+$/g, '')
                    }
                );
            }
            experiences.sort(function (experiences, curr) {
                return new Date(curr.date) - new Date(experiences.date)
            });

            if (window.location.href.indexOf("?id=") > -1) {
                id = window.location.href.substring(window.location.href.indexOf('?id=') + 4, window.location.href.length);

                document.getElementById("info").innerHTML = '<a class="link-secondary" href="/travel.html" style="margin-top: 50px; padding-left: 30px; z-index: 100;">< Back</a>' +
                    '<p class="text-center h1">' + experiences[id].title + '</p>';

                document.getElementById("exp").innerHTML = '\n' +
                    '        <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="true">' +
                    '           <div class="carousel-indicators">\n' +
                    '               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>\n' +
                    '           </div>\n' +
                    '            <div class="carousel-inner">\n' +
                    '                <div class="carousel-item travel-image active">\n' +
                    '                    <img src="public/' + experiences[id].img[0] + '" class="d-block w-100" alt="...">\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style="margin-left: 85%">\n' +
                    '                <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
                    '                <span class="visually-hidden">Previous</span>\n' +
                    '            </button>\n' +
                    '            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">\n' +
                    '                <span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
                    '                <span class="visually-hidden">Next</span>\n' +
                    '            </button>\n' +
                    '        </div>';
                for (c = 1; c < experiences[id].img.length; c++) {
                    document.getElementsByClassName("carousel-indicators")[0].innerHTML += '<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="' + c + '" aria-label="Slide ' + c + '"></button>\n';
                    document.getElementsByClassName("carousel-inner")[0].innerHTML += '' +
                        '<div class="carousel-item travel-image">\n' +
                        '   <img src="public/' + experiences[id].img[c] + '" class="d-block w-100" alt="...">\n' +
                        '</div>\n'
                }
                document.getElementById("exp").innerHTML += '<br/><p>' + experiences[id].text + '</p>';
            }
            else {
                document.getElementById("exp").innerHTML = '<h2 class="border-bottom border-warning pt-5 pb-2 mb-0">Experiences:</h2>'
                for (a = 0; a < experiences.length; a++) {
                    document.getElementById("exp").innerHTML += '' +
                        '<a class="text-decoration-none" href="?id=' + a + '"> ' +
                        '   <div class="text-muted pt-3" id=" ' + a + '">\n' +
                        '       <div class="row media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin: auto">\n' +
                        '           <div class="card" style="width: 80%; object-position: center; margin: auto; text-align: center; border-bottom: 1px solid yellow">\n' +
                        '               <img src="public/' + experiences[a].img[0] + '"style="height: 50vh; object-fit: contain" class="card-img-top" alt="...">\n' +
                        '               <div class="card-body summary">\n' +
                        '                   <h3 class="d-block text-gray-dark">' + experiences[a].title + '</h3>' +
                        '                   <p class="card-text">' + experiences[a].short + '</p>\n' +
                        '               </div>\n' +
                        '           </div>' +
                        '       </div>\n' +
                        '   </div>' +
                        '</a>'
                }
            }
        }
        else if($file === 'public/text/art.txt'){
            var threes;
            var threes2;
            var files_threes = full_text.split("\r\n");
            console.log(files_threes);
            const amount1 = files_threes.length/3;
            const rest1 = files_threes.length%3;
            if (rest1 !== 0) {
                if (rest1 === 1) {
                    threes = files_threes.splice(0, amount1 + 1);
                    threes2 = files_threes.splice(0, amount1);
                }
                else if (rest1 === 2) {
                    threes = files_threes.splice(0, amount1 + 1);
                    threes2 = files_threes.splice(0, amount1 + 1);
                }
            } else {
                threes = files_threes.splice(0, amount1);
                threes2 = files_threes.splice(0, amount1);
            }
            var threes3 = files_threes.splice(0, amount1);


            var fours;
            var fours2;
            var fours3;
            var files_fours = full_text.split("\r\n");
            console.log(files_fours);
            const amount = files_fours.length/4;
            const rest = files_fours.length%4;
            if (rest !== 0) {
                if (rest === 1) {
                    fours = files_fours.splice(0, amount + 1);
                    fours2 = files_fours.splice(0, amount);
                    fours3 = files_fours.splice(0, amount);
                }
                else if (rest === 2) {
                    fours = files_fours.splice(0, amount + 1);
                    fours2 = files_fours.splice(0, amount + 1);
                    fours3 = files_fours.splice(0, amount);
                }
                else if (rest === 3) {
                    fours = files_fours.splice(0, amount + 1);
                    fours2 = files_fours.splice(0, amount + 1);
                    fours3 = files_fours.splice(0, amount + 1);
                }
            } else {
                fours = files_fours.splice(0, amount);
                fours2 = files_fours.splice(0, amount);
                fours3 = files_fours.splice(0, amount);
            }
            var fours4 = files_fours.splice(0, amount);

            if ($(window).width() < 960) {
                document.getElementById("images").innerHTML = '<div id="col1" class="col">\n' +
                    '                </div>\n' +
                    '                <div id="col2" class="col">\n' +
                    '                </div>\n' +
                    '                <div id="col3" class="col">\n' +
                    '                </div>';
                for(var a = 0; a < threes.length; a++) {
                    document.getElementById("col1").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + threes[a] + '" alt=""/>';
                }
                for(var b = 0; b < threes2.length; b++) {
                    document.getElementById("col2").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + threes2[b] + '" alt=""/>';
                }
                for(var c = 0; c < threes3.length; c++) {
                    document.getElementById("col3").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + threes3[c] + '" alt=""/>';
                }
            } else {
                document.getElementById("images").innerHTML = '<div id="col1" class="col">\n' +
                    '                </div>\n' +
                    '                <div id="col2" class="col">\n' +
                    '                </div>\n' +
                    '                <div id="col3" class="col">\n' +
                    '                </div>\n' +
                    '                <div id="col4" class="col">\n' +
                    '                </div>';
                for(var a = 0; a < fours.length; a++) {
                    document.getElementById("col1").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours[a] + '" alt=""/>';
                }
                for(var b = 0; b < fours2.length; b++) {
                    document.getElementById("col2").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours2[b] + '" alt=""/>';

                }
                for(var c = 0; c < fours3.length; c++) {
                    document.getElementById("col3").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours3[c] + '" alt=""/>';

                }
                for(var d = 0; d < fours4.length; d++) {
                    document.getElementById("col4").innerHTML += '<img class="img-thumbnail" src="/public/img/art/' + fours4[d] + '" alt=""/>';

                }
            }
        }
    }
    client.send();
}