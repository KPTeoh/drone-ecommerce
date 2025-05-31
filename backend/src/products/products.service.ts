import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: '1',
            name: 'DJI Focus Pro Motor',
            description: 'The motor speed has increased by 30% for more responsive control over focus, zoom, and aperture.The motor is compatible with 15mm universal rods.The latency is as low as 10 milliseconds, ensuring swift control response when paired with the DJI Focus Pro Hand Unit.The motor features a built-in RF antenna that allows for linking with the DJI Focus Pro Hand Unit.When paired with the DJI Focus Pro Grip, the grip can power the motor via the USB - C port.',
            price: 599.00,
            category: 'Motors',
            imageUrl: 'https://asset1.djicdn.com/assets/e310/features/s1bg-47462922c403cd23ef7017647be4d496.jpg',
            specifications: {
                kV: 960,
                weight: '123g',
                maxThrust: '1200g',
                maxPower: '350W',
            },
            stock: 3,
        },
        {
            id: '2',
            name: 'Drone Quadcopter A2212 Brushless DC Motor',
            description: 'This is a brushless outrunner motor specifically made for quadcopters and multirotors. It is a 1000kV motor. It provides high performance, super power and brilliant efficiency. These motors are perfect for medium size quadcopters with 8 inch to 10 inch propellers. Use this to build powerful and efficient quadcopters. The comes complete with mounting bolts, prop adapters and power leads.It can be used with our F450 quadcopter frame. Our 30A ESCs can be used to drive the motor.',
            price: 699.99,
            category: 'Motors',
            imageUrl: 'https://rcdrone.top/cdn/shop/products/H99d9e34818c64519854211527675f14ei.jpg?v=1684078526',
            specifications: {
                kV: 1000,
                weight: '156g',
                maxThrust: '1400g',
                maxPower: '350W',
            },
            stock: 8,
        },
        {
            id: '3',
            name: 'DJI Matrice 350 RTK 2110S Propellers (Pairs)',
            description: 'The DJI Matrice 350 Propellers (2110s) feature higher reliability and stricter in-process quality control, ensuring better performance and safer flight. Upgraded from the 2110 propellers, the 2110s propellers feature higher reliability and stricter in-process quality control, ensuring better performance and safer flight.',
            price: 29.99,
            category: 'Propellers',
            imageUrl: 'https://cdn.store-assets.com/s/603108/i/36831672.jpg',
            specifications: {
                diameter: '10 inch',
                pitch: '4.5 inch',
                material: 'Carbon Fiber',
                weight: '12g',
            },
            stock: 10,
        },
        {
            id: '4',
            name: 'CDJI Matrice 350 RTK 2112 High-Altitude Low-Noise Propellers (Pair)',
            description: 'The DJI Matrice 350 Propellers (2112) high-altitude low-noise propellers guarantee flight performance at high altitudes of 3,000-7,000 m, the noise of the blades is reduced by 2 decibels compared with the standard 2110s propellers.',
            price: 31.99,
            category: 'Propellers',
            imageUrl: 'https://cdn.store-assets.com/s/603108/i/77264058.png',
            specifications: {
                diameter: '10 inch',
                pitch: '4.5 inch',
                material: 'Carbon Fiber',
                weight: '12g',
            },
            stock: 15,
        },
        {
            id: '5',
            name: 'DJI Matrice 200 Series V2 Part 02 Cendence S Remote Controlle',
            description: 'The two knobs on the front panel control gimbal pitch and yaw, and the right/left levers and Focus Adjustment Knob are used to tune flight controller settings and the gimbal camera in real-time, allowing you to pull focus and set aperture.',
            price: 999.99,
            category: 'Flight Controller',
            imageUrl: 'https://asset1.djicdn.com/uploads/brand_site_product/cover/13/small_B%402x.png',
            specifications: {
                height: '19 cm',
                length: '17 cm',
                width: '15 cm',
                weight: '2kg',
            },
            stock: 3,
        },
        {
            id: '6',
            name: 'DJI Inspire 2 Part 04 Remote Controller',
            description: 'New wireless HD image transmission technology sends video information from the master controller to the slave controller and the two controllers can be up to 100m apart without loss of image quality.',
            price: 799.99,
            category: 'Flight Controller',
            imageUrl: 'https://www-cdn.djiits.com/assets/images/products/n3/s1/product-4b0da389674c0be352052eff2dc4735b.png',
            specifications: {
                height: '25 cm',
                length: '22 cm',
                width: '16 cm',
                weight: '2.3kg',
            },
            stock: 20,
        },
        {
            id: '7',
            name: 'DJI Matrice 100 Part 32 TB47D Battery',
            description: 'his intelligent flight battery is specifically built for the Matrice 100. Its unique features keep the user informed about its performance during a flight. While in flight, the remaining battery power is shown in real-time. Complex and advanced algorithms within the battery calculate the distance of your aircraft and the estimated time for it to return to its home base. The battery automatically provides information about the voltage of each cell, the total lifetime charges and discharges, and its overall health and status. All this helps you to prolong the operating life of the Matrice 100 for years to come.',
            price: 69.99,
            category: 'Battery',
            imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDw8PDRAOERAODQ8QDg0QDg8QEBAQFREWFhURFhUYHTQgGBolGxMVITEhJS4tOi4uFx8zODMsNygtLisBCgoKBw0ODg0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgEDBAUGBwj/xAA6EAACAQIEAwcBBQYHAQAAAAAAAQIDEQQFITESQVEGEyJhcYGRoTJCUmLBByMzgpLRFENTY3LC0hX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADFr5hSho5Jv8MfE/pt7gZQbNNXzeWvBFRS+9J3dvTZfU1c8yVSSTlUqt/hhOcfVKKs/YDqJ4mCTbnDT8yPEc77fVMV+6xDcIKXHHuHKFmnZSundvxdT0XEzThUUXqoSTt9qLadrrk/U8GxuBqQk1OL0drq60TT5+aQHfZT2uxlO3+HxqrRWnc4tKp/L3itK/LmdTgf2juNljcJUj/vYdqtC3Xh0kl7HhyumrNrVb3Tt3nE9fc2OX5nWgtJu6ezUZLVvk9OYH0dkmfYXGxc8JVjUUbccVeMoX24ovVbM2R4v+yjNpLMpQqTcniqE43bu3OHjj9FP5PaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFnEYunT/iTjHom9X6LdgXgaXEZ/HalBy/NLwr43f0NRjc6k9KlW3Pu6d07f8AFeJoDqcRjqdP7c0n+Fay+Fqa6tnb2pQ/mn/5X9zlXjpP+FBJfim1v14U9flGJWrTd+OXEujfDG3lHn7pgb7FZtxXUqkp23pw2Xk7aL+ZmE8ZUlpCMYJc34pfGy+pg0sTTS2d1ySTX1JU8cr+JNbWtrp0YFysm7cUnKV7pPxO65pbRfokZdLNnBd3OmuGy+z+7m9N3bRv2MOnQ423Rk1fdSnrfmuvNbrqThSqcXDOMpJqz4Gru2zu+luYG3nmFCVJyVKdRQSv3nCuC+is76X/AC6nK5nliqfvKTw7jJK9CUnGUXzipTld26vrob6jgWru7hrpwu0kuja0MjuEtW3ptKcm7fIHn9bsqqkW+Dgd2nG6kvVPmjWw7IzUkoRvre1rr1seiYzM6FP7T4n0WxzmYdrLXVJKK8gNh2byeGDbrV5JT4bRXFdr25HQ0O2VGNSlBycoTqRpuTesG3ZN+V2jynG51Um9ZM10q8nzeoH0uDXdncf/AInCYavzq0ISn5Ttaa9pJmxAAAAAAAAAAAAAAAAAAAAAABzWcdtMLh60sO3KVSNlN2tTg2r8LlvfVbI6U8Dz6pxYvFy64qv8d5K30A9MqZ5VrK8KkVB7d0/+2/xYwaspLWKUm34m5a+vmzzjDYupSd6U5Rfk9H6rmdBgO1bVliIX/PDR+8QNtWq1W2pyaV9op09L7uzuvkUYpJqMd7vkle2+2j8zLwuMo114JRn+XaS9t0SnhPwv2e3pfkBhz45W4pK3RaJadSHdReq4pydrttpL35/UyHSnezjJ36Wt7v8AuzIpYWTXiaS6R1fu3p9PcDXrDKKvJ3/KuflfmZNPCVJ6RiqcesvtP9TZUqEYapJdZPV/L1MfFZtSp7yu+gFzDZbCNm7ya57JP0Rk1sRCmvHJLy5nI5l2teqhp6HL43O5zb1fyB3mYdqacLqFr9WctmXaipO/ifyczUryluy3cDMxGPnPdsxXJvciRnVS3AmUckt2Ys8S+RkZLltTGYmlhqV3KtNJtfch96b8krsD339n+F7rLMKrt8dN1ddrVJOa4fy+LT1OiuWqNKMIxhBWjCKjFdIpWS+ETAncEQBIFLlQAAAAAAAAAAAAAAAAB89YyV6tVvd1aja534nc+hTwvtfhO6x+KhbTvpTj6VPHp/UBpwUFwKxm004tprZp2aN3l/aitTsqlqsfzaT/AKufuaMoB6Jl2e4esm1Lhkld05aSt1XVFrG9o6cL8FvVnns5uK4o6OOq/X6GJVxMpbsDp8x7TTls2aHE5jOW7ZgtlEBOU2ylyLdty1PELkBkFqddLzMWdVvdk8LhqlWXDRhKcukVe3q9l7gJ12/IhThKclGClKT2jFOTfsjr8o7CVJ2lip8K/wBOnv7y/t8ndZR2dpUValTjHq7av1e7A88yjsTiK1nWfdRf3VaVR/ovqepdjeztHBXdGCU5R4Z1XrUkt7cT5eSNjhcClyNrQpWAy4SJEIomBUAqkBQkAAAAAAAAAAAAAAACjZRshKQEpSPOf2k5O6tSOJoLilwKFamvtNK/DNLnvZryR3GIqOxpsVTuB46115booz0fM8mo1v4kPFyqR8M178/c5XMezFanrR/exvsrRmvVN2ft8AaG3T6lLlytSlCThNOMouzi90W2BGaumuqZrYs2duhop13surAyZTS3LM8R0Mdy6mzyvIcTibOnTag/8yd4x9ub9gNdKV92ZWX5ZXxDtQpykr6z2gvWT0O7ybsJShaVe9aXRq0F/Lz97nZ4PLIxSSiklskrJAcFk/YJaSxUnN/6cLxh7vd/Q7fLslp0oqNOEYRX3YxSRuqOEtyMunQAwqGDS5GdSw5kQpF6MALdOmX4xKqJJIAkSBVIAioAAAAAAAAAAAAAAAKMqRAoy1MukGgMSpAxKtI2UolqVMDTVaBi1KJvZ0SxPDgctmWT0q38WCvymtJr3/RnKZl2Wq07yovvY/h2qL22ft8Hp08IW3gb8gPEsW3CM+JNSSa4WrPi5K3Ut5T2UxVezce6g/vVF4mvKO/zY9w/+PTk1KdOEpLaTinJejMmnlcF91AefZL2KoUrSlHvJr79Szs/KOyOsw2XJcjfQwUVyL0cMgNZRwnkZdPDmbGiTVMDHhRLsYF3hJKIFtRJqJKxWwEbFUitioFLFQAAAAAAAAAAAAAAAAABRlQBEpYqAIOJFouCwFlwIumX+EcIGN3Q7oyOErwgWFTJqBc4StgIqJVIkLALCxWxUClhYqAAAAAAAAAAAAAAAAAAAAAAAAAAAAFLFQBGwJACIJACIJACNitioApYqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=',
            specifications: {
                Watt: '200kW',
            },
            stock: 12,
        },
        {
            id: '8',
            name: 'DJI Matrice 30 TB30 Intelligent Flight Battery',
            description: 'The TB30 Intelligent Battery can be self-heated and charged up to 400 cycles. Supports Hot Module Replacement, saving time during critical tasks and ensuring smooth flight operations.',
            price: 89.99,
            category: 'Battery',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZgDxT3D0FaydupYZJ9y2yodKMspAgOk4NA&s',
            specifications: {
                capacity: '5880 mAh',
                weight: '685g',
            },
            stock: 18,
        },
        {
            id: '9',
            name: 'Aonic Flight Controller',
            description: 'Advanced flight controller with GPS and telemetry',
            price: 189.99,
            category: 'Air Frame',
            imageUrl: 'data:image/jpeg;base64,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',
            specifications: {
                processor: 'STM32F427',
                sensors: 'IMU, Barometer, Compass',
                ports: '8 PWM outputs',
                weight: '38g',
            },
            stock: 30,
        },
        {
            id: '10',
            name: 'Pixhawk Flight Controller',
            description: 'Advanced flight controller with GPS and telemetry',
            price: 189.99,
            category: 'Air Frame',
            imageUrl: 'https://m.media-amazon.com/images/I/610poPZXOLL.jpg',
            specifications: {
                processor: 'STM32F427',
                weight: '38g',
            },
            stock: 17,
        },
    ];

    findAll(): Product[] {
        return this.products;
    }

    findOne(id: string): Product {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    updateStock(productId: string, quantity: number): void {
        const product = this.findOne(productId);
        if (product.stock < quantity) {
            throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${quantity}`);
        }
        product.stock -= quantity;
    }
}