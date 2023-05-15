<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Images::factory()->create([
            'url' => 'https://www.lanacion.com.ar/resizer/-6kqv-4YPyf1W8KWKzy6FsBF6GY=/1920x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KYHOMDCWHJEV5ASP6EBLAH23QE.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://static.misionesonline.news/wp-content/uploads/2015/05/feriavlechuza1.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://1.bp.blogspot.com/-IIdnC-t_aLw/Xuq12qD6uoI/AAAAAAAAsJ8/TvC431aYVTAUXaYURV8VnROnsvuy7sVkgCPcBGAsYHg/s1600/SMA_9753blog.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://www.chetoba.com.ar/wp-content/uploads/2017/08/jacana-adulta.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://cdn.pixabay.com/photo/2022/09/05/05/16/woodpecker-7433307_1280.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://www.avesargentinas.org.ar/sites/default/files/1014%20Amblyramphus%20holosericeus%20-%20Federal%20IBER20180609e%20Juan%20Jos%C3%A9%20Bonanno.jpg',
            'memo_test_id' => 1,
        ]);

        \App\Models\Images::factory()->create([
            'url' => 'https://www.lanacion.com.ar/resizer/gnr_ih6RYs9aGrldN5uupCD2mSc=/1920x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/SKCBH5GWBRCQLAGQVOHZ3A54CQ.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://www.estanciaibera.com/images/experience-bird-sighting.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://i.pinimg.com/originals/71/ca/62/71ca623154503a51822973516bb3bb7e.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://www.trekkingchile.com/de/wp-content/uploads/sites/2/2018/05/IMG_4426.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://radiociudadoran.com.ar/wp-content/uploads/2020/10/pajaro.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://bucket.somosohlala.com.ar/s3fs-public/styles/img_internal/public/2022-11/esteros-ibera-pajaros.jpg.webp?itok=CJHdFyjL',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://www.ecoregistros.org/site/images/dataimages/2023/04/04/530491/CORRTES-IBERA-10-09-2014-Mosqueta-Ojos-Dorada-02.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://www.rewildingargentina.org/wp-content/uploads/2021/02/Muitu-Pichones-de-Bahia-y-Foz-Mat%C3%ADasRebak-00006.jpg',
            'memo_test_id' => 1,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/99812551/',
            'memo_test_id' => 1,
        ]);

        \App\Models\Images::factory()->create([
            'url' => 'https://www.puertoiguazu.net/imgs/paseos/Paseo_976055285.jpg',
            'memo_test_id' => 2,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://i.pinimg.com/originals/4f/b2/38/4fb238a0e649660b7255390f52f0d0df.jpg',
            'memo_test_id' => 2,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://images.myguide-cdn.com/argentina/companies/puerto-iguazu-iguaza-falls-brazilian-side-bird-park-tour/large/puerto-iguazu-iguaza-falls-brazilian-side-bird-park-tour-1151272.jpg',
            'memo_test_id' => 2,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://www.welcomeargentina.com/paseos/surucua-reserva-ecolodge/surucua-reserva-ecolodge-3.jpg',
            'memo_test_id' => 2,
        ]);
        \App\Models\Images::factory()->create([
            'url' => 'https://static.misionesonline.news/wp-content/uploads/2021/09/pajaro-carpintero-en-extension-1.jpg',
            'memo_test_id' => 2,
        ]);

    }
}
