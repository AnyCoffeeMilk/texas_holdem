import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'
import SettingItem from './_components/SettingItem'
import SectionTitle from '../../_components/SectionTitle'
import PageTitle from '../../_components/PageTitle'

const settings_list = [
  {
    name: 'theme',
    selected: 1,
    options: [{ text: 'dark' }, { text: 'light' }],
  },
  {
    name: 'language',
    selected: 0,
    options: [{ text: 'eng' }, { text: 'cn' }],
  },
]

export default function Profile() {
  return (
    <div className="container-md grid w-[500px] gap-4 rounded-sm p-4">
      <div className="flex items-center justify-between">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Settings</PageTitle>
      </div>
      <SectionTitle>Preferences</SectionTitle>
      <div className="grid gap-4">
        {settings_list.map((item, index) => (
          <SettingItem
            key={index}
            name={item.name}
            initSelect={item.selected}
            options={item.options}
          />
        ))}
      </div>
    </div>
  )
}
