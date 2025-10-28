// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post200_response_trip.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnum_REQUESTED =
    const TripsRequestPost200ResponseTripStatusEnum._('REQUESTED');
const TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnum_ASSIGNED =
    const TripsRequestPost200ResponseTripStatusEnum._('ASSIGNED');
const TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnum_ACCEPTED =
    const TripsRequestPost200ResponseTripStatusEnum._('ACCEPTED');
const TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnum_ARRIVED =
    const TripsRequestPost200ResponseTripStatusEnum._('ARRIVED');
const TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnum_STARTED =
    const TripsRequestPost200ResponseTripStatusEnum._('STARTED');
const TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnum_COMPLETED =
    const TripsRequestPost200ResponseTripStatusEnum._('COMPLETED');
const TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnum_CANCELED =
    const TripsRequestPost200ResponseTripStatusEnum._('CANCELED');

TripsRequestPost200ResponseTripStatusEnum
    _$tripsRequestPost200ResponseTripStatusEnumValueOf(String name) {
  switch (name) {
    case 'REQUESTED':
      return _$tripsRequestPost200ResponseTripStatusEnum_REQUESTED;
    case 'ASSIGNED':
      return _$tripsRequestPost200ResponseTripStatusEnum_ASSIGNED;
    case 'ACCEPTED':
      return _$tripsRequestPost200ResponseTripStatusEnum_ACCEPTED;
    case 'ARRIVED':
      return _$tripsRequestPost200ResponseTripStatusEnum_ARRIVED;
    case 'STARTED':
      return _$tripsRequestPost200ResponseTripStatusEnum_STARTED;
    case 'COMPLETED':
      return _$tripsRequestPost200ResponseTripStatusEnum_COMPLETED;
    case 'CANCELED':
      return _$tripsRequestPost200ResponseTripStatusEnum_CANCELED;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<TripsRequestPost200ResponseTripStatusEnum>
    _$tripsRequestPost200ResponseTripStatusEnumValues = BuiltSet<
        TripsRequestPost200ResponseTripStatusEnum>(const <TripsRequestPost200ResponseTripStatusEnum>[
  _$tripsRequestPost200ResponseTripStatusEnum_REQUESTED,
  _$tripsRequestPost200ResponseTripStatusEnum_ASSIGNED,
  _$tripsRequestPost200ResponseTripStatusEnum_ACCEPTED,
  _$tripsRequestPost200ResponseTripStatusEnum_ARRIVED,
  _$tripsRequestPost200ResponseTripStatusEnum_STARTED,
  _$tripsRequestPost200ResponseTripStatusEnum_COMPLETED,
  _$tripsRequestPost200ResponseTripStatusEnum_CANCELED,
]);

Serializer<TripsRequestPost200ResponseTripStatusEnum>
    _$tripsRequestPost200ResponseTripStatusEnumSerializer =
    _$TripsRequestPost200ResponseTripStatusEnumSerializer();

class _$TripsRequestPost200ResponseTripStatusEnumSerializer
    implements PrimitiveSerializer<TripsRequestPost200ResponseTripStatusEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'REQUESTED': 'REQUESTED',
    'ASSIGNED': 'ASSIGNED',
    'ACCEPTED': 'ACCEPTED',
    'ARRIVED': 'ARRIVED',
    'STARTED': 'STARTED',
    'COMPLETED': 'COMPLETED',
    'CANCELED': 'CANCELED',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'REQUESTED': 'REQUESTED',
    'ASSIGNED': 'ASSIGNED',
    'ACCEPTED': 'ACCEPTED',
    'ARRIVED': 'ARRIVED',
    'STARTED': 'STARTED',
    'COMPLETED': 'COMPLETED',
    'CANCELED': 'CANCELED',
  };

  @override
  final Iterable<Type> types = const <Type>[
    TripsRequestPost200ResponseTripStatusEnum
  ];
  @override
  final String wireName = 'TripsRequestPost200ResponseTripStatusEnum';

  @override
  Object serialize(Serializers serializers,
          TripsRequestPost200ResponseTripStatusEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  TripsRequestPost200ResponseTripStatusEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      TripsRequestPost200ResponseTripStatusEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$TripsRequestPost200ResponseTrip
    extends TripsRequestPost200ResponseTrip {
  @override
  final String? id;
  @override
  final TripsRequestPost200ResponseTripStatusEnum? status;

  factory _$TripsRequestPost200ResponseTrip(
          [void Function(TripsRequestPost200ResponseTripBuilder)? updates]) =>
      (TripsRequestPost200ResponseTripBuilder()..update(updates))._build();

  _$TripsRequestPost200ResponseTrip._({this.id, this.status}) : super._();
  @override
  TripsRequestPost200ResponseTrip rebuild(
          void Function(TripsRequestPost200ResponseTripBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPost200ResponseTripBuilder toBuilder() =>
      TripsRequestPost200ResponseTripBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPost200ResponseTrip &&
        id == other.id &&
        status == other.status;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, status.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestPost200ResponseTrip')
          ..add('id', id)
          ..add('status', status))
        .toString();
  }
}

class TripsRequestPost200ResponseTripBuilder
    implements
        Builder<TripsRequestPost200ResponseTrip,
            TripsRequestPost200ResponseTripBuilder> {
  _$TripsRequestPost200ResponseTrip? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  TripsRequestPost200ResponseTripStatusEnum? _status;
  TripsRequestPost200ResponseTripStatusEnum? get status => _$this._status;
  set status(TripsRequestPost200ResponseTripStatusEnum? status) =>
      _$this._status = status;

  TripsRequestPost200ResponseTripBuilder() {
    TripsRequestPost200ResponseTrip._defaults(this);
  }

  TripsRequestPost200ResponseTripBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _status = $v.status;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPost200ResponseTrip other) {
    _$v = other as _$TripsRequestPost200ResponseTrip;
  }

  @override
  void update(void Function(TripsRequestPost200ResponseTripBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPost200ResponseTrip build() => _build();

  _$TripsRequestPost200ResponseTrip _build() {
    final _$result = _$v ??
        _$TripsRequestPost200ResponseTrip._(
          id: id,
          status: status,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
