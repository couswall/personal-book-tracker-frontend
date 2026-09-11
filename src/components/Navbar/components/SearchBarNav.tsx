import React from 'react';
import {FormContainer} from '@components/Layout/FlexContainer/index';
import {SearchBarContainer} from '@components/Navbar/styles';
import {Input, InputContainer} from '@components/Input';
import {Icon} from '@components/Icon';
import {SearchBarNavProps} from '@components/Navbar/components/interfaces';

export const SearchBarNav: React.FC<SearchBarNavProps> = ({
    showSearchInput,
    setShowSearchInput,
    searchBarRef,
}) => {
    return (
        <>
            <SearchBarContainer
                $width="100%"
                $position="absolute"
                $justifyContent="center"
                $top="80px"
                $left="0"
                className={showSearchInput ? 'expand-search-bar' : ''}
                ref={searchBarRef}
            >
                <FormContainer
                    $height="100%"
                    $width="100%"
                    $borderRadius="0.5rem"
                    $maxWidth="800px"
                >
                    <InputContainer
                        $padding="0.5rem 1rem"
                        $gap="0.5rem"
                        $alignItems="center"
                        $borderRadius="0.5rem"
                        $width="100%"
                    >
                        <Input
                            placeholder="Search books"
                            $height="100%"
                            $width="calc(100% - 1rem)"
                            $border="none"
                        />
                        <Icon
                            variant="dark"
                            className="fa-solid fa-solid fa-x"
                            $fontSize="1rem"
                            $cursor="pointer"
                            onClick={() => setShowSearchInput(!showSearchInput)}
                        />
                    </InputContainer>
                </FormContainer>
            </SearchBarContainer>
        </>
    );
};
