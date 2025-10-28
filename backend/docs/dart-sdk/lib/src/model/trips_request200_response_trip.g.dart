// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request200_response_trip.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const TripsRequest200ResponseTripStatusEnum
    _$tripsRequest200ResponseTripStatusEnum_ASSIGNED =
    const TripsRequest200ResponseTripStatusEnum._('ASSIGNED');
const TripsRequest200ResponseTripStatusEnum
    _$tripsRequest200ResponseTripStatusEnum_ACCEPTED =
    const TripsRequest200ResponseTripStatusEnum._('ACCEPTED');
const TripsRequest200ResponseTripStatusEnum
    _$tripsRequest200ResponseTripStatusEnum_ARRIVED =
    const TripsRequest200ResponseTripStatusEnum._('ARRIVED');
const TripsRequest200ResponseTripStatusEnum
    _$tripsRequest200ResponseTripStatusEnum_ONGOING =
    const TripsRequest200ResponseTripStatusEnum._('ONGOING');
const TripsRequest200ResponseTripStatusEnum
    _$tripsRequest200ResponseTripStatusEnum_COMPLETED =
    const TripsRequest200ResponseTripStatusEnum._('COMPLETED');
const TripsRequest200ResponseTripStatusEnum
    _$tripsRequest200ResponseTripStatusEnum_CANCELED =
    const TripsRequest200ResponseTripStatusEnum._('CANCELED');

TripsRequest200ResponseTripStatusEnum
    _$tripsRequest200ResponseTripStatusEnumValueOf(String name) {
  switch (name) {
    case 'ASSIGNED':
      return _$tripsRequest200ResponseTripStatusEnum_ASSIGNED;
    case 'ACCEPTED':
      return _$tripsRequest200ResponseTripStatusEnum_ACCEPTED;
    case 'ARRIVED':
      return _$tripsRequest200ResponseTripStatusEnum_ARRIVED;
    case 'ONGOING':
      return _$tripsRequest200ResponseTripStatusEnum_ONGOING;
    case 'COMPLETED':
      return _$tripsRequest200ResponseTripStatusEnum_COMPLETED;
    case 'CANCELED':
      return _$tripsRequest200ResponseTripStatusEnum_CANCELED;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<TripsRequest200ResponseTripStatusEnum>
    _$tripsRequest200ResponseTripStatusEnumValues = BuiltSet<
        TripsRequest200ResponseTripStatusEnum>(const <TripsRequest200ResponseTripStatusEnum>[
  _$tripsRequest200ResponseTripStatusEnum_ASSIGNED,
  _$tripsRequest200ResponseTripStatusEnum_ACCEPTED,
  _$tripsRequest200ResponseTripStatusEnum_ARRIVED,
  _$tripsRequest200ResponseTripStatusEnum_ONGOING,
  _$tripsRequest200ResponseTripStatusEnum_COMPLETED,
  _$tripsRequest200ResponseTripStatusEnum_CANCELED,
]);

Serializer<TripsRequest200ResponseTripStatusEnum>
    _$tripsRequest200ResponseTripStatusEnumSerializer =
    _$TripsRequest200ResponseTripStatusEnumSerializer();

class _$TripsRequest200ResponseTripStatusEnumSerializer
    implements PrimitiveSerializer<TripsRequest200ResponseTripStatusEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'ASSIGNED': 'ASSIGNED',
    'ACCEPTED': 'ACCEPTED',
    'ARRIVED': 'ARRIVED',
    'ONGOING': 'ONGOING',
    'COMPLETED': 'COMPLETED',
    'CANCELED': 'CANCELED',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'ASSIGNED': 'ASSIGNED',
    'ACCEPTED': 'ACCEPTED',
    'ARRIVED': 'ARRIVED',
    'ONGOING': 'ONGOING',
    'COMPLETED': 'COMPLETED',
    'CANCELED': 'CANCELED',
  };

  @override
  final Iterable<Type> types = const <Type>[
    TripsRequest200ResponseTripStatusEnum
  ];
  @override
  final String wireName = 'TripsRequest200ResponseTripStatusEnum';

  @override
  Object serialize(
          Serializers serializers, TripsRequest200ResponseTripStatusEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  TripsRequest200ResponseTripStatusEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      TripsRequest200ResponseTripStatusEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$TripsRequest200ResponseTrip extends TripsRequest200ResponseTrip {
  @override
  final String? id;
  @override
  final TripsRequest200ResponseTripStatusEnum? status;

  factory _$TripsRequest200ResponseTrip(
          [void Function(TripsRequest200ResponseTripBuilder)? updates]) =>
      (TripsRequest200ResponseTripBuilder()..update(updates))._build();

  _$TripsRequest200ResponseTrip._({this.id, this.status}) : super._();
  @override
  TripsRequest200ResponseTrip rebuild(
          void Function(TripsRequest200ResponseTripBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequest200ResponseTripBuilder toBuilder() =>
      TripsRequest200ResponseTripBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequest200ResponseTrip &&
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
    return (newBuiltValueToStringHelper(r'TripsRequest200ResponseTrip')
          ..add('id', id)
          ..add('status', status))
        .toString();
  }
}

class TripsRequest200ResponseTripBuilder
    implements
        Builder<TripsRequest200ResponseTrip,
            TripsRequest200ResponseTripBuilder> {
  _$TripsRequest200ResponseTrip? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  TripsRequest200ResponseTripStatusEnum? _status;
  TripsRequest200ResponseTripStatusEnum? get status => _$this._status;
  set status(TripsRequest200ResponseTripStatusEnum? status) =>
      _$this._status = status;

  TripsRequest200ResponseTripBuilder() {
    TripsRequest200ResponseTrip._defaults(this);
  }

  TripsRequest200ResponseTripBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _status = $v.status;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequest200ResponseTrip other) {
    _$v = other as _$TripsRequest200ResponseTrip;
  }

  @override
  void update(void Function(TripsRequest200ResponseTripBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequest200ResponseTrip build() => _build();

  _$TripsRequest200ResponseTrip _build() {
    final _$result = _$v ??
        _$TripsRequest200ResponseTrip._(
          id: id,
          status: status,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
