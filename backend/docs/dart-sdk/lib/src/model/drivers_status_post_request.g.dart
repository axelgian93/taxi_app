// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'drivers_status_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const DriversStatusPostRequestStatusEnum
    _$driversStatusPostRequestStatusEnum_IDLE =
    const DriversStatusPostRequestStatusEnum._('IDLE');
const DriversStatusPostRequestStatusEnum
    _$driversStatusPostRequestStatusEnum_ASSIGNED =
    const DriversStatusPostRequestStatusEnum._('ASSIGNED');
const DriversStatusPostRequestStatusEnum
    _$driversStatusPostRequestStatusEnum_ARRIVED =
    const DriversStatusPostRequestStatusEnum._('ARRIVED');
const DriversStatusPostRequestStatusEnum
    _$driversStatusPostRequestStatusEnum_ON_TRIP =
    const DriversStatusPostRequestStatusEnum._('ON_TRIP');
const DriversStatusPostRequestStatusEnum
    _$driversStatusPostRequestStatusEnum_OFFLINE =
    const DriversStatusPostRequestStatusEnum._('OFFLINE');

DriversStatusPostRequestStatusEnum _$driversStatusPostRequestStatusEnumValueOf(
    String name) {
  switch (name) {
    case 'IDLE':
      return _$driversStatusPostRequestStatusEnum_IDLE;
    case 'ASSIGNED':
      return _$driversStatusPostRequestStatusEnum_ASSIGNED;
    case 'ARRIVED':
      return _$driversStatusPostRequestStatusEnum_ARRIVED;
    case 'ON_TRIP':
      return _$driversStatusPostRequestStatusEnum_ON_TRIP;
    case 'OFFLINE':
      return _$driversStatusPostRequestStatusEnum_OFFLINE;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<DriversStatusPostRequestStatusEnum>
    _$driversStatusPostRequestStatusEnumValues = BuiltSet<
        DriversStatusPostRequestStatusEnum>(const <DriversStatusPostRequestStatusEnum>[
  _$driversStatusPostRequestStatusEnum_IDLE,
  _$driversStatusPostRequestStatusEnum_ASSIGNED,
  _$driversStatusPostRequestStatusEnum_ARRIVED,
  _$driversStatusPostRequestStatusEnum_ON_TRIP,
  _$driversStatusPostRequestStatusEnum_OFFLINE,
]);

Serializer<DriversStatusPostRequestStatusEnum>
    _$driversStatusPostRequestStatusEnumSerializer =
    _$DriversStatusPostRequestStatusEnumSerializer();

class _$DriversStatusPostRequestStatusEnumSerializer
    implements PrimitiveSerializer<DriversStatusPostRequestStatusEnum> {
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
  final Iterable<Type> types = const <Type>[DriversStatusPostRequestStatusEnum];
  @override
  final String wireName = 'DriversStatusPostRequestStatusEnum';

  @override
  Object serialize(
          Serializers serializers, DriversStatusPostRequestStatusEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  DriversStatusPostRequestStatusEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      DriversStatusPostRequestStatusEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$DriversStatusPostRequest extends DriversStatusPostRequest {
  @override
  final num? lat;
  @override
  final num? lng;
  @override
  final DriversStatusPostRequestStatusEnum? status;

  factory _$DriversStatusPostRequest(
          [void Function(DriversStatusPostRequestBuilder)? updates]) =>
      (DriversStatusPostRequestBuilder()..update(updates))._build();

  _$DriversStatusPostRequest._({this.lat, this.lng, this.status}) : super._();
  @override
  DriversStatusPostRequest rebuild(
          void Function(DriversStatusPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  DriversStatusPostRequestBuilder toBuilder() =>
      DriversStatusPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is DriversStatusPostRequest &&
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
    return (newBuiltValueToStringHelper(r'DriversStatusPostRequest')
          ..add('lat', lat)
          ..add('lng', lng)
          ..add('status', status))
        .toString();
  }
}

class DriversStatusPostRequestBuilder
    implements
        Builder<DriversStatusPostRequest, DriversStatusPostRequestBuilder> {
  _$DriversStatusPostRequest? _$v;

  num? _lat;
  num? get lat => _$this._lat;
  set lat(num? lat) => _$this._lat = lat;

  num? _lng;
  num? get lng => _$this._lng;
  set lng(num? lng) => _$this._lng = lng;

  DriversStatusPostRequestStatusEnum? _status;
  DriversStatusPostRequestStatusEnum? get status => _$this._status;
  set status(DriversStatusPostRequestStatusEnum? status) =>
      _$this._status = status;

  DriversStatusPostRequestBuilder() {
    DriversStatusPostRequest._defaults(this);
  }

  DriversStatusPostRequestBuilder get _$this {
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
  void replace(DriversStatusPostRequest other) {
    _$v = other as _$DriversStatusPostRequest;
  }

  @override
  void update(void Function(DriversStatusPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  DriversStatusPostRequest build() => _build();

  _$DriversStatusPostRequest _build() {
    final _$result = _$v ??
        _$DriversStatusPostRequest._(
          lat: lat,
          lng: lng,
          status: status,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
