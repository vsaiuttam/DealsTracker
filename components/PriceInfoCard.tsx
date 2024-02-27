import Image from "next/image"

interface Props {

    title: string
    iconSrc: string
    value: string

}

const PriceInfoCard = ({title, iconSrc, value}: Props) => {
  return (
    <div className="price-info_card border-l-[b6dbff]">
      <p className="text-base text-black-100">{title}</p>

      <div className="flex gap-1">
            <Image src={iconSrc} alt={title} width={25} height={25}/>
            <p className="text-2xl ml-2 font-bold text-secondary">{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard
