

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');
	



	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

})(jQuery);
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const trackTitle = document.getElementById('track-title');
    const trackImage = document.getElementById('track-image');
    const trackDuration = document.getElementById('track-duration');
    const trackList = document.getElementById('track-list').getElementsByTagName('li');
    const progressBar = document.getElementById('progress');
    
    let audio = new Audio();
    let currentTrack = 0;
    
    function loadTrack(index) {
        audio.src = trackList[index].getAttribute('data-track');
        trackTitle.textContent = trackList[index].textContent;
        trackImage.src = trackList[index].getAttribute('data-image') || 'default.jpg';
        audio.load();
        audio.addEventListener('loadedmetadata', function() {
            trackDuration.textContent = formatTime(audio.duration);
        });
        audio.addEventListener('timeupdate', updateProgressBar);
    }
    
    function updateProgressBar() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    playButton.addEventListener('click', function() {
        audio.play();
    });
    
    pauseButton.addEventListener('click', function() {
        audio.pause();
    });
    
    prevButton.addEventListener('click', function() {
        currentTrack = (currentTrack > 0) ? currentTrack - 1 : trackList.length - 1;
        loadTrack(currentTrack);
        audio.play();
    });
    
    nextButton.addEventListener('click', function() {
        currentTrack = (currentTrack < trackList.length - 1) ? currentTrack + 1 : 0;
        loadTrack(currentTrack);
        audio.play();
    });
    
    for (let i = 0; i < trackList.length; i++) {
        trackList[i].addEventListener('click', function() {
            currentTrack = i;
            loadTrack(currentTrack);
            audio.play();
        });
    }
    
    // Load the first track by default
    loadTrack(currentTrack);
});
