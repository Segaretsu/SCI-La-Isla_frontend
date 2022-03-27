import { APP_NAME } from '@config'
import Link from 'next/link'
import MainLayout from 'src/layouts/main-layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Bienvenido a la <Link href='/'><a>{APP_NAME}!</a></Link>
          </h1>

          <p className={styles.description}>
            Comienza a registrar compras en {' '}
            <code className={styles.code}>compras de cliente en sitio</code>
          </p>

          <div className={styles.grid}>
            <Link href="/compra-cliente-sitio">
              <a className={styles.card}>
                <h2>Compra Cliente Sitio &rarr;</h2>
                <p>Registra la venta de tus productos en tu local físico.</p>
              </a>
            </Link>

            <Link href="/compras/resumen-compras">
              <a className={styles.card}>
                <h2>Resumen compras &rarr;</h2>
                <p>Encuentra aquí todas las compras realizadas por los clientes.</p>
              </a>
            </Link>
          </div>
          <p className={styles.description}>
            Comienza a gestionar productos en {' '}
            <code className={styles.code}>productos</code>
          </p>

          <div className={styles.grid}>
            <Link href="/productos/registrar">
              <a className={styles.card}>
                <h2>Registrar nuevo producto &rarr;</h2>
                <p>Registra los nuevos productos que empiezas a vender en tu local.</p>
              </a>
            </Link>

            <Link href="/productos/categorias/registrar">
              <a className={styles.card}>
                <h2>Registrar una categoria &rarr;</h2>
                <p>Registra las categorías de los productos que vendes.</p>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}
