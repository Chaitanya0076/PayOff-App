import PropTypes from 'prop-types'

export default function Heading({label}) {
    return <div className="font-bold text-4xl pt-6">
      {label}
    </div>
}

Heading.propTypes = {
    label: PropTypes.string
  };