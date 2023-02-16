import { Merchant } from "../../data/models"
import { TextPrimary } from '../../styles/font.styled';

interface Props {
    merchantName: string;
    merchantValue: Merchant;
    setMerchants: React.Dispatch<React.SetStateAction<Merchant[]>>
    checked: boolean;
}

export default function MerchantFilter({ merchantName, merchantValue, setMerchants, checked }: Props) {
    
    return (
        <>
          <input type="checkbox" id={merchantValue} checked={checked} onChange={(ev) => {
              if (ev.currentTarget.checked) {
                  setMerchants((state) => {
                    if (state.includes(merchantValue)) {
                      return state.slice()
                    }
    
                    state.push(merchantValue)
    
                    return state.slice()
                  })
                } else {
                  setMerchants((state) => {
                    if (state.includes(merchantValue)) {
                      return state.filter(x => x !== merchantValue)
                    } else {
                      return state.slice()
                    }
                  })
                }
          }}/>
          <label htmlFor={merchantValue}><TextPrimary>{merchantName}</TextPrimary></label>
          </>
    )
}
