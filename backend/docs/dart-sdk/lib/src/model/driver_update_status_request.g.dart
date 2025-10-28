// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'driver_update_status_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const DriverUpdateStatusRequestStatusEnum
    _$driverUpdateStatusRequestStatusEnum_IDLE =
    const DriverUpdateStatusRequestStatusEnum._('IDLE');
const DriverUpdateStatusRequestStatusEnum
    _$driverUpdateStatusRequestStatusEnum_ASSIGNED =
    const DriverUpdateStatusRequestStatusEnum._('ASSIGNED');
const DriverUpdateStatusRequestStatusEnum
    _$driverUpdateStatusRequestStatusEnum_ARRIVED =
    const DriverUpdateStatusRequestStatusEnum._('ARRIVED');
const DriverUpdateStatusRequestStatusEnum
    _$driverUpdateStatusRequestStatusEnum_ON_TRIP =
    const DriverUpdateStatusRequestStatusEnum._('ON_TRIP');
const DriverUpdateStatusRequestStatusEnum
    _$driverUpdateStatusRequestStatusEnum_OFFLINE =
    const DriverUpdateStatusRequestStatusEnum._('OFFLINE');

DriverUpdateStatusRequestStatusEnum
    _$driverUpdateStatusRequestStatusEnumValueOf(String name) {
  switch (name) {
    case 'IDLE':
      return _$driverUpdateStatusRequestStatusEnum_IDLE;
    case 'ASSIGNED':
      return _$driverUpdateStatusRequestStatusEnum_ASSIGNED;
    case 'ARRIVED':
      return _$driverUpdateStatusRequestStatusEnum_ARRIVED;
    case 'ON_TRIP':
      return _$driverUpdateStatusRequestStatusEnum_ON_TRIP;
    case 'OFFLINE':
      return _$driverUpdateStatusRequestStatusEnum_OFFLINE;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<DriverUpdateStatusRequestStatusEnum>
    _$driverUpdateStatusRequestStatusEnumValues = BuiltSet<
        DriverUpdateStatusRequestStatusEnum>(const <DriverUpdateStatusRequestStatusEnum>[
  _$driverUpdateStatusRequestStatusEnum_IDLE,
  _$driverUpdateStatusRequestStatusEnum_ASSIGNED,
  _$driverUpdateStatusRequestStatusEnum_ARRIVED,
  _$driverUpdateStatusRequestStatusEnum_ON_TRIP,
  _$driverUpdateStatusRequestStatusEnum_OFFLINE,
]);

Serializer<DriverUpdateStatusRequestStatusEnum>
    _$driverUpdateStatusRequestStatusEnumSerializer =
    _$DriverUpdateStatusRequestStatusEnumSerializer();

class _$DriverUpdateStatusRequestStatusEnumSerializer
    implements PrimitiveSerializer<DriverUpdateStatusRequestStatusEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'IDLE': 'IDLE',
    'ASSIGNED': 'ASSIGNED',
    'ARRIVED': 'ARRIVED',
    'ON_TRIP': 'ON_TRIP',
    'OFFLINE': 'OFFLINE',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'IDLE': 'IDLE',
    'ASSIGNED': 'ASSIGNED',
    'ARRIVED': 'ARRIVED',
    'ON_TRIP': 'ON_TRIP',
    'OFFLINE': 'OFFLINE',
  };

  @override
  final Iterable<Type> types = const <Type>[
    DriverUpdateStatusRequestStatusEnum
  ];
  @override
  final String wireName = 'DriverUpdateStatusRequestStatusEnum';

  @override
  Object serialize(
          Serializers serializers, DriverUpdateStatusRequestStatusEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  DriverUpdateStatusRequestStatusEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      DriverUpdateStatusRequestStatusEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$DriverUpdateStatusRequest extends DriverUpdateStatusRequest {
  @override
  final num? lat;
  @override
  final num? lng;
  @override
  final DriverUpdateStatusRequestStatusEnum? status;

  factory _$DriverUpdateStatusRequest(
          [void Function(DriverUpdateStatusRequestBuilder)? updates]) =>
      (DriverUpdateStatusRequestBuilder()..update(updates))._build();

  _$DriverUpdateStatusRequest._({this.lat, this.lng, this.status}) : super._();
  @override
  DriverUpdateStatusRequest rebuild(
          void Function(DriverUpdateStatusRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  DriverUpdateStatusRequestBuilder toBuilder() =>
      DriverUpdateStatusRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is DriverUpdateStatusRequest &&
        lat == other.lat &&
        lng == other.lng &&
        status == other.status;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, lat.hashCode);
    _$hash = $jc(_$hash, lng.hashCode);
    _$hash = $jc(_$hash, status.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'DriverUpdateStatusRequest')
          ..add('lat', lat)
          ..add('lng', lng)
          ..add('status', status))
        .toString();
  }
}

class DriverUpdateStatusRequestBuilder
    implements
        Builder<DriverUpdateStatusRequest, DriverUpdateStatusRequestBuilder> {
  _$DriverUpdateStatusRequest? _$v;

  num? _lat;
  num? get lat => _$this._lat;
  set lat(num? lat) => _$this._lat = lat;

  num? _lng;
  num? get lng => _$this._lng;
  set lng(num? lng) => _$this._lng = lng;

  DriverUpdateStatusRequestStatusEnum? _status;
  DriverUpdateStatusRequestStatusEnum? get status => _$this._status;
  set status(DriverUpdateStatusRequestStatusEnum? status) =>
      _$this._status = status;

  DriverUpdateStatusRequestBuilder() {
    DriverUpdateStatusRequest._defaults(this);
  }

  DriverUpdateStatusRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _lat = $v.lat;
      _lng = $v.lng;
      _status = $v.status;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(DriverUpdateStatusRequest other) {
    _$v = other as _$DriverUpdateStatusRequest;
  }

  @override
  void update(void Function(DriverUpdateStatusRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  DriverUpdateStatusRequest build() => _build();

  _$DriverUpdateStatusRequest _build() {
    final _$result = _$v ??
        _$DriverUpdateStatusRequest._(
          lat: lat,
          lng: lng,
          status: status,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
