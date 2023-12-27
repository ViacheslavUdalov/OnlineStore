import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare const ymaps: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
images = [
  {
    imageSrc: 'assets/images/2f85721729c5297d23d5a17254415923.jpg',
    imageALT: "hero 1"
  },
  {
    imageSrc: 'assets/images/aya.jpg',
    imageALT: "hero 2"
  },
  {
    imageSrc: 'assets/images/bruschatka-ot-proizvoditelja.jpg',
    imageALT: "hero 3"
  },
  {
    imageSrc: 'assets/images/bruschatki_1000x450_3d8.jpg',
    imageALT: "hero 3"
  },
  {
    imageSrc: 'assets/images/d90e8a60b496d560aa86e1d72f6f4f9c.jpg',
    imageALT: "hero 3"
  },
  {
    imageSrc: 'assets/images/images.jpg',
    imageALT: "hero 3"
  },
  {
    imageSrc: 'assets/images/trotuar2.jpg',
    imageALT: "hero 3"
  }
]
baseUrl = 'https://api-maps.yandex.ru/2.1?apikey=9d465e84-eb24-4f7f-b1ba-1087a30e3a3f&lang=ru_RU'
  map: any;
  latitude = 55.76;
  longitude = 37.64;
  @ViewChild('map')
  el!: ElementRef;
  ngOnInit(): void {
    ymaps.ready().done(() => this.createMap());
  }
private createMap() {
  this.map = new ymaps.Map('map', {
    center: [this.latitude, this.longitude],
    zoom: 11
  },
    {
      searchControlProvider: 'yandex#search'
    });
  this.map.geoObjects
    .add(new ymaps.Placemark([55.684758, 37.738521], {
      balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
    }, {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    }))
    .add(new ymaps.Placemark([55.833436, 37.715175],
      {
        balloonContentLayout: ymaps.templateLayoutFactory.createClass(
          '<div>Адрес: {{properties.address}}</div>' +
          '<div>Координаты: {{geometry.coordinates}}</div>'
        ),
        address: 'пляж бонди',
        geometry: {
          coordinates: [55.684758, 37.738521]
        }
    },
      {
      preset: 'islands#dotIcon',
      iconColor: '#735184'
    }))
    .add(new ymaps.Placemark([55.642063, 37.656123], {
      balloonContent: 'цвет <strong>красный</strong>'
    }, {
      preset: 'islands#redSportIcon'
    }))
    .add(new ymaps.Placemark([55.694843, 37.435023], {
      balloonContent: 'цвет <strong>носика Гены</strong>'
    }, {
      preset: 'islands#redSportIcon'
    }));
  this.map.events.add('click', (e: any) => {
    const coords = e.get('coords');
    ymaps.geocode(coords).then((res: any) => {
      const firstGeoObject = res.geoObjects.get(0);
      const address = firstGeoObject.getAddressLine();
      e.get('target').properties.set({
        balloonContent: address
      });
    });
  });
}
}
