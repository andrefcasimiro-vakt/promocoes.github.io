import { Merchant } from '../../data/models';
import { Text } from '../../styles/font.styled';
import { RowContainer } from '../../styles/layout.styled';

interface Props {
    merchantName: string;
    merchantValue: Merchant;
    setMerchants: React.Dispatch<React.SetStateAction<Merchant[]>>
    checked: boolean;
}

export default function MerchantFilter({
 merchantName, merchantValue, setMerchants, checked,
}: Props) {
    return (
      <RowContainer>
        <input
          type="checkbox"
          id={merchantValue}
          checked={checked}
          onChange={(ev) => {
              if (ev.currentTarget.checked) {
                  setMerchants((state) => {
                    if (state.includes(merchantValue)) {
                      return state.slice();
                    }

                    state.push(merchantValue);

                    return state.slice();
                  });
                } else {
                  setMerchants((state) => {
                    if (state.includes(merchantValue)) {
                      return state.filter((x) => x !== merchantValue);
                    }
                      return state.slice();
                  });
                }
          }}
        />
        <label htmlFor={merchantValue}>
          <Text style={{ fontSize: 14 }}>{merchantName}</Text>
        </label>
      </RowContainer>
    );
}
