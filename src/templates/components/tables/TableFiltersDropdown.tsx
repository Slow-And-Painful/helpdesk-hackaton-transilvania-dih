import { buildQuerystringFromFiltersAndSorter } from "$utils/buildQueryString"
import Button from "$templates/components/Button"
import Checkbox from "$templates/components/Checkbox"
import Dropdown from "$templates/components/dropdown/Dropdown"
import DropdownTrigger from "$templates/components/dropdown/DropdownTrigger"
import Icon from "$templates/components/Icon"
import Input from "$templates/components/Input"
import Separator from "$templates/components/Separator"
import { TableFiltersDropdownProps, TableId } from "$types/table"

const TableFiltersDropdown = ({
  pagination,
  swapOOB,
  baseUrl,
  tableId,
  filters,
  additionalQueryParams
}: TableFiltersDropdownProps & TableId) => {
  return (
    <div
      id={`${tableId}-filters-dropdown`}
      class="relative h-full"
      /*
        Process the element after it's loaded via htmx.
        This is a workaround because re-processing the parent form, that is not swapped,
        won't work on this component's elements because of a htmx implementation limitation.
      */
      hx-swap-oob={swapOOB}
      {...(swapOOB ? {
        "hx-on::load": "htmx.process(event.detail.elt)"
      } : {})}
    >
      <DropdownTrigger
        id={`dropdown-trigger-${tableId}`}
        dropdownId={`dropdown-${tableId}-filters`}
        class="flex items-center justify-center h-full"
      >
        <Button
          size="sm"
          class={"shrink-0 w-8 !h-8 !p-0"}
          preset={"tertiary"}
        >
          <Icon name="filter" size={16} />
        </Button>
      </DropdownTrigger>

      <Dropdown
        id={`dropdown-${tableId}-filters`}
        class="w-[320px] p-3"
      >
        <div class="w-full flex justify-between items-center mb-3">
          <div>
            Filtri
          </div>

          <a
            class="text-primary-500"
            href={`${baseUrl}?${buildQuerystringFromFiltersAndSorter({ ...pagination, filters: { ...additionalQueryParams } })}`}
            hx-boost="true"
            hx-target={`#${tableId}`}
            // hx-swap-oob="outerHTML" handle swap with retarget
            // inherited headers: "hx-template": "table"
            hx-headers={JSON.stringify({ "hx-reset-table-filters": true })}
            data-link-no-underline
          >
            Clear all
          </a>
        </div>
        <div>
          {filters.map(({ key, type, label }) => <>
            <div class="[&:not(:last-child)]:mb-3 [&:last-child>.separator]:hidden">
              {type !== "boolean" ? <p class="text-grey-200 mb-3">{label}</p> : null}
              {type === "enum" || type === "bool_enum" ? <>
                <div class="flex flex-row justify-between">
                  <div class="flex flex-col gap-2">
                    {filters.find(f => f.key === key)?.values?.map(({ key: valueKey, label: valueLabel }) => {
                      const isChecked = (
                        pagination.filters?.[key] === valueKey || 
                        pagination.filters?.[key]?.includes(valueKey) || (
                          !!pagination.filters && (
                            pagination.filters[key] === undefined ||
                            pagination.filters[key] === null
                          )
                        )
                      )
                      return (
                        <Checkbox
                          checked={isChecked}
                          value={valueKey}
                          name={key}
                          onclick={`window.handleEnumClick(event, '#${tableId}-filters-form')`}
                          safe
                          label={valueLabel}
                        />
                      )
                    })}
                  </div>
                </div>
              </> : null}
              {type === "boolean" && (
                <div class="flex flex-col gap-2">
                  <Checkbox
                    checked={pagination.filters?.[key] === "true"}
                    name={key}
                    value={"true"}
                    onchange={`htmx.trigger('#${tableId}-filters-form', 'submit')`}
                    label={label}
                  />
                </div>
              )}
              {type === "string" && (
                <Input
                  name={key}
                  size="sm"
                  value={pagination.filters?.[key] as string}
                  onchange={`htmx.trigger('#${tableId}-filters-form', 'submit')`}
                  inputClass={"border-grey-600 text-neutral-800"}
                />
              )}
              <Separator class={"mt-3"} />
            </div>
          </>)}
        </div>
      </Dropdown>
    </div>
  )
}

export default TableFiltersDropdown