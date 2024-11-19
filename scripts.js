const restartButton = document.getElementById("restartView");
restartButton.addEventListener("click", () => {
    resetView(); // 초기화 함수 호출
});


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 500);
const renderer = new THREE.WebGLRenderer({ antialias: true });



renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 조명 설정
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// 텍스처 로딩
const textureLoader = new THREE.TextureLoader();
const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
let globe;

textureLoader.load(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/4096px-Blue_Marble_2002.png',
    function(texture) {
        const globeMaterial = new THREE.MeshPhongMaterial({ map: texture });
        globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        const latitude1 = 37;
        const longitude1 = 233;
        addRedCircleOnGlobe(latitude1, longitude1, "dot1");

        const latitude2 = 36;
        const longitude2 = 221;
        addRedCircleOnGlobe(latitude2, longitude2, "dot2");

        const latitude3 = 22;
        const longitude3 = 246;
        addRedCircleOnGlobe(latitude3, longitude3, "dot3"); 

        const latitude4 = -6;
        const longitude4 = 253;
        addRedCircleOnGlobe(latitude4, longitude4, "dot4"); // Indonesia

        const latitude5 = 39;
        const longitude5 = 344;
        addRedCircleOnGlobe(latitude5, longitude5, "dot5"); // Italy

        const latitude6 = 51;
        const longitude6 = 360;
        addRedCircleOnGlobe(latitude6, longitude6, "dot6"); // Italy

        const latitude7 = 40;
        const longitude7 = 364;
        addRedCircleOnGlobe(latitude7, longitude7, "dot7"); // Italy

        const latitude8 = 36;
        const longitude8 = 77;
        addRedCircleOnGlobe(latitude8, longitude8, "dot8"); // United States

        const latitude9 = 21;
        const longitude9 = 78;
        addRedCircleOnGlobe(latitude9, longitude9, "dot9"); // 큐바

        const latitude10 = -23;
        const longitude10 = 43;
        addRedCircleOnGlobe(latitude10, longitude10, "dot10"); // Italy
    }
);
document.addEventListener("mousemove", (e) => {
    const cursor = document.getElementById("cursor");
    const cursorOutline = document.getElementById("cursor-outline");
    
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
});


camera.position.z = 15;

// 빨간 원을 지구본 표면에 고정시키는 함수
function addRedCircleOnGlobe(latitude, longitude, name) {
    const radius = 5;
    const lat = THREE.Math.degToRad(latitude);
    const lon = THREE.Math.degToRad(longitude);

    const x = radius * Math.cos(lat) * Math.cos(lon);
    const y = radius * Math.sin(lat);
    const z = radius * Math.cos(lat) * Math.sin(lon);

    const circleGeometry = new THREE.CircleGeometry(0.05, 16);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);

    circle.position.set(x, y, z);
    circle.lookAt(0, 0, 0);

    globe.add(circle);
    circle.userData = { isClickable: true, name: name };
}

function highlightDot(dotName) {
    // 모든 라벨 초기화
    document.querySelectorAll('.label').forEach(label => {
        label.classList.remove('active');
    });

    // 클릭된 라벨 강조
    const selectedLabel = document.getElementById(`label-${dotName}`);
    if (selectedLabel) {
        selectedLabel.classList.add('active'); // 활성화 스타일 추가
    }

    // 점 하이라이트 업데이트
    globe.children.forEach(child => {
        if (child.userData && child.userData.isClickable) {
            if (child.userData.name === dotName) {
                child.material.color.set(0x39ff14); // 네온 그린으로 변경
                child.material.needsUpdate = true; // 변경 사항 반영
            } else {
                child.material.color.set(0xff0000); // 기본 빨간색 복원
                child.material.needsUpdate = true; // 변경 사항 반영
            }
        }
    });
}


function onLabelClick(dotName) {
    highlightDot(dotName); // 라벨 강조 및 점 하이라이트
    moveToDot(dotName); // 카메라 이동
}


// 설명 업데이트 함수
function updateDescription(dotName) {
    const description = document.getElementById("description");

    if (dotName === "dot1") {
        description.innerHTML = "<strong>붉은 노을, 이문세, 1988</strong><br>붉은 노을은 1988년에 발매된 이문세의 곡으로, 팝 발라드 장르의 곡이다. 이 곡은 이영훈이 작사하고 작곡한 작품으로 사랑과 이별을 다룬 감성적인 가사와 경쾌한 멜로디로 많은 사람들에게 사랑을 받았다. 이후 빅뱅 등 다양한 가수들에 의해 리메이크되기도 했다. 붉은 노을의 가수가 누구냐에 대한 답변에 따라 세대를 알아볼 수 있다는 이야기가 있을 정도로, 한국 음악 역사에서 중요한 위치를 차지하는 곡이라고 할 수 있다.";
    } else if (dotName === "dot2") {
        description.innerHTML = "<strong>푸른 산호초, 마츠다 세이코, 1980</strong><br>푸른 산호초는 1980년에 발매된 마츠다 세이코의 곡으로, 사랑과 자연을 테마로 한 서정적인 노래이다. 바다와 산호초를 상징으로 청춘의 사랑과 그리움을 표현하며 일본에서 큰 인기를 끌었다. 이 곡은 마츠다 세이코의 대표적인 히트곡 중 하나로 여름 시즌과 관련된 곡으로 자주 회자된다.2024년 여름, 뉴진스의 하니가 이 곡을 커버하여 화재가 되기도 했다.";
    } else if (dotName === "dot3") {
        description.innerHTML = "<strong>月亮代表我的心, 鄧麗君, 1977</strong><br>등려군(鄧麗君)의 대표곡으로, 부드럽고 서정적인 멜로디와 사랑을 담은 시적인 가사로 중화권을 넘어 아시아 전역에서 사랑받은 명곡이다. 우리나라 가수들도 중화권 방문 시 이 곡을 부르는 모습을 종종 볼 수 있다. 이 곡의 명성은 홍콩 영화 〈첨밀밀(甜蜜蜜)〉(1996)을 통해서도 잘 드러난다. 단순한 배경음악이 아니라, 주인공들의 감정과 스토리를 연결하는 상징적인 역할을 한다. 영화의 주요 장면들에서 이 곡이 반복적으로 사용된다."
    } else if (dotName === "dot4") {
        description.innerHTML = "<strong>Bengawan Solo, Gesang, 1940</strong><br>솔로 강에 관한 이야기를 담은 곡이다. 솔로 강은 자바 섬에서 가장 긴 강으로, 인도네시아 사람들에게 상징적인 의미를 가진다. 이 노래는 특이한 백그라운드를 가졌는데, 2차 대전 당시 일본군에 점령되었을 때 선전 노래로 자주 방송되었다고 한다. 그 과정에서 아시아 전역으로 퍼져나가 인기를 끌었다. 영상은 구로사와 아키라 감독의 <노리이누>(1949)에 나온 일본어 버전인데, 긴박한 장면에 굳이 온화하고 밝은 곡을 틀어 대비하는 기법에 사용됐다고 한다.";
    } else if (dotName === "dot5") {
        description.innerHTML = "<strong>Volare (Nel blu, dipinto di blu), Domenico Modugno, 1958</strong><br>이태리어 제목은 Nel blu, dipinto di blu인데, 하늘을 날거나 꿈꾸는 듯한 자유로움을 뜻한다. 미국에서는 Volare라는 제목으로 발매되어 큰 인기를 끌었는데, 외국어로 된 곡 중 최초로 빌보드 핫 100에서 1위를 기록한 곡이다. 많은 가수들에 의해 커버되었으며, 집시 킹즈 버전이 유명하다.";
    } else if (dotName === "dot6") {
        description.innerHTML = "<strong>Hey Jude, The Beatles, 1968</strong><br> 폴 매카트니가 존 레논의 아들 줄리언을 위로하기 위해 작곡한 곡으로, 당시 줄리언의 부모 이혼으로 인한 혼란과 슬픔을 달래기 위한 메시지를 담고 있다. 원래 제목은 Hey Jules였으나 변경되었으며, 발매 당시 7분 11초라는 긴 러닝타임에도 불구하고 큰 성공을 거두었다. 해체로 이어지는 1969~1970년의 갈등이 본격화되기 전, 밴드의 화합과 창작력이 여전히 강렬했던 시기의 산물로 평가된다."    
    } else if (dotName === "dot7") {
        description.innerHTML = "<strong>Macarena, Los del Río, 1993</strong><br>Macarena는 스페인의 듀오 Los del Río가 발표한 곡으로, 전 세계적으로 폭발적인 인기를 끌었다. 독특한 리듬과 신나는 멜로디, 그리고 누구나 따라 할 수 있는 간단한 안무 덕분에 세계 곳곳에서 춤 열풍을 일으켰다. 1996년 8월 3일부터 11월 2일까지 미국 빌보드 핫 100 차트에서 14주 연속 1위를 기록하며 큰 인기를 끌었다. 결혼식, 파티, 스포츠 행사 등 다양한 자리에서 사랑받으며 문화적 현상이 되었다.";
    } else if (dotName === "dot8") {
        description.innerHTML = "<strong>Jailhouse Rock, Elvis Presley, 1957</strong><br>이 곡은 감옥에서 수감자들이 춤을 추며 즐기는 모습을 그린 내용으로, 미국 내에서 큰 인기를 끌었다. 발표 직후 빌보드 차트에서 1위를 기록하며 엘비스 프레슬리의 경력을 더욱 확립했다. Jailhouse Rock은 락앤롤 음악의 대표적인 예로, 당시 미국의 청소년들 사이에서 폭발적인 반응을 얻었다. 이 곡은 미국 내에서 클래식으로 남아 있으며 엘비스 프레슬리의 음악적 영향력을 강화하는 중요한 곡이 되었다.";
    } else if (dotName === "dot9") {
        description.innerHTML = "<strong>Guantanamera, José Fernández, 1929</strong><br>쿠바를 대표하는 상징적인 노래로, 그 멜로디와 가사에 쿠바의 정서와 자부심을 담고 있다. Guantanamera는 스페인어로 과나타나모의 여성을 뜻하는데, 과나타나모는 쿠바 동부에 위치한 도시로 고향을 상징하는 역할을 한다. 1960년대 미국의 포크 음악가 피트 시거가 이 노래를 소개하면서 국제적인 인기를 얻게 된다. 우리나라에셔도 유명한 곡이다.";
    } else if (dotName === "dot10") {
        description.innerHTML = "<strong>The Girl from Ipanema, Antônio Carlos Jobim & Vinícius de Moraes, 1962</strong><br>보사노바의 상징이라고 할 수 있는 곡이다. 1964년, Astrud Gilberto와 João Gilberto의 보컬, 그리고 Stan Getz의 색소폰 연주가 돋보이는 영어 버전이 발표되며, 미국 빌보드 핫 100 차트에서 5위에 올랐고, 그래미 올해의 레코드상을 수상했다. 보컬은 두 작곡가 중 주앙의 아내가 맡았는데, 훈련되지 않은 어리숙한 목소리가 곡과 잘 어울린다는 평을 받았다.";
    }
    
    description.style.display = "block"; // 설명을 표시
}

// 마우스 이벤트 설정
renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
renderer.domElement.addEventListener('click', onDocumentMouseClick, false);
const footerModal = document.getElementById('footerModal');
const copyright = document.getElementById('copyright');
let isMouseNearFooter = false;

// 마우스 이동 이벤트
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const offsetX = 15; // 커서와 모달 간 X축 거리
    const offsetY = -45; // 커서와 모달 간 Y축 거리
    // copyright의 위치 정보 가져오기
    const copyrightRect = copyright.getBoundingClientRect();

    // 마우스가 copyright 근처에 있는지 확인
    const isNear = (
        mouseX >= copyrightRect.left - 50 &&
        mouseX <= copyrightRect.right + 50 &&
        mouseY >= copyrightRect.top - 50 &&
        mouseY <= copyrightRect.bottom + 50
    );
    footerModal.style.left = `${mouseX + offsetX}px`;
    footerModal.style.top = `${mouseY + offsetY}px`;
    // 근처일 때 모달 표시
    if (isNear) {
        if (!isMouseNearFooter) {
            footerModal.style.display = 'block'; // 모달 표시
            isMouseNearFooter = true;
        }
    } else {
        if (isMouseNearFooter) {
            footerModal.style.display = 'none'; // 모달 숨기기
            isMouseNearFooter = false;
        }
    }
});

function onDocumentMouseMove(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // 마우스 아래의 객체 확인
    const intersects = raycaster.intersectObjects(scene.children, true);
    const isHoveringClickable = intersects.some(intersect => intersect.object.userData.isClickable);

    // 커서 스타일 변경
    const cursorOutline = document.getElementById("cursor-outline");
    cursorOutline.style.border = isHoveringClickable
        ? "2px solid rgba(255, 255, 255, 0.7)" // 빨간 점 위에서는 실선
        : "2px dashed rgba(255, 255, 255, 0.5)"; // 기본은 점선
}

function onDocumentMouseClick(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // 클릭된 객체 확인
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        // 클릭된 객체 중 첫 번째를 확인
        const clickedObject = intersects.find(intersect => intersect.object.userData.isClickable);

        if (clickedObject) {
            const dotName = clickedObject.object.userData.name;
            highlightDot(dotName); // 점 강조
            updateDescription(dotName); // 설명 업데이트

            // 동영상 재생 처리 (카메라 변동 없음)
            const videoData = {
                dot1: { platform: "youtube", id: "Dvh4w3I5d6o", start: 165, end: 200 },
                dot2: { platform: "youtube", id: "qn7_XMbbNH8", start: 10, end: 42 },
                dot3: { platform: "vimeo", id: "2919783", start: 10 },
                dot4: { platform: "youtube", id: "R6RDkftOhtc", start: 3, end: 60 },
                dot5: { platform: "youtube", id: "M5qQETERo70", start: 87, end: 111 },
                dot6: { platform: "vimeo", id: "278549299", start: 55 },
                dot7: { platform: "vimeo", id: "431810517", start: 37 },
                dot8: { platform: "youtube", id: "i1pAktvp4Lo", start: 120, end: 200 },
                dot9: { platform: "youtube", id: "Km-8dQA2bfA", start: 120, end: 200 },
                dot10: { platform: "youtube", id: "qX2hZGCMfFI", start: 11, end: 43 }
            };

            const video = videoData[dotName];
            if (video) {
                if (video.platform === "youtube") {
                    playYouTubeVideo(video.id, video.start, video.end);
                } else if (video.platform === "vimeo") {
                    playVimeoVideo(video.id, video.start);
                }
            }
        }
    } 
}

// 지구본 버튼과 모달 가져오기
const resetModal = document.getElementById('resetModal');

// 마우스가 지구본 버튼 위에 있을 때 모달 표시 및 따라다니기
restartButton.addEventListener('mouseenter', () => {
    resetModal.style.display = 'block';

    // 마우스 이동에 따라 모달 위치 업데이트
    document.addEventListener('mousemove', moveResetModal);
});

// 마우스가 지구본 버튼을 벗어날 때 모달 숨기기
restartButton.addEventListener('mouseleave', () => {
    resetModal.style.display = 'none';
    document.removeEventListener('mousemove', moveResetModal); // 이벤트 제거
});

// 모달을 커서 위치에 따라 이동시키는 함수
function moveResetModal(event) {
    const offsetX = -80; // 커서 왼쪽으로 120px
    const offsetY = -30;  // 커서 위쪽으로 30px

    resetModal.style.left = `${event.pageX + offsetX}px`;
    resetModal.style.top = `${event.pageY + offsetY}px`;
}

// 활성 라벨과 설명, 비디오 상태를 저장하는 변수
let activeDotName = null;
let activeVideoData = null; // 마지막 재생된 비디오 정보 저장

function resetView() {
    // 카메라 초기화 위치 및 방향 설정
    const targetPosition = initialCameraPosition.clone(); // 초기 위치로 복제
    const targetLookAt = initialCameraLookAt.clone();     // 초기 시점 복제

    // GSAP로 카메라 위치 애니메이션
    gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 2, // 애니메이션 지속 시간 (초 단위)
        ease: "power2.inOut", // 가속/감속 효과
        onUpdate: () => {
            camera.lookAt(targetLookAt); // 매 프레임마다 바라보는 방향 갱신
        },
    });

    // 설명 유지
    const description = document.getElementById("description");
    if (activeDotName) {
        updateDescription(activeDotName); // 마지막 클릭된 설명 유지
        description.style.display = "block"; // 설명 표시
    } else {
        description.style.display = "none"; // 설명 숨김
    }

    // 비디오 플레이어 유지
    const youtubePlayer = document.getElementById("youtubePlayer");
    if (activeVideoData) {
        if (activeVideoData.platform === "youtube") {
            playYouTubeVideo(activeVideoData.id, activeVideoData.start, activeVideoData.end);
        } else if (activeVideoData.platform === "vimeo") {
            playVimeoVideo(activeVideoData.id, activeVideoData.start);
        }
    } else {
        youtubePlayer.style.display = "none";
        youtubePlayer.innerHTML = ""; // iframe도 제거하여 초기화
    }

    // 라벨 상태 유지
    document.querySelectorAll('.label').forEach(label => {
        if (label.id === `label-${activeDotName}`) {
            label.classList.add('active'); // 활성 라벨 유지
        } else {
            label.classList.remove('active');
        }
    });

    // 점 색상 초기화 및 활성 점 강조
    if (globe) {
        globe.children.forEach(child => {
            if (child.userData && child.userData.isClickable) {
                if (child.userData.name === activeDotName) {
                    child.material.color.set(0x39ff14); // 활성 점 강조 (네온 그린)
                } else {
                    child.material.color.set(0xff0000); // 기본 빨간색 복원
                }
                child.material.needsUpdate = true; // 변경 사항 반영
            }
        });
    }
}

// 라벨 클릭 시 활성 라벨, 비디오 정보 저장
function onLabelClick(dotName) {
    activeDotName = dotName; // 클릭된 라벨 이름 저장

    // 비디오 데이터 저장 (사용하지 않으므로 유지만 함)
    const videoData = {
        dot1: { platform: "youtube", id: "Dvh4w3I5d6o", start: 165, end: 200 },
        dot2: { platform: "youtube", id: "qn7_XMbbNH8", start: 10, end: 42 },
        dot3: { platform: "vimeo", id: "2919783", start: 10 },
        dot4: { platform: "youtube", id: "R6RDkftOhtc", start: 3, end: 60 },
        dot5: { platform: "youtube", id: "M5qQETERo70", start: 87, end: 111 },
        dot6: { platform: "vimeo", id: "278549299", start: 55 },
        dot7: { platform: "vimeo", id: "431810517", start: 31 },
        dot8: { platform: "youtube", id: "i1pAktvp4Lo", start: 120, end: 200 },
        dot9: { platform: "youtube", id: "Km-8dQA2bfA", start: 120, end: 200 },
        dot10: { platform: "youtube", id: "qX2hZGCMfFI", start: 11, end: 43 },
    };

    activeVideoData = videoData[dotName]; // 클릭된 점의 비디오 정보 저장 (사용하지 않아도 유지 가능)

    // 라벨 강조 및 점 하이라이트
    highlightDot(dotName);

    // 카메라 이동
    moveToDot(dotName);
}



function playYouTubeVideo(videoId, start, end) {
    const youtubePlayer = document.getElementById("youtubePlayer");
    const player = document.createElement('iframe');
    player.width = "480";
    player.height = "300";
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&start=${start}&end=${end}`;
    player.frameBorder = "0";
    player.allow = "autoplay; encrypted-media";
    player.allowFullscreen = true;
    youtubePlayer.innerHTML = ''; // 이전 iframe 제거
    youtubePlayer.appendChild(player);
    youtubePlayer.style.display = "block";
}
function playVimeoVideo(videoId, start) {
    const youtubePlayer = document.getElementById("youtubePlayer");
    const player = document.createElement('iframe');
    player.width = "480"; // Vimeo 동영상 가로 크기
    player.height = "320"; // Vimeo 동영상 세로 크기
    player.src = `https://player.vimeo.com/video/${videoId}?autoplay=1#t=${start}s&loop=1&title=0&byline=0&portrait=0`;
    player.frameBorder = "0";
    player.allow = "autoplay; fullscreen; picture-in-picture";

    youtubePlayer.innerHTML = ''; // 기존 iframe 제거
    youtubePlayer.appendChild(player); // Vimeo iframe 추가
    youtubePlayer.style.display = "block"; // 플레이어 표시

    
}

function toggleLabels() {
    const labelContainer = document.getElementById("labelContainer");
    const labelToggle = document.getElementById("labelToggle");

    if (labelContainer.style.display === "none") {
        labelContainer.style.display = "block";
        labelToggle.innerHTML = "Locations";
    } else {
        labelContainer.style.display = "none";
        labelToggle.innerHTML = "Locations";
    }
}


// 마우스 컨트롤
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener('mousedown', function() { isDragging = true; }, false);
document.addEventListener('mousemove', function(event) {
    if (isDragging && globe) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        globe.rotation.y += deltaX * 0.005;
        globe.rotation.x += deltaY * 0.005;
    }
    previousMousePosition = { x: event.clientX, y: event.clientY };
}, false);
document.addEventListener('mouseup', function() { isDragging = false; }, false);

document.addEventListener('wheel', function(event) {
    const zoomSpeed = 0.05;
    const minZoom = 8;
    const maxZoom = 25;

    camera.position.z += event.deltaY * zoomSpeed;
    camera.position.z = Math.max(minZoom, Math.min(camera.position.z, maxZoom));
}, false);
let zoomInterval; // 줌 동작을 반복하기 위한 interval 변수
let isZooming = false; // 줌 상태를 확인하는 플래그

// 카메라 줌 함수
function zoomCamera(direction) {
    const zoomSpeed = 0.1; // 줌 속도
    const minZoom = 8;     // 최소 줌
    const maxZoom = 25;    // 최대 줌

    camera.position.z += direction * zoomSpeed;
    camera.position.z = Math.max(minZoom, Math.min(camera.position.z, maxZoom));
}

// 줌 버튼 이벤트 추가
function startZooming(direction) {
    if (isZooming) return; // 이미 줌 동작 중이면 중복 실행 방지
    isZooming = true;

    zoomInterval = setInterval(() => {
        zoomCamera(direction);
    }, 50); // 50ms 간격으로 줌 동작
}

function stopZooming() {
    clearInterval(zoomInterval); // 줌 동작 중지
    isZooming = false;
}

// + 버튼과 - 버튼에 이벤트 연결
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");

// + 버튼: 줌 인
zoomInButton.addEventListener("mousedown", () => startZooming(-1));
zoomInButton.addEventListener("mouseup", stopZooming);
zoomInButton.addEventListener("mouseleave", stopZooming); // 버튼 밖으로 나갔을 때도 멈춤

// - 버튼: 줌 아웃
zoomOutButton.addEventListener("mousedown", () => startZooming(1));
zoomOutButton.addEventListener("mouseup", stopZooming);
zoomOutButton.addEventListener("mouseleave", stopZooming); // 버튼 밖으로 나갔을 때도 멈춤

function animate() {
    requestAnimationFrame(animate);
    if (globe && !isDragging) {
        globe.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
}
animate();

let lastScrollY = 0;

const newElement = document.createElement('div');
newElement.textContent = 'New Element';
document.body.appendChild(newElement);

window.addEventListener('scroll', () => {
    // 스크롤 이벤트 내에서 DOM 조작 제거
    newElement.style.opacity = Math.min(1, window.scrollY / 500);
});


// 모달 관련 요소 가져오기
const playerButton = document.getElementById('playerButton');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
// 제목 클릭 시 리프레시 기능 추가
document.getElementById('playerButton').addEventListener('click', () => {
    window.location.reload();
});

// 플래그 변수
let isMouseOverButton = false; // 버튼 위에 마우스가 있는지 여부
let isModalFixed = false; // 모달이 클릭으로 고정되었는지 여부

// 오버레이 클릭 시 모달 닫기
modalOverlay.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    isModalFixed = false; // 고정 해제
});

// 커서 근처로 모달 이동
document.addEventListener('mousemove', (event) => {
    if (isMouseOverButton && !isModalFixed) {
        const modalOffset = 15; // 커서와 모달 간 거리
        const windowWidth = window.innerWidth;

        // 기본적으로 커서 왼쪽에 모달을 배치
        let modalLeft = event.pageX - modal.offsetWidth - modalOffset;
        let modalTop = event.pageY + modalOffset;

        // 모달 위치 설정
        modal.style.left = `${modalLeft}px`;
        modal.style.top = `${modalTop}px`;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const copyrightRect = copyright.getBoundingClientRect();
    }
});

// 버튼 위에 마우스를 올렸을 때
playerButton.addEventListener('mouseenter', () => {
    if (!isModalFixed) {
        modal.style.display = 'block';
    }
    isMouseOverButton = true;
    
});

// 버튼 밖으로 마우스를 벗어났을 때
playerButton.addEventListener('mouseleave', () => {
    if (!isModalFixed) {
        modal.style.display = 'none';
    }
    isMouseOverButton = false;
});
function zoomCamera(direction) {
    const zoomSpeed = 1; // 줌 속도
    const minZoom = 8; // 최소 줌
    const maxZoom = 25; // 최대 줌

    camera.position.z += direction * zoomSpeed;
    camera.position.z = Math.max(minZoom, Math.min(camera.position.z, maxZoom));
}
function moveToDot(dotName) {
    const dotMapping = {
        dot1: { latitude: 37, longitude: 233 },
        dot2: { latitude: 36, longitude: 221 },
        dot3: { latitude: 22, longitude: 246 },
        dot4: { latitude: -6, longitude: 253 },
        dot5: { latitude: 39, longitude: 344 },
        dot6: { latitude: 51, longitude: 360 },
        dot7: { latitude: 40, longitude: 364 },
        dot8: { latitude: 36, longitude: 77 },
        dot9: { latitude: 21, longitude: 78 },
        dot10: { latitude: -23, longitude: 43 }
    };

    const dot = dotMapping[dotName];
    if (!dot) return;

    const radius = 5; // 지구본 반지름
    const lat = THREE.Math.degToRad(dot.latitude);
    const lon = THREE.Math.degToRad(dot.longitude);

    // 점의 초기 좌표 계산 (위도/경도 → 3D 좌표)
    const initialPosition = new THREE.Vector3(
        radius * Math.cos(lat) * Math.cos(lon),
        radius * Math.sin(lat),
        radius * Math.cos(lat) * Math.sin(lon)
    );

    // 지구본의 현재 회전을 반영
    const globeRotation = globe.rotation; // 지구본의 현재 회전 값
    const rotatedPosition = initialPosition.clone();
    rotatedPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), globeRotation.y); // Y축 회전
    rotatedPosition.applyAxisAngle(new THREE.Vector3(1, 0, 0), globeRotation.x); // X축 회전

    // 카메라 확대 거리 (라벨 클릭 시 더 확대)
    const zoomFactor = 1.5; // 확대 비율 (값이 작을수록 더 가까움)
    const cameraDistance = 5 * zoomFactor; // 점에서 카메라까지의 거리
    const cameraTargetPosition = rotatedPosition.clone().multiplyScalar(cameraDistance / radius);

    // 목표 바라보는 지점
    const lookAtOffset = 0.5; // 아래로 이동할 y축 거리
    const lookAtTarget = rotatedPosition.clone();
    lookAtTarget.y -= lookAtOffset;

    // GSAP 애니메이션으로 카메라 이동 및 확대
    gsap.to(camera.position, {
        x: cameraTargetPosition.x,
        y: cameraTargetPosition.y,
        z: cameraTargetPosition.z,
        duration: 3, // 애니메이션 지속 시간
        ease: "power1.inOut", // 부드러운 이동 효과
        onUpdate: () => {
            camera.lookAt(lookAtTarget); // 애니메이션 중에도 목표를 바라보도록 설정
        }
    });
}

// 카메라 초기 위치 저장
const initialCameraPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
const initialCameraLookAt = new THREE.Vector3(0, 0, 0); // 처음 카메라가 바라보는 지점