let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 1;
let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
	{
		name: "少年",
		path: "music/song1.mp3",
		singer: "夢然 (Mira)"
	},
	{
		name: "热爱105C的你",
		path: "music/song2.mp3",
		singer: "阿肆"
	},
	{
		name: "执念",
		path: "music/song3.mp3",
		singer: "南征北战"
	},
	{
		name: "海草舞",
		path: "music/song4.mp3",
		singer: "蕭全"
	},
	{
		name: "孤獨為榮",
		path: "music/song5.mp3",
		singer: "伊晗"
	},
	{
		name: "還記得我嗎",
		path: "music/song6.mp3",
		singer: "劉增瞳"
	},
	{
		name: "想要對你說",
		path: "music/song7.mp3",
		singer: "彈唱小蓉"
	},
	{
		name: "任然",
		path: "music/song8.mp3",
		singer: "飛鳥和蟬"
	},
	{
		name: "你的答案",
		path: "music/song9.mp3",
		singer: "阿冗"
	},
	{
		name: "造亿万吨光芒",
		path: "music/song10.mp3",
		singer: "奔跑吧3"
	}
];

function load_track(index_no)
{
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	artist.innerHTML = All_song[index_no].singer;
	track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

volume_change();
load_track(index_no);

function mute_sound()
{
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}

function justplay()
{
	if(Playing_song==false)
	{
		playsong();
	}
	else
	{
		pausesong();
	}
}

function reset_slider()
{
	slider.value = 0;
}

function playsong()
{
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pausesong()
{
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function next_song()
{
	if(index_no < All_song.length - 1)
	{
		index_no += 1;
		load_track(index_no);
		playsong();
	}
	else
	{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}

function previous_song()
{
	if(index_no > 0)
	{
		index_no -= 1;
		load_track(index_no);
		playsong();

	}
	else
	{
		index_no = All_song.length - 1;
		load_track(index_no);
		playsong();
	}
}

function volume_change()
{
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

function change_duration()
{
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

function autoplay_switch()
{
	if (autoplay==1)
	{
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	}
	else
	{
		autoplay = 1;
		auto_play.style.background = "#FF8A65";
	}
}

function range_slider()
{
	let position = 0;

	if(!isNaN(track.duration))
	{
		position = track.currentTime * (100 / track.duration);
		slider.value =  position;
	}

	if(track.ended)
	{
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if(autoplay==1)
		{
			next_song();
		}
	}
}