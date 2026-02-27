import Accordion from "$templates/components/Accordion"
import Alert from "../components/Alert"
import Badge from "../components/Badge"
import Box from "../components/Box"
import Button from "../components/Button"
import Checkbox from "../components/Checkbox"
import Dropdown, { DropdownItem } from "$templates/components/dropdown/Dropdown"
import DropdownTrigger from "$templates/components/dropdown/DropdownTrigger"
import FileInput from "$templates/components/FileInput"
import Icon, { IconName } from "../components/Icon"
import Input from "../components/Input"
import Modal from "../components/Modal"
import Pagination from "$templates/components/Pagination"
import SearchInput, {
  SearchInputOption,
} from "$templates/components/SearchInput"
import Select, { SelectOptions } from "$templates/components/Select"
import Status from "../components/Status"
import Tabs, { TabsItem } from "../components/Tabs"
import Textarea from "$templates/components/Textarea"
import Toggle from "$templates/components/Toggle"
import Tooltip from "$templates/components/Tooltip"
import SelectSearchable from "$templates/components/SelectSearchable"
import Dropzone from "$templates/components/Dropzone"
import CardSlider from "$templates/components/CardSlider"
import RadioGroup from "$templates/components/RadioGroup"

type OrganizationLicense = {
  id: number
  code: string
  expiration: string
  customer?: string
  application: string
  type: string
  last_used: string
  status: string
}
type User = {
  id: number
  username: string
  typology: string
  email: string
  user_id: string
  organization_id: string
  company: string
}
const tableDropdownItems: DropdownItem[] = [
  {
    icon: "eye",
    id: "0",
    title: "Details",
    href: "/details",
    type: "primary",
  },
  {
    icon: "edit",
    id: "1",
    title: "Edit",
    href: "/edit",
    type: "primary",
  },
  {
    icon: "lock",
    id: "2",
    title: "Block",
    href: "/block",
    type: "danger",
  },
]

const userData: User[] = [
  {
    id: 1,
    username: "John Doe",
    typology: "Staff",
    email: "jese@example.com",
    user_id: "74650096",
    organization_id: "",
    company: "Polarity",
  },
]
const organizationLicensesData: OrganizationLicense[] = [
  {
    id: 1,
    code: "7f2ea72c-abef-4780-9517-69c5d96d74ff",
    expiration: "213 Days",
    application: "Pyramis",
    type: "Demo",
    last_used: "1 hour ago",
    status: "Active",
  },
]
const searchOptionsFields: SearchInputOption[] = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Long Option Name",
    value: "option-2",
  },
  {
    label: "Option 3",
    value: "option-3",
  },
]
const selectOptions: SelectOptions = [
  {
    label: "Option 1",
    value: "option-1",
    selected: true,
  },
  {
    label: "Long Option Name",
    value: "option-2",
  },
  {
    label: "Option 3",
    value: "option-3",
  },
]
const tabsItems: TabsItem[] = [
  {
    active: true,
    href: "#",
    id: "tab-1",
    title: "Tab 1",
  },
  {
    href: "#",
    id: "tab-2",
    title: "Tab 2",
  },
  {
    href: "#",
    id: "tab-3",
    title: "Tab 3",
  },
]

const iconNames: string[] = [
  "2-layers",
  "3-layers",
  "activity",
  "airplay",
  "alert-circle",
  "alert-octagon",
  "alert-triangle",
  "align-center",
  "align-justify",
  "align-left",
  "align-right",
  "anchor",
  "aperture",
  "archive",
  "arrow-down-circle",
  "arrow-down-left",
  "arrow-down-right",
  "arrow-down",
  "arrow-left-circle",
  "arrow-left",
  "arrow-right-circle",
  "arrow-right",
  "arrow-up-circle",
  "arrow-up-left",
  "arrow-up-right",
  "arrow-up",
  "at-sign",
  "award",
  "bar-chart-2",
  "bar-chart",
  "battery-charging",
  "battery",
  "bell-off",
  "bell",
  "bluetooth",
  "bold",
  "book-open",
  "book",
  "bookmark",
  "books",
  "box",
  "briefcase",
  "calendar",
  "camera-off",
  "camera",
  "cast",
  "check-circle",
  "check-square",
  "check",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "chevrons-down",
  "chevrons-left",
  "chevrons-right",
  "chevrons-up",
  "chrome",
  "circle",
  "clipboard",
  "clock",
  "cloud-drizzle",
  "cloud-lightning",
  "cloud-off",
  "cloud-rain",
  "cloud-snow",
  "cloud",
  "code",
  "codepen",
  "codesandbox",
  "coffee",
  "coin-stack",
  "coins",
  "collapse",
  "columns",
  "command",
  "compass",
  "collapsed-logo",
  "copy",
  "corner-down-left",
  "corner-down-right",
  "corner-left-down",
  "corner-left-up",
  "corner-right-down",
  "corner-right-up",
  "corner-up-left",
  "corner-up-right",
  "cpu",
  "credit-card",
  "crop",
  "crosshair",
  "database",
  "delete",
  "disc",
  "divide-circle",
  "divide-square",
  "divide",
  "dollar-sign",
  "download-cloud",
  "download",
  "dribbble",
  "droplet",
  "edit-2",
  "edit-3",
  "edit",
  "expand",
  "external-link",
  "eye-slash",
  "eye",
  "facebook",
  "fast-forward",
  "feather",
  "figma",
  "file-minus",
  "file-plus",
  "file-text",
  "file",
  "film",
  "filter",
  "filteroff",
  "filters-lines",
  "flag",
  "folder-minus",
  "folder-plus",
  "folder",
  "framer",
  "frown",
  "gift",
  "git-branch",
  "git-commit",
  "git-merge",
  "git-pull-request",
  "github",
  "gitlab",
  "globe",
  "grid",
  "gym",
  "hard-drive",
  "hash",
  "headphones",
  "heart",
  "help-circle",
  "hexagon",
  "home",
  "image",
  "inbox",
  "info",
  "instagram",
  "italic",
  "key",
  "menu-2",
  "layout",
  "learn",
  "life-buoy",
  "link-2",
  "link",
  "linkedin",
  "list",
  "loader-icon",
  "lock",
  "login",
  "logout",
  "mail",
  "map-pin",
  "map",
  "maximize-2",
  "maximize",
  "meh",
  "menu",
  "message-circle",
  "message-square",
  "mic-off",
  "mic",
  "minimize-2",
  "minimize",
  "minus-circle",
  "minus-square",
  "minus",
  "monitor",
  "mortarboard",
  "moon",
  "dots-horizontal",
  "dots-vertical",
  "mouse-pointer",
  "move",
  "music",
  "navigation-2",
  "navigation",
  "octagon",
  "options",
  "package",
  "paperclip",
  "paper-plane",
  "pause-circle",
  "pause",
  "pen-tool",
  "percent",
  "phone-call",
  "phone-forwarded",
  "phone-incoming",
  "phone-missed",
  "phone-off",
  "phone-outgoing",
  "phone",
  "pie-chart",
  "play-circle",
  "play",
  "plus-circle",
  "plus-square",
  "plus",
  "pocket",
  "power",
  "printer",
  "qr-code",
  "radio",
  "refresh-ccw",
  "refresh-cw",
  "repeat",
  "rewind",
  "rocket",
  "rotate-ccw",
  "rotate-cw",
  "rss",
  "save",
  "scissors",
  "search",
  "send",
  "server",
  "settings",
  "share-2",
  "share",
  "shield-off",
  "shield",
  "shopping-bag",
  "shopping-cart",
  "shuffle",
  "sidebar-icon",
  "skip-back",
  "skip-forward",
  "slack",
  "slash",
  "slash-divider",
  "sliders",
  "smartphone",
  "smile",
  "sort",
  "sort-2",
  "speaker",
  "spinner",
  "square",
  "star",
  "stop-circle",
  "sun",
  "sunrise",
  "sunset",
  "tablet",
  "tag",
  "target",
  "terminal",
  "text",
  "thermometer",
  "thumbs-down",
  "thumbs-up",
  "toggle-left",
  "toggle-right",
  "tool",
  "trash-2",
  "trash",
  "trello",
  "trending-down",
  "trending-up",
  "triangle",
  "truck",
  "tv",
  "twitch",
  "twitter",
  "type",
  "umbrella",
  "underline",
  "unlock",
  "upload-cloud",
  "upload",
  "user-check",
  "user-minus",
  "user-plus",
  "user-x",
  "user",
  "users",
  "vacation",
  "video-off",
  "video",
  "voicemail",
  "volume-1",
  "volume-2",
  "volume-x",
  "volume",
  "watch",
  "wifi-off",
  "wifi",
  "wind",
  "x-circle",
  "x-octagon",
  "x-square",
  "x",
  "youtube",
  "zap-off",
  "zap",
  "zoom-in",
  "zoom-out",
]

const UIKitView = () => {
  return (
    <>
      <div class="relative overflow-hidden min-h-full py-11 pr-9 bg-black">
        <h1 class="text-h3 font-semibold mb-12 text-white">UIKit</h1>

        <CardSlider
          classes="mb-14"
          items={[
            {
              content: <div>1</div>
            },
            {
              content: <div>2</div>
            },
            {
              content: <div>3</div>
            },
            {
              content: <div>4</div>
            },
            {
              content: <div>5</div>
            },
            {
              content: <div>6</div>
            },
            {
              content: <div>7</div>
            },
            {
              content: <div>8</div>
            }
          ]}
          maxItemsPerView={3}
        />

        <div class="mb-14">
          <Box title="Button">
            <div class="flex-col">
              {/* PRIMARY */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button size="sm">Button Text</Button>
                <Button>Button Text</Button>
                <Button size="lg">Button Text</Button>
                <Button size="lg" icon="heart" iconPosition="right">
                  Button Text
                </Button>
                <Button size="lg" spinner class={"btn--loading"}>
                  Button Text
                </Button>
              </div>

              {/* SECONDARY */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button size="sm" preset="secondary">
                  Button Text
                </Button>
                <Button preset="secondary">Button Text</Button>
                <Button size="lg" preset="secondary">
                  Button Text
                </Button>
                <Button
                  size="lg"
                  preset="secondary"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
                <Button
                  size="lg"
                  preset="secondary"
                  spinner
                  class={"btn--loading"}
                >
                  Button Text
                </Button>
              </div>

              {/* TERTIARY */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button size="sm" preset="tertiary">
                  Button Text
                </Button>
                <Button preset="tertiary">Button Text</Button>
                <Button size="lg" preset="tertiary">
                  Button Text
                </Button>
                <Button
                  size="lg"
                  preset="tertiary"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
                <Button
                  size="lg"
                  preset="tertiary"
                  spinner
                  class={"btn--loading"}
                >
                  Button Text
                </Button>
              </div>

              {/* TRANSPARENT */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button size="sm" preset="transparent">
                  Button Text
                </Button>
                <Button preset="transparent">Button Text</Button>
                <Button size="lg" preset="transparent">
                  Button Text
                </Button>
                <Button
                  size="lg"
                  preset="transparent"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
              </div>

              {/* DANGER */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button size="sm" preset="danger">
                  Button Text
                </Button>
                <Button preset="danger">Button Text</Button>
                <Button size="lg" preset="danger">
                  Button Text
                </Button>
                <Button
                  size="lg"
                  preset="danger"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
                <Button
                  size="lg"
                  preset="danger"
                  spinner
                  class={"btn--loading"}
                >
                  Button Text
                </Button>
              </div>

              {/* PRIMARY OUTLINE */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button size="sm" outline>
                  Button Text
                </Button>
                <Button outline>Button Text</Button>
                <Button size="lg" outline>
                  Button Text
                </Button>
                <Button size="lg" outline icon="heart" iconPosition="right">
                  Button Text
                </Button>
                <Button size="lg" outline spinner class={"btn--loading"}>
                  Button Text
                </Button>
              </div>

              {/* SECONDARY OUTLINE */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button outline size="sm" preset="secondary">
                  Button Text
                </Button>
                <Button outline preset="secondary">
                  Button Text
                </Button>
                <Button outline size="lg" preset="secondary">
                  Button Text
                </Button>
                <Button
                  outline
                  size="lg"
                  preset="secondary"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
                <Button
                  outline
                  size="lg"
                  preset="secondary"
                  spinner
                  class={"btn--loading"}
                >
                  Button Text
                </Button>
              </div>

              {/* TERTIARY OUTLINE */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button outline size="sm" preset="tertiary">
                  Button Text
                </Button>
                <Button outline preset="tertiary">
                  Button Text
                </Button>
                <Button outline size="lg" preset="tertiary">
                  Button Text
                </Button>
                <Button
                  outline
                  size="lg"
                  preset="tertiary"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
                <Button
                  outline
                  size="lg"
                  preset="tertiary"
                  spinner
                  class={"btn--loading"}
                >
                  Button Text
                </Button>
              </div>

              {/* DANGER OUTLINE */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button outline size="sm" preset="danger">
                  Button Text
                </Button>
                <Button outline preset="danger">
                  Button Text
                </Button>
                <Button outline size="lg" preset="danger">
                  Button Text
                </Button>
                <Button
                  outline
                  size="lg"
                  preset="danger"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
                <Button
                  outline
                  size="lg"
                  preset="danger"
                  spinner
                  class={"btn--loading"}
                >
                  Button Text
                </Button>
              </div>

              {/* DISABLED */}
              <div class="flex items-center gap-x-5 mb-4">
                <Button disabled={true} size="sm">
                  Button Text
                </Button>
                <Button disabled={true}>Button Text</Button>
                <Button disabled={true} size="lg">
                  Button Text
                </Button>
                <Button
                  disabled={true}
                  size="lg"
                  icon="heart"
                  iconPosition="right"
                >
                  Button Text
                </Button>
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Input">
            <div class="flex-col">
              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <Input
                  id="input-1"
                  label="Label"
                  size="sm"
                  placeholder="This is a placeholder"
                  caption={
                    <>
                      We'll never share your details. See our{" "}
                      <a href="">Privacy Policy</a>
                    </>
                  }
                />
                <Input
                  id="input-2"
                  label="Label"
                  placeholder="This is a placeholder"
                />
                <Input
                  id="input-3"
                  label="Label"
                  size="lg"
                  placeholder="This is a placeholder"
                  error="This is an error message"
                />
              </div>

              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <Input
                  id="input-4"
                  label="Label"
                  size="sm"
                  placeholder="This is a placeholder"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                  caption={
                    <>
                      We'll never share your details. See our{" "}
                      <a href="">Privacy Policy</a>
                    </>
                  }
                />
                <Input
                  id="input-5"
                  label="Label"
                  placeholder="This is a placeholder"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                />
                <Input
                  id="input-6"
                  label="Label"
                  size="lg"
                  placeholder="This is a placeholder"
                  error="This is an error message"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                />
              </div>

              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <Input
                  id="input-7"
                  label="Label"
                  size="sm"
                  placeholder="This is a placeholder"
                  disabled
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                  caption={
                    <>
                      We'll never share your details. See our{" "}
                      <a href="">Privacy Policy</a>
                    </>
                  }
                />
                <Input
                  id="input-8"
                  label="Label"
                  disabled
                  placeholder="This is a placeholder"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                />
                <Input
                  id="input-9"
                  label="Label"
                  disabled
                  size="lg"
                  placeholder="This is a placeholder"
                  error="This is an error message"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                />
              </div>

              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <Input
                  id="input-10"
                  label="Label"
                  size="sm"
                  readonly
                  placeholder="This is a placeholder"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                  caption={
                    <>
                      We'll never share your details. See our{" "}
                      <a href="">Privacy Policy</a>
                    </>
                  }
                />
                <Input
                  id="input-11"
                  label="Label"
                  readonly
                  placeholder="This is a placeholder"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                />
                <Input
                  id="input-12"
                  label="Label"
                  size="lg"
                  readonly
                  placeholder="This is a placeholder"
                  error="This is an error message"
                  prepend={<Icon name="users" />}
                  append={<Icon name="x" size={12} />}
                />
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Dropzone">
            <Dropzone
              name="dropzone"
              id="dropzone"
              accept="image/*"
              withUpload={false}
              class={"w-[200px] h-[200px]"}
            />
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Textarea">
            <div class="flex-col">
              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <Textarea
                  id="textarea-1"
                  label="Label"
                  placeholder="Write some text here..."
                  caption="A note for extra info"
                />
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Checkbox">
            <div class="flex-col">
              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <Checkbox
                  id="checkbox-1"
                  label={
                    <>
                      I have read and understood the{" "}
                      <a href="">privacy policy</a>*
                    </>
                  }
                />

                <Checkbox
                  id="checkbox-2"
                  caption="This is a caption"
                  checked
                  label={
                    <>
                      I have read and understood the{" "}
                      <a href="">privacy policy</a>*
                    </>
                  }
                />

                <Checkbox
                  id="checkbox-3"
                  error="This is an error message"
                  label={
                    <>
                      I have read and understood the{" "}
                      <a href="">privacy policy</a>*
                    </>
                  }
                />

                <Checkbox
                  id="checkbox-4"
                  disabled
                  caption="This is a caption"
                  label={
                    <>
                      I have read and understood the{" "}
                      <a href="">privacy policy</a>*
                    </>
                  }
                />
              </div>

              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <RadioGroup
                  name="radioButton"
                  items={[
                    {
                      label: <>
                          I have read and understood the{" "}
                          <a href="">privacy policy</a>*
                        </>
                    },
                    {
                      label: <>
                        I have read and understood the{" "}
                        <a href="">privacy policy</a>*,
                      </>,
                      id: "checkbox-2",
                      caption: "This is a caption",
                      checked: true
                    },
                    {
                      error: "This is an error message",
                      label:
                        <>
                          I have read and understood the{" "}
                          <a href="">privacy policy</a>*
                        </>
                    },
                    {
                      disabled: true,
                      caption: "This is a caption",
                      label: <>
                        I have read and understood the{" "}
                        <a href="">privacy policy</a>*
                      </>
                    }
                  ]}
                />
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Toggle">
            <div class="flex-col">
              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <div>
                  <Toggle id="toggle-1" label="Toggle Label" />
                </div>
                <div>
                  <Toggle id="toggle-6" text="Left Text" textPosition="left" />
                </div>
                <div>
                  <Toggle id="toggle-2" text="Toggle Text" />
                </div>
                <div>
                  <Toggle id="toggle-3" checked caption="This is a caption" />
                </div>
                <div>
                  <Toggle id="toggle-4" error="This is a error message" />
                </div>
                <div>
                  <Toggle id="toggle-5" text="Disabled toggle" disabled />
                </div>
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Select Input">
            <div class="flex-col">
              <div class="flex flex-wrap items-end gap-x-5 mb-4">
                <div>
                  <Select
                    id="select-1"
                    title="Options"
                    label="Label"
                    options={selectOptions}
                  />
                </div>

                <div>
                  <Select
                    id="select-2"
                    title="Options"
                    options={selectOptions}
                  />
                </div>

                <div>
                  <Select
                    id="select-3"
                    size="md"
                    title="Options"
                    options={selectOptions}
                  />
                </div>

                <div>
                  <Select
                    id="select-4"
                    size="lg"
                    title="Options"
                    options={selectOptions}
                    error="This is an error message"
                  />
                </div>

                <div>
                  <Select
                    id="select-5"
                    title="Options"
                    label="Label"
                    showSelectedSubtitle
                    options={selectOptions.map(op => ({
                      ...op,
                      subtitle: "subtitle | lorem ipsulum dolor sit amet"
                    }))}
                  />
                </div>
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Select Searchable">
            <SelectSearchable
              name="search-select"
              id="search-select"
              options={selectOptions}
              canBeEmpty
              placeholder="Seleziona..."
            />
          </Box>
        </div>

        <div class="mb-14">
          <Box title="File Input">
            <div class="flex flex-wrap gap-x-3">
              <div>
                <FileInput
                  id="file-1"
                  name="file-1"
                  label="Upload file"
                  caption="Note Text"
                />
              </div>
              <div>
                <FileInput
                  id="file-2"
                  name="file-2"
                  label="Upload file"
                  caption="Note Text"
                  disabled
                />
              </div>
              <div>
                <FileInput
                  id="file-3"
                  name="file-3"
                  label="Upload file"
                  error="Error message"
                />
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Alert">
            <div class="flex-col">
              <div class="flex flex-wrap items-start gap-x-5 mb-4">
                <Alert title="Alert Title">
                  This is a message
                  <div class="mt-3">
                    <Button size="sm">View more</Button>
                  </div>
                </Alert>

                <Alert title="Alert Title" theme="success" icon="users">
                  This is a message
                </Alert>

                <Alert title="Alert Title" theme="warning">
                  Aww yeah, you successfully read this important alert message.
                </Alert>

                <Alert title="Alert Title" icon="users" theme="danger">
                  This is a message
                </Alert>
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Search & Filter">
            <div>
              <div class="flex items-stretch gap-x-4 mb-4">
                <div>
                  <SearchInput
                    options={searchOptionsFields}
                    placeholder="Search by organization ID, email..."
                  />
                </div>
                <div class="relative">
                  <DropdownTrigger
                    id={`dropdown-trigger-tableId`}
                    dropdownId={`filters-dropdown`}
                  >
                    <Button
                      size="sm"
                      class="!h-[39px] w-[95px]"
                      outline
                      preset="primary"
                    >
                      Filters (1)
                    </Button>
                  </DropdownTrigger>
                  <Dropdown
                    id="filters-dropdown"
                    class="filter-drop__dropdown text-sm font-medium"
                  >
                    <div class="w-full flex justify-between items-center mb-3">
                      <p>Filters</p>
                      <a href="" class="text-primary-800">
                        Clear All
                      </a>
                    </div>
                    <div>
                      <Accordion title="User type">
                        <div class="flex flex-col gap-y-3 py-3">
                          <Checkbox id="user-type-filter-1" label="Staff" />
                          <Checkbox
                            id="user-type-filter-2"
                            label="Organization"
                          />
                          <Checkbox id="user-type-filter-3" label="User" />
                        </div>
                      </Accordion>
                      <Accordion title="Status">
                        <div class="flex flex-col gap-y-3 py-3">
                          <Checkbox
                            id="user-status-filter-1"
                            label={<Status variant="BLOCKED" />}
                          />
                        </div>
                      </Accordion>
                    </div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <Badge>
                  Status: active
                  <Icon name="x" size={10} />
                </Badge>
              </div>
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Tabs">
            <Tabs items={tabsItems} />
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Tooltip">
            <div class="flex items-center">
              Testo di prova
              <Tooltip content="Supported application versions" icon="info" />
            </div>
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Pagination">
            <Pagination baseUrl="" pagination={{
              totalPages: 10,
              totalItems: 100,
              page: 1,
              baseUrl: "",
              itemsPerPage: 10,
              filters: {},
            }} />
          </Box>
        </div>

        <div class="mb-14">
          <Box title="Icons">
            <div class="grid grid-cols-12 gap-8">
              {iconNames.map((iconName) => {
                return (
                  <div class="flex flex-col items-center text-xs">
                    <Icon name={iconName as IconName} size={40} />
                    <p class="text-gray-500 mt-2" safe>
                      {iconName}
                    </p>
                  </div>
                )
              })}
            </div>
          </Box>
        </div>
      </div>

      <Modal
        ariaLabelledby="inviteNewUser"
        footer={<Button size="sm">Send invite</Button>}
        id="inviteNewUserModal"
        title="Invite new user"
      >
        <div class="mb-4">
          Send an invitation to a new user to create a new account by selecting
          the desired role and possibly the organization they belong to.
        </div>
        <div class="mb-4">
          <Input id="email-address-invite" label="E-mail address" />
        </div>
        <div>
          <Select
            id="user-type-invite"
            title="Options"
            label="User type"
            options={selectOptions}
          />
        </div>
      </Modal>

      <Modal
        ariaLabelledby="deleteUser"
        footer={
          <Button size="sm" preset="danger">
            Yes, delete
          </Button>
        }
        id="deleteUserModal"
        size="sm"
        title="Delete {{user}}?"
      >
        <div class="mb-4">
          Are you sure you want to delete this user from the platform?
        </div>
        <div class="mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id,
          repudiandae? Molestiae facilis eius numquam, optio ut similique ea hic
          praesentium maxime quisquam alias consequatur architecto et aliquid
          deserunt obcaecati dicta? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Id, repudiandae? Molestiae facilis eius numquam,
          optio ut similique ea hic praesentium maxime quisquam alias
          consequatur architecto et aliquid deserunt obcaecati dicta? Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Id, repudiandae?
          Molestiae facilis eius numquam, optio ut similique ea hic praesentium
          maxime quisquam alias consequatur architecto et aliquid deserunt
          obcaecati dicta?
        </div>
        <div class="mb-4">
          <Alert title="Warning" theme="warning">
            By deleting this user other 6 ((entities)) will also be permanently
            deleted.
          </Alert>
        </div>
      </Modal>
    </>
  )
}

export default UIKitView
