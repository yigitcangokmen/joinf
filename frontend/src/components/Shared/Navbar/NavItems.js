import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
    { name: 'Home', url: '/'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NavItem = ({ url, name, current, mobile }) => {
    return (
      <Link href={url}>
        {mobile ? (
          <Disclosure.Button
            key={name}
            as="a"
            href={url}
            className={classNames(
              current ? 'text-white' : 'text-white hover:text-black hover:bg-gray-100',
              'block px-3 py-2 rounded-md text-base font-medium'
            )}
            aria-current={current ? 'page' : undefined}
          >
            {name}
          </Disclosure.Button>
        ) : (
          <a
            key={name}
            href={url}
            className={classNames(
              current ? 'text-white' : 'text-white hover:text-black hover:bg-gray-100',
              'px-3 py-2 rounded-md text-base font-semibold font-archivo'
            )}
            aria-current={current ? 'page' : undefined}
          >
            {name}
          </a>
        )}
      </Link>
    )
}

const NavItems = ({ mobile }) => {
    const router = useRouter()
    return (
        <>
            {navigation.map((item) => (
                <NavItem
                key={item.name}
                url={item.url} 
                name={item.name} 
                current={router.pathname == item.url} 
                mobile={mobile}
                />
            ))}
        </>
    )
}

export default NavItems